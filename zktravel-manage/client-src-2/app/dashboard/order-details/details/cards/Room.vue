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
    .el-input{
        max-width: 80px;
    }
    .cost{
        .el-input {

        }
    }
    .red{
        color:red;
    }
    .home .el-input{
        width: 200px;
    }
</style>
<template>
    <div class="card">
        <el-row>
            <el-col>
                房型1：{{room.type}} X {{room.number}} 备注：{{room.mark}}
            </el-col>
        </el-row>
        <el-form>
            <el-row>
                <el-col>
                    <div>实际房型<i class="red">*</i></div>
                </el-col>
            </el-row>
            <el-row v-for="rooms in realRoom">
                <el-col :span="20" class="home">
                    <el-input size="mini" placeholder="房型输入" v-model="rooms.roomsType">
                    </el-input>
                    <el-input type='number' size="mini" v-model="rooms.number"></el-input>
                    <el-button size="mini" type="warming" v-if="realRoom.length>1" @click="realRoom.remove(rooms)">-删除房型</el-button>
                </el-col>  
            </el-row>
        </el-form>
        <el-row class="button-group">
            <el-col>
                <el-button size="mini" type="info" @click="addroom" v-show="this.realRoom.length<this.room.number">+新增房型</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col class="cost">
                <span>成本<i class="red">*</i>：</span>
                <el-input v-model="v.price.cost" type="number" size="mini">
                </el-input><span>{{this.cash}}</span>
                <span>bk价<i class="red">*</i>：</span>
                <el-input v-model="v.price.bk" type="number" size="mini">
                </el-input><span>{{this.cash}}</span>
                <span>报价<i class="red">*</i>：</span>
                <el-input v-model="v.price.quoted" type="number" size="mini"></el-input>
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
                rule:{
                },
                tishi:true,
                realRoom:[{roomsType:"",number:""}]
            }   
        },
        methods:{
            addroom() {
                this.realRoom.push({
                    roomsType:"",
                    number:""
                })
            }
        },
        mounted(){
            console.log(this.cash);
        }
    }
</script>