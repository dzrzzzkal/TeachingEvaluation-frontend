<template>
  <div>
    <!-- <div style="padding:30px;">
      <div>查看evaluation sheet</div>
      <div>evaluationSheetid：{{evaluationSheetid}}</div>
      <input type="text" v-model="evaluationSheetid" placeholder="evaluation sheet id">
      <br>  
      <input type="button" @click="submit" value="download">
      <br>
      <button @click="download">下载</button>
      <br>
      <button @click="download1">下载1</button>
    </div> -->
    <div class="sheet-content">
      <el-button type="primary" @click="exportFile" :loading="loadingExport">导出文档</el-button>
      <div v-if="evaluationSheet.classification === 'theory'">
        <theory-sheet v-bind:evaluationSheet="evaluationSheet"/>
      </div>
      <div v-else-if="evaluationSheet.classification === 'student report'">
        <student-report-sheet v-bind:evaluationSheet="evaluationSheet"/>
      </div>
      <div v-else-if="evaluationSheet.classification === 'experiment'">
        <experiment-sheet v-bind:evaluationSheet="evaluationSheet"/>
      </div>
      <div v-else-if="evaluationSheet.classification === 'PE'">
        <p-e-sheet v-bind:evaluationSheet="evaluationSheet" />
      </div>
      <div v-else-if="evaluationSheet.classification === 'theory of public welfare'">
        <theory-of-public-welfare-sheet v-bind:evaluationSheet="evaluationSheet"/>
      </div>
      <div v-else-if="evaluationSheet.classification === 'practice of public welfare'">
        <practice-of-public-welfare-sheet v-bind:evaluationSheet="evaluationSheet"/>
      </div>
      <div v-else>
        当前查询的评估表不存在或没有权限查询哦。
        <div>{{evaluationSheet.fail}}</div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { defineComponent, ref } from 'vue'
import { request } from '@/network/request'
// import { mapMutations } from 'vuex'
import axios from 'axios'
import { ElMessage } from 'element-plus'

import 'docxtemplater/build/docxtemplater.js'
import 'pizzip/dist/pizzip.js'
import 'pizzip/dist/pizzip-utils.js'
import 'file-saver'


import TheorySheet from '@/components/evaluationSheet/TheorySheet.vue'
import StudentReportSheet from '@/components/evaluationSheet/StudentReportSheet'
import ExperimentSheet from '@/components/evaluationSheet/ExperimentSheet'
import PESheet from '@/components/evaluationSheet/PESheet'
import TheoryOfPublicWelfareSheet from '../components/evaluationSheet/TheoryOfPublicWelfareSheet.vue'
import PracticeOfPublicWelfareSheet from '@/components/evaluationSheet/PracticeOfPublicWelfareSheet'

