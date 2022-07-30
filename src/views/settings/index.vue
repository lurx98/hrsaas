<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!--------------角色管理----------------->
          <el-tab-pane label="角色管理">
            <!-- 操作区域 -->
            <el-row>
              <!-- 2.1 新增按钮点击弹框打开 【添加功能】 -->
              <el-button
                size="small"
                type="primary"
                @click="$refs.addRole.showDialog = true"
                >新增角色</el-button
              >
            </el-row>
            <br />
            <!-- 表格组件 -->
            <!-- el-table是表格组件，data属性表示数据 -->
            <!-- 4. 渲染数据 【列表功能】 -->
            <el-table border :data="tableData" style="width: 100%">
              <!-- el-table-column 是列组件 prop表示这列渲染的字段; label表示表头 -->
              <el-table-column prop="date" type="selection" width="80" />
              <el-table-column prop="date" type="expand" width="80">
                <template slot-scope="{ row }">
                  {{ row }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="角色名称" width="280">
              </el-table-column>
              <el-table-column prop="description" label="角色描述" width="380">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <!-- scope.$index 表示行的索引号； scope.row表示这一行的数据  -->
                  <el-button size="small" type="primary">分配权限</el-button>
                  <!-- 1. 修改按钮绑定事件,传入修改ID【修改功能】 -->
                  <el-button
                    size="small"
                    type="success"
                    @click="editHandler(scope.row.id)"
                    >编辑</el-button
                  >
                  <!-- 1. 删除按钮绑定事件,传入删除的ID【删除功能】 -->
                  <el-button
                    @click="delHandler(scope.row.id)"
                    size="small"
                    type="danger"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <!-- 3个变量：每页数量、页码数、总数  -->
            <!-- 2个事件：页码切换事件、每页数量切换事件-->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryData.page"
              :page-sizes="[3, 4, 5, 10]"
              :page-size="queryData.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </el-tab-pane>
          <!-------------公司信息------------------>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  v-model="companyInfo.name"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="companyInfo.companyAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="companyInfo.mailbox"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="companyInfo.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-----------------新增、修改功能------------------------->
    <add-role ref="addRole" @updateList="initData" />
  </div>
</template>
<script>
import {
  getRoleListApi,
  getCompanyInfoApi,
  getRoleInfoApi,
  delRoleApi,
} from "@/api/setting";
import AddRole from "./components/add-role.vue";
export default {
  name: "Setting",
  components: { AddRole },
  data() {
    return {
      // 1. 定义变量 【列表功能】
      tableData: [], // 表格的数据
      queryData: {
        // 列表接口的参数
        page: 1,
        pagesize: 3,
      },
      total: 0, // 总数
      companyInfo: {},
    };
  },
  created() {
    // 3. 调用方法【列表功能】
    this.initData();
  },
  methods: {
    // 2. methods定义方法 【列表功能】
    async initData() {
      let { rows, total } = await getRoleListApi(this.queryData);
      let res = await getCompanyInfoApi(this.$store.getters.companyId);
      this.companyInfo = res;
      this.tableData = rows;
      this.total = total;
    },
    // 每页数量切换事件【列表功能】
    handleSizeChange(val) {
      // val是最新的每页数量
      console.log(`每页 ${val} 条`);
      this.queryData.pagesize = val;
      this.initData();
    },
    // 页码切换事件【列表功能】
    handleCurrentChange(val) {
      // val是最新的页码
      console.log(`当前页: ${val}`);
      this.queryData.page = val;
      this.initData();
    },
    // 2. 修改事件函数 【修改功能,数据回显功能】
    async editHandler(id) {
      // 发生请求，获取改行的数据回显给表单并打开弹框
      let res = await getRoleInfoApi(id);
      this.$refs.addRole.formData = res;
      this.$refs.addRole.showDialog = true;
    },
    // 2. 删除事件函数 【删除功能】
    async delHandler(id) {
      // 2.1 弹出确认框
      await this.$confirm("确认删除吗");
      // 2.2 发生删除请求
      await delRoleApi(id);
      // 2.3 失败处理，成功提示
      this.$message.success("删除成功");
      // 边缘问题，如果不是第一页，且这一页只有一个且删除成功，则页码要-1
      if (this.queryData.page !== 1 && this.tableData.length === 1) {
        this.queryData.page--;
      }
      // 2.4 列表更新
      this.initData();
    },
  },
};
</script>
<style></style>
