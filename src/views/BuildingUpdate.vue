<template>
  <div style="margin-top: 60px;margin-left:330px;width: 300px;height: 500px;border: 0px solid red;" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
<!--      <el-form-item label="ID">-->
<!--        <el-input v-model="ruleForm.id" readonly></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="명칭" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="소개" prop="introduction">
        <el-input v-model="ruleForm.introduction"></el-input>
      </el-form-item>
      <el-form-item label="관리자" prop="adminId">
        <el-select v-model="ruleForm.adminId" placeholder="관리자 선택해 주세요">
          <el-option v-for="item in dormitoryAdminList" :label="item.name" :value="item.id"></el-option>
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
        name: '',
        introduction: '',
        adminId: ''
      },
      dormitoryAdminList: '',
      rules: {
        name: [
          { required: true, message: '명칭을 입력해 주세요.', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '소개를 입력해 주세요.', trigger: 'blur' }
        ],
        adminId: [
          { required: true, message: '관리자를 입력해 주세요.', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put('http://localhost:8181/building/update',_this.ruleForm).then(function (resp) {
            if(resp.data.code == 0){
              _this.$alert(_this.ruleForm.name+'변경 성공', '', {
                confirmButtonText: '확인',
                callback: action => {
                  _this.$router.push('/buildingManager')
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
    axios.get('http://localhost:8181/dormitoryAdmin/list').then(function (resp) {
      _this.dormitoryAdminList = resp.data.data
    })
    axios.get('http://localhost:8181/building/findById/'+_this.$route.query.id).then(function (resp) {
      _this.ruleForm = resp.data.data
    })
  }
}
</script>
