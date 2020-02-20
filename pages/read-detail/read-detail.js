// pages/read-detail/read-detail.js
var data=require('../../data/local');
var app=getApp();
var audio=wx.getBackgroundAudioManager();
Page({
  data: {
     isCollected:false,
     currentId:"",
     item:"",
     id:"",
     isPlay:false
  },
  onLoad: function (options) {
     var {id}=options;
     var {postList}=data;
     this.setData({
       item:postList[id],    //当前id下的所有数据
       id,
     })
     var collection=wx.getStorageSync('collection');
    /* 有缓存，就取缓存 */
    if(collection){
      let collected=collection[id]
      this.setData({
        isCollected:collected
      })
    }else{
      /* 没有缓存，就设置缓存 */
      var collection={};
      collection[id]=false;
      wx.setStorageSync('collection',collection)
    }
    //上面的播放按钮与下面的播放按钮同步
    audio.onPlay(()=>{
      this.setData({
        isPlay:true
      })
    })
    audio.onPause(()=>{
      this.setData({
        isPlay:false
      })
    })

    /* 退出页面和进入时按钮一致 */
    if(app.globalData.g_isPlay && app.globalData.g_playId==this.data.id){
      this.setData({
        isPlay:true
      })
    }else{
      this.setData({
        isPlay:false
      })
    }
  },
 handleCollect(){
   var collection=wx.getStorageSync('collection');
   var collected=!collection[this.data.id];
   collection[this.data.id]=collected;
   /* 更新缓存 */
   this.showModal(collected,collection)
 },
 share(){
  wx.showActionSheet({
    itemList: ['分享到微信','分享到朋友圈'],
    itemColor: '#000000',
    success: (res)=>{
      console.log(res.tapIndex)
    },
    fail: ()=>{},
    complete: ()=>{}
  });
 },
 showModal(collected,collection){
  wx.showModal({
    title:'收藏',
    content:'收藏文章',
    success:(res)=>{
       if(res.confirm){
         if(collected){
           wx.setStorageSync('collection', collection)
           this.setData({
             isCollected:collected
           })
         }
       }else if(res.cancel){
         if(collected==false){
           wx.setStorageSync('collection', collection)
           this.setData({
             isCollected:collected
           })
         }
       }
    }
  })
 },
 //音乐播放
 handleMusic(){
   if(this.data.isPlay){
     audio.pause();
     this.setData({
       isPlay:false
     })
     app.globalData.g_isPlay=false;
   }else{
     audio.title=this.data.item.music.title;
     audio.src=this.data.item.music.url;
     this.setData({
       isPlay:true
     })
     app.globalData.g_playId=this.data.id;
     app.globalData.g_isPlay=true;
   }
 }
})