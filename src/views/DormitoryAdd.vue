<template>
  <div style="margin-top: 60px;margin-left:330px;width: 300px;height: 500px;border: 0px solid red;" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="빌딩" prop="buildingId">
        <el-select v-model="ruleForm.buildingId" placeholder="빌딩을 선택해 주세요">
          <el-option v-for="item in buildingList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="호실" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="몇 인실" prop="type">
        <el-select v-model="ruleForm.type" placeholder="몇 인실을 선택해 주세요">
          <el-option label="1인실" value="1"></el-option>
          <el-option label="2인실" value="2"></el-option>
<!--          <el-option label="4인실" value="4"></el-option>-->
<!--          <el-option label="8인실" value="8"></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="연락처" prop="telephone">
        <el-input v-model="ruleForm.telephone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">만들기</el-button>
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
        buildingId: '',
        name: '',
        type: '',
        telephone: ''
      },
      buildingList: '',
      rules: {
        buildingId: [
          { required: true, message: '빌딩을 선택해 주세요.', trigger: 'change' }
        ],
        name: [
          { required: true, message: '호실을 입력해 주세요.', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '연락처를 선택해 주세요.', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '몇 인실을 입력해 주세요.', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8181/dormitory/save',_this.ruleForm).then(function (resp) {
            if(resp.data.code == 0){
              _this.$alert(_this.ruleForm.name+'추가 성공', '', {
                confirmButtonText: '확인',
                callback: action => {
                  _this.$router.push('/dormitoryManager')
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
    axios.get('http://localhost:8181/building/list').then(function (resp) {
      _this.buildingList = resp.data.data
    })
  }
}
</script>
