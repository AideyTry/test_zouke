<style lang="scss" scoped>
    .requireSelect{
        margin:10px 0;
        span{
            display:block;
            height:36px;
            line-height:36px;
            text-align:center;
            font-size:inherit;
        }
    }
    .search-group{
        margin:5px 0 20px 0;
        .goTime{
            height:36px;
            line-height:36px;
            text-align:center;
            font-size:inherit;
        }
    }

    .el-pagination {
        background-color: #fff;
        text-align: right;
        padding-right: 36px;
        height: 50px;
        padding-top: 10px;
        position: fixed;
        right: 0px;
        width: 87.5%;
        bottom: 0px;
        z-index: 3;
    }
    .table{
        a{
            cursor:pointer;
        }
    }
</style>

<template>
    <div>
        <el-row type="flex" class="requireSelect">
           <span>&nbsp&nbsp&nbsp&nbsp</span>
           <span>类别:&nbsp&nbsp</span>
            <el-col :span="3">
                <el-select v-model="value2" @change="changeSelect" @visible-change="changeClick">
                    <el-option
                            v-for="item in sorts"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-tabs v-if="isTrue"  v-model="$route.params.status" @tab-click="changeTabEffective">
            <el-tab-pane label="待发布" name="wait-publish"></el-tab-pane>
            <el-tab-pane label="待分配" name="wait-distribution"></el-tab-pane>
            <el-tab-pane label="报价中" name="quote"></el-tab-pane>
            <el-tab-pane label="报价待确认" name="wait-confirmed"></el-tab-pane>
            <el-tab-pane label="待收款" name="wait-gathering"></el-tab-pane>
            <el-tab-pane label="分房待确认" name="house-wait-distribution"></el-tab-pane>
            <el-tab-pane label="待控房" name="wait-control-house"></el-tab-pane>
            <el-tab-pane label="已控房" name="control-house"></el-tab-pane>
            <el-tab-pane label="需要开票" name="require-invoice"></el-tab-pane>
        </el-tabs>
        <el-tabs v-if="isTrue===false" type="border-card" v-model="$route.params.status" @tab-click="changeTabNoneffective">
            <el-tab-pane label="无效需求" name="nonEffective-require"></el-tab-pane>
        </el-tabs>
        <el-row type="flex" class="search-group" v-if="conceal">
            <span>&nbsp&nbsp&nbsp&nbsp</span>
            <el-col :span="6">
                <el-input
                        placeholder="搜索用户名/订单号/订房员/创建人"
                        icon="search"

                        :on-icon-click="handleIconClick">
                </el-input>
            </el-col>
            <el-col :span="3">
            </el-col>
            <span class="goTime">出发时间:&nbsp&nbsp</span>
            <el-col :span="3">

                <el-select v-model="value1" placeholder="全部">
                    <el-option
                            v-for="item in goOff"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                           >
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="24">
                <el-table
                        :data="currentData"
                        border
                        class="table"
                        style="width: 100%">
                    <el-table-column
                            prop="orderId"
                            label="订单号"

                    >
                        <template scope="scope">
                            <a @click="cellClick(scope.row.orderId,status)">
                                {{scope.row.orderId}}
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="用户名"
                    >
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="priority"
                            label="优先级">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="startDate"
                            label="出发时间">
                    </el-table-column>
                    <el-table-column
                            v-if="isTrue"
                            prop="newStatus"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            v-if="quoter"
                            :prop="'booking_user'&&'booking_user.name'"
                            label="报价员">
                    </el-table-column>
                    <el-table-column
                            v-if="orderAmount"
                            prop=""
                            label="订单金额">
                    </el-table-column>
                    <el-table-column
                            v-if="publishTimes"
                            sortable
                            prop="publishTime"
                            label="发布日期">
                    </el-table-column>
                </el-table>
                <div style="height:90px">

                </div>
            </el-col>
        </el-row>
        <el-row type="flex">
            <h1></h1>
        </el-row>
        <el-row type="flex">
            <el-col :span="14"></el-col>
            <el-col :span="10">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </el-col>
        </el-row>

    </div>
