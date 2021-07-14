Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 父组件传过来的题目数据
    question: {
      type: String,
      observer: function (news, old, path) {

        const titleArr = news.split(''); // 将题目分割为数组
        // let arrList = []
        // titleArr.forEach((item, index) => {
        //   arrList.push({
        //     value: item,
        //     focus: false
        //   })
        // })
        //  console.log(arrList.get()
        let inputMap = new Map(); // 新建map
        for (let i = 0; i < titleArr.length; i++) { // 遍历分割的数组
          if (titleArr[i] === '#') {
            inputMap.set(i, ''); // 如果遇到下划线，就set进map里
          }
        }
        var oldString = "";
        for (var i = 0; i < inputMap.size; i++) {
          oldString += "#";
        }
        let newtitleArr = news.replace(oldString, "#").split("")
        this.setData({
          titleArr: newtitleArr,
          inputMap,
          maxlength: inputMap.size
        })
      }
    },
    inputDisabled: {
      type: Boolean,
      observer: function (news, old, path) {
        this.setData({
          disabled: news
        })
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    focus: true,
    disabled: false,
    maxlength: -1,
    titleArr: [], // 题目分割的数组
    inputMap: new Map() // 新建map 存放用户输入的答案
  },

  /**
   * 组件的方法列表
   */
  methods: {
    fnInput(e) {
      const value = e.detail.value;
      const index = e.currentTarget.dataset.value;
      let answerRes = '';
      let {
        titleArr
      } = this.data
      let that = this
      console.log(titleArr)
      // if (value.length === 1) {
      //   let oldindex = index + 1
      //   titleArr.forEach((item, titleArrindex) => {
      //     item.focus = titleArrindex === oldindex ? true : false
      //   })
      //   console.log(titleArr)
      //   setTimeout(() => {
      //     that.setData({
      //       titleArr
      //     })
      //   }, 100);

      //   this.data.inputMap.forEach((item, innerIndex) => {
      //     // item.focus = nextIndex === innerIndex
      //     this.data.inputMap.set(index, {
      //       value,
      //       focus: false,
      //     });
      //     console.log('====', this.data.inputMap, index, this.data.inputMap.get(index))

      //   })
      // }
      this.data.inputMap.set(index, value);

      this.data.inputMap.forEach((value, key) => {
        answerRes += value
      })
      console.log(999999, answerRes)
      // answerRes = answerRes.substring(0,answerRes.length-1);
      setTimeout(() => {
        this.triggerEvent('BlankEvent', {
          isBtnActive: true,
          answer: answerRes
        }, {})
      }, 100)


    }
  }
})