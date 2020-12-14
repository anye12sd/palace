<template>
    <div>
        <header-nav istrue="0"></header-nav>
        <banner :bannerImg="bannerImg"></banner>
        <div class="category-box">
            <p v-if="!isMobile" class="category-bread-crumb">位置：文化馆首页-搜索列表</p>
            <p class="category-title">搜索列表</p>
            <category-list :isMobile="isMobile" :list="list" type="list" @jump="fetch"></category-list>
        </div>
        <Footer :is-mobile="isMobile"></Footer>
    </div>
</template>

<script>
    export default {
        name: "SearchList",
        data(){
            return {
                newsId: "",
                originWidth: 1,
                page: 1,
                list: "",
                bannerImg: "",
                timer: false,
                isMobile: false
            }
        },
        watch: {
            $route() {
                this.fetch()
            }
        },
        mounted() {
            this.fetch()
            if(document.body.clientWidth <= 768){
                this.isMobile = true
            }
            this.originWidth = document.body.clientWidth
            let that = this
            window.onresize = function(){ // 定义窗口大小变更通知事件
                if(!that.timer) {
                    that.timer = true
                    setTimeout(function () {
                        that.timer = false
                        if(document.body.clientWidth <= 768){
                            that.originWidth <= 768 ? console.log("不要随便resize哦~") : location.reload()
                        }else{
                            that.originWidth > 768 ? console.log("不要随便resize哦~") : location.reload()
                        }
                    }, 1000)
                }
            };
        },
        methods: {
            fetch: function(page){
                let params = {key_words: this.$route.query.text, page: page || this.page}
                this.$api.getNewsList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.list = data.data.data
                            this.bannerImg = 'http://175.24.135.230:5007/admin/upload/20201022160240332.jpg'
                            if(!data.data.data.list.length){
                                this.$message.error("暂无内容，请重新搜索", 2)
                                return false
                            }
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<style scoped>

</style>