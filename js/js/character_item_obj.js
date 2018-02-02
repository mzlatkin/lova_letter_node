function character_item_viewModel(character_item_obj)
{
    var self = this;    
    ko.mapping.fromJS(character_item_obj, {}, self);
}