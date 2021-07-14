// pages/everyday/index.js
import Api from '../../api/index'
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classList: [], //答题分类
    userInfo: null,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let {
      userInfo
    } = App.globalData
    this.setData({
      userInfo
    })
    this.getclassList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
  // 跳转
  goanswerList(event) {
    let {
      userInfo
    } = this.data
    console.log(userInfo)
    if (userInfo.is_auth == 0) {
      this.setData({
        visible3: true
      })
      return
    }
    console.log(event)
    let {
      id,
      name
    } = event.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/answerList/index?id=' + id + "&className=" + name,

    })
  },
  // 获取答题分类
  getclassList() {
    Api.get_class({
      pid: 0
    }).then(res => {
      this.setData({
        classList: res
      })
    })
  }
})