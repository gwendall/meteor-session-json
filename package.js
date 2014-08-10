Package.describe({
	summary: "Bind parsed form and input data to Session variables"
});

Package.on_use(function (api, where) {
	if (api.export) {
		api.use([
			'ui',
			'jquery',
			'underscore'
		], 'client');
	}
	api.add_files([
		'vendor/form2js/form2js.js',
		'vendor/form2js/form2js.json2.js',
		'export.js'
	], 'client');
});