<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="isShowDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="form" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择">
          <el-option v-for="item in userList" :key="item.id" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getEmployeeSimple } from '@/api/employees'
import { addDept, getDepartDetail, updateDepartments, getDepartments } from '@/api/departments'
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      required: true
    },
    nodeData: {
      type: Object,
      require: true
    }
  },
  data() {
    const checkRepeatCode = async(rule, val, callback) => {
      // 自己判断是否有重复
      const { depts } = await getDepartments()
      const res = depts.find(item => item.code === val)
      // // 逻辑
      // 这里要注意如果是编辑的情况下, 需要注意不要跟自己报重复的错
      // 两个条件必须同时成立, 1, 有重复的对象, 2. 重复的对象id不能跟当前编辑的一样
      if (res && (res.id !== this.formData.id)) {
        callback(new Error('不能重复'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkRepeatCode }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }
        ]
      },
      userList: []
    }
  },
  async created() {
    this.userList = await getEmployeeSimple()
  },
  methods: {
    async btnOK() {
      await this.$refs.form.validate()
      if (this.formData.id) {
        // 编辑
        await updateDepartments(this.formData)
      } else {
        // 新增
        await addDept({
          ...this.formData,
          pid: this.nodeData.id
        })
      }
      this.$message.success('操作成功')
      this.$emit('closeDialog')
      this.$emit('reload')
    },
    btnCancel() {
      // 清理数据
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
      // 清理报错
      this.$refs.form.resetFields()
      // 关闭弹窗
      this.$emit('closeDialog')
    },
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    }
  }
}
</script>

<style></style>
