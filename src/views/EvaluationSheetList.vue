<template>
  <div>
    <el-cascader
      v-model="searchRangeValue"
      :options="selectRangeOptions"
      :props="{ multiple: true, checkStrictly: true }"
      clearable>
    </el-cascader>
    <el-select v-model="schoolYearItem" placeholder="请选择学年" clearable>
      <el-option
        v-for="item in schoolYearOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div style="margin-top: 15px">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        class="input-with-select"
        clearable
      >
        <template #prepend>
          <el-select v-model="searchItem" placeholder="请选择">
            <el-option label="课程编号" value="class_id"></el-option>
            <el-option label="课程名" value="course_name"></el-option>
            <el-option label="评估人" value="submitter"></el-option>
            <el-option label="课程类型" value="classification"></el-option>
          </el-select>
        </template>
        <template #append>
          <el-button icon="el-icon-search" @click="search"></el-button>
        </template>
      </el-input>
    </div>

    <el-button
      :loading="loadingExport"
      size="medium"
      type="primary"
      @click="exportExcel">
      导出
    </el-button>

    <el-table
      ref="singleTable"
      :data="evaluationSheetData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        property="submit_time"
        label="提交日期（待↑↓）"
        width="120">
      </el-table-column>
      <el-table-column
        property="sheet_name"
        label="评估表"
        >
        <template #default="scope">
          <span class="clickrable-text" @click="clickEvaluationSheet(scope.row.id)">
            {{scope.row.sheet_name}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        property="submitter"
        label="评估人"
        width="100">
        <template #default="scope">
          <span class="clickrable-text" @click="searchSubmitter(scope.row.submitter)">{{scope.row.submitter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="classification"
        label="课程类型"
        width="120">
        <template #default="scope">
          <span class="clickrable-text" @click="searchClassification(scope.row.classification)">{{scope.row.classification}}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="followUp"
        label="是否需要跟进"
        width="120">
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="jumpPagination"
        v-model:currentPage="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="evaluationSheetTotal">
      </el-pagination>
    </div>
    
  </div>
  
</template>


<script>
import { defineComponent, ref } from 'vue'
import {request} from '@/network/request'
import { ElMessage } from 'element-plus'

export default defineComponent ({
  setup() {
    return {
      input: ref(''),
      // searchRange: ref(''),
      searchItem: ref('course_name'),

      alertNoData() {
        ElMessage.warning({
          message: '当前没有数据可以导出哦',
          type: 'warning'
        })
      },
    }
  },

  data() {
    return {
      loadingExport: false,

      // selectRangeOptions: [
      //   {
      //     value: 'school',
      //     label: '全校',
      //     children: [
      //       {
      //         value: '工学院',
      //         label: '工学院',
      //         children: [
      //           {
      //             value: '计算机系',
      //             label: '计算机系',
      //           },
      //           {
      //             value: '机械设计与自动化系',
      //             label: '机械设计与自动化系',
      //           },
      //           {
      //             value: '土木工程系',
      //             label: '土木工程系',
      //           },
      //           {
      //             value: '电子系',
      //             label: '电子系',
      //           },
      //         ]
      //       },
      //       {
      //         value: '商学院',
      //         label: '商学院',
      //         children: [
      //           {
      //             value: '工商管理',
      //             label: '工商管理',
      //           },
      //           {
      //             value: '商务英语',
      //             label: '商务英语',
      //           },
      //         ]
      //       },
      //       {
      //         value: '医学院',
      //         label: '医学院',
      //         children: [
      //           {
      //             value: '临床医学',
      //             lavel: '临床医学',
      //           },
      //           {
      //             value: '口腔科',
      //             label: '口腔科',
      //           },
      //           {
      //             value: '骨科',
      //             label: '骨科',
      //           }
      //         ]
      //       },
      //       {
      //         value: '海洋中心',
      //         label: '海洋中心',
      //         children: [
      //           {
      //             value: '海洋生物研究',
      //             label: '海洋生物研究'
      //           },
      //         ]
      //       },
      //       {
      //         value: '就业中心',
      //         label: '就业中心',
      //         children: [
      //           {
      //             value: '就业指导中心',
      //             label: '就业指导中心'
      //           },
      //         ]
      //       },
      //     ]
      //   },
      //   {
      //     value: 'my',
      //     label: '我的'
      //   }
      // ],
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

      evaluationSheetData: [],
      currentRow: null,

      evaluationSheetTotal: 0,
      currentPage: 1,
      pageSize: 3,

      // 实际最新点击了搜索按钮之后的查询条件。成功搜索后设置，防止后来点击修改了新的查询条件，但是没点击'搜索'的情况下，点击'导出'
      searchedSearchRangeValue: [], 
      searchedSchoolYearItem: '',
      searchedInput: '',
      searchedSearchItem: 'course_name',

    }
  },

  methods: {
    requestEvaluationSheet() {
      return request({
        url: '/evaluationSheetList',
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
        this.selectRangeOptions = res.selectRangeOptions
        let es = res.es
        // 若搜索结果为空返回的es: []
        this.evaluationSheetTotal = es.count ? es.count : 0
        this.evaluationSheetData = es.rows ? es.rows : []
        if(es.rows) {
          for(let i of this.evaluationSheetData) {
            let {class_id, course_name} = i
            let sheet_name = class_id + ' ' + course_name
            i.sheet_name = sheet_name
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
      this.requestEvaluationSheet()
    },

    // 点击"评估表"，然后跳转
    clickEvaluationSheet(id) {
      let routeData = this.$router.resolve({
        path: '/evaluationSheet/' + id,
      })
      window.open(routeData.href, '_blank')
    },

    // 点击"评估人"，搜索对应的submitter的evlauationSheetList
    searchSubmitter(submitter) {
      this.searchItem = 'submitter'
      this.input = submitter
      this.requestEvaluationSheet()
    },

    // 点击"课程类型"，搜索对应的classification的evlauationSheetList
    searchClassification(classification) {
      this.searchItem = 'classification'
      this.input = classification
      this.requestEvaluationSheet()
    },


    handleCurrentChange(val) {
      this.currentRow = val;
    },


    // 分页
    handleSizeChange(val) { // 目前没用
      console.log(`每页 ${val} 条`);
    },
    jumpPagination(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.requestEvaluationSheet()
    },

    exportExcel() {
      if(!this.evaluationSheetData.length) {
        this.alertNoData()
        return
      }
      this.loadingExport = true
      request({
        url: '/exportEvaluationSheetList',
        method: 'post',
        data: {
          // currentPage: this.currentPage,
          // pageSize: this.pageSize,
          searchRangeValue: this.searchedSearchRangeValue,
          searchItem: this.searchedSearchItem,
          schoolYearItem: this.searchedSchoolYearItem,
          input: this.searchedInput,
        },
        headers: {
          // 'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        console.log('export request success!')
        console.log(res)
        let es = res
        for(let i of es) {
          let {class_id, course_name} = i
          let sheet_name = class_id + ' ' + course_name
          i.sheet_name = sheet_name
        }
        require.ensure([], () => {
          const {export_json_to_excel} = require('@/vendor/Export2Excel')
          const tHeader = ['提交日期', '评估表', '评估人', '课程类型', '是否需要跟进']
          const filterVal = ['submit_time', 'sheet_name', 'submitter', 'classification', 'followUp']
          const list = es
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, 'evaluationListExcel')
        })
      }).catch(err => {
        console.log('request fail')
        console.log(err)
      })
      this.loadingExport = false
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },

  },
  created() {
    this.requestEvaluationSheet()
  },
})

</script>

<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .clickrable-text {
    cursor : pointer;
    text-decoration: underline;
  }
</style>