export default defineComponent ({
  name: 'EvaluationSheet',
  components: {
    TheorySheet,
    StudentReportSheet,
    ExperimentSheet,
    PESheet,
    TheoryOfPublicWelfareSheet,
    PracticeOfPublicWelfareSheet,
  },
  setup() {
    return {
      alertNoData() {
        ElMessage.warning({
          message: '当前没有内容可以导出哦',
          type: 'warning'
        })
      },
    }
  },
  data() {
    return {
      evaluationSheetid: '',
      evaluationSheet: {},

      wordData: {},
      loadingExport: false,
    } 
  },
  methods: {
    requestEvaluationSheet() {
      return request({
        url: '/evaluationSheet/' + this.evaluationSheetid,
        method: 'get',
        // params: {},
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        // 以下不需要res.data.xxx，因为响应拦截器已经拦截了，直接返回的就是res.data
        this.evaluationSheet = res
      }).catch(err => {
        console.log(err)
      })
    },

    setWordData() {
      let {
        submitter_id,
        course_setupUnit, course_name, class_id, teacher_name, class_time, place, attend_num, actual_num, role,
        environment,
        evaluationList,
        appreciateMethod, concreteSuggestion, familiarity, extension, followUp, otherSuggestion, submitter, submit_time,
        followUpDegree, 
          followUpParticipantSuggestion, followUpParticipant, followUpParticipantTime, 
          followUpCollegeSuggestion, followUpCollege, followUpCollegeTime, 
          lecturerRectification, lecturer, lecturerTime, 
          followUpUnitSuggestion, followUpUnit, followUpUnitTime
      } = this.evaluationSheet
      
      let roleType 
      switch (role) {
        case '教师':
          roleType = '听课类型：■教师听课  □领导听课  □督导听课'
          break;
        case '领导':
          roleType = '听课类型：□教师听课  ■领导听课  □督导听课'
          break
        case '督导':
          roleType = '听课类型：□教师听课  □领导听课  ■督导听课'
          break
      }
      let familiarityText, extensionText, followUpText
      switch (familiarity) {
        case '非常熟悉':
          familiarityText = '■非常熟悉    □熟悉    □不太熟悉     □完全不熟悉'
          break;
        case '熟悉':
          familiarityText = '□非常熟悉    ■熟悉    □不太熟悉     □完全不熟悉'
          break;
        case '不太熟悉':
          familiarityText = '□非常熟悉    □熟悉    ■不太熟悉     □完全不熟悉'
          break;
        case '完全不熟悉':
          familiarityText = '□非常熟悉    □熟悉    □不太熟悉     ■完全不熟悉'
          break;
        default:
          break;
      }
      switch (extension) {
        case 'true':
          extensionText = '■ 是  □ 否 '
          break;
        case 'false':
          extensionText = '□ 是  ■ 否 '
          break;
        default:
          break;
      }
      switch (followUp) {
        case 'true':
          followUpText = '■  需要跟进   □ 不需要跟进'
          break;
        case 'false':
          followUpText = '□  需要跟进   ■ 不需要跟进'
          break
        default:
          break;
      }
      role = roleType
      familiarity = familiarityText
      extension = extensionText
      followUp = followUpText
      if(followUp === 'true') {
        let followUpDegreeText
        switch (followUpDegree) {
          case '教研室/系/院/组织了交流讨论':
            followUpDegreeText = '■ 教研室/系/院/组织了交流讨论；□ 与被听课教师/教学单位负责人/教学管理服务中心交流、反馈了意见；□ 建议修订课程目标'
            break;
          case '与被听课教师/教学单位负责人/教学管理服务中心交流、反馈了意见':
            followUpDegreeText = '□ 教研室/系/院/组织了交流讨论；■ 与被听课教师/教学单位负责人/教学管理服务中心交流、反馈了意见；□ 建议修订课程目标'
            break;
          case '建议修订课程目标':
            followUpDegreeText = '□ 教研室/系/院/组织了交流讨论；□ 与被听课教师/教学单位负责人/教学管理服务中心交流、反馈了意见；■ 建议修订课程目标'
            break;
          default:
            break;
        }
        followUpDegree = followUpDegreeText
      }else {
        followUpDegree = '□ 教研室/系/院/组织了交流讨论；□ 与被听课教师/教学单位负责人/教学管理服务中心交流、反馈了意见；□ 建议修订课程目标'
        followUpParticipantSuggestion = followUpParticipant = followUpParticipantTime = 
          followUpCollegeSuggestion = followUpCollege = followUpCollegeTime = 
          lecturerRectification = lecturer = lecturerTime = 
          followUpUnitSuggestion = followUpUnit = followUpUnitTime = ''
      }
      
      this.wordData = {
        submitter_id,
        course_setupUnit, course_name, class_id, teacher_name, class_time, place, attend_num, actual_num, role,
        environment,
        // evaluationList,
        appreciateMethod, concreteSuggestion, familiarity, extension, followUp, otherSuggestion, submitter, submit_time,
        followUpDegree, 
          followUpParticipantSuggestion, followUpParticipant, followUpParticipantTime, 
          followUpCollegeSuggestion, followUpCollege, followUpCollegeTime, 
          lecturerRectification, lecturer, lecturerTime, 
          followUpUnitSuggestion, followUpUnit, followUpUnitTime
      }

      let el = evaluationList.split(',')
      for(let i in el) {
        // eval("var grade" + i + "=" + el[i])
        this.wordData[`grade${i}`] = el[i]
      }
    },

    loadFile(url, callback) {
      // 读取并获得模板文件的二进制内容
      PizZipUtils.getBinaryContent(url, callback)
    },

    exportFile() {
      if(this.evaluationSheet.fail) {
        this.alertNoData()
        return
      }
      this.loadingExport = true
      var that = this
      this.setWordData()
      let sheetName
      let {classification} = this.evaluationSheet
      switch (classification) {
        case 'theory':
          sheetName = 'TheorySheet'
          break;
        case 'student report':
          sheetName = 'StudentReportSheet'
          break;
        case 'experiment':
          sheetName = 'ExperimentSheet'
          break;
        case 'PE':
          sheetName = 'PESheet'
          break;
        case 'theory of public welfare':
          sheetName = 'TheoryOfPublicWelfareSheet'
          break;
        case 'practice of public welfare':
          sheetName = 'PracticeOfPublicWelfareSheet'
          break;
        default:
          break;
      }
      // this.loadFile("../../public/esl.docx", function (error, content) {
      this.loadFile("/" + sheetName + ".docx", function (error, content) {
        if (error) {
          throw error
        };
        // 创建一个PizZip实例，内容为模板的内容
        var zip = new PizZip(content);
        // 创建并加载docxtemplater实例对象
        var doc = new window.docxtemplater().loadZip(zip)
        // 设置模板变量的值
        doc.setData({
          ...that.wordData
        });
        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render()
        } catch (error) {
          var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
          }
          console.log(JSON.stringify({
            error: e
          }));
          // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
          throw error;
        }
        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        var out = doc.getZip().generate({
          type: "blob",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }) //Output the document using Data-URI
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, sheetName + ".docx")
      })
      this.loadingExport = false
    },


    // submit() {
    //   function downloadFile(res, fileName) {
    //     if (!res) {
    //       return
    //     }
    //     if (window.navigator.msSaveBlob) {  // IE以及IE内核的浏览器
    //       try {
    //         window.navigator.msSaveBlob(res, fileName)  // res为接口返回数据，这里请求的时候已经处理了，如果没处理需要在此之前自行处理var data = new Blob([res.data]) 注意这里需要是数组形式的,fileName就是下载之后的文件名
    //         // window.navigator.msSaveOrOpenBlob(res, fileName);  //此方法类似上面的方法，区别可自行百度
    //       } catch (e) {
    //         console.log(e)
    //       }
    //     } else {
    //       let url = window.URL.createObjectURL(new Blob([res]))
    //       let link = document.createElement('a')
    //       link.style.display = 'none'
    //       link.href = url
    //       link.setAttribute('download', fileName)// 文件名
    //       document.body.appendChild(link)
    //       link.click()
    //       document.body.removeChild(link) // 下载完成移除元素
    //       window.URL.revokeObjectURL(url) // 释放掉blob对象
    //     }
    //   }
    //   return request({
    //     // url: '/evaluationSheet/' + this.evaluationSheetid,
    //     url: '/es',
    //     method: 'get',
    //     responseType: 'blob',
    //     // params: {},
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // 'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    //   }).then(res => {
    //     downloadFile(res, 'es.docx')

    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },

