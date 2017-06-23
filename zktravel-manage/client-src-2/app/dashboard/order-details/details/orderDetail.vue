<style lang="scss" scoped>
    .orderDetail{
        h4{
            margin:0;
            padding:0;
        }
        .box-card{
            margin:10px 0 15px 0;
            .clearfix:before,
            .clearfix:after {
                display: table;
                content: "";
            }
            .clearfix:after {
                clear: both
            }
            .card{

            }
        }
        p{
            border-top:1px solid #8492A6;
            margin:30px 0;
        }
    }
</style>
<template>
    <div>
        <div v-if="false" class="orderDetail">
            <el-row type="flex">
                <!--<el-col :span="1"></el-col>-->
                <el-col :span="2">
                    <h4>订单信息</h4>
                </el-col>
                <el-col :span="21">
                    <span>订单号:</span>
                    <span>{{orderId}}</span>
                </el-col>
            </el-row>
            <el-card class="box-card" v-for="(v,index) in orderData.requirement.stay_details" :key="v.id" :index="index" :v="v">
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
                            <span>{{}}</span>
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
                    <el-row type="flex">
                        <el-col :span="8">
                            <strong>入住确认号:</strong>
                            <span></span>
                        </el-col>
                        <el-col :span="8">
                            <strong>备注确认号:</strong>
                            <span></span>
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
                    <el-row type="flex">
                        <el-col :span="6">
                            <strong>房间:</strong>
                            <span></span>
                        </el-col>
                        <el-col :span="6">
                            <strong>入住人:</strong>
                            <span></span>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <p></p>
            <el-card class="box-card">
                <el-row type="flex" slot="header" class="clearfix">
                    <h4>用户条款</h4>
                </el-row>
                <div class="">

                </div>
            </el-card>
        </div>
        <WriteOrder v-if="offlineRole.UPDATE_ORDER&&orderStatus==8" :orderData="orderData"></WriteOrder>
        <RoomingList v-if="offlineRole.UPDATE_ROOM_PERSON&&orderStatus==7"></RoomingList>
    </div>

</template>
<script>
    import ajax from '@local/common/ajax';
    import WriteOrder from './cards/WriteOrder'
    import RoomingList from './cards/RoomingList'
    export default{
        props:["orderData"],
        data(){
            return {
                orderdata:null
            }
        },
        components:{
            WriteOrder:WriteOrder,
            RoomingList:RoomingList
        },
        computed:{
            orderId(){
                return this.$route.params.orderid;
            },
            offlineRole(){
                return this.$store.getters.offlineRole;
            },
            orderStatus(){
                if(this.orderdata){
                    return this.orderdata.status;
                }else {
                    return 0
                }

            }
        },
        methods:{
            loadOrder(id){
                ajax.post("/api/team/order/detail",{id:id}, {lock: false}).then(json=>{
                    this.orderdata = json.detail;
                })
            },
            dateRange(a,b){
                return new Date(a).getDate()-new Date(b).getDate();
            },

        },
        mounted(){
            this.dateRange();
            this.loadOrder(this.$route.params.orderid);
        }
    }
</script>