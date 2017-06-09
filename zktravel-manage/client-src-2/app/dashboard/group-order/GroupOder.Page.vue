<style lang="scss" scoped>
    .group-order{
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
    }

</style>
<template>
    <div class="group-order">
        <el-tabs v-model="$route.params.status"  @tab-click="changeTab">
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
                            prop="order"
                            label="订单号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="用户名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="publishTime"
                            label="发布时间">
                    </el-table-column>
                    <el-table-column
                            prop="state"
                            label="状态"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="amount"
                            label="金额"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="creater"
                            label="创建人">
                    </el-table-column>
                    <el-table-column
                            prop="quoter"
                            label="报价员"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="orderTime"
                            label="预订时间"
                            width="180">
                    </el-table-column>
                </el-table>
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
                tableData:[
                    {order:1,name:1,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:2,name:2,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:3,name:3,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:4,name:4,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:5,name:5,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:6,name:6,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:7,name:7,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:8,name:8,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:9,name:9,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:10,name:10,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:11,name:5,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:12,name:6,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:13,name:7,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:14,name:8,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:15,name:9,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1}
                ],
                tableData1:[
                    {order:11,name:11,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:12,name:12,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1}
                ],
                tableData2:[
                    {order:1,name:1,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:2,name:2,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:3,name:3,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:4,name:4,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:5,name:5,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:6,name:6,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1}
                ]
            }
        },
        computed:{

        },
        methods:{
            loadTable(){
                ajax.post("/api/team/order/query",{status:this.pager.status,page:this.pager.pageNum,pageSize:this.pager.pageSize}).then(json=>{
                    console.log(json);

                    if(this.pager.status===1){
                        this.pager.total=12;
                        if(this.pager.pageNum===1){
                            this.currentData=this.tableData;
                        }else if(this.pager.pageNum===2){
                            this.currentData=this.tableData1;
                        }

                    }else if(this.pager.status===2){
                        this.pager.total=7;
                        this.currentData=this.tableData2;
                    }

                })
            },
            changeTab(tab){
                this.$router.push({name:"dashboard-group-order",params:{status:tab.name}});
                if(tab.name=="effective"){
                    this.pager.status=1;
                    this.loadTable();
                }else if(tab.name=="nonEffective"){
                    this.pager.status=2;
                    this.loadTable();
                }

            },
            searchOrder(){

            },
            changePage(page){
                this.pager.pageNum=page;
                this.loadTable();
            }
        },
        created(){
            if(this.$route.path=="/dashboard/group-order/effective"){
                this.pager.status=1;
            }else if(this.$route.path=="/dashboard/group-order/nonEffective"){
                this.pager.status=2;
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