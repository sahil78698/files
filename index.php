<?php

$file_path = "uploads/";

$file_path = $file_path . basename($_FILES['uploaded_file']['name']);
   if (!unlink($file_path . "HMM.zip")) { 
    echo ("$file_pointer cannot be deleted due to an error"); 
} 
else { 
    echo ("$file_pointer has been deleted"); 
} 
if(move_uploaded_file($_FILES['uploaded_file']['tmp_name'],$file_path)){
    echo $_FILES['uploaded_file']['tmp_name'];
}else{
    echo "fail";
}

?>
