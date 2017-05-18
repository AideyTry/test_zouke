<template>
	<div>
		<SAItable :pending="counts"></SAItable>
	<!-- 	<p>{{ count }}</p>
	  	<p> -->
		    <button @click="increments">+</button>
<!-- 		    <button @click="decrement">-</button>
	 	 </p>	 -->	
	</div>
<!-- 	<div>pending</div> -->
		
</template>

<style lang="scss" scoped>

	
</style>


<script>
	import SAI_table from './SAI-table';
	export default{
		components:{
			SAItable:SAI_table
		},
		computed:{
			counts(){
				return this.$store.state.counts
			}
		},
		methods:{
			increments(){
				this.$store.commit('increment')
			},
			// decrement(){
			// 	this.$store.commit('decrement')
			// }
		}
	}

</script>