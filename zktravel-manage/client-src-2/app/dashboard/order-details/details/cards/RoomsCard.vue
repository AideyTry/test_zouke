<style lang="scss" scoped>
    .rooms{
        .line{
            width:100%;
            height:1px;
            border-top:1px solid #ccc;
        }
        .room{
            margin-top:10px;
        }
        .red{
            color:#f00;
        }
    }
</style>
<template>
    <div class="rooms">
        <div v-for="(item,indexOf) in items.rooms" :key="indexOf">
            <el-row type="flex">
                <el-col :span="1"></el-col>
                <el-col :span="2">
                    <strong>选择房型<i class="red">*</i></strong>
                </el-col>
                <el-col :span="3">
                    <el-select v-model="item.type" filterable placeholder="请选择" @change="selectChange($event,item)">
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
                    <el-button style="color:#99A9BF" size="mini" @click="roomSubtract(item,indexOf)">-</el-button>
                    <span>{{item.number}}</span>
                    <el-button style="background-color:#fff;:#20A0FF" size="mini" @click="roomAdd(item,indexOf)">+</el-button>
                </el-col>
                <el-col :span="14">
                    <el-input v-model="item.roomDescription"
                              type="textarea" :rows="2"
                              placeholder="填写房间描述">

                    </el-input>
                </el-col>
            </el-row>
            <PeoplesCard :peoples="item.peoples" :add="add" :subtract="subtract" :num="indexOf" :room="item"></PeoplesCard>
            <el-row type="flex" class="room">
                <el-col :span="1">
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="addRooms(indexOf)" size="mini">+添加房型</el-button>
                </el-col>
                <el-col :span="1"></el-col>
                <el-col :span="3">
                    <el-button type="primary" v-if="items.rooms.length>1" @click="deleteRooms(indexOf)" size="mini">+删除房型</el-button>
                </el-col>
            </el-row>
            <el-row type="flex">
                <p class="line"></p>
            </el-row>
        </div>

    </div>
</template>
<script>
    import PeoplesCard from './PeoplesCard'
    export default{
        props:["items"],
        data(){
            return {
                rooms: [{
                    value: 'Single',
                    label: 'Single'
                }, {
                    value: 'Double',
                    label: 'Double'
                }, {
                    value: 'Twin',
                    label: 'Twin'
                }, {
                    value: 'Triple',
                    label: 'Triple'
                }, {
                    value: 'Other',
                    label: 'Other'
                }],
                value2: '',
                value3: '',
                newIndex:1,
//                selectNewRoom:'Single',
                add:null,
                subtract:null

            }
        },
        components:{
            PeoplesCard:PeoplesCard
        },
        computed:{
            selectRoom(){
                return this.$store.getters.selectRoom;
            }
        },
        methods:{
            addRooms(index){
                this.items.rooms.push({
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


                });
            },
            deleteRooms(index){
                this.items.rooms.splice(index,1);
            },
            selectChange(value,item){
                item.type=value;
                item.number=1;
                let number=item.peoples.length;
                switch(item.type){
                    case "Single":
                        item.peoples.splice(0,number,{
                            name:'',
                            familyName:'',
                            gender:''
                        });
                        break;
                    case "Double":
                        item.peoples.splice(0,number,
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
                        item.peoples.splice(0,number,
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
                    case "Twin":
                        item.peoples.splice(0,number,
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
                        item.peoples.splice(0,number,
                            {
                                name:'',
                                familyName:'',
                                gender:''
                            }
                        );
                        break;
                }

            },
            roomAdd(room,index){
                room.number++;
                switch(room.type){
                    case "Single":
                        room.peoples.push({
                            name:'',
                            family_name:'',
                            gender:''
                        });
                        break;
                    case "Double":
                        room.peoples.push(
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
                        room.peoples.push(
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
                    case "Twin":
                        room.peoples.push(
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
                        room.peoples.push(
                            {
                                name:'',
                                family_name:'',
                                gender:''
                            }

                        );
                        break;
                }
            },
            roomSubtract(room,index){
                if(room.number>1){
                   room.number--;
                    switch(room.type){
                        case "Single":
                            room.peoples.splice(room.peoples.length-(room.number*1),1)
                            break;
                        case "Double":
                            room.peoples.splice(room.peoples.length-(room.number*2),2)
                            break;
                        case "Triple":
                            room.peoples.splice(room.peoples.length-(room.number*3),3)
                            break;
                        case "Twin":
                            room.peoples.splice(room.peoples.length-(room.number*2),2)
                            break;
                        case "Other":
                            room.peoples.splice(room.peoples.length-(room.number*1),1)
                            break;
                    }
                }
            }

        },
        watch:{
            deleteIsTrue(){
                if(this.items.rooms.length==1){
                    this.deleteIsTrue=false;
                }else{
                    this.deleteIsTrue=true;
                }
            }
        },
        mounted(){
            if(this.items.rooms.length==1){
                this.deleteIsTrue=false;
            }else{
                this.deleteIsTrue=true;
            }
        }
    }
</script>