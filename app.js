var people = {};
var http = require('http');
var fs = require('fs');
var io = require('socket.io')(http);  
var request = require('request');
var index;  

var SERVER_ROOMS = [{"name":"room 1","people":[],"current_cards":[]}]

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

    client.on("join_room", function(room){
        client.join(room);
        for (var i = 0; i <= SERVER_ROOMS.length; i++) {
            if (SERVER_ROOMS[i]["name"] == room)
            {
                player_to_add = "player "+SERVER_ROOMS[i]["people"].length
                SERVER_ROOMS[i]["people"].push(player_to_add); 
                socket.in(room).emit("game_update", player_to_add + " has joined the room");  
            }
        };
        
    });

    client.on("test_room", function(room){
        console.log("testing room " + room)
        socket.in(room).emit("room_test", "you are in room" + room);
    });

    // client.on("post_weapon_equip", function(pk,equipped){

    //     request({
    //         url: 'http://192.168.0.23:8000/weapon_association/'+pk+'/',
    //         method: "PATCH",
    //         json: true,   // <--Very important!!!
    //         body: {'equipped': equipped}
    //     }, function (error, response, body){
    //         console.log(body['pk']);
    //         socket.sockets.emit("update_equiped"+body['pk'], body);
    //     });
    // });

});
