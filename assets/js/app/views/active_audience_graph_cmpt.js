/**
 * Active Audience Graph View
 */

define([
    'app/app',
    'jquery',
    'underscore',
    'backbone',
    'text!templates/active_audience_graph_cmpt.html',
    'd3',
    'rickshaw',
], function(app, $, _, Backbone, activeAudienceGraphTemplate, d3, Rickshaw){

    var ActiveAudienceGraphView = Backbone.View.extend({
        el: $("#active_audience_graph_cmpt"),
        initialize:function() {
            this.render();
        },
        render: function(){
            this.$el.html(activeAudienceGraphTemplate);
            console.log(Rickshaw);
            var w = $('#active_audience_graph_cmpt').width()-40;
            var h = 260;
            var tv = 250;
            var series = new Rickshaw.Series.FixedDuration(
                    [
                        { 
                            name: 'Past',
                            data: [],
                            color: '#9cc1e0' 
                        },
                        { 
                            name: 'Present',
                            data: [],
                            color: '#cae2f7' 
                        }
                    ], 
                    undefined, 
                    {
                        timeInterval: tv,
                        maxDataPoints: 100,
                        timeBase: new Date().getTime() / 1000
                    }
                )
            var graph = new Rickshaw.Graph({
                element: document.querySelector("#active_audience_graph_container"),
                width: w,
                height: h,
                renderer: 'area',
                stroke: true,
                interpolation: 'linear',
                series: series
            });
            var yAxis = new Rickshaw.Graph.Axis.Y({
                graph: graph,
                orientation: 'left',
                element: document.getElementById('y_axis'),
            });
            graph.render();
            var i = 0;
            var iv = setInterval( function() {

                var data = { Past: Math.floor(Math.random() * 40) + 120 };
                var randInt = Math.floor(Math.random()*100);
                data.Present = (Math.sin(i++ / 40) + 4) * (randInt + 400);
                graph.series.addData(data);
                graph.render();

            }, tv ); 
        }
    });

    return ActiveAudienceGraphView;
  
});
