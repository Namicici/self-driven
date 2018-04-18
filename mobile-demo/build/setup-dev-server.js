const fs = require('fs')
const path = require('path')
const MFS = require('memory-fs')
const webpack = require('webpack')
// const chokidar = require('chokidar')
const clientConfig = require('./webpack.client.conf')
const serverConfig = require('./webpack.server.conf')

console.log(process.env.NODE_ENV)

const readFile = (lfs, file) => {
    try {
        let filename = path.join(clientConfig.output.path, file)
        // console.log(filename)
        return lfs.readFileSync(filename, 'utf-8')
    } catch (e) {
        console.log(e)
    }
}

module.exports = function setupDevServer (app, templatePath, cb) {
    let bundle
    let template
    let clientManifest

    let ready
    const readyPromise = new Promise(r => { ready = r })
    const update = () => {
        if (bundle && clientManifest) {
            ready()
            cb(bundle, {
                template,
                clientManifest
            })
        }
    }
    // read template from disk and watch
    template = fs.readFileSync(templatePath, 'utf-8')

    // chokidar.watch(templatePath).on('change', () => {
    //   template = fs.readFileSync(templatePath, 'utf-8')
    //   console.log('index.html template updated.')
    //   update()
    // })
    // modify client config to work with hot middleware
    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
    clientConfig.output.filename = '[name].js'
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

    // dev middleware
    const clientCompiler = webpack(clientConfig)
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: true
    })
    app.use(devMiddleware)
    clientCompiler.plugin('done', stats => {
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))
        if (stats.errors.length) return
        clientManifest = JSON.parse(readFile(
            devMiddleware.fileSystem,
            '../dist/vue-ssr-client-manifest.json'
        ))
        console.info('client ok ....')
        update()
    })

    // hot middleware
    app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }))

    // watch and update server renderer
    const serverCompiler = webpack(serverConfig)
    const mfs = new MFS()
    serverCompiler.outputFileSystem = mfs
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err

        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        if (stats.errors.length) return

        // read bundle generated by vue-ssr-webpack-plugin
        bundle = JSON.parse(readFile(mfs, '../dist/vue-ssr-server-bundle.json'))

        console.info('server ok ....')
        update()
    })

    app.use(require('connect-cgi-mock')({
        root: path.resolve(__dirname, '../mock'),
        route: '/api'
    }))

    return readyPromise
}
