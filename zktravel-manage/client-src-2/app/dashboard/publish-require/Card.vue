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
            .el-row {
                height: 50px;
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
                                v-model="startdate"
                                type="date"
                                size="small"
                                placeholder="选择日期"
                                format = "yyyy-MM-dd"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                        -
                        <el-date-picker
                                v-model="enddate"
                                type="date"
                                size="small"
                                placeholder="选择日期"
                                format = "yyyy-MM-dd"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                        <span style="margin-right: 20px">{{daterange}} 晚</span>
                        <span>城市 <i class="red">*</i></span>
                        <el-form-item prop="city">
                            <el-autocomplete
                                    size="small"
                                    class="inline-input"
                                    v-model="city"
                                    :fetch-suggestions="searchcity"
                                    placeholder="输入关键字选择"
                                    @select="selectcity">

                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3" class="title">
                        <div>指定的酒店<i class="red"></i></div>
                    </el-col>
                    <el-col :span="20">
                        <el-autocomplete
                                size="small"
                                class="inline-input"
                                v-model="hotel"
                                :fetch-suggestions="searchhotel"
                                placeholder="输入关键字选择"
                                @select="selecthotel"
                        ></el-autocomplete>
                    </el-col>
                </el-row>
                <template v-for="(v,k) of myitem.rooms">
                    <el-form ref="ruleForm1" :rules="rule" :model="v">
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
                                    <el-input v-model="v.number" type="number" style="width: 50%" size="small">
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="mark" label="备注">
                                    <el-input v-model="v.mark" size="small" style="width: 60%">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1"></el-col>
                        </el-row>
                    </el-form>
                </template>
                <el-row class="button-group">
                    <el-col :span="3">
                        <el-button size="mini" type="info" @click="addroom">+新增房型</el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button size="mini" type="warming" @click="deleteroom">-删除房型</el-button>
                    </el-col>
                </el-row>
            </div>
            <span class="cancel" @click="cancelthis">删除</span>
        </el-form>
    </div>
</template>
<script>
    import debounce from 'lodash/debounce';
    import ajax from '@local/common/ajax';
    export default{
        props: ['item', 'index', 'valid'],
        data(){
            return {
                city: null,
                hotel: null,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                myitem: this.item,
                startdate: new Date(),
                enddate: new Date(),
                hotelgroup: [],
                hotelflag: false,
                rule: {
                    number: [{type: 'string', required: true, message: '请输入间数', trigger: 'blur'}]
                },
                rule2:{
                    city: [{type: 'object', required: true, message: '请输入关键词查找城市', trigger: 'change'}]
                }
            }
        },
        methods: {
            cancelthis: function () {
                this.$emit('cancelthis', this.index);
            },
            addroom: function (index) {
                this.$emit('addroom', this.index);
            },
            deleteroom: function (index) {
                this.$emit('deleteroom', this.index);
            },
            searchcity: debounce(function (queryString, cb) {
                if (queryString) {
                    ajax.postSilence('/api/city/search', {
                        keyword: queryString.trim()
                    }).then(
                        data => {
                            let arr = []
                            data.list.forEach(
                                (v, k) => {
                                    arr.push({value: v.name, item: v})
                                }
                            )
                            cb(arr)
                        }
                    )
                }
            }, 1000),
            selectcity: function (item) {
                let arr = item.item;
                this.myitem.city = arr;
            },
            searchhotel: debounce(function (queryString, cb) {
                if (queryString) {
                    ajax.postSilence('/api/hotel/zk-hotel/search', {
                        keyword: queryString.trim()
                    }).then(
                        data => {
                            let arr = []
                            if (data.list) {
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
            selecthotel: function (item) {
                let arr = item.item;
                this.hotelflag = true;
                this.myitem.hotel = arr;
            }
        },
        computed: {
            daterange(){
                return this.enddate.getDate() - this.startdate.getDate();
            }
        },
        watch: {
            startdate(val){
                this.myitem.check_in = val.format('YYYY-MM-DD');
            },
            enddate(val){
                this.myitem.check_out = val.format('YYYY-MM-DD');
            },
            hotel(val){
                if (!this.hotelflag) {
                    this.myitem.hotel = {name: val, custom: true}
                }
                this.hotelflag = false;
            },
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
        },
        created(){
            if (this.item.city.name) {
                this.city = this.item.city.name;
            }
            if (this.item.hotel.name) {
                this.hotel = this.item.hotel.name;
            }
        }
    }
</script>