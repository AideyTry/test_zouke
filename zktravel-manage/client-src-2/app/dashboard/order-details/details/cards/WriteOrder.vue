<style lang="scss" scoped>
    .offerOrder{
        .el-col{
            text-align:center;
            h4{
                padding-bottom:10px;
                vertical-align:middle;
            }
            .el-button{
                display:inline-block;
                padding:10px 40px;
            }
        }
    }
    .orderContent{
        .city{
            .el-row{
                padding:2px 0;
            }
            .red{
                color:#f00;
            }
            .delete{
                color:#f00;

            }
            .delete:hover{
                cusor:pointer;
            }
        }
    }
    .line{
        display:block;
        width:100%;
        /*border-bottom:solid 1px #000;*/
        margin-top:30px;
    }
</style>
<template>
    <div>
        <div v-if="!change" class="offerOrder">
            <el-row type="flex">
                <el-col :span="24" class="orderMsg">
                    <h3>暂无订单信息</h3>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="24">
                    <el-button type="primary" @click="write">填写订单</el-button>
                </el-col>
            </el-row>
        </div>
        <div v-if="change" class="orderContent">
            <div class="orderHotel">
                <el-row type="flex">
                    <el-col :span="4">
                        <h3>订单信息:</h3>
                    </el-col>
                    <el-col :span="18">

                    </el-col>
                    <el-col :span="2">
                        <el-button type="success" @click="isTrue=true" size="small">保存
                        </el-button>
                    </el-col>
                </el-row>
                <el-tabs v-model="cityTabs" type="border-card" :active-name="cityTabs" @tab-click="hotelTab">
                    <template v-for="(item,index) in orders">
                        <el-tab-pane :label="item.city.name" :name="item.city.name+index">
                            <div class="city">
                                <el-row type="flex">
                                    <el-col :span="2">
                                        <strong>入住/离店:</strong>
                                    </el-col>
                                    <el-col :span="9">
                                        <span>{{item.check_in}}-{{item.check_out}}</span>
                                        <span>{{dateRange(item.check_out,item.check_in)}}晚</span>
                                    </el-col>
                                </el-row>
                                <HotelsCard :item="item.hotels" :items="item" :index="index" :params="params" :orders="orders"></HotelsCard>
                            </div>
                        </el-tab-pane>

                    </template>
                </el-tabs>
            </div>

            <PurchaseChannelsCard :purchase_channel="purchase_channel" :order="order"></PurchaseChannelsCard>
        </div>
        <el-row type="flex">
            <el-col :span="24">
                <span class="line"></span>
            </el-col>
        </el-row>
        <el-row type="flex">
            <h3>分房名单:</h3>
        </el-row>
        <el-row type="flex">
            <el-input
                    type="textarea"
                    :rows="5"
                    v-model="orderData.allot_list.content"
                    :disabled="true">

            </el-input>
        </el-row>
        <!--保存二次确认弹出框start-->
        <el-dialog title="保存后不能修改订单，是否确定？" :visible.sync="isTrue" size="tiny">
            <div slot="footer" class="dialog-footer">
                <el-button @click="isTrue = false">取 消</el-button>
                <el-button type="primary" @click="submitform">确 定</el-button>
            </div>
        </el-dialog>
        <!--保存二次确认弹出框end-->
    </div>
