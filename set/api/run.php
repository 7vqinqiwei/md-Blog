<?php
    date_default_timezone_set("Asia/Shanghai");
    require_once('./Parser.php');
    require_once('./del_dir.php');
    require_once('./read_file.php');
    require_once('./write_file.php');
    require_once('./make_dir.php');
    require_once('./make_html.php');
    require_once('./read_md.php');
    require_once('./read_item.php');
    require_once('./make_header.php');
    require_once('./make_index.php');
    require_once('./make_side_list.php');
    require_once('./make_search.php');
    require_once('./make_list.php');
    require_once('./make_list_page.php');
    require_once('./page_bar.php');
    require_once('./clear_cache.php');

    if(isset($_POST['run'])){
        echo '开始 >>';
        echo '<br>';

        // 读取配置
        $fg = file_get_contents("../../data/blog.json");
        $blog_conf = json_decode($fg, true);

        // 点击目录检测
        if(!file_exists("../../data/click"))make_dir('../../data/click');

        // 清空目录
        del_dir('../../blog');

        // 新建目录
        make_dir('../../blog');

        // 新建存放html目录
        make_dir('../../blog/html');

        // 生成页头

        make_header($blog_conf, '../../');
        echo '生成头部';

        make_side_list();

        // 读取 md
        read_md('../../md');
        echo '生成MD';

        // 生成 list
        make_list();
        echo '生成列表';

        // 生成首页
        make_index($blog_conf);
        echo '生成首页';

        // 生成搜索页
        make_search();
        echo '生成收索爷';

        // 清理缓存点击
        clear_cache();
        echo '清楚缓存';
    }
