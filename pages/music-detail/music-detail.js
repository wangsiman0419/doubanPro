// pages/music-detail/music-detail.js
const http=require('../../utils/music-http')
Page({

  data: {
    songs:[],
    pic:"",
    playId:"",
    isPlay:false
  },
  onLoad:async function (options) {
     var id=options.id;
     var res=await http.getDetail(id);
     var {playlist}=res.data;
     var songs=[]
     playlist.tracks.forEach(item=>{
        var obj={};
        obj.id=item.id;
        obj.name=item.name;
        obj.coverImgUrl=item.al.picUrl;
        songs.push(obj)
     })
     this.setData({
       songs,
       pic:playlist.coverImgUrl
     })
  },
  handlePlay(event){
    var {id,name,poster}=event.currentTarget.dataset;
    //通过缓存将图片传过去
    wx.setStorageSync("poster", poster)
    wx.navigateTo({
      url: `/pages/music-play/music-play?id=${id}&name=${name}`,
    });
  },
  onShow(){
    var playState=wx.getStorageSync('playState');
    var playId=wx.getStorageSync('playId')
    if(playState!=null){
      this.setData({
        isPlay:playState
      })
    }
    this.setData({
      playId
    })
  },

})