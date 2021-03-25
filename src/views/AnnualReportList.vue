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
        placeholder="请输入：教师工号 / 教师姓名"
        v-model="input"
        class="input-with-select"
        clearable
      >
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
      :data="annualReportData"
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
        <template #default="scope">
          {{scope.row.submit_time}}
        </template>
      </el-table-column>
      <el-table-column
        property="report_name"
        label="年度总结报告"
        width="500"
        >
        <template #default="scope">
          <span class="clickrable-text" @click="clickAnnualReport(scope.row.id, scope.row.report_name)" style="text-overflow: ellipsis;">
            {{scope.row.report_name}}
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
        property="college"
        label="学院"
        width="120">
      </el-table-column>
      <el-table-column
        property="dept"
        label="系"
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
        :total="annualReportTotal">
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

      alertNoData() {
        ElMessage.warning({
          message: '当前没有数据可以导出哦',
          type: 'warning'
        })
      },
      alertDownloadAnnualReportFail() {
        ElMessage.warning({
          message: '下载文件失败',
          type: 'error'
        })
      }
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

      annualReportData: [],
      currentRow: null,

      annualReportTotal: 0,
      currentPage: 1,
      pageSize: 3,

      // 实际最新点击了搜索按钮之后的查询条件。成功搜索后设置，防止后来点击修改了新的查询条件，但是没点击'搜索'的情况下，点击'导出'
      searchedSearchRangeValue: [], 
      searchedSchoolYearItem: '',
      searchedInput: '',

    }
  },

  methods: {
    requestAnnualReport() {
      return request({
        url: '/annualReportList',
        method: 'post',
        data: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          searchRangeValue: this.searchRangeValue,
          schoolYearItem: this.schoolYearItem,
          input: this.input,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        this.selectRangeOptions = res.selectRangeOptions
        let ar = res.ar
        // 若搜索结果为空返回的ar: []
        this.annualReportTotal = ar.count ? ar.count : 0
        this.annualReportData = ar.rows ? ar.rows : []
        if(ar.rows) {
          for(let i of this.annualReportData) {
            i.submit_time = i.createdAt.substring(0, 10)
            delete i.createdAt
          }
        }

        this.searchedSearchRangeValue = this.searchRangeValue
        this.searchedSchoolYearItem = this.schoolYearItem
        this.searchedInput = this.input
      }).catch(err => {
        console.log('request fail')
        console.log(err)
      })
    },

    // 点击搜索按钮
    search() {
      this.requestAnnualReport()
    },

    // 点击"评估表"，然后跳转
    clickAnnualReport(id, report_name) {
      function downloadFile(res, fileName) {
        if (!res) {
          return
        }
        if (window.navigator.msSaveBlob) {  // IE以及IE内核的浏览器
          try {
            window.navigator.msSaveBlob(res, fileName)  // res为接口返回数据，这里请求的时候已经处理了，如果没处理需要在此之前自行处理var data = new Blob([res.data]) 注意这里需要是数组形式的,fileName就是下载之后的文件名
            // window.navigator.msSaveOrOpenBlob(res, fileName)
          } catch (e) {
            console.log(e)
          }
        } else {
          let url = window.URL.createObjectURL(new Blob([res]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName)// 文件名
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) // 下载完成移除元素
          window.URL.revokeObjectURL(url) // 释放掉blob对象
        }
      }
      return request({
        url: '/annualReport/' + 3,
        method: 'get',
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded'
          // 'Content-Type': 'application/msword'
        }
      }).then(res => {
        downloadFile(res, report_name)
      }).catch(err => {
        this.alertDownloadAnnualReportFail()
      })
    },

    // 点击"评估人"，搜索对应的submitter的evlauationSheetList
    searchSubmitter(submitter) {
      this.input = submitter
      this.requestAnnualReport()
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
      this.requestAnnualReport()
    },

    exportExcel() {
      if(!this.annualReportData.length) {
        this.alertNoData()
        return
      }
      this.loadingExport = true
      request({
        url: '/exportAnnualReportList',
        method: 'post',
        data: {
          searchRangeValue: this.searchedSearchRangeValue,
          schoolYearItem: this.searchedSchoolYearItem,
          input: this.searchedInput,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        console.log('export request success!')
        console.log(res)
        let ar = res
        if(ar.rows) {
          for(let i of this.annualReportData) {
            i.submit_time = i.createdAt.substring(0, 10)
            delete i.createdAt
          }
        }
        require.ensure([], () => {
          const {export_json_to_excel} = require('@/vendor/Export2Excel')
          const tHeader = ['提交日期', '年度总结报告', '评估人', '学院', '系']
          const filterVal = ['submit_time', 'report_name', 'submitter', 'college', 'dept']
          const list = ar
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, 'annualReportListExcel')
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
    this.requestAnnualReport()
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