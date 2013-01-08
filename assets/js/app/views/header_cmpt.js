/**
 * Header View
 */

define([
    'app/app',
    'jquery',
    'underscore',
    'backbone',
    'text!templates/header_cmpt.html',
    'util/switch'
], function(app, $, _, Backbone, headerTemplate, switchButton){

    var HeaderView = Backbone.View.extend({
        el: $("#header_cmpt"),
        initialize:function() {
            this.render();
        },
        render: function(){
            this.$el.html(headerTemplate);
            
            //switch
            switchButton.init(
                function(){
                    console.log('on');
                },
                function(){
                    console.log('off');
                }
            );
        }
    });

    return HeaderView;
  
});
