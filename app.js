//app.js
var Bmob = require('utils/bmob.js')

Bmob.initialize(
    "d803ec8abeb33ff64dce37a3c10248d8",
    "8975d2a20b90cf11e6481556b9b0a13f"
); //演示小程序_dev
// BmobSocketIo.initialize("8d8d2d924792ef96ca05741c735ff7f7");//演示小程序_dev

App({
  User:null,
  initFinish:false,
  config:{
    dynamicNum:1000,//用户动态数据库记录的条数
  },
  Data: {
  },
  loading: true,
  onLaunch:function  () {
  },
  //获取用户信息
  getUserInfo: function (cb) {
    console.log('执行 getUserInfo（）')
    var that = this
    if (this.User.attributes.nickName) {
      console.log('已存在用户昵称1')
      typeof cb == 'function' && cb(this.User)
    } else {
      //调用登录接口
      console.log('无用户昵称 调用登录接口')
      wx.login({
        success: function () {
          console.log('wx.login 微信登录成功')
          wx.getUserInfo({
            success: function (res) {
              console.log('获取用户信息成功')
              console.log(res)
              // that.globalData.userInfo = res.userInfo
              that.User = res.userInfo
              typeof cb == 'function' && cb(that.User)
            },
            fail:function (err) {
              console.log('获取用户信息 失败')
              console.log(err)
            }

          })
        }
      })
    }
  },
  //bmob登录
  bmobLogin (cb) {
    var that = this
    var promise = new Bmob.Promise();
    this.User = Bmob.User.current()
    if (!this.User) {
      console.log('开始登录')
      var user = new Bmob.User() //开始注册用户
      user.auth()
          .then(function (obj) {
                console.log('登陆成功1')
                console.log(obj)
                that.User = Bmob.User.current()
                console.log('bmobLogin that.User :')
                console.log(that.User)
                that.initFinish = true
                promise.resolve(that.initFinish);
                // typeof cb == 'function' && cb(that.loading)
              },
              function (err) {
                console.log('失败了', err)
              });
    } else {
      console.log('存在用户信息')
      console.log(this.User)
      that.initFinish = true
      promise.resolve(that.initFinish);
      // typeof cb == 'function' && cb(that.loading)
    }
    return promise._thenRunCallbacks({});
  },
  //清除缓存
  clearStorage:function () {
    alert("清除缓存")
    // wx.clearStorage()
  }

})