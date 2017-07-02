<style lang="scss" scoped>
    .card-container {
        padding: 0 25px;
        overflow-y: auto;
        margin-bottom: 30px;
        min-width: 850px;
        .red {
            color: red;
        }
        .card {
            overflow-y: auto;
            display: inline-block;
            width: 73%;
            min-width: 760px;
            height: 100%;
            min-height: 210px;
            padding: 10px 10px;
            background: #E5E9F2;
            border-radius: 6px;
            /*定义滚动条轨道 内阴影+圆角*/
            ::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                border-radius: 10px;
                background-color: #F5F5F5;
            }

            /*定义滑块 内阴影+圆角*/
            ::-webkit-scrollbar-thumb {
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
                background-color: #555;
            }
            .title {
                min-width: 95px;
            }
            .el-input {
                width: 20%;
            }
        }
        .cancel {
            display: inline-block;
            height: 20px;
            vertical-align: top;
            margin-top: 100px;
            color: #33aaff;
            cursor: pointer;
        }
        .button-group {
            height: 40px !important;
            line-height: 35px !important;
        }
    }
</style>
<template>
    <div class="card-container">
        <el-form ref="ruleForm2" :rules="rule2" :model="myitem">
            <div class="card">
                <el-row>
                    <el-col :span="3" class="title">
                        <div>入住离店时间<i class="red"> *</i></div>
                    </el-col>
                    <el-col :span="20">
                        <el-date-picker
                            :clearable="false"
                            v-model="daterange"
                            type="daterange"
                            placeholder="选择日期范围"
                            format = "yyyy-MM-dd"
                            :picker-options="pickerOptions"
                            style="width:220px"
                        >
                        </el-date-picker>
                        <span style="margin-right: 20px">{{dayspan}} 晚</span>
                        <span>城市 <i class="red">*</i></span>
                        <el-form-item prop="city">
                            <el-select
                                filterable
                                remote
                                placeholder="输入关键字选择"
                                :remote-method="searchcity"
                                v-model="item.city"
                                :loading="cfetch"
                            >
                                <el-option v-for="city of cities" :key="city.id" :label="city.name" :value="city">

                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom:10px;">
                    <el-col :span="3" class="title">
                        <div>指定的酒店<i class="red"></i></div>
                    </el-col>
                    <el-col :span="15">
                        <el-select
                                style="width:100%"
                                filterable
                                remote
                                placeholder="输入关键字选择"
                                :remote-method="searchhotel"
                                v-model="item.hotel"
                                :loading="hfetch"
                                @change="selectHotel"
                            >
                            <el-option v-for="hotel of hotels" :key="hotel.id" 
                                :label="genHotelLabel(hotel)" :value="hotel">

                            </el-option>
                        </el-select>
                    </el-col>
                    <el-button style="margin-left:10px;" size="mini" v-if="item.hotel" type="warming" @click="item.hotel=null">清空酒店</el-button>
                </el-row>
                <el-form v-for="(v,k) of myitem.rooms" :key="k" ref="ruleForm1" :rules="rule" :model="v">
                    <el-row>
                        <el-col :span="3">
                            <div>房型{{k + 1}} <i class="red">*</i></div>
                        </el-col>
                        <el-col :span="19">
                            <el-select v-model="v.type" size="small">
                                <el-option label="Single" value="Single"></el-option>
                                <el-option label="Double" value="Double"></el-option>
                                <el-option label="Triple" value="Triple"></el-option>
                                <el-option label="Twins" value="Twins"></el-option>
                                <el-option label="Other" value="Other"></el-option>
                            </el-select>
                            x
                            <el-form-item prop="number">
                                <el-input v-model="v.number" type="number" style="width: 80px" size="small">
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="mark" label="备注">
                                <el-input v-model="v.mark" size="small" style="width: 60%">
                                </el-input>
                            </el-form-item>
                            <el-button size="mini" v-if="myitem.rooms.length>1" type="warming" @click="myitem.rooms.remove(v)">-删除房型</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <el-row class="button-group">
                    <el-col :span="3">
                        <el-button size="mini" type="info" @click="addroom">+新增房型</el-button>
                    </el-col>
                </el-row>
            </div>
            <span v-if="removeable" class="cancel" @click="cancelthis">删除</span>
        </el-form>
    </div>
