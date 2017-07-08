<style lang="scss" scoped>
    .orderId{
        padding:10px 0;
    }
</style>
<template>
    <div>
        <div v-if="orderStatus!=8&&userInfo.role!=='room-booking'" class="orderDetail">
            <el-row type="flex">
                <!--<el-col :span="1"></el-col>-->
                <el-col :span="3">
                    <h4>订单信息</h4>
                </el-col>
                <el-col :span="21"  class="orderId">
                    <span>订单号:</span>
                    <span>{{orderId}}</span>
                </el-col>
            </el-row>
            <el-card class="box-card" v-for="(v,index) in newOrderData.orders" :key="v.id" :index="index" :v="v">
                <el-row type="flex" slot="header" class="clearfix">
                    <h4>入住单{{index+1}}</h4>
                </el-row>
                <div>
                    <el-row type="flex">
                        <el-col :span="8">
                            <strong>入住/离店:</strong>
                            <span>{{v.check_in}}-{{v.check_out}}</span>
                            <span>{{dateRange(v.check_out,v.check_in)}}晚</span>
                        </el-col>
                        <el-col :span="8">
                            <strong>入住酒店:</strong>
                            <span>{{v.hotel.name}}</span>
                        </el-col>
                    </el-row>
                    <el-row type="flex">
                        <el-col :span="8">
                            <strong>酒店电话:</strong>
                            <span></span>
                        </el-col>
                        <el-col :span="8">
                            <strong>酒店地址:</strong>
                            <span>{{v.hotel.address}}</span>
                        </el-col>
                        <el-col :span="8">
                            <strong>是否含早:</strong>
                            <span>{{orderData.requirement.breakfast?"含早":"不含"}}</span>
                        </el-col>
                    </el-row>
                    <template v-for="(item,index) in v.hotels">
                        <el-row type="flex">
                            <el-col :span="8">
                                <strong>入住编号:</strong>
                                <span>{{item.suppliers.at_number}}</span>
                            </el-col>
                            <el-col :span="8">
                                <strong>备注确认号:</strong>
                                <span>{{item.remark_confirm}}</span>
                            </el-col>
                        </el-row>
                        <el-row type="flex">
                            <el-col :span="8">
                                <strong>酒店入住时间:</strong>
                                <span></span>
                            </el-col>
                            <el-col :span="8">
                                <strong>酒店退房时间:</strong>
                                <span></span>
                            </el-col>
                        </el-row>
                        <template v-for="(room,index) in item.suppliers.rooms">
                            <el-row type="flex">
                                <el-col :span="6">
                                    <strong>房间:</strong>
                                    <span>{{room.type}}</span>
                                </el-col>
                                <el-col :span="6">
                                    <template v-for="(item,index) in room.peoples">
                                        <el-row type="flex">
                                            <strong>入住人:</strong>
                                            <span>{{item.name}}</span>
                                            <span>{{item.family_name}}</span>
                                        </el-row>
                                    </template>
                                </el-col>
                            </el-row>
                        </template>
                    </template>
                </div>
            </el-card>
            <p></p>
            <div class="box-card">
                <el-row type="flex">
                    <h4>用户条款</h4>
                </el-row>
                <el-card class="">
                    <el-row type="flex">
                        <el-col :span="5">
                            <strong>订单金额:</strong>
                            <span>{{cost}}</span>
                            €
                        </el-col>
                    </el-row>
                    <el-row type="flex">
                        <el-col :span="10">
                            <el-row type="flex">
                                <strong>取消政策:</strong>
                                <span>{{orderData.user_select_case.user_policy.cancel}}</span>
                            </el-row>
                        </el-col>
                        <el-col :span="2"></el-col>
                        <el-col :span="2"><strong>付款政策</strong></el-col>
                        <el-col :span="8">
                            <el-row v-if="isTrue" type="flex">
                                <span>分期付款</span>
                            </el-row>
                            <el-row v-if="isTrue==false" type="flex">
                                <span>全款</span>
                            </el-row>
                            <template v-for="(item,index) in orderData.user_select_case.user_policy.payment">
                                <el-row type="flex">
                                    <span>{{item.dead_line}}</span>
                                    <span>前需支付</span>
                                    <span>{{item.price}}</span>
                                    €
                                </el-row>
                            </template>
                        </el-col>
                    </el-row>
                </el-card>
            </div>
            <!--分房名单start-->
            <div>
                <el-row type="flex">
                    <el-col :span="2">
                        <h4>分房名单</h4>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <!--<el-form-item>-->
                    <el-input type="textarea" v-model="content" :disabled="conceal"></el-input>
                    <!--</el-form-item>-->
                </el-row>
                <el-button type="info" @click="submitform" size="small">保存
                </el-button>
            </div>
            <!--分房名单end-->
            <!--<el-card>-->
                <!--<el-row type="flex" slot="header" class="clearfix">-->
                    <!--<h4>分房名单</h4>-->
                <!--</el-row>-->
                <!--<el-input-->
                        <!--type="textarea"-->
                        <!--:rows="5"-->
                        <!--v-model="orderData.allot_list.content"-->
                        <!--:disabled="true">-->

                <!--</el-input>-->
            <!--</el-card>-->
        </div>
        <RoomReservationCard v-if="userInfo.role!=='custom-service'" :orderDatas="orderData"></RoomReservationCard>
    </div>
