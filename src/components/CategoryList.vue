<template>
    <div class="list-box">
        <template v-if="type == 'list'">
            <div class="list" v-for="(item,index) in list.list" :key="index">
                <router-link tag="div" class="flex flexWrap" :to="{ path: 'NewsDetail', query: {id: item.id} }">
                    <span class="list-title">{{item.cate_name}}</span>
                    <span class="list-content flex-1">{{item.title}}</span>
                    <span class="list-time">{{item.create_time}}</span>
                </router-link>
            </div>
        </template>
        <template v-else>
            <div class="video-box flex flexWrap">
                <template v-for="(item,index) in list.list">
                    <router-link tag="div" class="culture-content-left flex-1" :to="{ path: 'NewsDetail', query: {id: item.id} }" :key="index">
                        <div class="culture-content-box-mask" v-if="item.status != 1">
                            <img src="../assets/img/video.png" alt="" class="culture-content-box-img">
                        </div>
                        <img :src="list.img_path + item.image" alt="">
                        <p class="culture-content-left-time">{{item.create_time}}</p>
                        <p class="culture-content-left-text">
                            <span class="culture-content-left-text-title">{{item.cate_name}}</span>
                            <span class="culture-content-left-text-content">{{item.title}}</span>
                        </p>
                    </router-link>
                </template>
            </div>
        </template>
        <pager :total="list.total" :pageSize="pageSize" v-model="pageNo" @on-jump="jump"></pager>
    </div>
</template>

<script>
    export default {
        name: "CategoryList",
        props: {
            list: [Object, String],
            type: String
        },
        data() {
            return {
                pageSize: 10,
                pageNo: 1
            }
        },
        mounted() {
            this.pageSize = this.list.total_page
        },
        methods: {
            jump(id) {
                console.log(id)
            },
        }
    }
</script>

<style scoped>

</style>