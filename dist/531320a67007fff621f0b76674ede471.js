// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({25:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function noop() {}

function assign(target) {
	var k,
	    source,
	    i = 1,
	    len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) target[k] = source[k];
	}

	return target;
}

function appendNode(node, target) {
	target.appendChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function detachBetween(before, after) {
	while (before.nextSibling && before.nextSibling !== after) {
		before.parentNode.removeChild(before.nextSibling);
	}
}

function detachBefore(after) {
	while (after.previousSibling) {
		after.parentNode.removeChild(after.previousSibling);
	}
}

function detachAfter(before) {
	while (before.nextSibling) {
		before.parentNode.removeChild(before.nextSibling);
	}
}

function reinsertBetween(before, after, target) {
	while (before.nextSibling && before.nextSibling !== after) {
		target.appendChild(before.parentNode.removeChild(before.nextSibling));
	}
}

function reinsertChildren(parent, target) {
	while (parent.firstChild) target.appendChild(parent.firstChild);
}

function reinsertAfter(before, target) {
	while (before.nextSibling) target.appendChild(before.nextSibling);
}

function reinsertBefore(after, target) {
	var parent = after.parentNode;
	while (parent.firstChild !== after) target.appendChild(parent.firstChild);
}

function destroyEach(iterations) {
	for (var i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d();
	}
}

function createFragment() {
	return document.createDocumentFragment();
}

function createElement(name) {
	return document.createElement(name);
}

function createSvgElement(name) {
	return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function createText(data) {
	return document.createTextNode(data);
}

function createComment() {
	return document.createComment('');
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function setXlinkAttribute(node, attribute, value) {
	node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}

function getBindingGroupValue(group) {
	var value = [];
	for (var i = 0; i < group.length; i += 1) {
		if (group[i].checked) value.push(group[i].__value);
	}
	return value;
}

function toNumber(value) {
	return value === '' ? undefined : +value;
}

function timeRangesToArray(ranges) {
	var array = [];
	for (var i = 0; i < ranges.length; i += 1) {
		array.push({ start: ranges.start(i), end: ranges.end(i) });
	}
	return array;
}

function children(element) {
	return Array.from(element.childNodes);
}

function claimElement(nodes, name, attributes, svg) {
	for (var i = 0; i < nodes.length; i += 1) {
		var node = nodes[i];
		if (node.nodeName === name) {
			for (var j = 0; j < node.attributes.length; j += 1) {
				var attribute = node.attributes[j];
				if (!attributes[attribute.name]) node.removeAttribute(attribute.name);
			}
			return nodes.splice(i, 1)[0]; // TODO strip unwanted attributes
		}
	}

	return svg ? createSvgElement(name) : createElement(name);
}

function claimText(nodes, data) {
	for (var i = 0; i < nodes.length; i += 1) {
		var node = nodes[i];
		if (node.nodeType === 3) {
			node.data = data;
			return nodes.splice(i, 1)[0];
		}
	}

	return createText(data);
}

function setInputType(input, type) {
	try {
		input.type = type;
	} catch (e) {}
}

function setStyle(node, key, value) {
	node.style.setProperty(key, value);
}

function selectOption(select, value) {
	for (var i = 0; i < select.options.length; i += 1) {
		var option = select.options[i];

		if (option.__value === value) {
			option.selected = true;
			return;
		}
	}
}

function selectOptions(select, value) {
	for (var i = 0; i < select.options.length; i += 1) {
		var option = select.options[i];
		option.selected = ~value.indexOf(option.__value);
	}
}

function selectValue(select) {
	var selectedOption = select.querySelector(':checked') || select.options[0];
	return selectedOption && selectedOption.__value;
}

function selectMultipleValue(select) {
	return [].map.call(select.querySelectorAll(':checked'), function (option) {
		return option.__value;
	});
}

function linear(t) {
	return t;
}

function generateRule(a, b, delta, duration, ease, fn) {
	var keyframes = '{\n';

	for (var p = 0; p <= 1; p += 16.666 / duration) {
		var t = a + delta * ease(p);
		keyframes += p * 100 + '%{' + fn(t) + '}\n';
	}

	return keyframes + '100% {' + fn(b) + '}\n}';
}

// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
	var hash = 5381;
	var i = str.length;

	while (i--) hash = (hash << 5) - hash ^ str.charCodeAt(i);
	return hash >>> 0;
}

function wrapTransition(component, node, fn, params, intro, outgroup) {
	var obj = fn(node, params);
	var duration = obj.duration || 300;
	var ease = obj.easing || linear;
	var cssText;

	// TODO share <style> tag between all transitions?
	if (obj.css && !transitionManager.stylesheet) {
		var style = createElement('style');
		document.head.appendChild(style);
		transitionManager.stylesheet = style.sheet;
	}

	if (intro) {
		if (obj.css && obj.delay) {
			cssText = node.style.cssText;
			node.style.cssText += obj.css(0);
		}

		if (obj.tick) obj.tick(0);
	}

	return {
		t: intro ? 0 : 1,
		running: false,
		program: null,
		pending: null,
		run: function (intro, callback) {
			var program = {
				start: window.performance.now() + (obj.delay || 0),
				intro: intro,
				callback: callback
			};

			if (obj.delay) {
				this.pending = program;
			} else {
				this.start(program);
			}

			if (!this.running) {
				this.running = true;
				transitionManager.add(this);
			}
		},
		start: function (program) {
			component.fire(program.intro ? 'intro.start' : 'outro.start', { node: node });

			program.a = this.t;
			program.b = program.intro ? 1 : 0;
			program.delta = program.b - program.a;
			program.duration = duration * Math.abs(program.b - program.a);
			program.end = program.start + program.duration;

			if (obj.css) {
				if (obj.delay) node.style.cssText = cssText;

				program.rule = generateRule(program.a, program.b, program.delta, program.duration, ease, obj.css);

				transitionManager.addRule(program.rule, program.name = '__svelte_' + hash(program.rule));

				node.style.animation = (node.style.animation || '').split(', ').filter(function (anim) {
					// when introing, discard old animations if there are any
					return anim && (program.delta < 0 || !/__svelte/.test(anim));
				}).concat(program.name + ' ' + duration + 'ms linear 1 forwards').join(', ');
			}

			this.program = program;
			this.pending = null;
		},
		update: function (now) {
			var program = this.program;
			if (!program) return;

			var p = now - program.start;
			this.t = program.a + program.delta * ease(p / program.duration);
			if (obj.tick) obj.tick(this.t);
		},
		done: function () {
			var program = this.program;
			this.t = program.b;
			if (obj.tick) obj.tick(this.t);
			if (obj.css) transitionManager.deleteRule(node, program.name);
			program.callback();
			program = null;
			this.running = !!this.pending;
		},
		abort: function () {
			if (obj.tick) obj.tick(1);
			if (obj.css) transitionManager.deleteRule(node, this.program.name);
			this.program = this.pending = null;
			this.running = false;
		}
	};
}

var transitionManager = {
	running: false,
	transitions: [],
	bound: null,
	stylesheet: null,
	activeRules: {},

	add: function (transition) {
		this.transitions.push(transition);

		if (!this.running) {
			this.running = true;
			requestAnimationFrame(this.bound || (this.bound = this.next.bind(this)));
		}
	},

	addRule: function (rule, name) {
		if (!this.activeRules[name]) {
			this.activeRules[name] = true;
			this.stylesheet.insertRule('@keyframes ' + name + ' ' + rule, this.stylesheet.cssRules.length);
		}
	},

	next: function () {
		this.running = false;

		var now = window.performance.now();
		var i = this.transitions.length;

		while (i--) {
			var transition = this.transitions[i];

			if (transition.program && now >= transition.program.end) {
				transition.done();
			}

			if (transition.pending && now >= transition.pending.start) {
				transition.start(transition.pending);
			}

			if (transition.running) {
				transition.update(now);
				this.running = true;
			} else if (!transition.pending) {
				this.transitions.splice(i, 1);
			}
		}

		if (this.running) {
			requestAnimationFrame(this.bound);
		} else if (this.stylesheet) {
			var i = this.stylesheet.cssRules.length;
			while (i--) this.stylesheet.deleteRule(i);
			this.activeRules = {};
		}
	},

	deleteRule: function (node, name) {
		node.style.animation = node.style.animation.split(', ').filter(function (anim) {
			return anim.slice(0, name.length) !== name;
		}).join(', ');
	}
};

function blankObject() {
	return Object.create(null);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function destroyDev(detach) {
	destroy.call(this, detach);
	this.destroy = function () {
		console.warn('Component was already destroyed');
	};
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || a && typeof a === 'object' || typeof a === 'function';
}

function _differsImmutable(a, b) {
	return a != a ? b == b : a !== b;
}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function init(component, options) {
	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function observe(key, callback, options) {
	var group = options && options.defer ? this._observers.post : this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function () {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function observeDev(key, callback, options) {
	var c = (key = '' + key).search(/[.[]/);
	if (c > -1) {
		var message = 'The first argument to component.observe(...) must be the name of a top-level property';
		if (c > 0) message += ", i.e. '" + key.slice(0, c) + "' rather than '" + key + "'";

		throw new Error(message);
	}

	return observe.call(this, key, callback, options);
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function () {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function onDev(eventName, handler) {
	if (eventName === 'teardown') {
		console.warn("Use component.on('destroy', ...) instead of component.on('teardown', ...) which has been deprecated and will be unsupported in Svelte 2");
		return this.on('destroy', handler);
	}

	return on.call(this, eventName, handler);
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
	    changed = {},
	    dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
		this._fragment.p(changed, this._state);
		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}
}

function setDev(newState) {
	if (typeof newState !== 'object') {
		throw new Error(this._debugName + '.set was called without an object of data key-values to update.');
	}

	this._checkReadOnly(newState);
	set.call(this, newState);
}

function callAll(fns) {
	while (fns && fns.length) fns.shift()();
}

function _mount(target, anchor) {
	this._fragment.m(target, anchor);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

function isPromise(value) {
	return value && typeof value.then === 'function';
}

var PENDING = {};
var SUCCESS = {};
var FAILURE = {};

function removeFromStore() {
	this.store._remove(this);
}

var proto = {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_recompute: noop,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount,
	_differs: _differs
};

var protoDev = {
	destroy: destroyDev,
	get: get,
	fire: fire,
	observe: observeDev,
	on: onDev,
	set: setDev,
	teardown: destroyDev,
	_recompute: noop,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount,
	_differs: _differs
};

exports.blankObject = blankObject;
exports.destroy = destroy;
exports.destroyDev = destroyDev;
exports._differs = _differs;
exports._differsImmutable = _differsImmutable;
exports.dispatchObservers = dispatchObservers;
exports.fire = fire;
exports.get = get;
exports.init = init;
exports.observe = observe;
exports.observeDev = observeDev;
exports.on = on;
exports.onDev = onDev;
exports.set = set;
exports._set = _set;
exports.setDev = setDev;
exports.callAll = callAll;
exports._mount = _mount;
exports._unmount = _unmount;
exports.isPromise = isPromise;
exports.PENDING = PENDING;
exports.SUCCESS = SUCCESS;
exports.FAILURE = FAILURE;
exports.removeFromStore = removeFromStore;
exports.proto = proto;
exports.protoDev = protoDev;
exports.appendNode = appendNode;
exports.insertNode = insertNode;
exports.detachNode = detachNode;
exports.detachBetween = detachBetween;
exports.detachBefore = detachBefore;
exports.detachAfter = detachAfter;
exports.reinsertBetween = reinsertBetween;
exports.reinsertChildren = reinsertChildren;
exports.reinsertAfter = reinsertAfter;
exports.reinsertBefore = reinsertBefore;
exports.destroyEach = destroyEach;
exports.createFragment = createFragment;
exports.createElement = createElement;
exports.createSvgElement = createSvgElement;
exports.createText = createText;
exports.createComment = createComment;
exports.addListener = addListener;
exports.removeListener = removeListener;
exports.setAttribute = setAttribute;
exports.setXlinkAttribute = setXlinkAttribute;
exports.getBindingGroupValue = getBindingGroupValue;
exports.toNumber = toNumber;
exports.timeRangesToArray = timeRangesToArray;
exports.children = children;
exports.claimElement = claimElement;
exports.claimText = claimText;
exports.setInputType = setInputType;
exports.setStyle = setStyle;
exports.selectOption = selectOption;
exports.selectOptions = selectOptions;
exports.selectValue = selectValue;
exports.selectMultipleValue = selectMultipleValue;
exports.linear = linear;
exports.generateRule = generateRule;
exports.hash = hash;
exports.wrapTransition = wrapTransition;
exports.transitionManager = transitionManager;
exports.noop = noop;
exports.assign = assign;
},{}],24:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Store = undefined;

var _shared = require('./shared.js');

function Store(state, options) {
	this._observers = { pre: (0, _shared.blankObject)(), post: (0, _shared.blankObject)() };
	this._changeHandlers = [];
	this._dependents = [];

	this._computed = (0, _shared.blankObject)();
	this._sortedComputedProperties = [];

	this._state = (0, _shared.assign)({}, state);
	this._differs = options && options.immutable ? _shared._differsImmutable : _shared._differs;
}

(0, _shared.assign)(Store.prototype, {
	_add: function (component, props) {
		this._dependents.push({
			component: component,
			props: props
		});
	},

	_init: function (props) {
		var state = {};
		for (var i = 0; i < props.length; i += 1) {
			var prop = props[i];
			state['$' + prop] = this._state[prop];
		}
		return state;
	},

	_remove: function (component) {
		var i = this._dependents.length;
		while (i--) {
			if (this._dependents[i].component === component) {
				this._dependents.splice(i, 1);
				return;
			}
		}
	},

	_sortComputedProperties: function () {
		var computed = this._computed;
		var sorted = this._sortedComputedProperties = [];
		var cycles;
		var visited = (0, _shared.blankObject)();

		function visit(key) {
			if (cycles[key]) {
				throw new Error('Cyclical dependency detected');
			}

			if (visited[key]) return;
			visited[key] = true;

			var c = computed[key];

			if (c) {
				cycles[key] = true;
				c.deps.forEach(visit);
				sorted.push(c);
			}
		}

		for (var key in this._computed) {
			cycles = (0, _shared.blankObject)();
			visit(key);
		}
	},

	compute: function (key, deps, fn) {
		var store = this;
		var value;

		var c = {
			deps: deps,
			update: function (state, changed, dirty) {
				var values = deps.map(function (dep) {
					if (dep in changed) dirty = true;
					return state[dep];
				});

				if (dirty) {
					var newValue = fn.apply(null, values);
					if (store._differs(newValue, value)) {
						value = newValue;
						changed[key] = true;
						state[key] = value;
					}
				}
			}
		};

		c.update(this._state, {}, true);

		this._computed[key] = c;
		this._sortComputedProperties();
	},

	get: _shared.get,

	observe: _shared.observe,

	onchange: function (callback) {
		this._changeHandlers.push(callback);

		var store = this;

		return {
			cancel: function () {
				var index = store._changeHandlers.indexOf(callback);
				if (~index) store._changeHandlers.splice(index, 1);
			}
		};
	},

	set: function (newState) {
		var oldState = this._state,
		    changed = this._changed = {},
		    dirty = false;

		for (var key in newState) {
			if (this._computed[key]) throw new Error("'" + key + "' is a read-only property");
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = (0, _shared.assign)({}, oldState, newState);

		for (var i = 0; i < this._sortedComputedProperties.length; i += 1) {
			this._sortedComputedProperties[i].update(this._state, changed);
		}

		for (var i = 0; i < this._changeHandlers.length; i += 1) {
			this._changeHandlers[i](this._state, changed);
		}

		(0, _shared.dispatchObservers)(this, this._observers.pre, changed, this._state, oldState);

		var dependents = this._dependents.slice(); // guard against mutations
		for (var i = 0; i < dependents.length; i += 1) {
			var dependent = dependents[i];
			var componentState = {};
			dirty = false;

			for (var j = 0; j < dependent.props.length; j += 1) {
				var prop = dependent.props[j];
				if (prop in changed) {
					componentState['$' + prop] = this._state[prop];
					dirty = true;
				}
			}

			if (dirty) dependent.component.set(componentState);
		}

		(0, _shared.dispatchObservers)(this, this._observers.post, changed, this._state, oldState);
	}
});

exports.Store = Store;
},{"./shared.js":25}],15:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* generated by Svelte v1.56.0 */

function data() {

	return {
		// Set the card to unflipped state by default
		flipped: false
	};
};

var methods = {
	rotateCardFront: function rotateCardFront(e, i) {
		this.set({ flipped: !this.get('flipped') });
		document.getElementById("srcCardVideo").src = e;
		document.getElementById("id-" + i).load();
	},
	rotateCardBack: function rotateCardBack() {

		var myVideoac = document.getElementById("embedVideo-ac");
		var myVideo = document.getElementById("embedVideo");
		if (myVideoac) {
			$(myVideoac).attr("src", $(myVideoac).attr("src"));
		}
		if (myVideo) {
			$(myVideo).attr("src", $(myVideo).attr("src"));
		}

		this.set({ flipped: !this.get('flipped') });
	},
	copycardurl: function copycardurl(n) {
		var copyText = document.getElementById("copyurl_" + n);

		copyText.select();
		document.execCommand("copy");
	},
	getTagCat: function getTagCat(e) {
		// new phild condition to stop wall filter
		var myEle = document.getElementById("wall");
		if (myEle) {} else {
			this.store.set({ currentPage: 'catalogue' });
			var element = e.target.innerHTML;
			this.store.loadStaticActivity(element);
		}
	},
	settooltip: function settooltip(e) {
		var myID = "#" + e;
		var title = $("#" + e).attr("value");
		$(myID).tooltip('hide').attr('data-original-title', title).tooltip('show');
	}
};

function oncreate() {
	var _this = this;

	// What the currentCard variable for changes
	this.store.observe('currentCard', function (res) {
		// Child is positioned absolutely, so this forces container to fill height of child on re-render
		setTimeout(function () {
			$(function () {
				$('[data-toggle="tooltip"]').tooltip();
				//$('[data-toggle="tooltip"]').tooltip({container: '.wall-cards'})
			});
		}, 20);

		// When the current card changes make sure the card is in the unflipped state
		_this.set({ flipped: false });
	});
};

function create_main_fragment(component, state) {
	var div,
	    style,
	    text,
	    text_1_value = state.card.id,
	    text_1,
	    text_2,
	    text_3_value = state.card.colour,
	    text_3,
	    text_4,
	    text_5_value = state.card.id,
	    text_5,
	    text_6,
	    text_7_value = state.card.assets.cover.image,
	    text_7,
	    text_8,
	    text_9_value = state.card.assets.cover.styles,
	    text_9,
	    text_10,
	    text_11_value = state.card.id,
	    text_11,
	    text_12,
	    text_13_value = state.card.assets.logo.image,
	    text_13,
	    text_14,
	    text_15_value = state.card.assets.logo.styles,
	    text_15,
	    text_16,
	    text_17,
	    div_1,
	    div_2,
	    div_3,
	    div_4,
	    text_20,
	    div_6,
	    a,
	    a_href_value,
	    text_21,
	    div_7,
	    h5,
	    text_22_value = state.card.name,
	    text_22,
	    text_23,
	    h6,
	    text_24_value = state.card.tagline,
	    text_24,
	    text_27,
	    div_8,
	    p,
	    text_28_value = state.card.description,
	    text_28,
	    text_29,
	    a_1,
	    text_30_value = state.card.urltext,
	    text_30,
	    a_1_href_value,
	    text_31,
	    button,
	    button_name_value,
	    text_33,
	    input,
	    input_value_value,
	    input_id_value,
	    text_35,
	    div_9,
	    div_10,
	    h5_1,
	    text_36,
	    i_1,
	    text_39,
	    div_11,
	    text_40,
	    i_2,
	    text_42,
	    div_12,
	    div_13,
	    text_44,
	    div_14,
	    p_1,
	    b,
	    br,
	    text_46_value = state.card.submitter.name,
	    text_46,
	    span,
	    text_47,
	    text_48_value = state.card.submitter.title,
	    text_48,
	    text_52,
	    div_15,
	    text_56,
	    div_17,
	    div_18,
	    text_59,
	    div_20,
	    div_21,
	    div_22,
	    iframe,
	    iframe_src_value,
	    text_63,
	    div_23,
	    p_2,
	    text_64_value = state.card.frameworkheaders.one,
	    text_64,
	    text_65,
	    p_3,
	    text_66_value = state.card.frameworkheaders.two,
	    text_66,
	    text_68,
	    div_24,
	    div_25,
	    h2,
	    i_6,
	    i_6_class_value,
	    text_69,
	    p_4,
	    strong,
	    text_70_value = state.card.frameworktitles.one,
	    text_70,
	    text_72,
	    div_26,
	    p_5,
	    text_73_value = state.card.framework.commentary_a,
	    text_73,
	    text_75,
	    div_27,
	    h2_1,
	    i_7,
	    i_7_class_value,
	    text_76,
	    p_6,
	    strong_1,
	    text_77_value = state.card.frameworktitles.two,
	    text_77,
	    text_79,
	    div_28,
	    p_7,
	    text_80_value = state.card.framework.commentary_b,
	    text_80,
	    text_82,
	    div_29,
	    h2_2,
	    i_8,
	    i_8_class_value,
	    text_83,
	    p_8,
	    strong_2,
	    text_84_value = state.card.frameworktitles.three,
	    text_84,
	    text_86,
	    div_30,
	    p_9,
	    text_87_value = state.card.framework.commentary_c,
	    text_87,
	    text_90,
	    div_31,
	    div_2_class_value,
	    div_class_value;

	function click_handler(event) {
		var state = component.get();
		component.rotateCardFront(state.card.videoURL, state.card.id);
	}

	function click_handler_1(event) {
		component.copycardurl(button.name);
	}

	var activities = state.card.activities;

	var each_blocks = [];

	for (var i_10 = 0; i_10 < activities.length; i_10 += 1) {
		each_blocks[i_10] = create_each_block(component, assign({}, state, {
			activity: activities[i_10],
			i: i_10
		}));
	}

	var uses = state.card.uses;

	var each_1_blocks = [];

	for (var i_10 = 0; i_10 < uses.length; i_10 += 1) {
		each_1_blocks[i_10] = create_each_block_1(component, assign({}, state, {
			use: uses[i_10],
			use_index: i_10
		}));
	}

	function click_handler_2(event) {
		var state = component.get();
		component.store.loadRandomCard(state.card.id, state.card.activities);
	}

	function click_handler_3(event) {
		component.rotateCardBack();
	}

	function click_handler_4(event) {
		var state = component.get();
		component.store.loadRandomCard(state.card.id);
	}

	return {
		c: function create() {
			div = createElement("div");
			style = createElement("style");
			text = createText(".");
			text_1 = createText(text_1_value);
			text_2 = createText(" .cardflipper, .nextcard:hover {\n            background-color: ");
			text_3 = createText(text_3_value);
			text_4 = createText(";\n        }\n        .");
			text_5 = createText(text_5_value);
			text_6 = createText(" .titlebarfront {\n            background: linear-gradient(\n                rgba(52, 58, 64, 0.9) 0%, \n                rgba(52, 58, 64, 0.9) 95%\n            ), url(.");
			text_7 = createText(text_7_value);
			text_8 = createText(");\n            ");
			text_9 = createText(text_9_value);
			text_10 = createText("\n        }\n        .");
			text_11 = createText(text_11_value);
			text_12 = createText(" .smalllogo {\n            background-image: url(.");
			text_13 = createText(text_13_value);
			text_14 = createText(");\n            ");
			text_15 = createText(text_15_value);
			text_16 = createText("\n        }");
			text_17 = createText("\n    \n    ");
			div_1 = createElement("div");
			div_2 = createElement("div");
			div_3 = createElement("div");
			div_4 = createElement("div");
			div_4.innerHTML = "<div><i class=\"fas fa-redo-alt\" aria-hidden=\"true\"></i> \n                    Flip card</div>";
			text_20 = createText("\n                ");
			div_6 = createElement("div");
			a = createElement("a");
			text_21 = createText("\n                    ");
			div_7 = createElement("div");
			h5 = createElement("h5");
			text_22 = createText(text_22_value);
			text_23 = createText("\n                    ");
			h6 = createElement("h6");
			text_24 = createText(text_24_value);
			text_27 = createText("\n                ");
			div_8 = createElement("div");
			p = createElement("p");
			text_28 = createText(text_28_value);
			text_29 = createText("\n                    ");
			a_1 = createElement("a");
			text_30 = createText(text_30_value);
			text_31 = createText("\n                    ");
			button = createElement("button");
			button.textContent = "copy url";
			text_33 = createText("\n                    ");
			input = createElement("input");
			text_35 = createText("\n                ");
			div_9 = createElement("div");
			div_10 = createElement("div");
			h5_1 = createElement("h5");

			for (var i_10 = 0; i_10 < each_blocks.length; i_10 += 1) {
				each_blocks[i_10].c();
			}

			text_36 = createText("\n                            ");
			i_1 = createElement("i");
			text_39 = createText("\n                    ");
			div_11 = createElement("div");

			for (var i_10 = 0; i_10 < each_1_blocks.length; i_10 += 1) {
				each_1_blocks[i_10].c();
			}

			text_40 = createText(" \n                        ");
			i_2 = createElement("i");
			text_42 = createText("\n                    ");
			div_12 = createElement("div");
			div_13 = createElement("div");
			div_13.innerHTML = "<i class=\"far fa-user\" aria-hidden=\"true\"></i>";
			text_44 = createText("\n                        ");
			div_14 = createElement("div");
			p_1 = createElement("p");
			b = createElement("b");
			b.textContent = "Submitted by";
			br = createElement("br");
			text_46 = createText(text_46_value);
			span = createElement("span");
			text_47 = createText(" | ");
			text_48 = createText(text_48_value);
			text_52 = createText("\n                ");
			div_15 = createElement("div");
			div_15.innerHTML = "<div><i class=\"fas fa-magic\" aria-hidden=\"true\"></i>  Try another card</div>";
			text_56 = createText("\n            \n            \n\n            ");
			div_17 = createElement("div");
			div_18 = createElement("div");
			div_18.innerHTML = "<div><i class=\"fas fa-redo-alt\" aria-hidden=\"true\"></i> Flip back</div>";
			text_59 = createText("\n\n\n                ");
			div_20 = createElement("div");
			div_21 = createElement("div");
			div_22 = createElement("div");
			iframe = createElement("iframe");
			text_63 = createText(" \n                \n                \n                \n               \n                \n                ");
			div_23 = createElement("div");
			p_2 = createElement("p");
			text_64 = createText(text_64_value);
			text_65 = createText("\n                    ");
			p_3 = createElement("p");
			text_66 = createText(text_66_value);
			text_68 = createText("\n                ");
			div_24 = createElement("div");
			div_25 = createElement("div");
			h2 = createElement("h2");
			i_6 = createElement("i");
			text_69 = createText("\n                        ");
			p_4 = createElement("p");
			strong = createElement("strong");
			text_70 = createText(text_70_value);
			text_72 = createText("\n                    ");
			div_26 = createElement("div");
			p_5 = createElement("p");
			text_73 = createText(text_73_value);
			text_75 = createText("\n                    ");
			div_27 = createElement("div");
			h2_1 = createElement("h2");
			i_7 = createElement("i");
			text_76 = createText("\n                        ");
			p_6 = createElement("p");
			strong_1 = createElement("strong");
			text_77 = createText(text_77_value);
			text_79 = createText("\n                    ");
			div_28 = createElement("div");
			p_7 = createElement("p");
			text_80 = createText(text_80_value);
			text_82 = createText("\n                    ");
			div_29 = createElement("div");
			h2_2 = createElement("h2");
			i_8 = createElement("i");
			text_83 = createText("\n                        ");
			p_8 = createElement("p");
			strong_2 = createElement("strong");
			text_84 = createText(text_84_value);
			text_86 = createText("\n                    ");
			div_30 = createElement("div");
			p_9 = createElement("p");
			text_87 = createText(text_87_value);
			text_90 = createText("\n                ");
			div_31 = createElement("div");
			div_31.innerHTML = "<div><i class=\"fas fa-magic\" aria-hidden=\"true\"></i>  Try another card</div>";
			this.h();
		},

		h: function hydrate() {
			style.type = "text/css";
			div_4.className = "cardflipper";
			setAttribute(div_4, "role", "button");
			addListener(div_4, "click", click_handler);
			a.className = "smalllogo faa-tada animated-hover";
			a.href = a_href_value = state.card.url;
			a.target = "_blank";
			div_7.className = "apptitle";
			div_6.className = "titlebarfront";
			p.className = "card-text";
			a_1.className = "tool-link";
			a_1.href = a_1_href_value = state.card.url;
			a_1.target = "_blank";
			button.id = "copybtn";
			setStyle(button, "float", "right");
			button.dataset.toggle = "tooltip";
			button.name = button_name_value = state.card.id;
			button.title = "Click to copy this cards unique URL to your clipboard";
			setAttribute(button, "aria-hidden", "true");
			addListener(button, "click", click_handler_1);
			input.type = "text";
			setStyle(input, "position", "absolute");
			setStyle(input, "left", "-1000px");
			input.value = input_value_value = "https://www.lancaster.ac.uk/staff/devinep/ctel/?cardid=" + state.card.id;
			input.id = input_id_value = "copyurl_" + state.card.id;
			div_8.className = "card-body";
			i_1.className = "far fa-question-circle";
			i_1.dataset.toggle = "tooltip";
			i_1.dataset.placement = "top";
			i_1.title = "Activities this app supports";
			setAttribute(i_1, "aria-hidden", "true");
			div_10.className = "pills-main";
			i_2.className = "far fa-question-circle";
			i_2.dataset.toggle = "tooltip";
			i_2.dataset.placement = "top";
			i_2.title = "Examples of how this app can be used";
			setAttribute(i_2, "aria-hidden", "true");
			div_11.className = "pills-sub";
			div_13.className = "submitterimg";
			span.className = "submitterschool";
			p_1.className = "small";
			div_14.className = "submitterinfo";
			div_12.className = "submitter";
			div_9.className = "details";
			div_15.className = "nextcard";
			setAttribute(div_15, "role", "button");
			addListener(div_15, "click", click_handler_2);
			div_3.className = "front face";
			div_18.className = "cardflipper";
			setAttribute(div_18, "role", "button");
			addListener(div_18, "click", click_handler_3);
			iframe.id = "embedVideo";
			iframe.className = "embed-responsive-item youtube";
			iframe.src = iframe_src_value = state.card.videoURL;
			setAttribute(iframe, "frameborder", "0");
			iframe.allowFullscreen = true;
			div_22.className = "embed-responsive embed-responsive-16by9";
			div_21.className = "videocontainer";
			div_20.className = "mediabackground";
			p_2.className = "frameworktext1";
			p_3.className = "frameworktext2";
			div_23.className = "frameworkheading";
			i_6.className = i_6_class_value = "fas " + state.card.frameworkicons.one + " usesimage";
			setAttribute(i_6, "aria-hidden", "true");
			div_25.className = "thermometer thermometer1";
			div_26.className = "usestext usestext1";
			i_7.className = i_7_class_value = "fas " + state.card.frameworkicons.two;
			setAttribute(i_7, "aria-hidden", "true");
			div_27.className = "thermometer thermometer2";
			div_28.className = "usestext usestext2";
			i_8.className = i_8_class_value = "fas " + state.card.frameworkicons.three + " usesimage";
			setAttribute(i_8, "aria-hidden", "true");
			div_29.className = "thermometer thermometer3";
			div_30.className = "usestext usestext3";
			div_24.className = "card-body framework";
			div_31.className = "nextcard";
			setAttribute(div_31, "role", "button");
			addListener(div_31, "click", click_handler_4);
			div_17.className = "back face";
			div_2.className = div_2_class_value = "app-card card noborder " + state.card.id;
			div_1.id = "content";
			div_1.className = "card-container";
			div.className = div_class_value = "manual-flip " + (state.flipped ? 'hover' : '');
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(style, div);
			appendNode(text, style);
			appendNode(text_1, style);
			appendNode(text_2, style);
			appendNode(text_3, style);
			appendNode(text_4, style);
			appendNode(text_5, style);
			appendNode(text_6, style);
			appendNode(text_7, style);
			appendNode(text_8, style);
			appendNode(text_9, style);
			appendNode(text_10, style);
			appendNode(text_11, style);
			appendNode(text_12, style);
			appendNode(text_13, style);
			appendNode(text_14, style);
			appendNode(text_15, style);
			appendNode(text_16, style);
			appendNode(text_17, div);
			appendNode(div_1, div);
			appendNode(div_2, div_1);
			appendNode(div_3, div_2);
			appendNode(div_4, div_3);
			appendNode(text_20, div_3);
			appendNode(div_6, div_3);
			appendNode(a, div_6);
			appendNode(text_21, div_6);
			appendNode(div_7, div_6);
			appendNode(h5, div_7);
			appendNode(text_22, h5);
			appendNode(text_23, div_7);
			appendNode(h6, div_7);
			appendNode(text_24, h6);
			appendNode(text_27, div_3);
			appendNode(div_8, div_3);
			appendNode(p, div_8);
			appendNode(text_28, p);
			appendNode(text_29, div_8);
			appendNode(a_1, div_8);
			appendNode(text_30, a_1);
			appendNode(text_31, div_8);
			appendNode(button, div_8);
			appendNode(text_33, div_8);
			appendNode(input, div_8);
			appendNode(text_35, div_3);
			appendNode(div_9, div_3);
			appendNode(div_10, div_9);
			appendNode(h5_1, div_10);

			for (var i_10 = 0; i_10 < each_blocks.length; i_10 += 1) {
				each_blocks[i_10].m(h5_1, null);
			}

			appendNode(text_36, h5_1);
			appendNode(i_1, h5_1);
			appendNode(text_39, div_9);
			appendNode(div_11, div_9);

			for (var i_10 = 0; i_10 < each_1_blocks.length; i_10 += 1) {
				each_1_blocks[i_10].m(div_11, null);
			}

			appendNode(text_40, div_11);
			appendNode(i_2, div_11);
			appendNode(text_42, div_9);
			appendNode(div_12, div_9);
			appendNode(div_13, div_12);
			appendNode(text_44, div_12);
			appendNode(div_14, div_12);
			appendNode(p_1, div_14);
			appendNode(b, p_1);
			appendNode(br, p_1);
			appendNode(text_46, p_1);
			appendNode(span, p_1);
			appendNode(text_47, span);
			appendNode(text_48, span);
			appendNode(text_52, div_3);
			appendNode(div_15, div_3);
			appendNode(text_56, div_2);
			appendNode(div_17, div_2);
			appendNode(div_18, div_17);
			appendNode(text_59, div_17);
			appendNode(div_20, div_17);
			appendNode(div_21, div_20);
			appendNode(div_22, div_21);
			appendNode(iframe, div_22);
			appendNode(text_63, div_17);
			appendNode(div_23, div_17);
			appendNode(p_2, div_23);
			appendNode(text_64, p_2);
			appendNode(text_65, div_23);
			appendNode(p_3, div_23);
			appendNode(text_66, p_3);
			appendNode(text_68, div_17);
			appendNode(div_24, div_17);
			appendNode(div_25, div_24);
			appendNode(h2, div_25);
			appendNode(i_6, h2);
			appendNode(text_69, div_25);
			appendNode(p_4, div_25);
			appendNode(strong, p_4);
			appendNode(text_70, strong);
			appendNode(text_72, div_24);
			appendNode(div_26, div_24);
			appendNode(p_5, div_26);
			appendNode(text_73, p_5);
			appendNode(text_75, div_24);
			appendNode(div_27, div_24);
			appendNode(h2_1, div_27);
			appendNode(i_7, h2_1);
			appendNode(text_76, div_27);
			appendNode(p_6, div_27);
			appendNode(strong_1, p_6);
			appendNode(text_77, strong_1);
			appendNode(text_79, div_24);
			appendNode(div_28, div_24);
			appendNode(p_7, div_28);
			appendNode(text_80, p_7);
			appendNode(text_82, div_24);
			appendNode(div_29, div_24);
			appendNode(h2_2, div_29);
			appendNode(i_8, h2_2);
			appendNode(text_83, div_29);
			appendNode(p_8, div_29);
			appendNode(strong_2, p_8);
			appendNode(text_84, strong_2);
			appendNode(text_86, div_24);
			appendNode(div_30, div_24);
			appendNode(p_9, div_30);
			appendNode(text_87, p_9);
			appendNode(text_90, div_17);
			appendNode(div_31, div_17);
		},

		p: function update(changed, state) {
			if (changed.card && text_1_value !== (text_1_value = state.card.id)) {
				text_1.data = text_1_value;
			}

			if (changed.card && text_3_value !== (text_3_value = state.card.colour)) {
				text_3.data = text_3_value;
			}

			if (changed.card && text_5_value !== (text_5_value = state.card.id)) {
				text_5.data = text_5_value;
			}

			if (changed.card && text_7_value !== (text_7_value = state.card.assets.cover.image)) {
				text_7.data = text_7_value;
			}

			if (changed.card && text_9_value !== (text_9_value = state.card.assets.cover.styles)) {
				text_9.data = text_9_value;
			}

			if (changed.card && text_11_value !== (text_11_value = state.card.id)) {
				text_11.data = text_11_value;
			}

			if (changed.card && text_13_value !== (text_13_value = state.card.assets.logo.image)) {
				text_13.data = text_13_value;
			}

			if (changed.card && text_15_value !== (text_15_value = state.card.assets.logo.styles)) {
				text_15.data = text_15_value;
			}

			if (changed.card && a_href_value !== (a_href_value = state.card.url)) {
				a.href = a_href_value;
			}

			if (changed.card && text_22_value !== (text_22_value = state.card.name)) {
				text_22.data = text_22_value;
			}

			if (changed.card && text_24_value !== (text_24_value = state.card.tagline)) {
				text_24.data = text_24_value;
			}

			if (changed.card && text_28_value !== (text_28_value = state.card.description)) {
				text_28.data = text_28_value;
			}

			if (changed.card && text_30_value !== (text_30_value = state.card.urltext)) {
				text_30.data = text_30_value;
			}

			if (changed.card && a_1_href_value !== (a_1_href_value = state.card.url)) {
				a_1.href = a_1_href_value;
			}

			if (changed.card && button_name_value !== (button_name_value = state.card.id)) {
				button.name = button_name_value;
			}

			if (changed.card && input_value_value !== (input_value_value = "https://www.lancaster.ac.uk/staff/devinep/ctel/?cardid=" + state.card.id)) {
				input.value = input_value_value;
			}

			if (changed.card && input_id_value !== (input_id_value = "copyurl_" + state.card.id)) {
				input.id = input_id_value;
			}

			var activities = state.card.activities;

			if (changed.card) {
				for (var i_10 = 0; i_10 < activities.length; i_10 += 1) {
					var each_context = assign({}, state, {
						activity: activities[i_10],
						i: i_10
					});

					if (each_blocks[i_10]) {
						each_blocks[i_10].p(changed, each_context);
					} else {
						each_blocks[i_10] = create_each_block(component, each_context);
						each_blocks[i_10].c();
						each_blocks[i_10].m(h5_1, text_36);
					}
				}

				for (; i_10 < each_blocks.length; i_10 += 1) {
					each_blocks[i_10].u();
					each_blocks[i_10].d();
				}
				each_blocks.length = activities.length;
			}

			var uses = state.card.uses;

			if (changed.card) {
				for (var i_10 = 0; i_10 < uses.length; i_10 += 1) {
					var each_1_context = assign({}, state, {
						use: uses[i_10],
						use_index: i_10
					});

					if (each_1_blocks[i_10]) {
						each_1_blocks[i_10].p(changed, each_1_context);
					} else {
						each_1_blocks[i_10] = create_each_block_1(component, each_1_context);
						each_1_blocks[i_10].c();
						each_1_blocks[i_10].m(div_11, text_40);
					}
				}

				for (; i_10 < each_1_blocks.length; i_10 += 1) {
					each_1_blocks[i_10].u();
					each_1_blocks[i_10].d();
				}
				each_1_blocks.length = uses.length;
			}

			if (changed.card && text_46_value !== (text_46_value = state.card.submitter.name)) {
				text_46.data = text_46_value;
			}

			if (changed.card && text_48_value !== (text_48_value = state.card.submitter.title)) {
				text_48.data = text_48_value;
			}

			if (changed.card && iframe_src_value !== (iframe_src_value = state.card.videoURL)) {
				iframe.src = iframe_src_value;
			}

			if (changed.card && text_64_value !== (text_64_value = state.card.frameworkheaders.one)) {
				text_64.data = text_64_value;
			}

			if (changed.card && text_66_value !== (text_66_value = state.card.frameworkheaders.two)) {
				text_66.data = text_66_value;
			}

			if (changed.card && i_6_class_value !== (i_6_class_value = "fas " + state.card.frameworkicons.one + " usesimage")) {
				i_6.className = i_6_class_value;
			}

			if (changed.card && text_70_value !== (text_70_value = state.card.frameworktitles.one)) {
				text_70.data = text_70_value;
			}

			if (changed.card && text_73_value !== (text_73_value = state.card.framework.commentary_a)) {
				text_73.data = text_73_value;
			}

			if (changed.card && i_7_class_value !== (i_7_class_value = "fas " + state.card.frameworkicons.two)) {
				i_7.className = i_7_class_value;
			}

			if (changed.card && text_77_value !== (text_77_value = state.card.frameworktitles.two)) {
				text_77.data = text_77_value;
			}

			if (changed.card && text_80_value !== (text_80_value = state.card.framework.commentary_b)) {
				text_80.data = text_80_value;
			}

			if (changed.card && i_8_class_value !== (i_8_class_value = "fas " + state.card.frameworkicons.three + " usesimage")) {
				i_8.className = i_8_class_value;
			}

			if (changed.card && text_84_value !== (text_84_value = state.card.frameworktitles.three)) {
				text_84.data = text_84_value;
			}

			if (changed.card && text_87_value !== (text_87_value = state.card.framework.commentary_c)) {
				text_87.data = text_87_value;
			}

			if (changed.card && div_2_class_value !== (div_2_class_value = "app-card card noborder " + state.card.id)) {
				div_2.className = div_2_class_value;
			}

			if (changed.flipped && div_class_value !== (div_class_value = "manual-flip " + (state.flipped ? 'hover' : ''))) {
				div.className = div_class_value;
			}
		},

		u: function unmount() {
			detachNode(div);

			for (var i_10 = 0; i_10 < each_blocks.length; i_10 += 1) {
				each_blocks[i_10].u();
			}

			for (var i_10 = 0; i_10 < each_1_blocks.length; i_10 += 1) {
				each_1_blocks[i_10].u();
			}
		},

		d: function destroy() {
			removeListener(div_4, "click", click_handler);
			removeListener(button, "click", click_handler_1);

			destroyEach(each_blocks);

			destroyEach(each_1_blocks);

			removeListener(div_15, "click", click_handler_2);
			removeListener(div_18, "click", click_handler_3);
			removeListener(div_31, "click", click_handler_4);
		}
	};
}

// (45:28) {{#each card.activities as activity, i}}
function create_each_block(component, state) {
	var activity = state.activity,
	    i = state.i;
	var span,
	    text_value = state.card.activities[i].name,
	    text,
	    text_1,
	    span_1,
	    text_2_value = activity.name,
	    text_2,
	    span_1_id_value,
	    span_1_value_value,
	    span_1_class_value,
	    span_1_name_value,
	    span_1_title_value,
	    text_3;

	return {
		c: function create() {
			span = createElement("span");
			text = createText(text_value);
			text_1 = createText("\n    \n                            ");
			span_1 = createElement("span");
			text_2 = createText(text_2_value);
			text_3 = createText(" ");
			this.h();
		},

		h: function hydrate() {
			span.id = "mytag";
			setStyle(span, "display", "none");
			span_1.id = span_1_id_value = "" + state.card.id + "_" + state.card.activities[i].name;
			setAttribute(span_1, "value", span_1_value_value = state.card.activities[i].description);
			setAttribute(span_1, "role", "button");
			span_1.className = span_1_class_value = "badge activity " + activity.name;
			span_1.dataset.toggle = "tooltip";
			span_1.dataset.placement = "top";
			setAttribute(span_1, "name", span_1_name_value = activity.name);
			span_1.title = span_1_title_value = activity.description;
			setAttribute(span_1, "aria-hidden", "true");
			addListener(span_1, "click", click_handler);
			addListener(span_1, "mouseover", mouseover_handler);

			span_1._svelte = {
				component: component
			};
		},

		m: function mount(target, anchor) {
			insertNode(span, target, anchor);
			appendNode(text, span);
			insertNode(text_1, target, anchor);
			insertNode(span_1, target, anchor);
			appendNode(text_2, span_1);
			insertNode(text_3, target, anchor);
		},

		p: function update(changed, state) {
			activity = state.activity;
			i = state.i;
			if (changed.card && text_value !== (text_value = state.card.activities[i].name)) {
				text.data = text_value;
			}

			if (changed.card && text_2_value !== (text_2_value = activity.name)) {
				text_2.data = text_2_value;
			}

			if (changed.card && span_1_id_value !== (span_1_id_value = "" + state.card.id + "_" + state.card.activities[i].name)) {
				span_1.id = span_1_id_value;
			}

			if (changed.card && span_1_value_value !== (span_1_value_value = state.card.activities[i].description)) {
				setAttribute(span_1, "value", span_1_value_value);
			}

			if (changed.card && span_1_class_value !== (span_1_class_value = "badge activity " + activity.name)) {
				span_1.className = span_1_class_value;
			}

			if (changed.card && span_1_name_value !== (span_1_name_value = activity.name)) {
				setAttribute(span_1, "name", span_1_name_value);
			}

			if (changed.card && span_1_title_value !== (span_1_title_value = activity.description)) {
				span_1.title = span_1_title_value;
			}
		},

		u: function unmount() {
			detachNode(span);
			detachNode(text_1);
			detachNode(span_1);
			detachNode(text_3);
		},

		d: function destroy() {
			removeListener(span_1, "click", click_handler);
			removeListener(span_1, "mouseover", mouseover_handler);
		}
	};
}

// (56:24) {{#each card.uses as use}}
function create_each_block_1(component, state) {
	var use = state.use,
	    use_index = state.use_index;
	var span,
	    text_value = use,
	    text,
	    text_2;

	return {
		c: function create() {
			span = createElement("span");
			text = createText(text_value);
			text_2 = createText(" ");
			this.h();
		},

		h: function hydrate() {
			span.className = "badge sub";
		},

		m: function mount(target, anchor) {
			insertNode(span, target, anchor);
			appendNode(text, span);
			insertNode(text_2, target, anchor);
		},

		p: function update(changed, state) {
			use = state.use;
			use_index = state.use_index;
			if (changed.card && text_value !== (text_value = use)) {
				text.data = text_value;
			}
		},

		u: function unmount() {
			detachNode(span);
			detachNode(text_2);
		},

		d: noop
	};
}

function click_handler(event) {
	var component = this._svelte.component;
	component.getTagCat(event);
}

function mouseover_handler(event) {
	var component = this._svelte.component;
	component.settooltip(this.id);
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign(data(), options.data);

	var _oncreate = oncreate.bind(this);

	if (!options.root) {
		this._oncreate = [];
	}

	this._fragment = create_main_fragment(this, this._state);

	this.root._oncreate.push(_oncreate);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		callAll(this._oncreate);
	}
}

assign(SvelteComponent.prototype, methods, {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount,
	_differs: _differs
});

SvelteComponent.prototype._recompute = noop;

function assign(target) {
	var k,
	    source,
	    i = 1,
	    len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) {
			target[k] = source[k];
		}
	}

	return target;
}

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function setStyle(node, key, value) {
	node.style.setProperty(key, value);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function destroyEach(iterations) {
	for (var i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d();
	}
}

function noop() {}

function init(component, options) {
	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function callAll(fns) {
	while (fns && fns.length) {
		fns.shift()();
	}
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function observe(key, callback, options) {
	var group = options && options.defer ? this._observers.post : this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function cancel() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function cancel() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
	    changed = {},
	    dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
		this._fragment.p(changed, this._state);
		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}
}

function _mount(target, anchor) {
	this._fragment.m(target, anchor);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || a && (typeof a === "undefined" ? "undefined" : _typeof(a)) === 'object' || typeof a === 'function';
}

function blankObject() {
	return Object.create(null);
}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}
exports.default = SvelteComponent;
},{}],16:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* generated by Svelte v1.56.0 */

function filteredCards($cards, filter) {
	if (filter === 'all') return $cards;

	return $cards.filter(function (card) {
		return card.activities.map(function (a) {
			return a.name;
		}).indexOf(filter) !== -1;
	});
}

function data() {
	return {
		filter: 'all'
	};
};

function create_main_fragment(component, state) {
	var div, div_1, div_2, text_6, div_4, select, option, text_7, option_1, text_8, option_2, text_9, option_3, text_10, option_4, text_11, option_5, text_12, option_6, text_13, option_7, text_14, option_8, text_15, option_9, text_16, option_10, text_17, text_19, div_5, div_6, ul;

	function change_handler(event) {
		component.set({ filter: event.target.value });
	}

	var filteredCards = state.filteredCards;

	var each_blocks = [];

	for (var i_1 = 0; i_1 < filteredCards.length; i_1 += 1) {
		each_blocks[i_1] = create_each_block(component, assign({}, state, {
			card: filteredCards[i_1],
			card_index: i_1
		}));
	}

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			div_2 = createElement("div");
			div_2.innerHTML = "<div class=\"icon\"><i class=\"far fa-bookmark\" aria-hidden=\"true\"></i></div>\n            <h4>Catalogue</h4>\n            <p>Browse the list or use the dropdown filter to find an application that supports a specific activity.</p>";
			text_6 = createText("\n        ");
			div_4 = createElement("div");
			select = createElement("select");
			option = createElement("option");
			text_7 = createText("Find a card to...");
			option_1 = createElement("option");
			text_8 = createText("...create learning resources");
			option_2 = createElement("option");
			text_9 = createText("...communicate with students electronically");
			option_3 = createElement("option");
			text_10 = createText("...act as a platform for collaboration");
			option_4 = createElement("option");
			text_11 = createText("...collect, organise and share content");
			option_5 = createElement("option");
			text_12 = createText("...record an event or artefact");
			option_6 = createElement("option");
			text_13 = createText("...create interactive learning opportunities");
			option_7 = createElement("option");
			text_14 = createText("...gauge students understanding");
			option_8 = createElement("option");
			text_15 = createText("...engauge with learning theory");
			option_9 = createElement("option");
			text_16 = createText("...centre for technology enhanced learning");
			option_10 = createElement("option");
			text_17 = createText("All cards");
			text_19 = createText("\n        ");
			div_5 = createElement("div");
			div_6 = createElement("div");
			ul = createElement("ul");

			for (var i_1 = 0; i_1 < each_blocks.length; i_1 += 1) {
				each_blocks[i_1].c();
			}
			this.h();
		},

		h: function hydrate() {
			div_2.className = "bs-callout bs-callout-catalogue clearfix";
			option.selected = true;
			option.__value = "all";
			option.value = option.__value;
			option_1.__value = "create";
			option_1.value = option_1.__value;
			option_2.__value = "connect";
			option_2.value = option_2.__value;
			option_3.__value = "collaborate";
			option_3.value = option_3.__value;
			option_4.__value = "curate";
			option_4.value = option_4.__value;
			option_5.__value = "capture";
			option_5.value = option_5.__value;
			option_6.__value = "captivate";
			option_6.value = option_6.__value;
			option_7.__value = "check";
			option_7.value = option_7.__value;
			option_8.__value = "theory";
			option_8.value = option_8.__value;
			option_9.__value = "ctel";
			option_9.value = option_9.__value;
			option_10.__value = "all";
			option_10.value = option_10.__value;
			select.id = "filterText";
			select.className = "btn btn-secondary dropdown-toggle btn-block";
			addListener(select, "change", change_handler);
			div_4.className = "dropdown";
			ul.className = "list-group list-group-flush";
			div_6.className = "front";
			div_5.className = "card cataloguepane";
			div_5.dataset.spy = "scroll";
			div_1.className = "col-md-12";
			div.className = "card-container manual-flip";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(div_2, div_1);
			appendNode(text_6, div_1);
			appendNode(div_4, div_1);
			appendNode(select, div_4);
			appendNode(option, select);
			appendNode(text_7, option);
			appendNode(option_1, select);
			appendNode(text_8, option_1);
			appendNode(option_2, select);
			appendNode(text_9, option_2);
			appendNode(option_3, select);
			appendNode(text_10, option_3);
			appendNode(option_4, select);
			appendNode(text_11, option_4);
			appendNode(option_5, select);
			appendNode(text_12, option_5);
			appendNode(option_6, select);
			appendNode(text_13, option_6);
			appendNode(option_7, select);
			appendNode(text_14, option_7);
			appendNode(option_8, select);
			appendNode(text_15, option_8);
			appendNode(option_9, select);
			appendNode(text_16, option_9);
			appendNode(option_10, select);
			appendNode(text_17, option_10);
			appendNode(text_19, div_1);
			appendNode(div_5, div_1);
			appendNode(div_6, div_5);
			appendNode(ul, div_6);

			for (var i_1 = 0; i_1 < each_blocks.length; i_1 += 1) {
				each_blocks[i_1].m(ul, null);
			}
		},

		p: function update(changed, state) {
			var filteredCards = state.filteredCards;

			if (changed.filteredCards) {
				for (var i_1 = 0; i_1 < filteredCards.length; i_1 += 1) {
					var each_context = assign({}, state, {
						card: filteredCards[i_1],
						card_index: i_1
					});

					if (each_blocks[i_1]) {
						each_blocks[i_1].p(changed, each_context);
					} else {
						each_blocks[i_1] = create_each_block(component, each_context);
						each_blocks[i_1].c();
						each_blocks[i_1].m(ul, null);
					}
				}

				for (; i_1 < each_blocks.length; i_1 += 1) {
					each_blocks[i_1].u();
					each_blocks[i_1].d();
				}
				each_blocks.length = filteredCards.length;
			}
		},

		u: function unmount() {
			detachNode(div);

			for (var i_1 = 0; i_1 < each_blocks.length; i_1 += 1) {
				each_blocks[i_1].u();
			}
		},

		d: function destroy() {
			removeListener(select, "change", change_handler);

			destroyEach(each_blocks);
		}
	};
}

