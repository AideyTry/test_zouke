<style lang="scss" scoped>
	.shotel {
			width: 70%;
			height: 100%;
			position: absolute;
			top: 100px;
			left: 15%;
			background: rgba(255,255,255,1);
			z-index: 100;
		}
	table {
		margin-top: 10px;
		width: 100%;
		position:relative;
		th {
			color: #000;
		}
	
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
				background-color: #0aa;
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
		th,
		td {
			/*// border:1px solid #000;*/
			line-height: 100%;
			text-align: center;
		}
		button {
			/*// background-color: #0cf;*/
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
				/*// background-color: #ccc;*/
				display: inline-block;
				padding: 6px;
			}
		}
	}
	
</style>

<template>
	<div>
		<shotel v-if="shotelisTrue" class="shotel"></shotel>
		<table class="table table-bordered">
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

			<content v-if="misTrue">
				<span class="glyphicon glyphicon-remove" v-on:click="cancel()"></span>
				<h3>是否匹配?</h3>
				<input class="btn1" type="button" name="" value="否" v-on:click="cancel()">
				<input class="btn2" type="button" value="是" v-on:click="confirm()">
			</content>
			<content v-if="pisTrue">
				<span class="glyphicon glyphicon-remove" v-on:click="cancel()"></span>
			</content>
			<content v-if="uisTrue">
				<span class="glyphicon glyphicon-remove" v-on:click="cancel()"></span>
			</content>
			<tbody>
				<tr v-for="item in list">
					<td>{{item.grade}}</td>
					<td @click="shotel()">{{item.sName}}</td>
					<td @click="shotel()">{{item.mName}}</td>
					<td>{{item.sAddress}}</td>
					<td>{{item.mAddress}}</td>
					<td>{{item.sPhone}}</td>
					<td>{{item.mPhone}}</td>
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
	import Shotel from './Shotel';
	import Photel from './Photel';
	export default {
		props: ['mk', 'list', 'pages'],
		components: {
			shotel: Shotel,
			photel: Photel
		},
		data() {
			return {
				// pageNum:1,
				misTrue: false,
				pisTrue: false,
				uisTrue: false,
				isTrueP: false,
				isTrueN: false,
				shotelisTrue: false,
				photelisTrue: false
			}
		},
		methods: {
			match() {
				this.misTrue = true;
				this.pisTrue = false;
				this.uisTrue = false;
				console.log(this.mk);
			},
			put() {
				this.misTrue = false;
				this.pisTrue = true;
				this.uisTrue = false;
			},
			unnecessary() {
				this.misTrue = false;
				this.pisTrue = false;
				this.uisTrue = true;
			},
			cancel() {
				this.misTrue = false;
				this.pisTrue = false;
				this.uisTrue = false;
			},
			confirm() {
				this.misTrue = false;
				this.pisTrue = false;
				this.uisTrue = false;
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
			shotel() {
				this.shotelisTrue = true;
			},
			photel(){
				this.photelisTrue = true;
			}

		}
	}
</script>