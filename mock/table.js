const Mock = require("mockjs");

const data = Mock.mock({
  "items|30": [
    {
      id: "@id",
      title: "@sentence(10, 20)",
      "status|1": ["published", "draft", "deleted"],
      author: "name",
      display_time: "@datetime",
      pageviews: "@integer(300, 5000)",
    },
  ],
});

module.exports = [
  {
    url: "/vue-admin-template/table/list", // 请求地址
    type: "get", // 请求方式
    response: (config) => {
      return {
        success: true,
        message: "",
        data,
      };
    },
  },
  {
    url: "/vue-admin-template/test",
    type: "post",
    response: (config) => {
      console.log(config);
      if (config.body.username === 111 && config.body.password === 222) {
        return {
          message: "OK",
          success: true,
          data: {
            token: "xxxxx",
          },
        };
      } else {
        return {
          message: "账号密码不正确",
          success: false,
          data: {},
        };
      }
    },
  },
];