// (28:20) {{#each filteredCards as card}}
function create_each_block(component, state) {
	var card = state.card,
	    card_index = state.card_index;
	var a,
	    div,
	    h5,
	    img,
	    img_src_value,
	    text,
	    text_1_value = card.name,
	    text_1,
	    text_2,
	    p,
	    text_4,
	    p_1,
	    small,
	    text_5,
	    text_6_value = card.submitter.name,
	    text_6,
	    text_7,
	    text_8_value = card.submitter.title,
	    text_8,
	    text_9,
	    p_2,
	    text_10_value = card.tagline,
	    text_10;

	var activities = card.activities;

	var each_blocks = [];

	for (var i = 0; i < activities.length; i += 1) {
		each_blocks[i] = create_each_block_1(component, assign({}, state, {
			activity: activities[i],
			activity_index: i
		}));
	}

	return {
		c: function create() {
			a = createElement("a");
			div = createElement("div");
			h5 = createElement("h5");
			img = createElement("img");
			text = createText(" ");
			text_1 = createText(text_1_value);
			text_2 = createText("\n                            ");
			p = createElement("p");

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			text_4 = createText("\n                            ");
			p_1 = createElement("p");
			small = createElement("small");
			text_5 = createText("Submitted by ");
			text_6 = createText(text_6_value);
			text_7 = createText(" | ");
			text_8 = createText(text_8_value);
			text_9 = createText("\n                            ");
			p_2 = createElement("p");
			text_10 = createText(text_10_value);
			this.h();
		},

		h: function hydrate() {
			setStyle(img, "display", "inline");
			setStyle(img, "height", "1em");
			setStyle(img, "vertical-align", "top");
			img.src = img_src_value = card.assets.logo.image;
			p.className = "categories";
			p_1.className = "submittercatalogue";
			p_2.className = "appinfo";
			div.className = "applist";
			a.href = "#";
			a.className = "list-group-item list-group-item-action";
			addListener(a, "click", click_handler);

			a._svelte = {
				component: component,
				filteredCards: state.filteredCards,
				card_index: state.card_index
			};
		},

		m: function mount(target, anchor) {
			insertNode(a, target, anchor);
			appendNode(div, a);
			appendNode(h5, div);
			appendNode(img, h5);
			appendNode(text, h5);
			appendNode(text_1, h5);
			appendNode(text_2, div);
			appendNode(p, div);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(p, null);
			}

			appendNode(text_4, div);
			appendNode(p_1, div);
			appendNode(small, p_1);
			appendNode(text_5, small);
			appendNode(text_6, small);
			appendNode(text_7, small);
			appendNode(text_8, small);
			appendNode(text_9, div);
			appendNode(p_2, div);
			appendNode(text_10, p_2);
		},

		p: function update(changed, state) {
			card = state.card;
			card_index = state.card_index;
			if (changed.filteredCards && img_src_value !== (img_src_value = card.assets.logo.image)) {
				img.src = img_src_value;
			}

			if (changed.filteredCards && text_1_value !== (text_1_value = card.name)) {
				text_1.data = text_1_value;
			}

			var activities = card.activities;

			if (changed.filteredCards) {
				for (var i = 0; i < activities.length; i += 1) {
					var each_context = assign({}, state, {
						activity: activities[i],
						activity_index: i
					});

					if (each_blocks[i]) {
						each_blocks[i].p(changed, each_context);
					} else {
						each_blocks[i] = create_each_block_1(component, each_context);
						each_blocks[i].c();
						each_blocks[i].m(p, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
					each_blocks[i].d();
				}
				each_blocks.length = activities.length;
			}

			if (changed.filteredCards && text_6_value !== (text_6_value = card.submitter.name)) {
				text_6.data = text_6_value;
			}

			if (changed.filteredCards && text_8_value !== (text_8_value = card.submitter.title)) {
				text_8.data = text_8_value;
			}

			if (changed.filteredCards && text_10_value !== (text_10_value = card.tagline)) {
				text_10.data = text_10_value;
			}

			a._svelte.filteredCards = state.filteredCards;
			a._svelte.card_index = state.card_index;
		},

		u: function unmount() {
			detachNode(a);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].u();
			}
		},

		d: function destroy() {
			destroyEach(each_blocks);

			removeListener(a, "click", click_handler);
		}
	};
}

