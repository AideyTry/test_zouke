<style lang="scss" scoped>
    .orderId{
        padding:10px 0;
    }
</style>
<template>
    <div>
        <el-card class="order-card">
            <div slot="header" class="clearfix">
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
            </div>
            <template>
                <el-tabs v-model="cityTabs" :active-name="cityTabs" @tab-click="changeTab">
                    <template v-for="(item,index) in orders">
                        <el-tab-pane :label="item.city.name" :name="item.city.name+index">
                            <el-row type="flex">
                                <el-col :span="8">
                                    <strong>入住/离店:</strong>
                                    <span>{{item.check_in}}-{{item.check_out}}</span>
                                    <span>{{dateRange(item.check_out,item.check_in)}}晚</span>
                                </el-col>
                                <el-col :span="16">
                                    <strong>指定的酒店:</strong>
                                    <span>{{item.hotel.name}}</span>
                                </el-col>
                            </el-row>
                            <div v-for="(v,index) in item.hotels">
                                <el-row type="flex">
                                    <el-col :span="8">
                                        <strong>酒店:</strong>
                                        <span>{{v.hotel.name}}</span>
                                    </el-col>
                                    <el-col :span="8">
                                        <strong>评分</strong>
                                        <span></span>
                                    </el-col>
                                </el-row>
                                    <el-card>
                                        <el-row type="flex">
                                            <el-col :span="4">
                                                <strong>采购渠道:</strong>
                                                <span>{{v.suppliers.supplier_name}}</span>
                                            </el-col>
                                            <el-col :span="1"></el-col>
                                            <el-col :span="8">
                                                <strong>入住编号:</strong>
                                                <span>{{v.suppliers.at_number}}</span>
                                            </el-col>
                                        </el-row>
                                        <template v-for="(item,index) in v.suppliers.rooms">
                                            <el-row type="flex">
                                                <el-col :span="2"><strong>房型{{index+1}}:</strong></el-col>
                                                <el-col :span="3">
                                                    <span>{{item.type}}</span>
                                                </el-col>
                                                <el-col :span="1"></el-col>
                                                <el-col :span="8">
                                                    <strong>描述:</strong>
                                                    <span>{{item.roomDescription}}</span>
                                                </el-col>
                                            </el-row>
                                            <el-row v-for="(v,index) in item.peoples" :key="v.name" type="flex">
                                                <el-col :span="6">
                                                    <strong>入住人{{index+1}}</strong>
                                                    <span>{{v.name}}</span>
                                                    <span>{{v.family_name}}</span>
                                                </el-col>
                                            </el-row>
                                        </template>
                                    </el-card>
                            </div>
                        </el-tab-pane>
                    </template>
                </el-tabs>
            </template>
        </el-card>
        <el-card class="suppliers">
            <div slot="header" class="clearfix">
                <h4>供应商条款:</h4>
            </div>

        </el-card>
    </div>
</template>
<script>
    import ajax from '@local/common/ajax';
    export default{
        data(){
            return {
                orderData:null,
                cityTabs:null,
                orders:[]
            }
        },
        computed:{
            orderId(){
                return this.$route.params.orderid;
            }
        },
        methods:{
            loadOrder(id){
                ajax.post("/api/team/order/detail",{id:id}, {lock: false}).then(json=>{
                    this.orderData = json.detail.order_detail.orders;
                    this.orders=this.orderData.orders;
                    this.cityTabs=this.orderData.orders[0].city.name+'0';
                    console.log("orderdata=",this.orderData);
                })
            },
            dateRange(a,b){
                return new Date(a).getDate()-new Date(b).getDate();
            },
            changeTab(){

            }
        },
        mounted(){
            this.dateRange();
            this.loadOrder(this.$route.params.orderid);
        }
    }
</script>