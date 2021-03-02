<template>
  <div style="padding:30px;">
    <div>查看evaluation sheet</div>
    <div>evaluationSheetid：{{evaluationSheetid}}</div>
    <input type="text" v-model="evaluationSheetid" placeholder="evaluation sheet id">
    <br>  
    <input type="button" @click="submit" value="download">
    <br>
    
    <button @click="download">下载</button>
    <br>

    <button @click="download1">下载1</button>
  </div>
</template>

<script>
import { request } from '@/network/request'
// import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      evaluationSheetid: '',
    } 
  },
  methods: {
    requestEvaluationSheet() {
      return request({
        url: '/evaluationSheet/' + this.evaluationSheetid,
        // url: '/es',
        method: 'get',
        // responseType: 'blob',
        // params: {

        // },
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        // 以下不需要res.data.xxx，因为响应拦截器已经拦截了，直接返回的就是res.data
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    submit() {
       function downloadFile(res, fileName) {
        if (!res) {
          return
        }
        if (window.navigator.msSaveBlob) {  // IE以及IE内核的浏览器
          try {
            window.navigator.msSaveBlob(res, fileName)  // res为接口返回数据，这里请求的时候已经处理了，如果没处理需要在此之前自行处理var data = new Blob([res.data]) 注意这里需要是数组形式的,fileName就是下载之后的文件名
            // window.navigator.msSaveOrOpenBlob(res, fileName);  //此方法类似上面的方法，区别可自行百度
          } catch (e) {
            console.log(e)
          }
        } else {
          let url = window.URL.createObjectURL(new Blob([res]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName)// 文件名
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) // 下载完成移除元素
          window.URL.revokeObjectURL(url) // 释放掉blob对象
        }
      }

      return request({
        // url: '/evaluationSheet/' + this.evaluationSheetid,
        url: '/es',
        method: 'get',
        responseType: 'blob',
        // params: {

        // },
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        // 以下不需要res.data.xxx，因为响应拦截器已经拦截了，直接返回的就是res.data
        // console.log(res)
        downloadFile(res, 'es.docx')

      }).catch(err => {
        console.log(err)
      })
    },

    download() {
      axios.get('http://localhost:3000/es', {
        params: {

        },
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        // 重要
        responseType: 'blob'
      }).then(res=> {
        // https://blog.csdn.net/mibi8840/article/details/86741982?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&dist_request_id=d454a54b-356d-47ea-9c1f-e970f2dc83ee&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control
        let data = res.data
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        // 获取文件名
        // download 属性定义了下载链接的地址而不是跳转路径
        link.setAttribute('download', '1.docx')
        document.body.appendChild(link)
        link.click()



// https://blog.csdn.net/JustDI0209/article/details/90236038?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control&dist_request_id=d64fee73-17fa-4dfd-bfae-6fd36433db79&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control
        // const content = res.data
        // const blob = new Blob([content]) // 构造一个blob对象来处理数据
        // const fileName = 'monthAssess.docx' // 导出文件名
        // // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
        // // IE10以上支持blob但是依然不支持download
        // if ('download' in document.createElement('a')) { // 支持a标签download的浏览器
        //   const link = document.createElement('a') // 创建a标签
        //   link.download = fileName // a标签添加属性
        //   link.style.display = 'none'
        //   link.href = URL.createObjectURL(blob)
        //   document.body.appendChild(link)
        //   link.click() // 执行下载
        //   URL.revokeObjectURL(link.href) // 释放url
        //   document.body.removeChild(link) // 释放标签
        // } else { // 其他浏览器
        //   navigator.msSaveBlob(blob, fileName)
        // }



      }).catch(err => {
        console.log('err: ', err)
      })

    },

    download1() {
      // https://www.jianshu.com/p/79f1b3671cf0
      window.open('http://localhost:3000/es')
    },
  },
  created() {
    let {id} = this.$route.params
    this.evaluationSheetid = id

    this.requestEvaluationSheet()
  },
  
}


</script>
