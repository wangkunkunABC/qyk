layui.config({
    base: STATICPATH + '/js/'
}).use(['jquery', 'cookie', 'form'], function() {
    var $ = layui.jquery,
        form = layui.form;
    if ($.cookie("rmbUser") === "true") {
        $("#rememberMe").prop("checked", true);
        $("#loginName").val($.cookie("loginName"));
        form.render(null, 'loginForm');
    }

    //  设置footer的行高开始
    var footHeight = $(".footer").height();
    $(".footer").css("line-height", footHeight + "px");
    //  设置footer的行高结束

    //设置表单的垂直位置开始
    var screenHeight = $(window).height();
    var formHeight = $(".main-form").height();
    $(".main-form").css({
    	marginTop: (screenHeight - formHeight) / 2,
    	display: 'block'
    });
    //设置表单的垂直位置结束

    //文本框被选中的时候颜色变化开始
    $(".user-input .layui-input").focus(function() {
        $(this).parents('.layui-form-item').find('img').attr('src', STATICPATH + '/images/username-hover.png');
        $(this).parents('.layui-form-item').find('.user-label').css("border-color", "#49A761");
    });
    $(".user-input .layui-input").blur(function() {
        $(this).parents('.layui-form-item').find('img').attr('src', STATICPATH + '/images/username.png');
        $(this).parents('.layui-form-item').find('.user-label').css("border-color", "#D2D2D2");
    });

    $(".pwd-input .layui-input").focus(function() {
        $(this).parents('.layui-form-item').find('img').attr('src', STATICPATH + '/images/password-hover.png');
        $(this).parents('.layui-form-item').find('.pwd-label').css("border-color", "#49A761");
    });
    $(".pwd-input .layui-input").blur(function() {
        $(this).parents('.layui-form-item').find('img').attr('src', STATICPATH + '/images/password.png');
        $(this).parents('.layui-form-item').find('.pwd-label').css("border-color", "#D2D2D2");
    });
    //文本框被选中的时候颜色变化结束
    
    document.onkeydown = function (e) {
    	//捕捉回车事件
        var ev = (typeof event!= 'undefined') ? window.event : e;
        if(ev.keyCode == 13) {
            $('[lay-filter="loginSubmit"]').click();
        }
    }

    //监听提交
    form.on('submit(loginSubmit)', function(data) {
        var loginName = $("#loginName").val();
        var password = $("#password").val();
        var rmbUser = $('[lay-filter="rememberMeSwitch"]')[0].checked;
        if (rmbUser) {
            $.cookie("rmbUser", "true", { expires: 7 }); // 存储一个带7天期限的 cookie
            $.cookie("loginName", loginName, { expires: 7 }); // 存储一个带7天期限的 cookie
        } else {
            $.cookie("rmbUser", "false", { expires: -1 }); // 删除 cookie
            $.cookie("loginName", '', { expires: -1 });
        }
        $.ajax({
	        cache: false,
	        type: "post",
	        url:"login",
	        data:{"loginName":loginName,"password":password,"rememberMe":rmbUser},
	        dataType:'json',
	        error: function(request) {console.log(request);},
	        success: function(res) {
                if (res.isSucc) {
                    location.href="../index";
                } else {
                    $("#errTips").empty().append(res.msg);
                }
	        }
	    });
        return false;
    });
});