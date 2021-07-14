import Api from "../../api/index"
let App = getApp()
var windWidth = wx.getSystemInfoSync().windowWidth;
const {
  $Toast
} = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    actions5: [{
        name: '退出'
      },
      {
        name: '继续',
        color: '#D05A11',
        loading: false
      }
    ],
    isSureList:[{
        number:1,
        content:'正确'
    },
    {
      number:2,
      content:'错误'
  }],
    isNullproble:false,//题库为空
    modalShow: false,
    nolookimage: false,
    maxValue: 60,
    suffix: 's',
    valueColor: '#FF9933',
    title: '',
    lineColor: '#19BE6B',
    maxValue: 60,
    lineWidth: 5,
    canvasWidth: '',
    c_val: 0,
    pushScore: false, //未提交成绩
    result: [], // 所有题目
    newOneproblem: {}, //当前题目
    yesProblem: [], //答对的题目
    noProblem: [], //打错的题目
    current: null, //选中的
    nextButtonShow: false, // 显示下一题按钮
    problemStatus: true, //会带正确 是true
    total: null, //总共的题数
    noProblemShow: false,
    score: null,
    isRadioProblemS:false,
    revive: 1, //复活次数
    ListProblemarry:[],//多选的值
    CompletionAnswer:null,//天空答案

  },
  // 选中
  handleChange(event) {
    console.log(event)
    let {
      current
    } = this.data
    let {
      number
    } = event.currentTarget.dataset
    if (!current) {
      this.setData({
        current: number
      })
      this.radioProblem(number)
    }

  },
  // 选中正确错误
  radioProblem(number) {
    wx.showLoading({
      title: '请稍等..',
    })
    let {
      newOneproblem,
      yesProblem,
      noProblem,
      result
    } = this.data
    if (number == newOneproblem.right_key) {
      yesProblem.push(newOneproblem)
      this.setData({
        yesProblem,
        problemStatus: true,

      })
      setTimeout(() => {
        this.oneProblem()
        wx.hideLoading()
      }, 1500);
    } else {
      noProblem.push(newOneproblem)
      setTimeout(() => {
        wx.hideLoading()
      }, 100)
      // 错
      this.setData({
        noProblem,
        nextButtonShow: true,
        problemStatus: false,
      })
    }
    if (result.length == 0) {
      $Toast({
        content: '已完成答题，请提交！',
        icon: 'right'
      });
    }
  },
  // 下一题
  nextClick() {
    wx.showLoading({
      title: '请稍等..',
    })
    setTimeout(() => {
      this.oneProblem()
      wx.hideLoading()
    }, 1000);
  },

  // 获取答题
  fromBegin(classId) {
    Api.getProblem({
      class_id: classId
    }).then(res => {
      console.log(res)
      if(!res||res.length==0){
        this.setData({
          isNullproble:true,
        })
        $Toast({
          content: '暂无题目',
          icon: 'right'
        });
        return
      }
      this.setData({
        isNullproble:false,
        loading: false,
        result: res,
        total: res.length,
      })
      this.oneProblem()
    })
  },
  // 获取当前的的一道题目
  oneProblem() {
    let that = this
    let {
      result
    } = this.data
    console.log('还有几个题目', result)
    if (result.length <= 0) {
      $Toast({
        content: '已完成答题，请提交！',
        icon: 'right'
      });
      return
    }
    let oneprlem = result.splice(0, 1)
    this.setData({
      result,
      newOneproblem: oneprlem[0],
      nextButtonShow: false,
      problemStatus: true,
      current: null,
    })
    // this.timeStting()
  },
  // 时间计时器
  timeStting() {
    let that = this
    let {
      timer
    } = this.data
    that.canvasRing = that.selectComponent("#canvasRing");
    if (timer) {
      clearInterval(timer); //清除定时器
      this.setData({
        timer: null
      })
    }
    var num = 0; //初始值，从什么值开始
    timer = setInterval(function () {
      num++;
      if (num >= 60) { //到哪个值结束

        clearInterval(timer); //清除定时器
      }
      that.setData({
        c_val: num
      })

      that.canvasRing.showCanvasRing(); //如果有定时器 就把它放定时器里面
    }, 1000)
    that.setData({
      timer
    })
  },
  // 退出
  goOut() {
    let {
      pushScore,isNullproble
    } = this.data
    if(isNullproble){
      wx.navigateTo({
        url: '/pages/home/index',
      })
      return
    }
    if (!pushScore) {
      this.setData({
        modalShow: true
      })
    } else {
      wx.navigateTo({
        url: '/pages/home/index',
      })
    }
  },

  // 弹窗警告
  handleClick3({
    detail
  }) {
    console.log(detail)
    const index = detail.index;
    if (index === 0) {
      wx.navigateBack()
    } else if (index === 1) {
      this.setData({
        visible3: false
      });
    }
    this.setData({
      visible3: false
    });
  },
  // 提交成绩
  subDtProblem() {
    let that = this
    let {
      yesProblem
    } = this.data
    wx.showLoading({
      title: '提交中..',
    })
    Api.subDtProblem({
      score: yesProblem.length
    }).then(res => {
      wx.hideLoading()
      that.setData({
        pushScore: true
      })
      wx.showToast({
        title: '提交成功！',
      })
      let time = setTimeout(() => {
        clearTimeout(time)
        wx.navigateBack()
      }, 2000);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      classId
    } = options
    console.log(options)
    this.fromBegin(classId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    this.setData({
      canvasWidth: windWidth * 0.25
    })

    // that.timeStting()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function ({
    next
  }) {

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

})