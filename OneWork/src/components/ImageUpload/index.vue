<template>
  <div>
    <!-- 上传组件属性 -->
    <!--
      必备数据
        action 必传参数, 上传地址, 可是咱们没有上传地址, 给了个哪里都不传递的 #, 后面真正对接时再处理
        file-list 管理图片文件数组, 注意没有双向绑定, 实际发生变化需要钩子函数处理
      样式相关
        list-type 控制文件列表样式
        :class 是动态类名, 如果图片已经到达规定的数量,添加类名隐藏上传按钮
      钩子函数
        :on-remove 是在删除的时间节点会被执行
        :on-change 是在文件列表改变时执行(处理添加功能)
        :http-request 实际上传时执行的函数, 可以接管 action 路径 (到时腾讯云服务就在这里对接)
     -->
    <!-- 动态class的写法以key:value的形式指定, 需要的类名: 出现类名的判断标准 -->
    <el-upload
      action="#"
      :file-list="fileList"

      :class="{disabled: fileList.length >= 1}"
      list-type="picture-card"

      :on-remove="onRemove"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
  </div>
</template>

<script>
var COS = require('cos-js-sdk-v5')

// SECRETID 和 SECRETKEY 请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
var cos = new COS({
  SecretId: 'AKIDxiKueEZfZIsJa2LTUIrDOYhkfPxQo6Kq',
  SecretKey: 'VqacaWUYXVZP7oZCtRp0CIRdigcfeYQ7'
})
// 小写cos实例就是用来上传的工具了
export default {
  data() {
    return {
      fileList: [
        // { url: 'https://ts1.cn.mm.bing.net/th/id/R-C.8efa0ce1e1d5939425ba5e881f440751?rik=9P%2bJKQhR%2fzTd%2fg&riu=http%3a%2f%2fpic11.nipic.com%2f20100803%2f4038389_093502059852_2.jpg&ehk=SjhFNoS3UcNwLpK9oueJIn6pF%2boCKoFp%2bzuAJ1n6J2w%3d&risl=&pid=ImgRaw&r=0' }
      ]
    }
  },
  methods: {
    onRemove(file, newFileList) {
      // 虽然删除图片时,没有自动帮你处理数组删除,
      // 但是回想处理过后的数据作为参数交给你
      console.log(file)
      console.log(newFileList)
      this.fileList = newFileList
    },
    onChange(file, newFileList) {
      // 文件状态发生变化, 组件库执行这个函数, 带上 file 当前处理文件本身, fileList 最新的文件列表
      this.fileList = newFileList
    },
    beforeUpload(file) {
      console.log('上传前验证', file)
      // 验证图片大小和格式
      // 如果有问题, 通过返回 false 可以阻止上传动作

      // 验证一, 文件类型
      const whiteList = ['image/jpeg', 'image/png', 'image/gif']
      if (!whiteList.includes(file.type)) {
        this.$message.error('只支持 jpeg / png / gif 格式')
        return false
      }

      // 验证二, 文件大小
      const maxSize = 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片不能超过 1M')
        return false
      }

      // 并非必须, 只是给后续程序员提个醒, 走到这就算是成功
      return true
    },
    upload({ file }) {
      // 这个函数可以接收到当前上传请求的各项配置
      // params.file 才是正在上传的图片本地
      console.log('上传文件', file)

      // 使用腾讯云开发工具库
      cos.putObject({
        Bucket: 'linlin-1317783269', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-beijing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: Date.now() + '', /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
      }, (err, data) => {
        // 上传结束回调函数
        if (err) {
          console.log(err)
        } else {
          console.log('上传成功')
          console.log(data)
          // 这里已经上传完毕, 图片在线公网地址在 data.Location
          // 如果限定只有一张图片, 不去查找而是直接用第0张也是可以的啦
          // const currentImg = this.fileList[0]
          this.fileList[0].url = 'http://' + data.Location
          this.fileList[0].status = 'success'

          // 下面的方法可以适配多张图片的上传
          // const currentImg = this.fileList.find(item => item.uid === file.uid)
          // currentImg.url = 'http://' + data.Location
          // currentImg.status = 'success'
        }
      })
    }
  }
}
</script>

<style lang="scss">
.disabled {
  // 有图片, 自动有这个动态类名
  // 有这个动态类名, 下方包裹的上传按钮应该隐藏
  .el-upload--picture-card {
    display: none;
  }
}
</style>
