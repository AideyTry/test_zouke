<style>
    .computed{
        height: 80px;
        line-height: 80px;
        font-weight: 600;
        padding: 0 20px;
    }
</style>
<template>
    <el-row class="computed">
        <el-col :span="6">
            <span>成本合计：{{mycost.cost}}</span>
        </el-col>
        <el-col :span="6">
            <span>bk合计：{{mycost.bk}}</span>
        </el-col>
        <el-col :span="6">
            <span>报价合计：{{mycost.quoted}}</span>
        </el-col>
        <el-col :span="6">
            <span>节省：{{mycost.cost-mycost.quoted}}</span>
        </el-col>
    </el-row>
</template>
<script>
    export default{
        props:['params','cost','index'],
        data(){
            return{
                myparams:this.params
            }
        },
        computed:{
            mycost(){
                let _arr={cost: 0, bk: 0, quoted: 0};
                this.params.forEach(
                    (a,b)=>{
                        a.room.forEach(
                            (v, k) => {

                                _arr.cost+=v.cost*1;
                                _arr.bk+=v.bk*1;
                                _arr.quoted+=v.quoted*1
                            }
                        )
                    }

                )
                return _arr;
            }
        },
        watch:{

        }
    }
</script>