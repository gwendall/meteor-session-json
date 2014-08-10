/*
	Notes
	=====
	- It uses jQuery because UI.body events are buggy (https://github.com/meteor/meteor/wiki/Using-Blaze#uibody-is-now-a-template-corresponding-to-the-entire-body-element)
	- Form data is parsed with https://github.com/maxatwork/form2js
	- A timeout is used to prevent setting the Session var on each keyup (see for example http://stackoverflow.com/questions/1909441/jquery-keyup-delay)
*/

var sbTimeout = null;

function sessionBind(element, data) {
	
	if (sbTimeout != null) {
		clearTimeout(sbTimeout);
		sbTimeout = null;
	}

	var timeout = Number($(element).attr("sb-timeout")) || 0;	
	sbTimeout = setTimeout(function() {

		var session = $(element).attr("session-bind") || $(element).attr("sb-session");
		Session.set(session, data);
		console.log('Session changed!', data);
		
	}, timeout); 			
	
}

$(document).on("keyup click change", "form[session-bind] :input", function(e) {
	
	var form = $(e.target).parents("form")[0]
		data = form2js(form);
	
	sessionBind(form, data);

});

$(document).on("keyup click change", ":input[session-bind]", function(e) {
	
	var input = $(e.target)[0]
		data = {};
		data[$(input).attr("name")] = $(input).val();

	sessionBind(input, data);

});