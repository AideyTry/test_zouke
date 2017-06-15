<style lang="scss" scoped>
    .wait-offer{
        .tableOne{
            display:block;
            height:100%;
            width:100%;
            background-color: #f00;
            color:#f00;
        }
        .el-pagination{
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
            margin: 0;
        }
        .search-group{
            padding-left: 20px;
            margin:0px 0 15px 0;
            .goTime{
                height:36px;
                line-height:36px;
                text-align:center;
                font-size:inherit;
            }
        }
        .el-group{
            padding-left: 20px;
            line-height: 36px;
            .el-tag{
                margin: 0 5px;
            }
        }
        .div{
            width:100%;
            height:20px;
        }
        .warning{
            color: #fff;
            background: #F7BA2A;
        }
        .danger{
            color: #fff;
            background: #FF4949;
        }
        .primary{
            color: #fff;
            background: #1D8CE0;
        }
        .overdead{
            color: #fff;
            background: #324057;
        }
    }

</style>
<template>
    <div class="wait-offer">
        <el-tabs :active-name="$route.params.offer"  @tab-click="changeTab">
            <el-tab-pane label="待报价" name="wp"></el-tab-pane>
            <el-tab-pane label="待审核" name="we"></el-tab-pane>
            <el-tab-pane label="待控房" name="wv"></el-tab-pane>
        </el-tabs>
        <el-row type="flex" class="search-group">
            <el-col :span="6">
                <el-input
                        placeholder="搜索用户名/订单号/订房员/创建人"
                        icon="search"
                        :on-icon-click="searchOrder">
                </el-input>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="24">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            label="紧急度"
                            v-if="true">
                        <template scope="scope">
                            <el-tag v-if="scope.row._class=='danger'" color="#FF4949">8小时完成</el-tag>
                            <el-tag v-if="scope.row._class=='warming'" color="#F7BA2A">24小时完成</el-tag>
                            <el-tag v-if="scope.row._class=='primary'" color="#1D8CE0">48小时完成</el-tag>
                            <el-tag v-if="scope.row._class=='success'" type="success">48小时以上</el-tag>
                            <el-tag v-if="scope.row._class=='overdead'" color="#324057">已超时</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="订单号">
                        <template scope="scope">
                            <a @click="cellClick(scope.row.orderId)">
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
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="金额">
                    </el-table-column>
                    <el-table-column
                            prop="publish"
                            label="创建人">
                    </el-table-column>
                    <el-table-column
                            prop="startDate"
                            label="完成时间">
                    </el-table-column>
                </el-table>
                <div style="height:90px">

                </div>
                <el-pagination
                        layout="total, prev, pager, next, jumper"
                        class="pagination"
                        @current-change="changePage"
                        :total="pager.total">
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
                    status:3,
                    pageNum:0,
                    pageSize:8,
                    total:0,
                    keyword:'',
                    valid:true
                },
                orderStates:[],
                currentData:null,
                tableData:[],
                statusmap:{
                    wp:3,
                    we:4,
                    wv:5
                },
                isPrimary:'danger'
            }
        },
        computed:{

        },
        methods:{
            loadTable(){
                ajax.post("/api/team/order/query",{
                    status:this.statusmap[this.$route.params.offer],
                    page:this.pager.pageNum,
                    pageSize:this.pager.pageSize}).then(
                    data=>{
                        this.tableData=data.list;
                        this.tableData.forEach(
                            v=>{
                                let hour=Math.floor((new Date(v.startDate)-new Date())/3600000);
                                if(hour<=8&&0<hour){
                                    v._class='danger'
                                }else if(8<hour&&hour<=24){
                                    v._class='warming'
                                }else if(24<hour&&hour<=48){
                                    v._class='primary'
                                }else if(hour<0){
                                    v._class='overdead'
                                }else {
                                    v._class='success'
                                }
                            }
                        )
                    }
                )
            },
            changeTab(tab){
                this.$router.push({name:"dashboard-wait-offer",params:{offer:tab.name}});
                this.loadTable();
            },
            searchOrder(){

            },
            changePage(page){
                this.pager.pageNum=page;
                this.loadTable();
            },
            cellClick(orderId){
                this.$router.push({name:"dashboard-order-detail",params:{orderid:orderId,status:'offer-node'}});
            }
        },
        mounted(){
            this.loadTable();
        }
    }
</script>