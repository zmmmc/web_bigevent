$(function () {
  let form = layui.form

  form.verify({
    nickname: function (value) {
      if (value.length > 12 && value.length < 3) {
        return '昵称必须在3-12个字符之间'
      }
    }
  })

  initUserInfo()
  let layer = layui.layer
  //初始化用户信息
  function initUserInfo() {
    $.ajax({
      method: 'get',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        // console.log(res)
        //调用form.val()快速为表单赋值
        form.val('formUserInfo', res.data)
      }
    })
  }


  //重置表单数据
  $('#btn-reset').click(function (e) {
    e.preventDefault()
    initUserInfo()
  })

  //监听表单提交事件
  $('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return '修改数据失败！'
        }
        layer.msg('更新数据成功！')
        //调用父页面的方法，重新渲染用户的头像
        window.parent.getUserInfo()
      }

    })
  })

})
