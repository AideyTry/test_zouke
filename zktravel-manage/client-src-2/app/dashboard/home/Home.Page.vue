<style lang="scss" scoped>
    .supportRow{
        .el-col{
            border:1px solid #ccc;
            padding:3% 0;
            margin:5%;
            background-color: #fff;
        }
    }
</style>
<template>
    <div>
        <el-row v-if="isTrue===false" type="flex" class="supportRow">
            <el-col :span="6">
                    <strong>2</strong>
                    <p>待发布</p>
            </el-col>
            <el-col :span="6">
                    <strong>1</strong>
                    <p>报价待确认</p>
            </el-col>
            <el-col :span="6">
                    <strong>2</strong>
                    <p>待收款</p>
            </el-col>
            <el-col :span="6">
                    <strong>2</strong>
                    <p>分房待确认</p>
            </el-col>
        </el-row>
        <div v-if="isTrue">
            <el-row type="flex" class="supportRow">
                <el-col :span="6">
                    <strong>2</strong>
                    <p>待报价</p>
                </el-col>
                <el-col :span="6">
                    <strong>0</strong>
                    <p>待预订</p>
                </el-col>
                <el-col :span="6">
                    <strong>100</strong>
                    <p>当天完成金额</p>
                </el-col>
                <el-col :span="6">
                    <strong>301</strong>
                    <p>累计完成金额</p>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="1"></el-col>
                <el-col :span="22">
                    <h3>以下供应商订单，距离可免费取消日不到48小时</h3>
                    <el-table
                            :data="currentData"
                            border
                            class="table"
                            style="width: 100%">
                        <el-table-column
                                prop="sp"
                                label="供应商"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="id"
                                label="入住编号"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="orderId"
                                label="订单号">
                        </el-table-column>
                        <el-table-column
                                prop="userName"
                                label="用户名">
                        </el-table-column>
                        <el-table-column
                                prop="cancelDate"
                                label="可免费取消日期">
                        </el-table-column>
                        <el-table-column
                                prop="cancelTime"
                                label="距离可免费取消时间">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                isTrue:true,
                currentData:[]
            }
        },
        computed:{

        },
        methods:{

        }
    }
</script>