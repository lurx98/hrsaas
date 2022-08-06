<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <el-button type="primary" size="small" @click="addHandler('0', 1)"
          >添加权限</el-button
        >
      </page-tools>
      <!-- 表格 -->
      <el-table :data="list" border row-key="id">
        <el-table-column prop="name" align="center" label="名称" />
        <el-table-column prop="code" align="center" label="标识" />
        <el-table-column prop="description" align="center" label="描述" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" @click="addHandler(row.id, 2)"
              >添加</el-button
            >
            <el-button type="text" @click="editHandler(row.id)">编辑</el-button>
            <el-button type="text" @click="delHandler(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- --------------新增修改弹框---------------- -->
    <AddPerm ref="addPerm" @updateList="initData" />
  </div>
</template>
<script>
import {
  getPermissionListApi,
  getPermissionInfoApi,
  delPermissionApi,
} from "@/api/permission";
import { tranListToTreeData } from "@/utils";
import AddPerm from "./components/add-perm.vue";
export default {
  name: "Permission",
  components: { AddPerm },
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      let res = await getPermissionListApi();
      this.list = tranListToTreeData(res, "0");
    },
    addHandler(val, type) {
      this.$refs.addPerm.formData.pid = val;
      this.$refs.addPerm.formData.type = type;
      this.$refs.addPerm.showDialog = true;
    },
    async editHandler(id) {
      let res = await getPermissionInfoApi(id);
      this.$refs.addPerm.formData = res;
      this.$refs.addPerm.showDialog = true;
    },
    async delHandler(id) {
      await this.$confirm("确认删除吗？");
      await delPermissionApi(id);
      this.$message.success("删除成功");
      this.initData();
    },
  },
};
</script>
<style></style>
