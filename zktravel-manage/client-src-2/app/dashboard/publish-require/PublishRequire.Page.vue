<style lang="scss" scoped>
    .publish-require {
        min-width: 800px;
        margin-bottom: 20px;
        .el-row {
            height: 56px;
            line-height: 56px;
            padding: 0px 20px;
        }
        .text-high {
            height: 100px;
        }
        .red {
            color: red;
        }
        .el-select {
            width: 50%;
        }
        .el-input {
            width: 50%;
        }
        .el-radio {
            margin-bottom: 0;
            margin-top: 0;
        }
        .budget-area {
            .el-input {
                width: 6%;
            }
        }
        .el-textarea {
            vertical-align: text-top;
        }
    }
</style>

<template>
    <div class="publish-require" v-if="type==1">
        <el-form ref="params" :rules="rule" :model="params" label-width="80px">
            <el-row type="flex">
                <el-col :span="6">
                    <el-select size="small" v-model="params.priority" placeholder="选择优先级">
                        <el-option :value="1" label="优先级A+"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <span>需求状态:</span>
                    <span>优先级A+</span>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="6">
                    <span>需求来源<i class="red">*</i></span>
                    <el-select size="small" v-model="params.origin_from">
                        <el-option value="超级行程单" label="超级行程单"></el-option>
                        <el-option value="定制" label="定制"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6" style="min-width: 228px">
                    <span>用户名<i class="red">*</i></span>
                    <el-autocomplete
                            size="small"
                            class="inline-input"
                            v-model="user"
                            :fetch-suggestions="searchuser"
                            placeholder="输入关键字选择"
                            @select="selectuser"
                    ></el-autocomplete>
                    <!--                <el-select size="small" placeholder="请选择" v-model="params.user">
                                        <el-option value="1" label="aaa"></el-option>
                                    </el-select>-->
                </el-col>
                <el-col :span="6">
                    <span>出发人数<i class="red">*</i></span>
                    <el-input size="small" type="number" placeholder="请填写" v-model="params.number"></el-input>
                </el-col>
                <el-col :span="6">
                    <span>出行时间<i class="red">*</i></span>
                    <el-date-picker
                            v-model="startdate"
                            type="date"
                            size="small"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="2">
                    <div>酒店星级<i class="red">*</i></div>
                </el-col>
                <el-col :span="22">
                    <el-radio-group v-model="params.star">
                        <el-radio-button name="不限" label="不限"></el-radio-button>
                        <el-radio-button name="一星" label="一星"></el-radio-button>
                        <el-radio-button name="二星" label="二星"></el-radio-button>
                        <el-radio-button name="三星" label="三星"></el-radio-button>
                        <el-radio-button name="四星" label="四星"></el-radio-button>
                        <el-radio-button name="五星" label="五星"></el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="2">
                    <div>是否含早<i class="red">*</i></div>
                </el-col>
                <el-col :span="7">
                    <template>
                        <el-radio class="radio" v-model="params.breakfast" :label="true">含早</el-radio>
                        <el-radio class="radio" v-model="params.breakfast" :label="false">不含</el-radio>
                    </template>
                </el-col>
                <el-col :span="2">
                    <div>报价币种<i class="red">*</i></div>
                </el-col>
                <el-col :span="7">
                    <template>
                        <el-radio class="radio" v-model="params.currency" label="EUR">欧元</el-radio>
                        <el-radio class="radio" v-model="params.currency" label="GBP">英镑</el-radio>
                    </template>
                </el-col>
                <el-col :span="6"></el-col>
            </el-row>
            <el-row type="flex" class="budget-area">
                <el-col :span="2">
                    <div>预算范围<i class="red">*</i></div>
                </el-col>
                <el-col :span="22">
                    <div>
                        <span>每间夜</span>
                        <el-input size="small" type="number" v-model="params.budget_min" placeholder="最低"></el-input>
                        <span>~</span>
                        <el-input size="small" type="number" v-model="params.budget_max" placeholder="最高"></el-input>
                        <span>€</span>
                        <el-input style="width: 20%" v-model="params.budget_mark" size="small"
                                  placeholder="备注"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" class="text-high">
                <el-col :span="2">
                    <div>取消要求<i class="red">*</i></div>
                </el-col>
                <el-col :span="14">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="params.cancel_req">
                    </el-input>
                </el-col>
            </el-row>
            <el-row type="flex" class="text-high">
                <el-col :span="2">
                    <div>位置要求<i class="red">*</i></div>
                </el-col>
                <el-col :span="14">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="params.position_req">
                    </el-input>
                </el-col>
            </el-row>
            <el-row type="flex" class="text-high">
                <el-col :span="2">
                    <div>其他要求<i class="red">*</i></div>
                </el-col>
                <el-col :span="14">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="params.other_req">
                    </el-input>
                </el-col>
            </el-row>
            <template v-for="(v,k) of params.stay_details">
                <date-card @cancelthis="cancelCard" @addroom="addroom" @deleteroom="deleteroom" :item="v"
                           :index="k"></date-card>
            </template>
            <el-row>
                <el-col>
                    <el-button @click="addCard">添加</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <el-button type="success" @click="submitform">发布</el-button>
                </el-col>
                <el-col :span="1"></el-col>
                <el-col :span="2">
                    <el-button type="info" @click="submitform">存为草稿</el-button>
                </el-col>
                <el-col :span="19"></el-col>
            </el-row>
        </el-form>
    </div>

    <div class="publish-content" v-else="type==2">asdasd</div>
