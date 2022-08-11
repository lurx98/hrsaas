import Layout from "@/layout";
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: "/employees", // 路径
  name: "employees", // 给路由规则加一个name
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [
    {
      name: "employees",
      path: "", // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () => import("@/views/employees"),
      meta: {
        // 路由元信息
        title: "员工管理",
        icon: "people",
      },
    },
    {
      path: "detail/:id", // query传参 动态路由传参
      component: () => import("@/views/employees/detail"),
      hidden: true, // 不在左侧菜单显示
      meta: {
        title: "员工详情", // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
      },
    },
    {
      path: "print/:id", // 二级默认路由
      component: () => import("@/views/employees/print"), // 按需加载
      hidden: true,
      meta: {
        title: "打印", // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
        icon: "people",
      },
    },
  ],
};
