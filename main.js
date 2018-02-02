function game_model(obj)
{
	obj.player_number = ko.observable(4);

	obj.holding_card = ko.observable();
	obj.picked_up_card = ko.observable();

	obj.cards = ko.observableArray();
	obj.players = ko.observableArray([]);
	obj.player_turn = ko.observable(0);

	obj.build_card_deck = function()
	{
		var cards_json = ajax_get_cards();
		console.log(cards_json);
		
		for (var i = 0; i < cards_json["cards"].length; i++) {
			obj.cards.push(new player_model(cards_json["cards"][i]));
		}
		console.log(obj.cards())
	}
	obj.build_card_deck();


	obj.add_player = function(){
	 	if (obj.players().length < 4)
	 	{
	        var player_template_json = ajax_get_player_template();
	        player_template_json["name"] = "Player_"+(obj.players().length+1)
	        obj.players.push(new player_model(player_template_json));
    	}
    	else{
    		alert("too many players");
    	}
    }

	obj.return_random_card = function()
	{
		var num = Math.floor(Math.random()*obj.cards().length);
		var card = obj.cards().splice(num,1);
		return card[0];
	}

	obj.keep_card = function()
	{
		obj.holding_card(obj.picked_up_card());
	}
	obj.pick_up_card = function()
	{
		if (obj.cards().length == 0)
		{
			obj.game_over();
		}
		obj.players()[obj.player_turn()]["picked_up_card"](obj.return_random_card());
	}
	obj.keep_picked_up_card = function()
	{
		alert("Player_"+(obj.player_turn()+1)+" played the card: "+ obj.players()[obj.player_turn()]["card_in_hand"]());
		obj.players()[obj.player_turn()]["card_in_hand"](obj.players()[obj.player_turn()]["picked_up_card"]());
		obj.end_turn()
	}

	obj.discard_picked_up_card = function()
	{
		alert("Player_"+(obj.player_turn()+1)+" played the card: "+ obj.players()[obj.player_turn()]["picked_up_card"]());
		obj.end_turn()
	}
	

	obj.reset_game = function()
	{
		obj.cards([1,1,1,1,1,2,2,3,3,4,4,5,5,6,7,8]);
	}
	obj.start_game = function()
	{
		for (var i = 0; i < obj.players().length; i++) {
			obj.players()[i]["card_in_hand"](obj.return_random_card());
		};
		console.log(obj.players()[obj.player_turn()]["card_in_hand"]()["value"]())
		console.log(obj.players()[obj.player_turn()]["card_in_hand"]())

	}
	obj.end_turn = function()
	{
		obj.players()[obj.player_turn()]["picked_up_card"]("");
		obj.player_turn(obj.player_turn()+1);
		if (obj.player_turn() == obj.players().length)
		{
			obj.player_turn(0);
		}
	}
	obj.game_over = function()
	{
		alert("game_over");
	}
	obj.add_player();



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
    
}
