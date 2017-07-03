<style lang="scss" scoped>
    .el-row{
        padding:10px 0;
    }
</style>
<template>
    <div>
        <el-row type="flex" v-for="(v,index) in peoples" :key="index">
            <el-col :span="1"></el-col>
            <el-col :span="3">
                <strong>入住人{{index+1}}</strong>
                <span>姓</span>
            </el-col>
            <el-col :span="5">
                <el-input v-model="v.name" placeholder="填写英文或拼音"></el-input>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="1">
                <span>名</span>
            </el-col>
            <el-col :span="5">
                <el-input v-model="v.family_name" placeholder="填写英文或拼音"></el-input>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="1">
                <span>性别</span>
            </el-col>
            <el-col :span="6">
                <el-select v-model="v.gender" filterable placeholder="请选择">
                    <el-option
                            v-for="item in gender"
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
        props:["room","num","peoples","add","subtract"],
        data(){
            return {
                roomType:this.room.type,
                gender: [
                    {
                        value: 'male',
                        label: '男'
                    }, {
                        value: 'female',
                        label: '女'
                    }
                ],
            }
        },
        methods:{

        }
    }
</script>