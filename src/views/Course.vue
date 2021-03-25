<template>
  <div style="padding:30px;">
    <div>课程增删改查</div>
    <el-input v-model="id" placeholder="课程编号" clearable />
    <br>
    <el-input v-model="oldid" placeholder="旧课程编号" clearable />
    <br>
    <el-input v-model="name" placeholder="课程名" clearable />
    是否是网络课程
    <el-radio v-model="onlineCourse" label="true">是</el-radio>
    <el-radio v-model="onlineCourse" label="false">否</el-radio>
    <br>
    <el-input v-model="en_name" placeholder="英文名称" clearable />
    <br>
    <el-input v-model="credit" placeholder="学分" clearable />
    <br>
    <el-select v-model="setupUnit" filterable placeholder="开课单位">
      <el-option
        v-for="item in setupUnitOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <br>
    <el-input v-model="classHours" placeholder="学时" clearable />
    <br>
    是否为通识课
    <el-radio v-model="generalCourse" label="true">是</el-radio>
    <el-radio v-model="generalCourse" label="false">否</el-radio>
    <br>
    <el-select v-model="classification" filterable placeholder="课程分类">
      <el-option
        v-for="item in classificationOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <br>
    <el-input type="textarea" v-model="briefIntro" placeholder="课程简介"></el-input>
    <br>
    <el-input v-model="syllabus" placeholder="课程大纲——文件链接"></el-input>
    <br>
    <el-select v-model="ap" multiple filterable placeholder="先修课程">
      <el-option
        v-for="item in apOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="fp" multiple filterable placeholder="同修课程">
      <el-option
        v-for="item in fpOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
   <br>
    <el-button @click="submit" type="primary">提交</el-button>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {request} from '@/network/request'

export default defineComponent({
  setup() {
    return {
      id: ref(''),   // 课程编号
      oldid: ref(''),   // 旧课程编号
      name: ref(''),  // 课程名
      onlineCourse: ref('false'),  // 是否是网络课程
      en_name: ref(''),   // 英文名称
      credit: ref(''),// 学分
      setupUnit: ref(''),   // 开课单位
      classHours: ref(''),   // 学时
      generalCourse: ref('false'),   // 是否为通识课
      classification: ref(''),   // 课程分类
      briefIntro: ref(''),   // 课程简介
      syllabus: ref(''),  // 课程大纲——文件
      ap: ref([]),   // 先修课程
      fp: ref([]),   // 同修课程

      createSuccess() {
        ElMessage({
          showClose: true,
          message: '创建成功。',
          type: 'success'
        })
      },
      createFail() {
        ElMessage.warning({
          message: '创建失败',
          type: 'error'
        })
      }
    }
  },
  data() {
    return {
      setupUnitOptions: [
        {
          value: '工学院',
          label: '工学院'
        },
        {
          value: '商学院',
          label: '商学院'
        },
        {
          value: '理学院',
          label: '理学院'
        },
        {
          value: '医学院',
          label: '医学院'
        },
        {
          value: '海洋中心',
          label: '海洋中心'
        },
        {
          value: '教务处',
          label: '教务处'
        },
        {
          value: '就业中心',
          label: '就业中心'
        },
      ],
      classificationOptions: [
        {
          value: '理论讲授',
          label: '理论讲授'
        },
        {
          value: '实践课程',
          label: '实践课程'
        },
      ],
      apOptions: [
        {
          value: '女士形象设计',
          label: '女士形象设计'
        },
        {
          value: '计算机网络',
          label: '计算机网络'
        },
        {
          value: '并行程序设计',
          label: '并行程序设计'
        },
        {
          value: '突发性疫情认知、防护与思考（网络课程）',
          label: '突发性疫情认知、防护与思考（网络课程）'
        },
        {
          value: '生物多样性与人类福祉',
          label: '生物多样性与人类福祉'
        },
      ],
      fpOptions: [
        {
          value: '女士形象设计',
          label: '女士形象设计'
        },
        {
          value: '计算机网络',
          label: '计算机网络'
        },
        {
          value: '并行程序设计',
          label: '并行程序设计'
        },
        {
          value: '突发性疫情认知、防护与思考（网络课程）',
          label: '突发性疫情认知、防护与思考（网络课程）'
        },
        {
          value: '生物多样性与人类福祉',
          label: '生物多样性与人类福祉'
        },
      ],

    } 
  },


  methods: {
    submit() {
      return request({
        url: '/create-course',
        method: 'post',
        data: {
          id: this.id,
          oldid: this.oldid,
          name: this.name,
          onlineCourse: this.onlineCourse,
          en_name: this.en_name,
          credit: this.credit,
          setupUnit: this.setupUnit,
          classHours: this.classHours,
          generalCourse: this.generalCourse,
          classification: this.classification,
          briefIntro: this.briefIntro,
          syllabus: this.syllabus,
          ap: this.ap,
          fp: this.fp,
        },
        headers: {
          // 'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        // console.log(res)
        this.createSuccess()
      }).catch(err => {
        this.createFail()
        console.log(err)
      })
    },
  },
  created() {
  },
  
})


</script>
