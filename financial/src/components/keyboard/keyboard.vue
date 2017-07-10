<template>
    <div class="container-keyboard" v-on:click="innerTap">
        <div class="pop-keyboard-wrapper" id="popKeyboardWrapper" style="border-top: 1px solid #C5C6CB;">
            <div id="charTopArea" class="keyboard-top" style="display: -webkit-box;">
                <div class="icotitle">
                    <text class="titleico"><img class="icoimg" src="../keyBoard/images/ico.png" /></text>
                    <text class="titlespan">小方银行安全键盘</text>
                </div>
                <div class="keyBoard-tab">
                    <text id="number-tab" class="keyboard-tab-item" style="color: {{numberActive}}" v-on:click="tabChange">数字</text>
                    <text id="char-tab" class="keyboard-tab-item" style="color: {{charActive}}" v-on:click="tabChange">字母</text>
                    <text id="symbol-tab" class="keyboard-tab-item" style="color: {{symbolActive}}" v-on:click="tabChange">符号</text>
                </div>
            </div>
            <div id="numPanel" class="keyboard-number" wx:if="{{isNumber==true}}">
                    <text wx:for="{{numbers}}" class="code-item {{bgColor}}" data-for="{{item}}" v-on:click="getField">{{item}}</text>
                    <text class="code-item keyboard-delete {{bgColor}}" data-for="del" v-on:click="tapDelete"></text>
                    <text class="code-item {{bgColor}}" data-for="{{numbers_last}}" v-on:click="getField">{{numbers_last}}</text>
                    <text class="code-item {{bgColor}}" bindtap="tapDone">确定</text>
            </div>
            <div class="keyboard-character" wx:if="{{isChar==true}}">
                <div class="ui-pack-justify">
                    <div wx:for="{{chars_firstLine}}" class="char-item {{bgColor}} " data-for="{{item.value}}" v-on:click="getField"><text>{{item.value}}</text><div v-if="{{item.active&&!isSafeModel}}" class="char-item-unsafty">{{item.value}}<div class="char-item-bg"></div></div></div>
                </div>
                <div class="ui-pack-justify">
                    <text class="half"></text>
                    <div wx:for="{{chars_secondLine}}" class="char-item {{bgColor}}" data-for="{{item.value}}" v-on:click="getField"><text>{{item.value}}</text><div v-if="{{item.active&&!isSafeModel}}" class="char-item-unsafty">{{item.value}}<div class="char-item-bg"></div></div></div>
                    <text class="half"></text>
                </div>
                <div class="ui-pack-justify">
                    <text class="char-item third-blue {{caseClass}} {{bgColor}}" data-for="shift" v-on:click="changeCase"></text>
                    <div v-for="{{chars_thirdLine}}" class="char-item {{bgColor}}" data-for="{{item.value}}" v-on:click="getField"><text>{{item.value}}</text><div wx:if="{{item.active&&!isSafeModel}}" class="char-item-unsafty">{{item.value}}<div class="char-item-bg"></div></div></div>
                    <text class="char-item third-blue char-delete {{bgColor}}" data-for="del" v-on:click="tapDelete"></text>
                </div>
                <div class="keyboard-other ui-pack-justify">
                    <div class="char-item third-blue keyboard-other-search" data-for="saft">
                        <div id="bigimg1" bindtap="modelChange"><image src="{{modelSrc}}" style="{{modelImgWidth}};height:1.7rem;"></image></div>
                    </div>
                    <text class="char-item keyboard-other-space {{bgColor}}" data-for=" " v-on:click="getField">空格</text>
                    <text class="char-item keyboard-other-done {{bgColor}}" data-for="done" v-on:click="tapDone">确定</text>
                </div>
            </div>
            <div id="symbolPanel" class="keyboard-symbol" v-if="{{isSymbol==true}}">
                <div class="ui-pack-justify">
                    <div v-for="{{symbols_firstLine}}" class="char-item {{bgColor}}" data-for="{{item.value}}" v-on:click="getField"><text>{{item.value}}</text><div wx:if="{{item.active&&!isSafeModel}}" class="char-item-unsafty">{{item.value}}<div class="char-item-bg"></div></div></div>
                </div>
                <div class="ui-pack-justify">
                    <text class="half"></text>
                    <div v-for="{{symbols_secondLine}}" class="char-item {{bgColor}}" data-for="{{item.value}}" v-on:click="getField"><text>{{item.value}}</text><div wx:if="{{item.active&&!isSafeModel}}" class="char-item-unsafty">{{item.value}}<div class="char-item-bg"></div></div></div>
                    <text class="half"></text>
                </div>
                <div class="ui-pack-justify">
                    <text class="half"></text>
                    <div v-for="{{symbols_thirdLine}}" class="char-item {{bgColor}}" data-for="{{item.value}}" v-on:click="getField"><text>{{item.value}}</text><div wx:if="{{item.active&&!isSafeModel}}" class="char-item-unsafty">{{item.value}}<div class="char-item-bg"></div></div></div>
                    <text class="half"></text>
                </div>
                <div class="keyboard-other ui-pack-justify">
                    <div class="char-item third-blue keyboard-other-search" data-for="saft">
                        <div id="bigimg3" bindtap="modelChange"><image src="{{modelSrc}}" style="{{modelImgWidth}};height:1.7rem;"></image></div>
                    </div>
                    <text class="char-item keyboard-other-space {{bgColor}}" style="width:7rem;" data-for=" " v-on:click="getField">空格</text>
                    <text class="char-item third-blue  char-delete {{bgColor}}" data-for="del" v-on:click="tapDelete"></text>
                    <text class="char-item keyboard-other-done {{bgColor}}" style="width:4rem" data-for="done" v-on:click="tapDone">确定</text>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
