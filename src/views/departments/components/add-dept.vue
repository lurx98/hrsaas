<template>
  <!-- 绘制弹框 -->
  <el-dialog :title="title" @close="closeHandler" :visible.sync="dialogShow">
    <!-- 绘制表单 -->
    <el-form
      :model="formData"
      :rules="formRules"
      ref="form"
      label-width="140px"
      v-if="dialogShow"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input style="width: 80%" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input style="width: 80%" v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          @focus="getManagerList"
          v-model="formData.manager"
          placeholder="请选择"
        >
          <el-option
            v-for="item in managerList"
            :key="item.value"
            :label="item.username"
            :value="item.username"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          style="width: 80%"
          type="textarea"
          rows="4"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
      <el-row type="flex" justify="center">
        <el-button @click="dialogShow = false">取消</el-button>
        <el-button type="primary" @click="btnOK">确定</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
import { getEmployeeSimpleApi } from "@/api/employees";
import {
  addDepartmentApi,
  getDepartmentListApi,
  editDepartmentApi,
} from "@/api/department";
export default {
  name: "AddDept",
  data() {
    // 自定义校验写在这里
    // 部门名称查重
    const checkNameRepeat = async (rule, value, cb) => {
      // 比如：给财务部添加子部门，新增的这个部门和 财务、税务、薪资、薪酬部门是同级，不能和他们同名
      // 1. 找到所有部门的数据
      let { depts } = await getDepartmentListApi();
      // 2. 找到兄弟们，判断是否和兄弟们同名
      let isRepeat = false;
      // 新增和修改不同的判断重复逻辑
      if (this.formData.id) {
        isRepeat = depts
          .filter(
            (item) =>
              item.pid === this.formData.pid && item.id !== this.formData.id
          )
          .some((item) => item.name === value);
      } else {
        isRepeat = depts
          .filter((item) => item.pid === this.formData.pid)
          .some((item) => item.name === value);
      }

      // 3. 返回结果
      isRepeat ? cb(new Error(`同级存在${value}这个部门名称`)) : cb();
    };
    // 部门编码查重
    const checkCodeRepeat = async (rule, value, cb) => {
      // 比如：所有的部门编码不允许出现重复
      // 1. 找到所有部门的数据
      let { depts } = await getDepartmentListApi();
      // 2.是否有重复
      // 新增和修改不同的判断重复逻辑
      let isRepeat = false;
      if (this.formData.id) {
        isRepeat = depts.some(
          (item) => item.id !== this.formData.id && item.code === value
        );
      } else {
        isRepeat = depts.some((item) => item.code === value);
      }
      // 3. 返回结果
      isRepeat ? cb(new Error(`已存在${value}这个部门编码`)) : cb();
    };
    return {
      dialogShow: false,
      // 表单数据对象
      formData: {
        code: "",
        introduce: "",
        manager: "",
        name: "",
        pid: "", // 添加子部门的那个部门的ID
      },
      // 表单验证规则
      formRules: {
        name: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: checkNameRepeat, trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: checkCodeRepeat, trigger: "blur" },
        ],
        manager: [{ required: true, message: "请输入", trigger: "blur" }],
        introduce: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      managerList: [], // 部门负责人
    };
  },
  computed: {
    title() {
      return this.formData.id ? "修改部门" : "添加子部门";
    },
  },
  created() {
    // // 调用
    // this.getManagerList();
  },
  methods: {
    // 获取部门负责人数据
    async getManagerList() {
      this.managerList = await getEmployeeSimpleApi();
    },
    // 提交事件
    async btnOK() {
      // 1. 表单校验
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return console.log(error);
      }
      // 2. 发生请求（操作行为的判断）
      if (this.formData.id) {
        // 修改
        await editDepartmentApi(this.formData);
        // 3. 提示成功
        this.$message.success("修改成功");
      } else {
        // 添加
        await addDepartmentApi(this.formData);
        // 3. 提示成功
        this.$message.success("新增成功");
      }
      // 4. 关闭弹框
      this.dialogShow = false;
      // 5. 列表更新
      this.$emit("updateList");
    },
    // 关闭事件
    closeHandler() {
      // 表单重置
      this.formData = {
        code: "",
        introduce: "",
        manager: "",
        name: "",
        pid: "", // 添加子部门的那个部门的ID
      };
    },
  },
};
</script>
<style lang="scss" scoped></style>