// (33:32) {{#each card.activities as activity}}
function create_each_block_1(component, state) {
	var card = state.card,
	    activity = state.activity,
	    card_index = state.card_index,
	    activity_index = state.activity_index;
	var span,
	    text_value = activity.name,
	    text,
	    span_class_value,
	    text_1;

	return {
		c: function create() {
			span = createElement("span");
			text = createText(text_value);
			text_1 = createText(" ");
			this.h();
		},

		h: function hydrate() {
			span.className = span_class_value = "badge activity " + activity.name;
		},

		m: function mount(target, anchor) {
			insertNode(span, target, anchor);
			appendNode(text, span);
			insertNode(text_1, target, anchor);
		},

		p: function update(changed, state) {
			card = state.card;
			activity = state.activity;
			card_index = state.card_index;
			activity_index = state.activity_index;
			if (changed.filteredCards && text_value !== (text_value = activity.name)) {
				text.data = text_value;
			}

			if (changed.filteredCards && span_class_value !== (span_class_value = "badge activity " + activity.name)) {
				span.className = span_class_value;
			}
		},

		u: function unmount() {
			detachNode(span);
			detachNode(text_1);
		},

		d: noop
	};
}

function click_handler(event) {
	var component = this._svelte.component;
	var filteredCards = this._svelte.filteredCards,
	    card_index = this._svelte.card_index,
	    card = filteredCards[card_index];
	component.store.set({ currentPage: 'card', currentCard: card.id });
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign(this.store._init(["cards"]), data(), options.data);
	this.store._add(this, ["cards"]);
	this._recompute({ $cards: 1, filter: 1 }, this._state);

	this._handlers.destroy = [removeFromStore];

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);
	}
}

