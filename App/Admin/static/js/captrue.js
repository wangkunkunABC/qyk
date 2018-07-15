/**
    高拍仪js
*/
layui.define(['laytpl', 'underscore'], function(exports) {
    var $ = layui.$,
        layer = layui.layer,
        laytpl = layui.laytpl,
        _ = layui.underscore,
        element = layui.element,
        table = layui.table;
        var cap; // 摄像头对象
        var startFlag = false; // 记录启动摄像头是否成功
        captrue = {
            config: {
            },
            set: function(options) {
                var that = this;
                $.extend(true, that.config, options);
                return that;
            },
            // 初始化浏览器判断
            checkBrowser: function() {
            	var checkResult = '浏览器不符合要求，请使用8.0以上版本IE或41版本以下Chrome';
            	var Sys = {};
                var ua = navigator.userAgent.toLowerCase();
                var s;
                (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
                (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
                (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
                (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

                if(Sys.ie){
                	if (Sys.ie == '6.0' || Sys.ie == '7.0') {
                		checkResult = "IE版本过低";
            		}else {
            			cap = $('#captrue_ie')[0];
            			checkResult = 'ie';
					}
                }else if (Sys.chrome) {
                	var version = Sys.chrome.substring(0,Sys.chrome.indexOf('.'));
                	if (version > 36) {
                		checkResult = "暂不支持36版本以上Chrome";
            		}else {
            			cap = $('#captrue_chrome')[0];
            			checkResult = 'chrome';
					}
            	}
                return checkResult;
            },

	         // 打开摄像头
	         startCap: function()
	         {
	         	//初始化摄像头
	         	var str = cap.bStopPlay();
	         	var str = cap.vSetResolution(7);
	         	startFlag = cap.bStartPlayRotate(0);
	         	startFlag = cap.bSetMode(1);
	         	startFlag = cap.bSetImageArea(2319,1,7681,9999);
	         	return startFlag;
	         },

	         // 关闭摄像头
	         stopCap: function()
	         {
	         	var stopFlag = cap.bStopPlay();
	         },

	         // 拍照并上传
	         saveAndUpload: function()
	         {
	         	if (startFlag) {
	         		//设置文件保存路径为临时目录
	         		var fileName = new Date().getTime();
	         		var filePath = cap.sGetTempPath() + "\Captrue\\";
	         		
	         		var existFlag = cap.bDirIsExist(filePath);
	         		// 如果目录不存在则创建
	         		if (!existFlag) {
	         			var createFlag = cap.bCreateDir(filePath);
	         		}
	         		// 保存图片
	         		var saveResult = cap.bSaveJPG(filePath,fileName);
	         		if (saveResult) {
	         			var hostName = location.hostname;
	         			var hostPort = location.port || '80';
	         			// 上传图片
	         			var uploadResult = cap.sUpLoadImageEx2(filePath+fileName+".jpg", hostName, hostPort, "/"+location.pathname.split('/')[1] + "/file/uploadCapture",false,false);
	         			if (uploadResult) {
	         				return JSON.parse(uploadResult);
	         			}
	         		}
	         	}
	         }
        }
    exports('captrue', captrue);
});