/**
 * Device Usage View
 */

define([
    'app/app',
    'jquery',
    'underscore',
    'backbone',
    'text!templates/device_usage_cmpt.html'
], function(app, $, _, Backbone, deviceUsageTemplate){

    var DeviceUsageView = Backbone.View.extend({
        el: $("#device_usage_cmpt"),
        initialize: function() {
            this.render();
        },
        render: function(){
            this.$el.html(deviceUsageTemplate);
        }
    });
    return DeviceUsageView;
  
});
