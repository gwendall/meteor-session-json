Package.describe({
	summary: "JSON getters / setters for Session variables",
	version: "0.1.7",
	name: "gwendall:session-json",
	git: "https://github.com/gwendall/meteor-session-json.git"
});

Package.on_use(function (api, where) {
	api.versionsFrom('0.9.0');
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
