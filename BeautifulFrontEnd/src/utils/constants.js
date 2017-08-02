
export const BIND_TYPE = {
    NORMAL_SMS: '1', // 普通短信
    // ENCRYPTED_SMS: '3', // 贴膜卡加密短信
    TRANSACTION_CERTIFICATION: '5' // 贴膜卡交易认证
}

export const BIND_FLAG = {
    BINDED: '1', // 绑定了
    UNBIND: '0' // 未绑定
}

export const DATA_STATUS = {
    PAYMENT_PASSWORD_AND_SECURITY_NOT_PERFERT: '0', // 支付密码及安全问题未完善
    PAYMENT_PASSWORD_NOT_PERFERT: '1', // 支付密码未完善
    SECURITY_NOT_PERFERT: '2' // 安全问题
}

export const CARD_TYPE = {
    DEBIT: '1', // 借记卡
    // CREDIT: '2', //信用卡
    PASSBOOK: '0', // 存折
    CARGO: '3' // 货记卡
}

export const CARD_TYPE_MAPPING = {
    '0': '存折',
    '1': '借记卡',
    '2': '一证通',
    '3': '货记卡'
}

export const MODE_ADDED_TYPE = {
    ADDED_BY_STICK_CARD: 1, // 贴膜卡加挂
    ADDED_BY_NORMAL: 2 // 普通加挂
}

export const TRANS_STATUS_MAPPING = {
    '0': '初始状态',
    '1': '交易成功',
    '7': '认证失败',
    '8': '交易失败',
    '9': '交易超时'
}

export const TRANS_TYPE_MAPPING = {
    '1': '行内转账',
    '2': '普通汇款',
    '3': '快速汇款',
    '4': '实时汇款'
}

// 证件类型
// export const CERT_TYPE_MAPPING = {
//     '0001': '居民身份证',
//     '0002': '临时身份证',
//     '0003': '护照',
//     '0004': '户口簿',
//     '0005': '军人身份证',
//     '0006': '武装警察身份证',
//     '0007': '港澳台居民来往内地通行证',
//     '0008': '外交人员身份证',
//     '0009': '外国人永久居留证',
//     '0010': '边民出入通行证',
//     '0011': '个人其他证件'
// }
export const PAGE_SIZE = 20

export const TRANSFER_TYPE = {
    INCOME: '1', // 转入
    EXPENDITURE: '0'// 转出
}

export const TRANSFER_TYPE_MAPPING = {
    '1': '转入',
    '0': '转出'
}
