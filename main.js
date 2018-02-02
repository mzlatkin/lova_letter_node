function game_model(obj)
{
	obj.joined = ko.observable(false);
	obj.server_rooms = ko.observableArray();
	obj.current_room_name = ko.observable();

	obj.your_turn = ko.observable(false);
	obj.player_number = ko.observable("");

    socket.on("game_update", function(data) {
        // self.get_all_characters_success(data)
        console.log(data);
        if(obj.player_number() == "")
        {
        	obj.player_number(data["people"].length);
        }
        if (obj.player_number() == data["turn"])
        {
        	obj.your_turn(true);
        }
        else
        {
        	obj.your_turn(false);
        }
    })

    obj.join_room = function(room)
    {
        socket.emit("join_room", room["name"]);
        obj.current_room_name(room["name"]);
        obj.joined(true);
    }



    obj.end_turn = function(name)
    {
    	console.log("you ended your turn");
        socket.emit("end_turn", obj.current_room_name());
    }

    socket.emit("get_rooms");
    socket.on("return_rooms", function(data) {
        obj.server_rooms(data)
        console.log(obj.server_rooms())
    })
}
