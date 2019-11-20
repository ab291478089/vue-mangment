<template>
  <header class="header-nav">
    <el-row>
      <el-col :span="6">
        <i class="iconfont icon-logo-cat icon-cat" />
        <span class="title">逍遥在线后台管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userInfo">
          <img
            :src="user.avatar"
            class="avatar"
            alt=""
          />
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <span class="username">
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>
<script>
export default {
  name: "Header",
  computed:{
    user (){
      return this.$store.getters.user
    }
  },
  methods: {
    setDialogInfo(command) {
       switch(command) {
         case "info":
             this.showInfoList()
             break;
         case "logout":
             this.logout()
             break;
       } 
    },
    showInfoList() {

    },
    //退出
    logout() {
        // 清除token
        localStorage.removeItem('eleToken')
        // 清除vuex 中的user数据及状态
        this.$store.dispatch('clearUserInfo')
        //跳转到登录页
        this.$router.push('/login')
    }
  }
};
</script>
<style lang="less" scoped>
.header-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background-color: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
  .title {
    padding-left: 15px;
    font-size: 26px;
    font-weight: 600;
    text-align: center;
  }
  .icon-cat {
    font-size: 60px;
    margin-left: 20px;
  }
  .user {
    float: right;
    height: 60px;
    text-align: right;
    .userInfo {
      height: 60px;
      display: inline-block;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
      }
      .welcome {
        display: inline-block;
        vertical-align: middle;
        width: auto;
        padding: 0 5px;
      }
      .name {
        line-height: 20px;
        text-align: center;
        font-size: 14px;
      }
      .comename {
        font-size: 12px;
      }
      .username {
        display: inline-block;
        cursor: pointer;
        margin: 20px;
        vertical-align: middle;
        .el-dropdown {
          color: #fff;
        }
      }
      .avatarname {
        color: #409eff;
        font-weight: bolder;
      }
    }
  }
}
</style>
