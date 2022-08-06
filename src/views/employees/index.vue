<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具条 -->
      <page-tools :text="`共${total}条记录`">
        <el-button :disabled="!checkPermission('employees-export')" size="small" type="danger"
          @click="expotToExcelHandler">
          普通excel导出</el-button>
        <el-button :disabled="!checkPermission('employees-export') && checkList.length === 0" size="small"
          @click="expotToExcelFzHandler" type="info">
          选中数据复杂表头excel导出</el-button>
        <el-button :disabled="!checkPermission('employees-import')" size="small" type="success"
          @click="$router.push('/import?type=user')">excel导入</el-button>
        <el-button :disabled="!checkPermission('employees-add')" size="small" type="primary"
          @click="$refs.addEmployees.showDialog = true">新增员工</el-button>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table @selection-change="checkList = $event" :data="list" border>
          <el-table-column type="selection" />
          <el-table-column type="index" label="序号" sortable="" />
          <el-table-column prop="username" label="姓名" sortable="" />
          <el-table-column label="头像" sortable="">
            <template slot-scope="{ row }">
              <img v-imgerror="require('@/assets/common/bigUserHeader.png')" style="height: 100px" :src="row.staffPhoto"
                alt="" @click="imgClickHandler(row.staffPhoto)" />
            </template>
          </el-table-column>
          <el-table-column prop="workNumber" label="工号" sortable="" />
          <el-table-column prop="formOfEmployment" :formatter="formatterFun" label="聘用形式" sortable="">
            <!-- <template slot-scope="{ row }">
              <span v-if="row.formOfEmployment * 1 === 1">正式</span>
              <span v-if="row.formOfEmployment * 1 === 2">非正式</span>
            </template> -->
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" sortable="" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="scope">
              <el-button type="text" :disabled="!checkPermission('employees-edit')" size="small"
                @click="$router.push('/employees/detail/' + scope.row.id)">查看
              </el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="assignRoleHandler(scope.row)">角色</el-button>
              <el-button type="text" :disabled="!checkPermission('employees-del')" @click="delHandler(scope.row.id)"
                size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <!-- 3个变量：每页数量、页码数、总数  -->
          <!-- 2个事件：页码切换事件、每页数量切换事件-->
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="queryData.page" :page-sizes="[3, 4, 5, 10]" :page-size="queryData.size"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </el-row>
      </el-card>
    </div>
    <!--------------------------------------------------------添加员工 -->
    <AddEmployees @updateList="initData" ref="addEmployees" />
    <!--------------------------------------------------------查看二维码弹框 -->
    <el-dialog title="查看二维码" :visible.sync="showDialog">
      <!-- 画布标签 -->
      <canvas ref="canvas"></canvas>
    </el-dialog>
    <!--------------------------------------------------------关联角色 -->
    <AssignRole ref="assignRole" />
  </div>
