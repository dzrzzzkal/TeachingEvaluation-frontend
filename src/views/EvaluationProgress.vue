<template>
  <div>
    <el-cascader
      v-model="searchRangeValue"
      :options="selectRangeOptions"
      :props="{ multiple: true, checkStrictly: true }"
      clearable>
    </el-cascader>
    <el-select v-model="schoolYearItem" placeholder="请选择学年">
      <el-option
        v-for="item in schoolYearOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div style="margin-top: 15px">
      <el-input
        placeholder="请输入: 教师工号 / 姓名 / 角色"
        v-model="input"
        class="input-with-select"
        clearable
      >
        <template #prepend>
          <el-select v-model="searchItem" clearable placeholder="请选择">
            <el-option label="未完成听课任务" value="notFinishEvaluation"></el-option>
            <el-option label="完成听课任务" value="finishedEvaluation"></el-option>
            <el-option label="未提交年度报告" value="notSubmitAnnualReport"></el-option>
            <el-option label="已提交年度报告" value="submittedAnnualReport"></el-option>
          </el-select>
        </template>
        <template #append>
          <el-button icon="el-icon-search" @click="search"></el-button>
        </template>
      </el-input>
    </div>

    <div class="deansofficeEP" v-if="deansofficeQueryableEP">
      ○ {{deansofficeQueryableEP}}
    </div>
    <el-button
      :loading="loadingExport"
      size="medium"
      type="primary"
      @click="exportExcel">导出
    </el-button>

    <el-table
      id="out-table"
      ref="singleTable"
      :data="evaluationProgressData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        property="jobid"
        label="教师工号"
        width="120">
      </el-table-column>
      <el-table-column
        property="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        property="role"
        label="角色"
        width="120">
      </el-table-column>
      <el-table-column
        property="college"
        label="单位"
        width="120">
      </el-table-column>
      <el-table-column
        property="dept"
        label="系"
        width="120">
      </el-table-column>
      <el-table-column
        property="progress"
        label="评估进度(被听课进度)"
        width="200">
        <template #default="scope">
          <span>{{scope.row.progress}}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="isFinishProgress"
        label="评估完成情况"
        width="120">
        <template #default="scope">
          <span>{{scope.row.isFinishProgress}}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="annualReport"
        label="年度报告"
        width="120">
      </el-table-column>
      <el-table-column label="操作（待弄）">
        <template #default="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="setCurrent(evaluationProgressData[1])">选中第二行</el-button>
      <el-button @click="setCurrent()">取消选择</el-button>
    </div>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="jumpPagination"
        v-model:currentPage="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="evaluationProgressTotal">
      </el-pagination>
    </div>
    
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import {request} from '@/network/request'
import { ElMessage } from 'element-plus'

