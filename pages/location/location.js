// pages/location/location.js
import ajax from '../../utils/promise.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "/assets/img/location.png",
      id: 0,
      latitude: '39.909210',
      longitude: '116.396027'
    }],
    addressList: wx.getStorageSync('address') || [],
  },
  currentVal(e) {
    this.setData({
      currentVal: e.detail.value
    })
  },
  deleteAddress(e){
    let newList = this.data.addressList;
    const index = e.currentTarget.dataset.index;
    newList.splice(index, 1);
    this.setData({
      addressList: newList
    }, () => {
      wx.setStorageSync('address', this.data.addressList)
    })
  },
  inputAddress(){
    if (this.data.currentVal)
      this.setData({
        addressList: this.data.addressList.concat(this.data.currentVal),
        currentVal:''
      }, () => {
        wx.setStorageSync('address', this.data.addressList)
      })
  },
  addAddress(){
    if (this.data.address){    
      this.setData({
        addressList: this.data.addressList.concat(this.data.address)
      },()=> {
        wx.setStorageSync('address', this.data.addressList)
      })
    }
  },
  updatelocation(){
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        const {latitude, longitude} = res;
        this.setData({
          markers: [{
            iconPath: "/assets/img/location.png",
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude
          }]
        }
          )
        ajax.get(`https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&get_poi=1&key=PWOBZ-OAYWV-YLQPY-U4HI2-F34Z3-NXFP5`)
          .then(res => {
            this.setData({
              address: res.data.result.address
            })
            //const address = res.data.result.address;
          })
          .catch(error=>{
            console.log(error)
          })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.MapContext = wx.createMapContext('myLocation',this);
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