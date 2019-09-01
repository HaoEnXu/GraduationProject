<template>
    <div class="person">
        <toptab :tabList='tablist' @changeTab="changeTab"></toptab>
        <div class="main_body">
            <div class="tabview">
                <myInfo v-if="this.tab.id == 0" ></myInfo>
                <otherInfo v-else></otherInfo>
            </div>
        </div>
    </div>
</template>

<script>
import toptab  from '../components/topTab/topTab'
import myInfo from '../components/topTab/myInfo'
import otherInfo from '../components/topTab/otherInfo'
export default {
    components:{
        toptab,
        myInfo,
        otherInfo
    },
    data(){
        return {
            tablist:[
                {
                    id:0,
                    name:'我的账号',
                },
                {
                    id:1,
                    name:'运营人员',
                }
            ],
            tab:{
                id:0,
            },
            userImg:'https://molto-pixel-web-static.oss-cn-beijing.aliyuncs.com/images/male.png',
        }
    },
    methods:{
        changeTab(tab,index) {
            this.tab = tab
        }
    },
}
</script>

<style lang="scss" scoped>
.person {
    width: 100%;
    height: 100%;
    .main_body {
        width: 100%;
        height: calc(100% - 64px);
        background-color: #F1F1F1;
        .tabview {
            width: 100%;
            height: 100%;
        }
    }
}
</style>

