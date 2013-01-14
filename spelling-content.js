var Spelling = function(){
	console.log('spelling');
	var $el = {};
	var termCache = {};
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
		$el = $(this);
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
		addedWords = cleanTerms(addedWords);
		var val = addedWords.join();
		if(addedWords.length > 0){
			var val = addedWords.join();
			checkSpelling(val, displaySpellMarker);
		}
	};
	
    var cleanTerms = function(t){
		for(var i=0; i<t.length; i++){
			if(t[i].length<3){
				t.splice(i,1);
			}
		}
		return t;
	}


	//do not get rid of
	var spanWrap = function(term){
		var html = '';
		var letters = term.split('');
		var par = document.createElement('p');
		for(var i = 0, len = letters.length; i < len; i++) {
    		var span = document.createElement('span');
    		span.innerHTML = letters[i];
    		par.appendChild(span);
		}
		return par;
	};

	var displaySpellPopup = function(e){
		console.log('displaySpellPopup');
		var term = $(this).attr('data-term');
		var $cont = $('<div class="spelling-tool"></div>');
		var node = spanWrap(term);
		var suggestionHtml = '';
		console.log(termCache[term]);
		if(termCache[term] && termCache[term].options){
			for(var i=0; i<termCache[term].options.length; i++){
				suggestionHtml += '<li>'+termCache[term].options[i]+'</li>'
			}
		}else{
			suggestionHtml = '<li>No Suggestions Available</li>';
		}
		var html = 
			'<div class="spelling-tool-correction-container">'+
				'<p data-term="'+term+'">'+node.innerHTML+'</p>'+
				'<input type="text" value="" />'+
			'</div>'+
			'<div class="spelling-tool-button-container">'+
				'<button id="spelling_tool_hint_button" type="button">Hint</button>'+
				'<button id="spelling_tool_suggestion_button" type="button">Suggestions</button>'+
			'</div>'+
			'<div class="spelling-tool-suggestions-container" style="display:none;">'+
				'<ul>'+
					suggestionHtml +
				'</ul>'+
			'</div>';
		$cont.append(html);
		$(this).html($cont);
	};

	var hideSpellPopup = function(e){
		console.log('hideSpellPopup');
		$(this).find('.spelling-tool').hide();
	};

	var displaySpellMarker = function(data){	
		for(var key in data.results){
			//add to cache
			termCache[key] = data.results[key];
			termCache[key].$el = $el;

			var val = $el.val() ? $el.val() : $el.text();
			var index = val.indexOf(key);
			var pos;

			if(index != -1){
				pos = index+key.length;
				var pos = $el.getCaretPosition(pos);
				var offPos = $el.offset();
				var $tool = $('<div class="spelling-bee-marker"></div>');
				$tool.css({
					display: 'none',
					position: 'absolute',
					//fontSize: '0',
					left: offPos.left + pos.left,
					top: offPos.top + pos.top
				});
				$tool.attr('data-term', key);
				$('body').append($tool);
				$tool.show();
			}
		}
	};

	var updateValue = function(e){
		var $tar = $(this);
		var $tool = $tar.parents('.spelling-tool');
		//to do: more persise replace. Only at the location
		var incorrect = $tool.find('.spelling-tool-correction-container p').attr('data-term');
		var $ele = termCache[incorrect].$el;
		var val = $ele.val() ? $ele.val() : $ele.text();
		var correct = $tar.text();
		var n = val.replace(incorrect, correct);
		if(val){
			$el.val(n);
			$tool.parent().remove();
		}
		/*
		var beforeText = value.substring(0, cursorPosition);
		var afterText = value.substring(cursorPosition);
		*/
	};
	
	var cleanup = function(){

	};

	var showSuggestions = function(e){
		var $tar = $(this);
		var $tool = $tar.parents('.spelling-tool');
		var $suggestionContainer = $tool.find('.spelling-tool-suggestions-container');
		if($suggestionContainer.is(':visible')){
			$suggestionContainer.hide();
		}else{
			$suggestionContainer.show();
		}
	};

	var showHint = function(e){
		var $tar = $(this);
		var $tool = $tar.parents('.spelling-tool');
		console.log('showHint');
	};

	$(document).on('focus', 'input, textarea, [contenteditable=true]', getExistingText);
	$(document).on('blur', 'input, textarea, [contenteditable=true]', getCurrentText);
	
    $(document).on('mouseenter', '.spelling-bee-marker', displaySpellPopup).on('mouseleave', '.spelling-bee-marker', hideSpellPopup);
	$(document).on('click', '.spelling-tool-suggestions-container li', updateValue);
	$(document).on('click', 'button#spelling_tool_hint_button', showHint);
	$(document).on('click', 'button#spelling_tool_suggestion_button', showSuggestions);

};

var spell = new Spelling();
