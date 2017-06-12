<style lang="scss" scoped>
    .offer-detail-container {
        height: 768px;
        width: 100%;
    }
</style>
<template>
    <div class="offer-detail-container">
        <el-row style="height: 40px" type="flex">
            <el-col :span="9">
                <h4>报价详情</h4>
            </el-col>
            <el-col :span="12" class="creator-info">
            </el-col>
        </el-row>
        <el-tabs v-model="editableTabsValue" active-name="方案1" type="card" editable closable @edit="handleTabsEdit">
            <el-tab-pane
                    :key="item.name"
                    v-for="(item, index) in editableTabs"
                    :label="item.title"
                    :name="item.title">
                <div class="offer-container">
                    <el-tabs v-model="countryTabs" type="border-card" active-name="countryTabs">
                        <template  v-for="(v,k) in item.order">
                            <el-tab-pane  :label="v.city.name" :name="v.city.name">
                                <div class="country">
                                    <el-row>
                                        <el-col :span="12"></el-col>
                                    </el-row>
                                </div>
                            </el-tab-pane>
                        </template>
                    </el-tabs>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import ajax from '@local/common/ajax'
    export default{
        data(){
            return {
                tabnum: 1,
                editableTabsValue:null,
                editableTabs:[{title: '方案1', name: '方案1'}],
                orderdata:null,
                countryTabs:null,
                offergroup:1,
                params:[]
            }
        },
        methods: {
            loadorder(id){
                let vm = this;
                ajax.post('/api/team/order/detail', {
                    id: id
                },{lock:false}).then(
                    data => {
                        vm.orderdata = data.detail;
                        vm.editableTabs=[{title: '方案1', name: '方案1',order:data.detail.requirement.stay_details}]
                        vm.countryTabs=data.detail.requirement.stay_details[0].city.name
                    }
                )
            },
            handleTabsEdit(targetName, action){
                if (action === 'add') {
                    this.addtab();
                } else if (action === 'remove') {
                    this.closetab(targetName)
                }

            },
            addtab(){
                this.tabnum += 1;
                this.editableTabs.push({title: '方案' + this.tabnum, name: '方案' + this.tabnum,order:this.orderdata.requirement.stay_details})
            },
            closetab(targetName){
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                                tabs.splice(index,1);
                                this.tabnum -= 1;
                            }
                        }
                });
            }
        },
        mounted(){
            this.loadorder(this.$route.params.orderid);
        }
    }
</script>