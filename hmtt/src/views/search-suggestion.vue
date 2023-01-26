<template>
  <div>
    <van-cell  icon="search"  @click="$emit('search', item)" v-for="(item, index) in list" :key="index">
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>

  </div>
</template>

<script>
import { getSearchSuggestion } from '../api/login'
import { debounce } from 'lodash'
export default {
  methods: {
    highlight (item) {
      const highlightStr = `<span class="active">${this.value}</span>`
      const reg = new RegExp(this.value, 'gi')
      return item.replace(reg, highlightStr)
    },
    async  loadlist (q) {
      try {
        const res = await getSearchSuggestion(q)

        this.list = res.data.options
      } catch (error) {

      }
    }
  },
  data () {
    return {
      list: []
    }
  },
  props: {
    value: {
      required: true,
      type: String
    }
  },
  watch: {
    value: {
      handler: debounce(function (val) {
        this.loadlist(val)
      }, 200),

      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.active {
  color: #3296fa;
}

</style>
