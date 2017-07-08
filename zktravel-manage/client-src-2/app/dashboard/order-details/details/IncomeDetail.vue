<style lang="scss" scoped>
    .income {
        .red{
            color:#f00;
        }
        .title {
            height: 40px;
            font-size: 18px;
            font-weight: 600;
            line-height: 40px;
        }
        .install {
            .label {

            }
            .el-row {
                height: 41px;
            }
            .el-input {
                display: inline-block;
                width: 80px;
            }
        }
        .card {
            margin: 20px 0;
            .payment{
                margin-bottom:13%;
            }
        }
        .card::after {
            border: 1px solid #ccc;
        }
        .computed {
            height: 40px;
            line-height: 40px;
        }
        .divline {
            border-bottom: 1px dashed #ccc;
            margin: 0 20px;
        }
        .button-group {
            text-align: right;
            .img-size{
                display:inline-block;
                width:100px;
                height:100px;
                margin:0;
                padding:0;
                .code{
                    display:inline-block;
                    margin:0;
                    padding:0;
                    /*width:50px;*/
                    /*height:50px;*/
                }
                span{
                    display:inline-block;
                    font-size:8px;
                }

            }
        }

    }
</style>
<style>
    .radio {
        margin-top: 0;
        margin-bottom: 0;
    }
