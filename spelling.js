var Spelling = function(){
	var text = {};

	var checkSpelling = function(str, callback){
		
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://public.noahhamann.com/spelling/index.php/api/terms/check?copy="+str, true);
		xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4) {
		    	var obj = JSON.parse(xhr.responseText);
		    	if(callback)
		    		callback(obj);
		  	}
		};
		xhr.send();
	};

	var events = function(){
		var text = {};
		text.oldText = '';
		text.newText = '';

		$('input, textarea, [contenteditable=true]').focus(function(){
			console.log('text focus');
			text.oldText = this.isContentEditable ? $(this).text() : $(this).val();

		});

		$('input, textarea, [contenteditable=true]').blur(function(){
			text.newText = this.isContentEditable ? $(this).text() : $(this).val();
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
		});
	};
	return{
		checkSpelling: checkSpelling,
		events: events
	}
};

var addedWords = diffString(
   "The red brown fox jumped over the rolling log.",
   "The brown spotted fox leaped over the rolling log"
);

var spell = new Spelling();
spell.events();
