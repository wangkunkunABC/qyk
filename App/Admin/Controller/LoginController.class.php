<?php
namespace Admin\Controller;
use Think\Controller;
class LoginController extends Controller {
    public function Index(){
        $this->display('login');
    }

    public function login(){
    	$uname = $_POST['loginName']; // 获取用户名
    	$upwd = $_POST['password'];   // 获取密码


    	if(!empty($uname)&&!empty($upwd)){//如果用户名和密码非空
    		$User = D('User');
    		// 验证用户名
	    	$has = $User->where('name="'.$uname.'"')->find();

	    	if(empty($has)){
	    		$data = array('isSucc' => false, 'msg'=>'用户名错误');
	    		$this->ajaxReturn($data);
	    	}
	    	// 验证密码
	    	if($has['password'] != md5($upwd)){
	    		$data = array('isSucc' => false, 'msg'=>'密码错误');
	    		$this->ajaxReturn($data);
	    	}
    	}else{
    		$this->ajaxReturn("用户名或密码为空");
    	}

    	$_SESSION['loginName']=$uname;

    	$this->ajaxReturn(array('isSucc' => true, 'msg'=>'登陆成功'));
    }
}