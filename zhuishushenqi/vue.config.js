module.exports={
    devServer: {
          proxy: {
            '/': { //暗号: 所有以/开头的请求，都归http-proxy发送
                  target: `http://api.zhuishushenqi.com`,
                  changeOrigin: true, //是否跨域
                  // pathRewrite:{
                  //       '/':''
                  // }
            }
          },
    }
}