<style lang="scss" scoped>
    span{
        display:block;
        height:36px;
        line-height:36px;
        text-align:center;
        font-size:inherit;
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
    }
    .el-group{
        padding-left: 20px;
        line-height: 36px;
        .el-tag{
            margin: 0 5px;
        }
    }
    /*order start */
    .orderContent{
        .city{
            .el-row{
                padding:2px 0;
            }
            .red{
                color:#f00;
            }
            .delete{
                color:#f00;

            }
            .delete:hover{
                cusor:pointer;
            }
        }
    }
    /*order end*/
</style>

<template>
    <div>
        <el-tabs v-model="$route.params.order" @tab-click="changeTab">

            <el-tab-pane label="有效订单" name="effective"></el-tab-pane>
            <el-tab-pane label="无效订单" name="nonEffective">
                <div>
                    <div class="orderContent">
                        <div class="orderHotel">
                            <el-row type="flex">
                                <el-col :span="4">
                                    <h4>订单信息</h4>
                                </el-col>
                            </el-row>
                            <el-tabs type="border-card">
                                <template>
                                    <el-tab-pane>
                                        <div class="city">
                                            <el-row type="flex">
                                                <el-col :span="2">
                                                    <strong>入住/离店:</strong>
                                                </el-col>
                                                <el-col :span="9">
                                                    <span></span>
                                                    <span>晚</span>
                                                </el-col>
                                            </el-row>
                                            <el-row type="flex">
                                                <el-col :span="2"><strong>酒店<i class="red">*</i></strong></el-col>
                                                <el-col :span="8">
                                                    <el-autocomplete
                                                            size="small"
                                                            placeholder="请输入关键字选择"
                                                    >

                                                    </el-autocomplete>
                                                </el-col>
                                                <el-col :span="3">
                                                    <span>B评分:</span>
                                                    <span>{{}}</span>
                                                    <span class="delete">删除</span>
                                                </el-col>
                                            </el-row>
                                            <el-row type="flex">
                                                <el-col :span="2">
                                                    <strong>备注确认号:</strong>
                                                </el-col>
                                                <el-col :span="10">
                                                    <el-input placeholder="确认用户备注后，填写相应的编号，用';'隔开">

                                                    </el-input>
                                                </el-col>
                                            </el-row>
                                            <el-row type="flex">
                                                <el-col :span="24"></el-col>
                                            </el-row>
                                            <el-row type="flex">
                                                <el-col :span="1">
                                                    
                                                </el-col>
                                                <el-col :span="2">

                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-tab-pane>
                                </template>
                            </el-tabs>
                        </div>
                    </div>
                </div>
            </el-tab-pane>

        </el-tabs>
        <el-row type="flex" class="search-group">
            <el-col :span="6">
                <el-input
                        placeholder="搜索用户名/订单号/订房员/创建人"
                        icon="search"

                        :on-icon-click="searchOrder">
                </el-input>
            </el-col>
            <el-col :span="3">

            </el-col>
            <span>订单状态:&nbsp&nbsp</span>
            <el-col :span="3">

                <el-select v-model="value9" placeholder="全部">
                    <el-option
                            v-for="item in orderStatus"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
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
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="用户名"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="startDate"
                            label="下单时间">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="入住确认号">
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
            pager:{
                status:1,
                pageNum:1,
                pageSize:15,
                total:0,
                keyword:'',
                valid:true
            },
            orderStatus:[
                {
                    value:"待支付"
                },
                {
                    value:"支付超时"
                },
                {
                    value:"预订失败"
                },
                {
                    value:"备注待确认"
                },
                {
                    value:"用户主动取消"
                },
                {
                    value:"退款中"
                },
                {
                    value:"已退款"
                },
                {
                    value:"已离店"
                }
            ],
            value9:'',
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
                console.log(json);


            })
        },
        changeTab(tab){
            this.$router.push({name:"dashboard-system-order",params:{order:tab.name}});
            console.log(this.$route.params.order);
            this.loadTable();
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
}
</script>