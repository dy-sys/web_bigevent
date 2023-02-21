// 在执行 $.ajax() $.post() $.get()前
// 会先执行这个方法用于拼接请求路径
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url

    // 含有 /my 的路径需要访问权限
    if (options.url.indexOf('/my') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }

        // 全局统一挂载complete函数
        // 不论请求成功还是失败，最终都会执行complete函数
        // 认证失败时，不允许访问后台主页
        options.complete = function(res) {
            // console.log(res);
            // res.responseJSON获取返回的数据
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 强制清空token
                localStorage.removeItem('token')
                // 强制跳转到登录页
                location.href = './login.html'
            }
        }
    }
})