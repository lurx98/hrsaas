<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 头部区域 -->
        <tree-tools @addDept="addDept" :is-root="true" :tree-node="company" />
        <br />
        <hr />
        <!-- #region -->
        <!-- 组织架构 -->
        <!-- 树组件el-tree   -->
        <!-- 
          data 属性是树的数据，
          props 属性是展示的规则  ===> { label:'展示的文字字段(默认是label)', children:'子级数据放在哪里(默认是children)' }
          show-checkbox 属性 是是否显示勾选框
        -->
        <!-- #endregion -->
        <el-tree :data="departs" :props="{ label: 'name' }">
          <!-- 自动定义内容 -->
          <tree-tools
            @editDept="editDept"
            @addDept="addDept"
            @updateList="initData"
            slot-scope="{ data }"
            :tree-node="data"
          />
        </el-tree>
      </el-card>
    </div>
    <!------------新增弹框组件 S--------------->
    <add-dept @updateList="initData" ref="addDept" />
    <!------------新增弹框组件 E--------------->
  </div>
</template>
<script>
import treeTools from "./components/tree-tools.vue";
import { getDepartmentListApi, getDepartmentInfoApi } from "@/api/department";
import { tranListToTreeData } from "@/utils";
import AddDept from "./components/add-dept.vue";
export default {
  components: { treeTools, AddDept },
  name: "Department",
  data() {
    return {
      company: {
        name: "传智教育",
        manager: "负责人",
        id: "",
      },
      departs: [],
    };
  },
  created() {
    // 3. 调用
    this.initData();
  },
  methods: {
    // 2. 定义方法
    async initData() {
      // 2.1 发生请求
      let { companyName, depts } = await getDepartmentListApi();
      // 2.2 加工处理数据,赋值
      this.company.name = companyName;
      this.departs = tranListToTreeData(depts, "");
    },
    addDept(val) {
      console.log(val);
      // val 就是点击项的数据，就是给val 添加子部门
      // ref 的作用： 获取DOM标签实例；组件实例
      // console.log(this.$refs.addDept); // 获取到  <add-dept/> 这个组件实例
      this.$refs.addDept.dialogShow = true;
      this.$refs.addDept.formData.pid = val.id;
    },
    async editDept(id) {
      // id就是点击项的ID
      // 1. 获取详情数据
      let res = await getDepartmentInfoApi(id);
      // 2. 赋给表单
      this.$refs.addDept.formData = res;
      // 3. 弹框打开
      this.$refs.addDept.dialogShow = true;
    },
  },
};
</script>
<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
