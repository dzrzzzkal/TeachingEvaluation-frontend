<template>
  <div>
    <el-cascader
      v-model="searchRangeValue"
      :options="selectRangeOptions"
      :props="{ multiple: true, checkStrictly: true }"
      clearable>
    </el-cascader>
    <div style="margin-top: 15px">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        class="input-with-select"
        clearable
      >
        <template #prepend>
          <!-- <el-select v-model="searchRange" placeholder="请选择">
            <el-option label="全校" value="school"></el-option>
            <el-option label="学院" value="college"></el-option>
            <el-option label="系" value="dept"></el-option>
            <el-option label="我的" value="my"></el-option>
          </el-select> -->

          <!-- <span style="border: 20px solid transparent"></span> -->
          <el-select v-model="searchItem" clearable placeholder="请选择">
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
        label="评估表"
        >
        <template #default="scope">
          <span class="clickrable-text" @click="clickEvaluationSheet(scope.row.id)">
            {{scope.row.class_id + ' ' + scope.row.course_name}}
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
      <el-button @click="setCurrent(evaluationSheetData[1])">选中第二行</el-button>
      <el-button @click="setCurrent()">取消选择</el-button>
    </div>

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

export default defineComponent ({
  setup() {
    return {
      input: ref(''),
      // searchRange: ref(''),
      searchItem: ref('course_name'),
    }
  },

  data() {
    return {
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

      evaluationSheetData: [],
      currentRow: null,

      evaluationSheetTotal: 0,
      currentPage: 1,
      pageSize: 3,
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
          input: this.input,
        },
        headers: {
          // 'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        console.log('request success!')
        console.log(res)
        let es = res.es
        this.evaluationSheetTotal = es.count
        this.evaluationSheetData = es.rows

        this.selectRangeOptions = res.selectRangeOptions
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


    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
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