//     download() {
//       axios.get('http://localhost:3000/es', {
//         params: {

//         },
//         headers: {
//           'Authorization': 'Bearer ' + localStorage.getItem('token')
//         },
//         // 重要
//         responseType: 'blob'
//       }).then(res=> {
//         // https://blog.csdn.net/mibi8840/article/details/86741982?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&dist_request_id=d454a54b-356d-47ea-9c1f-e970f2dc83ee&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control
//         let data = res.data
//         if (!data) {
//             return
//         }
//         let url = window.URL.createObjectURL(new Blob([data]))
//         let link = document.createElement('a')
//         link.style.display = 'none'
//         link.href = url
//         // 获取文件名
//         // download 属性定义了下载链接的地址而不是跳转路径
//         link.setAttribute('download', '1.docx')
//         document.body.appendChild(link)
//         link.click()


// // https://blog.csdn.net/JustDI0209/article/details/90236038?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control&dist_request_id=d64fee73-17fa-4dfd-bfae-6fd36433db79&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control
//         // const content = res.data
//         // const blob = new Blob([content]) // 构造一个blob对象来处理数据
//         // const fileName = 'monthAssess.docx' // 导出文件名
//         // // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
//         // // IE10以上支持blob但是依然不支持download
//         // if ('download' in document.createElement('a')) { // 支持a标签download的浏览器
//         //   const link = document.createElement('a') // 创建a标签
//         //   link.download = fileName // a标签添加属性
//         //   link.style.display = 'none'
//         //   link.href = URL.createObjectURL(blob)
//         //   document.body.appendChild(link)
//         //   link.click() // 执行下载
//         //   URL.revokeObjectURL(link.href) // 释放url
//         //   document.body.removeChild(link) // 释放标签
//         // } else { // 其他浏览器
//         //   navigator.msSaveBlob(blob, fileName)
//         // }
//       }).catch(err => {
//         console.log('err: ', err)
//       })

//     },
//     download1() {
//       // https://www.jianshu.com/p/79f1b3671cf0
//       window.open('http://localhost:3000/es')
//     },
  },
  created() {
    let {id} = this.$route.params
    this.evaluationSheetid = id

    this.requestEvaluationSheet()
  },
  
})


</script>

<style>
  .sheet-content {
    width: 1000px;
    margin: 0 auto;
    /* height: 500px; */
  }

  .title {
    font-size: 26px;
    font-weight: bold;
  }
  .content {
    width: 1000px;
  }
  .box {
    min-height: 100px;
    width: 1000px;
    margin: 10px 0;
  }
  .subtitle {
    text-align: left;
    font-family: 'Arial', 'Microsoft YaHei','微软雅黑'
  }
  .underlineItem {
    padding: 0 15px;
    border-bottom: 1px solid black;
  }
</style>