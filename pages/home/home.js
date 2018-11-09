// pages/home/home.js
import ajax from '../../utils/promise.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '//img3.c.yinyuetai.com/others/admin/180926/0/-M-85554628925552c1a5e26a9993cbc1b1_356x356.jpg',
      '//img4.c.yinyuetai.com/others/admin/180530/0/-M-c1a76c4d95362c8cd96af39721ed6d14_356x356.jpg',
      'http://img1.c.yinyuetai.com/others/admin/171013/0/-M-2afaa975f1683a9213033ff46e3aa1e4_356x356.jpg'
    ],
    slideImg:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax.get('https://shop2.m.yinyuetai.com/api/search/getListGoods.json?bannerType=CROWD_FUNDING&priceSort=&sellNumSort=&updateTime=&ppath=&pageNum=0&pageSize=10')
    .then(res=>{
      this.setData({
        slideImg: res.data.data.goodsPage.list
      })
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