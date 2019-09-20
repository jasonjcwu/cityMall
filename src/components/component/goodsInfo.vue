<template>
<div class="goods-info">
        <div class="goods-image">
            <img v-lazy="goods.image" width="90%" />
        </div>
        <div class="goods-name">{{goods.name}}</div>
        <div class="goods-price">￥{{goods.price | moneyFilter }}</div>
    </div>
</template>
<script>
    import {toMoney} from '@/filter/moneyFilter'

export default {
    props:['goods'],
    filters:{
        moneyFilter(money){
            return toMoney(money)
        }
    }
}
</script>
<style scoped>
.goods-name{
        padding: 0 8px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space:nowrap; 
    }
</style>