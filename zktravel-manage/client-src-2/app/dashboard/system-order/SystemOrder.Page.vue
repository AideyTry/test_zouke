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
        <el-tabs v-model="activeName" @tab-click="handleClick">

            <el-tab-pane label="有效订单" name="first">有效订单</el-tab-pane>
            <el-tab-pane label="无效订单" name="second">配置管理</el-tab-pane>

        </el-tabs>
        <el-row type="flex" class="search-group">
            <el-col :span="6">
                <el-input
                        placeholder="搜索用户名/订单号/订房员/创建人"
                        icon="search"
                        v-model="input2"
                        :on-icon-click="handleIconClick">
                </el-input>
            </el-col>
            <el-col :span="3">

            </el-col>
            <span>订单状态&nbsp&nbsp</span>
            <el-col :span="3">

                <el-select v-model="value" placeholder="全部">
                    <el-option
                            v-for="item in orderStatus"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>

    </div>
</template>
<script>
export default{
    date(){
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