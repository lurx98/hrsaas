export default {
  title: {
    text: "基础雷达图",
  },
  tooltip: {},
  legend: {
    data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"],
  },
  radar: {
    // shape: 'circle',
    name: {
      textStyle: {
        color: "#fff",
        backgroundColor: "#999",
        borderRadius: 3,
        padding: [3, 5],
      },
    },
    // 每个区域的最高值
    indicator: [
      { name: "工作效率", max: 100 },
      { name: "考勤", max: 100 },
      { name: "积极性", max: 100 },
      { name: "帮助同事", max: 100 },
      { name: "自主学习", max: 100 },
      { name: "正确率", max: 100 },
    ],
  },
  series: [
    {
      name: "预算 vs 开销（Budget vs spending）",
      type: "radar",
      data: [
        // {
        //   value: [10, 1, 100, 5, 100, 0],
        //   name: "张三",
        // },
        // {
        //   value: [50, 50, 50, 50, 50, 10],
        //   name: "李四",
        // },
      ],
    },
  ],
};
