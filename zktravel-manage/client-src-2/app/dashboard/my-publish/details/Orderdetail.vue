<style lang="scss" scoped>
    .order-detail {
        min-width: 760px;
        height: 100%;
        width: 100%;
        background: #F9FAFC;
        padding: 0px 20px;
        h4 {
            display: inline-block;
            width: 80px;
        }
        .title{
            font-size: 15px;
            font-weight: 600;
        }
        .el-tag {
            margin: 0 20px;
        }
        .creator-info{
            height: 40px;
            line-height: 40px;
            span{
                display: inline-block;
                margin: 0 10px;
            }
        }
        .el-col{

            text-overflow: ellipsis;
            div{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .content{
            height: 560px;
            overflow-y: auto;
            padding-top: 20px;
            .text-line{
                height: 40px;
                line-height: 40px;
            }
            .text-require {
                min-height: 60px;
            }
            >:nth-child(3){
                margin-top: 20px;
            }
        }
        .card{
            overflow-y: auto;
            display: inline-block;
            width:73%;
            min-width: 760px;
            min-height: 120px;
            padding: 15px  10px;
            background: #E5E9F2;
            border-radius: 6px;

            div{
                display: inline-block;
            }
        }
    }
</style>

<template>
    <div class="order-detail">
        <el-row style="height: 40px" type="flex">
            <el-col :span="9">
                <h4>需求详情</h4>
                <el-tag key="优先级A+" type="gray">优先级A+</el-tag>
                <el-tag key="GTA" type="gray">GTA导游</el-tag>
            </el-col>
            <el-col :span="12" class="creator-info">
                <span>创建:</span>
                <span>{{orderdata.creator.name}}</span>
                <span>发布时间:</span>
                <span>{{orderdata.create_time}}</span>
            </el-col>
        </el-row>
        <div class="content">
            <el-row class="text-line" type="flex">
                <el-col :span="5">
                    <div><span class="title">需求来源：</span>{{orderdata.requirement.origin_from}}</div>
                </el-col>
                <el-col :span="7">
                    <div><span class="title">用户名：</span>{{orderdata.requirement.user.name}}</div>

                </el-col>
                <el-col :span="3">
                    <div><span class="title">出发人数：</span>{{orderdata.requirement.number}}</div>
                </el-col>
                <el-col :span="5">
                    <div><span class="title">出行时间：</span>{{orderdata.requirement.start_date}}</div>
                </el-col>
                <el-col :span="4">
                    <div><span class="title">酒店星级：</span>{{orderdata.requirement.star}}</div>
                </el-col>
            </el-row>
            <el-row class="text-line" type="flex">
                <el-col :span="5">
                    <div><span class="title">是否含早：</span>{{orderdata.requirement.breakfast?'含早':'不含'}}</div>
                </el-col>
                <el-col :span="5">
                    <div><span class="title">报价币种：</span>{{currencyGroup[orderdata.requirement.currency]}}</div>

                </el-col>
                <el-col :span="6">
                    <div><span class="title">预算范围：</span>每间夜{{orderdata.requirement.budget_min}}~{{orderdata.requirement.budget_max}}€</div>
                </el-col>
                <el-col :span="8">
                    <div style="width: 250px"><span class="title">备注：</span>{{orderdata.requirement.budget_mark}}</div>
                </el-col>
            </el-row>
            <el-row class="text-require" type="flex">
                <el-col :span="2"><span class="title">取消要求：</span></el-col>
                <el-col :span="22">{{orderdata.requirement.cancel_req}}</el-col>
            </el-row>
            <el-row class="text-require" type="flex">
                <el-col :span="2" class="title">位置要求：</el-col>
                <el-col :span="22">{{orderdata.requirement.position_req}}</el-col>
            </el-row>
            <el-row class="text-require" type="flex">
                <el-col :span="2" class="title">其他要求：</el-col>
                <el-col :span="22">{{orderdata.requirement.other_req}}</el-col>
            </el-row>
            <template v-for="v in orderdata.requirement.stay_details">
                <div class="card">
                    <el-row style="width: 100%;height: 40px;">
                        <el-col :span="12">
                            <div class="title">入住/离店时间：</div>
                            <div>{{v.check_in}}-{{v.check_out}}</div>
                            <div>{{daterange(v.check_in,v.check_out)}}晚</div>
                        </el-col>
                        <el-col :span="4"><span class="title">城市：</span>{{v.city.name}}</el-col>
                        <el-col :span="8"><span class="title">指定的酒店：</span>{{v.hotel.name}}</el-col>
                    </el-row>
                    <template v-for="(k,w) in v.rooms">
                        <el-row>
                            <el-col>
                                <div class="title">房型：{{w+1}}</div>
                                <div>{{k.type}}X{{k.number}}</div>
                                <div class="title">备注：</div>
                                <div>{{k.mark}}</div>
                            </el-col>
                        </el-row>
                    </template>
                </div>
            </template>
        </div>
        <div class="require">

        </div>
    </div>
</template>

<script>
    export default{
        props: ['orderdata'],
        data(){
            return{
                currencyGroup:{
                    EUR:'欧元',
                    RMB:'人民币',
                    GBP:'英镑',
                    USD:'美元'
                }
            }
        },
        methods:{
            daterange(a,b){
                return new Date(a).getDay()-new Date(b).getDay();
            }
        }

    }
</script>