<?php
	header("Content-Type:application/json");
	$did=$_REQUEST['did'] or die ('{"code":-2,"msg":"pid required"}');
	require("init.php");
	$sql="DELETE FROM an_cart_detail WHERE did=$did";
	$result=mysqli_query($conn,$sql);
	if($result===null){
		die ('{"code":-3,"msg":"删除失败"}');
	}else{
		echo '{"code":1,"msg":"删除成功"}';
	}
?>