export default {
    namespaced: true,
    state () {
        return {
            clickKey: ''
        }
    },
    mutations: {
        update (state, obj) {
            state[obj.key] = obj.value
        },
        setClickKey (state, clickKey) {
            state.clickKey = clickKey
        }
    }
}
