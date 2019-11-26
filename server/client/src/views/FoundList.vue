<template>
  <div class="tables-box">
    <div>
      <el-form :inline="true" ref="add_data">
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="handleAdd()">添加</el-button>
        </el-form-item>
      </el-form>
      <Dialog :dialog="dialog"></Dialog>
    </div>
    <el-table
      v-if="tableData.length > 0"
      class="table-box"
      border
      max-heigth="450"
      :data="tableData"
      style="width: 90%"
    >
      <el-table-column type="index" label="序号" align="center" width="70">
      </el-table-column>
      <el-table-column
        
        prop="date"
        align="center"
        label="创建时间"
        width="250"
      >
        <template slot-scope="scope" :formatter="formatDate">
          <i class="el-icon-time"></i>
         <span  style="margin-left: 10px">{{ scope.row.date }}</span> 
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
      <el-table-column label="操作" prop="operation" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="warning"
            icon="edit"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            icon="delete"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Dialog from '../components/Dialog.vue'
let moment = require('moment')
export default {
  name: "FoundList",
  components: { 
    Dialog
  },
  created() {
    this.getTableList();
  },
  data() {
    return {
      tableData: [],
      dialog: {
        show: false
      }
    };
  },
  methods: {
    //格式化时间
    formatDate(row) {
      console.log("222",row)
      moment().format('lll')
    },
    // 添加
    handleAdd() {
      this.dialog.show = true
    },
    //获取数据
    getTableList() {
      this.$axios.get("/api/profiles").then(res => {
        console.log(res);
        this.tableData = res.data.success;
        this.tableData.date = moment().format('lll')
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
.tables-box{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding:50px;
  .btnRight{
    float: right;
  }
  .table-box {
  margin-left: 180px;
}
}

</style>
