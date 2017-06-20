<style lang="scss" scoped>
    .income {
        .title {
            height: 40px;
            font-size: 18px;
            font-weight: 600;
        }
        .install {
            .label {

            }
            .el-row {
                height: 41px;
            }
            .el-input {
                display: inline-block;
                width: 80px;
            }
        }
        .card {
            margin: 20px 0;
        }
        .card::after {
            border: 1px solid #ccc;
        }
        .computed {
            height: 40px;
            line-height: 40px;
        }
        .divline{
            border-bottom: 1px dashed #ccc;
            margin: 0 20px;
        }
    }
</style>
<style>
    .radio {
        margin-top: 0;
        margin-bottom: 0;
    }
</style>
<template>
    <div class="income">
        <div class="install card">
            <div class="title">收款设置</div>
            <el-row>
                <el-col :span="10">
                    <span>收款汇率<i></i></span>
                    <span>1€=</span>
                    <el-input size="mini"></el-input>
                    <span>¥</span>
                    <span>实时汇率：1€=4546¥</span>
                </el-col>
                <el-col :span="14">
                    <span>收款币种</span>
                    <el-radio class="radio" v-model="radio" size="small" label="1">欧元</el-radio>
                    <el-radio class="radio" v-model="radio" size="small" label="2">人民币</el-radio>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="10">
                    <span>
                        本次收款
                    </span>
                    <el-input size="mini"></el-input>
                    <span>€ =11¥</span>
                </el-col>
                <el-col>

                </el-col>
                <el-col :span="4">
                    <el-button type="info">生成收款码</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="divline"></div>
        <div class="stream card">
            <div class="title">收款流水</div>
            <div>
                <el-table border>
                    <el-table-column label="时间">
                    </el-table-column>
                    <el-table-column label="操作人">
                    </el-table-column>
                    <el-table-column label="渠道">
                    </el-table-column>
                    <el-table-column label="收款金额">
                    </el-table-column>
                    <el-table-column label="收款金额">
                    </el-table-column>
                </el-table>
            </div>
            <el-row type="flex" class="computed">
                <el-col>
                </el-col>
                <el-col :span="9">
                    <span>还需收款 ：90€</span>
                    <span>收款总额 ：70€</span>
                    <span>999¥</span>
                </el-col>
            </el-row>
        </div>
        <div class="divline"></div>
        <div class="plan card">
            <div class="title">收款计划</div>
            <el-row type="flex" class="computed">
                <template>
                    <el-col :span="6">
                        101€
                    </el-col>
                </template>
            </el-row>
        </div>
        <div class="divline"></div>
        <div class="card">
            <div class="title">退款流水</div>
            <div>
                <el-table border>
                    <el-table-column label="时间">
                    </el-table-column>
                    <el-table-column label="原因">
                    </el-table-column>
                    <el-table-column label="操作人">
                    </el-table-column>
                    <el-table-column label="渠道">
                    </el-table-column>
                    <el-table-column label="退款金额">
                    </el-table-column>
                    <el-table-column label="退款金额">
                    </el-table-column>
                </el-table>
            </div>
            <el-row type="flex" class="computed">
                <el-col>
                </el-col>
                <el-col :span="9">
                    <span>还需收款 ：90€</span>
                    <span>收款总额 ：70€</span>
                    <span>999¥</span>
                </el-col>
            </el-row>
        </div>
        <div class="divline"></div>
        <div class="card">
            <div class="title">供应商成本流水</div>
            <div>
                <el-table border>
                    <el-table-column label="时间">
                    </el-table-column>
                    <el-table-column label="原因">
                    </el-table-column>
                    <el-table-column label="操作人">
                    </el-table-column>
                    <el-table-column label="金额">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
    import ajax  from '@local/common/ajax';
    export default{
        data(){
            return {
                radio: '',
                order:null,
                payplan:null
            }
        },
        methods: {
            loadorder(){
                ajax.post('/api/team/order/detail',{id:this.$route.params.orderid}).then(
                    data=>{
                        this.order=data.detail;
                    }
                )
            }
        },
        mouted(){
            this.loadorder();
        }
    }
</script>