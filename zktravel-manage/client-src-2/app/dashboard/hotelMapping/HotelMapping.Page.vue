<template>
    <div class="hotel-map">
        <el-tabs :active-name="$route.params.provider" @tab-click="changetab">
            <el-select  clearable v-model="matchlv" placeholder="等级" @change="changelv">

                <template v-for="(v,k) of lvmap">
                    <el-option :value="v" :label="k"></el-option>
                </template>
            </el-select>
            <el-tab-pane label="Miki" name="mk">
                <el-table
                        :data="currentdata"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="levelDesc"
                            label="匹配等级">
                    </el-table-column>
                    <el-table-column
                            prop="zkName"
                            label="SAI名">
                        <template scope="scope">
                            <a @click="shotel(scope.row.zkId)">
                                {{scope.row.zkName}}
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="spName"
                            label="miki名">
                        <template scope="scope">
                            <a @click="photel(scope.row.spId)">
                                {{scope.row.spName}}
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="zkAddress"
                            label="SAI地址">
                    </el-table-column>
                    <el-table-column
                            prop="spAddress"
                            label="miki地址">
                    </el-table-column>
                    <el-table-column
                            prop="zkPhone"
                            label="SAI电话">
                    </el-table-column>
                    <el-table-column
                            prop="spPhone"
                            label="miki电话">
                    </el-table-column>
                    <el-table-column
                            prop="spGPS"
                            label="坐标地址">
                        <template scope="scope">
                            <el-button @click="openmap(scope.$index, currentdata)" type="text" size="small">
                                查看
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="bookingUrl" label="Booking链接">
                        <template scope="scope">
                            <el-button @click="openbooking(scope.$index, currentdata)" type="text" size="small">
                                查看
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="250">
                        <template scope="scope">
                            <el-button size="small" type="info" @click="matcherconfirm(scope.$index, scope.row)">匹配
                            </el-button>
                            <el-button size="small" type="success" @click="updatesqlconfirm(scope.$index, scope.row)">入库
                            </el-button>
                            <el-button size="small" type="danger" @click="invdataconfirm(scope.$index, scope.row)">置为无效
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination layout="total, prev, pager, next, jumper" @current-change="changepage" :total="total"
                               :page-size="currentlimit"></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="维途" name="vt">
                <div class="table-container">
                    <el-table
                            :data="currentdata"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="level"
                                label="匹配等级">
                        </el-table-column>
                        <el-table-column
                                prop="zkName"
                                label="SAI名">
                            <template scope="scope">
                                <a @click="shotel(scope.row.zkId)">
                                    {{scope.row.zkName}}
                                </a>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="spName"
                                label="维途名">
                            <template scope="scope">
                                <a @click="photel(scope.row.spId)">
                                    {{scope.row.spName}}
                                </a>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="zkAddress"
                                label="SAI地址">
                        </el-table-column>
                        <el-table-column
                                prop="spAddress"
                                label="维途地址">
                        </el-table-column>
                        <el-table-column
                                prop="zkPhone"
                                label="SAI电话">
                        </el-table-column>
                        <el-table-column
                                prop="spPhone"
                                label="维途电话">
                        </el-table-column>
                        <el-table-column
                                prop="spGPS"
                                label="坐标地址">
                            <template scope="scope">
                                <el-button @click="openmap(scope.$index, currentdata)" type="text" size="small">
                                    查看
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bookingUrl" label="Booking链接">
                            <template scope="scope">
                                <el-button @click="openbooking(scope.$index, currentdata)" type="text" size="small">
                                    查看
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="250">
                            <template scope="scope">
                                <el-button size="small" type="info" @click="matcherconfirm(scope.$index, scope.row)">匹配
                                </el-button>
                                <el-button size="small" type="success" @click="updatesqlconfirm(scope.$index, scope.row)">入库
                                </el-button>
                                <el-button size="small" type="danger" @click="invdataconfirm(scope.$index, scope.row)">置为无效
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination layout="total, prev, pager, next, jumper" @current-change="changepage" :total="total"
                                   :page-size="currentlimit"></el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="道旅" name="dl">
                <el-table
                        :data="currentdata"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="levelDesc"
                            label="匹配等级">
                    </el-table-column>
                    <el-table-column
                            prop="zkName"
                            label="SAI名">
                        <template scope="scope">
                            <a @click="shotel(scope.row.zkId)">
                                {{scope.row.zkName}}
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="spName"
                            label="道旅名">
                        <template scope="scope">
                            <a @click="photel(scope.row.spId)">
                                {{scope.row.spName}}
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="zkAddress"
                            label="SAI地址">
                    </el-table-column>
                    <el-table-column
                            prop="spAddress"
                            label="道旅地址">
                    </el-table-column>
                    <el-table-column
                            prop="zkPhone"
                            label="SAI电话">
                    </el-table-column>
                    <el-table-column
                            prop="spPhone"
                            label="道旅电话">
                    </el-table-column>
                    <el-table-column
                            prop="spGPS"
                            label="坐标地址">
                        <template scope="scope">
                            <el-button @click="openmap(scope.$index, currentdata)" type="text" size="small">
                                查看
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="bookingUrl" label="Booking链接">
                        <template scope="scope">
                            <el-button @click="openbooking(scope.$index, currentdata)" type="text" size="small">
                                查看
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="250">
                        <template scope="scope">
                            <el-button size="small" type="info" @click="matcherconfirm(scope.$index, scope.row)">匹配
                            </el-button>
                            <el-button size="small" type="success" @click="updatesqlconfirm(scope.$index, scope.row)">入库
                            </el-button>
                            <el-button size="small" type="danger" @click="invdataconfirm(scope.$index, scope.row)">置为无效
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination layout="total, prev, pager, next, jumper" @current-change="changepage" :total="total"
                               :page-size="currentlimit"></el-pagination>
            </el-tab-pane>
            <!--            <el-tab-pane label="Booking" name="bk">
                            <el-table
                                    :data="currentdata"
                                    border
                                    style="width: 100%">
                                <el-table-column
                                        prop="level"
                                        label="匹配等级">
                                </el-table-column>
                                <el-table-column
                                        prop="spName"
                                        label="SAI名">
                                </el-table-column>
                                <el-table-column
                                        prop="zkName"
                                        label="miki名">
                                </el-table-column>
                                <el-table-column
                                        prop="spAddress"
                                        label="SAI地址">
                                </el-table-column>
                                <el-table-column
                                        prop="zkAddress"
                                        label="miki地址">
                                </el-table-column>
                                <el-table-column
                                        prop="spPhone"
                                        label="SAI电话">
                                </el-table-column>
                                <el-table-column
                                        prop="zkPhone"
                                        label="miki电话">
                                </el-table-column>
                                <el-table-column
                                        prop="spGPS"
                                        label="坐标地址">
                                </el-table-column>
                            </el-table>
                            <el-pagination  layout="prev,pager,next"  @current-change="currentpage" :total="total" :page-size="15"></el-pagination>
                        </el-tab-pane>-->
        </el-tabs>
        <el-dialog
                title="提示"
                :visible.sync="showdialog1"
                size="tiny">
            <span>确认是否匹配？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closedialog">取 消</el-button>
                <el-button type="primary" @click="matcheraction">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="showdialog2"
                size="tiny">
            <span>确认是否入库？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closedialog">取 消</el-button>
                <el-button type="primary" @click="updatesqlaction">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="showdialog3"
                size="tiny">
            <span>确认是否置为无效？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closedialog">取 消</el-button>
                <el-button type="primary" @click="invdataaction">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="酒店详情" :visible.sync="showdialog4">
            <photel class="hotel"  v-if="showdialog4" :idp="pid" :sp="sp"></photel>
        </el-dialog>
        <el-dialog title="酒店详情" :visible.sync="showdialog5">
            <shotel class="hotel"  v-if="showdialog5" :ids="sid"></shotel>
        </el-dialog>
        <el-dialog title="强制入库" :visible.sync="showdialog6" size="tiny">
            <span>确认强制入库？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closedialog">取 消</el-button>
                <el-button type="primary" @click="strictupdate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
    .el-table{
        margin-bottom: 110px;
    }
    .el-tabs{
        .el-select{
            height: 50px;
            padding-left: 20px;
        }
    }
    .el-pagination {
        text-align: right;
        background: #fff;
        padding-right: 36px;
        height: 50px;
        padding-top: 10px;
        width: 87.5%;
        position: fixed;
        bottom: 0px;
        right: 0px;
    }

