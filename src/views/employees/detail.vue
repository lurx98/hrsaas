<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              :model="formData"
              :rules="rules"
              ref="form"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="formData.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input
                  v-model="formData.password2"
                  style="width: 300px"
                  type="password"
                  show-password
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="btnOk">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- <component is="组件的名称"></component> -->
          <el-tab-pane label="个人详情">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${userId}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- <component is="userInfo"></component> -->
            <user-info @updateUser="initData" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/employees/print/${userId}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- <component is="jobInfo"></component> -->
            <job-info />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getUserInfoApi, editUserApi } from "@/api/employees";
import jobInfo from "./components/job-info.vue";
import userInfo from "./components/user-info.vue";
export default {
  name: "EmployessDetail",
  components: {
    jobInfo,
    userInfo,
  },
  data() {
    return {
      formData: {
        username: "",
        password2: "",
      },
      userId: this.$route.params.id,
      rules: {
        username: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        password2: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 9, message: "密码长度6-9位", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      let res = await getUserInfoApi(this.userId);
      this.formData = res;
    },
    async btnOk() {
      await this.$refs.form.validate();
      await editUserApi({
        ...this.formData,
        password: this.formData.password2 || "",
      });
      this.$message.success("更新成功");
    },
  },
};
</script>
<style lang="less" scoped></style>
