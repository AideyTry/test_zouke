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
    .red{
            color:red;
        }
    .el-row{
        height: 40px;
    }
    .cost .el-input{
        max-width: 100px;
    }
   
    .red{
        color:red;
    }
    
</style>
<template>
    <div class="card">
        <el-row>
            <el-col>
                房型{{k+1}}：{{room.type}} X {{room.number}} 备注：{{room.mark}}
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                    <div>实际房型</div>
            </el-col>
        </el-row>
        <el-form :inline="true" v-for="(rooms,key) in v.actual_room_name" :key="key">
            <el-form-item label="房型输入">
                <el-input style="max-width:300px;" v-model="rooms.name"></el-input>
            </el-form-item>
            <el-form-item label="房间数量">
                <el-input style="max-width:100px;" type='number' v-model="rooms.number"></el-input>
            </el-form-item><el-form-item>
                <el-button type="primary" @click="v.actual_room_name.remove(rooms)">删除房型</el-button>
            </el-form-item>
        </el-form>
        <el-row class="button-group">
            <el-col>
                <el-button type="primary" @click="addroom">+新增房型</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col class="cost">
                <span>成本<i class="red">*</i>：</span>
                <el-input v-model="v.price.cost" type="number" size="mini" placeholder="每间每晚">
                </el-input><span>{{this.cash}}</span>
                <span>bk价<i class="red">*</i>：</span>
                <el-input v-model="v.price.bk" type="number" size="mini" placeholder="每间每晚">
                </el-input><span>{{this.cash}}</span>
                <span>报价<i class="red">*</i>：</span>
                <el-input v-model="v.price.quoted" type="number" size="mini" placeholder="每间每晚"></el-input>
                <span>{{this.cash}}</span>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default{
        props:['v','k','room','cash'],
        data(){
            return{
                rule:{},
                tishi:true
            }   
        },
        methods:{
            addroom() {
                this.v.actual_room_name.push({
                    name:"",
                    number:""
                });
            }
        },
        mounted(){
        }
    }
</script>