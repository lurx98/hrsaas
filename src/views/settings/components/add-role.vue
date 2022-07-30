<template>
  <!-- 2.1 绘制弹框 【添加、修改 功能】 -->
  <el-dialog
    :title="this.formData.id ? '修改' : '新增'"
    @close="close"
    :visible.sync="showDialog"
  >
    <!-- 3. 绘制表单 【添加、修改 功能】-->
    <el-form
      v-if="showDialog"
      label-width="120px"
      :model="formData"
      :rules="formRules"
      ref="form"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input
          placeholder="请输入角色名称"
          v-model="formData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input
          type="textarea"
          rows="3"
          placeholder="请输入角色描述"
          v-model="formData.description"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center">
      <!-- 4.1 取消按钮点击事件，关闭弹框 【添加、修改 功能】-->
      <el-button size="small" @click="showDialog = false">取消</el-button>
      <!-- 4.1 确定按钮绑定点击事件，执行提交逻辑 【添加、修改 功能】-->
      <el-button size="small" @click="btnOk" type="primary">确定</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
import { addRoleApi, editRoleApi } from "@/api/setting";
export default {
  name: "addRole",
  data() {
    return {
      // ---------------------------------
      // 1. 定义变量 【添加、修改 功能】
      showDialog: false, // 弹框控制变量
      formData: {
        // 表单变量
        name: "",
        description: "",
      },
      formRules: {
        // 表单规则
        name: [{ required: true, message: "请输入角色名" }],
      },
    };
  },
  methods: {
    // 5. 提交逻辑 【添加功能】
    async btnOk() {
      // 5.1 表单校验
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return console.log(error);
      }
      // 5.2 发生请求
      if (this.formData.id) {
        await editRoleApi(this.formData);
      } else {
        await addRoleApi(this.formData);
      }
      // 5.3 失败处理，成功提示
      this.$message.success("操作成功");
      // 5.4 关闭弹框、重置表格
      this.showDialog = false;
      // 5.5 重新获取列表
      this.$emit("updateList");
    },
    close() {
      this.formData = {
        name: "",
        description: "",
      };
    },
  },
};
</script>
<style lang="less" scoped></style>
