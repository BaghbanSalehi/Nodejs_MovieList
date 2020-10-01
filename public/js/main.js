$(function() {

    $('.card').hover(function() {
        // $(this).css('background','#e9ecef');
        $(this).find('.tools').css('visibility','visible');
    }, function() {
        // $(this).css('background','white');
        $(this).find('.tools').css('visibility','hidden');
    });
});
$('#logout').click(function(){
    console.log('button clicked');
    $.ajax({url: 'login/logout', success:function(res){
        console.log('server response is', res);
    }});
});