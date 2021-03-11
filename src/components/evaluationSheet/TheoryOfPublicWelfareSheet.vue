<template>
  <div class="content">
    <div class="title">{{title}}</div>
    <div>评估教师工号:  {{evaluationSheet.submitter_id}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评估教师姓名:  {{evaluationSheet.submitter}}</div>
    <brief-info v-bind:briefinfo="briefinfo"/>
    <div class="subtitle">一、教学环境观察。请观察教室安排是否合理，教室设备，教室采光、通风、噪音、温度等环境条件是否符合教学要求以及其他可能影响到教学效果的环境因素。</div>
    <environment v-bind:environment="environment"/>
    <div class="subtitle">二、评价。评价等级包括：优、良、中、合格、不合格、不适用（含+、-）</div>
    <evaluation-list v-bind:evaluationList="evaluationList" v-bind:evaluationListData="evaluationListData" />
    <div class="subtitle">三、总体评价</div>
    <overall-evaluation v-bind:overallEvaluation="overallEvaluation" />
    <div class="subtitle" v-if="evaluationSheet.followUp === 'true'">四、跟进记录（勾选“需要跟进”及跟进“其他建议”时填写）</div>
    <follow-up-record v-if="evaluationSheet.followUp === 'true'" v-bind:followUpRecord="followUpRecord" />
  </div>
</template>

<script>
import BriefInfo from '@/components/sheetComponent/BriefInfo.vue'
import Environment from '@/components/sheetComponent/Environment.vue'
import EvaluationList from '@/components/sheetComponent/EvaluationList'
import OverallEvaluation from '@/components/sheetComponent/OverallEvaluation'
import FollowUpRecord from '@/components/sheetComponent/FollowUpRecord.vue'


export default {
  name: 'TheoryOfPublicWelfareSheet',
  components: {
    BriefInfo,
    Environment,
    EvaluationList,
    OverallEvaluation,
    FollowUpRecord,

  },
  props: {
    evaluationSheet: Object,
  },
  data() {
    return {
      title: '汕头大学听课记录表（公益课程理论讲授适用）',
      briefinfo: {},
      environment: {},
      evaluationList: {},
      overallEvaluation: {},
      followUpRecord: {},

      evaluationListData: [
        {
          "event": "教学态度",
          "content": "课堂掌控有序",
          "recommend": "能对课堂进行管理；课堂纪律好。",
          "grade": "",
        },
        {
          "event": "教学态度",
          "content": "教学认真，备课细致",
          "recommend": "课程开始时向学生指出具体的学习目标；有教学内容提纲。",
          "grade": ""
        },
        {
          "event": "教学态度",
          "content": "讲课精神饱满，举止得体，仪容整洁",
          "recommend": "课程中能有效地引导学生；多数时间是面向学生的（不是面对电脑或屏幕）；能与大多数学生沟通。",
          "grade": ""
        },
        {
          "event": "教学能力",
          "content": "对学生有引导，表达流畅",
          "recommend": "对学生的计划或分享给予及时反馈，能及时指出学生的不足；对关键的用词有解释；注重用语的准确、科学性。",
          "grade": ""
        },
        {
          "event": "教学能力",
          "content": "时间安排合理，节奏控制好",
          "recommend": "课程内容安排适当；能让学生始终保持学习兴趣。",
          "grade": ""
        },
        {
          "event": "教学能力",
          "content": "条理性强，内容熟练，运用启发式教学",
          "recommend": "讲授或指导有条理，从简单到复杂；老师对自己的计划或总结到位、评价合理；鼓励学生自由提问讨论并可随时应对学生的问题；",
          "grade": ""
        },
        {
          "event": "教学能力",
          "content": "理论联系实际；反映该服务内容的新进展",
          "recommend": "理论联系实际；反映该服务内容的新进展",
          "grade": ""
        },
        {
          "event": "教学手段",
          "content": "合理使用多媒体教学手段",
          "recommend": "老师自己上课使用的PPT应清晰；图示应与课程内容相匹配；能引导学生合理运用相片、视频、报告、论文等多种形式进行课程设计或总结。",
          "grade": ""
        },
        {
          "event": "学生表现",
          "content": "迟到现象少，听课率高",
          "recommend": "学生缺席、迟到现象少（低于5%）；学生能跟随老师的讲课节奏；不存在与课堂无关的手机、电脑使用情况或低头做其他事情等现象。",
          "grade": ""
        },
        {
          "event": "学生表现",
          "content": "课堂表现积极、活跃",
          "recommend": "大多数学生课堂表现活跃，学生之间、师生之间互动积极。",
          "grade": ""
        },
        {
          "event": "总体评价等级",
          "content": "",
          "recommend": "",
          "grade": ""
        },
      ],

    }
  },
  methods: {
    
  },
  created() {
    let {
      id,
      course_setupUnit, course_name, class_id, teacher_name, class_time, place, attend_num, actual_num, role,
      environment,
      evaluationList,
      appreciateMethod, concreteSuggestion, familiarity, extension, followUp, otherSuggestion, submitter, submit_time,
      followUpDegree, 
        followUpParticipantSuggestion, followUpParticipant, followUpParticipantTime, 
        followUpCollegeSuggestion, followUpCollege, followUpCollegeTime, 
        lecturerRectification, lecturer, lecturerTime, 
        followUpUnitSuggestion, followUpUnit, followUpUnitTime,
    } = this.evaluationSheet
    this.briefinfo = {course_setupUnit, course_name, class_id, teacher_name, class_time, place, attend_num, actual_num, role}
    this.environment = {environment}
    this.evaluationList = evaluationList
    this.overallEvaluation = {appreciateMethod, concreteSuggestion, familiarity, extension, followUp, otherSuggestion, submitter, submit_time}
    this.followUpRecord = {
      id,
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
