import axios from 'axios'
import { Message, Loading } from 'element-ui';
import router from './router'


let loading;
//加载动画开始
function startLoading() {
    loading = Loading.service({
       lock: true,
       text: '加载中...',
       background: 'rgba(0, 0, 0, 0.7)'
    })
}

//加载动画结束
function endLoading() {
    loading.close()
}


//请求拦截
axios.interceptors.request.use( config => {
    //调用加载动画
    startLoading()
    //设置统一请求头
    if (localStorage.eleToken) {
      config.headers.Authorization = localStorage.eleToken;
    }
    return config
}, error => {
    return Promise.reject(error)
})


//响应拦截
axios.interceptors.response.use( response => {
    //结束加载动画 
    endLoading()
    return response
}, error => {
    //错误提醒
    endLoading()
    Message.error(error.response.data)
    //获取错误码
    const { status } = error.response
    if (status === 401  ) {
        Message.error('token失效，请重新登录！')
        //清除token
        localStorage.removeItem('eleToken')
        //跳转登录页面
        router.push('/login')
    }
    return Promise.reject(error)
})



export default axios