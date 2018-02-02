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
    // var ret = undefined;
    // $.ajax({
    //     url: "assets/models/cards.JSON"+'?ts='+new Date().getTime(),
    //     dataType: "json",
    //     async: false,
    //     success: function (data, status, xhr) {
    //         ret = data;
    //     }
    // });
    // return ret;

    ret = {
        "cards": [{
            "name": "Guard",
            "value": 1,
            "text":"Pick a player and a Non-Guard card",
            "img":"assets/images/Guard.png"
        }, {
            "name": "Guard",
            "value": 1,
            "text":"Pick a player and a Non-Guard card",
            "img":"assets/images/Guard.png"
        }, {
            "name": "Guard",
            "value": 1,
            "text":"Pick a player and a Non-Guard card",
            "img":"assets/images/Guard.png"
        }, {
            "name": "Guard",
            "value": 1,
            "text":"Pick a player and a Non-Guard card",
            "img":"assets/images/Guard.png"
        }, {
            "name": "Guard",
            "value": 1,
            "text":"Pick a player and a Non-Guard card",
            "img":"assets/images/Guard.png"
        }, {
            "name": "Preist",
            "value": 2,
            "text":"Pick a Player, see their card",
            "img":"assets/images/Preist.png"
        }, {
            "name": "Preist",
            "value": 2,
            "text":"Pick a Player, see their card",
            "img":"assets/images/Preist.png"
        }, {
            "name": "Barron",
            "value": 3,
            "text":"Compare cards with another player",
            "img":"assets/images/Barron.png"
        }, {
            "name": "Barron",
            "value": 3,
            "text":"Compare cards with another player",
            "img":"assets/images/Barron.png"
        }, {
            "name": "Hand Maiden",
            "value": 4,
            "text":"safe from all targeting cards",
            "img":"assets/images/Hand Maiden.png"
        }, {
            "name": "Hand Maiden",
            "value": 4,
            "text":"safe from all targeting cards",
            "img":"assets/images/Hand Maiden.png"
        }, {
            "name": "Prince",
            "value": 5,
            "text":"Choose a player, that player discards a card and picks up a new one",
            "img":"assets/images/Prince.png"
        }, {
            "name": "Prince",
            "value": 5,
            "text":"Choose a player, that player discards a card and picks up a new one",
            "img":"assets/images/Prince.png"
        }, {
            "name": "King",
            "value": 6,
            "text":"Swap hands with another player",
            "img":"assets/images/King.png"
        }, {
            "name": "Countess",
            "value": 7,
            "text":"if you are caught with the countess and a king or prince you must disscard the king/prince",
            "img":"assets/images/Countess.png"
        }, {
            "name": "Princess",
            "value": 8,
            "text":"If you discard this card you lose",
            "img":"assets/images/Princess.png"
        }]
    }
    return ret;
}