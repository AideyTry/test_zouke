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
        <WriteOrder v-if="offlineRole.UPDATE_ORDER&&orderStatus==8" :orderData="orderData"></WriteOrder>
        <RoomingList v-if="orderStatus==6"></RoomingList>
        <RoomingList v-if="orderStatus==7"></RoomingList>
        <ControlHouse></ControlHouse>
    </div>

</template>
<script>
    import ajax from '@local/common/ajax';
    import WriteOrder from './cards/WriteOrder'
    import RoomingList from './cards/RoomingList'
    import ControlHouse from './cards/ControlHouse'
    export default{
        props:["orderData"],
        data(){
            return {
                orderdata:null
            }
        },
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
            loadOrder(id){
                ajax.post("/api/team/order/detail",{id:id}, {lock: false}).then(json=>{
                    this.orderdata = json.detail;
                })
            },
            dateRange(a,b){
                return new Date(a).getDate()-new Date(b).getDate();
            },

        },
        mounted(){
            this.dateRange();
            this.loadOrder(this.$route.params.orderid);
        }
    }
</script>