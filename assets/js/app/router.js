// Filename: router.js
define([
    'app/app',
    'jquery',
    'underscore',
    'backbone',
    'views/header_cmpt',
    'views/account_list_cmpt',
    'views/active_audience_graph_cmpt',
    'views/device_usage_cmpt',
], function(
    app,
    $, 
    _, 
    Backbone, 
    HeaderView,
    AccountListView,
    ActiveAudienceGraphView,
    DeviceUsageView
) {

    var AppRouter = Backbone.Router.extend({
        routes: {
          'projects': 'showProjects',
          'users': 'showContributors',
          '*actions': 'defaultAction'
        }
    });
  
    var init = function(){

        var app_router = new AppRouter;
        
        app_router.on('route:showProjects', function(){
        });

        app_router.on('route:showContributors', function () {
        });

        app_router.on('route:defaultAction', function (actions) {
            app.Views.headerView = new HeaderView();
            app.Views.accountListView = new AccountListView();
            app.Views.activeAudienceGraphView = new ActiveAudienceGraphView();
            app.Views.deviceUsageView = new DeviceUsageView();
        });

        Backbone.history.start();
    
    };
    
    return { 
        init: init
    };

});
