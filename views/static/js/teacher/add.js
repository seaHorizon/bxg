define(["jquery","template","utils"],function($,template,utils){
    // 分析：点击添加讲师信息和编辑讲师信息公用了一个页面
    // 这样的好处：不知道，待后续补充
    // 添加讲师页面运用的插件有 jQuery template
    // 这里的utils是自己封装的一个函数 里面的内容是将query区域的？后面的值的字符串改写成对象模式
    // 1- 搭建模板
    // 2- 首先我们需要判断我们点击跳转进去的页面是编辑页面还是添加页面
            // 判断的依据是什么？根据接口文档我们知道两个请求的方式不同 添加是post请求
            // 编辑是get请求 而get请求需要后缀参数 所以两者的地址栏后缀参数不同
            // 地址栏后面缀带的参数
    // 3-然后再根据判断的结果搭建完整的模板引擎
           
    
    // 获取地址栏后面的参数
    var id = utils.getQueryObj().id;
            
        if(id){
            // 如果存在id的值 就是编辑页面
            // 跳转到编辑页面发送ajax请求
            // 请求地址 http://api.botue.com/teacher/edit
            // 请求方式 get
            // 请求参数 tc_id
            // 返回数据格式 JSON

            // 1-发送ajax获取页面上的数据
            $.ajax({
                url: "/api/teacher/edit",
                type: 'get',
                data: {
                    tc_id: id
                },
                success: function(data){
                    console.log(data);
                    if(data.code == 200){
                        // 数据请求成功 给获取的数据添加属性
                        // 这些数据是两个页面的不同点 且数据中获取不到的
                        data.result.title = "讲师编辑";
                        data.result.btnText = "保 存";
                        data.result.url = "/api/teacher/update";
                        console.log(data.result);
                        $(".body,.teacher").html(template("teacher_add_edit_tpl",data.result))
                        $("#btn-save").click(function(){
                            $.ajax({
                                url: "/api/teacher/update",
                                type: "post",
                                data: $("form").serialize(),
                                success: function(data){
                                    location.href = "/teacher/list";
                                }
                            })
                            return false;
                        })
                    }
                }
            })

        }else{
            // 如果id不存在就是添加页面
            // 跳转到添加页面发送ajax请求
            // 请求地址 http://api.botue.com/teacher/add
            // 请求方式 post
            // 请求参数 tc_name tc_pass tc_join_date tc_type tc_gender
            // 返回数据格式 JSON
            var obj={
                title: "讲师添加",
                btnText: "添 加",
                url: "/api/teacher/add"
            };
            $(".body,.teacher").html(template("teacher_add_edit_tpl",obj));
            $("#btn-save").click(function(){
                $.ajax({
                    url: "/api/teacher/add",
                    type: "post",
                    data: $("form").rerialize(),
                    success: function(data){
                        console.log(data);
                        if(data.code == 200){
                            location.href = "/teacher/list";
                        }
                    }
                })
                return false;
            })
            
        }
    
})