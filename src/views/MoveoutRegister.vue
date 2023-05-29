<template>
  <div style="margin-top: 60px;margin-left:80px;border: 0px solid red;" >
    <el-form style="margin-left: -40px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="키：" prop="key">
        <el-select v-model="ruleForm.key" style="width: 170px;float: left" placeholder="키를 선택해 주세요">
          <el-option label="학번" value="number"></el-option>
          <el-option label="이름" value="name"></el-option>
        </el-select>
      </el-form-item>
      <div style="border: 0px solid red;width: 400px;height: 60px;position: relative;top: -64px;left: 270px">
        <el-form-item label="값：">
          <el-input v-model="ruleForm.value" placeholder="값을 입력해 주세요" style="width: 170px;"></el-input>
          <el-button type="primary" icon="el-icon-search" style="position: relative;left: 10px;" @click="submitForm('ruleForm')">조회</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-table
        :data="tableData"
        border
        stripe
        style="width: 1191px;position: relative;top:-30px">
      <el-table-column
          fixed
          prop="id"
          label="ID"
          width="130">
      </el-table-column>
      <el-table-column
          prop="dormitoryName"
          label="호실"
          width="130">
      </el-table-column>
      <el-table-column
          prop="number"
          label="학번"
          width="130">
      </el-table-column>
      <el-table-column
          prop="name"
          label="이름"
          width="130">
      </el-table-column>
      <el-table-column
          prop="gender"
          label="성별"
          width="130">
      </el-table-column>
      <el-table-column
          prop="state"
          label="상태"
          width="130">
      </el-table-column>
      <el-table-column
          prop="createDate"
          label="입사기간"
          width="180">
      </el-table-column>
      <el-table-column label="" width="230">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="moveout(scope.row)">퇴사</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 20px;text-align: center"
                   background
                   layout="prev, pager, next"
                   :page-size="pageSize"
                   :total="total"
                   :current-page.sync="currentPage"
                   @current-change="page">
    </el-pagination>
  </div>

</template>

<script>
export default {
  data() {
    return {
      tableData: null,
      currentPage: 1,
      pageSize: 5,
      total: null,
      key: '',
      value: '',
      ruleForm: {
        key: '',
        value: '',
        page: '',
        size: 5
      },
      rules: {
        key: [
          { required: true, message: '키를 선택해 주세요.', trigger: 'change' }
        ]
      }
    }
  },
  methods:{
    submitForm(formName) {
      const _this = this
      //让翻页复原
      _this.currentPage=1
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          _this.ruleForm.page = _this.currentPage
          axios.get('http://localhost:8181/moveout/search',{params:_this.ruleForm}).then(function (resp) {
            _this.tableData = resp.data.data.data
            _this.total = resp.data.data.total
          })
        }
      });

    },
    page(currentPage){
      const _this = this
      if(_this.ruleForm.value == ''){
        axios.get('http://localhost:8181/moveout/list/'+currentPage+'/'+_this.pageSize).then(function (resp) {
          _this.tableData = resp.data.data.data
          _this.total = resp.data.data.total
        })
      } else {
        _this.ruleForm.page = _this.currentPage
        axios.get('http://localhost:8181/moveout/search',{params:_this.ruleForm}).then(function (resp) {
          _this.tableData = resp.data.data.data
          _this.total = resp.data.data.total
        })
      }

    },
    moveout(row) {
      const _this = this
      this.$prompt('퇴사 원인을 입력해 주세요', '메시지', {
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: '퇴실 사유는 비워 둘 수 없습니다.'
      }).then(({ value }) => {
        this.$confirm('【'+row.name+'】퇴사 확인합니까?', '메시지', {
          confirmButtonText: '확인',
          cancelButtonText: '취소',
          type: 'warning'
        }).then(() => {
          axios.put('http://localhost:8181/moveout/moveout/'+row.id+"/"+value).then(function (resp) {
            if(resp.data.code == 0){
              _this.$alert('【'+row.name+'】퇴사했습니다', '', {
                confirmButtonText: '확인',
                callback: action => {
                  location.reload()
                }
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message:'undeleted'
          })
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message:'undeleted'
        })
      });
    }
  },
  created() {
    const _this = this
    axios.get('http://localhost:8181/moveout/list/1/'+_this.pageSize).then(function (resp) {
      _this.tableData = resp.data.data.data
      _this.total = resp.data.data.total
    })
  }
}
</script>