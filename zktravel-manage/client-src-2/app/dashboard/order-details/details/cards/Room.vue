<style lang="scss" scoped>
    .card{
        line-height: 40px;
        overflow-y: auto;
        display: inline-block;
        width: 100%;
        min-height: 100px;
        padding: 10px  10px;
        background: #E5E9F2;
        border-radius: 6px;
    }
    .el-row{
        height: 40px;
    }
    .el-input{
        max-width: 80px;
    }
    .cost{
        .el-input{

        }

    }
</style>
<template>
    <div class="card">
        <el-row>
            <el-col>
                房型1：双人间 X 4 备注：
            </el-col>
        </el-row>
        <el-row>
            <el-col class="cost">
                <span>成本：</span>
                <el-input v-model="v.cost" type="number"  size="mini" @change="computedCost">
                </el-input>
                €
                <span>bk价：</span>
                <el-input v-model="v.bk" type="number"  size="mini" @change="computedCost">
                </el-input>
                €
                <span>报价：</span>
                <el-input v-model="v.quoted" type="number"  size="mini" @change="computedCost"></el-input>
                €
            </el-col>

        </el-row>
    </div>
</template>
<script>
    export default{
        props:['v','k'],
        data(){
            return{
                rule:{

                }
            }
        },
        methods:{
            computedCost(){
                this.$emit('computedcost');
            }
        }
    }
</script>