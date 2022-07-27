/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}



/**
 * 递归整理出树形结构数据
 * @param {Array} list  要处理的数据
 * @param {sting | number} rootValue  顶级的id值
 * @returns  {Array}   返回的结果
 */
export function tranListToTreeData  (list,rootValue){
  const arr = []
  // 遍历数组每个元素，问是否有人pid为 rootValue(即0)
  list.forEach(item=>{
    if(item.pid === rootValue){
      // 找到之后，再问 item下面有没有人为子节点呢
      const children =  tranListToTreeData(list,item.id)
      if(children.length) item.children = children
      arr.push(item)
    }
  })
  return arr   // 最终要返回一个数组，只不过是树形结构的
}
const list = [{id:4,pid:2},{id:6,pid:3},{id:5,pid:2},{id:3,pid:1},{id:2,pid:1},{id:1,pid:0}]
console.log(tranListToTreeData(list,0));
// const list = [{id:4,pid:2},{id:6,pid:3},{id:5,pid:2},{id:3,pid:1},{id:2,pid:1},{id:1,pid:0}]
/*
tranListToTreeData(list,0)
// [{id:1,pid:0,children:[...]}]
children = tranListToTreeData(list,1)  得到 [{id:3,pid:1,children:children1},{id:2,pid:1,children:children2}]
//                                          tranListToTreeData(list,3)     tranListToTreeData(list,2)
                                            children1 = [{id:6,pid:3}]     children2 = [{id:4,pid:2},{id:5,pid:2}]

*/