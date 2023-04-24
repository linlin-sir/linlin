<template>
  <div>
    <!-- 准备有高度的 dom -->
    <div ref="echarts" style="height: 400px" />
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { RadarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([RadarChart, CanvasRenderer])
export default {
  // created() {
  //   需要写在 mounted 才能够获取到 dom
  //   console.log(this.$refs.echarts)
  // }
  mounted() {
    // 使用第三方库初始化实例
    const myChart = echarts.init(this.$refs.echarts)

    // 配置画图
    myChart.setOption({
      textStyle: {
        fontSize: 16,
        color: '#ffc0cb'
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'Sales', max: 6500 },
          { name: 'Administration', max: 16000 },
          { name: 'Information Technology', max: 30000 },
          { name: 'Customer Support', max: 38000 },
          { name: 'Development', max: 52000 },
          { name: 'Marketing', max: 25000 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget'
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: 'Actual Spending'
            }
          ]
        }
      ]
    })
  }
}
</script>

  <style>

  </style>
