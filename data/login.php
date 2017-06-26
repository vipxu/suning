<?php
header("Content-Type:application/json");
@$uname=$_REQUEST['uname'] or die('{"code":-2,"msg":"用户名不能为空"}');
@$upwd=$_REQUEST['upwd'] or die('{"code":-3,"msg":"密码不能为空"}');
require("init.php");
$sql="SELECT * FROM sn_user WHERE uname='$uname' AND upwd='$upwd'";
$result=mysqli_query($conn,$sql);
$user=mysqli_fetch_assoc($result);
if($user==null){
    echo ('{"code":-4,"msg":"用户名或密码不对，请检查后重新输入"}');
}else{
    echo ('{"code":2,"msg":"登陆成功","uid":'.$user['uid'].'}');
}
?>