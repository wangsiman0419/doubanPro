// pages/movie/movie.js
const http=require('../../utils/http')
Page({
  data: {
      movies:{}
  },
  onLoad:async function () {
    var storageData=wx.getStorageSync('movies');
    if(storageData){
      this.setData({
        movies:storageData
      })
    }else{
      var movies={};
      var top250=await http.getTop250();
      var inTheathers=await http.getInTheaters();
      var comingSoon=await http.getComingSoon();
      movies.inTheathers={};
      movies.inTheathers.title="正在热映"
      movies.inTheathers.data=inTheathers.data.subjects.slice(0,3);
      movies.inTheathers.subTitle="in_theaters"

      movies.comingSoon={};
      movies.comingSoon.title="即将上映"
      movies.comingSoon.data=comingSoon.data.subjects.slice(0,3);
      movies.comingSoon.subTitle="coming_soon"

      movies.top250={};
      movies.top250.title="豆瓣top250"
      movies.top250.data=top250.data.subjects.slice(0,3);
      movies.top250.subTitle="top250"

      wx.setStorageSync('movies', movies)
      this.setData({
        movies
      })
    }
  },
  handleMore(event){
    var {subtitle,title}=event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/movie-more/movie-more?subtitle=${subtitle}`
    });
  }
})