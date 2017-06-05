<style lang="scss" scoped>

</style>

<template>
    <div class="group-system">
        <el-tabs :active-name="$route.params.status" @tab-click="changetab">
            <el-tab-pane label="有效订单" name="valid">
                <el-row type="flex" class="search-group">
                    <el-col :span="4" class="search-input">
                        <el-input
                                placeholder="搜索用户名/订单号/订房员/创建人"
                                icon="search"
                                v-model="pager.keyword"
                                @keyup.enter.native="searchorder"
                                :on-icon-click="searchhotel">
                        </el-input>
                    </el-col>
                    <el-col :span="1">

                    </el-col>
                </el-row>
                <el-table
                        :data="currentdata"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="_id"
                            label="订单号">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="用户名">
                    </el-table-column>
                    <el-table-column
                            prop="category_name"
                            label="发布时间">
                    </el-table-column>
                    <el-table-column
                            prop="country_name"
                            label="国家">
                    </el-table-column>
                    <el-table-column
                            prop="city_name"
                            label="城市">
                    </el-table-column>
                    <el-table-column
                            prop="zkPhone"
                            label="区">
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template scope="scope">
                            <el-button size="small" type="info" @click="verifyconfirm(scope.row)">审核
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination layout="total, prev, pager, next, jumper" @current-change="changepage" :total="total"
                               :page-size="pager.pageSize"></el-pagination>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import ajax from '@local/common/ajax';
    export default{
        data(){
            return{
                pager:{
                    page:0,
                    limit:15,
                    keyword:'',
                    valid:true
                },
                currentdata:[]
            }
        },
        computed:{

        },
        method:{
            loadtable(){

            },
            searchorder(){

            }
        },
        mounted(){

        },
        beforeRouteEnter (to, from, next) {
            if (!to.params.status) {
                next({name: 'dashboard-zkhotel', params: {status: 'valid'}});
            } else {
                next();
            }
        }
    }
</script>