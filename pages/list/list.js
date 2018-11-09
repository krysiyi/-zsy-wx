// pages/list/list.js
import ajax from '../../utils/promise.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRand:false,
    list:[],
    lastPage:false,
    randText:'发布时间'
  },
  key:"",
  pageSize:10,
  pageNum:0,
  url:'',
  gotoDetail(e) {
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  changeRand(){
    this.setData({
      isRand:!this.data.isRand
    })
  },
  changeText(e){
    const text = e.target.dataset.text;
    this.setData({
      isRand: !this.data.isRand,
      randText: text,
      list:[]
    }, () => {
      this.pageNum = 0;
      this.data.lastPage = false;
      switch (this.data.randText) {
        case '最新发布':
          this.url = '&updateTime=DESC&priceSort=&sellNumSort='
          break;
        case '销量':
          this.url = '&updateTime=&priceSort=&sellNumSort=DESC'
          break;
        case '价格从低到高':
          this.url = '&updateTime=&priceSort=ASC&sellNumSort='
          break;
        case '价格从高到低':
          this.url = '&updateTime=&priceSort=DESC&sellNumSort=';
          break;
      }
      this.loadRand(this.url);
    })
  },
  loadRand(url){
    ajax.get(`https://shop2.m.yinyuetai.com/api/search/getListGoods.json?pageSize=${this.pageSize}&pageNum=${this.pageNum}&keyWord=${this.key}${url}`)
      .then(resp => {
        this.setData({
          list: this.data.list.concat(resp.data.data.goodsPage.list),
          lastPage: resp.data.data.goodsPage.lastPage
        })
        this.pageCount = resp.data.data.goodsPage.pages.length;
        this.pageNum++;
      })
      .catch(error => {
        console.log(error);
      })
  },
  loadmore() {
    if (this.data.lastPage)
    return
    this.loadRand(this.url);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.key = encodeURI(options.key === "签名商品" ? "签名" : options.key);
    this.loadRand(this.url);
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