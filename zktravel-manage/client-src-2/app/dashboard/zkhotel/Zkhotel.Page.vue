<style lang="scss" scoped>
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
</style>
<template>
	<div class="zkhotel">
		<el-tabs :active-name="$route.params.status" @tab-click="changetab">
			<el-tab-pane label="已上架-待审核" name="throughing">
				<el-row type="flex">
					<el-col :span="6">
						<el-input
								placeholder="搜索酒店名/ID"
								icon="search"
								:on-icon-click="handleIconClick">
						</el-input>
					</el-col>
					<el-col :span="4">
						<el-select  clearable placeholder="星级">
							<el-option>
								五星级
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="4">
						<el-select  clearable placeholder="国家">
							<el-option>
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
							<el-button size="small" type="info" @click="verifyconfirm(scope.row.sp_id.vt_id)">审核
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
			<photel class="hotel"  v-if="showdialog1" :idp="sid"></photel>
		</el-dialog>
	</div>
</template>
	
<script>
    import ajax  from '@local/common/ajax';
    import Photel from '../hotelMapping/Photel';
    import Shotel from '../hotelMapping/Shotel';
	export default{
        components: {
            photel: Photel,
            shotel: Shotel
        },
		data(){
			return{
				currentdata:[],
				total:1,
				pager:{
					 page:1,
					 pageSize:20
				},
				showdialog1:false,
				pid:'',
				sid:'',
                photelisTrue:false,
                shotelisTrue:false

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
			verifyconfirm(sid){
                this.sid = sid;
                this.showdialog1=true;
			},
			verifyaction(){

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