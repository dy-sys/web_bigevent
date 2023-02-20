$(function () {
  // 点击去注册按钮
  $('#link_login').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  $('#link_reg').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  // 设置表单验证规则
  // 导入 layui 中的对象
  let form = layui.form
  let layer = layui.layer

  form.verify({
    username: function (value, item) { //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return '用户名不能有特殊字符';
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return '用户名首尾不能出现下划线\'_\'';
      }
      if (/^\d+\d+\d$/.test(value)) {
        return '用户名不能全为数字';
      }

      //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
      if (value === 'xxx') {
        alert('用户名不能为敏感词');
        return true;
      }
    },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],

    repwd: function (value) {
      // [] 表示属性选择器
      let pwd = $('.reg-box [name=password]').val()

      if (pwd !== value) {
        return '两次密码不一致,请重新输入!'
      }
    }
  })

  // 调用接口注册用户
  $('#form_reg').on('submit', function (e) {
    // 阻止默认提交行为
    e.preventDefault()

    let data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }

    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }

      layer.msg('注册成功，请登录！');

      // 模拟人的点击事件
      $('#link_reg').click()
    })
  })

  // 监听用户登录请求
  $('#form_login').on('submit', function (e) {
    e.preventDefault()

    // let data = {
    //   username: $('#form_login [name=username]').val(),
    //   password: $('#form_login [name=password]').val()
    // }

    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }

        // 登录成功提示信息
        layer.msg(res.message)

        // 将得到的 token 存到本地存储中，用于访问其它内容时进行认证
        localStorage.setItem('token', res.token)

        // 跳转到主页
        location.href = './index.html'
      }
    })

  })
})