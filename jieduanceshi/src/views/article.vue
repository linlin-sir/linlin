<template>
  <div>
    <div class="main-content position-relative">
      <nav
        class="navbar navbar-main navbar-expand-lg navbar-dark navbar-border"
        id="navbar-main"
      >
        <div class="container-fluid">
          <!-- Navbar nav -->
          <div
            class="collapse navbar-collapse navbar-collapse-fade"
            id="navbar-main-collapse"
          >
            <ul class="navbar-nav align-items-lg-center">
              <!-- Home  -->
              <li class="nav-item">
                <a class="nav-link pl-lg-0" href="./index.html"> 首页 </a>
              </li>
              <li class="nav-item">
                <a class="nav-link pl-lg-0" href="./index.html"> 传智教育 </a>
              </li>
              <li class="nav-item">
                <a class="nav-link pl-lg-0" href="./index.html"> 黑马程序员 </a>
              </li>
              <li class="nav-item">
                <a class="nav-link pl-lg-0" href="./index.html"> 文档 </a>
              </li>
            </ul>
            <!-- Right menu -->
            <ul
              class="navbar-nav ml-lg-auto align-items-center d-none d-lg-flex"
            >
              <li class="nav-item dropdown dropdown-animate">
                <a
                  class="nav-link pr-lg-0"
                  href=".dropdown-menu"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div class="media media-pill align-items-center">
                    <span class="avatar rounded-circle">
                      <img
                        alt="Image placeholder"
                        src="https://yanxuan-item.nosdn.127.net/8b27deb1670c53e67c42ca3e1ed6fd12.jpg"
                      />
                    </span>
                    <div class="ml-2 d-none d-lg-block">
                      <span class="mb-0 text-sm font-weight-bold">Admin</span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link pl-lg-0"
                  id="logout"
                  href="javascript:;"
                  @click="delToken"
                >
                  退出
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="page-content">
        <div class="page-title mb-3">
          <div class="row justify-content-between align-items-center">
            <div class="col-md-6 mb-3 mb-md-0">
              <h5 class="h3 font-weight-400 mb-0 text-white">Students</h5>
              <span class="text-sm text-white opacity-8"
                >一共有 <b class="total">0</b> 位学员</span
              >
            </div>
            <div
              class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-end"
            >
              <a
                id="openModal"
                href="javascript:;"
                class="btn btn-sm btn-white btn-icon-only rounded-circle ml-4 addBtn"
                @click.prevent="ModelShow('添加学员')"
              >
                <span class="btn-inner--icon"
                  ><i class="bi bi-plus bi-2x"></i
                ></span>
              </a>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="card card-fluid">
              <div class="table-responsive" style="min-height: 1000px">
                <table class="table align-items-center">
                  <thead>
                    <tr>
                      <th>姓名</th>
                      <th>年龄</th>
                      <th>性别</th>
                      <th>组号</th>
                      <th>期望薪资</th>
                      <th>就业薪资</th>
                      <th>籍贯</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody class="list">
                    <tr v-for="item in list" :key="item.id">
                      <td>{{ item.name }}</td>
                      <td>{{ item.age }}</td>
                      <td v-text="item.gender == 0 ? '男' : '女'"></td>
                      <td>{{ item.group }}</td>
                      <td>{{ item.hope_salary }}</td>
                      <td>{{ item.salary }}</td>
                      <td>{{ item.province }}{{ item.city }}{{ item.area }}</td>
                      <td>
                        <a href="javascript:;" class="text-success mr-3"
                          ><i
                            class="bi bi-pen"
                            @click.prevent="ModelShow('修改学员', item.id)"
                          ></i
                        ></a>
                        <a href="javascript:;" class="text-danger"
                          ><i
                            class="bi bi-trash"
                            @click="delstuden(item.id)"
                          ></i
                        ></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- footer -->
        <div class="footer pt-5 pb-4 footer-light" id="footer-main">
          <div class="row text-center text-sm-left align-items-sm-center">
            <div class="col-sm-6">
              <p class="text-sm mb-0">
                © 2022
                <a href="https://itcast.cn" class="h6 text-sm" target="_blank"
                  >前端学科</a
                >. All rights reserved.
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
    <el-drawer
      :visible.sync="isShowDrawer"
      :before-close="handleClose"
      :title="drawerTitle"
      direction="rtl"
      size="50%"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="年龄:" prop="age">
          <el-input v-model="form.age"></el-input>
        </el-form-item>

        <el-form-item label="期望薪资:" prop="hope_salary">
          <el-input v-model="form.hope_salary"></el-input>
        </el-form-item>

        <el-form-item label="就业薪资:" prop="salary">
          <el-input v-model="form.salary"></el-input>
        </el-form-item>

        <el-form-item label="组号:" prop="group">
          <el-input v-model="form.group"></el-input>
        </el-form-item>

        <el-form-item label="性别:" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="选择地区:">
          <el-select
            v-model="form.province"
            placeholder="请选择活动区域"
            @change="provincechange"
          >
            <el-option
              v-for="item in Province"
              :key="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-select
            v-model="form.city"
            placeholder="请选择活动区域"
            @change="citychange"
          >
            <el-option
              v-for="item in City"
              :key="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-select v-model="form.area" placeholder="请选择活动区域">
            <el-option
              v-for="item in Area"
              :key="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { delToken } from "@/utils/storage";
