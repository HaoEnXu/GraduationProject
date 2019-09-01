<template>
    <div class="special_out">
        <div class="special_in">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="已上架" name="first">
                    <!-- 1.搜索区域 -->
                    <div class="secial_search">
                        <!-- 1.1搜索框 -->
                        <div class="search_input">
                            <el-input placeholder="搜索镜头名称/场景/镜头类型" v-model="searchInfo.keywords" @keyup.enter.native="searchMessage">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                        <!-- 1.2搜索高级搜索 -->
                        <div class="search_senior">
                            <div class="search_senior_head" @click="openSearchList">
                                <span class="Advanced_search_btn" :class="isOpen == true?'active':''">高级搜索</span>
                                <i class="el-icon-arrow-down" :class="isOpen == true?'active':''"></i>
                            </div>
                            <div class="search_senior_body" v-show="isOpen == true">
                                <div class="parent_style">
                                    <span class="listTitle">行业类型:</span>
                                    <div class="listBody">
                                        <span class="allChoose" :class="searchTag.indusTag == -1?'active':''" @click="indusAllChoose">全部</span>
                                        <span class="listItem" :class="searchTag.indusTag == index?'active':''" v-for="(item,index) in indusList" :key="index" @click="indusChoose(item,index)">{{item.name}}</span>
                                    </div>
                                </div>
                                <div class="parent_style">
                                    <span class="listTitle">镜头类型:</span>
                                    <div class="listBody">
                                        <span class="allChoose" :class="searchTag.lensTag == -1?'active':''" @click="lensAllChoose">全部</span>
                                        <span class="listItem" :class="searchTag.lensTag == index?'active':''" v-for="(item,index) in lensList" :key="index" @click="lensChoose(item,index)">{{item.name}}</span>
                                    </div>
                                   
                                </div>
                                <div class="parent_style">
                                    <span class="listTitle">颜色:</span>
                                    <div class="listBody">
                                        <span class="allChoose" :class="searchTag.colorTag == -1?'active':''" @click="colorAllChoose">全部</span>
                                        <span class="listItem" :class="searchTag.colorTag == index?'active':''" v-for="(item,index) in colorList" :key="index" @click="colorChoose(item,index)">{{item}}</span>
                                    </div>
                                    
                                </div>
                                <div class="parent_style">
                                    <span class="listTitle">风格:</span>
                                    <div class="listBody">
                                        <span class="allChoose" :class="searchTag.styleTag == -1?'active':''" @click="styleAllChoose">全部</span>
                                        <span class="listItem" :class="searchTag.styleTag == index?'active':''" v-for="(item,index) in styleList" :key="index" @click="styleChoose(item,index)">{{item.name}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 2.批量操作条 -->
                    <div class="operateArea">
                        <i class="choosedNum" v-show="isAllChoose == true || isMultiChoose == true">{{ItemArr.length}}</i>
                        <span v-show="isAllChoose == true || isMultiChoose == true">选中</span>
                        <span @click="tabAllChoose" v-show="isAllChoose == false || ItemArr.length != shelfArr.length">全选</span>
                        <span @click="tabNoAllChoose" v-show="ItemArr.length == shelfArr.length">取消全选</span>
                        <span @click="tabmultiChoose" v-show="isMultiChoose == false">多选</span>
                        <span @click="tabNoMultiChoose" v-show="isAllChoose == true || isMultiChoose == true">取消多选</span>
                        <span v-show="isAllChoose == true || isMultiChoose == true" @click="revisePrice">定价</span>
                        <span v-show="isAllChoose == true || isMultiChoose == true" @click="reviseAttribute">修改属性</span>
                        <span v-show="isAllChoose == true || isMultiChoose == true" @click="itemLower">下架</span>
                    </div>
                    <!-- 3.内容区域/俩层 -->
                    <div class="content">
                        <div class="contentList" id="contentList" @click="closeSearchList">
                            <div class="content_son" :class="item.isReal == false?'empty':''" v-for="(item,index) in fillData" :key="index" @click="ItemClick(item)">
                                <div class="mask" v-show="item.itemChoosed">
                                    <i class="el-icon-check"></i>
                                </div>
                                <div class="main_content" :style="{backgroundImage:'url('+item.previewCoverUrl+'?x-oss-process=image/resize,m_fill,w_240,h_135'+')'}">
                                    <span class="item_name">{{item.name}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--4. 分页 -->
                    <div class="paging">
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
                </el-tab-pane>
                <el-tab-pane label="未上架" name="second">
                    <!-- 1.搜索区域 -->
                    <div class="secial_search">
                        <!-- 1.1搜索框 -->
                        <div class="search_input">
                            <el-input placeholder="搜索镜头名称/场景/镜头类型" v-model="searchInfo.keywords" @keyup.enter.native="searchMessage">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                        <!-- 1.2搜索高级搜索 -->
                        <div class="search_senior">
                            <div class="search_senior_head" @click="openSearchList">
                                <span class="Advanced_search_btn" :class="isOpen == true?'active':''">高级搜索</span>
                                <i class="el-icon-arrow-down" :class="isOpen == true?'active':''"></i>
                            </div>
                            <div class="search_senior_body" v-show="isOpen == true">
                                <div class="parent_style">
                                    <span class="listTitle">行业类型:</span>
                                    <div class="listBody">
                                        <span class="allChoose" :class="searchTag.indusTag == -1?'active':''" @click="indusAllChoose">全部</span>
                                        <span class="listItem" :class="searchTag.indusTag == index?'active':''" v-for="(item,index) in indusList" :key="index" @click="indusChoose(item,index)">{{item.name}}</span>
                                    </div>
                                </div>
                                <div class="parent_style">
                                    <span class="listTitle">镜头类型:</span>
                                    <div class="listBody">
                                        <span class="allChoose" :class="searchTag.lensTag == -1?'active':''" @click="lensAllChoose">全部</span>
                                        <span class="listItem" :class="searchTag.lensTag == index?'active':''" v-for="(item,index) in lensList" :key="index" @click="lensChoose(item,index)">{{item.name}}</span>
                                    </div>
                                   
                                </div>
                                <div class="parent_style">
                                    <span class="listTitle">颜色:</span>
                                    <div class="listBody">
                                        <span class="allChoose" :class="searchTag.colorTag == -1?'active':''" @click="colorAllChoose">全部</span>
                                        <span class="listItem" :class="searchTag.colorTag == index?'active':''" v-for="(item,index) in colorList" :key="index" @click="colorChoose(item,index)">{{item}}</span>
                                    </div>
                                    
                                </div>
                                <div class="parent_style">
                                    <span class="listTitle">风格:</span>
                                    <div class="listBody">
                                        <span class="allChoose" :class="searchTag.styleTag == -1?'active':''" @click="styleAllChoose">全部</span>
                                        <span class="listItem" :class="searchTag.styleTag == index?'active':''" v-for="(item,index) in styleList" :key="index" @click="styleChoose(item,index)">{{item.name}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 2.批量操作条 -->
                    <div class="operateArea">
                        <i class="choosedNum" v-show="isAllChoose == true || isMultiChoose == true">{{ItemArr.length}}</i>
                        <span v-show="isAllChoose == true || isMultiChoose == true">选中</span>
                        <span @click="tabAllChoose" v-show="isAllChoose == false || ItemArr.length != shelfArr.length">全选</span>
                        <span @click="tabNoAllChoose" v-show="ItemArr.length == shelfArr.length">取消全选</span>
                        <span @click="tabmultiChoose" v-show="isMultiChoose == false">多选</span>
                        <span @click="tabNoMultiChoose" v-show="isAllChoose == true || isMultiChoose == true">取消多选</span>
                        <span v-show="isAllChoose == true || isMultiChoose == true" @click="revisePrice">定价</span>
                        <span v-show="isAllChoose == true || isMultiChoose == true" @click="reviseAttribute">修改属性</span>
                        <span v-show="isAllChoose == true || isMultiChoose == true" @click="itemUper">上架</span>
                    </div>
                    <!-- 3.内容区域/俩层 -->
                    <div class="content">
                        <div class="contentList" id="contentList" @click="closeSearchList">
                            <div class="content_son" :class="item.isReal == false?'empty':''" v-for="(item,index) in fillData" :key="index" @click="ItemClick(item)">
                                <div class="mask" v-show="item.itemChoosed">
                                    <i class="el-icon-check"></i>
                                </div>
                                <div class="main_content" :style="{backgroundImage:'url('+item.previewCoverUrl+'?x-oss-process=image/resize,m_fill,w_240,h_135'+')'}">
                                    <span class="item_name">{{item.name}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--4. 分页 -->
                    <div class="paging">
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
                </el-tab-pane>
            </el-tabs>
            <!-- 修改价格 -->
            <el-dialog
                title="修改价格"
                :visible.sync="PriceDialog"
                width="400px"
                center
                class="modifyPrice_out"
                >
                <div class="price_parent">
                    <div class="originalPrice">
                        <span class="oldPrice title">原价格</span>
                        <span v-if="ItemArr.length == 1">
                            ￥{{ItemArr[0].price==null?'未设价格':ItemArr[0].price}}
                        </span>
                        <div v-else class="moreChoose">
                            <el-popover
                            placement="right"
                            width="450"
                            trigger="hover">
                            <el-table :data="ItemArr">
                                <el-table-column width="300" property="name" label="姓名"></el-table-column>
                                <el-table-column width="150" property="price" label="价格"></el-table-column>
                            </el-table>
                            <el-button slot="reference">批量操作，点击查看详情</el-button>
                            </el-popover>
                        </div>
                    </div>
                    <div class="newPrice">
                        <span class="newPrice title">统一定价</span>
                        <el-input placeholder="请输入新价格" v-model="newprice"></el-input>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sureRevisePrice">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 修改属性 -->
            <el-dialog
                title="修改属性"
                :visible.sync="AttributeDialog"
                width="400px"
                center
                >
                <div class="reviseIndus">
                    <div class="oldIndus">
                        <span class="oldIndus_title">原行业</span>
                        <el-input style="width:217px" disabled v-model="ItemArr[0].industry==null?'未设行业':ItemArr[0].industry" v-if="ItemArr.length == 1" class="oldIndus_content"></el-input>
                        <div v-else class="oldIndus_more">
                            <el-popover
                            placement="right"
                            width="450"
                            trigger="hover">
                            <el-table :data="ItemArr">
                                <el-table-column width="200" property="name" label="姓名"></el-table-column>
                                <el-table-column width="250" property="industry" label="行业"></el-table-column>
                            </el-table>
                            <el-button type="info" style="width:217px" slot="reference">批量操作，点击查看详情</el-button>
                            </el-popover>
                        </div>
                    </div>
                    <div class="newIndus">
                        <span class="newIndus_title">新行业</span>
                        <el-select v-model="changeIndus" multiple  :multiple-limit="20" placeholder="统一选择行业">
                            <el-option
                            v-for="item in indusList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="reviseStyle">
                    <div class="oldStyle">
                        <span class="oldStyle_title">原风格</span>
                        <span v-if="ItemArr.length == 1" class="oldStyle_content">{{ItemArr[0].style==null?'未设风格':ItemArr[0].style}}</span>
                        <div v-else class="oldIndus_more">
                            <el-popover
                            placement="right"
                            width="300"
                            trigger="hover">
                                <el-table :data="ItemArr">
                                    <el-table-column width="200" property="name" label="姓名"></el-table-column>
                                    <el-table-column width="100" property="style" label="风格"></el-table-column>
                                </el-table>
                                <el-button type="info" style="width:217px" slot="reference">批量操作，点击查看详情</el-button>
                            </el-popover>
                        </div>
                    </div>
                    <div class="newStyle">
                        <span class="newStyle_title">新风格</span>
                        <el-select v-model="changeStyle"  placeholder="统一选择风格">
                            <el-option
                            v-for="item in styleList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sureReviseAttribute">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 详情页 -->
            <el-dialog
                :visible.sync="itemDetailDialog"
                width="700px"
                top="8vh"
                class="itemDetailDialog"
                >
                <div class="itemDetail">
                    <div class="detail_left">
                        <video-player  class="video-player vjs-custom-skin"
                        id="video-player"
                        ref="videoPlayer"
                        :playsinline="true"
                        :options="playerOptions"
                        @play="onPlayerPlay($event)"
                        @pause="onPlayerPause($event)"
                        ></video-player>
                    </div>
                    <div class="detail_right">
                        <!-- 名字输入框 -->
                        <div class="nameInput">
                            <el-input style="width:260px" v-model="ItemSingle.name" placeholder="未命名模板"></el-input>
                        </div>
                        <!-- 小属性 -->
                        <div class="small_attribute">
                            <div class="baseInfo">
                                <span class="attribute_title">{{ItemSingle.status==0?'照片':'视频'}}：</span>
                                <span class="attribute_content">{{ItemSingle.sizeRatio==0?'16:9':ItemSingle.sizeRatio==1?'9:16':'1:1'}}</span>
                            </div>
                            <div class="otherInfo">
                                <span class="info">信息：</span>
                                <div class="otherInfo_content">
                                    <span class="attribute_title">标题数</span>
                                    <span class="attribute_content">{{!ItemSingle.titleCount?'0':ItemSingle.titleCount}}</span>
                                    <span class="attribute_title">副标题数</span>
                                    <span class="attribute_content">{{!ItemSingle.subtitleCount?'0':ItemSingle.subtitleCount}}</span>
                                    <span class="attribute_title">内容数</span>
                                    <span class="attribute_content">{{!ItemSingle.textCount?'0':ItemSingle.textCount}}</span>
                                    <span class="attribute_title">图片数</span>
                                    <span class="attribute_content">{{!ItemSingle.picCount?'0':ItemSingle.picCount}}</span>
                                    <span class="attribute_title">视频数</span>
                                    <span class="attribute_content">{{!ItemSingle.videoCount?'0':ItemSingle.videoCount}}</span>
                                </div>
                                
                            </div>
                        </div>
                        <!-- 基本属性 -->
                        <div class="addedInfo">
                            <span class="addedInfo_title">基本属性</span>
                            <!-- 行业 -->
                            <div class="addedInfo_indus">
                                <span>行业</span>
                                <div class="addedInfo_indus_list">
                                    <el-select v-model="detailIndus" multiple :multiple-limit="20" placeholder="请选择">
                                        <el-option
                                        v-for="item in indusList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.name">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <!-- 镜头 -->
                            <div class="addedInfo_lens">
                                <span>镜头</span>
                                <div class="addedInfo_lens_list">
                                    <el-select v-model="ItemSingle.lens" placeholder="请选择">
                                        <el-option
                                        v-for="item in lensList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.name">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <!-- 颜色 -->
                            <div class="addedInfo_color">
                                <span>颜色</span>
                                <div class="addedInfo_color_list">
                                    <el-select v-model="ItemSingle.color"  placeholder="请选择">
                                        <el-option
                                        v-for="(item,index) in colorList"
                                        :key="index"
                                        :label="item"
                                        :value="item">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <!-- 风格 -->
                            <div class="addedInfo_style">
                                <span>风格</span>
                                <div class="addedInfo_style_list">
                                    <el-select v-model="ItemSingle.style" placeholder="请选择">
                                        <el-option
                                        v-for="item in styleList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.name">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <!-- 专属标签 -->
                        <div class="personTag">
                            <span class="personTag_title">专属标签</span>
                            <div class="tagsList">  
                                <el-tag
                                :key="tag"
                                v-for="tag in customs"
                                closable
                                size="mini"
                                :disable-transitions="false"
                                @close="handleClose(tag)">
                                {{tag}}
                                </el-tag>
                                <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="mini"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                                >
                                </el-input>
                                <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 添加标签</el-button>
                            </div>
                        </div>
                        <!-- 底部操作按钮 -->
                        <div class="operateBtn">
                            <el-button  type="primary" round @click="sureChangeDetail">更新</el-button>
                            <el-button  v-show="this.activeName == 'first'" type="warning" round @click="itemLower">下架</el-button>
                            <el-button  v-show="this.activeName == 'second'" type="success" round @click="itemUper">上架</el-button>
                            <el-button  v-show="this.activeName == 'second'" type="danger" round disabled="">删除</el-button>

                        </div>
                    </div>
                </div>
                
            </el-dialog>
        </div>
    </div>
</template>
<script>
import {videoPlayer} from 'vue-video-player';
import "videojs-flash"
import { constants } from 'zlib';
export default {
    data() {
        return {
            // 基础配置
            activeName:'first',
            pageSize:30,
            pageNum:1,
            total:0,
            isMultiChoose:false,
            isAllChoose:false,
            isOpen:false,
            // 选中的值
            ItemSingle:{},
            ItemArr:[],
            searchTag:{
                indusTag:-1,
                lensTag:-1,
                colorTag:-1,
                styleTag:-1
            },
            // 参数
            searchInfo:{
                industry:'',
                keywords:'',
                lens:'',
                pageSize:'',
                pageNum:'',
                style:'',
                color:'',
                live:'',
                sortField:'create_time'
            },
            modifyInfo:[],
            customs:[],
            // 修改价格
            newprice:'',
            // 遮罩层
            PriceDialog:false,
            AttributeDialog:false,
            itemDetailDialog:false,
            // 获取到的参数 -- 镜头类型
            lensList:[],
            // -- 行业类型
            indusList:[],
            detailIndus:[],
            changeIndus:[],
            // -- 颜色类型
            colorList:['红','黄','蓝','绿','橙','紫','黑','白'],
            // -- 风格类型
            styleList:[],
            changeStyle:'',
            // -- 已上架数据
            shelfArr:[],
            unshelfArr:[],
            // 视频参数
            videoLength:'',
            playerOptions: {
                autoplay: true, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                type: "video/mp4",
                src: "" //你的视频地址（必填）
                }],
                poster: "", //你的封面地址
                width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            },
            // 添加标签测试
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: '',
            rowsNum:0,
        }
    },
    mounted() {
        this.getLensList()
        this.getIndusList()
        this.getStyleList()
        this.getMainData()
        this.getUnShelfData()
        this.rowsNum = Math.floor(document.getElementById('contentList').offsetWidth / 240)
    },
    methods:{
        // 视频播放
        onPlayerPlay(player) {
        },
        onPlayerPause(player){
        },
        // 添加标签
        handleClose(tag) {
            this.customs.splice(this.customs.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
            this.customs.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        // 切换顶部tab栏
        handleClick(tab, event) {
            if(this.activeName == 'first') {
                this.getMainData()
            } else {
                this.getUnShelfData()
            }
            this.isMultiChoose = false
            this.isAllChoose = false
        },
        // 展开价格
        handleChange(val) {
        },
        //获取镜头分类列表
        getLensList() {
            const that = this
            that.$request.get('/oms/v1/lens/list/'+'lens').then(res => {
                if(res.status == 200 && res.data.errorCode == 200) {
                    that.lensList = res.data.data
                }
            })
        },
        // 获取风格分类列表 
        getStyleList() {
             this.$request.get('/oms/v1/lens/list/'+'style').then(res => {
                if(res.status == 200 && res.data.errorCode == 200) {
                    this.styleList = res.data.data
                }
            })
        },
        // 获取行业分类列表
        getIndusList() {
            this.$request
                .get("/oms/v1/materials/list/industry", {})
                .then(response => {
                    this.indusList = response.data.data;
            });
        },
        // 获取已上架数据列表
        getMainData() {
            this.ItemArr = []
            const that = this
            let parameter = {
                pageSize:that.pageSize,
                pageNum:that.pageNum,
                live:'up',
                sortField:'create_time'
            }
            that.$request.put('/oms/v1/lens',parameter).then(res => {
                if(res.data.data == null) {
                    this.$message({
                        type:'info',
                        message:'未获取到任何数据'
                    })
                } else if(res.status == 200 && res.data.errorCode == 200) {
                    that.total = res.data.data.info.total
                    that.shelfArr = res.data.data.info.list
                    that.shelfArr.forEach(ele => {
                        this.$set(ele,'itemChoosed',false)
                    })
                }
            })
        },
        // 获取未上架元素
        getUnShelfData() {
            this.ItemArr = []
            const that = this
            let parameter = {
                pageSize:that.pageSize,
                pageNum:that.pageNum,
                live:'down',
                sortField:'create_time'
            }
            that.$request.put('/oms/v1/lens',parameter).then(res => {
                let result = res.data.data.info
                if(res.status == 200 && res.data.errorCode == 200) {
                    that.total = result.total
                    that.unshelfArr = result.list
                    that.unshelfArr.forEach(ele => {
                        this.$set(ele,'itemChoosed',false)
                    })
                }
            })
        },
        // 展开搜索列表
        openSearchList() {
            this.isOpen = !this.isOpen
        },
        closeSearchList() {
            this.isOpen = false
        },
        indusChoose(item,index) {
            this.searchTag.indusTag = index
            this.searchInfo.industry = item.name
            this.searchMessage()
        },
        indusAllChoose() {
            this.searchTag.indusTag = -1
            this.searchInfo.industry = ''
            this.searchMessage()
        },
        lensChoose(item,index) {
            this.searchTag.lensTag = index
            this.searchInfo.lens = item.name
            this.searchMessage()
        },
        lensAllChoose() {
            this.searchTag.lensTag = -1
            this.searchInfo.lens = ''
            this.searchMessage()
        },
        colorChoose(item,index) {
            this.searchTag.colorTag = index
            this.searchInfo.color = item
            this.searchMessage()
        },
        colorAllChoose() {
            this.searchTag.colorTag = -1
            this.searchInfo.color = ''
            this.searchMessage()
        },
        styleChoose(item,index) {
            this.searchTag.styleTag = index
            this.searchInfo.style = item.name
            this.searchMessage()
        },
        styleAllChoose() {
            this.searchTag.styleTag = -1
            this.searchInfo.style = ''
            this.searchMessage()
        },
        searchMessage() {
            this.searchInfo.pageSize = this.pageSize
            this.searchInfo.pageNum = this.pageNum
            if(this.activeName == 'first') {
                this.searchInfo.live = 'up'
            } else {
                this.searchInfo.live = 'down'
            }
            console.log(this.searchInfo)
            this.$request.put('/oms/v1/lens',this.searchInfo).then(res => {
                 if(res.data.data == null) {
                    this.$message({
                        type:"warning",
                        message:'未检索到你所需的信息，请重新搜索'
                    })
                } else if(res.data.errorCode ==200 && res.status == 200) {
                    if(this.activeName == 'first') {
                        this.shelfArr = res.data.data.info.list
                    } else {
                        this.unshelfArr = res.data.data.info.list
                    }
                    this.total = res.data.data.info.total
                }
            })
        },
        clearSearchInfo() {
            this.searchInfo.industry = ''
            this.searchInfo.lens = ''
            this.searchInfo.color = ''
            this.searchInfo.style = ''
        },
        // 操作--单击item
        ItemClick(item) {
            if(this.isMultiChoose == false && this.isAllChoose == false) {
                this.openDetail(item)
            } else if (this.isMultiChoose == true || this.isAllChoose == true) {
                item.itemChoosed = !item.itemChoosed
            }
            if(this.activeName == 'first') {
                this.ItemArr = this.shelfArr.filter(val => val.itemChoosed);
            } else {
                this.ItemArr = this.unshelfArr.filter(val => val.itemChoosed);
            }
        },
        // 操作--全选
        tabAllChoose() {
            this.isAllChoose = true
            this.isMultiChoose = true
            if(this.activeName == 'first') {
                this.shelfArr = this.shelfArr.map(val => ((val.itemChoosed = true), val))
                this.ItemArr = this.shelfArr.filter(val => val.itemChoosed);
            } else {
                this.unshelfArr = this.unshelfArr.map(val => ((val.itemChoosed = true), val))
                this.ItemArr = this.unshelfArr.filter(val => val.itemChoosed);
            }
            
        },
        // 操作--取消全选
        tabNoAllChoose() {
            this.isAllChoose = false
            this.isMultiChoose = true
            if(this.activeName == 'first') {
                this.shelfArr = this.shelfArr.map(val => ((val.itemChoosed = false), val))
                this.ItemArr = this.shelfArr.filter(val => val.itemChoosed);
            } else {
                this.unshelfArr = this.unshelfArr.map(val => ((val.itemChoosed = false), val))
                this.ItemArr = this.unshelfArr.filter(val => val.itemChoosed);
            }
        },
        // 操作--多选
        tabmultiChoose() {
            this.isMultiChoose = true
        },
        // 取消多选
        tabNoMultiChoose() {
            this.isMultiChoose = false
            this.isAllChoose = false
            this.shelfArr = this.shelfArr.map(val => ((val.itemChoosed = false), val))
            this.ItemArr = []
        },
        // 操作--修改定价
        revisePrice() {
            if(this.ItemArr.length == 0) {
                this.$message ({
                    type:'warning',
                    message:'请至少选择一项'
                })
            } else {
                this.PriceDialog = true
            }
        },
        // 操作--确定修改定价
        sureRevisePrice() {
            this.PriceDialog = false
            let parameter = []
            this.ItemArr.forEach(ele => {
                parameter.push({
                    id:ele.id,
                    price:this.newprice
                })
            })
            this.$request.patch('/oms/v1/lens/prices',parameter).then(res => {
                if(res.status == 200) {
                    this.$message({
                        type:'success',
                        message:'价格修改成功'
                    })
                    this.newprice = ''
                    this.activeName=='first'? this.getMainData() : this.getUnShelfData()
                }
            })
        },
        // 操作--修改属性
        reviseAttribute() {
            if(this.ItemArr.length == 0) {
                this.$message({
                    type:'warning',
                    message:'请至少选择一项'

                })
            } else {
                this.AttributeDialog = true
            }
        },
        // 操作--确认修改属性
        sureReviseAttribute() {
            const that = this
            that.AttributeDialog = false
            let parameter = []
            if(that.changeIndus.length == 0 && that.changeStyle == '') {
                that.$message({
                    type:"warning",
                    message:'未做修改'
                })
            } else if(that.changeIndus.length != 0 && that.changeStyle == '') {
                that.ItemArr.forEach(ele => {
                    parameter.push({
                        id:ele.id,
                        industries:that.changeIndus,
                    })
                })
                that.$request.patch('/oms/v1/lens/attributes',parameter).then(res => {
                    if(res.status == 200) {
                        that.$message({
                            type:"warning",
                            message:'行业修改成功'
                        })
                    that.activeName == 'first'?that.getMainData():that.getUnShelfData()
                    }
                })
            } else if(that.changeIndus.length == 0 && that.changeStyle != '') {
                that.ItemArr.forEach(ele => {
                    parameter.push({
                        id:ele.id,
                        style:that.changeStyle
                    })
                })
                that.$request.patch('/oms/v1/lens/attributes',parameter).then(res => {
                    if(res.status == 200) {
                        that.$message({
                            type:"warning",
                            message:'风格修改成功'
                        })
                    that.activeName == 'first'?that.getMainData():that.getUnShelfData()
                    }
                })
            } else {
                that.ItemArr.forEach(ele => {
                    parameter.push({
                        id:ele.id,
                        industries:that.changeIndus,
                        style:that.changeStyle
                    })
                })
                that.$request.patch('/oms/v1/lens/attributes',parameter).then(res => {
                    if(res.status == 200) {
                        that.$message({
                            type:"warning",
                            message:'修改成功'
                        })
                    that.activeName == 'first'?that.getMainData():that.getUnShelfData()
                    }
                })
            }
            that.AttributeDialog = false
            that.changeIndus = []
            that.changeStyle = ''
            
        },
        // 操作--查看详情
        openDetail(item) {
            console.log(item)
            this.detailIndus = []
            this.customs = []
            this.ItemSingle = item
            this.playerOptions.sources[0].src = this.ItemSingle.previewUrl
            if(this.ItemSingle.industry) {
                this.detailIndus = this.ItemSingle.industry.split(',')
            }
            if(this.ItemSingle.customs) {
                this.customs = this.ItemSingle.customs.split(',')
            }
            this.itemDetailDialog = true
        },
        // 操作==确认修改item信息
        sureChangeDetail() {
            const that = this
            that.itemDetailDialog = false
            let parameter = {
                name:that.ItemSingle.name,
                industries:that.detailIndus,
                lens:that.ItemSingle.lens,
                id:that.ItemSingle.id,
                style:that.ItemSingle.style,
                color:that.ItemSingle.color,
                customs:that.customs
            }
            console.log(parameter)
            that.$request.patch('/oms/v1/lens',parameter).then(res => {
                console.log(res)
                if(res.status == 200) {
                    that.$message({
                        type:'success',
                        message:'信息修改成功'
                    })
                    that.detailIndus = []
                    that.customs = []
                    that.activeName == 'first'?that.getMainData():that.getUnShelfData()
                }
            })

        },
        // 操作--下架
        itemLower() {
            let ids = []
            if(this.isMultiChoose == true) {
                this.ItemArr.forEach(ele => {
                    ids.push(ele.id)
                })
            } else {
                ids.push(this.ItemSingle.id)
            }
            this.$request.patch('/oms/v1/lens/down/ae-lens',ids).then(res => {
                if(res.status == 200) {
                    this.$message({
                        type:'success',
                        message:'下架成功'
                    })
                    this.itemDetailDialog = false
                    this.getMainData()
                }
            })
        },
        // 操作--上架
        itemUper() {
            let ids = []
            if(this.isMultiChoose == true) {
                this.ItemArr.forEach(ele => {
                    ids.push(ele.id)
                })
            } else {
                ids.push(this.ItemSingle.id)
            }
            this.$request.patch('/oms/v1/lens/up/ae-lens',ids).then(res => {
                if(res.status == 200) {
                    this.$message({
                        type:'success',
                        message:'上架成功'
                    })
                    this.itemDetailDialog = false
                    this.getUnShelfData()
                }
            })
        },
        handleSizeChange: function(size) {
            this.pageSize = size
        },
        handleCurrentChange: function(pageNum) {
            // 处于筛选状态
            this.pageNum = pageNum
            if(this.searchTag.indusTag != -1||this.searchTag.lensTag != -1 || this.searchTag.colorTag != -1 || this.searchTag.styleTag != -1) {
                this.searchMessage()
            } else {
                if(this.activeName == 'first') {
                    this.getMainData()
                } else {
                    this.getUnShelfData()
                }
                
            }
            
        }
    },
    computed:{
        player() {
            return this.$refs.videoPlayer.player
        },
        fillData () {
            if(this.activeName=='first'){
                let fillNum = this.rowsNum - this.shelfArr.length % this.rowsNum
                fillNum = fillNum === this.rowsNum?0:fillNum
                return this.shelfArr.concat(Array.from({length: fillNum}, (v, i) => {
                return {
                    id: Math.floor(Math.random() * 10000),
                    isReal: false
                }
                }))
            }else {
                let fillNum = this.rowsNum - this.unshelfArr.length % this.rowsNum
                fillNum = fillNum === this.rowsNum ? 0 : fillNum
                return this.unshelfArr.concat(Array.from({length: fillNum}, (v, i) => {
                return {
                    id: Math.floor(Math.random() * 10000),
                    isReal: false
                }
                }))
      }
        }
    }
}
</script>
<style scoped>
    .special_out >>> .el-tabs__nav.is-top  {
        /* width: 70px!important; */
        background-color: #fff;
    }
    .el-tabs.el-tabs--top {
        width: 100%;
        height: 100%;
        /* background-color: #f5f5f5; */
    }
    .special_out >>> .el-tabs__content {
        width: 100%;
        height: calc(100% - 40px);
    }
    .special_out >>> .el-tab-pane {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .special_out >>> .el-tabs__nav-wrap.is-top {
        background-color: #f7f9f9!important;
    }
    
    .special_out >>> .el-tabs__nav-wrap::after {
        background-color: #fff!important;
    }
    /* 详情页 */
    .itemDetailDialog >>> .el-dialog__body {
        padding: 0 20px 20px;
    }
    .nameInput >>> .el-input__inner {
        border: 0;
        border-radius: 0;
        border-bottom: 1px solid #DCDFE6
    }
    .addedInfo >>> .el-input__inner {
        border: 0;
        border-radius: 0;
        border-bottom: 1px solid #DCDFE6
    }
    
</style>
<style  lang="scss" scoped>
    
    .special_out {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #f7f9f9;
            .special_in {
                position: absolute;
                top: 20px;
                left: 20px;
                right: 20px;
                bottom:0;
                background-color: #fff;
                .secial_search {
                    width: calc(100% - 40px);
                    height: 40px;  
                    padding: 0 20px; 
                    position: relative; 
                    .search_input {
                        position: absolute;
                        width: calc(100% - 150px);
                        height: 40px;
                        line-height: 40px;
                        margin-left: 110px;
                        padding-right: 20px;
                        z-index: 300
                    }   
                    .search_senior {
                        position: relative;
                        .search_senior_head {
                            cursor: pointer;
                            .Advanced_search_btn {
                                display: inline-block;
                                height: 40px;
                                font-size: 14px;
                                line-height: 40px;
                                margin-right: 10px;
                            }
                            .Advanced_search_btn.active {
                                color: #4f97f7;
                            }
                            i {
                                transition: all .3s;
                            }
                            i.active {
                                transition: all .3s;
                                transform: rotateZ(-180deg)
                            } 
                        }
                        .search_senior_body {
                            width: 100%;
                            padding: 10px 0;
                            position: absolute;
                            background-color: #fff;
                            z-index: 30;
                                .parent_style {
                                    .listTitle {
                                    display: inline-block;
                                    width: 70px;
                                    height: 30px;
                                    color: rgba(48, 49, 51, 0.8);
                                    font-size: 14px;
                                    line-height: 30px;
                                    text-align: right;
                                    vertical-align: top;
                                    }
                                    .listBody {
                                        display: inline-block;
                                        width: calc(100% - 110px);
                                        padding-left: 20px;
                                        span{
                                            color: rgba(48, 49, 51, 0.5);
                                            font-size: 14px;
                                            margin-right: 20px;
                                            cursor: pointer;
                                        }
                                        span.active {
                                            color: #4f97f7;
                                        }
                                    }
                                }
                        }
                    }   
                }
                .operateArea {
                    width: calc(100% - 40px);
                    height: 40px;
                    line-height: 40px;
                    // background: #c3ccc3;
                    padding: 0 20px;
                    span {
                        font-size: 14px;
                        margin-right: 15px;
                        cursor: pointer;
                        color: rgba(48, 49, 51, 0.5);
                    }
                }
                .content {
                    position: absolute;
                    padding: 5px 20px;
                    width: calc(100% - 40px);
                    bottom: 70px;
                    top: 80px;
                    height: calc(100% - 160px);
                    .contentList {
                        width: 100%;
                        height: 100%;
                        background-color: #fff;
                        overflow-y: auto;
                        flex-wrap: wrap;
                        display: flex;
                        flex-flow: row wrap;
                        justify-content: space-between;
                        align-content: flex-start;
                        .empty {
                            visibility: hidden;
                            width: 240px;
                            height: 135px;
                        }
                        .content_son {
                            width: 240px;
                            height: 135px;
                            margin: 15px 0;
                            cursor: pointer;
                            position: relative;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
                            .mask{
                                position: absolute;
                                top: 0;
                                left: 0;
                                z-index: 10;
                                width: 240px;
                                height: 135px;
                                line-height: 135px;
                                text-align: center;
                                background-color: rgba(0,0,0,.5);
                                .el-icon-check {
                                    font-size: 40px;
                                    color: #4f97f7;
                                }
                            }
                            .main_content {
                                width: 100%;
                                height: 100%;
                                background-color: rgb(158, 115, 115);
                                position: relative;
                                .item_name {
                                    position: absolute;
                                    display: block;
                                    width: calc(100% - 10px);
                                    height: 30px;
                                    line-height: 30px;
                                    font-size: 14px;
                                    padding-left: 10px;
                                    bottom: 0;
                                    color: #fff;
                                    background:rgba(0, 0, 0, 0.4);
                                }
                            }
                            &:hover{
                                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)
                            }
                        }
                       
                    }
                    .contentList::-webkit-scrollbar {
                        width: 8px;    
                        height: 4px;
                    }
                    .contentList::-webkit-scrollbar-thumb {
                        border-radius: 5px;
                        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                        background: rgba(0, 0, 0, 0.2);
                    }
                }
                .paging {
                    position: absolute;
                    width: 100%;
                    height: 30px;
                    padding: 20px 0;
                    background-color: #fff;
                    bottom: 0;
                    text-align: center;
                }
                
            }
    }

    // 修改价格遮罩层
    .modifyPrice_out {
        .originalPrice {
            margin-bottom: 15px;
            .title {
                display: inline-block;
                width: 70px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                vertical-align: right;
            }
            .moreChoose {
                width: 200px;
                height: 40px;
                line-height: 40px;
                display: inline-block;
            }
        }
        .newPrice {
            .title {
               display: inline-block;
                width: 70px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                vertical-align: right; 
            }
            .el-input {
                width: 56%;
            }
        }
    }
    // 修改属性遮罩层
    .reviseIndus {
        .oldIndus {
            .oldIndus_title {
            display: inline-block;
            width: 50px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            vertical-align: top;
            }
            .oldIndus_content {
                display: inline-block;
                width: 200px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                vertical-align: top;
                margin-left: 20px;
            }
            .oldIndus_more {
                display: inline-block;
                margin-left: 20px;
            }
        }
        .newIndus {
            margin-top: 15px;
            .newIndus_title {
                display: inline-block;
                width: 50px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                vertical-align: top;
            } 
            .el-select {
                margin-left: 20px;
            }
        }
        
    }
    .reviseStyle {
        .oldStyle {
            margin-top: 20px;
            .oldStyle_title {
                display: inline-block;
                width: 50px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                vertical-align: top;
            }
            .oldStyle_content {
                display: inline-block;
                height: 40px;
                line-height: 40px;
                text-align: center;
                vertical-align: top;
                margin-left: 20px;
            }
            .oldIndus_more {
                display: inline-block;
                margin-left: 20px;
                width: 217px;
                
            }
        }
        .newStyle {
            margin-top: 20px;
            .newStyle_title {
                display: inline-block;
                width: 50px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                vertical-align: top;
            }
            .el-select {
                margin-left: 20px;
            }
        }
    }
    // 查看详情
    .itemDetailDialog {
        .itemDetail {
            width: 100%;
            height: 100%;
            display: flex;
            .detail_left {
                display: block;
                width: 50%;
                height: 100%;;
                margin: auto 0;
            }
            .detail_right {
                width: 47%;
                margin-left: 20px;
                .small_attribute {
                    width: 100%;
                    span {
                        font-size: 14px;  
                        color: rgba(0,0,0,.5);
                        display: inline-block;
                        height: 30px;
                        line-height: 30px;
                    }
                    margin-top: 15px;
                    .baseInfo {
                        width: 100%;
                    }
                    .otherInfo {
                        .info {
                            vertical-align: top
                        }
                        .otherInfo_content {
                            display: inline-block;
                            width: 250px;
                        }
                        .attribute_content {
                            margin-right: 10px;
                        }
                    }
                }
                .addedInfo {
                    width: 100%;
                    .addedInfo_title {
                        font-size: 14px;
                        color: #000;
                        font-weight: 800;
                        display: inline-block;
                        margin: 15px 0 ;
                    }
                    .addedInfo_indus {
                        margin-bottom: 15px;
                        span {
                            display: inline-block;
                            height: 40px;
                            line-height: 40px;
                            vertical-align: top;
                        }
                        .addedInfo_indus_list {
                            display: inline-block;
                            margin-left: 15px;;
                        }
                    }
                    .addedInfo_lens {
                        margin-bottom: 15px;
                        span {
                            display: inline-block;
                            height: 40px;
                            line-height: 40px;

                        }
                        .addedInfo_lens_list {
                            display: inline-block;
                            margin-left: 15px;;
                        }
                    }
                    .addedInfo_color {
                        margin-bottom: 15px;
                        span {
                            display: inline-block;
                            height: 40px;
                            line-height: 40px;

                        }
                        .addedInfo_color_list {
                            display: inline-block;
                            margin-left: 15px;;
                        }
                    }
                    .addedInfo_style {
                        margin-bottom: 15px;
                        span {
                            display: inline-block;
                            height: 40px;
                            line-height: 40px;

                        }
                        .addedInfo_style_list {
                            display: inline-block;
                            margin-left: 15px;;
                        }
                    }
                }
                .personTag {
                    margin-top: 15px;
                    width: 270px;
                    .personTag_title {
                        display: inline-block;
                        font-size: 14px;
                        font-weight: 800;
                        color: #000;
                        vertical-align: top;
                    }
                    .tagsList {
                        margin: 15px 0;
                        width: 100%;
                        .el-tag.el-tag--mini {
                            margin-right: 5px;
                            margin-bottom: 5px;
                        } 
                    }
                }
                .operateBtn {
                    width: 270px;
                    display: flex;
                    justify-content: space-around;
                }

            } 
        }
    }
</style>


