<template>
  <div ref="myDiv" class="radar-echart" />
</template>
<script>
// 回顾以前如何使用echarts
// 1. 在html的script的src里面引入echarts.js
// 2. 挂载的容器，并且给id
// 3. 实例化一个echarts实例 let echart = echarts.init(document.getElementById(id))
// 4. 绘制 （给配置  echart.setOption(配置)  ）
import * as Echarts from 'echarts'  // 从echarts的5版本开始，没有默认导出  (导入所有的echarts配置， 按需的导入配置)
// 导入基础配置
import RadarData from './radar-data'
export default {
  name: 'Radar',
  mounted() {
    // 实例化一个echarts实例对象
    this.echarts = Echarts.init(this.$refs.myDiv)
    // 绘制的是基础结构，没有核心数据
    this.echarts.setOption(RadarData)
    // 调用
    this.initData()
  },
  methods: {
    initData() {
      // 发生ajax请求获取数据
      setTimeout(() => {
        // resData 是服务器端返回的数据
        let resData = [
          {
            value: [10, 1, 100, 5, 100, 0],
            name: "张三",
          },
          {
            value: [50, 50, 50, 50, 50, 10],
            name: "李四",
          },
        ]
        // 重回绘制(重新调用setOption)
        RadarData.series[0].data = resData
        this.echarts.setOption(RadarData)
      }, 3000)
    }
  }
}
</script>
<style lang='scss' scoped>
.radar-echart {
  width: 600px;
  height: 400px;
}
</style>