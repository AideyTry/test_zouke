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
         		prop="invoicetype"
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
        		prop="caozuoren"
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
	export default{
		data(){
				return {
					myData:[
				{invoicetype:'国内增值税',company:'上海走客科技',country:'中国',address:'牡丹路60号812室',money:'11122',caozuoren:'bbb',date:'2017-01-11'},
				{invoicetype:'国内增值税',company:'上海走客科技',country:'中国',address:'牡丹路60号812室',money:'11122',caozuoren:'bbb',date:'2017-01-11'},
				{invoicetype:'国内增值税',company:'上海走客科技',country:'中国',address:'牡丹路60号812室',money:'11122',caozuoren:'bbb',date:'2017-01-11'},
				{invoicetype:'国内增值税',company:'上海走客科技',country:'中国',address:'牡丹路60号812室',money:'11122',caozuoren:'bbb',date:'2017-01-11'},
				{invoicetype:'国内增值税',company:'上海走客科技',country:'中国',address:'牡丹路60号812室',money:'11122',caozuoren:'bbb',date:'2017-01-11'}
			]	
		}
	}
}
</script>