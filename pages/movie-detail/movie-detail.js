// pages/movie-detail/movie-detail.js
const http=require('../../utils/http')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     movies:{},
     x:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
     var {id}=options;
     var res=await http.getDetail(id)
     this.setData({
       movies:res.data
     })
    
  },
  // 点击查看大图
  handleImage(event){
    var url=event.currentTarget.dataset.url;
    var casts=this.data.movies.casts;
    var urls=casts.map(item=>{
      return item.avatars.small;
    })
    wx.previewImage({
      current: url,
      urls
    });
  }
})