assign(SvelteComponent.prototype, {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount,
	_differs: _differs
});

SvelteComponent.prototype._recompute = function _recompute(changed, state) {
	if (changed.$cards || changed.filter) {
		if (this._differs(state.filteredCards, state.filteredCards = filteredCards(state.$cards, state.filter))) changed.filteredCards = true;
	}
};

function assign(target) {
	var k,
	    source,
	    i = 1,
	    len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) {
			target[k] = source[k];
		}
	}

	return target;
}

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function destroyEach(iterations) {
	for (var i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d();
	}
}

function setStyle(node, key, value) {
	node.style.setProperty(key, value);
}

function noop() {}

function init(component, options) {
	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function removeFromStore() {
	this.store._remove(this);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function observe(key, callback, options) {
	var group = options && options.defer ? this._observers.post : this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function cancel() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function cancel() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
	    changed = {},
	    dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
		this._fragment.p(changed, this._state);
		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}
}

function _mount(target, anchor) {
	this._fragment.m(target, anchor);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || a && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' || typeof a === 'function';
}

function blankObject() {
	return Object.create(null);
}

function callAll(fns) {
	while (fns && fns.length) {
		fns.shift()();
	}
}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}
exports.default = SvelteComponent;
},{}],17:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* generated by Svelte v1.56.0 */

var methods = {

	// Resets the form to a fresh state
	resetForm: function resetForm() {
		document.getElementById('gform').style.display = 'block'; // show form
		document.getElementById('thankyou_message').style.display = 'none'; // hide thank you message
		document.getElementById('gform').reset(); // resets form
	},


	// Submits the form data to be captured by google doc
	submitForm: function submitForm(event) {

		var remoteURL = "https://script.google.com/macros/s/AKfycbwaxF3dAHwo3zE_7Z-DkT19KIU1x_FTxG9Ae4LuVecfyXbFVHA/exec";

		var isValidEmail = function isValidEmail(email) {
			var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			return re.test(email);
		};

		var isBot = function isBot(honeypot) {
			return honeypot;
		};

		var getFormData = function getFormData() {
			var elements = document.getElementById("gform").elements; // all form elements
			var fields = Object.keys(elements).map(function (k) {
				if (elements[k].name !== undefined) {
					return elements[k].name;
					// special case for Edge's html collection
				} else if (elements[k].length > 0) {
					return elements[k].item(0).name;
				}
			}).filter(function (item, pos, self) {
				return self.indexOf(item) == pos && item;
			});

			var data = {};
			fields.forEach(function (k) {
				data[k] = elements[k].value;
				var str = ""; // declare empty string outside of loop to allow
				// it to be appended to for each item in the loop
				if (elements[k].type === "checkbox") {
					// special case for Edge's html collection
					str = str + elements[k].checked + ", "; // take the string and append 
					// the current checked value to 
					// the end of it, along with 
					// a comma and a space
					data[k] = str.slice(0, -2); // remove the last comma and space 
					// from the  string to make the output 
					// prettier in the spreadsheet
				} else if (elements[k].length) {
					for (var i = 0; i < elements[k].length; i++) {
						if (elements[k].item(i).checked) {
							str = str + elements[k].item(i).value + ", "; // same as above
							data[k] = str.slice(0, -2);
						}
					}
				}
			});

			return data;
		};

		var handleFormSubmission = function handleFormSubmission(event) {
			event.preventDefault(); // we are submitting via xhr below
			var data = getFormData(); // get the values submitted in the form

			if (isBot(data.honeypot)) return false; //if honeypot field is filled, form will not be submitted

			if (!isValidEmail(data.email)) {
				// if email is not valid show error
				document.getElementById("Email").style.display = 'block';
				return false;
			} else {
				var xhr = new XMLHttpRequest();
				xhr.open('POST', remoteURL);
				// xhr.withCredentials = true
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onreadystatechange = function () {
					//console.log(xhr.status, xhr.statusText)
					//console.log(xhr.responseText);
					document.getElementById('gform').style.display = 'none'; // hide form
					document.getElementById('thankyou_message').style.display = 'block';
					return;
				};
				// url encode form data for sending as post data
				var encoded = Object.keys(data).map(function (k) {
					return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
				}).join('&');
				xhr.send(encoded);
			}
		};

		handleFormSubmission(event);
	}
};

function create_main_fragment(component, state) {
	var div, div_1, div_2, text_8, div_4, div_5, text_10, p_2, strong, text_12, a, text_15, form;

	function click_handler(event) {
		component.resetForm();
	}

	function submit_handler(event) {
		component.submitForm(event);
	}

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			div_2 = createElement("div");
			div_2.innerHTML = "<div class=\"icon\"><i class=\"far fa-plus-square\" aria-hidden=\"true\"></i></div>\n            <h4>Contribute</h4>\n            <p>Help others discover digital learning by telling us about the apps you use and the people you meet.</p>\n            <p class=\"instruction\">Complete the form below and we'll be in touch to discuss creating a custom card for your suggestion.</p>";
			text_8 = createText("\n        ");
			div_4 = createElement("div");
			div_5 = createElement("div");
			div_5.innerHTML = "<i class=\"fa fa-thumbs-o-up\" aria-hidden=\"true\"></i>";
			text_10 = createText("\n            ");
			p_2 = createElement("p");
			strong = createElement("strong");
			strong.textContent = "Alright! ";
			text_12 = createText("Thanks for making a suggestion. ");
			a = createElement("a");
			a.textContent = "Click here to make another.";
			text_15 = createText("\n        ");
			form = createElement("form");
			form.innerHTML = "<div class=\"form-group\"><label for=\"name\">Name:</label>\n                <input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\" aria-describedby=\"emailHelp\" placeholder=\"\"></div>\n            <div class=\"form-group\"><label for=\"email\">Email address:</label>\n                <input type=\"email\" class=\"form-control\" id=\"email\" name=\"email\" aria-describedby=\"emailHelp\" placeholder=\"\"></div>\n            <div class=\"form-group\"><label for=\"location\">School/Faculty/Directorate:</label>\n            <input class=\"form-control\" id=\"location\" name=\"location\" aria-describedby=\"emailHelp\" placeholder=\"\"></div>\n            <div class=\"form-group\"><label for=\"message\">App, Theory or Method suggestions:</label>\n                <textarea class=\"form-control\" id=\"message\" name=\"message\" rows=\"3\"></textarea></div>\n            <div class=\"form-group\"><label class=\"sr-only\">Keep this field blank</label>\n                <input id=\"honeypot\" type=\"text\" name=\"honeypot\" value=\"\"></div>\n            <button type=\"submit\" class=\"btn btn-block submitbutton\">Submit</button>";
			this.h();
		},

		h: function hydrate() {
			div_2.className = "bs-callout bs-callout-contribute clearfix";
			div_5.className = "icon";
			a.href = "#";
			addListener(a, "click", click_handler);
			div_4.className = "bs-callout bs-thanks clearfix";
			div_4.id = "thankyou_message";
			form.id = "gform";
			addListener(form, "submit", submit_handler);
			div_1.className = "col-md-12";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(div_2, div_1);
			appendNode(text_8, div_1);
			appendNode(div_4, div_1);
			appendNode(div_5, div_4);
			appendNode(text_10, div_4);
			appendNode(p_2, div_4);
			appendNode(strong, p_2);
			appendNode(text_12, p_2);
			appendNode(a, p_2);
			appendNode(text_15, div_1);
			appendNode(form, div_1);
		},

		p: noop,

		u: function unmount() {
			detachNode(div);
		},

		d: function destroy() {
			removeListener(a, "click", click_handler);
			removeListener(form, "submit", submit_handler);
		}
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign({}, options.data);

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);
	}
}

assign(SvelteComponent.prototype, methods, {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount,
	_differs: _differs
});

SvelteComponent.prototype._recompute = noop;

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function noop() {}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function init(component, options) {
	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function assign(target) {
	var k,
	    source,
	    i = 1,
	    len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) {
			target[k] = source[k];
		}
	}

	return target;
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function observe(key, callback, options) {
	var group = options && options.defer ? this._observers.post : this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function cancel() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function cancel() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
	    changed = {},
	    dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
		this._fragment.p(changed, this._state);
		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}
}

function _mount(target, anchor) {
	this._fragment.m(target, anchor);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || a && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' || typeof a === 'function';
}

function blankObject() {
	return Object.create(null);
}

function callAll(fns) {
	while (fns && fns.length) {
		fns.shift()();
	}
}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}
exports.default = SvelteComponent;
},{}],18:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* generated by Svelte v1.56.0 */

function create_main_fragment(component, state) {
	var div;

	return {
		c: function create() {
			div = createElement("div");
			div.innerHTML = "<div class=\"col-md-12\"><div class=\"bs-callout bs-callout-about clearfix\"><div class=\"icon\"><i class=\"fas fa-info\" aria-hidden=\"true\"></i></div>\n\n            <h4>About</h4>\n            <p>This work is licensed under a <a rel=\"license\" href=\"http://creativecommons.org/licenses/by-nc/4.0/\" target=\"_blank\">Creative Commons Attribution-NonCommercial 4.0 International License</a>.</p>\n            <p>All resources are freely available via <a href=\"https://github.com/humsstel/tel_cards\" target=\"_blank\">this GitHub repository</a>.</p>\n            <p>Produced by <a href=\"https://www.twitter.com/danielharding\" target=\"_blank\">Dan Harding</a>, <a href=\"https://www.twitter.com/Matthew_Street\" target=\"_blank\">Matthew Street</a> and <a href=\"https://www.twitter.com/confusedmatrix\" target=\"_blank\">Chris Briggs</a> at <a href=\"https://www.keele.ac.uk\" target=\"_blank\">Keele University</a>, UK. <a href=\"https://twitter.com/morphospace\" target=\"_blank\">Phil Devine</a> at <a href=\"http://www.lancaster.ac.uk/\" target=\"_blank\">Lancaster University</a></p>\n            <a rel=\"license\" href=\"http://creativecommons.org/licenses/by-nc/4.0/\" target=\"_blank\"><img alt=\"Creative Commons License\" class=\"creativecommons\" style=\"border-width: 0\" src=\"https://i.creativecommons.org/l/by-nc/4.0/88x31.png\"></a><br></div></div>";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
		},

		p: noop,

		u: function unmount() {
			detachNode(div);
		},

		d: noop
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign({}, options.data);

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);
	}
}

assign(SvelteComponent.prototype, {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount,
	_differs: _differs
});

SvelteComponent.prototype._recompute = noop;

function createElement(name) {
	return document.createElement(name);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function noop() {}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function init(component, options) {
	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function assign(target) {
	var k,
	    source,
	    i = 1,
	    len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) {
			target[k] = source[k];
		}
	}

	return target;
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function observe(key, callback, options) {
	var group = options && options.defer ? this._observers.post : this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function cancel() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function cancel() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
	    changed = {},
	    dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
		this._fragment.p(changed, this._state);
		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}
}

function _mount(target, anchor) {
	this._fragment.m(target, anchor);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || a && (typeof a === "undefined" ? "undefined" : _typeof(a)) === 'object' || typeof a === 'function';
}

function blankObject() {
	return Object.create(null);
}

