<template>
    <div class="tab-bg">
        <div class="tab-nav">
            <div class="tabItem" :class="tabIndex == index?'active':''" v-for="(tab,index) in tabList" :key="index" @click="changeTab(tab,index)">
                {{tab.name}}
            </div>
        </div>
    </div>
</template>

<script>
import { constants } from 'fs';
export default {
    name:'topTab',
    data() {
        return {
            tabIndex:0,
            tab:{}
        }
    },
    props:{
        tabList:{
            type:Array,
        },
        type:''
    },
    methods:{
        changeTab(tab,index) {
            this.tabIndex = index
            this.tab = tab
            this.$emit('changeTab',this.tab,this.tabIndex)
        }
    },
    watch:{
        type:function(val) {
            this.tabIndex = val
        }
    }
}
</script>

<style lang="scss" scoped>
.tab-bg {
    height: 64px;
    width: 100%;
    background-color: #fff;
    .tab-nav {
        width: 100%;
        height: 64px;
        line-height: 64px;
        text-align: center;
        .tabItem {
            display: inline-block;
            height: 40px;
            line-height: 40px;
            margin-right: 100px;
            border-bottom: 0;
            transition: all .3s;
            font-size: 14px;
            color: rgba(16, 16, 16, 0.49);
            position: relative;
            cursor: pointer;
            &.active {
                color: #101010;
                border-bottom: 2px solid #14E293;
            }
        }
        .tabItem:last-child{
            margin-right: 0;
        }
    }
    
}
</style>

