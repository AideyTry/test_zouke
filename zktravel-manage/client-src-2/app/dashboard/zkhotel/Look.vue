
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
	
	.hotel-state {
		margin-top: 6px;
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
		/*float: left;*/
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
	
	textarea {
		text-indent: 2em;
		line-height: 30px;
	}
	
	table th,
	table td {
		text-align: center;
	}
	
	.actives {
		background-color: #999999;
	}
	
	.cricle {
		width: 34px;
		height: 34px;
		line-height: 34px;
		text-align: center;
		border-radius: 100%;
		position: absolute;
		text-align: center;
		top: -17px;
		right: -17px;
		font-weight: 100;
		border: 1px solid #999;
		z-index: 130;
		background: #FFFFFF;
	}
	
	.foot {
		height: 100px;
		width: 100%;
	}
</style>
<template>
	<div class="table-responsive">
		<div class="container-fluid">
			<div @click="close()" class="cricle">X</div>
			<div class="row hotel-top">
				<div class="title pull-left col-lg-2">酒店详情</div>
				<div class="hotel-btn pull-right col-lg-offset-6 col-lg-4">
					<button type="button" class="btn modify" @click="update()">修改</button>
					<button type="button" class="pass btn btn-success" @click="pass()">通过</button>
				</div>
			</div>
			<!--酒店状态-->
			<div class="row hotel-state">
				<div class="form-group col-lg-3">
					<label class="col-lg-4">酒店的ID</label>
					<!--<input type="text" class="col-lg-6" v-model="aid">-->
					<input type="text" class="col-lg-6">
				</div>
				<div class="form-group col-lg-3">
					<label class="col-lg-4">状态</label>
					<input type="text" class="col-lg-8" disabled placeholder="状态">
				</div>
				<div class="form-group col-lg-3">
					<label class="col-lg-6">星级</label>
					<select class="star col-lg-4 disabled" disabled>
						<option>{{Adata.category_name}}</option>
					</select>
				</div>
			</div>
			<div class="row">
				<!--酒店名称-->
				<div class="form-group col-lg-6">
					<label class="col-lg-2">酒店中文</label>
					<input type="text" disabled class="col-lg-8" v-model="Adata.name">
				</div>
				<div class="form-group col-lg-6">
					<label class="col-lg-2">酒店英文</label>
					<input type="text" disabled class="col-lg-8" v-model="Adata.name_en">
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
						<option>{{Adata.country_name}}</option>
					</select>
					<select class="star col-lg-2" disabled>
						<option>{{Adata.city_name}}</option>
					</select>
					<input type="text" disabled class="col-lg-5" v-model="Adata.address">
				</div>
			</div>
			<!--英文地址-->
			<div class="row">
				<div class="form-group col-lg-12">
					<label class="col-lg-1">英文地址</label>
					<select class="star col-lg-2" disabled>
						<option>{{Adata.country_name_en}}</option>
					</select>
					<select class="star col-lg-2" disabled>
						<option>{{Adata.city_name_en}}</option>
					</select>
					<input type="text" disabled class="col-lg-5" v-model="Adata.address">
				</div>
			</div>
			<!--链接-->
			<div class="row">
				<div class="form-group col-lg-12">
					<label class="col-lg-2">booking链接地址</label>
					<input type="text" class="col-lg-4" disabled v-model="Adata.url_web">
					<a class="btn col-lg-1 btn-go" :href="'https://'+ Adata.url_web" target="_blank">前往</a>
					<label class="col-lg-1">B评分</label>
					<input type="text" disabled class="col-lg-2" v-model="feat.score">
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
						<li v-for="img in Aphoto"><img :src="img.url" alt="picture"></li>
					</ul>
				</div>
			</div>
			<!--酒店介绍-->
			<div class="row">
				<div class="form-group col-lg-12">
					<label class="col-lg-1">酒店介绍</label>
					<textarea class="col-lg-8" disabled autofocus rows="3" cols="30">{{Adata.description}}
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
			</div>ss
			<div class="row">
				<div class="form-group col-lg-6">
					<label class="col-lg-2">酒店电话</label>
					<input type="text" disabled class="col-lg-8" v-model="Adata.phone">
				</div>
				<div class="form-group col-lg-6">
					<label class="col-lg-2">酒店传真</label>
					<input type="text" disabled class="col-lg-8" v-model="Adata.fax" placeholder="null">
				</div>
				<div class="form-group col-lg-6">
					<label class="col-lg-2">酒店邮箱</label>
					<input type="email" class="col-lg-8" v-model="Adata.email" disabled>
				</div>
			</div>
			<div class="row">
				<div class="hotel-state col-lg-6">
					<label class="col-lg-2">信息</label>
					<table disabled class="table-bordered table col-lg-offset-1">
						<tr class="actives">
							<th>vt_id</th>
							<th>mk_id</th>
							<th>dl_id</th>
							<th>booking</th>
						</tr>
						<tr class="active">
							<td>
								<a v-for="vid in vidss" @click="vtlink(vid)" target="_blank"
									 href="vtids">{{vid}}</a>
							</td>
							<td>
								<a v-for="mid in midss" @click="mklink(mid)" target="_blank"
									 href="fullpage/mkid">{{mid}}</a>
							</td>
							<td>
								<a v-for="did in didss" @click="dllink(did)" target="_blank" 
									href="fullpage/dlid">{{did}}</a>
							</td>
							<td>
								<a :href="'https://'+ Adata.url_web" target="_blank">{{Adata.url_web}}</a>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<div class="foot"></div>
	</div>

</template>

<script>
	export default {
		props: ['updates','aid'],
		data() {
			return {
				isTrue: false,
				flag: true,
				Adata: {},
				Aphoto: [],
				feat: {},
				vidss: [], // 表格中vt_ids
				midss: [], // 表格中mk_ids
				didss: [] // 表格中dl_ids
			}
		},
		created() {
			ajax.post('/api/zk-hotel/detail', {
				id: this.aid
			}).then(json => {
				if(json.code === 0) {
					this.Adata = json.detail;
					this.Aphoto = this.Adata.photos;
					this.feat = this.Adata.booking_info.feature;
					this.vidss = this.Adata.sp_id.vt_ids;
					this.midss = this.Adata.sp_id.mk_ids;
					this.didss = this.Adata.sp_id.dl_ids;
				}
			})
		},
		methods: {
			// 修改
			update() {
				this.updates.isTrue.aisTrue = false;
				this.$store.commit('audit');
				this.flag = false;
			},
			// 通过
			pass() {

			},
			// 关闭组件
			close() {
				this.$emit('close');
			},
			vtlink(para) {
				this.$store.commit("getId", para)
			},
			mklink(para) {
				this.$store.commit("getMk", para)
			},
			dllink() {
				this.$store.commit("getDl", para)
			}
		}
	}
</script>
