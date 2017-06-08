<style lang="scss" scoped>
    .group-order{

    }
</style>
<template>
    <div class="group-order">
        <el-tabs v-model="$route.params.status" type="border-card" @tab-click="changeTab">
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
            <span class="goTime">出发时间:&nbsp&nbsp</span>
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
                            prop="orderTime"
                            label="预订时间"
                            width="180">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    import ajax from '@local/common/ajax';
    export default{
        data(){
            return{
                activeName:'effective',
                pager:{
                    page:0,
                    limit:15,
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
                    {order:11,name:11,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},
                    {order:12,name:12,publishTime:1,state:1,amount:1,creater:1,quoter:1,orderTime:1},



                ]
            }
        },
        computed:{

        },
        methods:{
            loadTable(){
                ajax.post("/api/offline-order/query",{status:1,page:1,pageSize:10}).then(json=>{
                    console.log(json);
                })
            },
            changeTab(tab){
                this.$router.push({name:"dashboard-group-order",params:{status:tab.name}});
            },
            searchOrder(){

            }
        },
        mounted(){
            this.loadTable();
        },
        beforeRouteEnter (to, from, next) {
            if (!to.params.status) {
                next({name: 'dashboard-zkhotel', params: {status: 'valid'}});
            } else {
                next();
            }
        }
    }
</script>