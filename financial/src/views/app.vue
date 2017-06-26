<template>
	<div>
		<transition :name="transitionName">
  			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</transition>
	</div>
</template>
<script>
	exports.default = {
		data: function(){
			return {
				transitionName: 'slide-right'
			}
		},
		watch: {
			'$route': function(to, from){
				if (!from.path.includes(to.path) && (['/home', '/life'].indexOf(to.path) >= 0)){
					this.transitionName = "";
					return;
				}
			    const toDepth = to.path.split('/').length
			    const fromDepth = from.path.split('/').length
			    this.transitionName = toDepth < fromDepth ? 'slide-left' : 'slide-right'
			}
		}
	}
</script>

<style lang="sass">
	@import "../assets/scss/common.scss"
</style>
