const BASEURL = "http://localhost:3001/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    //商城首页
    getShoppingMallInfo: BASEURL + 'data',
    registerUser: LOCALURL + 'user/register',
    login: LOCALURL + 'user/login', //用户注册接口
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', //获取商品信息

}
module.exports = URL