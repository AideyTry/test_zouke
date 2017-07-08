<style lang="scss" scoped>
    .box-card {
        margin-top:15px;
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
            <el-card v-for="(v,index) in item" :key="v" class="box-card">
                <el-row type="flex">
                    <el-col :span="1"></el-col>
                    <el-col :span="2">
                        <strong>采购渠道<i class="red">*</i></strong>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-model="v.supplier_name" placeholder="请选择" @change="supplierChange">
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
                        <el-input v-model="v.at_number" type="text" placeholder="填写入住编号"></el-input>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="1"><span v-if="deleteIsTrue" class="el-icon-circle-close iconSize" @click="closeSupplier(index)"></span></el-col>
                </el-row>
                <!--<div v-for="(item,index) in v.rooms">-->
                    <RoomsCard :items="v" :index="index"></RoomsCard>
                <!--</div>-->
            </el-card>
            <el-button type="text" @click="addSupplier()">添加供应商</el-button>
        </div>
    </div>

</template>
<script>
    import RoomsCard from './RoomsCard';
    import spList from '../../sp-list';

    export default{
        props: ["currentData","item","orders"],
        data(){
            return {
                index:null,
                isTrue_supplier:false,
                deleteIsTrue:true,
                channel: spList.map(s=> ({ value:s.name, label:s.label }) ),
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
            },
            provider(){
                let arr=[];
                for(let { hotels } of this.orders){
                    for(let { suppliers } of hotels){
                        for(let { supplier_name: sp } of suppliers) {
                            if (!arr.includes(sp)) {
                                arr.push(sp);
                            }
                        }
                    }
                }
                return arr;
            }
        },
        methods: {
            addSupplier(){
                this.deleteIsTrue=true;
                this.item.push({
                    supplier_name:'',
                    at_number:'',
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
                });
            },
            closeSupplier(index){
                if(this.item.length>1){
                    if(this.item.length==2){
                        this.deleteIsTrue=false;
                    }
                    this.item.splice(index,1);
                    this.$store.dispatch("updateOrders",this.orders);
                }else{
                    this.deleteIsTrue=false;
                }
            },
            supplierChange(value){
                this.$commit("supplier",this.provider);
            }
        },
        watch:{
            deleteIsTrue(){
                if(this.item.length==1){
                    this.deleteIsTrue=false;
                }else{
                    this.deleteIsTrue=true;
                }
            }
        },
        mounted(){
            if(this.item.length==1){
                this.deleteIsTrue=false;
            }else{
                this.deleteIsTrue=true;
            }
        },
        beforeUpdate(){
            console.log("orders===",this.orders);
        }
    }
</script>