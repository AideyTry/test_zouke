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
            <span>成本合计：{{mycost.cost}} {{cash}}</span>
        </el-col>
        <el-col :span="6">
            <span>bk合计：{{mycost.bk}} {{cash}}</span>
        </el-col>
        <el-col :span="6">
            <span>报价合计：{{mycost.quoted}} {{cash}}</span>
        </el-col>
        <el-col :span="6">
            <span>节省：{{mycost.bk-mycost.quoted}} {{cash}}</span>
        </el-col>
    </el-row>
</template>
<script>
    export default{
        props:['params','order','index','cash'],
        data(){
            return{
                myparams:this.params
            }
        },
        computed:{
            mycost(){
                let vm=this;
                let _arr={cost: 0, bk: 0, quoted: 0};
                this.params.forEach(
                    (a,b)=>{
                        a.rooms.forEach(
                            (v, k) => {
                                _arr.cost+=v.price.cost?v.price.cost*vm.order[b].rooms[k].number:0;
                                _arr.bk+=v.price.bk?v.price.bk*vm.order[b].rooms[k].number:0;
                                _arr.quoted+=v.price.quoted?v.price.quoted*vm.order[b].rooms[k].number:0
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