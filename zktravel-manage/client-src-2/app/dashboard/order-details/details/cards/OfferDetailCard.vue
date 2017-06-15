<style lang="scss" scoped>
    .country{
        height:400px;
        overflow-y: auto;
        .el-row{
          height: 40px;
        }
    }
</style>
<template>
    <div class="country">
        <el-row>
            <el-col :span="3">入住/离店：</el-col>
            <el-col :span="9">{{order.check_in}} - {{order.check_out}} 4晚</el-col>
            <el-col :span="12">指定的酒店：{{order.hotel.name}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="3"><div>酒店：</div></el-col>
            <el-col :span="9" style="padding-right: 10px">
                <el-autocomplete
                        size="small"
                        class="inline-input"
                        v-model="hotel"
                        :fetch-suggestions="searchhotel"
                        placeholder="输入关键字选择"
                        @select="selecthotel"
                ></el-autocomplete>
            </el-col>
            <el-col :span="12">B评分：9.0</el-col>
        </el-row>
        <template v-for="(v,k) in params.room">
            <room  :v="v" :k="k"></room>
        </template>
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
                hotelflag:false
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
                this.hotelflag=false;
            }
        }
    }
</script>