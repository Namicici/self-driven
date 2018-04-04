import Vue from 'vue'
import Vuex from 'vuex'
import transfer from './modules/transfer'
import account from './modules/account'
import card from './modules/card'
import introduct from './modules/introduct'
import { fetchItem } from './api'

Vue.use(Vuex)

export function createStore () {
    return new Vuex.Store({
        state: {
            items: {},
            // 存放全局变量
            isLoading: false,
            /**
             * 是否通过replace跳转的标识符
             */
            isReplace: false
        },
        actions: {
            fetchItem ({ commit }, id) {
                // `store.dispatch()` 会返回 Promise，
                // 以便我们能够知道数据在何时更新
                return fetchItem(id).then(item => {
                    console.log(item)
                    commit('setItem', { id, item })
                })
            }
        },
        mutations: {
            // 统一更新方法 this.$store.commit('update',{key:'name',value:'zhang'})
            update (state, obj) {
                state[obj.key] = obj.value
            },
            // 批量提交
            updateAll (state, obj) {
                Object.keys(obj).forEach((key) => {
                    state[key] = obj[key]
                })
            },
            updateLoading (state, status) {
                state.isLoading = status
            },
            updateReplace (state, status) {
                state.isReplace = status
            },
            setItem (state, { id, item }) {
                Vue.set(state.items, id, item)
            }
        },
        modules: {
            transfer,
            account,
            introduct,
            card
        }
    })
}
