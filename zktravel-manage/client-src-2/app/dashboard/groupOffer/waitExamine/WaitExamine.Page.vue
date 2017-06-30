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
            width:100%;
            height:20px;
        }
        .row-bg{
            padding:15px 0;
            background-color: #fff;
            margin-top: 20px;
            .eight{
                background-color: #FF6666;
                padding:10px 40px;
                display: inline-block;
            }
            .twelve{
                background-color: #FF9900;
                color:green;
                padding:10px 40px;
                display: inline-block;
            }
            .twenty-four{
                background-color: #FFFF00;
                padding:10px 40px;
                display: inline-block;
            }
            .time-out{
                background-color: #9900cc;
                padding:10px 40px;
                display: inline-block;
            }
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
                            label="紧急度"
                            v-if="true">
                        <template scope="scope">
                            <el-tag v-if="scope.row._class=='eight'" color="#FF6666">8小时内完成</el-tag>
                            <el-tag v-if="scope.row._class=='twelve'" color="#FF9900">24小时内完成</el-tag>
                            <el-tag v-if="scope.row._class=='twenty-four'" color="#FFFF00">48小时内完成</el-tag>
                            <el-tag v-if="scope.row._class=='time-out'" color="#9900cc">已超时</el-tag>
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
                            label="优先级">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            prop="creator.name"
                            label="创建人">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="finishTime"
                            label="完成时间">
                    </el-table-column>

                </el-table>
                
                <el-row 
                    v-show="this.currentData.length!=0"
                    type="flex"
                    class="row-bg"
                    align="center">
                        <el-col :span="2">
                            报价紧急度
                        </el-col>
                        <el-col :span="1" class="eight"></el-col>
                        <el-col :span="2">
                            8小时完成
                        </el-col>
                        <el-col :span="1" class="twelve"></el-col>
                        <el-col :span="2">
                            12小时完成
                        </el-col>
                        <el-col :span="1" class="twenty-four"></el-col>
                        <el-col :span="2">
                            24小时完成
                        </el-col>
                        <el-col :span="1" class="time-out"></el-col>
                        <el-col :span="2">
                            已超时
                        </el-col>
                        <el-col :span="10"></el-col>
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
                    pageNum:0,
                    pageSize:8,
                    total:0,
                    keyword:'',
                    valid:true
                },
                value1:'',
                orderStates:[
                    {}
                ],
                currentData:[]

            }
        },
        computed:{

        },
        methods:{
            loadTable(){
                ajax.post("/api/team/order/query",{status:this.pager.status,page:this.pager.pageNum,pageSize:this.pager.pageSize}).then(json=>{
                    console.log(json);
                    this.currentData=json.list;
                    for(let obj of this.currentData){
                    if(obj.status===1){
                        obj.status="待发布";
                    }else if(obj.status===2){
                        obj.status="待分配"
                    }else if(obj.status===3){
                        obj.status="待报价"
                    }else if(obj.status===4){
                        obj.status="待审核"
                    }else if(obj.status===5){
                        obj.status="待报价确认"
                    }else if(obj.status===6){
                        obj.status="待收款"
                    }else if(obj.status===7){
                        obj.status="分房待确认"
                    }else if(obj.status===8){
                        obj.status="待控房"
                    }else if(obj.status===9){
                        obj.status="已控房"
                    }
                }
                    this.currentData.forEach(v=>{
                        let hour=Math.floor((new Date(v.startDate)-new Date())/3600000);
                        if(hour<=8&&0<hour){
                            v._class='eight'
                        }else if(8<hour&&hour<=24){
                            v._class='twelve'
                        }else if(24<hour&&hour<=48){
                            v._class='twenty-four'
                        }else if(hour<0){
                            v._class='time-out'
                        }
                    });
                })
            },
            changeTab(tab){

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