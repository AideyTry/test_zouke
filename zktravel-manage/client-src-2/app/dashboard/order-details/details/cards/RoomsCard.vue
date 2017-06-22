<style lang="scss" scoped>

</style>
<template>
    <div>
        <el-row type="flex">
            <el-col :span="1"></el-col>
            <el-col :span="2">
                <strong>选择房型<i class="red">*</i></strong>
            </el-col>
            <el-col :span="3">
                <el-select v-model="item.type" filterable placeholder="请选择" @change="selectChange">
                    <el-option
                            v-for="item in rooms"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="2">
                <el-button style="color:#99A9BF" size="mini" @click="subtract">-</el-button>
                <span>{{item.number}}</span>
                <el-button style="background-color:#fff;:#20A0FF" size="mini" @click="add">+</el-button>
            </el-col>
            <el-col :span="13">
                <el-input v-model="item.roomDescription" type="text"></el-input>
            </el-col>
        </el-row>
        <template v-for="(v,index) in item.peoples">
            <el-row type="flex">
                <el-col :span="1"></el-col>
                <el-col :span="3">
                    <strong>入住人{{index+1}}</strong>
                    <span>姓</span>
                </el-col>
                <el-col :span="5">
                    <el-input v-model="v.name" placeholder="填写英文或拼音"></el-input>
                </el-col>
                <el-col :span="1"></el-col>
                <el-col :span="1">
                    <span>名</span>
                </el-col>
                <el-col :span="5">
                    <el-input v-model="v.family_name" placeholder="填写英文或拼音"></el-input>
                </el-col>
                <el-col :span="1"></el-col>
                <el-col :span="1">
                    <span>性别</span>
                </el-col>
                <el-col :span="6">
                    <el-select v-model="v.gender" filterable placeholder="请选择" @change="selectGender">
                        <el-option
                                v-for="item in gender"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
        </template>
    </div>
</template>
<script>
    export default{
        props:["item","index"],
        data(){
            return {
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
                        value: 'male',
                        label: '男'
                    }, {
                        value: 'female',
                        label: '女'
                    }
                ],
                value2: '',
                value3: '',
                selectNewRoom:'Single'
            }
        },
        computed:{
            selectRoom(){
                return this.$store.getters.selectRoom;
            }
        },
        methods:{
            selectChange(value){
                this.selectNewRoom=value;
                switch(value){
                    case "Single":
                        this.item.number=1;
                        this.item.peoples=[];
                        this.item.peoples.push({
                        name:'',
                        familyName:'',
                        gender:''
                        });
                        break;
                    case "Double":
                        this.item.number=1;
                        this.item.peoples=[];
                        this.item.peoples.push(
                        {
                            name:'',
                            familyName:'',
                            gender:""
                        },{
                            name:'',
                            familyName:'',
                            gender:''
                        }
                        );
                        break;
                    case "Triple":
                        this.item.number=1;
                        this.item.peoples=[];
                        this.item.peoples.push(
                            {
                                name:'',
                                familyName:'',
                                gender:''
                            },{
                                name:'',
                                familyName:'',
                                gender:''
                            },{
                                name:'',
                                familyName:'',
                                gender:''
                            }
                        );
                        break;
                    case "Twins":
                        this.item.number=1;
                        this.item.peoples=[];
                        this.item.peoples.push(
                            {
                                name:'',
                                familyName:'',
                                gender:''
                            },{
                                name:'',
                                familyName:'',
                                gender:''
                            }
                        );
                        break;
                    case "Other":
                        this.item.number=1;
                        this.item.peoples=[];
                        this.item.peoples.push(
                            {
                                name:'',
                                familyName:'',
                                gender:''
                            }
                        );
                        break;
                }
            },
            subtract(){

                if(this.item.number>1){
                    this.item.number--;
                    switch(this.selectNewRoom){
                        case "Single":
                            this.item.peoples.pop()
                            break;
                        case "Double":
                            this.item.peoples.splice(this.item.peoples.length-(this.item.number*2),2)
                            break;
                        case "Triple":
                            this.item.peoples.splice(this.item.peoples.length-(this.item.number*3),3)
                            break;
                        case "Twins":
                            this.item.peoples.splice(this.item.peoples.length-(this.item.number*2),2)
                            break;
                        case "Other":
                            this.item.peoples.pop()
                            break;
                    }
                }

            },
            add(){
               this.item.number++;
               switch(this.selectNewRoom){
                   case "Single":
//                       this.item.number=1;
                   this.item.peoples.push({
                           name:'',
                           family_name:'',
                           gender:''
                       });
                       break;
                   case "Double":
//                       this.item.number=1;
                       this.item.peoples.push(
                           {
                               name:'',
                               family_name:'',
                               gender:''
                           },{
                               name:'',
                               family_name:'',
                               gender:''
                           }

                       );
                       break;
                   case "Triple":
//                       this.item.number=1;
                       this.item.peoples.push(
                           {
                               name:'',
                               family_name:'',
                               gender:''
                           },{
                               name:'',
                               family_name:'',
                               gender:''
                           },{
                               name:'',
                               family_name:'',
                               gender:''
                           }

                       );
                       break;
                   case "Twins":
//                       this.item.number=1;
                       this.item.peoples.push(
                           {
                               name:'',
                               family_name:'',
                               gender:''
                           },{
                               name:'',
                               family_name:'',
                               gender:''
                           }

                       );
                       break;
                   case "Other":
//                       this.item.number=1;
                       this.item.peoples.push(
                           {
                               name:'',
                               family_name:'',
                               gender:''
                           }

                       );
                       break;
               }
            },
            selectGender(value){

            }

        }
    }
</script>