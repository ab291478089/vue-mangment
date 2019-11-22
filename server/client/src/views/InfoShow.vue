<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8" class="left">
        <img class="img-avatar" :src="user.avatar" />
      </el-col>
      <el-col :span="16" class="right">
        <i class="iconfont icon-chengyuan icon-info" />
        <span class="name icon-info">{{user.name}}</span>
        <i class="iconfont icon-icon-test1 icon-setting" />
        <span class="setting icon-setting">{{user.identity == 'manage' ? '管理员' : '普通员工'}}</span>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
.infoshow {
  height: 100%;
  .row-bg {
    height: 100%;
    .left {
      height: 100%;
      background-color: #fefefe;
      position: relative;
      .img-avatar{
        position: absolute;
        right: 38%;
        top: 36%;
        transform: translateX(50px);
        border-radius: 50%;
        
      }
    }
    .right {
      height: 100%;
      background-color: #ebebeb;
      position: relative;
      .icon-info {
        position: absolute;
        top: 40%;
        left: 20px;
        transform: translateY(-50px);
        font-size: 60px;
      }
      .name {
        left: 80px;
        font-size: 30px;
        top: 43%;
      }
      .icon-setting {
        position: absolute;
        top: 55%;
        left: 20px;
        transform: translateY(-50px);
        font-size: 60px;
      }
      .setting {
        left: 90px;
        font-size: 30px;
        top: 58%;
      }
    }
  }
}
</style>
<script>
export default {
  computed:{
    user() {
      return this.$store.state.user
    }
  }
};
</script>
