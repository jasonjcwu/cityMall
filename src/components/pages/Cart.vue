<template>
  <div class="cart">
    <div class="navbar-div">
      <van-nav-bar title="购物车" />
    </div>

        <div class="nogood"
      v-if="!this.cartInfo.length">
      <div>购物车空空的，快去购物吧~</div>
      <van-button type="primary"
        class="btn"
        to='/'
        >去首页</van-button>
    </div>
    <!--显示购物车中的商品-->
    <div class="cart-list">
      <van-checkbox-group
        class="card-goods"
        v-model="checkedGoods"
      >
        <van-checkbox
          class="card-goods__item"
          v-for="(item,index) in cartInfo"
          :key="index"
          :name="item.goodsId"
          v-model="checked"
        >
          <van-card
            :title="item.Name"
            :price="item.price | moneyFilter"
            :thumb="item.image"
            @click.stop
          >
            <van-stepper
              slot="footer"
              v-model="item.count"
            />
          </van-card>

        </van-checkbox>
      </van-checkbox-group>
      <div class="card-title">
        <van-button
          size="small"
          type="danger"
          @click="clearCart"
          plain
        >清空购物车</van-button>
      </div>
      <van-submit-bar
        :price="totalMoney"
        :disabled="!checkedGoods.length"
        :button-text="submitBarText"
        @submit="onSubmit"
      >
        <span
          @click="selectAll"
          class="selectAll"
        >
          <van-checkbox v-model="checkedAll">{{checkedAllMsg}}</van-checkbox>
        </span>
      </van-submit-bar>
    </div>

  </div>

</template>

<script>
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from 'vant'
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup
  },
  data() {
    return {
      cartInfo: [], // 购物车内的商品
      isEmpty: true, // 购物车是否为空
      checkedGoods: [], //是否选中的物品
      checked: true,
      checkedAllMsg: '全选',
      checkedAll: false,
    }
  },
  created() {
    this.getCartInfo()
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  },
  computed: {
    totalMoney() {
      return this.cartInfo.reduce((total, item) => {
        return total + (this.checkedGoods.indexOf(item.goodsId) !== -1 ? item.price*item.count : 0)
      }, 0)*100
    },
    submitBarText() {
      const count = this.checkedGoods.length;
      return '结算' + (count ? `(${count})` : '');
    },
  },
  methods: {
    //得到购物车的商品
    getCartInfo() {
      //判断localStorage里是否有购物车数据
      if (localStorage.cartInfo) {
        //如果有数据，我们去除并赋值给cartInfo
        this.cartInfo = JSON.parse(localStorage.cartInfo)
      }
      //打印到控制台查看效果
      //console.log(' this.cartInfo:' + JSON.stringify(this.cartInfo))
      this.isEmpty = this.cartInfo.length > 0 ? false : true
    },

    //清空购物车的商品
    clearCart() {
      localStorage.removeItem('cartInfo')
      this.cartInfo = []
    },
    onSubmit() {
      Toast('点击结算')
    },
    selectAll() {
      if (!this.checkedAll) {
        for (let i = 0; i < this.cartInfo.length; i++) {
          this.checkedGoods.push(this.cartInfo[i].goodsId);
        }
        this.checkedAllMsg = '取消全选';
      } else {
        this.checkedGoods = [];
        this.checkedAllMsg = '全选';
      }
    },
  }
}

</script>

<style scoped>
.card-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list {
  background-color: #fff;
}
.totalMoney {
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
.cart {
  margin-bottom: 120px;
}

.card-goods {
  padding-top: 46px;
  padding-bottom: 0;
  background-color: #fff;
}

.card-goods__item {
  position: relative;
  background-color: #fafafa;
  border-bottom: 1px solid #e5e5e5;
}
.card-goods__item >>> .van-checkbox__label {
  width: 100%;
  padding: 0 10px 0 15px;
  box-sizing: border-box;
  flex: 1;
}

.card-goods__item >>> .van-checkbox__icon {
  top: 50%;
  left: 10px;
  z-index: 1;
  margin-top: -10px;
  position: absolute;
}
.van-card__title {
  font-size: 1.1rem;
  line-height: 2.2rem;
}
.van-card__bottom {
  position: absolute;
  bottom: 0.5rem;
}
.van-card__price {
  color: #f44;
  font-weight: bold;
}
.van-submit-bar {
  bottom: 50px;
}
.selectAll {
  margin-left: 10px;
}
.nogood{
  display: flex;
  height:80vh;
  align-items:center;
  justify-content: center;
}
</style>