<template>
	<div>
		<Stocktable :mk="counts" :list="list" :pages="pages" @prev="mkprev" @next="mknext"></Stocktable>
		<!-- <button @click="increments">+</button> -->
	</div>
</template>

<style lang="scss" scoped>

</style>


<script>
	import Stock_table from './Stock-table';
	export default{
		data(){
			return{
				pageNum:1,
				pageSize:10,
			}
		},
		components:{
			Stocktable:Stock_table
		},
		computed:{
			pages(){
				return{	
						pageNum: this.pageNum,
						pageSize:this.pageSize,
						total:Math.ceil((this.$store.state.list).length/this.pageSize),
						pages:Math.ceil((this.$store.state.list).length/this.pageSize)/this.pageNum
					}

			},
			counts(){
				return this.$store.state.counts;
			},
			list(){
				let listData=this.$store.state.list;
				return listData.slice((this.pageNum-1)*this.pageSize,this.pageSize*this.pageNum);
			}
		},
		methods:{
			mkprev(){
				if(this.$store.state.counts.isTrue.mkisTrue){
					if(this.$store.state.flag.flag){
					this.pageNum=this.$store.state.flag.page;
					return false;
					}
					this.pageNum--;
				}
			},
			mknext(){
					if(this.$store.state.flag.flag){
						this.pageNum=this.$store.state.flag.page;
						return false;
					}
					this.pageNum++;

			}
		}
	}

</script>