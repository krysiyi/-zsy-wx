// pages/detail/detail.js
import ajax from '../../utils/promise.js';
import store from '../../store/store.js';

import { addCartById } from '../../store/actions/cartActions.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail:{},
    tabFlag:false,
    count:0
  },
  changeTab() {
    this.setData({
      tabFlag: !this.data.tabFlag
    })
  },
  gotoCart(){
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  addcart() {
    const cart = {
      price: this.data.goodsDetail.price,
      title: this.data.goodsDetail.title,
      img: this.data.goodsDetail.bigHeadImg,
      id: this.data.goodsDetail.id
    };
    store.dispatch(addCartById(cart));
  },
  getCount() {
    const count = store.getState().cart.cart.reduce((result,item)=> {
      result+=item.count;
      return result;
    },0);
    this.setData({
      count
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCount();
    store.subscribe(this.getCount);
    if(options.ajax){
      ajax.get('https://shop.m.yinyuetai.com/' + options.ajax)
      .then(res=> {
        this.setData({
          goodsDetail: resp.data.goodsDetail,
        });
      })
      .catch(error=> {
        console.log(error);
      })
    }else{
      wx.request({
        url: `http${options.ids ? 's' : ''}://shop.m.yinyuetai.com/details?goodsId=${options.ids ? options.ids : options.id}&refUrl=`,
        success: (resp) => {
          this.setData({
            goodsDetail: resp.data.goodsDetail,
          });
        }
      });
    }
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
    app.setTabbar();
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