<?php
if (isset($_FILES['qrImg'])) {
    $type = $_FILES['qrImg']['type'];
    $file_type = str_replace('image/', '.', $type);

    $file_name = $_POST['fileName'];
    $file_path = '../../data/'.$file_name.$file_type;
    move_uploaded_file($_FILES['qrImg']['tmp_name'], $file_path);
    echo $file_path;
} else {
    echo 'No File';
}
