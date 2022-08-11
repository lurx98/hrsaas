import Layout from "@/layout";
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: "/socials", // 路径
  name: "social_securitys", // 给路由规则加一个name
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [
    {
      name: "social_securitys",
      path: "", // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () => import("@/views/socials"),
      meta: {
        // 路由元信息
        title: "社保管理",
        icon: "table",
      },
    },
  ],
};
