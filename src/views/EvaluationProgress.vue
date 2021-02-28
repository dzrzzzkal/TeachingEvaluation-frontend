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

    <el-table
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
        property="progress"
        label="评估进度(被听课进度)"
        width="200">
        <template #default="scope">
          <span>{{scope.row.submittedNum + ' / ' + scope.row.taskCount}}</span>
          <span v-if="scope.row.role === '教师'">{{`  (${scope.row.beEvaluatedNum} / 1)`}}</span>
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
      <!-- <el-table-column
        label="评估表"
        >
        <template #default="scope">
          <span class="clickrable-text" @click="clickEvaluationSheet(scope.row.id)">
            {{scope.row.class_id + ' ' + scope.row.course_name}}
          </span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        property="submitter"
        label="评估人"
        width="100">
        <template #default="scope">
          <span class="clickrable-text" @click="searchSubmitter(scope.row.submitter)">{{scope.row.submitter}}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        property="classification"
        label="课程类型"
        width="120">
        <template #default="scope">
          <span class="clickrable-text" @click="searchClassification(scope.row.classification)">{{scope.row.classification}}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        property="followUp"
        label="是否需要跟进"
        width="120">
      </el-table-column> -->
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

export default defineComponent ({
  setup() {
    return {
      input: ref(''),
      searchItem: ref(''),
    }
  },
  data() {
    return {
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

      evaluationProgressData: [],
      currentRow: null,

      evaluationProgressTotal: 0,
      currentPage: 1,
      pageSize: 3,
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
        let ep = res.ep
        this.evaluationProgressTotal = ep.count
        this.evaluationProgressData = ep.rows
        let isFinishProgress  // 设置评估进度完成情况
        if(ep.rows) {
          for(let i of this.evaluationProgressData) {
            let submittedNum = parseInt(i.submittedNum)
            let taskCount = parseInt(i.taskCount)
            if(i.role === '教师') {
              let beEvaluatedNum = parseInt(i.beEvaluatedNum)
              if(submittedNum >= taskCount && beEvaluatedNum >= 1) {
                isFinishProgress = '已完成'
              }else {
                isFinishProgress = '未完成'
              }
            }else {
              if(submittedNum >= taskCount) {
                isFinishProgress = '已完成'
              }else {
                isFinishProgress = '未完成'
              }
            }
            i.isFinishProgress = isFinishProgress
          }
        }
        
        console.log(this.evaluationProgressData)

        this.selectRangeOptions = res.selectRangeOptions
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
</style>