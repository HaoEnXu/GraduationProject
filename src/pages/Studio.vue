
<template>
  <div class="studio-setting">
    <div class="main_body">
      <!--工具栏-->
      <div class="studio-tool-box">
        <!-- <div class="studio-title">工作站配置</div> -->
        <div class="studio-search">
          <el-input
            class="studio-input"
            placeholder="搜索插件名字/标签名"
            suffix-icon="el-icon-search"
            v-model="input">
          </el-input>
          <el-button class="studio-add" type="primary" @click="openTool(2)" plain>添加工具</el-button>
        </div>
      </div>
      <!--搜索内容-->
      <div class="studio-search-box">
        <div class="studio-item-box">
          <div class="studio-item" v-for="(item,index) of studioData" :key="index" @click="openTool(1,item)">
            <div class="studio-item-img"><img :src="item.imgUrl" alt="封面图"></div>
            <div class="studio-item-textbox">
              <div class="studio-item-title">{{item.title}}</div>
              <div class="studio-item-detail">
                <span>描述</span>
                <span class="studio-item-text">{{item.detail}}</span>
              </div>
              <div class="studio-item-detail">
                <span>状态</span>
                <span class="studio-item-text">{{item.status}}</span>
              </div>
              <div class="studio-item-detail">
                <span>标签</span>
                <span class="studio-item-text">{{item.tag}}</span>
              </div>
              <div class="studio-item-detail">
                <span>点击事件</span>
                <span class="studio-item-text-2">{{item.event}}</span>
              </div>
              <div class="studio-item-detail">
                <span>转跳链接</span>
                <span class="studio-item-text-2">{{studioData[0].url}}</span>
              </div>
            </div>
          </div>
        </div>
        <!--弹窗-->
        <div class="add-tool-box-mask" v-show="addWinOpen">
          <div class="add-tool-box">
            <i class="el-icon-close" @click="closeWin"></i>
            <div class="add-tool-title">{{toolTitle}}</div>
            <div class="add-tool-text">名称<el-input class="add-tool-name" v-model="toolName" placeholder="必填项"></el-input></div>
            <div class="add-tool-text">描述<el-input class="add-tool-name" v-model="toolDetail" placeholder="必填项"></el-input></div>
            <div class="add-tool-text">
              标签
              <el-select class="add-tool-tag" v-model="toolTip" placeholder="必填项">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="add-tool-text">
              点击事件
              <el-select class="add-tool-event" v-model="toolEvent" placeholder="必填项">
                <el-option
                  v-for="item in events"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="add-tool-text" v-show="toolEvent=='选项2'">
              弹窗提示
              <el-input class="add-tool-jump" v-model="toolHint" placeholder="必填项"></el-input>
            </div>
            <div class="add-tool-text">
              转跳链接
              <el-input class="add-tool-jump" v-model="toolLink" placeholder="必填项, 工具使用链接"></el-input>
            </div>
            <div class="add-tool-text">
              封面图
              <span class="add-tool-img">必填项</span>
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="add-tool-button">
              <el-button class="add-too-button-1" type="primary" round @click="closeWin">完成</el-button>
              <el-button type="primary" round @click="closeWin">{{onOrOff}}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  data(){
    return{
      input: '',
      studioData:[
        {
          title: '视频在线制作',
          detail: '极简操作，快速生产专业级视频',
          status: '已上线',
          tag:'AI',
          event: '打开跳转',
          url:'https://pix.miototech.com/video-editor',
          imgUrl:'https://molto-pixel-design.oss-cn-beijing.aliyuncs.com/web/%E5%9C%A8%E7%BA%BF%E5%88%B6%E4%BD%9C%40x2.webp'
        },
        {
          title: '动画贴纸制作',
          detail: 'MG动画、动态贴纸绘制神器',
          status: '于2019-12-12 10：00上线',
          tag:'敬请期待',
          event: '打开跳转',
          url:'https://pix.miototech.com/video-editor',
          imgUrl:'https://molto-pixel-design.oss-cn-beijing.aliyuncs.com/web/%E5%8A%A8%E5%9B%BE%E8%B4%B4%E7%BA%B8%402x.webp'
        },
        {
          title: '图文生成视频',
          detail: '上传影像素材，一键生成视频',
          status: '于2019-12-12 10：00上线',
          tag:'会员专享',
          event: '打开跳转',
          url:'https://pix.miototech.com/video-editor',
          imgUrl:'https://molto-pixel-design.oss-cn-beijing.aliyuncs.com/web/%E5%9B%BE%E6%96%87%E7%94%9F%E6%88%90%402x.webp'
        },
        {
          title: '文案生成视频',
          detail: '输入文本，人工智能生成视频',
          status: '于2019-12-12 10：00上线',
          tag:'黑科技',
          event: '打开跳转',
          url:'https://pix.miototech.com/video-editor',
          imgUrl:'https://molto-pixel-design.oss-cn-beijing.aliyuncs.com/web/%E6%96%87%E6%A1%88%E7%94%9F%E6%88%90%402x.webp'
        },
        {
          title: '视频智能压缩',
          detail: '智能算法，高清无损视频压缩',
          status: '于2019-12-12 10：00上线',
          tag:'AI',
          event: '打开跳转',
          url:'https://pix.miototech.com/video-editor',
          imgUrl:'https://molto-pixel-design.oss-cn-beijing.aliyuncs.com/web/%E8%A7%86%E9%A2%91%E5%8E%8B%E7%BC%A9%402x.webp'
        },
        {
          title: '视频格式转换',
          detail: '云端处理，一键完成格式转换',
          status: '于2019-12-12 10：00上线',
          tag:'限时免费',
          event: '打开跳转',
          url:'https://pix.miototech.com/video-editor',
          imgUrl:'https://molto-pixel-design.oss-cn-beijing.aliyuncs.com/web/%E6%A0%BC%E5%BC%8F%E8%BD%AC%E6%8D%A2%402x.webp'
        },
        {
          title: '视频快速剪辑',
          detail: '无需学习，快速剪辑视频素材',
          status: '于2019-12-12 10：00上线',
          tag:'HOT',
          event: '打开跳转',
          url:'https://pix.miototech.com/video-editor',
          imgUrl:'https://molto-pixel-design.oss-cn-beijing.aliyuncs.com/web/%E8%A7%86%E9%A2%91%E5%89%AA%E8%BE%91.webp'
        },
        {
          title: '网络视频搬运',
          detail: '输入链接，直接搬运视频素材',
          status: '于2019-12-12 10：00上线',
          tag:'黑科技',
          event: '打开跳转',
          url:'https://pix.miototech.com/video-editor',
          imgUrl:'https://molto-pixel-design.oss-cn-beijing.aliyuncs.com/web/%E8%A7%86%E9%A2%91%E6%90%AC%E8%BF%90%402x.webp'
        },
        {
          title: '自动添加字幕',
          detail: '上传视频，自动识别添加字幕',
          status: '于2019-12-12 10：00上线',
          tag:'会员专享',
          event: '打开跳转',
          url:'https://pix.miototech.com/video-editor',
          imgUrl:'https://molto-pixel-design.oss-cn-beijing.aliyuncs.com/web/%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0%E5%AD%97%E5%B9%95%402x.webp'
        }
      ],
      addWinOpen: false,
      toolName: '',
      toolDetail: '',
      toolTip: '',
      toolEvent: '',
      toolLink: '',
      toolHint: '',
      toolTitle:'添加工具',
      imageUrl:'',
      onOrOff:'完成并上线',
      options: [{
        value: '选项1',
        label: 'AI'
      }, {
        value: '选项2',
        label: 'HOT'
      }, {
        value: '选项3',
        label: '敬请期待'
      }, {
        value: '选项4',
        label: '黑科技'
      }, {
        value: '选项5',
        label: '限时免费'
      }, {
        value: '选项6',
        label: '会员专享'
      }],
      events: [{
        value: '选项1',
        label: '打开跳转'
      }, {
        value: '选项2',
        label: '弹窗提示'
      }],
    }
  },
  methods:{
    openTool(num,toolData){
      if(num==1){
        this.toolTitle = '修改工具'
        if(toolData.status=='已上线'){
          this.onOrOff = '下线'
        }else{
          this.onOrOff = '完成并上线'
        }
      }else{
        this.toolTitle = '添加工具'
      }
      this.addWinOpen = true
    },
    closeWin(){
      this.addWinOpen = false
    }
  }
}
</script>

