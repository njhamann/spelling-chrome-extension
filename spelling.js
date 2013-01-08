var Spelling = function(){
	
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
			console.log('text focus');
		});

		$('input, textarea').blur(function(){
			checkSpelling($(this).val(), function(data){
				console.log(data);
			});
		});
	};
	return{
		checkSpelling: checkSpelling,
		events: events
	}
};

var spelling = new Spelling();
spelling.events();
