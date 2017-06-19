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
                                    <el-col :span="8">
                                        <el-autocomplete
                                                size="small"
                                                v-model="hotel"
                                                :fetch-suggestions="searchHotel"
                                                placeholder="请输入关键字选择"
                                                @select="selectHotel"
                                        >

                                        </el-autocomplete>
                                    </el-col>
                                    <el-col :span="3">
                                        <span>B评分:</span>
                                        <span>{{}}</span>
                                        <span class="delete" @click="clickDelete()">删除</span>
                                    </el-col>
                                </el-row>
                                <el-row type="flex">
                                    <el-col :span="2">
                                        <strong>备注确认号:</strong>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-input v-model="input" placeholder="确认用户备注后，填写相应的编号，用';'隔开">

                                        </el-input>
                                    </el-col>
                                </el-row>

                            </div>
                            <!--采购渠道及房型start-->
                            <div class="room">

                            </div>
                            <!--采购渠道及房型start-->
                        </el-tab-pane>
                    </template>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script>
    import ajax from '@local/common/ajax';
    import debounce from 'lodash/debounce';
    export default{
        props:['orderData'],
        data(){
            return {
                change:false,
                cityTabs:null,
                orders:null,
                hotel:'',
                hotelFlag:false,
                input:''
            }
        },
        computed:{

        },
        methods:{
            loadOrder(id){
                ajax.post("/api/team/order/detail",{id:id}).then(json=>{
                    console.log("json=",json);
                    this.orders=json.detail.requirement.stay_details;
                    this.cityTabs=json.detail.requirement.stay_details[0].city.name;
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


            },
            /*search end*/
            write(){
                this.change=!this.change;
            },
            clickDelete(){

            }
        },
        watch:{
            hotel(val){
                if(!this.hotelFlag){
//                    this.params.hotel={name:val,custom:true}
                }
                this.hotelFlag=false;
            }
        },
        mounted(){
            this.dateRange();
            this.loadOrder(this.$route.params.orderid);
        }

    }
</script>