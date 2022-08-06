import Vue from 'vue'
import Vuex from 'vuex'
// 导入getters
import getters from './getters'
// 导入模块
// import app from './modules/app'
// import settings from './modules/settings'
// import user from './modules/user'
// import user from './modules/permission'

const req = require.context('./modules', false, /\.js$/)
const keyArr = req.keys().map(item => item.split('./')[1]).map(item => item.split('.js')[0])
const valArr = req.keys().map(req)
const modules = {}
keyArr.forEach((item, index) => {
  // item 是文件名称，index是索引
  modules[item] = valArr[index].default
});
console.dir(modules);
Vue.use(Vuex)

const store = new Vuex.Store({
  // 注入getters
  getters,
  // 注册模块
  // modules: {
  //   app,
  //   settings,
  //   user,
  //   permission
  // },
  modules

})

export default store
