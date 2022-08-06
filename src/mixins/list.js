// 抽离相同的配置项
// data 里面的变量冲突原则
// ==> 如果是基本数据类型 则使用的是组件的
// ==> 如果是引用数据类型，则会到内部去继续比较，还是有优先组件的
// methods 里面方法冲突原则
// ===> 优先采用组件的
// 生命周期的冲突原则是  都会执行！（合并）
export default {
  data() {
    return {
      list: [],
      queryData: {
        page: 1,
      },
      total: 0,
    };
  },
  created() {
    // console.log("1111111111111111");
    this.initData();
  },
  methods: {
    initData() {
      console.log("这是混入里面的initData");
    },
    handleCurrentChange(val) {
      // val是最新的页码
      console.log(`当前页: ${val}`);
      this.queryData.page = val;
      this.initData();
    },
  },
};