import {
  getstudents,
  delstudents,
  getprovince,
  getcity,
  getarea,
  addstudents,
  getstudentsID,
  putstudentsID,
} from "@/api/user";
export default {
  data() {
    return {
      ID: "",
      list: [],
      isShowDrawer: false,
      drawerTitle: "",
      Province: [],
      City: [],
      Area: [],
      form: {
        name: "",
        age: "",
        gender: "",
        province: "",
        city: "",
        area: "",
        hope_salary: "",
        salary: "",
        group: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" },
        ],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { min: 1, max: 2, message: "年龄在1~99岁之间", trigger: "blur" },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        hope_salary: [
          { required: true, message: "请输入期望工资", trigger: "blur" },
          { min: 4, max: 5, message: "工资在1000~99999之间", trigger: "blur" },
        ],
        salary: [
          { required: true, message: "请输入实际工资", trigger: "blur" },
          { min: 4, max: 5, message: "工资在1000~99999之间", trigger: "blur" },
        ],
        group: [
          { required: true, message: "请输入组号", trigger: "blur" },
          { min: 1, max: 1, message: "组号在1~8号之间", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async onSubmit() {
      if (this.drawerTitle === "添加学员") {
        const res = await addstudents({
          name: this.form.name,
          age: +this.form.age,
          gender: +this.form.gender,
          province: this.form.province,
          city: this.form.city,
          area: this.form.area,
          hope_salary: +this.form.hope_salary,
          salary: +this.form.salary,
          group: +this.form.group,
        });
        if (res.message === "添加学生成功") {
          this.$message.success(res.message);
        }
      } else {
        const res = await putstudentsID(this.ID, {
          name: this.form.name,
          age: +this.form.age,
          gender: +this.form.gender,
          province: this.form.province,
          city: this.form.city,
          area: this.form.area,
          hope_salary: +this.form.hope_salary,
          salary: +this.form.salary,
          group: +this.form.group,
        });
        if (res.message === "修改学生成功") {
          this.$message.success(res.message);
        }
      }
      this.handleClose();
      this.initData();
    },

    async ModelShow(title, id) {
      if (id) {
        this.ID = id;
        const res = await getstudentsID(id);
        this.form.name = res.data.name;
        this.form.age = res.data.age;
        this.form.gender = res.data.gender.toString();
        this.form.province = res.data.province;
        this.form.city = res.data.city;
        this.form.area = res.data.area;
        this.form.hope_salary = res.data.hope_salary;
        this.form.salary = res.data.salary;
        this.form.group = res.data.group;
      }
      this.drawerTitle = title;
      this.isShowDrawer = !this.isShowDrawer;
    },

    handleClose() {
      this.isShowDrawer = false;
      this.$refs.form.resetFields();
      this.form.province = "";
      this.form.city = "";
      this.form.area = "";
    },

    delToken() {
      delToken();
      this.$message.info("退出成功");
      setTimeout(() => {
        location.reload();
      }, 1500);
    },

    async initData() {
      this.list = (await getstudents()).data;
      this.Province = (await getprovince()).data;
    },

    async provincechange() {
      this.form.city = "";
      this.form.area = "";
      this.City = (await getcity({ pname: this.form.province })).data;
    },

    async citychange() {
      this.form.area = "";
      this.Area = (
        await getarea({
          pname: this.form.province,
          cname: this.form.city,
        })
      ).data;
    },

    async delstuden(id) {
      this.$message.success("删除成功");
      await delstudents(id);
      this.initData();
    },
  },

  
  created() {
    this.initData();
  },
};
</script>

<style>
</style>