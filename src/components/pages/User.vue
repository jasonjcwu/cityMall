<template>
  <div>
    <img
      class="user-poster"
      src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"
      alt="用户"
    >
    <van-row class="user-link">
      <van-col span="6">
        <van-icon name="pending-payment"></van-icon>
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records"></van-icon>
        待接单
      </van-col>
      <van-col span="6">
        <van-icon name="tosend"></van-icon>
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics"></van-icon>
        待收货
      </van-col>
    </van-row>
    <van-cell-group class="user-group">
      <van-cell
        title="全部订单"
        icon="records"
        is-link
      />
    </van-cell-group>
    <van-cell-group>
      <van-cell
        title="登陆"
        icon="exchange"
        is-link
        to="login"
      />
      <van-cell
        title="注册"
        icon="user-o"
        is-link
        to="register"
      />
      <van-cell
        title="我收到的礼物"
        icon="gift"
        is-link
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'User',
  created() {
    // console.log(localStorage.userInfo)
  },
  methods: {}
};
</script>

<style scoped>
.user-poster {
  width: 100%;
  height: auto;
  display: block;
}

.user-link {
  text-align: center;
  font-size: 12px;
  padding: 15px 0;
  background-color: #fff;
}
.van-icon {
  display: block;
  margin-bottom: 4px;
  font-size: 24px;
}

.user-group {
  margin-bottom: 0.3rem;
}
</style>