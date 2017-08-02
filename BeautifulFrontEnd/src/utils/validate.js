export default {
    isMobile: value => /^1\d{10}$/.test(value),
    isIOS: /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
}
