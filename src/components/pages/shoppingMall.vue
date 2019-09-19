<template>
  <div>
    <div class="search-bar">
      <van-row class="test-row">
        <van-col span="3">
          <img class="location-icon" :src="locationIcon" alt />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button size="mini">搜索</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- 轮播 -->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.imageUrl" width="100%" alt="导航swiper" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 分类 -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" alt />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- 广告 -->
    <div class="adv">
      <img v-lazy="advertesPicture" alt="广告" />
    </div>
    <!-- 商品推荐 -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>

      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" alt />
              <div>{{item.goodsName}}</div>
              <div>${{item.price}}(${{item.mallPrice}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>

    </div>
    <!-- 楼层 -->
    <div v-for="(item,index) in floorName" :key="index">
      <floorComponent :floorData="floorContent[index]" :floorTitle="item"></floorComponent>
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
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to 主页",
      swiperOption: {
        slidesPerView: 3
      },
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [
        {
          imageUrl:
            "https://haitao.nosdn1.127.net/b9befc3e-a588-4c03-aefe-f1561c591849T1908231712_960_480.jpg?imageView&thumbnail=750x0&quality=95"
        },
        {
          imageUrl:
            "https://haitao.nosdn1.127.net/0d6f6c4f-ff82-4627-b25b-d15780130f4cT1909161455_960_480.jpg?imageView&thumbnail=750x0&quality=95"
        },
        {
          imageUrl:
            "https://haitao.nosdn1.127.net/2f625215-62f2-4998-a48f-44b1e5b296bcT1909171112_960_480.jpg?imageView&thumbnail=750x0&quality=95"
        }
      ],
      category: [],
      advertesPicture: "",
      recommendGoods: [],
      floorContent: {},
      floorName:{}
    };
  },
  components: {
    swiper,
    swiperSlide,
    swiperDefault,
    swiperText,
    floorComponent
  },
  created() {
    axios({
      url: "http://localhost:3001/data",
      method: "get"
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.category = response.data.category;
          this.advertesPicture = response.data.advertesPicture.PICTURE_ADDRESS;
          this.recommendGoods = response.data.recommend;
          this.floorName = response.data.floorName
          for(let key in this.floorName){
            this.floorContent[key] = response.data[key]
          }
        }
      })
      .catch(error => {
        console.log(error)
      })

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-bar {
  height: 3rem;
  background: #e5017b;
  line-height: 3rem;
}
.search-input {
  width: 100%;
  height: 1.3em;
  /* border: 1px solid rgb(255,117,0); */
  border: none;
  border-radius: 2rem;
}
.location-icon {
  padding: 0.3rem 0 0.2rem 0.3rem;
}
.swiper-area {
  width: 100%;
  clear: both;
  max-height: 15rem;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
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

</style>
