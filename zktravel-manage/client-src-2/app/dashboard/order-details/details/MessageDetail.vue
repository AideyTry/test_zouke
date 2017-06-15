<style lang="scss" scoped>
    .message{
        .msgH{
            position:relative;
            strong{
                font-size:20px;
                font-family:Microsoft YaHei;
            }
            .el-button{
                position:absolute;
                right:0;
            }
        }
        .msgMain{
            margin-top:20px;
        }
        .fixed{
            position:fixed;
            top:0;
            left:0;
        }
        .msgList{
            .avatar{
                display:inline-block;
                width:50px;
                height:50px;
                border:1px solid #999;
                border-radius:50%;
                background-color: #999;
                position:relative;
                top:10px;
            }
            span{
                padding-left:15px;
                display:inline-block;
                font-size:16px;
                font-family:Microsoft YaHei;
            }
            .line{
                width:100%;
                margin-top:5px;
                border-top:1px solid #ccc;
            }
        }
        .el-pagination{
            background-color: #fff;
            text-align:right;

        }
    }
</style>

<template>
    <div class="message">
        <div>
            <el-row type="flex" class="msgH">
                <el-col :span="2">
                    <strong>留言:</strong>
                </el-col>
                <el-col :span="20">

                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="btn()">添加留言</el-button>
                </el-col>
            </el-row>
            <el-row type="flex" class="msgMain">
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
                    <span>{{item}}</span>
                    <el-row type="flex">
                        <el-col :span="1"></el-col>
                        <el-col :span="22"><p class="line"></p></el-col>
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