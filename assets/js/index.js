$(function () {

  //获取用户基本信息
  getUserInfo()

  function getUserInfo() {
    $.ajax({
      method: 'get',
      url: '/my/userinfo',
      //请求头配置对象
      // headers: {
      //   Authorization: localStorage.getItem('token') || ""
      // },
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg('获取用户信息失败！')
        }
        return renderAvatar(res.data)
      }
      // ,
      // complete: function (res) {
      //   //在complete回调函数中，可以使用res.responseJSON拿到服务器响应的数据
      //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      //     //强制清空token
      //     localStorage.removeItem('token')
      //     //跳转回登录页面
      //     location.href = '/login.html'
      //   }
      // }
    })
  }


  //渲染用户的头像
  function renderAvatar(user) {
    //获取用户名称
    let name = user.nickname || user.username
    //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //渲染用户头像
    if (user.user_pic !== null) {
      //图片头像
      $('.layui-nav-img').attr('src', user.user_pic).show()
      $('.text-photo').hide()
    } else {
      //文本头像
      $('.layui-nav-img').hide()
      let first = name[0].toUpperCase()
      $('.text-photo').html(first).show()
    }
  }

  let layer = layui.layer
  //退出功能
  $('#btn-logout').click(function () {
    //提示用户是否确认退出
    layer.confirm('确定退出吗？', { icon: 3, title: '提示' }, function (index) {
      //清空本地的token 
      localStorage.removeItem('token')
      //跳转到登录页面
      location.href = '/login.html'
      //关闭弹出框
      layer.close(index)
    })
  })
})