</template>
<script>
    import debounce from 'lodash/debounce';
    import ajax from '@local/common/ajax';
    export default{
        props: ['item', 'index', 'valid', 'removeable'],
        data(){
            return {
                cities:[],
                cfetch:false,
                hotels:[],
                hfetch:false,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                myitem: this.item,
                startdate: null,
                enddate: null,
                hotelgroup: [],
                rule: {
                    number: [{type: 'string', required: true, message: '请输入间数', trigger: 'blur'}]
                },
                rule2:{
                    city: [{type: 'object', required: true, message: '请输入关键词查找城市', trigger: 'change'}]
                }
            }
        },
        computed:{
            daterange:{
                get(){
                    if(!this.startdate||!this.enddate) return '';
                    return [this.startdate, this.enddate];
                },
                set([startdate,enddate]){
                    this.startdate = startdate;
                    this.enddate = enddate;
                    this.myitem.check_in = startdate.format('YYYY-MM-DD');
                    this.myitem.check_out = enddate.format('YYYY-MM-DD');
                }
            },
            dayspan(){
                return this.startdate.daySpan(this.enddate);
            }
        },
        methods: {
            genHotelLabel(hotel){
                let l = '';
                if(hotel.name){
                    l+=hotel.name;
                    if(hotel.ename) l+=`(${hotel.ename})`;
                }else{
                    l+=hotel.ename;
                }
                if(hotel.country){
                    l+= ` - ${hotel.country} - ${hotel.city}`;
                }
                return l;
            },
            cancelthis: function () {
                this.$emit('cancelthis', this.index);
            },
            addroom: function (index) {
                this.$emit('addroom', this.index);
            },
            searchcity: debounce(function s(queryString) {
                const d = new Date().valueOf();
                s.d = d;

                if (queryString.trim()) {
                    this.cfetch=true;
                    ajax.postSilence('/api/city/search', {
                        keyword: queryString.trim()
                    }).then(data => {
                        if(s.d===d){
                            this.cfetch=false;
                            this.cities = data.list.map(item=>{
                                const sameItem = this.cities.find(u=>u.id===item.id);
                                return sameItem?sameItem:item;
                            })
                        }
                    }).catch(e=>{
                        if(s.d===d){
                            this.cfetch=false;
                        }
                        throw(e);
                    })
                }
            }, 300),
            searchhotel: debounce(function s(queryString) {
                const d = new Date().valueOf();
                s.d = d;

                if (queryString.trim()) {
                    this.hfetch=true;
                    
                    ajax.postSilence('/api/hotel/zk-hotel/search', {
                        keyword: queryString.trim(),
                        city: this.item.city&&this.item.city.id
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
            }, 300),
            selectHotel(h){
                if(typeof h === 'string'){
                    const item = { name:h, custom:true };
                    this.hotels.splice(0,1,item);
                    this.item.hotel = item;
                }
            }
        },
        created(){
            if(this.item.city){
                this.cities.push(this.item.city);
            }
            if(this.item.hotel){
                this.hotels.push(this.item.hotel);
            }
            if(this.item.check_in){
                this.startdate = new Date(this.item.check_in);
            }
            if(this.item.check_out){
                this.enddate = new Date(this.item.check_out);
            }
        },
        watch: {
            valid(val){
                if (val) {
                    this.$refs['ruleForm2'].validate();
                    this.$refs['ruleForm1'].forEach(
                        (v,k)=>{
                            v.validate();
                        }
                    )
                }
            }
        }
    }
</script>