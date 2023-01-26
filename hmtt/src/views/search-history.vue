<template>
  <div>
    <van-cell title="搜索历史">
      <div v-if="isshow">
        <span @click="$emit('clear')">全部删除</span> &nbsp;&nbsp;&nbsp;
        <span @click="isshow=false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isshow=true"/>
    </van-cell>
    <van-cell @click="onsearch(item,index)" :title="item" v-for="(item, index) in SearchHis" :key="index">
      <van-icon name="close" v-if="isshow"/>
    </van-cell>

  </div>
</template>

<script>
export default {
  methods: {
    onsearch (x, y) {
      if (this.isshow) {
        this.SearchHis.splice(y, 1)
      } else {
        this.$emit('search', x)
      }
    }
  },
  data () {
    return {
      isshow: false
    }
  },
  props: {
    SearchHis: {
      required: true,
      type: Array
    }
  }
}
</script>

<style>

</style>
