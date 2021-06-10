<?php
    // 读取 list.json
    function make_list(){
        $file = "../../data/list.json";
        $fp = fopen($file, "r") or die("Unable to open file!".$file);

        $data = fread($fp,filesize($file));
        fclose($fp);
        
        $items = json_decode($data, true);

//         // Start 生成 side_list.html
//         $strs = '';
        $list_side_names = array();
        $list_names = array();
        if(is_array($items)) {
            foreach($items as $val){
                if(in_array($val['list_name'], $list_names)){

                }else{
                    $list_names[] = $val['list_name'];
                }
                $list_side_names[] = $val['list_name'].'$'.$val['list_id'];
            }
        }
//
//         $arr_count = array_count_values($list_side_names);
//
//         foreach($arr_count as $key => $val){
//             $name_arr = explode('$',$key);
//             $strs = $strs.'<li class="box"><a href="/blog/'.$name_arr[1].'/1.html">'.$name_arr[0].' ['.$val.']</a></li>';
//         }
//
//         // 读取 blog 参数
        $json_string = file_get_contents('../../data/blog.json');
        $blog_conf = json_decode($json_string, true);

        $blog_conf['my_info'] = str_replace('\r', '<br>', $blog_conf['my_info']);

        // 读取 list.htm
        $list_tpl = read_file("../../tpl/list.htm");

        // 替换 header
        $header = read_file("../../blog/header.html");
        $list_tpl = str_replace("{header}",$header,$list_tpl);

        // 替换 side_list
        $side_list = read_file("../../blog/side_list.html");
        $list_tpl = str_replace("{side_list}",$side_list,$list_tpl);

        // 加载主题色
        $list_tpl = str_replace("{b_color}",$blog_conf['b_color'],$list_tpl);
        
        // Google Adsense
        if($blog_conf['gad_status'] == 'on'){
            $gad_code = $blog_conf['gad_code'];
        }else{
            $gad_code = '';
        }
        $list_tpl = str_replace("{google_adsense}",$gad_code,$list_tpl);

        $list_tpl = str_replace("{blog_name}",$blog_conf['blog_name'],$list_tpl);
        
        $strs = '';

        foreach($list_names as $list){
            $item_str = '';
            $list_id = 0;
            $list_arr = array();

            foreach($items as $item){
                if($item['list_name'] === $list){
                    $list_id = $item['list_id'];
                    array_push($list_arr, $item);
                    $str = json_encode($list_arr);
                    $list_json_dir = '../../blog/'.$list_id.'/list.json';
                    write_file($list_json_dir, $str);
                }
            }

            // 根据 list.json 生成列表
            $str = read_file("../../blog/".$list_id."/list.json");
            $now_list = json_decode($str, true);

            // 分页
            $res = page_arr($now_list);
            $page_arr = $res['page_arr'];
            $total_page = $res['total_page'];

            // 生成页面
            $path = '../../blog/'.$list_id.'/';
            $title = $list;
            make_list_page($page_arr, $title, $list_tpl, $total_page, $path);
        }
    }
