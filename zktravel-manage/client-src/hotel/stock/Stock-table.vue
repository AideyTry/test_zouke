<style lang="scss" scoped>
	.hotel {
		position: fixed;
		width: 80%;
		left: 17%;
		top: 2%;
		z-index: 140;
		background-color: #EEEEEE;
		/*border: 1px solid #000;*/
	}
	
	.table1 {
		margin-top: 10px;
		width: 100%;
		th {
			color: #000;
		}
		.oColor{
			background-color:#eeeeee;
			// z-index:100;
		}
		th,
		td {
			line-height: 100%;
			text-align: center;
		}
		.tdColor{
			color:#00f;
			cursor: pointer;
		}
		button {
			border-sizing: border-box;
			line-height: 100%;
			text-align: center;
			border-radius: 15%;
			display: inline-block;
			padding: 2px;
			margin: 0 1px;
		}
		.pagination {
			display: inline-block;
			position: absolute;
			right: 2%;
			margin-top: 10px;
			a {
				display: inline-block;
				background-color: #ccc;
				padding: 2px 15px;
				span {
					color: #000;
					display: inline-block;
				}
			}
			input {
				border: 1px solid #ccc;
				border-radius: 5px;
				height: 26px;
				width: 30%;
			}
			button {
				display: inline-block;
			}
			.bColor {
				display: inline-block;
				padding: 6px;
			}
		}
	}
</style>

<template>
	<div>
		<shotel class="hotel" @close="close11" v-if="shotelisTrue"></shotel>
		<photel class="hotel" @close2="close22" v-if="photelisTrue"></photel>
		<table class="table1 table table-bordered tableBg">
			<thead>
				<tr>
					<th>匹配等级</th>
					<th @click="shotel()">SAI名</th>
					<th @click="photel()">{{mk.name}}</th>
					<th>SAI地址</th>
					<th>{{mk.address}}</th>
					<th>SAI电话</th>
					<th>{{mk.phone}}</th>
					<th>坐标链接</th>
					<th>Booking链接</th>
					<th>操作</th>
				</tr>
			</thead>
			<opreat class="oColor" v-if="isTrue" @cancel="cancel" @confirm="confirm" :opreat="opreatData">
				
			</opreat>
			<tbody>
				<tr v-for="item in list">
					<td>{{item.grade}}</td>
					<td @click="shotel()" class="tdColor">{{item.sName}}</td>
					<td @click="photel()" class="tdColor">{{item.mName}}</td>
					<td>{{item.spAddress}}</td>
					<td>{{item.zkAddress}}</td>
					<td>{{item.spPhone}}</td>
					<td>{{item.zkPhone}}</td>
					<td>{{item.link}}</td>
					<td>{{item.bLink}}</td>
					<td>
						<button class="btn btn-info" v-on:click="match()">匹配</button>
						<button class="btn btn-success" v-on:click="put()">入库</button>
						<button class="btn btn-danger" v-on:click="unnecessary()">置为无效</button>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<nav class="pagination pull-right">
					<span>当前页第{{pages.pageNum}}页，共{{pages.total}}页</span>
					<a class="prev" href="javascript:;" v-on:click="prev()" v-bind:class="{disabled:isTrueP}"><span class="glyphicon glyphicon-triangle-left"></span></a>
					<strong>{{pages.pageNum}}/{{pages.total}}</strong>
					<a class="next" href="javascript:;" v-on:click="next()" v-bind:class="{disabled:isTrueN}"><span class="glyphicon glyphicon-triangle-right"></span></a>
					<input type="text" name="" value="输入页码跳转" onfocus="javascript:if(this.value=='输入页码跳转')this.value='';" id="input">
					<button class="bColor btn btn-default" @click="skip()">跳转</button>

				</nav>
			</tfoot>

		</table>

	</div>
</template>

<script>
	import Photel from './Photel';
	import Shotel from './Shotel';
	import Opreat from './Opreat'
	export default {
		props: ['mk', 'list', 'pages'],
		components: {
			photel: Photel,
			shotel: Shotel,
			opreat: Opreat
		},
		data() {
			return {
				// pageNum:1,
				isTrue:false,
				misTrue:false,
				pisTrue:false,
				uisTrue:false,
				isTrueP: false,
				isTrueN: false,
				shotelisTrue: false,
				photelisTrue: false,
				opreatList:
				{
					match:"匹配",
					put:"入库",
					unnecessary:"置为无效"
				}
				
			}
		},
		computed:{
			opreatData(){
				if(this.misTrue===true){
					return this.opreatList.match;
				}
				else if(this.pisTrue===true){
					return this.opreatList.put;
				}
				else if(this.uisTrue===true){
					return this.opreatList.unnecessary;
				}
			}
		},
		methods: {
			//  组件是否显示
			photel() {
				this.photelisTrue = !this.photelisTrue;
			},
			shotel() {
				this.shotelisTrue = !this.shotelisTrue;
			},
			close22(){
				this.photelisTrue = !this.photelisTrue;
			},
			close11(){
				this.shotelisTrue = !this.shotelisTrue;
			},
			//匹配
			match() {
				this.isTrue=true;
				this.misTrue=true;
				this.pisTrue=false;
				this.uisTrue=false;
			},
			//入库
			put() {
				this.isTrue=true;
				this.misTrue=false;
				this.pisTrue=true;
				this.uisTrue=false;
			},
			//置为无效
			unnecessary() {
				this.isTrue = true;
				this.misTrue=false;
				this.pisTrue=false;
				this.uisTrue=true;
			},
			cancel() {
				this.isTrue=false;
			},
			confirm() {
				this.isTrue=false;
			},
			prev() {
				this.$store.state.flag.flag = false;
				if(this.pages.pageNum > 1) {
					this.pages.pageNum--;
					this.$emit('prev');
					this.isTrueN = false;
					this.isTrueP = false;
					return false;
				} else if(this.pages.pageNum <= 1) {
					this.isTrueN = false;
					this.isTrueP = true;
					return false;
				}

			},
			next() {
				this.$store.state.flag.flag = false;
				if(this.pages.pageNum < this.pages.total) {
					this.pages.pageNum++;
					this.$emit('next');
					this.isTrueP = false;
					this.isTrueN = false;
				} else if(this.pages.pageNum >= this.pages.total) {

					this.isTrueN = true;
				}
			},
			skip() {
				let input = document.getElementById("input");
				if(this.pages.pageNum > (input.value - 0)) {
					this.$store.state.flag.page = input.value - 0;
					this.$store.state.flag.flag = true;
					this.$emit('prev');
				} else if(this.pages.pageNum = (input.value - 0)) {

					this.$store.state.flag.page = input.value - 0;
					this.$store.state.flag.flag = true;
					this.$emit('next');
				}

			},
			beforeRouteLeave(to, from, next) {
				if(from.name == 'mk') {
					//				this._scrollTop = document.body.scrollTop;
					this.page = 0;
					this.title.nick_name;
					this.getList();
					console.log(this.page);
				}
				next();
			}
		}
	}
</script>