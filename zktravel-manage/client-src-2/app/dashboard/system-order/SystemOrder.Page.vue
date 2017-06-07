<style lang="scss" scoped>
    span{
        display:block;
        height:36px;
        line-height:36px;
        text-align:center;
        font-size:inherit;
    }
</style>

<template>
    <div>
        <el-tabs v-model="$route.params.status" @tab-click="handleClick">

            <el-tab-pane label="有效订单" name="effective">有效订单</el-tab-pane>
            <el-tab-pane label="无效订单" name="noneffective">配置管理</el-tab-pane>

        </el-tabs>
        <el-row type="flex" class="search-group">
            <el-col :span="6">
                <el-input
                        placeholder="搜索用户名/订单号/订房员/创建人"
                        icon="search"

                        :on-icon-click="handleIconClick">
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
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="orderNum"
                    label="订单号"
                    >
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="用户名"
                    >
            </el-table-column>
            <el-table-column
                    prop="orderTime"
                    label="下单时间">
            </el-table-column>
            <el-table-column
                    prop="orderStatus"
                    label="状态">
            </el-table-column>
            <el-table-column
                    prop="orderConfirm"
                    label="入住确认号">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default{
    data(){
        return{
            activeName: 'second',
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
            tableData:[
                {orderNum:"订单号1",userName:"用户名1",orderTime:"下单时间1",orderStatus:"状态1",orderConfirm:"入住确认号1"},
                {orderNum:"订单号2",userName:"用户名2",orderTime:"下单时间2",orderStatus:"状态2",orderConfirm:"入住确认号2"},
                {orderNum:"订单号3",userName:"用户名3",orderTime:"下单时间3",orderStatus:"状态3",orderConfirm:"入住确认号3"},
                {orderNum:"订单号4",userName:"用户名4",orderTime:"下单时间4",orderStatus:"状态4",orderConfirm:"入住确认号4"},
                {orderNum:"订单号5",userName:"用户名5",orderTime:"下单时间5",orderStatus:"状态5",orderConfirm:"入住确认号5"}
            ]
        }
    },
    methods:{
        handleClick(tab,event){
            console.log(tab,event);

        },
        handleIconClick(ev) {
            console.log(ev);
        }
    }
}
</script>