//Model
Backbone.Model.prototype.fetchInterval = null;

Backbone.Model.prototype.setFetchInterval = function(seconds, options){
    if(!seconds){
        return false;
    }
    var _this = this;
    var interval = setInterval(function(){    
        _this.fetch(options); 
    }, seconds);
    this.fetchInterval = interval;
};

Backbone.Model.prototype.clearFetchInterval = function(){
    var interval = this.fetchInterval;
    if(!interval){
        return false;
    }
    clearInterval(interval);
};

//Collection
Backbone.Collection.prototype.interval = null;

Backbone.Collection.prototype.setFetchInterval = function(seconds, options){
    if(!seconds){
        return false;
    }
    var _this = this;
    var interval = setInterval(function(){    
        _this.fetch(options); 
    }, seconds);
    this.fetchInterval = interval;
};

Backbone.Collection.prototype.clearFetchInterval = function(){
    var interval = this.fetchInterval;
    if(!interval){
        return false;
    }
    clearInterval(interval);
};
