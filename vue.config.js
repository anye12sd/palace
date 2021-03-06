const configureWebpack = {
    externals: {
        "vue": "Vue",
        "AMap": "AMap",
        'moment': 'moment',
        'ant-design-vue': 'antDesignVue',
        'jquery': '$'
    },
};
module.exports = {
    productionSourceMap: false,
    configureWebpack,
    publicPath: process.env.NODE_ENV === 'production'
        ? ''
        : process.env.NODE_ENV === 'test' ? '' : '/',
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/web': {
                target: 'http://42.192.209.104:5006/web',
                // target: 'http://192.168.8.24:3000/web',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/web': ''
                }
            },
        },
    }
}