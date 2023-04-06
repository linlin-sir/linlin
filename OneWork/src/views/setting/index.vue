<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog=true,title='添加学员'"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="list">
              <el-table-column prop="name" label="角色名称" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="showEdit(scope.row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(scope.row.id)">删除</el-button>
                </template>
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
                <el-input v-model="form.name" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="form.companyAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="form.mailbox"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="form.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-dialog :title="title" :visible="showDialog" @close="btnCancel">
        <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>
        <!-- 底部 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="btnCancel">取消</el-button>
            <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCompanyInfo, getRoleList, getRoleDetail, updateRole, addRole, deleteRole } from '@/api/setting.js'
export default {
  data() {
    return {
      title: '',
      showDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ]
      },
      list: [],
      form: {},
      total: 0, // 记录总数
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 3
      }
    }
  },
  async created() {
    this.form = await getCompanyInfo(this.$store.getters.companyId)
    this.getRoleList()
  },
  methods: {
    async deleteRole(id) {
      await this.$confirm('确认删除该角色吗')
      await deleteRole(id)
      this.$message.success('删除成功')
      this.getRoleList()
    },

    async showEdit(id) {
      this.title = '修改学员'
      this.roleForm = await getRoleDetail(id)
      this.showDialog = !this.showDialog
    },

    async btnOK() {
      await this.$refs.roleForm.validate()
      this.roleForm.id ? await updateRole(this.roleForm) : await addRole(this.roleForm)
      this.$message.success('操作成功')
      this.getRoleList()
      this.btnCancel()
    },

    btnCancel() {
      this.$refs.roleForm.resetFields()
      this.roleForm = {
        name: '',
        description: ''
      }
      this.showDialog = false
    },

    async getRoleList() {
      const { rows, total } = await getRoleList(this.page)
      this.list = rows
      this.total = total
    },

    currentChange(newPage) {
      this.page.page = newPage
      this.getRoleList()
    }
  }
}
</script>

<style>
</style>
