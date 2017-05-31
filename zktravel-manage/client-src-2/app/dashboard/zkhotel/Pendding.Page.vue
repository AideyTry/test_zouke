<template>
	<div>
		<zkHotel :pending="counts" :list="list" :pages="pages" @prev="mkprev" @next="mknext"></zkHotel>
	</div>		
</template>

<style lang="scss" scoped>

	
</style>


<script>
	import ZkhotelTablePage from './ZkhotelTable.Page';
	export default{
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				items:[],
				listData:[]
			}
		},
		components:{
			zkHotel:ZkhotelTablePage
		},
		computed:{
			pages() {
				return {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					// total: Math.ceil((this.list).length / this.pageSize),
					total:Math.ceil(this.totals/this.pageSize)
					// pages: Math.ceil(this.total / this.pageSize) / this.pageNum
				}
			},
			counts(){
				return this.$store.getters.counts;
			},
			totals(){
				return this.$store.getters.total;
			},
			list() {
				return this.$store.getters.list;
				//分页
				// this.items=this.$store.getters.list;
				// this.listData = this.items.sort(function(a, b) {
				// 	if(a.level> b.level) {
				// 		return 1;
				// 	}
				// 	if(a.level < b.level) {
				// 		return -1;
				// 	}
				// 	return 0;
				// });
				// return this.listData.slice((this.pageNum - 1) * this.pageSize, this.pageSize * this.pageNum);
			}

		},
		methods:{
				mkprev() {
					if(this.counts.flag.flag) {
						this.pageNum = this.counts.flag.page;
						this.$store.dispatch('penddings');
						return false;
					}
					this.pageNum--;
					this.$store.dispatch('penddings');
				},
				mknext() {
					if(this.counts.flag.flag) {
						this.pageNum = this.counts.flag.page;
						this.$store.dispatch('penddings');
						return false;
					}
					this.pageNum++;
					this.$store.dispatch('penddings');
				}
	},
	mounted(){
		this.$store.dispatch('penddings');
	}
}
</script>