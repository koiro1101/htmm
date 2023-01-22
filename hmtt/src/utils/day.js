import dayjs from 'dayjs'
import Vue from 'vue'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')

// console.log(dayjs().from(dayjs('1990')))

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
