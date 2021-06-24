<template>
  <div>
    <el-form :model="form" ref="form" label-width="80px" class="form-style">
      <el-form-item label="用户名称">
        <el-input v-model="form.name" class="form-input"></el-input>
      </el-form-item>
      <el-form-item label="所属公司">
        <el-input v-model="form.company" class="form-input"></el-input>
      </el-form-item>
      <el-form-item label="接收邮箱">
        <el-input v-model="form.email" class="form-input"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onClean">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      form: {
        name: "",
        company: "",
        email: "",
      },
    };
  },

  methods: {
    onSubmit: function () {
      alert("确认提交？");
      if (
        this.form.email.indexOf("@") === -1 &&
        this.form.email.indexOf(".com" === -1)
      ) {
        alert("邮箱输入错误!!!");
        this.form.email = "";
      } else {
        console.log("form:", this.form);
        alert("提交成功！");
      }
    },

    onClean: function () {
      [this.form.name, this.form.company, this.form.email] = [""];
      alert("取消成功");
      console.log("form clean:", this.form);
    },
  },
};
</script>

<style scoped>
.form-style {
  display: flex;
  flex-direction: column;
  margin: 30px 0px 0px 150px;
  width: 500px;
}

.form-input {
  width: 360px;
}
</style>