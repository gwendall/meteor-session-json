var deep = function (obj, key, value) {
	
	var keys = key.replace(/\[(["']?)([^\1]+?)\1?\]/g, '.$2').replace(/^\./, '').split('.'),
			root,
			i = 0,
			n = keys.length;

	// Set deep value
	if (arguments.length > 2) {

		root = obj;
		n--;

		while (i < n) {
			key = keys[i++];
			obj = obj[key] = _.isObject(obj[key]) ? obj[key] : {};
		}

		obj[keys[i]] = value;

		value = root;

	// Get deep value
	} else {
		while ((obj = obj[keys[i++]]) != null && i < n) {};
		value = i < n ? void 0 : obj;
	}

	return value;

}

_.extend(ReactiveDict.prototype, {
	getJSON: function(selector) {
		
		var self = this,
			pathKeys = selector.split('.');
		
		if (pathKeys.length == 1) {

			return self.get(selector);

		} else {
			
			var sessionKey = pathKeys[0],
				jsonValue = self.get(sessionKey);

			pathKeys.shift();

			var jsonPath = pathKeys.join('.'),
				value = deep(jsonValue, jsonPath);

			return value;
			
		}
	
	},
	setJSON: function(selector, value) {
		
		var self = this,
			pathKeys = selector.split('.');
		
		if (pathKeys.length == 1) {

			return self.set(selector, value);

		} else {
			
			var sessionKey = pathKeys[0],
				jsonValue = self.get(sessionKey);

			pathKeys.shift();

			var jsonPath = pathKeys.join('.'),
				value = deep(jsonValue, jsonPath, value);
			
			return self.set(sessionKey, value);
			
		}
		
	}
});