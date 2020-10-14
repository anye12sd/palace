<template>
    <div class="list-box">
        <div class="list flex flexWrap" v-for="(item,index) in 10" :key="index">
            <span class="list-title">本地新闻</span>
            <span class="list-content flex-1">2019“一带一路·美好生活”第三届全国手机摄影作品巡展在永康文化馆开展</span>
            <span class="list-time">2020.09.06</span>
        </div>
        <pager :pageSize="pageSize" v-model="pageNo" @on-jump="jump"></pager>
    </div>
</template>

<script>
    export default {
        name: "CategoryList",
        data (){
            return{
                pageSize: 30,
                pageNo: 2
            }
        },
        methods:{
            jump(id){
                console.log(id)
            },
        }
    }
</script>

<style scoped>
    .list-box{

    }
    .list{
        padding: 20px 0;
        letter-spacing: 2px;
        border-bottom: 1px solid rgba(240, 240, 240, 1);
    }
    .list-title{
        color: #74bd00;
        font-size: 16px;
        padding-right: 12px;
        border-right: 1px solid #ccc;
    }
    .list-content{
        padding-left: 12px;
        color: #191919;
        font-size: 16px;
    }
    .list-time{
        color: #9a9a9a;
        font-size: 14px;
    }
</style>