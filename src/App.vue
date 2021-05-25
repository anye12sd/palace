<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    // 创建cnzz统计js
    const script = document.createElement('script')
    script.src = `https://v1.cnzz.com/z_stat.php?id=1279696254&show=pic1`
    script.language = 'JavaScript'
    document.body.appendChild(script)
  },
  watch: {
    '$route': {
      handler(to, from) {
        // 避免首次获取不到window._czc
        setTimeout(() => {
          if (window._czc) {
            const location = window.location
            const contentUrl = location.pathname + location.hash
            const refererUrl = '/'
            // 如果您使用_trackPageview改写了已有页面的URL，那么建议您在CNZZ的JS统计代码执行前先调用_setAutoPageview，将该页面的自动PV统计关闭，防止页面的流量被统计双倍。
            window._czc.push(['_setAutoPageview', false])
            // 用于发送某个URL的PV统计请求，
            window._czc.push(['_trackPageview', contentUrl, refererUrl])
          }
        }, 300)
      },
      // 首次进入页面即执行
      immediate: true
    }
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue", "Helvetica", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
