<?php

$file_path = "uploads/";
$files = glob('uploads/*'); // get all file names
foreach($files as $file){ // iterate files
  if(is_file($file)) {
    unlink($file); // delete file
         echo ("$file_path has been deleted"); 

  }
}
$file_path = $file_path . basename($_FILES['uploaded_file']['name']);
//    if (!unlink($file_path . "HMM.zip")) { 
//     echo ("$file_path cannot be deleted due to an error"); 
// } 
// else { 
//     echo ("$file_path has been deleted"); 
// } 
if(move_uploaded_file($_FILES['uploaded_file']['tmp_name'],$file_path)){
    echo $_FILES['uploaded_file']['tmp_name'];
}else{
    echo "fail";
}

?>
