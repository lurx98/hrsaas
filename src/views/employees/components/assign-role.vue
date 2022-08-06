<template>
  <el-dialog
    title="关联角色"
    :visible.sync="showDialog"
    @close="checkRoleList = []"
  >
    <el-checkbox-group v-model="checkRoleList">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>
    <br />
    <el-row type="flex" justify="center">
      <el-button size="small" @click="showDialog = false">取消</el-button>
      <el-button size="small" type="primary" @click="btnOk">确定</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
import { getRoleListApi } from "@/api/setting";
import { assignRoleApi } from "@/api/employees";
export default {
  name: "AssignRole",
  data() {
    return {
      showDialog: false,
      roleList: [],
      checkRoleList: [],
      userId: "",
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      let { rows } = await getRoleListApi({
        page: 1,
        pagesize: 1000,
      });
      this.roleList = rows;
    },
    async btnOk() {
      /* 提交用户关联的角色 */
      await assignRoleApi({
        id: this.userId, // 用户ID
        roleIds: this.checkRoleList, // 关联的角色ID
      });
      this.$message.success("关联角色成功");
      this.showDialog = false;
    },
  },
};
</script>
<style lang="less" scoped></style>
