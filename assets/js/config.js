requirejs.config({
    baseUrl: 'assets/js',
    paths: {
        app: 'app',
        util: 'app/util',
        router: 'app/router',
        collections: 'app/collections',
        models: 'app/models',
        views: 'app/views',
        templates: '../templates',
        jquery: 'lib/jquery-1.8.3.min',
        backbone: 'lib/backbone-min',
        underscore: 'lib/underscore-min',
        rivets: 'lib/rivets.min',
        repeater: 'lib/backbone.repeater',
        d3: 'lib/d3.v3.min',
        rickshaw: 'lib/rickshaw.min'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        repeater: ['backbone'],
        rivets: {
            exports: 'rivets'
        },
        d3: {
            exports: 'd3'
        },
        rickshaw: {
            deps: ['d3'],
            exports: 'Rickshaw'
        }
    }
});

requirejs(['app/init'],
    function (init) {
        init();
    }
);
