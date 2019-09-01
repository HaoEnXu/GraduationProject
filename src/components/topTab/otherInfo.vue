<template>
    <div class="otherInfo">
        <div class="userList">
            <div class="topInput">
                <input type="text" v-model="keywords" @keyup.enter="searchUser" placeholder="搜索姓名/手机号">
                <span class="Icon" @click="searchUser" :style="{backgroundImage:'url('+searchIcon+')'}"></span>
            </div>
            <div class="tableList">
                <el-table
                :data="userList"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                    <el-table-column
                    prop="sstatus"
                    label="账号状态"
                    sortable
                    :cell-style="cellStyle"
                    >
                    <template slot-scope="scope">
                        <el-button 
                        type="text" 
                        size="small" 
                        class="statusBtn"
                        v-if="scope.row.sstatus == '未授权'||scope.row.sstatus == '冻结'"
                        @click="openHandlemask(scope.row)"
                        :class="scope.row.sstatus == '未授权'||scope.row.sstatus == '冻结'?'abnormal':''"  
                        >{{scope.row.sstatus}}</el-button>
                        <span v-else>{{scope.row.sstatus}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="员工姓名"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    prop="phone"
                    label="绑定手机号"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="权限范围"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="创建时间"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    prop="lastLoginTime"
                    label="上一次登陆时间"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作"
                    >
                    <template slot-scope="scope">
                        <el-button @click="openUserManager(scope.row)" type="text" size="small">管理</el-button>
                    </template>
                    </el-table-column>
                </el-table> 
            </div>
        </div>
        <div class="page">
            <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-size="pageSize">
            </el-pagination>
        </div>
        <!-- 修改状态遮罩层 -->
        <el-dialog
            class="changeStatus"
            :visible.sync="statusDialog"
            >
            <div class="statuscontent">
                <span class="statustitle" v-show="userInfo.status == 3">授权登录</span>
                <span class="statusinfo" v-show="userInfo.status == 3">请确认是否授权给{{userInfo.name}}用户?</span>
                <span class="statustitle" v-show="userInfo.status == 1">解冻申请</span>
                <span class="statusinfo" v-show="userInfo.status == 1">请确认是否解除{{userInfo.name}}用户的冻结状态?</span>
                <div class="statusBtn">
                    <button class="cancelBtn" @click="statusDialog = false">取消</button>
                    <button class="operaBtn" v-show="userInfo.status == 3" @click="rizeUser">授权</button>
                    <button class="operaBtn" v-show="userInfo.status == 1" @click="recoverUser">解除</button>
                </div>
            </div>
        </el-dialog>
        <!-- 展示详情遮罩层 -->
        <el-dialog
            class="userManage"
            :visible.sync="detatilDialog"
            >
            <div class="detailcontent">
                <span class="detailtitle">管理用户</span>
                <div class="usermessage">
                    <ul>
                        <li>
                            <span class="info_title">姓名</span>
                            <span class="info_content">{{userInfo.name}}</span>
                        </li>
                        <li>
                            <span class="info_title">员工号</span>
                            <span class="info_content">{{userInfo.miotoId}}</span>
                        </li>
                        <li>
                            <span class="info_title">手机号</span>
                            <span class="info_content">{{userInfo.phone}}</span>
                        </li>
                        <li>
                            <span class="info_title">权限范围</span>
                            <span class="info_content">未设权限</span>
                        </li>
                        <li>
                            <span class="info_title">创建时间</span>
                            <span class="info_content">{{userInfo.createTime}}</span>
                        </li>
                        <li>
                            <span class="info_title">最近登陆时间</span>
                            <span class="info_content">{{userInfo.lastLoginTime}}</span>
                        </li>
                        <li>
                            <span class="info_title">账号状态</span>
                            <span class="info_content">{{userInfo.sstatus}}</span>
                        </li>
                    </ul>
                </div>
                <div class="detailBtn">
                    <button class="logoffBtn" v-show="userInfo.status == 0 || userInfo.status == 1 || userInfo.status == 3" @click="deleteUser">注销</button>
                    <button class="freezeBtn" v-show="userInfo.status == 0" @click="freezeUser">冻结</button>
                    <button class="unfreezeBtn" v-show="userInfo.status == 1" @click="recoverUser">解除冻结</button>
                    <button class="nologBtn" v-show="userInfo.status == 0" @click="disablelogUser">禁止登录</button>
                    <button class="rizeBtn" v-show="userInfo.status == 3" @click="rizeUser">授权登录</button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchIcon:'http://molto-pixel-web-static.oss-cn-beijing.aliyuncs.com/images/%E6%90%9C%E7%B4%A2.svg',
            userList:[],
            total:0,
            pageSize:10,
            pageNum:1,
            userInfo:{},
            firstUser:{},
            keywords:'',
            // 遮罩层
            statusDialog:false,
            detatilDialog:false
        }
    },
    mounted() {
        // this.getcurrentuser()
        // this.getUserDetails()
        this.getUserList()
    },
    methods:{
        // 获取当前用户信息
        getcurrentuser() {
            this.firstUser = JSON.parse(localStorage.getItem('current_user'))
        },
        // 获取用户详情
        getUserDetails() {
            this.$request.get('/oms/v1/user/detail/'+this.firstUser.id).then(res => {
                this.firstUser = res.data.data
                this.firstUser.sex = '未设权限'
                let createtime = new Date(this.firstUser.createTime).toJSON();
                this.firstUser.createTime = new Date(+new Date(createtime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                if(this.firstUser.lastLoginTime  != null) {
                    let logintime = new Date(this.firstUser.lastLoginTime).toJSON();
                    this.firstUser.lastLoginTime = new Date(+new Date(logintime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                }else {
                    this.firstUser.lastLoginTime = '未获取到相关数据'
                }
                this.$set(this.firstUser,'sstatus',this.firstUser.status==0?'正常': this.firstUser.status==1?'冻结': this.firstUser.status==3?'未授权':'已注销')
            })
        },
        // 获取用户列表
        getUserList(){
            var para = {
                pageSize:10,
                pageNum:this.pageNum
            }
            this.$request.put('/oms/v1/user/list',para).then(res => {
                if(res.status == 200) {
                    res.data.data.data.forEach(element => {
                        element.sstatus = element.status==0?'正常': element.status==1?'冻结': element.status==3?'未授权':'已注销'
                    });
                    let newArr = res.data.data.data
                    newArr.forEach((ele,index) => {
                        if(ele.id == this.firstUser.id) {
                            newArr.splice(index,1)
                        }
                    })
                    newArr.forEach((ele,index) => {
                        if(ele.status == 3) {
                            ele.sex = '未设权限'
                        } else {
                            ele.sex = '未设权限'
                        }
                        let createtime = new Date(ele.createTime).toJSON();
                        ele.createTime = new Date(+new Date(createtime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                        if(ele.lastLoginTime  != null) {
                            let logintime = new Date(ele.lastLoginTime).toJSON();
                            ele.lastLoginTime = new Date(+new Date(logintime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                        } else {
                            ele.lastLoginTime = '未获取到相关数据'
                        }
                    })
                    if(this.pageNum == 1) {
                        // this.userList.push(this.firstUser)
                        this.userList = this.userList.concat(newArr)
                        this.total = res.data.data.pageInfo.total
                    } else {
                        this.userList = newArr
                    }
                }
            })
        },
        handleSizeChange(size) {
            this.pageSize = size
        },
        handleCurrentChange(pageNum) {
            this.userList = []
            this.pageNum = pageNum
            this.getUserList()
        },
        cellStyle({row, column, rowIndex, columnIndex}) {
            if(row.sstatus == '未授权' && columnIndex == 0){ //指定坐标
                return 'color:#14E293'
            }else if(row.sstatus == '冻结' && columnIndex == 0){
                return 'color:#14E293'
            }
        },
        // 开启修改状态遮罩层
        openHandlemask(value) {
            this.userInfo = value;
            this.statusDialog = true
        },
        // 开启管理用户遮罩层
        openUserManager (value) {
            this.userInfo = value;
            this.detatilDialog = true
        },
        // 授权账户
        rizeUser() {
            //  this.$request.patch('/oms/v1/user/'+'authorize/'+this.userInfo.id).then(res => {
             this.$request.patch('/oms/v1/user/'+'authorize/',this.userInfo.id).then(res => {
                if(this.statusDialog) {
                    this.statusDialog = false
                } else if(this.detatilDialog){
                    this.detatilDialog = false
                }
                this.userList.forEach(ele => {
                    if(ele.id == res.data.id) {
                        ele.status=0
                        ele.sstatus = '正常'
                    }
                })
                // this.getUserList()
            })
        },
        // 冻结账户
        freezeUser() {
            // this.$request.patch('/oms/v1/user/'+'freeze/'+this.userInfo.id).then(res => {
            this.$request.patch('/oms/v1/user/'+'freeze/',this.userInfo.id).then(res => {
                if(this.statusDialog) {
                    this.statusDialog = false
                } else if(this.detatilDialog){
                    this.detatilDialog = false
                }
                this.userList.forEach(ele => {
                    if(ele.id == res.data.id) {
                        ele.status=1
                        ele.sstatus = '冻结'
                    }
                })
                // this.getUserList()
            })
        },
        // 解冻
        recoverUser() {
            // this.$request.patch('/oms/v1/user/'+'recover/'+this.userInfo.id).then(res => {
            this.$request.patch('/oms/v1/user/'+'recover/',this.userInfo.id).then(res => {
                if(this.statusDialog) {
                    this.statusDialog = false
                } else if(this.detatilDialog){
                    this.detatilDialog = false
                }
                 this.userList.forEach(ele => {
                    if(ele.id == res.data.id) {
                        ele.status=0
                        ele.sstatus = '正常'
                    }
                })
                // this.getUserList()
            })
        },
        // 注销账号
        deleteUser() {
            this.$request.patch('/oms/v1/user/'+'delete/'+this.userInfo.id).then(res => {
                if(this.statusDialog) {
                    this.statusDialog = false
                } else if(this.detatilDialog){
                    this.detatilDialog = false
                }
                this.getUserList()
            })
        },
        // 禁止登录
        disablelogUser() {
            // this.$request.patch('/oms/v1/user/'+'disable/'+this.userInfo.id).then(res => {
            this.$request.patch('/oms/v1/user/'+'disable/',this.userInfo.id).then(res => {
               if(this.statusDialog) {
                    this.statusDialog = false
                } else if(this.detatilDialog){
                    this.detatilDialog = false
                }
                 this.userList.forEach(ele => {
                    if(ele.id == res.data.id) {
                        ele.status=3
                        ele.sstatus = '未授权'
                    }
                })
                // this.getUserList()
            })
        },
        // 搜索用户
        searchUser() {
            let paramter = {
                keywords:this.keywords
            }
            if(this.keywords=='') {
                this.$message({
                    type:'info',
                    message:'搜索信息为空'
                })
                // this.getUserList()
            } else {
                this.$request.put('/oms/v1/user/query',paramter).then(res => {
                    if(res.data.data.length == 0) {
                        this.$message({
                            type:"info",
                            message:"未找到符合信息"
                        }) 
                        res.data.data.forEach(element => {
                            element.sstatus = element.status==0?'正常': element.status==1?'冻结': element.status==3?'未授权':'已注销'
                        });
                        this.total = Math.ceil(res.data.data.length/10) 
                        this.userList = res.data.data
                    }else if(res.status == 200 && res.data.data.length != 0) {
                        res.data.data.forEach(element => {
                            element.sstatus = element.status==0?'正常': element.status==1?'冻结': element.status==3?'未授权':'已注销'
                        });
                        this.total = Math.ceil(res.data.data.length/10) 
                        this.userList = res.data.data
                    }
                })
            }
            
        }
    }
}
</script>

<style scoped>
    .otherInfo >>> .el-button--text {
        color: #606266;
    }
    .abnormal {
        color:#14E293!important
    }
    /* 修改状态遮罩层样式 */
    .otherInfo >>> .changeStatus.el-dialog__wrapper .el-dialog {
        width: 360px!important;
        height: 160px!important;
        top: 50%!important;
        margin-top: -80px!important;
        padding: 0!important;
        border-radius: 4px!important;
    }
    .otherInfo >>> .changeStatus.el-dialog__wrapper .el-dialog .el-dialog__header {
        display: none;
    }
    .otherInfo >>> .changeStatus.el-dialog__wrapper .el-dialog .el-dialog__body {
        width: 360px!important;
        height: 160px!important;
        margin: 0;
        padding: 0;
        border-radius: 4px!important;
    }
    .otherInfo >>> .userManage.el-dialog__wrapper .el-dialog {
        width: 375px!important;
        height: 404px!important;
        top: 50%!important;
        margin-top: -202px!important;
        padding: 0!important;
        border-radius: 4px!important;
    }
    .otherInfo >>> .userManage.el-dialog__wrapper .el-dialog .el-dialog__header {
        display: none;
    }
    .otherInfo >>> .userManage.el-dialog__wrapper .el-dialog .el-dialog__body {
        width: 375px!important;
        height: 404px!important;
        margin: 0;
        padding: 0;
        border-radius: 4px!important;
    }
    .otherInfo >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #14E293;
        color: #fff;
    }
    .otherInfo >>> .el-pagination.is-background .el-pager li:not(.disabled).active:hover {
        background-color: #14E293;
        color: #fff;
        cursor: pointer;
    }
    .otherInfo >>> .el-pagination.is-background .el-pager li:not(.disabled):hover {
        color: #14E293
    }
</style>


<style lang="scss" scoped>
    .otherInfo {
        width: calc(100% - 120px);
        height: calc(100% - 30px);
        background-color: #fff;
        padding: 30px 60px 0 ;
        position: relative;
        .userList {
            width: 100%;
            height: 100%;
            .topInput {
                width: 260px;
                height: 35px;
                position: relative;
                background-color: #c2c2c2;
                margin-bottom: 20px;
                input {
                    margin: 0;
                    padding: 0;
                    border: 0;
                    width: 260px;
                    height: 35px;
                    text-indent: 1em;
                    background-color: #f1f1f1;
                    &:focus{
                        outline: none
                    }
                }
                .Icon {
                    position: absolute;
                    width: 18px;
                    height: 18px;
                    line-height: 18px;
                    right: 10px;
                    top: 8px;
                    z-index: 10;
                    background-size: cover;
                    cursor: pointer;
                }
            }
            .tableList {
                width: 100%;
                height: calc(100% - 115px);
                overflow: auto;
            }
        }
        .page {
            width: 100%;
            height: 45px;
            padding-top: 15px;
            position: absolute;
            left: 0;
            text-align: center;
            background-color: #fff;
            bottom: 0;
        }
        .statuscontent {
            width: 100%;
            height: 100%;
            .statustitle {
                display: inline-block;
                width: 300px;
                height: 18px;
                line-height: 18px;
                font-size: 18px;
                color: #303133;
                margin:30px 30px 10px 30px;
                text-align-last: center;
            }
            .statusinfo {
                display: inline-block;
                width: 300px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                margin: 0 30px;
                font-size: 14px;
            }
            .statusBtn {
                width: 100%;
                height: calc(100% - 82px);
                display: flex;
                justify-content: center;
                button {
                    margin: 0;
                    padding: 0;
                    outline: none;    //消除默认点击蓝色边框效果
                    width: 77px;
                    height: 28px;
                    color: #5A5E66;
                    background-color: #fff;
                    cursor: pointer;
                    line-height: 28px;
                    text-align: center;
                    font-size: 12px;
                    border-radius: 14px;
                    border: 1px solid rgba(220,223,230,1);
                    margin-right: 10px;
                    margin-top: 20px;
                }
                .operaBtn {
                    background-color: #14E293;
                    color: #fff;
                }

            }
        }
        .detailcontent {
            width: 100%;
            height: 100%;
            .detailtitle {
                display: inline-block;
                width: 300px;
                height: 18px;
                line-height: 18px;
                font-size: 18px;
                color: #303133;
                text-align-last: center;
                margin: 18px 38px 0 37px;
            }
            .usermessage {
                margin-top: 40px;
                width: 100%;
                ul {
                    margin: 0 40px;
                    padding: 0;
                }
                li {
                    margin: 0 0 15px 0;
                    padding: 0;
                    .info_title {
                        display: inline-block;
                        width: 88px;
                        height: 20px;
                        line-height: 20px;
                        font-size: 14px;
                        color: rgba(16,16,16,.5)
                    }
                    .info_content {
                        display: inline-block;
                        height: 20px;
                        line-height: 20px;
                        font-size: 14px;
                        margin-left: 5px;
                    }
                    
                }
                li:last-child {
                    margin: 0;
                }
            }
            .detailBtn {
                width: 100%;
                height: calc(100% - 311px);
                display: flex;
                justify-content: center;
                button {
                    margin: 0;
                    padding: 0;
                    outline: none; 
                    border: 0;  //自定义边框
                    cursor: pointer;
                    width: 77px;
                    height: 28px;
                    line-height: 28px;
                    font-size: 12px;
                    color: #fff;
                    border-radius: 4px;
                    margin-top: 35px;
                }
                .logoffBtn {
                    background-color: rgba(253, 64, 64, 0.64);
                    margin-right: 16px;
                }
                .freezeBtn {
                    background-color: rgba(253, 64, 64, 0.64);
                    margin-right: 16px;
                }
                .unfreezeBtn {
                    background-color: #14E293;
                }
                .nologBtn {
                    background-color: rgba(253, 64, 64, 0.64);
                }
                .rizeBtn {
                    background-color: #14E293;
                }
            }
        }
    }
</style>

