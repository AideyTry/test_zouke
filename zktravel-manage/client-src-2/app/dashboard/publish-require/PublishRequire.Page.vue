<style lang="scss" scoped>
    .publish-require {
        min-width: 1000px;
        margin-bottom: 20px;
        .el-row {
            height: 56px;
            line-height: 56px;
            padding: 0px 20px 0px 40px;
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
            .el-input{
                width: 70%;
            }
        }
        .el-textarea {
            vertical-align: text-top;
        }
        .addcard {
            margin-bottom: 40px;
        }
        .el-form-item {
            display: inline-block;
        }
    }
</style>
<style lang="scss">
    .publish-require {
        .el-form-item {
            display: inline-block;
        }
        .el-form-item__content {
            margin-left: 0 !important;
        }
    }
</style>
<template>
    <div class="publish-require" v-if="type==1">
        <el-form ref="ruleForm" :rules="rule" :model="params" label-width="80px">
            <el-row type="flex">
                <el-col :span="6">
                    <el-select size="small" v-model="params.priority" placeholder="选择优先级">
                        <el-option value="A+" label="优先级A+"></el-option>
                        <el-option value="A" label="优先级A"></el-option>
                        <el-option value="B" label="优先级B"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <span>需求状态:</span>
                    <span>{{params.priority}}</span>
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
                    <el-form-item prop="user">
                        <el-autocomplete
                                size="small"
                                class="inline-input"
                                v-model="user"
                                :fetch-suggestions="searchuser"
                                placeholder="输入关键字选择"
                                @select="selectuser"
                        ></el-autocomplete>
                    </el-form-item>

                </el-col>
                <el-col :span="6">
                    <span>出发人数<i class="red">*</i></span>
                    <el-form-item prop="number">
                    <el-input size="small" type="number" placeholder="请填写人数" style="width: 100%" v-model="params.number"></el-input>
                    </el-form-item>
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
                    <el-checkbox-group v-model="params.star">
                        <el-checkbox-button name="不限" label="不限"></el-checkbox-button>
                        <el-checkbox-button name="一星" label="一星"></el-checkbox-button>
                        <el-checkbox-button name="二星" label="二星"></el-checkbox-button>
                        <el-checkbox-button name="三星" label="三星"></el-checkbox-button>
                        <el-checkbox-button name="四星" label="四星"></el-checkbox-button>
                        <el-checkbox-button name="五星" label="五星"></el-checkbox-button>
                    </el-checkbox-group>
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
                        <el-form-item prop="budget_min">
                        <el-input size="small" type="number" v-model="params.budget_min" placeholder="最低"></el-input><span style="margin-left: 8px">~</span>
                        </el-form-item>
                        <el-form-item prop="budget_max">
                        <el-input size="small" type="number" v-model="params.budget_max" placeholder="最高"></el-input><span>€</span>
                        </el-form-item>
                        <el-form-item prop="budget_mark">
                        <el-input v-model="params.budget_mark" size="small"
                                  placeholder="备注"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" class="text-high">
                <el-col :span="2">
                    <div>取消要求<i class="red"></i></div>
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
                    <div>位置要求<i class="red"></i></div>
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
                    <div>其他要求<i class="red"></i></div>
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
                <date-card :valid="valid" @cancelthis="cancelCard" v-if="v" @addroom="addroom" @deleteroom="deleteroom" :item="v"
                           :index="k"></date-card>
            </template>
            <el-row class="addcard">
                <el-col>
                    <el-button @click="addCard">添加</el-button>
                </el-col>
            </el-row>
            <el-row v-if="!orderdata">
                <el-col :span="2">
                    <!--<el-button type="success" @click="submitform">发布</el-button>-->
                    <!--修改后start-->
                    <el-button type="success" @click="isTrue=true">发布</el-button>
                    <!--修改后end-->
                </el-col>
                <el-col :span="1"></el-col>
                <el-col :span="2">
                    <el-button type="info" @click="submitdraft">存为草稿</el-button>
                </el-col>
                <el-col :span="19"></el-col>
            </el-row>
        </el-form>
        <!--发布二次确认弹出框start-->
        <el-dialog title="确定发布？" :visible.sync="isTrue" size="tiny">
            <div slot="footer" class="dialog-footer">
                <el-button @click="isTrue = false">取 消</el-button>
                <el-button type="primary" @click="submitform">确 定</el-button>
            </div>
        </el-dialog>
        <!--发布二次确认弹出框end-->
    </div>
