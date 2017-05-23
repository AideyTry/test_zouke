<template>
	<div>
		<div class="hColor">
		<h3>待匹配/入库的酒店</h3>
		<ul class="supplier">
			<li class="sColor" v-on:click="gotoPage('mk')" v-bind:class="{bgColor:isTrue.one}">mk</li>
			<li class="sColor" v-on:click="gotoPage('dl')" v-bind:class="{bgColor:isTrue.two}">dl</li>
			<li class="sColor" v-on:click.stop.prevent="gotoPage('vt')" v-bind:class="{bgColor:isTrue.three}">vt</li>
			<li class="sColor" v-on:click="gotoPage('bk')" v-bind:class="{bgColor:isTrue.four}">bk</li>
		</ul>
	<!-- 	<p class="supplier">
			<span class="sColor" v-on:click="gotoPage('mk')">mk</span>
			<span class="sColor" v-on:click="gotoPage('dl')">dl</span>
			<span class="sColor" v-on:click="gotoPage('vt')">vt</span>
			<span class="sColor" v-on:click="gotoPage('bk')">bk</span>
		</p> -->
		</div>
		<router-view></router-view>	
	</div>
</template>

<style lang="scss" scoped>
	*{
		padding:0;
		margin:0;
	}
	.hColor{
		height:80px;
		background-color: #eee;
		box-sizing:border-box;
		position:relative;
		ul,h3{
			list-style:none;
			font-size:16px;
			font-family:Microsoft YaHei;
			color:#000;
		}
		.supplier{
			// margin-top:42px;

			width:33.3%;
			height:35px;
			position:absolute;
			bottom:0;
			li{
				box-sizing:border-box;
				display:inline-block;
				float:left;
				width:24.5%;
				height:100%;
				line-height:35px;
				text-align:center;
				border-top:1px  solid #666;
				border-right:1px  solid #666;
				border-bottom:1px  solid #666;
			}
			.sColor:hover{
				cursor:pointer;
				color:#0cc;
			}
			.bgColor{
				background-color: #fff;
				border-bottom:none;

			}
		}
	}
</style>

<script>
		export default{
			data(){
				return{
					isTrue:{
					one:false,
					two:false,
					three:false,
					four:false
				}
				}
			},
			// computed:{

			// },
			methods:{
				gotoPage(page){
					let url='';
					switch(page){
						case 'mk':						
							this.$store.commit('mk');
							this.$store.state.counts.isTrue.mkisTrue=true;
							this.$store.state.counts.isTrue.dlisTrue=false;
							this.$store.state.counts.isTrue.vtisTrue=false;
							this.$store.state.counts.isTrue.bkisTrue=false;
							url='/index/stock/mk';		
							this.isTrue.one=true;
							this.isTrue.two=false;
							this.isTrue.three=false;
							this.isTrue.four=false;
							break;
						case 'dl':
							url='/index/stock/dl';
							this.$store.state.counts.isTrue.mkisTrue=false;
							this.$store.state.counts.isTrue.dlisTrue=true;
							this.$store.state.counts.isTrue.vtisTrue=false;
							this.$store.state.counts.isTrue.bkisTrue=false;
							this.$store.commit('dl');
							this.isTrue.one=false;
							this.isTrue.two=true;
							this.isTrue.three=false;
							this.isTrue.four=false;
							this.$store.commit('dl');
							break;
						case 'vt':
							url='/index/stock/vt';
							this.$store.state.counts.isTrue.mkisTrue=false;
							this.$store.state.counts.isTrue.dlisTrue=false;
							this.$store.state.counts.isTrue.vtisTrue=true;
							this.$store.state.counts.isTrue.bkisTrue=false;
							this.$store.commit('vt');
							this.$store.dispatch('actionVt');
							this.isTrue.one=false;
							this.isTrue.two=false;
							this.isTrue.three=true;
							this.isTrue.four=false;
							break;
						case 'bk':
							url='/index/stock/bk';
							this.$store.state.counts.isTrue.mkisTrue=false;
							this.$store.state.counts.isTrue.dlisTrue=false;
							this.$store.state.counts.isTrue.vtisTrue=false;
							this.$store.state.counts.isTrue.bkisTrue=true;
							this.$store.commit('bk');
							this.isTrue.one=false;
							this.isTrue.two=false;
							this.isTrue.three=false;
							this.isTrue.four=true;
							break;
					}
					this.$router.push({
						path:url
					});
				}
			}
	}
</script>