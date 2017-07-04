<template>
	<div class="page" style="z-index:999;">
		<div id="chart" class="chart-container"></div>
		<div class="card-container">
			<ul>
				<li v-for="item in cards">
					<div class="card">
						<div class="card-type">{{map.cardType(item.acctType)}}</div>
						<div class="card-no">{{item.acctNo}}</div>
						<div class="card-icon"><img src="/assets/bandByCar.png"/></div>
						<div class="balance">{{item.acctBalance}}</div>
					</div>
					<div class="operate">
						<mt-button plain size="large" type="primary">转账汇款</mt-button>
						<mt-button plain size="large" type="primary">账户信息</mt-button>
						<mt-button plain size="large" type="primary">账户明细</mt-button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script src="./account.js"></script>
<style lang="sass">
	@import "./account.scss"
</style>
