define(                                           
    [                                             
        'jquery',                                 
        'underscore',                             
        'backbone'                                
    ],                                            
    function($, _, Backbone) {                    
        return {                                  
            Models: {},                      
            Collections: {},                      
            Views: {},                      
            events: _.clone(Backbone.Events),
            state: {
                timeRange: 7,
                currentAccount: null
            },
            fetchIntervals: {
                TestCollection: 1000
            },
            root: '/'                             
        };
    }                                             
);                                                
