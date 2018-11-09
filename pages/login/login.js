// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  inputname(e){
    this.setData({
      inputname:e.detail.value
    })
  },
  inputword(e) {
    this.setData({
      inputword: e.detail.value
    })
  },
  login() {
    if (this.data.inputname.length !== 0 && this.data.inputword.length !== 0){
      wx.setStorageSync('usertoken', '941024');
      wx.setStorageSync('userinfo', { avatarUrl:'../../assets/img/notlogin.png',nickName:this.data.inputname, gender:parseInt(Math.random()*2+1) });
      wx.switchTab({
        url: '../mine/mine',
      })
    }
  },
  bindGetUserInfo(e) {
    if (e.detail.errMsg === 'getUserInfo:ok'){
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
      wx.login({
        success: res => {
          wx.setStorageSync('usertoken', res.code);
          const { avatarUrl, nickName, gender } = e.detail.userInfo;
          wx.setStorageSync('userinfo', { avatarUrl, nickName, gender });
          wx.switchTab({
            url: '../mine/mine',
          })
        }
      })
    }else{
      console.log('获取信息失败');
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           //this.globalData.userInfo = res.userInfo
    //           console.log(res);
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
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