<template>
    <div id="menu_parent">
        <span id="menu_item" :class="itemIndex == index?'selected':''" v-for="(item,index) in itemlist" :key="index" @click="itemclick(item,index)">{{item}}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            itemIndex:-1,
        }
    },
    props:{
        itemlist:{
            type:Array,
            default:['示例展示']
        }
    },
    methods:{
        itemclick(item,index) {
            this.itemIndex = index
            this.$emit('itemclick',index,item)
        }
    }
}
</script>

<style lang="scss" scoped>
    #menu_parent {
        width: 100%;
        margin-top: 30px;
        #menu_item {
            display: inline-block;
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #fff;
            color: #101010;
            margin-bottom: 10px;
            font-size: 14px;
            &:hover {
                background: #f1f1f1;
                opacity: 0.5;
            }
            &:active {
                background: #f1f1f1;
                opacity: 0.8;
            }
            &.selected {
                 background: #f1f1f1;
            }
        }
    }
</style>

