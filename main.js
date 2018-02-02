function game_model(obj)
{
	obj.joined = ko.observable(false);
	obj.server_rooms = ko.observableArray();
	obj.current_room_name = ko.observable();

    socket.on("room_test", function(data) {
        // self.get_all_characters_success(data)
        console.log(data);
    })

    self.join_room = function(room)
    {
        socket.emit("join_room", room["name"]);
        obj.current_room_name(room["name"]);
        obj.joined(true);
    }

    self.test_room_1 = function(name)
    {
        socket.emit("test_room", obj.current_room_name());
    }

    socket.emit("get_rooms");
    socket.on("return_rooms", function(data) {
        obj.server_rooms(data)
        console.log(obj.server_rooms())
    })
}
