<style lang="scss" scoped>
    .dashboard{
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        background-color: #eef1f6;
        overflow: hidden;
        .header{
            height: 60px;
            line-height: 60px;
            border-left:0px;
            .main-title{
                background-color: #324157;
                color:#fff;
                text-align: center;
            }
            .title{
                text-indent: 30px;
            }
            .user-info{
                i{
                    font-size: 14px;
                }
                span{
                    margin-right: 5px;
                }
            }
            .log-out{
                color: #178fe5;
                cursor: pointer;
            }
        }
        .main-body{
            height: 100%;
            .el-menu{
                height: 100%;
            }
            .content{
                border-top: 1px solid #ccc;
                overflow-y: scroll;
            }
        }

    }
    
</style>
<template>
    <div class="dashboard">
<!--         <h2>酒店基础数据</h2> -->
<!--        <header class="headers">
            <div class="pCenter">
                <span class="glyphicon glyphicon-user"></span>
                <span>当前用户</span>
                <strong>{{userInfo.name}}</strong>
                <span class="logout" >    退出
                </span>  
            </div>
             
        </header>-->
        <el-row class="header" type="flex">
            <el-col :span="4">
                <i></i>
                <div class="main-title">
                    超级行程单
                </div>
            </el-col>
            <el-col :span="16">
                <div class="title">
                    待入库
                </div>
            </el-col>
            <el-col :span="4">
                <div class="user-info">
                    <i class="el-icon-message"></i>
                    <span>用户名</span>
                    <span>Uklili</span>
                    <span class="log-out" @pointerup.prevent="logout">退出</span>
                </div>
            </el-col>
        </el-row>
        <el-row class="main-body" type="flex">
            <el-col :span="4" class="nav-menu">
                <el-menu :default-active="selected"   class="nav-memu" theme="dark" @select="handleSelect" @open="handleOpen" @close="handleClose">
                    <el-menu-item index="home">
                            主页
                    </el-menu-item>
                    <el-submenu index="dashboard">
                        <template slot="title">酒店数据管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="dashboard-hotel-mapping">
                                待入库
                            </el-menu-item>
                            <el-menu-item index="dashboard-zkhotel">
                                已入库
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="2">导航二</el-menu-item>
                    <el-menu-item index="3">导航三</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20" class="content">
                <router-view></router-view>
            </el-col>
        </el-row>
        
<!--         <router-view name="dashboard-hotel-mapping"><router-view>
        <router-view name="dashboard-zkhotel"><router-view> -->
    </div>
</template>

<script>
    import auth from 'root/utils/auth';
    export default {
        /*增加data*/
        data(){
            return {
                isActive:true,
                isTrue:false,
                flag:0,
                bgIstrue:{
                    mpIstrue:false,
                    zkIstrue:false
                }
            }
        },
        computed:{
            userInfo(){
                return this.$store.state.userInfo;
            },
            selected(){
                    return this.$route.name
            }
        },
        methods:{
            logout(){
                this.$dispatch('logout').then(result=>{
                    this.$router.replace(auth.loginRoute(this.$route));
                })
            },
            /*增加方法*/
            hotel(){
                this.flag++;
                if(this.flag%2!=0){
                    this.isTrue=true;
                    this.bgIstrue.mpIstrue=true;
                    this.$router.push({name:'dashboard-hotel-mapping-vt'});
                }else{
                    this.isTrue=false;
                    this.$router.push({name:'dashboard'})
                  }
                
            },
            stock:function(){
                // this.$router.push({name:'dashboard-hotel-mapping'});
                this.$router.push({path:'/dashboard/hotel-mapping/vt'});
                this.bgIstrue.mpIstrue=true;
                this.bgIstrue.zkIstrue=false;
            },
            SAI:function(){
                // this.$router.push({name:'dashboard-hotel-mapping-dl'});
                this.$router.push({path:'/dashboard/zkhotel'});
                this.bgIstrue.zkIstrue=true;
                this.bgIstrue.mpIstrue=false;
            },
            handleOpen(key, keyPath) {

            },
            handleClose(key, keyPath) {

            },
            handleSelect(index){
                this.$router.push({name:index})
            }
        },
        mounted(){

        }
    }
</script>