'use strict';

import {RSA} from '../../services/RSA';
import GlasIcon from './glas.png';
import LogoIcon from './ico.png';
import Icons from './images-s50e0898f3a.png';
import DelIcon from './numDel.png';
import SaftIcon from './saft.png';

var setMaxDigits =  RSA.setMaxDigits;
var RSAKeyPair =  RSA.RSAKeyPair;
var encryptedString =  RSA.encryptedString;

export default {
    name: 'ss-keyboard',
    data: function(){
        return{
            /***number keyboard***/
            isNumber:false,
            numberActive:'',
            numbers:[],
            numbers_last:null,
            /***number keyboard***/
            /***char keyboard***/
            isChar:true,
            isLowerCase:true,
            caseClass:'switch',
            charActive:"#4FA5E3 !important;",
            chars_firstLine:[{value:'q',active:false}, {value:'w',active:false}, {value:'e', active:false}, {value:'r',active:false}, {value:'t', active:false}, {value:'y', active:false}, {value:'u', active:false}, {value:'i', active:false}, {value:'o', active: false}, {value:'p', active:false}],
            chars_secondLine:[{value:'a',active:false}, {value:'s', active:false}, {value:'d', active:false}, {value:'f', active:false}, {value:'g', active:false}, {value:'h',active:false}, {value:'j', active:false}, {value:'k', active: false}, {value:'l', active:false}],
            chars_thirdLine:[{value:'z',active:false}, {value:'x',active:false}, {value:'c',active:false},{value: 'v',active:false}, {value:'b',active:false}, {value:'n',active:false}, {value:'m',active:false}],
            isSafeModel: false,
            modelSrc: '../images/glas.png',
            modelImgWidth:'width:2rem',
            bgColor:'bg-color',
            /***char keyboard***/
            /***symbol keyboard***/
            isSymbol: false,
            symbolActive:'',
            symbols_firstLine:[{value:"'",active:false}, {value:'~',active:false}, {value:'!',active:false}, {value:'@',active:false}, {value:'#',active:false}, {value:'$',active:false}, {value:'%',active:false}, {value:'^',active:false}, {value:'&',active:false}, {value:'*',active:false}],
            symbols_secondLine:[{value:'(',active:false}, {value:')',active:false}, {value:'-',active:false}, {value:'+',active:false}, {value:'[',active:false}, {value:']',active:false}, {value:'{',active:false}, {value:'}',active:false}, {value:',',active:false}],
            symbols_thirdLine:[{value:'|',active:false}, {value:';',active:false}, {value:'=',active:false}, {value:'_',active:false}, {value:'<',active:false}, {value:'>',active:false}, {value:':',active:false}, {value:'?',active:false}, {value:'.',active:false}],
            /***symbol keyboard***/
            password:[]
        }
    },
    /***** keyboard ******/
    rsa: function(){
        var self = this;
        var rsa_exponent = "10001";
        var  rsa_modulus = "ac8e5f9bea40d0c06b76b04595e8457679251d590f5f3f442b0802b2055ea63b72c7c3b502c05856154bba1fdfaa3fa50478273187882ccc4f02c3b192a1455a6572d0d68b5ce132e765449b1b2edcd3a9cf8cc66ea838ff7dc74bc5e8b8ef37b37914227de536b4ace62e537c41ef0ce6ce4194e9c4ef472dd61ce2fb5cdaf5";
        	setMaxDigits(130);
        	var key = new RSAKeyPair(rsa_exponent, "", rsa_modulus);
        	var encryptRtn = encryptedString(key, self.data.password);
        	return encryptRtn;

    },
    initNumber: function(){
        var that = this;
        var temp = [0,1,2,3,4,5,6,7,8,9].sort( function(){return(Math.random() - 0.5)});
        var temp_last = temp.splice(9,1);
        that.setData({
            numbers:temp,
            numbers_last: temp_last
        })
    },
    changeCase: function(){
    var self = this;
    self.setData({
      isLowerCase: !self.data.isLowerCase
    })
    var temp_firstLine = [];
    var temp_secondLine = [];
    var temp_thirdLine = [];
    if(self.data.isLowerCase){
      self.data.chars_firstLine.forEach(function(item){temp_firstLine.push(item.toLowerCase())});
      self.data.chars_secondLine.forEach(function(item){temp_secondLine.push(item.toLowerCase())});
      self.data.chars_thirdLine.forEach(function(item){temp_thirdLine.push(item.toLowerCase())});
    }else{
      self.data.chars_firstLine.forEach(function(item){temp_firstLine.push(item.toUpperCase())});
      self.data.chars_secondLine.forEach(function(item){temp_secondLine.push(item.toUpperCase())});
      self.data.chars_thirdLine.forEach(function(item){temp_thirdLine.push(item.toUpperCase())});
    }
    self.setData({
      chars_firstLine: temp_firstLine,
      chars_secondLine: temp_secondLine,
      chars_thirdLine: temp_thirdLine
    })
    if (self.data.isLowerCase){
      self.setData({
        caseClass:'switch',
      })
    }else{
      self.setData({
        caseClass:'switch-upper',
      })
    }
    },
    initConf: function(){
      var self = this;
      self.setData({
        focus:true,
        password:[],
        isNumber:false,
        numberActive:'',
        numbers:[],
        numbers_last:null,

        isChar:true,
        isLowerCase:true,
        caseClass:'switch',
        charActive:"#4FA5E3 !important;",
        isSafeModel: false,
        modelSrc: '../images/glas.png',
        modelImgWidth:'width:2rem',
        bgColor: 'bg-color',

        isSymbol: false,
        symbolActive:'',
      })
      self.initNumber();
    },
    modelChange: function(){
    var self = this;
    self.setData({
        isSafeModel: !self.data.isSafeModel
    });
    if (self.data.isSafeModel){
        self.setData({
            modelSrc:'../images/saft.png',
            modelImgWidth:'width:4rem',
            bgColor: '',
        })
    }else{
        self.setData({
            modelSrc:'../images/glas.png',
            modelImgWidth:'width:2rem',
            bgColor: 'bg-color',
        })
    }
    },
    tabChange: function(event){
      var self = this;
      if(event.currentTarget.id=='number-tab'){
        self.setData({
            isNumber:true,
            numberActive:"#4FA5E3 !important;",
            isChar:false,
            charActive:'',
            isSymbol: false,
            symbolActive:''
        })
      }else if(event.currentTarget.id=='char-tab'){
        self.setData({
            isNumber:false,
            numberActive:'',
            isChar:true,
            charActive:"#4FA5E3 !important;",
            isSymbol: false,
            symbolActive:''
        })
      }else{
        self.setData({
            isNumber:false,
            numberActive:'',
            isChar:false,
            charActive:'',
            isSymbol: true,
            symbolActive:"#4FA5E3 !important;"
        })
      }
    },

    setItemFlag: function(list, key, flag){
      var self = this;
      var temp = list;
      for (var i = 0; i < temp.length; i++){
          var item = temp[i];
          if (item.value == key){
              item.active = flag;
              return temp;
          }
      }
      return null;
    },
    setButtonFlag: function(key, flag){
      var self = this;
      var temp = self.setItemFlag(self.data.chars_firstLine, key, flag);
      if (temp){
        self.setData({
            chars_firstLine: temp
        })
      }
      var temp = self.setItemFlag(self.data.chars_secondLine, key, flag);
      if (temp){
        self.setData({
            chars_secondLine: temp
        })
      }
      var temp = self.setItemFlag(self.data.chars_thirdLine, key, flag);
      if (temp){
        self.setData({
            chars_thirdLine: temp
        })
      }
      var temp = self.setItemFlag(self.data.symbols_firstLine, key, flag);
      if (temp){
        self.setData({
            symbols_firstLine: temp
        })
      }
      var temp = self.setItemFlag(self.data.symbols_secondLine, key, flag);
      if (temp){
        self.setData({
            symbols_secondLine: temp
        })
      }
      var temp = self.setItemFlag(self.data.symbols_thirdLine, key, flag);
      if (temp){
        self.setData({
            symbols_thirdLine: temp
        })
      }
    },
    getField: function(e){
      var self = this;
      self.setData({
          password: self.data.password+[e.currentTarget.dataset.for]
      })
      self.setButtonFlag(e.currentTarget.dataset.for, true);
      self.customField();
      setTimeout(function(){
        self.setButtonFlag(e.currentTarget.dataset.for, false)
        },300);
    },
    tapDone: function(e){
    var self = this;
    //var result = self.rsa(self.data.password);
    var result = self.data.password;
    self.customResult(result);
    self.setData({
      focus: false
    })
    },
    outTap: function(e){
    var self = this;
    self.tapDone();
    self.setData({
      focus: false
    })
    },
    innerTap: function(e){
    console.log('inner tap');
    },
    tapDelete: function(e){
    var self = this;
    self.setData({
      password:[]
    })
    self.customInit(e);
    }
    /***** keyboard ******/
}

