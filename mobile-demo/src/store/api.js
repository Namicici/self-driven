import Axios from '../utils/http'

function getTestRenderReq () {
    let promise = Axios({
        method: 'get',
        url: '/test/render'
    })
    return promise
}

export function fetchItem (id) {
    let mapping = {
        'testRender': getTestRenderReq
    }
    let handlerFun = mapping[id]
    if (typeof (handlerFun) === 'function') {
        return handlerFun()
    } else {
        console.log('handlerFun is not a function')
        return null
    }
}
