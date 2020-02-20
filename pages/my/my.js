// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     imageUrl:"/images/avatar/logo.png",
     location:true,
     longitude:114.504383,
     latitude:30.552500,
     scale:18,
     showCompass:true,
     markers:[{
       iconPath:"/images/icon/location.png",
       id:0,
       latitude:30.552500,
       longitude:114.504383,
       height:20,
       width:20
     }],
     polyline: [{
      points: [{
        longitude:114.504383,
        latitude:30.552500
      }, {
        longitude: 114.373062,
        latitude: 30.689131
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    circles:[
      {
        longitude:114.504383,
        latitude:30.552500,
        radius:50,
        fillColor:"#c20c0c66"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

   handleImage(){
     wx.chooseImage({
       count: 9, 
       sizeType: ['original', 'compressed'], 
       sourceType: ['album', 'camera'], 
       success: res=>{
       const src=res.tempFilePaths[0]
         this.setData({
           imageUrl:src
         })
       }
     })
   }
})