</style>
<template>
    <div class="income">
        <el-form :model="params" :rules="rule" ref="params">
            <div class="install card">

                    <div class="title">收款设置</div>
                    <el-form-item>
                        <el-row>
                            <el-col :span="8">
                                <span>收款汇率<i class="red">*</i></span>
                                <span>{{requireCurrency.sign}}=</span>
                                <el-input size="mini" type="number" v-model="params.reo"></el-input>
                                <span>¥</span>
                                <!--                    <span>实时汇率：1€=4546¥</span>-->
                            </el-col>
                            <el-col :span="1"></el-col>
                            <el-col :span="6">
                                <span>实时汇率</span>
                                <span>{{order&&order.rates[requireCurrency.type]||1}}</span>
                            </el-col>
                            <el-col :span="1"></el-col>
                            <el-col :span="8">
                                <span>收款币种</span>
                                <!--<el-radio disabled class="radio" size="small" value="1" label="1">{{currency.name}}</el-radio>-->
                                <!--<el-radio disabled class="radio" size="small" value="2" label="1">人民币-->
                                <!--</el-radio>-->

                                <!--case 'EUR':-->
                                <!--return { name:'欧元', sign:'€' };-->
                                <!--case 'GBP':-->
                                <!--return { name:'英镑', sign:'￡' };-->
                                <!--case 'RMB':-->
                                <!--return { name:"人民币", sign:'￥'}-->

                                <el-radio-group v-if="order" v-model="params.currency">
                                    <el-radio  class="radio" size="small" :label='requireCurrency.type'>{{requireCurrency.name}}</el-radio>
                                    <el-radio  class="radio" size="small" label="CNY">人民币
                                    </el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                    </el-form-item>

                        <el-row type="flex" class="payment">

                            <el-col :span="10">
                                <el-form-item prop="money">
                                    <span>
                                        本次收款
                                    </span>
                                    <i class="red">*</i>
                                    <el-input size="mini" type="number" v-model="params.money"></el-input>
                                    <span>{{currency.name}} = {{params.money && (params.money * (params.currency==='CNY'?1:params.reo).toFixed(0))}}¥</span>
                                </el-form-item>
                            </el-col>

                            <el-col :span="14" class="button-group" v-if="userole.GATHERING">
                                <el-button type="info" @click="payment" v-if="(!payflag)">生成收款二维码</el-button>
                                <!--<el-button type="info" @click="lookup" v-if="payflag">查看二维码</el-button>-->
                                <span class="img-size" v-if="payflag">
                            <img  class="code" src="////qr.api.cli.im/qr?data=%25E8%25B5%25B0%25E5%25AE%25A2%25E7%25BD%2591%25E6%2594%25AF%25E4%25BB%2598&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=http%3A%2F%2Fstatic.clewm.net%2Fcli%2Fimages%2Flogomb%2Fversion2%2Fweixin1.png&size=100&kid=cliim&key=9bae92981bd34233a66914cf575073f7" />
                            <span>二维码扫码支付</span>
                        </span>
                                <el-button type="info" @click="markpayment" v-if="payflag">录入线下付款</el-button>
                                <el-button type="danger" @click="cancelpayment" v-if="payflag">取消收款</el-button>
                            </el-col>
                        </el-row>

                <!--</el-form>-->

            </div>
            <div class="divline"></div>
            <div class="stream card">
                <div class="title">收款流水</div>
                <div>
                    <el-table border :data="order.pay_stream" v-if="order">
                        <el-table-column label="时间" prop="paytime">
                        </el-table-column>
                        <el-table-column label="操作人" prop="user.name">
                        </el-table-column>
                        <el-table-column label="渠道" prop="provider">
                        </el-table-column>
                        <el-table-column label="收款币种">
                            <template scope="scope">{{genCurrency(scope.row.collection_info.currency).name}}</template>
                        </el-table-column>
                        <el-table-column :label="'收款金额'+requireCurrency.sign">
                            <template scope="scope">
                                <span>
                                    {{
                                        scope.row.collection_info.currency==='CNY' ?
                                        (scope.row.collection_info.money*scope.row.collection_info.reo).toFixed(0) :
                                        scope.row.collection_info.money
                                    }}{{requireCurrency.name}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="收款金额¥">
                            <template scope="scope">
                                <span>
                                    {{
                                        scope.row.collection_info.currency==='CNY'?
                                        scope.row.collection_info.money:
                                        (scope.row.collection_info.reo/scope.row.collection_info.reo).toFixed(0)}}人民币
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注">
                            <template scope="scope">
                                <span>
                                    {{scope.row.extras}}
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-row type="flex" class="computed">
                    <el-col style="text-align: right">
                        <span>还需收款 ：{{leftmoney}} {{requireCurrency.sign}}</span>
                        <span>收款总额 ：{{income}} {{requireCurrency.sign}}</span>
                        <span>{{incomeRmb}}¥</span>
                    </el-col>
                </el-row>
            </div>
            <div class="divline"></div>
            <div class="plan card" v-if="order">
                <div class="title">收款计划
                </div>
                <el-row type="flex" class="computed" v-if="order.user_policy">
                    <el-col :span="6" v-for="(v,k) in order.user_policy.payment" :key="k">
                        {{v.price}}({{v.dead_line}}前)
                    </el-col>
                </el-row>
            </div>
            <div class="divline"></div>
            <div class="card">
                <div class="title">退款流水
                    <el-button type="danger" style="float: right" @click="refundorder" v-if="userRole.REFUND">
                        退款
                    </el-button>
                </div>

                <div>
                    <el-table border :data="order.refund_stream" v-if="order">
                        <el-table-column label="时间" prop="refund_time">
                        </el-table-column>
                        <el-table-column label="原因" prop="reason">
                        </el-table-column>
                        <el-table-column label="操作人" prop="user.name">
                        </el-table-column>
                        <el-table-column label="渠道" prop="path">
                        </el-table-column>
                        <el-table-column label="退款金额" prop="money">
                        </el-table-column>
                    </el-table>
                </div>
                <el-row type="flex" class="computed">
                    <el-col style="text-align: right">
                        <span>退款总额 ：{{refundmoney}}€</span>
                        <span>¥</span>
                    </el-col>
                </el-row>
            </div>
            <div class="divline"></div>
            <div class="card" v-if="userRole.MODIFYING_COST">
                <div class="title">供应商成本流水
                    <el-button type="info" style="float: right" @click="changecost" v-if="userRole.REFUND||userRole.MODIFYING_COST">
                        修改成本
                    </el-button>
                </div>
                <div>
                    <!--<el-table border :data="order.provider_stream" v-if="order">-->
                    <el-table border :data="new_provider_cost" v-if="order">
                        <el-table-column label="供应商" prop="supplier_name">

                        </el-table-column>
                        <el-table-column label="时间" prop="time">
                        </el-table-column>
                        <el-table-column label="原因" prop="reason">
                        </el-table-column>
                        <el-table-column label="操作人" prop="booking_userName">
                        </el-table-column>
                        <el-table-column label="金额" prop="total_cost">
                        </el-table-column>
                    </el-table>
                </div>
                <el-row type="flex" class="computed">
                    <el-col style="text-align: right">
                        <span>供应商成本：{{new_privider_consts}}</span>
                    </el-col>
                </el-row>
            </div>
            <paymentdialog @loadorder="loadorder" @gathering="gathering" :paramss="params" :checkout="checkout" ref="dialogroup" :dialog="dialog" :income="newIncome" :leftmoney="newLeftmoney" @closedialog="closedialog"></paymentdialog>
            <refunddialog @loadorder="loadorder" ref="refund" :order="order" :pay_const="pay_const" :currency="currency" :dialog="refunddialog" @closedialog="closedialog"></refunddialog>
            <changecost @loadorder="loadorder" ref="changecost" :dialog="changedialog" @closedialog="closedialog"></changecost>
        </el-form>
    </div>
</template>
<script>
    import ajax  from '@local/common/ajax';
    import payment from '../dialogs/PaymentDialog'
    import refund from '../dialogs/RefundDialog'
    import changecost from '../dialogs/ChangeCostDialog'
    export default{
        components: {
            paymentdialog: payment,
            refunddialog:refund,
            changecost:changecost
        },
        data(){
            return {
                counts:0,
                pay_const:0,
                privider_consts:0,
                newLeftmoney:0,
                incomes:0,
                incomes_rmb:0,
                newIncome:0,
                newMoney:0,
                radio: '',
                order: null,
                payplan: null,
                dialog: {
                    show: false
                },
                defunddialog: {
                    show: false
                },
                payflag: false,
                params: {
//                    reo: 1,
                    reo: null,
                    currency:'CNY',
                    money: null
                },
                provider_cost:[
                ],
                refunddialog:{
                    show:false
                },
                changedialog:{
                    show:false
                },
                checkout:false,
                rule:{
                    money:[
                        { required: true, message: '请输入本次收款金额', trigger: 'blur' }
                    ]
                }
            }
        },
        watch:{
            newMoney(){
                let num=0;
                if(this.newMoney){
                    num=parseFloat(this.newMoney);
                }
                this.newIncome=num;
            },
            newIncome(){
                this.newLeftmoney=this.counts-this.newIncome;
            }
        },
        methods: {
            loadorder(newLeftmoney){
                console.log('abc');
                ajax.post('/api/team/order/detail', {id: this.$route.params.orderid}).then(
                    data => {

                        this.order = data.detail;
                        console.log("this.order==",this.order);


                        /*供应商流水start*/
                        let vm=this;
                        this.provider_cost=[];
                        if(this.order.order_detail){
                            this.order.order_detail.suppliers.forEach(function(value,index){
                                vm.provider_cost.push(
                                    {
                                        supplier_name:value.supplier_name,
                                        time:'',
                                        reason:'预订',
                                        booking_userName:vm.order.booking_user.name,
                                        total_cost:value.total_cost + vm.requireCurrency.name
                                    })
//                            value.booking_userName=vm.order.booking_user.name;
//                            value.reason="预订";
//                            vm.privider_consts+=parseInt(value.total_cost);
                            })
                        }
                        if(this.order.modifyCost_list){
//                            let vm=this;
                            this.order.modifyCost_list.forEach(function(value,index){
                                vm.provider_cost.push({
                                    supplier_name:value.supplier_name,
                                    time:value.time,
                                    reason:value.reason,
                                    booking_userName:value.user.name,
                                    total_cost:value.cost
                                })
                            })
                        }
                        /*供应商流水end*/

                        if (data.detail.collection_info) {
                            this.params = data.detail.collection_info;
                            this.payflag = true;
                        }else {
                            if(this.requireCurrency.type!=='CNY'){
                                this.params.reo = this.order.rates[this.requireCurrency.type];
                                this.params.currency = this.requireCurrency.type;
                            }
                            this.payflag = false;
                        }

                        if(this.leftmoney<=0){
                            this.payflag = true;
                        }
                        /*加载数据start*/
                        let newArr=[];
                        let count=0;
                        this.order.price.cases.forEach(function(value){
                            value.price.forEach(function(item){
                                item.rooms.forEach(function(room,index){
                                    newArr.push(room.price.cost);
                                })
                            });
                        });
                        for(let i=0;i<newArr.length;i++){
                            count+=newArr[i];
                        }
                        this.counts=count;

                        if(this.params.money===0){
                            this.newLeftmoney=this.counts;
                            if(newLeftmoney){
                                this.newLeftmoney=newLeftmoney;
                            }
                        }
                        if(typeof(newLeftmoney)=='object'){
                            this.newIncome=newLeftmoney.income;
//                    this.newLeftmoney=leftmoney;
                        }

                        this.currency = data.detail.requirement.currency;
                        /*加载数据end*/
                    }
                )
            },
            payment(){
                this.params.id = this.$route.params.orderid;
                ajax.post('/api/team/pay-stream/collection', this.params).then(
                    data => {
                        if (data.code == 0) {
                            this.payflag=true;
//                            this.dialog.show = true;
//                            this.$notify({
//                                title: '提交成功',
//                                message: '已提交付款信息',
//                                type: 'success'
//                            });
//                            this.loadorder(this.newLeftmoney);
                        }
                    }
                )
            },
            closedialog(){
                this.dialog.show = false;
            },
            cancelpayment(){
                ajax.post('/api/team/pay-stream/cancel', {id: this.$route.params.orderid}).then(
                    data => {
                        if (data.code == 0) {
                            this.$notify({
                                title: '取消成功',
                                message: '请重新输入收款信息',
                                type: 'success'
                            });
                            this.payflag=false;
                            this.loadorder();
                        }
                    }
                )
            },
            markpayment(){
                this.$refs.dialogroup.dialog2.show = true;
            },
            refundorder(){
                this.refunddialog.show=true;
            },
            changecost(){
                this.changedialog.show=true;
            },
            lookup(){

            },
            /*款项收齐后不显示收款start*/
            collectPayment(){
            if(this.leftmoney<=0){
                    this.payflag = true;
                }
            },
            /*款项收齐后不显示收款end*/
            /*收款校验start*/
            gathering(){
//                console.log("=======",formName);
                let params=this.params;
                this.$refs['params'].validate((valid)=>{
                    if(valid){
                        this.$refs.dialogroup.loadSubmit();
                    }
                })
            },
            /*收款校验end*/

            genCurrency(type){
                switch(type){
                    case 'EUR':
                        return { type, name:'欧元', sign:'€' };
                    case 'GBP':
                        return { type, name:'英镑', sign:'￡' };
                    case 'CNY':
                        return { type, name:"人民币", sign:'￥'};
                    default:
                        return {};
                }
            }

        },
        computed: {
            new_provider_cost(){
                this.provider_cost.reverse();
                return this.provider_cost=[...new Set(this.provider_cost)];
            },
            new_privider_consts(){
                let provider_total = 0;
                this.new_provider_cost.forEach(value=>{
                    provider_total+=parseInt(value.total_cost);
                });

                return provider_total+this.requireCurrency.name;
            },
            userRole(){
                return this.$store.getters.offlineRole;
            },
            requireCurrency(){
                if(this.order){
                    return this.genCurrency(this.order.requirement.currency);
                }

                return {};
            },
            currency(){
                return this.genCurrency(this.params.currency);
            },
            new_currency(){
                return "欧元";
            },
            money(){
//                return parseFloat((this.params.reo * this.params.money).toFixed(2));
                return parseInt(this.params.reo * this.params.money);
            },
            userole(){
                return this.$store.getters.offlineRole;

            },
            orderdatastatus(){
                return this.orderdata ? this.orderdata.status : '0'
            },
            leftmoney(){
                if(!this.order) return 0;
                let pay=0;
                const priceList = this.order.user_select_case.price;
                const stay_details = this.order.requirement.stay_details;

                for(let i = 0; i<priceList.length; ++i){
                    const price = priceList[i].rooms.reduce((n, room, index)=>{
                        return n + room.price.quoted * stay_details[i].rooms[index].number;
                    },0);
                    const { check_in, check_out } = stay_details[i];
                    pay += price * new Date(check_in).daySpan(new Date(check_out));
                }
                this.pay_const=pay;
                return pay-this.income;
            },
            income(){
//                let income = 0;
//
//                if(!this.order) return income;
//
//                for(let stream of [this.params, ...(this.order.pay_stream||[])]) {
//                    if (stream.money == null) continue;
//
//                    income += stream.money / (stream.currency === 'CNY' ? stream.reo : 1);
//                }
//
//                return income;
                if(!this.order) return this.incomes;

                for(let stream of [this.params, ...(this.order.pay_stream||[])]) {
                    if (stream.money == null) continue;

                    this.incomes += stream.money / (stream.currency === 'CNY' ? stream.reo : 1);
                }

                return this.incomes;

            },
            /*收款总额人民币start*/
            incomeRmb(){
//                let income = 0;
//
//                if(!this.order) return income;
//
//                for(let stream of [this.params, ...(this.order.pay_stream||[])]) {
//                    if (stream.money == null) continue;
//
//                    income += stream.money * (stream.currency === 'CNY' ? 1 : stream.reo);
//                }
//
//                return income

                if(!this.order) return this.incomes_rmb;

                for(let stream of [this.params, ...(this.order.pay_stream||[])]) {
                    if (stream.money == null) continue;

                    this.incomes_rmb += stream.money * (stream.currency === 'CNY' ? 1 : stream.reo);
                }

                return this.incomes_rmb;
            },
            /*收款总额人民币end*/
            refundmoney(){
                let money=0;
                if(this.order&&this.order.refund_stream){
                    this.order.refund_stream.forEach(
                        (v,k)=>{
                            money+=v.money*1
                        }
                    )
                }
                return money;
            }
        },
        mounted(){
            this.loadorder();
        }
//        beforeUpdate(){
////            this.newMoney=this.params.money;
//        }
    }
</script>