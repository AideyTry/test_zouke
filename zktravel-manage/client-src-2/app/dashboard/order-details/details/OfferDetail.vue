<style lang="scss" scoped>
    .offer-detail-container {
        width: 100%;
    }

    .offer-container {
        height: 100%;
    }

</style>
<template>
    <div>
        <div v-if="offlineRole.UPDATE_PRICE||offlineRole.CHECK_PRICE" class="offer-detail-container">
            <el-row style="height: 40px" type="flex">
                <el-col :span="9">
                    <h4>报价详情</h4>
                </el-col>
                <el-col :span="12" class="creator-info">
                </el-col>
            </el-row>
            <el-tabs v-model="editableTabsValue" active-name="方案1" type="card" editable closable @edit="handleTabsEdit">
                <el-tab-pane
                        :key="item.name"
                        v-for="(item, index) in editableTabs"
                        :label="item.title"
                        :name="item.title">
                    <div class="offer-container">
                        <el-tabs v-model="countryTabs" type="border-card" :active-name="countryTabs">
                            <template v-for="(v,k) in item.order">
                                <el-tab-pane :label="v.city.name" :name="v.city.name+k">
                                    <city  :i="index" :k="k" :order="v" :params="editableTabs[index].params[k]"></city>
                                </el-tab-pane>
                            </template>
                        </el-tabs>
                        <computed  :params="item.params" :index="index" :cost="item.cost"></computed>
                        <provider :provider="item.provider" :index="index"></provider>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <el-row style="height: 40px" v-if="offlineRole.CHECK_PRICE" type="flex">
                <el-col :span="9">
                    <h4>用户政策</h4>
                </el-col>
            </el-row>
            <userchannel v-if="offlineRole.CHECK_PRICE&&userchannel" :userchannel="userchannel"> </userchannel>
            <history :history="editableTabs"> </history>
        </div>
        <div class="offer-detail-booking" v-if="offlineRole.CONFIRM_PRICE&&orderstatus>4">
            <template v-for="(o,p) in editableTabs">
                <el-row style="height: 40px" type="flex">
                    <el-col :span="9">
                        <h4>方案{{p*1+1}}</h4>
                    </el-col>
                    <el-col :span="12" class="creator-info">
                    </el-col>
                </el-row>
                <bookoffer :tab="o" :index="p" v-if="o"></bookoffer>
            </template>
        </div>
    </div>
</template>
<script>
    import ajax from '@local/common/ajax';
    import city from './cards/OfferDetailCard';
    import computed from './cards/ComputedCard';
    import provider from './cards/ProviderCard';
    import userchannel from './cards/UserChannel';
    import history from  './cards/HistoryOffer';
    import bookoffer from './cards/BookingOfferCard'
    export default{
        components: {
            city: city,
            computed: computed,
            provider: provider,
            userchannel:userchannel,
            history:history,
            bookoffer:bookoffer
        },
        data(){
            return {
                tabnum: 1,
                editableTabsValue: null,
                editableTabs: [{
                    title: '方案1',
                    name: '方案1',
                    params: []
                }],
                orderdata: null,
                countryTabs: null,
                offergroup: 1,
                paramsModel:null,
                userchannel:{
                    payment:[
                        {
                            dead_line:new Date,
                            price:0
                        }
                    ],
                    cancel:'',
                    explain:'',
                    type:'全款'
                }
            }
        },
        methods: {
            /*/解析订单/*/
            loadorder(id){
                let vm = this;
                ajax.post('/api/team/order/detail', {
                    id: id
                }, {lock: false}).then(
                    data => {
                        vm.orderdata = data.detail;
                        if(data.detail.price){
                            vm.editableTabs=[];
                            data.detail.price.cases.forEach(
                                (a,b)=>{
                                    vm.editableTabs.push({
                                        title: '方案'+(b*1+1),
                                        name: '方案'+(b*1+1),
                                        order: data.detail.requirement.stay_details,
                                        params: a.price,
                                        provider:{
                                            booking_channel:a.sp_policy.booking_channel,
                                            payment_policy:a.sp_policy.payment,
                                            cancel_policy:a.sp_policy.cancel,
                                            remark:a.sp_policy.remark
                                        },
                                        cost:{cost: 0, bk: 0, quoted: 0}
                                    })
                                    vm.countryTabs = data.detail.requirement.stay_details[0].city.name + '0'
                                }
                            )
                        }else{
                            vm.editableTabs = [{
                                title: '方案1',
                                name: '方案1',
                                order: data.detail.requirement.stay_details,
                                params: [],
                                provider:{
                                    booking_channel:'',
                                    payment_policy:'',
                                    cancel_policy:'',
                                    remark:''
                                }
                            }]
                            vm.countryTabs = data.detail.requirement.stay_details[0].city.name + '0'
                            data.detail.requirement.stay_details.forEach(
                                (v, k) => {
                                    vm.editableTabs[0].params.push({city: '', hotel: '', rooms: []})
                                    v.rooms.forEach(
                                        (l, y) => {
                                            vm.editableTabs[0].params[k].rooms.push({price:{cost: 0, bk: 0, quoted: 0}})
                                        }
                                    )
                                }
                            )
                            vm.paramsModel=JSON.parse(JSON.stringify(vm.editableTabs[0].params));
                        }
                    }
                )
            },
            handleTabsEdit(targetName, action){
                if (action === 'add') {
                    this.addtab();
                } else if (action === 'remove') {
                    this.closetab(targetName)
                }

            },
            /*添加方案*/
            addtab(){
                this.tabnum = this.editableTabs.length + 1;
                this.editableTabs.push({
                    title: '方案' + this.tabnum,
                    name: '方案' + this.tabnum,
                    order: JSON.parse(JSON.stringify(this.orderdata.requirement.stay_details)),
                    params: JSON.parse(JSON.stringify(this.paramsModel)),
                    provider:{
                        booking_channel:'',
                        payment_policy:'',
                        cancel_policy:'',
                        remark:''
                    }
                })
            },
            /*删除方案*/
            closetab(targetName){
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab && targetName != '方案1') {
                            activeName = nextTab.name;
                            tabs.splice(index, 1);
                            this.tabnum -= 1;
                            tabs.forEach(
                                (v, k) => {
                                    v.title = '方案' + (k + 1);
                                    v.name = '方案' + (k + 1);
                                }
                            )
                        }
                    }
                });
            }
        },
        computed: {
            offlineRole(){
                return this.$store.getters.offlineRole;
            },
            orderstatus(){
                if(this.orderdata){
                    return this.orderdata.status;
                }else {
                    return 0
                }

            }
        },
        mounted(){
            this.loadorder(this.$route.params.orderid);
        }
    }
</script>