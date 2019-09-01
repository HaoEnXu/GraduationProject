import Vue from 'vue'
const host = 'https://test.miototech.com/pixel-design'
const headers = {
  token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjMwZWY3ODQ0OTI1NzQ0NjA5MTFmNjczN2YxNWIwODM2In0.eyJqdGkiOiJUZzRzZnM5eFV0VGhzdmRPZ0I3aW9RIiwiaWF0IjoxNTU0ODc3NjIyLCJpc3MiOiJwaXhlbC1kZXNpZ24iLCJhdWQiOiJwaXhlbC1kZXNpZ24iLCJleHAiOjE1NTU0ODI0MjIsIm5iZiI6MTU1NDg3NzUwMiwic3ViIjoidXNlci1qd3QtdG9rZW4iLCJ1c2VySWQiOiIzMTRhMDgzMzA0MDc0MzAyOGMxYTQ2YWU2YzFiNGIzZSJ9.ha--yOv07MqbDM9IhplSpO7DNEHCKUIUbUSoZ015f1O4kkYmBV0suaalusrC205njuHTP7GP1oNwqYLFOgfGBJjXbIkblvQ27jtKsG0MKK1L6D7ZxoghGvw_7pNVL7PLbhue_W8x2CL3IyFOJYcmRGMU0fTkklepE9XzVXXK5AFa3QOBu0oMy9zcJtCY75PLZLIGKdfATRWqolckSBh5Hu4Ipx63CcCM1PYSYN6X58EvizzUCf_lTZVpWpQQFh1RS18knz5I6Um9pVQ33qfjRGlaoOW2USHe6bJA8Xh4E3l7w5dw0B_c9jj4PYCAhEg0kJ6QohUNrNCeJ0dTTRFuwg',
  contentType: 'application/json;charset=UTF-8'
}

const post = (url, data=null, cb) => {
  Vue.axios.post(url, data, {
    headers: {
      'token': headers.token,
      'Content-Type': headers.contentType
    }
  }).then(response => {
    if (response.status === 200 && (response.data.errorCode === 200 || response.data.errorCode === 202))  {
      cb && cb.success && cb.success(response.data)
    } else {
      cb && cb.fail && cb.fail(response)
    }
  }).catch(info => {
    cb && cb.fail && cb.fail(info)
  })
}

/**
 * 获取oss policy
 * @param {参数}} payload 
 * @param {*} cb 
 */
function getOSSPolicy (payload, cb) {
  payload.type = 'pixel'
  post(host + '/material/v1/policy', payload, cb)
}

/**
 * 上传至oss
 * @param {oss地址} url 
 * @param {*} payload 
 * @param {*} cb 
 */
function uploadToOSS(url, payload, cb) {
  post(url, payload, cb)
}

export default {
  getOSSPolicy,
  uploadToOSS
}