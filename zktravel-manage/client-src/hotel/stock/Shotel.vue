<style lang="scss" scoped>
	.hotel-top {
		border-bottom: 1px solid #ccc;
		padding: 5px 15px;
	}
	
	.hotel-top input {
		height: 28px;
	}
	
	.hotel-btn button {
		margin-right: 10px;
		width: 70px;
	}
	
	.modify {
		background: #ffffff;
		border: 1px solid #46b8da;
		color: #46b8da
	}
	
	.title {
		font-size: 20px;
		font-weight: bold;
	}
	
	.container-fluid label {
		text-align: right;
		margin-top: 2px;
	}
	
	.container-fluid input {
		height: 28px;
	}
	
	.star {
		height: 26px;
	}
	
	.btn-go {
		background: dodgerblue;
		width: 60px;
		height: 28px;
		color: #FFFFFF;
		display:inline-block;
		padding-top:4px;
	}
	
	.borders {
		border: 1px solid #ccc;
		text-align: center;
		height: 28px;
		line-height: 28px;
		width: 60px;
		margin-right: 10px;
	}
	
	.border-width {
		width: 100px;
	}
	
	.picture {
		height: 100px;
		width: 180px;
		margin-left: -12px;
	}
	
	.picture img {
		width: 100%;
		height: 100%;
	}
	.active {
		background-color: #999;
	}
	textarea {
		text-indent: 2em;
		line-height: 30px;
	}
	
	table th,
	table td {
		text-align: center;
	}
	.cricle{
		width:34px;
		height:34px;
		line-height:34px;
		text-align: center;
		border-radius:100%;
		position:absolute;
		text-align: center;
		top:-17px;
		right:-17px;
		font-weight: 100;
		border:1px solid #999;
		z-index: 130;
		background:#FFFFFF;
	}
</style>
<template id="files-list-template">
	<div class="container-fluid contain">
		<div @click="close()" class="cricle">X</div>
		<div class="row hotel-top">
			<div class="title pull-left col-lg-2">酒店详情</div>
		</div>
		<!--酒店状态-->
		<div class="row">
			<div class="form-group col-lg-3">
				<label class="col-lg-4">酒店ID</label>
				<input type="text" class="col-lg-6" disabled placeholder="XXXXXX">
			</div>
			<div class="form-group col-lg-3">
				<label class="col-lg-4">状态</label>
				<input type="text" class="col-lg-6" disabled placeholder="已上架-待审核">
			</div>
			<div class="form-group col-lg-3">
				<label class="col-lg-4">星级</label>
				<select class="star col-lg-4 disabled" disabled>
					<option value="1星">1星</option>
					<option value="2星">2星</option>
					<option value="3星">3星</option>
				</select>
			</div>
		</div>
		<div class="row">
			<!--酒店名称-->
			<div class="form-group col-lg-12">
				<label class="col-lg-1">酒店中文</label>
				<input type="text" disabled class="col-lg-4" placeholder="旅游大道酒店">
			</div>
			<div class="form-group col-lg-12">
				<label class="col-lg-1">酒店英文</label>
				<input type="text" disabled class="col-lg-4" placeholder="Hôtel Tourisme Avenue">
			</div>
			<div class="form-group col-lg-12">
				<label class="col-lg-1">酒店别名</label>
				<input type="text" disabled class="col-lg-6" placeholder="Hotel Tourisme Avenue / 旅游大道金牌酒店">
			</div>
			<!--中文地址-->
			<div class="form-group col-lg-12">
				<label class="col-lg-1">中文地址</label>
				<select class="star col-lg-1" disabled>
					<option>法国</option>
				</select>
				<select class="star col-lg-1" disabled>
					<option>巴黎</option>
				</select>
				<select class="star col-lg-1" disabled>
					<option>15区</option>
				</select>
				<input type="text" disabled class="col-lg-3" placeholder="66, avenue de la Motte-Picquet">
			</div>
			<!--英文地址-->
			<div class="form-group col-lg-12">
				<label class="col-lg-1">英文地址</label>
				<select class="star col-lg-1" disabled>
					<option>French</option>
				</select>
				<select class="star col-lg-1" disabled>
					<option>Paris</option>
				</select>
				<select class="star col-lg-1" disabled>
					<option>15th arr.</option>
				</select>
				<input type="text" disabled class="col-lg-3" placeholder="66, avenue de la Motte-Picquet">
			</div>
			<!--链接-->
			<div class="form-group col-lg-12">
				<label class="col-lg-1">链接地址</label>
				<input type="url" class="col-lg-4" placeholder="https://www.booking.com/">
				<a class="btn col-lg-1 btn-go" href="#">前往</a>
				<!--<button type="button" class="btn col-lg-1 btn-go">前往</button>-->
				<label class="col-lg-1">B评分</label>
				<input type="text" disabled class="col-lg-2" placeholder="https://www.booking.com/">
			</div>
			<!--全部设施-->
			<div class="form-group col-lg-12">
				<label class="col-lg-1">全部设施</label>
				<span class="col-lg-1 borders">wifi</span>
				<span class="col-lg-1 borders border-width">可以停车</span>
				<span class="col-lg-1 borders border-width">可以停车</span>
			</div>
			<div class="form-group col-lg-12">
				<label class="col-lg-1">热门设施</label>
				<span class="col-lg-1 borders">wifi</span>
				<span class="col-lg-1 borders border-width">可以停车</span>
				<span class="col-lg-1 borders border-width">可以停车</span>
			</div>
			<!--酒店图片-->
			<div class="form-group col-lg-12">
				<label class="col-lg-1">酒店图片</label>
				<!--<a href="#" >-->
				<input class="col-lg-2 picture" type="file" id="file_input" placeholder="上传图片">
				<!--</a>-->
				<!--<a href="#" class="col-lg-2 picture">-->
				<input class="col-lg-2 picture" type="file" placeholder="上传">
				<!--</a>-->
			</div>
			<!--酒店介绍-->
			<div class="form-group col-lg-12">
				<label class="col-lg-1">酒店介绍</label>
				<textarea class="col-lg-8" disabled autofocus rows="2" cols="30">Hotel Tourisme Avenue酒店位于巴黎市中心，距离埃菲尔铁塔仅有10分钟步行路程，距离战神广场（Champs de Mars）仅有5分钟步行路程，提供覆盖各处的免费Wi-Fi和24小时前台。
