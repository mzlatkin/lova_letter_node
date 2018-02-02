function character_attribute_viewModel(character_attribute_obj)
{
    var self = this;    
    ko.mapping.fromJS(character_attribute_obj, {}, self);

    self.calculate_modifier = function(){
    	ret = Math.floor((self.rank()+self.effect()-10)/2);
    	return ret;
    }
    self.modifier = ko.observable(self.calculate_modifier());

    self.change_rank = function(effect){
    	self.rank(self.rank()+effect);
    	self.calculate_modifier();
    }
}