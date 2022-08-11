import Vue from "vue";
import VueI18n from "vue-i18n";
// 导入自己的语言包
import localeZh from "./zh";
import localeEn from "./en";
// 导入element-ui的语言包
import elLocalZh from "element-ui/lib/locale/lang/zh-CN";
import elLocalEn from "element-ui/lib/locale/lang/en";
// 使用js-cookie 实现语言包的持久化
import Cookie from "js-cookie";
Vue.use(VueI18n);

// 定义配置语言包信息
const messages = {
  en: { ...localeEn, ...elLocalEn },
  zh: { ...localeZh, ...elLocalZh },
};

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: Cookie.get("language") || "zh", // 设置地区
  messages, // 设置地区信息
});

export default i18n;
