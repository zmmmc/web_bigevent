

$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  //为上传按钮绑定点击事件触发file选择框的点击事件

  $('#btnChooseImage').on('click', function () {
    $('#file').click()
  })

  let layer = layui.layer

  $('#file').on('change', function (e) {
    //获取用户选择的文件
    let filelist = e.target.files
    if (filelist.length === 0) {
      return layer.msg('请选择头像图片')
    }
    //拿到用户选择的图片
    let file = filelist[0]
    //获取文件的地址
    let imgURL = URL.createObjectURL(file)
    //初始化裁剪区域
    $image
      .cropper('destroy')    //摧毁旧的裁剪区域
      .attr('src', imgURL)   //重新设置图片
      .cropper(options)      //重新初始化裁剪区域
  })

  $('#btnUpload').on('click', function () {
    //拿到用户裁剪后的头像
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    //调用接口，将头像传递到服务器
    $.ajax({
      method: 'post',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更换头像失败')
        }
        layer.msg('更换头像成功')
        window.parent.getUserInfo()
      }
    })
  })

})
