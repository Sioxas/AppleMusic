var util = require('../../utils/util.js')
var items = ['播放列表', '歌曲', '专辑', '演唱者']
var _songsList=[{
      dataUrl:'http://stream.qqmusic.tc.qq.com/137192078.mp3',
      title: '告白气球',
      author:'周杰伦',
      coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000003RMaRI1iFoYd.jpg'
    },{
      dataUrl:'http://stream.qqmusic.tc.qq.com/138549169.mp3',
      title: '你还要我怎样',
      author:'薛之谦',
      coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000000aWdOx24i3dG.jpg'
    },{
      dataUrl:'http://stream.qqmusic.tc.qq.com/137903929.mp3',
      title: '微微一笑很倾城',
      author:'杨洋',
      coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000003RxTdZ0sJLwo.jpg'
    },{
      dataUrl:'http://stream.qqmusic.tc.qq.com/132636799.mp3',
      title: '演员',
      author:'薛之谦',
      coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000003y8dsH2wBHlo.jpg'
    }]
var _albumList = [{
      name:'寂寞不痛',
      author:'A-Lin',
      image:'a-lin.png'
    },{
      name:'喜剧之王',
      author:'李荣浩',
      image:'ronghao-li.png'
    },{
      name:'I Know You Were Trouble.-Single',
      author:'Taylor Swift',
      image:'taylor-swift.png'
    },{
      name:'哎呦，不错哦',
      author:'周杰伦',
      image:'chou-jay.png'
    }]

var pageObject = {
  data: {
    playing:false,
    playingSongsNum:0,
    musicGroupName:items[0],
    listTemplateName:'music-play-list',
    actionSheetHidden: true,
    actionSheetItems: items,
    playBar:{
      dataUrl:'http://stream.qqmusic.tc.qq.com/137192078.mp3',
      title: '告白气球',
      author:'周杰伦',
      coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000003RMaRI1iFoYd.jpg'
    },
    songsList:_songsList,
    albumList :_albumList
  },
  playButtonTap:function(){
    var that = this

  },
  actionSheetTap: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  onLoad: function () {
    var that = this
    wx.onBackgroundAudioStop(function () {
      that.setData({
        playing: false
      })
    })
  },
  play: function (event) {
    var that = this
    var res=that.data.songsList[event.currentTarget.dataset.num]
    that.setData({
          playBar:res,
          playingSongsNum:event.currentTarget.dataset.num
    })
    wx.playBackgroundAudio({
      dataUrl: res.dataUrl,
      title: res.title,
      coverImgUrl: res.coverImgUrl,
      complete: function (res) {
        that.setData({
          playing: true
        })
      }
    })
    this._enableInterval()
  },
  pause: function () {
    var that = this
    wx.pauseBackgroundAudio({
      success: function () {
        that.setData({
          playing: false
        })
      }
    })
  },
  _enableInterval: function () {
    var that = this
    update()
    this.updateInterval = setInterval(update, 500)
    function update() {
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          that.setData({
            playTime: res.currentPosition,
            formatedPlayTime: util.formatTime(res.currentPosition + 1)
          })
        }
      })
    }
  },
  onUnload: function () {
    clearInterval(this.updateInterval)
  }
}

 for (var i = 0; i < items.length; ++i) {
   (function(itemName) {
     switch(itemName){
       case '播放列表':
          pageObject['bind' + itemName] = function(e) {
          console.log('click' + itemName, e)
          this.setData({
            musicGroupName:itemName,
            listTemplateName:'music-play-list',
            templateData:null,
            actionSheetHidden: !this.data.actionSheetHidden
          })
        }
       break;

       case '歌曲':
          pageObject['bind' + itemName] = function(e) {
          console.log('click' + itemName, e)
          this.setData({
            musicGroupName:itemName,
            listTemplateName:'songs-list',
            templateData:_songsList,
            actionSheetHidden: !this.data.actionSheetHidden
          })
        }
       break;

       case '专辑':
          pageObject['bind' + itemName] = function(e) {
          console.log('click' + itemName, e)
          this.setData({
            musicGroupName:itemName,
            listTemplateName:'album-list',
            templateData:_albumList,
            actionSheetHidden: !this.data.actionSheetHidden
          })
        }
       break;

       case '演唱者':
          pageObject['bind' + itemName] = function(e) {
          console.log('click' + itemName, e)
          this.setData({
            musicGroupName:itemName,
            listTemplateName:'author-list',
            templateData:null,
            actionSheetHidden: !this.data.actionSheetHidden
          })
        }
       break;
     }

   })(items[i])
 }



Page(pageObject)