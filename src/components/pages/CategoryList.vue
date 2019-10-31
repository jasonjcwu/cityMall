<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <van-sidebar v-model="activeKey">
              <van-sidebar-item
                @click="clickCategory(index,item.ID)"
                v-for="(item,index) in category"
                :key="index"
                :title="item.MALL_CATEGORY_NAME"
              />
            </van-sidebar>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs
              v-model="active"
              @click="onClickCategorySub"
            >
              <van-tab
                v-for="(item, index) in categorySub"
                :key="index"
                :title="item.MALL_SUB_NAME"
              >
              </van-tab>
            </van-tabs>
          </div>

          <div id="list-div">
            <van-pull-refresh
              v-model="isRefresh"
              @refresh="onRefresh"
            >
              <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
              >
                <div
                  class="list-item"
                  @click="goGoodsInfo(item.ID)"
                  v-for="(item,index) in goodList"
                  :key="index"
                >
                  <div class="list-item-img"><img
                      :src="item.IMAGE1"
                      width="100%"
                      :onerror="errorImg"
                    /></div>
                  <div class="list-item-text">
                    <div class="list-item-name">
                      <div>{{item.NAME}}</div>
                      <div>￥{{item.ORI_PRICE | moneyFilter}}</div>
                    </div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>

        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [], // 小类
      active: 0,    //激活标签的值
      //list: [],
      loading: false,   //上拉加载使用
      finished: false,  //下拉加载是否没有数据了
      isRefresh: false, //下拉加载
      page: 1,          //商品列表的页数
      goodList: [],     //商品信息
      categorySubId: '', //商品子分类ID
      errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"',
      activeKey: 0,
    }
  },
  created() {
    this.getCategory()
    //console.log(this.category[0])
    //this.getCategorySubByCategoryId(this.category[0].ID)

  },
  mounted() {
    let winHeight = document.documentElement.clientHeight
    document.getElementById("leftNav").style.height = winHeight - 46 + 'px'
    document.getElementById('list-div').style.height = winHeight - 150 + 'px'
  },
  activated() {
    let firstCategoryIndex = this.$route.params.mallCategoryId || 0
    //console.log(firstCategoryIndex)
    this.clickCategory(firstCategoryIndex, firstCategoryIndex + 1)
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  },
  methods: {
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: 'get',
      })
        .then(response => {
          //console.log(response)
          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message
            //console.log(this.category)
            this.getCategorySubByCategoryId(this.category[0].ID)
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    clickCategory(index, categoryId) {
      console.log(index)
      this.activeKey = index
      this.categoryIndex = index
      this.page = 1
      this.finished = false
      this.goodList = []
      this.getCategorySubByCategoryId(categoryId)
    },
    //根据大类ID读取小类类别列表
    getCategorySubByCategoryId(categoryId) {

      axios({
        url: url.getCategorySubList,
        method: 'post',
        data: { categoryId: categoryId }
      })
        .then(response => {
          //console.log(response)
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message
            this.active = 0
            this.categorySubId = this.categorySub[0].ID
            this.onLoad()
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
        this.getGoodList()
      }, 500)
    },
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false
        this.finished = false
        this.goodList = []
        this.page = 1
        this.onLoad()
      }, 500)
    },
    // 获取商品列表
    getGoodList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: 'post',
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(response => {
          //console.log(response)
          if (response.data.code == 200 && response.data.message.length) {
            this.page++
            this.goodList = this.goodList.concat(response.data.message)
            //console.log(this.goodList)
          } else {
            this.finished = true;
          }
          this.loading = false;
          //console.log(this.finished)
        })
        .catch(error => {
          console.log(error)
        })
    },
    //点击子类获取商品信息
    onClickCategorySub(index, title) {
      //console.log( this.categorySub)
      this.categorySubId = this.categorySub[index].ID
      console.log(this.categorySubId)
      this.goodList = []
      this.finished = false
      this.page = 1
      this.onLoad()

    },
    goGoodsInfo(id) {
      this.$router.push({ name: 'Goods', params: { goodsId: id } })
    },
  }

}
</script>

<style scoped>
.van-sidebar {
    width: 100%;
}
#list-div {
  overflow: scroll;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
/*超出宽度省略号*/
/* .list-item-name{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
} */
</style>