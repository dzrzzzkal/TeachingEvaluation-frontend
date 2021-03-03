<template>
  <div class="content">
    <div class="title">{{title}}</div>
    <div>评估教师工号:  {{evaluationSheet.submitter_id}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评估教师姓名:  {{evaluationSheet.submitter}}</div>
    <brief-info v-bind:briefinfo="briefinfo"/>
    <div class="subtitle">一、请观察服务实践环境是否安全，环境条件是否符合教学要求以及其他可能影响到教学效果的环境因素。</div>
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
  name: 'PracticeOfPublicWelfareSheet',
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
      title: '汕头大学听课记录表（公益课程服务实践适用）',
      briefinfo: {},
      environment: {},
      evaluationList: {},
      overallEvaluation: {},
      followUpRecord: {},

      evaluationListData:[
        {
          "event": "教师表现",
          "content": "沟通与交流",
          "recommend": "老师在课程中平易近人、令人信任，与学生们进行交流互动，注重培养学生们的交流和沟通能力。",
          "grade": "",
        },
        {
          "event": "教师表现",
          "content": "知识传授及价值观引导",
          "recommend": "老师不仅传授公益知识，同时引导学生们如何做人（如如何具有奉献精神和积极、乐观向上的价值取向等）。",
          "grade": ""
        },
        {
          "event": "教师表现",
          "content": "启发思考和能力培养",
          "recommend": "老师能启发学生们从多方面思考问题，注重培养学生们综合采用多种思维方式分析问题与解决问题的能力。",
          "grade": ""
        },
        {
          "event": "教师表现",
          "content": "活动准备及秩序维护",
          "recommend": "老师在服务前与学生们们一起详细讨论活动方案，活动过程中能够维持活动安全有序。",
          "grade": ""
        },
        {
          "event": "教师表现",
          "content": "服务实践与示范",
          "recommend": "老师严格按照活动方案进行实践服务，亲身示范如何安全、有效地进行服务。",
          "grade": ""
        },
        {
          "event": "教师表现",
          "content": "突发事件处理",
          "recommend": "老师能有效而及时地处理突发事件与紧急情况。",
          "grade": ""
        },
        {
          "event": "教师表现",
          "content": "指导和观察",
          "recommend": "老师能指导学生们如何与服务对象进行交流沟通，观察服务对象的行为和情感变化，进行资料的收集和整理。",
          "grade": ""
        },
        {
          "event": "教师表现",
          "content": "总结与反思",
          "recommend": "老师对实践服务进行总结到位、评价合理，在反思、分享过程中注意对学生们进行情感、态度、价值观和环保意识等方面的教育。",
          "grade": ""
        },
        {
          "event": "学生表现",
          "content": "出席与参与情况",
          "recommend": "学生缺席、迟到现象少（低于5%）；学生们都能有条不紊开展公益服务活动，分工明确，各司其职。",
          "grade": ""
        },
        {
          "event": "学生表现",
          "content": "表现积极、活跃",
          "recommend": "大多数学生表现活跃，学生之间、师生之间互动积极。",
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
