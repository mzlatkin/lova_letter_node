function character_details_viewModel(character_details_obj)
{
    var self = this;    
    ko.mapping.fromJS(character_details_obj, {}, self);
}