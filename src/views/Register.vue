<template>
  <div style="padding:30px;">
    <div>注册</div>
    <!-- 表user -->
    <el-input v-model="user" placeholder="username" clearable />
    <br>
    <el-input v-model="pass" placeholder="password" show-password />
    <br>
    <br>

    <!-- 表userinfo -->
    <el-input v-model="jobid" placeholder="jobid" clearable />
    <br>
    <el-input v-model="name" placeholder="name" clearable />
    <br>
    <el-select v-model="college" filterable placeholder="college">
      <el-option
        v-for="item in collegeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="dept" filterable placeholder="department">
      <el-option
        v-for="item in deptOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="role" filterable placeholder="role">
      <el-option
        v-for="item in roleOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="dean" filterable placeholder="dean">
      <el-option
        v-for="item in deanOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="deansoffice" filterable placeholder="deansoffice">
      <el-option
        v-for="item in deansofficeOptions"
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
      user: ref(''),   // 用户名
      pass: ref(''),   // 密码

      // 表userinfo
      jobid: ref(''),  // 工号
      name: ref(''),   // 姓名
      college: ref(''),// 学院
      dept: ref(''),   // 系
      role: ref(''),   // 听课角色
      dean: ref(''),   // 是否为系主任
      deansoffice: ref(''),   // 是什么教务管理人员（非教务管理人员、教务处、学院、系）

      createSuccess() {
        ElMessage({
          showClose: true,
          message: '注册成功。',
          type: 'success'
        })
      },
      createFail() {
        ElMessage.warning({
          message: '注册失败',
          type: 'error'
        })
      }
    }
  },
  data() {
    return {
      collegeOptions: [
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
      deptOptions: [
        {
          value: '计算机系',
          label: '计算机系'
        },
        {
          value: '生物系',
          label: '生物系'
        },
        {
          value: '食品安全系',
          label: '食品安全系'
        },
        {
          value: '临床医学系',
          label: '临床医学系'
        },
        {
          value: '海洋生物研究',
          label: '海洋生物研究'
        },
        {
          value: '商务管理系',
          label: '商务管理系'
        },
        {
          value: '就业中心所',
          label: '就业中心所'
        },
      ],
      roleOptions: [
        {
          value: '教师',
          label: '教师'
        },
        {
          value: '督导',
          label: '督导'
        },
        {
          value: '主管教学校领导',
          label: '主管教学校领导'
        },
        {
          value: '教务处领导',
          label: '教务处领导'
        },
        {
          value: '其他校领导',
          label: '其他校领导'
        },
        {
          value: '各学院领导',
          label: '各学院领导'
        },
      ],
      deanOptions: [
        {
          value: 'true',
          label: '是系主任'
        },
        {
          value: 'false',
          label: '不是系主任'
        },
      ],
      deansofficeOptions: [
        {
          value: 'false',
          label: '非教务管理人员'
        },
        {
          value: '教务处',
          label: '教务处'
        },
        {
          value: '学院',
          label: '学院'
        },
        {
          value: '系',
          label: '系'
        },
      ],
    } 
  },


  methods: {
    submit() {
      return request({
        url: '/doregister',
        method: 'post',
        data: {
          user: this.user,
          pass: this.pass,
          jobid: this.jobid,
          name: this.name,
          college: this.college,
          dept: this.dept,
          role: this.role,
          dean: this.dean,
          deansoffice: this.deansoffice,
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
