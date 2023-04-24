<template>
  <div class="login-page">
    <!-- 导航栏部分 -->
    <van-nav-bar title="面经登录" />
    <van-form @submit="onSubmit" autocomplete="off">
      <!-- 输入框组件 -->
      <!-- \w 字母数字_ \d 数字0-9 -->
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[
          { required: true, message: '请填写用户名' },
          { pattern: /^\w{5,}$/, message: '用户名至少包含5个字符' },
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^\w{6,}$/, message: '密码至少包含6个字符' },
        ]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <router-link class="link" to="/register">没有账号,去注册。</router-link>
  </div>
</template>
<script>
import { loginAPI } from "@/api/user";
import {setToken} from "@/utils/storage";
export default {
  name: "login-page",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit (values) {
    //   console.log("submit", values);
    //   request({ url: '/h5/user/register', method: 'post', data: values });
    //  this.$toast('bbbb')
      const res = await loginAPI(values)
      if (res.data.code === 10000) {
        this.$toast('登录成功')
        setToken(res.data.data.token)
        setTimeout(() => {
          this.$router.push('/')
        },3000)
    }
    
}

  },
};
</script>
<style lang="less" scoped>
.link {
  color: #069;
  font-size: 12px;
  padding-right: 20px;
  float: right;
}
</style>