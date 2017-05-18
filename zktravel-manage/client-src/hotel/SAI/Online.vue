<template>
	<SAItable :pending="counts"></SAItable>

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
			
		}
	}
</script>