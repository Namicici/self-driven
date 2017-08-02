<template lang="html">
    <div :class="{'show':currShow}">
        <div class="mask dn"></div>
        <div class="pop-keyboard-wrapper">
            <div class="keyboard-top">
                <div class="icotitle">
                    <slot name="title">
                        <span class="titleico"><img class="icoimg" src="./images/ico.png" /></span>
                        <span class="titlespan">小方银行安全键盘</span>
                    </slot>
                </div>
                <div class="keyBoard-tab">
                    <span :class="{'keyBoard-tab-active': tab == 'n'}" @click="tabSwith('n')">数字</span>
                    <span :class="{'keyBoard-tab-active': tab == 'l'}" @click="tabSwith('l')">字母</span>
                    <span :class="{'keyBoard-tab-active': tab == 's'}" @click="tabSwith('s')">符号</span>
                </div>
            </div>
            <div class="keyboard-number" v-show="tab == 'n'">
                    <p class="num-active" v-for="num in numbers.slice(0,9)" @click="check(num,$event)">{{num}}</p>
                    <p class="keyboard-delete" @click="del"></p>
                    <p class="num-active" @click="check(numbers[9],$event)">{{numbers[9]}}</p>
                    <p class="kb-font" @click="done"><span>确定</span></p>
            </div>
            <div class="keyboard-character" v-show="tab == 'l'">
                <div v-show="!shiftStatus">
                    <div class="ui-pack-justify">
                        <p v-for="item in lowerLetter[0]" @click="check(item,$event)">{{item}}</p>
                    </div>
                    <div class="ui-pack-justify">
                        <p class="half"></p>
                        <p v-for="item in lowerLetter[1]" @click="check(item,$event)">{{item}}</p>
                        <p class="half"></p>
                    </div>
                    <div class="ui-pack-justify">
                        <p class="third-blue switch " @click="shift"></p>
                        <p v-for="item in lowerLetter[2]" @click="check(item,$event)">{{item}}</p>
                        <p class="third-blue keyboard-delete " style="height: 0.4rem !important;" @click="del"></p>
                    </div>
                </div>
                <div v-show="shiftStatus">
                    <div class="ui-pack-justify">
                        <p v-for="item in upperLetter[0]" @click="check(item,$event)">{{item}}</p>
                    </div>
                    <div class="ui-pack-justify">
                        <p class="half"></p>
                        <p v-for="item in upperLetter[1]" @click="check(item,$event)">{{item}}</p>
                        <p class="half"></p>
                    </div>
                    <div class="ui-pack-justify">
                        <p class="third-blue switch on " @click="shift"></p>
                        <p v-for="item in upperLetter[2]" @click="check(item,$event)">{{item}}</p>
                        <p class="third-blue keyboard-delete " style="height: 0.4rem !important;" @click="del"></p>
                    </div>
                </div>
                <div class="keyboard-other ui-pack-justify">
                    <p class="keyboard-other-blue keyboard-other-blue2 " data-for="saft">
                        <span id="saftimg1"><img src="./images/saft.png"></span>
                        <span id="bigimg1" style="display: none;"><img src="./images/glas.png"></span>
                    </p>
                    <p class="keyboard-other-space" @click="check(' ',$event)">空格</p>
                    <p class="keyboard-other-blue keyboard-characterbuttonfff " @click="done">确定</p>
                </div>
            </div>
            <div class="keyboard-symbol" v-show="tab == 's'">
                <div class="ui-pack-justify">
                    <p v-for="item in symbols[0]" @click="check(item,$event)">{{item}}</p>
                </div>
                <div class="ui-pack-justify">
                    <p class="half"></p>
                    <p v-for="item in symbols[1]" @click="check(item,$event)">{{item}}</p>
                    <p class="half"></p>
                </div>
                <div class="ui-pack-justify">
                    <p class="half"></p>
                    <p v-for="item in symbols[2]" @click="check(item,$event)">{{item}}</p>
                    <p class="half"></p>
                </div>
                <div class="keyboard-other ui-pack-justify">
                    <p class="keyboard-other-blue keyboard-other-blue2 " data-for="saft">
                        <span id="saftimg3"><img src="./images/saft.png"></span>
                        <span id="bigimg3" style="display: none;"><img src="./images/glas.png"></span>
                    </p>
                    <p class="keyboard-other-space" @click="check(' ',$event)">空格</p>
                    <p class="third-blue keyboard-delete" @click="del"></p>
                    <p class="keyboard-other-blue keyboard-characterbuttonfff" @click="done">确定</p>
                </div>
            </div>
        </div>
        <div class="keyboard-pop" v-show="popshow" :style="popstyle" ref="pop">
            <div class="keyboard-pop-arrow"></div>
            <div class="keyboard-pop-content">{{poptext}}</div>
        </div>
    </div>
