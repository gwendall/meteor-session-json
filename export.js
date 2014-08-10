/*
	Notes
	=====
	- It uses jQuery because UI.body events are buggy (https://github.com/meteor/meteor/wiki/Using-Blaze#uibody-is-now-a-template-corresponding-to-the-entire-body-element)
	- Form data is parsed with https://github.com/maxatwork/form2js
	- A timeout is used to prevent setting the Session var on each keyup (see for example http://stackoverflow.com/questions/1909441/jquery-keyup-delay)
*/

/////////////////////
// ELEMENT -> DATA //
/////////////////////

$(document).on("keyup change", "form[session-bind] :input", function(e) {
	
	var element = $(e.target).parents("form");
	$(element).bindElementToSession();

});

$(document).on("keyup change", ":input[session-bind]", function(e) {
	
	var element = $(e.target);
	$(element).bindElementToSession();

});

var sbTimeout = null;
$.fn.bindElementToSession = function() {
	
	var self = this,
		data = $(self).valueJSON();

	if (sbTimeout != null) {
		clearTimeout(sbTimeout);
		sbTimeout = null;
	}

	var timeout = Number($(self).attr("sb-timeout")) || 0;	
	sbTimeout = setTimeout(function() {

		var session = $(self).getElementSessionName();
		Session.set(session, data);
		
	}, timeout); 			
	
}

$.fn.valueJSON = function() {
	
	var self = this,
		elementType = $(self).get(0).tagName,
		data = {};

	if (elementType == 'FORM') data = form2js($(self).get(0));
	if (elementType == 'INPUT') data[$(self).attr("name")] = $(self).val();

	return data;
	
}

$.fn.getElementSessionName = function() {

	var session = $(this).attr("session-bind") || null;
	return session;

}

/////////////////////
// DATA -> ELEMENT //
/////////////////////

$.fn.bindDataToElement = function(data, fields) {
	
	var self = this,
		elementType = $(self).get(0).tagName,
		currentData = $(self).valueJSON();
	
	if (!_.isString(data)) {
		if (_.isArray(fields)) data = _.pick(data, fields);
		data = _.extend(currentData, data);		
	}

	if (elementType == 'FORM') js2form($(self).get(0), data);
	if (elementType == 'INPUT') {
		if (!_.isString(data)) data = data[$(self).attr('name')];
		$(self).val(data);
	}

}

$.fn.bindSessionToElement = function(fields) {
	
	var self = this,
		session = $(self).getElementSessionName() || null,
		sessionData = Session.get(session) || null;
		$(self).bindDataToElement(sessionData, fields);

}