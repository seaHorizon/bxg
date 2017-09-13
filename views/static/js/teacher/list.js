define(["jquery","template","bootstrap"],function($,template){
    //1- 写代码前的分析：
    // 在教师管理页面  首先我们做的第一件事就是查看按钮的功能
    // 我们知道点击查看按钮 会跳出模态框 而模态框是引用了bootstrap插件
    // 所以这里我们有一个bootstrap依赖项
    // bootstrap不支持模块化  所以要写上依赖项
    // 在学bootstrap的时候我们知道bootstrap的代码是由jquery来实现的  故这里我们也要写上jquery依赖项
    
    
    // 2- 加载页面动态数据：
    // 每一个ajax请求之前第一做的事就是先查看借口文档：
    // 请求地址 http://api.botue.com/teacher 
    // 请求方式 GET
    // 请求参数 无
    // 返回数据格式 JSON

    $.ajax({
        url:"/api/teacher",
        type: "get",  //get默认，可以不写
        success: function(data){
            console.log(data);
            if(data.code == 200){
                
                $("#teacher-list-tbody").html(template("teacher_list_tpl",data));
            }
        }
    })

    // 3-点击查看按钮，弹出模态框
    // 分析: 因为数据是动态获取的 是未来元素 故点击事件用事件委托最好
    $("#teacher-list-tbody").on("click",".check-info",function(){
        // 请求地址 http://api.botue.com/teacher/view
        // 请求方式 GET
        // 请求参数 tc_id
        // 返回数据格式 JSON
        // tc_id是在上一个接口中获取的 所以我们要想拿到上一个接口的数据
        // 先把上一个借口获取到的tc_id的值存储到td标签里面 给他添加一个自定义属性

        // 3-1获取创建的自定义属性的id值
        var id = $(this).parent("td").data("id");
        // 3-2发送ajax请求
        $.ajax({
            url: "/api/teacher/view",
            type: "get",
            data: {
                tc_id: id
            },
            success: function(data){
                console.log(data);
                if(data.code == 200){
                    $("#teacher-model-tbody").html(template("teacher_model_list",data.result))
                }
            }

        })
    })

    // 4-启用  注销
    // 给启用和注销按钮添加相应的类名
    // 模板判断数据的状态 是否需要注销或启动 设置相应的类名样式
    // 点击按钮发送ajax请求：
    $("#teacher-list-tbody").on("click","#btn-status",function(){
        // 请求地址 http://api.botue.com/teacher/handle
        // 请求方式 post
        // 请求参数 tc_id tc_status
        // 返回数据格式 JSON

        // 4-1获取标签中的自定义属性 
        var id = $(this).parent().data("id");
        var status = $(this).data("status");
        var that = $(this);
        // 4-2发送ajax请求
        $.ajax({
            url: "/api/teacher/handle",
            type: "post",
            data: {
                tc_id: id,
                tc_status: status
            },
            success: function(data){
                console.log(data);
                if(data.code == 200){
                    // 判断数据中tc_status的值 
                    // 如果状态值是1 代表启用  需要注销
                    // 如果状态值是0 代表注销  需要启用
                    if(data.result.tc_status==1){
                        that.removeClass("btn-warning").addClass("btn-success").text("启 用");
                    }else{
                        that.removeClass("btn-success").addClass("btn-warning").text("注 销");
                    }
                    // 设置好按钮的状态之后 我们还需要改变标签里的自定义属性的值 方便下次点击切换
                    // 不然status的值一直不变 点击事件就只能点击一次
                    that.data("status",data.result.tc_status);
                }
            }

        })

    })
    
})