<style lang="scss" scoped>
    .el-row{
       text-align: center;
    }
</style>
<template>
    <el-dialog
            title="分配需求"
            :visible.sync="dialoggroup[0].show"
            size="tiny">
        <el-form label-position="left" ref="ruleForm"  label-width="80px">
            <el-row class="padding-left">
                <el-col>
                    <el-form-item label="订房员:">
                        <el-select v-model="params.user" placeholder="请选择订房员">
                            <template v-for="item in user">
                                <el-option :label="item.name" :value="item"></el-option>
                            </template>

                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="padding-left">
                <el-col>
                    <el-form-item label="完成时间:">
                        <el-date-picker
                                v-model="params.dead_line"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-button @click="submit" type="info" size="large">确定</el-button>
                </el-col>
            </el-row>

        </el-form>
    </el-dialog>
</template>
<script>
    import ajax  from '@local/common/ajax';
    export default{
        props:['dialoggroup','pickerOptions'],
        data(){
            return{
                user:[],
                params:{
                    id:this.$route.params.orderid,
                    user:{},
                    dead_line:new Date()
                }
            }
        },
        methods:{
            searchuser(){
                let vm=this;
                ajax.post('/api/system/user/list',{role:'room-booking'}).then(
                    data=>{
                        vm.user=data.list;
                    }
                )
            },
            close(){
                this.$emit('closedialog','1');
            },
            submit(){
                let vm=this;
                ajax.post('/api/team/requirement/dispatch',this.params).then(
                    data=>{
                        if(data.code==0){
                            vm.close();
                            vm.$notify({
                                title: '分配成功',
                                message: '已分配成功，请到团房订单中查看',
                                type: 'success'
                            });
                        }else {
                            vm.$notify({
                                title: '分配失败',
                                message: data.msg,
                                type: 'error'
                            });
                        }
                    }
                )
            }
        },
        mounted(){
            this.searchuser();
        }
    }
</script>