function callAll(fns) {
	while (fns && fns.length) {
		fns.shift()();
	}
}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}
exports.default = SvelteComponent;
},{}],19:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* generated by Svelte v1.56.0 */

function data() {

	return {
		// Set the card to unflipped state by default
		flipped: false
	};
};

var methods = {
	rotateCardFrontav: function rotateCardFrontav(e, i) {

		document.getElementById("frontface").style.display = "none";
		document.getElementById("backface").style.display = "block";
		this.set({ flipped: !this.get('flipped') });
		document.getElementById("srcCardVideo").src = e;
		document.getElementById("id-" + i).load();
		//this.set({ flipped: true });
	},
	rotateCardBackav: function rotateCardBackav() {

		var myVideoac = document.getElementById("embedVideo-ac");
		var myVideo = document.getElementById("embedVideo");
		if (myVideoac) {
			$(myVideoac).attr("src", $(myVideoac).attr("src"));
		}
		if (myVideo) {
			$(myVideo).attr("src", $(myVideo).attr("src"));
		}

		document.getElementById("backface").style.display = "none";
		document.getElementById("frontface").style.display = "block";
		this.set({ flipped: !this.get('flipped') });
	},
	copycardurlac: function copycardurlac(n) {
		var copyTextac = document.getElementById("copyurlac_" + n);
		copyTextac.select();
		document.execCommand("copy");
	},
	getTagCat: function getTagCat(e) {
		// new phild condition to stop wall filter
		var myEle = document.getElementById("wall");
		if (myEle) {} else {
			this.store.set({ currentPage: 'catalogue' });
			var element = e.target.innerHTML;
			this.store.loadStaticActivity(element);
		}
	},
	settooltip: function settooltip(e) {
		var myID = "#" + e;
		var title = $("#" + e).attr("value");
		//$(myID).tooltip('hide').attr('data-original-title', title).tooltip('show');
	}
};

function oncreate() {
	var _this = this;

	// What the currentCard variable for changes
	this.store.observe('currentCard', function (res) {
		// Child is positioned absolutely, so this forces container to fill height of child on re-render
		setTimeout(function () {
			$(function () {
				//$('[data-toggle="tooltip"]').tooltip()
				//$('[data-toggle="tooltip"]').tooltip({container: '.wall-cards'})
			});
		}, 20);

		// When the current card changes make sure the card is in the unflipped state
		_this.set({ flipped: false });
	});
};

function create_main_fragment(component, state) {
	var div,
	    style,
	    text,
	    text_1_value = state.card.id,
	    text_1,
	    text_2,
	    text_3_value = state.card.colour,
	    text_3,
	    text_4,
	    text_5_value = state.card.id,
	    text_5,
	    text_6,
	    text_7_value = state.card.assets.cover.styles,
	    text_7,
	    text_8,
	    text_9_value = state.card.id,
	    text_9,
	    text_10,
	    text_11_value = state.card.assets.logo.image,
	    text_11,
	    text_12,
	    text_13_value = state.card.assets.logo.styles,
	    text_13,
	    text_14,
	    text_15,
	    div_1,
	    div_2,
	    div_3,
	    div_4,
	    text_20,
	    div_6,
	    div_7,
	    h1,
	    text_21_value = state.card.name,
	    text_21,
	    text_22,
	    h2,
	    text_23_value = state.card.tagline,
	    text_23,
	    text_26,
	    div_8,
	    p,
	    text_27_value = state.card.description,
	    text_27,
	    text_28,
	    a,
	    text_29_value = state.card.urltext,
	    text_29,
	    a_href_value,
	    text_30,
	    button_1,
	    button_1_name_value,
	    text_32,
	    input,
	    input_value_value,
	    input_id_value,
	    text_34,
	    div_9,
	    div_10,
	    h3,
	    text_35,
	    i_1,
	    text_38,
	    div_11,
	    H4,
	    text_39,
	    i_2,
	    text_42,
	    div_12,
	    div_13,
	    text_44,
	    div_14,
	    p_1,
	    b,
	    br,
	    text_46_value = state.card.submitter.name,
	    text_46,
	    span,
	    text_47,
	    text_48_value = state.card.submitter.title,
	    text_48,
	    text_52,
	    div_15,
	    text_58,
	    div_17,
	    div_18,
	    text_63,
	    div_20,
	    div_21,
	    div_22,
	    iframe,
	    iframe_src_value,
	    text_67,
	    div_23,
	    p_2,
	    text_68_value = state.card.frameworkheaders.one,
	    text_68,
	    text_69,
	    p_3,
	    text_70_value = state.card.frameworkheaders.two,
	    text_70,
	    text_72,
	    div_24,
	    div_25,
	    h2_1,
	    i_6,
	    i_6_class_value,
	    text_73,
	    p_4,
	    strong,
	    text_74_value = state.card.frameworktitles.one,
	    text_74,
	    text_76,
	    div_26,
	    p_5,
	    text_77_value = state.card.framework.commentary_a,
	    text_77,
	    text_79,
	    div_27,
	    h2_2,
	    i_7,
	    i_7_class_value,
	    text_80,
	    p_6,
	    strong_1,
	    text_81_value = state.card.frameworktitles.two,
	    text_81,
	    text_83,
	    div_28,
	    p_7,
	    text_84_value = state.card.framework.commentary_b,
	    text_84,
	    text_86,
	    div_29,
	    h2_3,
	    i_8,
	    i_8_class_value,
	    text_87,
	    p_8,
	    strong_2,
	    text_88_value = state.card.frameworktitles.three,
	    text_88,
	    text_90,
	    div_30,
	    p_9,
	    text_91_value = state.card.framework.commentary_c,
	    text_91,
	    text_94,
	    div_31,
	    div_2_class_value,
	    div_class_value;

	function click_handler(event) {
		var state = component.get();
		component.rotateCardFrontav(state.card.videoURL, state.card.id);
	}

	function click_handler_1(event) {
		component.copycardurlac(button_1.name);
	}

	var activities = state.card.activities;

	var each_blocks = [];

	for (var i_10 = 0; i_10 < activities.length; i_10 += 1) {
		each_blocks[i_10] = create_each_block(component, assign({}, state, {
			activity: activities[i_10],
			i: i_10
		}));
	}

	var uses = state.card.uses;

	var each_1_blocks = [];

	for (var i_10 = 0; i_10 < uses.length; i_10 += 1) {
		each_1_blocks[i_10] = create_each_block_1(component, assign({}, state, {
			use: uses[i_10],
			use_index: i_10
		}));
	}

	function click_handler_2(event) {
		var state = component.get();
		component.store.loadRandomCard(state.card.id, state.card.activities);
	}

	function click_handler_3(event) {
		component.rotateCardBackav();
	}

	function click_handler_4(event) {
		var state = component.get();
		component.store.loadRandomCard(state.card.id);
	}

	return {
		c: function create() {
			div = createElement("div");
			style = createElement("style");
			text = createText(".");
			text_1 = createText(text_1_value);
			text_2 = createText(" .cardflipper, .nextcard:hover {\n            background-color: ");
			text_3 = createText(text_3_value);
			text_4 = createText(";\n        }\n        .");
			text_5 = createText(text_5_value);
			text_6 = createText(" .titlebarfront-av {\n            background: linear-gradient(\n                rgba(52, 58, 64, 0.9) 0%, \n                rgba(52, 58, 64, 0.9) 95%\n            );\n            ");
			text_7 = createText(text_7_value);
			text_8 = createText("\n        }\n        .");
			text_9 = createText(text_9_value);
			text_10 = createText(" .smalllogo {\n            background-image: url(");
			text_11 = createText(text_11_value);
			text_12 = createText(");\n            ");
			text_13 = createText(text_13_value);
			text_14 = createText("\n        }");
			text_15 = createText("\n    \n    ");
			div_1 = createElement("div");
			div_2 = createElement("div");
			div_3 = createElement("div");
			div_4 = createElement("div");
			div_4.innerHTML = "<div><i class=\"fas fa-redo-alt\" aria-hidden=\"false\"></i>\n<button class=\"sub-button\" title=\"select to access information on back of card\">Flip card</button></div>";
			text_20 = createText("\n                ");
			div_6 = createElement("div");
			div_7 = createElement("div");
			h1 = createElement("h1");
			text_21 = createText(text_21_value);
			text_22 = createText("\n                    ");
			h2 = createElement("h2");
			text_23 = createText(text_23_value);
			text_26 = createText("\n                ");
			div_8 = createElement("div");
			p = createElement("p");
			text_27 = createText(text_27_value);
			text_28 = createText("\n                    ");
			a = createElement("a");
			text_29 = createText(text_29_value);
			text_30 = createText("\n                    ");
			button_1 = createElement("button");
			button_1.textContent = "copy url";
			text_32 = createText("\n                    ");
			input = createElement("input");
			text_34 = createText("\n                ");
			div_9 = createElement("div");
			div_10 = createElement("div");
			h3 = createElement("h3");

			for (var i_10 = 0; i_10 < each_blocks.length; i_10 += 1) {
				each_blocks[i_10].c();
			}

			text_35 = createText("\n");
			i_1 = createElement("i");
			text_38 = createText("\n                    ");
			div_11 = createElement("div");
			H4 = createElement("H4");

			for (var i_10 = 0; i_10 < each_1_blocks.length; i_10 += 1) {
				each_1_blocks[i_10].c();
			}

			text_39 = createText(" \n                        ");
			i_2 = createElement("i");
			text_42 = createText("\n                    \n                    ");
			div_12 = createElement("div");
			div_13 = createElement("div");
			div_13.innerHTML = "<i class=\"far fa-user\" aria-hidden=\"true\"></i>";
			text_44 = createText("\n                        \n                        ");
			div_14 = createElement("div");
			p_1 = createElement("p");
			b = createElement("b");
			b.textContent = "Submitted by";
			br = createElement("br");
			text_46 = createText(text_46_value);
			span = createElement("span");
			text_47 = createText(" | ");
			text_48 = createText(text_48_value);
			text_52 = createText("\n                ");
			div_15 = createElement("div");
			div_15.innerHTML = "<div><i class=\"fas fa-magic\" aria-hidden=\"true\"></i>\n                      <button class=\"sub-button\" title=\"Random selection, select to Try another card\">Try another card</button></div>";
			text_58 = createText("\n            \n            \n\n            ");
			div_17 = createElement("div");
			div_18 = createElement("div");
			div_18.innerHTML = "<div><i class=\"fas fa-redo-alt\" aria-hidden=\"false\"></i> \n<button class=\"sub-button\" title=\"select to access information on front of card\">Flip card</button></div>";
			text_63 = createText("\n                \n                \n                ");
			div_20 = createElement("div");
			div_21 = createElement("div");
			div_22 = createElement("div");
			iframe = createElement("iframe");
			text_67 = createText(" \n                \n                \n                \n                \n                ");
			div_23 = createElement("div");
			p_2 = createElement("p");
			text_68 = createText(text_68_value);
			text_69 = createText("\n                    ");
			p_3 = createElement("p");
			text_70 = createText(text_70_value);
			text_72 = createText("\n                ");
			div_24 = createElement("div");
			div_25 = createElement("div");
			h2_1 = createElement("h2");
			i_6 = createElement("i");
			text_73 = createText("\n                        ");
			p_4 = createElement("p");
			strong = createElement("strong");
			text_74 = createText(text_74_value);
			text_76 = createText("\n                    ");
			div_26 = createElement("div");
			p_5 = createElement("p");
			text_77 = createText(text_77_value);
			text_79 = createText("\n                    ");
			div_27 = createElement("div");
			h2_2 = createElement("h2");
			i_7 = createElement("i");
			text_80 = createText("\n                        ");
			p_6 = createElement("p");
			strong_1 = createElement("strong");
			text_81 = createText(text_81_value);
			text_83 = createText("\n                    ");
			div_28 = createElement("div");
			p_7 = createElement("p");
			text_84 = createText(text_84_value);
			text_86 = createText("\n                    ");
			div_29 = createElement("div");
			h2_3 = createElement("h2");
			i_8 = createElement("i");
			text_87 = createText("\n                        ");
			p_8 = createElement("p");
			strong_2 = createElement("strong");
			text_88 = createText(text_88_value);
			text_90 = createText("\n                    ");
			div_30 = createElement("div");
			p_9 = createElement("p");
			text_91 = createText(text_91_value);
			text_94 = createText("\n                ");
			div_31 = createElement("div");
			div_31.innerHTML = "<div><i class=\"fas fa-magic\" aria-hidden=\"\"></i>  <button class=\"sub-button\" title=\"Random selection, select to Try another card\">Try another card</button></div>";
			this.h();
		},

		h: function hydrate() {
			style.type = "text/css";
			div_4.className = "cardflipper";
			setAttribute(div_4, "role", "button");
			div_4.title = "select to access back for card";
			addListener(div_4, "click", click_handler);
			div_7.className = "apptitle-av";
			div_6.className = "titlebarfront-av";
			p.className = "card-text-ac";
			a.className = "tool-link";
			a.href = a_href_value = state.card.url;
			a.target = "_blank";
			button_1.id = "copybtnac";
			button_1.className = "copy-url";
			setStyle(button_1, "float", "right");
			button_1.dataset.toggle = '';
			button_1.name = button_1_name_value = state.card.id;
			button_1.title = "Click to copy this cards unique URL to your clipboard";
			setAttribute(button_1, "aria-hidden", "false");
			addListener(button_1, "click", click_handler_1);
			input.className = '';
			setAttribute(input, "aria-hidden", "true");
			input.type = "text";
			setStyle(input, "position", "absolute");
			setStyle(input, "left", "-2000px");
			input.value = input_value_value = "https://www.lancaster.ac.uk/staff/devinep/ctel/?cardid=" + state.card.id;
			input.id = input_id_value = "copyurlac_" + state.card.id;
			div_8.className = "card-body";
			i_1.className = "far fa-question-circle";
			i_1.dataset.toggle = '';
			i_1.dataset.placement = "top";
			i_1.title = "activities or subjects domains this card support";
			setAttribute(i_1, "aria-hidden", "true");
			div_10.className = "pills-main";
			div_10.title = "tags area: activities or subjects domains this card support";
			i_2.className = "far fa-question-circle";
			i_2.dataset.toggle = '';
			i_2.dataset.placement = "top";
			i_2.title = "Examples of how this app can be used";
			setAttribute(i_2, "aria-hidden", "true");
			div_11.className = "pills-sub";
			div_13.className = "submitterimg";
			span.className = "submitterschool-ac";
			p_1.className = "small";
			div_14.className = "submitterinfo";
			div_12.className = "submitter-ac";
			div_9.className = "details";
			div_15.className = "nextcard";
			setAttribute(div_15, "role", "button");
			addListener(div_15, "click", click_handler_2);
			div_3.id = "frontface";
			div_3.className = "front face";
			div_18.className = "cardflipper";
			setAttribute(div_18, "role", "button");
			addListener(div_18, "click", click_handler_3);
			iframe.id = "embedVideo-ac";
			iframe.className = "embed-responsive-item youtube";
			iframe.src = iframe_src_value = state.card.videoURL;
			setAttribute(iframe, "frameborder", "0");
			iframe.allowFullscreen = true;
			div_22.className = "embed-responsive embed-responsive-16by9";
			div_21.className = "videocontainer";
			div_20.className = "mediabackground";
			p_2.className = "frameworktext1";
			p_3.className = "frameworktext2";
			div_23.className = "frameworkheading";
			i_6.className = i_6_class_value = "fas " + state.card.frameworkicons.one + " usesimage";
			setAttribute(i_6, "aria-hidden", "true");
			div_25.className = "thermometer thermometer1";
			div_26.className = "usestext usestext1";
			i_7.className = i_7_class_value = "fas " + state.card.frameworkicons.two;
			setAttribute(i_7, "aria-hidden", "true");
			div_27.className = "thermometer thermometer2";
			div_28.className = "usestext usestext2";
			i_8.className = i_8_class_value = "fas " + state.card.frameworkicons.three + " usesimage";
			setAttribute(i_8, "aria-hidden", "true");
			div_29.className = "thermometer thermometer3";
			div_30.className = "usestext usestext3";
			div_24.className = "card-body framework";
			div_31.className = "nextcard";
			setAttribute(div_31, "role", "button");
			addListener(div_31, "click", click_handler_4);
			div_17.id = "backface";
			div_17.className = "back face hide";
			div_2.className = div_2_class_value = "app-card-av card noborder " + state.card.id;
			div_1.className = "card-container";
			div.className = div_class_value = "manual-flip-av " + (state.flipped ? 'hover' : '');
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(style, div);
			appendNode(text, style);
			appendNode(text_1, style);
			appendNode(text_2, style);
			appendNode(text_3, style);
			appendNode(text_4, style);
			appendNode(text_5, style);
			appendNode(text_6, style);
			appendNode(text_7, style);
			appendNode(text_8, style);
			appendNode(text_9, style);
			appendNode(text_10, style);
			appendNode(text_11, style);
			appendNode(text_12, style);
			appendNode(text_13, style);
			appendNode(text_14, style);
			appendNode(text_15, div);
			appendNode(div_1, div);
			appendNode(div_2, div_1);
			appendNode(div_3, div_2);
			appendNode(div_4, div_3);
			appendNode(text_20, div_3);
			appendNode(div_6, div_3);
			appendNode(div_7, div_6);
			appendNode(h1, div_7);
			appendNode(text_21, h1);
			appendNode(text_22, div_7);
			appendNode(h2, div_7);
			appendNode(text_23, h2);
			appendNode(text_26, div_3);
			appendNode(div_8, div_3);
			appendNode(p, div_8);
			appendNode(text_27, p);
			appendNode(text_28, div_8);
			appendNode(a, div_8);
			appendNode(text_29, a);
			appendNode(text_30, div_8);
			appendNode(button_1, div_8);
			appendNode(text_32, div_8);
			appendNode(input, div_8);
			appendNode(text_34, div_3);
			appendNode(div_9, div_3);
			appendNode(div_10, div_9);
			appendNode(h3, div_10);

			for (var i_10 = 0; i_10 < each_blocks.length; i_10 += 1) {
				each_blocks[i_10].m(h3, null);
			}

			appendNode(text_35, h3);
			appendNode(i_1, h3);
			appendNode(text_38, div_9);
			appendNode(div_11, div_9);
			appendNode(H4, div_11);

			for (var i_10 = 0; i_10 < each_1_blocks.length; i_10 += 1) {
				each_1_blocks[i_10].m(H4, null);
			}

			appendNode(text_39, H4);
			appendNode(i_2, H4);
			appendNode(text_42, div_9);
			appendNode(div_12, div_9);
			appendNode(div_13, div_12);
			appendNode(text_44, div_12);
			appendNode(div_14, div_12);
			appendNode(p_1, div_14);
			appendNode(b, p_1);
			appendNode(br, p_1);
			appendNode(text_46, p_1);
			appendNode(span, p_1);
			appendNode(text_47, span);
			appendNode(text_48, span);
			appendNode(text_52, div_3);
			appendNode(div_15, div_3);
			appendNode(text_58, div_2);
			appendNode(div_17, div_2);
			appendNode(div_18, div_17);
			appendNode(text_63, div_17);
			appendNode(div_20, div_17);
			appendNode(div_21, div_20);
			appendNode(div_22, div_21);
			appendNode(iframe, div_22);
			appendNode(text_67, div_17);
			appendNode(div_23, div_17);
			appendNode(p_2, div_23);
			appendNode(text_68, p_2);
			appendNode(text_69, div_23);
			appendNode(p_3, div_23);
			appendNode(text_70, p_3);
			appendNode(text_72, div_17);
			appendNode(div_24, div_17);
			appendNode(div_25, div_24);
			appendNode(h2_1, div_25);
			appendNode(i_6, h2_1);
			appendNode(text_73, div_25);
			appendNode(p_4, div_25);
			appendNode(strong, p_4);
			appendNode(text_74, strong);
			appendNode(text_76, div_24);
			appendNode(div_26, div_24);
			appendNode(p_5, div_26);
			appendNode(text_77, p_5);
			appendNode(text_79, div_24);
			appendNode(div_27, div_24);
			appendNode(h2_2, div_27);
			appendNode(i_7, h2_2);
			appendNode(text_80, div_27);
			appendNode(p_6, div_27);
			appendNode(strong_1, p_6);
			appendNode(text_81, strong_1);
			appendNode(text_83, div_24);
			appendNode(div_28, div_24);
			appendNode(p_7, div_28);
			appendNode(text_84, p_7);
			appendNode(text_86, div_24);
			appendNode(div_29, div_24);
			appendNode(h2_3, div_29);
			appendNode(i_8, h2_3);
			appendNode(text_87, div_29);
			appendNode(p_8, div_29);
			appendNode(strong_2, p_8);
			appendNode(text_88, strong_2);
			appendNode(text_90, div_24);
			appendNode(div_30, div_24);
			appendNode(p_9, div_30);
			appendNode(text_91, p_9);
			appendNode(text_94, div_17);
			appendNode(div_31, div_17);
		},

		p: function update(changed, state) {
			if (changed.card && text_1_value !== (text_1_value = state.card.id)) {
				text_1.data = text_1_value;
			}

			if (changed.card && text_3_value !== (text_3_value = state.card.colour)) {
				text_3.data = text_3_value;
			}

			if (changed.card && text_5_value !== (text_5_value = state.card.id)) {
				text_5.data = text_5_value;
			}

			if (changed.card && text_7_value !== (text_7_value = state.card.assets.cover.styles)) {
				text_7.data = text_7_value;
			}

			if (changed.card && text_9_value !== (text_9_value = state.card.id)) {
				text_9.data = text_9_value;
			}

			if (changed.card && text_11_value !== (text_11_value = state.card.assets.logo.image)) {
				text_11.data = text_11_value;
			}

			if (changed.card && text_13_value !== (text_13_value = state.card.assets.logo.styles)) {
				text_13.data = text_13_value;
			}

			if (changed.card && text_21_value !== (text_21_value = state.card.name)) {
				text_21.data = text_21_value;
			}

			if (changed.card && text_23_value !== (text_23_value = state.card.tagline)) {
				text_23.data = text_23_value;
			}

			if (changed.card && text_27_value !== (text_27_value = state.card.description)) {
				text_27.data = text_27_value;
			}

			if (changed.card && text_29_value !== (text_29_value = state.card.urltext)) {
				text_29.data = text_29_value;
			}

			if (changed.card && a_href_value !== (a_href_value = state.card.url)) {
				a.href = a_href_value;
			}

			if (changed.card && button_1_name_value !== (button_1_name_value = state.card.id)) {
				button_1.name = button_1_name_value;
			}

			if (changed.card && input_value_value !== (input_value_value = "https://www.lancaster.ac.uk/staff/devinep/ctel/?cardid=" + state.card.id)) {
				input.value = input_value_value;
			}

			if (changed.card && input_id_value !== (input_id_value = "copyurlac_" + state.card.id)) {
				input.id = input_id_value;
			}

			var activities = state.card.activities;

			if (changed.card) {
				for (var i_10 = 0; i_10 < activities.length; i_10 += 1) {
					var each_context = assign({}, state, {
						activity: activities[i_10],
						i: i_10
					});

					if (each_blocks[i_10]) {
						each_blocks[i_10].p(changed, each_context);
					} else {
						each_blocks[i_10] = create_each_block(component, each_context);
						each_blocks[i_10].c();
						each_blocks[i_10].m(h3, text_35);
					}
				}

				for (; i_10 < each_blocks.length; i_10 += 1) {
					each_blocks[i_10].u();
					each_blocks[i_10].d();
				}
				each_blocks.length = activities.length;
			}

			var uses = state.card.uses;

			if (changed.card) {
				for (var i_10 = 0; i_10 < uses.length; i_10 += 1) {
					var each_1_context = assign({}, state, {
						use: uses[i_10],
						use_index: i_10
					});

					if (each_1_blocks[i_10]) {
						each_1_blocks[i_10].p(changed, each_1_context);
					} else {
						each_1_blocks[i_10] = create_each_block_1(component, each_1_context);
						each_1_blocks[i_10].c();
						each_1_blocks[i_10].m(H4, text_39);
					}
				}

				for (; i_10 < each_1_blocks.length; i_10 += 1) {
					each_1_blocks[i_10].u();
					each_1_blocks[i_10].d();
				}
				each_1_blocks.length = uses.length;
			}

			if (changed.card && text_46_value !== (text_46_value = state.card.submitter.name)) {
				text_46.data = text_46_value;
			}

			if (changed.card && text_48_value !== (text_48_value = state.card.submitter.title)) {
				text_48.data = text_48_value;
			}

			if (changed.card && iframe_src_value !== (iframe_src_value = state.card.videoURL)) {
				iframe.src = iframe_src_value;
			}

			if (changed.card && text_68_value !== (text_68_value = state.card.frameworkheaders.one)) {
				text_68.data = text_68_value;
			}

			if (changed.card && text_70_value !== (text_70_value = state.card.frameworkheaders.two)) {
				text_70.data = text_70_value;
			}

			if (changed.card && i_6_class_value !== (i_6_class_value = "fas " + state.card.frameworkicons.one + " usesimage")) {
				i_6.className = i_6_class_value;
			}

			if (changed.card && text_74_value !== (text_74_value = state.card.frameworktitles.one)) {
				text_74.data = text_74_value;
			}

			if (changed.card && text_77_value !== (text_77_value = state.card.framework.commentary_a)) {
				text_77.data = text_77_value;
			}

			if (changed.card && i_7_class_value !== (i_7_class_value = "fas " + state.card.frameworkicons.two)) {
				i_7.className = i_7_class_value;
			}

			if (changed.card && text_81_value !== (text_81_value = state.card.frameworktitles.two)) {
				text_81.data = text_81_value;
			}

			if (changed.card && text_84_value !== (text_84_value = state.card.framework.commentary_b)) {
				text_84.data = text_84_value;
			}

			if (changed.card && i_8_class_value !== (i_8_class_value = "fas " + state.card.frameworkicons.three + " usesimage")) {
				i_8.className = i_8_class_value;
			}

			if (changed.card && text_88_value !== (text_88_value = state.card.frameworktitles.three)) {
				text_88.data = text_88_value;
			}

			if (changed.card && text_91_value !== (text_91_value = state.card.framework.commentary_c)) {
				text_91.data = text_91_value;
			}

			if (changed.card && div_2_class_value !== (div_2_class_value = "app-card-av card noborder " + state.card.id)) {
				div_2.className = div_2_class_value;
			}

			if (changed.flipped && div_class_value !== (div_class_value = "manual-flip-av " + (state.flipped ? 'hover' : ''))) {
				div.className = div_class_value;
			}
		},

		u: function unmount() {
			detachNode(div);

			for (var i_10 = 0; i_10 < each_blocks.length; i_10 += 1) {
				each_blocks[i_10].u();
			}

			for (var i_10 = 0; i_10 < each_1_blocks.length; i_10 += 1) {
				each_1_blocks[i_10].u();
			}
		},

		d: function destroy() {
			removeListener(div_4, "click", click_handler);
			removeListener(button_1, "click", click_handler_1);

			destroyEach(each_blocks);

			destroyEach(each_1_blocks);

			removeListener(div_15, "click", click_handler_2);
			removeListener(div_18, "click", click_handler_3);
			removeListener(div_31, "click", click_handler_4);
		}
	};
}

