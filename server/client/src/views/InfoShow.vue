<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8" class="left">123</el-col>
      <el-col :span="16" class="right">
        <i class="iconfont icon-chengyuan icon-info" />
        <span class="name icon-info">{{user.name}}</span>
        <i class="iconfont icon-icon-test1 icon-setting" />
        <span class="setting icon-setting">{{user.identity}}</span>
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
    }
    .right {
      height: 100%;
      background-color: #ebebeb;
      position: relative;
      .icon-info {
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translateY(-50px);
        font-size: 60px;
      }
      .name {
        left: 80px;
        font-size: 30px;
        top: 52%;
      }
      .icon-setting {
        position: absolute;
        top: 62%;
        left: 20px;
        transform: translateY(-50px);
        font-size: 60px;
      }
      .setting {
        left: 90px;
        font-size: 30px;
        top: 64%;
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
