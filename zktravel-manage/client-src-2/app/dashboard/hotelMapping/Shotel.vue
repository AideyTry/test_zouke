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
		display: inline-block;
		padding-top: 4px;
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
		height: 150px;
		width: 700px;
		list-style: none;
		overflow-x: scroll;
		white-space: nowrap;
		margin-bottom: 0;
	}
	
	.picture li {
		height: 150px;
		width: 150px;
		display: inline-block;
		white-space: nowrap;
		padding: 4px;
	}
	
	.picture img {
		width: 100%;
		height: 100%;
		display: inline-block;
		padding: 2px;
	}
	
	.actives {
		background-color: #CCCCCC;
	}
	
	textarea {
		text-indent: 2em;
		line-height: 30px;
	}
	
	table th,
	table td {
		text-align: center;
	}
	
	.cricle {
		width: 34px;
		height: 34px;
		line-height: 34px;
		text-align: center;
		border-radius: 100%;
		position: fixed;
		text-align: center;
		right: 3.4%;
		top: 33px;
		font-weight: 100;
		border: 1px solid #999;
		z-index: 150;
		background: #FFFFFF;
	}
	
	.tabs th,
	.tabs td {
		height: 30px;
		line-height: 30px;
		border-right:1px solid #ccc;
		
	}
	.hotel-state {
		padding-top: 10px;
	}
	
	.foot {
		height: 40px;
	}
	
	.contain {
		height: 90%;
		overflow-x: scroll;
	}