// (53:0) {{#each card.activities as activity, i}}
function create_each_block(component, state) {
	var activity = state.activity,
	    i = state.i;
	var span,
	    text_value = state.card.activities[i].name,
	    text,
	    text_1,
	    span_1,
	    button,
	    text_2_value = activity.name,
	    text_2,
	    button_title_value,
	    span_1_id_value,
	    span_1_value_value,
	    span_1_class_value,
	    span_1_name_value,
	    span_1_title_value,
	    text_4;

	return {
		c: function create() {
			span = createElement("span");
			text = createText(text_value);
			text_1 = createText("\n    \n");
			span_1 = createElement("span");
			button = createElement("button");
			text_2 = createText(text_2_value);
			text_4 = createText(" ");
			this.h();
		},

		h: function hydrate() {
			span.id = "mytag";
			setStyle(span, "display", "none");
			button.className = "sub-button";
			button.title = button_title_value = "tag name is " + activity.name + " select to move to card Catalogue";
			span_1.id = span_1_id_value = "" + state.card.id + "_" + state.card.activities[i].name;
			setAttribute(span_1, "value", span_1_value_value = state.card.activities[i].description);
			span_1.className = span_1_class_value = "badge activity " + activity.name;
			span_1.dataset.toggle = '';
			span_1.dataset.placement = "top";
			setAttribute(span_1, "name", span_1_name_value = activity.name);
			span_1.title = span_1_title_value = activity.description;
			setAttribute(span_1, "aria-hidden", "true");
			addListener(span_1, "click", click_handler);

			span_1._svelte = {
				component: component
			};
		},

		m: function mount(target, anchor) {
			insertNode(span, target, anchor);
			appendNode(text, span);
			insertNode(text_1, target, anchor);
			insertNode(span_1, target, anchor);
			appendNode(button, span_1);
			appendNode(text_2, button);
			insertNode(text_4, target, anchor);
		},

		p: function update(changed, state) {
			activity = state.activity;
			i = state.i;
			if (changed.card && text_value !== (text_value = state.card.activities[i].name)) {
				text.data = text_value;
			}

			if (changed.card && text_2_value !== (text_2_value = activity.name)) {
				text_2.data = text_2_value;
			}

			if (changed.card && button_title_value !== (button_title_value = "tag name is " + activity.name + " select to move to card Catalogue")) {
				button.title = button_title_value;
			}

			if (changed.card && span_1_id_value !== (span_1_id_value = "" + state.card.id + "_" + state.card.activities[i].name)) {
				span_1.id = span_1_id_value;
			}

			if (changed.card && span_1_value_value !== (span_1_value_value = state.card.activities[i].description)) {
				setAttribute(span_1, "value", span_1_value_value);
			}

			if (changed.card && span_1_class_value !== (span_1_class_value = "badge activity " + activity.name)) {
				span_1.className = span_1_class_value;
			}

			if (changed.card && span_1_name_value !== (span_1_name_value = activity.name)) {
				setAttribute(span_1, "name", span_1_name_value);
			}

			if (changed.card && span_1_title_value !== (span_1_title_value = activity.description)) {
				span_1.title = span_1_title_value;
			}
		},

		u: function unmount() {
			detachNode(span);
			detachNode(text_1);
			detachNode(span_1);
			detachNode(text_4);
		},

		d: function destroy() {
			removeListener(span_1, "click", click_handler);
		}
	};
}

// (69:24) {{#each card.uses as use}}
function create_each_block_1(component, state) {
	var use = state.use,
	    use_index = state.use_index;
	var span,
	    text_value = use,
	    text,
	    text_2;

	return {
		c: function create() {
			span = createElement("span");
			text = createText(text_value);
			text_2 = createText(" ");
			this.h();
		},

		h: function hydrate() {
			span.className = "badge sub";
		},

		m: function mount(target, anchor) {
			insertNode(span, target, anchor);
			appendNode(text, span);
			insertNode(text_2, target, anchor);
		},

		p: function update(changed, state) {
			use = state.use;
			use_index = state.use_index;
			if (changed.card && text_value !== (text_value = use)) {
				text.data = text_value;
			}
		},

		u: function unmount() {
			detachNode(span);
			detachNode(text_2);
		},

		d: noop
	};
}

function click_handler(event) {
	var component = this._svelte.component;
	component.getTagCat(event);
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign(data(), options.data);

	var _oncreate = oncreate.bind(this);

	if (!options.root) {
		this._oncreate = [];
	}

	this._fragment = create_main_fragment(this, this._state);

	this.root._oncreate.push(_oncreate);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		callAll(this._oncreate);
	}
}

assign(SvelteComponent.prototype, methods, {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount,
	_differs: _differs
});

SvelteComponent.prototype._recompute = noop;

function assign(target) {
	var k,
	    source,
	    i = 1,
	    len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) {
			target[k] = source[k];
		}
	}

	return target;
}

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function setStyle(node, key, value) {
	node.style.setProperty(key, value);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function destroyEach(iterations) {
	for (var i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d();
	}
}

function noop() {}

function init(component, options) {
	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function callAll(fns) {
	while (fns && fns.length) {
		fns.shift()();
	}
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function observe(key, callback, options) {
	var group = options && options.defer ? this._observers.post : this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function cancel() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function cancel() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
	    changed = {},
	    dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
		this._fragment.p(changed, this._state);
		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}
}

function _mount(target, anchor) {
	this._fragment.m(target, anchor);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || a && (typeof a === "undefined" ? "undefined" : _typeof(a)) === 'object' || typeof a === 'function';
}

function blankObject() {
	return Object.create(null);
}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}
exports.default = SvelteComponent;
},{}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* generated by Svelte v1.56.0 */


var _Card = require('./Card.svelte');

var _Card2 = _interopRequireDefault(_Card);

var _Catalogue = require('./Catalogue.svelte');

var _Catalogue2 = _interopRequireDefault(_Catalogue);

var _Contribute = require('./Contribute.svelte');

var _Contribute2 = _interopRequireDefault(_Contribute);

var _About = require('./About.svelte');

var _About2 = _interopRequireDefault(_About);

var _Accessibility = require('./Accessibility.svelte');

