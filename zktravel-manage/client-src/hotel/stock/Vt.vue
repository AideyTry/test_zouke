<template>
	<div>
		<Stocktable :mk="counts"></Stocktable>
	</div>	
</template>

<style lang="scss" scoped>

</style>


<script>
	import Stock_table from './Stock-table';
	export default{
		components:{
			Stocktable:Stock_table
		},
		computed:{
			counts(){
				return this.$store.state.counts
			}
		},
		methods:{
			// increments(){
			// 	this.$store.commit('increment'

			// },
		}
	}
</script>