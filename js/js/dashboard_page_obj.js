function dashboard_viewModel()
{
    var self = this;    

    self.characters = ko.observableArray();
    self.username = ko.observable("");
    self.joined = ko.observable(false);

    socket.on("get_all_characters", function(data) {
        // self.get_all_characters_success(data)
        console.log(data);
    })

    self.join_room_1 = function(name)
    {
        console.log("joined_room_1")
        if (name != "") {
            socket.emit("join_room", "room1");
            ready = true;
            self.joined(true);
        }
    }

    self.join_room_2 = function(name)
    {
        console.log("joined_room_2")
        if (name != "") {
            socket.emit("join_room", "room2");
            ready = true;
            self.joined(true);
        }
    }

    self.select_character = function(character)
    {
        for (var i = 0, i_len = self.characters().length; i < i_len; ++i)
        {
            self.characters()[i].selected(false);
        }
        character.select();
    }

    self.get_all_characters_success = function(data)
    {
        data = JSON.parse(data);
        temp_array = [];
        for (var i = 0, i_len = data.length; i < i_len; ++i)
        {
            temp_array.push(new character_viewModel(data[i]));
        }
        self.characters(temp_array);
    }

	self.start_app = function() 
    {
        console.log("hello!")
    }
}