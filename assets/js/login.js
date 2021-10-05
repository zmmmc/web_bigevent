$(function () {
  //点击‘去注册账号’链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  //点击‘去登录’链接
  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  //自定义验证规则  从layui中获取form对象 
  let form = layui.form
  let layer = layui.layer
  //通过form.verify()函数自定义
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须为6-12位，且不能出现空格'],
    //校验注册再次确认密码
    //通过形参value拿到第二次确认的密码
    repwd: function (value) {
      //拿到第一次输入密码并与第二次进行对比
      let pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码输入不一样'
      }
    }
  })

  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    //阻止默认提交行为
    e.preventDefault()
    //发起ajax的post请求，并用一个回调函数拿到服务器响应回的数据
    let data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        //利用layer.msg进行提示
        return layer.msg(res.message)
      }
      layer.msg('注册成功,请登录!')
      //模拟点击行为
      $('#link_login').click()
    })
  })

  //监听登录提交事件
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'post',
      //快速获取表单的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('用户名或密码错误！')
        }
        layer.msg('登陆成功')
        localStorage.setItem('token', res.token)
        //跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})
