// import uuidMixin from './mixin_uuid'
// import store from '../store/index'

export default {
    // mixins: [uuidMixin],
    // props: {
    //     required: {
    //         type: Boolean,
    //         default: false
    //     }
    // },
    // created () {
    //     this.handleChangeEvent = false
    // },
    mounted () {
        this.$nextTick(function () {
            // Code that will run only after the
            // entire view has been rendered
            // store.commit('updateLoading', false)
        })
    },
    route: {
        data (transition) {
            this.init(transition)
        }
    },
    computed: {
        // dirty: {
        //     get: function () {
        //         return !this.pristine
        //     },
        //     set: function (newValue) {
        //         this.pristine = !newValue
        //     }
        // },
        // invalid () {
        //     return !this.valid
        // }
    },
    methods: {
        // setTouched () {
        //     this.touched = true
        // }
    },
    watch: {
        // value (newVal) {
        //     if (this.pristine === true) {
        //         this.pristine = false
        //     }
        //     if (!this.handleChangeEvent) {
        //         this.$emit('on-change', newVal)
        //         this.$emit('input', newVal)
        //     }
        // }
    },
    data () {
        // return {
        //     errors: {},
        //     pristine: true,
        //     touched: false
        // }
    }
}
