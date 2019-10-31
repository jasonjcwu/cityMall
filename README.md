# vue-shopping

> A Vue.js shoppingMall project
> 前端使用vue+vueRouter+vantUI
> 后端使用 node+KOA+mongoDB+nginx

## Build Setup

**前台**

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

**后台**

把build后的静态dist文件，放入service文件夹

```javascript
const path = require('path')
const staticFiles = require('koa-static')

// 指定 dist目录为静态资源目录，用来存放 js css images 等
app.use(staticFiles(path.resolve(__dirname, "./dist")))

```

`node index.js`启动

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 项目总结

前期跟着老师视屏做，照着视频敲，学完后发现这个项目不太完善，页面很多功能都没做，老师的教程也结束了，烂尾了，在掘金看技术胖的赞那么多，觉得看他的视频总没错，只能说期望太高了。那就只有自己就把一些不满意的地方都改了，这样也好，能有自己思考的空间。

**这里是我写完这个项目的十几篇[学习笔记](https://2249038142.github.io/2249038142.github.io/tags/项目/)还有服务器部署node环境也学到了。**

**个人页面**直接没讲，我就自己加了有赞的个人页面框架，把**登陆注册**加进去了。其他功能接口都没写。

![1572017219183](https://github.com/2249038142/picture/raw/master/vue_shopping/1572017219183.png)

**购物车**UI也做了相应优化，计算总价，checkbox。

![1572017252727](https://github.com/2249038142/picture/raw/master/vue_shopping/1572017252727.png)

**商品详情**统一用了vantUI组件，之前实在难看。

![1572017542406](https://github.com/2249038142/picture/raw/master/vue_shopping/1572017542406.png)

**列表商品**之前爬的图片链接失效，直接在后台把失效图片给洗了一遍。

![1572017315053](https://github.com/2249038142/picture/raw/master/vue_shopping/1572017315053.png)



使用axios请求，把能请求到的数据写入新文件，请求不到就抛弃。之前先存一个数组，再一概写进去这是不行的，会返回一个空数组。多个异步请求，函数直接返回了。

```javascript
newData.map(async(value, index) => {
            try {
                let result = await axios.get(value.IMAGE1)
                //console.log(value)
                fs.appendFile('./data_json/newGoods2.json',JSON.stringify(value)+',',function(err, ret) {
                    if(err) {throw err}
                    })
            } catch (err) {
                console.log(err + 'bb')
            }
```

也算彻底弄懂了JS的运行顺序，异步同步，宏任务微任务，还有async/await，看了几篇文章。以后再单独拿出来一篇文章总结把。

mongoDB数据库，增加了一个休闲食品类别，把食品饮料栏变为两栏，要不然这一栏的子分类太多了，还有一个白酒的分类，里面数据却全是生鲜，技术胖老师完全不走心。我全都改了。

后期，还要把**首页的所有图片链接跳转商品详情**给完善了，

![1572017598297](https://github.com/2249038142/picture/raw/master/vue_shopping/1572017598297.png)

![1572017627898](https://github.com/2249038142/picture/raw/master/vue_shopping/1572017627898.png)

*第二天完善了*

首页分类跳到分类详情，在分类栏绑定@click方法，传入ID值

```javascript
goCategory(index){
  //console.log(index)
  this.$router.push({name:'CategoryList',params:{mallCategoryId:index}})
}
```

跳转到商品分类，然后在`activated()`钩子函数中把具体页号传过来，默认第一个

```javascript
  activated() {
    let firstCategoryIndex = this.$route.params.mallCategoryId || 0
    this.clickCategory(firstCategoryIndex, firstCategoryIndex + 1)
  },
```

应用clickCategory方法点击到指定分类栏。

之前写在`create()`钩子中，没有效果，问题页面是keep-alive存在缓存，不会重新加载。

**知识点**:    钩子函数的执行顺序

使用`keep-alive`的初次加载顺序

`beforeRouteEnter --> created --> mounted --> activated --> deactivated` 

再次进入缓存的页面，只会触发`beforeRouteEnter -->activated --> deactivated`

created和mounted不会再执行。

关于vue的路由还需要继续升入了解，现在知道的还太浅了。



之后学习了一下怎么挂在服务器。
项目就可上线查看了

![扫一扫](https://github.com/2249038142/picture/raw/master/vue_shopping/1572496899999.png)

因为工作室有新的项目需要做了，这个项目暂时就到这里了，我觉得还可以用vuex来储存一下购物车和登陆，暂时vuex还没有理解透彻。以后来继续完善。

今天犯了个大忌，看见git与远程仓库有冲突，觉得自己一个人写的不存在冲突，强行push -f ，结果在hub上写的readme.md文件给洗掉了，历史也找不到，还好有大部分在博客上。要是合作的项目可容不得这么任性了。