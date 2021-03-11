import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {ElButton, ElCascader, ElDatePicker, ElDialog, ElForm, ElFormItem, ElInput, ElMessage, ElOption, ElPagination, ElRadio, ElRadioGroup, ElSelect, ElTable, ElTableColumn, } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App).use(store).use(router)

const components = [
  
  ElButton,
  ElCascader,
  ElDatePicker,
  ElDialog,
  ElForm, 
  ElFormItem,
  ElInput,
  // ElMessage,
  ElOption,
  ElPagination,
  ElRadio,
  ElRadioGroup,
  ElSelect,
  ElTable, 
  ElTableColumn,
]
components.forEach(component => {
  app.component(component.name, component)
  // app.use(component)
})

app.mount('#app')