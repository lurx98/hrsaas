<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card style="padding: 20px">
        <h1 v-if="type === 'user'">导入员工</h1>
        <h1 v-if="type === 'moeny'">导入工资</h1>
        <h1 v-if="type === 'shebao'">导入社保</h1>
        <!-- 公共导入组件 -->
        <upload-excel :on-success="success" />
      </el-card>
    </div>
  </div>
</template>
<script>
import { batchUserApi } from "@/api/employees";
export default {
  name: "Import",
  data() {
    return {
      type: this.$route.query.type,
    };
  },
  methods: {
    async success({ header, results }) {
      // header ['手机号','姓名','入职日期','转正日期','工号']
      /*
       results
        [
            {入职日期:"45356",姓名:"高大山1",工号:"20089",手机号:188885222,转正日期:"43719"},
            {入职日期:"3453",姓名:"高大山2",工号:"20089",手机号:188885222,转正日期:"43719"},
            {入职日期:"123123",姓名:"高大山3",工号:"20089",手机号:188885222,转正日期:"43719"},
            {...}
            ....
        ]
       */
      //   目标数据： [ {timeOfEntry:"45356",username:"高大山1",workNumber:"20089",mobile:188885222,correctionTime:"43719"},...]
      // 需求：将results数组里面每个对象的中文键换成对应的英文键
      //   ----------------整理数据-----------------
      const userRelations = {
        入职日期: "timeOfEntry",
        手机号: "mobile",
        姓名: "username",
        转正日期: "correctionTime",
        工号: "workNumber",
      };
      let arr = [];
      results.forEach((item) => {
        // item 是每行数据
        // Object.keys(item) 中文键数组  ['入职日期','姓名','工号',...]
        let obj = {};
        Object.keys(item).forEach((value) => {
          // value是每个中文键; userRelations[value] 是中文键对应的英文; item[value] 是值
          //   console.log(value, userRelations[value], item[value]);
          const temp = ["correctionTime", "timeOfEntry"];
          if (temp.includes(userRelations[value])) {
            obj[userRelations[value]] = this.formatDate(item[value], "/");
          } else {
            obj[userRelations[value]] = item[value];
          }
        });
        arr.push(obj);
      });
      //   ----------------发生请求-----------------
      await batchUserApi(arr);
      this.$message.success("导入成功");
      this.$router.back();
    },
    // 处理excel里面读取出来日期出错的问题，转正真正的日期字符串
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1);
      time.setYear(time.getFullYear() - 70);
      const year = time.getFullYear() + "";
      const month = time.getMonth() + 1 + "";
      const date = time.getDate() - 1 + "";
      if (format && format.length === 1) {
        return year + format + month + format + date;
      }
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date)
      );
    },
  },
};
</script>
