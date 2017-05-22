<style lang="scss" scoped>
  .login{
    transform:translate(-50%,-50%);
    position:absolute;
    top:50%;
    left:50%;
  .color{
    color:#f00;
  }
  }
</style>

<template>
<div class="login">
        <div class="login-wrap">
            <div class="avatar">
<!--                 <img src="/uploads/monkey.png" class="img-circle" alt=""> -->
            </div>

            <form class="col-md-offset-1 col-md-10" @submit.stop.prevent="login()">
                <div class="input-group input-group-lg">
                    <span class="input-group-addon">
                        用户名:
                    </span>
                    <input type="text" class="form-control" v-model="passName">
                </div>
                <p></p>
                <div class="input-group input-group-lg">
                    <span class="input-group-addon">
                        密&nbsp&nbsp码:&nbsp
                    </span>
                    <input type="password" class="form-control" v-model="passWord">
                </div>
                <p></p>
                <input type="submit" value="登 录" class="btn btn-lg btn-primary btn-block" />
                <div v-if="isTrue">
                    <p class="color">用户名或密码有误,请重新输入</p>
                </div>
            </form>
           
        </div>
    </div>
</template>
  
<script>
    export default {
      data(){
        return {
          isTrue:false,
          passName:"",
          passWord:""
        }
      },
      methods:{
        login(){
          if((this.passName==="admin")&&(this.passWord==="123456")){
            this.$store.state.token=200;
            // let redirect=decodeURIComponent(this.$route.query.redirect||'/');
            this.$store.state.passName=this.passName;
            this.$router.push({
              path:'/index'
            });
            // console.log(2);
            // console.log(this.$store.state.token);
          }
          else{
            console.log("用户名或密码有误");
            this.isTrue=true;
          }
        }
      }
    }
</script>