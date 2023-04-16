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
                <template slot-scope="{row}">
                  <el-button size="small" type="success" @click="showPermission(row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="showEdit(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
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

      <!-- 设置角色权限弹窗 -->
      <el-dialog title="分配权限" :visible="isShowPermission" @close="btnPermCancel">
        <!-- data 是数据数组, 套着一堆对象 props 指定要显示的字段,
        default-expand-all 默认展开所有 -->
        <el-checkbox-group v-model="checkList">
          <!-- 本来多个多选框需要自己 v-for 遍历, 但是这里由树形处理了 -->

          <!-- 每个属性节点都是一个多选框 -->
          <!-- <el-checkbox v-for="item in permList" :key="item.id" :label="item.id">
            {{ item.name }}
          </el-checkbox> -->
          <el-tree :data="permList" default-expand-all>
            <template v-slot="scope">
              <el-checkbox :label="scope.data.id">
                {{ scope.data.name }}
              </el-checkbox>
            </template>
          </el-tree>
        </el-checkbox-group>
        <template #footer>
          <el-button size="small" type="primary" @click="btnPermOK">确定</el-button>
          <el-button size="small" @click="btnPermCancel">取消</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCompanyInfo, getRoleList, getRoleDetail, updateRole, addRole, deleteRole, assignPerm } from '@/api/setting.js'
import { mapState } from 'vuex'
import { getPermissionList } from '@/api/permisson'
import { listToTree } from '@/utils'
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
      },
      // 设置权限相关
      isShowPermission: false,
      // 所有权限数组
      permList: [],
      // 被选中的权限数组
      checkList: [],
      // 点击弹窗时储存角色id方便确定的时候复用
      roleId: ''
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  async created() {
    this.form = await getCompanyInfo(this.$store.getters.companyId)
    this.getRoleList()
    const res = await getPermissionList()
    this.permList = listToTree(res, '0')
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
    },

    async showPermission(id) {
      // 获取角色旧数据, 回显多选框
      const { permIds } = await getRoleDetail(id)
      this.checkList = permIds
      this.roleId = id
      this.isShowPermission = true
    },
    async btnPermOK() {
      await assignPerm({
        id: this.roleId,
        permIds: this.checkList
      })
      this.$message.success('修改成功')
      this.isShowPermission = false
    },
    btnPermCancel() {
      this.checkList = []
      this.isShowPermission = false
    }

  }
}
</script>

<style>
</style>
