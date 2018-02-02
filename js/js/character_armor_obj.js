function character_armor_viewModel(character_armor_obj)
{
    var self = this;    
    ko.mapping.fromJS(character_armor_obj, {}, self);
}