<template>
  <div class="container">
    <!-- 左边部分 -->
    <div class="left-panel">
      <!-- 个人信息 -->
      <div class="person_info">
        <div class="left" @click="openPerson">
          <img src="../../static/img/head.jpg"/>
        </div>
        <div class="right">
          <span>{{this.userInfo.name}}</span>
          <span>{{this.ToolTips}}</span>
        </div>
      </div>
      <!-- 组件列表 -->
      <el-col class="home_nav">
        <slidemenu :itemlist="itemlist" @itemclick="itemclick"></slidemenu>
      </el-col>
      <div class="logo" @click="goHome">
        <img src="../../static/img/LOGO.png">
        <span>视频赋能新商业</span>
      </div>
    </div>
    <!-- 信息展示页 -->
    <div class="right-panel">
      <router-view ></router-view>
    </div>
  </div>
</template>

<script>
import slidemenu from '../components/sidebar/sildemenu'
import iconsUtil from '../utils/icons'
export default {
  name: 'PageHome',
  components: {
    slidemenu,
  },
  data() {
    return {
      index:'',
      // ,'接单中心','消息管理'
      itemlist:['素材管理','专题管理','AE模板','订单管理','工作站'],
      icons: iconsUtil,
      userInfo:{},
      activeIndex:'',
      ToolTips:'',
    };
  },
  methods: {
    // 路由跳转
    itemclick(index,item) {
      this.isPerson = false
      if(index == 0) {
        this.$router.push({
          name: "matter"
        });
      } else if (index == 1) {
        this.$router.push({
          name: "SpecialTopic"
        });
      } else if (index == 2) {
        this.$router.push({
          name: "specialLens"
        });
      } else if (index == 3) {
        this.$router.push({
          name: "order"
        });
      } else if (index == 4) {
        this.$router.push({
          name: "studio"
        });
      }
    },
    goHome() {
      this.$router.push({
        name: "Home"
      });
    },
    // 打开个人信息页
    openPerson() {
      this.$router.push({
        name:"person"
      })
    },
    // 获取当前用户信息
    getUserInfo() {
        // this.userInfo = JSON.parse(localStorage.getItem('current_user'))
        let userinfo = {
          code: null,
          createTime: "2019-06-01T08:37:20.000+0000",
          headImg: null,
          id: "54e2858555324f9a978b67a660c1bd7f",
          lastLoginTime: null,
          loginTime: "2019-06-01T08:37:20.000+0000",
          miotoId: "1923010",
          name: "郝恩旭",
          phone: "15847261489",
          roleList: [
            {
              createTime: null,
              description: "普通用户",
              id: 2,
              name: "common",
              roleRes: null,
              status: null,
            }
            
          ],
          sex: 1,
          status: 0,
          token: null
        }
        this.userInfo = userinfo
        // if(this.userInfo==null || this.userinfo == undefined || this.userinfo == '') {
        //   this.$router.push({
        //     name:'Login'
        //   })
        // } else {
        //   this.$router.push({
        //     name:'person'
        //   })
        //   this.getUserDetails()
        // }
    },
    // 获取用户详情
    getUserDetails() {
        //正式版
        // this.$request.get('/oms/v1/user/detail/'+this.userInfo.id).then(res => {
        this.$request.get('/oms/v1/user/detail/',this.userInfo.id).then(res => {
            this.userInfo= res.data.data
            this.userName = this.userInfo.name
        })
    },
    // 获取当前页面的url
    geturl() {
      var test = window.location.hash;
      let urlarr = test.split('/')
      let baseActiveName = urlarr.pop()
      if(baseActiveName == 'home') {
        this.$router.push({
          name:'person'
        })
      }
      this.activeIndex = '/'+baseActiveName
    },
    // 获取当前时间
    getDate() {
      var date = new Date()
      var hour = date.getHours()
      if(hour>=0 && hour<=6) {
        this.ToolTips = '凌晨好'
      } else if(hour>6 && hour <=12) {
        this.ToolTips = '上午好'
      }else if(hour>12 && hour <=19) {
        this.ToolTips = '下午好'
      }else if(hour>19 && hour <=24) {
        this.ToolTips = '晚上好'
      }
    },
    onhashchange(event){
    },
  },
  mounted(){
    this.getUserInfo()
    this.geturl()
    this.getDate()
  },
  watch: {
    '$router': 'geturl'
  }
}
</script>

<style scoped>

.container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-content: center;
  align-items: center;
  background: #fff;
}
.left-panel {
  width: 156px;
  height: 100%;
  min-width: 150px;
  overflow: hidden;
  position: relative;
}
.right-panel {
  width: calc(100% - 150px);
  height: 100%;
  min-width: 800px;
  overflow: hidden;
}
.logo {
  width: 100%;
  text-align: center;
  padding: 15px 0px;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 20
}
.logo img {
  width: 150px;
  height: 50px;
  margin: 0 auto;
}

.logo span {
  display: block;
  width: 98px;
  height: 20px;
  line-height: 20px;
  margin:3px auto 0;
  font-size: 14px;
  color: #101010;
}
.home_nav {
  height: 100%;
  width: 100%;
  border: 0px;
  text-align: center;
}

/* 侧边栏 */
.el-menu-vertical-demo {
  height: 100%;
  border: 0px;
}

.el-menu-item:hover {
  background-color: #f7f9f9;
}

.el-menu-item:link {
  background-color: #f7f9f9;
}

/* 用户信息模块 */
.person_info {
  width: 100%;
  height: 44px;
  padding: 10px 0;
  position: relative;
}
/* 用户头像 */
.person_info .left {
  width: 48px;
  height: 48px;
  position: absolute;
  top: 9px;
  left: 12px;
  right: 12px;

}
.person_info .left img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
}
.person_info .right {
  position: absolute;
  left: 72px;
  width: calc(100% - 72px);
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: space-between;
}
.person_info .right  span:nth-child(1) {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  font-size:14px;
  color:#333333;
}
.person_info .right  span:nth-child(2) {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  margin-top: 7px;
  font-size:12px;
  color:#333333;
} 
router-view {
  display: flex;
  padding-left: 200px;
  padding-top: 20px;
  border: 1px solid red;
}

</style>