</script>

<style lang="less">
/* pages/index/index.wxss */
.container-keyboard{
    position: fixed;
    bottom: 0px;
    width:100%;
    height: 13rem;
	background-color: #6F7A8C;
}

.pop-keyboard-wrapper {
	width: 100%;
    height: 100%;
    border:none;
	z-index: 100;
}

.keyboard-top {
    padding:0.5rem 0;
	background-color: #EBEFEE
}

.icotitle{
	width: 54%;
}
.icoimg {
	width: 30px;
	padding-left: 8px;
    border: 0;
    float: left;
    -ms-interpolation-mode: bicubic;
    -webkit-interpolation-mode: bicubic;
}
.safticoimg{
    width: 86px;
    height: 43px;
}

.titleico {
	display: table-cell;
    vertical-align: middle;
}

.titlespan {
	float: left;
    font-size: 15px;
    font-weight: bold;
    color: #000;
}


.keyBoard-tab{
	width: 46%;
	text-align: right;
}
.keyboard-tab-item{
    padding-left: 5px;
    text-align: center;
    height: 0.49rem;
    line-height: 0.49rem;
    display: inline-block;
    font-size: 18px;
    color: #000;
    font-weight: bold;
}

.code-item{
	position:relative;
	display: flex;
	justify-content: center;
	width:33%;
	float: left;
	border-top:1px solid rgba(156, 161, 171, 0.5);
	border-right:1px solid rgba(156, 161, 171, 0.5);
	color:#fff;
	font-size:1.2rem;
	font-weight:100;
	height:2.55rem;
	text-align:center;
	align-items:center;

}
.keyboard-delete{
	background-color: #819ec1;
}
.keyboard-delete:after{
	content:'';
	display:block;
	width:3rem;
	height:1.7rem;
	background-image:url('../images/images-s50e0898f3a.png');
	background-repeat:no-repeat;
	background-position:120% 65%;
	background-size:2.42646rem auto;
}
.ui-pack-justify{
	width:100%;
}
.char-item{
	position:relative;
	display:flex;
	justify-content:center;
	float:left;
	width:8.6%;
	height:2.3rem;
	background-color:#E6EDF3;
	color:#101010;
	font-size:1.28rem;
	font-weight:100;
	-webkit-box-shadow:0px 1px 1px rgba(0, 0, 0, 0.35);
	box-shadow:0px 1px 1px rgba(0, 0, 0, 0.35);
	-webkit-border-radius:0.04rem;
	border-radius:0.2rem;
	margin-top:0.26rem;
	text-align:center;
	margin-left:0.25rem;
	align-items:center;
}
.char-item-unsafty{
	position:absolute;
	top:-2rem;
	background:white;
	width:1.78rem;
	height:2rem;
	left:0;
	padding-top:8px;

}
.char-item-unsafty:after{
	content: '';
}
.char-item-bg{
	width:1rem;
	background-color:white;
	border-top:solid 2.5rem white;
	border-left:solid 0.4rem #E6EDF3;
	border-right:solid 0.42rem #E6EDF3;
	position:absolute;
	bottom:-2rem;
	left:0px;
	top:30px;

}
.char-item-bg:after{
}
.bg-color:active{
	background-color:rgb(96, 181, 236);
}
.half{
	margin-left:1rem;
}
.switch{
	width:2.5rem;
}
.switch:after{
	content:'';
	display:block;
	width:3rem;
	height:1.7rem;
	background-image:url('../images/images-s50e0898f3a.png');
	background-repeat:no-repeat;
	background-position:240% 104%;
	background-size:2.2rem auto;

}
.switch-upper{
	width:2.5rem;
}
.switch-upper:after{
	content:'';
	display:block;
	width:3rem;
	height:1.7rem;
	background-image:url('../images/images-s50e0898f3a.png');
	background-repeat:no-repeat;
	background-position:500% 84%;
	background-size:2.42646rem auto;
}

.ui-pack-justify {
	display: flex;
	-webkit-box-pack: justify
}
.third-blue{
	background-color:#819ec1;
}
.char-delete{
	width:2.5rem;
}
.char-delete:after{
	content:'';
	display:block;
	width:3rem;
	height:1.7rem;
	background-image:url('../images/images-s50e0898f3a.png');
	background-repeat:no-repeat;
	background-position:130% 65%;
	background-size:2rem auto;
}
.keyboard-other-search{
	width:5rem;
}
.keyboard-other-space{
	width:9rem;
}
.keyboard-other-done{
	width:5rem;
}
</style>
