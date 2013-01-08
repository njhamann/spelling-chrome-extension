define(
    [
        'jquery',
        'underscore',
        'backbone',
        'rivets'
    ],
    function($, _, Backbone, rivets) {
        var init = function(){

            rivets.configure({
                adapter: {
                    subscribe: function(obj, keypath, callback) {
                        obj.on('change:' + keypath, callback)
                    },
                    unsubscribe: function(obj, keypath, callback) {
                        obj.on('change:' + keypath, callback)
                    },
                    read: function(obj, keypath) {
                        return obj.get(keypath)
                    },
                    publish: function(obj, keypath, value) {
                        obj.set(keypath, value)
                    }
                }
            });

            rivets.formatters.commas = function(value){
                  return value.addCommas();
            };

            rivets.formatters.currency = function(value){
                  return value.toDollars().addCommas();
            };

            rivets.binders.highlight = function(el, value) {
                el.innerHTML = value;
            };
        };
        return {init: init};
    }
);
