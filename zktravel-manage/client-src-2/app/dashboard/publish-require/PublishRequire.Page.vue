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
        <el-row type="flex">
            <el-col :span="6">
                <el-select size="small" v-model="params.level" placeholder="选择优先级">
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
                <el-select size="small" v-model="params.require_orign">
                    <el-option value="1" label="aaa"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <span>用户名<i class="red">*</i></span>
                <el-select size="small" placeholder="请选择" v-model="params.username">
                    <el-option value="1" label="aaa"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <span>出发人数<i class="red">*</i></span>
                <el-input size="small" placeholder="请填写" v-model="params.usernum"></el-input>
            </el-col>
            <el-col :span="6">
                <span>出行时间<i class="red">*</i></span>
                <el-date-picker
                        v-model="params.startdate"
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
                <el-radio-group v-model="params.hotelstar">
                    <el-radio-button label="不限"></el-radio-button>
                    <el-radio-button label="一星"></el-radio-button>
                    <el-radio-button label="二星"></el-radio-button>
                    <el-radio-button label="三星"></el-radio-button>
                    <el-radio-button label="四星"></el-radio-button>
                    <el-radio-button label="五星"></el-radio-button>
                </el-radio-group>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="2">
                <div>是否含早<i class="red">*</i></div>
            </el-col>
            <el-col :span="7">
                <template>
                    <el-radio class="radio" v-model="params.morning" :label="true">含早</el-radio>
                    <el-radio class="radio" v-model="params.morning" :label="false">不含</el-radio>
                </template>
            </el-col>
            <el-col :span="2">
                <div>报价币种<i class="red">*</i></div>
            </el-col>
            <el-col :span="7">
                <template>
                    <el-radio class="radio" v-model="params.moneytype" label="eu">欧元</el-radio>
                    <el-radio class="radio" v-model="params.moneytype" label="en">英镑</el-radio>
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
                    <el-input size="small" v-model="params.budgetmin" placeholder="最低"></el-input>
                    <span>~</span>
                    <el-input size="small" v-model="params.budgetmax" placeholder="最高"></el-input>
                    <span>€</span>
                    <el-input style="width: 20%" v-model="params.budgetmark" size="small" placeholder="备注"></el-input>
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
                        v-model="params.cancel_require">
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
                        v-model="params.position_require">
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
                        v-model="params.other_require">
                </el-input>
            </el-col>
        </el-row>
        <template v-for="(v,k) of params.hotelcontent">
            <date-card @cancelthis="cancelCard" :item="v" :index="k"></date-card>
        </template>
        <el-row>
            <el-col>
                <el-button @click="addCard">添加</el-button>
            </el-col>
        </el-row>
    </div>
    <div class="publish-content" v-else="type==2">asdasd</div>
</template>
<script>
    import ajax from '@local/common/ajax';
    import DateCard from './datecard.vue'
    export default{
        props:['ordertype','orderid'],
        components: {
            DateCard
        },
        data(){
            return {
                params: {
                    level: 1,
                    require_orign: '',
                    username: '',
                    usernum: '',
                    startdate: new Date(),
                    hotelstar: '不限',
                    morning: true,
                    moneytype: 'en',
                    budgetmin: '',
                    budgetmax: '',
                    budgetmark: '',
                    cancel_require: '',
                    position_require: '',
                    other_require: '',
                    hotelcontent: [
                        {
                            checkin: new Date(),
                            checkout: new Date(),
                            city: '',
                            appiont: '',
                            homegroup: [{
                                hometype: 'single',
                                homenum: 1,
                                homemark: ''
                            }]
                        }
                    ]
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                type:this.ordertype || 1,
                order:this.orderid  || null
            }
        },
        computed: {},
        methods: {
            loadtable(){

            },
            searchorder(){

            },
            addCard(){
                this.params.hotelcontent.push({
                    checkin: new Date(),
                    checkout: new Date(),
                    city: '',
                    appiont: '',
                    homegroup: [{
                        hometype: 'single',
                        homenum: 1,
                        homemark: ''
                    }]
                });
                this.$store.commit('initRequirementOrder', this.params)
            },
            cardChange(k){
                console.info(k);
            },
            cancelCard(k){
                if(this.params.hotelcontent.length<2){
                    return
                }
                this.params.hotelcontent.splice(k);
                this.$store.commit('initRequirementOrder', this.params)
            }
        },
        mounted(){
            this.$store.commit('initRequirementOrder', this.params);

        }
    }
</script>