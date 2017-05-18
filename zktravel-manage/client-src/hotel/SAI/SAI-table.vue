<template>
<div>
	
	<table class="table table-bordered">
		<thead>
			<tr>
				<th>ID</th>
				<th>SAI名</th>
				<th>酒店星级</th>
				<th>国家</th>
				<th>城市</th>
				<th>区</th>
				<th>状态</th>
				<th>操作</th>
			</tr>
		</thead>
		<Audit v-if="isTrue" class="audit" :updates="counts">
		</Audit>
		<tbody>
			<tr>
				<td>{{pending.id}}</td>
				<td>{{pending.sname}}</td>
				<td>{{pending.level}}</td>
				<td>{{pending.country}}</td>
				<td>{{pending.city}}</td>
				<td>{{pending.area}}</td>
				<td>{{pending.dates}}</td>
				<td><button class="btn btn-info" @click="audit()">{{pending.handel}}</button></td>
			</tr>
		</tbody>
	</table>
</div>
	
</template>

<style lang="scss" scoped>
	table{
		margin-top:10px;
		width:100%;
		th,td{
		border:1px solid #000;
		line-height:100%;
		text-align:center;
		}
		.audit{
			z-index:333;
			position:fixed;
			top:18%;
			left:10%;
			width:80%;
			// height:60%;
			border-top:1px solid #000;
			border-left:1px solid #000;
			border-right:1px solid #000;
			background: rgba(255,255,255,1);
		}
		button{
			background-color: #0cf;
			line-height:100%;
			text-align:center;
			border-radius:15%;
		}
	}
	
</style>

<script>
	import Audit from './Audit'
	export default{
		props:['pending'],
		data(){
			return {
				isTrue:false,
				flag:0
			}
		},
		components:{
			Audit:Audit
		},
		computed:{
			counts(){

				return this.$store.state.counts;
			}

		},
		methods:{
			audit(){
				console.log(1);
				this.flag++;
				if(this.flag%2!=0){
					this.isTrue=true;
				}else{
					this.isTrue=false;
				}
			}
		}
	}
</script>