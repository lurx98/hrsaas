<template>
  <!-- slot-scope 作用于插槽的数据信息； slot-scope 就是组件内部将数据提供给外部的渠道 -->
  <!-- sclot-scope="scope"   scope就是组件内部提供给外部的数据-->
  <el-row type="flex" justify="space-between" style="width: 100%">
    <!-- 左侧区域 -->
    <div>{{ treeNode.name }}</div>
    <!-- 右侧区域 -->
    <el-col :span="5">
      <el-row type="flex">
        <el-col :span="12">{{ treeNode.manager }}</el-col>
        <el-col :span="12">
          <!-- 下拉菜单 -->
          <el-dropdown @command="clickHandler">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item command="del" v-if="!isRoot"
                >删除部门</el-dropdown-item
              >
              <el-dropdown-item command="edit" v-if="!isRoot"
                >修改部门</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { delDepartmentApi } from "@/api/department";
export default {
  name: "TreeTools",
  props: {
    // 改行的数据信息
    treeNode: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async clickHandler(val) {
      console.log(val, "item点击了");
      if (val === "add") {
        // 添加子部门逻辑
        this.$emit("addDept", this.treeNode);
      }
      if (val === "del") {
        // 删除逻辑
        await this.$confirm("确认删除吗");
        await delDepartmentApi(this.treeNode.id);
        this.$message.success("删除成功");
        this.$emit("updateList");
      }
      if (val === "edit") {
        // 修改逻辑
        this.$emit("editDept", this.treeNode.id);
      }
    },
  },
};
</script>
<style lang="less" scoped></style>
