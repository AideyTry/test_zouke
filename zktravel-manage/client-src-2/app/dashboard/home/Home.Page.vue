<style lang="scss" scoped>
    .supportRow{
        .el-col{
            border:1px solid #ccc;
            padding:6% 3%;
            margin:4%;
            background-color: #fff;
            position:relative;
            box-sizing:border-box;
            span{
                transform:translate(-50%,-50%);
                position:absolute;
                top:50%;
                left:50%;
                display:table-cell;
                text-align:center;
                vertical-align:middle;
                strong{
                    display:inline-block;
                    vertical-align:middle;
                }
            }
        }
    }
</style>
<template>
    <div>
        <el-row v-if="isTrue===false" type="flex" class="supportRow">
            <el-col :span="6">
                <span>
                    <strong>2</strong>
                    <p>待发布</p>
                </span>
            </el-col>
            <el-col :span="6">
                <span>
                    <strong>1</strong>
                    <p>报价待确认</p>
                </span>
            </el-col>
            <el-col :span="6">
                <span>
                    <strong>2</strong>
                    <p>待收款</p>
                </span>
            </el-col>
            <el-col :span="6">
                <span>
                    <strong>2</strong>
                    <p>分房待确认</p>
                </span>
            </el-col>
        </el-row>
        <div v-if="isTrue">
            <el-row type="flex" class="supportRow">
                <el-col :span="6">
                    <span>
                        <strong>2</strong>
                         <p>待报价</p>
                    </span>

                </el-col>
                <el-col :span="6">
                    <span>
                        <strong>0</strong>
                        <p>待预订</p>
                    </span>
                </el-col>
                <el-col :span="6">
                    <span>
                        <strong>100</strong>
                        <p>当天完成金额</p>
                    </span>
                </el-col>
                <el-col :span="6">
                    <span>
                        <strong>301</strong>
                        <p>累计完成金额</p>
                    </span>
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
    import ajax from '@local/common/ajax'
    export default{
        data(){
            return {
                isTrue:false,
                currentData:[],
                tableData:[
                    {sp:1,id:1,orderId:1,userName:1,cancelDate:1,cancelTime:"1"},
                    {sp:2,id:2,orderId:2,userName:1,cancelDate:1,cancelTime:1},
                    {sp:3,id:3,orderId:3,userName:1,cancelDate:1,cancelTime:1},
                    {sp:4,id:4,orderId:4,userName:1,cancelDate:1,cancelTime:1},
                    {sp:5,id:5,orderId:5,userName:1,cancelDate:1,cancelTime:1},
                    {sp:6,id:6,orderId:6,userName:1,cancelDate:1,cancelTime:1},
                    {sp:7,id:7,orderId:7,userName:1,cancelDate:1,cancelTime:1},
                    {sp:8,id:8,orderId:8,userName:1,cancelDate:1,cancelTime:1},
                    {sp:9,id:9,orderId:9,userName:1,cancelDate:1,cancelTime:1}
                ]
            }
        },
        computed:{
            userInfo(){
                return this.$store.getters.userInfo;
            }
        },
        methods:{
            loadTable(){
                this.currentData=this.tableData;
            },
            judgeAuth(){
                if(this.userInfo.name=="戴林波"){
                    this.isTrue=true;
                }else {
                    this.isTrue=false;
                }
            }
        },
        mounted(){
            this.loadTable();
            this.judgeAuth();
        }
    }
</script>