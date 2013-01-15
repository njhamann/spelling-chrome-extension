
var uid;
chrome.storage.sync.get("uid", function(val) {
   	console.log(val.uid);
   	if(val.uid){
   		uid = val.uid;
   	}else{
   		uid = GUID();
		chrome.storage.sync.set({'uid': uid}, function() {
			console.log('guid saved');
		});
   	}
});


function GUID ()
{
    var S4 = function ()
    {
        return Math.floor(
                Math.random() * 0x10000 
            ).toString(16);
    };
    return (
            S4() + S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + S4() + S4()
        );
}



chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.terms)
      		//sendResponse(function(){return true;});

      	check(request.terms, function(obj){
      		console.log('obj');
      		console.log(obj);
      		sendResponse({message: 'term saved'});
      	});
 		return true;
 	}
);
var check = function(str, callback){
	var url = 'http://public.noahhamann.com/spelling/index.php/api/terms/check';
	var data = 'copy='+str+'&user_id='+uid;
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
