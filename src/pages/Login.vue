<template>
  <div class="login_page">
    <div class="login_main">
      <span class="login_title">登录</span>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <div class="login_phone">
          <span class="login_info">手机号</span>
          <el-form-item prop="Phone">
            <el-input
              v-model="ruleForm.Phone"
              class="input_phone"
              type="text"
              maxlength="11"
              autocomplete="off"
              placeholder="输入手机号"
            ></el-input>
          </el-form-item>
        </div>
        <div class="login_code">
          <span class="login_info">验证码</span>
          <div class="code_box">
            <el-form-item prop="Code">
              <el-input
                v-model="ruleForm.Code"
                type="text"
                class="input_code"
                maxlength="4"
                autocomplete="off"
                placeholder="输入验证码"
              ></el-input>
              <!-- :disabled="ruleForm.Phone == '' || !phoneTrue" -->
              <el-button  v-show="show" @click="getCode" class="send_code">发送验证码</el-button>
              <el-button v-show="!show" class="send_code">{{count}} s</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="login_par">
        <input class="login opa" @keyup.enter.native="submitForm('ruleForm')">
        <el-button :disabled=" phoneTrue && codeTrue" class="login" @click="submitForm('ruleForm')">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 检查用户账号信息
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入手机号"));
      } else {
        if (!/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(value)) {
          return callback(new Error("手机号格式错误"));
        } else {
          return callback();
        }
      }
    };
    // 检查验证码
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else {
        if (!/^\d{4}$/.test(value)) {
          return callback(new Error("验证码格式错误"));
        } else {
          return callback();
        }
      }
    };
    return {
      show: true,
      phoneTrue:false,
      codeTrue:false,
      count: "",
      timer: null,
      codeNum: "",
      ruleForm: {
        Phone: "",
        Code: ""
      },
      rules: {
        Phone: [{ validator: checkPhone, trigger: ['blur','change'] }],
        Code: [{ validator: checkCode, trigger: ['blur','change'] }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const _this = this;
          var loginInfo = {
            phone: _this.ruleForm.Phone,
            code: _this.ruleForm.Code
          };
          // 登录请求
          this.$request.post("/oms/v1/user/login", loginInfo).then(res => {
            console.log(res, "登录发起");
            // if (res.data.data.status == 1) {
            //   this.$message({
            //     type: "error",
            //     message: "用户已冻结,请联系管理员"
            //   });
            //   _this.$router.push({
            //     name: "Login"
            //   });
            //   // 清空手机号和验证码
            //   _this.ruleForm.Phone = "";
            //   _this.ruleForm.Code = "";
            // }else if(res.data.errorCode == 412) {
            //   this.$message({
            //     type:'error',
            //     message:'验证码过期，请重新获取'
            //   })
            //   _this.$router.push({
            //     name: "Login"
            //   });
            //   // 清空手机号和验证码
            //   _this.ruleForm.Phone = "";
            //   _this.ruleForm.Code = "";
            // } else if(res.data.errorCode == 413) {
            //   this.$message({
            //     type:'error',
            //     message:'验证码错误，请确认后重新输入'
            //   })
            //   _this.$router.push({
            //     name: "Login"
            //   });
            //   // 清空手机号和验证码
            //   _this.ruleForm.Phone = "";
            //   _this.ruleForm.Code = "";
            // } else if(res.data.data.status == 3) {
            //   this.$message({
            //     type: "error",
            //     message: "未被授权登录,请联系管理员"
            //   });
            //   _this.$router.push({
            //     name: "Login"
            //   });
            //   // 清空手机号和验证码
            //   _this.ruleForm.Phone = "";
            //   _this.ruleForm.Code = "";
            // }
            // else if (res.data.errorCode == 200) {
            //   this.$message({
            //     type: "success",
            //     message: "登陆成功"
            //   });
            //   // // 注册token
            //   localStorage.setItem("token", res.data.data.token);
            //   localStorage.setItem("current_user", JSON.stringify(res.data.data));
            //   // 页面跳转
            //   this.$router.push({
            //     name: "person"
            //   });
            // }
            this.$router.push({
                name: "person"
              });
          });
        } else {
          this.$message({
            type:'warning',
            message:'登录失败'
          })
          return false;
        }
      });
    },
    // 发送验证码
    getCode() {
      // 触发定时器
      const TIME_COUNT = 60;
      const _this = this;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
      console.log(this.ruleForm.Phone)
      // 发起请求
      _this.$request
        // .post("/oms/v1/verifycode/" + "login/" + _this.ruleForm.Phone)
        .post("/oms/v1/verifycode/" + "login/" , _this.ruleForm.Phone)
        .then(res => {
          console.log(res, "验证码请求");
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "验证码发送成功，请在60s内输入"
            });
          }
        });
    },
    
  }
};
</script>

<style lang="scss" scoped>
button {
  outline: none;
  margin: 0;
  padding: 0;
  border: none;
  cursor: pointer;
}
.login_par {
  position: relative;
  width: 300px;
  height: 50px;
  margin: 35px auto 0;
  line-height: 50px;
  border-radius: 25px;
  .login {
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    border-radius: 25px;  
    background:rgba(20,226,147,1);
    z-index: 10;
  }
  .opa {
    opacity: 0;
    position: absolute;
    z-index: 5;
  }

}
.login_page {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: rgba(45,45,45, 0.5);
}
.login_main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  height: 429px;
  border-radius: 2px;
  background-color: #fff;
}

.login_title {
  display: block;
  width: 400px;
  height: 40px;
  line-height: 40px;
  margin: 20px auto;
  text-align: center;
  font-size: 24px;
}

.login_phone, .login_code {
  width: 85%;
  height: 100px;
  margin: 0 auto;
}

/**
 * chris added
 */
.login_code {
  .code_box {
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .send_code {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        font-size:14px;
        font-weight:300;
        color:rgba(45,45,45,1);
      }
  }
}

.el-form-item {
  width: 100%;
}

.login_info {
  display: block;
  font-size: 14px;
  color: #7F7F7F;
  margin-bottom: 12px;
}

.login_main input {
  margin-top: 10px;
  width: 100%;
  border: 0;
  outline: none;
  border-radius: 0;
  border-bottom: 1px solid #ccc;
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
}
.login_btn {
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  width: 290px;
  height: 45px;
  color: #fff;
  font-size: 18px;
  background:rgba(20,226,147,1);
  border-radius:20px;
}
</style>
