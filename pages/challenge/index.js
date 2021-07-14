import Api from "../../api/index";
let App = getApp();
var windWidth = wx.getSystemInfoSync().windowWidth;
const { $Toast } = require("../../dist/base/index");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    modalShow:false,
    actions5: [{
      name: '退出'
    },
    {
      name: '继续',
      color: '#D05A11',
      loading: false
    }
  ],
    isCanvas:false,
      isSureList:[{
          number:1,
          content:'正确'
      },
      {
        number:2,
        content:'错误'
    }],
    disabled:false,
    ListProblemarry:[],//多选的值
    isTbutton:false,
    isBtnActive:false,//是否展示确认按钮
    CompletionAnswer:null,//天空答案
    timer: null,
    nolookimage: false,
    maxValue: 60,
    suffix: "s",
    valueColor: "#FF9933",
    title: "",
    lineColor: "#19BE6B",
    maxValue: 60,
    lineWidth: 5,
    canvasWidth: "",
    c_val: 0,
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
  },
  // 结束游戏
  noYX() {
    let { yesProblem } = this.data;
    wx.reLaunch({
      url: "/pages/okTzpage/index?score=" + yesProblem.length,
    });
  },
  // 单选选中正确错误
  radioProblem(number) {
    let { newOneproblem, yesProblem, noProblem, revive } = this.data;
    if (number == newOneproblem.right_key) {
      console.log("回答正确",newOneproblem.right_key,number)
      // 正确
      yesProblem.push(newOneproblem);
      this.setData({
        yesProblem,
        problemStatus: true,
      });
      this.fromBegin();
    } else {
      // 错误
      console.log("对不起你错了");
      // this.setScore(); //分数计算
      this.reviveNum(); //是否复活
    }
  },
    // 弹窗警告
    handleClick3({
      detail
    }) {
      const index = detail.index;
      if (index === 0) {
        wx.navigateBack();
      } else if (index === 1) {
        console.log(index);
        this.setData({
          modalShow:false,
        });
        
      }
    },

  // 填空题答案
  BlankEvent(event){
    console.log(event)
    let { isBtnActive,answer}=event.detail

  this.setData({
    isBtnActive,
    CompletionAnswer:answer.trim()
  })
  },
  // 判断填空题答案是否正确
  CompletionClick(){
    let {newOneproblem,CompletionAnswer,yesProblem}=this.data
    if(newOneproblem.right_key==CompletionAnswer){
      yesProblem.push(newOneproblem);
      this.setData({
        yesProblem
      })
      this.nextClick()
    }else{
      this.setData({
        problemStatus:false,
        isBtnActive:false,
        isTbutton:true
      })
      this.reviveNum()
    }
    console.log("题目==",newOneproblem,"答案==",CompletionAnswer)
  },
  //   判断复活弹窗
  reviveNum() {
    let { revive, timer } = this.data;
    this.setData({
      problemStatus: false,
      revive,
    });
    wx.showLoading({
      title: '挑战失败',
      icon:"none"
    })
    let lookNoproblemTime = setTimeout(() => {
      this.setData({
        noProblemShow: true,
        isCanvas:true
      });
      wx.hideLoading()
      clearTimeout(lookNoproblemTime);
    }, 1500);
    
    clearInterval(timer); //清除定时器
  },
  // 判断有能否复活
  resuscitate() {
    let {revive}=this.data
    if(revive>0){
      revive--
      this.setData({
        noProblemShow: false,
        revive
      });
      this.fromBegin();
    }else{   
      $Toast({
        content: "无复活次数！",
        icon: "right",
      });
      setTimeout(()=>{
        this.noYX()
      },1500)
    }
  },

  //   计算分数  错误弹窗
  setScore() {
    let { yesProblem } = this.data;
    if (yesProblem.length >= 5 && yesProblem.length < 10) {
      this.setData({
        score: 5,
      });
    }
    if (yesProblem.length < 5) {
      this.setData({
        score: 0,
      });
    }
    if (yesProblem.length >= 5) {
      this.setData({
        score: 10,
      });
    }
  },
  // 退出
  goOut() {
    let { yesProblem } = this.data;
    if (yesProblem.length > 0) {
      this.setData({
        modalShow: true,
      });
    } else {
      wx.reLaunch({
        url:'/pages/home/index'
      });
    }
  },

  // 弹窗警告
  handleClick3({ detail }) {
    console.log(detail);
    const index = detail.index;
    if (index === 0) {
      wx.navigateBack();
    } else if (index === 1) {
      this.setData({
        modalShow: false,
      });
    }
  },
  // 选中
  handleChange(event) {
    console.log(event);
    let { current ,newOneproblem} = this.data;
    let { number } = event.currentTarget.dataset;
    // type ==1 单选  2  多选
    if(newOneproblem.type==1||newOneproblem.type==4){
      if (!current) {
        this.setData({
          current: number,
        });
        this.radioProblem(number);
      }
    }else{
this.radioProblemS(number)
    }
  
  },
    // 多选选中的值
    radioProblemS(data){
      let {ListProblemarry}=this.data
      console.log(ListProblemarry.indexOf(data)==-1)
      if(ListProblemarry.indexOf(data)==-1){
        ListProblemarry.push(data)
      }
      else{
        ListProblemarry.forEach((item,index)=>{
            if(item==data){
                ListProblemarry.splice(index,1)
            }
        })
      }
      let radioProblemSData=ListProblemarry.sort().join("")
      console.log("选中的值", radioProblemSData,ListProblemarry)
      this.setData({
        ListProblemarry,// 选中的数组
        radioProblemSData,//选中的
        isRadioProblemS:true
      })
    },
    // 判断多选是否正确

    RadioProblemSClick(){
        console.log(1)
        this.setData({
            disabled:true
        })
      let {yesProblem, radioProblemSData,newOneproblem,ListProblemarry}=this.data
      if(radioProblemSData==newOneproblem.right_key){
        yesProblem.push(newOneproblem);
        this.setData({
            yesProblem
        })
        this.nextClick()
      }else{
        this.setData({
          problemStatus:false
        })
         this.reviveNum()
      }
    },
  // 下一题
  nextClick() {

    // this.resuscitate()
    this.fromBegin();
  },

  // 获取答题
  fromBegin() {
      let that=this
      wx.showLoading({
        title: "请稍等..",
      });
    Api.getTzProblem({}).then((res) => {
      console.log(res); 
      wx.hideLoading();
      this.setData({
        isBtnActive:false,    
        loading: false,
        result: res,
        newOneproblem: res,
        nextButtonShow: false,
        problemStatus: true,
        current: null,
        isRadioProblemS:false,
        isTbutton:false,
        disabled:false,
        ListProblemarry:[],
        isCanvas:false,
        modalShow:false

        // total: res.length,
      });
      that.timeStting();
      //   this.oneProblem()
    });
  },
  // 获取当前的的一道题目
  oneProblem() {
    let that = this;
    let { result } = this.data;
    console.log("还有几个题目", result);
    if (result.length <= 0) {
      $Toast({
        content: "已完成答题，请提交！",
        icon: "right",
      });
      return;
    }
    let oneprlem = result.splice(0, 1);
    this.setData({
      result,
      newOneproblem: oneprlem[0],
      nextButtonShow: false,
      problemStatus: true,
      current: null,
    });
    this.timeStting();
  },
  // 时间计时器
  timeStting() {
    let that = this;
    let { timer } = this.data;
    if (timer) {
      clearInterval(timer); //清除定时器
      this.setData({
        timer: null,
      });
    }
    this.setData({ c_val: 0 });
    var num = 0; //初始值，从什么值开始大家都在发
    let timers = setInterval(function () {
      num++;
      if (num >= 60) {
        //到哪个值结束
        that.reviveNum();
        clearInterval(timers); //清除定时器
      }
      that.setData({
        c_val: num,
      });
      that.canvasRing.showCanvasRing(); //如果有定时器 就把它放定时器里面
    }, 1000);
    console.log(timers)
    that.setData({
      timer:timers,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { classId } = options;
    console.log(options);
    this.fromBegin(classId);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    this.setData({
      canvasWidth: windWidth * 0.25,
    });
    that.canvasRing = that.selectComponent("#canvasRing");
    let lookTime = setTimeout(() => {
      that.setData({
        nolookimage: true,
      });
      clearTimeout(lookTime);
      that.timeStting();
    }, 2000);
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