</template>

<script>
import RSA from '../../utils/rsa'

export default {
    name: 'ui-keyboard',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        ekey: {
            type: String,
            default: ''
        },
        numberOnly: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            currShow: this.value,
            lowerLetter: [
                ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
                ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
                ['z', 'x', 'c', 'v', 'b', 'n', 'm']
            ],
            numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            symbols: [
                ["'", '~', '!', '@', '#', '$', '%', '^', '&', '*'],
                ['(', ')', '-', '+', '[', ']', '{', '}', ','],
                ['|', ';', '=', '_', '<', '>', ':', '?', '.']
            ],
            inputData: '',
            shiftStatus: false,
            tab: 'l', // n-数字 l-字母 s-符号
            popshow: false,
            poptext: '',
            popleft: 0,
            poptop: 0
        }
    },
    computed: {
        upperLetter () {
            var list = []
            this.lowerLetter.forEach(item => {
                list.push(Array.from(item).join('').toUpperCase().split(''))
            })
            return list
        },
        encryptKey () {
            return this.ekey ? new RSA.RSAKeyPair('100001', '', this.ekey) : ''
        },
        popstyle () {
            return {
                top: `${this.poptop}px`,
                left: `${this.popleft}px`
            }
        }
    },
    methods: {
        check (val, $event) {
            this.inputData += val
            this.$emit('change', this.inputData.length)
            if (this.tab === 'n') {
                $event.target.style.backgroundColor = 'rgba(0,0,0,.2)'
                setTimeout(() => {
                    $event.target.style.backgroundColor = ''
                }, 500)
            } else {
                this.popStatus(val, $event.target)
            }
        },
        done () {
            this.$emit('input', false)
            this.$emit('done', this.encrypt())
        },
        del () {
            if (this.inputData > 0) {
                this.inputData = this.inputData.substring(0, this.inputData.length - 1)
                this.$emit('change', this.inputData.length)
            }
        },
        tabSwith (tab) {
            this.tab = tab
        },
        shift () {
            this.shiftStatus = !this.shiftStatus
        },
        encrypt () {
            if (this.encryptKey && this.inputData.length > 0) {
                return RSA.encryptedString(this.encryptKey, this.inputData)
            }
            return this.inputData
        },
        popStatus (val, el) {
            this.poptext = val
            if (this._timer) {
                clearTimeout(this._timer)
            }
            this._timer = setTimeout(() => {
                this.popshow = false
                this._timer = null
            }, 500)
            this.popshow = true

            this.$nextTick(() => {
                var pop = this.$refs.pop
                var rect = el.getBoundingClientRect()
                this.popleft = rect.left + rect.width / 2 - pop.offsetWidth / 2
                this.poptop = rect.top - pop.offsetHeight - 4
            })
        }
    },
    watch: {
        value (val) {
            this.currShow = val
            if (val) {
                this.inputData = ''
            }
        }
    }
}
</script>

<style lang="less">
@import "./keyboard.less";
</style>
