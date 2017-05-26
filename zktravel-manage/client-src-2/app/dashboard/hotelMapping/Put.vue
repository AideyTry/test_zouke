<style lang="scss" scoped>
		content {
			width: 500px;
			height: 400px;
			border: 1px solid #000;
			background-color: #fff;
			display: inline-block;
			position: fixed;
			text-align: center;
			top: 10%;
			right: 15%;
			z-index: 99;
			span {
				display: inline-block;
				position: absolute;
				right: 0;
				top: 0;
				background-color: #333;
				color: #fff;
				width: 20px;
				height: 20px;
				line-height: 20px;
				text-align: center;
				cursor: pointer;
			}
			h3 {
				transform: translate(-50%, -50%);
				position: absolute;
				left: 50%;
				top: 40%;
				display: inline-block;
				font-size: 30px;
			}
			input {
				padding: 0;
				margin: 0;
				border-radius: 5px;
				display: inline-block;
				width: 40px;
				height: 40px;
				font-size: 16px;
				// background-color: #0aa;
				color: #fff;
			}
			.btn1 {
				position: absolute;
				bottom: 0;
				right: 60px;
			}
			.btn2 {
				position: absolute;
				bottom: 0;
				right: 0;
			}
		}
</style>

<template>
	<div>
	<content>
		<span class="glyphicon glyphicon-remove" v-on:click="cancel()"></span>
		<h3>map信息已更新，请操作</h3>
		<input class="btn1 btn btn-info" type="button" name="" value="刷新" v-on:click="refrech()">
		<input class="btn2 btn btn-success" type="button" value="强制入库" v-on:click="confirm()">
	</content>

</div>
</template>

<script>
	export default{
		data(){
			return {

			}
		},
		computed:{

		},
		methods:{
			refrech(){
				this.$emit('refrech')
			},
			confirm(){
				this.$emit('fConfirm');
			}
		}
	}
</script>