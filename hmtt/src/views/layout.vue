<template>
  <div class="layout-con">
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 底部tabbar -->
    <van-tabbar route>
     <van-tabbar-item to="/home" ><i slot="icon" class="iconfont icon-shouye"></i>首页</van-tabbar-item>
     <van-tabbar-item to="/video"><i slot="icon" class="iconfont icon-shipin"></i>视频</van-tabbar-item>
     <van-tabbar-item to="/qa"><i slot="icon" class="iconfont icon-wenda"></i>问答</van-tabbar-item>
     <van-tabbar-item to="my"><i slot="icon" class="iconfont icon-wode"></i>{{ $store.state.user ? '我的':'未登录' }}</van-tabbar-item>

    </van-tabbar>
  </div>

</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.layout-con {
  i {
    font-size: 20px;
  }
}

</style>
