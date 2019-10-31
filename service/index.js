const Koa = require('koa')
const app = new Koa()
const { connect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Router = require('koa-router')
const path = require('path')
const staticFiles = require('koa-static')

// 指定 dist目录为静态资源目录，用来存放 js css images 等
app.use(staticFiles(path.resolve(__dirname, "./dist")))

app.use(bodyParser())
app.use(cors())
    // app.use(cors({
    //     origin: ['http://localhost:8080']
    // }))
    // app.use(async(ctx, next) => {
    //     ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    //     ctx.set('Access-Control-Allow-Methods', 'POST');
    //     await next();
    // });

let user = require('./appApi/user')
let goods = require('./appApi/goods.js')


//装载路由
let router = new Router()
router.use('/user', user.routes())
router.use('/goods', goods.routes())
    //路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

;
(async() => {
    await connect()
    initSchemas()

})()
// app.use(async(ctx) => {
//     ctx.body = '<h1>hello koa</h1>'
// })

app.listen(3000, () => {
    console.log('[Server] starting port 3000')
})