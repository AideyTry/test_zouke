<template lang="pug">
    .login
        img(":src"='qrCode' @load="checkLoginPoll")
        .refresh(v-if="invalid" @pointerup.prevent="refreshQRCode") 刷新二维码
</template>

<script>
    import store from 'root/store';

    export default {
        data(){
            return {
                invalid: false,
                timestamp: new Date().valueOf()
            }
        },
        computed:{
            qrCode(){
                return `/api/auth/qr-code?timestamp=${this.timestamp}`;
            }
        },
        methods:{
            refreshQRCode(){
                this.timestamp = new Date().valueOf();
                this.invalid = false;
            },
            checkLoginPoll(){
                const poll = ()=>{
                    this.$ajax.postSilence('/api/auth/is-login').then(result=>{
                        switch(result.code){
                            case 0: //login
                                this.$commit('initUserInfo', result.userInfo);
                                this.redirect();
                                break;
                            case 1: //not login
                                setTimeout(()=>{
                                    poll();
                                }, 1000);
                                break;
                            case 9: //qr invalid
                                this.invalid = true;
                                break;
                        }
                    })
                };
                poll();
            },
            redirect(){
                let redirectRoute = { path:'/' }
                if(this.$route.query.redirect){
                    redirectRoute = JSON.parse(this.$route.query.redirect);
                }
                this.$router.replace(redirectRoute);
            }
        },
        beforeRouteEnter(to, from, next){
            if(store.getters['userInfo']){
                //logined
                let redirectRoute = { path:'/' }
                if(to.query.redirect){
                    redirectRoute = JSON.parse(to.query.redirect)
                }
                next(Object.assign({
                    replace:true
                }, redirectRoute));
                return;
            }
            next();
        }
    }
</script>