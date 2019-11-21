<template>
    <div  class="container">
        <Header></Header>
        <router-view></router-view>
    </div>
</template>
<script>
import Header from '../components/common/Header'
export default {
  name: 'index',
  components: {
    Header
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