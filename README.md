# doubanPro
基于微信小程序的项目



# 一.01init

#### 1-1给view设置100%没有用，必须要先给page设置100%

#### 1-2wx.switchTab跳转到tabbar页面

```javascript
handleClick(){
      wx.switchTab({
          url: '/pages/read/read',
      })
  }
```

# 二.swiper

```javascript
<swiper>
   <swiper-item>
      ....
   </swiper-item>
</swiper>
```

.wxml

```javascript
<swiper indicator-dots="{{indicatorDots}}" indicator-color="{{indicatorColor}}"
 indicator-active-color="{{active}}">
 <swiper-item wx:for="{{banners}}" wx:key="item">
     <image src="{{item.imageUrl}}"></image>
 </swiper-item>
 </swiper>
```

.js

```javascript
data: {
     indicatorDots:true,
     indicatorColor:"rgba(11,44,66,.6)",
     //焦点选中颜色
     active:"#c20c0c",
  },
```

# 三.collect-sorage

```javascript
//3-1 设一一个对象装载缓存
{
       "0":"false",
       "1":"true",
       "2":"false",
       "3":"true"
}


//3-2 有缓存设获取缓存,没有缓存则设置缓存
    var collection =wx.getStorageSync('collection');
     /* 有缓存,获取缓存 */
     if(collection){
        collected = collection[id];
        this.setData({
          isCollected:collected
        })
     }else{
       /*没有缓存,就设置缓存 */
       var collection = {};
       collection[id] = false;
       wx.setStorageSync('collection', collection)
       /* {"0":"false","1":"false"} */
     }


//3-3  设计点击事件
<image bind:tap="handleCollect" ...></image>
handleCollect(){
    /* 获取缓存 */
    var collection= wx.getStorageSync('collection')
    var collected = !collection[this.data.id];
    collection[this.data.id] = collected;
    /* 更新缓存 */
    wx.setStorageSync('collection', collection)
    this.setData({
      isCollected:collected
    })
  }
```



# *.使用本地数据

#### 1-1从本地文件下导出

```javascript
module.exports = {
    postList: local_database,
    bannerUrl:"https://music.aityp.com/banner"
}
```

#### 1-2到需要的页面导入

.js

```javascript
var data=require('../../data/local')
```

```javascript
Page({
  data: {
     item:"",
     id:""
  },
  onLoad: function (options) {
     var {id}=options;
     var {postList}=data;
     this.setData({
       item:postList[id],
       id,
     })
```

.wxml

直接渲染item下面的数据

```javascript
<text class="text">{{item.author}}</text>
<text class="publish">发表于</text>
<text class="text">{{item.dateTime}}</text>
```

# 四.弹窗/分享

```javascript
1-1弹窗
//wx.showModal
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

```

```javascript
1-2分享
//wx.showActionSheet
 wx.showActionSheet({
    itemList: ['分享到微信','分享到朋友圈'],
    itemColor: '#000000',
    success: (res)=>{
      console.log(res.tapIndex)
    },
    fail: ()=>{},
    complete: ()=>{}
  });
```

封装showModal

```javascript
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
}
```

调用showModal

```javascript
 handleCollect(){
   var collection=wx.getStorageSync('collection');
   var collected=!collection[this.data.id];
   collection[this.data.id]=collected;
   /* 更新缓存 */
   //  直接调用
   this.showModal(collected,collection)
 },
```



# 五.音乐播放

#### 1-1给它一个点击事件

```javascript
  <image class="play" bind:tap="handleMusic" ></image>
```

#### 1-2实现音乐播放、暂停

```javascript
handleMusic(){
   if(this.data.isPlay){
       //播放状态
     audio.pause();
     this.setData({
       isPlay:false
     })
   }else{
     audio.title=this.data.item.music.title;
     audio.src=this.data.item.music.url;
     this.setData({
       isPlay:true
     })
   }
 }
```

#### 1-3监听音乐播放  bottom-icon

```javascript
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
```

#### 1-4退出和进入时按钮一致

```javascript
//app.js
//1-4-1  定义g_isPlay记录音乐播放的状态
App({
     onLaunch:function(options){

     },
     globalData:{
       g_isPlay:false
     }
  })
  
  //1-4-2  在handleMusic事件中设置g_isPlay
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
     app.globalData.g_isPlay=true;
   }
 }

//1-4-3  在onLoad()生命周期中监听
 if(app.globalData.g_isPlay){
      this.setData({
        isPlay:true
      })
     //设置一下app.globalData
      app.globalData.g_isPlay=false;
    }else{
      this.setData({
        isPlay:false
      })
      app.globalData.g_isPlay=true;
    }
  },
```

#### 1-5

```javascript
//1-5-1 在app.json   定义g_palyId记录正在播放音乐的id
App({
     globalData:false,
     g_playId:""
})

//1-5-2 在音乐播放函数中
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

//1-5-3  onLoad()生命周期中
onLoad(){
    //如果播放状态和当前id是一样的才是播放按钮状态
     if(app.globalData.g_isPlay && app.globalData.g_playId==id){
      this.setData({
        isPlay:true
      })
    }else{
      this.setData({
        isPlay:false
      })
    }
  },
      
```

# 六.movie--处理评分组件

```javascript
function formatStar(value){
    var value=value.slice(0,1);
    /* 3.5
    3  [1,1,1,0,0] */
    var arr=[]
    for(var i=1;i<=5;i++){
        if(i<=value){
            arr.push(1)
        }else{
            arr.push(0)
        }
    }
    return arr;
}
module.exports={
    formatStar:formatStar
}
```

