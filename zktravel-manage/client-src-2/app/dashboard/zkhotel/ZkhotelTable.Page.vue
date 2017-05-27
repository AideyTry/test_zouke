<style lang="scss" scoped>
	table {
		margin-top: 10px;
		width: 100%;
		th,
		td {
			border: 1px solid #000;
			line-height: 100%;
			text-align: center;
		}
		.audit {
			z-index: 333;
			position: fixed;
			top: 5%;
			left: 17%;
			width: 80%;
			border-top: 1px solid #000;
			border-left: 1px solid #000;
			border-right: 1px solid #000;
			/*background: rgba(255, 255, 255, 1);*/
			background-color: #EEEEEE;
		}
		button {
			// background-color: #0cf;
			line-height: 100%;
			text-align: center;
			border-radius: 15%;
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
		<table class="table table-bordered">
			<thead>
				<tr>
					<th>ID</th>
					<th>SAI名</th>
					<th>酒店星级</th>
					<th>国家</th>
					<th>城市</th>
					<th>区</th>
					<th>操作</th>
				</tr>
			</thead>
			<Audit @close="closeSai" v-if="isTrue" class="audit" :updates="counts">
			</Audit>
			<tbody>
				<tr v-for="(item,index) in list">
					<td>{{item._id}}</td>
					<td>{{item.name}}</td>
					<td>{{item.category_name}}</td>
					<td>{{item.country_name}}</td>
					<td>{{item.city_name}}</td>
					<td>{{pending.area}}</td>
					<!-- <td><button class="btn btn-info" @click="audit()">{{pending.handel}}</button></td> -->
					<td v-if="counts.saiisTrue.pisTrue"><button class="btn btn-info" @click="audit()">审核</button></td>
					<td v-if="counts.saiisTrue.onisTrue"><button class="btn btn-info" @click="audit()">查看</button></td>
					<td v-if="counts.saiisTrue.ofisTrue">
						<button class="btn btn-info" @click="audit()">查看</button>
						<button class="btn btn-success" @click="audit()">上架</button>
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
	import Audit from './Audit'
	export default {
		props: ['pending','list','pages'],
		data() {
			return {
				isTrue: false,
				flag: 0,
				isTrueP: false,
				isTrueN: false
			}
		},
		components: {
			Audit: Audit
		},
		computed: {
			counts() {

				return this.$store.getters.counts;
			}

		},
		methods: {
			audit() {
				this.isTrue = !this.isTrue;
			},
			closeSai() {
				this.isTrue = !this.isTrue;
			},
			prev() {
				this.counts.flag.flag = false;
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
				this.counts.flag.flag = false;
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
					this.counts.flag.page = input.value - 0;
					this.counts.flag.flag = true;
					this.$emit('prev');
				} else if(this.pages.pageNum = (input.value - 0)) {

					this.counts.flag.page = input.value - 0;
					this.counts.flag.flag = true;
					this.$emit('next');
				}

			}
		}
	}
</script>