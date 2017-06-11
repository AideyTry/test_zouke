<style lang="scss" scoped>
    .wait-offer{
        .tableOne{
            display:block;
            height:100%;
            width:100%;
            background-color: #f00;
            color:#f00;
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
            bottom: 0px;
            z-index: 3;
        }
        .search-group{
            margin:5px 0 20px 0;
            .goTime{
                height:36px;
                line-height:36px;
                text-align:center;
                font-size:inherit;
            }
        }
        .div{
            width:100000px;
            height:20px;
        }
        .bgc1{
            display:block;
            background-color: deeppink;
            color:deeppink;
        }
        .bgc2{
            display:block;
            background-color: orange;
            color:orange;
        }
        .bgc3{
            display:block;
            background-color: yellow;
            color:yellow;
        }
        .bgc4{
            display:block;
            background-color: purple;
            color:purple;
        }
    }

</style>
<template>
    <div class="wait-offer">
        <el-tabs v-model="$route.name"  @tab-click="changeTab">
            <el-tab-pane label="待审核" name="dashboard-wait-examine"></el-tab-pane>
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
        </el-row>
        <p class="div">

        </p>
        <el-row type="flex">
            <el-col :span="24">
                <el-table
                        :data="currentData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="order"
                            label="紧急度"
                            v-if="true"

                    >
                        <template scope="scope">
                            <span v-bind:class="[{bgc1:scope.row.order===1},{bgc2:scope.row.order===2},{bgc3:scope.row.order===3},{bgc4:scope.row.order===4}]">
                                {{scope.row.order}}
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="name"
                            label="订单号"
                            width="180">
                    </el-table-column>
                    <el-table-column

                            prop="name"
                            label="用户名">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="优先级"
                            label="状态"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="状态"
                            label="金额"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="creater"
                            label="创建人">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="quoter"
                            label="完成时间"
                            width="180">
                    </el-table-column>

                </el-table>

                <el-row type="flex">
                    <el-col :span="1"></el-col>
                    <el-col :span="15">
                        <el-row type="flex">
                            <el-col :span="3"><span>报价紧急度</span></el-col>
                            <el-col :span="5">
                                <el-row type="flex">
                                    <el-col :span="10" v-bind:class="{bgc1:true}"></el-col>
                                    <span>8小时内完成</span>
                                </el-row>
                            </el-col>
                            <el-col :span="5">
                                <el-row type="flex">
                                    <el-col :span="10" v-bind:class="{bgc2:true}"></el-col>
                                    <span>24小时内完成</span>
                                </el-row>
                            </el-col>
                            <el-col :span="5">
                                <el-row type="flex">
                                    <el-col :span="10" v-bind:class="{bgc3:true}"></el-col>
                                    <span>48小时内完成</span>
                                </el-row>
                            </el-col>
                            <el-col :span="5">
                                <el-row type="flex">
                                    <el-col :span="10" v-bind:class="{bgc4:true}"></el-col>
                                    <span>已超时</span>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
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
                activeName:'wp',
                pager:{
                    status:4,
                    pageNum:1,
                    pageSize:8,
                    total:0,
                    keyword:'',
                    valid:true
                },
                value1:'',
                orderStates:[
                    {}
                ],
                currentData:[],
                tableData:[
                    {order:1,name:1,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:2,name:2,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:3,name:3,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:4,name:4,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:1,name:5,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:1,name:6,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:3,name:7,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:3,name:8,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1}
                ],
                tableData1:[
                    {order:4,name:11,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:2,name:12,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1}
                ],
                tableData2:[
                    {order:3,name:1,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:2,name:2,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:1,name:3,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:4,name:4,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:1,name:5,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:3,name:6,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1}
                ],
                tableData3:[
                    {order:3,name:1,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:2,name:2,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:1,name:3,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1}
                ]
            }
        },
        computed:{

        },
        methods:{
            loadTable(){
                ajax.post("/api/team/order/query",{status:this.pager.status,page:this.pager.pageNum,pageSize:this.pager.pageSize}).then(json=>{
//                    console.log(json);
//                    this.pager.total=3;
//                    this.currentData=this.tableData3;
                    this.currentData=json.list;
                })
            },
            changeTab(tab){

            },
            searchOrder(){

            },
            changePage(page){
                this.pager.pageNum=page;
                this.loadTable();
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