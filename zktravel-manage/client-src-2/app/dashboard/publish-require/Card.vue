<style lang="scss" scoped>
    .card-container{
        padding: 0 25px;
        height:200px;
        margin-bottom: 30px;
        .red{
            color:red;
        }
        .card{
            display: inline-block;
            width:73%;
            min-width: 760px;
            height:100%;
            padding: 10px  10px;
            background: #E5E9F2;
            border-radius: 6px;
            .title{
                min-width: 95px;
            }
            .el-row{
                height: 50px;
                line-height: 50px;
            }
            .el-input{
                width: 20%;
            }
        }
        .cancel{
            display: inline-block;
            height: 20px;
            vertical-align: top;
            margin-top: 100px;
            color: #33aaff;
            cursor: pointer;
        }
    }
</style>
<template>
    <div class="card-container">
        <div class="card">
            <el-row>
                <el-col :span="3" class="title">
                    <div>入住离店时间<i class="red"> *</i></div>
                </el-col>
                <el-col :span="20">
                    <el-date-picker
                            v-model="startdate"
                            type="date"
                            size="small"
                            format="yyyy-MM-DD"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                    -
                    <el-date-picker
                            v-model="enddate"
                            format="yyyy-MM-DD"
                            type="date"
                            size="small"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                    <span style="margin-right: 20px">x晚</span>
                    <span>城市 <i class="red">*</i></span>
                    <el-select size="small" v-model="myitem.city" placeholder="请选择">
                        <el-option value="欧洲" label="欧洲"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3" class="title">
                    <div>指定的酒店<i class="red">*</i></div>
                </el-col>
                <el-col :span="20">
                    <el-select size="small" placeholder="请选择" v-model="myitem.hotel">
                        <el-option label="七天假日" value="七天假日">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <template v-for="(v,k) of myitem.rooms">
                <el-row>
                    <el-col :span="3">
                        <div>房型{{k+1}} <i class="red">*</i></div>
                    </el-col>
                    <el-col :span="19">
                        <el-select v-model="v.type" size="small">
                            <el-option label="Single" value="Single" ></el-option>
                            <el-option label="Double" value="Double" ></el-option>
                            <el-option label="Triple" value="Triple" ></el-option>
                            <el-option label="Twins" value="Twins" ></el-option>
                            <el-option label="Other" value="Other" ></el-option>
                        </el-select>
                        x
                        <el-input v-model="v.number" type="number" size="small">

                        </el-input>
                        <el-input v-model="v.mark" size="small">

                        </el-input>
                    </el-col>
                    <el-col :span="1"></el-col>
                </el-row>
            </template>
            <div>
                <el-button size="mini" type="info" @click="addroom">+新增房型</el-button>
                <el-button size="mini" type="warming" @click="deleteroom">-删除房型</el-button>
            </div>
        </div>
        <span class="cancel" @click="cancelthis">删除</span>
    </div>
</template>
<script>
    export default{
        props:['item','index'],
        data(){
            return{
                pickerOptions:{
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                myitem:this.item,
                startdate:new Date(),
                enddate:new Date()
            }
        },
        methods:{
            cancelthis:function () {
                this.$emit('cancelthis',this.index);
            },
            addroom:function (index) {
                this.$emit('addroom',this.index);
            },
            deleteroom:function (index) {
                this.$emit('deleteroom',this.index);
            }
        },
        watch:{
            startdate(val){
                this.myitem.check_in=val.format('YYYY-MM-DD');
            },
            enddate(val){
                this.myitem.check_out=val.format('YYYY-MM-DD');
            }
        }
    }
</script>