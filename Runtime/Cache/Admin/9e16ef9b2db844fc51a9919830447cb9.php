<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>券一筐管理系统</title>
    <base href="http://localhost/qyk/App/Admin/static/">
    <link rel="shortcut icon" href="images/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="plugins/layui/css/layui.css" media="all" />
    <link rel="stylesheet" type="text/css" href="css/login.css" media="all" />
</head>

<body>
    <!--主体内容开始-->
	<div class="main">
		<div class="fl">
			<div class="top-cont">
				<div class="logo-title">
					<p>欢迎登录</p>
					<p>券一筐管理系统</p>
				</div>
				<div class="pics">
					<img src="http://localhost/qyk/App/Admin/static/images/pics-1.png" />
					<img src="http://localhost/qyk/App/Admin/static/images/pics-2.png" />
					<img src="http://localhost/qyk/App/Admin/static/images/pics-3.png" />
				</div>
			</div>
			<div class="bottom-footer"></div>
		</div>
		<div class="fr">
			<div class="main-form" style="display:none;">
					<form class="layui-form layui-form-pane" lay-filter="loginForm">
				<div class="form-title">
					<p>管理员登录</p>
					<p>Login</p>
				</div>
				<div class="layui-form-item">
				    <label class="layui-form-label user-label"><img src="http://localhost/qyk/App/Admin/static/images/username.png"/></label>
				    <div class="layui-input-block user-input">
				      <input type="text" id="loginName" name="loginName" autocomplete="off" placeholder="请输入用户名" class="layui-input" lay-verify="required">
				    </div>
				</div>
				<div class="layui-form-item">
				    <label class="layui-form-label pwd-label"><img src="http://localhost/qyk/App/Admin/static/images/password.png"/></label>
				    <div class="layui-input-block pwd-input">
				      <input type="password" id="password" name="password" autocomplete="off" placeholder="请输入密码" class="layui-input" lay-verify="required">
				      <input style="display:none" type="password" name="password"/>
				    </div>
				</div>
				<div class="layui-form-item switch-item switch-form">
			      	<input type="checkbox" name="rememberMe" lay-skin="switch" lay-filter="rememberMeSwitch" id="rememberMe" title="开关">
			      	<span class="switch-input" >记住我</span>
			    </div>
			    <div class="layui-form-item sub-btn">
				    <input type="button" class="layui-btn sub" lay-submit value="登录" lay-filter="loginSubmit" />
				</div>
				<div class="layui-form-item tip">
				    <p id="errTips"></p>
				</div>
				</form>
			</div>
		</div>
	</div>
	<!--主体内容结束-->
	<!--底部内容开始-->
	<div class="footer">
		<div class="layui-row">
          	<p class="layui-col-md4">© 券一筐 </p>
			<p class="layui-col-md4">当前版本1.0.0  </p>
			<p class="layui-col-md4">技术支持：券一筐技术信息有限公司</p>
        </div>
	</div>
	<!--底部内容结束-->
    
    
    <!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
    <!--[if lt IE 9]>
      <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
      <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script src="plugins/layui/layui.js"></script>
    
    <script src="js/login.js"></script>
</body>
</html>