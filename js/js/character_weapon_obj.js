function character_weapon_viewModel(character_weapon_obj)
{
    var self = this;    
    ko.mapping.fromJS(character_weapon_obj, {}, self);

    socket.on("update_equiped"+self.pk(), function(data) {
        self.update_equipped_weapon(data);
    })

    self.update_equipped_weapon = function(data){
    	if(self.pk() == data.pk)
    	{
    		self.equipped(data.equipped);
    	}
    }

    self.post_equipped = function(){
    	self.equipped(!self.equipped());
    	socket.emit("post_weapon_equip", self.pk(),self.equipped());
    }
}