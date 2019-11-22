<template>
  <el-table
    v-if="tableData.length > 0"
    class="table-box"
    border
    max-heigth="450"
    :data="tableData"
    style="width: 100%"
  >
    <el-table-column :formatter="formatDate" prop="date" label="创建时间" width="250">
       <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="收支类型" align="center" width="150">
    </el-table-column>
    <el-table-column
      prop="describe"
      label="收支描述"
      align="center"
      width="180"
    >
    </el-table-column>
    <el-table-column prop="income" label="收入" align="center" width="170">
      <template slot-scope="scope">
        <span style="color:#00d053">+ {{ scope.row.income }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="expend" label="支出" align="center" width="170">
      <template slot-scope="scope">
        <span style="color:#f56767">- {{ scope.row.expend }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="cash" label="账户现金" align="center" width="170">
      <template slot-scope="scope">
        <span style="color:#4db3ff">{{ scope.row.cash }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="remark" label="备注" align="center" width="220">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "FoundList",
  created() {
    this.getTableList();
  },
  data() {
    return {
      tableData: []
    };
  },
  methods: {
      //格式化时间
    formatDate() {

    },

    //获取数据
    getTableList() {
      this.$axios.get("/api/profiles").then(res => {
        console.log(res);
        this.tableData = res.data.success;
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style lang="less" scoped>
.table-box {
  margin-left: 180px;
}
</style>
