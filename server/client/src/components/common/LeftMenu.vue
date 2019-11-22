<template>
  <el-row class="row-box">
    <el-col class="col-box">
      <el-menu
        mode="vertical"
        class="el-menu-vertical-demo el-menu-box"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="iconfont icon-shouye" />
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
          <template v-for="item in items">
            <el-submenu
              v-if="item.children"
              :index="item.path"
              :key="item.path"
            >
              <template slot="title">
                <i :class="'iconfont ' + item.icon" />
                <span slot="title">{{ item.name }}</span>
              </template>
              <template v-for="(citem, cindex) in item.children">
                <router-link :to="citem.path" :key="cindex">
                  <el-menu-item>
                    <span>{{ citem.name }}</span>
                  </el-menu-item>
                </router-link>
              </template>
            </el-submenu>
          </template>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "LeftMenu",
  data() {
    return {
      items: [
        {
          icon: "icon-youhuiquan",
          name: "资金管理",
          path: "fund",
          children: [{ path: "fundList", name: "资金流水" }]
        },
        {
          icon: "icon-shuju",
          name: "信息管理",
          path: "info",
          children: [{ path: "infoshow", name: "个人信息" }]
        }
      ]
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.row-box {
  min-height: 100%;
  position: fixed;
  top: 71px;
  left: 0;
  background-color: #324057;
  z-index: 99;
  .el-menu-box {
    border: none;
  }
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
