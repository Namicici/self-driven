
const Koa = require('koa')
const server = new Koa()
const config = require('./config.js')
const serve = require('koa-static')
const router = require('koa-router')()
const path = require('path')
const http = require('http')
const request = require('request')

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer
const template = require('fs').readFileSync(path.join(__dirname, config.template_path), 'utf-8')
const serverBundle = require(path.join(__dirname, config.vue_ssr_server_bundle_path))
const clientManifest = require(path.join(__dirname, config.client_manifest_path))
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false, // 推荐
    template,
    clientManifest
})

const main = serve(path.join(__dirname, '../'))
server.use(main)

server.use(async (ctx, next) => {
    console.log(ctx)
    await next()
})

async function renderPromise (context){
    return new Promise((resolve, reject)=> {
        renderer.renderToString(context, (err, html) => {
            if (err){
                reject(err)
            } else {
                resolve(html)
            }
        })
    })
}

router.get('/*', async (ctx, next) => {
    const context = { url: ctx.request.url }
    ctx.response.body = await renderPromise(context)
    next()
})


const serverHost = 'localhost:9001'
router.all(/\/api/i, async (ctx, next) => {
    let path = ctx.request.path
    let req = {
        url: 'http://' + serverHost + path,
        header: ctx.request.header,
        method: ctx.request.method
    }
    console.log('---------------------------------')
    console.log(req)
    console.log('---------------------------------')
    let promise = new Promise((resolve, reject) => {
        request(req, async (err, res, body) => {
            if (err){
                reject(err)
            }else if (res.statusCode == 200 || res.statusCode == 608){
                let result = {
                    data: JSON.parse(body),
                    response: res
                }
                resolve(result)
            }else{
                reject(err)
            }
        })
    })

    ctx.response.body = await promise
    next()
})

server.proxy = true

server.use(router.routes())

server.on('error', async (err, ctx) => {
    console.log('server error:', err, ctx)
})

module.exports = server