// pages/index/index.js
//var app = getApp()
var keyboard = require('../../keyboard/keyboard.js');

var pageInit = {
  data:{
    focusId: '',
    pseudoPassword:'',
    pseudoPassword2:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  customInit: function(e){
    var self = this;
    if (self.data.focusId == 'focus2'){
      self.setData({
          pseudoPassword2:''
        })
    }
    if (self.data.focusId == 'focus1'){
      self.setData({
          pseudoPassword:''
        })
    }
  },
  customResult: function(result){
    var self = this;
    if (self.data.focusId == 'focus1'){
      console.log("focus1:" + result + ' ' + self.data.pseudoPassword);
    }
    if (self.data.focusId == 'focus2'){
      console.log("focus2:" + result + ' ' + self.data.pseudoPassword2);
    }
  },
  popKeyboard: function(e){
    var self = this;
    self.setData({
      focusId: e.target.id
    })
    self.initConf(self.customInit(e));
  },

  customField: function(){
    var self = this;
    if (self.data.focusId == 'focus1'){
      self.setData({
        pseudoPassword:  self.data.pseudoPassword+'*'
      })
    }
    if (self.data.focusId == 'focus2'){
      self.setData({
        pseudoPassword2:  self.data.pseudoPassword2+'*'
      })
    }
  }
  
}

function contract(target){
  for (var item in target){
    if (item == 'data'){
      for (var key in target['data']){
        pageInit['data'][key] = target['data'][key];
      }
    }else{
      pageInit[item] = target[item];
    }
  }
  return pageInit;
}


Page(contract(keyboard))