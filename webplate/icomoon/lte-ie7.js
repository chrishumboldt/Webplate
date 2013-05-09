/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-angle-up' : '&#xf106;',
			'icon-angle-down' : '&#xf107;',
			'icon-arrow-up' : '&#xe011;',
			'icon-arrow-down' : '&#xe012;',
			'icon-arrow-left' : '&#xe013;',
			'icon-arrow-up-2' : '&#xe014;',
			'icon-arrow-down-2' : '&#xe015;',
			'icon-arrow-left-2' : '&#xe016;',
			'icon-arrow-right' : '&#xe017;',
			'icon-comment' : '&#xf075;',
			'icon-map-pin-fill' : '&#xe023;',
			'icon-location' : '&#xe024;',
			'icon-compass' : '&#xe025;',
			'icon-camera' : '&#xe028;',
			'icon-users' : '&#xe035;',
			'icon-reorder' : '&#xf0c9;',
			'icon-angle-left' : '&#xf104;',
			'icon-angle-right' : '&#xf105;',
			'icon-heart' : '&#xe000;',
			'icon-checkmark' : '&#xe001;',
			'icon-food' : '&#xf0f5;',
			'icon-ok' : '&#xf00c;',
			'icon-gift' : '&#xe002;',
			'icon-male' : '&#xe003;',
			'icon-female' : '&#xe004;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};