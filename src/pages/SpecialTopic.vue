<template>
  <div class="special">
    <div class="main_body">
      <!-- 创建专题按钮 -->
      <el-button
        class="createST"
        type="primary"
        plain
        size="small"
        @click="createSpecial">创建专题
      </el-button>
      <!-- 三大块 -->
      <el-tabs v-model="activeName" @tab-click="handleClick" class="st_Tab" >
        <el-tab-pane label="推荐" name="first" class="first">
          <div class="recommendDiv">
            <div class="st_content" >
              <draggable id="operaList_son" class="dra" v-model="recommenedList" @update="datadragEnd" :options = "{animation:500}">
                <div  class="st_content_son" v-for="(value,index) in fillData" :key="index" :class="value.isReal == false?'empty':''">
                    <!-- <div class="st_card" :style="{backgroundImage:'url('+value.url+'?x-oss-process=image/resize,m_fill,w_240,h_135'+')'}"> -->
                    <div class="st_card" :style="{backgroundImage:'url('+value.url+')'}">
                      <span class="sonNum"><a href="javascript:;" class="">{{value.usageCount}}</a>款</span>
                      <span class="operaMainName">{{!value.name?'未命名专题':value.name}}</span>
                    </div>
                    <!-- 2. 遮罩层 -->
                    <div class="st_mask">
                      <el-button 
                        class="viewDetails_btn" 
                        type="primary" 
                        size="small"
                        @click="lookDetail(value)"
                        plain>
                        查看详情
                      </el-button>
                      <el-button 
                        class="remove_btn" 
                        type="primary" 
                        size="small" 
                        @click="removeThis(value)"
                        plain>
                        移除
                      </el-button>
                    </div>
                </div>              
              </draggable>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已上架" name="second" class="second">
          <div class="onShelves">
            <div class="topOperaArea">
              <!-- 搜索框 -->
              <div class="searchPart">
                <el-input placeholder="搜索名字" v-model="searchInfo" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search" @click="searchTopic"></el-button>
                </el-input>
              </div>
              <!-- 按钮区域 -->
              <div class="topOperaBtn">
                <div class="left_btn">
                  <span class="selectedNum" v-if="isMutiChoose">{{this.selectedArr.length}}</span>
                  <span v-if="isMutiChoose">选中</span>
                  <span v-else @click="allChoose">全选</span>
                  <span v-if="isMutiChoose" @click="cancelMulityChoose">取消多选</span>
                  <span v-else @click="mulitipleChoose">多选</span>
                  <span v-if="isMutiChoose" @click="lowerShelf(aloneitem)">下架</span>
                  <span v-if="isMutiChoose" @click="setRecommend(aloneItem)">设为推荐</span>
                  <span v-if="isMutiChoose" @click="revokeRecommend(aloneItem)">取消推荐</span>
                </div>
                <div class="right_btn">
                  <!-- <span>筛选</span>
                  <el-select v-model="screenValue" placeholder="请选择" @change="screenInfo">
                    <el-option
                      width="80%"
                      v-for="(item,index) in screenArr"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select> -->
                  <span>排序</span>
                  <el-select v-model="sortValue" placeholder="请选择" @change="sortInfo">
                    <el-option
                      width="80%"
                      v-for="item in sortArr"
                      :key="item.id"
                      :label="item.value"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="operaLists">
                <!-- 最外围的父盒子 -->
                <div class="around" id="operaList_son">
                  <div  class="operaList_son" v-for="(value,index) in fillData" :class="value.isReal == false?'empty':''" :key="index">
                    <!-- 内容区域 -->
                    <div class="operaList_son_val" @click="chooseThis(value)" >
                      <!-- 图片放背景图 + oss控制宽度 -->
                      <!-- <div class="operaMain" :style="{backgroundImage:'url('+value.url+'?x-oss-process=image/resize,m_fill,w_240,h_135'+')'}"> -->
                      <div class="operaMain" :style="{backgroundImage:'url('+value.url+')'}">
                        <span class="st_card_chooseLabel" v-show="value.recommend == 1">精选推荐</span>
                        <span class="sonNum"><a href="javascript:;" class="">{{value.usageCount}}</a>款</span>
                        <span class="operaMainName">{{!value.name?'未命名专题':value.name}}</span>
                      </div>
                    </div>
                    <!-- 遮罩层 -->
                    <div class="operaMaskFather" v-show="!value.modal">
                      <div class="operaMask" v-show="!isMutiChoose">
                        <el-button size="small" v-show="isMutiChoose == false" round @click="lookDetail(value)">修改</el-button>
                        <el-button size="small" v-if="isMutiChoose == false && value.recommend == 0 || value.recommend == null" round @click="setRecommend(value)">设为推荐</el-button>
                        <el-button size="small" v-if="isMutiChoose == false && value.recommend == 1" round @click="revokeRecommend(value)">取消推荐</el-button>
                        <el-button size="small" v-show="isMutiChoose == false" round @click="lowerShelf(value)">下架</el-button>
                      </div>
                    </div>
                    <div class="beSelected" v-show="value.modal">
                      <i class="el-icon-check"></i>
                    </div>
                  </div>
                </div>
                
              </div>
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="未上架" name="third" class="third">
          <div class="noShelves">
            <div class="topOperaArea">
              <!-- 搜索框 -->
              <div class="searchPart">
                <el-input placeholder="搜索名字" v-model="searchInfo" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search" @click="searchTopic"></el-button>
                </el-input>
              </div>
              <!-- 按钮部分 -->
              <div class="topOperaBtn">
                <div class="left_btn">
                  <span class="selectedNum" v-if="isMutiChoose">{{this.selectedArr.length}}</span>
                  <span v-if="isMutiChoose">选中</span>
                  <span v-else @click="allChoose">全选</span>
                  <span v-if="isMutiChoose" @click="cancelMulityChoose">取消多选</span>
                  <span v-else @click="mulitipleChoose">多选</span>
                  <span v-if="isMutiChoose" @click="upperShelf(value)">上架</span>
                  <span v-if="isMutiChoose" @click="deleteChoose(selectedArr)">删除</span>
                </div>
                <div class="right_btn">
                  <!-- <span>筛选</span>
                  <el-select v-model="screenValue" placeholder="请选择" @change="screenInfo">
                    <el-option
                      width="80%"
                      v-for="(item,index) in screenArr"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select> -->
                  <span>排序</span>
                  <el-select v-model="sortValue" placeholder="请选择">
                    <el-option
                      width="80%"
                      v-for="item in sortArr"
                      :key="item.id"
                      :label="item.value"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>  
              </div>
              <div class="operaLists">
                <!-- 最外围的父盒子 -->
                <div class="around" id="operaList_son">
                  <div class="operaList_son" v-for="(value,index) in fillData" :class="value.isReal == false?'empty':''" :key="index">
                  <!-- 内容区域 -->
                  <div class="operaList_son_val" @click="chooseThis(value)" >
                    <!-- 图片放背景图 + oss控制宽度 -->
                    <!-- <div class="operaMain" :style="{backgroundImage:'url('+value.url+'?x-oss-process=image/resize,m_fill,w_240,h_135'+')'}">
                     -->
                    <div class="operaMain" :style="{backgroundImage:'url('+value.url+')'}">
                      <span class="sonNum"><a href="javascript:;" class="">{{value.usageCount}}</a>款</span>
                      <span class="operaMainName">{{!value.name?'未命名专题':value.name}}</span>
                    </div>
                    
                  </div>
                  <!-- 遮罩层 -->
                  <div class="operaMaskFather" v-show="!value.modal">
                    <div class="operaMask"  v-show="!isMutiChoose">
                      <el-button size="small" v-show="isMutiChoose == false" round @click="lookDetail(value)">编辑</el-button>
                      <el-button size="small" v-show="isMutiChoose == false" round @click="deleteChoose(value)">删除</el-button>
                      <el-button size="small" v-show="isMutiChoose == false" round @click="upperShelf(value)">上架</el-button>
                    </div>
                  </div>
                  <div class="beSelected" v-show="value.modal">
                    <i class="el-icon-check"></i>
                  </div>
                </div>
                </div>
                
              </div>
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
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 专题详情 -- 基础信息 -->
      <el-dialog
        class="showDetails"
        title="专题详情"
        :visible.sync="baseInfoVisible"
        width="100%"
        top="70px"
        center>
        <div class="detailHead">
          <div  slot="content" class="detail_bgImg" :style="{backgroundImage: 'url('+selectedItem.url+'?x-oss-process=image/resize,m_fill,w_240,h_135'+')'}">
            <div class="uploadCover">
                <PiUpload class="upload-pic" @uploadsuccess="markupdated" @uploadfail="markfailed">
                  <div slot="content" >
                    <el-button>更新封面</el-button>
                  </div>
                </PiUpload>
            </div>
              
          </div>
          <div class="detail_Info">
            <ul>
              <li class="newTopicName">
                <span>专题名字：</span>
                <el-input style="width:25%" v-model="selectedItemName"></el-input>
              </li>
              <li>
                <span>专题类型：</span>
                <span>主题视频</span>
              </li>
            </ul>
            <el-button v-show="aloneDetail.length != 0" class="addMore" type="primary" size="small" plain @click="addMoreMatter(selectedItem)">添加</el-button>
          </div>
        </div>
        <div class="detailBody_parent">
          <div class="around">
            <el-button class="chooseSpecialInfo" v-show="aloneDetail.length == 0" @click="addMoreMatter">选择专题内容</el-button>
            <div class="detail son" v-for="(val,index) in aloneDetail" :key="index">
              <div class="detail son_val">
                <!-- 素材背景图 -->
                <div class="detail son_Img" :style="{backgroundImage:'url('+val.url+'?x-oss-process=video/snapshot,t_1000,f_jpg,w_240,h_135'+')'}"></div>
                <!-- 素材信息部分 -->
                <div class="detail son_Info">
                  <div class="detail son_Info_left">{{!val.name?'未命名素材':val.name}}</div>
                  <div class="detail son_Info_right">￥{{val.price==0?'免费':val.price}}</div>
                </div>
              </div>
              <div class="detail mask">
                <el-button type="primary" plain @click="removeOneDetail(val)">移除</el-button>
              </div>
            </div>
          </div>
          <div class="footerbtn">
            <el-button @click="baseInfoVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateTopic(selectedItem)">更新</el-button>
          </div>
        </div>
      </el-dialog>
      <!-- 添加信息 -->
      <el-dialog
        :visible.sync="addInfoVisible"
        class="addInfo"
        width="860px"
        top="8vh"
        center>
        <span class="top_title">成片选择</span>
        <div class="choosetemplate">
            <div class="slide">
              <el-row>
                <el-col >
                  <el-menu default-active="1">
                      <el-menu-item index="1">
                        <span slot="title">全部视频</span>
                      </el-menu-item>
                  </el-menu>
                </el-col>
              </el-row>
            </div>
            <div class="chooseTypeArea parent">
              <div class="around">
                <div class="type son" v-for="(value,index) in threeInOne" :key="index"  @click="hasIn(value)">
                  <div class="type son_val"> 
                    <div class="type son_Img" :style="{backgroundImage:'url('+value.url+'?x-oss-process=video/snapshot,t_1000,f_jpg,w_240,h_135'+')'}">
                    </div>
                    <!-- 遮罩 -->
                    <div class="type mask" v-show="value.modal">
                      <i class="el-icon-check"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="contentPage">
                <el-pagination
                  background 
                  layout="prev, pager, next"
                  :total="contentTotal">
                </el-pagination>
              </div>
              <div class="footerBtn">
                <el-button @click="addInfoVisible = false">取消</el-button>
                <el-button type="primary" @click="successAddMatter">确定</el-button>
              </div>
            </div>
        </div>
      </el-dialog>
      <!-- 专题详情 -- 创建专题 -->
      <el-dialog
        class="showDetails"
        title="创建专题"
        :visible.sync="createInfoVisible"
        width="100%"
        top="8vh"
        center>
        <div class="detailHead">
          <div  slot="content" class="detail_bgImg" :style="{backgroundImage: 'url('+selectedItem.url+'?x-oss-process=image/resize,m_fill,w_240,h_135'+')'}">
            <div class="Bitmap" v-show="!selectedItem.url" :style="{backgroundImage: 'url('+Bitmap+')'}"></div>
            <div class="uploadCover">
                <PiUpload class="upload-pic" @uploadsuccess="markupdated" @uploadfail="markfailed">
                  <div slot="content" >
                    <el-button>上传封面</el-button>
                  </div>
                </PiUpload>
            </div>
              
          </div>
          <div class="detail_Info">
            <ul>
              <li class="newTopicName">
                <span>专题名字：</span>
                <el-input style="width:25%" v-model="newName"></el-input>
              </li>
              <li>
                <span>专题类型：</span>
                <span>主题模板</span>
              </li>
            </ul>
            <el-button v-show="aloneDetail.length != 0" class="addMore" type="primary" size="small" plain @click="addMoreMatter(selectedItem)">添加</el-button>
          </div>
        </div>
        <div class="detailBody_parent">
          <div class="around">
            <el-button class="chooseSpecialInfo" v-show="aloneDetail.length == 0"  @click="addMoreMatter">选择专题内容</el-button>
            <div class="detail son" v-for="(val,index) in aloneDetail" :key="index">
              <div class="detail son_val">
                <!-- 素材背景图 -->
                <!-- :style="{backgroundImage:'url('+val.url+'?x-oss-process=image/resize,m_fill,w_240,h_135'+')'}" -->
                <div class="detail son_Img" ></div>
                <!-- 素材信息部分 -->
                <div class="detail son_Info">
                  <div class="detail son_Info_left">{{!val.name?'未命名素材':val.name}}</div>
                  <div class="detail son_Info_right">￥{{val.price==0?'免费':val.price}}</div>
                </div>
              </div>
              <div class="detail mask">
                <el-button type="primary" plain @click="removeOneDetail(val)">移除</el-button>
              </div>
            </div>
          </div>
          <div class="footerbtn">
            <el-button @click="createInfoVisible = false">取 消</el-button>
            <el-button type="primary" @click="successCreateTopic">创建</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import {formatDate} from '@/common/js/date'
