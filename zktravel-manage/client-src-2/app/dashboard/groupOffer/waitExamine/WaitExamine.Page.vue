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
                            v-if="true"
                    >
                        <template scope="scope">
                            <el-tag v-if="scope.row._class=='danger'" color="#FF4949">8小时完成</el-tag>
                            <el-tag v-if="scope.row._class=='warming'" color="#F7BA2A">24小时完成</el-tag>
                            <el-tag v-if="scope.row._class=='primary'" color="#1D8CE0">48小时完成</el-tag>
                            <el-tag v-if="scope.row._class=='success'" type="success">48小时以上</el-tag>
                            <el-tag v-if="scope.row._class=='overdead'" color="#324057">已超时</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="orderId"
                            label="订单号"
                            width="180">
                    </el-table-column>
                    <el-table-column

                            prop="userName"
                            label="用户名">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="priority"
                            label="状态"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="金额"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="创建人">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="startDate"
                            label="完成时间"
                            width="180">
                    </el-table-column>

                </el-table>

                <el-row type="flex">
                    <el-col :span="1"></el-col>
                    <el-col :span="15">
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
                    this.currentData=json.list;
                    this.currentData.forEach(v=>{
                        let hour=Math.floor((new Date(v.startDate)-new Date())/3600000);
                        if(hour<=8){
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