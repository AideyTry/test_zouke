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
                房型1：{{roomgroup[room.type]}} X {{room.number}} 备注：{{room.mark}}
            </el-col>
        </el-row>
        <el-row>
            <el-col class="cost">
                <span>成本：</span>
                <el-input v-model="v.price.cost" type="number"  size="mini">
                </el-input>
                €
                <span>bk价：</span>
                <el-input v-model="v.price.bk" type="number"  size="mini">
                </el-input>
                €
                <span>报价：</span>
                <el-input v-model="v.price.quoted" type="number"  size="mini"></el-input>
                €
            </el-col>

        </el-row>
    </div>
</template>
<script>
    export default{
        props:['v','k','room'],
        data(){
            return{
                rule:{

                },
                roomgroup:{
                    Single:'单人间',
                    Double:'双人间',
                    Triple:'三人间',
                    Twins:'标间',
                    Other:'其他'
                }
            }
        },
        methods:{
          
        }
    }
</script>