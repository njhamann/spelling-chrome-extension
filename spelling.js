var Spelling = function(){
	console.log('spelling');
	var text = {};
	text.oldText = '';
	text.newText = '';
	
	var checkSpelling = function(str, callback){
		var url = 'http://public.noahhamann.com/spelling/index.php/api/terms/check';
		var data = 'copy='+str;
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
		xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4) {
		    	var obj = JSON.parse(xhr.responseText);
		    	if(callback)
		    		callback(obj);
		  	}
		};
		xhr.send(data);
	};

	var getExistingText = function(e){
		console.log('text focus');
		var target = e.target;
		var type = $(target).attr('type');
		if(type == 'password') return;
		text.oldText = target.isContentEditable ? $(target).text() : $(target).val();
	};

	var getCurrentText = function(e){
		console.log('text blur');
		var target = e.target;
		var type = $(target).attr('type');
		if(type == 'password') return;
		text.newText = target.isContentEditable ? $(target).text() : $(target).val();
		text.newText = $.trim(text.newText);
		text.oldText = $.trim(text.oldText);

		var addedWords = diffString(text.oldText, text.newText);
		var val = addedWords.join();
		if(addedWords.length > 0){
			var val = addedWords.join();
			checkSpelling(val, function(data){
				console.log(data);
			});
		}
		text.oldText = '';
		text.newText = '';
	};

	//events
	$('input, textarea, [contenteditable=true]').focus(getExistingText);
	$('input, textarea, [contenteditable=true]').blur(getCurrentText);

	//do not get rid of
	var positionTooltip = function(e){
		var $el = $('<div style="z-index:5000; opacity: .5; width:5px; height:5px; background-color:#CCC; display:none; position:absolute; font-size:0;"></div>');
		$('body').append($el)

		var tip = $el;
		if (e.keyCode == 65) {
			var pos = $(this).getCaretPosition();
			tip.css({
				left: $(this).offset().left + pos.left,
				top: $(this).offset().top + pos.top
			}).show();
		}

	};
	$(document).on('keyup', 'input, textarea, [contenteditable=true]', positionTooltip);

};

var spell = new Spelling();