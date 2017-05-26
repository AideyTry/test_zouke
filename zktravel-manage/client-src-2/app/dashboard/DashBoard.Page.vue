<style lang="scss" scoped>
    .dashboard{
        width:100%;
        height:100%;
        h2{
            font-size:24px;
            font-weight:bold;
            font-style:normal;
            font-family:"微软雅黑"!important;
            color:#000;
            text-align:left;
            margin:20px 0;
        }
        /*头部start*/
        .headers{
            float:right;
            // box-sizing:border-box;
            width:85%;
            height:70px;
            font-size:22px;
            line-height:70px;
            color:#000;
            background-color:#fff; 
            border-top:1px solid #000;
            border-bottom:1px solid #000;
            border-right:none;
            .logout{
                width:35%;
                position:absolute;
                right:0;
            }
        }
        /*头部end*/
        /*侧边栏start*/
        .sidebar{ 
            display:block;
            float:left;
            width:15%;
            height:751px;
            background-color: #333;
            ul{
                list-style:none;
            }
            li{

                display:inline-block;
                height:50px;
                line-height:50px;
                // text-align:center;
                font-size:16px;
                width:100%;
                border-top:1px solid #000;
                border-bottom:1px solid #000;
                border-left:1px solid #000;
            }
            .hbg{
                background-color: #000;
                color:#fff;
                .active{
                background-color:#ccc;
                width:100%;
                color:#000;
                border-bottom:1px solid #333;
                }
                .active:hover{
                    background-color: #FFF
                    // color:#000;
                }
                .sh{

                }
            }
            .hbg:hover{
                background-color: #fff;
                
                color:#000;
            }
        }
        /*侧边栏end*/
        /*主体部分start*/
        .contents{
                float:right;
                width:85%;
                height:800px;
                background-color:#fff;
                border-top:1px solid #000;
                border-top:none;
            }
        /*主体部分end*/   
    }
    
</style>
<template>
    <div class="dashboard">
        <h2>酒店基础数据</h2>
        <header class="headers">
            <div class="logout" @pointerup.prevent="logout">    退出登录
            </div>    
        </header>
        <aside class="sidebar">
            <ul>
                <li @pointerup.prevent="hotel()" class="hbg">酒店数据
                    <ul v-if="isTrue">
                        <li class="active sh" @pointerup.stop.prevent="stock()">待入库</li>
                        <li class="active" @pointerup.stop.prevent="SAI()">SAI酒店库</li>
                    </ul>
                </li>
            </ul>
        </aside>
        <content class="contents">
            <router-view></router-view>
        </content>        
        
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
                flag:0
            }
        },
        methods:{
            logout(){
                this.$dispatch('logout').then(result=>{
                    this.$router.replace(auth.loginRoute(this.$route));
                })
            },
            /*增加方法*/
            hotel:function(){
                this.flag++;
                if(this.flag%2!=0){
                    this.isTrue=true;

                }else{
                    this.isTrue=false;
                    
                }
                this.$router.push({name:'dashboard'});
                
            },
            stock:function(){
                // this.$router.push({name:'dashboard-hotel-mapping'});
                this.$router.push({path:'/dashboard/hotel-mapping'});
            },
            SAI:function(){
                // this.$router.push({name:'dashboard-hotel-mapping-dl'});
                this.$router.push({path:'/dashboard/zkhotel'});
            }
        }
    }
</script>