<template>
    <div>
        <header-nav istrue="5" @newsId="getNewsId"></header-nav>
        <banner v-if="imgFlag" :bannerImg="bannerImg"></banner>
        <div class="category-box" :class="{ptFlag: !imgFlag}">
            <p class="category-bread-crumb">位置：
                <router-link tag="span" :to="{path: '/'}">文化馆首页</router-link>
                -
                <router-link tag="span" :to="{path: 'showroom?news_id=21'}">数字展厅</router-link>
                <template v-if="!list.cate">
                    -
                    <router-link v-if="list.list" tag="span" :to="{path: 'grid?news_id=' + list.list[0].cate_id}">
                        {{list.list[0].cate_name}}</router-link>
                </template>
            </p>
            <template v-if="list.cate">
                <p class="category-title">数字展厅</p>
            </template>
            <template v-else>
                <p v-if="list.list" class="category-title">{{list.list[0].cate_name}}</p>
            </template>
            <category-list :list="list" type="list" @jump="getNewsPage"></category-list>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    export default {
        name: "ShowRoom",
        data() {
            return {
                newsId: "",
                list: "",
                bannerImg: "",
                imgFlag: false,
                pageNum: 1,
                pageSize: 10
            }
        },
        mounted() {
            this.getBanner()
            this.getNewsId()
        },
        methods: {
            getBanner: function(){
                let news_id = this.$route.query.news_id
                let imgPath = JSON.parse(sessionStorage.getItem("imgPath"))
                let menu = JSON.parse(sessionStorage.getItem("menu"))
                for(let i = 0; i < menu.length; i++){
                    if( news_id == menu[i].news_cate_id){
                        if(menu[i].image){
                            this.bannerImg = imgPath + menu[i].image
                            this.imgFlag = true
                            return false
                        }else{
                            return false
                        }
                    }
                    if(menu[i].children.length){
                        let children = menu[i].children
                        for(let j = 0; j < children.length; j++){
                            if( news_id == children[j].id){
                                if(children[j].image){
                                    this.bannerImg = imgPath + children[j].image
                                    this.imgFlag = true
                                    return false
                                }else{
                                    return false
                                }
                            }
                        }
                    }
                }
            //     let params = {cate_id: this.$route.query.news_id}
            //     this.$api.getNewsCate(params)
            //         .then((data) => {
            //             if (data.data.code == 0 && data.data.msg == "success") {
            //                 console.log(data)
            //                 this.bannerImg = data.data.data.img_path + data.data.data.list[0].image
            //                 this.imgFlag = data.data.data.list[0].image
            //             } else {
            //                 this.$message.error(data.data.msg)
            //             }
            //         })
            //         .catch((err) => {
            //             console.log(err)
            //         })
            },
            getNewsId: function (value) {
                let params = {cate_id: value || this.$route.query.news_id, page: this.pageNum, page_size: this.pageSize}
                this.$api.getNewsList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.list = data.data.data
                            // this.bannerImg = data.data.data.img_path + data.data.data.cate[0].image
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            getNewsPage: function (value) {
                let params = {cate_id: this.$route.query.news_id, page: value || this.pageNum, page_size: this.pageSize}
                this.$api.getNewsList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.list = data.data.data
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
        }
    }
</script>

<style scoped>

</style>