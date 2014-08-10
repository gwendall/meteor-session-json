Package.describe({
	summary: "JSON getters / setters for Session variables"
});

Package.on_use(function (api, where) {
	if (api.export) {
		api.use([
			'underscore',
			'reactive-dict'
		], 'client');
	}
	api.add_files([
		'export.js'
	], 'client');
});
