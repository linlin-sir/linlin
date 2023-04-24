<template>
  <div class="login-page">
    <van-nav-bar title="面经注册" />
    <van-form @submit="onSubmit" autocomplete="off">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button block type="primary" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <router-link class="link" to="/login">有账号，去登录</router-link>
  </div>
</template>
<script>
import {registerAPI} from "@/api/user";
export default {
  name: "register-page",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
   async onSubmit(values) {
    //   console.log("submit", values);
    //   request({ url: '/h5/user/register', method: 'post', data: values });
    //  this.$toast('bbbb')
      const res = await registerAPI(values)
      if (res.data.code === 10000) {
        this.$toast('注册成功')
        setTimeout(() => {
          this.$router.push('/login')
        },3000)
    }
    },
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
