
import Axios from './http'
import { getQueryFromUrl } from './tools'
import { MessageBox } from 'mint-ui'
import router from '../router'
import { BIND_TYPE, BIND_FLAG } from './constants'

export function closeBridgeWindow (message, flag) {
// if (message == undefined || message == "" || message == "undefined")
//     message = "";
// if ("loading" == flag) {
//     $.loading2();
// } else if ("gray" == flag) {
//     $("body").html("");
// }
// $.alert(message, "信息提示", function () {
        // WeixinJSBridge.call('closeWindow')
// });
}

/**
 * 检查url 上是否有login标识符:login=
 */
export function checkLogin () {
    let url = window.location.href
    if (url.lastIndexOf('login=') > -1) {
        let accessCode = getQueryFromUrl('code')
        var cachedAccessCode = localStorage.getItem('accessCode')
        // 如果通过url获取code与缓存code一致，不需要再登录
        if (accessCode !== '' && accessCode !== null && cachedAccessCode === accessCode) {
            return false
        }
        return true
    }
    return false
}

// 微信统一授权登录
export function login () {
    let loginCode = getQueryFromUrl('login')
    if (loginCode) {
        if (loginCode.indexOf('||') > -1) {
            let loginArray = loginCode.split('||')
            localStorage.setItem('appId', loginArray[0])
            localStorage.setItem('wechatAccount', loginArray[1])
        } else {
            closeBridgeWindow('公众号参数有误，请联系银行')
            return
        }
    }
    let accessCode = getQueryFromUrl('code')
    localStorage.setItem('accessCode', accessCode)

    let mdata = {}
    mdata.wechatAcct = localStorage.getItem('wechatAccount')
    mdata.appId = localStorage.getItem('appId')
    mdata.authCode = localStorage.getItem('accessCode')

    return new Promise((resolve, reject) => {
        Axios({
            method: 'POST',
            url: '/user/login',
            data: mdata
        }).then((data, a, b) => {
            if (data.code === '0000') {
                // 绑定方式1-普通短信，5贴膜卡交易认证
                let bindType = data.data.bindType
                // 0-支付密码以及安全问题未完善，1，支付密码未完善，2安全问题未完善，9已完善
                let dataStatus = data.data.dataStatus
                // 安全手机号：186****5034，只用于做显示用
                let sMobile = data.data.sMobile
                // localStorage.setItem('sessionID', //b.getResponseHeader('sessionId'))
                localStorage.setItem('sMobile', sMobile)
                localStorage.setItem('bindType', bindType)
                localStorage.setItem('dataStatus', dataStatus)
                localStorage.setItem('resetpwdCheckMsg', ((data.data.verifyCodeFlag === 'true' || data.data.verifyCodeFlag === true)) ? 'true' : 'false')
                resolve()
            } else if (!data.code || !data.message) {
                closeBridgeWindow('通讯异常，请重新进入', 'gray')
            }
        }, function () {
            closeBridgeWindow('通讯异常，请重新进入', 'gray')
        })
    })
}

 /**
  * 检查用户权限
  * 1.用户为游客状态（未绑定任何卡），将不能访问我的账户，转账汇款
  * 2.用户认证方式为短信绑定（bindtType = 1），将不能访问转账汇款
  * 3.用户认证方式为贴膜卡（bindType=5）,将可以访问所有功能
  * @author czw
  */
export function checkUserAuth () {
    let bindFlag = ''// 是否绑定 0=否1=是
    let bindType = ''// 绑定方式 1=普通短信 3=贴膜卡加密短信 5=贴膜卡交易认证
    let dataStatus = ''// 资料状态0=支付密码及安全问题未完善 1=支付密码未完善 2=安全问题未完善 9=已完善
    return new Promise((resolve, reject) => {
        Axios({
            method: 'get',
            url: '/user/getBindInfo'
        }).then(data => {
            if (data.code === '0000') {
                bindFlag = data.data.bindFlag
                bindType = data.data.bindType
                dataStatus = data.data.dataStatus
                // 更新缓存
                localStorage.setItem('bindFlag', bindFlag)
                localStorage.setItem('bindType', bindType)
                localStorage.setItem('dataStatus', dataStatus)

                if (bindFlag === BIND_FLAG.UNBIND) {
                    localStorage.removeItem('idx')
                    localStorage.removeItem('acctNo')
                    MessageBox.alert('您还未绑定银行卡', '信息提示').then(() => {
                        // router 到card/selectBindType.html，但是返回的时候返回到首页
                        router.replace('/card/bindType')
                    })
                } else if (bindType !== BIND_TYPE.TRANSACTION_CERTIFICATION && router.path === '/transfer') {
                    MessageBox.alert('只有贴膜卡账号才能转账汇款', '信息提示').then(() => {
                        router.go(-1)
                    })
                } else {
                    resolve()
                }
            } else {
                MessageBox(data.message, '信息提示')
            }
        })
    })
}

/**
 * 获取字典值
 */
export function getDic (options) {
    return Axios.get('dic/query', {params: options})
}

/**
 * 获取短信验证码
 */
export function getSmsCaptcha (options) {
    return Axios.get('/common/getVerifyCodeWithMobile', {params: options})
}

/**
 * 获取资讯数据
 */
export function getNews (options) {
    return Axios.get('/introduct/intrInfo', {params: options})
}

/**
 * 获取banner图列表
 */
export function getAdList (options) {
    return Axios.get('/ad/list', {params: options})
}

/**
 * 解绑账户
 */
export function unbindAcct (options) {
    return Axios({
        method: 'POST',
        url: '/user/unbindAcct',
        data: options
    })
}
