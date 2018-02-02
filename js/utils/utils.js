$.ajaxSetup({ 
     beforeSend: function(xhr, settings) {
         function getCookie(name) {
             var cookieValue = null;
             if (document.cookie && document.cookie !== '') {
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

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
 
function get_json_from_server(url)
{    
    var ret = '';
    $.ajax({
        url: url,
        async: false,
        success: function (data, status, xhr) {
            ret = data;
        }          
    });
    return ret
}

function post_json_to_server(url, data)
{    
    var ret = '';
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        async: false,
        success: function (data, status, xhr) {
            ret = data;
        }
    });
    return ret
}

function get_json_async_from_server(url, data, success)
{
    $.ajax({
        type: "GET",
        url: url,
        data: data,
        async: true,
        success: success         
    });
}

function post_json_async_to_server(url, data, success)
{
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        async: true,
        success: success         
    });
}

function post_file_to_server(url, data)
{    
    var ret = '';
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        async: false,
        contentType: false,
        processData: false,
        success: function (data, status, xhr) {
            ret = data;
        }
    });
    return ret
}

/*
    Formats a date string properly for the database.
    @date = The date in string format
    @sql_format = Formating for the SQL database
*/
function format_date(date, sql_format)
{
    var ret_date = date;

    //Make sure the date isn't empty
    if (date != "" && date !== null && sql_format)
    {
        //Create a date object with the string
        ret_date = new Date(date);
        //Create a string with the proper date object format
        ret_date = ret_date.toISOString();
    }
    if (date !== null && date.indexOf('T') != -1 && !sql_format)
    {
        ret_date = new Date(date)
        ret_date = ret_date.toISOString().slice(0,10);
    }
    
    return ret_date;
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}