</style>

<script>
    import ajax  from '@local/common/ajax';
    import Photel from './Photel';
    import Shotel from './Shotel';
    export default{
        components: {
            photel: Photel,
            shotel: Shotel
        },
        data(){
            return {
                tableData: '',
                params: {
                    page: 1,
                    limit: 7
                },
                currentpage: 1,
                currentlimit: 10,
                currentdata: [],
                total: 100,
                showdialog1: false,
                showdialog2: false,
                showdialog3: false,
                showdialog4: false,
                showdialog5:false,
                showdialog6:false,
                actionarr:{},
                sp:'',
                pid:'',
                sid:'',
                photelisTrue:false,
                shotelisTrue:false,
                matchlv:19,
                lvmap:{
                    ALL:19,
                    L0_nt:0,
                    L0_na:1,
                    L1_n:2,
                    L1_t:3,
                    L1_a:4,
                    L1_na:5,
                    L2_nt:6,
                    L2_ta:7,
                    L3_n:8,
                    L3_t:9,
                    L3_a:10,
                    L4_nc:11,
                    L4_tc:12,
                    L4_ac:13,
                    L4_wc:14,
                    L4_n:15,
                    L4_t:16,
                    L4_a:17,
                    L4_w:18
                }
            }

        },
        methods: {
            photel(pid) {
                this.showdialog4=true;
                this.pid = pid;
                this.sp= this.$route.params.provider;
            },
            shotel(sid) {
                this.showdialog5=true;
                this.sid = sid;
            },
            getTableData(){

            },
            changelv(lv){
                this.matchlv=lv;
                this.loadtable();
            },
            changetab(tab){
                this.$router.push({name: 'dashboard-hotel-mapping', params: {provider: tab.name}});
                this.loadtable();
            },
            loadtable(){
                let vm = this;
                ajax.post('/api/mapping/query',{sp:vm.$route.params.provider}).then(data => {
                    let arr = [];
                    vm.currentpage = 1;
                    vm.tableData = Object.assign({}, data.list);

                    for (let num = (vm.currentpage - 1) * vm.currentlimit; num < vm.currentlimit * vm.currentpage; num++) {
                        if (vm.tableData[num]) {
                            if(vm.matchlv==19){
                                arr.push(vm.tableData[num]);
                            }else if(vm.matchlv==vm.tableData[num].levelRank){
                                arr.push(vm.tableData[num]);
                            }
                        }
                    }
                    arr.sort(function (a,b) {
                        return a.levelRank-b.levelRank
                    })
                    vm.currentdata = arr;
                    vm.total = data.list.length;
                })
            },
            changepage(page){
                let vm = this;
                vm.currentpage = page;
                let arr = [];
                for (let num = (vm.currentpage - 1) * vm.currentlimit; num < vm.currentlimit * vm.currentpage; num++) {
                    if (vm.tableData[num]) {
                        arr.push(vm.tableData[num]);

                    }
                }
                arr.sort(function (a,b) {
                    return a.levelRank-b.levelRank
                })
                vm.currentdata = arr;
            },
            matcherconfirm(index, row){
                this.actionarr=row;
                this.showdialog1=true;
            },
            matcheraction(){
                ajax.post('/api/mapping/map ',{spId:this.actionarr.spId,zkId:this.actionarr.zkId,sp:this.$route.params.provider}).then(data=>{
                    if(data.code===0){
                        this.actionarr={};
                        this.showdialog1=false;
                        this.loadtable();
                        this.$totast.show('匹配成功');
                    }else{
                        this.$totast.show(data.msg)
                    }

                })
            },
            updatesqlconfirm(index, row){
                this.actionarr=row;
                this.showdialog2=true;
            },
            updatesqlaction(){
                ajax.post('/api/mapping/insert',{spId:this.actionarr.spId,sign:this.actionarr.sign,sp:this.$route.params.provider}).then(data=>{
                    if(data.code==0){
                        this.actionarr={};
                        this.showdialog2=false;
                        this.loadtable();
                        this.$toast.show('入库成功')
                    }else if (data.code==1){
                        this.showdialog2=false;
                    }else if (data.code==2){
                        this.showdialog2=false;
                    }else if (data.code==3){
                        this.$toast.show('Map信息已经更新')
                        this.showdialog2=false;
                        this.showdialog6=true;
                    }

                })
            },
            strictupdate(){
                ajax.post('/api/mapping/insert',{spId:this.actionarr.spId,sign:0,sp:this.$route.params.provider}).then(data=>{
                    if(data.code==0){
                        this.actionarr={};
                        this.showdialog6=false;
                        this.loadtable();
                        this.$toast.show('入库成功')
                    }else {
                        this.showdialog2=false;
                        this.$toast.show('入库失败')
                    }
                })
            },
            invdataconfirm(index,row){
                this.actionarr=row;
                this.showdialog3=true;
            },
            invdataaction(){
                ajax.post('/api/vt-mapping/invalid',{spId:this.actionarr.spId,zkId:this.actionarr.zkId}).then(data=>{
                    if(data.code===0){
                        this.actionarr={};
                        this.showdialog3=false;
                        this.loadtable()
                    }

                })
            },
            openmap(index, row){
                let params = [];
                params.push([row[index].spGPS, row[index].spName]);
                params.push([row[index].zkGPS, row[index].zkName]);
                window.open(`/pages/location.html?${encodeURIComponent(JSON.stringify(params))}`);
            },
            openbooking(index, row){
                window.open(row[index].bookingUrl);
            },
            closedialog(){
                this.showdialog1=false;
                this.showdialog2=false;
                this.showdialog3=false;
                this.showdialog4=false;
                this.showdialog5=false;
                this.showdialog6=false;
            }
        },
        computed: {},
        mounted(){
            if (this.$route.params.provider) {
                this.loadtable();
            }

        },
        beforeRouteEnter (to, from, next) {
            if (!to.params.provider) {
                next({name: 'dashboard-hotel-mapping', params: {provider: 'vt'}});
            } else {
                next();
            }
        }
    }
</script>