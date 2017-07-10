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
						<tspan :x="rect.lx" :y="rect.ly">尾号：{{rect.name}}</tspan>
						<tspan :x="rect.lx" :y="rect.ly2">余额：{{rect.value}}</tspan>
					</text>
				</g>
			</svg>
		</div>

		<div class="legend">
			<ul>
				<li v-for="d in displayData.real.data">
					<div>
						<div class="symbol" v-bind:style="d.colorStyle"></div>
						<span>余额：{{d.value}}</span>
					</div>
					<div>
						<div class="symbol" v-bind:style="d.colorStyle"></div>
						<span>尾号：{{d.name}}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="sass">

	.circle-load-svg {
	    stroke-dasharray: 0 570;
	    animation: rot 8s linear infinite;
	}

	@keyframes rot {
	    100% {
	        stroke-dasharray: 570 570;
	    }
	}
	.pie{
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
	.legend{
		ul{
			li{
				display: flex;
				justify-content: space-between;
				padding: 0 1rem;
				div{
					display: flex;
	    			align-items: center;
					.symbol{
					    width: 0.3rem;
					    height: 0.3rem;
						background-color: #ccc;
						margin-right: 0.3rem;
					}
				}
			}
		}
	}
</style>

<script>

const SCREEN_WIDTH = window.screen.width * window.devicePixelRatio;
const DIAMETER = SCREEN_WIDTH/3;
const STROKE_WIDTH = 16 * window.devicePixelRatio/2;
const SELECT_DIAMETER = DIAMETER +  STROKE_WIDTH * 2 + 4*2;
const SELECT_LEGEND_WIDTH = 200 * window.devicePixelRatio/2;
const SELECT_LEGEND_HEIGHT = 100 * window.devicePixelRatio/2;

module.exports = {
	name: 'ss-pie',
	props: {
		percentData: Array,
		duration: {
			type: Number,
			default:2
		},
		colors: {
			type: Number,
			default: ['#7ED321', '#50E3C2', '#4A90E2', '#F5A623', '#9013FE']
		}
	},
	data: function(){
		return {
			strokeWidth: STROKE_WIDTH,
			legendHeight: SELECT_LEGEND_HEIGHT,
			legendWidth: SELECT_LEGEND_WIDTH,
			height: SELECT_DIAMETER + STROKE_WIDTH * 2,
			width: SCREEN_WIDTH,
			displayData: {
				real: {},
				virtual: {}
			},
			rect:null
		}
	},
	methods: {
		caculate: function(diameter, isVirtual){
			var convertData = {
				total: 0,
				data: []
			};
			var colors = JSON.parse(JSON.stringify(this.colors))
			var r = convertData.r = diameter / 2; //半径
			//圆心
			var e = {
				x: this.width/2,
				y: SELECT_DIAMETER / 2 + STROKE_WIDTH
			}
			//起始点
			if (!isVirtual){
				var startPoint ={
					x: this.width / 2,
					y: STROKE_WIDTH * 2 + 4*window.devicePixelRatio/2
				};
			}else {
				var startPoint ={
					x: this.width/2,
					y: STROKE_WIDTH
				};
			}

			var data = JSON.parse(JSON.stringify(this.percentData));

			for (var i = 0; i < data.length; i++){
				convertData.total += data[i].value;
			}

			for (var i = 0; i < data.length; i++){
				var endPoint = {};

				if (i > 0){
					var startPoint = {
						x: data[i-1].endPoint.x,
						y: data[i-1].endPoint.y
					}
				}

				var molecular = data[i].value;//分子
				var denominator = convertData.total; //分母

				//累计角度来算目标点坐标
				var a = molecular/denominator*360;

				data[i].dash = a* Math.PI*r/180;//弧长
				data[i].dur = a / 360 * this.duration + 's';
				data[i].durValue = a / 360;
				data[i].id = 'pie' + i;
				data[i].begin = '0';
				data[i].beginValue = 0;
				 if (i > 0){
				 	a += data[i-1].a;
					data[i].begin = data[i-1].id + '.end';
				 }

				//计算目标点坐标
				endPoint.x = e.x + r * Math.sin(a * Math.PI / 180);
				endPoint.y = e.y - r * Math.cos(a * Math.PI / 180);

				data[i].a = a;
				data[i].color = colors[Math.round(Math.random() * 10)%colors.length];
				if (isVirtual){
					data[i].colorStyle = 'opacity:0';
				}else {
					data[i].colorStyle = 'background-color:' + data[i].color;
				}
				var index = colors.indexOf(data[i].color);
				colors.splice(index, 1);
				data[i].endPoint = endPoint;
				data[i].startPoint = startPoint;
				data[i].isLargeCircle = a > 180 ? 1 : 0; //当度数大于180的时候画大圆

				data[i].path = 'M' + data[i].startPoint.x + ',' + data[i].startPoint.y
					+ ' A' + r + ' ' + r + ',' + '  0 ' + data[i].isLargeCircle
					+ ' 1 ' + data[i].endPoint.x + ',' + data[i].endPoint.y;

				convertData.data.push(data[i]);
			}
			return convertData;
		},
		select: function(index){
			var virtualData = this.displayData.virtual.data;
			var realData = this.displayData.real.data;
			for (var i = 0; i < virtualData.length; i++){
				if (i == index){
					virtualData[i].color = realData[i].color;
					virtualData[i].colorStyle = 'opacity: 0.2';
					var offset = event.offsetY + 100*window.devicePixelRatio/2 - this.height;
					offset = offset > 0 ? -offset : 0
					this.rect  = {
						x: event.offsetX,
						y: event.offsetY + offset,
						lx: event.offsetX - 36*window.devicePixelRatio/2,
						ly: event.offsetY + offset + 40*window.devicePixelRatio/2,
						ly2: event.offsetY + offset + 80*window.devicePixelRatio/2,
						transform: 'translate(' + -50*window.devicePixelRatio/2 + ' , 0)',
						stroke: virtualData[i].color,
						name: virtualData[i].name,
						value: virtualData[i].value
					}
				}else {
					virtualData[i].colorStyle = 'opacity: 0';
				}
			}
		}
	},
	created: function(){
		this.displayData.real = this.caculate(DIAMETER);
		this.displayData.virtual = this.caculate(SELECT_DIAMETER, true);
	}
}

</script>
