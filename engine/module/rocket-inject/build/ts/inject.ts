// Create or extend Rocket
var Rocket = (typeof Rocket === 'object') ? Rocket : {};
if (!Rocket.defaults) {
   Rocket.defaults = {};
}
Rocket.defaults.inject = {
   errors: true
};

// Interface
interface component {
   component:string;
   data:any;
   onDone:any;
   overwrite:boolean;
   to:string;
}
interface componentBind {
   component:string;
   data:any;
   to:string;
   onDone:any;
   overwrite:boolean;
}
interface componentNew {
   className: string|boolean;
   id: string|boolean;
   html: any;
   name: string;
   onDone: any;
   overwrite: boolean;
}

// Rocket component
module RocketInjectComponent {
   // Variables
   let components:any = {};

   // Functions
   /*
   All methods pertaining to the components themselves exist here.
   This object acts as the methods namespace.
   */
   const componentMethods = {
      bind: function (obj:componentBind) {
         // Catch
         if (!validate.bind(obj)) {
            return false;
         };
         // Continue
         const listBindTo:any = (typeof obj.to === 'string') ? document.querySelectorAll(obj.to) : document.getElementById('#' + obj.component);
         // Catch
         if (typeof listBindTo === 'undefined') {
            return false;
         }
         // Continue
         let html = '';
         if (typeof obj.data === 'object') {
            html = Mustache.render(components[obj.component].html, obj.data);
         }
         for (let bindTo of listBindTo) {
            // Overwrite or append
            if (obj.overwrite === true) {
               bindTo.innerHTML = html;
            } else {
               bindTo.insertAdjacentHTML('beforeend', html);
            }
            bindTo.setAttribute('data-inject', 'true');
            // Set an id on the container (bindTo element)
            if (typeof components[obj.component].id === 'string') {
               bindTo.id = components[obj.component].id;
            }
            // Set a class on the container (bindTo element)
            if (typeof components[obj.component].className === 'string') {
               let listClassNames = bindTo.className.split(' ');
               listClassNames.push(components[obj.component].className);
               listClassNames = listClassNames.filter(function (value, index, self) {
                  return self.indexOf(value) === index;
               });
               bindTo.className = listClassNames.join(' ');
            }
            // Component onDone function
            if (typeof components[obj.component].onDone === 'function') {
               components[obj.component].onDone(bindTo);
            }
            // Binding onDone function
            if (typeof obj.onDone === 'function') {
               obj.onDone(bindTo);
            }
         }
      },
      generate: function (obj:component) {
         // Catch
         if (!validate.generate(obj)) {
            return false;
         }
         // Continue
			let html = '';
         if (typeof obj.data === 'object') {
            html = Mustache.render(components[obj.component].html, obj.data);
         }
         return html;
      },
      register: function (obj:componentNew) {
         // Catch
         if (!validate.register(obj)) {
            if (Rocket.defaults.errors) {
               throw new Error('Injectplate: Please provide a valid component name.');
            }
            return false;
         }
         // Continue
         components[obj.name] = {
            className: (typeof obj.className === 'string') ? obj.className : false,
            id: (typeof obj.id === 'string') ? obj.id : false,
            html: flattenHTML(obj.html, obj.name),
            onDone: (typeof obj.onDone === 'function') ? obj.onDone : false,
            overwrite: (typeof obj.overwrite === 'boolean') ? obj.overwrite : false
         };
      }
   };
   /*
   Validation methods are used to check all incoming data.
   */
   const validate = {
      bind: function (obj:componentBind) {
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
      generate: function (obj:component) {
         if (typeof obj !== 'object') {
            return false;
         }
         else if (typeof obj.component === 'undefined') {
            return false;
         }
         return true;
      },
      register: function (obj:componentNew) {
         if (typeof obj !== 'object') {
            return false;
         }
         else if (typeof obj.name === 'undefined') {
            return false;
         }
         return true;
      }
   };
   /*
   All templates are flattened for convenience and to make sure there are no
   unnecessary spaces.
   */
   function flattenHTML (html:any, name:string) {
      let htmlFlat = '';
      switch (typeof html) {
         case 'object':
            for (let htmlItem of html) {
               htmlFlat += htmlItem;
            }
            return htmlFlat;
         case 'string':
            for (let htmlItem of html.split(/(?:\r\n|\n|\r)/)) {
               htmlFlat += htmlItem.trim();
            }
            return htmlFlat;
      }
      // Type check was unsuccessful
      if (Rocket.defaults.errors) {
         throw new Error('Injectplate: The HTML provided to create the component "' + name + '" is not valid.');
      }
   }

   // Exports
   export const bind = componentMethods.bind;
   export const component = componentMethods.register;
   export const flatten = flattenHTML;
   export const generate = componentMethods.generate;
   export const list = components;
}

// Bind to Rocket object
Rocket.inject = RocketInjectComponent;
