import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)
// 读取svg目录下的所有svg图标，使用webpack进行读取变异
const req = require.context('./svg', false, /\.svg$/)
// const requireAll = requireContext => requireContext.keys().map(requireContext)
const requireAll = function(requireContext) {
  return requireContext.keys().map(requireContext)
}
requireAll(req)
