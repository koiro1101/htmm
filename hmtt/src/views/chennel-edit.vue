<template>
  <div class="chennel-edit">
    <van-cell title="我的频道" class="title_text" :border="false">
      <van-button
        size="mini"
        round
        type="danger"
        plain
        class="edit-btn"
        @click="isEdi=!isEdi"
      >{{ isEdi==false ? '编辑':"完成" }}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="a">
      <van-grid-item
      icon="close"
        class="grid-item "
        v-for="(x,y) in channelList"
        :key="y"
        @click="onMyChannels(x,y)"

      >
      <van-icon slot="icon" name="clear" class="b" v-show="isEdi && !fexchannel.includes(x.id)"></van-icon>
      <span slot="text" class="text" :class="{active: y===active}">{{ x.name }}</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" class="title_text" :border="false"></van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
      icon="plus"
        class="grid-item "
        v-for="(x,y) in rec"
        :key="y"
        :text="x.name"
        @click="tj(x)"
      />
    </van-grid>
  </div>
</template>

<script>

import { getAllChannels, addUserChannel, deleteUserChannel } from '../api/allChannels'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  data () {
    return {
      list: [],
      isEdi: false,
      fexchannel: [0]
    }
  },
  computed: {
    rec () {
      return this.list.filter(x => {
        return !this.channelList.find(z => {
          return x.id === z.id
        })
      })
    },
    ...mapState(['user'])
  },
  created () {
    this.loadAllchnnels()
  },

  methods: {
    async deleteChannel (channel) {
      try {
        if (this.user) {
          // 已登录，将数据存储到线上
          await deleteUserChannel(channel.id)
          this.$toast('删除频道成功')
        } else {
          // 未登录，将数据存储到本地
          setItem('TOUTIAO_CHANNELS', this.channelList)
        }
      } catch (err) {
        console.log(err)
        this.$toast('删除频道失败，请稍后重试')
      }
    },
    onMyChannels (x, y) {
      if (this.isEdi) {
        if (this.fexchannel.includes(y)) return
        if (y <= this.active) {
          this.$emit('onMyChannels', this.active - 1, true)
        }
        this.channelList.splice(y, 1)
        this.deleteChannel(x)
      } else {
        this.$emit('onMyChannels', y, false)
      }
    },
    async tj (x) {
      this.channelList.push(x)
      if (this.user) {
        try {
          // 已登录，数据存储到线上
          await addUserChannel({
            id: x.id, // 频道 id
            seq: this.channelList.length // 频道的 序号
          })
          this.$toast('添加成功')
        } catch (err) {
          this.$toast('保存失败')
        }
      } else {
        // 未登陆
        setItem('TOUTIAO_CHANNELS', this.channelList)
        console.log(this.channelList)
      }
    },
    async loadAllchnnels () {
      try {
        const res = await getAllChannels()
        console.log(res)
        this.list = res.data.channels
      } catch (error) {
        console.log(error, 1)
      }
    }
  },
  props: {
    channelList: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.chennel-edit {
  padding-top: 60px;
  .title_text{
    font-size: 18px;
    color:#333;
  }
  .edit-btn{
    width: 52px;
    height: 24px;
    font-size: 12px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.van-grid-item__content {
      background-color: #f5f5f6;
      white-space: nowrap;
      .van-grid-item__text {
        color: #222;
        font-size: 14px;
        margin-top: 0;
      }
      .active {
          color: red;
        }
        .van-grid-item__icon-wrapper {
         .b{
          position: absolute;
          top: -20px;
          right: -40px;
          // color: #fff;
         }

  }
    }
    /deep/ .recommend-grid {
    .van-grid-item__content {
        flex-direction: row;
        color: #222;
        .van-icon {
            font-size: 12px;
        }

        .van-grid-item__text {
            font-size: 10px;
            margin-top: 0;
        }

    }

}
/deep/ .van-icon-close {
    position: absolute;
    right: -10px;
    top: -10px;
    font-size: 16px;
    color: #ccc;
}
.a  {
      font-size: 10px !important;
    }
}

</style>
