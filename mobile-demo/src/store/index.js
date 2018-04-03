import Vue from 'vue'
import Vuex from 'vuex'
import transfer from './modules/transfer'
import account from './modules/account'
import card from './modules/card'
import introduct from './modules/introduct'

Vue.use(Vuex)

export function createStore(){
    return new Vuex.Store({
        state: {
            // 存放全局变量
            isLoading: false,
            /**
             * 是否通过replace跳转的标识符
             */
            isReplace: false
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
