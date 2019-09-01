import Request from './request'

/**
 * 获取图片的内容
 * @param {*} file 
 * @param {*} cb 
 */
var getImageInfo = (file, cb) => {
  if (file === null || file.length === 0) {
    throw "参数类型错误，请传入文件"
  }

  let reader = new FileReader(file)
  console.log(reader,'reader')
  reader.onload = e => {
    console.log(e,'这是e')
    let data = e.target.result
    let img = new Image()
    img.src = data;
    img.onload = () => {
      cb && cb({
        base64: data,
        width: img.width,
        height: img.height,
        blob: dataURItoBlob(data)
      })
    }
  }
  reader.readAsDataURL(file)
}

/**
 * 辅助函数：生成blob
 */
var dataURItoBlob = (dataURI) => {
  var byteString = atob(dataURI.split(",")[1])
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: mimeString })
}

/**
 * 创建表单
 * @param {*} policy 
 * @param {*} blob 
 */
var createOSSFormData = (policy, blob) => {
  let formData = new FormData()
  formData.append("key", policy.uuid + "." + policy.ext)
  formData.append("policy", policy.policy)
  formData.append("OSSAccessKeyId", policy.accessId)
  formData.append("signature", policy.signature)
  formData.append("callback", policy.callbackBase64Str)
  formData.append("success_action_status", 200)
  formData.append("file", blob)
  return formData
}

/**
 * 上传封装
 * @param {*} from 
 * @param {*} file 
 * @param {*} cb 
 */
var uploadWrapper = (file, cb) => {
  var fileSpliter = file.name.split(".")
  new Promise((resolve, reject) => {
    getImageInfo(file, data => {resolve(data)})
  }).then(fileData => {
      let payload = {
        ext: fileSpliter[fileSpliter.length - 1],
        fileName: fileSpliter[0],
        size: file.size,
        height: fileData.width,
        width: fileData.height
      }
      Request.getOSSPolicy(payload, {
        success: res => {
          console.log(res)
          let formData = createOSSFormData(res.data, fileData.blob)
          res.data.ext = payload.ext
          Request.uploadToOSS(res.data.host, formData, {
            success: () => {
              cb &&
                cb.success &&
                cb.success(res.data.host + "/" + formData.get("key"))
            },
            fail: info => {
              cb && cb.fail && cb.fail(info)
            }
          })
        },
        fail: info => {
          cb && cb.fail && cb.fail(info)
        }
      })
    })
    .catch(info => {
      cb && cb.fail && cb.fail(info)
    })
}

export default {
  getImageInfo,
  dataURItoBlob,
  uploadWrapper
}