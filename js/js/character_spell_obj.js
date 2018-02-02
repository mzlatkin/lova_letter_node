function character_spell_viewModel(character_spell_obj)
{
    var self = this;    
    ko.mapping.fromJS(character_spell_obj, {}, self);
}