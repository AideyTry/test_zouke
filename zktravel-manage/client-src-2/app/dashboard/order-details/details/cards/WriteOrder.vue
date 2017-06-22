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
</style>
<template>
    <div>
        <div v-if="!change" class="offerOrder">
            <el-row type="flex">
                <el-col :span="24" class="orderMsg">
                    <h4>暂无订单信息</h4>
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
                        <h4>订单信息</h4>
                    </el-col>
                </el-row>
                <el-tabs v-model="cityTabs" type="border-card" :active-name="cityTabs" @tab-click="hotelTab">
                    <template v-for="(item,index) in orders">
                        <el-tab-pane :label="item.city.name" :name="item.city.name">
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
            <el-button type="success" @click="submitform" size="small">保存
            </el-button>
        </div>
    </div>
</template>
<script>
    import ajax from '@local/common/ajax';
    import debounce from 'lodash/debounce';
    import HotelsCard from './HotelsCard'
    export default{
        props:['orderData'],
        data(){
            return {
                change:false,
                cityTabs:null,
                orders:null,
                order_id:'',
                country:[
                    {
                        check_in:'',
                        check_out:'',
                        hotels:[
                            {
                                hotel_name:'',
                                remark_confirm:'',
                                suppliers:[
                                    {
                                        supplier_name:'',
                                        at_number:'',
                                        room_type:'',
                                        status:1,
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
                                ],
                            }
                        ]
                    },
                    {
                        check_in:'',
                        check_out:'',
                        hotels:[
                            {
                                hotel_name:'',
                                remark_confirm:'',
                                suppliers:[
                                    {
                                        supplier_name:'',
                                        at_number:'',
                                        room_type:'',
                                        status:1,
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
                                ],
                            }
                        ]
                    },
                    {
                        check_in:'',
                        check_out:'',
                        hotels:[
                            {
                                hotel_name:'',
                                remark_confirm:'',
                                suppliers:[
                                    {
                                        supplier_name:'',
                                        at_number:'',
                                        room_type:'',
                                        status:1,
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
                                ],
                            }
                        ]
                    },
                    {
                        check_in:'',
                        check_out:'',
                        hotels:[
                            {
                                hotel_name:'',
                                remark_confirm:'',
                                suppliers:[
                                    {
                                        supplier_name:'',
                                        at_number:'',
                                        room_type:'',
                                        status:1,
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
                                ],
                            }
                        ]
                    },
                    {
                        check_in:'',
                        check_out:'',
                        hotels:[
                            {
                                hotel_name:'',
                                remark_confirm:'',
                                suppliers:[
                                    {
                                        supplier_name:'',
                                        at_number:'',
                                        room_type:'',
                                        status:1,
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
                                ],
                            }
                        ]
                    },
                    {
                        check_in:'',
                        check_out:'',
                        hotels:[
                            {
                                hotel_name:'',
                                remark_confirm:'',
                                suppliers:[
                                    {
                                        supplier_name:'',
                                        at_number:'',
                                        room_type:'',
                                        status:1,
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
                                ],
                            }
                        ]
                    },
                    {
                        check_in:'',
                        check_out:'',
                        hotels:[
                            {
                                hotel_name:'',
                                remark_confirm:'',
                                suppliers:[
                                    {
                                        supplier_name:'',
                                        at_number:'',
                                        room_type:'',
                                        status:1,
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
                                ],
                            }
                        ]
                    },
                    {
                        check_in:'',
                        check_out:'',
                        hotels:[
                            {
                                hotel_name:'',
                                remark_confirm:'',
                                suppliers:[
                                    {
                                        supplier_name:'',
                                        at_number:'',
                                        room_type:'',
                                        status:1,
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
                                ],
                            }
                        ]
                    }
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
            HotelsCard:HotelsCard
        },
        computed:{
            count(){
                return this.$store.getters.count;
            }
        },
        methods:{
            loadOrder(id){
                ajax.post("/api/team/order/detail",{id:id}).then(json=>{
                    this.params=json.detail.requirement;
                    this.orders=json.detail.requirement.stay_details;
//                    this.orders.orderid=1;
                    for(let key in this.orders){
                        this.orders[key].hotels=this.country[key].hotels;
                    }
//                    this.orders.order_id=this.$route.params.orderid;
                    this.cityTabs=json.detail.requirement.stay_details[0].city.name;
                })
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

                ajax.post('/api/team/order-detail/save',{id:this.$route.params.orderid,order:this.orders}).then(
                    data => {
                        if (data.code == 0) {
                            this.$notify({
                                title: '发布成功',
                                message: '已成功发布，请到我的发布中查看',
                                type: 'success'
                            });
//                            this.$router.push({name:"dashboard-order-detail",params:{orderid:data.orderId,status:'require-node'}});
                        }
                    }
                )
            }

        },

        mounted(){
            this.dateRange();

            this.loadOrder(this.$route.params.orderid);
        },
        updated(){
        }
    }
</script>
