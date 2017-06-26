<style lang="scss" scoped>
    .el-input{
      width: 80%;
    }
</style>
<template>
 <el-dialog title="填写发票信息"
  :visible.sync="dialoggroup[3].show" size="tiny">
                        <el-form label-width="80px" label-position="left" :model="voucher_obj">
                          <el-form-item label="公司名称">
                            <el-input v-model="voucher_obj.company"></el-input>
                          </el-form-item>
                          <el-form-item label="所在国家">
                            <el-radio-group v-model="voucher_obj.country">
                                <el-radio label="德国">德国</el-radio>
                                <el-radio label="中国">中国</el-radio>
                                <el-radio label="其他国家">其他国家</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="地址">
                            <el-input v-model="voucher_obj.address"></el-input>
                          </el-form-item>
                          <el-form-item label="发票种类">
                            <el-radio-group v-model="voucher_obj.voucher_type">
                                <el-radio  label="AE-link">AE-link</el-radio>
                                <el-radio  label="龙腾">龙腾</el-radio>
                                <el-radio  label="国内增值税发票">国内增值税发票</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="币种">
                            <el-radio-group v-model="voucher_obj.currency">
                                <el-radio label="欧元" @click="toggle()">欧元</el-radio>
                                <el-radio label="人民币">人民币</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="金额" :span="8">
                             <el-input v-model="voucher_obj.money"></el-input><span v-show="this.danwei">€</span>
                          </el-form-item>
                          <hr>
                        </el-form>
                        <el-row>
                            <el-col :span="10">订单金额：xxxxxx</el-col>
                            <el-col :span="10">收款方式：微信、走客转账</el-col>
                        </el-row>
                </el-col>
                      <span slot="footer" class="dialog-footer">
                        <el-button type="primary" size="large" @click="submit()">确 定</el-button>
                      </span>
                    </el-dialog>
</template>
<script>
    import ajax  from '@local/common/ajax';
    export default{
    	props:['dialoggroup','pickerOptions'],
    	data(){
          return{
              danwei:true,
              id:'',
              voucher_obj:{
              company:"",
              country:"",
              address:"",
              voucher_type:"",
              currency:"",
              money:"",
                } 
              }
        },
        methods:{
        	submit(){
        		ajax.post('/api/team/write-voucher/commit',{id:this.$route.params.orderid,voucher_obj:this.voucher_obj}).then(data=>{
              this.dialoggroup[3].show = false;
              let a = this.$route.params.orderid;
              this.$router.go({ name: 'dashboard-order-detail', params: { orderid: a }});
           })
           
        }
        },
        toggle(){
          this.danwei = false;
        }

    }
  
</script>