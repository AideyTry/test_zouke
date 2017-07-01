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
        .hidden{
            display:none;
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
                            :class="isTrue?'abc':'hidden'"
                            v-if="this.status<=3">
                        <template scope="scope">
                            <el-tag v-if="scope.row._class=='eight'" color="#FF6666">8小时内完成</el-tag>
                            <el-tag v-else-if="scope.row._class=='twelve'" color="#FF9900">24小时内完成</el-tag>
                            <el-tag v-else-if="scope.row._class=='twenty-four'" color="#FFFF00">48小时内完成</el-tag>
                            <el-tag v-else-if="scope.row._class=='time-out'" color="#9900cc">已超时</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="订单号">
                        <template scope="scope">
                            <a class="pointer" @click="cellClick(scope.row.orderId,status)">
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
                            prop="newStatus"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            prop="creator.name"
                            label="创建人">
                    </el-table-column>
                    <el-table-column
                            v-if="isTrue"
                            prop="finishTime"
                            label="完成时间">
                    </el-table-column>
                    <el-table-column
                            v-if="pIsTrue"
                            prop="publishTime"
                            label="发布时间">
                    </el-table-column>
                </el-table>
               <el-row 
                    v-show="this.tableData.length!=0"
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
                status:'',
                isTrue:true,
                pIsTrue:false,
                page:3,
                activeName:'wp',
                pager:{
                    status:3,
                    pageNum:0,
                    pageSize:15,
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
                    status:this.status,
                    page:this.pager.pageNum,
                    pageSize:this.pager.pageSize}).then(
                    data=>{
                        console.log(data);
                        this.tableData=data.list;
                        this.pager.total=data.count;
                        for(let obj of this.tableData){
                            if(obj.status===3){
                                this.isTrue=true;
                                this.pIsTrue=false;
                                obj.newStatus='待报价'
//                                obj.status="待报价"
                            }
                            if(obj.status===4){
                                this.isTrue=true;
                                this.pIsTrue=false;
                                obj.newStatus='待审核'
//                                obj.status="待报价"
                            }
                            if(obj.status===8){
                                this.isTrue=false;
                                this.pIsTrue=true;
//                                obj.status="待控房"
                                obj.newStatus='待控房'
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
//
//                        if (this.$route.path == "/dashboard/wait-offer/wp") {
//
//                             this.isTrue=true;
//
//                        }
//                        if (this.$route.path == "/dashboard/wait-offer/wv") {
//                            this.isTrue=false;
//                        }
                    }
                )
            },
            updateTab(){
                if (this.$route.path == "/dashboard/wait-offer/wp") {
                    this.status = 3;
//                    this.isTrue=true;
                } else if (this.$route.path == "/dashboard/wait-offer/we") {
                    this.status = 4;
                } else if (this.$route.path == "/dashboard/wait-offer/wv") {
                    this.status =8;
//                    this.isTrue=false;
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
                this.pager.pageNum=page-1;
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