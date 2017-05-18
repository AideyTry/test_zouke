<template>
	<div class="sidebar">
		<ul>
			<li v-on:click="hotel()" class="hbg">酒店数据
				<ul v-if="isTrue">
					<li class="active sh" v-on:click.stop="stock()">待入库</li>
					<li class="active" v-on:click.stop="SAI()">SAI酒店库</li>
				</ul>
			</li>
		</ul>
	</div>
</template>


<style lang="scss" scoped>
	*{padding:0;margin:0}
	.sidebar{ 
		display:block;
		float:left;
		width:15%;
		height:751px;
		background-color: #333;
		ul{
			list-style:none;
		}
		li{

			display:inline-block;
			height:50px;
			line-height:50px;
			// text-align:center;
			font-size:16px;
			width:100%;
			border-top:1px solid #000;
			border-bottom:1px solid #000;
			border-left:1px solid #000;
		}
		.hbg{
			background-color: #000;
			color:#fff;
			.active{
			background-color:#ccc;
			width:100%;
			color:#000;
			border-bottom:1px solid #333;
			}
			.active:hover{
				background-color: #FFF
				// color:#000;
			}
			.sh{

			}
		}
		.hbg:hover{
			background-color: #fff;
			
			color:#000;
		}
		
	}
	
	
</style>
	

<script>
	export default{
		data(){
			return{
				isActive:true,
				isTrue:false,
				flag:0
			}
		},
		methods:{
			hotel:function(){
				this.flag++;
				if(this.flag%2!=0){
					this.isTrue=true;
				}else{
					this.isTrue=false;
				}
				this.$router.push({path:'/index'});
			},
			stock:function(){
				this.$router.push({path:'/index/stock'});
			},
			SAI:function(){
				this.$router.push({path:'/index/SAI'});
			}
		}
	}
</script>
