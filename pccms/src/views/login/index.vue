<template>
  <div class="login-page">
    <el-card>
      <template #header>黑马面经运营后台</template>
      <el-form
        autocomplete="off"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            placeholder="输入用户名"
            v-model="ruleForm.username"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="输入用户密码"
            v-model="ruleForm.password"
          ></el-input>
        </el-form-item>

        <el-form class="tc">
          <el-button type="primary" @click="submitForm">登 录</el-button>
          <el-button @click="resetForm">重 置</el-button>
        </el-form>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "login-page",
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions('user',['login']),
    async submitForm () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          await this.login(this.ruleForm)
          this.$message.success('登陆成功')
          setTimeout(() => {
            this.$router.push({path:'/'})
          }, 3000);
        } else {
         this.$message.warning('输入的格式不正确')
      }
    })
  },
    resetForm() {
        this.$refs.ruleForm.resetFields();
      },
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: url(@/assets/login-bg.svg) no-repeat center / cover;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .el-card {
    width: 420px;
    ::v-deep .el-card__header {
      height: 80px;
      background: rgba(114, 124, 245, 1);
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
    }
  }
  .el-form {
    padding: 0 20px;
  }
  .tc {
    text-align: center;
  }
}
</style>