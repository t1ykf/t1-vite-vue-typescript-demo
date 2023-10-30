import axios from 'axios'
import { ElMessage } from 'element-plus'
import { MD5 } from 'crypto-js'
import { v4 as uuidv4 } from 'uuid'

axios.defaults.timeout = 60000 // 设置超时时间
axios.defaults.baseURL = import.meta.env.VITE_APP_T1Y_API // 设置请求地址
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8' // 设置传参方式

// 请求拦截器
axios.interceptors.request.use(
    (config) => {
        let index = config?.url?.indexOf('?page=')
        let url = config?.url
        if (index !== -1 && url !== undefined) {
            url = url.substring(0, index)
        }
        // 获取当前时间戳，精确到秒
        const timestamp = Math.floor(Date.now() / 1000)
        // 生成32位随机码
        const nonceStr = MD5(uuidv4()).toString()
        // 设置加密请求头
        config.headers['X-T1Y-Application-ID'] = import.meta.env.VITE_APP_APP_ID
        config.headers['X-T1Y-Api-Key'] = import.meta.env.VITE_APP_API_KEY
        config.headers['X-T1Y-Safe-NonceStr'] = nonceStr
        config.headers['X-T1Y-Safe-Timestamp'] = timestamp
        config.headers['X-T1Y-Safe-Sign'] = MD5(
            url +
                import.meta.env.VITE_APP_APP_ID +
                import.meta.env.VITE_APP_API_KEY +
                nonceStr +
                timestamp +
                import.meta.env.VITE_APP_SECRET_KEY,
        ).toString()
        console.log(
            url +
                import.meta.env.VITE_APP_APP_ID +
                import.meta.env.VITE_APP_API_KEY +
                nonceStr +
                timestamp +
                import.meta.env.VITE_APP_SECRET_KEY,
        )
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

// 响应拦截器
axios.interceptors.response.use(
    // TODO: 客户端防篡改验证（可选），与发送一样获取请求头加密格式进行校验
    (response) => {
        // 成功
        return response.data
    },
    (error) => {
        const { response } = error
        if (response) {
            // 请求已发出，但是不在2xx的范围内（失败）
            ElMessage.warning(response.data.message)
        } else {
            ElMessage.error('网络连接异常，请稍后再试！')
        }
        return Promise.reject(error)
    },
)

// 封装请求并导出
export function request(url = '', params = {}, type = 'post') {
    // 设置 url params type 的默认值
    return new Promise((resolve, reject) => {
        const config = {
            url,
            method: type,
            data: type === 'get' ? undefined : params,
            params: type === 'get' ? params : undefined,
        }

        axios(config)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