# 七.使用小程序调用相册/相机

```javascript
<view class="head">
    <image src="{{imageUrl}}" class="logo"
    bind:tap="handleImage" ></image>
</view>
```

```javascript
data:{
     imageUrl:"/images/avatar/logo.png",
}
handleImage(){
     wx.chooseImage({
       count: 9, 
       sizeType: ['original', 'compressed'], 
       sourceType: ['album', 'camera'],     //album是相册，camera是相机
       success: function(res){
       const src=res.tempFilePaths[0]
         this.setData({
           imageUrl:src
         })
       }
     })
   }
```



# 八.map

使用坐标拾取器

```javascript
data:{
   //当前位置
 longitude:114.504383,    //经度
 latitude:30.552500,   //纬度
 scale:18   
 showCompass:true,
 //定位小图标
 markers:[{
 iconPath:"/images/icon/location.png",
 id:0,
 latitude:30.552500,
 longitude:114.504383,
 height:20,
 width:20
 }]，
 //路线图
  polyline: [{
      points: [{
        longitude:114.504383,  //起点
        latitude:30.552500
      }, {
        longitude: 113.324520,   //终点
        latitude: 23.21229
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    //周围范围
     circles:[
      {
        longitude:114.504383,
        latitude:30.552500,
        radius:50,
        fillColor:"#c20c0c66"
      }
    ]
} 

```

```javascript
<map class="map" longitude="{{longitude}}" 
latitude="{{latitude}}" scale="{{scale}}"
show-compass="{{showCompass}}"
markers="{{markers}}"
polyline="{{polyline}}"
circles="{{circles}}"
show-location="{{location}}">
    </map>
```

# 九.图片滚动

```javascript
<!-- <scroll-view  scroll-x="{{x}}" class="scroll">
    <view wx:for="{{movie.casts}}" wx:key="{{item.name}}">
        <image src="{{item.avatars.small}}" class="item">

        </image>
        <text>{{item.name}}</text>
    </view>
</scroll-view> -->
```

```javascript
data:{
    x:true
}
```

```javascript
.scroll{
    white-space: nowrap;
}
.scroll view{
    display: inline-block;
}
.item{
    width:200rpx;
    height: 270rpx;
}
```

# 十.网易云音乐播放

```javascript
1.跳转到music-play页面音乐可以播放
onLoad(){
    ...
    myaudio.title = name;
    myaudio.src = url;
    var poster = wx.getStorageSync('poster')
    myaudio.coverImgUrl = poster;
}    
2.执行点击事件，音乐可以暂时停止播放
 handleClick(){
     if(this.data.isPlay){
       this.setData({
         isPlay:false
       })
       myaudio.pause()
       wx.setStorageSync('playState', false)
     }else{
       this.setData({
         isPlay:true
       })
       myaudio.play()
       wx.setStorageSync('playState', true)
     }
  }
3.bottom-playIcon和音乐播放暂停一致
onLoad(){
     myaudio.onPlay(()=>{
      this.setData({
        isPlay:true
      })
    })
    myaudio.onPause(()=>{
      this.setData({
        isPlay:false
      })
    })
}
4。存在一个问题：跳转回music-detail播放的状态不会改变
解决：使用缓存去存储音乐播放的状态，
1.点击事件中存储 
2.onLoad
handleClick(){
    if(this.data.isPlay){
       this.setData({
         isPlay:false
       })
       myaudio.pause()
       wx.setStorageSync('playState', false)
     }else{
       this.setData({
         isPlay:true
       })
       myaudio.play()
       wx.setStorageSync('playState', true)
     }
}
onLoad(){
    ....//播放音乐的逻辑
    wx.setStorageSync('playState', true)
    
    myaudio.onPlay(()=>{
      this.setData({
        isPlay:true
      })
      wx.setStorageSync('playState', true)
   })
   myaudio.onPause(()=>{
     this.setData({
       isPlay:false
     })
     wx.setStorageSync('playState', false)
   })
}
5.在music-detail获取缓存 -->获取音乐播放的状态
onShow(){
    onShow() {
    var playState = wx.getStorageSync('playState');
    var playId = wx.getStorageSync('playId')
    if(playState!=null){
      this.setData({
        isPlay:playState
      })
    }
        this.setData({
            playId
        })
  }
}
```

```javascript
<image src="{{isPlay?'/images/icons/play.png':'/images/icons/pause.png'}}" class="play-icon"></image>
```

Tip:列表页面所有的状态都会是播放 ![img](https://gitee.com/big-frontend/douban-small/raw/master/assets/list.png) 

```javascript
6.解决以上问题
方案:将正在播放的id回传,只有播放的id等于列表页的id就是播放的状态
6-1 music-play.js
onLoad(){
    ...
    wx.setStorageSync('playId',id)
}
6-2 music-detail.js 获取id
onShow(){
    var playId = wx.getStorageSync('playId')
    this.setData({
      playId
    })
}
6-3 music-detail.wxml
//只有音乐为播放状态同时playId等于正在播放音乐的id,才显示播放的状态
<image src="{{isPlay &&playId == item.id?...}}></image>
```



### 十一.点击查看大图

```javascript
 <image src="{{item.avatars.small}}" data-url="{{item.avatars.small}}" bind:tap="handleImage" class="item"></image>
```

```javascript
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
```

