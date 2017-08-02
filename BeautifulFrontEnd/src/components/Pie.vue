<template>
    <div class="pie-container">
        <div class="pie">
            <svg :width="width" :height="height" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: Sketch 45 (43475) - http://www.bohemiancoding.com/sketch -->
                <title>pie</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="pie-virtual" :stroke-width="strokeWidth" fill="none" fill-rule="evenodd">
                    <path v-for="(item2,index) in displayData.virtual.data" :stroke-dasharray="item2.dash" :stroke-dashoffset="item2.dash" :d="item2.path" transform="translate(0, 0)" :stroke="item2.color" :style="item2.colorStyle">
                        <animate
                            attributeName="stroke-dashoffset"
                            :form="item2.dash"
                            to="3"
                            :begin="item2.begin"
                            :dur="item2.dur"
                            fill="freeze"
                        />
                    </path>
                </g>
                <g id="pie" :stroke-width="strokeWidth" fill="none" fill-rule="evenodd">
                    <path v-for="(item,index) in displayData.real.data" :stroke-dasharray="item.dash" :stroke-dashoffset="item.dash" :d="item.path" transform="translate(0, 0)" :stroke="item.color" v-on:click="select(index)">
                        <animate
                            :id="item.id"
                            attributeName="stroke-dashoffset"
                            :form="item.dash"
                            to="3"
                            :begin="item.begin"
                            :dur="item.dur"
                            fill="freeze"
                        />
                    </path>
                </g>

                <g id="pie-select-legned" v-if="!!rect">
                    <rect v-bind:x="rect.x"
                        v-bind:y="rect.y" :width="legendWidth" :height="legendHeight"
                        fill="#FFF" :stroke="rect.stroke" :stroke-width="1"
                        :transform="rect.transform" opacity="0.5"/>
                    <text>
                        <tspan :x="rect.lx" :y="rect.ly">{{nameText}}：{{rect.name}}</tspan>
                        <tspan :x="rect.lx" :y="rect.ly2">{{valueText}}：{{rect.value}}</tspan>
                    </text>
                </g>
            </svg>
        </div>

        <div class="pie-legend">
            <ul>
                <li v-for="d in displayData.real.data">
                    <div>
                        <div class="symbol" v-bind:style="d.colorStyle"></div>
                        <span>{{valueText}}：{{d.value}}</span>
                    </div>
                    <div>
                        <div class="symbol" v-bind:style="d.colorStyle"></div>
                        <span>{{nameText}}：{{d.name}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// 圆环厚度
const STROKE_WIDTH = 12
// 实际圆环与阴影的间隔
const GAP = 4
// 选中图例像素宽度
const SELECT_LEGEND_WIDTH = 100
// 选中图例像素高度
const SELECT_LEGEND_HEIGHT = 50
// 选中图例文字offsetX
const SELECT_TEXT_OFFSETX = 8
// 选中图例文字offsetY
const SELECT_TEXT_OFFSETY = 20
// 选中图例当鼠标坐标太低时，向上offsetY
const SELECT_LEGEND_OFFSETY = SELECT_LEGEND_HEIGHT
// 选中图例的起点X为鼠标点击坐标，向左offsetX
const SELECT_LEGEND_OFFSETX = 16
// 选中图例中两行字的间距
const TEXT_GAP = 20

export default {
    name: 'ui-pie',
    props: {
        percentData: Array, // {name:a,value:b}
        nameText: String,
        valueText: String,
        duration: {
            type: Number,
            default: 2
        },
        colors: {
            type: Array,
            default: function () {
                return ['#7ED321', '#50E3C2', '#4A90E2', '#F5A623', '#9013FE']
            }
        },
        width: {
            type: Number,
            default: 300
        }
    },
    data: function () {
        return {
            strokeWidth: STROKE_WIDTH,
            legendHeight: SELECT_LEGEND_HEIGHT,
            legendWidth: SELECT_LEGEND_WIDTH,
            displayData: {
                real: {},
                virtual: {}
            },
            rect: null
        }
    },
    computed: {
        diameter () {
            return this.width / 3 // 实际圆环直径
        },
        selectDiameter () {
            return this.diameter + STROKE_WIDTH * 2 + GAP * 2 // 选中阴影环状直径
        },
        height () {
            return this.selectDiameter + STROKE_WIDTH * 2
        }
    },
    methods: {
        caculate: function (diameter, isVirtual) {
            var convertData = {
                total: 0,
                data: []
            }
            var colors = JSON.parse(JSON.stringify(this.colors))

            // 半径
            var r = convertData.r = diameter / 2

            // 圆心
            var e = {
                x: this.width / 2,
                y: this.selectDiameter / 2 + STROKE_WIDTH
            }
            let startPoint
            // 起始点
            if (!isVirtual) {
                startPoint = {
                    x: this.width / 2,
                    y: STROKE_WIDTH * 2 + GAP
                }
            } else {
                startPoint = {
                    x: this.width / 2,
                    y: STROKE_WIDTH
                }
            }
            var data = JSON.parse(JSON.stringify(this.percentData))

            for (let j = 0; j < data.length; j++) {
                convertData.total += data[j].value
            }

            for (let i = 0; i < data.length; i++) {
                var endPoint = {}

                if (i > 0) {
                    startPoint = {
                        x: data[i - 1].endPoint.x,
                        y: data[i - 1].endPoint.y
                    }
                }

                var molecular = data[i].value// 分子
                var denominator = convertData.total // 分母

                // 累计角度来算目标点坐标
                var a = molecular / denominator * 360
                data[i].isLargeCircle = a > 180 ? 1 : 0 // 当度数大于180的时候画大圆

                data[i].dash = a * Math.PI * r / 180// 弧长
                data[i].dur = a / 360 * this.duration + 's'
                data[i].durValue = a / 360
                data[i].id = 'pie' + i
                data[i].begin = '0'
                data[i].beginValue = 0
                if (i > 0) {
                    a += data[i - 1].a
                    data[i].begin = data[i - 1].id + '.end'
                }

                // 计算目标点坐标
                endPoint.x = e.x + r * Math.sin(a * Math.PI / 180)
                endPoint.y = e.y - r * Math.cos(a * Math.PI / 180)

                data[i].a = a
                data[i].color = colors[Math.round(Math.random() * 10) % colors.length]
                if (isVirtual) {
                    data[i].colorStyle = 'opacity:0'
                } else {
                    data[i].colorStyle = 'background-color:' + data[i].color
                }
                var index = colors.indexOf(data[i].color)
                colors.splice(index, 1)
                data[i].endPoint = endPoint
                data[i].startPoint = startPoint

                data[i].path = 'M' + data[i].startPoint.x + ',' + data[i].startPoint.y +
                    ' A' + r + ' ' + r + ',' + '  0 ' + data[i].isLargeCircle +
                    ' 1 ' + data[i].endPoint.x + ',' + data[i].endPoint.y

                convertData.data.push(data[i])
            }
            return convertData
        },
        select: function (index) {
            var virtualData = this.displayData.virtual.data
            var realData = this.displayData.real.data
            for (var i = 0; i < virtualData.length; i++) {
                if (i === index) {
                    virtualData[i].color = realData[i].color
                    virtualData[i].colorStyle = 'opacity: 0.2'
                    var offset = event.offsetY + SELECT_LEGEND_OFFSETY - this.height
                    offset = offset > 0 ? -offset : 0
                    this.rect = {
                        x: event.offsetX,
                        y: event.offsetY + offset,
                        lx: event.offsetX - SELECT_TEXT_OFFSETX,
                        ly: event.offsetY + offset + SELECT_TEXT_OFFSETY,
                        ly2: event.offsetY + offset + SELECT_TEXT_OFFSETY + TEXT_GAP,
                        transform: 'translate(' + -SELECT_LEGEND_OFFSETX + ' , 0)',
                        stroke: virtualData[i].color,
                        name: virtualData[i].name,
                        value: virtualData[i].value
                    }
                } else {
                    virtualData[i].colorStyle = 'opacity: 0'
                }
            }
        }
    },
    created: function () {
        this.displayData.real = this.caculate(this.diameter)
        this.displayData.virtual = this.caculate(this.selectDiameter, true)
    }
}
</script>

<style lang="less">
    .pie{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .pie-legend{
        ul{
            padding:0;
            li{
                display: flex;
                justify-content: space-between;
                padding: 0 16px;
                div{
                    display: flex;
                    align-items: center;
                    .symbol{
                        width: 16px;
                        height: 16px;
                        background-color: #ccc;
                        margin-right: 8px;
                    }
                }
            }
        }
    }
</style>
