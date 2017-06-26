<?php
header("Content-Type:application/json");
@$uid=$_REQUEST['uid'] or die('{"code":-2,"msg":"uid required"}');
require("init.php");
$sql="SELECT pid,title,price,pic,did,count FROM sn_product_detail,sn_cart_detail WHERE cartId=(SELECT cid FROM sn_cart WHERE userId=$uid) AND pid=productId";
$result=mysqli_query($conn,$sql);
$list=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($list);
?>