import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default defineComponent ({
  setup() {
    return {
      input: ref(''),
      searchItem: ref(''),

      alertNoData() {
        ElMessage.warning({
          message: '当前没有数据可以导出哦',
          type: 'warning'
        })
      },
      alertRequestFail() {
        ElMessage.error('请求失败')
      },
    }
  },
  data() {
    return {
      loadingExport: false,

      selectRangeOptions: [],
      searchRangeValue: [],

      schoolYearOptions: [{
        value: '2018年',
        label: '2018年'
      }, {
        value: '2019年',
        label: '2019年'
      }, {
        value: '2020年',
        label: '2020年'
      }, {
        value: '2021年',
        label: '2021年'
      }, {
        value: '2022年',
        label: '2022年'
      }, {
        value: '2023年',
        label: '2023年'
      }],
      schoolYearItem: '',

      deansofficeQueryableEP: '',

      evaluationProgressData: [],
      currentRow: null,

      evaluationProgressTotal: 0,
      currentPage: 1,
      pageSize: 3,

      // 实际最新点击了搜索按钮之后的查询条件。成功搜索后设置，防止后来点击修改了新的查询条件，但是没点击'搜索'的情况下，点击'导出'
      searchedSearchRangeValue: [], 
      searchedSchoolYearItem: '',
      searchedInput: '',
      searchedSearchItem: '',
    }
  },
  methods: {
    requestEvaluationProgress() {
      return request({
        url: '/evaluationProgress',
        method: 'post',
        data: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          searchRangeValue: this.searchRangeValue,
          searchItem: this.searchItem,
          schoolYearItem: this.schoolYearItem,
          input: this.input,
        },
        headers: {
          // 'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        console.log('request success!')
        console.log(res)
        if(!res) {
          this.alertRequestFail()
          return
        }
        this.selectRangeOptions = res.selectRangeOptions
        let {ep, deansofficeQueryableEP} = res
        // ↓即使搜索结果为空，ep会返回{count:0, rows:[]}
        this.evaluationProgressTotal = ep.count
        this.evaluationProgressData = ep.rows
        let progress
        let isFinishProgress  // 设置评估进度完成情况
        if(ep.rows) {
          for(let i of this.evaluationProgressData) {
            let submittedNum = parseInt(i.submittedNum)
            let taskCount = parseInt(i.taskCount)
            if(i.role === '教师') {
              progress = `${i.submittedNum} / ${i.taskCount} (${i.beEvaluatedNum} / 1)`
              let beEvaluatedNum = parseInt(i.beEvaluatedNum)
              if(submittedNum >= taskCount && beEvaluatedNum >= 1) {
                isFinishProgress = '已完成'
              }else {
                isFinishProgress = '未完成'
              }
            }else {
              progress = `${i.submittedNum} / ${i.taskCount}`
              if(submittedNum >= taskCount) {
                isFinishProgress = '已完成'
              }else {
                isFinishProgress = '未完成'
              }
            }
            i.progress = progress
            i.isFinishProgress = isFinishProgress
          }
        }
        if(deansofficeQueryableEP) {
          let {notFinishedCount, range, teacherTotal} = deansofficeQueryableEP
          if((notFinishedCount || notFinishedCount == 0) && range && (teacherTotal || teacherTotal == 0)) {   // if(0)不执行
            this.deansofficeQueryableEP = `${range} 范围内，未完成听课工作人数： ${notFinishedCount} / ${teacherTotal}`
          }else {
            this.deansofficeQueryableEP = deansofficeQueryableEP
          }
        }

        this.searchedSearchRangeValue = this.searchRangeValue
        this.searchedSchoolYearItem = this.schoolYearItem
        this.searchedInput = this.input
        this.searchedSearchItem = this.searchItem
      }).catch(err => {
        console.log('request fail')
        console.log(err)
      })
    },

    // 点击搜索按钮
    search() {
      this.requestEvaluationProgress()
    },

    // 分页
    handleSizeChange(val) { // 目前没用
      console.log(`每页 ${val} 条`);
    },
    jumpPagination(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.requestEvaluationProgress()
    },

    exportExcel () {
      if(!this.evaluationProgressData.length) {
        this.alertNoData()
        return
      }
      this.loadingExport = true
      // 请求用来导出的evaluationProgress。区别是，这里不需要分页，不需要赋值给this.evaluationSheetData、this.selectRangeOptions、this.deansofficeQueryableEP
      request({
        url: '/exportEvaluationProgress',
        method: 'post',
        data: {
          searchRangeValue: this.searchedSearchRangeValue,
          searchItem: this.searchedSearchItem,
          schoolYearItem: this.searchedSchoolYearItem,
          input: this.searchedInput,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        console.log('export request success!')
        console.log(res)
        let ep = res
        let progress
        let isFinishProgress  // 设置评估进度完成情况
        for(let i of ep) {
          let submittedNum = parseInt(i.submittedNum)
          let taskCount = parseInt(i.taskCount)
          if(i.role === '教师') {
            progress = `${i.submittedNum} / ${i.taskCount} (${i.beEvaluatedNum} / 1)`
            let beEvaluatedNum = parseInt(i.beEvaluatedNum)
            if(submittedNum >= taskCount && beEvaluatedNum >= 1) {
              isFinishProgress = '已完成'
            }else {
              isFinishProgress = '未完成'
            }
          }else {
            progress = `${i.submittedNum} / ${i.taskCount}`
            if(submittedNum >= taskCount) {
              isFinishProgress = '已完成'
            }else {
              isFinishProgress = '未完成'
            }
          }
          i.progress = progress
          i.isFinishProgress = isFinishProgress
        }
        require.ensure([], () => {
          const {export_json_to_excel} = require('@/vendor/Export2Excel')
          const tHeader = ['教师工号', '姓名', '角色', '单位', '系', '评估进度(被听课进度)', '评估完成情况', '年度报告']
          const filterVal = ['jobid', 'name', 'role', 'college', 'dept', 'progress', 'isFinishProgress', 'annualReport']
          const list = ep
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, 'evaluationProgressExcel')
        })
      }).catch(err => {
        console.log('request fail')
        console.log(err)
      })
      this.loadingExport = false
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }

  },
  created() {
    // 设置 schoolYearItem
    let year = new Date().getFullYear()
    for(let i of this.schoolYearOptions) {
      let schoolYear = i.value.substring(0, 4)
      if(schoolYear === year.toString()) {
        this.schoolYearItem = i.value
        break
      }
    }

    this.requestEvaluationProgress()

  }
})
</script>

<style>
  .el-select .el-input {
    width: 160px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .clickrable-text {
    cursor : pointer;
    text-decoration: underline;
  }

  .deansofficeEP {
    display: block;
    height: 50px;
    line-height: 50px;
    float: left;
    border: 1px solid rgb(182, 178, 178, .8);
    padding: 0 50px;
    margin: 10px;
  }
</style>