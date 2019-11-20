<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
//引入解析token第三方插件
import jwtDecode from "jwt-decode";
export default {
  name: "app",
  created() {
    if (localStorage.eleToken) {
      const token = localStorage.eleToken
      //解析token
      const decode = jwtDecode(token);
      //存储到vuex中
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decode));
      this.$store.dispatch("setUser", decode);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
