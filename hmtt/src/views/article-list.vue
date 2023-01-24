<template>
  <div class="artcile-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-duration="1500"
     :success-text="refreshSuccessText">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <ArticleItem v-for="(item,index) in list" :key="index"  :article="item"/>
    </van-list>
  </van-pull-refresh>
  </div>
</template>

<script>
import { getUserArticle } from '../api/login'
import ArticleItem from './article-item.vue'
export default {
  components: { ArticleItem },
  props: {
    channels: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: 1556789000001,
      error: false,
      isLoading: false,
      refreshSuccessText: '刷新成功'
    }
  },
  methods: {
    async onRefresh () {
      try {
        const res = await getUserArticle({
          channel_id: this.channels.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const results = res.data.results
        this.list.unshift(...results)
        // 3. 关闭下拉刷新的 loading 状态
        this.isLoading = false
        if (!results.length) {
          this.refreshSuccessText = '暂无新数据'
        } else {
          this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
        }
      } catch (error) {
        this.isRefreshLoading = false // 关闭下拉刷新的 loading 状态
        this.$toast('刷新失败')
      }
    },
    // 初始化或滚动到底部的时候会触发调用 onLoad
    async  onLoad () {
      try {
        const res = await getUserArticle({
          channel_id: this.channels.id,
          timestamp: this.timestamp,
          with_top: 1
        })
        // if (Math.random() > 0.5) {
        //   JSON.parse('DADADAAD')
        // }
        const result = res.data.results
        // console.log(res)
        this.list.push(...result)
        this.loading = false
        if (result.length) {
          this.timestamp += 1
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.artcile-list {
  height: 99vh;
  overflow: auto;
}
</style>
