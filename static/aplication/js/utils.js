//util functions

$.ajaxSetup({ 
     beforeSend: function(xhr, settings) {
         function getCookie(name) {
             var cookieValue = null;
             if (document.cookie && document.cookie != '') {
                 var cookies = document.cookie.split(';');
                 for (var i = 0; i < cookies.length; i++) {
                     var cookie = jQuery.trim(cookies[i]);
                     // Does this cookie string begin with the name we want?
                 if (cookie.substring(0, name.length + 1) == (name + '=')) {
                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                     break;
                 }
             }
         }
         return cookieValue;
         }
         if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
             // Only send the token to relative URLs i.e. locally.
             xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
         }
     } 
});

function ajax_get_player_template()
{
    var ret = undefined;
    $.ajax({
        url: "assets/models/template.JSON"+'?ts='+new Date().getTime(),
        dataType: "json",
        async: false,
        success: function (data, status, xhr) {
            ret = data;
        }
    });
    return ret;
}

function ajax_get_cards()
{
    var ret = undefined;
    $.ajax({
        url: "assets/models/cards.JSON"+'?ts='+new Date().getTime(),
        dataType: "json",
        async: false,
        success: function (data, status, xhr) {
            ret = data;
        }
    });
    return ret;
}