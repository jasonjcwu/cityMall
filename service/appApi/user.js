const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
router.get('/', async(ctx) => {
    ctx.body = "这是用户操作首页"
})
router.post('/register', async(ctx) => {
    console.log(ctx.request.body)
        //ctx.body = ctx.request.body
    const User = mongoose.model('User')
    let newUser = new User(ctx.request.body)
    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch(error => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})
module.exports = router