</template>
<script>
import { getUserListApi, delUserApi, getUserInfoApi } from "@/api/employees";
import EmplyeesConst from "@/api/constant/employees";
import AddEmployees from "./components/add-employees.vue";
import { formatDate } from "@/filters";
import Qrcode from "qrcode";
import AssignRole from "./components/assign-role.vue";
import list from '@/mixins/list'
export default {
  mixins: [list],
  components: { AddEmployees, AssignRole },
  name: "Employees",
  data() {
    return {
      // list: [],
      queryData: {
        // page: 1,
        size: 10,
      },
      // total: 0,
      checkList: [],
      showDialog: false,
    };
  },
  // created() {
  //   this.initData();
  // },
  methods: {
    async initData() {
      let { total, rows } = await getUserListApi(this.queryData);
      this.list = rows;
      this.total = total;
    },
    // selectionChange(val) {
    //   // val 就是勾选中的数据
    //   console.log(val);
    //   this.checkList = val;
    // },
    // 每页数量切换事件【列表功能】
    handleSizeChange(val) {
      // val是最新的每页数量
      console.log(`每页 ${val} 条`);
      this.queryData.size = val;
      this.initData();
    },
    // 页码切换事件【列表功能】
    // handleCurrentChange(val) {
    //   // val是最新的页码
    //   console.log(`当前页: ${val}`);
    //   this.queryData.page = val;
    //   this.initData();
    // },
    // 格式化函数
    formatterFun(row, column, cellValue, index) {
      // console.log(row, column, cellValue, index);
      // row 是改行数据，column该列信息，cellValue是该单元格的数据，index是行索引
      // formatter 格式化处理函数一定要有返回值，返回值就是渲染的内容
      // let hireType = [
      //   { id: 1, value: "正式" },
      //   { id: 2, value: "非正式" },
      // ];
      let res = EmplyeesConst.hireType.find(
        (item) => item.id === cellValue * 1
      );
      return res ? res.value : "未知";
    },
    // 删除的事件函数
    async delHandler(id) {
      await this.$confirm("确认删除吗");
      await delUserApi(id);
      this.$message.success("删除成功");
      if (this.queryData.page > 1 && this.list.length === 1) {
        this.queryData.page--;
      }
      this.initData();
    },
    // 导出到excel文件
    expotToExcelHandler() {
      //  import xx from '路径'   webpack编译的时候就会将他打包在一起
      //  import(路径)  返回的是Promise
      import("@/vendor/Export2Excel").then(async (excel) => {
        // 1. 准备导出的数据
        let { rows } = await getUserListApi({ page: 1, size: 1000000 });
        // 2. 整理数据结构
        let result = this.zlsjData(rows);
        // 3. 导出
        // excel.export_json_to_excel() 导出JSON数据到excel表格
        excel.export_json_to_excel({
          header: result.tableHeader, //表头 必填
          data: result.tableData, //具体数据 必填
          filename: "所有员工数据", //非必填  表格名称
          autoWidth: true, //非必填  是否自动宽度
          bookType: "xlsx", //非必填  excel的类型
        });
      });
    },
    // 复杂表头的导出
    expotToExcelFzHandler() {
      import("@/vendor/Export2Excel").then(async (excel) => {
        // 1. 准备导出的数据
        // 2. 整理数据结构
        let result = this.zlsjData(this.checkList);
        // 3. 导出
        // excel.export_json_to_excel() 导出JSON数据到excel表格
        excel.export_json_to_excel({
          header: result.tableHeader, //普通表头 必填
          data: result.tableData, //具体数据 必填
          multiHeader: [["姓名", "主要信息", "", "", "", "", "部门"]], // 复杂表头
          merges: ["A1:A2", "B1:F1", "G1:G2"], // 合并规则
          filename: "所有员工数据", //非必填  表格名称
          autoWidth: true, //非必填  是否自动宽度
          bookType: "xlsx", //非必填  excel的类型
        });
      });
    },
    // 处理数据
    zlsjData(rows) {
      // 目标数据结构：
      // =================> 表头  ['姓名','工号','聘用形式','部门','入职时间']
      /*
          =================> 表格身体数据
            [
              ['管理员',9002,1,总裁办1,2018-11-12],
              ['管理员1',233,1,总裁办2,2018-11-12],
              ['管理员2',123,1,总裁办3,2018-11-12],
            ]
        */
      //  现有数据结构：[ {id: '234234', mobile: '13800000002', username: '管理员', timeOfEntry: '2018-11-02'},{},{}]
      const headers = {
        姓名: "username",
        手机号: "mobile",
        入职日期: "timeOfEntry",
        聘用形式: "formOfEmployment",
        转正日期: "correctionTime",
        工号: "workNumber",
        部门: "departmentName",
      };
      let arr = [];
      rows.forEach((item) => {
        // item 是每行的数据 是一个对象
        let temp = [];
        Object.keys(headers).forEach((val) => {
          // val 是中文键名  headers[val] 英文键名   item[headers[val]] 值
          if (headers[val] === "formOfEmployment") {
            let findRes = EmplyeesConst.hireType.find(
              (v) => v.id === item[headers[val]] * 1
            );
            temp.push(findRes ? findRes.value : "未知");
          } else if (
            headers[val] === "timeOfEntry" ||
            headers[val] === "correctionTime"
          ) {
            temp.push(formatDate(item[headers[val]]));
          } else {
            temp.push(item[headers[val]]);
          }
        });
        arr.push(temp);
      });
      return { tableData: arr, tableHeader: Object.keys(headers) };
    },
    // 图片二维码点击事件
    imgClickHandler(url) {
      if (url.trim() === "") return;
      // 绘制二维码
      //  Qrcode.toCanvas(绘制的画布节点、绘制的内容、回调函数)
      this.showDialog = true; // 弹框第一次打开，里面的内容才会创建！
      // 创建的过程是异步耗时，不能直接就在后面读取里面的信息
      this.$nextTick(() => {
        console.log(this.$refs.canvas);
        Qrcode.toCanvas(this.$refs.canvas, url, (error) => {
          if (error) return this.$message.fail("生成二维码失败");
        });
      });
    },
    // 找到该用户的详细信息
    async assignRoleHandler(val) {
      // 获取用户的信息
      let res = await getUserInfoApi(val.id);
      // 将用户的ID赋给绑定变量
      this.$refs.assignRole.checkRoleList = res.roleIds;
      this.$refs.assignRole.userId = val.id;
      // 打开弹框
      this.$refs.assignRole.showDialog = true;
    },
  },
};
</script>
<style>
</style>
