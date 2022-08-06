<template>
  <el-dialog
    title="关联权限"
    :visible.sync="showDialog"
    width="30%"
    @close="close"
  >
    <!-- 默认选中的ID default-checked-keys,必须加上node-key -->
    <!-- 默认父级如果被选中，则所有子级都会被勾选 -->
    <!-- 如果子级部分被选中，父级半选状态；如果子级都被选中，则父级勾选 -->
    <!---------------------------------->
    <!-- check-strictly 是否父子遵循严格互不关联，父是父，子是子，没有关系 -->
    <!-- 该属性的默认值是false，也就是父子关联 -->
    <!-- 该属性值是TRUE，则父子互不关联 -->
    <el-tree
      ref="tree"
      v-if="showDialog"
      :default-checked-keys="checkAuthId"
      :check-strictly="true"
      show-checkbox
      node-key="id"
      :data="allAuth"
      :props="{ label: 'name' }"
    >
    </el-tree>
    <span slot="footer">
      <el-button @click="showDialog = false">取消</el-button>
      <el-button type="primary" @click="btnOK">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getPermissionListApi } from "@/api/permission";
import { tranListToTreeData } from "@/utils";
import { assignAuthApi } from "@/api/setting";
export default {
  name: "AssignAuth",
  data() {
    return {
      showDialog: false,
      allAuth: [],
      checkAuthId: [],
      roleId: "",
    };
  },
  created() {
    this.initData();
  },
  methods: {
    // 获取所有的权限
    async initData() {
      let res = await getPermissionListApi();
      this.allAuth = tranListToTreeData(res, "0");
    },
    // 回显勾选节点
    // treeSetKeys(arr) {
    //   this.$refs.tree.setCheckedKeys(arr);
    // },
    // 提交事件
    async btnOK() {
      const permIds = this.$refs.tree.getCheckedKeys();
      if (permIds.length === 0) return this.$message.error("请勾选");
      await assignAuthApi({
        id: this.roleId, // 角色ID
        permIds, // 角色权限
      });
      this.$message.success("关联成功");
      this.showDialog = false;
    },
    close() {
      this.checkAuthId = [];
    },
  },
};
</script>
<style lang="less" scoped></style>
