<style lang="scss" scoped>
     .loginIn{
        transform:translate(-50%,-50%);
        position:absolute;
        top:50%;
        left:50%;
        .color{
          color:#0f0;
        }
        // img{
        //   display:block;
        // }
        h3{
          position:absolute;
          right:5%;
          color: #0f0;
        }
      }

</style>
<!-- 原基础上修改的内容start -->
<template lang="pug">
    <div class="loginIn">
        .login
            img(":src"='qrCode' @load="checkLoginPoll")
            .refresh(v-if="invalid" @pointerup.prevent="refreshQRCode") 刷新二维码
        <h3>请扫码登录</h3>
    </div>
</template>
 <!-- 原基础上修改的内容end -->
<!--  <template>
     <div>
         <img src="">
     </div>
 </template> -->
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