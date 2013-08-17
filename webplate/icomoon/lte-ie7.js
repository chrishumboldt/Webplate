/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-heart' : '&#xe000;',
			'icon-camera' : '&#xe001;',
			'icon-map-pin-fill' : '&#xe002;',
			'icon-ok' : '&#xf00c;',
			'icon-food' : '&#xf0f5;',
			'icon-gift' : '&#xe003;',
			'icon-male' : '&#xe004;',
			'icon-female' : '&#xe005;',
			'icon-checkmark' : '&#xe006;',
			'icon-cross' : '&#xe007;',
			'icon-question-sign' : '&#xf059;',
			'icon-stack' : '&#xe008;',
			'icon-layout' : '&#xe009;',
			'icon-frame' : '&#xe00a;',
			'icon-code' : '&#xe00b;',
			'icon-list' : '&#xe00c;',
			'icon-reorder' : '&#xf0c9;',
			'icon-angle-left' : '&#xf104;',
			'icon-angle-right' : '&#xf105;',
			'icon-angle-up' : '&#xf106;',
			'icon-angle-down' : '&#xf107;',
			'icon-database' : '&#xe00d;',
			'icon-text' : '&#xe00e;',
			'icon-arrow-left' : '&#xe00f;',
			'icon-arrow-right' : '&#xe010;',
			'icon-arrow-down' : '&#xe011;',
			'icon-arrow-up' : '&#xe012;',
			'icon-download' : '&#xf01a;',
			'icon-twitter' : '&#xe013;',
			'icon-facebook' : '&#xe014;',
			'icon-googleplus' : '&#xe015;',
			'icon-linkedin' : '&#xe016;',
			'icon-flickr' : '&#xe017;',
			'icon-vimeo' : '&#xe018;',
			'icon-pinterest' : '&#xe019;',
			'icon-github' : '&#xe01a;',
			'icon-skype' : '&#xe01b;',
			'icon-plus' : '&#xe01c;',
			'icon-IcoMoon' : '&#xe01d;'
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