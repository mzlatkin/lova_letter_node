function game_model(obj)
{
	obj.joined = ko.observable(false);
	obj.server_rooms = ko.observableArray();
	obj.current_room_name = ko.observable();
    obj.players_in_the_room = ko.observableArray();
    obj.username = ko.observable();

	obj.your_turn = ko.observable(false);
	obj.player_number = ko.observable("");
    obj.current_player = ko.observable();

	obj.card_in_hand = ko.observable("");
    obj.picked_up_card = ko.observable("");
    obj.card_played_this_turn = ko.observable("");

    obj.played_card_post_data = ko.observable({"played_by":"","card_played":"","card_chosen":"","player_chosen":""})
    obj.player_chosen = ko.observable("");
    obj.card_chosen = ko.observable("")

    obj.card_list = ko.observableArray([
    {"name": "Guard","img":"assets/images/Guard.png"},
    {"name": "Preist","img":"assets/images/Preist.png"},
    {"name": "Barron","img":"assets/images/Barron.png"},
    {"name": "Hand Maiden","img":"assets/images/Hand_Maiden.png"},
    {"name": "Prince","img":"assets/images/Prince.png"},
    {"name": "King","img":"assets/images/King.png"},
    {"name": "Countess","img":"assets/images/Countess.png"},
    {"name": "Princess","img":"assets/images/Princess.png"}])

    obj.choosing_card = ko.observable(false);

    socket.on("game_over" {
        alert("game over");
    });

    socket.on("game_update", function(data) {
        obj.players_in_the_room(data["people"]);
        if(obj.player_number() == "")
        {
            obj.joined(true);
        	obj.player_number(data["people"].length);
        }
        obj.current_player(data["people"][(data["turn"]-1)]["name"]);
        if (obj.player_number() == data["turn"])
        {

        	obj.your_turn(true);
        }
        else
        {
        	obj.your_turn(false);
        }
    });

    socket.on("starting_hands", function(data) {
        obj.card_in_hand(data[obj.player_number()-1][0])
    });

    socket.on("client_update", function(data){
    	if (data["card"] != undefined)
    	{
            if (obj.card_in_hand() == "")
            {
                obj.card_in_hand(data["card"]);    
            }
            else
            {
                obj.picked_up_card(data["card"]);
            }
    	}
    });

    self.join_room = function(room)
    {
        obj.current_room_name(room["name"]);
        socket.emit("join_room", {"room":room["name"],"username":obj.username()});
    }
    self.start_game = function()
    {
        console.log("called start game");
        socket.emit("start_game", {"room":obj.current_room_name()});
    }

    self.draw_card = function()
    {
        obj.choosing_card(true);
    	socket.emit("draw_card",obj.current_room_name())
    }

    self.pick_and_play_card = function(card_played, card_kept)
    {
        obj.card_in_hand(card_kept);
        obj.choosing_card(false);
        obj.card_played_this_turn(card_played);
    }

    self.card_intraction = function()
    {
        console.log(obj.card_played_this_turn())
        console.log(obj.players_in_the_room())
        socket.emit("play_card", {"room":obj.current_room_name(),"card":card_played});
    }

    self.end_turn = function()
    {
        socket.emit("end_turn", obj.current_room_name());
    }

    socket.emit("get_rooms");
    socket.on("return_rooms", function(data) {
        obj.server_rooms(data)
        console.log(obj.server_rooms())
    })

    self.choose_player = function(data)
    {
        console.log(data)
        obj.played_card_post_data()["player_chosen"] = (data["name"])
        obj.player_chosen(data["name"]);
    }
    self.choose_card = function(data)
    {
        console.log(data)
        obj.played_card_post_data()["card_chosen"] = (data["name"])
        console.log(obj.played_card_post_data());
        obj.card_chosen(data["name"]);
    }
}
