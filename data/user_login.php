<?php
	header("Content-Type:application/json");
	@$uname=$_REQUEST['uname'] or die ('{"code":-2,"msg":"用户名不能为空}');
	@$upwd=$_REQUEST['upwd'] or die('{"code":-3,"msg":"密码不能为空}');
	require("init.php");
	$sql="SELECT uid FROM sn_user WHERE uname='$uname' AND upwd='$upwd'";
	$result=mysqli_query($conn,$sql);
	$list= mysqli_fetch_assoc($result);
	if($list===null){
		echo ('{"code":-1,"msg":"用户名或密码错误"}');
	}else{
		$uid=$list['uid'];
		$output=[
			'code'=>1,
			'msg'=>'登录成功',
			'uname'=>$uname,
			'uid'=>$uid
		];
		echo json_encode($output);
	}
?>