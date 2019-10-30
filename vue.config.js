const path = require('path')
const poststylus = require('poststylus')
const pxtorem = require('postcss-pxtorem')

const resolve = file => path.resolve(__dirname, file)
module.exports = {
  devServer: {
    host: '192.168.0.120',
    port: 8080 // 端口
  },
  configureWebpack: {
    devServer: {
      before (app) {
        // 用户信息池
        // 登录接口
        let tokenKey = 'wade'
        app.get('/api/login', (req, res) => {
          const { userId, password } = req.query
          if ((userId === 'wade' && password === '123456') || (userId === 'jeck' && password === '123456') || (userId === 'admin' && password === '123')) {
            res.json({
              code: 1,
              message: '登录成功',
              data: {
                roleType: 0
              },
              token: tokenKey + '-' + userId + '-' + (new Date().getTime() + 60 * 60 * 1000)// 这里日期是Date
            })
          } else {
            res.json({
              code: 0,
              message: '账号或者密码错误'
            })
          }
        })
      }
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        use: [
          poststylus([
            pxtorem({
              rootValue: 100,
              propWhiteList: [],
              minPixelValue: 2
            }),
            'autoprefixer'
          ])
        ],
        import: [
          resolve('./src/assets/theme.custom')
        ]
      },
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 100,
            propWhiteList: [],
            minPixelValue: 2
          }),
          require('autoprefixer')()
        ]
      }
    }
  },
  transpileDependencies: [
    'mand-mobile'
  ]
}
