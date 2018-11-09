// pages/mall/mall.js
import ajax from '../../utils/promise.js';
import store from '../../store/store.js';
import {
  inputSearch,
  deleteSearch
} from '../../store/actions/pageActions.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    namelist:[],
    namepro:[],
    hotlist:[],
    history:[],
    inputShowed: false,
    inputVal: "",
    swiper: [],
    nav: [],
    newProduct: {},
    currentIndex:0
  },
  goDetail(e) {
    wx.navigateTo({
      url: `../detail/detail?ajax=${e.currentTarget.dataset.link}`,
    })
  },
  changeIndex(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    },()=>{
      let name = this.data.namelist[e.currentTarget.dataset.index].name;
      let id = this.data.namelist[e.currentTarget.dataset.index].id;
      ajax.get(`https://shop2.m.yinyuetai.com/api/goods/indexList.json?num=6&artistId=${id}&artistName=${name}`)
      .then(res=>{
        this.setData({
          namepro:res.data.data
        });
      })
    })
  },
  showInput: function () {
    ajax.get('https://shop2.m.yinyuetai.com/api/search/relatedHot.json?number=10')
      .then(res=> {
        this.setData({
          hotlist:res.data.data
        });
      })
      .catch(error=> {
        console.log(error)
      })
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  getHistory() {
    this.setData({
      history: store.getState().page.history
    })
  },
  searchValue() {
    const key = this.data.inputVal;
    store.dispatch(inputSearch(this.data.inputVal));
    this.setData({
      inputVal:''
    })
    // wx.navigateTo({
    //   url: '../list/list?key='+key,
    // })
  },
  deleteSearch(e) {
    store.dispatch(deleteSearch(e.currentTarget.dataset.index));
  },
  gotolist(e) {
    //console.log(e.currentTarget.dataset.key);
    wx.navigateTo({
      url: `../list/list?key=${e.currentTarget.dataset.key}`,
    })
  },
  gotoDetail(e) {
    wx.navigateTo({
      url: `../detail/detail?ids=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHistory();
    store.subscribe(this.getHistory);
    ajax.get("https://shop2.m.yinyuetai.com/api/carousel/indexList.json?equipmentName=WAP&num=5")
    .then(resp=> {
      this.setData({
        swiper: resp.data.data
      });
    }).catch(error=> {
      console.log(error);
    });
    ajax.get('https://shop2.m.yinyuetai.com/api/artist/indexList.json?equipmentName=WAP&num=10')
    .then(res=>{
      this.setData({
        namelist: res.data.data,
        namepro:res.data.data[0].goodsModelList
      });
    })
    wx.request({
      url: 'https://shop2.m.yinyuetai.com/api/hotKeyword/indexList.json?equipmentName=WAP&num=6',
      success:(resp)=> {
        this.setData({
          nav:resp.data.data
        })
      }
    });
    wx.request({
      url: 'https://shop2.m.yinyuetai.com/api/goods/findNewGoods.json?num=1',
      success: (resp) => {
        this.setData({
          newProduct: resp.data.data.goodsMap
        })
      }
    });
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