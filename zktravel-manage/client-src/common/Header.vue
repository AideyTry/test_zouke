<template>
	<div class="header clearfix">

		<div class="logo"></div>
	
		<div class="right">
			<span class="glyphicon glyphicon-envelope"></span>
			<span>当前用户:</span>
			<strong>{{$store.state.passName}}</strong>
			<input type="button" value="退出" v-on:click="exit()" >
			<Logout v-if="isTrue" @cancel="hcancel()"></Logout>	

	<!-- 		<strong v-if="eisTrue">确定要退出吗？
				<p></p>
				<input type="button" name="" value="取消" v-on:click="cancel()">
				<input type="button" name="" value="确定" v-on:click="confirm()">
			</strong> -->
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.header{
		// position:relative;
		// top:14px;
		float:right;
		// box-sizing:border-box;
		width:85%;
		height:70px;
		font-size:22px;
		line-height:70px;
		color:#000;
		background-color:#fff; 
		border-top:1px solid #000;
		border-bottom:1px solid #000;
		border-right:none;
		.right{
			width:35%;
			position:absolute;
			right:0;
			span{
				font-size:14px;
				display:inline-block;
			}
			input{
				 border: none;
			    outline-style: none;
				display:inline-block;
				height:50px;
				line-height:50px;
				width:50px;
				font-size:22px;
				border-sizing:border-box;
				// border:none;
				background-color:#fff;
			}
		}
	}
</style>


<script>
	import Logout from './Logout'
	export default{
		// props:['c'],
		data(){
			return {
				isTrue:false
			}
		},
		components:{
			'Logout':Logout
		},
		methods:{
			exit(){
			// 		// this.$store.counts.isTrue.eisTrue=true;
					// this.$store.commit('exit');
					this.isTrue=true;
			// 		// console.log(this.$store.counts.isTrue.eisTrue);
			},
			hcancel(){
				this.isTrue=false;
			}
			// cancel(){
			// 	this.isTrue=false;
			// },
			// confirm(){
			// 	this.isTrue=false;
			// }
		}
	}
</script>