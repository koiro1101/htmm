<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"/>
    <!-- 表单验证 -->
    <van-form @submit="onSubmit">
  <van-field
    v-model="mobile"
    name="mobile"

    placeholder="请输入手机号"
    :rules="[{ required: true, message: '请输入手机号' }]"
  > <i slot="left-icon" class="iconfont icon-shouji"></i></van-field>
  <van-field
    v-model="code"
    type="password"
    name="code"

    placeholder="请输入验证码"
    :rules="[{ required: true, message: '请填写验证码' }]"
  ><i slot="left-icon" class="iconfont icon-yanzhengma"></i>
  <template #button>
    <van-button size="small" class="send" round type="default">发送验证码</van-button>
  </template></van-field>
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">登录</van-button>
  </div>
</van-form>
  </div>
</template>
<script>
import { login } from '../api/login'
export default {
  data () {
    return {
      code: '',
      mobile: ''
    }
  },
  methods: {
    async  onSubmit (val) {
      const res = await login(val)
      console.log(res)
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
