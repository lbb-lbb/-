/*
封装一些公用的方法
*/
export const setSessionStorage= (name,data) =>{           //设置sessionsStorage数据
    if(!data) return
    window.sessionStorage.setItem(name,JSON.stringify(data))

}

export const getSessionStorage = data =>{               //获取sessionsStorage数据
    if(!data) return
    return JSON.parse(window.sessionStorage.getItem(data))
}

export const setStorage = (name,data) =>{           //设置localStorage数据
    if(!data) return
    window.localStorage.setItem(name,JSON.stringify(data))

}

export const getStorage = data =>{               //获取localStorage数据
    if(!data) return
    return JSON.parse(window.localStorage.getItem(data))
}

//节流函数
export  function throttle(fn, delay) {
    let flag = true,
        timer = null
    return function(...args) {
        if(!flag) return
        flag = false
        clearTimeout(timer)
        timer = setTimeout(() =>{
            fn.apply(this,args)
            flag = true
        },delay)
    }
}
//防抖函数
export function debounce(fn,delay) {
    let timer=null
    return function (...args) {
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
            fn.apply(this,...args)
        },delay)
    }
}

