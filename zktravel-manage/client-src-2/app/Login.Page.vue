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
            .no-user(v-if="noUser") 无该用户，请联系管理员添加
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
    import auth from 'root/utils/auth';
    import ajax from '@local/common/ajax';

    export default {
        data(){
            return {
                invalid: false,
                noUser: false,
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
                this.noUser = false;
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
                            case 2: //user not permitted
                                this.invalid = true;
                                this.noUser = true;
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
                r();
                return;
            }
            ajax.postSilence('/api/auth/is-login').then(result=>{
                if(result.code===0){
                    store.commit('initUserInfo', result.userInfo);
                    r();
                } else {
                    next();
                }
            }).catch(e=>{
                next();
            })

            function r(){
                let redirectRoute = { path:'/' }
                if(to.query.redirect){
                    redirectRoute = JSON.parse(to.query.redirect)
                }
                next(Object.assign({
                    replace:true
                }, redirectRoute));
            }
        }
    }
</script>