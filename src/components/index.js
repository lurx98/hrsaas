// import Vue from 'vue'
// import PageTools from './PageTools'
// Vue.component('组件名',组件配置对象)
// Vue.component('PageTools',PageTools)



// Vue.use(Vuex)
// Vue.use(VuexRouter)
// Vue.use(xxx)
// Vue.use(插件名,传递给插件的数据)
// 给Vue安装某个插件
// 1. 插件有要求:一定有一个install方法
// 2. Vue.use 会调用插件的install方法。并且传入给他Vue构造函数和注入给插件的数据
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'
export default {
    install(_Vue){
        // 注册组件
        _Vue.component('PageTools',PageTools)
        _Vue.component('UploadExcel',UploadExcel)
        _Vue.component('ImageUpload',ImageUpload)
        _Vue.use(Print);
        // 注册过滤器
        // 原型挂载
    }
}
