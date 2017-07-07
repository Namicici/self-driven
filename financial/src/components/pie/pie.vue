<template>
	<div class="pie-container">
		<div class="pie">
			<svg :width="width" :height="width" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			    <!-- Generator: Sketch 45 (43475) - http://www.bohemiancoding.com/sketch -->
				<title>pie</title>
			    <desc>Created with Sketch.</desc>
			    <defs></defs>

				<g id="pie-virtual" :stroke-width="strokeWidth" fill="none" fill-rule="evenodd">
					<path v-for="(item2,index) in displayData.virtual.data"  :d="item2.path" transform="translate(0, 0)" :stroke="item2.color" >
					</path>
				</g>
		        <g id="pie" :stroke-width="strokeWidth" fill="none" fill-rule="evenodd">
					<path v-for="(item,index) in displayData.real.data" :stroke-dasharray="item.dash" v-bind:stroke-dashoffset="item.dash" :d="item.path" transform="translate(0, 0)" :stroke="item.color" v-on:click="select(index)">
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

module.exports = {
	name: 'ss-pie',
	props: {
		diameter: Number,
		selectDiameter: Number,
		strokeWidth: Number,
		percentData: Array,
		duration: Number,
		colors: Array
	},
	data: function(){
		return {
			height: this.selectDiameter + this.strokeWidth * 2,
			width: this.selectDiameter + this.strokeWidth * 2,
			displayData: {
				real: {},
				virtual: {}
			},
			active: -1
		}
	},
	methods: {
		caculate: function(diameter, isVirtual){
			var convertData = {
				total: 0,
				data: []
			};
			var r = convertData.r = diameter / 2 + this.strokeWidth / 2; //半径
			//圆心
			var e = {
				x: this.selectDiameter / 2 + this.strokeWidth / 2,
				y: this.selectDiameter / 2 + this.strokeWidth / 2
			}
			//起始点
			if (!isVirtual){
				var startPoint ={
					x: this.selectDiameter / 2 + this.strokeWidth / 2,
					y: this.strokeWidth / 2 + this.strokeWidth + 4
				};
			}else {
				var startPoint ={
					x: this.selectDiameter / 2 + this.strokeWidth / 2,
					y: this.strokeWidth / 2
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
				data[i].color = this.colors[Math.round(Math.random() * 10)%this.colors.length];
				data[i].colorStyle = 'background-color:' + data[i].color;
				var index = this.colors.indexOf(data[i].color);
				this.colors.splice(index, 1);
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
			var self = this;
			self.active = index;
			this.displayData.virtual = this.caculate(this.selectDiameter, true);
		}
	},
	created: function(){
		this.displayData.real = this.caculate(this.diameter);
		this.displayData.virtual = this.caculate(this.selectDiameter, true);
	}
}

</script>
