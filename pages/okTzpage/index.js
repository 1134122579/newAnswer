// pages/okTzpage/index.js
import Api from '../../api/index'
let App =getApp()
import Cache from '../../utils/cache'
var windowHeight = wx.getSystemInfoSync().windowHeight;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    imageShow: false,
    yesProblemNum: null,
    userinfo:null,
    navH:null
  },
  //   从新挑战
  goNewTz() {
    wx.reLaunch({
      url: "/pages/challenge/index",
    });
  },
  // 回到首页
  goOut() {
    wx.reLaunch({
      url: "/pages/home/index",
    });
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
// 提交挑战成绩
subTzProblem(){
    let { score } = this.data;
    let that=this
    if(score==0){
      return
    }
    Api.subTzProblem({score}).then(res=>{
        console.log(res)
        that.getUserInfo()
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { score } = options;
    this.setData({
      yesProblemNum: score,
    });
    if (score >= 10) {
      this.setData({
        imageShow: true,
        score: 10,
      });
    } else if (score < 10 && score >= 5) {
      this.setData({
        score: 5,
      });
    } else {
      this.setData({
        imageShow: false,
        score: 0,
      });
    }
    this.subTzProblem()
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let navH=windowHeight*0.16
    console.log(navH)
    this.setData({
      navH
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      this.setData({
          userinfo:App.globalData.userInfo
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
