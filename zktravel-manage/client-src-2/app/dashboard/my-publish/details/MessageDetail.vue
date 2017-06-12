<style lang="scss" scoped>
    .message{
        .fixed{
            position:fixed;
            top:0;
            left:0;
        }
        .msgList{
            /*height:50px;*/
            .avatar{
                display:inline-block;
                width:30px;
                height:30px;
                border:1px solid #999;
                border-radius:50%;
                background-color: #999;
            }
            .line{
                width:100%;
                /*display:inline-block;*/
                /*height:1px;*/
                margin-top:5px;
                border:1px solid #ccc;
            }
        }
        .el-pagination{
            background-color: #fff;
            text-align:right;
            position:fixed;
            bottom:0;
            right:5%;
        }
    }
</style>

<template>
    <div class="message">
        <div>
            <el-row type="flex">
                <el-col :span="3">
                    <strong>留言</strong>
                </el-col>
                <el-col :span="12">

                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="btn()">添加留言</el-button>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="24">
                    <p></p>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="24">
                    <el-input
                            type="textarea"
                            :rows="8"

                            v-model="msg"
                    >

                    </el-input>
                </el-col>
            </el-row>
        </div>

        <el-row type="flex" id="row">
            <el-col :span="24">
                <p></p>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="24">
                <div v-for="item of currentList" :key="item" class="msgList">
                    <span class="avatar"></span>
                    <span style="display:inline-block">{{item}}</span>
                    <el-row type="flex">
                        <el-col :span="24"><p class="line"></p></el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-pagination layout="total, prev, pager, next, jumper" @current-change="changePage" :total="total"
                       :page-size="pageSize">

        </el-pagination>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                msg:'',
                newMsg:'',
                list:[],
                currentList:[],
                total:null,
                pageNum:1,
                pageSize:10
            }
        },
        computed:{

        },
        methods:{
            loading(){
                let arr=[];
                this.pageNum=1;
                for(let num=(this.pageNum-1)*this.pageSize;num<this.pageNum*this.pageSize;num++){
                    if(this.list[num]){
                        arr.push(this.list[num]);
                    }
                }
                this.currentList=Object.assign({},arr);
                this.total=this.list.length;
            },
            btn(){
                this.newMsg=this.msg;
                if(this.newMsg.length===0){
                    this.$message({
                        message:"请输入内容！",
                        type:'error'
                    })
                }else {
                    this.msg='';
                    this.list.unshift(this.newMsg);
                    console.log(this.list);
                    this.loading();
                }


            },
            changePage(page){
                let arr=[];
                this.pageNum=page;
                for(let num=(this.pageNum-1)*this.pageSize;num<this.pageNum*this.pageSize;num++){
                    if(this.list[num]){
                        arr.push(this.list[num]);
                    }
                }
                this.currentList=arr;

            }

        },

        mounted(){
            this.loading();
        },
        updated(){

        }


    }
</script>