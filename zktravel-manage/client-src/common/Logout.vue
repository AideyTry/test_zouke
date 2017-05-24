<style lang="scss" scoped>
	strong{
			display:inline-block;
			width:400px;
			height:200px;
			// line-height:300px;
			text-align:center;
			position:fixed;
			right:5%;
			background:rgba(255,255,255,1);
			border:1px solid #000;
			// background-color: #fff;
			// border:1px solid #000;
			border-radius:5px;
			z-index:9999;
			// p{
			// 	display:inline-block;
			// 	font-size:16px;
			// }
			span{
				display:inline-block;
				position:absolute;
				right:0;
				top:0;
				background-color: #333;
				color:#fff;
				width:20px;
				height:20px;
				line-height:20px;
				text-align:center;
				cursor:pointer;
			}
			h3{
				transform:translate(-50%,-50%);
				position:absolute;
				left:50%;
				top:40%;
			}
			input{
				border-radius:5px;
				display:inline-block;
				width:40px;
				height:40px;
				line-height:40px;
				text-align:center;
				font-size:14px;
				background-color: #666;
				color:#fff;
			}
			.btn1{
				position:absolute;
				bottom:0;
				right:60px;
			}
			.btn2{
				position:absolute;
				bottom:0;
				right:0;
			}
	}
</style>

<template>
	<strong>
		<span class="glyphicon glyphicon-remove" v-on:click="cancel()"></span>
		<h3>确定要退出吗？</h3>
		<br>
		<input class="btn1" type="button" name="" value="取消" v-on:click="cancel()">
		<input class="btn2" type="button"  value="确定" v-on:click="confirm()">
	</strong>
</template>


<script>
	import ajax from '@local/common/ajax';
	export default{
		// props:['Logout'],
		date(){
			return {
				// isTrue:false
			}
		},
		computed:{
			logout(){
				return this.$store.state;
			}
		},
		methods:{
				cancel(){
					this.$emit('cancel');
				},
				confirm(){
					console.log("退出");
					ajax.post("/api/auth/logout").then(json=>{
						console.log(json);
						this.$store.commit('logout',json);
						console.log();
						if(this.logout.logout===0){
							this.$router.push({
							path:'/login'
							})
							this.logout.token=1;
						}
					})
				}
		}
	}
	

</script>