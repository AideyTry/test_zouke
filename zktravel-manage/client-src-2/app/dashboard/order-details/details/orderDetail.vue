<style lang="scss" scoped>
    .orderDetail{
        h4{
            margin:0;
            padding:0;
        }
        .box-card{
            margin:10px 0 15px 0;
            .clearfix:before,
            .clearfix:after {
                display: table;
                content: "";
            }
            .clearfix:after {
                clear: both
            }
            .card{

            }
        }
        p{
            border-top:1px solid #8492A6;
            margin:30px 0;
        }
    }
</style>
<template>
    <div>
        <WriteOrder v-if="offlineRole.UPDATE_ORDER&&orderStatus==8" :orderData="orderdata"></WriteOrder>
        <RoomingList v-if="orderStatus==6||orderStatus==7" :orderData="orderdata"></RoomingList>
        <RoomingList v-if="!offlineRole.UPDATE_ORDER&&orderStatus==8" :orderData="orderdata"></RoomingList>
        <ControlHouse :orderData="orderdata" v-if="orderStatus>8"></ControlHouse>
    </div>

</template>
<script>
    import ajax from '@local/common/ajax';
    import WriteOrder from './cards/WriteOrder'
    import RoomingList from './cards/RoomingList'
    import ControlHouse from './cards/ControlHouse'
    export default{
        props:["orderdata"],
        components:{
            WriteOrder:WriteOrder,
            RoomingList:RoomingList,
            ControlHouse:ControlHouse
        },
        computed:{
            orderId(){
                return this.$route.params.orderid;
            },
            offlineRole(){
                return this.$store.getters.offlineRole;
            },
            orderStatus(){
                if(this.orderdata){
                    return this.orderdata.status;
                }else {
                    return 0
                }

            }
        },
        methods:{
            dateRange(a,b){
                return new Date(a).getDate()-new Date(b).getDate();
            },

        },
        mounted(){
            this.dateRange();
        }
    }
</script>