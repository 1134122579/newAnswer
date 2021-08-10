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
    newScore:0,
    score: 0,
    imageShow: false,
    yesProblemNum: null,
    userInfo:null,
    navH:null,
    NumberProblem:5,//挑战成功的题数

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
    getuserInfo() {
      let that = this
      if (Cache.getToken()) {
        Api.getuserInfo().then(res => {
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
      that.getuserInfo()
      return
    }
    Api.subTzProblem({score}).then(res=>{
        console.log(res)
        that.getuserInfo()
    })
},
   //自定义导航上内边距自适应
   attached: function attached() {
    var _this = this;
    var isSupport = !!wx.getMenuButtonBoundingClientRect;
    var rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    wx.getSystemInfo({
      success: function success(res) {
        var ios = !!(res.system.toLowerCase().search('ios') + 1);
        _this.setData({
          ios: ios,
          statusBarHeight: res.statusBarHeight,
          innerWidth: isSupport ? 'width:' + rect.left + 'px' : '',
          innerPaddingRight: isSupport ? 'padding-right:' + (res.windowWidth - rect.left) + 'px' : '',
          leftWidth: isSupport ? 'width:' + (res.windowWidth - rect.left) + 'px' : ''
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { score } = options;
    let {NumberProblem}=this.data
    let newScore=App.globalData.score
    this.setData({
      yesProblemNum: +score,
      newScore
    });

    if (score >= NumberProblem) {
      this.setData({
        imageShow: true,
        score: NumberProblem,
      });
    this.subTzProblem()
    this.setData({
      newScore:NumberProblem
    })
    App.globalData.score=NumberProblem

    }  else {
      this.setData({
        imageShow: false,
        score: 0,
      });
    }

    // 
  
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.attached()
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
        userInfo:App.globalData.userInfo
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

  /**1
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
