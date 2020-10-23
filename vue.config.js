const configureWebpack = {
    externals: {
        "AMap": "AMap",
    },
};
module.exports = {
    configureWebpack,
    publicPath: process.env.NODE_ENV === 'production'
        ? '' : '/',
        // : process.env.NODE_ENV === 'test' ? '' : '/',
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/web': {
                target: 'http://175.24.135.230:5006/web',
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