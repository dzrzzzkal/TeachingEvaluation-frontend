<template>
  <div class="content">
    <el-table

      :show-header="false"
      :data="info"
      style="width: 100%">
      <el-table-column
        prop=""
        label=""
        width="width">
        <template #default="scope">
          开课单位：<span class="underlineItem">{{scope.row.course_setupUnit}}</span>
          课程名称：<span class="underlineItem">{{scope.row.course_name}}</span>
          课程编号：<span class="underlineItem">{{scope.row.class_id}}</span>
          教师名称：<span class="underlineItem">{{scope.row.teacher_name}}</span>
          听课时间：<span class="underlineItem">{{scope.row.class_time}}</span>
          地点：<span class="underlineItem">{{scope.row.place}}</span>
          应到人数：<span class="underlineItem">{{scope.row.attend_num}}</span>
          实到人数：<span class="underlineItem">{{scope.row.actual_num}}</span>
          听课类型：<span class="">{{scope.row.role}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
  
</template>

<script>
export default {
  name: 'BriefInfo',
  props: {
    briefinfo: Object
  },
  data() {
    return {
      info: [this.briefinfo]
    }
  },

  created() {
    let roleType
    let {role} = this.briefinfo
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
    this.info[0].role = roleType
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
