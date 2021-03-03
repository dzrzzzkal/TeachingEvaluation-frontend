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
// @ is an alias to /src
import BriefInfo from '@/components/sheetComponent/BriefInfo.vue'
import Environment from '@/components/sheetComponent/Environment.vue'
import EvaluationList from '@/components/sheetComponent/EvaluationList'
import OverallEvaluation from '@/components/sheetComponent/OverallEvaluation'
import FollowUpRecord from '@/components/sheetComponent/FollowUpRecord.vue'


export default {
  name: 'TheorySheet',
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
      title: '汕头大学听课记录表（理论课适用）',
      briefinfo: {},
      environment: {},
      evaluationList: {},
      overallEvaluation: {},
      followUpRecord: {},

      evaluationListData: [
        {
          "event": "教学态度",
          "content": "教学认真，备课细致",
          "recommend": "向学生指出具体并对学习有指导性的目标；有教学内容提纲；对所下结论提供证据信息；结束时有总结。",
          "grade": "",
        },
        {
          "event": "教学态度",
          "content": "讲课精神饱满，举止得体，仪容整洁",
          "recommend": "多数时间是面向学生的（不是面对电脑或屏幕），能与大多数学生沟通。",
          "grade": ""
        },
        {
          "event": "教学能力",
          "content": "声音宏亮，外语或普通话发音准确，表达流畅",
          "recommend": "对关键的用词有解释；注重用语的准确、科学性。",
          "grade": ""
        },
        {
          "event": "教学能力",
          "content": "时间安排合理，节奏控制好",
          "recommend": "能从容完成授课计划；提问并给予学生时间思考；内容过渡合理。",
          "grade": ""
        },
        {
          "event": "教学能力",
          "content": "条理性强，内容熟练，运用启发式教学",
          "recommend": "讲授有条理；对学生表现给予及时反馈；不需要逐字读PPT；鼓励学生自由提问讨论并可随时应对学生的问题。",
          "grade": ""
        },
        {
          "event": "教学能力",
          "content": "内容符合大纲要求，重点突出",
          "recommend": "一节课的知识点数量适当；收尾时强调重点；示范对重点知识的应用；提出进一步学习的参考文献；给学生创造应用知识的机会。",
          "grade": ""
        },
        {
          "event": "教学能力",
          "content": "理论联系实际；反映学科进展",
          "recommend": "采用具体事例帮助学生理解；结合学科较新热点或引用较新文献。",
          "grade": ""
        },
        {
          "event": "教学手段",
          "content": "内容简明扼要；合理使用多媒体教学手段",
          "recommend": "PPT应清晰；图示应与课程内容相匹配；合理运用图片、视频等资料；多媒体技术运用应服务于课堂教学，避免干扰正常教学秩序情况。",
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
  /* .title {
    font-size: 26px;
    font-weight: bold;
  }
  .content {
    width: 1000px;
    border: 3px dotted rgb(50, 12, 187);
  }
  .box {
    border: 1px solid black;
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
  } */
</style>
