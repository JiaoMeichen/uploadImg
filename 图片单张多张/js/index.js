var imgFile = []; //文件流
var imgSrc = []; //图片路径
var imgName = []; //图片名字

//图片上传
$('#upload').on('change', function() {

	if(imgSrc.length >= 5) {
		return alert("最多只能上传5张图片");
	}
	var imgBox = '.content-img-list';
	var fileList = this.files;
	var _old = imgSrc.length;//已有图片
	var _choose =  fileList.length;//选中图片
	if(_choose <= 5 - _old){//不多于五张
		for(var i = 0; i < _choose; i++) {
			var imgSrcI = getObjectURL(fileList[i]);
			imgName.push(fileList[i].name);
			imgSrc.push(imgSrcI);
			imgFile.push(fileList[i]);
		}
	}else{
		return alert("最多只能上传5张图片");
	}
	
	if(imgSrc.length >= 5) { //隐藏上传按钮
		$('.content-img .file').hide();
	}
	addNewContent(imgBox);
	this.value = null; //解决无法上传相同图片的问题
})

//提交请求
$('#btn-submit-upload').on('click', function() {
	console.log("图片名称："+imgName)
	console.log("图片路径："+imgSrc)
	// FormData上传图片
	var formFile = new FormData();
	// formFile.append("type", type); 
	// formFile.append("content", content); 
	// formFile.append("mobile", mobile); 
	// 遍历图片imgFile添加到formFile里面
	$.each(imgFile, function(i, file) {
		formFile.append('myFile[]', file);
	});
	console.log(imgFile)
    $.ajax({
        url: '',
        type: 'POST',
        data: formFile,
        async: true,  
        cache: false,  
        contentType: false, 
        processData: false, 
        dataType:'json',
        success: function(res) {
            console.log(res);
            if(res.code==0){
              
            }else{
           
			}
        }
    })
});

// 鼠标经过显示删除按钮
$('.content-img-list').on('mouseover', '.content-img-list-item', function() {
	$(this).children('a').removeClass('hide');
});
// 鼠标离开隐藏删除按钮
$('.content-img-list').on('mouseleave', '.content-img-list-item', function() {
	$(this).children('a').addClass('hide');
});
// 单个图片删除
$(".content-img-list").on("click", '.content-img-list-item a', function() {
	var index = $(this).attr("index");
	imgSrc.splice(index, 1);
	imgFile.splice(index, 1);
	imgName.splice(index, 1);
	var boxId = ".content-img-list";
	addNewContent(boxId);
	if(imgSrc.length < 5) { //显示上传按钮
		$('.content-img .file').show();
	}
});

//获取图片index下标属性，通过js的splice方法删除数组元素，重新调用addNewContent方法遍历图片数组显示预览图片
function removeImg(obj, index) {
	imgSrc.splice(index, 1);
	imgFile.splice(index, 1);
	imgName.splice(index, 1);
	var boxId = ".content-img-list";
	addNewContent(boxId);
}

//创建一个addNewContent方法用于动态展示添加的图片实现图片预览，在每次上传图片的时候调用该方法
function addNewContent(obj) {
	// console.log(imgSrc)
	$(obj).html("");
	for(var a = 0; a < imgSrc.length; a++) {
		var oldBox = $(obj).html();
		$(obj).html(oldBox + '<li class="content-img-list-item"><img src="' + imgSrc[a] + '" alt=""><a index="' + a + '" class="hide delete-btn"><i class="ico-delete"></i></a></li>');
	}
}

//getObjectURL方法是一个用于获取本地图片的地址，使用该url可以显示图片
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