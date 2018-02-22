var http = require('http');
var fs = require('fs');
var io = require('socket.io')(http);  
var request = require('request');
var index;  

//bad form, using the same object >:(
var CARD_LIST = JSON.parse(fs.readFileSync('assets/models/cards.json', 'utf8'));
var SERVER_ROOMS = [{"name":"room 1","people":[],CARD_LIST,"turn":1,"game_started":false}]

var server = http.createServer(function(request, response) {
    if (request.url.indexOf('.js') != -1)
    {
        fs.readFile("./" + request.url, 'utf-8', function (error, data) {
            response.writeHead(200, {'Content-Type': 'text/javascript'});
            response.write(data);
            response.end();
        });
    }
    else if (request.url.indexOf('.css') != -1)
    {
        fs.readFile("./" + request.url, 'utf-8', function (error, data) {
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.write(data);
            response.end();
        });
    }
    else if (request.url.indexOf('.png') != -1)
    {
        fs.readFile("./" + request.url, function (error, data) {
            response.writeHead(200, {'Content-Type': 'image/png'});
            response.end(data);
        });
    }
    else
    {
        fs.readFile("index.html", 'utf-8', function (error, data) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
            response.end();
        });
    }
}).listen(8080);

var socket = io.listen(server);
console.log("listening on 8080");

