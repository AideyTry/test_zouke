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
                                type="datetime"
                                placeholder="选择日期"
                                :clearable="false"
                                >
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
                    dead_line:(new Date((new Date()).valueOf()+60*60*24*1000))
                },
//                pickerOptions0: {
//                    disabledDate(time) {
////                        console.log("time===",time);
////                        console.log("时间===",time.getTime() < Date.now() - 8.64e7);
////                        console.log("getTime===",time);
////                        return time.getTime() < Date.now() - 8.64e7;
//                        return time.getTime() < Date.now() - 8.64e7;
////                        return time.getTime();
//                    }
//                }
            }
        },
        computed:{
            new_dead_line(){
//                return new Date(this.params.dead_line).format('YYYY-MM-DD HH:mm:ss');
                return new Date(this.params.dead_line).format('YYYY-MM-DD HH:mm:ss');
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
                let _params={
                        id:this.$route.params.orderid,
                        user:this.params.user,
                        dead_line:this.new_dead_line
                    }
                ajax.post('/api/team/requirement/dispatch',_params).then(
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
            console.log("dead_line======",this.params.dead_line);
//            console.log("datenow==",Date.now());
//            console.log("Date.now() - 8.64e7;",Date.now(),Date.now() - 8.64e7);
        },
        beforeUpdate(){
            console.log("update=====",this.new_dead_line);
        },
//        updated(){
//
//        }
    }
</script>