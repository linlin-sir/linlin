<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button icon="el-icon-plus" size="small" type="primary" @click="isShowDialog = true">新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="roleList">
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template v-slot="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="showEdit(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                layout="prev,pager,next"
                :total="total"
                :page-size="3"
                @current-change="currentChange"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input v-model="companyInfo.name" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyInfo.companyAddress" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyInfo.mailbox" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width: 400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>

      <el-dialog :title="roleForm.id?'编辑角色':'新增角色'" :visible="isShowDialog" @close="btnCancel">
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
import { getCompanyInfo, getRoleList, getRoleDetail, editRole, addRole, deleteRole } from '@/api/setting'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // 弹窗from基本数据
      isShowDialog: false,
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

      // 基础渲染数据
      companyInfo: {},
      roleList: [],
      total: 0,
      pageConfig: {
        page: 1,
        pagesize: 3
      }
    }
  },
  async created() {
    this.getRoleList()
    this.companyInfo = await getCompanyInfo(this.userInfo.companyId)
  },

  methods: {
    // 删除
    async delRole(id) {
      await deleteRole(id)
      this.$message.success('删除成功')
      this.getRoleList()
    },

    // 弹窗完成添加修改完成
    async showEdit(id) {
      this.roleForm = await getRoleDetail(id)
      this.isShowDialog = true
    },
    async btnOK() {
      await this.$refs.roleForm.validate()
      this.roleForm.id ? await editRole(this.roleForm) : await addRole(this.roleForm)
      this.$message.success('操作成功')
      this.btnCancel()
      this.getRoleList()
    },
    btnCancel() {
      this.isShowDialog = false
      this.$refs.roleForm.resetFields()
      this.roleForm = {
        name: '',
        description: ''
      }
    },

    // 基础渲染函数
    ...mapState('user', ['userInfo']),
    async  getRoleList() {
      const { rows, total } = await getRoleList(this.pageConfig)
      this.roleList = rows
      this.total = total
    },
    currentChange(newPage) {
      this.pageConfig.page = newPage
      this.getRoleList()
    }
  }
}
</script>

<style></style>
