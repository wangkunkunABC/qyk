<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
    <meta http-equiv="expires" content="Thu, 01 Jan 1970 00:00:01 GMT" />
    <meta http-equiv="expires" content="0" />
    <title>券一筐管理系统</title>
    <base href="http://localhost/qyk/App/Admin/static/">
    <link rel="shortcut icon" href="images/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="plugins/layui/css/layui.css" media="all" />
    <link rel="stylesheet" type="text/css" href="plugins/font-awesome/css/font-awesome.min.css" media="all" />
    <link rel="stylesheet" type="text/css" href="css/app.css?t=${version!}" media="all" />
    <link rel="stylesheet" type="text/css" href="css/customer-detail.css?t=${version!}" media="all" />
    <link rel="stylesheet" type="text/css" href="css/index.css?t=${version!}" media="all" />
    <link rel="stylesheet" type="text/css" href="css/iconfont.css?t=${version!}" media="all" />
</head>

<body class="kit-theme">
    <div class="layui-layout layui-layout-admin kit-layout-admin">
        <div class="layui-header">
            <div class="layui-logo"><img alt="logo" src="images/logo.png" style="height:37px;"></div>
            <ul class="layui-nav layui-layout-right kit-nav">
                <li class="layui-nav-item">
                    <a href="javascript:;">
                        <img src="images/touxiang.png" class="layui-nav-img">
                        超级管理员
                    </a>
                    <dl class="layui-nav-child">
                        <dd><a href="javascript:;" class="view-password">修改密码</a></dd>
                        <dd><a href="javascript:;" class="view-logout">注销</a></dd>
                    </dl>
                </li>
            </ul>
        </div>
        <div class="layui-side layui-bg-black kit-side">
            <div class="layui-side-scroll">
                <div class="kit-side-fold"><i class="fa fa-navicon" aria-hidden="true"></i></div>
                <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
                <ul class="layui-nav layui-nav-tree" lay-filter="kitNavbar" kit-navbar>
                    <!-- 根据用户权限获取菜单列表 -->
              			<li class="layui-nav-item " id="10">
	                        <a href="javascript:;" kit-target="" data-options="{url:'home',icon:'icon-shouye',title:'首页',id:'10',init:'Home.mgr.init()'}">
	                                    <i class="iconfont icon-shouye"></i><span>首页</span></a>
	                    </li>
	              			<li class="layui-nav-item layui-nav-itemed">
	                        <a href="javascript:;"><i class="iconfont icon-zigeguanli" aria-hidden="true"></i><span>用户管理</span><span class="layui-nav-more"></span><span class="ripple show" style="width: 200px; height: 200px; top: -86px; left: -11px;"></span></a>
	                        <dl class="layui-nav-child">
			                            <dd id="29" class="">
			                                <a href="javascript:;" kit-target="" data-options="{url:'customer/index',icon:'icon-huanzhexinxi',title:'用户信息',id:'29',init:'Customer.mgr.init()'}">
			                                    <i class="iconfont icon-huanzhexinxi"></i><span>用户信息</span></a>
			                            </dd>
	                        </dl>
	                    </li>
                </ul>
            </div>
        </div>
        <div class="layui-body" id="container">
            <!-- 内容主体区域 -->
            <div style="padding: 15px;"><i class="layui-icon layui-anim layui-anim-rotate layui-anim-loop">&#xe63e;</i> 请稍等...</div>
        </div>
        <div class="layui-footer">
            <!-- 底部固定区域 -->
            <div class="layui-row">
            	<p class="layui-col-md4">© 券一筐 </p>
				<p class="layui-col-md4">当前版本1.0.0</p>
				<p class="layui-col-md4">技术支持：券一筐技术信息有限公司</p>
            </div>
        </div>
    </div>
    
    <!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
    <!--[if lt IE 9]>
      <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
      <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    
    <script src="plugins/layui/layui.js"></script>
    <script>
    var mainUrl = "/qyk/index.php/Admin/Index/",
        Home = {},
    	Customer = {};
    
    layui.config({
        base: './js/'
    }).use(['index'], function() {
        var index = layui.index;
        index.set({
            type: 'page'
        }).init();
    });
    </script>
    <script src="js/init/home.js?t=${version!}"></script>
    <script src="js/init/customer.js?t=${version!}"></script>
</body>

</html>