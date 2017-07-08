<style lang="scss" scoped>
    .offer-detail-container {
        width: 100%;
    }
    .offer-container {
        height: 100%;
    }
    .finish-time{
        width:180px;
        height:20px;
        background-color: red;
        border:1px solid red;
        border-radius: 10px;
        color:#fff;
        line-height: 20px;
        text-align: center;
        font-size: 15px;
    }
</style>
<template>
    <div>
        <div v-if="offlineRole.UPDATE_PRICE||offlineRole.CHECK_PRICE" v-show="this.status>=2" class="offer-detail-container">
            <el-row style="height: 40px" type="flex">
                <el-col :span="2">
                    <h4>报价详情</h4>
                </el-col>
                <el-col :span="10" class="creator-info">
                    <div v-show="this.status>2" class="finish-time">{{booking_dead_line}} 前完成</div>
                </el-col>
                <el-col :span="4" :offset="8">
                    <div v-show="this.status>2">报价：{{booking_user}}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" :offset="22">
                    <div>
                      <el-button
                        size="small"
                        type="primary"
                        @click="addtab">
                        添加方案
                      </el-button>
                    </div>
                </el-col>
            </el-row>
            <el-tabs v-model="editableTabsValue" type="card" closable
                            @tab-remove="closetab">
                <el-tab-pane
                        :key="item.name"
                        v-for="(item, index) in editableTabs"
                        :label="item.title"
                        :name="item.title">
                    <div class="offer-container">
                        <el-tabs v-model="countryTabs" type="border-card" :active-name="countryTabs">
                            <el-tab-pane v-for="(v,k) in item.order" :key="k" :label="v.city.name" :name="v.city.name+k">
                                <city :i="index" :k="k" :order="v" :params="editableTabs[index].params[k]" :cash="cash"></city>
                            </el-tab-pane>
                        </el-tabs>
                        <computed  :params="item.params" :index="index" :order="item.order" :cash="cash" :night="night"></computed>
                        <el-row>
                             <el-col>
                                 <h4>供应商政策</h4>
                             </el-col>
                        </el-row>
                        <provider :provider="item.provider" :index="index" v-if="item.provider"></provider>
                        <el-row style="height: 40px" v-if="offlineRole.CHECK_PRICE" type="flex">
                            <el-col :span="9">
                                <h4>用户政策</h4>
                            </el-col>
                        </el-row>
                        <userchannel :user_policy="item.user_policy" :key="index" v-if="offlineRole.CHECK_PRICE&&item.user_policy"></userchannel>
                    </div>
                </el-tab-pane>
            </el-tabs>

           <el-row style="height: 40px" type="flex">
                <el-col :span="9">
                    <h4>历史报价</h4>
                </el-col>
            </el-row>
            <history :history="orderdata" @useHistory="useHistory" v-if="orderdata"></history>
        </div>
        <div class="offer-detail-booking" v-if="offlineRole.CONFIRM_PRICE&&orderstatus>4">
            <div v-for="(o,p) in editableTabs" :key="p">
                <el-row style="height: 40px" type="flex">
                    <el-col :span="9">
                        <h4>方案{{p*1+1}}</h4>
                    </el-col>
                    <el-col :span="12" class="creator-info">
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="showDialog(p)">点击获取二维码</el-button>
                    </el-col>
                </el-row>
                <bookoffer
                    @clear-select="selectCase=-1"
                    @selected="selectCase=p"
                    :select="selectedRow" :offer="o" :index="p" v-if="o" :orderdata="orderdata" :disable='selectCase!==-1&&selectCase!==p'> 
                </bookoffer>
            </div>
        </div>

        <el-dialog title="二维码" :visible.sync="dialogTableVisible" type="flex" class="showDialog">
            <div style="width: 200px;height:200px;" size="small">
                <img :src="`/api/team/price/confirm-qr?id=${$route.params.orderid}&index=${qrIndex}`">
            </div>
        </el-dialog>
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
                dialogTableVisible: false,
                qrIndex:0,
                //bookoffer
                selectCase:-1,
                selectedRow: [],
                night:'',
                cash:'',
                status:""-0,
                booking_dead_line:'',
                booking_user:'',
                tabnum: 1,
                editableTabsValue: '方案1',
                editableTabs: [{
                    title: '方案1',
                    name: '方案1',
                    params: [],
                    user_policy:{
                        payment:[{ dead_line:new Date,price:0}],
                        cancel:'',
                        explain:'',
                        type:'全款'
                        }
                    }],
                orderdata: null,
                countryTabs: null,
                offergroup: 1,
                history:''
            }
        },
        watch:{
            selectCase(v){
                this.$emit('changeSelectCase', v);
            },
            selectedRow(v){
                this.$emit('changeSelectIndex', v);
            }
        },
        created(){
            this.$emit('changeSelectCase', this.selectCase);
            this.$emit('changeSelectIndex', this.selectedRow);
        },
        methods: {
            /*/解析订单/*/
            loadorder(id){
                let vm = this;
                const defaultExplain='以上价格含税含早，不含前台可能收取的城市税\n大系统房未做预留，仅为报价，最终确认以实际预订为准';

                ajax.post('/api/team/order/detail', {
                    id: id
                }, {lock: false}).then(
                    data => {
                        this.booking_dead_line=new Date(data.detail.booking_dead_line).format('YYYY.MM.DD HH:MM');
                        this.status = data.detail.status;
                        this.currency = data.detail.requirement.currency;
                        if(this.currency=='GBP'){
                            this.cash="￡";
                        }else if(this.currency=="EUR"){
                            this.cash="€";
                        }
                        if(this.status-0>2){
                             this.booking_user = data.detail.booking_user.name;
                        }
                        if(data.detail.price){
                            vm.editableTabs=[];
                            data.detail.price.cases.forEach(
                                (a,b)=>{
                                    for(let p of a.price){
                                        for(let room of p.rooms){
                                            if(!room.actual_room_name) room.actual_room_name = []
                                        }
                                    };
                                    vm.editableTabs.push({
                                        title: '方案'+(b*1+1),
                                        name: '方案'+(b*1+1),
                                        order: data.detail.requirement.stay_details, //
                                        params: a.price,
                                        provider:{
                                            booking_channel:a.sp_policy.booking_channel,
                                            payment_policy:a.sp_policy.payment,
                                            cancel_policy:a.sp_policy.cancel,
                                            remark:a.sp_policy.remark
                                        },
                                        user_policy: a.user_policy? {
                                            payment:[{ dead_line:new Date,price:0}],
                                            cancel: a.user_policy.cancel,
                                            explain: a.user_policy.explain||defaultExplain,
                                            type: a.user_policy.type
                                            }:{ payment:[], cancle:'',explain:defaultExplain,type:'' },
                                        cost:{cost: '', bk: '', quoted: ''}
                                    })
                                    vm.countryTabs = data.detail.requirement.stay_details[0].city.name + '0'

                                })
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
                                },
                                user_policy:{
                                    payment:[],
                                    cancel: '',
                                    explain: defaultExplain,
                                    type: ''
                                    }
                            }]
                            vm.countryTabs = data.detail.requirement.stay_details[0].city.name + '0'
                            data.detail.requirement.stay_details.forEach(
                                (v, k) => {
                                    vm.editableTabs[0].params.push({city: null, hotel: null, rooms: []})
                                    v.rooms.forEach(
                                        (l, y) => {
                                            vm.editableTabs[0].params[k].rooms.push({price:{cost:'', bk: '', quoted: ''}, actual_room_name:[]})
                                        }
                                    )
                                }
                            )
                        }
                        vm.orderdata = data.detail;
                    }
                )
            },
            /*添加方案*/
            addtab(){
                this.tabnum = this.editableTabs.length + 1;
                const pricecase = JSON.parse(JSON.stringify(this.editableTabs[this.editableTabs.length-1]));
                pricecase.title = '方案' + this.tabnum,
                pricecase.name = '方案' + this.tabnum
                this.editableTabsValue = pricecase.title;
                this.editableTabs.push(pricecase);
            },
            /*删除方案*/
            closetab(targetName){
                let tabs = this.editableTabs;
                const index = parseInt(targetName.substr(2));
                let activeName = this.editableTabsValue;
                if(index!==1) this.editableTabsValue = '方案'+(index-1);
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
            },
            /*应用历史*/
            useHistory(history){
                let vm=this;
                vm.history=history;
                if(history.disable_apply){
                    vm.$notify({
                        title: '应用历史失败',
                        message: '需求已被修改，无法应用此历史报价',
                        type: 'danger'
                    });
                }else {
                    history.cases.forEach(
                        (a,b)=>{
                            vm.editableTabs[b].params=a.price;
                            vm.editableTabs[b].provider=a.sp_policy;
                        }
                    )
                    vm.$notify({
                        title: '应用历史成功',
                        message: '请修改部分信息后，重新提交',
                        type: 'success'
                    });
                }
            },
            showDialog(p){
                this.dialogTableVisible=true;
                this.qrIndex = p;
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

            },
            userInfo(){
                return this.$store.getters.userInfo;
            }
        },
        mounted(){
            this.loadorder(this.$route.params.orderid);
        }
    }
</script>