//index.js
var Init = require('../../utils/initUserInfo.js');
//获取应用实例
const app = getApp()
var Tool = require('../../utils/tool.js');
var Bmob = require('../../utils/bmob.js');

Page({
  data: {
    initFinish:false,//初始化状态
    finishDelay:false,//延迟项数据状态
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),


  },
  onLoad: function () {
    let that = this
    Init.user(app,that,state=> {
      console.log('app.User:')
      console.log(app.User)
      that.getData()
    })



  },
  onReady:function () {
  },

  //获取延迟项数据
  getData () {
    console.log('getData()')
    return
    var that = this
    var type = 0,
        objectId = app.User.objectId
    var Record = Bmob.Object.extend("delay_list");
    var query = new Bmob.Query(Record);

    query.equalTo("finish", 0);
    query.equalTo("objectId", objectId);
    query.equalTo("type", type);
    query.limit(30);
    query.descending('updatedAt');
    query.find({
      success: function(res) {
        console.log("查找成功")
        console.log(res)

        that.setData({
          delayItemArr: res,
          finishDelay: true
        })

      },
      error: function(res, error) {
        console.log("查找失败")
        console.log(error)

      }
    });
  },

  showUserInfo () {

  },


})
