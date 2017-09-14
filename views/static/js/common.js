define(["jquery","template","nprogress","cookie"],function ($,template,NProgress){
	// 分析：发送每个ajax请求的时候我们都需要设置一个进度条 
	// 还有每个页面跳转的时候也都需要设置一个进度条来读取
	 
	NProgress.start();
	$(function(){
		NProgress.done();

		if(location.pathname != "/dashboard/login"){
			if(!$.cookie("PHPSESSID")){
				location.href = "/dashboard/login";
			}

			//1. 从cookie中获取用户存储好的用户信息
			var userinfo = JSON.parse($.cookie("userinfo"));
			// console.log(userinfo);
			//2. 使用模板引擎将对象渲染到用户信息的模板中去
			var html = template("profile_tpl", userinfo);
			$("#profile").html(html);
		}

	})
	//-------------------------------------------------------------------------------------------
	// 退出功能的实现代码如下
	// 1-点击退出按钮
	$("#logout-btn").click(function(){
	// 2-发送ajax请求
	// 请求方式post
	// 请求参数无	
		$.ajax({
			url: "/api/logout",
			type: "post",
			success:function(data){
				// 如果数据接收成功跳转到登录页面
				if(data.code == 200){
					location.href = "/dashboard/login";
				}
			}
		})
	})
	//-----------------------------------------------------------------------------------------
	// 公共部分的js代码我们都放在commonjs中写
	// 给右侧导航栏设置高亮事件和二级菜单导出事件
	$(".navs>ul>li>ul").parent().click(function(){
		// 找到二级菜单ul   给他的父级元素添加点击事件
		// 因为这里的li比较多  不好找到是哪个li标签的点击事件
		$(this).children("ul").stop().slideToggle();
		
	});
	// 给导航栏设置高亮
	$(".navs a").each(function(index,ele){
		// 遍历navs标签下的所有a标签
		if($(ele).attr("href")==location.pathname){
			// 这里的pathname属性是获取地址栏？后面的参数
			// 如果a标签上的href属性的值等于地址栏？后的参数
			$(ele).addClass("active");
		}
	});


	// 在common.js中通过ajax Global Event为页面上所有的ajax请求注册相应的事件
	// 查文档看全局ajax 事件的用法

	// 1. ajaxStart
	// 2. ajaxSend
	// 3. ajaxSuccess
	// 4. ajaxError
	// 5. ajaxComplete
	// 6. ajaxStop
	
	// ajaxStart ajaxStop 每个批次的ajax请求只会触发一次
	// 其他的事件都是每个请求都会触发！

	$(document).ajaxStart(function(){
		//这里的ajax开始事件囊括了整个项目中所有的ajax请求
		// 所以在给每个ajax请求设置进度条样式的时候 就可以在这里设置了
		NProgress.start();
	})

	$(document).ajaxStop(function(){
		
		NProgress.done();
	})

	

});
