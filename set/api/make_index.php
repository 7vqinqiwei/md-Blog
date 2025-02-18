<?php
    function make_index($blog_conf){

        $file = '../../index.html';
        $title = $blog_conf['blog_name'];
        // 读取 blog 参数
        $json_string = file_get_contents('../../data/blog.json');
        $blog_conf = json_decode($json_string, true);
        $arc_top_title = $blog_conf['arc_top_title'];
        
        // 读取 list.json
        $blog_list = read_file("../../data/list.json");
        $arr_list = json_decode($blog_list, true);

        // 置顶
        if(is_array($arr_list)) {
            foreach($arr_list as $key => $val){
                if($val['title'] == $arc_top_title){
                    $arr_list[$key]['title'] = '【置顶】'.$arr_list[$key]['title'];
                    $arr = $arr_list[$key];
                    unset($arr_list[$key]);
                    array_unshift($arr_list, $arr);
                }
            }
        }

        // 分页
        $res = page_arr($arr_list);
        $page_arr = $res['page_arr'];
        $total_page = $res['total_page'];

        // 读取 index.htm
        $index_tpl = read_file("../../tpl/index.htm");

        // 替换 header
        $header = read_file("../../blog/header.html");
        $index_tpl = str_replace("{header}", $header, $index_tpl);

        // 替换 side_list
        $side_list = read_file("../../blog/side_list.html");
        $index_tpl = str_replace("{side_list}", $side_list, $index_tpl);

        // 加载主题色
        $index_tpl = str_replace("{b_color}",$blog_conf['b_color'],$index_tpl);

        // Google Adsense
        if($blog_conf['gad_status'] == 'on'){
            $gad_code = $blog_conf['gad_code'];
        }else{
            $gad_code = '';
        }
        $index_tpl = str_replace("{google_adsense}",$gad_code,$index_tpl);
        $index_tpl = str_replace("{blog_name}",$blog_conf['blog_name'],$index_tpl);

        del_dir('../../index/');
        make_dir('../../index/');

        // 生成页面
        $path = '../../index/';
        make_list_page($page_arr, $title, $index_tpl, $total_page, $path);

        // 读取 list.htm 的第一页作为首页
        $blog = read_file("../../index/1.html");

        $index = str_replace('class="page_a" href="./', 'class="page_a" href="./index/', $blog);

        $blog_index_title = $blog_conf['blog_name'].'-第1页';
        // echo $blog_index_title;
        $index = str_replace($blog_index_title, $blog_conf['blog_name'], $index);

        write_file($file, $index);
        
        echo '[ok] 生成主页 ['.$file.']';
        echo '<br>';
    }
