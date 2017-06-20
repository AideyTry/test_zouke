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
    <el-card class="box-card">
        <el-row type="flex">
            <el-col :span="1"></el-col>
            <el-col :span="2">
                <strong>采购渠道<i class="red">*</i></strong>
            </el-col>
            <el-col :span="3">
                <el-select v-model="value1" filterable placeholder="请选择">
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
                <el-input v-model="inputs.atNumber" type="text"></el-input>
            </el-col>
            <el-col :span="2"></el-col>
            <el-col :span="1"><span  class="el-icon-circle-close iconSize"></span></el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="1"></el-col>
            <el-col :span="2">
                <strong>选择房型<i class="red">*</i></strong>
            </el-col>
            <el-col :span="3">
                <el-select v-model="value2" filterable placeholder="请选择">
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
                <el-button style="color:#99A9BF" size="mini">-</el-button>
                <span>{{}}</span>
                <el-button style="background-color:#fff;:#20A0FF" size="mini">+</el-button>
            </el-col>
            <el-col :span="13">
                <el-input v-model="inputs.roomDescription" type="text"></el-input>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="1"></el-col>
            <el-col :span="3">
                <strong>入住人{{}}</strong>
                <span>姓</span>
            </el-col>
            <el-col :span="5">
                <el-input v-model="inputs.familyName" placeholder="填写英文或拼音"></el-input>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="1">
                <span>名</span>
            </el-col>
            <el-col :span="5">
                <el-input v-model="inputs.name" placeholder="填写英文或拼音"></el-input>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="1">
                <span>性别</span>
            </el-col>
            <el-col :span="6">
                <el-select v-model="value3" filterable placeholder="请选择">
                    <el-option
                            v-for="item in gender"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="1">

            </el-col>
            <el-col :span="3">
                <el-button type="primary">+添加房型</el-button>
            </el-col>

        </el-row>
    </el-card>
</template>
<script>
    export default{
        props: ["currentData"],
        data(){
            return {
                channel: [{
                    value: '选项1',
                    label: 'GTA'
                }, {
                    value: '选项2',
                    label: 'miki'
                }],
                rooms: [{
                    value: '选项1',
                    label: 'Single'
                }, {
                    value: '选项2',
                    label: 'Double'
                }, {
                    value: '选项3',
                    label: 'Triple'
                }, {
                    value: '选项4',
                    label: 'Twins'
                }, {
                    value: '选项5',
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
        computed: {},
        methods: {},
        mounted(){
            console.log("current==", this.currentData);
        }
    }
</script>