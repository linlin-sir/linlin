<template>
  <div class="job-info">
    <el-row type="flex" justify="end">
      <el-tooltip content="打印岗位信息">
        <router-link :to="`/employees/print/${userId}?type=job`">
          <i class="el-icon-printer" />
        </router-link>
      </el-tooltip>
    </el-row>
    <!-- 基础信息 -->
    <el-form label-width="220px">
      <div class="block">
        <div class="title">基础信息</div>
        <el-form-item label="岗位">
          <el-input v-model="formData.post" placeholder="请输入" class="inputW" />
        </el-form-item>
        <!-- <el-form-item label="转正日期">
          <el-date-picker
            v-model="formData.dateOfCorrection"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item> -->
        <el-form-item label="转正状态">
          <el-select v-model="formData.stateOfCorrection" placeholder="请选择" disabled>
            <el-option
              v-for="item in EmployeeEnum.stateOfCorrection"
              :key="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="职级">
          <el-input v-model="formData.rank" class="inputW" />
        </el-form-item>
        <el-form-item label="转正评价">
          <el-input v-model="formData.correctionEvaluation" type="textarea" placeholder="1-300位字符" />
        </el-form-item>
        <el-form-item label="汇报对象">
          <el-select v-model="formData.reportId" filterable placeholder="请选择" class="inputW">
            <el-option v-for="item in userList" :key="item.id" :label="item.username" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="HRBP">
          <el-select v-model="formData.hrbp" filterable placeholder="请选择" class="inputW">
            <el-option v-for="item in userList" :key="item.id" :label="item.username" :value="item.id" class="inputW" />
          </el-select>
        </el-form-item>
        <el-form-item class="formInfo" label="调整司龄(天)：">
          <el-input v-model="formData.adjustmentAgedays" type="number" placeholder="请输入" class="inputW" />
        </el-form-item>
        <el-form-item label="首次参加工作时间">
          <el-date-picker
            v-model="formData.workingTimeForTheFirstTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="调整工龄">
          <el-input v-model="formData.adjustmentOfLengthOfService" placeholder="0.00年" class="inputW" disabled />
        </el-form-item>
      </div>
      <!-- 合同信息 -->
      <div class="block">
        <div class="title">合同信息</div>
        <el-form-item class="formInfo" label="首次合同开始时间：">
          <el-date-picker
            v-model="formData.initialContractStartTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="首次合同结束时间">
          <el-date-picker
            v-model="formData.firstContractTerminationTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="现合同开始时间">
          <el-date-picker
            v-model="formData.currentContractStartTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="现合同结束时间">
          <el-date-picker
            v-model="formData.closingTimeOfCurrentContract "
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="合同期限">
          <el-select v-model="formData.contractPeriod" class="filter-item">
            <el-option
              v-for="item in EmployeeEnum.contractPeriod"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="续签次数">
          <el-select v-model="formData.renewalNumber" class="filter-item">
            <el-option
              v-for="item in EmployeeEnum.renewalCount"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </div>
      <!-- 招聘信息 -->
      <div class="block">
        <div class="title">招聘信息</div>
        <el-form-item label="其他招聘渠道">
          <el-select v-model="formData.otherRecruitmentChannels" placeholder="请选择">
            <el-option
              v-for="item in EmployeeEnum.resumeSource"
              :key="item.id"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="招聘渠道">
          <el-select v-model="formData.recruitmentChannels" placeholder="请选择">
            <el-option
              v-for="item in EmployeeEnum.resumeSource"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="社招/校招">
          <el-select v-model="formData.socialRecruitment" placeholder="请选择">
            <el-option
              v-for="item in EmployeeEnum.hireSourceType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="推荐企业/人">
          <el-input v-model="formData.recommenderBusinessPeople" placeholder="请输入" class="infoPosition inputW" />
        </el-form-item>
      </div>
      <!-- 从业信息 -->
      <el-form-item>
        <el-button type="primary" @click="saveJob">保存更新</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import { getJobDetail, updateJob, getEmployeeSimple } from '@/api/employees'
import EmployeeEnum from '@/constant/employees'
export default {
  data() {
    return {
      userId: this.$route.params.id,
      EmployeeEnum,
      formData: {},
      userList: []
    }
  },
  created() {
    // 回显数据
    this.getJob()
    // 获取员工简单信息列表, 用来生成选项下拉菜单
    this.getEmployeeSimple()
  },
  methods: {
    // 获取员工简单列表
    async getEmployeeSimple() {
      this.userList = await getEmployeeSimple()
    },
    async getJob() {
      // 获取岗位信息赋值给表单
      this.formData = await getJobDetail(this.userId)
    },
    // 更新岗位信息
    async saveJob() {
      await updateJob(this.formData)
      this.$message.success('修改成功')
    }
  }
}
</script>

<style>

</style>