</template>
<script>
    import debounce from 'lodash/debounce'
    import ajax from '@local/common/ajax';
    import DateCard from './Card.vue'
    export default{
        props: ['ordertype', 'orderid', 'orderdata'],
        components: {
            DateCard
        },
        data(){
            return {
                user: null,
                params: {
                    priority: 'A+',
                    origin_from: '超级行程单',
                    user: null,
                    number: '1',
                    start_date: new Date().format('YYYY-MM-DD'),
                    star: ['不限'],
                    breakfast: true,
                    currency: 'EUR',
                    budget_min: null,
                    budget_max: null,
                    budget_mark: '',
                    cancel_req: '',
                    position_req: '',
                    other_req: '',
                    stay_details: [
                        {
                            check_in: new Date().format('YYYY-MM-DD'),
                            check_out: new Date().format('YYYY-MM-DD'),
                            city: '',
                            hotel: {custom:true,name:''},
                            rooms: [{
                                type: 'Double',
                                number: '1',
                                mark: ''
                            }]
                        }
                    ]
                },
                rule: {
                    user:[{type:'object',required: true, message: '请输入关键字查找用户名', trigger: 'change'}],
                    number:[{type:'string',required: true, message: '请输入出发人数', trigger: 'blur'}],
                    budget_min:[{type:'string',required: true, message: '请输入数字', trigger: 'blur'}],
                    budget_max:[{type:'string',required: true, message: '请输入数字', trigger: 'blur'}],
                    budget_mark:[{type:'string',required: true, message: '请输入备注', trigger: 'blur'}]
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                type: this.ordertype || 1,
                order: this.orderid || null,
                startdate: new Date(),
                valid:false,
                /*发布二次确认弹出框start*/
                isTrue:false,
                /*发布二次确认弹出框end*/
            }
        },
        computed: {},
        methods: {
            searchorder(){

            },
            addCard(){
                this.params.stay_details.push(
                    {
                        check_in: new Date().format('YYYY-MM-DD'),
                        check_out: new Date().format('YYYY-MM-DD'),
                        city: '',
                        hotel: {custom:true,name:''},
                        rooms: [{
                            type: 'Single',
                            number: '1',
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
                    ajax.postSilence('/api/user/query', {
                        keyword: queryString.trim()
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
                    name: item.item.nick_name || item.item.name,
                    avatar: item.item.head_image
                }
                this.params.user = arr;

            },
            submitdraft(){
//                let vm = this;
//                vm.valid=true;
//                vm.$refs['ruleForm'].validate((valid) => {
//                    if (valid) {
//                        ajax.post('/api/team/requirement/draft', this.params).then(
//                            data => {
//                                if (data.code == 0) {
//                                    this.$notify({
//                                        title: '保存成功',
//                                        message: '已保存为草稿，请到我的发布中查看',
//                                        type: 'success'
//                                    });
//                                    this.$router.push({name:"dashboard-order-detail",params:{orderid:data.orderId,status:'require-node'}});
//                                }
//                            }
//                        )
//                    } else {
//                        return false;
//                    }
//                });

                /*无前端校验的存为草稿start*/
                ajax.post('/api/team/requirement/draft', this.params).then(
                    data => {
                        if (data.code == 0) {
                            this.$notify({
                                title: '保存成功',
                                message: '已保存为草稿，请到我的发布中查看',
                                type: 'success'
                            });
                            this.$router.push({name:"dashboard-order-detail",params:{orderid:data.orderId,status:'require-node'}});
                        }
                    }
                )
                /*无前端校验的存为草稿end*/
            },
            submitform(){
                ajax.post('/api/team/requirement/publish', this.params).then(
                    data => {
                        if (data.code == 0) {
                            this.$notify({
                                title: '发布成功',
                                message: '已成功发布，请到我的发布中查看',
                                type: 'success'
                            });
                            this.$router.push({name:"dashboard-order-detail",params:{orderid:data.orderId,status:'require-node'}});
                        }
                    }
                )
            },
            addroom(k){
                this.params.stay_details[k].rooms.push({
                    type: 'Single',
                    number: '1',
                    mark: ''
                })
            },
            deleteroom(k){
                if (this.params.stay_details[k].rooms.length > 1) {
                    this.params.stay_details[k].rooms.pop();
                }
            }

        },
        created(){
            if (this.orderdata) {
                this.params = this.orderdata.requirement;
                this.user = this.orderdata.requirement.user.name;
            }

        },
        watch: {
            startdate(val){
                this.params.start_date = val.format('YYYY-MM-DD');
            }
        }
    }
</script>