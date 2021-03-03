<template>
  <div class="content">
    <div class="title">{{title}}</div>
    <div>评估教师工号:  {{evaluationSheet.submitter_id}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评估教师姓名:  {{evaluationSheet.submitter}}</div>
    <brief-info v-bind:briefinfo="briefinfo"/>
    <!-- <div class="subtitle">一、教学环境观察。请观察教室安排是否合理，教室设备，教室采光、通风、噪音、温度等环境条件是否符合教学要求以及其他可能影响到教学效果的环境因素。</div> -->
    <!-- <environment v-bind:environment="environment"/> -->
    <div class="subtitle">一、观察清单。评价等级包括：优、良、中、合格、不合格、不适用（含+、-）</div>
    <experiment-evaluation-list v-bind:evaluationList="evaluationList" v-bind:evaluationListData="evaluationListData" />
    <div class="subtitle">二、总体评价</div>
    <overall-evaluation v-bind:overallEvaluation="overallEvaluation" />
    <div class="subtitle" v-if="evaluationSheet.followUp === 'true'">三、跟进记录（勾选“需要跟进”及跟进“其他建议”时填写）</div>
    <follow-up-record v-if="evaluationSheet.followUp === 'true'" v-bind:followUpRecord="followUpRecord" />
  </div>
</template>

<script>
import BriefInfo from '@/components/sheetComponent/BriefInfo.vue'
// import Environment from '@/components/sheetComponent/Environment.vue'
// import EvaluationList from '@/components/sheetComponent/EvaluationList'
import ExperimentEvaluationList from '@/components/sheetComponent/ExperimentEvaluationList'
import OverallEvaluation from '@/components/sheetComponent/OverallEvaluation'
import FollowUpRecord from '@/components/sheetComponent/FollowUpRecord.vue'


export default {
  name: 'StudentReportSheet',
  components: {
    BriefInfo,
    // Environment,
    // EvaluationList,
    ExperimentEvaluationList,
    OverallEvaluation,
    FollowUpRecord,
  },
  props: {
    evaluationSheet: Object,
  },
  data() {
    return {
      title: '汕头大学听课记录表（实验课适用）',
      briefinfo: {},
      // environment: {},
      evaluationList: {},
      overallEvaluation: {},
      followUpRecord: {},

      evaluationListData: [
        {
          "category": "实验环境与实验准备",
          "observation": "实验规章制度有悬挂上墙；实验场地整洁，实验室教学环境符合卫生和安全的要求。",
          "grade": "",
        },
        {
          "category": "实验环境与实验准备",
          "observation": "实验仪器、工具、材料齐备， 且处于良好的使用状态。",
          "grade": ""
        },
        {
          "category": "教师指导过程",
          "observation": "对实验目的、实验内容、要求及注意事项的交代清楚明确。",
          "grade": ""
        },
        {
          "category": "教师指导过程",
          "observation": "教师能熟练操作和使用实验仪器（或软件工具），能及时发现实验中出现的问题，并恰当地引导学生自行合理解决。",
          "grade": ""
        },
        {
          "category": "教师指导过程",
          "observation": "实验内容充实，与实验大纲一致；讲授时间与实验操作时间分配比例恰当。",
          "grade": ""
        },
        {
          "category": "教师指导过程",
          "observation": "实验教师让学生独立完成实验、重视操作能力训练。",
          "grade": ""
        },
        {
          "category": "课堂组织管理",
          "observation": "每组实验人数安排合理（指在每套仪器设备上同时完成本实验项目的人数），学生能得到充分的动手操作机会。",
          "grade": ""
        },
        {
          "category": "课堂组织管理",
          "observation": "每组实验人数安排合理（指在每套仪器设备上同时完成本实验项目的人数），学生能得到充分的动手操作机会。",
          "grade": ""
        },
        {
          "category": "学生表现",
          "observation": "学生缺席、迟到现象少（低于5%）；学生能跟随老师的讲课节奏；不存在与课堂无关的手机、电脑使用情况或低头做其他事情等现象。",
          "grade": ""
        },
        {
          "category": "学生表现",
          "observation": "实验前学生有实验预习报告，实验时能遵循学生实验守则及实验安全操作规程。",
          "grade": ""
        },
        {
          "category": "总体评价等级",
          "observation": "",
          "grade": ""
        },
      ],

    }
  },
  methods: {
    
  },
  created() {
    let {
      course_setupUnit, course_name, class_id, teacher_name, class_time, place, attend_num, actual_num, role,
      // environment,
      evaluationList,
      appreciateMethod, concreteSuggestion, familiarity, extension, followUp, otherSuggestion, submitter, submit_time,
      followUpDegree, 
        followUpParticipantSuggestion, followUpParticipant, followUpParticipantTime, 
        followUpCollegeSuggestion, followUpCollege, followUpCollegeTime, 
        lecturerRectification, lecturer, lecturerTime, 
        followUpUnitSuggestion, followUpUnit, followUpUnitTime,
    } = this.evaluationSheet
    this.briefinfo = {course_setupUnit, course_name, class_id, teacher_name, class_time, place, attend_num, actual_num, role}
    // this.environment = {environment}
    this.evaluationList = evaluationList
    this.overallEvaluation = {appreciateMethod, concreteSuggestion, familiarity, extension, followUp, otherSuggestion, submitter, submit_time}
    this.followUpRecord = {
      followUpDegree, 
      followUpParticipantSuggestion, followUpParticipant, followUpParticipantTime, 
      followUpCollegeSuggestion, followUpCollege, followUpCollegeTime, 
      lecturerRectification, lecturer, lecturerTime, 
      followUpUnitSuggestion, followUpUnit, followUpUnitTime
    }
  },
}
</script>

<style>
  
</style>
