<?php
namespace Admin\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
    	// 如果没有登录，重定向到登录页面
    	!session('?loginName') && $this->redirect('./login');

    	// 展示后台管理首页
        $this->display();
    }

    public function logout(){
    	session(null);
    	//$this->redirect('./login');
        $this->ajaxReturn(array('isSucc' => true, 'msg'=>'退出成功'));
    }
}