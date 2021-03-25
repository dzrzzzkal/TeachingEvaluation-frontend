<template>
  <div style="padding:30px;">
    <div>开课班增删改查</div>
    <el-input v-model="id" placeholder="开课班号" clearable />
    <br>
    <el-select v-model="course" filterable placeholder="course">
      <el-option
        v-for="item in courseOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <br>
    <el-select v-model="schoolYear" filterable placeholder="学年">
      <el-option
        v-for="item in schoolYearOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <br>
    <el-select v-model="semester" filterable placeholder="学期">
      <el-option
        v-for="item in semesterOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <br>
    <!-- 待改，周应该设置成两个输入框，最后合在一起 -->
    <el-select v-model="week" filterable placeholder="周">
      <el-option
        v-for="item in weekOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <br>
    <!-- ↓可能也要改，节次应该要输入吧？ -->
    周几(xx节)
    <el-cascader
      :options="timeOptions"
      :props="timeProps"
      v-model="time"
      clearable
      >
    </el-cascader>
    <br>
    <el-select v-model="teacher" multiple filterable placeholder=教师>
      <el-option
        v-for="item in teacherOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <br>
    <el-select v-model="classroom" multiple filterable placeholder="教室">
      <el-option
        v-for="item in classroomOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <br>
    <el-input v-model="note" filterable placeholder="备注"></el-input>
    <br>
    <el-input v-model="selectedRule" filterable placeholder="选课规则"></el-input>
    <br>
    <el-input v-model="teachingMaterial" multiple filterable placeholder="教材"></el-input>
    <br>
    <!-- <el-input v-model="student_id" placeholder="学生学号"></el-input> -->
    <!-- <br> -->
    <el-button @click="submit" type="primary">提交</el-button>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {request} from '@/network/request'

