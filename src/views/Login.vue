<template>
  <div class="login-container">
    <el-form :model="ruleForm" :rules="rules"
             status-icon
             ref="ruleForm"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">로그인</h3>
      <el-form-item prop="username">
        <el-input type="text"
                  v-model="ruleForm.username"
                  placeholder="아이디"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="ruleForm.password"
                  placeholder="비밀번호"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio v-model="type" label="systemAdmin">시스템 관리자</el-radio>
        <el-radio style="position: relative;left: 80px" v-model="type" label="dormitoryAdmin">기숙사 관리자</el-radio>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">로그인</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      logining: false,
      ruleForm: {
        username: 'admin1',
        password: '123123'
      },
      type: 'systemAdmin',
      rules: {
        username: [{required: true, message: '아이디를 입력해 주세요.', trigger: 'blur'}],
        password: [{required: true, message: '비밀번호를 입력해 주세요.', trigger: 'blur'}]
      }
    }
  },
  methods: {
    handleSubmit(){
      this.$refs.ruleForm.validate((valid) => {
        if(valid){
          this.logining = true
          let _this = this
          if(_this.type == 'dormitoryAdmin'){
            axios.get('http://localhost:8181/dormitoryAdmin/login', {params:_this.ruleForm}).then(function (resp) {
              _this.logining = false
              if(resp.data.code == -1){
                _this.$alert('아이디가 등록되어 있지 않습니다.', '메시지', {
                  confirmButtonText: '확인'
                })
              }
              if(resp.data.code == -2){
                _this.$alert('비밀번호를 잘못 입력했습니다.', '메시지', {
                  confirmButtonText: '확인'
                })
              }
              if(resp.data.code == 0){
                //跳转到SystemAdmin
                //展示当前登录用户信息
                localStorage.setItem('dormitoryAdmin', JSON.stringify(resp.data.data));
                _this.$router.replace({path: '/dormitoryAdmin'})
              }
            })
          }
          if(_this.type == 'systemAdmin'){
            axios.get('http://localhost:8181/systemAdmin/login', {params:_this.ruleForm}).then(function (resp) {
              _this.logining = false
              if(resp.data.code == -1){
                _this.$alert('아이디가 등록되어 있지 않습니다.', '메시지', {
                  confirmButtonText: '확인'
                })
              }
              if(resp.data.code == -2){
                _this.$alert('비밀번호를 잘못 입력했습니다.', '메시지', {
                  confirmButtonText: '확인'
                })
              }
              if(resp.data.code == 0){
                //跳转到SystemAdmin
                //展示当前登录用户信息
                localStorage.setItem('systemAdmin', JSON.stringify(resp.data.data));
                _this.$router.replace({path: '/systemAdmin'})
              }
            })
          }
        }
      })
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>