</template>
<script>
    import ajax from '@local/common/ajax';
    import RoomReservationCard from './RoomReservationCard.vue'
    export default{
        props:["orderData"],
        data(){
            return {
//                orderData:this.orederData,
                change:false,
                choose:false,

                content:'',
                newContent:'',
                conceal:false
            }
        },
        components:{
            RoomReservationCard:RoomReservationCard
        },
        computed:{
            userInfo(){
                return this.$store.getters.userInfo;
            },
            orderStatus(){
                if(this.orderData){
                    return this.orderData.status;
                }else {
                    return 0
                }
            },
            orderId(){
                return this.$route.params.orderid;
            },
            newOrderData(){
                return this.orderData.order_detail.orders;
            },
            cost(){
                let arr= this.orderData.price.cases||[];
                let cost=0;
//                arr.forEach(
//                    (v,k)=>{
//                        v.price[k].rooms.forEach(
//                            (a,b)=>{
//                                cost+=a.price.cost;
//                            }
//                        )
//                    }
//                )
                arr.forEach(function(cases,index){
                    cases.price.forEach(function(price,index){
                        price.rooms.forEach(function(v,index){
                            cost+=v.price.cost;
                        })
                    })
                })
                return cost;
            },
            percent(){
            },
            isTrue(){
                if(this.orderData.user_select_case.user_policy.payment.length>1){
                    this.change=!this.change;
                }
                return this.change;
            }
        },
        methods:{
            loadOrder(id){
                ajax.post("/api/team/order/detail",{id:id}, {lock: false}).then(json=>{
                    this.orderData = json.detail;
                    console.log("控房",this.orderData);
                })
            },
            dateRange(a,b){
                return new Date(a).getDate()-new Date(b).getDate();
            },
            loadform(){
                if(!!this.orderData.allot_list){
                    this.newContent=this.orderData.allot_list.content;
                    this.content=this.newContent;
                }
            },
            submitform(){
                if(this.content.length===0){
                    this.$message({
                        message:"请输入内容！",
                        type:'error'
                    })
                }else{
                    ajax.post('/api/team/allot-list/collection',{id:this.$route.params.orderid,content:this.content}).then(
                        data => {
                            if (data.code == 0) {
                                this.$notify({
                                    title: '保存成功',
                                    message: '已保存成功,请到订房员处查看',
                                    type: 'success'
                                });
//                            this.$router.push({name:"dashboard-order-detail",params:{orderid:data.orderId,status:'require-node'}});
                            }
                        }
                    )
                    this.conceal=true;
                }
            }
        },
        mounted(){
            this.dateRange();
            this.loadform();
//            this.loadOrder(this.$route.params.orderid);
            console.log("userInfo=",this.userInfo);
            console.log("this.ordersData=",this.orderData);
//            this.loadOrder(this.$route.params.orderid);
        }
    }
</script>