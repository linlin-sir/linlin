<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <!-- 添加顶级权限 带上 pid '0' type 1 -->
          <el-button type="primary" size="small" @click="addPermission('0', 1)">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <!-- row-key 是表格渲染树形必备属性, 指每行数据对象中唯一属性值名称 -->
      <el-table :data="list" border="" row-key="id" default-expand-all>
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button v-if="row.type === 1" type="text" @click="addPermission(row.id, 2)">添加</el-button>
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)"> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog :title="`${formData.id?'编辑':'新增'}权限点`" :visible="isShowDialog" @close="btnCancel">
        <!-- 表单 -->
        <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width:90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOK">确定</el-button>
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { getPermissionList, addPermission, getPermissionDetail, updatePermission, delPermission } from '@/api/permission'
// 权限要树形结构, 引入递归处理函数
import { listToTree } from '@/utils'
export default {
  data() {
    return {
      list: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '1' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      isShowDialog: false
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const res = await getPermissionList()
      // 因为是树形数据, 经过递归转换, 而且通过后端数据观察, 顶级权限的pid是字符串 '0'
      this.list = listToTree(res, '0')
      console.log(this.list)
    },
    async btnOK() {
      // 校验表单
      await this.$refs.perForm.validate()
      // 发请求
      this.formData.id ? await updatePermission(this.formData) : await addPermission(this.formData)
      // 提示用户
      this.$message.success('操作成功')
      // 关闭弹窗
      this.isShowDialog = false
      // 渲染页面
      this.getPermissionList()
    },
    btnCancel() {
      // 清理数据
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '1' // 开启
      }
      // 清理校验
      this.$refs.perForm.resetFields()
      // 关闭弹窗
      this.isShowDialog = false
    },
    // 打开新增弹窗
    addPermission(pid, type) {
      // 将点击时获取的 pid 和 type 复制到 formData 中
      this.formData = {
        ...this.formData,
        pid,
        type
      }
      this.isShowDialog = true
    },
    async editPermission(id) {
      // 数据回显
      this.formData = await getPermissionDetail(id)
      this.isShowDialog = true
    },
    async delPermission(id) {
      // 二次询问
      await this.$confirm('?')
      // 发请求
      await delPermission(id)
      // 渲染页面
      this.getPermissionList()
      // 提示用户
      this.$message.success('删除成功')
    }
  }
}
</script>

<style>

</style>
