<template>
  <div class="wrapper">
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
import { importEmployees } from '@/api/employees'
export default {
  methods: {
    async onSuccess({ header, results }) {
      // 这个函数会在excel 文件读取完毕的 时候调用
      // 自动获取到, 表头, 行数据

      // 将获取到的中文用户数组, 翻译成英文用户数组
      const data = results.map(item => {
        const user = {}
        user.mobile = item['手机号']
        user.username = item['姓名']
        // item['入职日期'] 是专用的五位数记录法
        // this.formatExcelTime() 函数可以将它转成 2023-01-02 这种字符串格式
        // 交给 new Date() 生成一个 js 自带的日期对象数据 (后端的需求)
        user.timeOfEntry = new Date(this.formatExcelTime(item['入职日期']))
        user.correctionTime = new Date(this.formatExcelTime(item['转正日期']))
        user.workNumber = item['工号']
        return user
      })

      await importEmployees(data)
      this.$message.success('导入成功')
      this.$router.back()
    },
    // 专门转换 excel 日期数据
    formatExcelTime(num, format = '-') {
      num = Number(num)	// 强制类型转化，以防传来的值是字符串
      let millisecond = 0	// 转化后的毫秒数
      if (num > 60) {
        millisecond = (num - 25569) * 60 * 60 * 24 * 1000
      } else {
        millisecond = (num - 25568) * 60 * 60 * 24 * 1000
      }
      const date = new Date(millisecond)	// 根据转化后的毫秒数获取对应的时间
      const yy = date.getFullYear()
      const mm = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      const dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return yy + format + mm + format + dd	// 返回格式化后的日期
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
