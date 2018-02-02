var joined = ko.observable(false);

socket.on("room_test", function(data) {
    // self.get_all_characters_success(data)
    console.log(data);
})

self.join_room_1 = function(name)
{
    console.log("joined_room_1")
    socket.emit("join_room", "room1");
    ready = true;
    self.joined(true);
}

self.join_room_2 = function(name)
{
    console.log("joined_room_2")
    socket.emit("join_room", "room2");
    ready = true;
    self.joined(true);
}

self.test_room_1 = function(name)
{
    socket.emit("test_room", "room1");
}
