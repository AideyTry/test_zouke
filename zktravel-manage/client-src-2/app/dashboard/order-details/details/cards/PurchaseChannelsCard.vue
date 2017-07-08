<style lang="scss" scoped>
    .line{
        display:block;
        width:100%;
        /*border-bottom:solid 1px #000;*/
        margin-top:30px;
    }
    .purchase{
        .red{
            color:#f00;
        }
    }
</style>
<template>
    <div class="purchase">
        <el-row type="flex">
            <el-col :span="24">
                <span class="line"></span>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="2">
                <h3>采购渠道:</h3>
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
                                <el-col :span="1">
                                    €
                                </el-col>
                                <el-col :span="2">
                                    <el-button type="primary" icon="delete" size="mini" @click="deletePurchase(item.cancel_policy.cancel.pay_cancel,index)"></el-button>
                                </el-col>
                            </el-row>

                        </template>
                        <el-row type="flex">
                            <el-col :span="9"></el-col>
                            <el-col :span="10">
                                <el-button type="primary" @click="addCancelPolicy(item.cancel_policy.cancel.pay_cancel)" size="mini">+取消政策</el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <el-row type="flex">
                        <el-col>
                            <h2></h2>
                        </el-col>
                    </el-row>
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
                            <el-col :span="1">
                                €
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" icon="delete" size="mini" @click="deletePayPolicy(item.pay_policy,index)"></el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <el-row type="flex">
                        <el-col :span="4">
                            <el-button type="primary" @click="addPayPolicy(index)" size="mini">付款政策</el-button>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </template>
        </el-tabs>

    </div>
