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
                    <span class="avatar">{{item.newType}}</span>
                    <span>{{item.time}}</span>
                    <span>{{item.user.name}}</span>
                    <span>{{item.content}}</span>
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
    import ajax from '@local/common/ajax';
    export default{
        props:['orderData'],
        data(){
            return {
                msg:'',
                newMsg:'',
                list:[],
                currentList:[],
                total:null,
                pageNum:1,
                pageSize:10,
                logs:{
                    type:'',
                    time:'',
                    user:{
                        id:'',
                        name:'',
                        role:'',
                        roleName:''
                    }
                },
                types:{
                    system:'系',
                    user:'头'
                },
                content:{
                    dispatchRequirement:"发布需求",
                    updateRequirement:"修改需求",
                    commitPrice:"提交报价",
                    rejectPrice:"未通过报价",
                    resolvePrice:"通过报价",
                    agreePrice:"同意报价"
                }
            }
        },
        computed:{
            orderId(){
                return this.$route.params.orderid;
            }
        },
        methods:{
            loading(id){
                let arr=[];
//                console.log("orderData=",this.orderData);
                ajax.post("/api/team/order/detail",{id:id},{lock:false}).then(json=>{
//                    console.log("logs=",json.detail.logs);
                    this.logs=json.detail.logs;
//                    console.log("this.logs=",this.logs);
                    this.pageNum=1;
                    this.list=this.logs;
                    this.list.reverse();
//                    console.log("this.list=",this.list);
                    for(let v of this.list){
                        if(typeof(v.user)=='undefined'||!v.user){
                            v.user='';
                        }
//                        console.log(v.user);
                        switch(v.type.split(":")[0]){
                            case "system":
                                v.newType=this.types.system;
                                break;
                            case "user":
                                v.newType=this.types.user;
                        }
                        switch(v.type.split(":")[1]){
                            case "dispatch-requirement":
                                v.content=this.content.dispatchRequirement;
                                break;
                            case "update-requirement":
                                v.content=this.content.updateRequirement;
                                break;
                            case "commit-price":
                                v.content=this.content.commitPrice;
                                break;
                            case "reject-price":
                                v.content=this.content.rejectPrice;
                                break;
                            case "resolve-price":
                                v.content=this.content.resolvePrice;
                                break;
                            case "agree-price":
                                v.content=this.content.agreePrice;
                                break;
                            case "message":
                                v.content=v.message;
                                break;
                        }

                    }
                    for(let num=(this.pageNum-1)*this.pageSize;num<this.pageNum*this.pageSize;num++){
                        if(this.list[num]){
                            arr.push(this.list[num]);
                        }
                    }
                    this.currentList=Object.assign({},arr);
                    this.total=this.list.length;
                })
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
                    ajax.post("/api/team/order/log",{id:this.orderId,message:this.newMsg},{lock:false}).then(json=>{
                        this.loading(this.orderId);
                    })
//                    this.loading();
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
            this.loading(this.$route.params.orderid);
        },
        updated(){

        }
    }
</script>