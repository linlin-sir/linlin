<template>
  <el-dialog title="新增员工" :visible="isShowDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:88%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:88%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:88%" placeholder="请选择日期" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:88%" placeholder="请选择">
          <el-option
            v-for="item in EmployeeEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:88%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:88%" placeholder="请选择部门" @focus="isShowTree = true" />
        <el-tree
          v-if="isShowTree"
          default-expand-all
          :data="depts"
          :props="{label: 'name'}"
          @node-click="deptSelect"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:88%" placeholder="请选择日期" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import EmployeeEnum from '@/constant/employees'
// 获取部门列表api
import { getDepartments } from '@/api/departments'
// 树形转换递归工具函数
import { listToTree } from '@/utils'
import { addEmployee } from '@/api/employees'
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowTree: false,
      EmployeeEnum,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      }
    }
  },
  async created() {
    const { depts } = await getDepartments()
    this.depts = listToTree(depts, '')
  },
  methods: {
    // 部门选中后续操作
    deptSelect(data) {
      this.formData.departmentName = data.name
      this.isShowTree = false
    },
    async btnOK() {
      // 校验表单
      await this.$refs.form.validate()
      // 发送请求
      await addEmployee(this.formData)
      // 提示用户
      this.$message.success('操作成功')
      // 更新页面 $parent 是获取父组件的实例this, 直接可以控制值父组件的数据和函数
      this.$parent.isShowDialog = false
      // 关闭弹窗
      this.$parent.loadPage()
    },
    btnCancel() {
      // 清理数据
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      // 清理报错
      this.$refs.form.resetFields()
      // 关闭弹窗
      this.$parent.isShowDialog = false
    }
  }
}
</script>
<style lang="scss" scoped>
.el-tree {
  width: 88%;
  border: 1px solid #ccc;
  position: absolute;
  z-index: 9;
  height: 200px;
  overflow: auto;
}
</style>
