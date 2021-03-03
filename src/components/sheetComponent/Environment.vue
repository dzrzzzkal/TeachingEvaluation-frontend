<template>
  
  <div class="content">
    <!-- <div class="subtitle">一、教学环境观察。请观察教室安排是否合理，教室设备，教室采光、通风、噪音、温度等环境条件是否符合教学要求以及其他可能影响到教学效果的环境因素。</div> -->
    <!-- 请观察教室安排是否合理，教室设备，教室采光、通风、噪音、温度等环境条件是否符合教学要求以及其他可能影响到教学效果的环境因素。
    <div class="box">
      {{environment.environment}}
    </div> -->
    <el-table
      border
      :show-header="false"
      :data="env"
      style="width: 100%">
      <el-table-column
        prop="environment"
        label=""
        width="width">
        <template #default="scope">
          <span>{{scope.row.environment}}</span>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
export default {
  name: 'Environment',
  props: {
    environment: Object
  },

  data() {
    return {
      env: [this.environment]
    }
  },

  created() {
  }
}
</script>

<style scoped>
  
</style>
