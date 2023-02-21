$(function () {
    // 导入 layui 中的对象
    let layer = layui.layer
    // 调用getUserInfo获取用户信息
    getUserinfo()

    $('#btnLogout').on('click', function (e) {
        // e.preventDefault()
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            // 点击确定时执行的回调函数
            // 跳转到登录页
            location.href = './login.html'
            // 清除 token
            localStorage.removeItem('token')

            layer.close(index)
        })
    })
})

// 获取用户信息
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象(已在 baseAPI.js 中配置)
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }

            // 调用函数，渲染用户头像与用户名
            renderAvatar(res.data)
        }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    let name = user.nickname || user.username

    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()

        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}