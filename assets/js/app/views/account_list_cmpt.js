/**
 * Account List View
 */

define([
    'app/app',
    'jquery',
    'underscore',
    'backbone',
    'text!templates/account_list_cmpt.html'
], function(app, $, _, Backbone, accountListTemplate){

    var AccountListView = Backbone.View.extend({
        el: $("#account_list_cmpt"),
        initialize: function() {
            this.render();
        },
        render: function(){
            this.$el.html(accountListTemplate);
        }
    });
    return AccountListView;
  
});
