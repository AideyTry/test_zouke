<style lang="scss" scoped>
	*{
		padding:0;
		margin:0;
	}
	.hColor{
		height:120px;
		background-color: #eee;
		box-sizing:border-box;
		h3{
			margin:0;
			padding:0;
			font-size:20px;
			color:#000;
		}
		input{
			display:inline-block;
			height:34px;
			border:1px solid #ccc;
			border-radius:5px;
		}
		button{
			background-color: #0cf;
			margin-right:50px;
		}
		strong{
			margin:0 50px;
		}
		.audit{
			margin-top:36px;
			width:302px;
			height:32px;
			position:absolute;
			top:100px;
			li{
				display:inline-block;
				float:left;
				border-top:1px  solid #666;
				border-right:1px  solid #666;
				border-bottom:1px  solid #666;
				
			}
			.sAudit{
				display:inline-block;
				width:36%;
				height:32px;
				line-height:32px;
				text-align:center;

				font-size:12px;
				font-family: 'microsoft yahei';
			}
			.sColor:hover{
				cursor:pointer;
				color:#0cc;
			}
			.unCompleted{
				display:inline-block;
				width:26%;
				height:32px;
				line-height:32px;
				text-align:center;
			
				font-size:12px;
				font-family: 'microsoft yahei';
			}
			.bgColor{
				background-color: #fff;
				border-bottom:none;
			}
			// .sAudit:hover{
			// 	background-color: #fff;
			// }
			.unCompleted:hover{
				background-color: #fff;
			}
		}
	}
</style>
<template>
	<div>
		<div class="hColor">
			<h3>SAI酒店库</h3>
			<input type="text" name="" value="搜索酒店名/ID" onfocus="javascript:if(this.value=='搜索酒店名/ID')this.value='';">
			<button class="btn btn-info">搜索</button>
			<strong>
				<span>星级</span>
			<select>
				<option>全部</option>
				<option>1星</option>
				<option>2星</option>
				<option>3星</option>
				<option>4星</option>
				<option>5星</option>
			</select>
			</strong>
			<strong>
				<span>国家</span>
			<select>
				<option>全部</option>
				<option>法国</option>
				<option>德国</option>
				<option>英国</option>
				<option>希腊</option>
				<option>意大利</option>
			</select>
			</strong>
			<ul class="audit">
				<li class="sAudit sColor" v-on:click="gotoPage('pending')" v-bind:class="{bgColor:isTrue.one}">
					已上架-待审核
				</li>
				<li class="sAudit sColor" v-on:click="gotoPage('online')" v-bind:class="{bgColor:isTrue.two}">
				已上架-通过审核
				</li>
				<li class="unCompleted sColor" v-on:click="gotoPage('offline')" v-bind:class="{bgColor:isTrue.three}">
					未上架
				</li>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>
	
<script>
	export default{
		data(){
			return{
				SAIData:{
					//真实数据
					id:"1",
					name:"sai",
					grade:"5星",
					country:"德国",
					city:"慕尼黑",
					area:"Hadern",

					//跟UI相关数据
					status:"",
					operate:"查看"	
				},
				isTrue:{
					one:false,
					two:false,
					three:false
				}
			}
		},
		methods:{
			gotoPage(page){
				let url = '';
				switch(page){
					case 'pending':
						url='/dashboard/zkhotel/pendding'
						this.isTrue.one=true;
						this.isTrue.two=false;
						this.isTrue.three=false;
						break;
					case 'online':
						url = '/dashboard/zkhotel/online';
						this.isTrue.one=false;
						this.isTrue.two=true;
						this.isTrue.three=false;
						break;
					case 'offline':
						url = '/dashboard/zkhotel/offline';
						this.isTrue.one=false;
						this.isTrue.two=false;
						this.isTrue.three=true;
						break;
				}
				this.$router.push({
					path: url
				});
			}
		}
	}
</script>