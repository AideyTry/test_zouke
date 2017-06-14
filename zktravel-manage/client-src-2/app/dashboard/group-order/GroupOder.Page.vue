<style lang="scss" scoped>


        .search-group{
            margin:5px 0 20px 0;
            .goTime{
                height:36px;
                line-height:36px;
                text-align:center;
                font-size:inherit;
            }
        }
        .pointer{
            cursor:pointer;
        }
        .pagination {
            background-color: #fff;
            text-align: right;
            padding-right: 36px;
            height: 50px;
            padding-top: 10px;
            position: fixed;
            right: 0px;
            width: 87.5%;
            bottom: -19px;
            z-index: 3;
        }

</style>
<template>
    <div class="group-order">
        <el-tabs v-model="$route.params.order"  @tab-click="changeTab">
            <el-tab-pane label="有效订单" name="effective"></el-tab-pane>
            <el-tab-pane label="无效订单" name="nonEffective"></el-tab-pane>
        </el-tabs>
        <el-row type="flex" class="search-group">
            <span>&nbsp&nbsp&nbsp&nbsp</span>
            <el-col :span="6">
                <el-input
                        placeholder="搜索用户名/订单号/订房员/创建人"
                        icon="search"

                        :on-icon-click="searchOrder">
                </el-input>
            </el-col>
            <el-col :span="3">
            </el-col>
            <span class="goTime">订单状态:&nbsp&nbsp</span>
            <el-col :span="3">

                <el-select v-model="value1" placeholder="全部">
                    <el-option
                            v-for="item in orderStates"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="24">
                <el-table
                        :data="currentData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="orderId"
                            label="订单号"
                            >
                        <template scope="scope">
                            <a class="pointer" @click="groupOrder(scope.row.orderId)">
                                {{scope.row.orderId}}
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="用户名"
                           >
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="publishTime"
                            label="发布时间">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态"
                            >
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="金额"
                            >
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="创建人">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="报价员"
                          >
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="orderTime"
                            label="预订时间"
                           >
                    </el-table-column>
                </el-table>
                <div style="height:90px">

                </div>
                <el-pagination
                        layout="total, prev, pager, next, jumper"
                        class="pagination"
                        @current-change="changePage"
                        :total="pager.total"
                >

                </el-pagination>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    import ajax from '@local/common/ajax';
    export default{
        data(){
            return{
                page:3,
                activeName:'effective',
                pager:{
                    status:1,
                    pageNum:1,
                    pageSize:15,
                    total:0,
                    keyword:'',
                    valid:true
                },
                value1:'',
                orderStates:[
                    {}
                ],
                currentData:[],
                statusMap:{
                    effective:1,
                    nonEffective:2
                }
            }
        },
        computed:{

        },
        methods:{
            loadTable(){
                ajax.post("/api/team/order/query",{status:this.statusMap[this.$route.params.order],page:this.pager.pageNum,pageSize:this.pager.pageSize}).then(json=>{
                    this.currentData=json.list;
                    this.pager.total=json.count;

                })
            },
            changeTab(tab){
                this.$router.push({name:"dashboard-group-order",params:{order:tab.name}});
                this.loadTable();
            },
            searchOrder(){

            },
            changePage(page){
                this.pager.pageNum=page;
                this.loadTable();
            },
            groupOrder(id){
                this.$router.push({name:'dashboard-order-detail',params:{orderid:id,status:'require-node'}});
            }
        },
        mounted(){
            this.loadTable();
        }
//        beforeRouteEnter (to, from, next) {
//            if (!to.params.status) {
//                next({name: 'dashboard-zkhotel', params: {status: 'valid'}});
//            } else {
//                next();
//            }
//        }
    }
</script>