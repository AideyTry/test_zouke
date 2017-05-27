<style lang="scss" scoped>
	.hotel {
		position: fixed;
		width: 80%;
		left: 16%;
		top: 50px;
		z-index: 140;
		background-color: #FFFFFF;
	}
	
	.table1 {
		margin-top: 10px;
		width: 100%;
		th {
			color: #000;
		}
		.oColor {
			background-color: #eeeeee;
			// z-index:100;
		}
		.puts{
			z-index:99;
		}
		th,
		td {
			line-height: 100%;
			text-align: center;
		}
		.tdColor {
			color: #00f;
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
	 .shade {width:100%; height:100%; position:fixed; z-index: 110; top:20px; left:15%; background:#CCCCCC;}
	 .shade2 {width:100%; height:100%; position:fixed; z-index: 110; top:20px; left:15%; background:#CCCCCC;}
</style>

<template>
	<div>
			<div class="shade" v-if="shotelisTrue"></div>
			<div class="shade2" v-if="photelisTrue"></div>
			<shotel class="hotel" @close="close11" v-if="shotelisTrue" :ids="sid"></shotel>
			<photel class="hotel" @close2="close22" v-if="photelisTrue" :idp="pid"></photel>
			<table class="table1 table table-bordered tableBg">
				<thead>
					<tr>
						<th>匹配等级</th>
						<th>SAI名</th>
						<th>{{mk.name}}</th>
						<th>SAI地址</th>
						<th>{{mk.address}}</th>
						<th>SAI电话</th>
						<th>{{mk.phone}}</th>
						<th>坐标链接</th>
						<th>Booking链接</th>
						<th>操作</th>
					</tr>
				</thead>
				<opreat class="oColor" v-if="isTrue" @cancel="cancel" @confirm="confirm" :opreat="opreatData" :items='item'>
				</opreat>
				<put class="puts" v-if="store.state.putisTrue" @refrech="refrech" @fConfirm="fConfirm"></put>
				<tbody>
					<tr v-for="(item,index) in list">
						<td>{{item.levelDesc}}</td>
						<td @click="shotel(item.zkId)" class="tdColor">{{item.zkName}}</td>
						<td @click="photel(item.spId)" class="tdColor">{{item.spName}}</td>
						<td>{{item.zkAddress}}</td>
						<td>{{item.spAddress}}</td>
						<td>{{item.zkPhone}}</td>
						<td>{{item.spPhone}}</td>
						<td @click="link(item)" class="tdColor">查看</td>
						<td @click="booking(item)" class="tdColor">{{item.bookingUrl}}</td>
						<td>
							<button class="btn btn-info" v-on:click="match(item)">匹配</button>
							<button class="btn btn-success" v-on:click="put(item)">入库</button>
							<button class="btn btn-danger" v-on:click="unnecessary(item)">置为无效</button>
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
	import store from './store'
	import Photel from './Photel';
	import Shotel from './Shotel';
	import Opreat from './Opreat';
	import Put from './Put'
	export default {
		props: ['mk', 'list', 'pages'],
		components: {
			photel: Photel,
			shotel: Shotel,
			opreat: Opreat,
			put: Put
		},
		data() {
			return {
				// pageNum:1,

				item:null,
				sid:null,
				pid:null,
				items:null,

				sid: null,
				pid: null,
				items: null,

				isTrue: false,
				misTrue: false,
				pisTrue: false,
				uisTrue: false,
				isTrueP: false,
				isTrueN: false,
				shotelisTrue: false,
				photelisTrue: false,
				shotelData: [], // 酒店数据
				opreatList: {
					match: "匹配",
					put: "入库",
					unnecessary: "置为无效"
				}

			}
		},
		computed: {
			opreatData() {
			    if(this.misTrue === true) {
			     	return this.opreatList.match;
			    } 
			    else if(this.pisTrue === true) {
			     	return this.opreatList.put;
			    } 
			    else if(this.uisTrue === true) {
			     	return this.opreatList.unnecessary;
			    }
	   		},
		   store(){
		    	return store;
		   }
		},
		methods: {
			// 组件是否显示
			photel(pid) {
				this.photelisTrue = !this.photelisTrue;
				this.pid = pid;
			},
			shotel(sid) {
				this.shotelisTrue = !this.shotelisTrue;
				this.sid = sid;
			},
			link(item){
				const params = [];
				params.push([item.spGPS, item.name]);
				params.push([item.zkGPS, item.zkName]);

				window.open(`/pages/location.html?${encodeURIComponent(JSON.stringify(params))}`);
			},		
			booking(item){
				window.open(item.bookingUrl);
			},
			close22() {
				this.photelisTrue = !this.photelisTrue;
			},
			close11() {
				this.shotelisTrue = !this.shotelisTrue;
			},
			//匹配
			match(item) {
				this.isTrue = true;
				this.misTrue = true;
				this.pisTrue = false;
				this.uisTrue = false;
				this.item=item;
				
				console.log(this.list);

				//匹配去请求数据
				// store.dispatch('actionOmath');
			},
			//入库
			put(item) {
				this.isTrue = true;
				this.misTrue = false;
				this.pisTrue = true;
				this.uisTrue = false;
				this.item=item;
			},
			//置为无效
			unnecessary(item) {
				this.isTrue = true;
				this.misTrue = false;
				this.pisTrue = false;
				this.uisTrue = true;
				this.item=item;
			},
			cancel() {
				this.isTrue = false;
			},
			confirm() {
				this.isTrue = false;
			},

			//入库提示后刷新功能和强制入库功能
			refrech(){
				store.commit('closePut');
			},
			fConfirm(){
				store.commit('closePut');
				store.commit('putConstraint');
			},

			prev() {
				store.state.flag.flag = false;
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
				store.state.flag.flag = false;
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
					store.state.flag.page = input.value - 0;
					store.state.flag.flag = true;
					this.$emit('prev');
				} else if(this.pages.pageNum = (input.value - 0)) {

					store.state.flag.page = input.value - 0;
					store.state.flag.flag = true;
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