module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://tst.im.lineji.cn',
                secure: false,  // 如果是https接口，需要配置这个参数
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'   //需要rewrite的, 这里理解成以'/api'开头的接口地址，把/api代替target中的地址
                }
            },
            '/foo': {
                target: '<other_url>'
            }
        }
    }
}