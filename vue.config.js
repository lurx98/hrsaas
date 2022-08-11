"use strict";
// 导入node.js的path
const path = require("path");
// 导入默认设置配置
const defaultSettings = require("./src/settings.js");
// 将相对路径变成绝对路径
function resolve(dir) {
  return path.join(__dirname, dir);
}
// 如果设置title就用他，否则就用 vue Admin Template
const name = defaultSettings.title || "vue Admin Template"; // page title

// 设置端口：环境变量中是否有port，package.json中是否有port， 否则就用9528
const port = process.env.port || process.env.npm_config_port || 9528; // dev port

let externals = {};
let cdn = {
  js: [],
  css: [],
};
const isProd = process.env.NODE_ENV === "production";
if (isProd) {
  externals = {
    // 键：值
    // 键是包名，值是该包在全局下得标识符
    // 比如： jQuery:'$'
    // CDN 资源优化注意点：
    // 1. 代码备份
    // 2. 找到和package.json里面包版本号一致的cdn资源。建议 去bootcdn 找
    // 3. 确认CDN资源在全局的变量名称
    // 4. 注意资源之间的引用关系(比如element-ui配置cdn就必须vue.js也要配置cdn才可以，比如vue-router一定要放在vue之后)
    vue: "Vue",
    echarts: "echarts",
    "element-ui": "ELEMENT",
    xlsx: "XLSX",
  };
  cdn = {
    js: [
      "https://cdn.jsdelivr.net/npm/vue@2",
      "https://cdn.jsdelivr.net/npm/echarts@5.3.3/dist/echarts.min.js",
      "https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.9/index.min.js",
      "https://cdn.bootcdn.net/ajax/libs/xlsx/0.18.5/xlsx.mini.min.js",
    ],
    css: ["https://unpkg.com/element-ui@2.15.9/lib/theme-chalk/index.css"],
  };
}

// vue-cli脚手架的配置： 具体详细参见  https://cli.vuejs.org/config/
module.exports = {
  // 编译后的文件依赖路劲关系，开发环境下希望是/，生产环境下希望是 ./
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // 打包输出的目录
  outputDir: "dist",
  // 静态文件存放的目录
  assetsDir: "static",
  // eslint是否在保存的时候就校验
  lintOnSave: process.env.NODE_ENV === "development",
  // 关闭打包产出map文件
  productionSourceMap: false,
  // 开发服务器配置
  devServer: {
    port: port, // 运行端口号
    open: true, // 是否自动打开浏览器
    overlay: {
      // 冲突如何处理
      warnings: false,
      errors: true,
    },
    proxy: {
      // 前端代码中   /api/box  ==> http://www.baiud.com/api/box
      "/api": {
        // target:'http://ihrm.itheima.net/',  // 要跨域访问的地址
        // target: "http://192.168.19.134:3000/", // 要跨域访问的地址
        target: "http://hr.llxx.cc/", // 要跨域访问的地址
        changeOrigin: true, // 是否换源，要为true
        // pathRewrite:{   // 路径是否重写
        //   '^/api': ''  //  /api/box  ==> http://www.baiud.com/box
        // }
      },
    },
    // 在运行之前，加载mock服务器内容
    // before: require("./mock/mock-server.js"),
  },
  // 这是webpack的配置(对象式配置)
  configureWebpack: {
    name: name, // 网页标题
    resolve: {
      // 解析路径别称
      alias: {
        "@": resolve("src"),
      },
    },
    // webpack编译排除项 (生成环境和开发环境都会排除他！ 但是目标是生产环境下排除)
    externals: externals,
  },
  // 也是webpack的配置(函数式配置)
  chainWebpack(config) {
    // 给webpack-plugin-html 插件注入数据
    config.plugin("html").tap((args) => {
      args[0].cdn = cdn; // args[0] 就是模板的环境变了，简而言之挂载到这个人上面的属性，都可以在模板中使用
      return args;
    });

    // 配置页面预加载
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial",
      },
    ]);

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch");

    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();

    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
    });
  },
};
