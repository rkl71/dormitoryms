<template>
    <div style="margin-top: 60px;margin-left:330px;width: 300px;height: 500px;border: 0px solid red;" >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="아이디" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="비밀번호" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="이름" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="성별">
                <div style="width: 170px;height: 30px;">
                    <template>
                        <el-radio v-model="ruleForm.gender" label="남">남</el-radio>
                        <el-radio v-model="ruleForm.gender" label="여">여</el-radio>
                    </template>
                </div>
            </el-form-item>
            <el-form-item label="연락처" prop="telephone">
                <el-input v-model.number="ruleForm.telephone"></el-input>
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
                    username: '',
                    password: '',
                    name: '',
                    gender: '남',
                    telephone: ''
                },
                rules: {
                    username: [
                        { required: true, message: '아이디를 입력해 주세요.', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '비밀번호를 입력해 주세요.', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '이름을 입력해 주세요.', trigger: 'blur' }
                    ],
                    telephone: [
                        { required: true, message: '연락처를 입력해 주세요.', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('http://localhost:8181/dormitoryAdmin/save',_this.ruleForm).then(function (resp) {
                            if(resp.data.code == 0){
                                _this.$alert(_this.ruleForm.username+'추가 성공', '', {
                                    confirmButtonText: '확인',
                                    callback: action => {
                                        _this.$router.push('/dormitoryAdminManager')
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
        }
    }
</script>
