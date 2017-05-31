<template>
    <div class="hotel-map">
        <el-tabs :active-name="$route.params.provider" @tab-click="changetab">
            <el-tab-pane label="Miki" name="mk">
                <el-table
                        :data="currentdata"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="level"
                            label="匹配等级">
                    </el-table-column>
                    <el-table-column
                            prop="spName"
                            label="SAI名">
                    </el-table-column>
                    <el-table-column
                            prop="zkName"
                            label="miki名">
                    </el-table-column>
                    <el-table-column
                            prop="spAddress"
                            label="SAI地址">
                    </el-table-column>
                    <el-table-column
                            prop="zkAddress"
                            label="miki地址">
                    </el-table-column>
                    <el-table-column
                            prop="spPhone"
                            label="SAI电话">
                    </el-table-column>
                    <el-table-column
                            prop="zkPhone"
                            label="miki电话">
                    </el-table-column>
                    <el-table-column
                            prop="spGPS"
                            label="坐标地址">
                    </el-table-column>
                </el-table>
                <el-pagination  layout="prev,pager,next"  @current-change="currentpage" :total="total" :page-size="15"></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="维途" name="vt">
                <el-table
                        :data="currentdata"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="level"
                            label="匹配等级">
                    </el-table-column>
                    <el-table-column
                            prop="spName"
                            label="SAI名">
                    </el-table-column>
                    <el-table-column
                            prop="zkName"
                            label="miki名">
                    </el-table-column>
                    <el-table-column
                            prop="spAddress"
                            label="SAI地址">
                    </el-table-column>
                    <el-table-column
                            prop="zkAddress"
                            label="miki地址">
                    </el-table-column>
                    <el-table-column
                            prop="spPhone"
                            label="SAI电话">
                    </el-table-column>
                    <el-table-column
                            prop="zkPhone"
                            label="miki电话">
                    </el-table-column>
                    <el-table-column
                            prop="spGPS"
                            label="坐标地址">
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template scope="scope">
                            <el-button size="small" @click="matcher(scope.$index, scope.row)">匹配</el-button>
                            <el-button size="small" type="danger" @click="updatesql(scope.$index, scope.row)">入库</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination  layout="total, prev, pager, next, jumper" @current-change="currentpage" :total="total" :page-size="15"></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="道旅" name="dl">
                <el-table
                        :data="currentdata"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="level"
                            label="匹配等级">
                    </el-table-column>
                    <el-table-column
                            prop="spName"
                            label="SAI名">
                    </el-table-column>
                    <el-table-column
                            prop="zkName"
                            label="miki名">
                    </el-table-column>
                    <el-table-column
                            prop="spAddress"
                            label="SAI地址">
                    </el-table-column>
                    <el-table-column
                            prop="zkAddress"
                            label="miki地址">
                    </el-table-column>
                    <el-table-column
                            prop="spPhone"
                            label="SAI电话">
                    </el-table-column>
                    <el-table-column
                            prop="zkPhone"
                            label="miki电话">
                    </el-table-column>
                    <el-table-column
                            prop="spGPS"
                            label="坐标地址">
                    </el-table-column>
                </el-table>
                <el-pagination  layout="prev,pager,next"  @current-change="currentpage" :total="total" :page-size="15"></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="Booking" name="bk">
                <el-table
                        :data="currentdata"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="level"
                            label="匹配等级">
                    </el-table-column>
                    <el-table-column
                            prop="spName"
                            label="SAI名">
                    </el-table-column>
                    <el-table-column
                            prop="zkName"
                            label="miki名">
                    </el-table-column>
                    <el-table-column
                            prop="spAddress"
                            label="SAI地址">
                    </el-table-column>
                    <el-table-column
                            prop="zkAddress"
                            label="miki地址">
                    </el-table-column>
                    <el-table-column
                            prop="spPhone"
                            label="SAI电话">
                    </el-table-column>
                    <el-table-column
                            prop="zkPhone"
                            label="miki电话">
                    </el-table-column>
                    <el-table-column
                            prop="spGPS"
                            label="坐标地址">
                    </el-table-column>
                </el-table>
                <el-pagination  layout="prev,pager,next"  @current-change="currentpage" :total="total" :page-size="15"></el-pagination>
            </el-tab-pane>
        </el-tabs>
        <el-dialog title="酒店详情" :visible.sync="showdialog">
            <el-row>
                <el-col :span="7">

                </el-col>
                <el-col :span="7">

                </el-col>
                <el-col :span="7">

                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
    .el-pagination{
        text-align: right;
        background: #fff;
        padding-right: 20px;
        height: 50px;
        padding-top: 10px;
    }
</style>

<script>
    import ajax  from '@local/common/ajax'
    export default{
        data(){
            return {
                tableData:[],
                params: {
                    page: 1,
                    limit: 15
                },
                currentpage: 1,
                currentlimit: 15,
                currentdata: [],
                total:100,
                showdialog:false
            }

        },
        methods: {
            getTableData(){

            },
            changetab(tab){
                    this.$router.push({name:'dashboard-hotel-mapping',params:{provider:tab.name}});
                    this.loadtable();
            },
            loadtable(){
                ajax.post('/api/' + this.$route.params.provider + '-mapping/query').then(data => {
                    let vm=this;
                    if (data.code === 0) {
                        data.list.forEach(
                            (v,k)=>{
                              v.spGPS=JSON.stringify(v.spGPS);
                            }
                        )
                        vm.currentdata = data.list;
                        vm.total=data.list.length;
                    }
                })
            },
            currentpage(page){
                this.currentpage = page;
                let arr = [];
                for (let num = (this.currentpage - 1) * this.currentlimit - 1; num < this.currentlimit * this.currentpage - 1; num++) {
                    arr.push(this.tableData[num]);
                }
                this.currentdata = arr;
            },
            matcher(index,row){

            },
            updatesql(index,row){

            }
        },
        computed: {

        },
        mounted(){
            if (this.$route.params.provider) {
                this.loadtable();
            }

        },
        beforeRouteEnter (to, from, next) {
            if (!to.params.provider) {
                next({name: 'dashboard-hotel-mapping', params: {provider: 'vt'}});
            } else {
                next();
            }
        }
    }
</script>