</template>
<script>
    import debounce from 'lodash/debounce'
    import ajax from '@local/common/ajax';
    import DateCard from './Card.vue'
    export default{
        props: ['ordertype', 'orderid'],
        components: {
            DateCard
        },
        data(){
            return {
                user: null,
                params: {
                    priority: 1,
                    origin_from: '',
                    user: null,
                    number: 1,
                    start_date: new Date(),
                    star: '不限',
                    breakfast: true,
                    currency: 'en',
                    budget_min: null,
                    budget_max: null,
                    budget_mark: '',
                    cancel_req: '',
                    position_req: '',
                    other_req: '',
                    stay_details: [
                        {
                            check_in: new Date(),
                            check_out: new Date(),
                            city: '',
                            hotel: '',
                            rooms: [{
                                type: 'single',
                                number: 1,
                                mark: ''
                            }]
                        }
                    ]
                },
                rule: {},
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                type: this.ordertype || 1,
                order: this.orderid || null,
                startdate: new Date()
            }
        },
        computed: {},
        methods: {
            searchorder(){

            },
            addCard(){
                this.params.stay_details.push(
                    {
                        check_in: new Date(),
                        check_out: new Date(),
                        city: '',
                        hotel: '',
                        rooms: [{
                            type: 'single',
                            number: 1,
                            mark: ''
                        }]
                    }
                );

            },
            cardChange(k){
                console.info(k);
            },
            cancelCard(k){
                if (this.params.stay_details.length < 2) {
                    return
                }
                this.params.stay_details.splice(k);

            },
            searchuser: debounce(function (queryString, cb) {
                if (queryString) {
                    ajax.post('/api/wx-user/query', {
                        keyword: queryString
                    }).then(
                        data => {
                            let arr = []
                            data.list.forEach(
                                (v, k) => {
                                    arr.push({value: v.nick_name, item: v})
                                }
                            )
                            cb(arr)
                        }
                    )
                }
            }, 1000),
            selectuser(item){
                let arr = {
                    id: item.item._id,
                    name: item.item.nick_name || item.item.name
                }
                this.params.user = arr;

            },
            submitform(){
                ajax.post('/api/team-req/draft', this.params).then(
                    data => {
                        console.info(data)
                    }
                )
            },
            addroom(k){
                this.params.stay_details[k].rooms.push({
                    type: 'single',
                    number: 1,
                    mark: ''
                })
            },
            deleteroom(k){
                if (this.params.stay_details[k].rooms.length>1) {
                    this.params.stay_details[k].rooms.pop();
                }
            }

        },
        mounted(){


        },
        watch: {
            startdate(val){
                this.params.startdate = val.format('YYYY-MM-DD');
            }
        }
    }
</script>