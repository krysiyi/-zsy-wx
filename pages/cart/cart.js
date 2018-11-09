// pages/cart/cart.js
import store from '../../store/store.js';
import { 
  addCartById, 
  toggleCartStatus,
  addCount,
  reduceCount,
  toggleAllCartStatus,
  deleteCartIschecked } from '../../store/actions/cartActions.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEdit:false,
    cart:[],
    isAllChecked: false
  },
  gotoMall() {
    wx.switchTab({
      url: '../mall/mall',
    })
  },
  getCart() {
    this.setData({
      cart:store.getState().cart.cart,
      isAllChecked: store.getState().cart.cart.every(item => item.isChecked),
      amount: store.getState().cart.cart.reduce((result,item)=> {
        if(item.isChecked)
        result+=item.count*item.price;
        return result;
      },0),
      count: store.getState().cart.cart.reduce((result, item) => {
        if(item.isChecked)
        result += item.count;
        return result;
      }, 0),
    });
  },
  deleteCart() {
    store.dispatch(deleteCartIschecked());
  },
  addCount(e) {
    store.dispatch(addCount(e.currentTarget.dataset.id))
  },
  reduceCount(e) {
    store.dispatch(reduceCount(e.currentTarget.dataset.id))
  },
  toggleAllCartStatus() {
    store.dispatch(toggleAllCartStatus(!this.data.isAllChecked))
  },
  changeEdit() {
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  changeChecked(e){
    const id = parseInt(e.currentTarget.id);
    store.dispatch(toggleCartStatus(id));
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCart();
    store.subscribe(this.getCart);
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