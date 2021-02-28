import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {ElButton, ElCascader, ElInput, ElOption, ElPagination, ElRadio, ElSelect, ElTable, ElTableColumn, } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App).use(store).use(router)

const components = [
  
  ElButton,
  ElCascader,
  ElInput,
  ElOption,
  ElPagination,
  ElRadio,
  ElSelect,
  ElTable, 
  ElTableColumn,
]
components.forEach(component => {
  app.component(component.name, component)
  // app.use(component)
})

app.mount('#app')