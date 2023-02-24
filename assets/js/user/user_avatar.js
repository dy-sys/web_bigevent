$(function () {
    let layer = layui.layer
    // 获取裁剪区域 DOM 元素
    let $image = $('#image')

    const options = {
        // 设置裁剪区域横纵比
        aspectRatio: 1,
        // 设置预览区
        preview: '.img-preview'
    }

    // 创建裁剪区域
    $image.cropper(options)

    // 为上传按钮绑定点击事件
    $('#uploadImage').on('click', function (e) {
        e.preventDefault()

        $('#file').click()
    })

    // 为文件框绑定 change 事件
    $('#file').on('change', function (e) {
        // 通过 e 事件对象获取用户选择的图片
        let filelist = e.target.files

        if (filelist.length === 0) {
            return layer.msg('请选择图片！')
        }

        // 获取用户选择的首个文件
        let file = filelist[0]

        let newImgUrl = URL.createObjectURL(file)

        $image
            .cropper('destroy') // 销毁原有的图片
            .attr('src', newImgUrl) // 设置新图片的路径
            .cropper(options) //重新初始化裁剪区域
    })

    // 为确定按钮绑定点击事件
    $('#confirm').on('click', function () {
        // 将裁剪区域输出为图片
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 调用接口上传头像到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('上传头像失败！')
                }

                layer.msg('上传头像成功！')

                // 调用父页面中的方法重新渲染图像
                window.parent.getUserinfo()
            }
        })
    })
})