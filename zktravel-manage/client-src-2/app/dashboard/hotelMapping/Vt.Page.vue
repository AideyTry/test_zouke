<template>
	<div>
		<Stocktable :mk="counts" :list="list" :pages="pages" @prev="mkprev" @next="mknext"></Stocktable>
	</div>
</template>

<style lang="scss" scoped>

</style>

<script>
	import Stock_table from './HotelMappingTable.Page.vue';
	import ajax from '@local/common/ajax';
	import store from './store.js'
	export default {
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				items:[],
				listData:[]
			}
		},
		components: {
			Stocktable: Stock_table
		},
		computed: {
			pages() {
				return {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					total: Math.ceil((store.state.listVt).length / this.pageSize)||1,
					pages: Math.ceil((store.state.listVt).length / this.pageSize) / this.pageNum
				}
			},
			counts() {
				return store.state.counts;
			},
			list() {
				//分页
				this.items=store.state.listVt;
				this.listData = this.items.sort(function(a, b) {
					if(a.level> b.level) {
						return 1;
					}
					if(a.level < b.level) {
						return -1;
					}
					return 0;
				});
				return this.listData.slice((this.pageNum-1)*this.pageSize,this.pageSize*this.pageNum);
			}
		},
		methods: {
			mkprev() {
					if(store.state.flag.flag) {
						this.pageNum = store.state.flag.page;
						return false;
					}
					this.pageNum--;
				
			},
			mknext() {
				if(store.state.flag.flag) {
					this.pageNum = store.state.flag.page;
					return false;
				}
				this.pageNum++;

			}
		},
		mounted(){
			store.commit('vt');
			store.dispatch('actionVt');
		}
	}
</script>