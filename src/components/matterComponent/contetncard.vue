<template>
    <div class="content">
        <div class="content-main" id="content-main">
            <div class="content-son" v-for="(item,index) in filldata" :key="index" :class="item.isReal == false?'empty':''" :style="{backgroundImage:'url('+(!item.type?item.previewCoverUrl:(item.type==0?item.url+'?x-oss-process=image/resize,m_fill,w_240,h_135':item.url))+')'}">
                <div class="contetnt-mask" :class="item.choosed == true?'active':''">
                    <i class="un-choosed" v-show="item.choosed == false" @click="chooseItem(item)"></i>
                    <i class="el-icon-success" v-show="item.choosed == true" @click="chooseItem(item)"></i>
                    <i class="el-icon-delete" v-show="item.choosed == false && choosedArr.length == 0 && item.liveStatus == 0" @click="deleteItem(item)"></i>
                    <div class="handleArea" v-show="item.choosed == false && choosedArr.length == 0">
                        <span @click="editItem(item)">编辑</span>
                        <span v-show="type == 1" @click="shelfsItem(item)">上架</span>
                        <span v-show="type == 0" @click="unshelfsItem(item)">下架</span>
                    </div>
                </div>
                <span :class="item.choosed == true?'active':''" class="content-son-name">{{item.name}}</span>
            </div>
            <el-dialog
                title="提示"
                :visible.sync="deleteDialog"
                width="30%"
                >
                <span>确定要将当前素材删除吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteDialog = false">取 消</el-button>
                    <el-button type="primary" @click="deleteDialog = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return {
            dataList:[],
            rowsNum:1,
            choosedArr:[],
            choosedItem:{},
            isAllChoose:this.allchoose,
            isMutiChoose:false,
            datatype:this.type,
            deleteDialog:false,
        }
    },
    computed: {
        filldata(){
            this.dataList = this.$props.contentList
            let fillNum = this.rowsNum - this.dataList.length % this.rowsNum
            fillNum = fillNum === this.rowsNum?0:fillNum
            return this.dataList.concat(Array.from({length: fillNum}, (v, i) => {
                return {
                    id: Math.floor(Math.random() * 10000),
                    isReal: false
                }
            }))
        }
    },
    props:['contentList','type','allchoose','mutichoose'],
    watch:{
        allchoose:function(val,oldValue) {
            if(val == true) {
                this.choosedAll()
            } else {
                this.unchoosed()
            }
        },
        mutichoose:function(val) {
            if(val == false) {
                this.unchoosed()
            }
        }
    },
    methods:{
        // 选中当前项
        chooseItem(item) {
            if(item.choosed == true) {
                item.choosed = false
            } else {
                item.choosed = true
            }
            this.choosedArr = this.dataList.filter(val => val.choosed);
            if(this.choosedArr.length != 0) {
                this.isMutiChoose = true
            } else {
                this.isMutiChoose = false
            }
            this.$emit('chooseItem',this.choosedArr)
        },
        // 全选
        choosedAll() {
            this.dataList.forEach(ele => {
                ele.choosed = true
            })
            this.choosedArr = this.dataList.filter(val => val.choosed);
            this.$emit('choosedAll',this.choosedArr)
        },
        // 取消选中
        unchoosed() {
            this.dataList.forEach(ele => {
                ele.choosed = false
            })
            this.choosedArr = []
            this.$emit('unchoosed',this.choosedArr)
        },
        // 编辑
        editItem(item) {
            this.choosedItem = item
            this.$emit('editItem',this.choosedItem)
        },
        // 上架
        shelfsItem(item) {
            this.choosedItem = item
            this.$emit('shelfsItem',this.choosedItem)
        },
        // 下架
        unshelfsItem(item) {
            this.choosedItem = item
            this.$emit('unshelfsItem',this.choosedItem)
        },
        // 删除
        deleteItem(item) {
            this.choosedItem = item
            this.$emit('deleteItem',this.choosedItem)
        }
    },
    mounted() {
        this.rowsNum = Math.floor(document.getElementById('content-main').offsetWidth / 240)
        this.choosedArr = []
    }
}
</script>

<style lang="scss" scoped>
    .content{
        width: 100%;
        height: 100%;
        .content-main {
            width: 100%;
            height: 100%;
            overflow-y: auto;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            align-content: flex-start;
            .content-son {
                width: 240px;
                height: 135px;
                margin: 15px 0;
                position: relative;
                .contetnt-mask {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    background-color: rgba(16,16,16,.4);
                    display: none;
                    .un-choosed {
                        display: block;
                        width: 12px;
                        height: 12px;
                        border: 2px solid #fff;
                        border-radius: 8px;
                        position: absolute;
                        top: 6px;
                        left: 8px;
                        cursor: pointer;
                    }
                    .el-icon-success {
                        color: #fff;
                        position: absolute;
                        top: 6px;
                        left: 8px;
                        cursor: pointer;
                    }
                    .el-icon-delete {
                        color: #fff;
                        position: absolute;
                        top: 6px;
                        right: 8px;
                        font-size: 18px;
                        cursor: pointer;
                    }
                    .handleArea {
                        position: absolute;
                        bottom: 0;
                        color: #fff;
                        background-color: #14E293;
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                        display: flex;
                        justify-content: space-around;
                        span {
                            width: 50%;
                            height: 40px;
                            line-height: 40px;
                            text-align: center;
                            font-size: 14px;
                            cursor: pointer;
                        }
                    }
                }
                &:hover .contetnt-mask {
                    display: block;
                }
                .contetnt-mask.active {
                    display: block;
                }
                .content-son-name {
                    display: inline-block;
                    width: 240px;
                    height: 135px;
                    line-height: 135px;
                    text-align: center;
                    background-color: rgba(0,0,0,.15);
                    color: #fff;
                    font-size: 14px;
                    overflow: hidden;
                }
                &:hover .content-son-name{
                    display: none;
                }
                .content-son-name.active {
                    display: none;
                }
            }
            .empty {
                visibility: hidden;
            }
            &::-webkit-scrollbar {
                width: 0;    
            }
        }
    }
</style>

