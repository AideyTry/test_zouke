<template>
	<div class="main clearfix">
		<strong :c="counts" v-if="counts.isTrue.eisTrue">
			<span class="glyphicon glyphicon-remove" v-on:click="cancel()"></span>
			<h3>确定要退出吗？</h3>
			<br>
			<input class="btn1" type="button" name="" value="取消" v-on:click="cancel()">
			<input class="btn2" type="button"  value="确定" v-on:click="confirm()">
		</strong>
		<h3>酒店基础数据</h3>
		<V-head></V-head>
		<V-aside></V-aside>
		<div class="content">
				<router-view></router-view>
		</div>
	</div>
</template>



<style lang="scss" scoped>
	.main{
		width:100%;
		height:100%;
		h3{
			font-size:24px;
			font-weight:bold;
			font-style:normal;
			font-family:"微软雅黑"!important;
			color:#000;
			text-align:left;
			margin:20px 0;
		}
		.content{
			float:right;
			width:85%;
			height:800px;
			background-color:#fff;
			border-top:1px solid #000;
			border-top:none;
		}
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
				padding:0;
				margin:0;
				border-radius:5px;
				display:inline-block;
				width:40px;
				height:40px;
				font-size:16px;
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
	}
</style>



<script>
	import VHead from './Header';
	import VAside from './Aside';
	export default {
		components:{
			VHead,
			VAside
		},
		computed:{
			counts(){
				return this.$store.state.counts
			}
		},
		methods:{
			// exit(){s
			// 		console.log(111);

			// 		this.$store.isTrue=true;
			// 		this.$store.commit('c');
			// 		console.log(this.isTrue);
			// },
			cancel(){
				this.$store.commit('c');
			},
			confirm(){
				this.$store.commit('c');
			}
		}
	}
</script>