export default defineComponent({
  setup() {
    return {
      id: ref(''),   // 开课班号
      course: ref(''),   // course
      schoolYear: ref(''),  // 学年
      semester: ref(''),  // 学期
      week: ref(''),   // 周
      time: ref([]),// 周几(xx节)
      teacher: ref([]),   // 教师
      classroom: ref([]),   // 教室
      note: ref(''),   // 备注
      selectedRule: ref(''),   // 选课规则
      teachingMaterial: ref([]),   // 教材
      // student_id: ref(''),  // 学生学号

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
      courseOptions: [
        {
          value: '111aaa',
          label: '111aaa'
        },
        {
          value: '222bbb',
          label: '222bbb'
        },
        {
          value: '333ccc',
          label: '333ccc'
        },
        {
          value: '444ddd',
          label: '444ddd'
        },
        {
          value: '555eee',
          label: '555eee'
        },
        {
          value: '441dda',
          label: '441dda'
        },
        {
          value: '442ddb',
          label: '442ddb'
        },
      ],
      schoolYearOptions: [
        {
          value: '2017-2018年',
          label: '2017-2018年'
        },
        {
          value: '2018-2019年',
          label: '2018-2019年'
        },
        {
          value: '2019-2020年',
          label: '2019-2020年'
        },
        {
          value: '2020-2021年',
          label: '2020-2021年'
        },
        {
          value: '2021-2022年',
          label: '2021-2022年'
        },
      ],
      semesterOptions: [
        {
          value: '春季学期',
          label: '春季学期'
        },
        {
          value: '夏季学期',
          label: '夏季学期'
        },
        {
          value: '秋季学期',
          label: '秋季学期'
        },
      ],
      weekOptions: [
        {
          value: '1-16',
          label: '1-16'
        },
        {
          value: '1-8',
          label: '1-8'
        },
        {
          value: '9-16',
          label: '9-16'
        },
      ],
      timeProps: {multiple: true},
      timeOptions: [
        {
          value: 'Sun',
          label: '周日',
          children: [
            {value: 12, label: 12},
            {value: 34, label: 34},
            {value: 345, label: 345},
            {value: 67, label: 67},
            {value: 89, label: 89},
            {value: 890, label: 890},
            {value: 'AB', label: 'AB'},
            {value: 'ABC', label: 'ABC'},
          ]
        },
        {
          value: 'Mon',
          label: '周一',
          children: [
            {value: 12, label: 12},
            {value: 34, label: 34},
            {value: 345, label: 345},
            {value: 67, label: 67},
            {value: 89, label: 89},
            {value: 890, label: 890},
            {value: 'AB', label: 'AB'},
            {value: 'ABC', label: 'ABC'},
          ]
        },
        {
          value: 'Tue',
          label: '周二',
          children: [
            {value: 12, label: 12},
            {value: 34, label: 34},
            {value: 345, label: 345},
            {value: 67, label: 67},
            {value: 89, label: 89},
            {value: 890, label: 890},
            {value: 'AB', label: 'AB'},
            {value: 'ABC', label: 'ABC'},
          ]
        },
        {
          value: 'Wed',
          label: '周三',
          children: [
            {value: 12, label: 12},
            {value: 34, label: 34},
            {value: 345, label: 345},
            {value: 67, label: 67},
            {value: 89, label: 89},
            {value: 890, label: 890},
            {value: 'AB', label: 'AB'},
            {value: 'ABC', label: 'ABC'},
          ]
        },
        {
          value: 'Thur',
          label: '周四',
          children: [
            {value: 12, label: 12},
            {value: 34, label: 34},
            {value: 345, label: 345},
            {value: 67, label: 67},
            {value: 89, label: 89},
            {value: 890, label: 890},
            {value: 'AB', label: 'AB'},
            {value: 'ABC', label: 'ABC'},
          ]
        },
        {
          value: 'Fri',
          label: '周五',
          children: [
            {value: 12, label: 12},
            {value: 34, label: 34},
            {value: 345, label: 345},
            {value: 67, label: 67},
            {value: 89, label: 89},
            {value: 890, label: 890},
            {value: 'AB', label: 'AB'},
            {value: 'ABC', label: 'ABC'},
          ]
        },
        {
          value: 'Sat',
          label: '周六',
          children: [
            {value: 12, label: 12},
            {value: 34, label: 34},
            {value: 345, label: 345},
            {value: 67, label: 67},
            {value: 89, label: 89},
            {value: 890, label: 890},
            {value: 'AB', label: 'AB'},
            {value: 'ABC', label: 'ABC'},
          ]
        },
      ],
      teacherOptions: [
        {
          value: 'aaa',
          label: 'aaa',
        },
        {
          value: 'bbb',
          label: 'bbb',
        },
        {
          value: 'ccc',
          label: 'ccc',
        },
        {
          value: 'ddd',
          label: 'ddd',
        },
        {
          value: 'eee',
          label: 'eee',
        },
      ],
      classroomOptions: [
        {
          value: '*',
          label: '*',
        },
        {
          value: 'E305',
          label: 'E305',
        },
        {
          value: '弘毅书院舞蹈房105',
          label: '弘毅书院舞蹈房105',
        },
        {
          value: 'E207',
          label: 'E207',
        },
        {
          value: '讲堂六',
          label: '讲堂六',
        },
        {
          value: 'D座302',
          label: 'D座302',
        },
        {
          value: '新体育馆',
          label: '新体育馆',
        },
        {
          value: '789楼',
          label: '789楼',
        },
        {
          value: 'EJ204',
          label: 'EJ204',
        },
      ]
    } 
  },


  methods: {
    submit() {
      // console.log('this.time')
      // console.log(this.time)
      return request({
        url: '/create-class',
        method: 'post',
        data: {
          id: this.id,
          course: this.course,
          schoolYear: this.schoolYear,
          semester: this.semester,
          week: this.week,
          time: this.time,
          teacher: this.teacher,
          classroom: this.classroom,
          note: this.note,
          selectedRule: this.selectedRule,
          teachingMaterial: this.teachingMaterial,
          student_id: this.student_id,
        },
        headers: {
          // 'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        this.createSuccess()
        console.log(res)
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