var _Accessibility2 = _interopRequireDefault(_Accessibility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function card($cards, $currentCard) {
	return $cards.find(function (card) {
		return card.id === $currentCard;
	});
}

function oncreate() {
	// Child is positioned absolutely, so this forces container to fill height of child
	var childHeight = document.querySelector('.card').scrollHeight;
	document.querySelector('#appgenerator').style.height = childHeight - 150 + 'px';
};

function create_main_fragment(component, state) {
	var div, div_1, ul, li, a, a_class_value, li_1, a_1, a_1_class_value, li_2, a_2, a_2_class_value, li_3, a_3, a_3_class_value, li_4, a_4, a_4_class_value, text_11, div_2, div_3, div_4, div_3_class_value, text_14, div_5, div_5_class_value, text_16, div_6, div_6_class_value, text_18, div_7, div_7_class_value, text_20, div_8, div_9, div_8_class_value;

	function click_handler(event) {
		component.store.set({ currentPage: 'accessibility' });
	}

	function click_handler_1(event) {
		component.store.stopVideo();
	}

	function click_handler_2(event) {
		component.store.set({ currentPage: 'card' });
	}

	function click_handler_3(event) {
		component.store.stopVideo();
	}

	function click_handler_4(event) {
		component.store.set({ currentPage: 'catalogue' });
	}

	function click_handler_5(event) {
		component.store.stopVideo();
	}

	function click_handler_6(event) {
		component.store.set({ currentPage: 'contribute' });
	}

	function click_handler_7(event) {
		component.store.stopVideo();
	}

	function click_handler_8(event) {
		component.store.set({ currentPage: 'about' });
	}

	function click_handler_9(event) {
		component.store.stopVideo();
	}

	var card_1 = new _Card2.default({
		root: component.root,
		data: { card: state.card }
	});

	var catalogue = new _Catalogue2.default({
		root: component.root
	});

	var contribute = new _Contribute2.default({
		root: component.root
	});

	var about = new _About2.default({
		root: component.root
	});

	var accessibility = new _Accessibility2.default({
		root: component.root,
		data: { card: state.card }
	});

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			ul = createElement("ul");
			li = createElement("li");
			a = createElement("a");
			a.innerHTML = "<span class=\"moveme\">accessibility view</span><i class=\"fas fa-universal-access fa-lg\" aria-hidden=\"true\" title=\"accessibility view\"></i>";
			li_1 = createElement("li");
			a_1 = createElement("a");
			a_1.innerHTML = "<span class=\"moveme\">Card View</span><i class=\"fas fa-magic\" aria-hidden=\"true\"></i>";
			li_2 = createElement("li");
			a_2 = createElement("a");
			a_2.innerHTML = "<span class=\"moveme\">catalogue</span><i class=\"far fa-bookmark\" aria-hidden=\"true\"></i>";
			li_3 = createElement("li");
			a_3 = createElement("a");
			a_3.innerHTML = "<span class=\"moveme\">contribute</span><i class=\"far fa-plus-square\" aria-hidden=\"true\"></i>";
			li_4 = createElement("li");
			a_4 = createElement("a");
			a_4.innerHTML = "<span class=\"moveme\">about</span><i class=\"fas fa-info\" aria-hidden=\"true\"></i>";
			text_11 = createText("\n\t");
			div_2 = createElement("div");
			div_3 = createElement("div");
			div_4 = createElement("div");
			card_1._fragment.c();
			text_14 = createText("\n\t\t");
			div_5 = createElement("div");
			catalogue._fragment.c();
			text_16 = createText("\n\t\t");
			div_6 = createElement("div");
			contribute._fragment.c();
			text_18 = createText("\n\t\t");
			div_7 = createElement("div");
			about._fragment.c();
			text_20 = createText("\n        \n        ");
			div_8 = createElement("div");
			div_9 = createElement("div");
			accessibility._fragment.c();
			this.h();
		},

		h: function hydrate() {
			a.tabIndex = "1";
			a.className = a_class_value = "nav-link stop-video " + (state.$currentPage === 'accessibility' ? 'active show' : '');
			a.id = "accessibility-tab";
			a.href = "#accessibility";
			addListener(a, "click", click_handler);
			li.className = "nav-item";
			addListener(li, "click", click_handler_1);
			a_1.tabIndex = "2";
			a_1.className = a_1_class_value = "nav-link " + (state.$currentPage === 'card' ? 'active' : '');
			a_1.id = "app-tab";
			a_1.href = "#appgenerator";
			addListener(a_1, "click", click_handler_2);
			li_1.className = "nav-item";
			addListener(li_1, "click", click_handler_3);
			a_2.tabIndex = "3";
			a_2.className = a_2_class_value = "nav-link " + (state.$currentPage === 'catalogue' ? 'active show' : '');
			a_2.id = "catalogue-tab";
			a_2.href = "#catalogue";
			addListener(a_2, "click", click_handler_4);
			li_2.className = "nav-item";
			addListener(li_2, "click", click_handler_5);
			a_3.tabIndex = "4";
			a_3.className = a_3_class_value = "nav-link " + (state.$currentPage === 'contribute' ? 'active show' : '');
			a_3.id = "contribute-tab";
			a_3.href = "#contribute";
			addListener(a_3, "click", click_handler_6);
			li_3.className = "nav-item";
			addListener(li_3, "click", click_handler_7);
			a_4.tabIndex = "5";
			a_4.className = a_4_class_value = "nav-link " + (state.$currentPage === 'about' ? 'active show' : '');
			a_4.id = "about-tab";
			a_4.href = "#about";
			addListener(a_4, "click", click_handler_8);
			li_4.className = "nav-item";
			addListener(li_4, "click", click_handler_9);
			ul.className = "nav nav-tabs card-header-tabs justify-content-center";
			div_1.className = "card-header";
			setAttribute(div_1, "role", "navigation");
			div_4.className = "container card-holder";
			div_3.className = div_3_class_value = "tab-pane " + (state.$currentPage === 'card' ? 'active show' : '');
			div_3.id = "appgenerator";
			setAttribute(div_3, "role", "tabpanel");
			setAttribute(div_3, "aria-labelledby", "app-tab");
			div_5.className = div_5_class_value = "tab-pane " + (state.$currentPage === 'catalogue' ? 'active show' : '');
			div_5.id = "catalogue";
			setAttribute(div_5, "role", "tabpanel");
			setAttribute(div_5, "aria-labelledby", "catalogue-tab");
			div_6.className = div_6_class_value = "tab-pane " + (state.$currentPage === 'contribute' ? 'active show' : '');
			div_6.id = "contribute";
			setAttribute(div_6, "role", "tabpanel");
			setAttribute(div_6, "aria-labelledby", "contribute-tab");
			div_7.className = div_7_class_value = "tab-pane " + (state.$currentPage === 'about' ? 'active show' : '');
			div_7.id = "about";
			setAttribute(div_7, "role", "tabpanel");
			setAttribute(div_7, "aria-labelledby", "about-tab");
			div_9.className = "container card-holder";
			div_8.className = div_8_class_value = "tab-pane " + (state.$currentPage === 'accessibility' ? 'active show' : '');
			div_8.id = "accessibility";
			setAttribute(div_8, "role", "tabpanel");
			setAttribute(div_8, "aria-labelledby", "accessibility-tab");
			div_2.className = "tab-content";
			div_2.id = "myTabContent";
			div.className = "card mainCard";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(ul, div_1);
			appendNode(li, ul);
			appendNode(a, li);
			appendNode(li_1, ul);
			appendNode(a_1, li_1);
			appendNode(li_2, ul);
			appendNode(a_2, li_2);
			appendNode(li_3, ul);
			appendNode(a_3, li_3);
			appendNode(li_4, ul);
			appendNode(a_4, li_4);
			appendNode(text_11, div);
			appendNode(div_2, div);
			appendNode(div_3, div_2);
			appendNode(div_4, div_3);
			card_1._mount(div_4, null);
			appendNode(text_14, div_2);
			appendNode(div_5, div_2);
			catalogue._mount(div_5, null);
			appendNode(text_16, div_2);
			appendNode(div_6, div_2);
			contribute._mount(div_6, null);
			appendNode(text_18, div_2);
			appendNode(div_7, div_2);
			about._mount(div_7, null);
			appendNode(text_20, div_2);
			appendNode(div_8, div_2);
			appendNode(div_9, div_8);
			accessibility._mount(div_9, null);
		},

		p: function update(changed, state) {
			if (changed.$currentPage && a_class_value !== (a_class_value = "nav-link stop-video " + (state.$currentPage === 'accessibility' ? 'active show' : ''))) {
				a.className = a_class_value;
			}

			if (changed.$currentPage && a_1_class_value !== (a_1_class_value = "nav-link " + (state.$currentPage === 'card' ? 'active' : ''))) {
				a_1.className = a_1_class_value;
			}

			if (changed.$currentPage && a_2_class_value !== (a_2_class_value = "nav-link " + (state.$currentPage === 'catalogue' ? 'active show' : ''))) {
				a_2.className = a_2_class_value;
			}

			if (changed.$currentPage && a_3_class_value !== (a_3_class_value = "nav-link " + (state.$currentPage === 'contribute' ? 'active show' : ''))) {
				a_3.className = a_3_class_value;
			}

			if (changed.$currentPage && a_4_class_value !== (a_4_class_value = "nav-link " + (state.$currentPage === 'about' ? 'active show' : ''))) {
				a_4.className = a_4_class_value;
			}

			var card_1_changes = {};
			if (changed.card) card_1_changes.card = state.card;
			card_1._set(card_1_changes);

			if (changed.$currentPage && div_3_class_value !== (div_3_class_value = "tab-pane " + (state.$currentPage === 'card' ? 'active show' : ''))) {
				div_3.className = div_3_class_value;
			}

			if (changed.$currentPage && div_5_class_value !== (div_5_class_value = "tab-pane " + (state.$currentPage === 'catalogue' ? 'active show' : ''))) {
				div_5.className = div_5_class_value;
			}

			if (changed.$currentPage && div_6_class_value !== (div_6_class_value = "tab-pane " + (state.$currentPage === 'contribute' ? 'active show' : ''))) {
				div_6.className = div_6_class_value;
			}

			if (changed.$currentPage && div_7_class_value !== (div_7_class_value = "tab-pane " + (state.$currentPage === 'about' ? 'active show' : ''))) {
				div_7.className = div_7_class_value;
			}

			var accessibility_changes = {};
			if (changed.card) accessibility_changes.card = state.card;
			accessibility._set(accessibility_changes);

			if (changed.$currentPage && div_8_class_value !== (div_8_class_value = "tab-pane " + (state.$currentPage === 'accessibility' ? 'active show' : ''))) {
				div_8.className = div_8_class_value;
			}
		},

		u: function unmount() {
			detachNode(div);
		},

		d: function destroy() {
			removeListener(a, "click", click_handler);
			removeListener(li, "click", click_handler_1);
			removeListener(a_1, "click", click_handler_2);
			removeListener(li_1, "click", click_handler_3);
			removeListener(a_2, "click", click_handler_4);
			removeListener(li_2, "click", click_handler_5);
			removeListener(a_3, "click", click_handler_6);
			removeListener(li_3, "click", click_handler_7);
			removeListener(a_4, "click", click_handler_8);
			removeListener(li_4, "click", click_handler_9);
			card_1.destroy(false);
			catalogue.destroy(false);
			contribute.destroy(false);
			about.destroy(false);
			accessibility.destroy(false);
		}
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign(this.store._init(["cards", "currentCard", "currentPage"]), options.data);
	this.store._add(this, ["cards", "currentCard", "currentPage"]);
	this._recompute({ $cards: 1, $currentCard: 1 }, this._state);

	this._handlers.destroy = [removeFromStore];

	var _oncreate = oncreate.bind(this);

	if (!options.root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this, this._state);

	this.root._oncreate.push(_oncreate);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign(SvelteComponent.prototype, {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount,
	_differs: _differs
});

SvelteComponent.prototype._recompute = function _recompute(changed, state) {
	if (changed.$cards || changed.$currentCard) {
		if (this._differs(state.card, state.card = card(state.$cards, state.$currentCard))) changed.card = true;
	}
};

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function init(component, options) {
	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function assign(target) {
	var k,
	    source,
	    i = 1,
	    len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) {
			target[k] = source[k];
		}
	}

	return target;
}

function removeFromStore() {
	this.store._remove(this);
}

function callAll(fns) {
	while (fns && fns.length) {
		fns.shift()();
	}
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function observe(key, callback, options) {
	var group = options && options.defer ? this._observers.post : this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function cancel() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function cancel() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
	    changed = {},
	    dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
		this._fragment.p(changed, this._state);
		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}
}

function _mount(target, anchor) {
	this._fragment.m(target, anchor);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || a && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' || typeof a === 'function';
}

function blankObject() {
	return Object.create(null);
}

function noop() {}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}
exports.default = SvelteComponent;
},{"./Card.svelte":15,"./Catalogue.svelte":16,"./Contribute.svelte":17,"./About.svelte":18,"./Accessibility.svelte":19}],20:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* generated by Svelte v1.56.0 */

function create_main_fragment(component, state) {
	var div;

	return {
		c: function create() {
			div = createElement("div");
			div.innerHTML = "<div class=\"col-12\"><div class=\"bs-callout bs-callout-support clearfix\"><div class=\"icon\"><i class=\"far fa-comments\" aria-hidden=\"true\"></i></div>\n            <h4>Support</h4>\n            <p>If you have any questions or issues relating to the apps featured here, please speak to your local learning technology support person.</p> <p>A list of University contacts can be found below.</p></div>\n        <div class=\"contacts-nav\"><ul class=\"nav nav-pills nav-fill\" role=\"tablist\"><li class=\"nav-item\"><a class=\"nav-link active\" href=\"#humss\" role=\"tab\" data-toggle=\"pill\">Center for Technology Enhanced Learning</a></li>\n            </ul>\n            <div class=\"tab-content\"><div role=\"tabpanel\" class=\"tab-pane fade show active\" id=\"humss\"><br>\n                    <div class=\"list-group\"><a href=\"mailto:p.devine@lancaster.ac.uk?Subject=cTel%Cards\" class=\"list-group-item list-group-item-action\"><i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>   Phil Devine</a></div></div></div></div></div>";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
		},

		p: noop,

		u: function unmount() {
			detachNode(div);
		},

		d: noop
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign({}, options.data);

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);
	}
}

assign(SvelteComponent.prototype, {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount,
	_differs: _differs
});

SvelteComponent.prototype._recompute = noop;

function createElement(name) {
	return document.createElement(name);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function noop() {}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function init(component, options) {
	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function assign(target) {
	var k,
	    source,
	    i = 1,
	    len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) {
			target[k] = source[k];
		}
	}

	return target;
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function observe(key, callback, options) {
	var group = options && options.defer ? this._observers.post : this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function cancel() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function cancel() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
	    changed = {},
	    dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
		this._fragment.p(changed, this._state);
		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}
}

function _mount(target, anchor) {
	this._fragment.m(target, anchor);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || a && (typeof a === "undefined" ? "undefined" : _typeof(a)) === 'object' || typeof a === 'function';
}

function blankObject() {
	return Object.create(null);
}

function callAll(fns) {
	while (fns && fns.length) {
		fns.shift()();
	}
}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}
exports.default = SvelteComponent;
},{}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* generated by Svelte v1.56.0 */


var _Card = require('./Card.svelte');

var _Card2 = _interopRequireDefault(_Card);

var _Contribute = require('./Contribute.svelte');

var _Contribute2 = _interopRequireDefault(_Contribute);

var _Support = require('./Support.svelte');

var _Support2 = _interopRequireDefault(_Support);

var _About = require('./About.svelte');

var _About2 = _interopRequireDefault(_About);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filteredCards($cards, filter) {
	console.log(filter);

	if (filter === 'all') return $cards;

	return $cards.filter(function (card) {
		return card.activities.map(function (a) {
			return a.name;
		}).indexOf(filter) !== -1;
	});
}

function data() {
	return {
		filter: 'all'
	};
};

function oncreate() {
	$('[data-toggle="tooltip"]').tooltip({ container: '.wall-cards' });
};

