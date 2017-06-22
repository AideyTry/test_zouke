<style lang="scss" scoped>

</style>
<template>
    <div>
        <el-form v-for="(v,index) in item" :key="v.suppliers" :model="myItem">
                <el-row type="flex">
                    <el-col :span="2"><strong>酒店<i class="red">*</i></strong></el-col>
                    <el-col :span="8">
                        <el-autocomplete
                                size="small"
                                v-model="v.hotel_name"
                                :fetch-suggestions="searchHotel"
                                placeholder="请输入关键字选择"
                                @select="selectHotel"
                        >

                        </el-autocomplete>
                    </el-col>
                    <el-col :span="3">
                        <span>B评分:</span>
                        <span>{{}}</span>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="text" class="delete" @click="deleteHotel()">删除</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="text" @click="addHotel()">添加酒店</el-button>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="2">
                        <strong>备注确认号:</strong>
                    </el-col>
                    <el-col :span="10">
                        <el-input v-model="v.remark_confirm" placeholder="确认用户备注后，填写相应的编号，用';'隔开">

                        </el-input>
                    </el-col>
                </el-row>
                <!--添加供应商start-->
                <el-row type="flex" >
                    <el-col :span="20">
                        <!--<el-button v-if="(isTrue_supplier==false)" type="text" @click="addSupplier()">添加供应商</el-button>-->
                        <AddSupplierCard  :currentData="params" :item="v.suppliers"></AddSupplierCard>
                    </el-col>
                </el-row>
                <!--添加供应商end-->
        </el-form>
    </div>
</template>
<script>
    import ajax from '@local/common/ajax';
    import debounce from 'lodash/debounce';
    import AddSupplierCard from './AddSupplierCard'
    export default{
        props:["items","item","index","params","orders"],
        data(){
            return{
                myItem:this.items,
                hotel:'',
                hotelFlag:false,
                input:''
            }
        },
        components:{
            AddSupplierCard:AddSupplierCard
        },
        computed:{
            count(){
                return this.$store.getters.count;
            }
        },
        methods:{

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
                let arr = item.item;
                this.hotelflag = true;
                this.myItem.hotel = arr;

            },
            /*search end*/
            addHotel(){
                this.item.push({
                    hotel_name:'',
                    remark_confirm:'',
                    suppliers:[
                        {
                            supplier_name:'',
                            at_number:'',
                            room_type:'',
                            status:1,
                            rooms:[
                                {
                                    type:'Single',
                                    number:1,
                                    room_description:'',
                                    peoples:[
                                        {
                                            name:'',
                                            family_name:'',
                                            gender:''
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                });
                this.$commit("addCount");
            },
            deleteHotel(){
                if(this.item.length>1){
                    this.item.pop();
                    this.$commit("deleteCount");
                }
            }
        },
        watch:{
            hotel(val){
                if (!this.hotelflag) {
                    this.myItem.hotel = {name: val, custom: true}
                }
                this.hotelflag = false;
            }
        },
        created(){
//            if (this.items.hotel.name) {
//                this.hotel = this.items.hotel.name;
//            }
        }
    }
</script>