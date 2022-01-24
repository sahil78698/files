<?php
$files = glob('uploads/*'); // get all file names
foreach($files as $file){ // iterate files
         echo ("$file"); 
}

?>
