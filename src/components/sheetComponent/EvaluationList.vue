<template>
  <div class="content">
    <div class="box">
      <el-table id="out-table" :data="elData" border :span-method="objectSpanMethod" style="width: 100%">
        <el-table-column
          property="event"
          label="项目"
          width="100%">
        </el-table-column>
        <el-table-column
          property="content"
          label="内容"
          width="200%">
        </el-table-column>
        <el-table-column
          property="recommend"
          label="推荐如下有效的教学行为"
          width="">
        </el-table-column>
        <el-table-column
          property="grade"
          label="评价等级"
          width="90%">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EvaluationList',
  // props: {
  //   evaluationList: String
  // },
  props: ['evaluationList', 'evaluationListData'],
  data() {
    return {
      el: this.evaluationList,
      elData: this.evaluationListData,
      elDataLength: this.evaluationListData ? this.evaluationListData.length : 0,
    }
  },
  methods: {
     getListDataForRowAndColumn(data){
      let that = this
      that.rowAndColumn = []  //页面展示的数据，不一定是全部的数据，所以每次都清空之前存储的 保证遍历的数据是最新的数据。以免造成数据渲染混乱
      that.rowRoomColumn = []
      for (let i = 0; i < data.length; i++) {
        //判断是否是第一项（取决于准备合并表格第几项）
        if (i === 0) {
          // 如果是第一条记录（即索引是0的时候），向数组中加入１
          that.rowAndColumn.push(1);
          that.pos = 0;
          that.rowRoomColumn.push(1);
          that.posT = 0;
        } else {
          //不是第一项时，就根据标识去存储
          if (data[i].event === data[i - 1].event) {
            // 查找到符合条件的数据时每次要把之前存储的数据+1
            // 如果storeName相等就累加，并且push 0
            that.rowAndColumn[that.pos] += 1
            that.rowAndColumn.push(0)
            if (data[i].content === data[i - 1].content) {
              // 如果roomName相等就累加，并且push 0
              that.rowRoomColumn[that.posT] += 1
              that.rowRoomColumn.push(0)
            }else{
              that.rowRoomColumn.push(1)
              that.posT = i
            }
          }else {
            // 没有符合的数据时，要记住当前的index
            // 不相等push 1
            that.rowAndColumn.push(1)
            that.pos = i;
            that.rowRoomColumn.push(1)
            that.posT = i
          }
        }
      }
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {  // span为0好像不展示
      // 页面列表上 表格合并行 -> 第几列(从0开始)
      // 需要合并多个单元格时 依次增加判断条件即可
      let that = this
      if(rowIndex === that.elDataLength - 1) { // 最后一行'总体评价等级'
        if(columnIndex === 3) {
          return {
            rowspan: 1,
            colspan: 1
          }
        }else if(columnIndex === 0) {
          return {
            rowspan: 1,
            colspan: 3
          }
        }else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
      if (columnIndex === 0) {
        if (that.rowAndColumn[rowIndex]) {
          // 数组存储的数据 取出
          let rowNum = that.rowAndColumn[rowIndex];
          return {
            rowspan: rowNum,
            colspan: rowNum > 0 ? 1 : 0
          }                                                   
        }
        return {
          rowspan: 0,
          colspan: 0
          }  
      }
      if (columnIndex === 1) {
        if (that.rowRoomColumn[rowIndex]) {
          let roomNum = that.rowRoomColumn[rowIndex];
          return {
            rowspan: roomNum,
            colspan: roomNum > 0 ? 1 : 0
            }                                                   
        }
        return {
          rowspan: 0,
          colspan: 0
        }
      }
     },

  },

  created() {
    this.el = this.evaluationList.split(',')
    for(let i in this.elData) {
      this.elData[i].grade = this.el[i]
    }
    this.getListDataForRowAndColumn(this.elData)
  }
}
</script>

<style scoped>
  
</style>
