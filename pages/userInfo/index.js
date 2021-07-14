// pages/userInfo/index.js
import Api from '../../api/index'
let App=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,
    name:'',
    mobile:'',
    department:'',
  },
  numTaost(data,num){
    if(data.length>=num){
      wx.showToast({
        title: `最多${num}个字`,
        icon:"error"
      })
    }
  },
  nameChange(event){
    let {value}=event.detail.detail
    this.numTaost(value,5)
    this.setData({
      name:value
    })
    this.contentNull()

  },
  mobileChange(event){
    let {value}=event.detail.detail
    this.numTaost(value,12)
    this.setData({
      mobile:value
    })
    this.contentNull()

  },
  departmentChange(event){
    let {value}=event.detail.detail
    this.numTaost(value,10)
    this.setData({
      department:value
    })
    this.contentNull()

  },
  toastNull(text){
     wx.showToast({
       title: `${text}不能为空`,
       icon:"error"
     })
  },
  contentNull(){
    let {name,mobile,department}=this.data
    if(name&&name.length>0&&mobile&&mobile.length>0&&department&&department.length>0){
      console.log(0)
      this.setData({
        disabled:false
      })
    }else{
      this.setData({
        disabled:true
      })
    }

  },
  submit(){
    let {name,mobile,department}=this.data
    console.log(name,mobile,department)
    if(name.length<=0&&!name){
      this.toastNull("姓名")
      return
    }
    if(mobile.length<=0&&!mobile){
      this.toastNull("手机号")
      return
    }
    if(department.length<=0&&!department){
      this.toastNull("部门")
      return
    }

    wx.showLoading({
      title: '加载中..',
      mask: true,
    })
    Api.editUserInfo({name,mobile,department}).then(res=>{
      wx.hideLoading()
      wx.showToast({
        title: '修改成功',
      })
    })

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
    let {name,department,mobile}=App.globalData.userInfo
    this.setData({
      name,department,mobile
    })

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

  }
})