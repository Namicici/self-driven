<template>
	<div class="pie-container">
		<div class="pie">
			<svg v-bind:width="width" v-bind:height="height" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			    <!-- Generator: Sketch 45 (43475) - http://www.bohemiancoding.com/sketch -->
				<title>pie</title>
			    <desc>Created with Sketch.</desc>
			    <defs></defs>
		        <g id="material2" v-bind:stroke-width="strokeWidth" fill="none" fill-rule="evenodd">
					<path v-for="item in displayData.data" v-bind:d="item.path" transform="translate(0, 0)" v-bind:stroke="item.color"></path>
		        </g>
			</svg>
		</div>

		<div class="legend">
			<ul>
				<li v-for="d in displayData.data">
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
						margin-right: 0.1rem;
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
		strokeWidth: Number,
		percentData: Array,
	},
	data: function(){
		return {
			height: this.diameter + this.strokeWidth * 2,
			width: this.diameter + this.strokeWidth * 2,
			displayData: {},
			colors: ['#7ED321', '#50E3C2', '#4A90E2', '#F5A623', '#9013FE']
		}
	},
	created: function(){
		var convertData = {
			total: 0,
			data: []
		};
		var data = this.percentData;

		for (var i = 0; i < data.length; i++){
			convertData.total += data[i].value;
		}

		var r = convertData.r = this.diameter / 2 + this.strokeWidth / 2; //半径

		//圆心
		var e = {
			x: r + this.strokeWidth / 2,
			y: r + this.strokeWidth / 2
		}

		for (var i = 0; i < data.length; i++){
			var endPoint = {};

			if (i == 0){
				var startPoint ={
					x: r + this.strokeWidth / 2,
					y: this.strokeWidth / 2
				};
			}else {
				var startPoint = {
					x: data[i-1].endPoint.x,
					y: data[i-1].endPoint.y
				}
			}

			var molecular = data[i].value;//分子
			var denominator = convertData.total; //分母

			//累计角度来算目标点坐标
			var a = molecular/denominator*360;

			 if (i > 0){
			 	a += data[i-1].a;
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
				+ ' 1' + data[i].endPoint.x + ',' + data[i].endPoint.y;
			convertData.data.push(data[i]);
		}
		this.displayData = convertData;
	}
}

</script>
