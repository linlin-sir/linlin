<script setup lang="ts">
// vue自身相关
import { ref, onUnmounted } from 'vue'
import { showToast } from 'vant'
// vue路由相关
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
// 接口引入
import { loginByPassword, sendMobileCode, loginByMobile } from '@/services/user'
// pinna相关
import { useUserStore } from '@/stores'
const store = useUserStore()
// 规则相关
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'

const mobile = ref('13230000078')
const password = ref('abc12345')
const agree = ref(false)
const isPass = ref(true)
const code = ref('')
const time = ref(0)
let timeId: number
const show = ref(false)
// 倒计时
timeId = window.setInterval(() => {
  time.value--
  if (time.value <= 0) window.clearInterval(timeId)
}, 1000)

onUnmounted(() => {
  window.clearInterval(timeId)
})

const send = async () => {
  // 正在倒计时 马上返回
  if (time.value > 0) return
  const res = await sendMobileCode(mobile.value, 'login')
  // 这里没有真的发短信, 将后台的返回值直接填入输入框
  code.value = res.data.code
  // 开始倒计时
  time.value = 60
  timeId = setInterval(() => {
    time.value--
    if (time.value <= 0) window.clearInterval(timeId)
  }, 1000)
}

const login = async () => {
  if (!agree.value) return showToast('请勾选我已同意')
  const res = isPass.value
    ? await loginByPassword(mobile.value, password.value)
    : await loginByMobile(mobile.value, code.value)
  store.setUser(res.data)
  showToast('登陆成功')
  setTimeout(() => {
    router.push((route.query.returnUrl as string) || '/user')
  }, 3000)
}
</script>

<template>
  <div class="login-page">
    <cp-nav-bar right-text="注册" @click-right="router.push('/')"></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ !isPass ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" @submit="login">
      <van-field
        v-model="mobile"
        :rules="mobileRules"
        name="mobile"
        placeholder="请输入手机号"
        type="tel"
      ></van-field>
      <van-field
        v-if="isPass"
        v-model="password"
        :rules="passwordRules"
        placeholder="请输入密码"
        :type="show ? 'text' : 'password'"
      >
        <template #button>
          <cp-icon
            @click="show = !show"
            :name="`login-eye-${show ? 'on' : 'off'}`"
          ></cp-icon>
        </template>
      </van-field>
      <van-field
        v-else
        v-model="code"
        :rules="codeRules"
        placeholder="短信验证码"
      >
        <template #button>
          <span class="btn-send" :class="{ active: time > 0 }" @click="send">{{
            time > 0 ? `等待${time}秒后重发` : '发送验证码'
          }}</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit"
          >登 录</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }

  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;

    h3 {
      font-weight: normal;
      font-size: 24px;
    }

    a {
      font-size: 15px;
    }
  }

  &-other {
    margin-top: 60px;
    padding: 0 30px;

    .icon {
      display: flex;
      justify-content: center;

      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 14px;

  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }

  .btn-send {
    color: var(--cp-primary);

    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
