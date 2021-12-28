<?php

$file_path = "uploads/";

$file_path = $file_path . basename($_FILES['uploaded_file']['name']);
if(!file_exists($file_path)){
echo "okoko";
}else{
 echo "lll";   
}    
if(move_uploaded_file($_FILES['uploaded_file']['tmp_name'],$file_path)){
    echo "success";
}else{
    echo "fail";
}

?>