</style>
<template>
	<div class="container-fluid contain">
		<!--酒店状态-->
		<div class="row hotel-state">
			<div class="form-group col-lg-3">
				<label class="col-lg-4">酒店ID</label>
				<input type="text" class="col-lg-6" v-model="ids">
			</div>
			<div class="form-group col-lg-3">
				<label class="col-lg-4">状态</label>
				<input type="text" class="col-lg-8" disabled placeholder="状态">
			</div>
			<div class="form-group col-lg-3">
				<label class="col-lg-6">星级</label>
				<select class="star col-lg-4 disabled" disabled>
					<option>{{shdata.category_name}}</option>
				</select>
			</div>
		</div>
		<div class="row">
			<!--酒店名称-->
			<div class="form-group col-lg-6">
				<label class="col-lg-2">酒店中文</label>
				<input type="text" disabled class="col-lg-8" v-model="shdata.name">
			</div>
			<div class="form-group col-lg-6">
				<label class="col-lg-2">酒店英文</label>
				<input type="text" disabled class="col-lg-8" v-model="shdata.name_en">
			</div>
			<div class="form-group col-lg-12">
				<label class="col-lg-1">酒店别名</label>
				<input type="text" disabled class="col-lg-6" placeholder="酒店别名">
			</div>
		</div>
		<!--中文地址-->
		<div class="row">
			<div class="form-group col-lg-12">
				<label class="col-lg-1">中文地址</label>
				<select class="star col-lg-2" disabled>
					<option>{{shdata.country_name}}</option>
				</select>
				<select class="star col-lg-2" disabled>
					<option>{{shdata.city_name}}</option>
				</select>
				<input type="text" disabled class="col-lg-5" v-model="shdata.address">
			</div>
		</div>
		<!--英文地址-->
		<div class="row">
			<div class="form-group col-lg-12">
				<label class="col-lg-1">英文地址</label>
				<select class="star col-lg-2" disabled>
					<option>{{shdata.country_name_en}}</option>
				</select>
				<select class="star col-lg-2" disabled>
					<option>{{shdata.city_name_en}}</option>
				</select>
				<input type="text" disabled class="col-lg-5" v-model="shdata.address">
			</div>
		</div>

		<!--链接-->
		<div class="row">
			<div class="form-group col-lg-12">
				<label class="col-lg-1">链接地址</label>
				<input type="text" class="col-lg-4" disabled v-model="shdata.url_web">
				<a class="btn col-lg-1 btn-go" :href="'https://'+ shdata.url_web" target="_blank">前往</a>
				<label class="col-lg-1">B评分</label>
				<input type="text" disabled class="col-lg-2" v-model="fea.score">
			</div>
		</div>
		<!--全部设施-->
		<div class="row">
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
		</div>
		<!--酒店图片-->
		<div class="row">
			<div class="form-group col-lg-12">
				<label class="col-lg-1">酒店图片</label>
				<ul class="picture thumbnail">
					<li v-for="img in photo"><img :src="img.url" alt="picture"></li>
				</ul>
			</div>
		</div>
		<!--酒店介绍-->
		<div class="row">
			<div class="form-group col-lg-12">
				<label class="col-lg-1">酒店介绍</label>
				<textarea class="col-lg-10" disabled autofocus rows="3" cols="30">{{shdata.description}}
                </textarea>
			</div>
		</div>
		<!--酒店入住、离店时间-->
		<div class="row">
			<div class="form-group col-lg-6">
				<label class="col-lg-2">入住时间</label>
				<input type="text" disabled class="col-lg-8" placeholder="  ----">
			</div>
			<div class="form-group col-lg-6">
				<label class="col-lg-2">离店时间</label>
				<input type="text" disabled class="col-lg-8" placeholder="  ----">
			</div>
		</div>
		<div class="row">
			<div class="form-group col-lg-6">
				<label class="col-lg-2">酒店电话</label>
				<input type="text" disabled class="col-lg-8" v-model="shdata.phone">
			</div>
			<div class="form-group col-lg-6">
				<label class="col-lg-2">酒店传真</label>
				<input type="text" disabled class="col-lg-8" v-model="shdata.fax" placeholder="null">
			</div>
			<div class="form-group col-lg-6">
				<label class="col-lg-2">酒店邮箱</label>
				<input type="email" class="col-lg-8" v-model="shdata.email" disabled>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-11">
				<label class="col-lg-1 pull-left">mapping信息</label>
				<table disabled class="table table-bordered col-lg-offset-1 tabs">
					<tr class="actives">
						<th>vt_id</th>
						<th>mk_id</th>
						<th>dl_id</th>
						<th>booking</th>
					</tr>
					<tr>
						<td>
							<router-link v-for="vid in vids" :key="vid" :to="{name: 'fullpage-vtids', params:{spid: vid}}" target="_blank">{{vid}}</router-link>
						</td>
						<td>
							<router-link v-for="mid in mids" :key="mid" :to="{name: 'fullpage-mkids', params: {spid: mid}}" target="_blank">{{mid}}</router-link>
						</td>
						<td>
							<router-link v-for="did in dids" :key="did" :to="{name: 'fullpage-dlids', params: {spid: did}}" target="_blank">{{did}}</router-link>
						</td>
						<td>
							<a :href="'https://'+ shdata.url_web" target="_blank">{{shdata.url_web}}</a>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="row foot"></div>
	</div>
</template>

<script>
	import store from './store'
	import ajax from '@local/common/ajax';
	export default {
		props: ['updates', 'ids'],
		data() {
			return {
				isTrue: false,
				shdata: {}, // 界面数据
				photo: [], // 界面中要显示的图片
				fea: {}, // 评价
				vtdata: {},
				vids: [], // 表格中vt_ids
				mids: [], // 表格中mk_ids
				dids: [] // 表格中dl_ids
			}
		},
		created() {
			ajax.post('/api/zk-hotel/detail', {
				id: this.ids
			}).then(json => {
				if(json.code === 0) {
					this.shdata = json.detail;
					this.photo = this.shdata.photos;
					this.fea = this.shdata.booking_info.feature;
					this.vids = this.shdata.sp_id.vt_ids;
					this.mids = this.shdata.sp_id.mk_ids;
					this.dids = this.shdata.sp_id.dl_ids;
				}
			})
		},
		methods: {
			update() {
				this.updates.isTrue.aisTrue = false;
				store.commit('audit');
			},
			close() {
				this.$emit('close');
			},
		},
	}
</script>
