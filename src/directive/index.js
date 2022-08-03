// 开发的指令

export const imgerror = {
    inserted(el,binding){
        console.log("指令所在节点挂载的时候");
        // el就是img节点，img有error事件，图片出错的时候
        el.onerror = function(){
            el.src = binding.value
        }
    },
    componentUpdated(el,binding) {
        console.log("指令所在组件更新的时候");
        el.src = el.src || binding.value
    }
}
export const aa = {
}

export const bb = {
}