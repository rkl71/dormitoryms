<template>
    <el-container class="home_container">
        <el-header class="home_header">
            <div class="home_title">기숙사관리시스템</div>
            <div class="home_userinfoContainer">
                <el-dropdown>
                  <span class="el-dropdown-link home_userinfo">
                    {{admin.name}}<i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="logout">로그아웃</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container>

            <el-aside class="home_aside" width="200px">

                <el-menu router>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-s-platform"></i>관리자</template>
                        <el-menu-item index="/dormitoryAdminAdd" :class="$route.path=='/dormitoryAdminAdd'?'is-active':''">
                            <i class="el-icon-folder-add"></i>관리자 추가
                        </el-menu-item>
                        <el-menu-item index="/dormitoryAdminManager" :class="$route.path=='/dormitoryAdminManager'?'is-active':''">
                            <i class="el-icon-document-copy"></i>관리자 관리
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-user-solid"></i>학생</template>
                        <el-menu-item index="/studentAdd" :class="$route.path=='/studentAdd'?'is-active':''">
                            <i class="el-icon-folder-add"></i>학생 입사
                        </el-menu-item>
                        <el-menu-item index="/studentManager" >
                            <i class="el-icon-document-copy"></i>학생 관리
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-s-grid"></i>빌딩</template>
                        <el-menu-item index="/buildingAdd">
                            <i class="el-icon-folder-add"></i>빌딩 추가
                        </el-menu-item>
                        <el-menu-item index="/buildingManager">
                            <i class="el-icon-document-copy"></i>빌딩 관리
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-s-home"></i>기숙사</template>
                        <el-menu-item index="/dormitoryAdd">
                            <i class="el-icon-folder-add"></i>기숙사 추가
                        </el-menu-item>
                        <el-menu-item index="/dormitoryManager">
                            <i class="el-icon-document-copy"></i>기숙사 관리
                        </el-menu-item>
                    </el-submenu>

                    <el-menu-item index="/moveoutRegister">
                        <i class="el-icon-s-unfold"></i>
                        <span slot="title">학생 퇴사 등기</span>
                    </el-menu-item>

                    <el-menu-item index="/moveoutRecord">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">학생 퇴사 기록</span>
                    </el-menu-item>
                </el-menu>

            </el-aside>

            <el-container>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">홈</el-breadcrumb-item>
                        <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
                    </el-breadcrumb>
                    <router-view></router-view>
                </el-main>
<!--                <el-footer class="home_footer">2023 © DORMS</el-footer>-->
            </el-container>

        </el-container>

    </el-container>
</template>
<script>
    export default{
        methods: {
            logout(){
                let _this = this;
                this.$confirm('로그아웃을 하시겠습니까?', '메시지', {
                    confirmButtonText: '확인',
                    cancelButtonText: '취소',
                    type: 'warning'
                }).then(function () {
                    localStorage.removeItem('systemAdmin')
                    _this.$router.replace({path: '/login'})
                })
            }
        },
        data(){
            return {
                admin:''
            }
        },
        created() {
            let admin = JSON.parse(window.localStorage.getItem('systemAdmin'))
            this.admin = admin
        }
    }
</script>
<style>
    .home_container {
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
    }

    .home_header {
        background-color: #2B2B2B;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .home_title {
        color: #C2C2C2;
        font-size: 22px;
        display: inline;
    }

    .home_userinfo {
        color: #fff;
        cursor: pointer;
    }

    .home_userinfoContainer {
        display: inline;
        margin-right: 20px;
    }

    .home_aside {
        background-color: #FFFFFF;
    }

    .home_footer {
        background-color: #FFFFFF;
        color: #000000;
        font-size: 18px;
        line-height: 60px;
        text-align: center;
    }
</style>
