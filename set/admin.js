$(function(){

    $("div.panel-group .panel").each(function () {
        var $panel = $(this);
        $(this).find(".panel-heading").on('click',function () {
            // 当前panel可见
            $panel.find(".panel-body").slideToggle();
        });
    });
});