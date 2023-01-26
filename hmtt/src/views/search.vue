<template>
  <div class="serach-con">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @focus="isRes=false"
      />
    </form>
    <SearchResult v-if="isRes" :value="value"></SearchResult>
    <SearchSuggestion @search="onSearch" v-else-if="value" :value="value"></SearchSuggestion>
    <SearchHistory v-else :SearchHis="SearchHis" @clear="SearchHis=[]" @search="onSearch"> </SearchHistory>

  </div>
</template>

<script>

import SearchResult from './search-result.vue'
import SearchHistory from './search-history.vue'
import SearchSuggestion from './search-suggestion.vue'
import { getItem, setItem } from '../utils/storage'

export default {
  components: { SearchResult, SearchHistory, SearchSuggestion },
  watch: {
    SearchHis (val) {
      setItem('a', val)
    }
  },
  methods: {

    onSearch (val) {
      this.value = val

      const index = this.SearchHis.indexOf(val)
      if (index !== -1) {
        this.SearchHis.splice(index, 1)
      }
      this.SearchHis.unshift(val)
      this.isRes = true
    },
    onCancel () { this.$router.back() }
  },
  data () {
    return {
      value: '',
      isRes: false,
      SearchHis: getItem('a') || []
    }
  }
}
</script>

<style lang="less" scoped>
.serach-con {
  padding-top: 53px;
    .van-search {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }
    .van-search__action {
        color: #fff;
    }
}

</style>
