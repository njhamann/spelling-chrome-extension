define(
    [
        'jquery',
        'underscore',
        'backbone',
        'rivets'
    ],
    function($, _, Backbone, rivets) {
        var bar, slider, barWidth, sliderWidth;
        var val = true;
        var on = null;
        var off = null;

        var init = function(onCall, offCall){
            if(!onCall || !offCall){
                return false;
            }
            on = onCall;
            off = offCall;
            bar = document.getElementById('bar');
            slider = document.getElementById('slider');
            barWidth = bar.offsetWidth;
            sliderWidth = slider.offsetWidth;
            bar.addEventListener('mousedown', startSlide, false);
            bar.addEventListener('mouseup', stopSlide, false);

            //touch event listeners
            bar.addEventListener('touchstart', touchHandler, true);
            bar.addEventListener('touchmove', touchHandler, true);
            bar.addEventListener('touchend', touchHandler, true);
            bar.addEventListener('touchcancel', touchHandler, true);
        };


        function startSlide(event){
            var locateOnBar = event.clientX - bar.offsetLeft;
            var setPerc = (locateOnBar/barWidth).toFixed(2);
            var locate = (barWidth*setPerc)-(sliderWidth/2);
            console.log('start'+setPerc);
            bar.addEventListener('mousemove', moveSlide, false);
            if(setPerc <= 1 && setPerc >= 0){
                slider.style.left = (locate)+'px';
            }else if (setPerc > 1 || setPerc < 0){
                bar.removeEventListener('mousemove', moveSlide, false);
                setResting(setPerc);
            }
        };

        function moveSlide(event){
            var locateOnBar = event.clientX - bar.offsetLeft;
            var setPerc = (locateOnBar/barWidth).toFixed(2);
            var locate = (barWidth*setPerc)-(sliderWidth/2);
            console.log('slide'+setPerc);
            if(setPerc <= 1 && setPerc >= 0){
                slider.style.left = (locate)+'px';
            }else if (setPerc > 1 || setPerc < 0){
                bar.removeEventListener('mousemove', moveSlide, false);
                setResting(setPerc);
            }
        };

        function stopSlide(event){
            var locateOnBar = event.clientX - bar.offsetLeft;
            var setPerc = (locateOnBar/barWidth).toFixed(2);
            console.log('stop'+setPerc);
            bar.removeEventListener('mousemove', moveSlide, false);
            setResting(setPerc);
        };

        function setResting(setPerc){
            $('.switch-container label').removeClass('active');
            if(setPerc < .5){
                on();
                slider.style.left = '-2px';
                $('.switch-container label.activated-left').addClass('active');
            }else{
                off();
                slider.style.left = '27px';
                $('.switch-container label.activated-right').addClass('active');
            }
        };

        function touchHandler(event){
            var touches = event.changedTouches,
                first = touches[0],
                type = "";

            switch(event.type){
                case "touchstart": type = "mousedown"; break;
                case "touchmove":  type="mousemove"; break;
                case "touchend":   type="mouseup"; break;
                default: return;
            }

            var simulatedEvent = document.createEvent("MouseEvent");
            simulatedEvent.initMouseEvent(type, true, true, window, 1,
                                  first.screenX, first.screenY,
                                  first.clientX, first.clientY, false,
                                  false, false, false, 0/*left*/, null);

            first.target.dispatchEvent(simulatedEvent);
            event.preventDefault();
        };

        return {
            init: init
        };
    }
);
