<style lang="scss" scoped>
    .el-input{
      width: 80%;
    }
</style>
<template>
 <el-dialog title="填写发票信息"
            :visible.sync="dialoggroup[3].show" size="tiny">
                        <el-form label-width="80px" label-position="left" :model="voucher_obj" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                          <el-form-item label="公司名称" prop="company">
                            <el-input v-model="voucher_obj.company"></el-input>
                          </el-form-item>
                          <el-form-item label="所在国家" prop="country">
                            <el-radio-group v-model="voucher_obj.country">
                                <el-radio label="德国">德国</el-radio>
                                <el-radio label="中国">中国</el-radio>
                                <el-radio label="其他国家">其他国家</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="地址" prop="address">
                            <el-input v-model="voucher_obj.address"></el-input>
                          </el-form-item>
                          <el-form-item label="发票种类" prop="voucher_type">
                            <el-radio-group v-model="voucher_obj.voucher_type">
                                <el-radio  label="AE-link">AE-link</el-radio>
                                <el-radio  label="龙腾">龙腾</el-radio>
                                <el-radio  label="国内增值税发票">国内增值税发票</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="币种" prop="currency">
                            <el-radio-group v-model="voucher_obj.currency" @change="changeCash($event)">
                                <el-radio label="欧元">欧元</el-radio>
                                <el-radio label="人民币">人民币</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="金额" :span="8" prop="money">
                             <el-input v-model="voucher_obj.money"></el-input><span>{{cash}}</span>
                          </el-form-item>
                          <hr>
                        </el-form>
                        <el-row>
                            <el-col :span="10">订单金额：xxxxxx</el-col>
                            <el-col :span="10">收款方式：微信、走客转账</el-col>
                        </el-row>
                </el-col>
                      <span slot="footer" class="dialog-footer">
                        <el-button type="primary" size="large" @click="submitForm('ruleForm')">确 定</el-button>
                      </span>
                    </el-dialog>
</template>
<script>
    import ajax  from '@local/common/ajax';
    export default{
    	props:['dialoggroup','pickerOptions'],
    	data(){
          return{
              cash:'',
              id:'',
              voucher_obj:{
              company:"",
              country:"",
              address:"",
              voucher_type:"",
              currency:"",
              money:"",
                },
              ruleForm: {
                  company: '',
                  country: '',
                  address: '',
                  voucher_type: '',
                  currency: '',
                  money:''
                },
              rules: {
                  company: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' },
                  ],
                  country: [
                    { required: true, message: '请选择所在国家', trigger: 'blur' }
                  ],
                  address: [
                    { required: true, message: '请填写正确的地址', trigger: 'blur' }
                  ],
                  voucher_type: [
                    { required: true, message: '请选择一种发票种类', trigger: 'change' }
                  ],
                  currency: [
                    { required: true, message: '请选择一种货币种类', trigger: 'change' }
                  ],
                  money: [
                    { required: true,message:'请填写金额（数字）',trigger:'blur'}
                  ]
                }   
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid)=>{
                    if(valid) {
                        ajax.post('/api/team/write-voucher/commit',{id:this.$route.params.orderid,voucher_obj:this.voucher_obj}).then(data=>{
                        this.dialoggroup[3].show = false;
                        let a = this.$route.params.orderid;
                        this.$router.go({ name: 'dashboard-order-detail',params:{ orderid:a}});
                        })
                    }else{
                        console.log('error submit!!');
                        return false;
                        }
                    })
            },
            changeCash(label){
                if(label=="欧元"){
                    this.cash="€";
                }else if(label="人民币"){
                    this.cash="￥";
                }
            }
        }
    }
</script>