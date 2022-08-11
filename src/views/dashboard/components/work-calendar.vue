<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select size="small" @change="changeDate()" v-model="currentYear" style="width:120px;" placeholder="请输入年份">
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select size="small" @change="changeDate()" v-model="currentMonth" style="width:120px;" placeholder="请输入月份">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-row>
    <!-- 日历组件 -->
    <el-calendar v-model="currentDate">
      <template slot="dateCell" slot-scope="{date, data}">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>
<script>
export default {
  name: 'WorkCalendar',
  data() {
    return {
      yearList: [],   // 年份列表
      currentYear: '',  // 当前的年份 ===> 默认是 根据props里面的startDate计算的；年份下拉切换了就是下拉的值
      currentMonth: '',  // 当前的月份===> 默认是 根据props里面的startDate计算的；月分下拉切换了就是下拉的值
      currentDate: ''  // 当前的日期==> 根据 currentYear/currentMonth/ 决定年月的 ； 日 默认是根据startDate计算的； 下拉就固定为1
    }
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  filters: {
    getDay(val) {
      return val.split('-')[2]
    }
  },
  created() {
    this.currentYear = this.startDate.getFullYear()
    this.currentMonth = this.startDate.getMonth() + 1
    this.yearList = Array.from(Array(11), (item, index) => {
      return this.currentYear + index - 5
    })

    this.changeDate(this.startDate.getDate())   // 传入了日期的
  },
  methods: {
    changeDate(date) {  // select 变化的时候没有传入日期
      // 日期只要有变化，就重新生成当前事件
      let y = this.currentYear
      let m = this.currentMonth
      let d = date || 1
      this.currentDate = new Date(y + '-' + m + '-' + d)
    },
    isWeek(val) {
      // 时间对象.getDate()  获取日期
      // 时间对象.getDay()   获取星期几   0-6   星期六 6  星期天 0
      return [6, 0].includes(val.getDay())
    }
  }
}
</script>
<style lang='scss' scoped>
::v-deep .el-calendar-day {
  height: auto;
}

::v-deep .el-calendar-table__row td,
::v-deep .el-calendar-table tr td:first-child,
::v-deep .el-calendar-table__row td.prev {
  border: none;
}

.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}

.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}

.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}

::v-deep .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}

::v-deep .el-calendar__header {
  display: none;
}
</style>