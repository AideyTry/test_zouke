<style lang="scss" scoped>
    .dashboard {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        background-color: #eef1f6;
        overflow: hidden;
        .min-left{
            min-width: 180px;
        }
        .header {
            height: 60px;
            line-height: 60px;
            border-left: 0px;
            .main-title {
                background-color: #324157;
                color: #fff;
                text-align: center;
            }
            .title {
                text-indent: 30px;
            }
            .user-info {
                min-width: 200px;
                i {
                    font-size: 14px;
                }
                span {
                    margin-right: 5px;
                }
            }
            .log-out {
                color: #178fe5;
                cursor: pointer;
            }
        }
        .main-body {
            height: 100%;
            .el-menu {
                height: 100%;
            }
            .content {
                border-top: 1px solid #ccc;
                overflow-y: auto;
                margin-bottom: 60px;
            }
        }
        .el-menu{
            border-radius: 0px !important;
        }
    }

</style>
<template>
    <div class="dashboard">
        <el-row class="header" type="flex">
            <el-col :span="3" class="min-left">
                <i></i>
                <div class="main-title">
                    超级行程单
                </div>
            </el-col>
            <el-col :span="16">
                <div class="title">
                </div>
            </el-col>
            <el-col :span="5">
                <div class="user-info">
                    <i class="el-icon-message"></i>
                    <span>用户名</span>
                    <span>{{userInfo.name}}</span>
                    <span class="log-out" @pointerup.prevent="logout">退出</span>
                </div>
            </el-col>
        </el-row>
        <el-row class="main-body" type="flex">
            <el-col :span="3" class="nav-menu min-left" >
                <el-menu :default-active="activemenu"  :unique-opened="true"  class="nav-memu" theme="dark" @select="handleSelect" @open="handleOpen" @close="handleClose">
                    <el-menu-item index="dashboard-my-home-proxy">
                            主页
                    </el-menu-item>
                    <el-submenu index="publish" v-if="offlineRole.PUBLISH||offlineRole.DISPATCH">
                        <template slot="title">团房需求</template>
                        <el-menu-item-group>
                            <el-menu-item index="dashboard-publish-require-proxy" v-if="offlineRole.PUBLISH">
                                发布需求
                            </el-menu-item>
                            <el-menu-item index="dashboard-my-publish-proxy" v-if="offlineRole.PUBLISH">
                                我的发布
                            </el-menu-item>
                            <el-menu-item index="dashboard-distributed-proxy" v-if="offlineRole.DISPATCH">
                                待分配
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="groupOffer" v-if="offlineRole.UPDATE_PRICE||offlineRole.CHECK_PRICE">
                        <template slot="title">团房报价</template>
                        <el-menu-item-group>
                            <el-menu-item index="dashboard-wait-offer-proxy" v-if="offlineRole.UPDATE_PRICE">
                                待报价/预订
                            </el-menu-item>
                            <el-menu-item index="dashboard-wait-examine-proxy" v-if="offlineRole.CHECK_PRICE">
                                待审核
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="order">
                        <template slot="title">订单库</template>
                        <el-menu-item-group>
                            <el-menu-item index="dashboard-group-order-proxy">
                                团房订单
                            </el-menu-item>
                            <el-menu-item index="dashboard-system-order-proxy">
                                系统订单
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="dashboard">
                        <template slot="title">酒店数据管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="dashboard-hotel-mapping-proxy">
                                待入库
                            </el-menu-item>
<!--                            <el-menu-item index="dashboard-unmatched">
                                未匹配
                            </el-menu-item>-->
                            <el-menu-item index="dashboard-zkhotel-proxy">
                                已入库
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="2">用户管理</el-menu-item>
                    <el-menu-item index="3">系统管理</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="21" class="content">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import auth from 'root/utils/auth';
    export default {
        /*增加data*/
        data(){
            return {
                isActive: true,
                isTrue: false,
                flag: 0,
                bgIstrue: {
                    mpIstrue: false,
                    zkIstrue: false
                },
                role:{
                    'admin':0,
                    'custom-service':1,
                    'room-booking':2

                }
            }
        },
        computed: {
            activemenu(){
              return this.$route.name+'-proxy';
            },
            userInfo(){
                return this.$store.getters.userInfo;
            },
            selected(){
                return this.$route.name
            },
            offlineRole(){
                return this.$store.getters.offlineRole;
            }
        },
        methods: {
            logout(){
                this.$dispatch('logout').then(result => {
                    this.$router.replace(auth.loginRoute(this.$route));
                })
            },
            handleOpen(key, keyPath) {

            },
            handleClose(key, keyPath) {

            },
            handleSelect(index){
                this.$router.push({name: index})
            }
        },
        mounted(){

        }
    }
</script>