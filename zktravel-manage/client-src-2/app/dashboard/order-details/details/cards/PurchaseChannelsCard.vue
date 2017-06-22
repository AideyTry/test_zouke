<style lang="scss" scoped>

</style>
<template>
    <div>
        <el-row type="flex">
            <el-col :span="2">
                <strong>采购渠道</strong>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default{
        props:["purchase_channel"],
        data(){
          return {

          }
        },
        methods:{

        },
        mounted(){
            this.purchase_channel;
        }
    }
</script>