<template>
  <div style="margin-top: 60px;margin-left:330px;width: 300px;height: 500px;border: 0px solid red;" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
<!--      <el-form-item label="ID">-->
<!--        <el-input v-model="ruleForm.id" readonly></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="학번" prop="number">
        <el-input v-model="ruleForm.number"></el-input>
      </el-form-item>
      <el-form-item label="이름" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="성별" prop="gender">
        <div style="width: 170px;height: 30px;">
          <template>
            <el-radio v-model="ruleForm.gender" label="남">남</el-radio>
            <el-radio v-model="ruleForm.gender" label="여">여</el-radio>
          </template>
        </div>
      </el-form-item>
      <el-form-item label="호실" prop="dormitoryId">
        <el-select v-model="ruleForm.dormitoryId" placeholder="호실을 입력해 주세요">
          <el-option v-for="item in dormitoryList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">변경</el-button>
        <el-button @click="resetForm('ruleForm')">재설정</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  data() {
    return {
      category:null,
      ruleForm: {
        number: '',
        name: '',
        gender: '남',
        dormitoryId: ''
      },
      dormitoryList: '',
      rules: {
        number: [
          { required: true, message: '학번을 입력해 주세요.', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '이름을 입력해 주세요.', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '성별을 입력해 주세요.', trigger: 'blur' }
        ],
        dormitoryId: [
          { required: true, message: '호실을 입력해 주세요.', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put('http://localhost:8181/student/update',_this.ruleForm).then(function (resp) {
            if(resp.data.code == 0){
              _this.$alert(_this.ruleForm.name+'변경 성공', '', {
                confirmButtonText: '확인',
                callback: action => {
                  _this.$router.push('/studentManager')
                }
              });
            }
          })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    const _this = this
    axios.get('http://localhost:8181/dormitory/availableList').then(function (resp) {
      _this.dormitoryList = resp.data.data
    })
    axios.get('http://localhost:8181/student/findById/'+_this.$route.query.id).then(function (resp) {
      _this.ruleForm = resp.data.data
    })
  }
}
</script>
