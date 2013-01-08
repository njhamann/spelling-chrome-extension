define([
    'app/app',
    'jquery',
    'underscore',
    'backbone',
    'text!templates/home_template.html',
    'collections/test_collection',
    'models/test_model'
], function(app, $, _, Backbone, homeTemplate, TestCollection, TestModel){

    var HomeView = Backbone.View.extend({
        el: $("#twitter_dash"),
        initialize:function() {
            this.collection = new TestCollection([]);
            this.collection.setFetchInterval(app.fetchIntervals.TestCollection);
            this.collection.clearFetchInterval();
        },
        render: function(){
            this.$el.prepend(homeTemplate);
            var home = new TestModel({name: 'home'});
            var view = rivets.bind($('p'), {home: home});
        }
    });

    return HomeView;
  
});
