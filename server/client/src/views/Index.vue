<template>
    <div  class="container">
        <Header></Header>
        <LeftMenu></LeftMenu>
        <router-view></router-view>
    </div>
</template>
<script>
import Header from '../components/common/Header'
import LeftMenu from '../components/common/LeftMenu'
export default {
  name: 'index',
  components: {
    Header,
    LeftMenu
  }
}
</script>
<style lang="less" scoped>
.container{
    width:100%;
    height:100%;
    overflow: hidden;
}
</style>