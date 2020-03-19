const path = require('path')
const poststylus = require('poststylus')
const pxtorem = require('postcss-pxtorem')

const resolve = file => path.resolve(__dirname, file)
module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // 部署应用包时的基本 URL
  outputDir: 'dist', // 打包目录
  indexPath: 'index.html',
  devServer: {
    host: '192.168.0.120',
    port: 8080 // 端口
  },
  configureWebpack: {
    devServer: {
      before (app) {
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
