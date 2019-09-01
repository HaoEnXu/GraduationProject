<template>
    <div class="order">
        <div class="order_body">
            <!-- 顶栏 --- 标签页 -->
        <el-tabs v-model="activeName" @tab-click="handleClick" >
            <el-tab-pane label="待接单" name="first">
                <el-table
                :data="waitOrderData"
                style="width: 100%">
                <el-table-column
                    prop="submitTime"
                    label="订单提交时间"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="orderId"
                    label="订单编号"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="customerPhone"
                    label="客户信息"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="orderType"
                    label="套餐"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="orderNeed"
                    label="视频需求"
                    width="270">
                </el-table-column>
                <el-table-column
                    prop="estimatePrice"
                    label="预计费用"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="200">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="150">
                    <template slot-scope="scope">
                        <el-button @click="toDispatch(scope.row)" type="text" size="small">派单</el-button>
                        <el-button type="text" size="small" @click="lookOrderDetails(scope.row)">查看详情</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="制作中" name="second">
                <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="订单提交时间"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="订单编号"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="接单组"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="接单时间"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="实际费用"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="成交金额"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="状态"
                    width="200">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="150">
                    <template slot-scope="scope">
                        <el-button @click="lookOrderDetails(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small" @click="lookOrderDetails(scope.row)">编辑</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="已完成" name="third">
                <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="订单完成时间"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="订单编号"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="客户信息"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="接单组"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="成交金额"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="成交金额"
                    width="270">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="状态"
                    width="200">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="150">
                    <template slot-scope="scope">
                        <el-button @click="lookOrderDetails(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small" @click="lookOrderDetails(scope.row)">编辑</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <!-- 分页 -->
        <div class="order_page">
            <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
            </el-pagination>
        </div>
        <!-- 派单遮罩层 -->
        <el-dialog
            title="制作派单"
            :visible.sync="dispatchVisible"
            width="900px"
            center
            >
            <div class="makeDispatch_top">
                <div class="dispatch_info">
                    <span>订单信息：</span>
                    <span>宣传视频-企业宣传-互联网</span>
                </div>
                <div class="dispatch_date">
                    <span>提交时间：</span>
                    <span>2019-4-15 12:00</span>
                </div>
                <div class="dispatch_money">
                    <span>预计费用：</span>
                    <span>4000优币</span>
                </div>
            </div>
            <span class="dispatchMaker">优视频制作师</span>
            <div class="authoList">
                <div class="autho" v-for="(item,index) in authoList" :key="index" :class="activeClass == index ? 'active':''" @click="getItem(index)">
                    <div class="autho_photo" :style="{backgroundImage:'url('+item.autho_photo+')'}"></div>
                    <div class="autho_info">
                        <span class="autho_name">{{item.authoName}}（{{item.authoId}}）</span>
                        <span class="autho_task">{{item.authoTakNum}}份在做订单</span>
                    </div>
                </div>
                
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sureDispatch">确认派单</el-button>
            </span>
        </el-dialog>
        <!-- 订单详情遮罩层 -->
        <el-dialog
            title="派单详情"
            class="orderDialog"
            :visible.sync="OrderVisible"
            center
            style="margin-top: 1vh;"
            >
            <div class="orderNoChange">
                <div class="orderItem_Info">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="视频概况">
                            <span>0元体验-企业宣传-互联网科技</span>
                        </el-form-item>
                        <el-form-item label="项目名称">
                            <el-input class="shortinput"  placeholder="项目名称" width="50%" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="公司名称">
                            <el-input class="shortinput"  placeholder="公司名称" width="50%" disabled></el-input>
                            <el-checkbox v-model="checked" style="margin-left:10px;" disabled>LOGO动画</el-checkbox>
                        </el-form-item>
                        <el-form-item label="解说文案">
                            <span>已有解说文案</span>
                            <el-input  type="textarea" placeholder="请输入您的解说文案" disabled></el-input>
                            <div class="needHelp">
                                <span>需要专业策划</span> 
                                <el-input class="need" type="textarea" placeholder="请填写说明需求或上传相关文档" disabled></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="图像素材">
                            <span>自备素材</span>
                            <div class="needHelp">
                                <span>需要现场拍摄</span>
                                <el-input type="textarea" placeholder="请输入您的解说文案" disabled></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="旁白配音">
                           <span>人工智能配音员</span>
                           <span>需要专业配音员</span>
                           <div class="Dubbingplayer">
                               <div class="dubbing_item">
                                   <span class="item_head"></span>
                                   <span class="item_name">专业配音花花</span>
                                   <span class="item_voice"></span>
                               </div>
                           </div>
                        </el-form-item>
                        <el-form-item label="其他说明">
                            <el-input  placeholder="请描述你的其他补充说明" disabled></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="orderChange">
                <div class="surviceInfo">
                    <span class="orderChange_title">服务信息</span>
                    <ul>
                        <li>
                            <span class="first_span">需求方：</span>
                            <span class="second_span">18888888888</span>
                            <span class="first_span">制作方：</span>
                            <span class="second_span">马耐老师</span>
                        </li>
                        <li>
                            <span class="first_span">预计费用：</span>
                            <span class="second_span">14124124</span>
                            <span class="first_span">实际费用：</span>
                            <span class="second_span">34412412</span>
                        </li>
                    </ul>
                </div>
                <div class="orderInfo_public" v-show="this.activeName == 'third'">
                    <span class="orderChange_title">交付物</span>
                    <span class="product"></span>
                    <span></span>
                    
                </div>
                <div class="orderInfo_public" v-show="this.activeName == 'first'|| this.activeName=='second'">
                    <span class="orderChange_title">订单信息</span>
                    <ul>
                        <li>
                            <span class="first_span">订单提交时间</span>
                            <span class="second_span">2019-4-12 12:00</span>    
                        </li>
                        <li>
                            <span class="first_span">定金金额：</span>
                            <span class="second_span">123123</span>
                            <span class="first_span">支付方式：</span>
                            <span class="second_span">支付宝</span>
                            <span class="first_span">支付定金时间：</span>
                            <span class="second_span">2019-4-15 13:15</span>
                        </li>
                        <li>
                            <span class="first_span">尾款金额：</span>
                            <span class="second_span">1234</span>
                            <span class="first_span">支付方式：</span>
                            <span class="second_span">支付宝</span>
                            <span class="first_span">支付尾款时间：</span>
                            <span class="second_span">2019-4-20 15:00</span>
                        </li>
                    </ul> 
                </div>
            </div>
            <div slot="footer" class="dialog-footer order">
                 <el-button class="toBack" @click="OrderVisible = false" round>{{bottomInfo}}</el-button>
            </div>
        </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            activeName: 'first',
            // 中间数据区域
             tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '18818818818',
                    // 
                    orderTime:'2019-1-1 12:00',
                    orderNum: '012019041612009210',
                    customerInfo:'1881881881',
                    packageType:'VIP',

                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '18818818818'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '18818818818'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '18818818818'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '18818818818'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '18818818818'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '18818818818'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '18818818818'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '18818818818'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '18818818818'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '18818818818'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '18818818818'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '18818818818'
                }
            ],
            authoList:[
                {
                    authoName:'耐叔',
                    authoId:'16',
                    authoTakNum:'20',
                    authoPhoto:'http://img0.imgtn.bdimg.com/it/u=410192655,968630645&fm=214&gp=0.jpg'
                },
                {
                    authoName:'耐叔',
                    authoId:'16',
                    authoTakNum:'20',
                    authoPhoto:'http://img0.imgtn.bdimg.com/it/u=410192655,968630645&fm=214&gp=0.jpg'
                },
                {
                    authoName:'耐叔',
                    authoId:'16',
                    authoTakNum:'20',
                    authoPhoto:'http://img0.imgtn.bdimg.com/it/u=410192655,968630645&fm=214&gp=0.jpg'
                },
                {
                    authoName:'耐叔',
                    authoId:'16',
                    authoTakNum:'20',
                    authoPhoto:'http://img0.imgtn.bdimg.com/it/u=410192655,968630645&fm=214&gp=0.jpg'
                },
                {
                    authoName:'耐叔',
                    authoId:'16',
                    authoTakNum:'20',
                    authoPhoto:'http://img0.imgtn.bdimg.com/it/u=410192655,968630645&fm=214&gp=0.jpg'
                },
                {
                    authoName:'耐叔',
                    authoId:'16',
                    authoTakNum:'20',
                    authoPhoto:'http://img0.imgtn.bdimg.com/it/u=410192655,968630645&fm=214&gp=0.jpg'
                },
                {
                    authoName:'耐叔',
                    authoId:'16',
                    authoTakNum:'20',
                    authoPhoto:'http://img0.imgtn.bdimg.com/it/u=410192655,968630645&fm=214&gp=0.jpg'
                },
            ],
            // 选中的数据
            choosedItem:{},
            // 表单元素
             form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            // 待接单数据
            waitOrderData:[
                {
                    submitTime:'2016-05-02',
                    orderId:'41454251464234',
                    customerPhone:'13523451678',
                    orderType:'基础',
                    orderNeed:'宣传视频-企业宣传-互联网',
                    estimatePrice:'5000',
                    status:'未付定金'
                },
                {
                    submitTime:'2016-05-02',
                    orderId:'41454251464234',
                    customerPhone:'13523451678',
                    orderType:'基础',
                    orderNeed:'宣传视频-企业宣传-互联网',
                    estimatePrice:'5000',
                    status:'未付定金'
                },
                {
                    submitTime:'2016-05-02',
                    orderId:'41454251464234',
                    customerPhone:'13523451678',
                    orderType:'基础',
                    orderNeed:'宣传视频-企业宣传-互联网',
                    estimatePrice:'5000',
                    status:'未付定金'
                },
                {
                    submitTime:'2016-05-02',
                    orderId:'41454251464234',
                    customerPhone:'13523451678',
                    orderType:'基础',
                    orderNeed:'宣传视频-企业宣传-互联网',
                    estimatePrice:'5000',
                    status:'未付定金'
                },
                {
                    submitTime:'2016-05-02',
                    orderId:'41454251464234',
                    customerPhone:'13523451678',
                    orderType:'基础',
                    orderNeed:'宣传视频-企业宣传-互联网',
                    estimatePrice:'5000',
                    status:'未付定金'
                },
                {
                    submitTime:'2016-05-02',
                    orderId:'41454251464234',
                    customerPhone:'13523451678',
                    orderType:'基础',
                    orderNeed:'宣传视频-企业宣传-互联网',
                    estimatePrice:'5000',
                    status:'未付定金'
                },
                {
                    submitTime:'2016-05-02',
                    orderId:'41454251464234',
                    customerPhone:'13523451678',
                    orderType:'基础',
                    orderNeed:'宣传视频-企业宣传-互联网',
                    estimatePrice:'5000',
                    status:'未付定金'
                },
                {
                    submitTime:'2016-05-02',
                    orderId:'41454251464234',
                    customerPhone:'13523451678',
                    orderType:'基础',
                    orderNeed:'宣传视频-企业宣传-互联网',
                    estimatePrice:'5000',
                    status:'未付定金'
                },
                {
                    submitTime:'2016-05-02',
                    orderId:'41454251464234',
                    customerPhone:'13523451678',
                    orderType:'基础',
                    orderNeed:'宣传视频-企业宣传-互联网',
                    estimatePrice:'5000',
                    status:'未付定金'
                },
                {
                    submitTime:'2016-05-02',
                    orderId:'41454251464234',
                    customerPhone:'13523451678',
                    orderType:'基础',
                    orderNeed:'宣传视频-企业宣传-互联网',
                    estimatePrice:'5000',
                    status:'未付定金'
                },
                {
                    submitTime:'2016-05-02',
                    orderId:'41454251464234',
                    customerPhone:'13523451678',
                    orderType:'基础',
                    orderNeed:'宣传视频-企业宣传-互联网',
                    estimatePrice:'5000',
                    status:'未付定金'
                },
                {
                    submitTime:'2016-05-02',
                    orderId:'41454251464234',
                    customerPhone:'13523451678',
                    orderType:'基础',
                    orderNeed:'宣传视频-企业宣传-互联网',
                    estimatePrice:'5000',
                    status:'未付定金'
                },
                {
                    submitTime:'2016-05-02',
                    orderId:'41454251464234',
                    customerPhone:'13523451678',
                    orderType:'基础',
                    orderNeed:'宣传视频-企业宣传-互联网',
                    estimatePrice:'5000',
                    status:'未付定金'
                },
                
            ],
            // 制作中数据
            inProductionData:[],
            // 制作成功数据
            completedDada:[],
            // 遮罩层数据
            dispatchVisible:false,
            // ---logo动画是否选中
            checked:true,
            // 选中状态
            activeClass:-1,
            OrderVisible:false,// 订单--未接单
            GenerateorderVisible:false,// 生成订单
            // 选中样式
            choosedClass:'choosed',
            // 底部文字
            bottomInfo:'',
        }
    },
    methods: {
        handleClick(tab, event) {
        },
        operationClick(row) {
        },
        // 点击派单
        toDispatch(row) {
            this.choosedItem = row;
            this.dispatchVisible = true
        },
        //确定派单
        sureDispatch() {
            this.dispatchVisible = false
            this.activeClass = -1
            this.choosedItem = {}
        },
        // 选择设计师
        getItem(index) {
            this.activeClass = index
        },
        // 查看订单详情
        lookOrderDetails(row) {
            this.OrderVisible = true
            this.choosedItem = row;
            if(this.activeName == 'first') {
                this.bottomInfo = '待接单'
            }else if(this.activeName == 'second') {
                this.bottomInfo = '进行中'
            }else {
                this.bottomInfo = '已完成'
            }
        }


    }
}
</script>

