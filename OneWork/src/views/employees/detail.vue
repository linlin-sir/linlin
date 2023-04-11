<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">

            <!-- 放置表单 -->
            <el-form ref="form" :model="formData" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="formData.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="formData.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submit">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情"><UserInfo /></el-tab-pane>
          <el-tab-pane label="岗位信息"><JobInfo /></el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import JobInfo from './components/job-info.vue'
import UserInfo from './components/user-info.vue'
export default {
  components: {
    JobInfo,
    UserInfo
  },
  data() {
    return {
      // 每当页面进来获取用户 id
      userId: this.$route.params.id,
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '该项必填', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '该项必填', trigger: 'blur' }
        ]
      }
    }
  },

  async created() {
    this.formData = {
      ...await getUserDetailById(this.userId),
      password: ''
    }
  },

  methods: {
    async submit() {
      await this.$refs.form.validate()
      await saveUserDetailById(this.formData)
      this.$message.success('修改成功')
    }
  }
}
</script>

<style></style>
