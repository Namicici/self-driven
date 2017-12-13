export default {
    namespaced: true,
    state () {
        return {

        }
    },
    mutations: {
        update (state, obj) {
            state[obj.key] = obj.value
        }
    }
}
