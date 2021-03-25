<template>
  
  <div class="content">
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
