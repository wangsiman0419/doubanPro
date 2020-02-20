var baseUrl="http://localhost:3000/";
function http({url,data}){
   return new Promise((resolve,reject)=>{
       wx.request({
           url:baseUrl+url,
           data,
           header: {'content-type':'japplication/json'},
           method: 'GET',
           dataType: 'json',
           responseType: 'text',
           success: (res)=>{
               resolve(res)
           },
           fail: (err)=>{
               reject(err)
           }
       });
   })
}
module.exports={
    getHot:()=>{
        return http({
            url:'top/playlist?order=hot',
        })
    },
    getChina:()=>{
        return http({
            url:'top/playlist?cat=华语'
        })
    },
    getProgram:()=>{
        return http({
            url:'personalized/djprogram'
        })
    },
    getDetail:(id)=>{
        return http({
            url:'playlist/detail',
            data:{
                id
            }
        })
    },
    getMore:(subTitle)=>{
        return http({
            url:subTitle
        })
    },
    getPlay:(id)=>{
      return http({
          url:'song/url',
          data:{
              id
          }
      })
    }
}