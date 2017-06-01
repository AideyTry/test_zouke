<style lang="scss" scoped>
	.zkhotel{
		.el-pagination {
			text-align: right;
			background: #fff;
			padding-right: 20px;
			height: 50px;
			padding-top: 10px;
			position: fixed;
			right: 0px;
			width: 83.3%;
		}
		.search-group{
			padding-left: 20px;
			height: 50px;
			.search-input{
				margin-right: 20px;
			}

		}
	}


</style>
<template>
	<div class="zkhotel">
		<el-tabs :active-name="$route.params.status" @tab-click="changetab">
			<el-tab-pane label="已上架-待审核" name="throughing">
				<el-row type="flex" class="search-group">
					<el-col :span="4" class="search-input">
						<el-input
								placeholder="搜索酒店名/ID"
								icon="search"
								v-model="searchinput"
								:on-icon-click="searchhotel">
						</el-input>
					</el-col>
					<el-col :span="1">

					</el-col>
					<el-col :span="3">
						<el-select  clearable v-model="starlv" placeholder="星级">
							<el-option :value="1">
								一星级
							</el-option>
							<el-option :value="2">
								二星级
							</el-option>
							<el-option :value="3">
								三星级
							</el-option>
							<el-option :value="4">
								四星级
							</el-option>
							<el-option :value="5">
								五星级
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="1">

					</el-col>
					<el-col :span="3">
						<el-select  clearable v-model="searchcountry" placeholder="国家">
							<el-option value="ge">
								德国
							</el-option>

						</el-select>
					</el-col>
				</el-row>
				<el-table
						:data="currentdata"
						border
						style="width: 100%">
					<el-table-column
							prop="_id"
							label="ID">
					</el-table-column>
					<el-table-column
							prop="name"
							label="SAI名">
					</el-table-column>
					<el-table-column
							prop="category_name"
							label="酒店星级">
					</el-table-column>
					<el-table-column
							prop="country_name"
							label="国家">
					</el-table-column>
					<el-table-column
							prop="city_name"
							label="城市">
					</el-table-column>
					<el-table-column
							prop="zkPhone"
							label="区">
					</el-table-column>
					<el-table-column label="操作" width="150">
						<template scope="scope">
							<el-button size="small" type="info" @click="verifyconfirm(scope.row)">审核
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination layout="total, prev, pager, next, jumper" @current-change="changepage" :total="total"
							   :page-size="pager.pageSize"></el-pagination>
			</el-tab-pane>
			<el-tab-pane label="已上架-通过审核" name="throughed">
				<el-table
						:data="currentdata"
						border
						style="width: 100%">
					<el-table-column
							prop="_id"
							label="ID">
					</el-table-column>
					<el-table-column
							prop="name"
							label="SAI名">
					</el-table-column>
					<el-table-column
							prop="category_name"
							label="酒店星级">
					</el-table-column>
					<el-table-column
							prop="country_name"
							label="国家">
					</el-table-column>
					<el-table-column
							prop="city_name"
							label="城市">
					</el-table-column>
					<el-table-column
							prop="zkPhone"
							label="区">
					</el-table-column>
					<el-table-column label="操作" width="150">
						<template scope="scope">
							<el-button size="small" type="info" @click="matcherconfirm(scope.$index, scope.row)">查看
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination layout="total, prev, pager, next, jumper" @current-change="changepage" :total="total"
							   :page-size="pager.pageSize"></el-pagination>
			</el-tab-pane>
			<el-tab-pane label="未上架"  name="ground">
				<el-table
						:data="currentdata"
						border
						style="width: 100%">
					<el-table-column
							prop="_id"
							label="ID">
					</el-table-column>
					<el-table-column
							prop="name"
							label="SAI名">
					</el-table-column>
					<el-table-column
							prop="category_name"
							label="酒店星级">
					</el-table-column>
					<el-table-column
							prop="country_name"
							label="国家">
					</el-table-column>
					<el-table-column
							prop="city_name"
							label="城市">
					</el-table-column>
					<el-table-column
							prop="zkPhone"
							label="区">
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template scope="scope">
							<el-button size="small" type="info" @click="matcherconfirm(scope.$index, scope.row)">查看
							</el-button>
							<el-button size="small" type="info" @click="matcherconfirm(scope.$index, scope.row)">上架
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination layout="total, prev, pager, next, jumper" @current-change="changepage" :total="total"
							   :page-size="pager.pageSize"></el-pagination>
			</el-tab-pane>
		</el-tabs>
		<el-dialog title="酒店详情" :visible.sync="showdialog1">
			<shotel class="hotel"  v-if="showdialog1" :ids="sid" :sp="sp"></shotel>
		</el-dialog>
	</div>
</template>
	
<script>
    import ajax  from '@local/common/ajax';
    import Shotel from '../hotelMapping/Shotel';
	export default{
        components: {
            shotel: Shotel
        },
		data(){
			return{
				currentdata:[],
				total:1,
				pager:{
					 page:1,
					 pageSize:15
				},
				showdialog1:false,
				sp:'',
				pid:'',
				sid:'',
                photelisTrue:false,
                shotelisTrue:false,
                searchinput:'',
                starlv:1,
                searchcountry:'ge'

			}
		},
		computed:{

		},
		methods:{
            changetab(tab){
                this.$router.push({name: 'dashboard-zkhotel', params: {status: tab.name}});
                this.loadtable;
            },
            changepage(page){
                this.pager.page = page;
                this.loadtable();
			},
            loadtable(){
                let vm = this;
                ajax.post('/api/zk-hotel/query',vm.pager).then(
                    data => {
                  		vm.currentdata=data.list;
                  		vm.total=data.count;
                })
            },
			verifyconfirm(spid){
                this.sid=spid._id;
                this.showdialog1=true;
			},
			verifyaction(){

			},
            searchhotel(){

			}
		},
        mounted(){
            if (this.$route.params.status) {
                this.loadtable();
            }

        },
    	beforeRouteEnter (to, from, next) {
        if (!to.params.status) {
            next({name: 'dashboard-zkhotel', params: {status: 'throughing'}});
        } else {
            next();
        }
    }
	}
</script>