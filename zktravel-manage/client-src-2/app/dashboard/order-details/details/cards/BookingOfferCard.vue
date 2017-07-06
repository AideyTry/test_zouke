<style lang="scss">
    .el-table{
        .cell{
            .el-row{
                line-height: 40px;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .booking-offer{
        background: #E5E9F2;
        padding: 20px 10px;
        font-size: 15px;
        margin-bottom: 20px;
        border-radius: 5px;
        .computed{
            height: 40px;
            line-height: 40px;
        }
    }
</style>
<template>
    <div class="booking-offer">
    <el-table
            :data="tabledata"
            border
            style="width: 100%"
            ref= multipleSelection
            @selection-change="handleSelectionChange"
    >
        <el-table-column
                label="入住/离店">
            <template scope="scope">
                <span>{{scope.row.check_in}}/{{scope.row.check_out}}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="城市">
            <template scope="scope">
                <span>{{scope.row.city.name}}</span>
            </template>
        </el-table-column>
        <el-table-column
                prop="address"
                label="酒店">
            <template scope="scope">
                <span>{{scope.row.params.hotel.name||scope.row.hotel.name}}</span>
            </template>
        </el-table-column>
        <el-table-column
                prop="address"
                label="星级">
        </el-table-column>
        <el-table-column
                prop="address"
                label="B评分">
        </el-table-column>
        <el-table-column
                label="房型">
            <template scope="scope">
                <template v-for="(v,k) in scope.row.rooms">
                    <el-row style="height: 40px">
                        {{v.type}}
                    </el-row>
                </template>
            </template>
        </el-table-column>
        <el-table-column
                label="每晚均价">
            <template scope="scope">
                <template v-for="(v,k) in scope.row.params.rooms">
                    <el-row style="height: 40px">
                        {{v.price.quoted}}
                    </el-row>
                </template>
            </template>
        </el-table-column>
        <el-table-column
                label="Booking">
            <template scope="scope">
                <template v-for="(v,k) in scope.row.params.rooms">
                    <el-row style="height: 40px">
                        {{v.price.bk}}
                    </el-row>
                </template>
            </template>
        </el-table-column>
        <el-table-column
                label="间">
            <template scope="scope">
                <template v-for="(v,k) in scope.row.rooms">
                    <el-row style="height: 40px">
                        {{v.number}}
                    </el-row>
                </template>
            </template>
        </el-table-column>
        <el-table-column
                prop="num"
                label="晚">
        </el-table-column>
        <el-table-column
                label="总价">
            <template scope="scope">
                <template v-for="(v,k) in scope.row.rooms">
                    <el-row style="height: 40px">
                        {{v.number*scope.row.params.rooms[k].price.quoted*scope.row.num}}
                    </el-row>
                </template>
            </template>
        </el-table-column>
        <el-table-column
                prop="address"
                label="Booking总价">
            <template scope="scope">
                <template v-for="(v,k) in scope.row.rooms">
                    <el-row style="height: 40px">
                        {{v.number*scope.row.params.rooms[k].price.bk*scope.row.num}}
                    </el-row>
                </template>
            </template>
        </el-table-column>
        <el-table-column
                prop="address"
                label="节省金额">
            <template scope="scope">
                <template v-for="(v,k) in scope.row.rooms">
                    <el-row style="height: 40px">
                        {{v.number*scope.row.params.rooms[k].price.bk*scope.row.num-v.number*scope.row.params.rooms[k].price.quoted*scope.row.num}}
                    </el-row>
                </template>
            </template>
        </el-table-column>
        <el-table-column
                type="selection"
                width="55"
                label=""
        >
        </el-table-column>
    </el-table>
     <div style="padding-top: 20px">
         <el-row class="computed">
             <el-col :span="5"><strong>总价：</strong>{{cost}} {{cash}}</el-col>
             <el-col :span="5"><strong>Booking：</strong>{{bk}} {{cash}}</el-col>
             <el-col :span="12"><strong>为您节省：</strong>{{bk-cost}} {{cash}}</el-col>
         </el-row>
         <el-row class="computed">
             <el-col :span="24"><strong>取消政策：</strong>{{tab.provider.cancel_policy||''}}</el-col>
         </el-row>
         <el-row class="computed">
             <el-col :span="24"><strong>付款政策：</strong>{{tab.provider.payment_policy||''}}</el-col>
         </el-row>
         <el-row class="computed">
             <el-col :span="24"><strong>报价说明：</strong>{{tab.provider.remark||''}} </el-col>
         </el-row>
     </div>

    </div>
</template>
<script>
    export default{
        props:['offer', 'index','orderdata'],
        data() {
            return {
                multipleSelection: []
            }
        },
        methods:{
            test(index){
                console.log(index)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val)

            }
        },
        computed:{
            tab(){
                return JSON.parse(JSON.stringify(this.offer));
            },
            tabledata(){
                let arr= this.tab.order||[]; //循环每个酒店住宿时间段
                let num=0;
                
                arr.forEach(
                    (v,k)=>{
                        v.num=new Date(v.check_in).daySpan(new Date(v.check_out)); //循环每个酒店所在的天数
                        v.params=this.tab.params[k];   //下标
                        let newArr = v.rooms;
                        newArr.forEach((a,b)=>{
                            v.number = a.number;  
                        });
                    }
                )
                return arr;
            },
            bk(){
                let arr= this.tab.order||[];
                let num=0;
                let bk=0;
                arr.forEach(
                    (v,k)=>{
                        v.params=this.tab.params[k];
                        v.params.rooms.forEach(
                            (a,b)=>{
                                bk+=a.price.bk*v.num*v.number;
                            }
                        )
                    }
                )
                return bk;
            },
            cost(){
                let arr= this.tab.order||[];
                let num=0;
                let cost=0;
                arr.forEach(
                    (v,k)=>{
                        v.params=this.tab.params[k];
                        v.params.rooms.forEach(
                            (a,b)=>{
                                cost+=a.price.quoted*v.num*v.number;
                            }
                        )
                    }
                )
                return cost;
            },
            cash(){
                if(!this.orderdata) return '';
                switch(this.orderdata.requirement.currency){
                    case 'GBP':
                        return "￡";
                    case 'EUR':
                        return "€"
                }
            }
        }
    }
</script>