function character_feat_viewModel(character_feat_obj)
{
    var self = this;    
    ko.mapping.fromJS(character_feat_obj, {}, self);
}