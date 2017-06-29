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
        .row-bg{
            padding:15px 0;
            background-color: #fff;
            width:70%;
            margin-top: 20px;
            a{  
                padding:10px 40px;
                width:45px;
                display: inline-block;
            }
            .eight{
                background-color: #FF6666;
            }
            .twelve{
                background-color: #FF9900;
            }
            .twenty-four{
                background-color: #FFFF00;
            }
            .time-out{
                background-color: #9900cc;
            }
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
                            <el-tag style="width:100%;height:35px;" v-if="scope.row._class=='eight'" color="#FF6666"></el-tag>
                            <el-tag style="width:100%;height:35px;" v-if="scope.row._class=='twelve'" color="#FF9900"></el-tag>
                            <el-tag style="width:100%;height:35px;" v-if="scope.row._class=='twenty-four'" color="#FFFF00"></el-tag>
                            <el-tag style="width:100%;height:35px;" v-if="scope.row._class=='time-out'" color="#9900cc"></el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="订单号">
                        <template scope="scope">
                            <a @click="cellClick(scope.row.orderId,status)">
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
                            prop="startDate"
                            label="完成时间">
                    </el-table-column>
                </el-table>
               <el-row 
                    type="flex"
                    class="row-bg"
                    justify="space-between"
                    align="center">
                        <el-col :span="4">
                            报价紧急度
                        </el-col>
                        <el-col :span="4">
                            <a class="eight"></a>8小时完成
                        </el-col>
                        <el-col :span="4">
                            <a class="twelve"></a>12小时完成
                        </el-col>
                        <el-col :span="4">
                            <a class="twenty-four"></a>24小时完成
                        </el-col>
                        <el-col :span="4">
                            <a class="time-out"></a>已超时
                        </el-col>
                </el-row>
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
                status:null,
                isPrimary:'danger'
            }
        },
        computed:{

        },
        methods:{
            loadTable(){
                ajax.post("/api/team/order/query",{
//                    status:this.statusmap[this.$route.params.offer],
                    status:this.status,
                    page:this.pager.pageNum,
                    pageSize:this.pager.pageSize}).then(
                    data=>{
                        console.log(data);
                        this.tableData=data.list;
                        for(let obj of this.tableData){
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
                        this.tableData.forEach(
                            v=>{
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
                            }
                        )
                    }
                )
            },
            updateTab(){
                if (this.$route.path == "/dashboard/wait-offer/wp") {
                    this.status = 3;
                } else if (this.$route.path == "/dashboard/wait-offer/we") {
                    this.status = 4;
                } else if (this.$route.path == "/dashboard/wait-offer/wv") {
                    this.status =8;
                }
            },
            changeTab(tab){
                this.$router.push({name:"dashboard-wait-offer",params:{offer:tab.name}});

                switch(this.$route.path){
                    case "/dashboard/wait-offer/wp":
                        this.status = 3;
                        this.loadTable();
                        break;
                    case "/dashboard/wait-offer/we":
                        this.status = 4;
                        this.loadTable();
                        break;
                    case "/dashboard/wait-offer/wv":
                        this.status = 8;
                        this.loadTable();
                        break;
                }
            },
            searchOrder(){

            },
            changePage(page){
                this.pager.pageNum=page;
                this.loadTable();
            },
            cellClick(orderId,status){
                switch(status){
                    case 8:this.$router.push({name:"dashboard-order-detail",params:{orderid:orderId,status:'order-detail'}});
                        break;
                    default:this.$router.push({name:"dashboard-order-detail",params:{orderid:orderId,status:'offer-node'}});
                        break;
                }

            }
        },
        mounted(){
            this.loadTable();
        },
        created(){
            this.updateTab();
        },
        beforeUpdate(){
            this.updateTab();
        }

    }
</script>