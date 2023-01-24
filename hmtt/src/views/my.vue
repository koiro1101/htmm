<template>

  <div class="my-con">

    <div class="header user-info" v-if="user">
      <!-- 基本信息 -->
      <div class="base-info">
        <div class="left">
          <van-image
            fit="cover"
            :src="userInfo.photo"
            class="avatar"
            round
          />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <!-- 粉丝、关注 -->

        <div class="data">
  <div class="data-item">
    <span>{{ userInfo.art_count }}</span>
    <span>头条</span>
  </div>
  <div class="data-item">
    <span>{{ userInfo.follow_count }}</span>
    <span>关注</span>
  </div>
  <div class="data-item">
    <span>{{ userInfo.fans_count }}</span>
    <span>粉丝</span>
  </div>
  <div class="data-item">
    <span>{{ userInfo.like_count }}</span>
    <span>获赞</span>
  </div>
</div>
    </div>
    <div class="not-login header" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img  class="img" src="../assets/mobile.png" alt="">
        <span class="text">登录/注册</span>
      </div>
    </div>
    <van-grid class="grid-nav" :column-num="2" clickable >
  <van-grid-item text="收藏">
    <i slot="icon" class="iconfont icon-shoucang"></i>
    <span class="text" slot="text">收藏</span>
  </van-grid-item>
  <van-grid-item text="文字">
    <i slot="icon" class="iconfont icon-lishi"></i>
    <span class="text" slot="text">历史</span>
  </van-grid-item>
</van-grid>
<van-cell title="消息通知" is-link />
<van-cell title="小智同学" is-link />
<van-cell class="logout-cell" title="退出登录" clickable @click="fn" center v-if="user"/>
  </div>
</template>

<script>
import { getUserInfo } from '../api/login'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      userInfo: ''
    }
  },
  created () {
    if (this.user) {
      this.loadUser()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadUser () {
      try {
        const data = await getUserInfo()
        // console.log(data)
        this.userInfo = data.data
      } catch (error) {
        console.log(error)
        this.$toast('获取数据失败')
      }
    },
    fn () {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog.confirm({
        title: '确认退出吗？'
      }).then(() => {
        // on confirm
        // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
        this.$store.commit('setUser', null)
      }).catch(() => {
        // on cancel
        console.log('取消执行这里')
      })
    }
  }

}
</script>

<style lang="less" scoped >
.my-con {
  .logout-cell {
  height: 60px;
  text-align: center;
  color: #EB5253;
  margin: 10px 0;
  font-size: 20px;
}
  .header {
    height: 201px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {

   display: flex;
    justify-content: center;
    align-items: center;
   .login-btn {
    display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .img {
        width: 62px;
        height: 62px;
        margin-bottom: 15px;
   }
     .text {
  font-size: 18px;
        color: #fff;
}
   }

  }
  .user-info {
    //background: red;
    .base-info {
      height: 101px;
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between;
      // align-items: center;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 52px;
          height: 52px;
          border: 2px solid #fff;
        }
        .name {
          font-size: 22px;
          color: #fff;
          margin-left: 30px;
        }
      }
    }
    .data {
  display: flex;
  justify-content: space-around;
  .data-item {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    span:nth-child(1) {
      font-size: 26px;
      margin-bottom: 15px;
    }
    span:nth-child(2) {
      font-size: 17px;
    }
  }

}

  }
  .grid-nav {
  background: #fff;
  .iconfont {
    font-size: 25px;
  }
  .icon-shoucang {
    color: #EB5253;
  }
  .icon-lishi {
    color: #FF9D1D;
  }
  .text {
    color: #000;
    margin-top: 8px;
    font-size: 20px;
  }
}

}
</style>
