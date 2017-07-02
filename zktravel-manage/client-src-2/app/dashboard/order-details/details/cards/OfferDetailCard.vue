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
            <el-col :span="3">入住/离店:</el-col>
            <el-col :span="9">{{order.check_in}} - {{order.check_out}} {{night}}晚</el-col>
            <el-col :span="12" v-if="order.hotel">指定的酒店：{{order.hotel.name}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="3"><div>酒店<i class="red">*</i>：</div></el-col>
            <el-col :span="15" style="padding-right: 10px">
                <el-form-item prop="hotel">
                <el-select
                        style="width:100%"
                        filterable
                        remote
                        placeholder="输入关键字选择"
                        :remote-method="searchhotel"
                        v-model="params.hotel"
                        :loading="hfetch"
                    >
                    <el-option v-for="hotel of hotels" :key="hotel.id" 
                        :label="genHotelLabel(hotel)" :value="hotel">
                    </el-option>
                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="3" v-if="params.hotel&&params.hotel.score">B评分：{{params.hotel.score}}</el-col>
        </el-row>
            <room v-for="(v,k) in params.rooms" :key="k" :v="v" :k="k" :room="order.rooms[k]" :cash="this.cash"></room>
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
        props:['i','k','order','params','cash'],
        data(){
            return{
                hotels: [],
                hfetch: false,

                hotelflag:false,
                rule:{
                    hotel:[{type:'object',required: true, message: '请输入关键字查找酒店', trigger: 'change'}]
                }
            }
        },
        methods:{
            genHotelLabel(hotel){
                let l = '';
                if(hotel.name){
                    l+=hotel.name;
                    if(hotel.ename) l+=`(${hotel.ename})`;
                }else{
                    l+=hotel.ename;
                }

                l+= ` - ${hotel.country} - ${hotel.city}`;
                return l;
            },
            searchhotel: debounce(function s(queryString) {
                const d = new Date().valueOf();
                s.d = d;

                if (queryString.trim()) {
                    this.hfetch=true;
                    ajax.postSilence('/api/hotel/zk-hotel/search', {
                        keyword: queryString.trim(),
                        city: this.order.city&&this.order.city.id
                    }).then(data => {
                        if(s.d === d){
                            this.hfetch=false;
                            this.hotels = data.list.map(item=>{
                                const sameItem = this.hotels.find(u=>u.id===item.id);
                                return sameItem?sameItem:item;
                            })
                        }
                    }).catch(e=>{
                        if(s.d===d){
                            this.hfetch=false;
                        }
                        throw e;
                    })
                }
            }, 300)
        },
        computed:{
            night(){
                return new Date(this.order.check_in).daySpan(new Date(this.order.check_out))
            }
        }
    }
</script>