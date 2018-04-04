import Vue from 'vue'
import App from './App'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import Axios from './utils/http'
import * as filters from './utils/filters'

Vue.config.productionTip = false

Vue.prototype.$http = Axios

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

export function createApp () {
    /* eslint-disable no-new */
    let router = createRouter()
    let store = createStore()

    router.constructor.prototype._replace = router.constructor.prototype.replace

    router.constructor.prototype.replace = function (location, onComplete, onAbort) {
        // 更新公共参数isReplace为true，表示是replace
        store.commit('updateReplace', true)
        return this._replace(location, onComplete, onAbort)
    }

    let app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    // 同步router状态到store
    sync(store, router)

    return {app, router, store}
}
