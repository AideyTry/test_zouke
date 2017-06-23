<style lang="scss" scoped>

</style>
<template>
    <div v-if="orderStatus==9" class="orderDetail">
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
        <el-card class="box-card">
            <el-row type="flex" slot="header" class="clearfix">
                <h4>用户条款</h4>
            </el-row>
            <div class="">

            </div>
        </el-card>
    </div>
</template>
<script>
    import ajax from '@local/common/ajax';
    export default{
        data(){
            return {
                orderData:null
            }
        },
        computed:{
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
            }
        },
        methods:{
            loadOrder(id){
                ajax.post("/api/team/order/detail",{id:id}, {lock: false}).then(json=>{
                    this.orderData = json.detail;
                })
            },
            dateRange(a,b){
                return new Date(a).getDate()-new Date(b).getDate();
            },
        },
        mounted(){
            this.dateRange();
            this.loadOrder(this.$route.params.orderid);
            console.log(this.orderData);
        }
    }
</script>