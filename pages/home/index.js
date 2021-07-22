// pages/home/index.js
import Cache from '../../utils/cache'
import Api from "../../api/index"
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    login:false,
    visible3: false,
    actions3: [{
        name: '取消',
        color: '#2d8cf0',
      },
      {
        name: '认证',
        color: '#19be6b'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(wx.getMenuButtonBoundingClientRect())

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(Cache.getToken()){
      this.getUserInfo()
    }else{
        this.setData({
            login:true
        })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // let token = Cache.getToken()
    // if (!token) {
    //   wx.redirectTo({
    //     url: '/pages/index/index',
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // let {login}=this.data
    // if (login) {
    //   wx.redirectTo({
    //     url: '/pages/index/index',
    //   })
    // }

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 获取个人信息
  getUserInfo() {
    let that = this
    if (Cache.getToken()) {
      Api.getUserInfo().then(res => {
        App.globalData.userInfo = res
        console.log(App.globalData.userInfo )
        this.setData({
          userInfo: res
        })
      })
    }
  },
  // 认证
  handleClick3 ({ detail }) {
    const index = detail.index;

    if (index === 0) {
      console.log(0)
    } else if (index === 1) {
       wx.navigateTo({
         url: '/pages/userInfo/index',
       })
    }
    this.setData({
        visible3: false
    });
},
    // 跳每日答题
    goevery() {
        let token = Cache.getToken()
        if (!token) {
          wx.redirectTo({
            url: '/pages/index/index',
          })
          return
        }
        let {userInfo}=this.data
        if (userInfo.is_auth != 1) {
          this.setData({
            visible3: true
          })
          return
        }
        wx.navigateTo({
          url: '/pages/everyday/index',
        })
      },
  goChallenge(){
    let token = Cache.getToken()
    if (!token) {
      wx.redirectTo({
        url: '/pages/index/index',
      })
      return
    }
    let {userInfo}=this.data
    if (userInfo.is_auth != 1) {
      this.setData({
        visible3: true
      })
      return
    }
    wx.navigateTo({
      url: '/pages/challenge/index',
    })
  },
  goMyscore(){

    let token = Cache.getToken()
    if (!token) {
      wx.redirectTo({
        url: '/pages/index/index',
      })
      return
    }
    let {userInfo}=this.data
    if (userInfo.is_auth != 1) {
      this.setData({
        visible3: true
      })
      return
    }
    wx.navigateTo({
      url: '/pages/myscore/index',
    })
  },
  goPoints(){
    let token = Cache.getToken()
    if (!token) {
      wx.redirectTo({
        url: '/pages/index/index',
      })
      return
    }
    let {userInfo}=this.data
    if (userInfo.is_auth != 1) {
      this.setData({
        visible3: true
      })
      return
    }
    wx.navigateTo({
      url: '/pages/points/index',
    })
  },
  goUserInfo(){
    let token = Cache.getToken()
    if (!token) {
      wx.redirectTo({
        url: '/pages/index/index',
      })
      return
    }
    let {userInfo}=this.data
    if (userInfo.is_auth != 1) {
      this.setData({
        visible3: true
      })
      return
    }
    wx.navigateTo({
      url: '/pages/userInfo/index',
    })
  }
})