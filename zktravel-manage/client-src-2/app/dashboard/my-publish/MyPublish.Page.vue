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
                <!--<CommonTable :currentData="dataList" :isTrue="isNo"></CommonTable>-->
                <el-table
                        :data="currentData"
                        border
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
                            prop=""
                            label="下单时间">
                    </el-table-column>
                    <el-table-column
                            prop="priority"
                            label="优先级">
                    </el-table-column>
                    <el-table-column
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
            tableData:[
                {orderNum:"订单号1",userName:"用户名1",orderTime:"下单时间1",orderStatus:"状态1",priority:"优先级1"},
                {orderNum:"订单号2",userName:"用户名2",orderTime:"下单时间2",orderStatus:"状态2",priority:"优先级2"},
                {orderNum:"订单号3",userName:"用户名3",orderTime:"下单时间3",orderStatus:"状态3",priority:"优先级3"},
                {orderNum:"订单号4",userName:"用户名4",orderTime:"下单时间4",orderStatus:"状态4",priority:"优先级4"},
                {orderNum:"订单号5",userName:"用户名5",orderTime:"下单时间5",orderStatus:"状态5",priority:"优先级5"},
                {orderNum:"订单号6",userName:"用户名6",orderTime:"下单时间6",orderStatus:"状态6",priority:"优先级6"},
                {orderNum:"订单号7",userName:"用户名7",orderTime:"下单时间7",orderStatus:"状态7",priority:"优先级7"},
                {orderNum:"订单号8",userName:"用户名8",orderTime:"下单时间8",orderStatus:"状态8",priority:"优先级8"},
                {orderNum:"订单号9",userName:"用户名9",orderTime:"下单时间9",orderStatus:"状态9",priority:"优先级9"},
                {orderNum:"订单号10",userName:"用户名10",orderTime:"下单时间10",orderStatus:"状态10",priority:"优先级10"},
                {orderNum:"订单号11",userName:"用户名11",orderTime:"下单时间11",orderStatus:"状态11",priority:"优先级11"},
                {orderNum:"订单号12",userName:"用户名12",orderTime:"下单时间12",orderStatus:"状态12",priority:"优先级12"},
                {orderNum:"订单号13",userName:"用户名13",orderTime:"下单时间13",orderStatus:"状态13",priority:"优先级13"},
                {orderNum:"订单号14",userName:"用户名14",orderTime:"下单时间14",orderStatus:"状态14",priority:"优先级14"},
                {orderNum:"订单号15",userName:"用户名15",orderTime:"下单时间15",orderStatus:"状态15",priority:"优先级15"},
                {orderNum:"订单号16",userName:"用户名16",orderTime:"下单时间16",orderStatus:"状态16",priority:"优先级16"},
                {orderNum:"订单号17",userName:"用户名17",orderTime:"下单时间17",orderStatus:"状态17",priority:"优先级17"},
                {orderNum:"订单号18",userName:"用户名18",orderTime:"下单时间18",orderStatus:"状态18",priority:"优先级18"},
                {orderNum:"订单号19",userName:"用户名19",orderTime:"下单时间19",orderStatus:"状态19",priority:"优先级19"},
                {orderNum:"订单号20",userName:"用户名20",orderTime:"下单时间20",orderStatus:"状态20",priority:"优先级20"},
                {orderNum:"订单号21",userName:"用户名21",orderTime:"下单时间21",orderStatus:"状态21",priority:"优先级21"},
                {orderNum:"订单号22",userName:"用户名22",orderTime:"下单时间22",orderStatus:"状态22",priority:"优先级22"},
                {orderNum:"订单号23",userName:"用户名23",orderTime:"下单时间23",orderStatus:"状态23",priority:"优先级23"},
                {orderNum:"订单号24",userName:"用户名24",orderTime:"下单时间24",orderStatus:"状态24",priority:"优先级24"},
                {orderNum:"订单号25",userName:"用户名25",orderTime:"下单时间25",orderStatus:"状态25",priority:"优先级25"},
                {orderNum:"订单号26",userName:"用户名26",orderTime:"下单时间26",orderStatus:"状态26",priority:"优先级26"},
                {orderNum:"订单号27",userName:"用户名27",orderTime:"下单时间27",orderStatus:"状态27",priority:"优先级27"},
                {orderNum:"订单号28",userName:"用户名28",orderTime:"下单时间28",orderStatus:"状态28",priority:"优先级28"},
                {orderNum:"订单号29",userName:"用户名29",orderTime:"下单时间29",orderStatus:"状态29",priority:"优先级29"},
                {orderNum:"订单号30",userName:"用户名30",orderTime:"下单时间30",orderStatus:"状态30",priority:"优先级30"},
                {orderNum:"订单号31",userName:"用户名31",orderTime:"下单时间31",orderStatus:"状态31",priority:"优先级31"},
                {orderNum:"订单号32",userName:"用户名32",orderTime:"下单时间32",orderStatus:"状态32",priority:"优先级32"},
                {orderNum:"订单号33",userName:"用户名33",orderTime:"下单时间33",orderStatus:"状态33",priority:"优先级33"}

            ],
            tableList:[
                {orderNum:"1",userName:"1",orderTime:"1",orderStatus:"1",priority:"1"},
                {orderNum:"2",userName:"2",orderTime:"2",orderStatus:"2",priority:"2"}
            ],
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
            let arr=[];
            let newArr=[];
            ajax.post('/api/offline-order/query',{status:this.status}).then(json=>{
                newArr=json.list;
                    for(let num=(this.pageNum-1)*this.pageSize;num<this.pageSize;num++){
                        if(newArr[num]){
                            arr.push(newArr[num]);
                        }
                    }

                    this.currentData=arr;
                    this.total=newArr.length;
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
            let arr=[];
            for(let num=(this.pageNum-1)*this.pageSize;num<this.pageNum*this.pageSize;num++){
                if(this.tableData[num]){
                    arr.push(this.tableData[num]);
                }
            }
            this.currentData=arr;
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
                this.$router.push({name:"dashboard-my-publish",params:{status:"wait-publish"}});
                this.status=1;
                if(this.selectState===1){
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