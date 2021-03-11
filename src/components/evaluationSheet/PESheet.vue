<template>
  <div class="content">
    <div class="title">{{title}}</div>
    <div>评估教师工号:  {{evaluationSheet.submitter_id}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评估教师姓名:  {{evaluationSheet.submitter}}</div>
    <brief-info v-bind:briefinfo="briefinfo"/>
    <div class="subtitle">一、教学环境观察。 请观察体育课程环境设施等条件是否符合教学要求。</div>
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
  name: 'PESheet',
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
      title: '汕头大学听课记录表（体育课适用）',
      briefinfo: {},
      environment: {},
      evaluationList: {},
      overallEvaluation: {},
      followUpRecord: {},

      evaluationListData: [
        {
          "event": "教学态度",
          "content": "教学认真，备课细致",
          "recommend": "教师按时到达授课运动场地；准时上、下课，不擅离课堂；课堂表现显示教师课前备课充分。",
          "grade": "",
        },
        {
          "event": "教学态度",
          "content": "讲课精神饱满，举止得体，仪容整洁",
          "recommend": "穿运动服和运动鞋上课；明确本次课内容及学习目标；平等对待学生，耐心辅导；在课堂上不使用手机等通信工具。",
          "grade": ""
        },
        {
          "event": "教学能力",
          "content": "教学内容符合大纲，安排合理",
          "recommend": "项目特点突出；有身体素质练习内容；符合大纲要求。",
          "grade": ""
        },
        {
          "event": "教学能力",
          "content": "讲解精确规范，教学方法适应学生学习需要",
          "recommend": "讲解清晰、示范动作准确规范；身体素质练习手段科学；教学方法有实效；能因材施教, 注重学生个性发展及培养自我锻炼能力。",
          "grade": ""
        },
        {
          "event": "教学能力",
          "content": "运动量适宜，教学能促进学生身体素质的发展",
          "recommend": "科学安排心肺功能锻炼内容，运动量适宜，有助于促进学生体质水平的提高；能促进学生运动技术、技能水平和身体素质的全面发展。",
          "grade": ""
        },
        {
          "event": "教学能力",
          "content": "师生间互动良好",
          "recommend": "师生之间互动良好，能够激发学生的学习兴趣与主动性；注重终身体育意识及创新能力培养。 ",
          "grade": ""
        },
        {
          "event": "教学措施",
          "content": "教学措施得当，有安全意识",
          "recommend": "热身准备活动充分，达到项目要求；对突发事故处理及时、科学、合理，如未发生可不评价。",
          "grade": ""
        },
        {
          "event": "教学措施",
          "content": "教学措施得当，有安全意识",
          "recommend": "教学措施能有助于增进学生身心健康，有助于培养学生的积极进取、团结协作和集体主义精神；教学中始终贯彻安全意识教育。",
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
