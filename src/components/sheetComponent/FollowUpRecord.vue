<template>
  <div class="content">
    <el-table
      border
      :show-header="false"
      :data="frData"
      :span-method="objectSpanMethod"
      style="width: 100%">
      <el-table-column
        prop=""
        label=""
        width="200px">
        <template #default="scope">
          <div>{{scope.row.itemName}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label=""
        width="width">
        <template #default="scope">
          <div>{{scope.row.content}}</div>
          <div v-if="scope.$index !== 0"></div>
          <div style="text-align: right;">
            <span v-if="scope.$index !== 0" style="display: inline-block; text-align: left; min-width: 150px; margin-right: 20px;">(签名)：    {{scope.row.signer}}</span>
            <span v-if="scope.$index !== 0" style="display: inline-block; text-align: left; min-width: 150px; margin: 0 30px;">日期：    {{scope.row.date}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80px">
        <template #default="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改跟进记录" v-model="dialogFormVisible">
      <div v-if="currentIndex == 0">
        <el-form :model="form">
          <el-form-item label="" :label-width="formLabelWidth">
            <label for="content" style="display: flex; flex-direction: row; margin: 10px">
              <el-radio-group v-model="tempFollowUpDegree">
                <el-radio :label="'教研室/系/院/组织了交流讨论'">教研室/系/院/组织了交流讨论</el-radio>
                <el-radio :label="'与被听课教师/教学单位负责人/教学管理服务中心交流、反馈了意见'">与被听课教师/教学单位负责人/教学管理服务中心交流、反馈了意见</el-radio>
                <el-radio :label="'建议修订课程目标'">建议修订课程目标</el-radio>
              </el-radio-group>
            </label>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <el-form :model="form">
          <el-form-item label="" :label-width="formLabelWidth">
            <label for="content" style="display: flex; flex-direction: row; margin: 10px">
              <span style="min-width: 210px">{{form.itemName}}：</span>
              <el-input id="content" v-model="form.content"></el-input>
            </label>
            <label for="signer" style="display: flex; flex-direction: row; margin: 10px">
              <span style="min-width: 210px">签名：</span>
              <el-input id="signer" v-model="form.signer"></el-input>
            </label>
            <label for="date" style="display: flex; flex-direction: row; margin: 10px">
              <span style="min-width: 200px">日期：</span>
              <div class="block">
                <el-date-picker
                  v-model="form.date"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :disabled-date="disabledDate"
                  :shortcuts="shortcuts"
                  format="YYYY/MM/DD"
                >
                </el-date-picker>
              </div>
            </label>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="update">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-button type="primary" @click="submitModifiedFollowUpRecord">提交跟进记录</el-button>
  </div>
</template>

<script>
import {request} from '@/network/request'
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'FollowUpRecord',

  props: {
    followUpRecord: Object
  },

  setup() {
    return {
      modifySuccess() {
        ElMessage({
          showClose: true,
          message: '修改跟进记录成功。',
          type: 'success'
        });
      }
    }
  },

  data() {
    return {
      id: '',  // 本followUpRecord所属评估表的id
      frData: [
        {
          itemName: "",
          content: this.followUpRecord.followUpDegree
        },
        {
          itemName: "（跟进听课）听课教师意见及建议",
          content: this.followUpRecord.followUpParticipantSuggestion,
          signer: this.followUpRecord.followUpParticipant,
          date: this.followUpRecord.followUpParticipantTime
        },
        {
          itemName: "学院（部、中心）跟进意见",
          content: this.followUpRecord.followUpCollegeSuggestion,
          signer: this.followUpRecord.followUpCollege,
          date: this.followUpRecord.followUpCollegeTime
        },
        {
          itemName: "主讲教师反思及整改方案",
          content: this.followUpRecord.lecturerRectification,
          signer: this.followUpRecord.lecturer,
          date: this.followUpRecord.lecturerTime
        },
        {
          itemName: "教学管理、服务部门意见",
          content: this.followUpRecord.followUpUnitSuggestion,
          signer: this.followUpRecord.followUpUnit,
          date: this.followUpRecord.followUpUnitTime
        }

      ],

      changedFollowUpRecord: {},

      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {},
      currentIndex: '',
      followUpDegree: this.followUpRecord.followUpDegree,
      tempFollowUpDegree: this.followUpRecord.followUpDegree,

      // el-date-picker
      disabledDate(time) {
        return time.getTime() > Date.now()
      },
      shortcuts: [{
        text: 'Today',
        value: new Date(),
      }, {
        text: 'Yesterday',
        value: (() => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          return date
        })(),
      }, {
        text: 'A week ago',
        value: (() => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          return date
        })(),
      }],
    }
  },

  methods: {
    matchFollowUpDegree(followUpDegree) {
      let followUpDegreeText = ''
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
          // followUpDegreeText = '不需要跟进'
          followUpDegreeText = followUpDegree
          break;
      }
      return followUpDegreeText
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if(rowIndex === 0) {
        if(columnIndex === 0) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }else {
          return {
            rowspan: 1,
            colspan: 2
          }
        }
      }
    },

    handleEdit(index, row) {
      // console.log(index, row);
      this.currentIndex = index

      this.form = JSON.parse(JSON.stringify(this.frData[index]))
      let {date} = this.form
      if(date) {
        let year = date.split('/')[0]
        let month = date.split('/')[1]
        let day = date.split('/')[2]
        let ms = new Date(year, month - 1, day)
        this.form.date = new Date(ms)
      }
      this.dialogFormVisible = true
    },

    cancel() {
      this.tempFollowUpDegree = this.followUpDegree // 设回原本的数值
      this.dialogFormVisible = false;
    },

    update() {
      let index = this.currentIndex
      let contentName, signerName, dateName
      if(index == 0) {
        this.followUpDegree = this.tempFollowUpDegree
        let followUpDegree = this.followUpDegree
        let followUpDegreeText = this.matchFollowUpDegree(followUpDegree)
        this.frData[0].content = followUpDegreeText

        this.changedFollowUpRecord.followUpDegree = this.followUpDegree
      }else {
        let date = this.form.date
        let year = date.getFullYear()
        let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        this.form.date = `${year}/${month}/${day}`
        switch (index) {
          case 1:
            contentName = 'followUpParticipantSuggestion'
            signerName = 'followUpParticipant'
            dateName = 'followUpParticipantTime'
            break;
          case 2:
            contentName = 'followUpCollegeSuggestion'
            signerName = 'followUpCollege'
            dateName = 'followUpCollegeTime'
            break;
          case 3:
            contentName = 'lecturerRectification'
            signerName = 'lecturer'
            dateName = 'lecturerTime'
            break;
          case 4:
            contentName = 'followUpUnitSuggestion'
            signerName = 'followUpUnit'
            dateName = 'followUpUnitTime'
            break;
          default:
            break;
        }
        if(this.frData[index].content !== this.form.content) {
          this.changedFollowUpRecord[contentName] = this.form.content
        }
        if(this.frData[index].signer !== this.form.signer) {
          this.changedFollowUpRecord[signerName] = this.form.signer
        }
        if(this.frData[index].date !== this.form.date) {
          this.changedFollowUpRecord[dateName] = this.form.date
        }
        this.frData[index] = this.form
      }
      // console.log(this.form)
      // console.log(this.changedFollowUpRecord)

      this.dialogFormVisible = false
    },

    submitModifiedFollowUpRecord() {
      if(Object.keys(this.changedFollowUpRecord).length == 0) {
        alert('没有被修改的跟进记录哦。')
      }else {
        // console.log('submit')
        // console.log(this.changedFollowUpRecord)
        this.requestModifyFollowUpRecord()
      }
    },

    requestModifyFollowUpRecord() {
      return request({
        url: '/modifyFollowUpRecord',
        method: 'post',
        data: {
          id: this.id,
          followUpRecord: this.changedFollowUpRecord
        },
        headers: {
          // 'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {  // res:{msg} / res:{errMsg}
        if(res.errMsg) {
          alert('修改失败。')
        }else {
          this.changedFollowUpRecord = {}
          this.modifySuccess()
        }
      }).catch(err => {
        alert(err)
      })
    }
  },

  created() {
    let {id, followUpDegree} = this.followUpRecord
    this.id = id
    let followUpDegreeText = this.matchFollowUpDegree(followUpDegree)
    this.frData[0].content = followUpDegreeText
  }
})
</script>