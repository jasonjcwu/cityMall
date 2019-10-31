<template>
  <div>
    <div class="floor">
      <div class="floor-title">{{floorTitle}}</div>
      <div class="floor-rule">
        <img 
          @click="goGoodsPage(floorData0.goodsId)"
          :src="floorData0.image"
          width="100%"
        />
        <div
          v-for="(item, index) in floorData.slice(1)"
          :key="index"
        >
          <img @click="goGoodsPage(item.goodsId)"
            :src="item.image"
            width="100%"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["floorData", "floorTitle"],
  data() {
    return {
      floorData0: {}
    };
  },
  created() {
    this.floorData0 = this.floorData[0];
    console.log(this.floorData)
  },
  methods:{
    goGoodsPage(goodsId){
      this.$router.push({name:'Goods',query:{goodsId:goodsId}})
    }
  }
};
</script>
<style scoped>
.floor-title {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}

.floor-rule {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
}

.floor-rule div {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 50vw;
  border-bottom: 1px solid #ddd;
}
.floor-rule > div:nth-child(odd) {
  border-left: 1px solid #ddd;
}

</style>