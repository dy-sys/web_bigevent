$(function () {
    let form = layui.form

    // 定义表单校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function(value) {
            if(value === $('[name=oldPwd]').val()){
                return '新密码不能与原密码相同!'
            }
        },
        repwd: function(value) {
            if(value !== $('[name=newPwd]').val()) {
                return '两次密码不一致,请重新输入!'
            }
        }
    })

    $('form').on('submit',function(e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('更新密码成功！')

                // 转换成DOM元素后，调用reset方法重置表单
                $('form')[0].reset()
            }
        })
    })
})