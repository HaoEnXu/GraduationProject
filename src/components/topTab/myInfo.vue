<template>
    <div class="myInfo">
        <div class="Info-card">
            <div class="info-title">
                <span>员工信息</span>
            </div>
            <div class="info-content">
                <span class="info-content-title">姓名</span>
                <input type="text" v-model="userName" @keyup.enter="changeUserInfo" >
            </div>
            <div class="info-content">
                <span class="info-content-title">手机号</span>
                <span class="info-content-detail">{{userInfo.phone}}</span>
            </div>
        </div>
        <div class="Info-card">
            <div class="info-title">
                <span>账号信息</span>
            </div>
            <div class="info-content">
                <span class="info-content-title">账号状态</span>
                <span class="info-content-detail">{{userInfo.status == 0?'正常':''}}</span>
            </div>
            <div class="info-content">
                <span class="info-content-title">创建时间</span>
                <span class="info-content-detail">{{userInfo.createTime}}</span>
            </div>
        </div>
        <div class="Info-card">
            <div class="info-title">
                <span>使用配置</span>
            </div>
            <div class="info-content config">
                <span class="info-content-title">上架事件</span>
                <el-radio class="info-content-detail" v-model="shelfRadio" label="1" @change="setshelfRadio">页面停留</el-radio>
                <el-radio class="info-content-detail" v-model="shelfRadio" label="2" @change="setshelfRadio">页面转跳</el-radio>
            </div>
            <div class="info-content config">
                <span class="info-content-title">下架事件</span>
                <el-radio class="info-content-detail " v-model="unshelfRadio" label="1" @change="setunshelfRadio">页面停留</el-radio>
                <el-radio class="info-content-detail" v-model="unshelfRadio" label="2" @change="setunshelfRadio">页面转跳</el-radio>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 当前用户
            userInfo:{},
            userName:'',
            shelfRadio:'1',
            unshelfRadio:'1'
        }
    },
    props:{

    },
    mounted(){
        this.getUserInfo()
        this.getRadio()
    },
    methods:{
        // 获取radio
        getRadio() {
            this.shelfRadio = localStorage.getItem('shelfRadio')
            if(this.shelfRadio == '' || this.shelfRadio == undefined || this.shelfRadio == null) {
                this.setshelfRadio()
            }
            this.unshelfRadio = localStorage.getItem('unshelfRadio')
            if(this.unshelfRadio == '' || this.unshelfRadio == undefined || this.unshelfRadio == null) {
                this.setunshelfRadio()
            }
        },
        // 获取当前用户信息
        getUserInfo() {
            // this.userInfo = JSON.parse(localStorage.getItem('current_user'))
            this.getUserDetails()
        },
        // 获取用户详情
        getUserDetails() {
            // 正式版
            // this.$request.get('/oms/v1/user/detail/'+this.userInfo.id).then(res => {
            this.$request.get('/oms/v1/user/detail/',this.userInfo.id).then(res => {
                this.userInfo = res.data.data
                this.userName = this.userInfo.name
                // 正式版
                // localStorage.setItem("current_user", JSON.stringify(res.data.data));
            })
        },
        // 修改用户姓名
        changeUserInfo() {
            let paramter = {
                id:this.userInfo.id,
                name:this.userName
            }
            this.$request.put('/oms/v1/user',paramter).then(res => {
                if(res.status == 200 & res.data.errorCode == 200) {
                    this.$message({
                        type:'success',
                        message:'信息修改成功',
                        duration:1000
                    })
                    // this.getUserDetails()
                    this.userInfo.name = res.data.name
                }
            })
        },
        setshelfRadio() {
            localStorage.setItem("shelfRadio", this.shelfRadio);
        },
        setunshelfRadio() {
            localStorage.setItem("unshelfRadio", this.unshelfRadio);
        }
    },
}
</script>

<style lang="scss" scoped>
.myInfo {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .Info-card {
        width: calc(100% - 128px);
        padding: 30px 40px;
        background-color: #fff;
        margin: 20px 24px 0;
        .info-title {
            width: 100%;
            height: 40px;
            border-bottom: 1px solid #f1f1f1;
        }
        .info-content {
            width: 49%;
            height: 40px;
            line-height: 40px;
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            
            .info-content-title {
                display: inline-block;
                height: 40px;
                width: 75px;
                font-size: 14px;
                color: #101010;
                line-height: 40px;
            }
            input {
                width: 440px;
                height: 38px;
                padding: 0;
                border: 1px solid rgba(220,230,230,1);
                text-indent: 1em;
                color: #909399;
                &:focus{
                }
            }
            .info-content-detail {
                display: inline-block;
                height: 40px;
                line-height: 40px;
                color: #101010;
                font-size: 14px;
                color: #909399 ;
            }
        }
        .config {
            display: inline-block;
        }
    }
}
</style>


