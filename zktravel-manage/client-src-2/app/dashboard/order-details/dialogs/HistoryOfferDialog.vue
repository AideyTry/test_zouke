<style>
    .historyDialog{

    }
</style>
<template>
    <div class="historyDialog">
        <el-tabs active-name="历史需求">
            <el-tab-pane label="历史需求" name="历史需求">
                <require :orderdata="data"></require>
            </el-tab-pane>
            <el-tab-pane label="历史报价" name="历史报价">
                <template v-if="offerdata">
                    <div v-for="(o,p) in offerdata" :key="p">
                        <el-row style="height: 40px" type="flex">
                            <el-col :span="9">
                                <h4>方案{{p*1+1}}</h4>
                            </el-col>
                            <el-col :span="12" class="creator-info">
                            </el-col>
                        </el-row>
                        <offer :offer="o" :index="p" v-if="o"></offer>
                    </div>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import require from '../details/RequireDetail';
    import offer from '../details/cards/BookingOfferCard';
    export default{
        props:['data'], //包裹的是case方案
        components:{
            require :require,
            offer:offer
        },
        data(){
            return{
                orderdata:[]
            }
        },
        computed:{
            offerdata(){
                let vm=this;
                let editableTabs=[];
                console.log(this.data);
                vm.data.cases.forEach(  //循环方案
                    (a,b)=>{
                        editableTabs.push({
                            title: '方案'+(b*1+1),
                            name: '方案'+(b*1+1),
                            order: vm.data.requirement.stay_details,//放的是每个酒店入住的时间段
                            params: a.price,
                            provider:{
                                booking_channel:a.sp_policy.booking_channel,
                                payment_policy:a.sp_policy.payment,
                                cancel_policy:a.sp_policy.cancel,
                                remark:a.sp_policy.remark
                            },
                            cost:{cost: 0, bk: 0, quoted: 0}
                        })
                    }
                )
                return editableTabs;
            }
        },
        methods:{

        }
    }
</script>