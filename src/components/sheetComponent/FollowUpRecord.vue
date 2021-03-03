<template>
  <div class="content">
    <!-- <div class="subtitle"></div> -->
    <!-- <div class="box">
    </div> -->
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
    </el-table>
    
  </div>
</template>

<script>
export default {
  name: 'FollowUpRecord',

  props: {
    followUpRecord: Object
  },

  data() {
    return {
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

      ]
    }
  },

  methods: {
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
    }
  },

  created() {
    let followUpDegreeText
    let {followUpDegree} = this.followUpRecord
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
        followUpDegreeText = '不需要跟进'
        break;
    }
    this.frData[0].content = followUpDegreeText
  }
}
</script>