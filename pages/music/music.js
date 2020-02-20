// pages/music/music.js
const http=require('../../utils/music-http')
Page({
  data: {
     hotSongs:"",
     newSongs:"",
     djSongs:"",
     subTitle:""
  },
  onLoad:async function () {
     var hotSongs=await http.getHot();
     var newSongs=await http.getChina();
     var djSongs=await http.getProgram();
     var url={}    //用来装url.hotSongs
     url.hotSongs={};  //用来装subTitle
     url.hotSongs.subTitle="top/playlist?order=hot";
   

     url.newSongs={};
     url.newSongs.subTitle="top/playlist?cat=华语";
     

     url.djSongs={};
     url.djSongs.subTitle="personalized/djprogram";
     var songs=[]
     djSongs.data.result.forEach(item=>{
       var obj={};
       obj.id=item.id;
       obj.name=item.name;
       obj.coverImgUrl=item.picUrl;
       obj.playCount=item.program.adjustedPlayCount;
       songs.push(obj)
     })
     this.setData({
       hotSongs:hotSongs.data.playlists.slice(0,3),
       newSongs:newSongs.data.playlists.slice(0,3),
       djSongs:songs.slice(0,3),
       url
     })
  },

})