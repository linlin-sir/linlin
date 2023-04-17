<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共166条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/employees/import')">导入</el-button>
          <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
          <el-button size="small" type="primary" @click="isShowDialog = true">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable="" prop="index" />
          <el-table-column prop="username" label="姓名" sortable="" />
          <el-table-column prop="workNumber" label="工号" sortable="" />
          <el-table-column prop="formOfEmployment" label="聘用形式" sortable="" :formatter="formatEmployment" />
          <el-table-column prop="departmentName" label="部门" sortable="" />
          <el-table-column label="入职时间" sortable="">
            <template v-slot="scope">
              {{ scope.row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column prop="enableState" label="账户状态" sortable="">
            <template v-slot="scope">
              <el-switch disabled :value="scope.row.enableState" :active-value="1" :inactive-value="0" />
              <!-- {{ scope.row.enableState }} -->
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{ row }">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="showRoleDialog(row.id)">角色</el-button>
              <el-button v-if="checkPerm('delUser')" type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            :total="total"
            :page-size="pageConfig.size"
            layout="prev, pager, next"
            @current-change="currentChange"
          />
        </el-row>
      </el-card>

      <AddDemployee :is-show-dialog="isShowDialog" />
      <assign-role ref="assignRole" :is-show-role-dialog="isShowRoleDialog" @closeDialog="isShowRoleDialog = false" />
    </div>
  </div>
</template>

<script>
import { getEmployee, removeEmployee } from '@/api/employees'
import EmployeeEnum from '@/constant/employees'
import { export_json_to_excel } from '@/vendor/Export2Excel'
import { formatDate } from '@/filters'
import AddDemployee from './components/add-employee'
import AssignRole from './components/assign-role.vue'
export default {
  components: { AddDemployee, AssignRole },
  data() {
    return {
      isShowDialog: false,
      isShowRoleDialog: false,

      pageConfig: {
        page: 1,
        size: 5
      },
      list: [],
      total: 0
    }
  },
  created() {
    this.loadPage()
  },
  methods: {
    async showRoleDialog(id) {
      await this.$refs.assignRole.getUserDetail(id)
      this.isShowRoleDialog = true
    },

    async exportExcel() {
      // 1. 获取所有员工数据
      const { rows } = await getEmployee({
        page: 1,
        size: this.total
      })

      // 获取后端数据和用前端插件生成 excel 过程中
      // 发现数据不匹配, 需要进行数据转换
      // 要先定表头

      // 定义字典, 里面以key:value 键值对的形式配对 表头和对应要拿的数据字段名
      const dict = {
        '用户名': 'username',
        '手机号': 'mobile',
        '部门': 'departmentName',
        '聘用形式': 'formOfEmployment',
        '入职时间': 'timeOfEntry'
      }
      const header = Object.keys(dict)
      // const header = ['用户名', '手机号', '部门', '聘用形式', '入职时间']
      // const data = [
      //   ['管理员', 13800000000, '总裁办']
      // ]
      // 来源数据格式
      // [{}{}{}]
      // map 转换
      // 目标数据格式
      // [[][][]]
      const data = rows.map(item => {
        // 映射后端拿到的员工数据, 每个员工数据现在都叫 item
        const user = []
        for (const zhKey in dict) {
          // 遍历中文zhKey, 获取英文 enKey, 如 遍历到用户名则获取到 username
          const enKey = dict[zhKey]
          // 通过英文 enKey 在用户中拿出应该被推入到数组的数据 value,
          // 比如 enKey 是 username 就获取 item['username']
          const value = item[enKey]
          // 将取到的用户数据放入到数组中即可
          // 如果是处理聘用形式或者入职时间, 不能直接推
          if (enKey === 'formOfEmployment') {
            // 聘用形式特殊处理
            const obj = EmployeeEnum.hireType.find(el => el.id === value)
            user.push(obj ? obj.value : '未知')
          } else if (enKey === 'timeOfEntry') {
            // 入职时间特殊处理
            user.push(formatDate(value))
          } else {
            // 普通数据
            user.push(value)
          }
        }
        // user.push(item.username)
        // user.push(item.mobile)
        // user.push(item.departmentName)

        // // 特殊数据一, 聘用形式, 将数据中的数字用枚举数据转成字符串
        // const obj = EmployeeEnum.hireType.find(el => el.id === item.formOfEmployment)
        // const formOfEmployment = obj ? obj.value : '未知'
        // user.push(formOfEmployment)

        // // 特殊数据二, 对于时间处理, 可以使用之前的过滤器函数
        // // 注意这里没法用过滤器, 可以将注册过滤器的函数直接引入使用即可
        // user.push(formatDate(item.timeOfEntry))
        return user
      })

      // 2. 转成 excel 文件供用户下载
      export_json_to_excel({
        header,
        data
      })
    },

    async delEmployee(id) {
      await removeEmployee(id)
      this.$message.success('删除成功')
      this.loadPage()
    },
    async loadPage() {
      const { rows, total } = await getEmployee(this.pageConfig)
      this.list = rows.map((item, index) => {
        return {
          ...item,
          index: (this.pageConfig.page - 1) * this.pageConfig.size + index + 1
        }
      })
      this.total = total
    },
    currentChange(newPage) {
      this.pageConfig.page = newPage
      this.loadPage()
    },
    formatEmployment(row, col, val) {
      // 这个函数, 会在每个格子渲染的时候都被调用, 默认传入当前行,当前列,当前格子,和索引四个形参
      // 这里的返回值会替代当前的格子数据

      // 可以将所有可能的情况, 放在一个数组中进行管理
      // 在专业术语上, 将所有可能性列举出来的数据形式叫做 "枚举"

      // const hireType = [
      //   { id: 1, value: '正式' },
      //   { id: 2, value: '非正式' },
      //   { id: 3, value: '实习生' },
      //   { id: 4, value: '顾问' }
      // ]

      const res = EmployeeEnum.hireType.find(item => item.id === val)
      return res ? res.value : '未知'
    }
  }
}
</script>

<style></style>
