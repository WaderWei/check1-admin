const path = require('path')
const poststylus = require('poststylus')
const pxtorem = require('postcss-pxtorem')

const resolve = file => path.resolve(__dirname, file)
module.exports = {
  devServer: {
    host: '192.168.0.104',
    port: 8080 // 端口
  },
  configureWebpack: {
    devServer: {
      before (app) {
        // 用户信息池
        let userpoor = [
          { lastName: 'admin', userId: '17356526878', password: '123456', roleType: 0, roleName: '管理员' },
          { lastName: 'wade', userId: '17356526879', password: '123456', roleType: 1, roleName: '制定人' },
          { lastName: 'wade', userId: '17356526879', password: '123456', roleType: 2, roleName: '检查人' },
          { lastName: 'wade', userId: '17356526879', password: '123456', roleType: 3, roleName: '执行人' },
          { lastName: 'wade', userId: '17356526879', password: '123456', roleType: 3, roleName: '接收人' }
        ]
        let oaUser = [
          { value: '1', label: 'wade1', brief: '软件部' },
          { value: '2', label: 'wade2', brief: '销售部' },
          { value: '3', label: 'wade3', brief: '总部' },
          { value: '4', label: 'wade4', brief: '财务部' },
          { value: '5', label: 'wade1', brief: '检查部' },
          { value: '6', label: 'wade2', brief: '软件部' },
          { value: '7', label: 'wade3', brief: '软件部' },
          { value: '8', label: 'wade4', brief: '软件部' },
          { value: '9', label: 'wade1', brief: '软件部' },
          { value: '10', label: 'wade2', brief: '软件部' },
          { value: '11', label: 'wade3', brief: '软件部' },
          { value: '12', label: 'wade4', brief: '软件部' },
          { value: '13', label: 'wade1', brief: '软件部' },
          { value: '14', label: 'wade2', brief: '软件部' },
          { value: '15', label: 'wade3', brief: '软件部' },
          { value: '16', label: 'wade4', brief: '软件部' },
          { value: '17', label: 'wade5', brief: '软件部' }
        ]

        let checkList = [
          { id: 1, name: '大厅检查表1', state: '未提交' },
          { id: 2, name: '大厅检查表2', state: '已提交' },
          { id: 3, name: '大厅检查表3', state: '报废' },
          { id: 4, name: '大厅检查表4', state: '未提交' },
          { id: 5, name: '大厅检查表5', state: '未提交' },
          { id: 6, name: '大厅检查表6', state: '未提交' },
          { id: 7, name: '大厅检查表7', state: '未提交' }
        ]
        // 登录接口
        let tokenKey = 'wade'
        app.get('/user/login', (req, res) => {
          const { userId, password } = req.query
          const user = userpoor.filter(u => u.userId === userId && u.password === password)
          console.log(user)
          if (user.length > 0) {
            res.json({
              code: 1,
              msg: '登录成功',
              data: user,
              token: tokenKey + '-' + userId + '-' + (new Date().getTime() + 60 * 60 * 1000)// 这里日期是Date
            })
          } else {
            res.json({
              code: 0,
              msg: '账号或者密码错误'
            })
          }
        })

        app.get('/user/find', (req, res) => {
          const { keyValue } = req.query
          const user = oaUser.filter(o => o.value.indexOf(keyValue) !== -1)
          res.json({
            code: 1,
            msg: '',
            data: user
          })
        })

        app.get('/user/findCreator', (req, res) => {
          const { roleType } = req.query
          console.log(roleType)
          res.json({
            code: 1,
            msg: '',
            data: []
          })
        })

        app.post('/user/adds', (req, res) => {
          const { selectors } = req.query
          console.log(selectors)
          res.json({
            code: 1,
            msg: '',
            data: 10
          })
        })

        app.post('/user/update', (req, res) => {
          const { oldPwd, newPwd } = req.query
          console.log(oldPwd)
          console.log(newPwd)
          res.json({
            code: 1,
            msg: '',
            data: newPwd
          })
        })

        app.get('/check/findAll', (req, res) => {
          res.json({
            code: 1,
            msg: '',
            data: checkList
          })
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
