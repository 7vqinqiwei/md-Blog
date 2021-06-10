<?php
    function read_file($tpl_name){
        $fp = fopen($tpl_name, "r") or die("Unable to open file!".$tpl_name);
        $tpl = fread($fp,filesize($tpl_name));
        fclose($fp);
        return $tpl;
    }
    