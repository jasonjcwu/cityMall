//const BASEURL = "http://localhost:3001/"
const LOCALURL = "http://47.103.209.82/"
const URL = {
    //商城首页
    getShoppingMallInfo: LOCALURL + 'data',
    registerUser: LOCALURL + 'user/register',
    login: LOCALURL + 'user/login', //用户注册接口
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', //获取商品信息
    getCategoryList: LOCALURL + 'goods/getCategoryList',
    getCategorySubList: LOCALURL + 'goods/getCategorySubList',
    getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID', //得到小类商品信息

}
module.exports = URL