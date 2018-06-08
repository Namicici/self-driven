// Library agnostic interface
// let Wilq32 = () => {}
class Wilq32 {
    constructor (parameters) {
        this._img = document.getElementById(parameters.id)
    }
    _setupParameters (parameters) {
        this._parameters = this._parameters || {}
        if (typeof this._angle !== 'number') this._angle = 0
        if (typeof parameters.angle === 'number') this._angle = parameters.angle
        this._parameters.animateTo = (typeof parameters.animateTo === 'number') ? (parameters.animateTo) : (this._angle)

        this._parameters.step = parameters.step || this._parameters.step || null
        this._parameters.easing = parameters.easing || this._parameters.easing || function (x, t, b, c, d) { return -c * ((t=t/d-1)*t*t*t - 1) + b }
        this._parameters.duration = parameters.duration || this._parameters.duration || 1000
        this._parameters.callback = parameters.callback || this._parameters.callback || function () {}
    }
    _handleRotation (parameters) {
        this._setupParameters(parameters)
        if (this._angle == this._parameters.animateTo) {
            this._rotate(this._angle)
        } else {
            this._animateStart()
        }
    }
    _animateStart () {
        if (this._timer) {
            clearTimeout(this._timer)
        }
        this._animateStartTime = +new Date()
        this._animateStartAngle = this._angle
        this._animate()
    }
    _animate () {
        var actualTime = +new Date()
        var checkEnd = actualTime - this._animateStartTime > this._parameters.duration

        // TODO: Bug for animatedGif for static rotation ? (to test)
        if (checkEnd && !this._parameters.animatedGif) {
            clearTimeout(this._timer)
        } else {
            if (this._canvas || this._vimage || this._img) {
                var angle = this._parameters.easing(0, actualTime - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration);
                this._rotate((~~(angle * 10)) / 10)
            }
            if (this._parameters.step) {
                this._parameters.step(this._angle)
            }
            this._timer = setTimeout(() => {
                this._animate()
            }, 10)
        }

        // To fix Bug that prevents using recursive function in callback I moved this function to back
        if (this._parameters.callback && checkEnd) {
            this._angle = this._parameters.animateTo
            this._rotate(this._angle)
            this._parameters.callback.call(this._rootObj)
        }
    }
    _rotate (angle) {
        this._angle = angle
        this._img.style['WebkitTransform'] = 'rotate(' + (angle%360) + 'deg)'
    }
}

export default {
    rotate (parameters) {
        if (this.length === 0 || typeof parameters == 'undefined') return
        if (typeof parameters == 'number') parameters = {angle: parameters}
        let returned = []
        let ins = new Wilq32(parameters)
        ins._handleRotation(parameters)
        return returned
    },
    getRotateAngle () {
        let ret = []
        for (let i = 0, i0 = this.length; i < i0; i++) {
            let element = this.get(i)
            if (element.Wilq32 && element.Wilq32.PhotoEffect) {
                ret[i] = element.Wilq32.PhotoEffect._angle
            }
        }
        return ret
    },
    stopRotate () {
        for (let i = 0, i0 = this.length; i < i0; i++) {
            let element = this.get(i)
            if (element.Wilq32 && element.Wilq32.PhotoEffect) {
                clearTimeout(element.Wilq32.PhotoEffect._timer)
            }
        }
    }
}
