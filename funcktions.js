
class Funktions {
	constructor() {

	}
	addCss = (css = false) => {
		if (typeof css === 'string') {
			let style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = css;
			document.getElementsByTagName('head')[0].appendChild(style);
		}
	}

	// adds a script tag with given source
	// source = source of the script
	addScript = (source = false) => {
		let script = document.createElement('script');
		script.src = source;
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	// adds a script tag with given source and callback
	// source = source of the script
	// callback = function called after script source is loaded
	addScriptCB = (source = false, callback = false) => {
		let script = document.createElement('script');
		script.src = source;
		script.onreadystatechange = callback;
		script.onload = callback;
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	// creates a custom element
	// name = name of the element
	// css = css code of the element
	// template = html template of the element
	// props = attributes of the element
	addElement = (name = false, css = false, template = false, props = false) => {
		let element = document.createElement('template');
		element.innerHTML = '<style>' + css + '</style>' + template;

		let elementClass = class extends HTMLElement {
			constructor() {
				super();
				let shadowRoot = this.attachShadow({ mode: 'open' });
				shadowRoot.appendChild(element.content.cloneNode(true));
			}
		}
		if (props != false) {
			Object.keys(props).forEach(key => {
				Object.defineProperty(elementClass.prototype, key, {
					value: props[key],
					writable: true
				});
			});
		}

		customElements.define(name, elementClass);
	}

	// serializes a form into an object
	// form = form element to be serialized
	serializeForm = (form = false) => {
		let obj = {};

		if (form == false) {
			return obj;
		}

		let elements = form.querySelectorAll('input, select, textarea');

		for (let i = 0; i < elements.length; i++) {
			let element = elements[i];
			let name = element.name;
			let value = element.value;

			if (name) {
				obj[name] = value;
			}
		}

		return obj;
	}

	// deserializes an object into a form
	// form = form element to be deserialized
	// data = object to deserialize
	deserializeForm = (form = false, data = false) => {
		if (form == false || data == false) {
			return;
		}

		let elements = form.querySelectorAll('input, select, textarea');

		for (let i = 0; i < elements.length; i++) {
			let element = elements[i];
			let name = element.name;
			let value = data[name];

			if (name) {
				element.value = value;
			}
		}
	}

	// creates a template element and returns
	// html = html code of the template
	createTemplate = (html = false) => {
		let template = document.createElement('template');
		template.innerHTML = html;
		return template;
	}

	// creates a template element, adds it to a parent and returns
	// parent = parent element
	// html = html code of the template
	createTemplateAdd = (parent = false, html = false) => {
		let template = document.createElement('template');
		template.innerHTML = html;

		if (parent != false) {
			parent.appendChild(template);
		}

		return template;
	}

	// adds a template element to a parent
	// parent = parent element
	// template = template element
	addTemplate = (parent = false, template = false) => {
		if (parent != false && template != false) {
			parent.appendChild(template);
		}
	}

	// adds a template element to a parent, after another element
	// parent = parent element
	// template = template element
	// after = element to insert the template after
	addTemplateAfter = (parent = false, template = false, after = false) => {
		if (parent != false && template != false && after != false) {
			parent.insertBefore(template, after.nextSibling);
		}
	}

	// adds a template element to a parent, before another element
	// parent = parent element
	// template = template element
	// before = element to insert the template before
	addTemplateBefore = (parent = false, template = false, before = false) => {
		if (parent != false && template != false && before != false) {
			parent.insertBefore(template, before);
		}
	}

	// removes a template element from a parent
	// parent = parent element
	// template = template element
	removeTemplate = (parent = false, template = false) => {
		if (parent != false && template != false) {
			parent.removeChild(template);
		}
	}

	// creates a template element, adds it to a parent, returns and removes
	// parent = parent element
	// html = html code of the template
	createTemplateAddRemove = (parent = false, html = false) => {
		let template = document.createElement('template');
		template.innerHTML = html;

		if (parent != false) {
			parent.appendChild(template);
		}

		let templateClone = template.content.cloneNode(true);

		if (parent != false) {
			parent.removeChild(template);
		}

		return templateClone;
	}

	// returns the width of the window
	getWindowWidth = () => {
		return window.innerWidth;
	}

	// returns the height of the window
	getWindowHeight = () => {
		return window.innerHeight;
	}

	// returns the width of the document
	getDocumentWidth = () => {
		let width = Math.max(
			document.body.scrollWidth, document.documentElement.scrollWidth,
			document.body.offsetWidth, document.documentElement.offsetWidth,
			document.body.clientWidth, document.documentElement.clientWidth
		);
		return width;
	}

	// returns the height of the document
	getDocumentHeight = () => {
		let height = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		);
		return height;
	}

	// returns a random number between two numbers
	// min = minimum number
	// max = maximum number
	getRandomNum = (min = 0, max = 10) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	// returns a random color
	// format = format of the color (hex, rgb, hsl)
	getRandomColor = (format = 'hex') => {
		let r = this.getRandomNum(0, 255);
		let g = this.getRandomNum(0, 255);
		let b = this.getRandomNum(0, 255);

		if (format == 'hex') {
			return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
		}
		else if (format == 'rgb') {
			return 'rgb(' + r + ', ' + g + ', ' + b + ')';
		}
		else if (format == 'hsl') {
			let h = this.getRandomNum(0, 360);
			let s = this.getRandomNum(0, 100);
			let l = this.getRandomNum(0, 100);
			return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
		}
	}

	// returns a random string
	// length = length of the string
	// charset = characters to use (default = alphanumeric)
	getRandomString = (length = 10, charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') => {
		let str = '';

		for (let i = 0; i < length; i++) {
			let index = Math.floor(Math.random() * charset.length);
			str += charset.charAt(index);
		}

		return str;
	}

	// adds an event listener
	// element = element to add the event to
	// event = event to add
	// callback = function called on event
	addEvent = (element = false, event = false, callback = false) => {
		if (element == false || event == false || callback == false) {
			return;
		}

		element.addEventListener(event, callback);
	}

	// removes an event listener
	// element = element to remove the event from
	// event = event to remove
	// callback = function to remove
	removeEvent = (element = false, event = false, callback = false) => {
		if (element == false || event == false || callback == false) {
			return;
		}

		element.removeEventListener(event, callback);
	}

	// returns the x position of a mouse event
	// event = mouse event
	getEventX = (event = false) => {
		if (event == false) {
			return 0;
		}

		if (event.clientX) {
			return event.clientX;
		}
		else if (event.touches) {
			return event.touches[0].clientX;
		}

		return 0;
	}
}
const Funk = new Funktions();
