export default {
    // baseURL: 'https://www.miototech.com',
    // baseURL: 'http://test.miototech.com/molto',
    // baseURL: 'https://stage.miototech.com/pixel-ai', // 预生产
    // baseURL: 'http://192.168.1.146:30002',//利高哥电脑
    baseURL: 'http://test.miototech.com/pixel-design', // 测试、演示
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'token' : window.localStorage.getItem('token')?window.localStorage.getItem('token'):'--',
    },
    getHeaders() {
        return {
            'Content-Type': 'application/json;charset=UTF-8',
            'token' : window.localStorage.getItem('token')?window.localStorage.getItem('token'):'--',
        }
    },
    data: {},
    timeout: 60000,
    withCredentials: true,
    responseType: 'json'
}