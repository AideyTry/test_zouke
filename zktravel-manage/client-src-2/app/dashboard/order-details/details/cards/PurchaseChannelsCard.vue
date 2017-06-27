<style lang="scss" scoped>
    .purchase{
        .red{
            color:#f00;
        }
    }
</style>
<template>
    <div class="purchase">
        <el-row type="flex">
            <el-col :span="2">
                <h4>采购渠道</h4>
            </el-col>
        </el-row>

        <el-tabs v-model="supplier" :active-name="supplier" @tab-click="handleClick">
            <template v-for="(item,index) in purchase_channel">
                <el-tab-pane :label="item.supplier_name" :name="item.supplier_name">
                    <el-row type="flex">
                        <el-col :span="2">
                            <strong>总成本价<i class="red">*</i></strong>
                        </el-col>
                        <el-col :span="2">
                            <el-input v-model="item.total_cost" type="number" size="mini"></el-input>
                        </el-col>
                        €
                    </el-row>
                    <template>
                        <el-row type="flex">
                            <el-col :span="2">
                                <strong>取消政策<i class="red">*</i></strong>
                            </el-col>
                            <el-col :span="2">
                                <el-radio class="radio" v-model="item.cancel_policy.cancel_name" :label="true">不可取消</el-radio>
                            </el-col>
                            <el-col :span="3"></el-col>
                            <el-col :span="2">
                                <el-radio class="radio" v-model="item.cancel_policy.cancel_name" :label="false">取消</el-radio>
                            </el-col>
                            <el-col :span="4">

                                <!--<el-date-picker type="date" placeholder="选择日期" v-model="v.cancel.free_cancel_date" style="width: 100%;"></el-date-picker>-->
                                <!--<el-form-item prop="free_cancel_date">-->
                                    <!--<el-date-picker type="date" placeholder="选择日期" v-model="v.cancel.free_cancel_date" style="width: 100%;"></el-date-picker>-->
                                <!--</el-form-item>-->
                                <el-date-picker
                                        v-model="item.cancel_policy.cancel.free_cancel_date"
                                        type="date"
                                        size="small"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptions">
                                </el-date-picker>

                            </el-col>
                            <el-col :span="2"> 前可免费取消</el-col>
                        </el-row>
                        <template v-for="(v,index) in item.cancel_policy.cancel.pay_cancel">
                            <el-row type="flex">
                                <el-col :span="9"></el-col>
                                <el-col :span="4">
                                    <el-date-picker
                                            v-model="v.date"
                                            type="date"
                                            size="small"
                                            placeholder="选择日期"
                                            :picker-options="pickerOptions">
                                    </el-date-picker>
                                </el-col>
                                <el-col :span="2">
                                    <span>前取消收费</span>

                                </el-col>
                                <el-col :span="2">
                                    <el-input v-model="v.number" type="number" size="mini"></el-input>

                                </el-col>
                                €
                            </el-row>

                        </template>
                        <el-row type="flex">
                            <el-col :span="9"></el-col>
                            <el-col :span="10">
                                <el-button type="primary" @click="addCancelPolicy(item.cancel_policy.cancel.pay_cancel)">+取消政策</el-button>
                            </el-col>
                        </el-row>
                    </template>

                    <template v-for="(v,index) in item.pay_policy">
                        <el-row type="flex">
                            <el-col :span="2">
                                <strong>付款政策<i class="red">*</i></strong>
                            </el-col>
                            <el-col :span="4">
                                <el-date-picker
                                        v-model="v.pay_date"
                                        type="date"
                                        size="small"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-col>
                            <el-col :span="2">
                                <span>前需支付</span>

                            </el-col>
                            <el-col :span="2">
                                <el-input v-model="v.number" type="number" size="mini"></el-input>
                            </el-col>
                            €
                        </el-row>
                    </template>
                    <el-row type="flex">
                        <el-col :span="4">
                            <el-button type="primary" @click="addPayPolicy(index)">付款政策</el-button>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </template>
        </el-tabs>

    </div>
</template>
<script>
    export default{
        props:["purchase_channel"],
        data(){
          return {
              supplier:'',
              pickerOptions: {
                  disabledDate(time) {
                      return time.getTime() < Date.now() - 8.64e7;
                  }
              },

          }
        },
        computed:{
            newSupplier(){
                return this.$store.getters.supplier;
            }
        },
        methods:{
            loadSupplier(){
                this.supplier=this.newSupplier;
                switch(this.supplier){
                    case '':
                        this.supplier=null;
                        break;
                    case 'GTA':
                        if(this.purchase_channel.length==1&&this.purchase_channel[0].supplier_name==''){
                            this.purchase_channel[0].supplier_name=this.supplier;
                        }else if(this.purchase_channel.length==1&&this.purchase_channel[0].supplier_name=='miki'){
                            this.purchase_channel.push({
                                supplier_name:'GTA',
                                total_cost:'',
                                cancel_policy:{
                                    cancel_name:'',
                                    cancel:
                                        {
                                            free_cancel_date:'',
                                            pay_cancel:[{
                                                date:'',
                                                number:null
                                            }]
                                        }

                                },
                                pay_policy:[
                                    {
                                        pay_date:'',
                                        number:null
                                    }
                                ]
                            })
                        }
                        break;
                    case 'miki':
                        if(this.purchase_channel.length==1&&this.purchase_channel[0].supplier_name==''){
                            this.purchase_channel[0].supplier_name=this.supplier;
                        }else if(this.purchase_channel.length==1&&this.purchase_channel[0].supplier_name=='GTA'){
                            this.purchase_channel.push({
                                supplier_name:'miki',
                                total_cost:'',
                                cancel_policy:{
                                    cancel_name:'',
                                    cancel:
                                        {
                                            free_cancel_date:'',
                                            pay_cancel:[{
                                                date:'',
                                                number:null
                                            }]
                                        }

                                },
                                pay_policy:[
                                    {
                                        pay_date:'',
                                        number:null
                                    }
                                ]
                            })
                        }
                        break;
                }
            },
            addCancelPolicy(v){
                console.log("v=",v);
                v.push({
                    date:'',
                    number:null
                })
            },
            addPayPolicy(index){
                this.purchase_channel[index].pay_policy.push(
                    {
                    pay_date:'',
                    number:null
                });
            },
            handleClick(){

            }
        },
        watch:{
            newSupplier(){
                this.loadSupplier();
            }
        },
        mounted(){
            this.loadSupplier();
//            this.loadSupplier();
            console.log("supplier=",this.supplier);
            console.log("渠道=",this.purchase_channel);
        }
    }
</script>