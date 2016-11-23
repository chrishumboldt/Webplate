if (!window.fallback) {
	// This is for the minifier. DO NOT REMOVE!
	var fallback = {};

	fallback.is_defined =
	fallback.is_object =
	fallback.is_string =
	fallback.is_array =
	fallback.is_function =
	fallback.load =
	fallback.importer =
	fallback.ready = {};
}

if (!window.fbk) {
	var fbk = {};
}

// fallback.importer / .ready on demand example
fallback.importer({
	'#postload': 'index.css',

	JSON: '//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min.js',

	jQuery: [
		'//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.FAIL_ON_PURPOSE.min.js',
		'//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js',
		'//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.0/jquery.min.js'
	],

	'jQuery.ui': [
		'//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
		'//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
		'//js/loader.js?i=vendor/jquery-ui.min.js'
	]
}, {
	// This is for the minifier. DO NOT REMOVE!
	deps: {},
	dependencies: {},

	// Only load jQuery UI after jQuery itself has loaded!
	shim: {
		'jQuery.ui': ['jQuery']
	}
});

fallback.ready(['jQuery', '#postload'], function() {
	// jQuery Completed
	$('body').append('<p>fallback.ready: Stylesheet Completed</p>');
});

fallback.ready(['jQuery'], function() {
	// jQuery Completed
	$('body').append('<p>fallback.ready: jQuery Completed</p>');
});

fallback.ready(['jQuery.ui'], function() {
	// jQuery UI Completed
	$('body').append('<p>fallback.ready: jQuery UI Completed</p>');
});

fallback.ready(['jQuery', 'jQuery.ui'], function() {
	// jQuery + jQuery UI Completed
	$('body').append('<p>fallback.ready: jQuery + jQuery UI Completed</p>');
});

fallback.ready(function() {
	// All Completed
	$('body').append('<p>fallback.ready: ALL Completed</p>');
	
	$('#postload').click(function() {
		fallback.ready(['jQuery'], function() {
			// jQuery POSTLOAD!
			$('body').append('<p>fallback.ready: jQuery POSTLOAD!</p>');
		});
	});
});

fallback.ready(function(success, failed) {
	$('body').append('<p>fallback.load: Inline Callback</p>');

	pre = '\nSuccess!\n-------\n' + JSON.stringify(success, null, 4);
	pre += '\n\n\n\nFailed!\n-------\n' + JSON.stringify(failed, null, 4);

	$('body').prepend('<pre style="display: none">' + pre + '</pre>');
	$('body').prepend('<strong style="display: none; color: green">.READY() EXECUTE CODE! ;-)</strong>');

	$('pre').show(1500, function() {
		$('strong').show(500).css('display', 'block');
	});
});





// fallback.load example
fallback.load({
	'#postload': 'index.css',

	JSON: '//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min.js',

	jQuery: [
		'//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.FAIL_ON_PURPOSE.min.js',
		'//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js',
		'//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.0/jquery.min.js'
	],

	'jQuery.ui': [
		'//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
		'//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
		'//js/loader.js?i=vendor/jquery-ui.min.js'
	]
}, {
	// Only load jQuery UI after jQuery itself has loaded!
	shim: {
		'jQuery.ui': ['jQuery']
	}
}, function(success, failed) {
	$('body').append('<p>fallback.load: Inline Callback</p>');

	pre = '\nSuccess!\n-------\n' + JSON.stringify(success, null, 4);
	pre += '\n\n\n\nFailed!\n-------\n' + JSON.stringify(failed, null, 4);

	$('body').prepend('<pre style="display: none">' + pre + '</pre>');
	$('body').prepend('<strong style="display: none; color: green">.LOAD() EXECUTE CODE! ;-)</strong>');

	$('pre').show(1500, function() {
		$('strong').show(500).css('display', 'block');
	});
});

fallback.ready(['jQuery'], function() {
	// jQuery Completed
	$('body').append('<p>fallback.ready: jQuery Completed</p>');
});

fallback.ready(['jQuery.ui'], function() {
	// jQuery UI Completed
	$('body').append('<p>fallback.ready: jQuery UI Completed</p>');
});

fallback.ready(['jQuery', 'jQuery.ui'], function() {
	// jQuery + jQuery UI Completed
	$('body').append('<p>fallback.ready: jQuery + jQuery UI Completed</p>');
});

fallback.ready(function() {
	// All Completed
	$('body').append('<p>fallback.ready: ALL Completed</p>');
	
	$('#postload').click(function() {
		fallback.ready(['jQuery'], function() {
			// jQuery POSTLOAD!
			$('body').append('<p>fallback.ready: jQuery POSTLOAD!</p>');
		});
	});
});

fallback.load({
	bootstrap_css: '//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css',
	jasny_css: '//cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/css/jasny-bootstrap.min.css',
	jQuery: '//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js',
	'jQuery.fn.modal': '//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js'
}, {
	shim: { //establishes load dependencies
		'jQuery.fn.modal': ['jQuery']
	}
});