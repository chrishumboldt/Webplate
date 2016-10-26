/**
 * File: engine/js/src/tools.js
 * Type: Javascript tools
 * Author: Chris Humboldt
**/

// Table of contents
// Variables
// Basic checks
// Classes
// Clone
// Component facades
// Dates
// Development
// DOM
// Events
// Gets
// Helpers
// ID's
// Inputs
// Overlay
// Random
// Request
// State
// Storage
// Strings
// Time
// URL
// Return

var Web = (function () {
	// Variables
	var webMonths = [{
		number: '01',
		name: 'january',
		nameShort: 'jan'
	}, {
		number: '02',
		name: 'february',
		nameShort: 'feb'
	}, {
		number: '03',
		name: 'march',
		nameShort: 'mar'
	}, {
		number: '04',
		name: 'april',
		nameShort: 'apr'
	}, {
		number: '05',
		name: 'may',
		nameShort: 'may'
	}, {
		number: '06',
		name: 'june',
		nameShort: 'jun'
	}, {
		number: '07',
		name: 'july',
		nameShort: 'jul'
	}, {
		number: '08',
		name: 'august',
		nameShort: 'aug'
	}, {
		number: '09',
		name: 'september',
		nameShort: 'sep'
	}, {
		number: '10',
		name: 'october',
		nameShort: 'oct'
	}, {
		number: '11',
		name: 'november',
		nameShort: 'nov'
	}, {
		number: '12',
		name: 'december',
		nameShort: 'dec'
	}];
	var webPrefix = {
		basic: 'web-',
		state: '_state-'
	};
	var webState = {
		alts: {
			active: 'inactive',
			closed: 'open',
			hidden: 'visible',
			inactive: 'active',
			open: 'closed',
			visible: 'hidden'
		},
		list: ['active', 'closed', 'hidden', 'inactive', 'open', 'selected', 'toggled', 'visible']
	};
	var webTypes = {
		extensions: ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'],
		images: ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png']
	};

	// Basic checks
	var exists = function (check) {
		return (typeof check == 'undefined' || check === null || check === false) ? false : true;
	};
	var has = {
		spaces: function (check) {
			return /\s/.test(check);
		},
		class: function (element, className) {
			return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
		},
		extension: function (file, arAllowedTypes) {
			var allowedTypes = arAllowedTypes || webTypes.extensions;
			return allowedTypes[file.split('.').pop().toLowerCase()];
		}
	};
	var is = {
		color: function (color) {
			is.colour(color);
		},
		colour: function (colour) {
			return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/.test(colour);
		},
		date: function (date) {
			return /^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(date);
		},
		email: function (email, regExp) {
			var regExp = regExp || /([\w\.\-]+)@([\w\.\-]+)\.(\w+)/i;
			return regExp.test(email);
		},
		float: function (int) {
			return /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/.test(int);
		},
		integer: function (int) {
			return /^[0-9]+/.test(int);
		},
		image: function (file, arAllowedTypes) {
			var allowedTypes = arAllowedTypes || webTypes.images;
			return allowedTypes[file.split('.').pop().toLowerCase()];
		},
		json: function (json) {
			if (typeof json !== 'object') {
				try {
					JSON.parse(json);
				} catch (e) {
					return false;
				}
			}
			return true;
		},
		password: function (password, regExp) {
			var regExp = regExp || /^(?=.*\d).{6,}/;
			return regExp.test(password);
		},
		time: function (time, regExp) {
			var regExp = regExp || /([01]\d|2[0-3]):([0-5]\d)/;
			return regExp.test(time);
		},
		touch: function () {
			return 'ontouchstart' in window || 'onmsgesturechange' in window;
		},
		url: function (url, regExp) {
			var regExp = regExp || /(https?:\/\/[^\s]+)/g;
			return regExp.test(url);
		}
	};

	// Classes
	var classMethods = {
		add: function (element, className) {
			if (exists(element)) {
				if (typeof className === 'object') {
					for (var i = 0, len = className.length; i < len; i++) {
						classMethods.addExecute(element, className[i]);
					}
				} else if (has.spaces(className)) {
					var classes = className.split(' ');
					for (var i = 0, len = classes.length; i < len; i++) {
						classMethods.addExecute(element, classes[i]);
					}
				} else {
					classMethods.addExecute(element, className);
				}
			}
		},
		addExecute: function (element, className) {
			var crtClass = element.className;
			if (crtClass.match(new RegExp('\\b' + className + '\\b', 'g')) === null) {
				element.className = crtClass === '' ? className : crtClass + ' ' + className;
			}
		},
		clear: function (element) {
			if (exists(element)) {
				element.removeAttribute('class');
			}
		},
		remove: function (element, className) {
			if (exists(element)) {
				if (typeof className === 'object') {
					for (var i = className.length - 1; i >= 0; i--) {
						classMethods.removeExecute(element, className[i]);
					}
				} else if (has.spaces(className)) {
					var classes = className.split(' ');
					for (var i = 0, len = classes.length; i < len; i++) {
						classMethods.removeExecute(element, classes[i]);
					}
				} else {
					classMethods.removeExecute(element, className);
				}
			}
		},
		removeExecute: function (element, className) {
			if (element.className.indexOf(className) > -1) {
				element.className = element.className.split(' ').filter(function (val) {
					return val != className;
				}).toString().replace(/,/g, ' ');
				if (element.className === '') {
					classMethods.clear(element);
				}
			}
		},
		replace: function (element, removeClass, addClass) {
			if (exists(element)) {
				classMethods.add(element, addClass);
				classMethods.remove(element, removeClass);
			}
		},
		toggle: function (element, className) {
			if (exists(element)) {
				if (!has.class(element, className)) {
					classMethods.add(element, className);
				} else {
					classMethods.remove(element, className);
				}
			}
		}
	};

	// Clone
	// Incomplete. Needs a ton more work.
	var clone = function (elm) {
		switch(typeof elm) {
			case 'object':
				if (elm instanceof Array) {
					return JSON.parse(JSON.stringify(elm));
				}
				break;
			default:
				return false;
				break;
		}
	};

	// Component facades
	var button = function (options) {
		if (typeof Buttonplate != 'undefined') {
			return Buttonplate.init(options);
		}
		return false;
	};
	var flicker = function (options) {
		return false;
	};
	var form = function (options) {
		return false;
	};
	var injectplateExecute = function () {
		if (typeof Injectplate != 'undefined') {
			return Injectplate.init();
		}
		return false;
	};
	var loader = function (options) {
		return false;
	};
	var menu = function (options) {
		return false;
	};
	var message = function (options) {
		return false;
	};
	var modal = function (options) {
		return false;
	};
	var tab = function (options) {
		return false;
	};

	// Dates
	var date = {
		basic: function (thisDate) {
			var thisDate = date.transform(thisDate);
			if (!thisDate) {
				return false;
			}
			var day = date.day(thisDate.getDate());
			var month = date.month(thisDate.getMonth() + 1);
			var year = date.year(thisDate.getFullYear());
			return day + ' ' + month + ' ' + year;
		},
		crtDB: function () {
			var now = new Date();
			return now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);
		},
		day: function (thisDayVal, type) {
			var thisDay;
			var type = (typeof type === 'string') ? type : false;

			// Get month
			if (typeof thisDayVal === 'number') {
				thisDay = thisDayVal;
			} else if (typeof thisDayVal === 'string') {
				thisDay = (date.transform(thisDayVal).getDate());
			} else {
				thisDay = new Date().getDate();
			}

			// Validate
			if (!thisDay) {
				return false;
			} else {
				thisDay = thisDay.toString();
			}

			// Return
			if (type === 'long') {
				return (thisDay.length === 1) ? '0' + thisDay : thisDay;
			} else {
				return parseInt(thisDay);
			}
		},
		month: function (thisMonthVal, type) {
			var thisMonth;
			var type = (typeof type === 'string') ? type : false;

			// Get month
			if (typeof thisMonthVal === 'number') {
				thisMonth = thisMonthVal;
			} else if (typeof thisMonthVal === 'string') {
				thisMonth = (date.transform(thisMonthVal).getMonth() + 1);
			} else {
				thisMonth = new Date().getMonth() + 1;
			}

			// Validate
			if (!thisMonth) {
				return false;
			} else {
				thisMonth = thisMonth.toString();
			}

			// Return
			switch (type) {
				case 'long':
					thisMonth = (thisMonth.length === 1) ? '0' + thisMonth : thisMonth;
					for (var i = 0, len = webMonths.length; i < len; i++) {
					   if (webMonths[i].number == thisMonth) {
							thisMonth = string.uppercase.first(webMonths[i].name);
							break;
						}
					}
					break;
				case 'number':
					thisMonth = parseInt(thisMonth);
					break;
				default:
					thisMonth = (thisMonth.length === 1) ? '0' + thisMonth : thisMonth;
					for (var i = 0, len = webMonths.length; i < len; i++) {
					   if (webMonths[i].number == thisMonth) {
							thisMonth = string.uppercase.first(webMonths[i].nameShort);
							break;
						}
					}
			}
			return thisMonth;
		},
		toISO: function (thisDate, fullDate) {
			var fullDate = (typeof fullDate !== 'undefined') ? fullDate : true;
			// Spaced dates
			if (thisDate.indexOf(' ') > -1) {
				var year, month, day, time, returnDate;
				var dateSplit = thisDate.split(' ');
				for (var i = 0, len = dateSplit.length; i < len; i++) {
					if (is.integer(dateSplit[i])) {
						if (dateSplit[i].length === 2) {
							day = dateSplit[i];
						} else if (dateSplit[i].length === 4) {
							year = dateSplit[i];
						}
					} else if (dateSplit[i].indexOf(':') === 2 && fullDate === true) {
						time = dateSplit[i];
					} else {
						var lowerDateSplit = string.lowercase(dateSplit[i]);
						for (var i2 = 0, len2 = webMonths.length; i2 < len2; i2++) {
							if (lowerDateSplit === webMonths[i2].name || lowerDateSplit === webMonths[i2].nameShort) {
								month = webMonths[i2].number;
								break;
							}
						}
					}
				}
				returnDate = year + '-' + month + '-' + day;
				if (fullDate === true && time !== undefined) {
					returnDate += 'T' + time;
				}
				return returnDate;
			}
		},
		transform: function (thisDate) {
			/*
			NOTE: This is not a perfect test. This function will attempt to convert
			any string passed into a date. This should really only be used with date
			formats that are known to be correct.
			*/
			var thisDate = (thisDate) ? new Date(thisDate) : new Date();
			// Fail test
			if (thisDate.toString() == 'Invalid Date') {
				return false;
			}
			return thisDate;
		},
		year: function (thisYearVal, type) {
			var thisYear;
			var type = (typeof type === 'string') ? type : false;

			// Get month
			if (typeof thisYearVal === 'number') {
				thisYear = thisYearVal;
			} else if (typeof thisYearVal === 'string') {
				thisYear = (date.transform(thisYearVal).getFullYear());
			} else {
				thisYear = new Date().getFullYear();
			}

			// Validate
			if (!thisYear) {
				return false;
			} else {
				thisYear = thisYear.toString();
			}

			// Return
			switch (type) {
				case 'long':
					if (thisYear.length < 4) {
						var newDate = new Date().getFullYear().substr(0, 4 - thisYear.length).toString();
						thisYear = parseInt(newDate + thisYear);
					} else {
						thisYear = parseInt(thisYear);
					}
					break;
				case 'short':
					if (thisYear.length === 1) {
						var newDate = new Date().getFullYear().toString().substr(2, 1);
						thisYear = newDate + thisYear;
					} else {
						thisYear = thisYear.substr(thisYear.length - 2, 2);
					}
					break;
			}
			return parseInt(thisYear);
		}
	};

	// Development
	var log = function (text) {
		if (window && window.console) {
			console.log(text);
		}
	};

	// DOM
	var dom = {
		body: document.getElementsByTagName('body')[0],
		html: document.getElementsByTagName('html')[0],
		ratio: function (selector, multiplier) {
			var elements = document.querySelectorAll(selector);
			if (typeof (multiplier) === 'undefined') {
				multiplier = 1;
			}
			for (var i = elements.length - 1; i >= 0; i--) {
				elements[i].style.height = Math.floor(elements[i].offsetWidth * multiplier) + 'px';
			}
		},
		remove: function (selElm) {
			if (exists(selElm)) {
				if (selElm.nodeType == undefined) {
					var elements = dom.select(selElm);
					if (elements !== null) {
						if (elements.nodeType == undefined) {
							for (var i = elements.length - 1; i >= 0; i--) {
								if (elements[i] !== null) {
									elements[i].parentNode.removeChild(elements[i]);
								}
							}
						} else {
							elements.parentNode.removeChild(elements);
						}
					}
				} else {
					if (selElm !== null) {
						selElm.parentNode.removeChild(selElm);
					}
				}
			}
		},
		select: function (selector) {
			if (selector.indexOf('.') > -1 || has.spaces(selector)) {
				var returnElements = document.querySelectorAll(selector);
				if (returnElements.length > 0) {
					return returnElements;
				}
				return false;
			} else {
				if (selector.indexOf('#') > -1) {
					return [document.getElementById(selector.substring(1))];
				} else {
					var returnElements = document.getElementsByTagName(selector);
					if (returnElements.length > 0) {
						return returnElements;
					}
					return false;
				}
			}
		},
		title: document.getElementsByTagName('title')[0],
		wallpaper: function (selector) {
			var elements = dom.select(selector);
			for (var i = elements.length - 1; i >= 0; i--) {
				var thisWallpaper = elements[i].getAttribute('data-wallpaper');
				if (thisWallpaper !== null) {
					elements[i].style.backgroundImage = 'url("' + thisWallpaper + '")';
				}
			}
		},
		webplateScript: document.getElementById('webplate')
	};

	// Events
	var eventMethods = {
		add: function (elem, type, eventHandle) {
			if (elem == null || typeof (elem) == 'undefined') return;
			if (elem.addEventListener) {
				elem.addEventListener(type, eventHandle, false);
			} else if (elem.attachEvent) {
				elem.attachEvent('on' + type, eventHandle);
			} else {
				elem['on' + type] = eventHandle;
			}
		},
		remove: function (elem, type, eventHandle) {
			if (elem == null || typeof (elem) == 'undefined') return;
			if (elem.removeEventListener) {
				elem.removeEventListener(type, eventHandle, false);
			} else if (elem.detachEvent) {
				elem.detachEvent('on' + type, eventHandle);
			} else {
				elem['on' + type] = eventHandle;
			}
		}
	};

	// Gets
	var get = {
		extension: function (file) {
			return file.split('.').pop().toLowerCase();
		},
		index: function (node) {
			return [].indexOf.call(node.parentNode.children, node);
		},
		integers: function (string) {
			return string.replace(/^\D+ /g, '').replace(/ /g, '');
		}
	};

	// Helpers
	var helper = {
		setDefault: function (setValue, defaultValue) {
			if (typeof setValue == 'undefined' && typeof defaultValue == 'undefined') {
				return false;
			} else if (typeof setValue != 'undefined' && typeof defaultValue == 'undefined') {
				return setValue;
			} else if (typeof setValue === typeof defaultValue) {
				return setValue;
			} else {
				return defaultValue;
			}
		}
	};

	// ID's
	var id = {
		add: function (element, id) {
			if (exists(element)) {
				element.setAttribute('id', id);
			}
		},
		remove: function (element) {
			if (exists(element)) {
				element.removeAttribute('id');
			}
		}
	};

	// Inputs
	var input = {
		disable: function (selector) {
			var inputElements = dom.select(selector);
			if (inputElements.nodeType == undefined) {
				for (var i = inputElements.length - 1; i >= 0; i--) {
					inputElements[i].disabled = true;
				}
			} else {
				inputElements.disabled = true;
			}
		},
		enable: function (selector) {
			var inputElements = dom.select(selector);
			if (inputElements.nodeType == undefined) {
				for (var i = inputElements.length - 1; i >= 0; i--) {
					inputElements[i].disabled = false;
				}
			} else {
				inputElements.disabled = false;
			}
		}
	};

	// Overlay
	var overlay = {
		add: function () {
			var webplateOverlay = document.createElement('div');
			id.add(webplateOverlay, webPrefix.basic + 'overlay');
			if (!exists(document.getElementById(webPrefix.basic + 'overlay'))) {
				dom.body.appendChild(webplateOverlay);
			}
		},
		hide: function () {
			classMethods.remove(dom.html, 'web-overlay-reveal');
		},
		show: function () {
			setTimeout(function () {
				classMethods.add(dom.html, 'web-overlay-reveal');
			}, 50);
		}
	};

	// Random
	var random = {
		integer: function (max, min) {
			var max = (typeof max === 'number') ? max : 10;
			var min = (typeof min === 'number') ? min : 1;
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		string: function (stringLength, textOnly) {
			var textOnly = (typeof textOnly === 'boolean') ? textOnly : false;
			var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
			var len = (typeof stringLength === 'number') ? stringLength : 5;
			var randomString = '';
			if (!textOnly) {
				chars += '0123456789';
			}
			for (var i = 0; i < len; i++) {
				rNum = Math.floor(Math.random() * chars.length);
				randomString += chars[rNum];
			}
			return randomString;
		}
	};

	// Request
	var parse = {
		json: function (json) {
			if (is.json(json)) {
				return JSON.parse(json);
			}
			return json;
		}
	};
	var request = (function () {
		var defaults = {
			async: true,
			data: false,
			dataType: 'json',
			headers: false,
			onStart: false,
			onLoading: false,
			onSuccess: false,
			onError: false,
			onEnd: false,
			timeout: false,
			type: false,
			withCredentials: false
		};
		var run = function (userOptions) {
			if (!exists(userOptions) || !exists(userOptions.url)) {
				return false;
			}

			var options = {
				url: userOptions.url,
				async: (typeof userOptions.async === 'string') ? userOptions.async : defaults.async,
				data: (exists(userOptions.data)) ? userOptions.data : defaults.data,
				dataType: (exists(userOptions.dataType)) ? userOptions.dataType : defaults.dataType,
				headers: (typeof userOptions.headers === 'object') ? userOptions.headers : defaults.headers,
				onStart: (typeof userOptions.onStart === 'function') ? userOptions.onStart : defaults.onStart,
				onLoading: (typeof userOptions.onLoading === 'function') ? userOptions.onLoading : defaults.onLoading,
				onSuccess: (typeof userOptions.onSuccess === 'function') ? userOptions.onSuccess : defaults.onSuccess,
				onError: (typeof userOptions.onError === 'function') ? userOptions.onError : defaults.onError,
				onEnd: (typeof userOptions.onEnd === 'function') ? userOptions.onEnd : defaults.onEnd,
				timeout: (typeof userOptions.timeout === 'number') ? time.seconds(userOptions.timeout) : defaults.timeout,
				type: (exists(userOptions.type)) ? string.uppercase.all(userOptions.type) : defaults.type,
				withCredentials: (typeof userOptions.withCredentials === 'boolean') ? userOptions.withCredentials : defaults.withCredentials
			};
			var xhr = new XMLHttpRequest();
			xhr.withCredentials = options.withCredentials;

			if (options.timeout) {
				xhr.timeout = options.timeout;
			}

			xhr.onreadystatechange = function () {
				switch (this.readyState) {
					case 1:
						if (options.onStart) {
							options.onStart();
						}
						break;

					case 3:
						if (options.onLoading) {
							options.onLoading();
						}
						break;

					case 4:
						if (options.onEnd) {
							options.onEnd(this);
						}
						if (this.status >= 200 && this.status < 300) {
							if (options.onSuccess) {
								options.onSuccess(parse.json(this.responseText), this.status, xhr.getAllResponseHeaders());
							}
						} else {
							if (options.onError) {
								options.onError(parse.json(this.responseText), this.status, xhr.getAllResponseHeaders());
							}
						}
						break;
				}
			};

			// Make the request
			if (options.data && options.type === 'GET') {
				var queryString = '';
				for (var key in options.data) {
					if (options.data.hasOwnProperty(key)) {
						queryString += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key]);
					}
				}
				options.url = options.url + '?' + string.remove.first(queryString);
			}
			xhr.open(options.type, options.url, options.async);
			// Set headers
			if (options.headers) {
				for (var key in options.headers) {
					if (options.headers.hasOwnProperty(key)) {
						xhr.setRequestHeader(key, options.headers[key]);
					}
				}
			}

			// Send (with data if need be)
			if (options.data && options.type === 'POST') {
				if (is.json(options.data)) {
					var send;
					switch (string.lowercase.all(options.dataType)) {
						case 'form':
							xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
							var formQuery = '';
							for (var key in options.data) {
								if (options.data.hasOwnProperty(key)) {
									formQuery += '&' + key + '=' + options.data[key];
								}
							}
							send = string.remove.first(formQuery);
							break;

						case 'formdata':
							send = new FormData();
							for (var key in options.data) {
								if (options.data.hasOwnProperty(key)) {
									send.append(key, options.data[key]);
								}
							}
							break;

						default:
							xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
							send = JSON.stringify(options.data);
							break;
					}
					xhr.send(send);
				} else {
					xhr.send(options.data);
				}
			} else {
				xhr.send();
			}
		};
		var runDelete = function (userOptions) {
			userOptions.type = 'DELETE';
			run(userOptions);
		};
		var runGet = function (userOptions) {
			userOptions.type = 'GET';
			run(userOptions);
		};
		var runPost = function (userOptions) {
			userOptions.type = 'POST';
			run(userOptions);
		};
		var runPut = function (userOptions) {
			userOptions.type = 'PUT';
			run(userOptions);
		};

		return {
			defaults: defaults,
			delete: runDelete,
			get: runGet,
			post: runPost,
			put: runPut,
			run: run
		};
	})();

	// State
	var state = {
		add: function (element, state) {
			if (!exists(element)) {
				return false;
			}
			var newWebStates = webState.list.slice().map(function (newState) {
				return webPrefix.state + newState;
			});
			var stateClass = newWebStates.splice(newWebStates.indexOf(webPrefix.state + state), 1);
			classMethods.replace(element, newWebStates, stateClass);
		},
		clear: function (element) {
			if (!exists(element)) {
				return false;
			}
			var newWebStates = webState.list.slice().map(function (newState) {
				return webPrefix.state + newState;
			});
			classMethods.remove(element, newWebStates);
		},
		toggle: function (element, state, clear) {
			if (!exists(element)) {
				return false;
			}
			if (webState.list.indexOf(state) > -1) {
				var altState = webState.alts[state] || false;
				var clear = (typeof clear === 'boolean') ? clear : false;
				var stateClass = webPrefix.state + state;
				if (has.class(element, stateClass)) {
					if (clear || altState === false) {
						this.clear(element);
					} else {
						this.add(element, altState);
					}
				} else {
					this.add(element, state);
				}
			}
		}
	};

	// Storage
	var storage = {
		engine: {
			name: 'web-store',
			type: 'session'
		},
		add: function (name, value) {
			if (!exists(name) || !exists(value)) {
				return false;
			}
			var thisEngine = this.engine;
			var storage = false;
			switch (thisEngine.type) {
				case 'local':
					storage = localStorage.getItem(thisEngine.name);
					break;

				case 'session':
					storage = sessionStorage.getItem(thisEngine.name);
					break;
			}
			if (storage) {
				storage = JSON.parse(storage);
			} else {
				storage = {};
			}
			storage[name] = value;
			switch (thisEngine.type) {
				case 'local':
					localStorage.setItem(thisEngine.name, JSON.stringify(storage));
					break;

				case 'session':
					sessionStorage.setItem(thisEngine.name, JSON.stringify(storage));
					break;
			}
		},
		clear: function () {
			localStorage.removeItem(this.engine.name);
			sessionStorage.removeItem(this.engine.name);
		},
		get: function (name) {
			if (!exists(name)) {
				return false;
			}
			var thisEngine = this.engine;
			var storage = false;
			switch (thisEngine.type) {
				case 'local':
					storage = localStorage.getItem(thisEngine.name);
					break;

				case 'session':
					storage = sessionStorage.getItem(thisEngine.name);
					break;
			}
			if (storage) {
				storage = JSON.parse(storage);
				return storage[name];
			} else {
				return false;
			}
		},
		remove: function (name) {
			if (!exists(name)) {
				return false;
			}
			var thisEngine = this.engine;
			var storage = false;
			switch (thisEngine.type) {
				case 'local':
					storage = localStorage.getItem(thisEngine.name);
					break;

				case 'session':
					storage = sessionStorage.getItem(thisEngine.name);
					break;
			}
			if (storage) {
				storage = JSON.parse(storage);
				delete storage[name];
				switch (thisEngine.type) {
					case 'local':
						localStorage.setItem(thisEngine.name, JSON.stringify(storage));
						break;

					case 'session':
						sessionStorage.setItem(thisEngine.name, JSON.stringify(storage));
						break;
				}
			}
		}
	};

	// Strings
	var string = {
		format: {
			// As per Aliceljm
			// http://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
			bytes: function (bytes, decimals) {
				if (typeof bytes !== 'number' || bytes == 0) {
					return '0 Byte';
				}
				var k = 1000;
				var dm = decimals + 1 || 3;
				var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
				var i = Math.floor(Math.log(bytes) / Math.log(k));
				return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
			}
		},
		lowercase: {
			all: function (string) {
				return string.toLowerCase();
			},
			first: function (string) {
				return string.charAt(0).toLowerCase() + string.slice(1);
			},
			last: function (string) {
				return string.slice(0, string.length - 1) + string.charAt(string.length - 1).toLowerCase();
			}
		},
		remove: {
			first: function (string) {
				return string.substring(1);
			},
			firstAndLast: function (string) {
				return string.substring(1, string.length - 1);
			},
			last: function (string) {
				return string.substring(0, string.length - 1);
			},
			spaces: function (string) {
				return string.replace(/ /g, '');
			}
		},
		uppercase: {
			all: function (string) {
				return string.toUpperCase();
			},
			first: function (string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			},
			last: function (string) {
				return string.slice(0, string.length - 1) + string.charAt(string.length - 1).toUpperCase();
			}
		}
	};

	// Time
	var time = {
		hours: function (hours) {
			return hours * 60 * 60 * 1000;
		},
		minutes: function (minutes) {
			return minutes * 60 * 1000;
		},
		seconds: function (seconds) {
			return seconds * 1000;
		}
	};

	// URL
	var url = function (ret) {
		var ret = (typeof ret === 'string') ? ret : 'all';
		var windowLocation = window.location;
		var fullUrl = windowLocation.href;

		var currentUrl = fullUrl.split('#')[0];
		var hash = windowLocation.hash.substring(1);
		var host = windowLocation.host;
		var protocol = windowLocation.protocol + '//';

		var baseUrl = '';
		if (document.getElementsByTagName('base').length > 0) {
			baseUrl = document.getElementsByTagName('base')[0].href;
		} else {
			baseUrl = protocol + host;
		}
		var pathname = windowLocation.pathname;
		var segments = [];
		var pathnameSplit = pathname.split('/');
		for (var i = 0, len = pathnameSplit.length; i < len; i++) {
			if (pathnameSplit[i].indexOf('.') < 0 && pathnameSplit[i] != '') {
				segments.push(pathnameSplit[i]);
			}
		}

		var objUrl = {
			baseUrl: baseUrl,
			currentUrl: currentUrl,
			fullUrl: fullUrl,
			hash: hash,
			host: host,
			pathname: pathname,
			protocol: protocol,
			segments: segments
		};

		if (ret === 'all') {
			return objUrl;
		} else {
			return objUrl[ret];
		}
	};

	// Return
	return  {
		exists: exists,
		has: has,
		is: is,
		date: date,
		log: log,
		class: {
			add: classMethods.add,
			clear: classMethods.clear,
			remove: classMethods.remove,
			replace: classMethods.replace,
			toggle: classMethods.toggle
		},
		clone: clone,
		dom: dom,
		event: eventMethods,
		get: get,
		helper: helper,
		id: id,
		input: input,
		state: state,
		parse: parse,
		request: request,
		storage: storage,
		string: string,
		random: random,
		time: time,
		url: url,
		overlay: overlay,
		button: button,
		flicker: flicker,
		form: form,
		injectplateExecute: injectplateExecute,
		loader: loader,
		menu: menu,
		message: message,
		modal: modal,
		tab: tab
	};
})();
