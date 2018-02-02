function build_game_viewModel()
{
    var self = this;


    self.start_app = function()
    {
    	// console.log(self.players());
    }

    game_model(self);
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