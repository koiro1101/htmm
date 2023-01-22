<template>
  <div class="home-con" >
    <van-nav-bar class="con"  fixed>
      <van-button slot="title" class="search-btn" round icon="search">搜索</van-button>
    </van-nav-bar>
    <!-- 文章列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
    <van-tab :title="item.name" v-for="(item) in channelList" :key="item.id">
      <Article :channels="item"></Article>
    </van-tab>
    <div slot="nav-right" class="gd"><i class="iconfont icon-gengduo"></i></div>
</van-tabs>
  </div>
</template>

<script>
import Article from './article-list.vue'
import { getUseList } from '../api/login.js'
export default {
  components: { Article },
  created () {
    this.load()
  },
  methods: {
    async load () {
      try {
        const res = await getUseList()
        this.channelList = res.data.channels
      } catch (error) {
        this.$toast('获取频道列表数据失败')
        console.log(error)
      }
    }
  },
  data () {
    return {
      active: 0,
      channelList: []
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar__title {
    // max-width: unset;
    min-width: 100%;
}

.home-con {
padding-bottom: 50px;
    .search-btn{
    width: 200px;
    height: 30px;
    background-color: #5babfb;
    border: none;
    font-size: 16px;
    color: #fff;
    .van-icon {
      font-size: 23px;
      color: #fff;
    }
  }

  .con {
  background-color: #3296fa;

}
.van-nav-bar__title {
  max-width: unset;
}
/deep/.channel-tabs {
  .van-tabs__wrap {
    height: 40px;
    position: fixed;
  top: 45px;
  z-index: 2;
 left: 0;
 right: 0;

  }
  .van-tab {
    min-width: 125px;
    border-right: 1px solid #ddd;
    font-size: 14px;
    color: #777;
  }
  .van-tab--active {
    color: #333;
  }
  .van-tabs__line {
    width:20px !important;
    height: 4px;
    background-color: #3296fa;
    bottom: 20px;
  }
  .gd {
    position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 44px;
  background-color: #fff;
  opacity: 0.5;
  i.iconfont {
    font-size: 22px;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
  }
}
}

</style>