function create_main_fragment(component, state) {
	var div, div_1, div_2, select, option, text, option_1, text_1, option_2, text_2, option_3, text_3, option_4, text_4, option_5, text_5, option_6, text_6, option_7, text_7, option_8, text_8, option_9, text_9, option_10, text_10, text_12, button, text_14, div_3, text_22, div_4, text_24, div_5, div_6, div_7, text_32, div_8, div_9, text_34, div_10, text_36, div_11;

	function change_handler(event) {
		component.set({ filter: event.target.value });
	}

	var filteredCards = state.filteredCards;

	var each_blocks = [];

	for (var i_5 = 0; i_5 < filteredCards.length; i_5 += 1) {
		each_blocks[i_5] = create_each_block(component, assign({}, state, {
			card: filteredCards[i_5],
			card_index: i_5
		}));
	}

	var contribute = new _Contribute2.default({
		root: component.root
	});

	var about = new _About2.default({
		root: component.root
	});

	var support = new _Support2.default({
		root: component.root
	});

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			div_2 = createElement("div");
			select = createElement("select");
			option = createElement("option");
			text = createText("Find a card to...");
			option_1 = createElement("option");
			text_1 = createText("...create learning resources");
			option_2 = createElement("option");
			text_2 = createText("...communicate with students electronically");
			option_3 = createElement("option");
			text_3 = createText("...act as a platform for collaboration");
			option_4 = createElement("option");
			text_4 = createText("...collect, organise and share content");
			option_5 = createElement("option");
			text_5 = createText("...record an event or artefact");
			option_6 = createElement("option");
			text_6 = createText("...create interactive learning opportunities");
			option_7 = createElement("option");
			text_7 = createText("...gauge students understanding");
			option_8 = createElement("option");
			text_8 = createText("...engauge with learning theory");
			option_9 = createElement("option");
			text_9 = createText("...centre for technology enhanced learning");
			option_10 = createElement("option");
			text_10 = createText("All cards");
			text_12 = createText("\n        ");
			button = createElement("button");
			button.innerHTML = "<i class=\"fas fa-chevron-right\" id=\"collapser-icon\"></i>";
			text_14 = createText("\n\n    ");
			div_3 = createElement("div");
			div_3.innerHTML = "<i class=\"fas fa-map-signs\" aria-hidden=\"true\"></i> <p>Browse the wall to find out what topics are available to you. <strong>Found something you're interested in?</strong> Use the <strong>Support</strong> tab for details on who to speak to for ideas and support.</p>";
			text_22 = createText("\n");
			div_4 = createElement("div");

			for (var i_5 = 0; i_5 < each_blocks.length; i_5 += 1) {
				each_blocks[i_5].c();
			}

			text_24 = createText("\n\n    ");
			div_5 = createElement("div");
			div_6 = createElement("div");
			div_7 = createElement("div");
			div_7.innerHTML = "<ul class=\"nav nav-pills nav-fill\" id=\"pills-tab\" role=\"tablist\"><li class=\"nav-item\"><a class=\"nav-link active\" id=\"contribute-tab\" data-toggle=\"pill\" href=\"#contribute\" role=\"tab\" aria-controls=\"Contribute\" aria-selected=\"true\"><i class=\"far fa-plus-square\" aria-hidden=\"true\"></i><br>Contribute</a></li>\n                    <li class=\"nav-item\"><a class=\"nav-link\" id=\"support-tab\" data-toggle=\"pill\" href=\"#support\" role=\"tab\" aria-controls=\"Support\" aria-selected=\"false\"><i class=\"far fa-comments\" aria-hidden=\"true\"></i><br>Support</a></li>\n                    <li class=\"nav-item\"><a class=\"nav-link\" id=\"about-tab\" data-toggle=\"pill\" href=\"#about\" role=\"tab\" aria-controls=\"About\" aria-selected=\"false\"><i class=\"fas fa-info\" aria-hidden=\"true\"></i><br>About</a></li>\n                </ul>";
			text_32 = createText("\n\n            ");
			div_8 = createElement("div");
			div_9 = createElement("div");
			contribute._fragment.c();
			text_34 = createText("\n                ");
			div_10 = createElement("div");
			about._fragment.c();
			text_36 = createText("\n                ");
			div_11 = createElement("div");
			support._fragment.c();
			this.h();
		},

		h: function hydrate() {
			option.selected = true;
			option.__value = "all";
			option.value = option.__value;
			option_1.__value = "create";
			option_1.value = option_1.__value;
			option_2.__value = "connect";
			option_2.value = option_2.__value;
			option_3.__value = "collaborate";
			option_3.value = option_3.__value;
			option_4.__value = "curate";
			option_4.value = option_4.__value;
			option_5.__value = "capture";
			option_5.value = option_5.__value;
			option_6.__value = "captivate";
			option_6.value = option_6.__value;
			option_7.__value = "check";
			option_7.value = option_7.__value;
			option_8.__value = "theory";
			option_8.value = option_8.__value;
			option_9.__value = "ctel";
			option_9.value = option_9.__value;
			option_10.__value = "all";
			option_10.value = option_10.__value;
			select.id = "filterText";
			select.className = "btn btn-secondary dropdown-toggle btn-lg btn-block transformer";
			addListener(select, "change", change_handler);
			div_2.className = "selector";
			button.className = "btn btn-lg btn-outline-secondary";
			button.id = "collapser";
			button.type = "button";
			setAttribute(button, "onclick", "document.getElementsByClassName('wall-misc')[0].classList.toggle('collapsed'); document.getElementsByClassName('fa-chevron-right')[0].classList.toggle('fa-rotate-180');");
			div_1.className = "wall-filter";
			div_3.className = "instructions";
			div_4.className = "wall-cards";
			div_7.className = "east-nav";
			div_9.className = "tab-pane fade show active";
			div_9.id = "contribute";
			setAttribute(div_9, "role", "tabpanel");
			setAttribute(div_9, "aria-labelledby", "contribute-tab");
			div_10.className = "tab-pane fade";
			div_10.id = "about";
			setAttribute(div_10, "role", "tabpanel");
			setAttribute(div_10, "aria-labelledby", "about-tab");
			div_11.className = "tab-pane fade";
			div_11.id = "support";
			setAttribute(div_11, "role", "tabpanel");
			setAttribute(div_11, "aria-labelledby", "support-tab");
			div_8.className = "tab-content";
			div_8.id = "pills-tabContent";
			div_6.className = "container";
			div_5.className = "wall-misc";
			div.id = "wall";
			div.className = "mainwall";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(div_2, div_1);
			appendNode(select, div_2);
			appendNode(option, select);
			appendNode(text, option);
			appendNode(option_1, select);
			appendNode(text_1, option_1);
			appendNode(option_2, select);
			appendNode(text_2, option_2);
			appendNode(option_3, select);
			appendNode(text_3, option_3);
			appendNode(option_4, select);
			appendNode(text_4, option_4);
			appendNode(option_5, select);
			appendNode(text_5, option_5);
			appendNode(option_6, select);
			appendNode(text_6, option_6);
			appendNode(option_7, select);
			appendNode(text_7, option_7);
			appendNode(option_8, select);
			appendNode(text_8, option_8);
			appendNode(option_9, select);
			appendNode(text_9, option_9);
			appendNode(option_10, select);
			appendNode(text_10, option_10);
			appendNode(text_12, div_1);
			appendNode(button, div_1);
			appendNode(text_14, div);
			appendNode(div_3, div);
			appendNode(text_22, div);
			appendNode(div_4, div);

			for (var i_5 = 0; i_5 < each_blocks.length; i_5 += 1) {
				each_blocks[i_5].m(div_4, null);
			}

			appendNode(text_24, div);
			appendNode(div_5, div);
			appendNode(div_6, div_5);
			appendNode(div_7, div_6);
			appendNode(text_32, div_6);
			appendNode(div_8, div_6);
			appendNode(div_9, div_8);
			contribute._mount(div_9, null);
			appendNode(text_34, div_8);
			appendNode(div_10, div_8);
			about._mount(div_10, null);
			appendNode(text_36, div_8);
			appendNode(div_11, div_8);
			support._mount(div_11, null);
		},

		p: function update(changed, state) {
			var filteredCards = state.filteredCards;

			if (changed.filteredCards) {
				for (var i_5 = 0; i_5 < filteredCards.length; i_5 += 1) {
					var each_context = assign({}, state, {
						card: filteredCards[i_5],
						card_index: i_5
					});

					if (each_blocks[i_5]) {
						each_blocks[i_5].p(changed, each_context);
					} else {
						each_blocks[i_5] = create_each_block(component, each_context);
						each_blocks[i_5].c();
						each_blocks[i_5].m(div_4, null);
					}
				}

				for (; i_5 < each_blocks.length; i_5 += 1) {
					each_blocks[i_5].u();
					each_blocks[i_5].d();
				}
				each_blocks.length = filteredCards.length;
			}
		},

		u: function unmount() {
			detachNode(div);

			for (var i_5 = 0; i_5 < each_blocks.length; i_5 += 1) {
				each_blocks[i_5].u();
			}
		},

		d: function destroy() {
			removeListener(select, "change", change_handler);

			destroyEach(each_blocks);

			contribute.destroy(false);
			about.destroy(false);
			support.destroy(false);
		}
	};
}

// (27:12) {{#each filteredCards as card}}
function create_each_block(component, state) {
	var card = state.card,
	    card_index = state.card_index;
	var div;

	var card_1 = new _Card2.default({
		root: component.root,
		data: { card: card }
	});

	return {
		c: function create() {
			div = createElement("div");
			card_1._fragment.c();
			this.h();
		},

		h: function hydrate() {
			div.className = "card-item";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			card_1._mount(div, null);
		},

		p: function update(changed, state) {
			card = state.card;
			card_index = state.card_index;
			var card_1_changes = {};
			if (changed.filteredCards) card_1_changes.card = card;
			card_1._set(card_1_changes);
		},

		u: function unmount() {
			detachNode(div);
		},

		d: function destroy() {
			card_1.destroy(false);
		}
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign(this.store._init(["cards"]), data(), options.data);
	this.store._add(this, ["cards"]);
	this._recompute({ $cards: 1, filter: 1 }, this._state);

	this._handlers.destroy = [removeFromStore];

	var _oncreate = oncreate.bind(this);

	if (!options.root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this, this._state);

	this.root._oncreate.push(_oncreate);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign(SvelteComponent.prototype, {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount,
	_differs: _differs
});

SvelteComponent.prototype._recompute = function _recompute(changed, state) {
	if (changed.$cards || changed.filter) {
		if (this._differs(state.filteredCards, state.filteredCards = filteredCards(state.$cards, state.filter))) changed.filteredCards = true;
	}
};

function assign(target) {
	var k,
	    source,
	    i = 1,
	    len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) {
			target[k] = source[k];
		}
	}

	return target;
}

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function destroyEach(iterations) {
	for (var i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d();
	}
}

function init(component, options) {
	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function removeFromStore() {
	this.store._remove(this);
}

function callAll(fns) {
	while (fns && fns.length) {
		fns.shift()();
	}
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function observe(key, callback, options) {
	var group = options && options.defer ? this._observers.post : this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function cancel() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function cancel() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
	    changed = {},
	    dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
		this._fragment.p(changed, this._state);
		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}
}

function _mount(target, anchor) {
	this._fragment.m(target, anchor);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || a && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' || typeof a === 'function';
}

function blankObject() {
	return Object.create(null);
}

function noop() {}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}
exports.default = SvelteComponent;
},{"./Card.svelte":15,"./Contribute.svelte":17,"./Support.svelte":20,"./About.svelte":18}],23:[function(require,module,exports) {
module.exports="/dist/687dde7deb903b39bcd65a906a5cfb7b.png";
},{}],11:[function(require,module,exports) {
module.exports="/dist/dee3db52b81c68eb08bb71258485570f.jpg";
},{}],12:[function(require,module,exports) {
module.exports="/dist/cfdcbacf47a22ed09bab7f74b6272fa2.png";
},{}],22:[function(require,module,exports) {
module.exports="/dist/ffef47702bbf5746f9e97fc9be0e7bed.jpg";
},{}],13:[function(require,module,exports) {
module.exports="/dist/0214387250c0aa023abe0c50ab1ad2cc.png";
},{}],14:[function(require,module,exports) {
module.exports="/dist/4b632c3c223a89c7f977e182617fc6ec.png";
},{}],7:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = [{
    id: "thomas-ryberg-a",
    name: "Professor Thomas Ryberg",
    urltext: "Further reading",
    url: "http://goo.gl/fDpmu8",
    tagline: "Delivering  on  an  Online  UK  MBA  Coursein  Post-Soviet  Countries.",
    description: "The first in a new series of lunch events “MEET & EAT” was successfully held on 24 October 2017. 16 of us met and discussed with Professor Thomas Ryberg about his recent article Understanding Nomadic Collaborative Learning Groups. We ate freshly wrapped burritos together and digested new ideas of how groups of students move back and forth between digital and physical spaces through creatively incorporating digital/non-digital technologies into their group work. Why don’t you come along next time?",
    colour: "#FDBC45",
    assets: {
        logo: {
            styles: "",
            image: require('./img/aau-logo_en.png')
        },
        cover: {
            styles: "background-size: cover !important;",
            image: require('./img/Tom_ryberg.jpg')
        }
    },
    activities: ["collaborate", "theory", "ctel"],
    uses: ["Assessment", "Discussion", "Feedback"],
    submitter: {
        name: "Dr Kyungmee Lee",
        title: "Lecturer in Technology Enhanced Learning"
    },
    frameworkheaders: {
        one: "point",
        two: "context"
    },
    frameworkicons: {
        one: "fa-hourglass-start",
        two: "fa-hourglass-half",
        three: "fa-hourglass-end"
    },
    frameworktitles: {
        one: "One",
        two: "Two",
        three: "Three"
    },
    videoURL: "https://www.youtube.com/embed/ns0U3zkHG7w?rel=0&amp;showinfo=0?&cc_load_policy=1",
    framework: {
        commentary_a: "Thomas explains how he borrowed a pre-existing theoretical concept from another academic field and revised and used it in his work.",
        commentary_b: "Thomas explains what Problem-Based Learning (or Project-based Learning, PBL) is and some of the underlying pedagogical principles of PBL.",
        commentary_c: "Thomas explains how he has been using the PBL as a pedagogical theory, model, and framework in his own teaching context."
    }
}, {
    id: "ruslan-ramanau-a",
    name: "Dr Ruslan Ramanau",
    urltext: "Further reading",
    url: "http://goo.gl/fDpmu8",
    tagline: "Delivering online UK MBA Courses in Post-Soviet Countries",
    description: "Dr Ruslan Ramanau from the Open University visited Lancaster for our second MEET & EAT event on 22 March, 2018. we met and talked about his new article Delivering an online UK MBA Courses in Post-Soviet Countries. We ate freshly wrapped burritos together and discussed the challenging nature of integrating  Western management knowledge and education into this unique cultural, political, and economic setting. It was indeed interesting to listen to Ruslan talking about his own experiences with delivering the UK MBA course in Russia.",
    colour: "#5793EF",
    assets: {
        logo: {
            styles: "",
            image: require('./img/ou.png')
        },
        cover: {
            styles: "background-size: cover !important;",
            image: require('./img/ruslan_ramanau.jpg')
        }
    },
    activities: ["collaborate", "theory", "ctel"],
    uses: ["Assessment", "Discussion"],
    submitter: {
        name: "Dr Kyungmee Lee",
        title: "Lecturer in Technology Enhanced Learning"
    },
    frameworkheaders: {
        one: "Point",
        two: "Context"
    },
    frameworkicons: {
        one: "fa-hourglass-start",
        two: "fa-hourglass-half",
        three: "fa-hourglass-end"
    },
    frameworktitles: {
        one: "One",
        two: "Two",
        three: "Three"
    },
    videoURL: "https://www.youtube.com/embed/U0QOonYmDuU?rel=0&amp;showinfo=0?&cc_load_policy=1",
    framework: {
        commentary_a: "Learning experiences of international students in the MBA course should be understood in their own professional context in their own countries.",
        commentary_b: "Exposure to Western theories, despite their discrepancy with students’ own practice, were seen as useful for students’ self- or career enhancement.",
        commentary_c: "The effective localisation of the UK courses can help international students to think more deeply and reflectively of themselves and their practice."
    }
}, {
    id: "zeetings",
    name: "zeetings",
    urltext: "www.zeetings.com",
    url: "https://www.zeetings.com",
    tagline: "Combine slides, multimedia content, polls and Q&A features into interactive presentations.",
    description: "Zeetings helps to create engaging presentations by combining a range of interactive tools into an easy to use interface. Add existing slides or use Zeetings to create brand new presentations, quickly embedding videos, polls and surveys. A Zeeting is interactive, so share with students to receive real time feedback and questions. With in-built analytics, responses are saved automatically to repurpose outside of the classroom.",
    colour: "#8EB4CF",
    assets: {
        logo: {
            styles: "",
            image: require('./img/zeetings.png')
        },
        cover: {
            styles: "background-size: cover !important;",
            image: require('./img/zeetings_logo.png')
        }
    },
    activities: ["create", "captivate", "check"],
    uses: ["Presentations", "Notetaking", "Polls", "Feedback"],
    submitter: {
        name: "P Devine",
        title: "Digital Learning Facilitator"
    },
    frameworkheaders: {
        one: "Level",
        two: "Example Activities"
    },
    frameworkicons: {
        one: "fa-thermometer-quarter",
        two: "fa-thermometer-half",
        three: "fa-thermometer-full"
    },
    frameworktitles: {
        one: "Enhance",
        two: "Empower",
        three: "Extend"
    },
    videoURL: "https://www.youtube.com/embed/qKsY_083uOk?rel=0&amp;showinfo=0?&cc_load_policy=1",
    framework: {
        commentary_a: "Import a previous presentation (e.g. PowerPoint) and add some interactive slides that will test student's comprehension during the session.",
        commentary_b: "Introduce students to the Q&A feature. Ask them to pose questions anonymously and vote on which ones they think should be answered first.",
        commentary_c: "Use Zeetings' analytics feature to export all questions and allocate a revision task that requires students to present back an answer at the next class."
    }
}];
},{"./img/aau-logo_en.png":23,"./img/Tom_ryberg.jpg":11,"./img/ou.png":12,"./img/ruslan_ramanau.jpg":22,"./img/zeetings.png":13,"./img/zeetings_logo.png":14}],2:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _store = require('svelte/store');

var _App = require('./templates/App.svelte');

var _App2 = _interopRequireDefault(_App);

var _Wall = require('./templates/Wall.svelte');

var _Wall2 = _interopRequireDefault(_Wall);

var _cards = require('./cards.js');

var _cards2 = _interopRequireDefault(_cards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Base templates


// data for all the cards


// Define store that will comprise the card data and state of the app
var AppStore = function (_Store) {
  _inherits(AppStore, _Store);

  function AppStore() {
    _classCallCheck(this, AppStore);

    return _possibleConstructorReturn(this, (AppStore.__proto__ || Object.getPrototypeOf(AppStore)).apply(this, arguments));
  }

  _createClass(AppStore, [{
    key: 'loadRandomCard',


    // Method to load a random card (callable from any component)
    value: function loadRandomCard(currentCardId, a) {
      //document.getElementById(card.id).title = "test test test";
      document.getElementById("frontface").style.display = "block";

      //card.testest();
      // Remove current card so we don't randomly select it
      var cards = this.get('cards').filter(function (card) {
        return card.id !== currentCardId;
      });
      var card = cards[Math.floor(Math.random() * cards.length)];
      this.set({
        currentCard: card.id
      });
    }
    // Method to load a StaticActivity (callable from any component) PhilD

  }, {
    key: 'loadStaticActivity',
    value: function loadStaticActivity(e) {

      var myClick = document.getElementById('filterText');
      myClick.value = e;
      myClick.addEventListener('change', function () {
        this.store.set({ filter: e });
      });
      myClick.dispatchEvent(new Event('change'));
    }
    // Method to stop video ac

  }, {
    key: 'stopVideo',
    value: function stopVideo() {

      var myVideoac = document.getElementById("embedVideo-ac");
      var myVideo = document.getElementById("embedVideo");

      if (myVideoac) {
        $(myVideoac).attr("src", $(myVideoac).attr("src"));
      }
      if (myVideo) {
        $(myVideo).attr("src", $(myVideo).attr("src"));
      }
    }
  }]);

  return AppStore;
}(_store.Store);

// Expand each of the 'activities' for each card to include the full information for that activity


_cards2.default.forEach(function (card) {
  var activities = [{ name: "create", description: "Build learning resources, from scratch or remixing existing materials." }, { name: "captivate", description: "Create interactive learning opportunities that engage." }, { name: "check", description: "Gauge students understanding." }, { name: "connect", description: "Communicate with students in real time or asynchronously." }, { name: "collaborate", description: "A platform for collaboration and co-creation." }, { name: "curate", description: "Collect, organise and share content." }, { name: "capture", description: "Record an event, activity or artefact." }, { name: "theory", description: "Engage with Learning theory." }, { name: "ctel", description: "Centre for Technology Enhanced Learning" }];
  card.activities = card.activities.map(function (name) {
    return activities.find(function (activity) {
      return activity.name === name;
    });
  });
});

// add functioanlity of cardid in query string to view a unique card on reload and in first instance. PhilD
var searchParams2 = new URL(document.location).searchParams;
var uniquecardid = searchParams2.get('cardid') ? searchParams2.get('cardid') : _cards2.default[Math.floor(Math.random() * _cards2.default.length)].id;

// Create the store with initial state
var store = new AppStore({
  cards: _cards2.default,
  currentCard: uniquecardid,
  currentPage: 'card'
});

var searchParams = new URL(document.location).searchParams;
var display = searchParams.get('display');

var BaseTemplate = display === 'wall' ? _Wall2.default : _App2.default;

// Create the app using App as the default template and pass it the store
var app = new BaseTemplate({
  target: document.body,
  store: store
});

exports.default = app;
},{"svelte/store":24,"./templates/App.svelte":8,"./templates/Wall.svelte":9,"./cards.js":7}],26:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '61920' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[26,2])
//# sourceMappingURL=/dist/531320a67007fff621f0b76674ede471.map