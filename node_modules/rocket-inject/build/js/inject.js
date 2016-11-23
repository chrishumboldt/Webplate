var Rocket = (typeof Rocket === 'object') ? Rocket : {};
if (!Rocket.defaults) {
    Rocket.defaults = {};
}
Rocket.defaults.inject = {
    errors: true
};
var RocketInjectComponent;
(function (RocketInjectComponent) {
    var components = {};
    var componentMethods = {
        bind: function (obj) {
            if (!validate.bind(obj)) {
                return false;
            }
            ;
            var listBindTo = (typeof obj.to === 'string') ? document.querySelectorAll(obj.to) : document.getElementById('#' + obj.component);
            if (typeof listBindTo === 'undefined') {
                return false;
            }
            var html = '';
            if (typeof obj.data === 'object') {
                html = Mustache.render(components[obj.component].html, obj.data);
            }
            for (var _i = 0, listBindTo_1 = listBindTo; _i < listBindTo_1.length; _i++) {
                var bindTo = listBindTo_1[_i];
                if (obj.overwrite === true) {
                    bindTo.innerHTML = html;
                }
                else {
                    bindTo.insertAdjacentHTML('beforeend', html);
                }
                bindTo.setAttribute('data-inject', 'true');
                if (typeof components[obj.component].id === 'string') {
                    bindTo.id = components[obj.component].id;
                }
                if (typeof components[obj.component].className === 'string') {
                    var listClassNames = bindTo.className.split(' ');
                    listClassNames.push(components[obj.component].className);
                    listClassNames = listClassNames.filter(function (value, index, self) {
                        return self.indexOf(value) === index;
                    });
                    bindTo.className = listClassNames.join(' ');
                }
                if (typeof components[obj.component].onDone === 'function') {
                    components[obj.component].onDone(bindTo);
                }
                if (typeof obj.onDone === 'function') {
                    obj.onDone(bindTo);
                }
            }
        },
        generate: function (obj) {
            if (!validate.generate(obj)) {
                return false;
            }
            var html = '';
            if (typeof obj.data === 'object') {
                html = Mustache.render(components[obj.component].html, obj.data);
            }
            return html;
        },
        register: function (obj) {
            if (!validate.register(obj)) {
                if (Rocket.defaults.errors) {
                    throw new Error('Injectplate: Please provide a valid component name.');
                }
                return false;
            }
            components[obj.name] = {
                className: (typeof obj.className === 'string') ? obj.className : false,
                id: (typeof obj.id === 'string') ? obj.id : false,
                html: flattenHTML(obj.html, obj.name),
                onDone: (typeof obj.onDone === 'function') ? obj.onDone : false,
                overwrite: (typeof obj.overwrite === 'boolean') ? obj.overwrite : false
            };
        }
    };
    var validate = {
        bind: function (obj) {
            if (typeof obj !== 'object') {
                return false;
            }
            else if (typeof obj.component !== 'string') {
                return false;
            }
            else if (typeof components[obj.component] !== 'object') {
                return false;
            }
            return true;
        },
        generate: function (obj) {
            if (typeof obj !== 'object') {
                return false;
            }
            else if (typeof obj.component === 'undefined') {
                return false;
            }
            return true;
        },
        register: function (obj) {
            if (typeof obj !== 'object') {
                return false;
            }
            else if (typeof obj.name === 'undefined') {
                return false;
            }
            return true;
        }
    };
    function flattenHTML(html, name) {
        var htmlFlat = '';
        switch (typeof html) {
            case 'object':
                for (var _i = 0, html_1 = html; _i < html_1.length; _i++) {
                    var htmlItem = html_1[_i];
                    htmlFlat += htmlItem;
                }
                return htmlFlat;
            case 'string':
                for (var _a = 0, _b = html.split(/(?:\r\n|\n|\r)/); _a < _b.length; _a++) {
                    var htmlItem = _b[_a];
                    htmlFlat += htmlItem.trim();
                }
                return htmlFlat;
        }
        if (Rocket.defaults.errors) {
            throw new Error('Injectplate: The HTML provided to create the component "' + name + '" is not valid.');
        }
    }
    RocketInjectComponent.bind = componentMethods.bind;
    RocketInjectComponent.component = componentMethods.register;
    RocketInjectComponent.flatten = flattenHTML;
    RocketInjectComponent.generate = componentMethods.generate;
    RocketInjectComponent.list = components;
})(RocketInjectComponent || (RocketInjectComponent = {}));
Rocket.inject = RocketInjectComponent;
