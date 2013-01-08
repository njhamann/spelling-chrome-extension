define(['underscore', 'backbone', 'models/test_model'], 
    function(_, Backbone, TestModel){

        var TestCollection = Backbone.Collection.extend({
            model: TestModel,
            initialize : function(models, options) {},
            url : function() {
                return 'https://api.github.com/repos/thomasdavis/backbonetutorials/contributors';
            },
            parse : function(data) {
                var uniqueArray = this.removeDuplicates(data.data);
                return uniqueArray;
            },
        });
        return TestCollection;

    }
);
