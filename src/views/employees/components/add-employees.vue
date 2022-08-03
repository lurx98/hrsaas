<template>
  <el-dialog title="新增员工" @close="close" :visible.sync="showDialog">
    <el-form
      v-if="showDialog"
      :model="formData"
      :rules="formRules"
      ref="form"
      label-width="140px"
    >
      <el-form-item label="姓名" prop="username">
        <el-input placeholder="请输入" v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input placeholder="请输入" v-model="formData.mobile"></el-input>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment">
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input placeholder="请输入" v-model="formData.workNumber"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <!-- 级联选择器， options属性是它的数据-->
        <!-- props属性表示展示规则：label显示的文字字段，value提交的数据字段，children子集存储的字段 -->
        <el-cascader
          @focus="getDepartmentList"
          v-model="formData.departmentName"
          :options="depts"
          :props="{ label: 'name', value: 'name' }"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center">
      <el-button size="small" @click="showDialog = false">取消</el-button>
      <el-button size="small" type="primary" @click="btnOK">确定</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
import EmplyeesConst from "@/api/constant/employees";
import { addUserApi } from "@/api/employees";

import { getDepartmentListApi } from "@/api/department";
import { tranListToTreeData } from "@/utils";
export default {
  name: "AddEmploy",
  data() {
    return {
      showDialog: false,
      formData: {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: [],
        timeOfEntry: "",
        correctionTime: "",
      },
      formRules: {
        username: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 2, max: 4, message: "长度在2-4", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        formOfEmployment: [
          { required: true, message: "请输入", trigger: "change" },
        ],
        workNumber: [{ required: true, message: "请输入", trigger: "blur" }],
        departmentName: [
          {
            validator: (rules, value, cb) => {
              if (value.length === 0) return cb(new Error("请选择部门"));
              cb();
            },
            trigger: "change",
          },
        ],
        timeOfEntry: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      hireType: EmplyeesConst.hireType,
      depts: [],
    };
  },
  methods: {
    async getDepartmentList() {
      let { depts } = await getDepartmentListApi();
      this.depts = tranListToTreeData(depts, "");
    },
    async btnOK() {
      // 1. 校验
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return console.log(error);
      }
      //   2. 发生请求
      // 2.1 加工数据（拷贝）
      const cloneFormData = JSON.parse(JSON.stringify(this.formData));
      const len = cloneFormData.departmentName.length - 1;
      cloneFormData.departmentName = cloneFormData.departmentName[len];
      // 2.2 发生请求
      await addUserApi(cloneFormData);
      //  3.提示成功
      this.$message.success("新增成功");
      // 4. 关闭弹框
      this.showDialog = false;
      // 5. 列表更新
      this.$emit("updateList");
    },
    close() {
      this.formData = {};
    },
  },
};
</script>
<style lang="scss" scoped></style>
