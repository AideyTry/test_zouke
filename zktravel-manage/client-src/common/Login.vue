<style lang="scss" scoped>
  .form{
    transform:translate(-50%,-50%);
    position:absolute;
    top:50%;
    left:50%;
  }
</style>

<template>
<form class="form">
  <div class="form-group">
    <label for="exampleInputEmail1">用户名</label>
    <input type="name" class="form-control" id="exampleInputEmail1" name="passName">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">密码</label>
    <input type="password" class="form-control" id="exampleInputPassword1" name="passWord">
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox">请同意协议
    </label>
  </div>
  <button type="submit" class="btn btn-default">登录</button>
</form>
</template>
  
<script>
    
</script>