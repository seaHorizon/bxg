/**
 * Created by Administrator on 2017/9/11.
 */
define(["jquery","cookie"],function ($) {
  $(function(){

    // 1-验证表单提交
  //  $('form').submit(function(e){
  //    var username = $('#tc_name').val();
  //    var pass = $('#tc_pass').val();
  //
  //    if(username.trim()==''){
  //      alert('请输入用户名');
  //      return false;
  //    }
  //    if(pass.trim()==''){
  //      alert('请输入密码');
  //      return false;
  //    }
  //
  //    // 发送ajax请求
  //    $.ajax({
  //      url:"/api/login",//简写了 应该是studyit.com/api/login
  //      type:"post",
  //      data:{
  //        tc_name:username,
  //        tc_pass:pass
  //      },
  //      success:function(data){
  //        console.log(data);
  //        if(data.code==200){
  //          //这里验证登录成功与否  如果登录成功了将数据存储在cookie区域中
  //          // jqury中有$.cookie()这个方法
  //          $.cookie("userinfo",JSON.stringify(data.result),{empires:365,path:"/"});
  //
  //          // 最后一步让用户跳转到首页"/"
  //          location.href("/");
  //        }
  //      }
  //    });
  //    return false;
  //  })


    $("form").submit(function(e){
      //1. 获取用户输入的信息
      var userName = $("#tc_name").val();
      var pass = $("#tc_pass").val();

      if(userName.trim() == ""){
        alert("请输入用户名");
        return false;
      }

      if(pass.trim() == ""){
        alert("请输入密码");
        return false;
      }

      //2. 要将数据发送给后台，让后台进行验证
      //2.1 数据接口地址是什么  //http://studyit.com/api/login
      //2.2 请求的方式是什么   post
      //2.3 请求要的参数是什么  tc_name tc_pass

      $.ajax({
      url: "/api/login",
      type: "post",
      data: {
        tc_name: userName,
        tc_pass: pass
      },
      success: function(data){
        console.log(data);
        if(data.code == 200){
          //登录成功之后，
          //先将后台返回用户的头像以及用户名信息
          //保存到cookie中，为了能够让首页也使用这个信息

          //应该先将对象转成json格式的字符串，然后再存
          $.cookie("userinfo", JSON.stringify(data.result), {expires: 365, path: "/"});

          // 让用户跳转到首页
          location.href = "/";
          // console.log(data);

        }
      }
    });


    //阻止表单的默认提交事件
    // e.preventDefault();
    return false;
  })



  })
})