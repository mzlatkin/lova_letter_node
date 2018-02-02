var viewModel;
$(document).ready(function(){ 
    viewModel = new dashboard_viewModel();
    ko.applyBindings(viewModel);
    viewModel.start_app(); 
});