<style lang="scss" scoped>
    .el-row{
       text-align: center;
    }
</style>
<template>
    <el-dialog
            title="分配需求"
            :visible.sync="dialoggroup[0].show"
            size="tiny">
        <el-form label-position="left" ref="ruleForm" :model="dialoggroup[0].model" label-width="80px">
            <el-row class="padding-left">
                <el-col>
                    <el-form-item label="订房员:" prop="action">
                        <el-select v-model="dialoggroup[0].model.action" placeholder="请选择订房员">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="padding-left">
                <el-col>
                    <el-form-item label="完成时间:" prop="action">
                        <el-date-picker
                                v-model="dialoggroup[0].model.date"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-button type="info" size="large">确定</el-button>
                </el-col>
            </el-row>

        </el-form>
    </el-dialog>
</template>
<script>
    export default{
        props:['dialoggroup','pickerOptions']
    }
</script>