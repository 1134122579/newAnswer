Page({

  /**
   * 页面的初始数据
   */
  data: {
    //导航数组
    navigationArr: [{
        title: '商品',
        isSelected: true
      },
      {
        title: '评价',
        isSelected: false
      },
      {
        title: '详细',
        isSelected: false
      },
      {
        title: '推荐',
        isSelected: false
      }
    ]

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
  
  //自定义导航返回图标操作
  back: function back() {
    wx.navigateBack({
      delta: 1
    }).then(res => {
      // console.log(res)
    }).catch(err => {
      // 如果报错，说明是通过二维码或者分享进入的，直接返回首页
      wx.reLaunch({
        url: '../index/index',
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    //初始化页面自定义导航栏
    _this.attached();
  },

  //切换导航
  cutTitle:function(e){
    // console.log(e.currentTarget.dataset.index)
    let that = this;
    let index = e.currentTarget.dataset.index;
    var navigationArr = that.data.navigationArr;
    //清空全部样式
    navigationArr.forEach((item)=>{
      item.isSelected = false;
    })
    //点击的导航添加上样式
    navigationArr[index].isSelected = true;
    that.setData({
      navigationArr:navigationArr
    })
  },

})