socket.on("connection", function (client) {  

    client.on("get_rooms", function(){
        client.emit("return_rooms",SERVER_ROOMS);
    });

    client.on("join_room", function(data){
        client.join(data["room"]);
        for (var i = 0; i < SERVER_ROOMS.length; i++) {
            if (SERVER_ROOMS[i]["name"] == data["room"] && !SERVER_ROOMS[i]["game_started"])
            {
                player = {"name": "","card_in_hand": "","picked_up_card": "","discard_array": [],"eliminated":false}
                player["name"] = data["username"];
                SERVER_ROOMS[i]["people"].push(player);

                ret = {"people":SERVER_ROOMS[i]["people"], "turn":SERVER_ROOMS[i]["turn"]}
                socket.in(data["room"]).emit("game_update", ret);  
            }
        };
        
    });

    client.on("play_card", function(data){
        console.log(data);
        for (var i = 0; i < SERVER_ROOMS.length; i++) {
            if (SERVER_ROOMS[i]["name"] == data["room"])
            {
                for (var k = 0; k < SERVER_ROOMS[i]["people"].length; k++) {
                    if (SERVER_ROOMS[i]["people"][k]["name"] == data["card"]["played_by"])
                    {
                        SERVER_ROOMS[i]["people"][k]["discard_array"].push(data["card"]["card_played"]);
                        SERVER_ROOMS[i]["people"][k]["card_in_hand"] = data["card"]["card_kept"];
                    }
                }

                if (data["card"]["card_played"] == "Guard")
                {
                    for (var k = 0; k < SERVER_ROOMS[i]["people"].length; k++) {
                        if (SERVER_ROOMS[i]["people"][k]["name"] == data["card"]["player_chosen"])
                        {
                            if (SERVER_ROOMS[i]["people"][k]["card_in_hand"]["name"] == data["card"]["card_chosen"])
                            {
                                console.log(SERVER_ROOMS[i]["people"][k]["name"] + " has been eliminated");
                                SERVER_ROOMS[i]["people"][k]["eliminated"] = true;
                            }
                        }
                    }
                }
                else if (data["card"]["card_played"] == "Preist")
                {
                    for (var k = 0; k < SERVER_ROOMS[i]["people"].length; k++) {
                        if (SERVER_ROOMS[i]["people"][k]["name"] == data["card"]["player_chosen"])
                        {
                            console.log(SERVER_ROOMS[i]["people"][k]["name"] + " is holding " + SERVER_ROOMS[i]["people"][k]["card_in_hand"]["name"]);
                        }
                    }
                }
                else if (data["card"]["card_played"] == "Barron")
                {
                    var player;
                    var playee;
                    for (var k = 0; k < SERVER_ROOMS[i]["people"].length; k++) {
                        if (SERVER_ROOMS[i]["people"][k]["name"] == data["card"]["player_chosen"])
                        {
                            playee = SERVER_ROOMS[i]["people"][k]
                        }
                        if (SERVER_ROOMS[i]["people"][k]["name"] == data["card"]["played_by"])
                        {
                            player = SERVER_ROOMS[i]["people"][k]
                        }
                    }
                    if (player["card_in_hand"]["value"]>playee["card_in_hand"]["value"])
                    {
                        console.log(player["name"]+ " wins, "+ playee["name"]+ " is eliminated");
                        playee["eliminated"] = true;
                    }
                    else if (playee["card_in_hand"]["value"]>player["card_in_hand"]["value"])
                    {
                        console.log(playee["name"]+ " wins, "+ player["name"]+ " is eliminated");
                        player["eliminated"] = true;
                    }
                    else{
                        console.log("tie");
                    }

                }
                else if (data["card"]["card_played"] == "Hand Maiden")
                {

                }
                else if (data["card"]["card_played"] == "Prince")
                {
                    for (var k = 0; k < SERVER_ROOMS[i]["people"].length; k++) {
                        if (SERVER_ROOMS[i]["people"][k]["name"] == data["card"]["player_chosen"])
                        {
                            SERVER_ROOMS[i]["people"][k]["discard_array"].push(SERVER_ROOMS[i]["people"][k]["card_in_hand"]);
                            if(SERVER_ROOMS[i]["CARD_LIST"]["cards"].length>0)
                            {
                                var num = Math.floor(Math.random()*SERVER_ROOMS[i]["CARD_LIST"]["cards"].length);
                                var card = SERVER_ROOMS[i]["CARD_LIST"]["cards"].splice(num,1);
                                SERVER_ROOMS[i]["people"][k]["card_in_hand"] = card[0]
                            }
                            else
                            {
                                SERVER_ROOMS[i]["people"][k]["card_in_hand"] = SERVER_ROOMS[i]["last_card"]
                            }
                        }
                    }
                }
                else if (data["card"]["card_played"] == "King")
                {
                    var player_card;
                    var playee_card;
                    for (var k = 0; k < SERVER_ROOMS[i]["people"].length; k++) {
                        if (SERVER_ROOMS[i]["people"][k]["name"] == data["card"]["player_chosen"])
                        {
                            playee_card = SERVER_ROOMS[i]["people"][k]["card_in_hand"]
                        }
                        if (SERVER_ROOMS[i]["people"][k]["name"] == data["card"]["played_by"])
                        {
                            player_card = SERVER_ROOMS[i]["people"][k]["card_in_hand"]
                        }
                    }
                    for (var k = 0; k < SERVER_ROOMS[i]["people"].length; k++) {
                        if (SERVER_ROOMS[i]["people"][k]["name"] == data["card"]["player_chosen"])
                        {
                            SERVER_ROOMS[i]["people"][k]["card_in_hand"] = player_card;
                        }
                        if (SERVER_ROOMS[i]["people"][k]["name"] == data["card"]["played_by"])
                        {
                            SERVER_ROOMS[i]["people"][k]["card_in_hand"] = playee_card;
                        }
                    }
                }
                else if (data["card"]["card_played"] == "Countess")
                {

                }
                else if (data["card"]["card_played"] == "Princess")
                {
                    for (var k = 0; k < SERVER_ROOMS[i]["people"].length; k++) {
                        if (SERVER_ROOMS[i]["people"][k]["name"] == data["card"]["played_by"])
                        {
                            SERVER_ROOMS[i]["people"][k]["eliminated"] = true;
                        }
                    }
                }        

                if (SERVER_ROOMS[i]["CARD_LIST"]["cards"].length == 0)
                {
                    socket.in(room).emit("game_over","");  
                }

            }
        }
    });

    client.on("end_turn", function(room){
        for (var i = 0; i < SERVER_ROOMS.length; i++) {
            if (SERVER_ROOMS[i]["name"] == room)
            {
                SERVER_ROOMS[i]["turn"] = SERVER_ROOMS[i]["turn"]+1
                if(SERVER_ROOMS[i]["turn"] > SERVER_ROOMS[i]["people"].length)
                {
                    SERVER_ROOMS[i]["turn"] = 1
                }
                ret = {"people":SERVER_ROOMS[i]["people"], "turn":SERVER_ROOMS[i]["turn"]}
                socket.in(room).emit("game_update", ret);  
            }
        };
    });

    client.on("draw_card", function(room){
        for (var i = 0; i < SERVER_ROOMS.length; i++) {
            if (SERVER_ROOMS[i]["name"] == room)
            {
                // console.log(SERVER_ROOMS[i]["CARD_LIST"]["cards"])
                var num = Math.floor(Math.random()*SERVER_ROOMS[i]["CARD_LIST"]["cards"].length);
                var card = SERVER_ROOMS[i]["CARD_LIST"]["cards"].splice(num,1);

                client.emit("client_update", {"card":card[0]});                
            }
        };
    });

    client.on("start_game", function(data){
        for (var i = 0; i < SERVER_ROOMS.length; i++) {
            if (SERVER_ROOMS[i]["name"] == data["room"])
            {
                SERVER_ROOMS[i]["game_started"] = true;
                // remove one card from play
                var num = Math.floor(Math.random()*SERVER_ROOMS[i]["CARD_LIST"]["cards"].length);
                SERVER_ROOMS[i]["last_card"] = SERVER_ROOMS[i]["CARD_LIST"]["cards"].splice(num,1)[0];

                cards_drawn = []

                for (var k = 0; k < SERVER_ROOMS[i]["people"].length; k++) {
                    num = Math.floor(Math.random()*SERVER_ROOMS[i]["CARD_LIST"]["cards"].length);
                    card = SERVER_ROOMS[i]["CARD_LIST"]["cards"].splice(num,1);
                    cards_drawn.push(card)
                    SERVER_ROOMS[i]["people"][k]["card_in_hand"] = card[0];
                };
                socket.in(data["room"]).emit("starting_hands", cards_drawn);
            }
        }
    })

    client.on("test_room", function(room){
        console.log("testing room " + room)
        socket.in(room).emit("room_test", "you are in room" + room);
    });
});
