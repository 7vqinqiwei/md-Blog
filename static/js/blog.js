hljs.initHighlightingOnLoad();
function copy_code(id){
    var copy_val = $("#"+id).text();
    $("#copy_code").val(copy_val);
}

function alert_msg(type,txt){
    $("#msg_box").removeClass().addClass(type).fadeIn(300);
    $("#msg_txt").text(txt);
    setTimeout(() => {
        $("#msg_box").fadeOut(300);
    }, 2000);
}

$(function(){
    // 空白页打开
    $('.b-body').find('a').attr("target","_blank");

    // code 行号
    $('pre code').each(function(index){
        $(this).html("<ol id=\"copy_"+index+"\"><span class=\"line_num\"></span><li>" + $(this).html().replace(/\n/g,"\n</li><span class=\"line_num\"></span><li>") +"\n</li></ol>");
        $(this).parent().append('<div onclick="copy_code(\'copy_'+index+'\')" class=\"code_bar\"><div class="copy_btn" data-clipboard-action="copy" data-clipboard-target="#copy_code"><i class="fa fa-clipboard fa-fw"></i>复制<div></div>');
    });

    var clipboard = new ClipboardJS('.copy_btn');
    clipboard.on('success', function(e) {
        alert_msg('msg_success','已复制到剪贴板');
        e.clearSelection();
    });

    // 调取侧栏
    $('.side_list').load('../../blog/side_list.html');

    // 访问 +1
    var now_url = window.location.pathname;
    var now_id = now_url.match(/\/\d+.html$/g);
    if(now_id != null){
        now_id = now_id.toString().replace(/\//,'').replace(/.html/,'');
        $.ajax({
            type:"POST",
            cache: false,
            url:"../../set/api/click.php",
            data: "click=" + now_id
        })
    }

    setTimeout(() => {
        $('.click_number').each(function(){
            var _this = $(this);  
            var now_url = window.location.pathname;
            var now_id = now_url.match(/\/\d+.html$/g).toString().replace(/\//,'').replace(/.html/,'');
            var file = '../../data/click/'+now_id;
            // 访问+1效果
            $('.click_number').parent().css({'position':'relative'}).append('<div id="add_one_view" style="color: red;font-size: 6rem;position: absolute;right: 0rem;bottom:-1rem;font-weight: bold;display:none">+1</div>');
            $('#add_one_view').fadeIn('800');
            setTimeout(()=>{
                $('#add_one_view').animate({'fontSize': '1rem','bottom':'0.1rem'},800).fadeOut('500');
            }, 500)
            $.getJSON(file,{random:Math.random()},function(res){
                o_num = res - 1;
                _this.text('浏览：' + o_num);
                setTimeout(() => {
                    _this.text('浏览：' + res);
                }, 1000);
            })
        })
    }, 500);

    // right_nav 右侧悬浮文章导航
    var right_nav = '';
    $('#blog_body h1').each(function(e){
        e = e + 1;
        $(this).attr('id', 'bt_' + e);
        // $(this).attr('name', 'bt_' + e);
        right_nav = right_nav + '<li class="box"><a class="right_nav_item" href="#bt_' + e + '"> ' + $(this).text() + '</a></li>';
    })
    if(right_nav !== ''){
        right_nav = '<br><div id="right_nav" class="b-box boxes">' + right_nav + '</div>';
        setTimeout(function(){
            $('.fix_content_html').html(right_nav)
            // 追加到右侧栏
            $('.side_list').append(right_nav);
            // 钉住
            $('#right_nav').pin({minWidth: 940, padding:{top: 20}});
            // 平滑滚动
            $('.right_nav_item').click(function () {
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - 30
                }, 500);
                return false;
            });
            var pin_height = $('.pin-wrapper').height();
            var win_height = $(window).height();
            var right_height = win_height - 50;
            if(pin_height > win_height){
                $('#right_nav').css({'height': right_height, 'overflow': 'auto'});
            }
        }, 300);
    }
    
    setTimeout(function(){
        $('#pop_ad,.wrap-picture-show-gw,.action-from-gw,.section-service-w').remove();
    }, 1000)

    // 生成 PDF
    var to_pdf = '<div class="to_pdf">PDF</div>';
    $("body").append(to_pdf);
    $(".to_pdf").click(function(){
        var element = document.getElementById('blog_body');
        html2pdf(element);
    })

    // 切换背景色
    var fix_brush = '<div class="fix_brush"><input id="fix_brush_key" type="hidden" value="0"><svg t="1589446700279" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10474" width="30" height="30"><path d="M277.333333 554.666667a64 64 0 1 1 0-128 64 64 0 0 1 0 128z m469.333334 0a64 64 0 1 1 0-128 64 64 0 0 1 0 128z m-128-170.666667a64 64 0 1 1 0-128 64 64 0 0 1 0 128z m-213.333334 0a64 64 0 1 1 0-128 64 64 0 0 1 0 128zM512 943.744C276.352 943.744 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667c0 124.970667-113.28 289.28-320 226.389333-69.205333-21.034667 92.586667 205.354667-106.666667 205.354667z m0-85.333333a119.466667 119.466667 0 0 0 18.688-1.28c-0.170667-2.005333-0.341333-4.821333-0.682667-8.448-0.853333-8.533333-2.517333-18.133333-5.546666-32.554667l-2.986667-14.037333c-1.237333-5.973333-2.133333-10.538667-2.986667-15.061334a178.688 178.688 0 0 1-3.626666-38.613333c1.877333-67.2 60.928-112.256 128.64-91.690667C765.354667 693.802667 853.333333 614.485333 853.333333 512a341.333333 341.333333 0 1 0-682.666666 0c0 189.781333 154.069333 346.410667 341.333333 346.410667z" fill="#cdcdcd" p-id="10475"></path></svg></div>'
    $("body").append(fix_brush);
    $('.fix_brush').click(function () {
        var fix_brush_key = $('#fix_brush_key').val();
        if(fix_brush_key == 0){
            $('.b-body').css({'background': '#ecf9ec'});
            $('#fix_brush_key').val(1);
        }else if(fix_brush_key == 1){
            $('.b-body').css({'background': '#f5f7e4'});
            $('#fix_brush_key').val(2);
        }else if(fix_brush_key == 2){
            $('.b-body').css({'background': '#f9f4ec'});
            $('#fix_brush_key').val(3);
        }else{
            $('.b-body').css({'background': '#FFF'});
            $('#fix_brush_key').val(0);
        }
    });

    // 侧栏目录
    var fix_content = '<div class="fix_content"><svg t="1589346300333" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6064" width="30" height="30"><path d="M436.555 310.079l426.325 0c37.251 0 67.397-30.198 67.397-67.424s-30.146-67.409-67.397-67.409l-426.325 0c-37.234 0-67.417 30.184-67.417 67.409s30.184 67.424 67.417 67.424zM240.37 175.246l-80.854 0c-37.24 0-67.424 30.184-67.424 67.409s30.184 67.424 67.424 67.424l80.854 0c37.248 0 67.432-30.198 67.432-67.424s-30.184-67.409-67.432-67.409zM862.88 444.912l-426.325 0c-37.234 0-67.417 30.184-67.417 67.409 0 37.228 30.184 67.424 67.417 67.424l426.325 0c37.251 0 67.397-30.196 67.397-67.424 0-37.225-30.147-67.409-67.397-67.409zM240.37 444.912l-80.854 0c-37.24 0-67.424 30.184-67.424 67.409 0 37.228 30.184 67.424 67.424 67.424l80.854 0c37.248 0 67.432-30.196 67.432-67.424 0-37.225-30.184-67.409-67.432-67.409zM862.88 714.565l-426.325 0c-37.234 0-67.417 30.195-67.417 67.416 0 37.234 30.184 67.423 67.417 67.423l426.325 0c37.251 0 67.397-30.189 67.397-67.423 0-37.222-30.147-67.416-67.397-67.416zM240.37 714.565l-80.854 0c-37.24 0-67.424 30.195-67.424 67.416 0 37.234 30.184 67.423 67.424 67.423l80.854 0c37.248 0 67.432-30.189 67.432-67.423 0-37.222-30.184-67.416-67.432-67.416z" p-id="6065" fill="#cdcdcd"></path></svg></div><div class="fix_content_html"></div>';
    $("body").append(fix_content);
    $('.fix_content').click(function () {
        $('.fix_content_html').toggle(300);
    });

    $(window).scroll(function(){
        if($(document).scrollTop() > 400){
            $('.fix_content').css('right','3%');
            $('.fix_brush').css('right','3%');
            $('.to_pdf').css('right','3%');
        }
        if($(document).scrollTop() < 400){
            $('.fix_content').css('right','-80px');
            $('.fix_brush').css('right','-80px');
            $('.to_pdf').css('right','-80px');
        }
    })

    // 图片预览
    $('#blog_body img').each(function(){
        var src = $(this).attr('src');
        $(this).wrapAll('<a class="spotlight" href="'+src+'"></a>')
        console.log(this)
    })

    // 视频播放
    var v_blog_html = $('#blog_body').html();
    var video_pre = '<video controls="controls" src="';
    var video_next = '">【抱歉】您的浏览器不支持视频播放，请更换浏览器。</video>';
    var v_reg_pre = '&lt;md-video&gt;';
    var v_reg_next = '&lt;/md-video&gt;';
    if (v_blog_html) {
        var v_new_html = v_blog_html.replace(new RegExp(v_reg_pre, 'g'), video_pre);
        v_new_html = v_new_html.replace(new RegExp(v_reg_next, 'g'), video_next);
        $('#blog_body').html(v_new_html);
    }

    $('video').each(function(){
        var _this = $(this);

        // 读取视频参数
        var v_src = _this.attr('src').replace(/\s*/g, '');
        v_arr = v_src.split(',');

        // 设置视频地址
        if(v_src.toString().indexOf('http') !== -1){    // 如果是网络地址
            var v_src_url = v_arr[0].replace('<code>', '');
            v_src_url = v_src_url.replace('</code>', '');
            _this.attr('src', v_src_url);
        }else{
            _this.attr('src', $('#md_src').text() + v_arr[0]);
        }

        // 设置视频宽度
        _this.css('width', v_arr[1]+'%');

        // 设置视频自动播放
        if(v_arr[2] == 'auto'){
            document.getElementsByTagName('video')[i].play();
        }
    })

    // 音频播放
    var a_blog_html = $('#blog_body').html();
    var audio_pre = '<audio controls="controls" src="';
    var audio_next = '">【抱歉】您的浏览器不支持音频播放，请更换浏览器。</audio>';
    var a_reg_pre = '&lt;md-audio&gt;';
    var a_reg_next = '&lt;/md-audio&gt;';
    if (a_blog_html) {
        var a_new_html = a_blog_html.replace(new RegExp(a_reg_pre, 'g'), audio_pre);
        a_new_html = a_new_html.replace(new RegExp(a_reg_next, 'g'), audio_next);
        $('#blog_body').html(a_new_html);
    }

    $('audio').each(function(i){
        var _this = $(this);

        // 读取音频参数
        var a_src = _this.attr('src').replace(/\s*/g, '');
        a_arr = a_src.split(',');

        // 设置音频地址
        if(a_src.toString().indexOf('http') !== -1){    // 如果是网络地址
            var a_src_url = a_arr[0].replace('<code>', '');
            a_src_url = a_src_url.replace('</code>', '');
            _this.attr('src', a_src_url);
        }else{
            _this.attr('src', $('#md_src').text() + a_arr[0]);
        }

        // 设置循环
        if(a_arr[1] == 'loop'){
            _this.attr('loop', 'loop');
        }

        // 设置视频自动播放
        if(a_arr[2] == 'auto'){
            document.getElementsByTagName('audio')[i].play();
        }
    })

});
