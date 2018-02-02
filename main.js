function game_model(obj)
{
	obj.joined = ko.observable(false);
	obj.server_rooms = ko.observableArray();

    socket.on("room_test", function(data) {
        // self.get_all_characters_success(data)
        console.log(data);
    })

    self.join_room = function(name)
    {
        console.log("joined_room_1")
        socket.emit("join_room", name);
        ready = true;
        obj.joined(true);
    }

    self.test_room_1 = function(name)
    {
        socket.emit("test_room", "room1");
    }

    socket.emit("get_rooms");
    socket.on("return_rooms", function(data) {
        obj.server_rooms(data)
    })
}
