//index.js
//获取应用实例
Page({
  data: {
  },
  onLoad: function () {
    
  },
  handleClick(){
      wx.switchTab({
          url: '/pages/read/read',
      })
  }
})