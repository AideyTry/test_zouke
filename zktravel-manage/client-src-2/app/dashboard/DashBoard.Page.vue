<template lang="pug">
    .dashboard
        .logout(@pointerup.prevent="logout") 退出登录
        router-view
</template>

<script>
    import auth from 'root/utils/auth';
    export default {
        methods:{
            logout(){
                this.$dispatch('logout').then(result=>{
                    this.$router.replace(auth.loginRoute(this.$route));
                })
            }
        }
    }
</script>