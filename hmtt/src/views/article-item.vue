<template>
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image
          class="cover-item-img"
            width="100"
            height="100"
            :src="img"
          />
        </div>
      </div>
      <div class="label-info-wrap">
        <span >{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image class="right-cover"
      v-if="article.cover.type === 1"
      slot="default"
      width="100"
      height="100"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      rewuired: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item:nth-child(1){
  margin-top: 85px;
}
.article-item {
  // padding-top: 100px;

  .title {
    font-size: 16px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 132px;
    height: 126px;
    padding-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 12px;
    color: #b4b4b4;
    margin-right: 10px;
  }

  .cover-wrap {
    display: flex;
    padding: 10px 0;
    .cover-item {
      flex: 1;
      height: 120px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}

</style>
