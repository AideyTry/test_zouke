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

    .user-avatar,.user-name{
        display:inline-block;
        vertical-align:middle;
    }
    .user-avatar{
        width:25px;
        border-radius:100px;
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
        <el-form ref="params" :rules="rule" :model="params" label-width="80px">
            <el-row type="flex">
                <el-col :span="5">
                    <el-select style="width:120px" size="small" v-model="params.priority" placeholder="选择优先级">
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
                <el-col :span="5" style="min-width: 228px">
                    <span>用户名<i class="red">*</i></span>
                    <el-form-item prop="user">
                        <el-select
                            style="width:160px;"
                            filterable
                            remote
                            placeholder="输入关键字选择"
                            :remote-method="searchuser"
                            v-model="params.user"
                            :loading="ufetch"
                        >
                            <el-option v-for="user of users" :key="user.id" :label="user.name" :value="user">
                                <img class="user-avatar" :src="user.avatar" >
                                <div class="user-name">{{user.name}}</div>
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-col>
                <el-col :span="4">
                    <span>出发人数<i class="red">*</i></span>
                    <el-form-item prop="number">
                        <el-input size="small" type="number" style="width:80px;" placeholder="请填写人数" v-model="params.number"></el-input>
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
                <el-col :span="21">
                    <el-checkbox-group v-model="params.star" @change="starchange">
                        <el-checkbox-button v-for="l of ['不限','一星', '二星', '三星', '四星', '五星']" 
                            :key="l" :name="l" :label="l"></el-checkbox-button>
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
                        <el-form-item>
                            <el-input size="small" type="number" v-model="params.budget_min" placeholder="最低"></el-input><span style="margin-left: 8px">~</span>
                        </el-form-item>
                        <el-form-item>
                            <el-input size="small" type="number" v-model="params.budget_max" placeholder="最高"></el-input>
                            <div style="width:1.2em;text-align:right;display:inline-block;">{{getSign(params.currency)}}</div>
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
            <date-card v-for="(v,k) of params.stay_details" 
                :valid="valid" @cancelthis="cancelCard"
                 @addroom="addroom" :item="v" :key="v._t" :ruless="rule" ref="card" :params="params" :removeable="params.stay_details.length>1"
                        :index="k"></date-card>
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
            <!--发布二次确认弹出框start-->
            <el-form-item>
                <el-dialog title="确定发布？" :visible.sync="isTrue" size="tiny">
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="isTrue = false">取 消</el-button>
                        <el-button type="primary" @click="submitform('params')">确 定</el-button>
                    </div>
                </el-dialog>
            </el-form-item>
            <!--发布二次确认弹出框end-->
        </el-form>

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
            const today = new Date();
            const next = new Date();
            next.setDate(next.getDate()+1);

//            let validateBudget_min=(rule,value,callback)=>{
//                if(typeof(this.params.budget_min)=='object'&&(typeof(this.params.budget_max)=='object')&&(this.params.budget_mark=='')){
////                    callback(new Error("预算范围三项中至少输入一项！"))
//                }else  if(typeof(this.params.budget_min)!='object'||(typeof(this.params.budget_max)!='object')||(this.params.budget_mark!='')){
////                    this.$refs.params.validateField('budget_min');
//                    callback();
//
//                }
//            };


//            let validateBudget_max=(rule,value,callback)=>{
//                if(typeof(this.params.budget_min)=='object'&&(typeof(this.params.budget_max)=='object')&&(this.params.budget_mark=='')){
////                    callback(new Error("预算范围三项中至少输入一项！"))
//                }else  if(typeof(this.params.budget_min)!='object'||(typeof(this.params.budget_max)!='object')||(this.params.budget_mark!='')){
////                    this.$refs.params.validateField('budget_min');
//                    callback();
//                }
//            };


            let validateBudget_mark=(rule,value,callback)=>{
                if(typeof(this.params.budget_min)=='object'&&(typeof(this.params.budget_max)=='object')&&(this.params.budget_mark=='')){
                    callback(new Error("预算范围如果不输入请在备注中输入备注信息！"))
                }else  if(typeof(this.params.budget_min)!='object'||(typeof(this.params.budget_max)!='object')||(this.params.budget_mark!='')){
//                    this.$refs.params.validateField('budget_min');
                    callback();
                }
            };

            return {
                users:[],
                ufetch:false,
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
                    budget_mark:'',
                    cancel_req: '',
                    position_req: '',
                    other_req: '',
                    stay_details: [
                        {
                            _t: new Date().valueOf(),
                            check_in: today.format('YYYY-MM-DD'),
                            check_out: next.format('YYYY-MM-DD'),
                            city: null,
                            hotel: null,
                            rooms: [{
                                type: 'Double',
                                number: '1',
                                mark: ''
                            }]
                        }
                    ]
                },
                rule: {
//                    user:[{type:'object',required: true, message: '请输入关键字查找用户名', trigger: 'change'}],
//                    number:[{type:'string',required: true, message: '请输入出发人数', trigger: 'blur'}],
//                    budget_min:[{required: true, message: '请输入数字', trigger: 'blur'}],
//                    budget_max:[{required: true, message: '请输入数字', trigger: 'blur'}],
//                    budget_mark:[{required: true, message: '内容', trigger: 'blur'}],
                    user:[{type:'object',required: true, message: '请输入关键字查找用户名', trigger: 'change'}],
                    number:[{required: true, message: '请输入出发人数', trigger: 'blur'}],

//                    budget_min:[{validator:validateBudget_min, trigger: 'blur'}],
//                    budget_max:[{validator:validateBudget_max, trigger: 'blur'}],
                    budget_mark:[{validator:validateBudget_mark,trigger:'blur'}],

                    city: [{type:'object',required: true, message: '请输入关键词查找城市', trigger: 'change'}]
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
                isTrue:false
                /*发布二次确认弹出框end*/
            }
        },
        computed: {
            budget_min(){
                return this.params.budget_min;
            },
            budget_max(){
                return this.params.budget_max;
            },
            budget_mark(){
                return this.params.budget_mark;
            }
        },
        methods: {
            getSign(cur){
                switch(cur){
                    case 'EUR':
                        return "€";
                    case 'GBP':
                        return "￡";
                }
            },
            starchange(stars){
                if((stars[stars.length-1]==='不限')||stars.length===0) stars.splice(0, stars.length, '不限');
                else stars.remove('不限');
            },
            addCard(){
                const { check_out: lastCheckOut } = this.params.stay_details[this.params.stay_details.length-1];
                const next = new Date(lastCheckOut);
                next.setDate(next.getDate()+1);

                this.params.stay_details.push(
                    {
                        _t: new Date().valueOf(),
                        check_in: lastCheckOut,
                        check_out: next.format('YYYY-MM-DD'),
                        city: null,
                        hotel: null,
                        rooms: [{
                            type: 'Double',
                            number: '1',
                            mark: ''
                        }]
                    }
                );

            },
            cancelCard(k){
                console.log(k);
                if (this.params.stay_details.length === 1) {
                    return
                }
                this.params.stay_details.splice(k, 1);
            },
            searchuser: debounce(function s(queryString) {
                const d = new Date().valueOf();
                s.d = d;

                if (queryString.trim()) {
                    this.ufetch=true;
                    ajax.postSilence('/api/user/search', {
                        keyword: queryString.trim()
                    }).then(data => {
                        if(s.d===d){
                            this.ufetch=false;
                            this.users = data.list.map(item=>{
                                const sameItem = this.users.find(u=>u.id===item.id);
                                return sameItem?sameItem:item;
                            });
                        }
                    }).catch(e=>{
                        if(s.d===d){
                            this.ufetch=false;
                        }
                        throw(e);
                    })
                }
            }, 500),
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
            submitform(formName){
                let vm=this;
//                vm.valid=true;
                let child=vm.$refs.card;
                child.forEach(function(value){
                    value.$refs[formName].validateField('city',function(){
                        vm.valid=true;
                    })
                });
//                child[0].$refs[formName].validateField('city',function(){
//                   vm.valid=true;
//                })
                vm.$refs[formName].validate((valid)=>{
                    if(valid){
                        ajax.post('/api/team/requirement/publish', this.params).then(
                            data => {
                                if (data.code == 0) {
                                    this.$notify({
                                        title: '发布成功',
                                        message: '已成功发布，请到我的发布中查看',
                                        type: 'success'
                                    });
                                    this.$router.push({name:"dashboard-order-detail",params:{orderid:data.orderId,status:'require-node'}});
                                }else if(data.code==1){
                                    this.$notify.error({
                                        title: '无法发布',
                                        message: '请将必填项填写完整~！'
                                    });
                                }
                            }
                        )
                    }else{
                        this.$notify.error({
                            title: '无法发布',
                            message: '请将必填项填写完整~！'
                        });
                    }
                })
            },
            addroom(k){
                this.params.stay_details[k].rooms.push({
                    type: 'Double',
                    number: '1',
                    mark: ''
                })
            }
        },
        created(){
            if (this.orderdata) {
                this.params = this.orderdata.requirement;
                if(this.orderdata.requirement.user){
                    this.users.push(this.orderdata.requirement.user);
                }
                if(this.params.start_date){
                    this.startdate = new Date(this.params.start_date);
                }
            }

        },
        watch: {
            startdate(val){
                this.params.start_date = val.format('YYYY-MM-DD');
            }
        },
        mounted(){
        }
    }
</script>