<template>
  <div>
    <div class="main-content position-relative">
        <nav class="navbar navbar-main navbar-expand-lg navbar-dark navbar-border" id="navbar-main">
          <div class="container-fluid">
            <!-- Navbar nav -->
            <div class="collapse navbar-collapse navbar-collapse-fade" id="navbar-main-collapse">
              <ul class="navbar-nav align-items-lg-center">
                <!-- Home  -->
                <li class="nav-item">
                  <a class="nav-link pl-lg-0" href="./index.html"> 首页 </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link pl-lg-0" href="./index.html"> 传智教育 </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link pl-lg-0" href="./index.html">
                    黑马程序员
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link pl-lg-0" href="./index.html"> 文档 </a>
                </li>
              </ul>
              <!-- Right menu -->
              <ul class="navbar-nav ml-lg-auto align-items-center d-none d-lg-flex">
                <li class="nav-item dropdown dropdown-animate">
                  <a class="nav-link pr-lg-0" href=".dropdown-menu" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div class="media media-pill align-items-center">
                      <span class="avatar rounded-circle">
                        <img alt="Image placeholder" src="https://yanxuan-item.nosdn.127.net/8b27deb1670c53e67c42ca3e1ed6fd12.jpg">
                      </span>
                      <div class="ml-2 d-none d-lg-block">
                        <span class="mb-0 text-sm font-weight-bold">Admin</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link pl-lg-0" id="logout" href="javascript:;" @click="delToken">
                    退出
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div class="page-content">
          <!-- Page Title -->
          <div class="page-title">
            <div class="row justify-content-between align-items-center">
              <div class="col-md-6 mb-3 mb-md-0">
                <h5 class="h3 font-weight-400 mb-0 text-white">Dashboard</h5>
                <span class="text-sm text-white opacity-8">上海前端 xx 期</span>
              </div>
            </div>
          </div>
          <!-- charts -->
          <div class="row">
            <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h6 class="text-muted mb-1">就业薪资</h6>
                      <span name="salary" class="h3 font-weight-bold mb-0">15500</span>
                    </div>
                    <div class="col-auto">
                      <i class="bi bi-coin"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h6 class="text-muted mb-1">班级人数</h6>
                      <span name="student_count" class="h3 font-weight-bold mb-0">80</span>
                    </div>
                    <div class="col-auto">
                      <i class="bi bi-people"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h6 class="text-muted mb-1">平均年龄</h6>
                      <span name="age" class="h3 font-weight-bold mb-0">24.40</span>
                    </div>
                    <div class="col-auto">
                      <i class="bi bi-calendar2-week"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                <!-- Card body -->
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h6 class="text-muted mb-1">小组个数</h6>
                      <span name="group_count" class="h3 font-weight-bold mb-0">8</span>
                    </div>
                    <div class="col-auto">
                      <i class="bi bi-collection"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col col-xl-8">
              <div class="card" id="line" style="height: 400px"></div>
            </div>
            <div class="col col-xl-4">
              <div class="card" id="salary" style="height: 400px"></div>
            </div>
            <div class="col col-xl-12">
              <div class="card" style="height: 400px">
                <div class="card-header">
                  <div class="d-flex justify-content-between align-items-center">
                    <h6 class="mb-0">班级每组薪资</h6>
                    <div id="btns">
                      <button type="button" class="btn btn-xs btn-blue">
                        1
                      </button>
                      <button type="button" class="btn btn-xs">2</button>
                      <button type="button" class="btn btn-xs">3</button>
                      <button type="button" class="btn btn-xs">4</button>
                      <button type="button" class="btn btn-xs">5</button>
                      <button type="button" class="btn btn-xs">6</button>
                      <button type="button" class="btn btn-xs">7</button>
                      <button type="button" class="btn btn-xs">8</button>
                    </div>
                  </div>
                </div>
                <div class="card-body p-0" id="lines"></div>
              </div>
            </div>
            <div class="col col-xl-4">
              <div class="card" id="gender" style="height: 500px"></div>
            </div>
            <div class="col col-xl-8">
              <div class="card" id="map" style="height: 500px"></div>
            </div>
          </div>
          <!-- footer -->
          <div class="footer pt-5 pb-4 footer-light" id="footer-main">
            <div class="row text-center text-sm-left align-items-sm-center">
              <div class="col-sm-6">
                <p class="text-sm mb-0">
                  © 2022
                  <a href="https://itcast.cn" class="h6 text-sm" target="_blank">前端学科</a>. All rights reserved.
                </p>
              </div>
              <div class="col-sm-6 mb-md-0">
                <ul class="nav justify-content-center justify-content-md-end">
                  <li class="nav-item">
                    <a class="nav-link" href="#">Support</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Terms</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link pr-0" href="#">Privacy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { delToken } from '@/utils/storage';
export default {
  name: 'dashboard-page',
  methods: {
    delToken() {
      delToken();
      this.$message.info('退出成功')
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 12px;
  margin: 0;
  padding: 5px 20px;
  color: #999;
}
.card i:hover {
  cursor: pointer;
}
.bt-1 {
  margin-top: 4px;
}
.card-fluid {
  border: none;
  padding: 15px;
}
.card .table th {
  border-color: transparent;
}
.form-group {
  display: flex;
  align-items: center;
  height: calc(1.5em + 1.5rem + 2px);
}
.form-group > label {
  width: 100px;
  text-align: right;
  padding-right: 10px;
  margin-bottom: 0;
}
.form-group > input {
  flex: 1;
}
.form-group .input {
  flex: 1;
  padding-left: 10px;
  display: flex;
}
.form-group .form-check {
  margin-bottom: 0;
  margin-right: 30px;
}
.form-group .input select {
  width: 140px;
  margin-right: 20px;
}
.custom-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23999999' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-size: 12px 12px;
}
</style>