// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:"https://qimage.owhat.cn/mobile/resource/position_1.png",
    nickName:'',
    mylist:[
      '我的安利',
      '我的余额',
      '我的关注',
      '我的收藏',
      '我的鸡腿',
      '我的里程碑',
    ],
    isLogin:false
  },
  gotoCart() {
    wx.switchTab({
      url: '../cart/cart',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  gotoLogin() {
    if(this.data.isLogin){
      wx.navigateTo({
        url: '../logout/logout',
      })
    }else{
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    if (wx.getStorageSync('usertoken')) {
      this.setData({
        isLogin: true,
        avatarUrl: wx.getStorageSync('userinfo').avatarUrl,
        nickName: wx.getStorageSync('userinfo').nickName
      })
    }else{
      this.setData({
        isLogin: false,
        avatarUrl: "https://qimage.owhat.cn/mobile/resource/position_1.png",
      })
    }
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