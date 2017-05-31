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
		</div>
		<router-view></router-view>	
	</div>
</template>

<style lang="scss" scoped>
	.hColor{
		margin:0;
		padding:0;
		height:80px;
		background-color: #eee;
		box-sizing:border-box;
		position:relative;
		bottom:0;
		ul,h3{
			margin:0;
			padding:0;
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
		import store from './store.js'
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
							store.commit('mk');
							store.dispatch('actionMk');
							url='dashboard-hotel-mapping-mk';	
							break;
						case 'dl':
							url='dashboard-hotel-mapping-dl';
							store.commit('dl');
							store.dispatch('actionDl');
							break;
						case 'vt':
							url='dashboard-hotel-mapping-vt';
							break;
						case 'bk':
							//bk暂时经用掉，
							// url='dashboard-hotel-mapping-bk';
							// store.commit('bk');
							// store.dispatch('actionBk');
							alert("正在创建中，请等待......");
							break;
					}
					this.$router.push({
						name:url
					});

				}
			},
			mounted(){
				this.isTrue.one=false;
				this.isTrue.two=false;
				this.isTrue.three=true;
				this.isTrue.four=false;
			},
			updated(){
				if(window.location.pathname==='/dashboard/hotel-mapping/vt'){
					this.isTrue.one=false;
					this.isTrue.two=false;
					this.isTrue.three=true;
					this.isTrue.four=false;
				}
				else if(window.location.pathname==='/dashboard/hotel-mapping/mk'){
					this.isTrue.one=true;
					this.isTrue.two=false;
					this.isTrue.three=false;
					this.isTrue.four=false;
				}
				else if(window.location.pathname==='/dashboard/hotel-mapping/dl'){
					this.isTrue.one=false;
					this.isTrue.two=true;
					this.isTrue.three=false;
					this.isTrue.four=false;
				}
				else if(window.location.pathname==='/dashboard/hotel-mapping/bk'){
					this.isTrue.one=false;
					this.isTrue.two=false;
					this.isTrue.three=false;
					this.isTrue.four=true;
				}
			}
	}
</script>