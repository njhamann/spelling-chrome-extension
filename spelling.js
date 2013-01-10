var Spelling = function(){
	var text = {};
	text.onfocus = null;
	text.onblur = null;

	var checkSpelling = function(str, callback){
		
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://public.noahhamann.com/spelling/index.php/api/?copy="+str, true);
		xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4) {
		    	var obj = JSON.parse(xhr.responseText);
		    	console.log(obj);
		  	}
		};
		xhr.send();
	};

	var events = function(){
		$('input, textarea').focus(function(){
			text.onfocus = $(this).val();
			console.log('text focus');
		});

		$('input, textarea').blur(function(){
			text.onblur = $(this).val();
			var val = text.onblur;
			checkSpelling(val, function(data){
				console.log(data);
			});
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
console.log(addedWords);
