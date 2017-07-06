<style lang="scss" scoped>
    .wait-offer{
        .pointer{
            cursor:pointer;
        }
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
            font-size: 10px;
            .eight{
                background-color: #FF6666;
                padding:0px 36px;
            }
            .twelve{
                background-color: #FF9900;
                color:green;
                padding:0px 36px;
            }
            .twenty-four{
                background-color: #FFFF00;
                padding:0px 36px;
            }
            .time-out{
                background-color: #9900cc;
                padding:0px 36px;
            }
        }
    }

</style>
<template>
    <div class="wait-offer">
        <el-tabs v-model="$route.name"  @tab-click="changeTab">
            <el-tab-pane label="待审核" name="dashboard-wait-examine"></el-tab-pane>
        </el-tabs>
        <el-row type="flex" class="search-group" v-if="conceal">
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
                            v-if="isShow">
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
                            <a class="pointer" @click="cellClick(scope.row.orderId)">
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
                    v-if="isShow"
                    type="flex"
                    class="row-bg">
                        <el-col :span="2">
                            报价紧急度
                        </el-col>
                        <el-col :span="1" class="eight"></el-col>
                        <el-col :span="2">
                            8小时完成
                        </el-col>
                        <el-col :span="1" class="twelve"></el-col>
                        <el-col :span="2">
                            24小时完成
                        </el-col>
                        <el-col :span="1" class="twenty-four"></el-col>
                        <el-col :span="2">
                            48小时完成
                        </el-col>
                        <el-col :span="1" class="time-out"></el-col>
                        <el-col :span="2">
                            已超时
                        </el-col>
                        <el-col :span="10"></el-col>
                </el-row>
                <div style="height:50px">

                </div>
                <el-pagination
                        layout="total, prev, pager, next, jumper"
                        class="pagination"
                        :page-size="pager.pageSize"
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
                isShow:false,
                status:'',
                conceal:false,
                page:3,
                activeName:'wp',
                pager:{
                    status:4,
                    pageNum:0,
                    pageSize:15,
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
                    status:this.status,
                    this.currentData=json.list;
                    this.pager.total=json.count;
                    for(let obj of this.currentData){
                    if(obj.status===1){
                        obj.status="待发布";
                        obj.newStatus='待发布'
                    }else if(obj.status===2){
                        obj.status="待分配"
                        obj.newStatus='待分配'
                    }else if(obj.status===3){
                        this.isShow=true
                        obj.status="待报价"
                        obj.newStatus='待报价'
                    }else if(obj.status===4){
                        obj.status="待审核"
                        obj.newStatus='待审核'
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
                this.pager.pageNum=page-1;
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