</template>
<script>
    import ajax from '@local/common/ajax';
    import debounce from 'lodash/debounce';
    import HotelsCard from './HotelsCard'
    import PurchaseChannelsCard from './PurchaseChannelsCard'
    export default{
        props:['orderData'],
        data(){
            return {
                isTrue:false,
                change:false,
                cityTabs:null,
                order:{},
                orders:null,
                order_id:'',
                country:[
                    {
                        check_in:'',
                        check_out:'',
                        hotels:[
                            {
                                hotel:{
                                    name:''
                                },
                                remark_confirm:'',
                                suppliers:[
                                    {
                                        supplier_name:'',
                                        at_number:'',
                                        rooms:[
                                            {
                                                type:'Single',
                                                number:1,
                                                room_description:'',
                                                peoples:[
                                                    {
                                                        name:'',
                                                        family_name:'',
                                                        gender:''
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        check_in:'',
                        check_out:'',
                        hotels:[
                            {
                                hotel:{
                                    name:''
                                },
                                remark_confirm:'',
                                suppliers:[
                                    {
                                        supplier_name:'',
                                        at_number:'',
                                        rooms:[
                                            {
                                                type:'Single',
                                                number:1,
                                                room_description:'',
                                                peoples:[
                                                    {
                                                        name:'',
                                                        family_name:'',
                                                        gender:''
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        check_in:'',
                        check_out:'',
                        hotels:[
                            {
                                hotel:{
                                    name:''
                                },
                                remark_confirm:'',
                                suppliers:[
                                    {
                                        supplier_name:'',
                                        at_number:'',
                                        rooms:[
                                            {
                                                type:'Single',
                                                number:1,
                                                room_description:'',
                                                peoples:[
                                                    {
                                                        name:'',
                                                        family_name:'',
                                                        gender:''
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        check_in:'',
                        check_out:'',
                        hotels:[
                            {
                                hotel:{
                                    name:''
                                },
                                remark_confirm:'',
                                suppliers:[
                                    {
                                        supplier_name:'',
                                        at_number:'',
                                        rooms:[
                                            {
                                                type:'Single',
                                                number:1,
                                                room_description:'',
                                                peoples:[
                                                    {
                                                        name:'',
                                                        family_name:'',
                                                        gender:''
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        check_in:'',
                        check_out:'',
                        hotels:[
                            {
                                hotel:{
                                    name:''
                                },
                                remark_confirm:'',
                                suppliers:[
                                    {
                                        supplier_name:'',
                                        at_number:'',
                                        rooms:[
                                            {
                                                type:'Single',
                                                number:1,
                                                room_description:'',
                                                peoples:[
                                                    {
                                                        name:'',
                                                        family_name:'',
                                                        gender:''
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
//                    {
//                        check_in:'',
//                        check_out:'',
//                        hotels:[
//                            {
//                                hotel:{
//                                    name:''
//                                },
//                                remark_confirm:'',
//                                suppliers:[
//                                    {
//                                        supplier_name:'',
//                                        at_number:'',
//                                        room_type:'',
//                                        status:1,
//                                        rooms:[
//                                            {
//                                                type:'Single',
//                                                number:1,
//                                                room_description:'',
//                                                peoples:[
//                                                    {
//                                                        name:'',
//                                                        family_name:'',
//                                                        gender:''
//                                                    }
//                                                ]
//                                            }
//                                        ]
//                                    }
//                                ]
//                            }
//                        ]
//                    }
                ]
                ,
                purchase_channel:[

//                    {
//                        supplier_name:'miki',
//                        total_cost:'',
//                        cancel_policy:{
//                            cancel_name:'',
//                            cancel:
//                                {
//                                    free_cancel_date:'',
//                                    pay_cancel:[{
//                                        date:'',
//                                        number:null
//                                    }]
//                                }
//
//                        },
//                        pay_policy:[
//                            {
//                                pay_date:'',
//                                number:null
//                            }
//                        ]
//                    }
                ],
                params: {
                    priority: 'A+',
                    origin_from: '',
                    user: null,
                    number: 1,
                    start_date: new Date().format('YYYY-MM-DD'),
                    star: '不限',
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
                            city: {
                                name: null
                            },
                            hotel: {
                                name: null
                            },
                            rooms: [{
                                type: 'Single',
                                number: 1,
                                mark: '',
                                peoples:[
                                    {
                                        name:'zs',
                                        familyName:'w',
                                        gender:[
                                            {
                                                male:"男"
                                            },
                                            {
                                                female:"女"
                                            }
                                        ]

                                    }
                                ]
                            }]
                        }
                    ]
                }
            }
        },
        components:{
            HotelsCard:HotelsCard,
            PurchaseChannelsCard:PurchaseChannelsCard
        },
        computed:{
            count(){
                return this.$store.getters.count;
            },
            newSupplier(){
                return this.$store.getters.supplier;
            },
            arr(){
                this.orders=this.orderData.requirement.stay_details;
                let newObj=this.country[0];
                let arr=[];
                for(let i=0;i<this.orders.length;i++){
                    arr.push(newObj);
                }
                return arr;
            }
        },
        methods:{
            loadOrder(id){
//                ajax.post("/api/team/order/detail",{id:id}).then(json=>{
//                    this.params=json.detail.requirement;
                    this.orders=this.orderData.requirement.stay_details;
//                    console.log("orders=",this.orders);
//                    let newObj=this.country[0];
//                    let arr=[];
//                    for(let i=0;i<this.orders.length;i++){
//                        arr.push(newObj);
//                    }
//                    console.log("arr=",arr);
////                    this.orders.orderid=1;
                    for(let key in this.orders){
                        this.orders[key].hotels=this.country[key].hotels;
                    }
//                    this.orders.order_id=this.$route.params.orderid;
                    this.cityTabs=this.orders[0].city.name+'0';
                    this.order.orders=this.orders;
                    this.order.suppliers=this.purchase_channel;
//                })
            },
            hotelTab(){

            },


            write(){
                this.change=!this.change;
            },
            dateRange(a,b){
                return new Date(a).getDate()-new Date(b).getDate();
            },
            submitform(){

                ajax.post('/api/team/order-detail/save',{id:this.$route.params.orderid,order_obj:this.order}).then(
                    data => {
                        if (data.code == 0) {
                            this.$notify({
                                title: '保存成功',
                                message: '已保存成功，请到已控房中查看',
                                type: 'success'
                            });
                            this.isTrue=false;
                            this.$router.push({name:"dashboard-order-detail",params:{orderid:data.orderId,status:'order-detail'}});
//                            this.$router.push({name:"dashboard-order-detail",params:{orderid:data.orderId,status:'require-node'}});
                        }else if(data.code==1){
                            this.$notify.error({
                                title: '无法保存',
                                message: '请将必填项填写完整~！'
                            });
                        }
                    }
                )
            }

        },
        mounted(){
            this.dateRange();
            this.loadOrder();
        }
    }
</script>
