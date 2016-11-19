#!usr/bin/env node

/**
 * File: index.js
 * Type: Javascript NodeJS module file
 * Author: Chris Humboldt
**/

var RocketTools = (function () {
	// Defaults
	var defaults = {
		button: {
			selector: '.button'
		},
		extensions: {
			all: ['png', 'jpg', 'jpeg', 'json', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'],
			images: ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png']
		},
		flicker: {
			selector: '.flicker',
			animation: 'transform-slide',
			arrows: true,
			arrowsConstraint: false,
			autoFlick: true,
			autoFlickDelay: 10,
			dotAlignment: 'center',
			dots: true,
			position: 1,
		},
		form: {
			selector: '.form',
			colour: 'blue',
			label: 'normal',
			size: 'normal',
			style: 'line'
		},
		log: true,
		regexp: {
			colour: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
			date: /^[0-9]{4}-[0-9]{2}-[0-9]{2}/,
			email: /([\w\.\-]+)@([\w\.\-]+)\.(\w+)/i,
			password: /^(?=.*\d).{6,}/,
			selector: {
				attribute: /([a-z])+\[([a-z])+(=)+([a-z"=]+)\]/,
				tag: /^[a-zA-Z]+$/
			},
			time: /([01]\d|2[0-3]):([0-5]\d)/,
			url: /(https?:\/\/[^\s]+)/g
		},
		request: {
			async: true,
			data: false,
			dataForce: false,
			dataType: 'json',
			headers: false,
			onStart: false,
			onLoading: false,
			onSuccess: false,
			onError: false,
			onComplete: false,
			timeout: false,
			type: false,
			withCredentials: false
		},
		storage: {
			name: false,
			type: 'session'
		}
	}
	// Variables
	var rocketMonths = [{
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
	var rocketPrefix = {
		basic: 'rocket-',
		state: '_state-'
	};
	var rocketState = {
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

	// Arrays
	var array = {
		clean: function (thisArray) {
			// Catch
			if (!is.array(thisArray)) {
				return false;
			};
			// Continue
			return thisArray.filter(function (value) {
				return (value !== null);
			});
		},
		make: function (arValue, unique) {
			var returnArray = [];
			// Catch
			if (!arValue) {
				return returnArray;
			}
			// Continue
			var unique = helper.setDefault(unique, false);
			if (is.array(arValue) && arValue.length > 0) {
				returnArray = arValue;
			} else if (is.element(arValue)) {
				returnArray.push(arValue);
			} else if (is.string(arValue)) {
				returnArray = arValue.split(' ');
			} else if (is.object(arValue)) {
				// Try and catch HTMLCollection and NodeList
				arValue = Array.prototype.slice.call(arValue);
				if (is.array(arValue) && arValue.length > 0) {
					returnArray = arValue;
				}
			}

			return (unique) ? array.unique(returnArray) : returnArray;
		},
		unique: function (thisArray) {
			// Catch
			if (!is.array(thisArray)) {
				return false;
			};
			// Continue
			return thisArray.filter(function (value, index, self) {
				return self.indexOf(value) === index;
			});
		}
	}

	// Basic checks
	var exists = function (check) {
		return (typeof check === 'undefined' || check === null || check === false) ? false : true;
	};
	var has = {
		spaces: function (check) {
			return /\s/.test(check);
		},
		class: function (element, thisClass) {
			return (' ' + element.className + ' ').indexOf(' ' + thisClass + ' ') > -1;
		},
		extension: function (file, arAllowedTypes) {
			var allowedTypes = (is.array(arAllowedTypes)) ? arAllowedTypes : defaults.extensions.all;
			return (allowedTypes.indexOf(file.split('.').pop().toLowerCase()) > -1) ? true : false;
		}
	};
	var is = {
		array: function (check) {
			return (typeof check === 'object' && check instanceof Array) ? true : false;
		},
		boolean: function (check) {
			return (typeof check === 'boolean');
		},
		color: function (color) {
			return is.colour(color);
		},
		colour: function (colour) {
			return defaults.regexp.colour.test(colour);
		},
		date: function (date, regExp) {
			var regExp = (regExp instanceof RegExp) ? regExp : defaults.regexp.date;
			return regExp.test(date);
		},
		element: function (element) {
			return (element.nodeType && element.nodeType === 1) ? true : false;
		},
		email: function (email, regExp) {
			var regExp = (regExp instanceof RegExp) ? regExp : defaults.regexp.email;
			return regExp.test(email);
		},
		function: function (check) {
			return (typeof check === 'function');
		},
		image: function (file, arAllowedTypes) {
			var allowedTypes = (is.array(arAllowedTypes)) ? arAllowedTypes : defaults.extensions.images;
			return allowedTypes[file.split('.').pop().toLowerCase()];
		},
		integer: function (check) {
			return (is.number(check) && (parseFloat(check) === parseInt(check)));
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
		number: function (check) {
			return (typeof check === 'number');
		},
		object: function (check) {
			return (typeof check === 'object');
		},
		password: function (password, regExp) {
			var regExp = (regExp instanceof RegExp) ? regExp : defaults.regexp.password;
			return regExp.test(password);
		},
		string: function (str) {
			return (typeof str === 'string');
		},
		time: function (time, regExp) {
			var regExp = (regExp instanceof RegExp) ? regExp : defaults.regexp.time;
			return regExp.test(time);
		},
		touch: function () {
			return 'ontouchstart' in window || 'onmsgesturechange' in window;
		},
		url: function (url, regExp) {
			var regExp = (regExp instanceof RegExp) ? regExp : defaults.regexp.url;
			return regExp.test(url);
		}
	};

	// Classes
	var classMethods = {
		add: function (elements, classNames) {
			classMethods.executeClasses(elements, classNames, false);
		},
		clear: function (element) {
			if (exists(element)) {
				element.removeAttribute('class');
			}
		},
		executeAdd: function (element, classes) {
			element.className = element.className.split(' ').concat(classes).filter(function (val, i, ar) {
				return (ar.indexOf(val) === i) && (val !== '');
			}).toString().replace(/,/g, ' ');
		},
		executeClasses: function (elements, classesAdd, classesRemove) {
			// Catch
			if (!exists(elements)) {
				return false;
			}
			// Create elements array
			var arElements = [];
			if (is.element(elements)) {
				arElements.push(elements);
			} else if (is.array(elements)) {
				arElements = elements;
			}
			// Catch
			if (arElements.length < 1) {
				return false;
			}
			// Create classes array
			var arClassesAdd = array.make(classesAdd, true);
			var arClassesRemove = array.make(classesRemove, true);
			var actionAdd = (arClassesAdd.length > 0) ? true : false;
			var actionRemove = (arClassesRemove.length > 0) ? true : false;

			// Execute
			for (var i = 0, len = arElements.length; i < len; i++) {
				if (actionAdd) {
					classMethods.executeAdd(arElements[i], arClassesAdd)
				}
				if (actionRemove) {
					classMethods.executeRemove(arElements[i], arClassesRemove)
				}
			}
		},
		executeRemove: function (element, classes) {
			element.className = element.className.split(' ').filter(function (val) {
				return classes.indexOf(val) < 0;
			}).toString().replace(/,/g, ' ');
			if (element.className === '') {
				classMethods.clear(element);
			}
		},
		remove: function (elements, classNames) {
			classMethods.executeClasses(elements, false, classNames);
		},
		replace: function (elements, classesRemove, classesAdd) {
			classMethods.executeClasses(elements, classesAdd, classesRemove);
		},
		toggle: function (elements, className) {
			// Catch
			if (!exists(elements) || typeof className !== 'string' || has.spaces(className)) {
				return false;
			}
			// Create elements array
			var arElements = [];
			if (is.element(elements)) {
				arElements.push(elements);
			} else if (is.array(elements)) {
				arElements = elements;
			}
			// Catch
			if (arElements.length < 1) {
				return false;
			}
			// Execute
			for (var i = 0, len = elements.length; i < len; i++) {
				if (!has.class(elements[i], className)) {
					classMethods.executeAdd(elements[i], [className]);
				} else {
					classMethods.executeRemove(elements[i], [className]);
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
					return helper.parse.json(JSON.stringify(elm));
				}
				break;
			default:
				return false;
				break;
		}
	};

	// Dates
	var date = {
		basic: function (thisDate, withTime) {
			var thisDate = date.transform(thisDate);
			var withTime = (typeof withTime === 'boolean') ? withTime : false;
			var returnValue = '';

			if (!thisDate) {
				return false;
			}
			var day = date.day(thisDate.getDate());
			var month = date.month(thisDate.getMonth() + 1);
			var year = date.year(thisDate.getFullYear());

			returnValue += day + ' ' + month + ' ' + year;
			if (withTime) {
				returnValue += ', ' + time.basic(thisDate);
			}
			return returnValue;
		},
		crtDB: function (thisDate) {
			var thisDate = (thisDate) ? date.transform(thisDate) : new Date();
			if (!thisDate) {
				return false;
			}
			return thisDate.getFullYear() + '-' + ('0' + (thisDate.getMonth() + 1)).slice(-2) + '-' + ('0' + thisDate.getDate()).slice(-2);
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
					for (var i = 0, len = rocketMonths.length; i < len; i++) {
					   if (rocketMonths[i].number == thisMonth) {
							thisMonth = string.uppercase.first(rocketMonths[i].name);
							break;
						}
					}
					break;
				case 'number':
					thisMonth = parseInt(thisMonth);
					break;
				default:
					thisMonth = (thisMonth.length === 1) ? '0' + thisMonth : thisMonth;
					for (var i = 0, len = rocketMonths.length; i < len; i++) {
					   if (rocketMonths[i].number == thisMonth) {
							thisMonth = string.uppercase.first(rocketMonths[i].nameShort);
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
						for (var i2 = 0, len2 = rocketMonths.length; i2 < len2; i2++) {
							if (lowerDateSplit === rocketMonths[i2].name || lowerDateSplit === rocketMonths[i2].nameShort) {
								month = rocketMonths[i2].number;
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
	var log = function (text, error) {
		if (defaults.log) {
			var error = (typeof error === 'boolean') ? error : false;

			if (error) {
				throw new Error(text);
			} else {
				console.log(text);
			}
		}
	};

	// DOM
	var dom = {
		body: (typeof document !== 'undefined') ? document.getElementsByTagName('body')[0] : false,
		html: (typeof document !== 'undefined') ? document.getElementsByTagName('html')[0] : false,
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
				if (is.element(selElm)) {
					selElm.parentNode.removeChild(selElm);
				} else if (is.string(selElm)) {
					var elements = dom.select(selElm);
					for (var i = 0, len = elements.length; i < len; i++) {
						if (is.element(elements[i])) {
							elements[i].parentNode.removeChild(elements[i]);
						}
					}
				}
			}
		},
		select: function (selectors) {
			var returnElms = [];
			// Catch
			if (!exists(selectors)) {
				return returnElms;
			}
			// Continue
			var selectorSplit = selectors.split(',').map(string.trim).filter(function (selector) {
				return selector.length > 0;
			});
			if (selectorSplit.length > 0) {
				for (var i = 0, len = selectorSplit.length; i < len; i++) {
					// Select the elements
					switch (get.selector.type(selectorSplit[i])) {
						case 'gebi':
							returnElms = returnElms.concat(document.getElementById(selectorSplit[i].substring(1)));
							break;
						case 'gebtn':
							returnElms = returnElms.concat(Array.prototype.slice.call(document.getElementsByTagName(selectorSplit[i])));
							break;
						case 'qsa':
							returnElms = returnElms.concat(Array.prototype.slice.call(document.querySelectorAll(selectorSplit[i])));
							break;
					}
				}
			}
			// Return
			return array.clean(array.unique(returnElms));
		},
		title: (typeof document !== 'undefined') ? document.getElementsByTagName('title')[0] : false,
		wallpaper: function (selector) {
			var elements = dom.select(selector);
			for (var i = 0, len = elements.length; i < len; i++) {
				var thisWallpaper = elements[i].getAttribute('data-wallpaper');
				if (thisWallpaper !== null) {
					elements[i].style.backgroundImage = 'url("' + thisWallpaper + '")';
				}
			}
		},
		webplateScript: (typeof document !== 'undefined') ? document.getElementById('webplate') : false
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
		selector: {
			type: function (selector) {
				var selectType = false;
				if (selector.indexOf('.') > -1 || has.spaces(selector) || defaults.regexp.selector.attribute.test(selector)) {
					selectType = 'qsa';
				} else if (selector.indexOf('#') > -1) {
					selectType = 'gebi';
				} else if (defaults.regexp.selector.tag.test(selector)) {
					selectType = 'gebtn';
				}
				return selectType;
			}
		}
	};

	// Helpers
	var helper = {
		parse: {
			json: function (json) {
				if (is.json(json)) {
					return JSON.parse(json);
				}
				return json;
			}
		},
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
			var elements = dom.select(selector);
			for (var i = 0, len = elements.length; i < len; i++) {
			   elements[i].disabled = true;
			}
		},
		enable: function (selector) {
			var elements = dom.select(selector);
			for (var i = 0, len = elements.length; i < len; i++) {
			   elements[i].disabled = false;
			}
		}
	};

	// Overlay
	var overlay = {
		add: function () {
			var rocketOverlay = document.createElement('div');
			id.add(rocketOverlay, rocketPrefix.basic + 'overlay');
			if (!exists(document.getElementById(rocketPrefix.basic + 'overlay'))) {
				dom.body.appendChild(rocketOverlay);
			}
		},
		hide: function () {
			classMethods.remove(dom.html, 'rocket-overlay-reveal');
		},
		show: function () {
			setTimeout(function () {
				classMethods.add(dom.html, 'rocket-overlay-reveal');
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
	var request = {
		run: function (uOptions) {
			if (!exists(uOptions) || !exists(uOptions.url)) {
				return false;
			}
			var options = {
				url: uOptions.url,
				async: (typeof uOptions.async === 'string') ? uOptions.async : defaults.request.async,
				data: (exists(uOptions.data)) ? uOptions.data : defaults.request.data,
				dataForce: (typeof uOptions.dataForce === 'string') ? uOptions.dataForce : defaults.request.dataForce,
				dataType: (exists(uOptions.dataType)) ? uOptions.dataType : defaults.request.dataType,
				headers: (typeof uOptions.headers === 'object') ? uOptions.headers : defaults.request.headers,
				onStart: (typeof uOptions.onStart === 'function') ? uOptions.onStart : defaults.request.onStart,
				onLoading: (typeof uOptions.onLoading === 'function') ? uOptions.onLoading : defaults.request.onLoading,
				onSuccess: (typeof uOptions.onSuccess === 'function') ? uOptions.onSuccess : defaults.request.onSuccess,
				onError: (typeof uOptions.onError === 'function') ? uOptions.onError : defaults.request.onError,
				onComplete: (typeof uOptions.onComplete === 'function') ? uOptions.onComplete : defaults.request.onComplete,
				timeout: (typeof uOptions.timeout === 'number') ? time.seconds(uOptions.timeout) : defaults.request.timeout,
				type: (exists(uOptions.type)) ? string.uppercase.all(uOptions.type) : defaults.request.type,
				withCredentials: (typeof uOptions.withCredentials === 'boolean') ? uOptions.withCredentials : defaults.request.withCredentials
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
						if (options.onComplete) {
							options.onComplete(this);
						}
						if (this.status >= 200 && this.status < 300) {
							if (options.onSuccess) {
								options.onSuccess(helper.parse.json(this.responseText), this.status, xhr.getAllResponseHeaders());
							}
						} else {
							if (options.onError) {
								options.onError(helper.parse.json(this.responseText), this.status, xhr.getAllResponseHeaders());
							}
						}
						break;
				}
			};

			// Make the request
			if (options.data && options.dataForce !== 'body' && (options.type === 'GET' || options.dataForce === 'queryString')) {
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
			if (options.data && options.dataForce !== 'queryString' && (options.type === 'POST' || options.dataForce === 'body')) {
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
		},
		runDelete: function (uOptions) {
			uOptions.type = 'DELETE';
			this.run(uOptions);
		},
		runGet: function (uOptions) {
			uOptions.type = 'GET';
			this.run(uOptions);
		},
		runPost: function (uOptions) {
			uOptions.type = 'POST';
			this.run(uOptions);
		},
		runPut: function (uOptions) {
			uOptions.type = 'PUT';
			this.run(uOptions);
		}
	};

	// State
	var state = {
		add: function (element, state) {
			if (!exists(element)) {
				return false;
			}
			var newRocketStates = rocketState.list.slice().map(function (newState) {
				return rocketPrefix.state + newState;
			});
			var stateClass = newrocketStates.splice(newrocketStates.indexOf(rocketPrefix.state + state), 1);
			classMethods.replace(element, newRocketStates, stateClass);
		},
		clear: function (element) {
			if (!exists(element)) {
				return false;
			}
			var newRocketStates = rocketState.list.slice().map(function (newState) {
				return rocketPrefix.state + newState;
			});
			classMethods.remove(element, newRocketStates);
		},
		toggle: function (element, state, clear) {
			if (!exists(element)) {
				return false;
			}
			if (rocketState.list.indexOf(state) > -1) {
				var altState = rocketState.alts[state] || false;
				var clear = (typeof clear === 'boolean') ? clear : false;
				var stateClass = rocketPrefix.state + state;
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
		add: function (name, value) {
			if (!exists(name) || !exists(value)) {
				return false;
			}
			var store = storage.getStorageEngine();

			store[name] = value;
			switch (defaults.storage.type) {
				case 'local':
					localStorage.setItem(defaults.storage.name, JSON.stringify(store));
					break;

				case 'session':
					sessionStorage.setItem(defaults.storage.name, JSON.stringify(store));
					break;
			}
		},
		clear: function () {
			if (defaults.storage.name !== false) {
				localStorage.removeItem(defaults.storage.name);
				sessionStorage.removeItem(defaults.storage.name);
			}
		},
		get: function (key) {
			if (!exists(key)) {
				return false;
			}
			var store = storage.getStorageEngine();
			// Catch
			if (!exists(store[key])) {
				return false;
			}
			// Continue
			return store[key];
		},
		getStorageEngine: function () {
			// Catch
			if (!defaults.storage.name) {
				log('ROCKET: You have not set the storage name. Provide a name for [Rocket].defaults.storage.name.', true);
				return false;
			}
			// Continue
			var store;
			switch (defaults.storage.type) {
				case 'local':
					store = localStorage.getItem(defaults.storage.name);
					break;

				case 'session':
					store = sessionStorage.getItem(defaults.storage.name);
					break;
			}
			// Return
			if (store) {
				return helper.parse.json(store);
			}
			return {};
		},
		remove: function (key) {
			if (!exists(key)) {
				return false;
			}
			var store = storage.getStorageEngine();
			// Catch
			if (!exists(store[key])) {
				return false;
			}
			// Continue
			delete store[key];
			switch (defaults.storage.type) {
				case 'local':
					localStorage.setItem(defaults.storage.name, JSON.stringify(store));
					break;

				case 'session':
					sessionStorage.setItem(defaults.storage.name, JSON.stringify(store));
					break;
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
		trim: function (string) {
			return string.replace(/^ /, '').replace(/ +$/, '');
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
		basic: function (thisTime) {
			var thisTime = date.transform(thisTime);
			var hours = time.leadingZero(thisTime.getHours());
			var minutes = time.leadingZero(thisTime.getMinutes());
			return hours + ':' + minutes;
		},
		exact: function (thisTime) {
			var thisTime = date.transform(thisTime);
			var hours =  time.leadingZero(thisTime.getHours());
			var minutes =  time.leadingZero(thisTime.getMinutes());
			var seconds =  time.leadingZero(thisTime.getSeconds());
			var milliseconds =  time.leadingZero(thisTime.getMilliseconds());

			return hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
		},
		full: function (thisTime) {
			var thisTime = date.transform(thisTime);
			var hours = time.leadingZero(thisTime.getHours());
			var minutes = time.leadingZero(thisTime.getMinutes());
			var seconds = time.leadingZero(thisTime.getSeconds());

			return hours + ':' + minutes + ':' + seconds;
		},
		hours: function (hours) {
			return hours * 60 * 60 * 1000;
		},
		leadingZero: function (int) {
			return ((int < 10) ? '0' : '') + int;
		},
		minutes: function (minutes) {
			return minutes * 60 * 1000;
		},
		seconds: function (seconds) {
			return seconds * 1000;
		}
	};

	// URL
	var url = {
		all: function () {
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

			return {
				base: baseUrl,
				current: currentUrl,
				full: fullUrl,
				hash: hash,
				host: host,
				pathname: pathname,
				protocol: protocol,
				segments: segments
			};
		},
		base: function () {
			return url.all().base;
		},
		current: function () {
			return url.all().current;
		},
		full: function () {
			return url.all().full;
		},
		hash: function () {
			return url.all().hash;
		},
		host: function () {
			return url.all().host;
		},
		pathname: function () {
			return url.all().pathname;
		},
		protocol: function () {
			return url.all().protocol;
		},
		segments: function () {
			return url.all().segments;
		}
	};

	// Return
	return  {
		defaults: defaults,
		array: array,
		exists: exists,
		has: has,
		is: is,
		class: {
			add: classMethods.add,
			clear: classMethods.clear,
			remove: classMethods.remove,
			replace: classMethods.replace,
			toggle: classMethods.toggle
		},
		clone: clone,
		date: date,
		dom: dom,
		event: eventMethods,
		log: log,
		get: get,
		helper: helper,
		id: id,
		input: input,
		state: state,
		request: {
			run: request.run,
			delete: request.runDelete,
			get: request.runGet,
			post: request.runPost,
			put: request.runPut
		},
		storage: {
			add: storage.add,
			clear: storage.clear,
			get: storage.get,
			remove: storage.remove
		},
		string: string,
		random: random,
		time: time,
		url: url,
		overlay: overlay
	};
});

// Export module
module.exports = new RocketTools;
