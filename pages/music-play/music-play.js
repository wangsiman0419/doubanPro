// pages/music-play/music-play.js
const audio=wx.getBackgroundAudioManager()
const http=require('../../utils/music-http')
Page({
  data: {
    name:"",
    poster:"",
    isPlay:true,
    animation:''
  },

  onLoad:async function (options) {
     var id=options.id;
     var name=options.name;
     var res=await http.getPlay(id);
     var url=res.data.data[0].url;
     audio.title=name;
     audio.src=url;
     //poster前一个页面通过缓存传过来的图片
     var poster=wx.getStorageSync('poster')
     audio.coverImgUrl=poster;
     wx.setStorageSync('playState', true)
     wx.setStorageSync('playId', id)
     this.setData({
       name,
       poster
     })
     audio.onPlay(()=>{
       this.setData({
         isPlay:true
       })
       wx.setStorageSync('playState', true)
     })
     audio.onPause(()=>{
       this.setData({
         isPlay:false
       })
       wx.setStorageSync('playState', false)
     })
  },
  handleClick(){
    if(this.data.isPlay){
       this.setData({
         isPlay:false
       })
       audio.pause()
       wx.setStorageSync('playState', false)
    }else{
      this.setData({
        isPlay:true
      })
      audio.play()
      wx.setStorageSync('playState', true)
    }
  },
 

  
})