app = {
	path: './',
	port: 8000,
	livereload: 8001,
	url: 'http://localhost:<%= connect.options.port %>'
};

var args = global.process.argv;
var url = app.url;

if (args.length) {
	for (var index in args) {
		var arg = args[index];

		if (arg.substr(0, 6) == '--url=') {
			url = arg.substr(6, arg.length - 6);
		}
	}
}

app.url = url;

app.initialize = function(grunt) {
	var me = this;

	if (me.initialized) {
		return false;
	}

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.initConfig(me.config);
	me.tasks(grunt);

	return me.initialized = true;
};

app.config = {
	app: app,

	watch: {
		livereload: {
			options: {
				livereload: app.livereload
			},

			tasks: ['build'],

			files: [
				'<%= app.path %>/fallback.js',
				'<%= app.path %>/fallback.min.js'
			]
		}
	},

	connect: {
		options: {
			hostname: 'localhost',
			port: app.port,
		},

		livereload: {
			options: {
				middleware: function (connect) {
					return [
						require('connect-livereload')({
							port: app.livereload
						}),

						app.mount(connect, app.path)
					];
				}
			}
		}
	},

	open: {
		server: {
			path: app.url
		}
	},

	jshint: {
		//files: ['js/lib/app.js'],

		options: {
			'-W065': true,
			'-W093': true,

			globals: {
				console: false
			}
		}
	},

	'closure-compiler': {
		frontend: {
			closurePath: './',
			js: './fallback.js',
			jsOutputFile: './fallback.min.js',
			maxBuffer: 10,
			externs: './demo/build/index.js',
			options: {
				compilation_level: 'ADVANCED_OPTIMIZATIONS',
				language_in: 'ECMASCRIPT5_STRICT'
			}
		}
	}
};

app.mount = function(connect, directory) {
	return connect.static(require('path').resolve(directory));
};

app.tasks = function(grunt) {
	grunt.registerTask('build', [
		'closure-compiler'
	]);

	grunt.registerTask('default', [
		'jshint'
	]);

	grunt.registerTask('server', function(target) {
		grunt.task.run([
			'default',
			'connect:livereload',
			'open',
			'watch'
		]);
	});
};

module.exports = function(grunt) {
	return app.initialize(grunt);
};