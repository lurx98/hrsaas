// 开发的指令

export const imgerror = {
    inserted(el,binding){
        // el就是img节点，img有error事件，图片出错的时候
        el.onerror = function(){
            console.log("图片出错了");
            el.src = binding.value
        }
    }
}
export const aa = {
}

export const bb = {
}