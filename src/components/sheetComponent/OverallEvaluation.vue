<template>
  <div class="content">
    <el-table
      border
      :show-header="false"
      :data="oeData"
      style="width: 100%">
      <el-table-column
        prop=""
        label=""
        width="width">
        <template #default="scope">
          <div>{{scope.row.itemName}} {{scope.row.content}}</div>
          <div v-if="scope.row.itemName2">{{scope.row.itemName2}} {{scope.row.content2}}</div>
          <div v-if="scope.row.itemName3">{{scope.row.itemName3}} <span class="underlineItem">{{scope.row.content3}}</span></div>
          <div style="text-align: right;">
            <span v-if="scope.row.itemName4" style="margin-right: 50px;">{{scope.row.itemName4}} {{scope.row.content4}}</span>
            <span v-if="scope.row.itemName5" style="margin: 0 30px;">{{scope.row.itemName5}} {{scope.row.content5}}</span>
          </div>
          
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
export default {
  name: 'OverallEvaluation',

  props: {
    overallEvaluation: Object
  },

  data() {
    return {
      oeData: [
        {
          itemName: "最欣赏的方法或表现：",
          content: this.overallEvaluation.appreciateMethod
        },
        {
          itemName: "给任课教师的具体建议：",
          content: this.overallEvaluation.concreteSuggestion
        },
        {
          itemName: "本人对听课的课程的内容熟悉程度：",
          content: this.overallEvaluation.familiarity
        },
        {
          itemName: "建议推广主讲教师教学方法：",
          content: this.overallEvaluation.extension,
          itemName2: "建议主讲教师提升教学能力，学院（部、中心）继续听课跟进：",
          content12: this.overallEvaluation.followUp,
          itemName3: "其他建议：",
          content3: this.overallEvaluation.otherSuggestion,
          itemName4: "听课人（签名）：",
          content4: this.overallEvaluation.submitter,
          itemName5: "日期：",
          content5: this.overallEvaluation.submit_time
        },

      ]
    }
  },

  methods: {

  },

  created() {
    let familiarityText, extensionText, followUpText
    let {familiarity, extension, followUp} = this.overallEvaluation
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
    this.oeData[2].content = familiarityText
    this.oeData[3].content = extensionText
    this.oeData[3].content2 = followUpText

  }
}
</script>