define(
    [
        'app/app', 
        'jquery', 
        'backbone', 
        'router', 
        'repeater', 
        'util/rivets_config', 
        'rivets'
    ], 
    function(
        app, 
        $,
        Backbone, 
        Router, 
        Repeater, 
        rivetsConfig, 
        rivets
    ){
    
        var init = function(){
            rivetsConfig.init();
            Router.init();
        };

        return init;
    }
);
