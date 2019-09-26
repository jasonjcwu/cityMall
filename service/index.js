const Koa = require('koa')
const app = new Koa()
const { connect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
let user = require('./appApi/user')
const cors = require('koa2-cors')
app.use(cors())
app.use(bodyParser())
    //装载路由
let router = new Router()
router.use('/user', user.routes())

//路由中间件
app.use(router.routes())
app.use(router.allowedMethods())
    // (async() => {
    //     await connect()
    //     initSchemas()
    //     const User = mongoose.model('User')
    //     let oneUser = new User({ userName: 'jason2', passWord: '123456' })
    //     oneUser.save().then(() => {
    //         console.log('插入成功')
    //     })
    //     let users = await User.findOne({}).exec()
    //     console.log('------------------')
    //     console.log(users)
    //     console.log('------------------')
    // })()
app.use(async(ctx) => {
    ctx.body = '<h1>hello koa</h1>'
})

app.listen(3000, () => {
    console.log('[Server] starting port 3000')
})