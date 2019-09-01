<template>
  <div class="matterPage">
    <toptab :tabList='tablist' @changeTab="changeTab" :type="type"></toptab>
    <div class="matterContent">
      <div class="topHandleArea">
        <!-- 统一操作 -->
        <div class="unifiedOperation" v-show="this.selectedArr.length != 0">
          <div class="leftarea">
            <span class="allChoose" @click="chooseAll">全选</span>
            <span class="beChoosed">已选中 {{this.selectedArr.length}} 项</span>
            <i class="el-icon-close" @click="uncheck"></i>
          </div>
          <div class="rightarea">
            <span v-show="type == 1" @click="toDelete">一并删除</span>
            <span @click="contentmain = true">统一修改</span>
            <span v-show="type == 1" @click="toShelf">批量上架</span>
            <span v-show="type == 0" @click="toUnShelf">批量下架</span>
          </div>
        </div>
        <!-- 搜索 -->
        <div class="inputArea">
          <input type="text" v-model="inputInfo" placeholder="搜索名称或自定义标签">
          <span class="Icon" :style="{backgroundImage:'url('+searchIcon+')'}" @click="search"></span>
        </div>
        <!-- 高级搜索 -->
        <span class="search-btn" :class="searchBtn?'active':''" @click="Advancedsearch">多标签高级搜索</span>
        <i v-show="searchArr.length!=0" class="el-icon-circle-close" @click="clearSearchArr"></i>
        <!-- 筛选 -->
        <el-select class="screenSelect" v-model="screenType" placeholder="请选择" v-show="!this.selectedArr.length" @change="sort">
          <el-option
            v-for="(item,index) in screenList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
        <!-- 高级搜索按钮 -->
        <div class="advancedSearchBtn">
          <div class="advancedSearchBtn_son" v-for="(item,index) in searchArr" :key="item.name">
            <span>{{item.name}}</span>
            <i class="el-icon-circle-close" @click="deleteSearchItem(item,index)"></i>
          </div>
        </div>
      </div>
      <div class="maincontent" v-loading="loadingData">
        <contentcard 
        :contentList="contentList" 
        :type="type" 
        :allchoose="isAllChoose"
        :mutichoose="isMutiChoose"
        v-on:chooseItem="chooseItem"
        v-on:choosedAll="itemAllChoosed"
        v-on:unchoosed="itemUnChoosed"
        v-on:editItem="editItem"
        v-on:unshelfsItem="toUnShelf"
        v-on:shelfsItem="toShelf"
        v-on:deleteItem="toDelete"
        ></contentcard>
      </div>
      <!-- 分页插件 -->
      <div class="paging">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-size="pageSize"
        ></el-pagination>
      </div>
      <!-- 高级搜索 -->
      <el-dialog
        class="searchDialog"
        :class="openSearchList==true?'open':''"
        :visible.sync="AdvancedsearchVisible"
        >
        <div class="searchHead">
          <span>高级搜索条件组</span>
        </div>
        <div class="searchBody" >
          <ul>
            <li>
              <span class="li-title">付费类型</span>
              <div class="li-content">
                <span :class="choosedTag.payTag == index?'active':''" v-for="(item,index) in payList" :key="index" @click="payClick(item,index)">{{item.name}}</span>
              </div>
            </li>
            <li>
              <span class="li-title">行业分类</span>
              <div class="li-content">
                <span v-show="openSearchList == false" :class="item.choosed?'active':''" v-for="(item,index) in smallindustryList" :key="item.id" @click="indusClick(item,index)">{{item.name}}</span><span v-show="openSearchList == false" @click="openSearch">···</span>
                <span v-show="openSearchList == true" :class="item.choosed?'active':''" v-for="(item,index) in industryList" :key="index" @click="indusClick(item,index)">{{item.name}}</span>
              </div>
            </li>
            <li>
              <span class="li-title">镜头分类</span>
              <div class="li-content">
                <span v-show="openSearchList == false" :class="item.choosed?'active':''"  v-for="(item,index) in smalllensList" :key="item.id" @click="lensClick(item,index)">{{item.name}}</span><span v-show="openSearchList == false" @click="openSearch">···</span>
                <span v-show="openSearchList == true" :class="item.choosed?'active':''" v-for="(item,index) in lensList" :key="index" @click="lensClick(item,index)">{{item.name}}</span>
              </div>
            </li>
            <li>
              <span class="li-title">颜色分类</span>
              <div class="li-content">
                <span class="colorcont" 
                :class="choosedTag.colorType == index?'active':''" 
                v-for="(item,index) in colorList"  
                :key="item.id"
                @click="colorClick(item,index)"
                ></span>
              </div>

            </li>
            <li>
              <span class="li-title">景别分类</span>
              <div class="li-content">
                <span :class="item.choosed?'active':''" v-for="(item,index) in scene" :key="index" @click="sceneClick(item,index)">{{item.name}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="searchFoot">
          <span class="define" @click="sureSearch">确定</span>
          <span class="reset" @click="clearSearchArr">重置</span>
          <span class="cancel" @click="cancelSearch">取消</span>
        </div>
      </el-dialog>
      <!-- 素材详情 -->
      <el-dialog
          class="detailDialog"
          :visible.sync="detailDialog"
          @close="closeItemDetail"
          >
          <div class="detailTop">
            <div class="detail-title">
              <span v-show="chooseName == false">{{choosedItem.name}}</span>
              <input class="chooseNameinput" v-show="chooseName == true" v-model="choosedItem.name" @keyup.enter="chooseName=false"></input>
              <i v-show="chooseName == false" class="el-icon-edit" @click="chooseName=true"></i>
            </div>
            <div class="video" >
                <video-player  class="video-player vjs-custom-skin"
                  id="video-player"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
                  @play="onPlayerPlay($event)"
                  @pause="onPlayerPause($event)"
                ></video-player>
            </div>
            <div class="bottomInfo">
              <i class="el-icon-document-copy"></i>
              <input type="text" id="test" :value="this.chooseItem.outlineUrl" style="display:none">
              <span class="copySrc" @click="copyUrl">点击复制链接</span>
              <span class="videolength" v-show="this.choosedItem.type==1">{{videoLength}}s</span>
              <span class="videolength
              
              " v-show="this.choosedItem.type == 0">{{choosedItem.width}}*{{choosedItem.height}}</span>
            </div>
          </div>
          <div class="detailBody">
            <span class="detailBody-title">商品属性</span>
            <div class="detailBody-content">
              <div class="content-li">
                <span class="content-title">付费类型</span>
                <el-select class="paySelect" v-model="alonepay" placeholder="请选择">
                  <el-option
                    v-for="item in payList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
            </div>
            <span class="detailBody-title">商品标签</span>
            <div class="detailBody-content">
              <div class="content-li">
                <span class="content-title">镜头</span>
                <el-select v-model="choosedItem.lens" placeholder="请选择">
                  <el-option
                    v-for="item in lensList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
              <div class="content-li">
                <span class="content-title">景别</span>
                <el-select v-model="aloneScene" placeholder="请选择">
                  <el-option
                    v-for="item in scene"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
              <div class="content-li">
                <span class="content-title">颜色</span>
                <div class="content-color">
                  <span
                  :class="choosedTag.colorType == index?'active':''" 
                  v-for="(item,index) in colorList"  
                  :key="item.id"
                  @click="chooseItemColor(item,index)"
                  ></span>
                </div>
                
              </div>
              <div class="content-li">
                <span class="content-title">行业</span>
                <el-select class="indusselect" v-model="aloneindustry" placeholder="请选择" multiple >
                  <el-option
                    v-for="item in industryList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
              <div class="content-li">
                <span class="content-title">自定义</span>
                <div class="detail_taglist" v-model="aloneCustoms">
                    <el-tag
                    :key="index"
                    v-for="(tag,index) in aloneCustoms"
                    closable
                    size="small"
                    :disable-transitions="false"
                    @close="closeTag(tag)">
                    <span>{{tag}}</span>
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="mini"
                    maxlength="4"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  >
                  </el-input>
                <el-button v-else class="button-new-tag" @click="showInput">+标签</el-button>
                </div>
              </div>
            </div>
          </div>
          <div class="detailFoot">
              <span class="reset" @click="aloneItemRefresh">更新</span>
              <span class="toUp" v-show="type == 1" @click="toShelf(choosedItem)">上架</span>
              <span class="toDown" v-show="type == 0" @click="toUnShelf(choosedItem)">下架</span>
              <span class="cancel" @click="canceleditItem">取消</span>
          </div>
      </el-dialog>
      <!-- 修改属性 -->
      <el-dialog title="修改属性" :visible.sync="contentmain" width="470px" center class="modifyAttri">
        <div class="modifyattribute">
          <ul>
            <li>
              <span class="attribute_title">原付费</span>
              <span>{{chooseItem.vip === 0?'会员免费':((chooseItem.vip===1)?'会员专享':((chooseItem.vip===2)?'仅付费可用':'限时免费'))}}</span>
            </li>
            <li>
              <span class="attribute_title">新付费</span>
              <el-select v-model="alonepay" placeholder="请选择">
                <el-option v-for="item in payList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </li>
            <li>
              <span class="attribute_title">原行业</span>
              <span>婚礼请柬/手机海报/电商banner/会议公示</span>
            </li>
            <li>
              <span class="attribute_title">新行业</span>
              <el-select v-model="aloneindustry" multiple placeholder="请选择">
                <el-option
                  v-for="item in industryList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </li>
            <li>
              <el-button type="primary" round @click="modify">确认修改</el-button>
            </li>
          </ul>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import toptab from '../components/topTab/topTab'
  import contentcard from '../components/matterComponent/contetncard.vue'
  import { constants } from 'zlib';
  import {videoPlayer} from 'vue-video-player';
  import "videojs-flash"
  export default {
    data() {
      return {
        // 顶栏
        tablist:[
          {
              id:0,
              name:'已上架',
          },
          {
              id:1,
              name:'未上架',
          }
        ],
        searchIcon:'http://molto-pixel-web-static.oss-cn-beijing.aliyuncs.com/images/%E6%90%9C%E7%B4%A2.svg',
        // 筛选
        screenType: "",
        screenList:[
          {
            id:1,
            name:'最新上传'
          },
          {
            id:2,
            name:'最近修改'
          }
        ],
        // radio
        shelfRadio:'',
        unshelfRadio:'',

        // 数据
        contentList:[],
        shelfdata:[],
        unshelfdata:[],
        type:'',
        newUpArr:[],
        selectedArr:[],
        choosedItem:{},
        videoLength:'',

        // 单独数据
        alonepay:'',
        alonelens:'',
        aloneScene:'',
        aloneColor:'',
        aloneindustry:[],
        aloneCustoms:[],
        // 基本数据类型
        baseType:[
          {
            id:0,
            name:'图片'
          },
          {
            id:1,
            name:'视频'
          }
        ],
        // 付费类型
        payList: [
          {
            id: 0,
            name: "会员免费",
            choosed:false
          },
          {
            id: 1,
            name: "会员专享",
            choosed:false
          },
          {
            id: 2,
            name: "仅付费可用",
            choosed:false
          },
          {
            id: 3,
            name: "限时免费",
            choosed:false
          }
        ],
        // 行业类型
        smallindustryList:[],
        industryList: [],
        // 镜头类型
        smalllensList:[],
        lensList:[],
        //  景别类型
        scene:[
          {
            id:1,
            name:'特写',
            choosed:false
          },
          {
            id:2,
            name:'近景',
            choosed:false
          },
          {
            id:3,
            name:'中景',
            choosed:false
          },
          {
            id:4,
            name:'远景',
            choosed:false
          },
          {
            id:5,
            name:'全景',
            choosed:false
          }
        ],
        // 颜色
        colorList:[
          {
            id:1,
            name:'红',
            choosed:false
          },
          {
            id:2,
            name:'橙',
            choosed:false
          },
          {
            id:3,
            name:'黄',
            choosed:false
          },
          {
            id:4,
            name:'绿',
            choosed:false
          },
          {
            id:5,
            name:'青',
            choosed:false
          },
          {
            id:6,
            name:'紫',
            choosed:false
          },
          {
            id:7,
            name:'黑',
            choosed:false
          },
        ],
        // 高级搜索-搜索参数
        inputInfo:'',
        searchInfo:{
          pageSize:'',
          pageNum:'',
          sortField:'',
          keywords:'', //搜索框关键字
          shot:[],     //景别
          type:'',     //数据类型
          industry:[], //行业
          vip:'',      //会员类型
          live:'',     //上架与否 
          lens:[],     //镜头
          color:''
        },
        // 高级搜索-选中
        baseTypeItem:{},
        payTypeItem:{},
        colorTypeItem:{},
        sceneTypeArr:[],
        indusTypeArr:[],
        lensTypeArr:[],
        // 高级搜索=展示
        searchArr:[],
        choosedTag: {
          baseType:-1, //基本数据类型
          payTag:-1,   //付费类型
          colorType:-1
        },
        // 上传
        fileList:[],
        uploadNum:0,
        newUpItem:[],
        // 添加标签
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        // 属性
        isMutiChoose:false,
        isAllChoose:false,
        searchBtn:false,
        chooseName:false,
        openSearchList:false,

        // 分页数据
        total:0,
        pageSize:30,
        pageNum:1,

        // loading
        loadingData:false,

        //遮罩层
        AdvancedsearchVisible:false,
        detailDialog:false,
        uploadDialog:false,
        contentmain:false,
        // ==========视频播放
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
      }
    },
    methods:{
      getradio() {
        this.shelfRadio = localStorage.getItem('shelfRadio')
        this.unshelfRadio = localStorage.getItem('unshelfRadio')
      },
      changeTab(value) {
        this.selectedArr = []
        if(value.name == '已上架') {
          this.getShelfData()
          this.type = 0
        } else {
          this.getUnshelfData()
          this.type = 1
        }
        this.clearSearchArr()
        this.screenType = ''
        this.searchBtn = false
      },
      // 分页操作
      handleSizeChange:function(size) {
        this.pageSize = size;
      },
      handleCurrentChange:function(pageNum) {
        this.pageNum = pageNum
        if(this.searchBtn) {
          this.search()
        } else {
          if(this.type == 0) {
            this.getShelfData()
          } else {
            this.getUnshelfData()
          }
        }
        
      },
      // 获取已上架数据
      getShelfData() {
        const that = this
        this.$request.put("/oms/v1/lens", {
          pageSize: that.pageSize,
          pageNum: that.pageNum,
          sortField:that.screenType==''?'update_time':'create_time',
          live:'up'
        })
        .then(response => {
          if (response.data.errorCode === 200) {
            let data = response.data.data
            that.shelfdata = data.info.list
            that.shelfdata.forEach(element => {
              that.$set(element,'choosed',false)
              // 给视频数据添加封面图
              if(element.type == 1) {
                  let imgUrl = element.url+'?x-oss-process=video/snapshot,t_5000,w_240,h_135,f_jpg'
                  that.$set(element,'url',imgUrl)
              }
              // 新上架元素绑定属性
              that.newUpArr.forEach(ele => {
                if(element.id == ele.id) {
                  this.$set(element,'newdata',true)
                }
              })
            })
            this.contentList = this.shelfdata
            that.type = 0
            that.total = data.info.total;
          }
          that.isMutiChoose = false;
        });
      },
      // 获取未上架数据
      getUnshelfData() {
        const that = this;
        this.$request
          .put("/oms/v1/lens", {
            pageSize: this.pageSize,
            pageNum: this.pageNum,
            sortField:that.screenType==''?'create_time':'update_time',
            live:'down'
          })
          .then(response => {
            if (response.status == 200 && response.data.errorCode == 200) {
              that.unshelfdata = response.data.data.info.list;
              that.unshelfdata.forEach(element => {
                that.$set(element,'choosed',false)
                if(element.type == 1) {
                    let imgUrl = element.url+'?x-oss-process=video/snapshot,t_5000,w_240,h_135,f_jpg'
                    this.$set(element,'url',imgUrl)
                }
              })
              that.contentList = that.unshelfdata
              that.type = 1
              // 新上传数据绑定属性
              that.total = response.data.data.info.total;
            }
          });
      },
      /// 获取行业列表 --- ok
      getIndustry() {
        this.$request
          .get("/oms/v1/materials/list/industry", {})
          .then(response => {
            this.industryList = response.data.data;
            this.industryList.forEach(element => {
              this.$set(element,'choosed',false)
            })
            this.smallindustryList = this.industryList.slice(0,6)
          });
      },
      // 获取镜头列表
      getlensList() {
        this.$request
          .get("/oms/v1/materials/list/lens", {})
          .then(response => {
            this.lensList = response.data.data;
            this.lensList.forEach(element => {
              this.$set(element,'choosed',false)
            })
            this.smalllensList = this.lensList.slice(0,6)
          });
      },
      // 全选
      chooseAll() {
          this.isAllChoose = true
      },
      // 取消选中
      uncheck() {
          this.isAllChoose = false
          this.isMutiChoose = false
      },
      // 子组件回传
      chooseItem(selectedarr) {
        this.selectedArr = selectedarr
        if(this.selectedArr.length != 0) {
          this.isMutiChoose = true
        } else {
          this.isMutiChoose = false
        }
      },
      itemAllChoosed(val) {
        this.selectedArr = val
      },
      itemUnChoosed(val) {
        this.selectedArr = val
      },
      editItem(item) {
        this.choosedItem = item
        this.detailDialog = true
        if(item.type == 1) {
          setTimeout(()=> {
              let newdata = document.getElementsByTagName('video')[0].duration
              this.videoLength = (Math.floor(newdata * 100) / 100).toFixed(1)
          },400)
        }
        this.alonepay = this.choosedItem.vip==0?'会员免费':this.choosedItem.vip==1?'会员专享':this.choosedItem.vip==2?'仅付费可用':'限时免费'
        this.aloneScene = this.choosedItem.shot == 1?'特写':this.choosedItem.shot == 2?'近景':this.choosedItem.shot == 3?'中景':this.choosedItem.shot == 4?'远景':'全景'
        this.aloneColor = this.choosedItem.color
        if(this.aloneColor != null){
          if(this.aloneColor === '红') {
            this.choosedTag.colorType = 0
          } else if(this.aloneColor === '橙') {
            this.choosedTag.colorType = 1
          }else if(this.aloneColor === '黄') {
            this.choosedTag.colorType = 2
          }else if(this.aloneColor === '绿') {
            this.choosedTag.colorType = 3
          }else if(this.aloneColor === '青') {
            this.choosedTag.colorType = 4
          }else if(this.aloneColor === '紫') {
            this.choosedTag.colorType = 5
          }else if(this.aloneColor === '黑') {
            this.choosedTag.colorType = 6
          }
        }
        this.choosedItem.customs!=null?this.aloneCustoms = this.choosedItem.customs:''
        this.choosedItem.industry!=null?this.aloneindustry = this.choosedItem.industry:''
        this.playerOptions.sources[0].src = item.url.split('?')[0]
      },
      chooseItemColor(item,index) {
        this.choosedTag.colorType = index
        this.choosedItem.color = item.name
        item.choosed = !item.choosed
      },
      closeItemDetail() {
          this.choosedItem = {}
      },
      // 高级搜索
      Advancedsearch() {
        this.searchBtn = true
        this.AdvancedsearchVisible = true
      },
      // 点击基本类型
      basetypeClick(item,index) {
        this.choosedTag.baseType = index
        this.searchInfo.type = index
        this.baseTypeItem = item
      },
      // 点击收费类型
      payClick(item,index) {
        this.choosedTag.payTag = index
        this.searchInfo.vip = index
        this.payTypeItem = item
      },
      // 点击行业名称
      indusClick(item,index) {
        item.choosed = !item.choosed
        this.indusTypeArr = this.industryList.filter(val => val.choosed)
      },
      // 点击镜头类型
      lensClick(item,index) {
        item.choosed = !item.choosed
        this.lensTypeArr = this.lensList.filter(val => val.choosed)
      },
      // 点击景别类型
      sceneClick(item,index) {
        item.choosed = !item.choosed
        this.sceneTypeArr = this.scene.filter(val => val.choosed)
      },
      // 点击颜色列表
      colorClick(item,index){
        this.choosedTag.colorType = index
        this.searchInfo.color = item.name
        item.choosed = !item.choosed
      },
      // 展开搜索列表
      openSearch() {
        this.openSearchList = true
      },
      // 取消高级搜索
      cancelSearch() {
        this.clearSearchArr()
        this.searchBtn = false
        this.openSearchList = false
        this.AdvancedsearchVisible = false
      },
      // 确定高级搜索
      sureSearch() {
        this.searchArr = []
        this.openSearchList = false
        this.AdvancedsearchVisible = false
        // 展示数据
        JSON.stringify(this.baseTypeItem)=='{}'?'':this.searchArr.push(this.baseTypeItem)
        JSON.stringify(this.payTypeItem)=='{}'?'':this.searchArr.push(this.payTypeItem)
        this.sceneTypeArr.length<=0?'':this.searchArr = this.searchArr.concat(this.sceneTypeArr)
        this.lensTypeArr.length<=0?'':this.searchArr = this.searchArr.concat(this.lensTypeArr)
        this.indusTypeArr.length<=0?'':this.searchArr = this.searchArr.concat(this.indusTypeArr)
        this.search()
      },
      // 清空搜索条件组
      clearSearchArr() {
        // 清空请求参数
        this.searchInfo.type=''
        this.searchInfo.shot=[]
        this.searchInfo.vip=''
        this.searchInfo.industry=[]
        this.searchInfo.lens=[]
        // 清空源数据
        this.choosedTag.baseType = -1
        this.choosedTag.payTag = -1
        this.industryList.forEach(ele => {
          ele.choosed = false
        })
        this.lensList.forEach(ele => {
          ele.choosed = false
        })
        this.scene.forEach(ele => {
          ele.choosed = false
        })
        // 清空中转数据
        this.baseTypeItem = {}
        this.payTypeItem = {}
        this.sceneTypeArr = []
        this.lensTypeArr = []
        this.indusTypeArr = []
        // 清空展示数据
        this.searchArr = []
        this.search()
      },
      // 删除搜索条件
      deleteSearchItem(item,index) {
        if(item.name == this.baseTypeItem.name) {
          this.choosedTag.baseType = -1
          this.searchInfo.type = ''
          this.baseTypeItem = {}
        }  else if(item.name == this.payTypeItem.name) {
          this.choosedTag.payTag = -1
          this.searchInfo.vip = ''
          this.payTypeItem = {}
        } else {
          this.lensTypeArr.forEach((ele,index) => {
            if(ele.name == item.name) {
              this.lensTypeArr.splice(index,1)
              item.choosed = false
            }
          })
          this.indusTypeArr.forEach((ele,index) => {
            if(ele.name == item.name) {
              this.indusTypeArr.splice(index,1)
              item.choosed = false
            }
          })
          this.sceneTypeArr.forEach((ele,index) => {
            if(ele.name == item.name) {
              this.sceneTypeArr.splice(index,1)
              item.choosed = false
            }
          })
        }
        this.searchArr.splice(index,1)
        this.search()
      },
      // 搜索
      search() {
        this.loadingData = true
        const that = this
        // that.searchArr = []
        // 基础配置
        if(that.type == 0) {
          that.searchInfo.live = 'up'
        } else {
          that.searchInfo.live = 'down'
        }
        that.searchInfo.pageSize = that.pageSize
        that.searchInfo.pageNum = that.pageNum
        that.searchInfo.keywords = that.inputInfo
        if(that.searchInfo.sortField == '') {
          that.searchInfo.sortField = 'create_time'
        }
        that.searchInfo.lens=[]
        that.searchInfo.industry=[]
        that.searchInfo.shot=[]
        // 请求参数
        that.lensTypeArr.forEach(ele => {
          that.searchInfo.lens.push(ele.name)
        })
        that.indusTypeArr.forEach(ele => {
          that.searchInfo.industry.push(ele.name)
        })
        that.sceneTypeArr.forEach(ele => {
          that.searchInfo.shot.push(ele.id)
        })
        // 发起请求
        that.$request.put("/oms/v1/lens",that.searchInfo).then(res => {
          if(res.status == 200&&res.data.data == null) {
            that.$message({
              duration:1000,
              type:'success',
              message:'没有找到您想搜索的数据，请重新搜索'
            })
            that.contentList = []
            that.total = 1
            that.loadingData = false
          } else if(res.status == 200&&res.data != null) {
            // that.$message({
            //   duration:1000,
            //   type:"success",
            //   message:"数据请求成功"
            // })
            that.contentList = res.data.data.info.list
            that.contentList.forEach(ele => {
              that.$set(ele,'choosed',false)
              if(ele.type == 1) {
                  let imgUrl = ele.url+'?x-oss-process=video/snapshot,t_5000,w_240,h_135,f_jpg'
                  that.$set(ele,'url',imgUrl)
              }
            })
            that.total = res.data.data.info.total
            that.loadingData = false
          }
        })
      },
      // 添加自定义标签
      closeTag(tag) {
        this.aloneCustoms.splice(this.aloneCustoms.indexOf(tag), 1);
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
          this.aloneCustoms.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      // 取消
      canceleditItem() {
        this.detailDialog = false
        this.onPlayerPause()
      },
      // 上架
      toShelf(item) {
        let _this = this;
        var toUpList = [];
        if (this.isMutiChoose) {
          this.selectedArr.forEach(element => {
            toUpList.push(element.id);
          });
        } else {
          this.choosedItem = item
          toUpList.push(item.id);
        }
        this.$request
        .patch("/oms/v1/lens/up", toUpList)
        .then(response => {
          if (response.data.errorCode == 200) {
            this.$message({
              duration:1000,
              type: "success",
              message: "上架成功!"
            });
              _this.selectedArr = [];
            if(this.shelfRadio == 1) {
              _this.getUnshelfData();
            } else {
              _this.getShelfData();
            }
            this.detailDialog = false;
          } else {
            this.$message({
              type: "warning",
              message: "上架失败!"
            });
          }
        });
        this.onPlayerPause()
        this.isMutiChoose = false
      },
      // 下架
      toUnShelf(item) {
        let _this = this;
        var toDownList = [];
        if (this.isMutiChoose) {
          this.selectedArr.forEach(element => {
            toDownList.push(element.id);
          });
        } else {
          toDownList.push(item.id);
        }
        this.$request.put("/oms/v1/lens/down", toDownList).then(() => {
          this.$confirm(
            "下架已选中的项将会导致平台中用户无法购买，了解下架风险后，是否还需要下架？",
            "下架商品确认",
            {
              confirmButtonText: "下架",
              cancelButtonText: "取消",
              roundButton: true,
              type: "error",
              center: true
            }
          ).then(() => {
            this.$request
              .patch("/oms/v1/lens/down", toDownList)
              .then(response => {
                if (response.data.errorCode == 200) {
                  this.$message({
                    duration:1000,
                    type: "success",
                    message: "下架成功!"
                  });
                  _this.selectedArr = [];
                  if(this.unshelfRadio == 1) {
                    _this.getShelfData();
                  } else {
                    _this.getUnshelfData();
                  }
                  this.detailDialog = false;
                } else {
                  this.$message({
                    type: "warning",
                    message: "下架失败!"
                  });
                }
              });
          })
        });
        this.isMutiChoose = false
        this.onPlayerPause()
        this.selectedArr.forEach(ele => {
          ele.choosed = false
        })
      },
      // 更新
      aloneItemRefresh() {
        let paramater = {
          id: this.choosedItem.id,
          industries: this.aloneindustry,
          lens:this.choosedItem.lens,
          name: this.choosedItem.name,
          price: this.choosedItem.price,
          color:this.aloneColor,
          vip: this.alonepay=='会员免费'?0:this.alonepay=='会员专享'?1:this.alonepay=='仅付费可用'?2:3,
          customs:this.aloneCustoms,
          shot:this.aloneScene=='特写'?1:this.aloneScene=='近景'?2:this.aloneScene=='中景'?3:this.aloneScene=='远景'?4:5
        }
        this.$request
        .patch("oms/v1/lens", paramater)
        .then(response => {
          if(this.type == 0) {
            this.getShelfData()
          } else if (this.type == 1) {
            this.getUnshelfData()
          }
        });
        this.detailDialog = false
        this.onPlayerPause()
      },
      // 删除
      toDelete(item) {
        const _this = this
        let paramater = []
        if(this.isMutiChoose) {
          this.selectedArr.forEach(ele => {
            paramater.push(ele.id)
          })
        } else {
          paramater.push(item.id)
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$request.delete('/oms/v1/lens',paramater).then(res => {
              if(res.status == 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                _this.getUnshelfData()
                // 2.关闭遮罩层
                this.showcontain = false;
                this.isMutiChoose = false
              }
            })
          }).catch(() => {

          })
          this.selectedArr.forEach(ele => {
            ele.choosed = false
          })
      },
      // 修改
      modify() {
        let _this = this;
        // 将要修改的值重新赋值给currentItem对应的字段
        var modiftyarr = [];
        _this.selectedArr.forEach(element => {
          modiftyarr.push({
            id: element.id,
            industries: _this.aloneindustry,
            vip: _this.alonepay,
          });
        });
        _this.$request
          .patch("oms/v1/materials/lens", modiftyarr)
          .then(response => {
            _this.contentmain = false;
            _this.selectedArr = [];
            if(_this.type == 0) {
              _this.getShelfData()
            } else {
              _this.getUnshelfData()
            }
          });
          _this.aloneindustry =[]
          _this.alonepay = ''
          _this.selectedArr.forEach(ele => {
            ele.choosed = false
          })
      },
      copyUrl() {
        var copy = document.getElementById('test')
        copy.select()
        document.execCommand('Copy');
        alert('复制成功')
      },
      // 排序
      sort() {
        if(this.screenType == '最新上传') {
          this.searchInfo.sortField = 'create_time'
        } else {
          this.searchInfo.sortField = 'update_time'
        }
        this.search()
      },
      // ======视频播放
      onPlayerPlay(player) {
      },
      onPlayerPause(player){
      },
    },
    components:{
      toptab,
      contentcard,
      videoPlayer,
    },
    mounted(){
      this.getradio()
      this.getShelfData()
      this.getUnshelfData()
      this.getIndustry()
      this.getlensList()
      this.type = 0
    },
    computed:{
      player() {
        return this.$refs.videoPlayer.player
      },
    }
  }
</script>

<style scoped>
  .matterPage >>> .el-input__inner {
    border: 0;
    border-radius: 0;
    width: 110px;
    height: 20px;
    /* color: #14E293; */
    color: #101010;
    padding-right: 20px;
  }
  .matterPage >>> .el-input__suffix {
    right: 0;
  }
  .matterPage >>> .el-input__icon {
    line-height: 20px;
  }
  .matterPage >>> .el-select-dropdown__item.selected {
    color: #14E293;
  }
  .el-icon-circle-close {
    color: #14E293;
    cursor: pointer;
    vertical-align: center!important;
  }
  /* 高级搜索遮罩层 */
  .searchDialog >>> .el-dialog {
    width: 565px;
  }
  .searchDialog.open >>> .el-dialog {
    width: 880px;
  }
  .searchDialog >>> .el-dialog__header {
    display: none;
  }
  .searchDialog >>> .el-dialog__body {
    padding: 0;
    width: 100%;
  }
  .detailDialog >>> .el-dialog {
    width: 500px;
  }
  .detailDialog >>> .el-tag {
    background-color: #14E293;
    color: #fff;
    width: 64px;
    margin: 2px 25px 2px 0;
  }
  
  .detailDialog >>> .el-tag__close.el-icon-close {
    background-color: #fff;
    border: 1px solid #14e293;
    color:#14E293;
    margin-left: 5px;
    right: -5px;
  }
  .detailDialog >>> .el-select__tags-text {
    display: inline-block;
    text-align: center;
    width: 48px;
  }
  .detailDialog >>> .el-tag span{
    display: inline-block;
    text-align: center;
    width: 48px;
  }
  .detailDialog >>> .el-dialog__header {
    display: none;
  }
  .detailDialog >>> .el-dialog__body {
    padding: 0;
    width: 100%;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
    border-bottom: 1px solid #bbb;
  }
  .button-new-tag {
    width: 65px;
    height: 25px;
    line-height: 25px;
    margin: 2px 25px 2px 0;
    background-color: #14E293;
    border: 0;
    color: #fff;
    vertical-align: middle;
    position: relative;
  }
  .button-new-tag >>> span {
    position: absolute;
    top:0;
    left: 0;
    display: block;
    width: 63px;
    height: 25px;
    line-height: 25px;
    text-align: center;
  }
</style>

<style lang="scss" scoped>
  .matterPage {
    width: 100%;
    height:100%;
    .matterContent {
      width: calc(100% - 120px);
      padding: 0 60px;
      height:calc(100% - 64px);
      background-color: #fff;
      overflow: hidden;
      position: relative;
      .topHandleArea {
        margin-top: 32px;
        width: 100%;
        height: 88px;
        position: relative;
        .unifiedOperation{
          position:absolute;
          width: 100%;
          height: 50px;
          background-color: #14E293;
          top:0;
          left:0;
          z-index:1000;
          .leftarea {
            height: 50px;
            display: inline-block;
            span {
              display: inline-block;
              height: 50px;
              line-height: 50px;
              font-size: 14px;
              margin-left: 10px;
              color: #fff;
              cursor: pointer;
            }
            i {
              font-size: 14px;
              margin-left: 10px;
              color: #fff;
              cursor: pointer;
            }
          }
          .rightarea {
            height: 50px;
            display: inline-block;
            position: absolute;
            right: 0;
             span {
              display: inline-block;
              height: 50px;
              line-height: 50px;
              font-size: 14px;
              margin-right: 20px;
              color: #fff;
              cursor: pointer;
            }
          }
        }
        .inputArea {
          width: 260px;
          height: 35px;
          position: relative;
          margin-top: 8px;
          display: inline-block;
          vertical-align: top;
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
        .search-btn {
          display: inline-block;
          width: 98px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          vertical-align: center;
          font-size: 14px;
          color: rgba(16, 16, 16, 0.5);
          margin-left: 22px;
          margin-top: 8px;
          cursor: pointer;
          &.active {
            color: #14E293;
          }
          
        }
        .Upload-material {
          position: absolute;
          right: 0;
          width: 109px;
          height: 35px;
          line-height: 35px;
          background-color: #14E293;
          color: #fff;
          font-size: 14px;
          text-align: center;
          margin: 0;
          margin-top: 8px;
          padding: 0;
          cursor: pointer;
        }
        .el-select {
          position: absolute;
          right: 0;
          bottom: 0;
          border: 0;
          .el-input__inner {
            border:0;
          }
        }
        .advancedSearchBtn {
          height: 30px;
          margin-top: 10px;
          width: calc(100% - 130px);
          overflow-x: auto;
          .advancedSearchBtn_son {
            height: 30px;
            margin-right: 10px;
            margin-bottom: 10px;
            display: inline-block;
            span {
              display: inline-block;
              height: 30px;
              line-height: 30px;
              border-radius: 2px;
              padding: 0 10px;
              background-color: #14E293;
              color: #FFF;
              font-size: 14px;
              margin-right: 7px;
            }
          }
        }
      }
      .maincontent {
        width: 100%;
        height: calc(100% - 250px);
      }
      .paging {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%)
      }
    }
  }
  .searchDialog {
    .searchHead {
      width: 100%;
      height: 68px;
      line-height: 68px;
      text-align: center;
      font-size: 18px;
      color: #303133
    }
    .searchBody {
      padding: 0 40px;
      width: calc(100% - 80px);
      ul{
        margin: 0;padding: 0;
        li {
          margin-bottom: 15px;
          display: flex;
          .li-title {
            display: inline-block;
            width: 56px;
            height: 20px;
            color: #101010;
            font-size: 14px;
            vertical-align: top;
            
          }
          .li-content {
            margin-left: 24px;
            width: calc(100% - 80px);
            
            span {
              width: 88px;
              height: 35px;
              display: inline-block;
              font-size: 14px;
              color: #bbb;
              border: 1px solid #bbb;
              line-height: 35px;
              border-radius: 2px;
              text-align: center;
              margin-right: 15px;
              margin-bottom: 15px;
              cursor: pointer;
              &.colorcont {
                width: 24px;
                height: 24px;
                margin-right: 15px;
                border-radius: 12px;
                &:nth-child(1) {
                  background-color: #E51C23 ;
                  opacity: 0.5;
                }
                &:nth-child(2) {
                  background-color: #FF9800 ;
                  opacity: 0.5;
                }
                &:nth-child(3) {
                  background-color: #FFF000 ;
                  opacity: 0.5;
                }
                &:nth-child(4) {
                  background-color: #14E293;
                  opacity: 0.5;
                }
                &:nth-child(5) {
                  background-color: #146DE2;
                  opacity: 0.5;
                }
                &:nth-child(6) {
                  background-color: #9E14E2;
                  opacity: 0.5;
                }
                &:nth-child(7) {
                  background-color: #101010;
                  opacity: 0.5;
                }
                &:nth-child(4n) {
                  margin-right: 15px;
                }
                &.active {
                  opacity: 1;
                  border: 1px solid #fff;
                }
              }
              &.active {
                color: #14E293;
                border: 1px solid #14E293;
                background-color: #E7FCF4 ;
              }
              &:nth-child(4n) {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
    .searchFoot {
      width: calc(100% - 80px);
      height: 35px;
      padding: 30px 40px;
      line-height: 95px;
      position: relative;
      display: flex;
      flex-flow: row-reverse nowrap;
      span {
        display: inline-block;
        margin-left: 30px;
        height: 35px;
        line-height: 35px;
        vertical-align: middle;
        cursor: pointer;
        &.reset {
          color: #14E293
        }
        &.define {
          width: 90px;
          background-color: #14E293;
          color: #FFF;
          text-align: center;
          border-radius: 2px
        }
      }
    }
    
  }
  .open {
      .searchBody {
      ul {
        li {
          .li-content {
            span {
              &:nth-child(7n) {
                margin-right: 0;
              }
              &:nth-child(4n) {
                margin-right: 15px;
              }
              
            }
          } 
        }
      } 
    }
  }
  .detailDialog {
    .detailTop {
      width: calc(100% - 180px);
      height: 280px;
      padding:0 90px;
      position: relative;
      .detail-title {
        width: 100%;
        height: 56px;
        display: inline-block;
        line-height: 56px;
        text-align: center;
        font-size: 16px;
        color: #101010;
        span {
          display: inline-block;
          max-width: calc(100% - 40px);
          height: 20px;
          line-height: 20px;
          overflow: hidden;
        }
        .chooseNameinput {
          border: 0;
          height: 21px;
          width: 100%;
          line-height: 21px;
          font-size: 16px;
          border-bottom: 1px solid #bbb;
          outline: none;
        }
        .el-icon-edit {
          vertical-align: middle
        }
      }
      .picture {
        width: 100%;
        height: 180px;
        background-color: #bbb;
      }
      .video {
        width: 100%;
        height: 180px;
        background-color: #bbb;
      }
      .bottomInfo {
        width: 100%;
        height: 46px;
        line-height: 46px;
        position: relative;
        color: #bbb;
        .el-icon-document-copy {
          font-size: 18px;
        }
        .copySrc {
          position: absolute;
          left: 50%;
          transform: translateX(-50%)
        }
        .videolength {
          position: absolute;
          right: 0;
        }
      }
    }
    .detailBody {
      width: calc(100% - 60px);
      padding: 0 30px;
      .detailBody-title {
        display: inline-block;
        width: 100%;
        height: 30px;
        line-height: 20px;
        color: #101010;
        font-size: 14px;
        text-align: left;
        border-bottom: 1px solid #f1f1f1;
      }
      .detailBody-content {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 20px;
        .content-li {
          width: 100%;
          // height: 20px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          .el-select {
            .el-tag {
              background-color: #14E293
            }
            &.indusselect {
              width: 390px;
            }
          }

        }
        .content-title {
          display: inline-block;
          color: #bbb;
          height: 20px;
          line-height: 20px;
          vertical-align: top
        }
        .content-color {
          height: 20px;
          line-height: 20px;
          span {
            display:inline-block;
            width: 24px;
            height: 24px;
            margin-right: 15px;
            border-radius: 12px;
              &:nth-child(1) {
                background-color: #E51C23 ;
                opacity: 0.5;
              }
              &:nth-child(2) {
                background-color: #FF9800 ;
                opacity: 0.5;
              }
              &:nth-child(3) {
                background-color: #FFF000 ;
                opacity: 0.5;
              }
              &:nth-child(4) {
                background-color: #14E293;
                opacity: 0.5;
              }
              &:nth-child(5) {
                background-color: #146DE2;
                opacity: 0.5;
              }
              &:nth-child(6) {
                background-color: #9E14E2;
                opacity: 0.5;
              }
              &:nth-child(7) {
                background-color: #101010;
                opacity: 0.5;
                margin-right: 0;
              }
              &.active {
                opacity: 1;
                border: 1px solid #fff;
              }
          }
          
        }
        .detail_taglist {
          width: 390px;
        }
      }
    }
    .detailFoot {
      padding: 30px;
      width: calc(100% - 60px);
      height: 35px;
      display: flex;
      flex-flow: row-reverse nowrap;
      span {
        display: inline-block;
        height: 35px;
        line-height: 35px;
        font-size: 14px;
        text-align: center;
        margin-left: 25px;
        cursor: pointer;
        &.reset {
          width: 90px;
          background-color: #14E293;
          color: #fff;
        }
        &.toUp {
          color: #14E293;
        }
        &.toDown {
          color: #14E293;
        }
      }
    }
  }
  .modifyattribute {
    width: 100%;
    ul {
      margin: 0;
      padding: 0 25px;
      list-style: none;
      margin-bottom: 10px;
      li {
        margin: 20px 0;
        padding: 0;
        span {
          &.attribute_title {
            font-size: 14px;
            color: #000;
            margin-right: 20px;
            font-weight: 400px;
            vertical-align: top;
          }
        }
        .el-select {
            width: 300px;
        }
        &:last-child {
          text-align: center;
        }
      }
      
    }
}


</style>

