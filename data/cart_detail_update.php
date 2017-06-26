<?php
	header("Content-Type:application/json");
	@$did=$_REQUEST['did'] or die('{"code":-2,"msg":"did required"}');
	@$count=$_REQUEST['count'] or die('{"code":-3,"msg":"count required"}');
	require("init.php");
	$sql="UPDATE sn_cart_detail SET count=$count WHERE did=$did";
	$result=mysqli_query($conn,$sql);
	if($result===false){
		die ('{"code":-4,"msg":"更新失败"}');
	}else{
		echo '{"code":1,"msg":"更新成功"}' ;
	}
?>