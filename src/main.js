import Vue from 'vue'
// 基础样式包
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// 导入ElementUI
import ElementUI from 'element-ui'
// 导入ElementUI的样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入ElementUI的语言包(英文)
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// 导入全局样式
import '@/styles/index.scss' // global css
// 导入根组件
import App from './App'
// 导入仓库
import store from './store'
// 导入路由
import router from './router'
// 导入图标
import '@/icons' // icon
// 导入导航权限守卫
import '@/permission' // permission control
import '@/utils' // permission control
/* 
Vue.directive('指令名',{
  inserted(el,binding){
    el是指令所在的节点
    binding 是指令的包含信息
  }
})
<标签 v-指令名="变量或表达式" />

 */
// 自定义指令：自己开发的用于操作DOM的指令
// v-html/text/bind/on/if/for/...
// vue指令的作用：操作DOM
// Vue.directive('imgerror',{
//   inserted(el,binding){
//     // el就是img节点，img有error事件，图片出错的时候
//     el.onerror = function(){
//       console.log("图片出错了");
//       el.src = binding.value
//     }
//   }
// })
// 读取某个模块里面所有暴露信息
import * as directive from '@/directive'
// console.log(directive);  // 对象
// // -------------------------
// let obj = { name:222,age:20 }
// // Object.keys(对象)  获取对象所有的键，并且组合成数组
// console.log(Object.keys(obj));
// Object.keys(obj).forEach(key=>{
//   console.log('属性名是:'+key,'属性值是:'+ obj[key] );
// })
// --------批量注册自定义指令-----------------
Object.keys(directive).forEach(key=>{
  // Vue.directive(指令名,指令的配置对象)
  // 指令名就是 key   指令的配置对象就是  directive[key]
  // console.log(key, directive[key]);  
  Vue.directive(key,directive[key])
})


// 给element-ui设置英文语言包
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// 控制台版本的提示
Vue.config.productionTip = false
// 实例化vue
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
