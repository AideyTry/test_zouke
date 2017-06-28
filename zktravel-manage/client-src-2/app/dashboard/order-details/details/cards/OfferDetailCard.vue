<style lang="scss" scoped>
    .country{
        overflow-y: auto;
        .el-row{
          height: 40px;
        }
        .red{
            color:red;
        }
    }
</style>
<template>
    <div class="country">
        <el-form ref="ruleForm" :rules="rule" :model="params">
        <el-row>
            <el-col :span="3">入住/离店：</el-col>
            <el-col :span="9">{{order.check_in}} - {{order.check_out}} {{night}}晚</el-col>
            <el-col :span="12">指定的酒店：{{order.hotel.name}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="3"><div>酒店<i class="red">*</i>：</div></el-col>
            <el-col :span="9" style="padding-right: 10px">
                <el-form-item prop="hotel">
                <el-autocomplete
                        size="small"
                        class="inline-input"
                        v-model="hotel"
                        :fetch-suggestions="searchhotel"
                        placeholder="输入关键字选择"
                        @select="selecthotel"
                ></el-autocomplete>
                </el-form-item>
            </el-col>
            <el-col :span="12">B评分：9.0</el-col>
        </el-row>
        <template v-for="(v,k) in params.rooms">
            <room   :v="v" :k="k" :room="order.rooms[k]"></room>
        </template>
        </el-form>
    </div>
</template>
<script>
    import debounce from 'lodash/debounce';
    import ajax from '@local/common/ajax';
    import room from './Room'
    export default{
        components:{
            room:room
        },
        props:['i','k','order','params'],
        data(){
            return{
                hotel:'',
                hotelflag:false,
                rule:{
                    hotel:[{type:'object',required: true, message: '请输入关键字查找酒店', trigger: 'change'}]
                }
            }
        },
        methods:{
            searchhotel:debounce(function (queryString, cb) {
                if (queryString) {
                    ajax.postSilence('/api/hotel/zk-hotel/search', {
                        keyword: queryString.trim()
                    }).then(
                        data => {
                            let arr = []
                            if(data.list){
                                data.list.forEach(
                                    (v, k) => {
                                        arr.push({value: v.name, item: v})
                                    }
                                )
                                cb(arr)
                            }

                        }
                    )
                }
            }, 1000),
            selecthotel:function (item) {
                let arr = item.item;
                this.hotelflag=true;
                this.params.hotel = arr;
            }
        },
        watch:{
            hotel(val){
                if(!this.hotelflag){
                    this.params.hotel={name:val,custom:true}
                }
                if(!val){
                    this.params.hotel=''
                }
                this.hotelflag=false;
            }
        },
        computed:{
            night(){
                return new Date(this.order.check_out).getDate()-new Date(this.order.check_in).getDate()
            }
        },
        mounted(){
            if(this.params.hotel){
                this.hotel=this.params.hotel.name
            }
        }
    }
</script>