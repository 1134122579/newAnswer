// pages/answerList/index.js
import Api from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: Number,
    classList: [], //获取分类
    className:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let {
      id,className
    } = options
    this.setData({
      pid: id,
      className
    })

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
  // 获取答题分类
  getclassList() {
    let {
      pid
    } = this.data
    Api.get_class({
      pid
    }).then(res => {
      this.setData({
        classList: res
      })
    })
  },
  // 跳转答题
  goanswer(event) {
    let {id,name}=event.currentTarget.dataset
    console.log(id)
    wx.navigateTo({
      url: '/pages/answer/index?classId='+id,
    })
  }
})