<template>
  <div class="home">
    <div class="contaner">
      <h2 class="title">逍遥在线后台管理系统</h2>
      <p class="lead">专注于前端开发多年，并有深刻见解与体会！</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  background: url("../assets/showcase.png") no-repeat;
  background-size: 100% 100%;
  .contaner {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: rgba(0,0,0,.7);
    padding-top: 150px;
    text-align: center;
    color: white;
    .title{
        font-size: 30px;
        font-weight: 500;
    }
    .lead{
        padding-top: 30px;
        font-weight: 300;
        font-size:15px;
    }
  }
}
</style>
<script>
export default {};
</script>
