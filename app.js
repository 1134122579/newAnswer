//app.js
const Bmob = require('utils/Bmob-1.6.5.min.js');
const utils = require('utils/util.js');
Bmob.initialize("", "");

wx.u = utils
import Api from './api/index'
import Cache from './utils/cache'

App({
  onLaunch: function () {
    let that=this
    // Bmob.User.auth().then(res=>{
    //   console.log(res)
    //   console.log('一键登陆成功')
    // }).catch(err => {
    //   console.log(err)
    // });
    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
      
    //   success: res => {
    //     console.log(res)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取个人信息
    // if(Cache.getToken()){
    //   Api.getUserInfo().then(res=>{
    //     console.log(res)
    //     that.globalData.userInfo=res
    //     console.log(that.globalData)
    //   })
    // }
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           // that.globalData.userInfo = res.userInfo
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    score:0,
    is_tz:false,
  }
})