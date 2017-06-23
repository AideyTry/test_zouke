<style lang="scss" scoped>
    .box-card {
        .el-row {
            padding: 10px 0;
        }
        .red {
            color: #f00;
        }
        .iconSize{
            display:inline-block;
            font-size:30px;
        }
    }
</style>
<template>
    <div>
        <div>
            <el-button v-if="(isTrue_supplier==false)" type="text" @click="addSupplier()">添加供应商</el-button>
            <el-card v-if="isTrue_supplier" class="box-card">
                <el-row type="flex">
                    <el-col :span="1"></el-col>
                    <el-col :span="2">
                        <strong>采购渠道<i class="red">*</i></strong>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-model="item.supplier_name" filterable placeholder="请选择" @change="supplierChange">
                            <el-option
                                    v-for="item in channel"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1"></el-col>
                    <el-col :span="2">
                        <strong>入住编号<i class="red">*</i></strong>
                    </el-col>
                    <el-col :span="13">
                        <el-input v-model="item.at_number" type="text"></el-input>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="1"><span  class="el-icon-circle-close iconSize" @click="colseCard()"></span></el-col>
                </el-row>
                <div v-for="(item,index) in item.rooms">
                    <RoomsCard :item="item" :index="index"></RoomsCard>
                </div>
                <el-row type="flex">
                    <el-col :span="1">

                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" @click="addRooms(item.rooms)">+添加房型</el-button>
                    </el-col>
                </el-row>
            </el-card>
        </div>
    </div>

</template>
<script>
    import RoomsCard from './RoomsCard'
    export default{
        props: ["currentData","item"],
        data(){
            return {
                index:null,
                isTrue_supplier:false,
                channel: [{
                    value: 'GTA',
                    label: 'GTA'
                }, {
                    value: 'miki',
                    label: 'miki'
                }],
                rooms: [{
                    value: 'Single',
                    label: 'Single'
                }, {
                    value: 'Double',
                    label: 'Double'
                }, {
                    value: 'Triple',
                    label: 'Triple'
                }, {
                    value: 'Twins',
                    label: 'Twins'
                }, {
                    value: 'Other',
                    label: 'Other'
                }],
                gender: [
                    {
                        value: '选项1',
                        label: '男'
                    }, {
                        value: '选项2',
                        label: '女'
                    }
                ],
                value1: '',
                value2: '',
                value3: '',
                inputs: {
                    atNumber: '',
                    roomDescription: '',
                    familyName: '',
                    familyName_en: '',
                    name: '',
                    name_en: ''
                }
            }
        },
        components:{
            RoomsCard:RoomsCard
        },
        computed: {
            selectRoom(){
                return this.$store.getters.selectRoom;
            }
        },
        methods: {
            colseCard(){
                this.isTrue_supplier=!this.isTrue_supplier;
            },
            addSupplier(){
//                this.index=index;
                this.isTrue_supplier=!this.isTrue_supplier;
            },
            closeSupplier(){

            },
            addRooms(rooms){
                rooms.push(                 {
                    type:'Single',
                    number:1,
                    room_description:'',
                    peoples:
                        {
                            name:'',
                            family_name:'',
                            gender:''
                        }

                });
            },
            supplierChange(value){
                this.$commit("supplier",value);
            }
        },
        mounted(){
        }
    }
</script>