<style lang="scss" scoped>
        .distributed{
        }
        .el-row{
            padding: 0 20px;
            height: 56px;
            line-height: 56px;
        }
        .el-pagination {
            background-color: #fff;
            text-align: right;
            padding-right: 36px;
            height: 50px;
            padding-top: 10px;
            width: 87.5%;
            position: fixed;
            bottom: 0px;
            right: 0px;
        }
        .point{
            cursor: pointer;
        }
</style>

<template>
    <div class="distributed">
        <el-row>
            <el-col>
                类别:
                <el-select size="small" v-model="ordertype">
                    <el-option label="有效需求" value="vaild">
                        有效需求
                    </el-option>
                    <el-option label="无效需求" value="invalid">
                        无效需求
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5" type="flex">
                <el-input size="small" placeholder="搜索用户名/订单号/订房员/创建人"></el-input>
            </el-col>
            <el-col :span="19" style="padding-left: 20px">
                <span>出发时间</span>
                <el-select size="small" v-model="startdate">
                    <el-option label="全部时间" value="all"></el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-table
                    :data="currentdata"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="orderId"
                        label="订单号">
                    <template scope="scope">
                        <a class="point" @click="distributed(scope.row.orderId)">
                            {{scope.row.orderId}}
                        </a>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="用户名">
                </el-table-column>
                <el-table-column
                        prop="priority"
                        label="优先级">
                </el-table-column>
                <el-table-column
                        prop="startDate"
                        label="出发日期">
                </el-table-column>
                <el-table-column
                        label="状态">
                    <template scope="scope">
                        <span>待审核</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="creator"
                        label="报价员">
                </el-table-column>
                <el-table-column
                        prop="money"
                        label="订单金额">
                </el-table-column>
                <el-table-column
                        prop="publishTime"
                        label="发布日期">
                </el-table-column>
            </el-table>
        <el-pagination layout="total, prev, pager, next, jumper" @current-change="changepage" :total="total"
                       :page-size="currentlimit"></el-pagination>
    </div>
</template>

<script>
    import ajax from '@local/common/ajax'
    export default{
        data(){
            return{
                ordertype:null,
                startdate:null,
                currentdata:[],
                tabledata:[],
                currentpage: 1,
                currentlimit: 15,
                total:100
            }
        },
        methods:{
            loadtable(){
                let vm=this;
                ajax.post('/api/team/order/query',{status:2,page:vm.currentpage-1,pageSize:vm.currentlimit}).then(
                    data=>{
                        vm.currentdata =  data.list;
                        vm.total = data.count;
                    }
                )
            },
            changepage(page){
                this.currentpage = page;
                this.loadtable();
            },
            distributed(id){
                this.$router.push({name:'dashboard-order-detail',params:{orderid:id,status:'require-node'}});
            }
        },
        mounted(){
            this.loadtable();
        }

    }
</script>