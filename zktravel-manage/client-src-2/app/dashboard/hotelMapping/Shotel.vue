<style lang="scss" scoped>
    .sHotel {
        .picture {
            height: 150px;
            width: 100%;
            list-style: none;
            overflow-x: scroll;
            white-space: nowrap;
            li {
                height: 150px;
                width: 150px;
                display: inline-block;
                white-space: nowrap;
                padding: 4px;
                img {
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                    padding: 2px;
                }
            }
        }
    }
</style>
<template>
    <div class="sHotel">
        <el-row type="flex">
            <el-col :span="6" gutter="20">
                <p>
                    <span>酒店ID</span>
                    <input type="text" disabled="true" v-model="ids">
                </p>
            </el-col>
            <el-col :span="6" gutter="20">
                <p>
                    <span>状态</span>
                    <input type="text" disabled="true">

                </p>
            </el-col>
            <el-col :span="6" gutter="20">
                <p>
                    <span>状态</span>
                    <select name="" id=""></select>

                </p>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="9" gutter="20">
                <p>
                    <span>酒店中文</span>
                    <input type="text" disabled="true" v-model="detailData.name">
                </p>
            </el-col>
            <el-col :span="9" gutter="20">
                <p>
                    <span>酒店英文</span>
                    <input type="text" disabled="true" v-model="detailData.name_en">
                </p>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="18" gutter="20">
                <p>
                    <span>酒店别名</span>
                    <input type="text" disabled="true">
                </p>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="24">
                <p>
                    <span>地址</span>
                    <select disabled>
                        <option>{{detailData.countryName}}</option>
                    </select>
                    <span>-</span>
                    <select disabled>
                        <option>{{detailData.cityName}}</option>
                    </select>
                    <span>-</span>
                    <select disabled>
                        <option></option>
                    </select>
                    <span>-</span>
                    <input type="text" disabled="true" v-model="detailData.address" style="width:40%">
                </p>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="24">
                <p>
                    <span>Booking链接</span>
                    <input type="text" style="width:60%">
                    <a href="'https://'+ detailData.url_web">前往</a>
                    <span>B评分</span>
                    <input type="text">
                </p>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="8">
                <p>
                    <label>全部设施</label>
                    <span>wifi</span>
                    <span>可以停车</span>
                    <span>可以停车</span>
                </p>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="8">
                <p>
                    <label>热门设施</label>
                    <span>wifi</span>
                    <span>可以停车</span>
                    <span>可以停车</span>
                </p>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="24">
                <span>酒店图片</span>
                <ul class="picture thumbnail">
                    <li v-for="img in detailData.photos"><img :src="img"></li>
                </ul>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="1">
                <span>酒店介绍</span>
            </el-col>
            <el-col :span="23">
                <textarea cols="100" rows="10">{{detailData.description}}</textarea>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="6" gutter="20">
                <p>
                    <span>入住时间</span>
                    <input type="text" disabled="true">
                </p>
            </el-col>
            <el-col :span="6" gutter="20">
                <p>
                    <span>退房时间</span>
                    <input type="text" disabled="true">

                </p>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="9" gutter="20">
                <p>
                    <span>酒店电话</span>
                    <input type="text" disabled="true" style="width:80%">
                </p>
            </el-col>
            <el-col :span="9" gutter="20">
                <p>
                    <span>酒店传真</span>
                    <input type="text" disabled="true" style="width:80%">

                </p>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="9" gutter="20">
                <p>
                    <span>酒店邮箱</span>
                    <input type="text" disabled="true" style="width:80%">
                </p>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="12" gutter="20">
                <span>mapping信息</span>
                <el-table
                        :data="tableData"
                        border
                        style="width:100%"
                >

                    <el-table-column
                            prop="vt"
                            label="vt_id"
                    >
                        <template scope="scope">
                            <router-link :to="{name: 'fullpage-vtids', params:{spid: scope.row.vt}}">{{scope.row.vt}}
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="mk"
                            label="mk_id"
                    >
                        <template scope="scope">
                            <router-link :to="{name: 'fullpage-vtids', params:{spid: scope.row.mk}}">{{scope.row.mk}}
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="dl"
                            label="dl_id"
                    >
                        <template scope="scope">
                            <router-link :to="{name: 'fullpage-vtids', params:{spid: scope.row.dl}}">{{scope.row.dl}}
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="gt"
                            label="gt_id"
                    >
                        <template scope="scope">
                            <router-link :to="{name: 'fullpage-vtids', params:{spid: scope.row.gt}}">{{scope.row.gt}}
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="bk"
                            label="booking"
                    >
                        <template scope="scope">
                            <router-link :to="{name: 'fullpage-vtids', params:{spid: scope.row.bk}}">{{scope.row.bk}}
                            </router-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import ajax from '@local/common/ajax';
    export default{
        props: ["ids"],
        data(){
            return {
                detailData: {
                    name: '',
                    name_en: '',
                    cityName: '',
                    cityName_en: '',
                    countryName: '',
                    countryName_en: '',
                    address: '',
                    photos: null,
                    description: '',

                },
                tableData: [
                    {
                        vt: "",
                        mk: "",
                        dl: "",
                        bk: "",
                        gt: ""
                    }

                ]

            }
        },
        methods: {
            loadData(){
                ajax.post("/api/hotel/zk-hotel/detail", {
                    id: this.ids
                }).then(json => {
                    this.detailData.name = json.detail.name;
                    this.detailData.name_en = json.detail.name_en;
                    this.detailData.cityName = json.detail.city_name;
                    this.detailData.cityName_en = json.detail.city_name_en;
                    this.detailData.countryName = json.detail.country_name;
                    this.detailData.countryName_en = json.detail.country_name_en;
                    this.detailData.address = json.detail.address;
                    this.detailData.photos = json.detail.photos;
                    this.detailData.description = json.detail.description;

                    this.tableData[0].vt = json.detail.sp_id.vt_id[0];
                    this.tableData[0].mk = json.detail.sp_id.mk_id[0];
                    this.tableData[0].dl = json.detail.sp_id.dl_id[0];
                    this.tableData[0].bk = json.detail.sp_id.bk_id[0];
                    this.tableData[0].gt = json.detail.sp_id.gt_id[0];

                })
            }
        },
        created(){
            this.loadData();
        }
    }
</script>