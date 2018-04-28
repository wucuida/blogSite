// 筛选出list中每个元素的某个属性，以数组形式返回
let pick = (list, prop) => {
  let result = []
  if(Object.prototype.toString.call(prop) == "[object Array]"){
    for(let p of prop) {
      for(let i of list){
        if(i[p] !== undefined && i[p] != null){
          result.push(i[p])
        }
      }
    }
  }else{
    for(let i of list){
      if(i[prop] !== undefined && i[prop] != null){
        result.push(i[prop])
      }
    }
  }
  return result
}
export {
  pick
}
