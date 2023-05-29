<template>
  <div style="margin-top: 60px;margin-left:80px;border: 0px solid red;" >
    <el-form style="margin-left: -40px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="키：" prop="key">
        <el-select v-model="ruleForm.key" style="width: 170px;float: left" placeholder="키를 선택해 주세요">
          <el-option label="명칭" value="name"></el-option>
          <el-option label="소개" value="introduction"></el-option>
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
        style="width: 1151px;position: relative;top:-30px">
      <el-table-column
          fixed
          prop="id"
          label="ID"
          width="230">
      </el-table-column>
      <el-table-column
          prop="name"
          label="명칭"
          width="230">
      </el-table-column>
      <el-table-column
          prop="introduction"
          label="소개"
          width="230">
      </el-table-column>
      <el-table-column
          prop="adminName"
          label="관리자"
          width="230">
      </el-table-column>
      <el-table-column label="" width="230">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="edit(scope.row)">편집</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="del(scope.row)">삭제</el-button>
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
      pageSize: 3,
      total: null,
      key: '',
      value: '',
      ruleForm: {
        key: '',
        value: '',
        page: '',
        size: 3
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
      _this.currentPage = 1
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          _this.ruleForm.page = _this.currentPage
          axios.get('http://localhost:8181/building/search',{params:_this.ruleForm}).then(function (resp) {
            _this.tableData = resp.data.data.data
            _this.total = resp.data.data.total
          })
        }
      });

    },
    page(currentPage){
      const _this = this
      if(_this.ruleForm.value == ''){
        axios.get('http://localhost:8181/building/list/'+currentPage+'/'+_this.pageSize).then(function (resp) {
          _this.tableData = resp.data.data.data
          _this.total = resp.data.data.total
        })
      } else {
        _this.ruleForm.page = _this.currentPage
        axios.get('http://localhost:8181/building/search',{params:_this.ruleForm}).then(function (resp) {
          _this.tableData = resp.data.data.data
          _this.total = resp.data.data.total
        })
      }

    },
    edit(row){
      this.$router.push('/buildingUpdate?id='+row.id)
    },
    del(row) {
      const _this = this
      this.$confirm('【'+row.name+'】삭제 확인합니까?', '메시지', {
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        type: 'warning'
      }).then(() => {
        axios.delete('http://localhost:8181/building/deleteById/'+row.id).then(function (resp) {
          if(resp.data.code==0){
            _this.$alert('【'+row.name+'】삭제했습니다', '', {
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
    }
  },
  created() {
    const _this = this
    axios.get('http://localhost:8181/building/list/1/'+_this.pageSize).then(function (resp) {
      _this.tableData = resp.data.data.data
      _this.total = resp.data.data.total
    })
  }
}
</script>