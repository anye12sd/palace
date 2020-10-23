<template>
    <div>
        <header-nav istrue="2" @newsId="getNewsId"></header-nav>
        <banner></banner>
        <div class="category-box">
            <p class="category-bread-crumb">位置：
                <router-link tag="span" :to="{path: '/'}">文化馆首页</router-link>
                -
                <router-link tag="span" :to="{path: 'activity?news_id=18'}">文化活动</router-link>
                <template v-if="!list.cate">
                    -
                    <router-link v-if="list.list" tag="span" :to="{path: 'activity?news_id=' + list.list[0].cate_id}">
                        {{list.list[0].cate_name}}</router-link>
                </template>
            </p>
            <template v-if="list.cate">
                <p class="category-title">文化活动</p>
            </template>
            <template v-else>
                <p v-if="list.list" class="category-title">{{list.list[0].cate_name}}</p>
            </template>
            <category-list :list="list" type="video"></category-list>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    export default {
        name: "Activity",
        data() {
            return {
                newsId: "",
                list: "",
            }
        },
        mounted() {
            this.getNewsId()
        },
        methods: {
            getNewsId: function (value) {
                let params = {cate_id: value || this.$route.query.news_id}
                this.$api.getNewsList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            if (!data.data.data.list.length) {
                                this.$message.error("该目录下暂无内容，敬请期待")
                                return false
                            }
                            this.list = data.data.data
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