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
            .red{
                color:#f00;
            }
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
            <el-card class="box-card" v-for="(v,index) in orderData.requirement.stay_details" :index="index" :v="v">
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
                <el-tabs v-model="cityTabs" type="border-card" :active-name="cityTabs">
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
                                <el-row type="flex">
                                    <el-col :span="2"><strong>酒店<i class="red">*</i></strong></el-col>
                                    <el-col :span="9">
                                        <el-autocomplete
                                            size="small"
                                            v-model="hotel"
                                            :fetch-suggestions="searchHotel"
                                            placeholder="请输入关键字选择"
                                            @select="selectHotel"
                                        >

                                        </el-autocomplete>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-tab-pane>
                    </template>
                </el-tabs>
            </div>
        </div>
    </div>

</template>
<script>
    import debounce from 'lodash/debounce';
    import ajax from '@local/common/ajax';
    export default{
        props:["orderData"],
        data(){
            return {
                change:false,
                cityTabs:null,
                orders:null,
                hotel:'',
                hotelFlag:false
            }
        },
        computed:{
            orderId(){
                return this.$route.params.orderid;
            }
        },
        methods:{
            loadOrder(id){
                console.log(id);
                ajax.post("/api/team/order/detail",{id:id}).then(json=>{
                    console.log("json=",json);
                    this.orders=json.detail.requirement.stay_details;
                    this.cityTabs=json.detail.requirement.stay_details[0].city.name;
                    console.log(this.cityTabs);
                })
            },
            dateRange(a,b){
                return new Date(a).getDate()-new Date(b).getDate();
            },
            /*search start*/
            searchHotel:debounce(function (queryString, cb) {
                if (queryString) {
                    ajax.postSilence('/api/hotel/zk-hotel/search', {
                        keyword: queryString.trim()
                    }).then(
                        data => {
                            console.log(data);
                            let arr = []
                            if(data.list){
                                data.list.forEach(
                                    (v, k) => {
                                        arr.push({value: v.name, item: v})
                                    }
                                )
                                cb(arr)
                            }

                        }
                    )
                }
            }, 1000),
            selectHotel(item){
                let arr = item.item;
                this.hotelflag=true;
                this.params.hotel = arr;
            },
            /*search end*/
            write(){
                this.change=!this.change;
            }
        },
        watch:{
            hotel(val){
                if(!this.hotelFlag){
                    this.params.hotel={name:val,custom:true}
                }
                this.hotelFlag=false;
            }
        },
        mounted(){
            this.loadOrder(this.$route.params.orderid);
            this.dateRange();
        }
    }
</script>