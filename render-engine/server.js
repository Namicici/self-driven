const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development'
}

// const isProd = process.env.NODE_ENV === 'production'
const isProd = true
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()

function createRenderer (bundle, options) {
    return createBundleRenderer(bundle, Object.assign(options, {
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15
        }),
        basedir: resolve('./h5'),
        runInNewContext: false
    }))
}

let renderer
let readyPromise
const templatePath = resolve('./h5/index.template.html')
if (isProd) {
    const template = fs.readFileSync(templatePath, 'utf-8')
    const bundle = require('./h5/vue-ssr-server-bundle.json')
    const clientManifest = require('./h5/vue-ssr-client-manifest.json')
    renderer = createRenderer(bundle, {
        template,
        clientManifest
    })
} else {
    // readyPromise = require('./build/setup-dev-server')(
    //     app,
    //     templatePath,
    //     (bundle, options) => {
    //         renderer = createRenderer(bundle, options)
    //     }
    // )
}

const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use('/h5', serve('./h5', true))
app.use('/service-worker.js', serve('./h5/service-worker.js'))

function render (req, res) {
    const s = Date.now()

    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Server', serverInfo)

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url)
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found')
        } else {
            res.status(500).send('500 | Internal Server Error')
            console.error(`error during render : ${req.url}`)
            console.error(err.stack)
        }
    }

    const context = {
        title: 'Zing Pay',
        url: req.url
    }
    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err)
        }
        res.send(html)
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`)
        }
    })
}

app.get('*', isProd ? render : (req, res) => {
    readyPromise.then(() => {
        console.log('ok---' + req.path)
        return render(req, res)
    })
})

const port = process.env.PORT || 8090
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
