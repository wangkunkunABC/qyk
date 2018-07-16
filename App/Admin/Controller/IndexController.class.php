<?php
namespace Admin\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
    	// 如果没有登录，重定向到登录页面
    	!session('?admin_id') && $this->redirect('./login');

    	// 展示后台管理首页
        $this->display();
    }
}