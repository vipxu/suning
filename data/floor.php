<?php
    header("Content-Type:application/json");
    require('init.php');
    $sql="SELECT navName,fid,cateId FROM sn_floor_nav";
    $result=mysqli_query($conn,$sql);
    $navList=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $sql="SELECT a.fid,a.cateId,b.pid,b.title,b.price,b.pic FROM sn_floor_nav as a,sn_product_detail as b WHERE a.cateId=b.cateId";
    $result1=mysqli_query($conn,$sql);
    $productList=mysqli_fetch_all($result1,MYSQLI_ASSOC);
    $output=[
        "navList"=>$navList,
        "productList"=>$productList
    ];
    echo json_encode($output);
?>