</template>
<script>
    export default{
        props:["order","purchase_channel"],
        data(){
          return {
              supplier:'',
              pickerOptions: {
                  disabledDate(time) {
                      return time.getTime() < Date.now() - 8.64e7;
                  }
              },
              deleteIsTrue:true

          }
        },
        computed:{
            newSupplier(){
                return this.$store.getters.supplier;
            },
            new_purchase_channel(){
                let vm=this;
                vm.purchase_channel=[...new Set(vm.purchase_channel)];
            }

        },
        methods:{
//            loadSupplier(){
//                this.supplier=this.newSupplier;
////                switch(this.supplier){
////                    case '':
////                        this.supplier=null;
////                        break;
////                    case 'GTA':
//////                        if(this.purchase_channel.length==0||this.purchase_channel.length==1&&this.purchase_channel[0].supplier_name=='miki'){
////                            this.purchase_channel.push({
////                                supplier_name:'GTA',
////                                total_cost:'',
////                                cancel_policy:{
////                                    cancel_name:'',
////                                    cancel:
////                                        {
////                                            free_cancel_date:'',
////                                            pay_cancel:[{
////                                                date:'',
////                                                number:null
////                                            }]
////                                        }
////
////                                },
////                                pay_policy:[
////                                    {
////                                        pay_date:'',
////                                        number:null
////                                    }
////                                ]
////                            });
//////                        }
////                        break;
////                    case 'miki':
//////                        if(this.purchase_channel.length==0||this.purchase_channel.length==1&&this.purchase_channel[0].supplier_name=='GTA'){
////                            this.purchase_channel.push({
////                                supplier_name:'miki',
////                                total_cost:'',
////                                cancel_policy:{
////                                    cancel_name:'',
////                                    cancel:
////                                        {
////                                            free_cancel_date:'',
////                                            pay_cancel:[{
////                                                date:'',
////                                                number:null
////                                            }]
////                                        }
////
////                                },
////                                pay_policy:[
////                                    {
////                                        pay_date:'',
////                                        number:null
////                                    }
////                                ]
////                            });
//////                        }
////                        break;
////                }
//
//            },
            loadSupplier(){
//                this.purchase_channel;
//                this.newSupplier;
                const allSupplier = this.newSupplier;
                const oldSupplierSet = this.purchase_channel;

                const newSupplierSet = [];


                for(let sp of allSupplier){
                    const sameSp = oldSupplierSet.find(i=>i.supplier_name===sp);
                    if(sameSp){
                        newSupplierSet.push(sameSp);
                    }else{
                        newSupplierSet.push( {
                           supplier_name:sp,
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
                        });
                    }
                };


                this.purchase_channel.splice(0,this.purchase_channel.length,...newSupplierSet);
                (this.purchase_channel.length>0) && (this.supplier= this.purchase_channel[0].supplier_name);
            },
            addCancelPolicy(v){
                console.log("v=",v);
                v.push({
                    date:'',
                    number:null
                })
            },
            deletePurchase(v,index){
                if(v.length>1){
                    if(v.length==2){
                        this.deleteIsTrue=false;
                    }
                    v.splice(index,1);
                }else{
                    this.deleteIsTrue=false;
                }
            },
            addPayPolicy(index){
                this.purchase_channel[index].pay_policy.push(
                    {
                    pay_date:'',
                    number:null
                });
            },
            deletePayPolicy(v,index){
                if(v.length>1){
                    v.splice(index,1);
                }
            },
            handleClick(){

            }
        },
        watch:{
            newSupplier:{
               handler:function(val,oldVal){
                    console.log("======",val);
                   this.loadSupplier();
               },
                deep:true
            }
        },
//        watch:{
//
////            newSupplier(){
////                console.log("order=",this.order)
////
////                console.log("newSupplier===",this.newSupplier);
////                let arr=[];
////                let count_GTA=0;
////                let count_miki=0;
////                this.order.orders.forEach(function(orders){
////                    orders.hotels.forEach(function(hotels){
////                        hotels.suppliers.forEach(function(supplier,index){
////                            arr.push(supplier.supplier_name);
////                        })
////                    })
////                });
//////                this.provider_cost=[...new Set(this.provider_cost)]
//////                arr=[...new Set(arr)];
////                console.log("arr===",arr);
////                for(let i=0;i<arr.length;i++){
////                    if(arr[i]=='GTA'){
////                        count_GTA++;
////                        this.purchase_channel.push({
////                            supplier_name:'GTA',
////                            total_cost:'',
////                            cancel_policy:{
////                                cancel_name:'',
////                                cancel:
////                                    {
////                                        free_cancel_date:'',
////                                        pay_cancel:[{
////                                            date:'',
////                                            number:null
////                                        }]
////                                    }
////
////                            },
////                            pay_policy:[
////                                {
////                                    pay_date:'',
////                                    number:null
////                                }
////                            ]
////                        });
////                    }
////                    if(arr[i]=='miki'){
////                        count_miki++;
////                        this.purchase_channel.push({
////                            supplier_name:'miki',
////                            total_cost:'',
////                            cancel_policy:{
////                                cancel_name:'',
////                                cancel:
////                                    {
////                                        free_cancel_date:'',
////                                        pay_cancel:[{
////                                            date:'',
////                                            number:null
////                                        }]
////                                    }
////
////                            },
////                            pay_policy:[
////                                {
////                                    pay_date:'',
////                                    number:null
////                                }
////                            ]
////                        });
////                    }
////
////
////                    /*数组去重start*/
////                    var newArr=[];
////                    for(var i=0;i<this.purchase_channel;i++){
////                        if(newArr.indexOf(this.purchase_channel[i])==-1){
////                            newArr.push(this.purchase_channel[i]);
////                        }
////                    }
////                    /*数组去重end*/
////                    this.purchase_channel=newArr;
////                    console.log("this.purchase_channel",this.purchase_channel);
////                    console.log("order=",this.order)
//////                    const s = new Set();
////////
////////                    [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
//////                    this.purchase_channel.forEach(x=>s.add(x));
//////                    this.purchase_channel=s;
////                    this.loadSupplier();
////                }
////
//////                if(count_GTA==0&&count_miki==0){
//////                    this.newSupplier='';
//////                    this.purchase_channel.splice(0,2);
//////                }
//////                if(count_GTA==0){
////////                    if(this.purchase_channel.length==1&&this.purchase_channel[0].supplier_name=='GTA'){
////////                        this.purchase_channel.splice(0,1);
////////                    }
////////                    if(this.purchase_channel.length==2&&this.purchase_channel[0].supplier_name=='GTA'){
////////                        this.purchase_channel.splice(0,1);
////////                    }
////////                    if(this.purchase_channel.length==2&&this.purchase_channel[1].supplier_name=='GTA'){
////////                        this.purchase_channel.splice(1,1);
////////                    }
//////                    let i,flag;
//////                    for(i=0;i<arr.length;i++){
//////                        if(arr[i]=='GTA'){
//////                            flag=i;
//////                        }
//////                    }
//////                    this.purchase_channel.splice(flag,1);
//////                }
////
////
//////                if(count_miki==0){
////////                    if(this.purchase_channel.length==1&&this.purchase_channel[0].supplier_name=='miki'){
////////                        this.purchase_channel.splice(0,1);
////////                    }
////////                    if(this.purchase_channel.length==2&&this.purchase_channel[0].supplier_name=='miki'){
////////                        this.purchase_channel.splice(0,1);
////////                    }
////////                    if(this.purchase_channel.length==2&&this.purchase_channel[1].supplier_name=='miki'){
////////                        this.purchase_channel.splice(1,1);
////////                    }
//////                    let i,flag;
//////                    for(i=0;i<arr.length;i++){
//////                        if(arr[i]=='miki'){
//////                            flag=i;
//////                        }
//////                    }
//////                    this.purchase_channel.splice(flag,1);
//////                }
////            },
//            deleteIsTrue(){
////                if(this.item.length==1){
////                    this.deleteIsTrue=false;
////                }else{
////                    this.deleteIsTrue=true;
////                }
//            }
//        },
        mounted(){
//            this.loadSupplier();
//            if(this.item.length==1){
//                this.deleteIsTrue=false;
//            }else{
//                this.deleteIsTrue=true;
//            }
            console.log("newSupplier===",this.newSupplier);
        },
        beforeUpdate(){
            console.log("newSupplier===",this.newSupplier);
        }
    }
</script>