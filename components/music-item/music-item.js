// pages/index/compoments/item/item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    data:Array,
    subTitle:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleDetail(event){
      var id = event.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/music-detail/music-detail?id=${id}`
      })
    },
    handleMore(){
      var subTitle=escape(this.properties.subTitle);
      console.log(subTitle)
      wx.navigateTo({
        url: '/pages/music-more/music-more?subTitle='+subTitle,
      });
    },
  },
 
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  }
})
