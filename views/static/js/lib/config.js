/**
 * Created by Administrator on 2017/9/11.
 */
require.config({
  baseUrl:"/views/assets",
  paths:{
    //配置config文件  注意这里的baseUrl+paths的路径就是文件的具体路径
    jquery:"./jquery/jquery",
    cookie:"./jquery-cookie/jquery.cookie",
    template:"./artTemplate/template"
  }
});