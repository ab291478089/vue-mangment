<template>
  <div>
    <el-dialog title="添加资金信息" :visible.sync="dialog" width="30%">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="收支类型:" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择收支类型">
            <el-option
              v-for="(item, index) in formTypes"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支描述:" prop="describe">
          <el-input v-model="ruleForm.describe"></el-input>
        </el-form-item>
        <el-form-item label="收入:" prop="income">
          <el-input v-model.number="ruleForm.income"></el-input>
        </el-form-item>
        <el-form-item label="支出:" prop="expend">
          <el-input v-model.number="ruleForm.expend"></el-input>
        </el-form-item>
        <el-form-item label="账户现金:" prop="cash">
          <el-input v-model.number="ruleForm.cash"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input type="textarea" v-model.number="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialog: Boolean
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      ruleForm: {
        id: "",
        type: "", //收支类型
        describe: "", //收支描述
        income: "", //收入
        expend: "", //支出
        cash: "", //现金
        remark: "" //备注
      },
      formTypes: ["提现", "提现手续费", "充值", "优惠劵", "充值礼券", "转账"],
      rules: {
        describe: [
          {
            required: true,
            trigger: "blur",
            max: 16,
            min: 4,
            message: "必填且内容不得超过16个字"
          }
        ],
        income: [
          {
            required: true,
            trigger: "blur",
            message: "必填"
          }
        ],
        expend: [
          {
            required: true,
            trigger: "blur",
            message: "必填"
          }
        ],
        cash: [
          {
            required: true,
            trigger: "blur",
            message: "必填"
          }
        ],
        remark: [
           {
            required: true,
            trigger: "blur",
            max: 32,
            min: 4,
            message: "必填且内容不得超过32个字"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post('/api/profiles/add', this.ruleForm)
          .then( res => {
            console.log (res)
            if(res.status === 200) {
              this.$emit("getDialog");
              this.$axios.get('/api/profiles')
              .then( res => {
                console.log("get",res)
                if(res.status === 200 ) {
                  const tableList = res.data.success
                  this.$emit('getTablesList', tableList)
                }
              })
            }
             
          })
         
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
