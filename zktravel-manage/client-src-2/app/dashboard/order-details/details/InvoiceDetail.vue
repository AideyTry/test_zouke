<style lang="scss" scoped>
	.invoice{
		h4{
			padding:10px 10px;
		}
	}
</style>

<template>
<div>
	<div class="invoice">
		<h4 v-show="myData.length==0">暂无记录</h4>
		<h5 v-show="myData.length!=0">开票信息</h5>
	</div>
	<el-table v-show="myData.length!=0"
            :data="myData"
            border
            style="width: 100%">
        <el-table-column
         		prop="voucher_type"
                label="发票类型">
        </el-table-column>
        <el-table-column
        	 	prop="company"
                label="公司">
        </el-table-column>
        <el-table-column
                prop="country"
                label="国家">
        </el-table-column>
        <el-table-column
                prop="address"
                label="详细地址">
        </el-table-column>
        <el-table-column
                prop="money"
                label="开票金额">
        </el-table-column>
        <el-table-column
        		prop="user.id"
                label="操作人">
        </el-table-column>
        <el-table-column
                prop="date"
                label=时间>
        </el-table-column>
        <el-table-column label="操作">
			<template scope="scope">
		        <el-button
		          size="small" type="primary"     
		          >导出invoice</el-button>
      		</template>
        </el-table-column>
    </el-table>
</div>
	
</template>

<script>
import ajax  from '@local/common/ajax';
	export default{
		data(){
		      return {
			     myData:[]
		  }
	},
    methods:{
        load(){
            ajax.post('/api/team/order/detail',{id:this.$route.params.orderid}).then(data=>{
                let arr = data.detail.voucher_detail;
                console.log(data.detail.voucher_detail);
                 /*this.myData.push(arr);*/
            })
        }
    },
    created(){
        this.load();
    }
}
</script>