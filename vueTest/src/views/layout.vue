<template>
  <div>
    <body class="application application-offset">
    <div class="container-fluid container-application">
      <div class="sidenav show" id="sidenav-main">
        <!-- Sidenav header -->
        <div class="sidenav-header d-flex align-items-center">
          <a class="navbar-brand" href="./index.html">
            <span class="logo">·ITCAST·</span>
          </a>
        </div>
        <!-- User mini profile -->
        <div
          class="sidenav-user d-flex flex-column align-items-center justify-content-between text-center"
        >
          <!-- Avatar -->
          <div>
            <a href="#" class="avatar rounded-circle avatar-xl">
              <img
                alt="Image placeholder"
                src="https://yanxuan-item.nosdn.127.net/8b27deb1670c53e67c42ca3e1ed6fd12.jpg"
                class=""
              />
            </a>
            <div class="mt-5">
              <h5 class="mb-0 text-white">黑马前端</h5>
              <span class="d-block text-sm text-white opacity-8 mb-3"
                >数据可视化</span
              >
              <a
                href="javascript:;"
                class="btn btn-sm btn-white btn-icon rounded-pill shadow hover-translate-y-n3"
              >
                <span class="btn-inner--text">学前端来黑马</span>
              </a>
            </div>
          </div>
        </div>
        <!-- Application nav -->
        <div class="nav-application clearfix">
          <a class="btn btn-square text-sm " :class="{active:active==='active1'?true:false}"  @click.prevent="$router.push('/dashboard'),active='active1'" >
            <span class="btn-inner--icon d-block"
              ><i class="bi bi-house bi-2x"></i
            ></span>
            <span class="btn-inner--icon d-block pt-2">首页</span>
          </a>
          <a class="btn btn-square text-sm" :class="{active:active==='active2'?true:false}" @click.prevent="$router.push('/article'),active='active2'">
            <span class="btn-inner--icon d-block"
              ><i class="bi bi-people bi-2x"></i
            ></span>
            <span class="btn-inner--icon d-block pt-2">学生</span>
          </a>
          <a href="javascript:;" class="btn btn-square text-sm">
            <span class="btn-inner--icon d-block"
              ><i class="bi bi-columns bi-2x"></i
            ></span>
            <span class="btn-inner--icon d-block pt-2">排版</span>
          </a>
          <a href="javascript:;" class="btn btn-square text-sm">
            <span class="btn-inner--icon d-block"
              ><i class="bi bi-files bi-2x"></i
            ></span>
            <span class="btn-inner--icon d-block pt-2">资料</span>
          </a>
          <a href="javascript:;" class="btn btn-square text-sm">
            <span class="btn-inner--icon d-block"
              ><i class="bi bi-receipt bi-2x"></i
            ></span>
            <span class="btn-inner--icon d-block pt-2">就业</span>
          </a>
          <a href="javascript:;" class="btn btn-square text-sm">
            <span class="btn-inner--icon d-block"
              ><i class="bi bi-gear bi-2x"></i
            ></span>
            <span class="btn-inner--icon d-block pt-2">设置</span>
          </a>
        </div>
        <!-- Misc area -->
        <div class="card bg-gradient-warning">
          <div class="card-body">
            <h5 class="text-white">哈喽, 朋友!</h5>
            <p class="text-white mb-4">
              为什么不现在开始学习前端，创造一些令人惊叹的东西呢？
            </p>
            <a
              href="http://itcast.cn"
              class="btn btn-sm btn-block btn-white rounded-pill"
              target="_blank"
              >Get started</a
            >
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </body>
  </div>
</template>
<script>
export default {
  name: 'layout-page',
  data() {
    return {
    active:'active1'
    };
  },
  methods:{
    
  }
  
}
</script>

<style scoped>
.card-stats .bi{
  width: 50px;
  height: 50px;
  display: block;
  background-color: #e4e4e4;
  color: #fff;
  border-radius: 50%;
  line-height: 50px;
  text-align: center;
  font-size: 24px;
  margin-top: 4px;
}
</style>