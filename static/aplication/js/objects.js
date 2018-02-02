function build_game_viewModel()
{
    var self = this;


    self.start_app = function()
    {
    	// console.log(self.players());
    }

    game_model(self);

    obj.joined = ko.observable(false);

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
}

var player_model = function(data)
{
    var self = this;
    var mapping = {
    };
    ko.mapping.fromJS(data, mapping, self)
};

var card_model = function(data)
{
    var self = this;
    var mapping = {
    };
    ko.mapping.fromJS(data, mapping, self)
};