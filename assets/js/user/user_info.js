$(function () {
    let form = layui.form
    let layer = layui.layer

    // 设置表单验证规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符'
            }
        }
    })

    // 调用函数初始化用户信息
    inituserInfo()

    // 初始化用户基本信息
    function inituserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                let data = res.data

                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }

                // 向表单填充用户信息
                form.val('formUserInfo', data)
            }
        })
    }

    // 提交按钮，提交用户信息
    $('form').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败！')
                }

                layer.msg('修改成功！')

                // 调用父页面中的方法，重新渲染用户头像与用户名
                window.parent.getUserinfo()
            }
        })
    })

    // 重置按钮
    $('#btnReset').on('click', function (e) {
        // 阻止表单默认重置行为
        e.preventDefault()

        // 重新获取用户信息
        inituserInfo()
    })
})