Hôtel Tourisme Avenue酒店的客房以当代风格装饰，配有保险箱、冰箱、礼宾盘以及带浴缸或淋浴的私人浴室。
                </textarea>
			</div>
			<!--酒店入住、离店时间-->
			<div class="form-group col-lg-6">
				<label class="col-lg-2">入住时间</label>
				<input type="text" disabled class="col-lg-6" placeholder="XXXXXX">
			</div>
			<div class="form-group col-lg-6">
				<label class="col-lg-2">离店时间</label>
				<input type="text" disabled class="col-lg-6" placeholder="XXXXXX">
			</div>
		</div>
		<div class="row">
			<div class="form-group col-lg-6">
				<label class="col-lg-2">酒店电话</label>
				<input type="text" disabled class="col-lg-6" placeholder="XXXXXX">
			</div>
			<div class="form-group col-lg-12">
				<label class="col-lg-1">酒店传真</label>
				<input type="text" disabled class="col-lg-4" placeholder="XXXXXX">
			</div>
			<div class="form-group col-lg-6">
				<label class="col-lg-2">酒店邮箱</label>
				<input type="email" class="col-lg-6" placeholder="XXXXXX" disabled >
			</div>
		</div>
		<div class="row">
				<div class="hotel-state col-lg-6">
					<label class="col-lg-2">信息</label>
					<table disabled class="table-bordered table col-lg-offset-1">
						<tr class="active">
							<th>vt_id</th>
							<th>mk_id</th>
							<th>dl_id</th>
							<th>booking</th>
						</tr>
						<tr>
							<td>2347</td>
							<td>33788</td>
							<td>882131</td>
							<td><a href="#">链接XXX</a></td>
						</tr>
					</table>
				</div>
			</div>
	</div>
</template>

<script>
	export default {
		props: ['updates'],
		data() {
			return {
				isTrue: false,
			}
		},
		methods: {
			update() {
				console.log(this.updates.isTrue.aisTrue);
				this.updates.isTrue.aisTrue = false;
				this.$store.commit('audit');
				console.log(this.updates.isTrue.aisTrue);
			},
			close(){
				this.$emit('close');
			}
		},
	}
</script>