<style scoped>
  .studio-setting{
    position: relative;
    width: 100%;
    height: 100%;
    background: #f7f9f9;
  }
  .main_body {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 0;
    padding: 30px;
    height: 100%;
    background-color: #fff;
  }
  .studio-tool-box{
    width: 93%;
    background: #fff;
  }
  .studio-title{
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1px;
  }
  .studio-input{
    margin-right: 30px;
  }
  .studio-search{
    display: flex;
  }
  .studio-item-box{
    margin-top: 20px;
    display: flex;
    height: calc(100% - 110px);
    flex-wrap: wrap;
    flex-direction: row;
    overflow-y: scroll;
  }
  .studio-item-box .studio-item{
    display: flex;
    margin-right: 20px;
    margin-bottom: 20px;
    border: 1px solid #dedede;
    width: 46%;
    cursor: pointer;
  }
  .studio-item-img{
    width: 200px;
    height: 150px;
    margin: 20px 15px;
  }
  .studio-item-img img{
    width: 100%;
    border-radius: 5px;
  }
  .studio-item-textbox{
    margin-top: 20px;
  }
  .studio-item-title{
    letter-spacing: 0.5px;
    margin-bottom: 10px;
  }
  .studio-item-detail{
    margin: 5px 0 7px;
    font-size: 14px;
    color: #10101075;
  }
  .studio-item-text{
    margin-left: 35px;
    color: #000;
  }
  .studio-item-text-2{
    margin-left: 5px;
    color: #000;
  }
  .add-tool-box-mask{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.6);
  }
  .add-tool-box{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    width: 550px;
    border-radius: 5px;
  }
  .add-tool-title{
    margin: 20px;
    text-align: center;
    font-size: 18px;
  }
  .el-icon-close{
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 20px;
  }
  .add-tool-text{
    font-size: 14px;
    letter-spacing: 0.5px;
    font-weight: 300;
    margin-left: 30px;
    margin-bottom: 20px;
  }
  .add-tool-name{
    width: 80%;
    margin-left: 35px;
  }
  .add-tool-tag{
    width: 80%;
    margin-left: 30px;
  }
  .add-tool-event{
    width: 80%;
  }
  .add-tool-jump{
    width: 80%;
  }
  .avatar-uploader  {
    border: 1px dashed #d2d2d2;
    width: 200px;
    height: 150px;
    margin-top: -19px;
    margin-left: 65px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .add-tool-img{
    position: absolute;
    bottom: 170px;
    left: 30px;
    color: #8c939d;
    font-weight: 400;
  }
  .add-tool-button{
    text-align: center;
    margin-bottom: 20px;
  }
  .add-too-button-1{
    margin-right: 25px;
  }
  .add-tool-button .el-button.is-round{
    padding: 6px 20px;
  }
  .studio-search-box{
    height: 95%;
  }
  /* 滚动条 */
  /*滚动条整体样式*/ /*高宽分别对应横竖滚动条的尺寸*/
 .studio-item-box::-webkit-scrollbar {
      width: 8px;
      height: 4px;
  }
  /*滚动条里面小方块*/
  .studio-item-box::-webkit-scrollbar-thumb {
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgba(0, 0, 0, 0.2);
  }
  /*滚动条里面轨道*/
  .studio-item-box::-webkit-scrollbar-track {
     box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
  }
</style>
