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
        <el-row type="flex" class="search-group">
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
                            <a @click="cellClick(scope.row.orderId)">
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
                            prop="status"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="报价员">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="订单金额">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="publishTime"
                            label="发布日期">
                    </el-table-column>
                </el-table>
            </el-col>
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
            selectState:0,
            isTrue:true,
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
            status:1,
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
            ajax.post('/api/offline-order/query',{status:this.status}).then(json=>{
                this.arr=json.list;
                    for(let num=(this.pageNum-1)*this.pageSize;num<this.pageSize;num++){
                        if(this.arr[num]){
                            newArr.push(this.arr[num]);
                        }
                    }

                    this.currentData=newArr;
                    this.total=this.arr.length;
                for(let obj of this.currentData){
                    if(obj.status===1){
                        obj.status="待发布";
                    }else if(obj.status===2){
                        obj.status="待分配"
                    }else if(obj.status===3){
                        obj.status="待分配"
                    }else if(obj.status===4){
                        obj.status="待分配"
                    }else if(obj.status===5){
                        obj.status="待分配"
                    }else if(obj.status===6){
                        obj.status="待分配"
                    }else if(obj.status===7){
                        obj.status="待分配"
                    }else if(obj.status===8){
                        obj.status="待分配"
                    }else if(obj.status===9){
                        obj.status="待分配"
                    }else if(obj.status===10){
                        obj.status="待分配"
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
                this.status=3;
            }else if(this.$route.path=="/dashboard/my-publish/wait-confirmed"){
                this.status=4;
            }else if(this.$route.path=="/dashboard/my-publish/wait-gathering"){
                this.status=5;
            }else if(this.$route.path=="/dashboard/my-publish/house-wait-distribution"){
                this.status=6;
            }else if(this.$route.path=="/dashboard/my-publish/wait-control-house"){
                this.status=7;
            }else if(this.$route.path=="/dashboard/my-publish/control-house"){
                this.status=8;
            }else if(this.$route.path=="/dashboard/my-publish/require-invoice"){
                this.status=9;
            }else if(this.$route.path=="/dashboard/my-publish/nonEffective-require"){
                this.status=10;
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
                this.status=3;
                this.loadTable();
            }else if(this.$route.path=="/dashboard/my-publish/wait-confirmed"){
                this.status=4;
                this.loadTable();
            }else if(this.$route.path=="/dashboard/my-publish/wait-gathering"){
                this.status=5;
                this.loadTable();
            }else if(this.$route.path=="/dashboard/my-publish/house-wait-distribution"){
                this.status=6;
                this.loadTable();
            }else if(this.$route.path=="/dashboard/my-publish/wait-control-house"){
                this.status=7;
                this.loadTable();
            }else if(this.$route.path=="/dashboard/my-publish/control-house"){
                this.status=8;
                this.loadTable();
            }else if(this.$route.path=="/dashboard/my-publish/require-invoice"){
                this.status=9;
                this.loadTable();
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
        cellClick(orderId){
            this.$router.push({name:"dashboard-order-detail",params:{orderid:orderId}});
        }
    },
    mounted(){
        this.loadTable();
        if(this.publish.isTrue){
            this.value2=this.sorts[0].value;
        }else{
            this.value2='';
        }
    },
    created(){
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