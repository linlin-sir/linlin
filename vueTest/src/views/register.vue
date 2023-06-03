<template>
  <div>
    <body class="application application-offset">
    <div class="container-fluid container-application">
      <div class="main-content position-relative">
        <!-- Page content -->
        <div class="page-content">
          <div class="min-vh-100 py-5 d-flex align-items-center">
            <div class="w-100">
              <div class="row justify-content-center">
                <div class="col-sm-8 col-lg-4">
                  <div class="card shadow zindex-100 mb-0">
                    <div class="card-body px-md-5 py-5">
                      <div class="mb-5">
                        <h6 class="h3">传智教育-注册</h6>
                      </div>
                      <span class="clearfix"></span>
                      <form role="form" autocomplete="off">
                        <div class="form-group">
                          <label class="form-control-label">账号</label>
                          <div class="input-group input-group-merge">
                            <div class="input-group-prepend">
                              <span class="input-group-text"><i class="bi bi-person"></i></span>
                            </div>
                            <input name="username" type="text" class="form-control" id="input-email" placeholder="请输入账号" v-model ="form.username" />
                          </div>
                        </div>
                        <div class="form-group mb-4">
                          <div class="d-flex align-items-center justify-content-between">
                            <div>
                              <label class="form-control-label">密码</label>
                            </div>
                            <div class="mb-2">
                              <a href="javascript:;" class="small text-muted text-underline--dashed border-primary">忘记密码</a>
                            </div>
                          </div>
                          <div class="input-group input-group-merge">
                            <div class="input-group-prepend">
                              <span class="input-group-text"><i class="bi bi-key"></i></span>
                            </div>
                            <input name="password" type="password" class="form-control" id="input-password" placeholder="请输入密码" v-model ="form.password"/>
                            <div class="input-group-append">
                              <span class="input-group-text">
                                <a href="javascript:;" data-toggle="password-text" data-target="#input-password">
                                  <i class="bi bi-eye-fill text-blue"></i>
                                </a>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="mt-4">
                          <button id="btn-register" type="submit" class="btn btn-sm btn-info btn-icon btn-blue rounded-pill" @click.prevent="Register">
                            <span class="btn-inner--text">注册</span>
                            <span class="btn-inner--icon"><i class="bi bi-arrow-right"></i></span>
                          </button>
                        </div>
                      </form>
                    </div>
                    <div class="card-footer px-md-5"><small>已经注册？</small> <a @click="$router.push('/login')" class="small font-weight-bold text-blue">去登录吧</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </body>
  </div>
</template>

<script>
  import { register } from "@/api/user";
export default {
  name: 'register',
 data() {
  return {
    form: {
      username: '',
      password:'',
    }
   };
  },
  methods: {
    async Register() {
      const res = await register(this.form);
      if (res.message === '注册成功') {
        this.$message.success('注册成功')
        setTimeout(() => {
          this.$router.push('/login')
        }, 3000);
      } 
    }

 }
}
</script>

<style scoped>
.form-control:focus {
  border-color:#e0e6ed;
  box-shadow: none;
}
.form-control, .form-group, .input-group {
  transition: none !important;
}
.text-blue {
  color: #499FEE;
}
.text-blue:hover {
  color: #499FEE;
}
</style>