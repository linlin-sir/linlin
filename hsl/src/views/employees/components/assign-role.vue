<template>
  <el-dialog title="分配角色" :visible="isShowRoleDialog" @close="btnCancel">
    <!-- el-checkbox-group选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色-->
    <el-checkbox-group v-model="checkList">
      <!-- 选项 -->
      <!-- label 是被选中后存入 v-model 的数据
      而插槽则是渲染给用户看的文字 -->
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { getRoleList } from '@/api/setting'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    isShowRoleDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 所有角色数组
      roleList: [],
      // 选中的数组
      checkList: [],
      // 当前正在编辑的用户id
      userId: ''
    }
  },
  async created() {
    // 取得所有的角色列表放入 roleList 渲染多选框组
    const { rows } = await getRoleList({
      page: 1,
      pagesize: 999
    })
    console.log('所有角色列表', rows)
    this.roleList = rows
  },
  methods: {
    async getUserDetail(id) {
      // 父组件点击角色时, 带上id调用这个函数取得员工旧数据
      // 其中roleIds是这个员工的身份信息, 放入checkList里面可以默认选中
      const { roleIds } = await getUserDetailById(id)
      this.checkList = roleIds
      // 顺便把 id 记下来, 后面点击确定的时候发请求需要
      this.userId = id
    },
    async btnOK() {
      // 当前多选框组由checkList储存被选中的选项, 就是最新身份
      await assignRoles({
        id: this.userId,
        roleIds: this.checkList
      })
      this.$message.success('修改成功')
      this.$emit('closeDialog')
    },
    btnCancel() {
      // 清理数据
      this.checkList = []
      // 清理报错(没有校验不需要)
      // 关闭弹窗
      this.$emit('closeDialog')
    }
  }
}
</script>
