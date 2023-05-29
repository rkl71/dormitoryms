import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import SystemAdmin from "@/views/SystemAdmin.vue";
import DormitoryAdminAdd from "@/views/DormitoryAdminAdd.vue";
import DormitoryAdminManager from "@/views/DormitoryAdminManager.vue";
import DormitoryAdminUpdate from "@/views/DormitoryAdminUpdate.vue";
import StudentAdd from "@/views/StudentAdd.vue";
import StudentManager from "@/views/StudentManager.vue";
import StudentUpdate from "@/views/StudentUpdate.vue";
import BuildingAdd from "@/views/BuildingAdd.vue";
import BuildingManager from "@/views/BuildingManager.vue";
import BuildingUpdate from "@/views/BuildingUpdate.vue";
import DormitoryAdd from "@/views/DormitoryAdd.vue";
import DormitoryManager from "@/views/DormitoryManager.vue";
import DormitoryUpdate from "@/views/DormitoryUpdate.vue";
import MoveoutRegister from "@/views/MoveoutRegister.vue";
import MoveoutRecord from "@/views/MoveoutRecord.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/systemAdmin',
    name: '시스템 관리자',
    component: SystemAdmin,
    redirect: '/DormitoryAdminAdd',
    children:[
      {
        path: '/DormitoryAdminAdd',
        name: '관리자 추가',
        component: DormitoryAdminAdd,
      },
      {
        path: '/DormitoryAdminManager',
        name: '관리자 관리',
        component: DormitoryAdminManager,
      },
      {
        path: '/DormitoryAdminUpdate',
        name: '관리자 수정',
        component: DormitoryAdminUpdate,
      },
      {
        path: '/StudentAdd',
        name: '학생 입사',
        component: StudentAdd,
      },
      {
        path: '/StudentManager',
        name: '학생 관리',
        component: StudentManager,
      },
      {
        path: '/StudentUpdate',
        name: '학생 수정',
        component: StudentUpdate,
      },
      {
        path: '/BuildingAdd',
        name: '빌딩 추가',
        component: BuildingAdd,
      },
      {
        path: '/BuildingManager',
        name: '빌딩 관리',
        component: BuildingManager,
      },
      {
        path: '/BuildingUpdate',
        name: '빌딩 수정',
        component: BuildingUpdate,
      },
      {
        path: '/DormitoryAdd',
        name: '기숙사 추가',
        component: DormitoryAdd,
      },
      {
        path: '/DormitoryManager',
        name: '기숙사 관리',
        component: DormitoryManager,
      },
      {
        path: '/DormitoryUpdate',
        name: '기숙사 수정',
        component: DormitoryUpdate,
      },
      {
        path: '/MoveoutRegister',
        name: '퇴사',
        component: MoveoutRegister,
      },
      {
        path: '/MoveoutRecord',
        name: '퇴사 기록',
        component: MoveoutRecord,
      }
    ]
  },

  {
    path: '/login',
    name: '등록',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
