<style lang="scss" scoped>
  .login{
    transform:translate(-50%,-50%);
    position:absolute;
    top:50%;
    left:50%;
    .color{
      color:#0f0;
    }
    img{
      display:block;
    }
    h3{
      position:absolute;
      right:5%;
    }
  }

</style>

<template>
  <div class="login">
     <img src="/api/auth/qr-code">
     <h3 class="color">请扫码登录</h3>
  </div>
</template>
  
<script>
    import ajax from '@local/common/ajax';
    export default {
      data(){
        return {

        }
      },
      computed:{
        state(){
          return this.$store.state;
        }
      },
      mounted(){
        let that=this;
        let timer=setInterval(function(){
            if(that.state.token===0){
              that.$router.push({
                path:'/index'
              })
            }
            else {
              ajax.post("/api/auth/is-login").then(json=>{
                that.$store.commit('login',json);
                //登录成功
                console.log(that.state.token);
                if(that.state.token===0){
                  clearInterval(timer);
                  // document.cookie('userInfo',that.state.userInfo);
                  that.$router.push({
                    path:'/index'
                  })       
                }
                //未登录
                else if(that.state.token===1){
                  console.log("未登录");
                }
                //二维码失效
                else if(that.state.token===9){
                  console.log("二维码失效");
                  clearInterval(timer);
                }
              })
            }
        },1000);
    
      },
      methods:{
      }
  }
</script>