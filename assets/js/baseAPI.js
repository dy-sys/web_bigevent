// 在执行 $.ajax() $.post() $.get()前
// 会先执行这个方法用于拼接请求路径
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
})