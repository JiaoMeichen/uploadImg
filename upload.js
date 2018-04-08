var objUrl;
/*上传证件：
 * file：hidden里填充的值，返回结果,hidden的class
 * id：input  file的id
 * img：用于图片显示
 * */
/*图片类型：jpg png jpeg
 *图片大小：1MB
 * */
function uploadFile(file, id, img) {
	/*显示图片*/
	var _this = $("." + id).get(0);
	console.log(_this.files)
	if((_this.files[0].size / 1024).toFixed(2) > 1024) { //大于1M
		/*layer.open({
			title: '提示',
			content: '图片大小请控制在1MB之内哦~'
		});
		return;*/
	} else {
		if(_this.files && _this.files[0]) {
			objUrl = getObjectURL(_this.files[0]);
			console.log(objUrl)
			if(objUrl) {
				$("." + img).attr("src", objUrl);
			} else {
				//IE下，使用滤镜
				_this.select();
				var imgSrc = document.selection.createRange().text;
				var localImagId = document.getElementsByClassName("idcard_bg")[0];
				//图片异常的捕捉，防止用户修改后缀来伪造图片
				try {
					preload.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = data;
				} catch(e) {
					_this._error("filter error");
					return;
				}
				_this.img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + data + "\")";
			}
		}
	}

	/*end显示图片*/
	/*上传图片*/
	var formData = new FormData();
	formData.append('file', $('.' + id)[0].files[0]);
	$.ajax({
		url: 'http://dev.pandawanwan.cn/uploadIdNum',
		type: 'POST',
		cache: false,
		data: formData,
		processData: false,
		contentType: false,
		beforeSend: function(request) {
			request.setRequestHeader("userId", 4);
			layer.msg('正在上传，请稍后~', {
				time: 100000
			});

		},
		success: function(res) {
			console.log(res)
			if(res == "-1") { /*失败*/
				layer.open({
					title: '提示',
					content: '图片大小请控制在1MB之内哦~'
				});
			} else { /*成功*/
				layer.open({
					title: '提示',
					content: '上传成功！'
				});
				$("." + file).val(res.data.fileName); /*显示结果到value中*/
				console.log(_this)
			}
		},
		error: function(res) {
			layer.open({
				title: '提示',
				content: '上传失败，请稍后再试~'
			});
		}
	})
	/*end上传图片*/
}

//建立一個可存取到該file的url
function getObjectURL(file) {
	var url = null;
	if(window.createObjectURL != undefined) { // basic
		url = window.createObjectURL(file);
	} else if(window.URL != undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file);
	} else if(window.webkitURL != undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}