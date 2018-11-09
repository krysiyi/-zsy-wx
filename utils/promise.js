export default {
  get(url){
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: 'loading...',
      });
      wx.request({
        url: url,
        success(resp) {
          resolve(resp);
        },
        fail(error) {
          reject(error);
        },
        complete() {
          wx.hideLoading();
        }
      })
    })
  },
}