import PiUpload from '../components/PiUpload/PiUpload'

export default { 
  // 时间处理
  filters: {
    formatDate(time) {
      time = time 
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  data() {
    return {
      // 遮罩层
      baseInfoVisible:false,
      addInfoVisible:false,
      createInfoVisible:false,
      // 占位图
      Bitmap:'https://molto-pixel-web-static.oss-cn-beijing.aliyuncs.com/images/%E9%A6%96%E9%A1%B5/default-image.svg',
      // 新数据
      newName:'',
      newUrl:'',
      // 数据
      index:'',
      startArr:[],
      endArr:[],
      // 搜索框的值
      searchInfo:'',
      // 排序的值
      screenValue: "",
      // 筛选的值
      sortValue:'',

      // 当前选中值的数组
      selectedArr: [],
      // 单独选中
      selectedItem: {},
      selectedItemName:'',
      // 单独选中元素里边的详情内容
      aloneDetail:[],
      // 被选中的参数
      choosed:false,
      activeName: "first",

      // 新专题
      // 新专题类型
      // 更改姓名的参数
      newTopic:{
        name:'',
        id:'',
        url:''
      },
      // 选择素材时选中的数组
      topicChoosedArr:[],
      // 新专题名字
      newTopicName:'',
      // 新专题内容
      newTopicValue:{
        // 特效镜头
        aeId:[],
        // 正版素材
        materialIds:[],
        topicId:'',
        // 主题视频
        videoThemeId:[]
      },
      // 添加专题内容
      addTopicValue:{
        // 特效镜头
        aeId:[],
        // 正版素材
        materialIds:[],
        topicId:'',
        // 主题视频
        videoThemeId:[]
      },

      // 查看详情数据
      itemName:'',
      
      // 上传素材的参数
      importFileUrl: "https://molto-pixel-res-test.oss-cn-beijing.aliyuncs.com",
      LoadData: {
        key: "",
        policy: "",
        OSSAccessKeyId: "",
        success_action_status: "200", //让服务端返回200,不然，默认会返回204
        callback: "",
        signature: ""
      },
      showFileList: true,
      fileList: [],
      uploadFlag: true,


      // 遮罩层
      seen: false,
      // 分页数据
      pageSize:30,
      pageNum:1,
      total:0,
      contentTotal:0,
      canbeselected:false,
      // 推荐列表
      recommenedList: [],
      // 已上架数据
      shelfList: [],
      // 未上架数据
      unshelfList: [],
      // 模板/素材/镜头数据
      threeInOne:[],
      // 已上架和未上架的公共数据
      isMutiChoose: false,

      // 顶栏公共样式
      active: true,
      screenArr: [
        {
          id: 1,
          name: "全部"
        },
        {
          id: 2,
          name: "正版素材专题"
        },
        {
          id: 3,
          name: "特效镜头专题"
        },
        {
          id: 4,
          name: "主题视频专题"
        }
      ],
      sortArr: [
        {
          id: 1,
          value: "最多浏览"
        },
        {
          id: 2,
          value: "最新更新"
        }
      ],
      rowsNum:0
    };
  },
  components:{
    draggable,
    PiUpload
  },
  computed: {
    fillData(){
       if(this.activeName=='first'){
            let fillNum = this.rowsNum - this.recommenedList.length % this.rowsNum
            fillNum = fillNum === this.rowsNum?0:fillNum
            return this.recommenedList.concat(Array.from({length: fillNum}, (v, i) => {
            return {
                id: Math.floor(Math.random() * 10000),
                isReal: false
            }
            }))
        }else if(this.activeName=='second') {
            let fillNum = this.rowsNum - this.shelfList.length % this.rowsNum
            fillNum = fillNum === this.rowsNum ? 0 : fillNum
            return this.shelfList.concat(Array.from({length: fillNum}, (v, i) => {
            return {
                id: Math.floor(Math.random() * 10000),
                isReal: false
            }
            }))
        }else if(this.activeName == 'third') {
          let fillNum = this.rowsNum - this.unshelfList.length % this.rowsNum
            fillNum = fillNum === this.rowsNum ? 0 : fillNum
            return this.unshelfList.concat(Array.from({length: fillNum}, (v, i) => {
            return {
                id: Math.floor(Math.random() * 10000),
                isReal: false
            }
            }))
        }
    }
  },
  mounted(){
    this.getRecommendData();
    this.getOnShelfData();
    //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    this.rowsNum = Math.floor(document.getElementById('operaList_son').offsetWidth / 240)
  },
  methods: {
    infiniteHandler($state) {
         setTimeout(() => {
              const temp = [];
              for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
                 temp.push(i);
              }
              this.list = this.list.concat(temp);
              $state.loaded();
              $state.complete();
         }, 1000);
    },
    // tab栏切换时的操作
    handleClick(tab) {
      // 发起请求
      if (this.activeName == "first") {
        this.pageNum = 1;
        this.getRecommendData();
        // 请求推荐数据
      } else if (this.activeName == "second") {
        this.pageNum = 1;
        this.getOnShelfData();
        // 请求已上架数据
      } else if (this.activeName == "third") {
        // 请求未上架数据
        this.pageNum = 1
        this.getUnloadedData()
      }
      this.isMutiChoose =false
    },
    // pagesize改变时会触发
    handleSizeChange: function(size) {
      this.pageSize = size;
    },
    // currentchange改变时触发
    handleCurrentChange: function(pageNum) {
      this.pageNum = pageNum;
      if (this.activeName == "first") {
        this.getRecommendData();
      } else if (this.activeName == "second") {
        this.getOnShelfData();
      } else if(this.activeName == "third") {
        this.getUnloadedData()
      }
    },
    CurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.addMoreMatter(this.aloneItem)
    },
    // 搜索信息
    searchTopic() {
      let searchInfo = this.searchInfo
      // 1.判断当前的页面类型
      let typeInfo = this.activeName
      // 2.确定请求参数
      let parameters = {
        pageSize:this.pageSize,
        pageNum:this.pageNum,
        liveStatus:'',
        name:searchInfo
      }
      if(typeInfo == 'second') {
        // this.getOnShelfData()
        parameters.liveStatus = 1
        this.$request.post('/oms/v1/topic/search',parameters).then(res => {
          if(res.status == 200) {
            if(!res.data.data.list.length) {
              this.$message({
                type:'warning',
                message:'未找到您需要的信息，请准确输入专题名字'
              })
            } else {
              this.shelfList = res.data.data.list
            }
          }
        })
      }else if (typeInfo == 'third') {
        this.getUnloadedData()
        parameters.liveStatus = 2
        this.$request.post('/oms/v1/topic/search',parameters).then(res => {
          if(res.status == 200) {
            if(!res.data.data.list.length) {
              this.$message({
                type:'warning',
                message:'未找到您需要的信息，请准确输入专题名字'
              })
            } else {
              this.unshelfList = res.data.data.list
            }
          }
        })
      }
    },
    // 筛选信息
    screenInfo() {
      let topicType = this.screenValue
      let materials = {
        type:'',
        liveStatus:'',
        pageSize:this.pageSize,
        pageNum:this.pageNum
      }
      this.activeName == 'second'? materials.liveStatus = 1:materials.liveStatus = 2
      topicType == '全部'?materials.type = '':topicType == '正版素材专题'?materials.type = 1:topicType == '特效镜头专题'?materials.type = 2:materials.type = 3
      this.$request.post('oms/v1/topic/search',materials).then(res => {
        if(res.status == 200) {
          this.activeName == 'second'?this.shelfList = res.data.data.list: this.unshelfList = res.data.data.list
        }
      })
    },
    // 排序
    sortInfo() {
      let materials = {
        order:'',
        liveStatus:'',
        pageSize:this.pageSize,
        pageNum:this.pageNum
      }
      this.activeName == 'second'?materials.liveStatus = 1: materials.liveStatus = 2 
      this.sortValue == '最多浏览'?materials.order = 'usage_count': materials.order = 'update_time'
      this.$request.post('oms/v1/topic/search',materials).then(res => {
        if(res.status == 200) {
          this.activeName == 'second'?this.shelfList = res.data.data.list: this.unshelfList = res.data.data.list
        }
      })
    },
    // 请求推荐数据
    getRecommendData() {
      const _this = this
      _this.$request.post('/oms/v1/topic/search',{
        liveStatus:1,
        recommend:1,
        pageSize:0,
        pageNum:1
      }).then(response => {
        // 获取到数据
        if(response.data.errorCode == 200) {
          _this.recommenedList = response.data.data.list
        }
      })
    },
    // 请求已上架数据
    getOnShelfData() {
      this.searchInfo = ''
      this.screenValue = ''
      const _this = this
      _this.$request.post('/oms/v1/topic/search',{
        liveStatus:1,
        pageSize:_this.pageSize,
        pageNum:_this.pageNum
      }).then(response => {
        // 获取到数据
        if(response.data.errorCode == 200) {
          _this.shelfList = response.data.data.list
          _this.total = response.data.data.total
        }
      })
    },
    // 请求未上架数据
    getUnloadedData() {
      this.searchInfo = ''
      this.screenValue = ''
      const _this = this
      _this.$request.post('/oms/v1/topic/search',{
        liveStatus:2,
        pageSize:30,
        pageNum:1
      }).then(response => {
        if(response.data.errorCode == 200) {
          _this.unshelfList = response.data.data.list
          _this.total = response.data.data.total
        }
      })
    },
    // 全选
    allChoose() {
      // this.choosed = true;
      if (this.activeName == "second") {
        this.shelfList = this.shelfList.map(val => ((val.canbeselected = true), val))
        this.selectedArr = this.shelfList.map(val => ((val.modal = true), val))
      } else if (this.activeName == "third") {
        this.unshelfList = this.unshelfList.map(val => ((val.canbeselected = true), val))
        this.selectedArr = this.unshelfList.map(val => ((val.modal = true), val));
      }
      this.isMutiChoose = true;
    },
    // 多选
    mulitipleChoose() {
      if (this.activeName == "second") {
        this.shelfList = this.shelfList.map(val => ((val.canbeselected = true), val));
      } else if (this.activeName == "third") {
        this.unshelfList = this.unshelfList.map(
          val => ((val.canbeselected = true), val)
        );
      }
      this.isMutiChoose = true;
    },
    // 取消多选
    cancelMulityChoose() {
      if (this.activeName == "second") {
        this.selectedArr = this.shelfList.map(
          val => ((val.canbeselected = false), val)
        );
        this.selectedArr = this.shelfList.map(val => ((val.modal = false), val));
        this.selectedArr = this.shelfList.filter(val => val.modal);
      } else if (this.activeName == "third") {
        this.selectedArr = this.unshelfList.map(
          val => ((val.canbeselected = false), val)
        );
        this.selectedArr = this.unshelfList.map(
          val => ((val.modal = false), val)
        );
        this.selectedArr = this.unshelfList.filter(val => val.modal);
      }
      this.isMutiChoose = false;
      // this.choosed = false;

    },
    // 单击
    chooseThis(record) {
      if (!record.canbeselected) {
      } else if (record.canbeselected) {
        record.modal = !record.modal;
        if (this.activeName == "second") {
          this.selectedArr = this.shelfList.filter(val => val.modal);
        } else if (this.activeName == "third") {
          this.selectedArr = this.unshelfList.filter(val => val.modal);
        }
      }
    },
    // 下架
    lowerShelf(record) {
      const _this = this
      var toDownList = {
        ids:[],
        operate:"down"
      }
      let aloneItem = record
      let selectedArr = this.selectedArr
      if (this.isMutiChoose) {
        this.selectedArr.forEach(element => {
          toDownList.ids.push(element.id);
        });
      } else {
        toDownList.ids.push(aloneItem.id);
      }
      
      this.$confirm('确定要下架所选商品么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定执行下架操作
        this.$request.put('/oms/v1/topic',toDownList).then(response => {
          // 判断返回值
          response.data.id.forEach(ele => {
            this.shelfList.forEach((element,index) => {
              if(ele == element.id) {
                this.shelfList.splice(index,1)
              }
            })
          })
          if(response.data.errorCode == 200) {
            this.$message({
              type: 'success',
              message: '下架成功!'
            });
          //   // 刷新页面
            this.cancelMulityChoose()
          //   this.getOnShelfData()
            _this.selectedArr = []
          }
        })
       
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作取消'
        });          
      });
     
    },
    // 上架
    upperShelf(record) {
      const _this = this
      var toUpList = {
        ids:[],
        operate:"up"
      }
      let aloneItem = record
      let selectedArr = this.selectedArr
      if (this.isMutiChoose) {
        this.selectedArr.forEach(element => {
          toUpList.ids.push(element.id);
        });
      } else {
        toUpList.ids.push(aloneItem.id);
      }
      this.$confirm('确定要上架所选商品么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.$request.put('/oms/v1/topic',toUpList).then(response => {
          response.data.id.forEach(ele => {
            this.unshelfList.forEach((element,index) => {
              if(ele == element.id) {
                this.unshelfList.splice(index,1)
              }
            })
          })
          if(response.data.errorCode == 200) {
            this.$message({
              type: 'success',
              message: '上架成功!'
            });
            this.cancelMulityChoose()
            // this.getUnloadedData()
            _this.selectedArr = []
          }
        })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消'
          });          
        });
    },
    // 设为推荐
    setRecommend(record) {
      const _this = this;
      var toRecommendList = {
        ids:[],
        operate:"recommend"
      }
      let aloneItem = record
      let selectedArr = this.selectedArr
      if (this.isMutiChoose) {
        this.selectedArr.forEach(element => {
          toRecommendList.ids.push(element.id);
        });
      } else {
        toRecommendList.ids.push(aloneItem.id);
      }
      if (toRecommendList.ids.length == 0) {
        this.$message({
          type:'warning',
          message:'请选择您要操作的专题!'
        })
      } else {
        this.$confirm('确定要将当前专题设为推荐么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$request.put('/oms/v1/topic',toRecommendList)
              .then(response => {
                 response.data.id.forEach(ele=> {
                  this.shelfList.forEach(element=> {
                    if(ele == element.id) {
                      element.recommend = 1
                    }
                  })
                })
                if(response.data.errorCode == 200) {
                  this.$message({
                    type: 'success',
                    message: '推荐成功!'
                  });
                  this.cancelMulityChoose()
                  // this.getOnShelfData()
                  _this.selectedArr = []
                }
              })   
        })
      }
      
    },
    // 取消推荐
    revokeRecommend(record) {
      const _this = this;
      var revokeRecommendList = {
        ids:[],
        operate:"unRecommend"
      }
      let aloneItem = record
      let selectedArr = this.selectedArr

      if (this.isMutiChoose) {
        this.selectedArr.forEach(element => {
          revokeRecommendList.ids.push(element.id);
        });
      } else {
        revokeRecommendList.ids.push(aloneItem.id);
      }
      if (revokeRecommendList.ids.length == 0) {
        this.$message({
          type:'warning',
          message:'请选择您要操作的专题!'
        })
      } else {
        this.$confirm('确定要将当前专题取消推荐么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$request.put('/oms/v1/topic',revokeRecommendList)
              .then(response => {
                response.data.id.forEach(ele=> {
                  this.shelfList.forEach(element=> {
                    if(ele == element.id) {
                      element.recommend = 0
                    }
                  })
                })
                if(response.data.errorCode == 200) {
                  this.$message({
                    type: 'success',
                    message: '取消推荐成功!'
                  });
                  this.cancelMulityChoose()
                //   this.getOnShelfData()
                  _this.selectedArr = []
                 }
              })   
        })
      }  
    },
    // 创建专题
    createSpecial() {
      this.createInfoVisible = true
      this.selectedItem = {
        url:'',
      }
    },
    // 创建专题 -- 结束选型，开始定内容
    finishChooseType() {
      // 打开专题主页
      this.createInfoVisible = true
      let newInfo = {
        type:this.radio =='正版素材'?1:this.radio=='特效镜头'?2:3,
        liveStatus:2
      }
      // 发起请求创建专题
      this.$request.post('/oms/v1/topic',newInfo).then(response => {
        if(response.data.errorCode == 200) {
          this.$message({
            type:'success',
            message:'创建成功，请完善信息！'
          })
          // id赋值
          this.newTopic.id = response.data.data.id;
          this.newTopicValue.topicId = response.data.data.id
        }
      })
    },
    // 创建专题 -- 获取模板/镜头/素材
    getMainMatter(aloneItem) {
      this.selectedArr = []
      this.addTemplateVisible = true
      // 引入类型值
      let radio = this.radio
      let pageInfo = {
        pagesize:this.pageSize,
        pageNum:this.pageNum
      }
      if(radio == '正版素材'){
        this.$request.put('/oms/v1/materials/list/up',pageInfo).then(res => {
          this.threeInOne = res.data.data.info.list
        })
      } else if (radio == '特效镜头') {
        this.$request.put('/oms/v1/lens/list/up',pageInfo).then(res => {
          this.threeInOne = res.data.data.info.list
        })
      } else if (radio == '主题视频') {
        this.$request.put('/oms/v1/themes/list/up',pageInfo).then(res => {
          this.threeInOne = res.data.data.info.list
        })
      }
      this.threeInOne.forEach(element => {
        this.$set(element,'modal',false)
      })
    },
    // 创建专题 -- 选择专题遮罩层点击事件 --- 有Bug
    typechoose(record) {
      const _this = this
      if(record.modal == undefined || record.modal == false) {
        this.$set(record,"modal",true)
      } else {
        this.$set(record,"modal",false)
      }
      this.selectedArr = this.threeInOne.filter(val => val.modal)
    },
    // 创建专题 -- 关闭选择详情遮罩层
    closeChooseTopic() {
      let hash = {}
      if(this.topicChoosedArr.length == 0){
        this.selectedArr.forEach(element => {
          this.topicChoosedArr.push(element)
        })
        // 清空数组
        this.selectedArr = []
      } else if(this.topicChoosedArr.length !=0) {
        this.selectedArr.forEach(element => {
          this.topicChoosedArr.forEach(elementnew => {
            if(elementnew.id != element.id) {
              this.topicChoosedArr.push(element)
            }
          })
        })
        // 去重
        this.topicChoosedArr = this.topicChoosedArr.reduce((preVal,curVal) => {
          hash[curVal.id]?'':hash[curVal.id] = true && preVal.push(curVal)
          return preVal
        },[])
        this.selectedArr = []
      }
      this.addTemplateVisible = false
    },
    // 创建专题 -- 点击确定按钮
    successCreateTopic() {
      // 引入 newTopic  ----   更新名字
      let newTopic = this.newTopic
      // 引入newTopicValue  ---- 更新内容
      let newTopicValue = this.newTopicValue
      // 引入radio  ----  确定放入哪个数组
      this.topicChoosedArr.forEach(element => {
        this.newTopicValue.videoThemeId.push(element.id)
      })
      if(this.newName == '') {
        this.$message({
          type:"error",
          message:"姓名不能为空"
        })
      } else {
        this.$request.post('/oms/v1/topic/edit',newTopic).then(res => {
        })
        this.$request.post('/oms/v1/topic/target',newTopicValue).then(res => {
        })
        // 关闭遮罩层
        this.createNewTopicDialog = false
        // 要清空数组
        this.topicChoosedArr = []
        this.aloneItem = {}
      }
    },
    // 操作专题 -- 查看详情/修改/编辑
    lookDetail(record){
      this.baseInfoVisible = true
      this.selectedItem = record;
      this.selectedItemName = record.name
      let recordType = this.selectedItem.type
      let item = {
        topicId:this.selectedItem.id,
        pageSize:this.pageSize,
        pageNum:this.pageNum
      }
      this.$request.put('/oms/v1/topic/videos',this.selectedItem.id).then(response => {
        console.log(response)
        this.aloneDetail = response.data.data.list
      })
    },
    // 操作专题 -- 添加新素材
    addMoreMatter(record) {
      this.addInfoVisible = true
      let type = record.type
      let pageInfo = {
        pagesize:12,
        pageNum:this.pageNum
      }
      const _this = this
      this.$request.put('/oms/v1/themes/list/up',pageInfo).then(res => {
        this.threeInOne = res.data.data.info.list
        _this.contentTotal = res.data.data.info.total
      })
      // 把遮罩层设置为隐藏
      this.threeInOne.forEach(element => {
        _this.$set(element,"modal",false)
      })
    },
    // 操作专题 -- 新素材点击判断 --- 逻辑上的问题
    hasIn(record) {
     const _this = this
      if(record.modal == undefined || record.modal == false) {
        this.$set(record,"modal",true)
      } else {
        this.$set(record,"modal",false)
      }
      this.selectedArr = this.threeInOne.filter(val => val.modal)
    },
    // 操作专题 -- 完成添加新素材
    successAddMatter(record) {
      let hash = {}
      if(this.aloneDetail.length == 0){
        this.selectedArr.forEach(element => {
          this.aloneDetail.push(element)
        })
        // 清空数组
        this.selectedArr = []
      } else if(this.aloneDetail.length !=0) {
        this.selectedArr.forEach(element => {
          this.aloneDetail.forEach(elementnew => {
            if(elementnew.id != element.id) {
              this.aloneDetail.push(element)
            }
          })
        })
        // 去重
        this.aloneDetail = this.aloneDetail.reduce((preVal,curVal) => {
          hash[curVal.id]?'':hash[curVal.id] = true && preVal.push(curVal)
          return preVal
        },[])
        this.selectedArr = []
      }
      this.addInfoVisible = false
      
    },
    // 操作专题 --  确定修改
    updateTopic(record) {
      this.detailsVisible = false
      let addTopicValue = this.addTopicValue
      addTopicValue.topicId = record.id
      let type = record.type
      let newName = {
        name:this.selectedItemName,
        id:record.id,
        url:record.url
      }
      this.aloneDetail.forEach(element => {
        this.addTopicValue.videoThemeId.push(element.id)
      })
      this.$request.post('/oms/v1/topic/edit',newName).then(res => {
      })
      // 更新内容
      this.$request.post('/oms/v1/topic/target',addTopicValue).then(res => {
        if(res.status == 200) {
          this.$message({
            type:'success',
            message:'数据更新成功'
          })
          this.baseInfoVisible = false
          this.aloneDetail = {}
        }
      })
    },
    // 操作专题 -- 移除专题内某个板块
    removeOneDetail(item) {
      this.$request.delete('/oms/v1/topic/target/',item.id).then(res => {
        this.aloneDetail.forEach((ele,index) => {
          if(ele.id == res.data.id) {
            this.aloneDetail.splice(index,1)
          }
        })
      })
    },
    // 操作专题 -- 从推荐下架
    removeThis(record) {
      let aloneItem = record
      var removeItem = {
        ids:[],
        operate:'unrecommend'
      }
      removeItem.ids.push(aloneItem.id)
      this.$request.put('/oms/v1/topic',removeItem).then(response => {
        if(response.data.errorCode == 200) {
          this.getRecommendData()
        }
      })

    },  
    // 操作专题 -- 删除专题
    deleteChoose(record) {
      var deleteItem = {
        ids:[],
        operate:'delete'
      }
      if(!this.isMutiChoose) {
        deleteItem.ids.push(record.id)
      } else {
        this.selectedArr.forEach(element => {
          deleteItem.ids.push(element.id)
        })
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发起请求
          this.$request.put('/oms/v1/topic',deleteItem).then(response => {
            if(response.data.errorCode == 200) {
              this.$message({
                type:'success',
                message:'删除成功'
              })
              this.getUnloadedData(); 
              this.selectedArr = []
              this.isMutiChoose =false
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 上传
    markupdated(file){
      this.selectedItem.url = file.url
    },
    // 上传失败
    markfailed(err){
      this.$message.error('更新失败')
    },
    getdata (evt) {
    },
    datadragEnd (evt) {
      evt.preventDefault();
      this.index = evt.newIndex
      let moveTopic = {
        id:'',
        moveToSort:''
      }
      moveTopic.id = evt.item._underlying_vm_.id
      moveTopic.moveToSort = this.index+1
      this.$request.patch('/oms/v1/topic',moveTopic).then(res => {
        this.getRecommendData()
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.special {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f7f9f9;
    .el-button.createST {
      position: absolute!important;
      right: 0!important;
      z-index: 200;
      top:25px;
    }
    .main_body {
      position: absolute;
      top: 0;
      left: 20px;
      right: 20px;
      bottom: 0;
      background-color: #fff;
      .recommendDiv {
        width: 100%;
        height: 100%;
        .st_content {
          width: calc(100% - 40px);
          height: calc(100% - 20px);
          padding: 10px 20px;
          .dra {
            width: 100%;
            height: 100%;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            align-content: flex-start;
            overflow-y: auto;
            .st_content_son {
              width: 240px;
              height: 135px;
              position: relative;
              margin: 15px 3px;
              &.empty {
                visibility: hidden;
                width: 240px;
                height: 135px;
              }
              .sonNum {
                position: absolute;
                bottom: 30px;
                left: 10px;
                color: #fff;
                a {
                  text-decoration: none;
                  font-size: 40px;
                  font-weight: 200;
                  color: #fff;
                }
                
              }
              .operaMainName {
                  position: absolute;
                  bottom: 10px;
                  left: 10px;
                  font-size: 20px;
                  color: #fff;
              }
              .st_card {
                width: 240px;
                height: 135px;
                position: relative;
                background-size: 100% 100%;
                .st_card_name {
                  position: absolute;
                  bottom: 40px;
                  right: 10px;
                  font-size: 20px;
                  color: rgb(255, 255, 255);
                }
                .st_card_people {
                  position: absolute;
                  bottom: 20px;
                  right: 10px;
                  color: rgb(255, 255, 255);
                }
                .order_number {
                  position: absolute;
                  top: 10px;
                  left: 10px;
                  display: inline-block;
                  width: 30px;
                  height: 30px;
                  line-height: 30px;
                  border-radius: 15px;;
                  text-align: center;
                  background-color: #fff;
                  color: #101010;
                }
              }
              .st_mask {
                width: 240px;
                height: 135px;
                position: absolute;
                top: 0;
                left: 0;
                background-color: rgba(0,0,0,.5);
                display: none;
                .viewDetails_btn {
                  position: absolute;
                  top:5px;
                  right: 80px;
                }
                .remove_btn {
                  position: absolute;
                  top:5px;
                  right: 10px;
                }
              }
              &:hover .st_mask {
                display: block;
              }
            }
          }
        }
      }
      .onShelves {
        width: 100%;
        height: 100%;
        position: relative;
        .topOperaArea {
          width: 100%;
          height: calc(100% - 70px);
          .searchPart {
            width: calc(100% - 40px);
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
            margin-bottom: 10px;
          }
          .topOperaBtn {
            padding: 0 20px;
            width: calc(100% - 40px);
            height: 40px;
            position: relative;
            margin-bottom: 10px;
            .left_btn {
              height: 40px;
              line-height: 40px;
              display: inline-block;
              span {
                font-size: 14px;
                margin-right: 15px;
                cursor: pointer;
                color: rgba(48, 49, 51, 0.5);
              }
            }
            .right_btn {
              height: 40px;
              display: inline-block;
              position: absolute;
              right: 20px;
              span {
                font-size: 14px;
                margin-right: 15px;
                cursor: pointer;
                color: rgba(48, 49, 51, 0.5);
              }
              .el-select {
                width: 150px;
              }
            }
          }
          .operaLists {
            width: calc(100% - 40px);
            height: calc(100% - 120px);
            padding: 0 20px;
            .around {
              width: 100%;
              height: 100%;
              display: flex;
              flex-flow: row wrap;
              justify-content: space-around;
              align-content: flex-start;
              overflow-y: auto;
              .operaList_son {
                width: 240px;
                height: 135px;
                position: relative;
                margin: 15px 3px;
                &.empty {
                  visibility: hidden;
                  width: 240px;
                  height: 135px;
                }

                .operaList_son_val {
                  width: 240px;
                  height: 135px;
                  .operaMain {
                    width: 100%;
                    height: 100%;
                    background-size: 100% 100%;
                  }
                  .sonNum {
                    position: absolute;
                    bottom: 30px;
                    left: 10px;
                    color: #fff;
                    a {
                      text-decoration: none;
                      list-style: none;
                      font-weight: 200;
                      color: #fff;
                      font-size: 40px;
                    }
                  }
                  .operaMainName {
                    position: absolute;
                    left: 10px;
                    bottom: 10px;
                    font-size: 20px;
                    color: #fff;
                  }
                  .st_card_chooseLabel{
                    position: absolute;
                    display: inline-block;
                    top: 10px;
                    left: 10px;
                    width: 80px;
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    color: #fff;
                    background: #4f97f7;
                    border-radius: 10px;
                    text-align: center;
                  }
                }
                .operaMaskFather {
                  position: absolute;
                  width: 240px;
                  height: 135px;
                  top: 0;
                  left: 0;
                  display: none;
                  background-color: rgba(0,0,0,.5);
                  z-index: 20;
                  .operaMask {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-flow:column nowrap;
                    justify-content: space-around;
                    align-items:center;
                    .el-button {
                      width: 100px;
                      margin: 0;
                    }
                  }
                }
                .beSelected {
                  position: absolute;
                  width: 240px;
                  height: 135px;
                  line-height: 135px;
                  text-align: center;
                  top: 0;
                  left: 0;
                  // display: none;
                  background-color: rgba(0,0,0,.5);
                  z-index: 40;
                  .el-icon-check {
                    font-size: 50px;
                    color: #4f97f7
                  }
                }
                &:hover .operaMaskFather {
                  display: block;
                }
              }
            }
          }
        }
        .paging {
          position: absolute;
          width: 100%;
          height: 50px;
          line-height: 50px;
          padding: 20px 0;
          background-color: #fff;
          bottom: 0;
          text-align: center;
        }
      }
      .noShelves {
        width: 100%;
        height: 100%;
        position: relative;
        .topOperaArea {
          width: 100%;
          height: calc(100% - 70px);
          .searchPart {
            width: calc(100% - 40px);
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
            margin-bottom: 10px;
          }
          .topOperaBtn {
            padding: 0 20px;
            width: calc(100% - 40px);
            height: 40px;
            position: relative;
            margin-bottom: 10px;
            .left_btn {
              height: 40px;
              line-height: 40px;
              display: inline-block;
              span {
                font-size: 14px;
                margin-right: 15px;
                cursor: pointer;
                color: rgba(48, 49, 51, 0.5);
              }
            }
            .right_btn {
              height: 40px;
              display: inline-block;
              position: absolute;
              right: 20px;
              span {
                font-size: 14px;
                margin-right: 15px;
                cursor: pointer;
                color: rgba(48, 49, 51, 0.5);
              }
              .el-select {
                width: 150px;
              }
            }
          }
          .operaLists {
            width: calc(100% - 40px);
            height: calc(100% - 120px);
            padding: 0 20px;
            .around {
              width: 100%;
              height: 100%;
              display: flex;
              flex-flow: row wrap;
              justify-content: space-between;
              align-content: flex-start;
              overflow-y: auto;
              .operaList_son {
                width: 240px;
                height: 135px;
                position: relative;
                margin: 15px 3px;
                &.empty {
                  visibility: hidden;
                  width: 240px;
                  height: 135px;
                }
                .operaList_son_val {
                  width: 240px;
                  height: 135px;
                  .operaMain {
                    width: 100%;
                    height: 100%;
                    background-size: 100% 100%;
                  }
                  .sonNum {
                    position: absolute;
                    bottom: 30px;
                    left: 10px;
                    color: #fff;
                    a {
                      text-decoration: none;
                      list-style: none;
                      font-weight: 200;
                      color: #fff;
                      font-size: 40px;
                    }
                  }
                  .operaMainName {
                    position: absolute;
                    left: 10px;
                    bottom: 10px;
                    font-size: 20px;
                    color: #fff;
                  }
                  .st_card_chooseLabel{
                    position: absolute;
                    display: inline-block;
                    top: 10px;
                    left: 10px;
                    width: 80px;
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    color: #fff;
                    background: #4f97f7;
                    border-radius: 10px;
                    text-align: center;
                  }
                }
                .operaMaskFather {
                  position: absolute;
                  width: 240px;
                  height: 135px;
                  top: 0;
                  left: 0;
                  display: none;
                  background-color: rgba(0,0,0,.5);
                  z-index: 20;
                  .operaMask {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-flow:column nowrap;
                    justify-content: space-around;
                    align-items:center;
                    .el-button {
                      width: 100px;
                      margin: 0;
                    }
                  }
                }
                .beSelected {
                  position: absolute;
                  width: 240px;
                  height: 135px;
                  line-height: 135px;
                  text-align: center;
                  top: 0;
                  left: 0;
                  // display: none;
                  background-color: rgba(0,0,0,.5);
                  z-index: 40;
                  .el-icon-check {
                    font-size: 50px;
                    color: #4f97f7
                  }
                }
                &:hover .operaMaskFather {
                  display: block;
                }
              }
            }
          }
        }
        .paging {
          position: absolute;
          width: 100%;
          height: 50px;
          line-height: 50px;
          padding: 20px 0;
          background-color: #fff;
          bottom: 0;
          text-align: center;
        }
      }
    }
}
// 查看详情遮罩层
.showDetails {
  .detailHead {
    width: 100%;
    height: 135px;
    .detail_bgImg {
      display: inline-block;
      width: 240px;
      height: 135px;
      position: relative;
      vertical-align: middle;
      background-size: 100% 100%;
      .Bitmap {
        width: 240px;
        height: 135px;
        position: absolute;
        z-index: -1;
      }
      .uploadCover {
        position: absolute;
        width: 240px;
        height: 135px;
        top: 0;
        left: 0;
        display: none;
        background-color: rgba(0,0,0,.5);
        .upload-pic {
          width: 100%;
          height: 100%;
          div {
            width: 100%;
            height: 100%;
            position: relative;
          }
          .el-button.el-button--default {
            position: absolute;
            width: 98px;
            height: 40px;
            top: 50%;
            margin-top: -20px;
            left:50%;
            margin-left: -49px;

          }  
        }
        
      }
      &:hover .uploadCover {
          display: block;
        }
    }
    .detail_Info {
      display: inline-block;
      width: calc(100% - 300px);
      height: 100%;
      vertical-align: middle;
      margin-left: 20px;
      position: relative;
      ul {
        margin: 0;
        padding: 0;
      }
      li {
        margin-bottom: 15px;
      }
      .el-button.addMore {
        position: absolute;
        bottom: 0;
        right: 0;
      } 
    }
  }
  .detailBody_parent {
    width: 100%;
    margin-top: 15px;
    height: calc(100% - 150px);
    position: relative;
    .around {
      width: 100%;
      margin-bottom: 10px;
      height: calc(100% - 50px);
      position: relative;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-content: flex-start;
      overflow-y: auto;
      background-color: #f7f9f9;
      .chooseSpecialInfo {
        width: 126px;
        height: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -20px;
        margin-left: -63px;
      }
      .detail.son {
        width: 240px;
        height: 135px;
        position: relative;
        margin: 10px 28px 10px 0;
        overflow-y: auto;
        .detail.son_val {
          width: 100%;
          height: 100%;
          position: relative;
          .detail.son_Img {
            width: 100%;
            height: 100%;
            background-size:100% 100%;
          }
          .detail.son_Info {
            position: absolute;
            width: 100%;
            height: 30px;
            line-height: 30px;
            bottom: 0;
            color: #fff;
            background-color: rgba(0,0,0,.3);
            .son_Info_left {
              display: inline-block;
              margin-left: 10px;
            }
            .son_Info_right {
              display: inline-block;
              float: right;
              text-align: right;
              margin-right: 10px;
            }
          }
        }
        .mask {
          position: absolute;
          width: 100%;
          height: 100%;
          line-height: 135px;
          text-align: center;
          top: 0;
          left: 0;
          background-color: rgba(0,0,0,.5);
          display: none;
        }
        &:hover .mask{
          display: block;
        }
      }
    }
    .footerbtn {
      position: absolute;
      width: 200px;
      height: 40px;
      line-height: 40px;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      left: 50%;
      margin-left: -100px;
      .el-button {
        margin: 0;
      }
    }
  }
}
.addInfo {
  .top_title {
    display: inline-block;
    width: calc(100% - 30px);
    height: 72px;
    line-height: 72px;
    font-size: 16px;
    color: #333333;
    padding-left: 30px;
  }
  .choosetemplate {
    width: 860px;
    height: 468px;
    .slide {
      width: 150px;
      height: 100%;
      float: left;
      // vertical-align: top;
      background-color: #f2f2f2;
      }
      .parent {
        float: right;
        vertical-align: top;
        height: 468px;
        width: 670px;
          padding: 0 20px;
        .around {
          width: 100%;
          height: 310px;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-around;
          align-content: flex-start;
          overflow-y: auto;
          .son {
            width: 160px;
            height: 90px;
            margin-top: 10px;
            background-color: #ccc;
            position: relative;
              .son_Img {
                width: 100%;
                height: 100%;
                background-size:100% 100%;
              }
              .son_val {
                  width: 100%;
                  height: 100%;
              }
              .mask {
                width: 160px;
                height: 90px;
                line-height: 90px;
                text-align: center;
                font-size: 60px;
                color: #fff;
                background-color: rgba(51,51,51,.5);
                position: absolute;
                top: 0;
                left: 0;
              }
          }
        }
        .contentPage {
          margin-top: 25px;
          text-align: center;
        }
        .footerBtn {
          width: 100%;
          margin-top: 40px;
          text-align: center;
        }
      } 
  }
  
}
</style>

<style scoped>
.special >>> .st_Tab.el-tabs.el-tabs--top {
  width: 100%;
  height: 100%;
}
.special >>> .el-tabs__header.is-top {
  background-color: #f7f9f9;
  height:64px;
}
.special >>>  .el-tabs__nav-wrap.is-top {
  height: 100%;
}
.special >>> .el-tabs__nav.is-top {
  background-color: #fff;
  margin-left: 50%;
  height: 64px;
  line-height: 64px;
  transform: translateX(-50%)!important;
}
.special >>>  .el-tabs__item {
  padding: 0;
  margin-right: 100px;
  color:rgba(16,16,16,.49)
}
.special >>> .el-tabs__nav.is-top div:last-child {
  margin-right: 0;
}
.special >>> .el-tabs__nav-scroll {
  height: 100%;
}
.special >>> .el-tabs__nav-wrap::after {
  height: 0;
}
.special >>> .el-tabs__active-bar.is-top {
  background-color: #14E293;
  height: 0!important;
}
.special >>>  .el-tabs__item:hover {
  color:rgba(16,16,16,.49)
}
.special >>>  .el-tabs__item.is-top.is-active {
  color:#010101;
  border-bottom: 2px solid #14e293
}
.special >>> .el-tabs__content {
  width: 100%;
  height: calc(100% - 55px);
}
.special >>>  .el-tab-pane.first {
  width: 100%;
  height: 100%;
}
.special >>> .el-tab-pane.second {
  width: 100%;
  height: 100%;
}
.special >>> .el-tab-pane.third {
  width: 100%;
  height: 100%;
}
.right_btn >>> .el-input__inner {
  border: 0;
  border-radius: 0;
  /* border-bottom: 1px solid #DCDFE6 */
}
.showDetails >>> .el-dialog.el-dialog--center{
  position: fixed;
  height:calc(100% - 70px)
}
.showDetails >>> .el-dialog__body {
  padding: 10px 20px;
  height: calc(100% - 70px);
}
.addInfo  >>>  .el-dialog__header {
  display: none;
}
.addInfo  >>> .el-dialog__body {
  padding: 0 ;
  height: 540px;
}
.addInfo  >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #14E293
}
.addInfo  >>> .el-pagination.is-background .el-pager li:hover {
  color:#14E293
}
.addInfo  >>> .el-button.el-button--primary {
  background-color: #14E293;
  border: 0;
  color: #fff;
}
.addInfo  >>> .el-button.el-button--primary:hover {
  background-color: rgb(119, 218, 180);
}
.addInfo  >>> .el-button.el-button--default:hover {
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
}

</style>


