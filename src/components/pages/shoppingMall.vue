<template>
  <div>
    <div class="search-bar">
      <van-row class="test-row">
        <van-col span="3">
          <div class="location-icon"> <img
              :src="locationIcon"
              alt
            />
          </div>
        </van-col>
        <van-col span="16">
          <input
            type="text"
            class="search-input"
          />
        </van-col>
        <van-col span="5">
          <van-button
            class="top-search-button"
            size="mini"
          >搜索</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- 轮播 -->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item
          v-for="(banner,index) in bannerPicArray"
          :key="index"
        >
          <img
            v-lazy="banner.image"
            @click="goGoodsPage(banner.goodsId)"
            width="100%"
            alt="导航swiper"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 分类 -->
    <div class="type-bar">
      <div
        v-for="(cate,index) in category"
        :key="index"
        @click="goCategory(index)"
      >
        <img
          v-lazy="cate.image"
          alt
        />
        <span>{{ cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- 广告 -->
    <div class="adv">
      <img
        v-lazy="advertesPicture"
        alt="广告"
      />
    </div>
    <!-- 商品推荐 -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>

      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide
            v-for="(item,index) in recommendGoods"
            :key="index"
          >
            <div
              class="recommend-item"
              @click="goGoodsPage(item.goodsId)"
            >
              <img
                :src="item.image"
                width="80%"
                alt
              />
              <div>{{item.goodsName}}</div>
              <div>${{item.price | moneyFilter}}(${{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 楼层 -->
    <div
      v-for="(item,index) in floorName"
      :key="index"
    >
      <floorComponent
        :floorData="floorContent[index]"
        :floorTitle="item"
      ></floorComponent>
    </div>
    <!-- 热卖推荐 -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col
              span="12"
              v-for="(item, index) in hotGoods"
              :key="index"
            >
              <goods-info :goods="item"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import "vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css"
import { swiper, swiperSlide } from "vue-awesome-swiper"
import swiperDefault from "../swiper/swiperdemo"
import swiperText from "../swiper/swipertext"
import floorComponent from "../component/floor"
import { toMoney } from "@/filter/moneyFilter.js"
import goodsInfo from "../component/goodsInfo"
import url from "@/serviceAPI.config.js"
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to 主页",
      swiperOption: {
        slidesPerView: 3
      },
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [],
      category: [],
      advertesPicture: "",
      recommendGoods: [],
      floorContent: {},
      floorName: {},
      hotGoods: [], //热卖商品
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  },
  components: {
    swiper,
    swiperSlide,
    swiperDefault,
    swiperText,
    floorComponent,
    goodsInfo
  },
  created() {
    axios({
      url: url.getShoppingMallInfo,
      method: "get"
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.bannerPicArray = response.data.slides
          this.category = response.data.category
          this.advertesPicture = response.data.advertesPicture.PICTURE_ADDRESS
          this.recommendGoods = response.data.recommend
          this.floorName = response.data.floorName
          for (let key in this.floorName) {
            this.floorContent[key] = response.data[key]
          }
          this.hotGoods = response.data.hotGoods
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    goCategory(index) {
      //console.log(index)
      this.$router.push({ name: 'CategoryList', params: { mallCategoryId: index } })
    },
    goGoodsPage(goodsId) {
      this.$router.push({ name: 'Goods', query: { goodsId: goodsId } })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-bar {
  background: #e5017b;
  line-height: 3rem;
}
.search-input {
  width: 100%;
  height: 1.3em;
  /* border: 1px solid rgb(255,117,0); */
  border: none;
  border-radius: 2rem;
  transform: translateY(0.1rem);
}
.location-icon {
  transform: translate(0.5rem, 0.4rem);
}
.top-search-button {
  margin-left: 0.5rem;
  background: none;
  color: white;
}
.swiper-area {
  width: 100%;
  clear: both;
  max-height: 10.7rem;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin:0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.type-bar div {
  font-size: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.type-bar div > img {
  width: 3.8rem;
}
.adv > img {
  width: 100%;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}

.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods {
  padding-bottom: 5rem;
  overflow: hidden;
  background-color: #fff;
}
</style>