</template>
<script>
import ajax from '@local/common/ajax'
export default{
    data(){
        return{
            conceal:false,
            selectState:0,
            isTrue:true,
            quoter:true,
            orderAmount:true,
            publishTimes:true,
            value1:"",
            value2:"",
            goOff:[
                {}
            ],
            sorts:[
                {
                    value:"有效需求",
                    label:"有效需求"
                },
                {
                    value:"无效需求",
                    label:"无效需求"
                }
            ],
            state:{
                isTrue:true,
                wp:false,
                wd:false,
                q:false,
                wc:false,
                wg:false,
                hwd:false,
                wch:false,
                ch:false,
                ri:false
            },
            status:null,
            arr:[],

            pageNum:1,
            pageSize:15,
            total:0,
            currentData:[]
        }
    },
    computed:{
        dataList(){
            return this.currentData;
        },
        isNo(){
            return this.isTrue;
        },
        publish(){
            return this.$store.getters.publish;
        }
    },
    methods:{
        loadTable(){
            let newArr=[];
            ajax.post('/api/team/my-publish/query',{status:this.status}).then(json=>{
                this.arr=json.list;
                console.log(this.arr);
                    for(let num=(this.pageNum-1)*this.pageSize;num<this.pageSize;num++){
                        if(this.arr[num]){
                            newArr.push(this.arr[num]);
                        }
                    }
                    this.currentData=newArr;
                    this.total=this.arr.length;
                for(let obj of this.currentData){
                    if(obj.status===1){
                        this.quoter=false;
                        this.orderAmount=false;
                        this.publishTimes=false;
                        obj.newStatus="待发布";
                    }else if(obj.status===2){
                        this.quoter=false;
                        this.orderAmount=false;
                        this.publishTimes=true;
                        obj.newStatus="待分配"
                    }else if(obj.status===3){
                        this.quoter=true;
                        this.orderAmount=true;
                        this.publishTimes=true;
                        obj.newStatus="报价中"
                    }else if(obj.status===4){
                        this.quoter=true;
                        this.orderAmount=true;
                        this.publishTimes=true;
                        obj.newStatus="报价中"
                    }else if(obj.status===5){
                        this.quoter=true;
                        this.orderAmount=true;
                        this.publishTimes=true;
                        obj.newStatus="待报价确认"
                    }else if(obj.status===6){
                        this.quoter=true;
                        this.orderAmount=true;
                        this.publishTimes=true;
                        obj.newStatus="待收款"
                    }else if(obj.status===7){
                        this.quoter=true;
                        this.orderAmount=true;
                        this.publishTimes=true;
                        obj.newStatus="分房待确认"
                    }else if(obj.status===8){
                        this.quoter=true;
                        this.orderAmount=true;
                        this.publishTimes=true;
                        obj.newStatus="待控房"
                    }else if(obj.status===9){
                        this.quoter=true;
                        this.orderAmount=true;
                        this.publishTimes=true;
                        obj.newStatus="已控房"
                    }else if(obj.status===10){
                        this.quoter=true;
                        this.orderAmount=true;
                        this.publishTimes=true;
                        obj.status="需要开票"
                    }
                }
            })
        },
        voucherLoadding(){
            let newArr=[];
            ajax.post('/api/team/order/query-need-voucher',{page:0,pageSize:10}).then(json=>{
                this.arr=json.list;
                console.log(json);
                    for(let num=(this.pageNum-1)*this.pageSize;num<this.pageSize;num++){
                        if(this.arr[num]){
                            newArr.push(this.arr[num]);
                        }
                    }
                    this.currentData=newArr;
                    this.total=this.arr.length;
                for(let obj of this.currentData){
                    if(obj.status===1){
                        obj.newStatus="待发布";
                    }else if(obj.status===2){
                        obj.newStatus="待分配"
                    }else if(obj.status===3){
                        obj.newStatus="报价中"
                    }else if(obj.status===4){
                        obj.newStatus="报价中"
                    }else if(obj.status===5){
                        obj.newStatus="待报价确认"
                    }else if(obj.status===6){
                        obj.newStatus="待收款"
                    }else if(obj.status===7){
                        obj.newStatus="分房待确认"
                    }else if(obj.status===8){
                        obj.newStatus="待控房"
                    }else if(obj.status===9){
                        obj.newStatus="已控房"
                    }else if(obj.status===10){
                        obj.newStatus="需要开票"
                    }
                }
            })
        },
        updateTab(){
            if(this.$route.path=="/dashboard/my-publish/wait-publish"){
                this.status=1;
            }else if(this.$route.path=="/dashboard/my-publish/wait-distribution"){
                this.status=2;
            }else if(this.$route.path=="/dashboard/my-publish/quote"){
                this.status=[3,4];
            }else if(this.$route.path=="/dashboard/my-publish/wait-confirmed"){
                this.status=5;
            }else if(this.$route.path=="/dashboard/my-publish/wait-gathering"){
                this.status=6;
            }else if(this.$route.path=="/dashboard/my-publish/house-wait-distribution"){
                this.status=7;
            }else if(this.$route.path=="/dashboard/my-publish/wait-control-house"){
                this.status=8;
            }else if(this.$route.path=="/dashboard/my-publish/control-house"){
                this.status=9;
            }
        },
        changeTabEffective(tab){
            this.$router.push({name:"dashboard-my-publish",params:{status:tab.name}});
            if(this.$route.path=="/dashboard/my-publish/wait-publish"){
                this.status=1;
                this.loadTable();
            }else if(this.$route.path=="/dashboard/my-publish/wait-distribution"){
                this.status=2;
                this.loadTable();
            }else if(this.$route.path=="/dashboard/my-publish/quote"){
                this.status=[3,4];
                this.loadTable();
            }else if(this.$route.path=="/dashboard/my-publish/wait-confirmed"){
                this.status=5;
                this.loadTable();
            }else if(this.$route.path=="/dashboard/my-publish/wait-gathering"){
                this.status=6;
                this.loadTable();
            }else if(this.$route.path=="/dashboard/my-publish/house-wait-distribution"){
                this.status=7;
                this.loadTable();
            }else if(this.$route.path=="/dashboard/my-publish/wait-control-house"){
                this.status=8;
                this.loadTable();
            }else if(this.$route.path=="/dashboard/my-publish/control-house"){
                this.status=9;
                this.loadTable();
            }else if(this.$route.path=="/dashboard/my-publish/require-invoice"){
                this.voucherLoadding();
            }
        },
        changeTabNoneffective(tab){

        },
        handleIconClick(){

        },
        handleCurrentChange(page){
            this.pageNum=page;
            let newArr=[];
            for(let num=(this.pageNum-1)*this.pageSize;num<this.pageNum*this.pageSize;num++){
                if(this.arr[num]){
                    newArr.push(this.arr[num]);
                }
            }
            this.currentData=newArr;
        },
        changeClick(){
            this.selectState=1;
        },
        changeSelect(value){
            if(value=='无效需求'){
                this.isTrue=false;
                this.$router.push({name:"dashboard-my-publish",params:{status:"nonEffective-require"}});
                this.status=10;
                this.loadTable();
            }else if(value=="有效需求"){
                this.isTrue=true;
                this.status=1;
                if(this.selectState===1){
                    this.$router.push({name:"dashboard-my-publish",params:{status:"wait-publish"}});
                    this.loadTable();
                }
            }
        },
        cellClick(orderId,status){
            if(status instanceof Array){
                status=true;
            }
            switch(status){
                case 1:
                    this.$router.push({name:"dashboard-order-detail",params:{orderid:orderId,status:'require-node'}});
                    break;
                case 2:
                    this.$router.push({name:"dashboard-order-detail",params:{orderid:orderId,status:'require-node'}});
                    break;
                case true:
                    this.$router.push({name:"dashboard-order-detail",params:{orderid:orderId,status:'offer-node'}});
                    break;
                case 5:
                    this.$router.push({name:"dashboard-order-detail",params:{orderid:orderId,status:'offer-node'}});
                    break;
                case 6:
                    this.$router.push({name:"dashboard-order-detail",params:{orderid:orderId,status:'in-out'}});
                    break;
                case 7:
                    this.$router.push({name:"dashboard-order-detail",params:{orderid:orderId,status:'order-detail'}});
                    break;
                case 8:
                    this.$router.push({name:"dashboard-order-detail",params:{orderid:orderId,status:'order-detail'}});
                    break;
                case 9:
                    this.$router.push({name:"dashboard-order-detail",params:{orderid:orderId,status:'order-detail'}});
                    break;
                case 10:
                    this.$router.push({name:"dashboard-order-detail",params:{orderid:orderId,status:'ticket-node'}});
                    break;    
            }

        }
    },
    mounted(){
        this.loadTable();
        this.voucherLoadding();
        if(this.publish.isTrue){
            this.value2=this.sorts[0].value;
        }else{
            this.value2='';
        }
    },
    created(){
        this.updateTab();
    },
    beforeUpdate(){
        this.updateTab();
    }
//    beforeRouteEnter (to, from, next) {
//        if (!to.params.status) {
//
//            next({name: 'dashboard-my-publish', params: {provider: 'wait-publish'}});
//        } else {
//            next();
//        }
//    }
}
</script>