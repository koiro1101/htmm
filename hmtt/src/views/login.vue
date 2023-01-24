<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" ><van-icon slot="left" name="cross" @click="$router.back()" /></van-nav-bar>
    <!-- 表单验证 -->
    <van-form @submit="onSubmit">
  <van-field
    v-model="mobile"
    name="mobile"
    type="number"
    ref="loginForm"
    placeholder="请输入手机号"
    :rules="[{ required: true, message: '请输入手机号' },{ pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/, message: '手机格式不对' }]"
  > <i slot="left-icon" class="iconfont icon-shouji"></i></van-field>
  <van-field
    v-model="code"

    name="code"
    type="number"
    placeholder="请输入验证码"
    :rules="[{ required: true, message: '请填写验证码' },{ pattern: /^\d{6}$/, message: '格式不对' },]"
  ><i slot="left-icon" class="iconfont icon-yanzhengma"></i>
  <template #button>
    <van-count-down
    v-if="isshow"

    :time="31000"
    format="ss s"
    @finish="isshow = false"
  />
    <van-button v-else size="small" class="send" round type="default" native-type="button" @click="sendms">发送验证码</van-button>
  </template></van-field>
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit" >登录</van-button>
  </div>
</van-form>
  </div>
</template>
<script>
import { login, sendmss } from '../api/login'
export default {
  data () {
    return {
      mobile: '',
      code: '',
      isshow: false
    }
  },
  methods: {
    async  onSubmit (val) {
      const data = await login(val)
      this.$router.push('/')
      this.$store.commit('setUser', data.data)
      // console.log(data)
    },
    async sendms () {
      if (this.mobile.length === 11) {
        try {
          this.isshow = true
          await sendmss(this.mobile)
          this.$toast('发送成功')
        } catch (error) {
          console.log(error)
        }
      } else { this.$toast('手机格式不对') }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .van-nav-bar {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon  {
    color: #fff;
  }
}
.send {
  width: 102px;
    height: 26px;
    line-height: 26px;
    background-color: #ededed;
    font-size: 12px;
    color: #666;
}

}

</style>
