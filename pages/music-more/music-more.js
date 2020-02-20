// pages/music-more/music-more.js
const http=require('../../utils/music-http')
Page({
  data: {

  },

  onLoad:async function (options) {
    var subTitle=unescape(options.subTitle);
    var res=await http.getMore(subTitle);
    var {playlists}=res.data;
    this.setData({
      playlists
    })
  },

})