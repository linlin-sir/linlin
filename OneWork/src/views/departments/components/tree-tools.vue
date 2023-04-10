<template>
  <el-row type="flex" justify="space-between" align="middle" style="width: 100%; height: 40px">
    <el-col>
      <strong v-if="isCompany">{{ nodeData.name }}</strong>
      <span v-else>{{ nodeData.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ nodeData.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown>
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="showAddDialog">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isCompany" @click.native="showEditDialog">修改部门</el-dropdown-item>
              <el-dropdown-item v-if="!isCompany" @click.native="delDepartments">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    nodeData: {
      type: Object,
      required: true
    },
    isCompany: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    showAddDialog() {
      // 谁被点击, 就将自己数据对象往外传
      this.$emit('showAddDialog', this.nodeData)
    },
    showEditDialog() {
      this.$emit('showEditDialog', this.nodeData)
    },
    async delDepartments() {
      // 二次询问弹窗
      await this.$confirm('是否确认删除')
      // 发请求
      await delDepartments(this.nodeData.id)
      // 提示框
      this.$message.success('删除成功')
      // 更新页面重新渲染
      this.$emit('reload')
    }
  }
}
</script>

<style>

</style>
