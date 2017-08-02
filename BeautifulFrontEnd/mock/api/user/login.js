
//req.query
var bindFlag = Math.random() * 10
if (bindFlag === 5){
    bindFlag = bindFlag.toString()
}else if (bindFlag < 5) {
    bindFlag = '0'
}else {
    bindFlag = '1'
}

var bindType = Math.random() * 10
bindType = bindType.toString()

next(null, {
    data: {
    	nickName:"你的意思是...",
    	headImgUrl: "http://pic.qqtn.com/up/2016-9/2016091811555174236.jpg",
    	bindFlag: bindFlag,
    	bindType: bindType,
    	dataStatus: bindType,
    	sMobile: "186****5034"

    },
    code: "0000",
    message: "登录成功！"
});
