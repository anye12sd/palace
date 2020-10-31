<template>
    <div>
        <header-nav istrue="0"></header-nav>
        <banner :bannerImg="bannerImg"></banner>
        <div class="category-box">
            <p class="category-bread-crumb">位置：文化馆首页-搜索列表</p>
            <p class="category-title">本地新闻</p>
            <category-list :list="list" type="list"></category-list>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    export default {
        name: "SearchList",
        data(){
            return {
                newsId: "",
                list: "",
                bannerImg: ""
            }
        },
        mounted() {
            this.fetch()
        },
        methods: {
            fetch: function(){
                let params = {key_words: this.$route.query.text}
                this.$api.getNewsList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.list = data.data.data
                            this.bannerImg = 'http://175.24.135.230:5007/admin/upload/20201022160240332.jpg'
                            if(!data.data.data.list.length){
                                this.$message.error("暂无内容，请重新搜索")
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