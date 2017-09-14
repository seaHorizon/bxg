/**
 * Created by Administrator on 2017/9/11.
 */
require.config({
  baseUrl:"/views/assets",

  paths: {
    //配置config文件  注意这里的baseUrl+paths的路径就是文件的具体路径
    jquery:"./jquery/jquery",
    cookie:"./jquery-cookie/jquery.cookie",
    template:"./artTemplate/template",
    bootstrap:"./bootstrap/js/bootstrap",
    utils: "../static/js/lib/utils",
    nprogress: "./nprogress/nprogress",//点击进去查看去是否支持模块化  支持  进度条插件
    datepicker: "./bootstrap-datepicker/js/bootstrap-datepicker", //支持模块化  日期插件
    datepickerCN: "./bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
    validate: "./jquery-validate/jquery-validate"//表单验证插件
  },

  shim: {
    bootstrap: {
      deps: ["jquery"]
    },
    datepickerCN: {
      deps: ["jquery"]
    },
    validate: {
      deps: ["jquery"]
    },
  }
  
});