<template>
  <el-dialog
    :title="formData.id ? '修改' : '新增'"
    :visible.sync="showDialog"
    width="50%"
    @close="btnCancel"
  >
    <!--表单 -->
    <el-form
      :model="formData"
      ref="form"
      :rules="formRules"
      label-width="120px"
    >
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="权限描述">
        <el-input type="textarea" v-model="formData.description"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch
          active-value="1"
          inactive-value="0"
          v-model="formData.enVisible"
        ></el-switch>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="showDialog = false">取消</el-button>
      <el-button type="primary" @click="btnOk">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { editPermissionApi, addPermissionApi } from "@/api/permission";
export default {
  name: "",
  data() {
    return {
      formData: {
        enVisible: "1",
        name: "",
        code: "",
        description: "",
        type: "", // 类型   1表示菜单(页面)   2表示按钮
        pid: "", // 上级ID
      },
      showDialog: false,
      formRules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        code: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  methods: {
    async btnOk() {
      // 数据校验
      await this.$refs.form.validate();
      // 发生请求
      if (this.formData.id) {
        await editPermissionApi(this.formData);
      } else {
        await addPermissionApi(this.formData);
      }
      // 提示
      this.$message.success("操作成功");
      // 关闭弹框
      this.showDialog = false;
      // 列表更新
      this.$emit("updateList");
    },
    btnCancel() {
      this.formData = {};
    },
  },
};
</script>
<style lang="less" scoped></style>