<style>
    .order {
        width: 100%;
        height: 100%;
        background-color: #f7f9f9;
        position: relative
    }
    .order .order_body {
        position: absolute;
        background-color: #fff;
        top: 20px;
        left: 20px;
        right: 20px;
        bottom: 0;
    }
    .order .el-tabs__nav-scroll {
        background-color: #fff !important;
    }
    .order .el-tabs__nav.is-top {
        transform: translateX(0px);
        width: 240px;
        left: 50%;
        margin-left: -120px;
    }
    .order .order_body .el-tabs__nav-wrap::after {
        width: 208px;
        left: 50%;
        height: 1px;
        margin-left: -121px;
        color: #ccc;
        z-index: 2;
    } 
    .order .el-pagination.is-background {
        text-align: center;
    }
    /* 分页设置 */
    .order_page {
        position: absolute;
        width: 100%;
        /* transition:translateX(-50%); */
        transition:translateX(-50%);
        height: 45px;
        padding-top: 13px;
        z-index: 100;
        background-color: #fff;
        bottom: 0;
    }
    .makeDispatch_top {
        width: 100%;
        height: 50px;
        line-height: 50px
    }   
    .makeDispatch_top div {
        display: inline-block;
    }
    .makeDispatch_top .dispatch_info {
        width: 300px;
        margin-right: 30px;
    }
    .makeDispatch_top .dispatch_date {
        width: 200px;
        margin-right: 60px
    }
    .makeDispatch_top .dispatch_money {
        width: 200px;
    }
    /* 制作师列表 */
    .authoList {
        width: 100%;
        display: flex;
        /* 从左往右 */
        flex-direction: row;
        /* 换行 */
        flex-wrap: wrap;
        /* 俩端对其 */
        justify-content: space-between
    }
    .autho {
        width: 230px;
        height: 100px;
        position: relative;
        margin: 10px 0;
        border-radius: 10px;
        background-color: #f2f2f2;
    }
    .autho.active {
        background-color: rgba(0, 0, 0, .3);
        
    } 
    .autho_photo {
        width: 60px;
        height: 60px;
        position: absolute;
        top: 50%;
        margin-top: -30px;
        left: 20px;
        border-radius: 30px;
        background-color: #a2a;
    }
    .autho_info {
        width: 130px;
        height: 100px;
        position: absolute;
        right: 0;
    }
    .autho_info span {
        display: block;
        width: 130px;
        height: 50px;
        line-height: 50px;
    }
    /* 订单详情遮罩层 */
    .order .el-dialog__wrapper.orderDialog {
        margin-top: 50px !important;
    }
    .orderDialog div.el-dialog.el-dialog--center{
        width: 1200px ;
        height: 852px ;
        margin-top: 0 !important;
        position: relative;
    }
    
    /* 固定头 */
    .orderDialog  .el-dialog__header {
        position: absolute;
        width: 100%;
        height: 60px;
        line-height: 60px;
        top: 0;
        padding: 0 !important;
    }
    /* 固定身体 */
    .orderDialog .el-dialog__body {
        position: absolute;
        top: 60px;
        width: calc(100% - 40px);
        height: 85%;
        bottom: 8%;
        padding:0 20px !important;
        overflow-y: auto;
    }
    /* 固定底部 */
    .orderDialog .el-dialog__footer {
        position: absolute;
        bottom: 0;
        height: 8%;
        width: 100%;;
        line-height: 60px;
        padding: 0 !important;
        
    }
    .orderDialog .el-dialog__body::-webkit-scrollbar {/*滚动条整体样式*/
      width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
    }
    .orderDialog .el-dialog__body::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0, 0, 0, 0.2);
    }
    /* 修改表单样式 */
    /* 将所有的标签的背景色替换 */
    .orderDialog .el-input__inner,.el-textarea__inner {
        background-color: rgba(241,241,241,1);
        color: #999999;
    }
    .orderDialog .el-form-item__label {
        width: 90px !important;
        padding-right: 30px;
    }
    .orderDialog .el-form-item__content {
        margin-left: 90px !important;
    }
    .orderDialog .shortinput.el-input {
        width: 60%;
    }
    /* logo选中 */
    .orderDialog .el-checkbox.is-checked .el-checkbox__label {
        color: rgba(20, 226, 147, 1)!important;
    }
    .orderDialog .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color:rgba(20, 226, 147, 1)!important;
        border-color: rgba(20, 226, 147, 1)!important;
    }
    .orderDialog .el-checkbox__input.is-focus .el-checkbox__inner {
        border-color: rgba(20, 226, 147, 1)!important;
    }
    /* =====底栏样式修改===== */
    .dialog-footer.order {
        width: 100%;
        height: 100%;
        padding: 0;
        background-color: #ccc;
    }
    .orderDialog .el-dialog__footer div,.el-button {
        display: inline-block;
        margin-right: 15px;
    }
    .orderDialog .el-dialog__footer div {
        color: rgb(102, 102, 102)
    }
    .orderDialog .el-icon-plus {
        width: 15px;
        height: 15px;
        line-height: 15px;
        text-align: center;
        border: 1px solid rgba(20, 226, 147, 1)!important;
        border-radius: 15px;
        font-size: 10px;
        margin-right: 10px;
    }
    .footer_num {
        font-size: 24px;
        color: rgba(20, 226, 147, 1);
    }
    /* 内容区域相同部分 */
    .orderChange {
        width: 100%;
    }
    .orderChange  div{
        padding: 30px 0;
        width: 100%;
        border-top: 1px solid #bbb;
    }
    .orderChange ul,li{
        margin: 0;
        padding: 0;
    }
    .orderChange ul {
        margin-top: 10px;
    }
    .orderChange li {
        height: 30px;
        line-height: 30px;
    }
    .orderChange li span.first_span {
        display: inline-block;
        width: 100px;
    }
    .orderChange li span.second_span {
        display: inline-block;
        width: 130px;
        margin-left: 25px;
    }
    .orderChange_title {
        /* margin-bottom: 10px; */
        font-size: 18px;
    }
    .product {
        display: block;
        width: 270px;
        height: 164px;
        margin:20px 0;
        background-color: #f2f2f2;
    }
    /* 配音 */
    .Dubbingplayer {
        width: 100%;
        height: 40px;
    }
    .dubbing_item {
        width:190px;
        height:40px;
        background:rgba(236,247,246,1);
        border-radius:20px;
    }
    .dubbing_item  span {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        vertical-align: middle;
    }
    .dubbing_item .item_head {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        background-color: #ccc;
    }
    /* 遮罩层相同部分 */
    .orderNoChange {
        width: 100%;
    }
</style>
