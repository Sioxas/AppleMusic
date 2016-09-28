var pageObject = {
        data:{

        },
        search:function(e){
            var that = this
            console.log('搜索')
            wx.request({
                url: 'http://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',
                data: {
                    is_xml:0,
                    format:'jsonp',
                    key:e.detail.value,
                    g_tk:5381,
                    jsonpCallback:'SmartboxKeysCallbackmod_top_search463',
                    loginUin:0,
                    hostUin:0,
                    format:'jsonp',
                    inCharset:'utf8',
                    outCharset:'utf-8',
                    notice:0,
                    platform:'yqq',
                    needNewCode:0,
                },
                header: {
                    'Content-Type': 'text/html;charset=utf-8'
                },
                success: function(res) {
                    // var pattern =new RegExp("\\((.*?)\\)","igm");
                    that.setData({
                        searchRes:JSON.parse(res.data.substring(38,res.data.length-1)).data
                    })
                }
            })
        }
}

Page(pageObject)