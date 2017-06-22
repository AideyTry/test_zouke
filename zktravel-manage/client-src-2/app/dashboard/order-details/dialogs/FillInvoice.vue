<style lang="scss" scoped>
    
</style>
<template>
 <el-dialog title="填写发票信息"
 :visible.sync="dialoggroup[3].show" size="tiny">
                        <el-form label-width="80px" label-position="left">
                          <el-form-item label="公司名称">
                            <el-input v-model="company"></el-input>
                          </el-form-item>
                          <el-form-item label="所在国家">
                            <el-radio-group v-model="country">
                                <el-radio :label="3">德国</el-radio>
                                <el-radio :label="6">中国</el-radio>
                                <el-radio :label="9">其他国家</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="地址">
                            <el-input v-model="address"></el-input>
                          </el-form-item>
                          <el-form-item label="发票种类">
                            <el-radio-group v-model="invoicetype">
                                <el-radio :label="3">AE-link</el-radio>
                                <el-radio :label="6">龙腾</el-radio>
                                <el-radio :label="9">国内增值税发票</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="币种">
                            <el-radio-group v-model="cash">
                                <el-radio :label="3">欧元</el-radio>
                                <el-radio :label="6">人民币</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="金额">
                             <el-input v-model="money"></el-input>
                          </el-form-item>
                          <hr>
                        </el-form>
                        <el-row>
                            <el-col :span="10">订单金额：xxxxxx</el-col>
                            <el-col :span="10">收款方式：微信、走客转账</el-col>
                        </el-row>
                </el-col>
                      <span slot="footer" class="dialog-footer">
                        <el-button type="primary" size="large" @click="submit">确 定</el-button>
                      </span>
                    </el-dialog>
</template>
<script>
    import ajax  from '@local/common/ajax';
    export default{
    	props:['dialoggroup','pickerOptions'],
    	data(){
            return{
                myData:[],
                company:'',
                country:'',
                address:'',
                invoicetype:'',
                cash:'',
                money:'',
                date:new Date()
            }
        },
        methods:{
        	submit(){
        		this.myData.push({
                            company:this.company,
                            country:this.country,
                            address:this.address,
                            invoicetype:this.invoicetype,
                            cash:this.cash,
                            money:this.money,
                            date:new Date()
                        });
                        company:'';
		                country:'';
		                address:'';
		                invoicetype:'';
		                cash:'';
		                money:'';
		                date:new Date();
		                this.dialoggroup[3].show=false;
        	}
        }
    }
</script>