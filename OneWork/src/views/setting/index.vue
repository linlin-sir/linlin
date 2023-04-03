<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button icon="el-icon-plus" size="small" type="primary"
                >新增角色</el-button
              >
            </el-row>
            <!-- 表格 -->
            <el-table :data="list">
              <el-table-column prop="name" label="角色名称" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                :total="total"
                :page-size="page.pagesize"
                layout="prev,pager,next"
                @current-change="currentChange"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input disabled style="width: 400px" v-model="form.name" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="form.companyAddress"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="form.mailbox"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                  v-model="form.remarks"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getCompanyInfo, getRoleList } from "@/api/setting.js";
export default {
  data() {
    return {
      list: [],
      form: {},
      total: 0, // 记录总数
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 3,
      },
    };
  },
  async created() {
    this.form = await getCompanyInfo(this.$store.getters.companyId);
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.page);
      this.list = rows;
      this.total = total;
    },
    currentChange(newPage) {
      this.page.page = newPage;
      this.getRoleList();
    },
  },
};
</script>

<style>
</style>