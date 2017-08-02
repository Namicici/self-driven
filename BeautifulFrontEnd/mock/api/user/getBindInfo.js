
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
if (bindType < 3){
    bindType = '1'
}else if (bindType < 6) {
    bindType = '3'
}else {
    bindType = '5'
}

next(null, {
    data: {
    	nickName: "你的意思是...",
    	headImgUrl: "http://pic.qqtn.com/up/2016-9/2016091811555174236.jpg",
    	bindFlag: bindFlag,
    	bindType: bindType,
    	dataStatus: "0",
    	sMobile: "186****5034"

    },
    code: "0000",
    message: "查询成功！"
});
