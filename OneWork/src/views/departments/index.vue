<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局显示顶部公司 -->
        <tree-tools :node-data="companyInfo" :is-company="true" @showAddDialog="showAddDialog" />
        <!-- 分割线 -->
        <hr>
        <!-- 部门树形列表 -->
        <el-tree :data="depts" default-expand-all>
          <template v-slot="scope">
            <tree-tools
              :node-data="scope.data"
              :is-company="false"
              @showAddDialog="showAddDialog"
              @showEditDialog="showEditDialog"
              @reload="loadPage"
            />
          </template>
        </el-tree>
      </el-card>
      <!-- 添加弹窗组件 -->
      <add-depts
        ref="addDepts"
        :node-data="nodeData"
        :is-show-dialog="isShowDialog"
        @reload="loadPage"
        @closeDialog="isShowDialog = false"
      />
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDepts from './components/add-depts.vue'
import { getDepartments } from '@/api/departments'
import { listToTree } from '@/utils'

export default {
  components: {
    TreeTools,
    AddDepts
  },
  data() {
    return {
      companyInfo: {
        name: '传智播客黑马程序员',
        manager: '负责人',
        // 由于后面添加部门的时候, 顶级部门跟在公司后面pid都是''空字符串
        // 这里给个 id 方便后面读取
        id: ''
      },
      depts: [],
      isShowDialog: false,
      // 临时储存被点击的对象
      nodeData: {}
    }
  },
  created() {
    this.loadPage()
  },
  methods: {
    async loadPage() {
      const { depts } = await getDepartments()
      this.depts = listToTree(depts, '')
    },
    showAddDialog(nodeData) {
      this.isShowDialog = true
      // 树形行组件, 被点击时, 被点击的对象往外传,
      // 父组件暂存传给弹窗
      this.nodeData = nodeData
    },
    showEditDialog(nodeData) {
      // 记得在弹窗时获取旧数据
      // 显示编辑弹窗
      // 这个地方要触发弹窗的数据回显
      // 填充逻辑写在弹窗组件, 在这里进行调用
      // 注意因为点击的数据不一定完整, 索要要发请求获取最新详情
      // 如何调用子组件的函数呢? 先用 ref 取得子组件实例, 就可以直接链式调用执行
      // this.nodeData = nodeData
      this.$refs.addDepts.getDepartDetail(nodeData.id)
      this.isShowDialog = true
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
