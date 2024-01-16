/* wordFX.js */
{
	function debounce(t, e, s) {
		var i;
		return function () {
			var h = this,
				n = arguments,
				o = s && !i;
			clearTimeout(i), i = setTimeout(function () {
				i = null, s || t.apply(h, n)
			}, e), o && t.apply(h, n)
		}
	}

	function randomBetween(t, e, s) {
		return void 0 === s && (s = 2), parseFloat(Math.min(t + Math.random() * (e - t), e).toFixed(s))
	}
	let t = {
		width: window.innerWidth,
		height: window.innerHeight
	};
	class e {
		constructor(t, e, s) {
			this.DOM = {}, this.options = {
				shapeTypes: ["circle", "rect", "polygon"],
				shapeColors: ["#e07272", "#0805b5", "#49c6ff", "#8bc34a", "#1e1e21", "#e24e81", "#e0cd24"],
				shapeFill: !0,
				shapeStrokeWidth: 1
			}, Object.assign(this.options, s), this.type = t || this.options.shapeTypes[0], ("random" === this.type || this.options.types.includes(this.type)) && ("random" === this.type && (this.type = this.options.shapeTypes[randomBetween(0, this.options.shapeTypes.length - 1, 0)]), this.letterRect = e, this.init())
		}
		init() {
			this.DOM.el = document.createElementNS("http://www.w3.org/2000/svg", this.type), this.DOM.el.style.opacity = 0, this.configureShapeType(), this.options.shapeFill ? this.DOM.el.setAttribute("fill", this.options.shapeColors[randomBetween(0, this.options.shapeColors.length - 1, 0)]) : (this.DOM.el.setAttribute("fill", "none"), this.DOM.el.setAttribute("stroke-width", this.options.shapeStrokeWidth), this.DOM.el.setAttribute("stroke", this.options.shapeColors[randomBetween(0, this.options.shapeColors.length - 1, 0)]))
		}
		configureShapeType() {
			if (this.DOM.el.style.transformOrigin = `${this.letterRect.left+this.letterRect.width/2}px ${this.letterRect.top+this.letterRect.height/2}px`, "circle" === this.type) {
				const t = .5 * this.letterRect.width;
				this.DOM.el.setAttribute("r", t), this.DOM.el.setAttribute("cx", this.letterRect.left + this.letterRect.width / 2), this.DOM.el.setAttribute("cy", this.letterRect.top + this.letterRect.height / 2)
			} else if ("rect" === this.type) {
				const t = randomBetween(.05, .5, 3) * this.letterRect.width,
					e = randomBetween(.05, .5, 3) * this.letterRect.height;
				this.DOM.el.setAttribute("width", t), this.DOM.el.setAttribute("height", e), this.DOM.el.setAttribute("x", this.letterRect.left + (this.letterRect.width - t) / 2), this.DOM.el.setAttribute("y", this.letterRect.top + (this.letterRect.height - e) / 2)
			} else "polygon" === this.type && this.DOM.el.setAttribute("points", `${this.letterRect.left} ${this.letterRect.top+this.letterRect.height}, ${this.letterRect.left+this.letterRect.width/2} ${this.letterRect.bottom-this.letterRect.width}, ${this.letterRect.left+this.letterRect.width} ${this.letterRect.top+this.letterRect.height}`)
		}
		onResize(t) {
			this.letterRect = t, this.configureShapeType()
		}
	}
	class s {
		constructor(t, e, s) {
			this.DOM = {}, this.DOM.el = t, this.DOM.svg = e, this.options = {
				totalShapes: 10
			}, Object.assign(this.options, s), this.rect = this.DOM.el.getBoundingClientRect(), this.totalShapes = this.options.totalShapes, this.init(), this.initEvents()
		}
		init() {
			this.shapes = [];
			for (let t = 0; t <= this.totalShapes - 1; ++t) {
				const t = new e("random", this.rect, this.options);
				this.shapes.push(t), this.DOM.svg.appendChild(t.DOM.el)
			}
		}
		initEvents() {
			window.addEventListener("resize", debounce(() => {
				this.rect = this.DOM.el.getBoundingClientRect();
				for (let t = 0; t <= this.totalShapes - 1; ++t) {
					this.shapes[t].onResize(this.rect)
				}
			}, 20))
		}
	}
	class i {
		constructor(t, e) {
			this.DOM = {}, this.DOM.el = t, this.options = {
				shapesOnTop: !1
			}, Object.assign(this.options, e), this.init(), this.initEvents()
		}
		init() {
			this.createSVG(), charming(this.DOM.el), this.letters = [], Array.from(this.DOM.el.querySelectorAll("span")).forEach(t => this.letters.push(new s(t, this.DOM.svg, this.options)))
		}
		initEvents() {
			window.addEventListener("resize", debounce(() => {
				t = {
					width: window.innerWidth,
					height: window.innerHeight
				}, this.DOM.svg.setAttribute("width", `${t.width}px`), this.DOM.svg.setAttribute("height", `${t.width}px`), this.DOM.svg.setAttribute("viewbox", `0 0 ${t.width} ${t.height}`)
			}, 20))
		}
		createSVG() {
			this.DOM.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.DOM.svg.setAttribute("class", "shapes"), this.DOM.svg.setAttribute("width", `${t.width}px`), this.DOM.svg.setAttribute("height", `${t.width}px`), this.DOM.svg.setAttribute("viewbox", `0 0 ${t.width} ${t.height}`), this.options.shapesOnTop ? this.DOM.el.parentNode.insertBefore(this.DOM.svg, this.DOM.el.nextSibling) : this.DOM.el.parentNode.insertBefore(this.DOM.svg, this.DOM.el)
		}
		show(t) {
			return this.toggle("show", t)
		}
		hide(t) {
			return this.toggle("hide", t)
		}
		toggle(t = "show", e) {
			return new Promise((s, i) => {
				const h = () => {
					for (let e = 0, s = this.letters.length; e <= s - 1; ++e) this.letters[e].DOM.el.style.opacity = "show" === t ? 1 : 0;
					s()
				};
				if (e && 0 !== Object.keys(e).length) {
					if (e.shapesAnimationOpts)
						for (let t = 0, s = this.letters.length; t <= s - 1; ++t) {
							const s = this.letters[t];
							setTimeout(function (t) {
								return () => {
									e.shapesAnimationOpts.targets = t.shapes.map(t => t.DOM.el), anime.remove(e.shapesAnimationOpts.targets), anime(e.shapesAnimationOpts)
								}
							}(s), e.lettersAnimationOpts && e.lettersAnimationOpts.delay ? e.lettersAnimationOpts.delay(s.DOM.el, t) : 0)
						}
					e.lettersAnimationOpts ? (e.lettersAnimationOpts.targets = this.letters.map(t => t.DOM.el), e.lettersAnimationOpts.complete = (() => {
						if ("hide" === t)
							for (let t = 0, s = e.lettersAnimationOpts.targets.length; t <= s - 1; ++t) e.lettersAnimationOpts.targets[t].style.transform = "none";
						s()
					}), anime(e.lettersAnimationOpts)) : h()
				} else h()
			})
		}
	}
	window.Word = i
}

/*!
 * Bootstrap v4.0.0 (https://getbootstrap.com)
 * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
! function (t, e) {
	"object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e(t.bootstrap = {}, t.jQuery, t.Popper)
}(this, function (t, e, n) {
	"use strict";

	function i(t, e) {
		for (var n = 0; n < e.length; n++) {
			var i = e[n];
			i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
		}
	}

	function s(t, e, n) {
		return e && i(t.prototype, e), n && i(t, n), t
	}

	function r() {
		return (r = Object.assign || function (t) {
			for (var e = 1; e < arguments.length; e++) {
				var n = arguments[e];
				for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
			}
			return t
		}).apply(this, arguments)
	}
	e = e && e.hasOwnProperty("default") ? e.default : e, n = n && n.hasOwnProperty("default") ? n.default : n;
	var o, a, l, h, c, u, f, d, _, g, p, m, v, E, T, y, C, I, A, b, D, S, w, N, O, k, P = function (t) {
			var e = !1;

			function n(e) {
				var n = this,
					s = !1;
				return t(this).one(i.TRANSITION_END, function () {
					s = !0
				}), setTimeout(function () {
					s || i.triggerTransitionEnd(n)
				}, e), this
			}
			var i = {
				TRANSITION_END: "bsTransitionEnd",
				getUID: function (t) {
					do {
						t += ~~(1e6 * Math.random())
					} while (document.getElementById(t));
					return t
				},
				getSelectorFromElement: function (e) {
					var n, i = e.getAttribute("data-target");
					i && "#" !== i || (i = e.getAttribute("href") || ""), "#" === i.charAt(0) && (n = i, i = n = "function" == typeof t.escapeSelector ? t.escapeSelector(n).substr(1) : n.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1"));
					try {
						return t(document).find(i).length > 0 ? i : null
					} catch (t) {
						return null
					}
				},
				reflow: function (t) {
					return t.offsetHeight
				},
				triggerTransitionEnd: function (n) {
					t(n).trigger(e.end)
				},
				supportsTransitionEnd: function () {
					return Boolean(e)
				},
				isElement: function (t) {
					return (t[0] || t).nodeType
				},
				typeCheckConfig: function (t, e, n) {
					for (var s in n)
						if (Object.prototype.hasOwnProperty.call(n, s)) {
							var r = n[s],
								o = e[s],
								a = o && i.isElement(o) ? "element" : (l = o, {}.toString.call(l).match(/\s([a-zA-Z]+)/)[1].toLowerCase());
							if (!new RegExp(r).test(a)) throw new Error(t.toUpperCase() + ': Option "' + s + '" provided type "' + a + '" but expected type "' + r + '".')
						}
					var l
				}
			};
			return e = ("undefined" == typeof window || !window.QUnit) && {
				end: "transitionend"
			}, t.fn.emulateTransitionEnd = n, i.supportsTransitionEnd() && (t.event.special[i.TRANSITION_END] = {
				bindType: e.end,
				delegateType: e.end,
				handle: function (e) {
					if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
				}
			}), i
		}(e),
		L = (a = "alert", h = "." + (l = "bs.alert"), c = (o = e).fn[a], u = {
			CLOSE: "close" + h,
			CLOSED: "closed" + h,
			CLICK_DATA_API: "click" + h + ".data-api"
		}, f = "alert", d = "fade", _ = "show", g = function () {
			function t(t) {
				this._element = t
			}
			var e = t.prototype;
			return e.close = function (t) {
				t = t || this._element;
				var e = this._getRootElement(t);
				this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
			}, e.dispose = function () {
				o.removeData(this._element, l), this._element = null
			}, e._getRootElement = function (t) {
				var e = P.getSelectorFromElement(t),
					n = !1;
				return e && (n = o(e)[0]), n || (n = o(t).closest("." + f)[0]), n
			}, e._triggerCloseEvent = function (t) {
				var e = o.Event(u.CLOSE);
				return o(t).trigger(e), e
			}, e._removeElement = function (t) {
				var e = this;
				o(t).removeClass(_), P.supportsTransitionEnd() && o(t).hasClass(d) ? o(t).one(P.TRANSITION_END, function (n) {
					return e._destroyElement(t, n)
				}).emulateTransitionEnd(150) : this._destroyElement(t)
			}, e._destroyElement = function (t) {
				o(t).detach().trigger(u.CLOSED).remove()
			}, t._jQueryInterface = function (e) {
				return this.each(function () {
					var n = o(this),
						i = n.data(l);
					i || (i = new t(this), n.data(l, i)), "close" === e && i[e](this)
				})
			}, t._handleDismiss = function (t) {
				return function (e) {
					e && e.preventDefault(), t.close(this)
				}
			}, s(t, null, [{
				key: "VERSION",
				get: function () {
					return "4.0.0"
				}
			}]), t
		}(), o(document).on(u.CLICK_DATA_API, '[data-dismiss="alert"]', g._handleDismiss(new g)), o.fn[a] = g._jQueryInterface, o.fn[a].Constructor = g, o.fn[a].noConflict = function () {
			return o.fn[a] = c, g._jQueryInterface
		}, g),
		R = (m = "button", E = "." + (v = "bs.button"), T = ".data-api", y = (p = e).fn[m], C = "active", I = "btn", A = "focus", b = '[data-toggle^="button"]', D = '[data-toggle="buttons"]', S = "input", w = ".active", N = ".btn", O = {
			CLICK_DATA_API: "click" + E + T,
			FOCUS_BLUR_DATA_API: "focus" + E + T + " blur" + E + T
		}, k = function () {
			function t(t) {
				this._element = t
			}
			var e = t.prototype;
			return e.toggle = function () {
				var t = !0,
					e = !0,
					n = p(this._element).closest(D)[0];
				if (n) {
					var i = p(this._element).find(S)[0];
					if (i) {
						if ("radio" === i.type)
							if (i.checked && p(this._element).hasClass(C)) t = !1;
							else {
								var s = p(n).find(w)[0];
								s && p(s).removeClass(C)
							}
						if (t) {
							if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
							i.checked = !p(this._element).hasClass(C), p(i).trigger("change")
						}
						i.focus(), e = !1
					}
				}
				e && this._element.setAttribute("aria-pressed", !p(this._element).hasClass(C)), t && p(this._element).toggleClass(C)
			}, e.dispose = function () {
				p.removeData(this._element, v), this._element = null
			}, t._jQueryInterface = function (e) {
				return this.each(function () {
					var n = p(this).data(v);
					n || (n = new t(this), p(this).data(v, n)), "toggle" === e && n[e]()
				})
			}, s(t, null, [{
				key: "VERSION",
				get: function () {
					return "4.0.0"
				}
			}]), t
		}(), p(document).on(O.CLICK_DATA_API, b, function (t) {
			t.preventDefault();
			var e = t.target;
			p(e).hasClass(I) || (e = p(e).closest(N)), k._jQueryInterface.call(p(e), "toggle")
		}).on(O.FOCUS_BLUR_DATA_API, b, function (t) {
			var e = p(t.target).closest(N)[0];
			p(e).toggleClass(A, /^focus(in)?$/.test(t.type))
		}), p.fn[m] = k._jQueryInterface, p.fn[m].Constructor = k, p.fn[m].noConflict = function () {
			return p.fn[m] = y, k._jQueryInterface
		}, k),
		j = function (t) {
			var e = "carousel",
				n = "bs.carousel",
				i = "." + n,
				o = t.fn[e],
				a = {
					interval: 5e3,
					keyboard: !0,
					slide: !1,
					pause: "hover",
					wrap: !0
				},
				l = {
					interval: "(number|boolean)",
					keyboard: "boolean",
					slide: "(boolean|string)",
					pause: "(string|boolean)",
					wrap: "boolean"
				},
				h = "next",
				c = "prev",
				u = "left",
				f = "right",
				d = {
					SLIDE: "slide" + i,
					SLID: "slid" + i,
					KEYDOWN: "keydown" + i,
					MOUSEENTER: "mouseenter" + i,
					MOUSELEAVE: "mouseleave" + i,
					TOUCHEND: "touchend" + i,
					LOAD_DATA_API: "load" + i + ".data-api",
					CLICK_DATA_API: "click" + i + ".data-api"
				},
				_ = "carousel",
				g = "active",
				p = "slide",
				m = "carousel-item-right",
				v = "carousel-item-left",
				E = "carousel-item-next",
				T = "carousel-item-prev",
				y = {
					ACTIVE: ".active",
					ACTIVE_ITEM: ".active.carousel-item",
					ITEM: ".carousel-item",
					NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
					INDICATORS: ".carousel-indicators",
					DATA_SLIDE: "[data-slide], [data-slide-to]",
					DATA_RIDE: '[data-ride="carousel"]'
				},
				C = function () {
					function o(e, n) {
						this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(n), this._element = t(e)[0], this._indicatorsElement = t(this._element).find(y.INDICATORS)[0], this._addEventListeners()
					}
					var C = o.prototype;
					return C.next = function () {
						this._isSliding || this._slide(h)
					}, C.nextWhenVisible = function () {
						!document.hidden && t(this._element).is(":visible") && "hidden" !== t(this._element).css("visibility") && this.next()
					}, C.prev = function () {
						this._isSliding || this._slide(c)
					}, C.pause = function (e) {
						e || (this._isPaused = !0), t(this._element).find(y.NEXT_PREV)[0] && P.supportsTransitionEnd() && (P.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
					}, C.cycle = function (t) {
						t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
					}, C.to = function (e) {
						var n = this;
						this._activeElement = t(this._element).find(y.ACTIVE_ITEM)[0];
						var i = this._getItemIndex(this._activeElement);
						if (!(e > this._items.length - 1 || e < 0))
							if (this._isSliding) t(this._element).one(d.SLID, function () {
								return n.to(e)
							});
							else {
								if (i === e) return this.pause(), void this.cycle();
								var s = e > i ? h : c;
								this._slide(s, this._items[e])
							}
					}, C.dispose = function () {
						t(this._element).off(i), t.removeData(this._element, n), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
					}, C._getConfig = function (t) {
						return t = r({}, a, t), P.typeCheckConfig(e, t, l), t
					}, C._addEventListeners = function () {
						var e = this;
						this._config.keyboard && t(this._element).on(d.KEYDOWN, function (t) {
							return e._keydown(t)
						}), "hover" === this._config.pause && (t(this._element).on(d.MOUSEENTER, function (t) {
							return e.pause(t)
						}).on(d.MOUSELEAVE, function (t) {
							return e.cycle(t)
						}), "ontouchstart" in document.documentElement && t(this._element).on(d.TOUCHEND, function () {
							e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function (t) {
								return e.cycle(t)
							}, 500 + e._config.interval)
						}))
					}, C._keydown = function (t) {
						if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
							case 37:
								t.preventDefault(), this.prev();
								break;
							case 39:
								t.preventDefault(), this.next()
						}
					}, C._getItemIndex = function (e) {
						return this._items = t.makeArray(t(e).parent().find(y.ITEM)), this._items.indexOf(e)
					}, C._getItemByDirection = function (t, e) {
						var n = t === h,
							i = t === c,
							s = this._getItemIndex(e),
							r = this._items.length - 1;
						if ((i && 0 === s || n && s === r) && !this._config.wrap) return e;
						var o = (s + (t === c ? -1 : 1)) % this._items.length;
						return -1 === o ? this._items[this._items.length - 1] : this._items[o]
					}, C._triggerSlideEvent = function (e, n) {
						var i = this._getItemIndex(e),
							s = this._getItemIndex(t(this._element).find(y.ACTIVE_ITEM)[0]),
							r = t.Event(d.SLIDE, {
								relatedTarget: e,
								direction: n,
								from: s,
								to: i
							});
						return t(this._element).trigger(r), r
					}, C._setActiveIndicatorElement = function (e) {
						if (this._indicatorsElement) {
							t(this._indicatorsElement).find(y.ACTIVE).removeClass(g);
							var n = this._indicatorsElement.children[this._getItemIndex(e)];
							n && t(n).addClass(g)
						}
					}, C._slide = function (e, n) {
						var i, s, r, o = this,
							a = t(this._element).find(y.ACTIVE_ITEM)[0],
							l = this._getItemIndex(a),
							c = n || a && this._getItemByDirection(e, a),
							_ = this._getItemIndex(c),
							C = Boolean(this._interval);
						if (e === h ? (i = v, s = E, r = u) : (i = m, s = T, r = f), c && t(c).hasClass(g)) this._isSliding = !1;
						else if (!this._triggerSlideEvent(c, r).isDefaultPrevented() && a && c) {
							this._isSliding = !0, C && this.pause(), this._setActiveIndicatorElement(c);
							var I = t.Event(d.SLID, {
								relatedTarget: c,
								direction: r,
								from: l,
								to: _
							});
							P.supportsTransitionEnd() && t(this._element).hasClass(p) ? (t(c).addClass(s), P.reflow(c), t(a).addClass(i), t(c).addClass(i), t(a).one(P.TRANSITION_END, function () {
								t(c).removeClass(i + " " + s).addClass(g), t(a).removeClass(g + " " + s + " " + i), o._isSliding = !1, setTimeout(function () {
									return t(o._element).trigger(I)
								}, 0)
							}).emulateTransitionEnd(600)) : (t(a).removeClass(g), t(c).addClass(g), this._isSliding = !1, t(this._element).trigger(I)), C && this.cycle()
						}
					}, o._jQueryInterface = function (e) {
						return this.each(function () {
							var i = t(this).data(n),
								s = r({}, a, t(this).data());
							"object" == typeof e && (s = r({}, s, e));
							var l = "string" == typeof e ? e : s.slide;
							if (i || (i = new o(this, s), t(this).data(n, i)), "number" == typeof e) i.to(e);
							else if ("string" == typeof l) {
								if ("undefined" == typeof i[l]) throw new TypeError('No method named "' + l + '"');
								i[l]()
							} else s.interval && (i.pause(), i.cycle())
						})
					}, o._dataApiClickHandler = function (e) {
						var i = P.getSelectorFromElement(this);
						if (i) {
							var s = t(i)[0];
							if (s && t(s).hasClass(_)) {
								var a = r({}, t(s).data(), t(this).data()),
									l = this.getAttribute("data-slide-to");
								l && (a.interval = !1), o._jQueryInterface.call(t(s), a), l && t(s).data(n).to(l), e.preventDefault()
							}
						}
					}, s(o, null, [{
						key: "VERSION",
						get: function () {
							return "4.0.0"
						}
					}, {
						key: "Default",
						get: function () {
							return a
						}
					}]), o
				}();
			return t(document).on(d.CLICK_DATA_API, y.DATA_SLIDE, C._dataApiClickHandler), t(window).on(d.LOAD_DATA_API, function () {
				t(y.DATA_RIDE).each(function () {
					var e = t(this);
					C._jQueryInterface.call(e, e.data())
				})
			}), t.fn[e] = C._jQueryInterface, t.fn[e].Constructor = C, t.fn[e].noConflict = function () {
				return t.fn[e] = o, C._jQueryInterface
			}, C
		}(e),
		H = function (t) {
			var e = "collapse",
				n = "bs.collapse",
				i = "." + n,
				o = t.fn[e],
				a = {
					toggle: !0,
					parent: ""
				},
				l = {
					toggle: "boolean",
					parent: "(string|element)"
				},
				h = {
					SHOW: "show" + i,
					SHOWN: "shown" + i,
					HIDE: "hide" + i,
					HIDDEN: "hidden" + i,
					CLICK_DATA_API: "click" + i + ".data-api"
				},
				c = "show",
				u = "collapse",
				f = "collapsing",
				d = "collapsed",
				_ = "width",
				g = "height",
				p = {
					ACTIVES: ".show, .collapsing",
					DATA_TOGGLE: '[data-toggle="collapse"]'
				},
				m = function () {
					function i(e, n) {
						this._isTransitioning = !1, this._element = e, this._config = this._getConfig(n), this._triggerArray = t.makeArray(t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
						for (var i = t(p.DATA_TOGGLE), s = 0; s < i.length; s++) {
							var r = i[s],
								o = P.getSelectorFromElement(r);
							null !== o && t(o).filter(e).length > 0 && (this._selector = o, this._triggerArray.push(r))
						}
						this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
					}
					var o = i.prototype;
					return o.toggle = function () {
						t(this._element).hasClass(c) ? this.hide() : this.show()
					}, o.show = function () {
						var e, s, r = this;
						if (!this._isTransitioning && !t(this._element).hasClass(c) && (this._parent && 0 === (e = t.makeArray(t(this._parent).find(p.ACTIVES).filter('[data-parent="' + this._config.parent + '"]'))).length && (e = null), !(e && (s = t(e).not(this._selector).data(n)) && s._isTransitioning))) {
							var o = t.Event(h.SHOW);
							if (t(this._element).trigger(o), !o.isDefaultPrevented()) {
								e && (i._jQueryInterface.call(t(e).not(this._selector), "hide"), s || t(e).data(n, null));
								var a = this._getDimension();
								t(this._element).removeClass(u).addClass(f), this._element.style[a] = 0, this._triggerArray.length > 0 && t(this._triggerArray).removeClass(d).attr("aria-expanded", !0), this.setTransitioning(!0);
								var l = function () {
									t(r._element).removeClass(f).addClass(u).addClass(c), r._element.style[a] = "", r.setTransitioning(!1), t(r._element).trigger(h.SHOWN)
								};
								if (P.supportsTransitionEnd()) {
									var _ = "scroll" + (a[0].toUpperCase() + a.slice(1));
									t(this._element).one(P.TRANSITION_END, l).emulateTransitionEnd(600), this._element.style[a] = this._element[_] + "px"
								} else l()
							}
						}
					}, o.hide = function () {
						var e = this;
						if (!this._isTransitioning && t(this._element).hasClass(c)) {
							var n = t.Event(h.HIDE);
							if (t(this._element).trigger(n), !n.isDefaultPrevented()) {
								var i = this._getDimension();
								if (this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", P.reflow(this._element), t(this._element).addClass(f).removeClass(u).removeClass(c), this._triggerArray.length > 0)
									for (var s = 0; s < this._triggerArray.length; s++) {
										var r = this._triggerArray[s],
											o = P.getSelectorFromElement(r);
										if (null !== o) t(o).hasClass(c) || t(r).addClass(d).attr("aria-expanded", !1)
									}
								this.setTransitioning(!0);
								var a = function () {
									e.setTransitioning(!1), t(e._element).removeClass(f).addClass(u).trigger(h.HIDDEN)
								};
								this._element.style[i] = "", P.supportsTransitionEnd() ? t(this._element).one(P.TRANSITION_END, a).emulateTransitionEnd(600) : a()
							}
						}
					}, o.setTransitioning = function (t) {
						this._isTransitioning = t
					}, o.dispose = function () {
						t.removeData(this._element, n), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
					}, o._getConfig = function (t) {
						return (t = r({}, a, t)).toggle = Boolean(t.toggle), P.typeCheckConfig(e, t, l), t
					}, o._getDimension = function () {
						return t(this._element).hasClass(_) ? _ : g
					}, o._getParent = function () {
						var e = this,
							n = null;
						P.isElement(this._config.parent) ? (n = this._config.parent, "undefined" != typeof this._config.parent.jquery && (n = this._config.parent[0])) : n = t(this._config.parent)[0];
						var s = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
						return t(n).find(s).each(function (t, n) {
							e._addAriaAndCollapsedClass(i._getTargetFromElement(n), [n])
						}), n
					}, o._addAriaAndCollapsedClass = function (e, n) {
						if (e) {
							var i = t(e).hasClass(c);
							n.length > 0 && t(n).toggleClass(d, !i).attr("aria-expanded", i)
						}
					}, i._getTargetFromElement = function (e) {
						var n = P.getSelectorFromElement(e);
						return n ? t(n)[0] : null
					}, i._jQueryInterface = function (e) {
						return this.each(function () {
							var s = t(this),
								o = s.data(n),
								l = r({}, a, s.data(), "object" == typeof e && e);
							if (!o && l.toggle && /show|hide/.test(e) && (l.toggle = !1), o || (o = new i(this, l), s.data(n, o)), "string" == typeof e) {
								if ("undefined" == typeof o[e]) throw new TypeError('No method named "' + e + '"');
								o[e]()
							}
						})
					}, s(i, null, [{
						key: "VERSION",
						get: function () {
							return "4.0.0"
						}
					}, {
						key: "Default",
						get: function () {
							return a
						}
					}]), i
				}();
			return t(document).on(h.CLICK_DATA_API, p.DATA_TOGGLE, function (e) {
				"A" === e.currentTarget.tagName && e.preventDefault();
				var i = t(this),
					s = P.getSelectorFromElement(this);
				t(s).each(function () {
					var e = t(this),
						s = e.data(n) ? "toggle" : i.data();
					m._jQueryInterface.call(e, s)
				})
			}), t.fn[e] = m._jQueryInterface, t.fn[e].Constructor = m, t.fn[e].noConflict = function () {
				return t.fn[e] = o, m._jQueryInterface
			}, m
		}(e),
		W = function (t) {
			var e = "dropdown",
				i = "bs.dropdown",
				o = "." + i,
				a = ".data-api",
				l = t.fn[e],
				h = new RegExp("38|40|27"),
				c = {
					HIDE: "hide" + o,
					HIDDEN: "hidden" + o,
					SHOW: "show" + o,
					SHOWN: "shown" + o,
					CLICK: "click" + o,
					CLICK_DATA_API: "click" + o + a,
					KEYDOWN_DATA_API: "keydown" + o + a,
					KEYUP_DATA_API: "keyup" + o + a
				},
				u = "disabled",
				f = "show",
				d = "dropup",
				_ = "dropright",
				g = "dropleft",
				p = "dropdown-menu-right",
				m = "dropdown-menu-left",
				v = "position-static",
				E = '[data-toggle="dropdown"]',
				T = ".dropdown form",
				y = ".dropdown-menu",
				C = ".navbar-nav",
				I = ".dropdown-menu .dropdown-item:not(.disabled)",
				A = "top-start",
				b = "top-end",
				D = "bottom-start",
				S = "bottom-end",
				w = "right-start",
				N = "left-start",
				O = {
					offset: 0,
					flip: !0,
					boundary: "scrollParent"
				},
				k = {
					offset: "(number|string|function)",
					flip: "boolean",
					boundary: "(string|element)"
				},
				L = function () {
					function a(t, e) {
						this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
					}
					var l = a.prototype;
					return l.toggle = function () {
						if (!this._element.disabled && !t(this._element).hasClass(u)) {
							var e = a._getParentFromElement(this._element),
								i = t(this._menu).hasClass(f);
							if (a._clearMenus(), !i) {
								var s = {
										relatedTarget: this._element
									},
									r = t.Event(c.SHOW, s);
								if (t(e).trigger(r), !r.isDefaultPrevented()) {
									if (!this._inNavbar) {
										if ("undefined" == typeof n) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
										var o = this._element;
										t(e).hasClass(d) && (t(this._menu).hasClass(m) || t(this._menu).hasClass(p)) && (o = e), "scrollParent" !== this._config.boundary && t(e).addClass(v), this._popper = new n(o, this._menu, this._getPopperConfig())
									}
									"ontouchstart" in document.documentElement && 0 === t(e).closest(C).length && t("body").children().on("mouseover", null, t.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), t(this._menu).toggleClass(f), t(e).toggleClass(f).trigger(t.Event(c.SHOWN, s))
								}
							}
						}
					}, l.dispose = function () {
						t.removeData(this._element, i), t(this._element).off(o), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
					}, l.update = function () {
						this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
					}, l._addEventListeners = function () {
						var e = this;
						t(this._element).on(c.CLICK, function (t) {
							t.preventDefault(), t.stopPropagation(), e.toggle()
						})
					}, l._getConfig = function (n) {
						return n = r({}, this.constructor.Default, t(this._element).data(), n), P.typeCheckConfig(e, n, this.constructor.DefaultType), n
					}, l._getMenuElement = function () {
						if (!this._menu) {
							var e = a._getParentFromElement(this._element);
							this._menu = t(e).find(y)[0]
						}
						return this._menu
					}, l._getPlacement = function () {
						var e = t(this._element).parent(),
							n = D;
						return e.hasClass(d) ? (n = A, t(this._menu).hasClass(p) && (n = b)) : e.hasClass(_) ? n = w : e.hasClass(g) ? n = N : t(this._menu).hasClass(p) && (n = S), n
					}, l._detectNavbar = function () {
						return t(this._element).closest(".navbar").length > 0
					}, l._getPopperConfig = function () {
						var t = this,
							e = {};
						return "function" == typeof this._config.offset ? e.fn = function (e) {
							return e.offsets = r({}, e.offsets, t._config.offset(e.offsets) || {}), e
						} : e.offset = this._config.offset, {
							placement: this._getPlacement(),
							modifiers: {
								offset: e,
								flip: {
									enabled: this._config.flip
								},
								preventOverflow: {
									boundariesElement: this._config.boundary
								}
							}
						}
					}, a._jQueryInterface = function (e) {
						return this.each(function () {
							var n = t(this).data(i);
							if (n || (n = new a(this, "object" == typeof e ? e : null), t(this).data(i, n)), "string" == typeof e) {
								if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
								n[e]()
							}
						})
					}, a._clearMenus = function (e) {
						if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which))
							for (var n = t.makeArray(t(E)), s = 0; s < n.length; s++) {
								var r = a._getParentFromElement(n[s]),
									o = t(n[s]).data(i),
									l = {
										relatedTarget: n[s]
									};
								if (o) {
									var h = o._menu;
									if (t(r).hasClass(f) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && t.contains(r, e.target))) {
										var u = t.Event(c.HIDE, l);
										t(r).trigger(u), u.isDefaultPrevented() || ("ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), n[s].setAttribute("aria-expanded", "false"), t(h).removeClass(f), t(r).removeClass(f).trigger(t.Event(c.HIDDEN, l)))
									}
								}
							}
					}, a._getParentFromElement = function (e) {
						var n, i = P.getSelectorFromElement(e);
						return i && (n = t(i)[0]), n || e.parentNode
					}, a._dataApiKeydownHandler = function (e) {
						if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || t(e.target).closest(y).length)) : h.test(e.which)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !t(this).hasClass(u))) {
							var n = a._getParentFromElement(this),
								i = t(n).hasClass(f);
							if ((i || 27 === e.which && 32 === e.which) && (!i || 27 !== e.which && 32 !== e.which)) {
								var s = t(n).find(I).get();
								if (0 !== s.length) {
									var r = s.indexOf(e.target);
									38 === e.which && r > 0 && r--, 40 === e.which && r < s.length - 1 && r++, r < 0 && (r = 0), s[r].focus()
								}
							} else {
								if (27 === e.which) {
									var o = t(n).find(E)[0];
									t(o).trigger("focus")
								}
								t(this).trigger("click")
							}
						}
					}, s(a, null, [{
						key: "VERSION",
						get: function () {
							return "4.0.0"
						}
					}, {
						key: "Default",
						get: function () {
							return O
						}
					}, {
						key: "DefaultType",
						get: function () {
							return k
						}
					}]), a
				}();
			return t(document).on(c.KEYDOWN_DATA_API, E, L._dataApiKeydownHandler).on(c.KEYDOWN_DATA_API, y, L._dataApiKeydownHandler).on(c.CLICK_DATA_API + " " + c.KEYUP_DATA_API, L._clearMenus).on(c.CLICK_DATA_API, E, function (e) {
				e.preventDefault(), e.stopPropagation(), L._jQueryInterface.call(t(this), "toggle")
			}).on(c.CLICK_DATA_API, T, function (t) {
				t.stopPropagation()
			}), t.fn[e] = L._jQueryInterface, t.fn[e].Constructor = L, t.fn[e].noConflict = function () {
				return t.fn[e] = l, L._jQueryInterface
			}, L
		}(e),
		M = function (t) {
			var e = "modal",
				n = "bs.modal",
				i = "." + n,
				o = t.fn.modal,
				a = {
					backdrop: !0,
					keyboard: !0,
					focus: !0,
					show: !0
				},
				l = {
					backdrop: "(boolean|string)",
					keyboard: "boolean",
					focus: "boolean",
					show: "boolean"
				},
				h = {
					HIDE: "hide" + i,
					HIDDEN: "hidden" + i,
					SHOW: "show" + i,
					SHOWN: "shown" + i,
					FOCUSIN: "focusin" + i,
					RESIZE: "resize" + i,
					CLICK_DISMISS: "click.dismiss" + i,
					KEYDOWN_DISMISS: "keydown.dismiss" + i,
					MOUSEUP_DISMISS: "mouseup.dismiss" + i,
					MOUSEDOWN_DISMISS: "mousedown.dismiss" + i,
					CLICK_DATA_API: "click" + i + ".data-api"
				},
				c = "modal-scrollbar-measure",
				u = "modal-backdrop",
				f = "modal-open",
				d = "fade",
				_ = "show",
				g = {
					DIALOG: ".modal-dialog",
					DATA_TOGGLE: '[data-toggle="modal"]',
					DATA_DISMISS: '[data-dismiss="modal"]',
					FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
					STICKY_CONTENT: ".sticky-top",
					NAVBAR_TOGGLER: ".navbar-toggler"
				},
				p = function () {
					function o(e, n) {
						this._config = this._getConfig(n), this._element = e, this._dialog = t(e).find(g.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
					}
					var p = o.prototype;
					return p.toggle = function (t) {
						return this._isShown ? this.hide() : this.show(t)
					}, p.show = function (e) {
						var n = this;
						if (!this._isTransitioning && !this._isShown) {
							P.supportsTransitionEnd() && t(this._element).hasClass(d) && (this._isTransitioning = !0);
							var i = t.Event(h.SHOW, {
								relatedTarget: e
							});
							t(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), t(document.body).addClass(f), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(h.CLICK_DISMISS, g.DATA_DISMISS, function (t) {
								return n.hide(t)
							}), t(this._dialog).on(h.MOUSEDOWN_DISMISS, function () {
								t(n._element).one(h.MOUSEUP_DISMISS, function (e) {
									t(e.target).is(n._element) && (n._ignoreBackdropClick = !0)
								})
							}), this._showBackdrop(function () {
								return n._showElement(e)
							}))
						}
					}, p.hide = function (e) {
						var n = this;
						if (e && e.preventDefault(), !this._isTransitioning && this._isShown) {
							var i = t.Event(h.HIDE);
							if (t(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
								this._isShown = !1;
								var s = P.supportsTransitionEnd() && t(this._element).hasClass(d);
								s && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), t(document).off(h.FOCUSIN), t(this._element).removeClass(_), t(this._element).off(h.CLICK_DISMISS), t(this._dialog).off(h.MOUSEDOWN_DISMISS), s ? t(this._element).one(P.TRANSITION_END, function (t) {
									return n._hideModal(t)
								}).emulateTransitionEnd(300) : this._hideModal()
							}
						}
					}, p.dispose = function () {
						t.removeData(this._element, n), t(window, document, this._element, this._backdrop).off(i), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
					}, p.handleUpdate = function () {
						this._adjustDialog()
					}, p._getConfig = function (t) {
						return t = r({}, a, t), P.typeCheckConfig(e, t, l), t
					}, p._showElement = function (e) {
						var n = this,
							i = P.supportsTransitionEnd() && t(this._element).hasClass(d);
						this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && P.reflow(this._element), t(this._element).addClass(_), this._config.focus && this._enforceFocus();
						var s = t.Event(h.SHOWN, {
								relatedTarget: e
							}),
							r = function () {
								n._config.focus && n._element.focus(), n._isTransitioning = !1, t(n._element).trigger(s)
							};
						i ? t(this._dialog).one(P.TRANSITION_END, r).emulateTransitionEnd(300) : r()
					}, p._enforceFocus = function () {
						var e = this;
						t(document).off(h.FOCUSIN).on(h.FOCUSIN, function (n) {
							document !== n.target && e._element !== n.target && 0 === t(e._element).has(n.target).length && e._element.focus()
						})
					}, p._setEscapeEvent = function () {
						var e = this;
						this._isShown && this._config.keyboard ? t(this._element).on(h.KEYDOWN_DISMISS, function (t) {
							27 === t.which && (t.preventDefault(), e.hide())
						}) : this._isShown || t(this._element).off(h.KEYDOWN_DISMISS)
					}, p._setResizeEvent = function () {
						var e = this;
						this._isShown ? t(window).on(h.RESIZE, function (t) {
							return e.handleUpdate(t)
						}) : t(window).off(h.RESIZE)
					}, p._hideModal = function () {
						var e = this;
						this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function () {
							t(document.body).removeClass(f), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(h.HIDDEN)
						})
					}, p._removeBackdrop = function () {
						this._backdrop && (t(this._backdrop).remove(), this._backdrop = null)
					}, p._showBackdrop = function (e) {
						var n = this,
							i = t(this._element).hasClass(d) ? d : "";
						if (this._isShown && this._config.backdrop) {
							var s = P.supportsTransitionEnd() && i;
							if (this._backdrop = document.createElement("div"), this._backdrop.className = u, i && t(this._backdrop).addClass(i), t(this._backdrop).appendTo(document.body), t(this._element).on(h.CLICK_DISMISS, function (t) {
									n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide())
								}), s && P.reflow(this._backdrop), t(this._backdrop).addClass(_), !e) return;
							if (!s) return void e();
							t(this._backdrop).one(P.TRANSITION_END, e).emulateTransitionEnd(150)
						} else if (!this._isShown && this._backdrop) {
							t(this._backdrop).removeClass(_);
							var r = function () {
								n._removeBackdrop(), e && e()
							};
							P.supportsTransitionEnd() && t(this._element).hasClass(d) ? t(this._backdrop).one(P.TRANSITION_END, r).emulateTransitionEnd(150) : r()
						} else e && e()
					}, p._adjustDialog = function () {
						var t = this._element.scrollHeight > document.documentElement.clientHeight;
						!this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
					}, p._resetAdjustments = function () {
						this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
					}, p._checkScrollbar = function () {
						var t = document.body.getBoundingClientRect();
						this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
					}, p._setScrollbar = function () {
						var e = this;
						if (this._isBodyOverflowing) {
							t(g.FIXED_CONTENT).each(function (n, i) {
								var s = t(i)[0].style.paddingRight,
									r = t(i).css("padding-right");
								t(i).data("padding-right", s).css("padding-right", parseFloat(r) + e._scrollbarWidth + "px")
							}), t(g.STICKY_CONTENT).each(function (n, i) {
								var s = t(i)[0].style.marginRight,
									r = t(i).css("margin-right");
								t(i).data("margin-right", s).css("margin-right", parseFloat(r) - e._scrollbarWidth + "px")
							}), t(g.NAVBAR_TOGGLER).each(function (n, i) {
								var s = t(i)[0].style.marginRight,
									r = t(i).css("margin-right");
								t(i).data("margin-right", s).css("margin-right", parseFloat(r) + e._scrollbarWidth + "px")
							});
							var n = document.body.style.paddingRight,
								i = t("body").css("padding-right");
							t("body").data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
						}
					}, p._resetScrollbar = function () {
						t(g.FIXED_CONTENT).each(function (e, n) {
							var i = t(n).data("padding-right");
							"undefined" != typeof i && t(n).css("padding-right", i).removeData("padding-right")
						}), t(g.STICKY_CONTENT + ", " + g.NAVBAR_TOGGLER).each(function (e, n) {
							var i = t(n).data("margin-right");
							"undefined" != typeof i && t(n).css("margin-right", i).removeData("margin-right")
						});
						var e = t("body").data("padding-right");
						"undefined" != typeof e && t("body").css("padding-right", e).removeData("padding-right")
					}, p._getScrollbarWidth = function () {
						var t = document.createElement("div");
						t.className = c, document.body.appendChild(t);
						var e = t.getBoundingClientRect().width - t.clientWidth;
						return document.body.removeChild(t), e
					}, o._jQueryInterface = function (e, i) {
						return this.each(function () {
							var s = t(this).data(n),
								a = r({}, o.Default, t(this).data(), "object" == typeof e && e);
							if (s || (s = new o(this, a), t(this).data(n, s)), "string" == typeof e) {
								if ("undefined" == typeof s[e]) throw new TypeError('No method named "' + e + '"');
								s[e](i)
							} else a.show && s.show(i)
						})
					}, s(o, null, [{
						key: "VERSION",
						get: function () {
							return "4.0.0"
						}
					}, {
						key: "Default",
						get: function () {
							return a
						}
					}]), o
				}();
			return t(document).on(h.CLICK_DATA_API, g.DATA_TOGGLE, function (e) {
				var i, s = this,
					o = P.getSelectorFromElement(this);
				o && (i = t(o)[0]);
				var a = t(i).data(n) ? "toggle" : r({}, t(i).data(), t(this).data());
				"A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
				var l = t(i).one(h.SHOW, function (e) {
					e.isDefaultPrevented() || l.one(h.HIDDEN, function () {
						t(s).is(":visible") && s.focus()
					})
				});
				p._jQueryInterface.call(t(i), a, this)
			}), t.fn.modal = p._jQueryInterface, t.fn.modal.Constructor = p, t.fn.modal.noConflict = function () {
				return t.fn.modal = o, p._jQueryInterface
			}, p
		}(e),
		U = function (t) {
			var e = "tooltip",
				i = "bs.tooltip",
				o = "." + i,
				a = t.fn[e],
				l = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
				h = {
					animation: "boolean",
					template: "string",
					title: "(string|element|function)",
					trigger: "string",
					delay: "(number|object)",
					html: "boolean",
					selector: "(string|boolean)",
					placement: "(string|function)",
					offset: "(number|string)",
					container: "(string|element|boolean)",
					fallbackPlacement: "(string|array)",
					boundary: "(string|element)"
				},
				c = {
					AUTO: "auto",
					TOP: "top",
					RIGHT: "right",
					BOTTOM: "bottom",
					LEFT: "left"
				},
				u = {
					animation: !0,
					template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
					trigger: "hover focus",
					title: "",
					delay: 0,
					html: !1,
					selector: !1,
					placement: "top",
					offset: 0,
					container: !1,
					fallbackPlacement: "flip",
					boundary: "scrollParent"
				},
				f = "show",
				d = "out",
				_ = {
					HIDE: "hide" + o,
					HIDDEN: "hidden" + o,
					SHOW: "show" + o,
					SHOWN: "shown" + o,
					INSERTED: "inserted" + o,
					CLICK: "click" + o,
					FOCUSIN: "focusin" + o,
					FOCUSOUT: "focusout" + o,
					MOUSEENTER: "mouseenter" + o,
					MOUSELEAVE: "mouseleave" + o
				},
				g = "fade",
				p = "show",
				m = ".tooltip-inner",
				v = ".arrow",
				E = "hover",
				T = "focus",
				y = "click",
				C = "manual",
				I = function () {
					function a(t, e) {
						if ("undefined" == typeof n) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
						this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
					}
					var I = a.prototype;
					return I.enable = function () {
						this._isEnabled = !0
					}, I.disable = function () {
						this._isEnabled = !1
					}, I.toggleEnabled = function () {
						this._isEnabled = !this._isEnabled
					}, I.toggle = function (e) {
						if (this._isEnabled)
							if (e) {
								var n = this.constructor.DATA_KEY,
									i = t(e.currentTarget).data(n);
								i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
							} else {
								if (t(this.getTipElement()).hasClass(p)) return void this._leave(null, this);
								this._enter(null, this)
							}
					}, I.dispose = function () {
						clearTimeout(this._timeout), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
					}, I.show = function () {
						var e = this;
						if ("none" === t(this.element).css("display")) throw new Error("Please use show on visible elements");
						var i = t.Event(this.constructor.Event.SHOW);
						if (this.isWithContent() && this._isEnabled) {
							t(this.element).trigger(i);
							var s = t.contains(this.element.ownerDocument.documentElement, this.element);
							if (i.isDefaultPrevented() || !s) return;
							var r = this.getTipElement(),
								o = P.getUID(this.constructor.NAME);
							r.setAttribute("id", o), this.element.setAttribute("aria-describedby", o), this.setContent(), this.config.animation && t(r).addClass(g);
							var l = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
								h = this._getAttachment(l);
							this.addAttachmentClass(h);
							var c = !1 === this.config.container ? document.body : t(this.config.container);
							t(r).data(this.constructor.DATA_KEY, this), t.contains(this.element.ownerDocument.documentElement, this.tip) || t(r).appendTo(c), t(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new n(this.element, r, {
								placement: h,
								modifiers: {
									offset: {
										offset: this.config.offset
									},
									flip: {
										behavior: this.config.fallbackPlacement
									},
									arrow: {
										element: v
									},
									preventOverflow: {
										boundariesElement: this.config.boundary
									}
								},
								onCreate: function (t) {
									t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
								},
								onUpdate: function (t) {
									e._handlePopperPlacementChange(t)
								}
							}), t(r).addClass(p), "ontouchstart" in document.documentElement && t("body").children().on("mouseover", null, t.noop);
							var u = function () {
								e.config.animation && e._fixTransition();
								var n = e._hoverState;
								e._hoverState = null, t(e.element).trigger(e.constructor.Event.SHOWN), n === d && e._leave(null, e)
							};
							P.supportsTransitionEnd() && t(this.tip).hasClass(g) ? t(this.tip).one(P.TRANSITION_END, u).emulateTransitionEnd(a._TRANSITION_DURATION) : u()
						}
					}, I.hide = function (e) {
						var n = this,
							i = this.getTipElement(),
							s = t.Event(this.constructor.Event.HIDE),
							r = function () {
								n._hoverState !== f && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), t(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), e && e()
							};
						t(this.element).trigger(s), s.isDefaultPrevented() || (t(i).removeClass(p), "ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), this._activeTrigger[y] = !1, this._activeTrigger[T] = !1, this._activeTrigger[E] = !1, P.supportsTransitionEnd() && t(this.tip).hasClass(g) ? t(i).one(P.TRANSITION_END, r).emulateTransitionEnd(150) : r(), this._hoverState = "")
					}, I.update = function () {
						null !== this._popper && this._popper.scheduleUpdate()
					}, I.isWithContent = function () {
						return Boolean(this.getTitle())
					}, I.addAttachmentClass = function (e) {
						t(this.getTipElement()).addClass("bs-tooltip-" + e)
					}, I.getTipElement = function () {
						return this.tip = this.tip || t(this.config.template)[0], this.tip
					}, I.setContent = function () {
						var e = t(this.getTipElement());
						this.setElementContent(e.find(m), this.getTitle()), e.removeClass(g + " " + p)
					}, I.setElementContent = function (e, n) {
						var i = this.config.html;
						"object" == typeof n && (n.nodeType || n.jquery) ? i ? t(n).parent().is(e) || e.empty().append(n) : e.text(t(n).text()) : e[i ? "html" : "text"](n)
					}, I.getTitle = function () {
						var t = this.element.getAttribute("data-original-title");
						return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
					}, I._getAttachment = function (t) {
						return c[t.toUpperCase()]
					}, I._setListeners = function () {
						var e = this;
						this.config.trigger.split(" ").forEach(function (n) {
							if ("click" === n) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function (t) {
								return e.toggle(t)
							});
							else if (n !== C) {
								var i = n === E ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
									s = n === E ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
								t(e.element).on(i, e.config.selector, function (t) {
									return e._enter(t)
								}).on(s, e.config.selector, function (t) {
									return e._leave(t)
								})
							}
							t(e.element).closest(".modal").on("hide.bs.modal", function () {
								return e.hide()
							})
						}), this.config.selector ? this.config = r({}, this.config, {
							trigger: "manual",
							selector: ""
						}) : this._fixTitle()
					}, I._fixTitle = function () {
						var t = typeof this.element.getAttribute("data-original-title");
						(this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
					}, I._enter = function (e, n) {
						var i = this.constructor.DATA_KEY;
						(n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusin" === e.type ? T : E] = !0), t(n.getTipElement()).hasClass(p) || n._hoverState === f ? n._hoverState = f : (clearTimeout(n._timeout), n._hoverState = f, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function () {
							n._hoverState === f && n.show()
						}, n.config.delay.show) : n.show())
					}, I._leave = function (e, n) {
						var i = this.constructor.DATA_KEY;
						(n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusout" === e.type ? T : E] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = d, n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function () {
							n._hoverState === d && n.hide()
						}, n.config.delay.hide) : n.hide())
					}, I._isWithActiveTrigger = function () {
						for (var t in this._activeTrigger)
							if (this._activeTrigger[t]) return !0;
						return !1
					}, I._getConfig = function (n) {
						return "number" == typeof (n = r({}, this.constructor.Default, t(this.element).data(), n)).delay && (n.delay = {
							show: n.delay,
							hide: n.delay
						}), "number" == typeof n.title && (n.title = n.title.toString()), "number" == typeof n.content && (n.content = n.content.toString()), P.typeCheckConfig(e, n, this.constructor.DefaultType), n
					}, I._getDelegateConfig = function () {
						var t = {};
						if (this.config)
							for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
						return t
					}, I._cleanTipClass = function () {
						var e = t(this.getTipElement()),
							n = e.attr("class").match(l);
						null !== n && n.length > 0 && e.removeClass(n.join(""))
					}, I._handlePopperPlacementChange = function (t) {
						this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
					}, I._fixTransition = function () {
						var e = this.getTipElement(),
							n = this.config.animation;
						null === e.getAttribute("x-placement") && (t(e).removeClass(g), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
					}, a._jQueryInterface = function (e) {
						return this.each(function () {
							var n = t(this).data(i),
								s = "object" == typeof e && e;
							if ((n || !/dispose|hide/.test(e)) && (n || (n = new a(this, s), t(this).data(i, n)), "string" == typeof e)) {
								if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
								n[e]()
							}
						})
					}, s(a, null, [{
						key: "VERSION",
						get: function () {
							return "4.0.0"
						}
					}, {
						key: "Default",
						get: function () {
							return u
						}
					}, {
						key: "NAME",
						get: function () {
							return e
						}
					}, {
						key: "DATA_KEY",
						get: function () {
							return i
						}
					}, {
						key: "Event",
						get: function () {
							return _
						}
					}, {
						key: "EVENT_KEY",
						get: function () {
							return o
						}
					}, {
						key: "DefaultType",
						get: function () {
							return h
						}
					}]), a
				}();
			return t.fn[e] = I._jQueryInterface, t.fn[e].Constructor = I, t.fn[e].noConflict = function () {
				return t.fn[e] = a, I._jQueryInterface
			}, I
		}(e),
		x = function (t) {
			var e = "popover",
				n = "bs.popover",
				i = "." + n,
				o = t.fn[e],
				a = new RegExp("(^|\\s)bs-popover\\S+", "g"),
				l = r({}, U.Default, {
					placement: "right",
					trigger: "click",
					content: "",
					template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
				}),
				h = r({}, U.DefaultType, {
					content: "(string|element|function)"
				}),
				c = "fade",
				u = "show",
				f = ".popover-header",
				d = ".popover-body",
				_ = {
					HIDE: "hide" + i,
					HIDDEN: "hidden" + i,
					SHOW: "show" + i,
					SHOWN: "shown" + i,
					INSERTED: "inserted" + i,
					CLICK: "click" + i,
					FOCUSIN: "focusin" + i,
					FOCUSOUT: "focusout" + i,
					MOUSEENTER: "mouseenter" + i,
					MOUSELEAVE: "mouseleave" + i
				},
				g = function (r) {
					var o, g;

					function p() {
						return r.apply(this, arguments) || this
					}
					g = r, (o = p).prototype = Object.create(g.prototype), o.prototype.constructor = o, o.__proto__ = g;
					var m = p.prototype;
					return m.isWithContent = function () {
						return this.getTitle() || this._getContent()
					}, m.addAttachmentClass = function (e) {
						t(this.getTipElement()).addClass("bs-popover-" + e)
					}, m.getTipElement = function () {
						return this.tip = this.tip || t(this.config.template)[0], this.tip
					}, m.setContent = function () {
						var e = t(this.getTipElement());
						this.setElementContent(e.find(f), this.getTitle());
						var n = this._getContent();
						"function" == typeof n && (n = n.call(this.element)), this.setElementContent(e.find(d), n), e.removeClass(c + " " + u)
					}, m._getContent = function () {
						return this.element.getAttribute("data-content") || this.config.content
					}, m._cleanTipClass = function () {
						var e = t(this.getTipElement()),
							n = e.attr("class").match(a);
						null !== n && n.length > 0 && e.removeClass(n.join(""))
					}, p._jQueryInterface = function (e) {
						return this.each(function () {
							var i = t(this).data(n),
								s = "object" == typeof e ? e : null;
							if ((i || !/destroy|hide/.test(e)) && (i || (i = new p(this, s), t(this).data(n, i)), "string" == typeof e)) {
								if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
								i[e]()
							}
						})
					}, s(p, null, [{
						key: "VERSION",
						get: function () {
							return "4.0.0"
						}
					}, {
						key: "Default",
						get: function () {
							return l
						}
					}, {
						key: "NAME",
						get: function () {
							return e
						}
					}, {
						key: "DATA_KEY",
						get: function () {
							return n
						}
					}, {
						key: "Event",
						get: function () {
							return _
						}
					}, {
						key: "EVENT_KEY",
						get: function () {
							return i
						}
					}, {
						key: "DefaultType",
						get: function () {
							return h
						}
					}]), p
				}(U);
			return t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function () {
				return t.fn[e] = o, g._jQueryInterface
			}, g
		}(e),
		K = function (t) {
			var e = "scrollspy",
				n = "bs.scrollspy",
				i = "." + n,
				o = t.fn[e],
				a = {
					offset: 10,
					method: "auto",
					target: ""
				},
				l = {
					offset: "number",
					method: "string",
					target: "(string|element)"
				},
				h = {
					ACTIVATE: "activate" + i,
					SCROLL: "scroll" + i,
					LOAD_DATA_API: "load" + i + ".data-api"
				},
				c = "dropdown-item",
				u = "active",
				f = {
					DATA_SPY: '[data-spy="scroll"]',
					ACTIVE: ".active",
					NAV_LIST_GROUP: ".nav, .list-group",
					NAV_LINKS: ".nav-link",
					NAV_ITEMS: ".nav-item",
					LIST_ITEMS: ".list-group-item",
					DROPDOWN: ".dropdown",
					DROPDOWN_ITEMS: ".dropdown-item",
					DROPDOWN_TOGGLE: ".dropdown-toggle"
				},
				d = "offset",
				_ = "position",
				g = function () {
					function o(e, n) {
						var i = this;
						this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(n), this._selector = this._config.target + " " + f.NAV_LINKS + "," + this._config.target + " " + f.LIST_ITEMS + "," + this._config.target + " " + f.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(h.SCROLL, function (t) {
							return i._process(t)
						}), this.refresh(), this._process()
					}
					var g = o.prototype;
					return g.refresh = function () {
						var e = this,
							n = this._scrollElement === this._scrollElement.window ? d : _,
							i = "auto" === this._config.method ? n : this._config.method,
							s = i === _ ? this._getScrollTop() : 0;
						this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), t.makeArray(t(this._selector)).map(function (e) {
							var n, r = P.getSelectorFromElement(e);
							if (r && (n = t(r)[0]), n) {
								var o = n.getBoundingClientRect();
								if (o.width || o.height) return [t(n)[i]().top + s, r]
							}
							return null
						}).filter(function (t) {
							return t
						}).sort(function (t, e) {
							return t[0] - e[0]
						}).forEach(function (t) {
							e._offsets.push(t[0]), e._targets.push(t[1])
						})
					}, g.dispose = function () {
						t.removeData(this._element, n), t(this._scrollElement).off(i), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
					}, g._getConfig = function (n) {
						if ("string" != typeof (n = r({}, a, n)).target) {
							var i = t(n.target).attr("id");
							i || (i = P.getUID(e), t(n.target).attr("id", i)), n.target = "#" + i
						}
						return P.typeCheckConfig(e, n, l), n
					}, g._getScrollTop = function () {
						return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
					}, g._getScrollHeight = function () {
						return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
					}, g._getOffsetHeight = function () {
						return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
					}, g._process = function () {
						var t = this._getScrollTop() + this._config.offset,
							e = this._getScrollHeight(),
							n = this._config.offset + e - this._getOffsetHeight();
						if (this._scrollHeight !== e && this.refresh(), t >= n) {
							var i = this._targets[this._targets.length - 1];
							this._activeTarget !== i && this._activate(i)
						} else {
							if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
							for (var s = this._offsets.length; s--;) {
								this._activeTarget !== this._targets[s] && t >= this._offsets[s] && ("undefined" == typeof this._offsets[s + 1] || t < this._offsets[s + 1]) && this._activate(this._targets[s])
							}
						}
					}, g._activate = function (e) {
						this._activeTarget = e, this._clear();
						var n = this._selector.split(",");
						n = n.map(function (t) {
							return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
						});
						var i = t(n.join(","));
						i.hasClass(c) ? (i.closest(f.DROPDOWN).find(f.DROPDOWN_TOGGLE).addClass(u), i.addClass(u)) : (i.addClass(u), i.parents(f.NAV_LIST_GROUP).prev(f.NAV_LINKS + ", " + f.LIST_ITEMS).addClass(u), i.parents(f.NAV_LIST_GROUP).prev(f.NAV_ITEMS).children(f.NAV_LINKS).addClass(u)), t(this._scrollElement).trigger(h.ACTIVATE, {
							relatedTarget: e
						})
					}, g._clear = function () {
						t(this._selector).filter(f.ACTIVE).removeClass(u)
					}, o._jQueryInterface = function (e) {
						return this.each(function () {
							var i = t(this).data(n);
							if (i || (i = new o(this, "object" == typeof e && e), t(this).data(n, i)), "string" == typeof e) {
								if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
								i[e]()
							}
						})
					}, s(o, null, [{
						key: "VERSION",
						get: function () {
							return "4.0.0"
						}
					}, {
						key: "Default",
						get: function () {
							return a
						}
					}]), o
				}();
			return t(window).on(h.LOAD_DATA_API, function () {
				for (var e = t.makeArray(t(f.DATA_SPY)), n = e.length; n--;) {
					var i = t(e[n]);
					g._jQueryInterface.call(i, i.data())
				}
			}), t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function () {
				return t.fn[e] = o, g._jQueryInterface
			}, g
		}(e),
		V = function (t) {
			var e = "bs.tab",
				n = "." + e,
				i = t.fn.tab,
				r = {
					HIDE: "hide" + n,
					HIDDEN: "hidden" + n,
					SHOW: "show" + n,
					SHOWN: "shown" + n,
					CLICK_DATA_API: "click.bs.tab.data-api"
				},
				o = "dropdown-menu",
				a = "active",
				l = "disabled",
				h = "fade",
				c = "show",
				u = ".dropdown",
				f = ".nav, .list-group",
				d = ".active",
				_ = "> li > .active",
				g = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
				p = ".dropdown-toggle",
				m = "> .dropdown-menu .active",
				v = function () {
					function n(t) {
						this._element = t
					}
					var i = n.prototype;
					return i.show = function () {
						var e = this;
						if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(a) || t(this._element).hasClass(l))) {
							var n, i, s = t(this._element).closest(f)[0],
								o = P.getSelectorFromElement(this._element);
							if (s) {
								var h = "UL" === s.nodeName ? _ : d;
								i = (i = t.makeArray(t(s).find(h)))[i.length - 1]
							}
							var c = t.Event(r.HIDE, {
									relatedTarget: this._element
								}),
								u = t.Event(r.SHOW, {
									relatedTarget: i
								});
							if (i && t(i).trigger(c), t(this._element).trigger(u), !u.isDefaultPrevented() && !c.isDefaultPrevented()) {
								o && (n = t(o)[0]), this._activate(this._element, s);
								var g = function () {
									var n = t.Event(r.HIDDEN, {
											relatedTarget: e._element
										}),
										s = t.Event(r.SHOWN, {
											relatedTarget: i
										});
									t(i).trigger(n), t(e._element).trigger(s)
								};
								n ? this._activate(n, n.parentNode, g) : g()
							}
						}
					}, i.dispose = function () {
						t.removeData(this._element, e), this._element = null
					}, i._activate = function (e, n, i) {
						var s = this,
							r = ("UL" === n.nodeName ? t(n).find(_) : t(n).children(d))[0],
							o = i && P.supportsTransitionEnd() && r && t(r).hasClass(h),
							a = function () {
								return s._transitionComplete(e, r, i)
							};
						r && o ? t(r).one(P.TRANSITION_END, a).emulateTransitionEnd(150) : a()
					}, i._transitionComplete = function (e, n, i) {
						if (n) {
							t(n).removeClass(c + " " + a);
							var s = t(n.parentNode).find(m)[0];
							s && t(s).removeClass(a), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1)
						}
						if (t(e).addClass(a), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), P.reflow(e), t(e).addClass(c), e.parentNode && t(e.parentNode).hasClass(o)) {
							var r = t(e).closest(u)[0];
							r && t(r).find(p).addClass(a), e.setAttribute("aria-expanded", !0)
						}
						i && i()
					}, n._jQueryInterface = function (i) {
						return this.each(function () {
							var s = t(this),
								r = s.data(e);
							if (r || (r = new n(this), s.data(e, r)), "string" == typeof i) {
								if ("undefined" == typeof r[i]) throw new TypeError('No method named "' + i + '"');
								r[i]()
							}
						})
					}, s(n, null, [{
						key: "VERSION",
						get: function () {
							return "4.0.0"
						}
					}]), n
				}();
			return t(document).on(r.CLICK_DATA_API, g, function (e) {
				e.preventDefault(), v._jQueryInterface.call(t(this), "show")
			}), t.fn.tab = v._jQueryInterface, t.fn.tab.Constructor = v, t.fn.tab.noConflict = function () {
				return t.fn.tab = i, v._jQueryInterface
			}, v
		}(e);
	! function (t) {
		if ("undefined" == typeof t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
		var e = t.fn.jquery.split(" ")[0].split(".");
		if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
	}(e), t.Util = P, t.Alert = L, t.Button = R, t.Carousel = j, t.Collapse = H, t.Dropdown = W, t.Modal = M, t.Popover = x, t.Scrollspy = K, t.Tab = V, t.Tooltip = U, Object.defineProperty(t, "__esModule", {
		value: !0
	})
});
//# sourceMappingURL=bootstrap.min.js.map

/* TweenMax.min.js */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
		"use strict";
		_gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (a, b, c) {
				var d = function (a) {
						var b, c = [],
							d = a.length;
						for (b = 0; b !== d; c.push(a[b++]));
						return c
					},
					e = function (a, b, c) {
						var d, e, f = a.cycle;
						for (d in f) e = f[d], a[d] = "function" == typeof e ? e(c, b[c]) : e[c % e.length];
						delete a.cycle
					},
					f = function (a, b, d) {
						c.call(this, a, b, d), this._cycle = 0, this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._repeat && this._uncache(!0), this.render = f.prototype.render
					},
					g = 1e-10,
					h = c._internals,
					i = h.isSelector,
					j = h.isArray,
					k = f.prototype = c.to({}, .1, {}),
					l = [];
				f.version = "1.20.3", k.constructor = f, k.kill()._gc = !1, f.killTweensOf = f.killDelayedCallsTo = c.killTweensOf, f.getTweensOf = c.getTweensOf, f.lagSmoothing = c.lagSmoothing, f.ticker = c.ticker, f.render = c.render, k.invalidate = function () {
					return this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._yoyoEase = null, this._uncache(!0), c.prototype.invalidate.call(this)
				}, k.updateTo = function (a, b) {
					var d, e = this.ratio,
						f = this.vars.immediateRender || a.immediateRender;
					b && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
					for (d in a) this.vars[d] = a[d];
					if (this._initted || f)
						if (b) this._initted = !1, f && this.render(0, !0, !0);
						else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && c._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
						var g = this._totalTime;
						this.render(0, !0, !1), this._initted = !1, this.render(g, !0, !1)
					} else if (this._initted = !1, this._init(), this._time > 0 || f)
						for (var h, i = 1 / (1 - e), j = this._firstPT; j;) h = j.s + j.c, j.c *= i, j.s = h - j.c, j = j._next;
					return this
				}, k.render = function (a, b, d) {
					this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
					var e, f, i, j, k, l, m, n, o, p = this._dirty ? this.totalDuration() : this._totalDuration,
						q = this._time,
						r = this._totalTime,
						s = this._cycle,
						t = this._duration,
						u = this._rawPrevTime;
					if (a >= p - 1e-7 && a >= 0 ? (this._totalTime = p, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = t, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (e = !0, f = "onComplete", d = d || this._timeline.autoRemoveChildren), 0 === t && (this._initted || !this.vars.lazy || d) && (this._startTime === this._timeline._duration && (a = 0), (0 > u || 0 >= a && a >= -1e-7 || u === g && "isPause" !== this.data) && u !== a && (d = !0, u > g && (f = "onReverseComplete")), this._rawPrevTime = n = !b || a || u === a ? a : g)) : 1e-7 > a ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== r || 0 === t && u > 0) && (f = "onReverseComplete", e = this._reversed), 0 > a && (this._active = !1, 0 === t && (this._initted || !this.vars.lazy || d) && (u >= 0 && (d = !0), this._rawPrevTime = n = !b || a || u === a ? a : g)), this._initted || (d = !0)) : (this._totalTime = this._time = a, 0 !== this._repeat && (j = t + this._repeatDelay, this._cycle = this._totalTime / j >> 0, 0 !== this._cycle && this._cycle === this._totalTime / j && a >= r && this._cycle--, this._time = this._totalTime - this._cycle * j, this._yoyo && 0 !== (1 & this._cycle) && (this._time = t - this._time, o = this._yoyoEase || this.vars.yoyoEase, o && (this._yoyoEase || (o !== !0 || this._initted ? this._yoyoEase = o = o === !0 ? this._ease : o instanceof Ease ? o : Ease.map[o] : (o = this.vars.ease, this._yoyoEase = o = o ? o instanceof Ease ? o : "function" == typeof o ? new Ease(o, this.vars.easeParams) : Ease.map[o] || c.defaultEase : c.defaultEase)), this.ratio = o ? 1 - o.getRatio((t - this._time) / t) : 0)), this._time > t ? this._time = t : this._time < 0 && (this._time = 0)), this._easeType && !o ? (k = this._time / t, l = this._easeType, m = this._easePower, (1 === l || 3 === l && k >= .5) && (k = 1 - k), 3 === l && (k *= 2), 1 === m ? k *= k : 2 === m ? k *= k * k : 3 === m ? k *= k * k * k : 4 === m && (k *= k * k * k * k), 1 === l ? this.ratio = 1 - k : 2 === l ? this.ratio = k : this._time / t < .5 ? this.ratio = k / 2 : this.ratio = 1 - k / 2) : o || (this.ratio = this._ease.getRatio(this._time / t))), q === this._time && !d && s === this._cycle) return void(r !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate")));
					if (!this._initted) {
						if (this._init(), !this._initted || this._gc) return;
						if (!d && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = q, this._totalTime = r, this._rawPrevTime = u, this._cycle = s, h.lazyTweens.push(this), void(this._lazy = [a, b]);
						!this._time || e || o ? e && this._ease._calcEnd && !o && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this._time / t)
					}
					for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== q && a >= 0 && (this._active = !0), 0 === r && (2 === this._initted && a > 0 && this._init(), this._startAt && (a >= 0 ? this._startAt.render(a, !0, d) : f || (f = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === t) && (b || this._callback("onStart"))), i = this._firstPT; i;) i.f ? i.t[i.p](i.c * this.ratio + i.s) : i.t[i.p] = i.c * this.ratio + i.s, i = i._next;
					this._onUpdate && (0 > a && this._startAt && this._startTime && this._startAt.render(a, !0, d), b || (this._totalTime !== r || f) && this._callback("onUpdate")), this._cycle !== s && (b || this._gc || this.vars.onRepeat && this._callback("onRepeat")), f && (!this._gc || d) && (0 > a && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(a, !0, d), e && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[f] && this._callback(f), 0 === t && this._rawPrevTime === g && n !== g && (this._rawPrevTime = 0))
				}, f.to = function (a, b, c) {
					return new f(a, b, c)
				}, f.from = function (a, b, c) {
					return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new f(a, b, c)
				}, f.fromTo = function (a, b, c, d) {
					return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new f(a, b, d)
				}, f.staggerTo = f.allTo = function (a, b, g, h, k, m, n) {
					h = h || 0;
					var o, p, q, r, s = 0,
						t = [],
						u = function () {
							g.onComplete && g.onComplete.apply(g.onCompleteScope || this, arguments), k.apply(n || g.callbackScope || this, m || l)
						},
						v = g.cycle,
						w = g.startAt && g.startAt.cycle;
					for (j(a) || ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a))), a = a || [], 0 > h && (a = d(a), a.reverse(), h *= -1), o = a.length - 1, q = 0; o >= q; q++) {
						p = {};
						for (r in g) p[r] = g[r];
						if (v && (e(p, a, q), null != p.duration && (b = p.duration, delete p.duration)), w) {
							w = p.startAt = {};
							for (r in g.startAt) w[r] = g.startAt[r];
							e(p.startAt, a, q)
						}
						p.delay = s + (p.delay || 0), q === o && k && (p.onComplete = u), t[q] = new f(a[q], b, p), s += h
					}
					return t
				}, f.staggerFrom = f.allFrom = function (a, b, c, d, e, g, h) {
					return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, f.staggerTo(a, b, c, d, e, g, h)
				}, f.staggerFromTo = f.allFromTo = function (a, b, c, d, e, g, h, i) {
					return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, f.staggerTo(a, b, d, e, g, h, i)
				}, f.delayedCall = function (a, b, c, d, e) {
					return new f(b, 0, {
						delay: a,
						onComplete: b,
						onCompleteParams: c,
						callbackScope: d,
						onReverseComplete: b,
						onReverseCompleteParams: c,
						immediateRender: !1,
						useFrames: e,
						overwrite: 0
					})
				}, f.set = function (a, b) {
					return new f(a, 0, b)
				}, f.isTweening = function (a) {
					return c.getTweensOf(a, !0).length > 0
				};
				var m = function (a, b) {
						for (var d = [], e = 0, f = a._first; f;) f instanceof c ? d[e++] = f : (b && (d[e++] = f), d = d.concat(m(f, b)), e = d.length), f = f._next;
						return d
					},
					n = f.getAllTweens = function (b) {
						return m(a._rootTimeline, b).concat(m(a._rootFramesTimeline, b))
					};
				f.killAll = function (a, c, d, e) {
					null == c && (c = !0), null == d && (d = !0);
					var f, g, h, i = n(0 != e),
						j = i.length,
						k = c && d && e;
					for (h = 0; j > h; h++) g = i[h], (k || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && (a ? g.totalTime(g._reversed ? 0 : g.totalDuration()) : g._enabled(!1, !1))
				}, f.killChildTweensOf = function (a, b) {
					if (null != a) {
						var e, g, k, l, m, n = h.tweenLookup;
						if ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a)), j(a))
							for (l = a.length; --l > -1;) f.killChildTweensOf(a[l], b);
						else {
							e = [];
							for (k in n)
								for (g = n[k].target.parentNode; g;) g === a && (e = e.concat(n[k].tweens)), g = g.parentNode;
							for (m = e.length, l = 0; m > l; l++) b && e[l].totalTime(e[l].totalDuration()), e[l]._enabled(!1, !1)
						}
					}
				};
				var o = function (a, c, d, e) {
					c = c !== !1, d = d !== !1, e = e !== !1;
					for (var f, g, h = n(e), i = c && d && e, j = h.length; --j > -1;) g = h[j], (i || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && g.paused(a)
				};
				return f.pauseAll = function (a, b, c) {
					o(!0, a, b, c)
				}, f.resumeAll = function (a, b, c) {
					o(!1, a, b, c)
				}, f.globalTimeScale = function (b) {
					var d = a._rootTimeline,
						e = c.ticker.time;
					return arguments.length ? (b = b || g, d._startTime = e - (e - d._startTime) * d._timeScale / b, d = a._rootFramesTimeline, e = c.ticker.frame, d._startTime = e - (e - d._startTime) * d._timeScale / b, d._timeScale = a._rootTimeline._timeScale = b, b) : d._timeScale
				}, k.progress = function (a, b) {
					return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration()
				}, k.totalProgress = function (a, b) {
					return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration()
				}, k.time = function (a, b) {
					return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time
				}, k.duration = function (b) {
					return arguments.length ? a.prototype.duration.call(this, b) : this._duration
				}, k.totalDuration = function (a) {
					return arguments.length ? -1 === this._repeat ? this : this.duration((a - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
				}, k.repeat = function (a) {
					return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
				}, k.repeatDelay = function (a) {
					return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
				}, k.yoyo = function (a) {
					return arguments.length ? (this._yoyo = a, this) : this._yoyo
				}, f
			}, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (a, b, c) {
				var d = function (a) {
						b.call(this, a), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
						var c, d, e = this.vars;
						for (d in e) c = e[d], i(c) && -1 !== c.join("").indexOf("{self}") && (e[d] = this._swapSelfInParams(c));
						i(e.tweens) && this.add(e.tweens, 0, e.align, e.stagger)
					},
					e = 1e-10,
					f = c._internals,
					g = d._internals = {},
					h = f.isSelector,
					i = f.isArray,
					j = f.lazyTweens,
					k = f.lazyRender,
					l = _gsScope._gsDefine.globals,
					m = function (a) {
						var b, c = {};
						for (b in a) c[b] = a[b];
						return c
					},
					n = function (a, b, c) {
						var d, e, f = a.cycle;
						for (d in f) e = f[d], a[d] = "function" == typeof e ? e(c, b[c]) : e[c % e.length];
						delete a.cycle
					},
					o = g.pauseCallback = function () {},
					p = function (a) {
						var b, c = [],
							d = a.length;
						for (b = 0; b !== d; c.push(a[b++]));
						return c
					},
					q = d.prototype = new b;
				return d.version = "1.20.3", q.constructor = d, q.kill()._gc = q._forcingPlayhead = q._hasPause = !1, q.to = function (a, b, d, e) {
					var f = d.repeat && l.TweenMax || c;
					return b ? this.add(new f(a, b, d), e) : this.set(a, d, e)
				}, q.from = function (a, b, d, e) {
					return this.add((d.repeat && l.TweenMax || c).from(a, b, d), e)
				}, q.fromTo = function (a, b, d, e, f) {
					var g = e.repeat && l.TweenMax || c;
					return b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f)
				}, q.staggerTo = function (a, b, e, f, g, i, j, k) {
					var l, o, q = new d({
							onComplete: i,
							onCompleteParams: j,
							callbackScope: k,
							smoothChildTiming: this.smoothChildTiming
						}),
						r = e.cycle;
					for ("string" == typeof a && (a = c.selector(a) || a), a = a || [], h(a) && (a = p(a)), f = f || 0, 0 > f && (a = p(a), a.reverse(), f *= -1), o = 0; o < a.length; o++) l = m(e), l.startAt && (l.startAt = m(l.startAt), l.startAt.cycle && n(l.startAt, a, o)), r && (n(l, a, o), null != l.duration && (b = l.duration, delete l.duration)), q.to(a[o], b, l, o * f);
					return this.add(q, g)
				}, q.staggerFrom = function (a, b, c, d, e, f, g, h) {
					return c.immediateRender = 0 != c.immediateRender, c.runBackwards = !0, this.staggerTo(a, b, c, d, e, f, g, h)
				}, q.staggerFromTo = function (a, b, c, d, e, f, g, h, i) {
					return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, this.staggerTo(a, b, d, e, f, g, h, i)
				}, q.call = function (a, b, d, e) {
					return this.add(c.delayedCall(0, a, b, d), e)
				}, q.set = function (a, b, d) {
					return d = this._parseTimeOrLabel(d, 0, !0), null == b.immediateRender && (b.immediateRender = d === this._time && !this._paused), this.add(new c(a, 0, b), d)
				}, d.exportRoot = function (a, b) {
					a = a || {}, null == a.smoothChildTiming && (a.smoothChildTiming = !0);
					var e, f, g, h, i = new d(a),
						j = i._timeline;
					for (null == b && (b = !0), j._remove(i, !0), i._startTime = 0, i._rawPrevTime = i._time = i._totalTime = j._time, g = j._first; g;) h = g._next, b && g instanceof c && g.target === g.vars.onComplete || (f = g._startTime - g._delay, 0 > f && (e = 1), i.add(g, f)), g = h;
					return j.add(i, 0), e && i.totalDuration(), i
				}, q.add = function (e, f, g, h) {
					var j, k, l, m, n, o;
					if ("number" != typeof f && (f = this._parseTimeOrLabel(f, 0, !0, e)), !(e instanceof a)) {
						if (e instanceof Array || e && e.push && i(e)) {
							for (g = g || "normal", h = h || 0, j = f, k = e.length, l = 0; k > l; l++) i(m = e[l]) && (m = new d({
								tweens: m
							})), this.add(m, j), "string" != typeof m && "function" != typeof m && ("sequence" === g ? j = m._startTime + m.totalDuration() / m._timeScale : "start" === g && (m._startTime -= m.delay())), j += h;
							return this._uncache(!0)
						}
						if ("string" == typeof e) return this.addLabel(e, f);
						if ("function" != typeof e) throw "Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string.";
						e = c.delayedCall(0, e)
					}
					if (b.prototype.add.call(this, e, f), e._time && e.render((this.rawTime() - e._startTime) * e._timeScale, !1, !1), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
						for (n = this, o = n.rawTime() > e._startTime; n._timeline;) o && n._timeline.smoothChildTiming ? n.totalTime(n._totalTime, !0) : n._gc && n._enabled(!0, !1), n = n._timeline;
					return this
				}, q.remove = function (b) {
					if (b instanceof a) {
						this._remove(b, !1);
						var c = b._timeline = b.vars.useFrames ? a._rootFramesTimeline : a._rootTimeline;
						return b._startTime = (b._paused ? b._pauseTime : c._time) - (b._reversed ? b.totalDuration() - b._totalTime : b._totalTime) / b._timeScale, this
					}
					if (b instanceof Array || b && b.push && i(b)) {
						for (var d = b.length; --d > -1;) this.remove(b[d]);
						return this
					}
					return "string" == typeof b ? this.removeLabel(b) : this.kill(null, b)
				}, q._remove = function (a, c) {
					b.prototype._remove.call(this, a, c);
					var d = this._last;
					return d ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
				}, q.append = function (a, b) {
					return this.add(a, this._parseTimeOrLabel(null, b, !0, a))
				}, q.insert = q.insertMultiple = function (a, b, c, d) {
					return this.add(a, b || 0, c, d)
				}, q.appendMultiple = function (a, b, c, d) {
					return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d)
				}, q.addLabel = function (a, b) {
					return this._labels[a] = this._parseTimeOrLabel(b), this
				}, q.addPause = function (a, b, d, e) {
					var f = c.delayedCall(0, o, d, e || this);
					return f.vars.onComplete = f.vars.onReverseComplete = b, f.data = "isPause", this._hasPause = !0, this.add(f, a)
				}, q.removeLabel = function (a) {
					return delete this._labels[a], this
				}, q.getLabelTime = function (a) {
					return null != this._labels[a] ? this._labels[a] : -1
				}, q._parseTimeOrLabel = function (b, c, d, e) {
					var f, g;
					if (e instanceof a && e.timeline === this) this.remove(e);
					else if (e && (e instanceof Array || e.push && i(e)))
						for (g = e.length; --g > -1;) e[g] instanceof a && e[g].timeline === this && this.remove(e[g]);
					if (f = "number" != typeof b || c ? this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration : 0, "string" == typeof c) return this._parseTimeOrLabel(c, d && "number" == typeof b && null == this._labels[c] ? b - f : 0, d);
					if (c = c || 0, "string" != typeof b || !isNaN(b) && null == this._labels[b]) null == b && (b = f);
					else {
						if (g = b.indexOf("="), -1 === g) return null == this._labels[b] ? d ? this._labels[b] = f + c : c : this._labels[b] + c;
						c = parseInt(b.charAt(g - 1) + "1", 10) * Number(b.substr(g + 1)), b = g > 1 ? this._parseTimeOrLabel(b.substr(0, g - 1), 0, d) : f
					}
					return Number(b) + c
				}, q.seek = function (a, b) {
					return this.totalTime("number" == typeof a ? a : this._parseTimeOrLabel(a), b !== !1)
				}, q.stop = function () {
					return this.paused(!0)
				}, q.gotoAndPlay = function (a, b) {
					return this.play(a, b)
				}, q.gotoAndStop = function (a, b) {
					return this.pause(a, b)
				}, q.render = function (a, b, c) {
					this._gc && this._enabled(!0, !1);
					var d, f, g, h, i, l, m, n = this._time,
						o = this._dirty ? this.totalDuration() : this._totalDuration,
						p = this._startTime,
						q = this._timeScale,
						r = this._paused;
					if (n !== this._time && (a += this._time - n), a >= o - 1e-7 && a >= 0) this._totalTime = this._time = o, this._reversed || this._hasPausedChild() || (f = !0, h = "onComplete", i = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === e) && this._rawPrevTime !== a && this._first && (i = !0, this._rawPrevTime > e && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, a = o + 1e-4;
					else if (1e-7 > a)
						if (this._totalTime = this._time = 0, (0 !== n || 0 === this._duration && this._rawPrevTime !== e && (this._rawPrevTime > 0 || 0 > a && this._rawPrevTime >= 0)) && (h = "onReverseComplete", f = this._reversed), 0 > a) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (i = f = !0, h = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (i = !0), this._rawPrevTime = a;
						else {
							if (this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, 0 === a && f)
								for (d = this._first; d && 0 === d._startTime;) d._duration || (f = !1), d = d._next;
							a = 0, this._initted || (i = !0)
						}
					else {
						if (this._hasPause && !this._forcingPlayhead && !b) {
							if (a >= n)
								for (d = this._first; d && d._startTime <= a && !l;) d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this._rawPrevTime || (l = d), d = d._next;
							else
								for (d = this._last; d && d._startTime >= a && !l;) d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (l = d), d = d._prev;
							l && (this._time = a = l._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay))
						}
						this._totalTime = this._time = this._rawPrevTime = a
					}
					if (this._time !== n && this._first || c || i || l) {
						if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== n && a > 0 && (this._active = !0), 0 === n && this.vars.onStart && (0 === this._time && this._duration || b || this._callback("onStart")), m = this._time, m >= n)
							for (d = this._first; d && (g = d._next, m === this._time && (!this._paused || r));)(d._active || d._startTime <= m && !d._paused && !d._gc) && (l === d && this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = g;
						else
							for (d = this._last; d && (g = d._prev, m === this._time && (!this._paused || r));) {
								if (d._active || d._startTime <= n && !d._paused && !d._gc) {
									if (l === d) {
										for (l = d._prev; l && l.endTime() > this._time;) l.render(l._reversed ? l.totalDuration() - (a - l._startTime) * l._timeScale : (a - l._startTime) * l._timeScale, b, c), l = l._prev;
										l = null, this.pause()
									}
									d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)
								}
								d = g
							}
						this._onUpdate && (b || (j.length && k(), this._callback("onUpdate"))), h && (this._gc || (p === this._startTime || q !== this._timeScale) && (0 === this._time || o >= this.totalDuration()) && (f && (j.length && k(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[h] && this._callback(h)))
					}
				}, q._hasPausedChild = function () {
					for (var a = this._first; a;) {
						if (a._paused || a instanceof d && a._hasPausedChild()) return !0;
						a = a._next
					}
					return !1
				}, q.getChildren = function (a, b, d, e) {
					e = e || -9999999999;
					for (var f = [], g = this._first, h = 0; g;) g._startTime < e || (g instanceof c ? b !== !1 && (f[h++] = g) : (d !== !1 && (f[h++] = g), a !== !1 && (f = f.concat(g.getChildren(!0, b, d)), h = f.length))), g = g._next;
					return f
				}, q.getTweensOf = function (a, b) {
					var d, e, f = this._gc,
						g = [],
						h = 0;
					for (f && this._enabled(!0, !0), d = c.getTweensOf(a), e = d.length; --e > -1;)(d[e].timeline === this || b && this._contains(d[e])) && (g[h++] = d[e]);
					return f && this._enabled(!1, !0), g
				}, q.recent = function () {
					return this._recent
				}, q._contains = function (a) {
					for (var b = a.timeline; b;) {
						if (b === this) return !0;
						b = b.timeline
					}
					return !1
				}, q.shiftChildren = function (a, b, c) {
					c = c || 0;
					for (var d, e = this._first, f = this._labels; e;) e._startTime >= c && (e._startTime += a), e = e._next;
					if (b)
						for (d in f) f[d] >= c && (f[d] += a);
					return this._uncache(!0)
				}, q._kill = function (a, b) {
					if (!a && !b) return this._enabled(!1, !1);
					for (var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1), d = c.length, e = !1; --d > -1;) c[d]._kill(a, b) && (e = !0);
					return e
				}, q.clear = function (a) {
					var b = this.getChildren(!1, !0, !0),
						c = b.length;
					for (this._time = this._totalTime = 0; --c > -1;) b[c]._enabled(!1, !1);
					return a !== !1 && (this._labels = {}), this._uncache(!0)
				}, q.invalidate = function () {
					for (var b = this._first; b;) b.invalidate(), b = b._next;
					return a.prototype.invalidate.call(this)
				}, q._enabled = function (a, c) {
					if (a === this._gc)
						for (var d = this._first; d;) d._enabled(a, !0), d = d._next;
					return b.prototype._enabled.call(this, a, c)
				}, q.totalTime = function (b, c, d) {
					this._forcingPlayhead = !0;
					var e = a.prototype.totalTime.apply(this, arguments);
					return this._forcingPlayhead = !1, e
				}, q.duration = function (a) {
					return arguments.length ? (0 !== this.duration() && 0 !== a && this.timeScale(this._duration / a), this) : (this._dirty && this.totalDuration(), this._duration)
				}, q.totalDuration = function (a) {
					if (!arguments.length) {
						if (this._dirty) {
							for (var b, c, d = 0, e = this._last, f = 999999999999; e;) b = e._prev, e._dirty && e.totalDuration(), e._startTime > f && this._sortChildren && !e._paused && !this._calculatingDuration ? (this._calculatingDuration = 1, this.add(e, e._startTime - e._delay), this._calculatingDuration = 0) : f = e._startTime, e._startTime < 0 && !e._paused && (d -= e._startTime, this._timeline.smoothChildTiming && (this._startTime += e._startTime / this._timeScale, this._time -= e._startTime, this._totalTime -= e._startTime, this._rawPrevTime -= e._startTime), this.shiftChildren(-e._startTime, !1, -9999999999), f = 0), c = e._startTime + e._totalDuration / e._timeScale, c > d && (d = c), e = b;
							this._duration = this._totalDuration = d, this._dirty = !1
						}
						return this._totalDuration
					}
					return a && this.totalDuration() ? this.timeScale(this._totalDuration / a) : this
				}, q.paused = function (b) {
					if (!b)
						for (var c = this._first, d = this._time; c;) c._startTime === d && "isPause" === c.data && (c._rawPrevTime = 0), c = c._next;
					return a.prototype.paused.apply(this, arguments)
				}, q.usesFrames = function () {
					for (var b = this._timeline; b._timeline;) b = b._timeline;
					return b === a._rootFramesTimeline
				}, q.rawTime = function (a) {
					return a && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(a) - this._startTime) * this._timeScale
				}, d
			}, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (a, b, c) {
				var d = function (b) {
						a.call(this, b), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
					},
					e = 1e-10,
					f = b._internals,
					g = f.lazyTweens,
					h = f.lazyRender,
					i = _gsScope._gsDefine.globals,
					j = new c(null, null, 1, 0),
					k = d.prototype = new a;
				return k.constructor = d, k.kill()._gc = !1, d.version = "1.20.3", k.invalidate = function () {
					return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), a.prototype.invalidate.call(this)
				}, k.addCallback = function (a, c, d, e) {
					return this.add(b.delayedCall(0, a, d, e), c)
				}, k.removeCallback = function (a, b) {
					if (a)
						if (null == b) this._kill(null, a);
						else
							for (var c = this.getTweensOf(a, !1), d = c.length, e = this._parseTimeOrLabel(b); --d > -1;) c[d]._startTime === e && c[d]._enabled(!1, !1);
					return this
				}, k.removePause = function (b) {
					return this.removeCallback(a._internals.pauseCallback, b)
				}, k.tweenTo = function (a, c) {
					c = c || {};
					var d, e, f, g = {
							ease: j,
							useFrames: this.usesFrames(),
							immediateRender: !1
						},
						h = c.repeat && i.TweenMax || b;
					for (e in c) g[e] = c[e];
					return g.time = this._parseTimeOrLabel(a), d = Math.abs(Number(g.time) - this._time) / this._timeScale || .001, f = new h(this, d, g), g.onStart = function () {
						f.target.paused(!0), f.vars.time !== f.target.time() && d === f.duration() && f.duration(Math.abs(f.vars.time - f.target.time()) / f.target._timeScale), c.onStart && c.onStart.apply(c.onStartScope || c.callbackScope || f, c.onStartParams || [])
					}, f
				}, k.tweenFromTo = function (a, b, c) {
					c = c || {}, a = this._parseTimeOrLabel(a), c.startAt = {
						onComplete: this.seek,
						onCompleteParams: [a],
						callbackScope: this
					}, c.immediateRender = c.immediateRender !== !1;
					var d = this.tweenTo(b, c);
					return d.duration(Math.abs(d.vars.time - a) / this._timeScale || .001)
				}, k.render = function (a, b, c) {
					this._gc && this._enabled(!0, !1);
					var d, f, i, j, k, l, m, n, o = this._time,
						p = this._dirty ? this.totalDuration() : this._totalDuration,
						q = this._duration,
						r = this._totalTime,
						s = this._startTime,
						t = this._timeScale,
						u = this._rawPrevTime,
						v = this._paused,
						w = this._cycle;
					if (o !== this._time && (a += this._time - o), a >= p - 1e-7 && a >= 0) this._locked || (this._totalTime = p, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (f = !0, j = "onComplete", k = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || 0 > u || u === e) && u !== a && this._first && (k = !0, u > e && (j = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, this._yoyo && 0 !== (1 & this._cycle) ? this._time = a = 0 : (this._time = q, a = q + 1e-4);
					else if (1e-7 > a)
						if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== o || 0 === q && u !== e && (u > 0 || 0 > a && u >= 0) && !this._locked) && (j = "onReverseComplete", f = this._reversed), 0 > a) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (k = f = !0, j = "onReverseComplete") : u >= 0 && this._first && (k = !0), this._rawPrevTime = a;
						else {
							if (this._rawPrevTime = q || !b || a || this._rawPrevTime === a ? a : e, 0 === a && f)
								for (d = this._first; d && 0 === d._startTime;) d._duration || (f = !1), d = d._next;
							a = 0, this._initted || (k = !0)
						}
					else if (0 === q && 0 > u && (k = !0), this._time = this._rawPrevTime = a, this._locked || (this._totalTime = a, 0 !== this._repeat && (l = q + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && a >= r && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 !== (1 & this._cycle) && (this._time = q - this._time), this._time > q ? (this._time = q, a = q + 1e-4) : this._time < 0 ? this._time = a = 0 : a = this._time)), this._hasPause && !this._forcingPlayhead && !b) {
						if (a = this._time, a >= o || this._repeat && w !== this._cycle)
							for (d = this._first; d && d._startTime <= a && !m;) d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this._rawPrevTime || (m = d), d = d._next;
						else
							for (d = this._last; d && d._startTime >= a && !m;) d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (m = d), d = d._prev;
						m && m._startTime < q && (this._time = a = m._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay))
					}
					if (this._cycle !== w && !this._locked) {
						var x = this._yoyo && 0 !== (1 & w),
							y = x === (this._yoyo && 0 !== (1 & this._cycle)),
							z = this._totalTime,
							A = this._cycle,
							B = this._rawPrevTime,
							C = this._time;
						if (this._totalTime = w * q, this._cycle < w ? x = !x : this._totalTime += q, this._time = o, this._rawPrevTime = 0 === q ? u - 1e-4 : u, this._cycle = w, this._locked = !0, o = x ? 0 : q, this.render(o, b, 0 === q), b || this._gc || this.vars.onRepeat && (this._cycle = A, this._locked = !1, this._callback("onRepeat")), o !== this._time) return;
						if (y && (this._cycle = w, this._locked = !0, o = x ? q + 1e-4 : -1e-4, this.render(o, !0, !1)), this._locked = !1, this._paused && !v) return;
						this._time = C, this._totalTime = z, this._cycle = A, this._rawPrevTime = B
					}
					if (!(this._time !== o && this._first || c || k || m)) return void(r !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate")));
					if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== r && a > 0 && (this._active = !0), 0 === r && this.vars.onStart && (0 === this._totalTime && this._totalDuration || b || this._callback("onStart")), n = this._time, n >= o)
						for (d = this._first; d && (i = d._next, n === this._time && (!this._paused || v));)(d._active || d._startTime <= this._time && !d._paused && !d._gc) && (m === d && this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = i;
					else
						for (d = this._last; d && (i = d._prev, n === this._time && (!this._paused || v));) {
							if (d._active || d._startTime <= o && !d._paused && !d._gc) {
								if (m === d) {
									for (m = d._prev; m && m.endTime() > this._time;) m.render(m._reversed ? m.totalDuration() - (a - m._startTime) * m._timeScale : (a - m._startTime) * m._timeScale, b, c), m = m._prev;
									m = null, this.pause()
								}
								d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)
							}
							d = i
						}
					this._onUpdate && (b || (g.length && h(), this._callback("onUpdate"))), j && (this._locked || this._gc || (s === this._startTime || t !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (f && (g.length && h(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[j] && this._callback(j)))
				}, k.getActive = function (a, b, c) {
					null == a && (a = !0), null == b && (b = !0), null == c && (c = !1);
					var d, e, f = [],
						g = this.getChildren(a, b, c),
						h = 0,
						i = g.length;
					for (d = 0; i > d; d++) e = g[d], e.isActive() && (f[h++] = e);
					return f
				}, k.getLabelAfter = function (a) {
					a || 0 !== a && (a = this._time);
					var b, c = this.getLabelsArray(),
						d = c.length;
					for (b = 0; d > b; b++)
						if (c[b].time > a) return c[b].name;
					return null
				}, k.getLabelBefore = function (a) {
					null == a && (a = this._time);
					for (var b = this.getLabelsArray(), c = b.length; --c > -1;)
						if (b[c].time < a) return b[c].name;
					return null
				}, k.getLabelsArray = function () {
					var a, b = [],
						c = 0;
					for (a in this._labels) b[c++] = {
						time: this._labels[a],
						name: a
					};
					return b.sort(function (a, b) {
						return a.time - b.time
					}), b
				}, k.invalidate = function () {
					return this._locked = !1, a.prototype.invalidate.call(this)
				}, k.progress = function (a, b) {
					return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration() || 0
				}, k.totalProgress = function (a, b) {
					return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration() || 0
				}, k.totalDuration = function (b) {
					return arguments.length ? -1 !== this._repeat && b ? this.timeScale(this.totalDuration() / b) : this : (this._dirty && (a.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
				}, k.time = function (a, b) {
					return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time
				}, k.repeat = function (a) {
					return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
				}, k.repeatDelay = function (a) {
					return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
				}, k.yoyo = function (a) {
					return arguments.length ? (this._yoyo = a, this) : this._yoyo
				}, k.currentLabel = function (a) {
					return arguments.length ? this.seek(a, !0) : this.getLabelBefore(this._time + 1e-8)
				}, d
			}, !0),
			function () {
				var a = 180 / Math.PI,
					b = [],
					c = [],
					d = [],
					e = {},
					f = _gsScope._gsDefine.globals,
					g = function (a, b, c, d) {
						c === d && (c = d - (d - b) / 1e6), a === b && (b = a + (c - a) / 1e6), this.a = a, this.b = b, this.c = c, this.d = d, this.da = d - a, this.ca = c - a, this.ba = b - a
					},
					h = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
					i = function (a, b, c, d) {
						var e = {
								a: a
							},
							f = {},
							g = {},
							h = {
								c: d
							},
							i = (a + b) / 2,
							j = (b + c) / 2,
							k = (c + d) / 2,
							l = (i + j) / 2,
							m = (j + k) / 2,
							n = (m - l) / 8;
						return e.b = i + (a - i) / 4, f.b = l + n, e.c = f.a = (e.b + f.b) / 2, f.c = g.a = (l + m) / 2, g.b = m - n, h.b = k + (d - k) / 4, g.c = h.a = (g.b + h.b) / 2, [e, f, g, h]
					},
					j = function (a, e, f, g, h) {
						var j, k, l, m, n, o, p, q, r, s, t, u, v, w = a.length - 1,
							x = 0,
							y = a[0].a;
						for (j = 0; w > j; j++) n = a[x], k = n.a, l = n.d, m = a[x + 1].d, h ? (t = b[j], u = c[j], v = (u + t) * e * .25 / (g ? .5 : d[j] || .5), o = l - (l - k) * (g ? .5 * e : 0 !== t ? v / t : 0), p = l + (m - l) * (g ? .5 * e : 0 !== u ? v / u : 0), q = l - (o + ((p - o) * (3 * t / (t + u) + .5) / 4 || 0))) : (o = l - (l - k) * e * .5, p = l + (m - l) * e * .5, q = l - (o + p) / 2), o += q, p += q, n.c = r = o, 0 !== j ? n.b = y : n.b = y = n.a + .6 * (n.c - n.a), n.da = l - k, n.ca = r - k, n.ba = y - k, f ? (s = i(k, y, r, l), a.splice(x, 1, s[0], s[1], s[2], s[3]), x += 4) : x++, y = p;
						n = a[x], n.b = y, n.c = y + .4 * (n.d - y), n.da = n.d - n.a, n.ca = n.c - n.a, n.ba = y - n.a, f && (s = i(n.a, y, n.c, n.d), a.splice(x, 1, s[0], s[1], s[2], s[3]))
					},
					k = function (a, d, e, f) {
						var h, i, j, k, l, m, n = [];
						if (f)
							for (a = [f].concat(a), i = a.length; --i > -1;) "string" == typeof (m = a[i][d]) && "=" === m.charAt(1) && (a[i][d] = f[d] + Number(m.charAt(0) + m.substr(2)));
						if (h = a.length - 2, 0 > h) return n[0] = new g(a[0][d], 0, 0, a[0][d]), n;
						for (i = 0; h > i; i++) j = a[i][d], k = a[i + 1][d], n[i] = new g(j, 0, 0, k), e && (l = a[i + 2][d], b[i] = (b[i] || 0) + (k - j) * (k - j), c[i] = (c[i] || 0) + (l - k) * (l - k));
						return n[i] = new g(a[i][d], 0, 0, a[i + 1][d]), n
					},
					l = function (a, f, g, i, l, m) {
						var n, o, p, q, r, s, t, u, v = {},
							w = [],
							x = m || a[0];
						l = "string" == typeof l ? "," + l + "," : h, null == f && (f = 1);
						for (o in a[0]) w.push(o);
						if (a.length > 1) {
							for (u = a[a.length - 1], t = !0, n = w.length; --n > -1;)
								if (o = w[n], Math.abs(x[o] - u[o]) > .05) {
									t = !1;
									break
								}
							t && (a = a.concat(), m && a.unshift(m), a.push(a[1]), m = a[a.length - 3])
						}
						for (b.length = c.length = d.length = 0, n = w.length; --n > -1;) o = w[n], e[o] = -1 !== l.indexOf("," + o + ","), v[o] = k(a, o, e[o], m);
						for (n = b.length; --n > -1;) b[n] = Math.sqrt(b[n]), c[n] = Math.sqrt(c[n]);
						if (!i) {
							for (n = w.length; --n > -1;)
								if (e[o])
									for (p = v[w[n]], s = p.length - 1, q = 0; s > q; q++) r = p[q + 1].da / c[q] + p[q].da / b[q] || 0, d[q] = (d[q] || 0) + r * r;
							for (n = d.length; --n > -1;) d[n] = Math.sqrt(d[n])
						}
						for (n = w.length, q = g ? 4 : 1; --n > -1;) o = w[n], p = v[o], j(p, f, g, i, e[o]), t && (p.splice(0, q), p.splice(p.length - q, q));
						return v
					},
					m = function (a, b, c) {
						b = b || "soft";
						var d, e, f, h, i, j, k, l, m, n, o, p = {},
							q = "cubic" === b ? 3 : 2,
							r = "soft" === b,
							s = [];
						if (r && c && (a = [c].concat(a)), null == a || a.length < q + 1) throw "invalid Bezier data";
						for (m in a[0]) s.push(m);
						for (j = s.length; --j > -1;) {
							for (m = s[j], p[m] = i = [], n = 0, l = a.length, k = 0; l > k; k++) d = null == c ? a[k][m] : "string" == typeof (o = a[k][m]) && "=" === o.charAt(1) ? c[m] + Number(o.charAt(0) + o.substr(2)) : Number(o), r && k > 1 && l - 1 > k && (i[n++] = (d + i[n - 2]) / 2), i[n++] = d;
							for (l = n - q + 1, n = 0, k = 0; l > k; k += q) d = i[k], e = i[k + 1], f = i[k + 2], h = 2 === q ? 0 : i[k + 3], i[n++] = o = 3 === q ? new g(d, e, f, h) : new g(d, (2 * e + d) / 3, (2 * e + f) / 3, f);
							i.length = n
						}
						return p
					},
					n = function (a, b, c) {
						for (var d, e, f, g, h, i, j, k, l, m, n, o = 1 / c, p = a.length; --p > -1;)
							for (m = a[p], f = m.a, g = m.d - f, h = m.c - f, i = m.b - f, d = e = 0, k = 1; c >= k; k++) j = o * k, l = 1 - j, d = e - (e = (j * j * g + 3 * l * (j * h + l * i)) * j), n = p * c + k - 1, b[n] = (b[n] || 0) + d * d
					},
					o = function (a, b) {
						b = b >> 0 || 6;
						var c, d, e, f, g = [],
							h = [],
							i = 0,
							j = 0,
							k = b - 1,
							l = [],
							m = [];
						for (c in a) n(a[c], g, b);
						for (e = g.length, d = 0; e > d; d++) i += Math.sqrt(g[d]), f = d % b, m[f] = i, f === k && (j += i, f = d / b >> 0, l[f] = m, h[f] = j, i = 0, m = []);
						return {
							length: j,
							lengths: h,
							segments: l
						}
					},
					p = _gsScope._gsDefine.plugin({
						propName: "bezier",
						priority: -1,
						version: "1.3.8",
						API: 2,
						global: !0,
						init: function (a, b, c) {
							this._target = a, b instanceof Array && (b = {
								values: b
							}), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10);
							var d, e, f, g, h, i = b.values || [],
								j = {},
								k = i[0],
								n = b.autoRotate || c.vars.orientToBezier;
							this._autoRotate = n ? n instanceof Array ? n : [
								["x", "y", "rotation", n === !0 ? 0 : Number(n) || 0]
							] : null;
							for (d in k) this._props.push(d);
							for (f = this._props.length; --f > -1;) d = this._props[f], this._overwriteProps.push(d), e = this._func[d] = "function" == typeof a[d], j[d] = e ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)]() : parseFloat(a[d]), h || j[d] !== i[0][d] && (h = j);
							if (this._beziers = "cubic" !== b.type && "quadratic" !== b.type && "soft" !== b.type ? l(i, isNaN(b.curviness) ? 1 : b.curviness, !1, "thruBasic" === b.type, b.correlate, h) : m(i, b.type, j), this._segCount = this._beziers[d].length, this._timeRes) {
								var p = o(this._beziers, this._timeRes);
								this._length = p.length, this._lengths = p.lengths, this._segments = p.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
							}
							if (n = this._autoRotate)
								for (this._initialRotations = [], n[0] instanceof Array || (this._autoRotate = n = [n]), f = n.length; --f > -1;) {
									for (g = 0; 3 > g; g++) d = n[f][g], this._func[d] = "function" == typeof a[d] ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)] : !1;
									d = n[f][2], this._initialRotations[f] = (this._func[d] ? this._func[d].call(this._target) : this._target[d]) || 0, this._overwriteProps.push(d)
								}
							return this._startRatio = c.vars.runBackwards ? 1 : 0, !0
						},
						set: function (b) {
							var c, d, e, f, g, h, i, j, k, l, m = this._segCount,
								n = this._func,
								o = this._target,
								p = b !== this._startRatio;
							if (this._timeRes) {
								if (k = this._lengths, l = this._curSeg, b *= this._length, e = this._li, b > this._l2 && m - 1 > e) {
									for (j = m - 1; j > e && (this._l2 = k[++e]) <= b;);
									this._l1 = k[e - 1], this._li = e, this._curSeg = l = this._segments[e], this._s2 = l[this._s1 = this._si = 0]
								} else if (b < this._l1 && e > 0) {
									for (; e > 0 && (this._l1 = k[--e]) >= b;);
									0 === e && b < this._l1 ? this._l1 = 0 : e++, this._l2 = k[e], this._li = e, this._curSeg = l = this._segments[e], this._s1 = l[(this._si = l.length - 1) - 1] || 0, this._s2 = l[this._si]
								}
								if (c = e, b -= this._l1, e = this._si, b > this._s2 && e < l.length - 1) {
									for (j = l.length - 1; j > e && (this._s2 = l[++e]) <= b;);
									this._s1 = l[e - 1], this._si = e
								} else if (b < this._s1 && e > 0) {
									for (; e > 0 && (this._s1 = l[--e]) >= b;);
									0 === e && b < this._s1 ? this._s1 = 0 : e++, this._s2 = l[e], this._si = e
								}
								h = (e + (b - this._s1) / (this._s2 - this._s1)) * this._prec || 0
							} else c = 0 > b ? 0 : b >= 1 ? m - 1 : m * b >> 0, h = (b - c * (1 / m)) * m;
							for (d = 1 - h, e = this._props.length; --e > -1;) f = this._props[e], g = this._beziers[f][c], i = (h * h * g.da + 3 * d * (h * g.ca + d * g.ba)) * h + g.a, this._mod[f] && (i = this._mod[f](i, o)), n[f] ? o[f](i) : o[f] = i;
							if (this._autoRotate) {
								var q, r, s, t, u, v, w, x = this._autoRotate;
								for (e = x.length; --e > -1;) f = x[e][2], v = x[e][3] || 0, w = x[e][4] === !0 ? 1 : a, g = this._beziers[x[e][0]], q = this._beziers[x[e][1]], g && q && (g = g[c], q = q[c], r = g.a + (g.b - g.a) * h, t = g.b + (g.c - g.b) * h, r += (t - r) * h, t += (g.c + (g.d - g.c) * h - t) * h, s = q.a + (q.b - q.a) * h, u = q.b + (q.c - q.b) * h, s += (u - s) * h, u += (q.c + (q.d - q.c) * h - u) * h, i = p ? Math.atan2(u - s, t - r) * w + v : this._initialRotations[e], this._mod[f] && (i = this._mod[f](i, o)), n[f] ? o[f](i) : o[f] = i)
							}
						}
					}),
					q = p.prototype;
				p.bezierThrough = l, p.cubicToQuadratic = i, p._autoCSS = !0, p.quadraticToCubic = function (a, b, c) {
					return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c)
				}, p._cssRegister = function () {
					var a = f.CSSPlugin;
					if (a) {
						var b = a._internals,
							c = b._parseToProxy,
							d = b._setPluginRatio,
							e = b.CSSPropTween;
						b._registerComplexSpecialProp("bezier", {
							parser: function (a, b, f, g, h, i) {
								b instanceof Array && (b = {
									values: b
								}), i = new p;
								var j, k, l, m = b.values,
									n = m.length - 1,
									o = [],
									q = {};
								if (0 > n) return h;
								for (j = 0; n >= j; j++) l = c(a, m[j], g, h, i, n !== j), o[j] = l.end;
								for (k in b) q[k] = b[k];
								return q.values = o, h = new e(a, "bezier", 0, 0, l.pt, 2), h.data = l, h.plugin = i, h.setRatio = d, 0 === q.autoRotate && (q.autoRotate = !0), !q.autoRotate || q.autoRotate instanceof Array || (j = q.autoRotate === !0 ? 0 : Number(q.autoRotate), q.autoRotate = null != l.end.left ? [
									["left", "top", "rotation", j, !1]
								] : null != l.end.x ? [
									["x", "y", "rotation", j, !1]
								] : !1), q.autoRotate && (g._transform || g._enableTransforms(!1), l.autoRotate = g._target._gsTransform, l.proxy.rotation = l.autoRotate.rotation || 0, g._overwriteProps.push("rotation")), i._onInitTween(l.proxy, q, g._tween), h
							}
						})
					}
				}, q._mod = function (a) {
					for (var b, c = this._overwriteProps, d = c.length; --d > -1;) b = a[c[d]], b && "function" == typeof b && (this._mod[c[d]] = b)
				}, q._kill = function (a) {
					var b, c, d = this._props;
					for (b in this._beziers)
						if (b in a)
							for (delete this._beziers[b], delete this._func[b], c = d.length; --c > -1;) d[c] === b && d.splice(c, 1);
					if (d = this._autoRotate)
						for (c = d.length; --c > -1;) a[d[c][2]] && d.splice(c, 1);
					return this._super._kill.call(this, a)
				}
			}(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (a, b) {
				var c, d, e, f, g = function () {
						a.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = g.prototype.setRatio
					},
					h = _gsScope._gsDefine.globals,
					i = {},
					j = g.prototype = new a("css");
				j.constructor = g, g.version = "1.20.3", g.API = 2, g.defaultTransformPerspective = 0, g.defaultSkewType = "compensated", g.defaultSmoothOrigin = !0, j = "px", g.suffixMap = {
					top: j,
					right: j,
					bottom: j,
					left: j,
					width: j,
					height: j,
					fontSize: j,
					padding: j,
					margin: j,
					perspective: j,
					lineHeight: ""
				};
				var k, l, m, n, o, p, q, r, s = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
					t = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
					u = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
					v = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
					w = /(?:\d|\-|\+|=|#|\.)*/g,
					x = /opacity *= *([^)]*)/i,
					y = /opacity:([^;]*)/i,
					z = /alpha\(opacity *=.+?\)/i,
					A = /^(rgb|hsl)/,
					B = /([A-Z])/g,
					C = /-([a-z])/gi,
					D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
					E = function (a, b) {
						return b.toUpperCase()
					},
					F = /(?:Left|Right|Width)/i,
					G = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
					H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
					I = /,(?=[^\)]*(?:\(|$))/gi,
					J = /[\s,\(]/i,
					K = Math.PI / 180,
					L = 180 / Math.PI,
					M = {},
					N = {
						style: {}
					},
					O = _gsScope.document || {
						createElement: function () {
							return N
						}
					},
					P = function (a, b) {
						return O.createElementNS ? O.createElementNS(b || "http://www.w3.org/1999/xhtml", a) : O.createElement(a)
					},
					Q = P("div"),
					R = P("img"),
					S = g._internals = {
						_specialProps: i
					},
					T = (_gsScope.navigator || {}).userAgent || "",
					U = function () {
						var a = T.indexOf("Android"),
							b = P("a");
						return m = -1 !== T.indexOf("Safari") && -1 === T.indexOf("Chrome") && (-1 === a || parseFloat(T.substr(a + 8, 2)) > 3), o = m && parseFloat(T.substr(T.indexOf("Version/") + 8, 2)) < 6, n = -1 !== T.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(T)) && (p = parseFloat(RegExp.$1)), b ? (b.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(b.style.opacity)) : !1
					}(),
					V = function (a) {
						return x.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
					},
					W = function (a) {
						_gsScope.console && console.log(a)
					},
					X = "",
					Y = "",
					Z = function (a, b) {
						b = b || Q;
						var c, d, e = b.style;
						if (void 0 !== e[a]) return a;
						for (a = a.charAt(0).toUpperCase() + a.substr(1), c = ["O", "Moz", "ms", "Ms", "Webkit"], d = 5; --d > -1 && void 0 === e[c[d] + a];);
						return d >= 0 ? (Y = 3 === d ? "ms" : c[d], X = "-" + Y.toLowerCase() + "-", Y + a) : null
					},
					$ = O.defaultView ? O.defaultView.getComputedStyle : function () {},
					_ = g.getStyle = function (a, b, c, d, e) {
						var f;
						return U || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || $(a)) ? f = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(B, "-$1").toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]), null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : V(a)
					},
					aa = S.convertToPixels = function (a, c, d, e, f) {
						if ("px" === e || !e && "lineHeight" !== c) return d;
						if ("auto" === e || !d) return 0;
						var h, i, j, k = F.test(c),
							l = a,
							m = Q.style,
							n = 0 > d,
							o = 1 === d;
						if (n && (d = -d), o && (d *= 100), "lineHeight" !== c || e)
							if ("%" === e && -1 !== c.indexOf("border")) h = d / 100 * (k ? a.clientWidth : a.clientHeight);
							else {
								if (m.cssText = "border:0 solid red;position:" + _(a, "position") + ";line-height:0;", "%" !== e && l.appendChild && "v" !== e.charAt(0) && "rem" !== e) m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e;
								else {
									if (l = a.parentNode || O.body, -1 !== _(l, "display").indexOf("flex") && (m.position = "absolute"), i = l._gsCache, j = b.ticker.frame, i && k && i.time === j) return i.width * d / 100;
									m[k ? "width" : "height"] = d + e
								}
								l.appendChild(Q), h = parseFloat(Q[k ? "offsetWidth" : "offsetHeight"]), l.removeChild(Q), k && "%" === e && g.cacheWidths !== !1 && (i = l._gsCache = l._gsCache || {}, i.time = j, i.width = h / d * 100), 0 !== h || f || (h = aa(a, c, d, e, !0))
							}
						else i = $(a).lineHeight, a.style.lineHeight = d, h = parseFloat($(a).lineHeight), a.style.lineHeight = i;
						return o && (h /= 100), n ? -h : h
					},
					ba = S.calculateOffset = function (a, b, c) {
						if ("absolute" !== _(a, "position", c)) return 0;
						var d = "left" === b ? "Left" : "Top",
							e = _(a, "margin" + d, c);
						return a["offset" + d] - (aa(a, b, parseFloat(e), e.replace(w, "")) || 0)
					},
					ca = function (a, b) {
						var c, d, e, f = {};
						if (b = b || $(a, null))
							if (c = b.length)
								for (; --c > -1;) e = b[c], (-1 === e.indexOf("-transform") || Da === e) && (f[e.replace(C, E)] = b.getPropertyValue(e));
							else
								for (c in b)(-1 === c.indexOf("Transform") || Ca === c) && (f[c] = b[c]);
						else if (b = a.currentStyle || a.style)
							for (c in b) "string" == typeof c && void 0 === f[c] && (f[c.replace(C, E)] = b[c]);
						return U || (f.opacity = V(a)), d = Ra(a, b, !1), f.rotation = d.rotation, f.skewX = d.skewX, f.scaleX = d.scaleX, f.scaleY = d.scaleY, f.x = d.x, f.y = d.y, Fa && (f.z = d.z, f.rotationX = d.rotationX, f.rotationY = d.rotationY, f.scaleZ = d.scaleZ), f.filters && delete f.filters, f
					},
					da = function (a, b, c, d, e) {
						var f, g, h, i = {},
							j = a.style;
						for (g in c) "cssText" !== g && "length" !== g && isNaN(g) && (b[g] !== (f = c[g]) || e && e[g]) && -1 === g.indexOf("Origin") && ("number" == typeof f || "string" == typeof f) && (i[g] = "auto" !== f || "left" !== g && "top" !== g ? "" !== f && "auto" !== f && "none" !== f || "string" != typeof b[g] || "" === b[g].replace(v, "") ? f : 0 : ba(a, g), void 0 !== j[g] && (h = new sa(j, g, j[g], h)));
						if (d)
							for (g in d) "className" !== g && (i[g] = d[g]);
						return {
							difs: i,
							firstMPT: h
						}
					},
					ea = {
						width: ["Left", "Right"],
						height: ["Top", "Bottom"]
					},
					fa = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
					ga = function (a, b, c) {
						if ("svg" === (a.nodeName + "").toLowerCase()) return (c || $(a))[b] || 0;
						if (a.getCTM && Oa(a)) return a.getBBox()[b] || 0;
						var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight),
							e = ea[b],
							f = e.length;
						for (c = c || $(a, null); --f > -1;) d -= parseFloat(_(a, "padding" + e[f], c, !0)) || 0, d -= parseFloat(_(a, "border" + e[f] + "Width", c, !0)) || 0;
						return d
					},
					ha = function (a, b) {
						if ("contain" === a || "auto" === a || "auto auto" === a) return a + " ";
						(null == a || "" === a) && (a = "0 0");
						var c, d = a.split(" "),
							e = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : d[0],
							f = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : d[1];
						if (d.length > 3 && !b) {
							for (d = a.split(", ").join(",").split(","), a = [], c = 0; c < d.length; c++) a.push(ha(d[c]));
							return a.join(",")
						}
						return null == f ? f = "center" === e ? "50%" : "0" : "center" === f && (f = "50%"), ("center" === e || isNaN(parseFloat(e)) && -1 === (e + "").indexOf("=")) && (e = "50%"), a = e + " " + f + (d.length > 2 ? " " + d[2] : ""), b && (b.oxp = -1 !== e.indexOf("%"), b.oyp = -1 !== f.indexOf("%"), b.oxr = "=" === e.charAt(1), b.oyr = "=" === f.charAt(1), b.ox = parseFloat(e.replace(v, "")), b.oy = parseFloat(f.replace(v, "")), b.v = a), b || a
					},
					ia = function (a, b) {
						return "function" == typeof a && (a = a(r, q)), "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b) || 0
					},
					ja = function (a, b) {
						return "function" == typeof a && (a = a(r, q)), null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a) || 0
					},
					ka = function (a, b, c, d) {
						var e, f, g, h, i, j = 1e-6;
						return "function" == typeof a && (a = a(r, q)), null == a ? h = b : "number" == typeof a ? h = a : (e = 360, f = a.split("_"), i = "=" === a.charAt(1), g = (i ? parseInt(a.charAt(0) + "1", 10) * parseFloat(f[0].substr(2)) : parseFloat(f[0])) * (-1 === a.indexOf("rad") ? 1 : L) - (i ? 0 : b), f.length && (d && (d[c] = b + g), -1 !== a.indexOf("short") && (g %= e, g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)), -1 !== a.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * e) % e - (g / e | 0) * e : -1 !== a.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * e) % e - (g / e | 0) * e)), h = b + g), j > h && h > -j && (h = 0), h
					},
					la = {
						aqua: [0, 255, 255],
						lime: [0, 255, 0],
						silver: [192, 192, 192],
						black: [0, 0, 0],
						maroon: [128, 0, 0],
						teal: [0, 128, 128],
						blue: [0, 0, 255],
						navy: [0, 0, 128],
						white: [255, 255, 255],
						fuchsia: [255, 0, 255],
						olive: [128, 128, 0],
						yellow: [255, 255, 0],
						orange: [255, 165, 0],
						gray: [128, 128, 128],
						purple: [128, 0, 128],
						green: [0, 128, 0],
						red: [255, 0, 0],
						pink: [255, 192, 203],
						cyan: [0, 255, 255],
						transparent: [255, 255, 255, 0]
					},
					ma = function (a, b, c) {
						return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a, 255 * (1 > 6 * a ? b + (c - b) * a * 6 : .5 > a ? c : 2 > 3 * a ? b + (c - b) * (2 / 3 - a) * 6 : b) + .5 | 0
					},
					na = g.parseColor = function (a, b) {
						var c, d, e, f, g, h, i, j, k, l, m;
						if (a)
							if ("number" == typeof a) c = [a >> 16, a >> 8 & 255, 255 & a];
							else {
								if ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)), la[a]) c = la[a];
								else if ("#" === a.charAt(0)) 4 === a.length && (d = a.charAt(1), e = a.charAt(2), f = a.charAt(3), a = "#" + d + d + e + e + f + f), a = parseInt(a.substr(1), 16), c = [a >> 16, a >> 8 & 255, 255 & a];
								else if ("hsl" === a.substr(0, 3))
									if (c = m = a.match(s), b) {
										if (-1 !== a.indexOf("=")) return a.match(t)
									} else g = Number(c[0]) % 360 / 360, h = Number(c[1]) / 100, i = Number(c[2]) / 100, e = .5 >= i ? i * (h + 1) : i + h - i * h, d = 2 * i - e, c.length > 3 && (c[3] = Number(c[3])), c[0] = ma(g + 1 / 3, d, e), c[1] = ma(g, d, e), c[2] = ma(g - 1 / 3, d, e);
								else c = a.match(s) || la.transparent;
								c[0] = Number(c[0]), c[1] = Number(c[1]), c[2] = Number(c[2]), c.length > 3 && (c[3] = Number(c[3]))
							}
						else c = la.black;
						return b && !m && (d = c[0] / 255, e = c[1] / 255, f = c[2] / 255, j = Math.max(d, e, f), k = Math.min(d, e, f), i = (j + k) / 2, j === k ? g = h = 0 : (l = j - k, h = i > .5 ? l / (2 - j - k) : l / (j + k), g = j === d ? (e - f) / l + (f > e ? 6 : 0) : j === e ? (f - d) / l + 2 : (d - e) / l + 4, g *= 60), c[0] = g + .5 | 0, c[1] = 100 * h + .5 | 0, c[2] = 100 * i + .5 | 0), c
					},
					oa = function (a, b) {
						var c, d, e, f = a.match(pa) || [],
							g = 0,
							h = "";
						if (!f.length) return a;
						for (c = 0; c < f.length; c++) d = f[c], e = a.substr(g, a.indexOf(d, g) - g), g += e.length + d.length, d = na(d, b), 3 === d.length && d.push(1), h += e + (b ? "hsla(" + d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : "rgba(" + d.join(",")) + ")";
						return h + a.substr(g)
					},
					pa = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
				for (j in la) pa += "|" + j + "\\b";
				pa = new RegExp(pa + ")", "gi"), g.colorStringFilter = function (a) {
					var b, c = a[0] + " " + a[1];
					pa.test(c) && (b = -1 !== c.indexOf("hsl(") || -1 !== c.indexOf("hsla("), a[0] = oa(a[0], b), a[1] = oa(a[1], b)), pa.lastIndex = 0
				}, b.defaultStringFilter || (b.defaultStringFilter = g.colorStringFilter);
				var qa = function (a, b, c, d) {
						if (null == a) return function (a) {
							return a
						};
						var e, f = b ? (a.match(pa) || [""])[0] : "",
							g = a.split(f).join("").match(u) || [],
							h = a.substr(0, a.indexOf(g[0])),
							i = ")" === a.charAt(a.length - 1) ? ")" : "",
							j = -1 !== a.indexOf(" ") ? " " : ",",
							k = g.length,
							l = k > 0 ? g[0].replace(s, "") : "";
						return k ? e = b ? function (a) {
							var b, m, n, o;
							if ("number" == typeof a) a += l;
							else if (d && I.test(a)) {
								for (o = a.replace(I, "|").split("|"), n = 0; n < o.length; n++) o[n] = e(o[n]);
								return o.join(",")
							}
							if (b = (a.match(pa) || [f])[0], m = a.split(b).join("").match(u) || [], n = m.length, k > n--)
								for (; ++n < k;) m[n] = c ? m[(n - 1) / 2 | 0] : g[n];
							return h + m.join(j) + j + b + i + (-1 !== a.indexOf("inset") ? " inset" : "")
						} : function (a) {
							var b, f, m;
							if ("number" == typeof a) a += l;
							else if (d && I.test(a)) {
								for (f = a.replace(I, "|").split("|"), m = 0; m < f.length; m++) f[m] = e(f[m]);
								return f.join(",")
							}
							if (b = a.match(u) || [], m = b.length, k > m--)
								for (; ++m < k;) b[m] = c ? b[(m - 1) / 2 | 0] : g[m];
							return h + b.join(j) + i
						} : function (a) {
							return a
						}
					},
					ra = function (a) {
						return a = a.split(","),
							function (b, c, d, e, f, g, h) {
								var i, j = (c + "").split(" ");
								for (h = {}, i = 0; 4 > i; i++) h[a[i]] = j[i] = j[i] || j[(i - 1) / 2 >> 0];
								return e.parse(b, h, f, g)
							}
					},
					sa = (S._setPluginRatio = function (a) {
						this.plugin.setRatio(a);
						for (var b, c, d, e, f, g = this.data, h = g.proxy, i = g.firstMPT, j = 1e-6; i;) b = h[i.v], i.r ? b = Math.round(b) : j > b && b > -j && (b = 0), i.t[i.p] = b, i = i._next;
						if (g.autoRotate && (g.autoRotate.rotation = g.mod ? g.mod(h.rotation, this.t) : h.rotation), 1 === a || 0 === a)
							for (i = g.firstMPT, f = 1 === a ? "e" : "b"; i;) {
								if (c = i.t, c.type) {
									if (1 === c.type) {
										for (e = c.xs0 + c.s + c.xs1, d = 1; d < c.l; d++) e += c["xn" + d] + c["xs" + (d + 1)];
										c[f] = e
									}
								} else c[f] = c.s + c.xs0;
								i = i._next
							}
					}, function (a, b, c, d, e) {
						this.t = a, this.p = b, this.v = c, this.r = e, d && (d._prev = this, this._next = d)
					}),
					ta = (S._parseToProxy = function (a, b, c, d, e, f) {
						var g, h, i, j, k, l = d,
							m = {},
							n = {},
							o = c._transform,
							p = M;
						for (c._transform = null, M = b, d = k = c.parse(a, b, d, e), M = p, f && (c._transform = o, l && (l._prev = null, l._prev && (l._prev._next = null))); d && d !== l;) {
							if (d.type <= 1 && (h = d.p, n[h] = d.s + d.c, m[h] = d.s, f || (j = new sa(d, "s", h, j, d.r), d.c = 0), 1 === d.type))
								for (g = d.l; --g > 0;) i = "xn" + g, h = d.p + "_" + i, n[h] = d.data[i], m[h] = d[i], f || (j = new sa(d, i, h, j, d.rxp[i]));
							d = d._next
						}
						return {
							proxy: m,
							end: n,
							firstMPT: j,
							pt: k
						}
					}, S.CSSPropTween = function (a, b, d, e, g, h, i, j, k, l, m) {
						this.t = a, this.p = b, this.s = d, this.c = e, this.n = i || b, a instanceof ta || f.push(this.n), this.r = j, this.type = h || 0, k && (this.pr = k, c = !0), this.b = void 0 === l ? d : l, this.e = void 0 === m ? d + e : m, g && (this._next = g, g._prev = this)
					}),
					ua = function (a, b, c, d, e, f) {
						var g = new ta(a, b, c, d - c, e, -1, f);
						return g.b = c, g.e = g.xs0 = d, g
					},
					va = g.parseComplex = function (a, b, c, d, e, f, h, i, j, l) {
						c = c || f || "", "function" == typeof d && (d = d(r, q)), h = new ta(a, b, 0, 0, h, l ? 2 : 1, null, !1, i, c, d), d += "", e && pa.test(d + c) && (d = [c, d], g.colorStringFilter(d), c = d[0], d = d[1]);
						var m, n, o, p, u, v, w, x, y, z, A, B, C, D = c.split(", ").join(",").split(" "),
							E = d.split(", ").join(",").split(" "),
							F = D.length,
							G = k !== !1;
						for ((-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (-1 !== (d + c).indexOf("rgb") || -1 !== (d + c).indexOf("hsl") ? (D = D.join(" ").replace(I, ", ").split(" "), E = E.join(" ").replace(I, ", ").split(" ")) : (D = D.join(" ").split(",").join(", ").split(" "), E = E.join(" ").split(",").join(", ").split(" ")), F = D.length), F !== E.length && (D = (f || "").split(" "), F = D.length), h.plugin = j, h.setRatio = l, pa.lastIndex = 0, m = 0; F > m; m++)
							if (p = D[m], u = E[m], x = parseFloat(p), x || 0 === x) h.appendXtra("", x, ia(u, x), u.replace(t, ""), G && -1 !== u.indexOf("px"), !0);
							else if (e && pa.test(p)) B = u.indexOf(")") + 1, B = ")" + (B ? u.substr(B) : ""), C = -1 !== u.indexOf("hsl") && U, z = u, p = na(p, C), u = na(u, C), y = p.length + u.length > 6, y && !U && 0 === u[3] ? (h["xs" + h.l] += h.l ? " transparent" : "transparent", h.e = h.e.split(E[m]).join("transparent")) : (U || (y = !1), C ? h.appendXtra(z.substr(0, z.indexOf("hsl")) + (y ? "hsla(" : "hsl("), p[0], ia(u[0], p[0]), ",", !1, !0).appendXtra("", p[1], ia(u[1], p[1]), "%,", !1).appendXtra("", p[2], ia(u[2], p[2]), y ? "%," : "%" + B, !1) : h.appendXtra(z.substr(0, z.indexOf("rgb")) + (y ? "rgba(" : "rgb("), p[0], u[0] - p[0], ",", !0, !0).appendXtra("", p[1], u[1] - p[1], ",", !0).appendXtra("", p[2], u[2] - p[2], y ? "," : B, !0), y && (p = p.length < 4 ? 1 : p[3], h.appendXtra("", p, (u.length < 4 ? 1 : u[3]) - p, B, !1))), pa.lastIndex = 0;
						else if (v = p.match(s)) {
							if (w = u.match(t), !w || w.length !== v.length) return h;
							for (o = 0, n = 0; n < v.length; n++) A = v[n], z = p.indexOf(A, o), h.appendXtra(p.substr(o, z - o), Number(A), ia(w[n], A), "", G && "px" === p.substr(z + A.length, 2), 0 === n), o = z + A.length;
							h["xs" + h.l] += p.substr(o)
						} else h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + u : u;
						if (-1 !== d.indexOf("=") && h.data) {
							for (B = h.xs0 + h.data.s, m = 1; m < h.l; m++) B += h["xs" + m] + h.data["xn" + m];
							h.e = B + h["xs" + m]
						}
						return h.l || (h.type = -1, h.xs0 = h.e), h.xfirst || h
					},
					wa = 9;
				for (j = ta.prototype, j.l = j.pr = 0; --wa > 0;) j["xn" + wa] = 0, j["xs" + wa] = "";
				j.xs0 = "", j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null, j.appendXtra = function (a, b, c, d, e, f) {
					var g = this,
						h = g.l;
					return g["xs" + h] += f && (h || g["xs" + h]) ? " " + a : a || "", c || 0 === h || g.plugin ? (g.l++, g.type = g.setRatio ? 2 : 1, g["xs" + g.l] = d || "", h > 0 ? (g.data["xn" + h] = b + c, g.rxp["xn" + h] = e, g["xn" + h] = b, g.plugin || (g.xfirst = new ta(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr), g.xfirst.xs0 = 0), g) : (g.data = {
						s: b + c
					}, g.rxp = {}, g.s = b, g.c = c, g.r = e, g)) : (g["xs" + h] += b + (d || ""), g)
				};
				var xa = function (a, b) {
						b = b || {}, this.p = b.prefix ? Z(a) || a : a, i[a] = i[this.p] = this, this.format = b.formatter || qa(b.defaultValue, b.color, b.collapsible, b.multi), b.parser && (this.parse = b.parser), this.clrs = b.color, this.multi = b.multi, this.keyword = b.keyword, this.dflt = b.defaultValue, this.pr = b.priority || 0
					},
					ya = S._registerComplexSpecialProp = function (a, b, c) {
						"object" != typeof b && (b = {
							parser: c
						});
						var d, e, f = a.split(","),
							g = b.defaultValue;
						for (c = c || [g], d = 0; d < f.length; d++) b.prefix = 0 === d && b.prefix, b.defaultValue = c[d] || g, e = new xa(f[d], b)
					},
					za = S._registerPluginProp = function (a) {
						if (!i[a]) {
							var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
							ya(a, {
								parser: function (a, c, d, e, f, g, j) {
									var k = h.com.greensock.plugins[b];
									return k ? (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j)) : (W("Error: " + b + " js file not loaded."), f)
								}
							})
						}
					};
				j = xa.prototype, j.parseComplex = function (a, b, c, d, e, f) {
					var g, h, i, j, k, l, m = this.keyword;
					if (this.multi && (I.test(c) || I.test(b) ? (h = b.replace(I, "|").split("|"), i = c.replace(I, "|").split("|")) : m && (h = [b], i = [c])), i) {
						for (j = i.length > h.length ? i.length : h.length, g = 0; j > g; g++) b = h[g] = h[g] || this.dflt, c = i[g] = i[g] || this.dflt, m && (k = b.indexOf(m), l = c.indexOf(m), k !== l && (-1 === l ? h[g] = h[g].split(m).join("") : -1 === k && (h[g] += " " + m)));
						b = h.join(", "), c = i.join(", ")
					}
					return va(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f)
				}, j.parse = function (a, b, c, d, f, g, h) {
					return this.parseComplex(a.style, this.format(_(a, this.p, e, !1, this.dflt)), this.format(b), f, g)
				}, g.registerSpecialProp = function (a, b, c) {
					ya(a, {
						parser: function (a, d, e, f, g, h, i) {
							var j = new ta(a, e, 0, 0, g, 2, e, !1, c);
							return j.plugin = h, j.setRatio = b(a, d, f._tween, e), j
						},
						priority: c
					})
				}, g.useSVGTransformAttr = !0;
				var Aa, Ba = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
					Ca = Z("transform"),
					Da = X + "transform",
					Ea = Z("transformOrigin"),
					Fa = null !== Z("perspective"),
					Ga = S.Transform = function () {
						this.perspective = parseFloat(g.defaultTransformPerspective) || 0, this.force3D = g.defaultForce3D !== !1 && Fa ? g.defaultForce3D || "auto" : !1
					},
					Ha = _gsScope.SVGElement,
					Ia = function (a, b, c) {
						var d, e = O.createElementNS("http://www.w3.org/2000/svg", a),
							f = /([a-z])([A-Z])/g;
						for (d in c) e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]);
						return b.appendChild(e), e
					},
					Ja = O.documentElement || {},
					Ka = function () {
						var a, b, c, d = p || /Android/i.test(T) && !_gsScope.chrome;
						return O.createElementNS && !d && (a = Ia("svg", Ja), b = Ia("rect", a, {
							width: 100,
							height: 50,
							x: 100
						}), c = b.getBoundingClientRect().width, b.style[Ea] = "50% 50%", b.style[Ca] = "scaleX(0.5)", d = c === b.getBoundingClientRect().width && !(n && Fa), Ja.removeChild(a)), d
					}(),
					La = function (a, b, c, d, e, f) {
						var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v = a._gsTransform,
							w = Qa(a, !0);
						v && (t = v.xOrigin, u = v.yOrigin), (!d || (h = d.split(" ")).length < 2) && (n = a.getBBox(), 0 === n.x && 0 === n.y && n.width + n.height === 0 && (n = {
							x: parseFloat(a.hasAttribute("x") ? a.getAttribute("x") : a.hasAttribute("cx") ? a.getAttribute("cx") : 0) || 0,
							y: parseFloat(a.hasAttribute("y") ? a.getAttribute("y") : a.hasAttribute("cy") ? a.getAttribute("cy") : 0) || 0,
							width: 0,
							height: 0
						}), b = ha(b).split(" "), h = [(-1 !== b[0].indexOf("%") ? parseFloat(b[0]) / 100 * n.width : parseFloat(b[0])) + n.x, (-1 !== b[1].indexOf("%") ? parseFloat(b[1]) / 100 * n.height : parseFloat(b[1])) + n.y]), c.xOrigin = k = parseFloat(h[0]), c.yOrigin = l = parseFloat(h[1]), d && w !== Pa && (m = w[0], n = w[1], o = w[2], p = w[3], q = w[4], r = w[5], s = m * p - n * o, s && (i = k * (p / s) + l * (-o / s) + (o * r - p * q) / s, j = k * (-n / s) + l * (m / s) - (m * r - n * q) / s, k = c.xOrigin = h[0] = i, l = c.yOrigin = h[1] = j)), v && (f && (c.xOffset = v.xOffset, c.yOffset = v.yOffset, v = c), e || e !== !1 && g.defaultSmoothOrigin !== !1 ? (i = k - t, j = l - u, v.xOffset += i * w[0] + j * w[2] - i, v.yOffset += i * w[1] + j * w[3] - j) : v.xOffset = v.yOffset = 0), f || a.setAttribute("data-svg-origin", h.join(" "))
					},
					Ma = function (a) {
						var b, c = P("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
							d = this.parentNode,
							e = this.nextSibling,
							f = this.style.cssText;
						if (Ja.appendChild(c), c.appendChild(this), this.style.display = "block", a) try {
							b = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = Ma
						} catch (g) {} else this._originalGetBBox && (b = this._originalGetBBox());
						return e ? d.insertBefore(this, e) : d.appendChild(this), Ja.removeChild(c), this.style.cssText = f, b
					},
					Na = function (a) {
						try {
							return a.getBBox()
						} catch (b) {
							return Ma.call(a, !0)
						}
					},
					Oa = function (a) {
						return !(!Ha || !a.getCTM || a.parentNode && !a.ownerSVGElement || !Na(a))
					},
					Pa = [1, 0, 0, 1, 0, 0],
					Qa = function (a, b) {
						var c, d, e, f, g, h, i = a._gsTransform || new Ga,
							j = 1e5,
							k = a.style;
						if (Ca ? d = _(a, Da, null, !0) : a.currentStyle && (d = a.currentStyle.filter.match(G), d = d && 4 === d.length ? [d[0].substr(4), Number(d[2].substr(4)), Number(d[1].substr(4)), d[3].substr(4), i.x || 0, i.y || 0].join(",") : ""), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, !Ca || !(h = !$(a) || "none" === $(a).display) && a.parentNode || (h && (f = k.display, k.display = "block"), a.parentNode || (g = 1, Ja.appendChild(a)), d = _(a, Da, null, !0), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, f ? k.display = f : h && Va(k, "display"), g && Ja.removeChild(a)), (i.svg || a.getCTM && Oa(a)) && (c && -1 !== (k[Ca] + "").indexOf("matrix") && (d = k[Ca], c = 0), e = a.getAttribute("transform"), c && e && (-1 !== e.indexOf("matrix") ? (d = e, c = 0) : -1 !== e.indexOf("translate") && (d = "matrix(1,0,0,1," + e.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", c = 0))), c) return Pa;
						for (e = (d || "").match(s) || [], wa = e.length; --wa > -1;) f = Number(e[wa]), e[wa] = (g = f - (f |= 0)) ? (g * j + (0 > g ? -.5 : .5) | 0) / j + f : f;
						return b && e.length > 6 ? [e[0], e[1], e[4], e[5], e[12], e[13]] : e
					},
					Ra = S.getTransform = function (a, c, d, e) {
						if (a._gsTransform && d && !e) return a._gsTransform;
						var f, h, i, j, k, l, m = d ? a._gsTransform || new Ga : new Ga,
							n = m.scaleX < 0,
							o = 2e-5,
							p = 1e5,
							q = Fa ? parseFloat(_(a, Ea, c, !1, "0 0 0").split(" ")[2]) || m.zOrigin || 0 : 0,
							r = parseFloat(g.defaultTransformPerspective) || 0;
						if (m.svg = !(!a.getCTM || !Oa(a)), m.svg && (La(a, _(a, Ea, c, !1, "50% 50%") + "", m, a.getAttribute("data-svg-origin")), Aa = g.useSVGTransformAttr || Ka), f = Qa(a), f !== Pa) {
							if (16 === f.length) {
								var s, t, u, v, w, x = f[0],
									y = f[1],
									z = f[2],
									A = f[3],
									B = f[4],
									C = f[5],
									D = f[6],
									E = f[7],
									F = f[8],
									G = f[9],
									H = f[10],
									I = f[12],
									J = f[13],
									K = f[14],
									M = f[11],
									N = Math.atan2(D, H);
								m.zOrigin && (K = -m.zOrigin, I = F * K - f[12], J = G * K - f[13], K = H * K + m.zOrigin - f[14]), m.rotationX = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), s = B * v + F * w, t = C * v + G * w, u = D * v + H * w, F = B * -w + F * v, G = C * -w + G * v, H = D * -w + H * v, M = E * -w + M * v, B = s, C = t, D = u), N = Math.atan2(-z, H), m.rotationY = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), s = x * v - F * w, t = y * v - G * w, u = z * v - H * w, G = y * w + G * v, H = z * w + H * v, M = A * w + M * v, x = s, y = t, z = u), N = Math.atan2(y, x), m.rotation = N * L, N && (v = Math.cos(N), w = Math.sin(N), s = x * v + y * w, t = B * v + C * w, u = F * v + G * w, y = y * v - x * w, C = C * v - B * w, G = G * v - F * w, x = s, B = t, F = u), m.rotationX && Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 && (m.rotationX = m.rotation = 0, m.rotationY = 180 - m.rotationY), N = Math.atan2(B, C), m.scaleX = (Math.sqrt(x * x + y * y + z * z) * p + .5 | 0) / p, m.scaleY = (Math.sqrt(C * C + D * D) * p + .5 | 0) / p, m.scaleZ = (Math.sqrt(F * F + G * G + H * H) * p + .5 | 0) / p, x /= m.scaleX, B /= m.scaleY, y /= m.scaleX, C /= m.scaleY, Math.abs(N) > o ? (m.skewX = N * L, B = 0, "simple" !== m.skewType && (m.scaleY *= 1 / Math.cos(N))) : m.skewX = 0, m.perspective = M ? 1 / (0 > M ? -M : M) : 0, m.x = I, m.y = J, m.z = K, m.svg && (m.x -= m.xOrigin - (m.xOrigin * x - m.yOrigin * B), m.y -= m.yOrigin - (m.yOrigin * y - m.xOrigin * C))
							} else if (!Fa || e || !f.length || m.x !== f[4] || m.y !== f[5] || !m.rotationX && !m.rotationY) {
								var O = f.length >= 6,
									P = O ? f[0] : 1,
									Q = f[1] || 0,
									R = f[2] || 0,
									S = O ? f[3] : 1;
								m.x = f[4] || 0, m.y = f[5] || 0, i = Math.sqrt(P * P + Q * Q), j = Math.sqrt(S * S + R * R), k = P || Q ? Math.atan2(Q, P) * L : m.rotation || 0, l = R || S ? Math.atan2(R, S) * L + k : m.skewX || 0, m.scaleX = i, m.scaleY = j, m.rotation = k, m.skewX = l, Fa && (m.rotationX = m.rotationY = m.z = 0, m.perspective = r, m.scaleZ = 1), m.svg && (m.x -= m.xOrigin - (m.xOrigin * P + m.yOrigin * R), m.y -= m.yOrigin - (m.xOrigin * Q + m.yOrigin * S))
							}
							Math.abs(m.skewX) > 90 && Math.abs(m.skewX) < 270 && (n ? (m.scaleX *= -1, m.skewX += m.rotation <= 0 ? 180 : -180, m.rotation += m.rotation <= 0 ? 180 : -180) : (m.scaleY *= -1, m.skewX += m.skewX <= 0 ? 180 : -180)), m.zOrigin = q;
							for (h in m) m[h] < o && m[h] > -o && (m[h] = 0)
						}
						return d && (a._gsTransform = m, m.svg && (Aa && a.style[Ca] ? b.delayedCall(.001, function () {
							Va(a.style, Ca)
						}) : !Aa && a.getAttribute("transform") && b.delayedCall(.001, function () {
							a.removeAttribute("transform")
						}))), m
					},
					Sa = function (a) {
						var b, c, d = this.data,
							e = -d.rotation * K,
							f = e + d.skewX * K,
							g = 1e5,
							h = (Math.cos(e) * d.scaleX * g | 0) / g,
							i = (Math.sin(e) * d.scaleX * g | 0) / g,
							j = (Math.sin(f) * -d.scaleY * g | 0) / g,
							k = (Math.cos(f) * d.scaleY * g | 0) / g,
							l = this.t.style,
							m = this.t.currentStyle;
						if (m) {
							c = i, i = -j, j = -c, b = m.filter, l.filter = "";
							var n, o, q = this.t.offsetWidth,
								r = this.t.offsetHeight,
								s = "absolute" !== m.position,
								t = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + i + ", M21=" + j + ", M22=" + k,
								u = d.x + q * d.xPercent / 100,
								v = d.y + r * d.yPercent / 100;
							if (null != d.ox && (n = (d.oxp ? q * d.ox * .01 : d.ox) - q / 2, o = (d.oyp ? r * d.oy * .01 : d.oy) - r / 2, u += n - (n * h + o * i), v += o - (n * j + o * k)), s ? (n = q / 2, o = r / 2, t += ", Dx=" + (n - (n * h + o * i) + u) + ", Dy=" + (o - (n * j + o * k) + v) + ")") : t += ", sizingMethod='auto expand')", -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(") ? l.filter = b.replace(H, t) : l.filter = t + " " + b, (0 === a || 1 === a) && 1 === h && 0 === i && 0 === j && 1 === k && (s && -1 === t.indexOf("Dx=0, Dy=0") || x.test(b) && 100 !== parseFloat(RegExp.$1) || -1 === b.indexOf(b.indexOf("Alpha")) && l.removeAttribute("filter")), !s) {
								var y, z, A, B = 8 > p ? 1 : -1;
								for (n = d.ieOffsetX || 0, o = d.ieOffsetY || 0, d.ieOffsetX = Math.round((q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + u), d.ieOffsetY = Math.round((r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + v), wa = 0; 4 > wa; wa++) z = fa[wa], y = m[z], c = -1 !== y.indexOf("px") ? parseFloat(y) : aa(this.t, z, parseFloat(y), y.replace(w, "")) || 0, A = c !== d[z] ? 2 > wa ? -d.ieOffsetX : -d.ieOffsetY : 2 > wa ? n - d.ieOffsetX : o - d.ieOffsetY, l[z] = (d[z] = Math.round(c - A * (0 === wa || 2 === wa ? 1 : B))) + "px"
							}
						}
					},
					Ta = S.set3DTransformRatio = S.setTransformRatio = function (a) {
						var b, c, d, e, f, g, h, i, j, k, l, m, o, p, q, r, s, t, u, v, w, x, y, z = this.data,
							A = this.t.style,
							B = z.rotation,
							C = z.rotationX,
							D = z.rotationY,
							E = z.scaleX,
							F = z.scaleY,
							G = z.scaleZ,
							H = z.x,
							I = z.y,
							J = z.z,
							L = z.svg,
							M = z.perspective,
							N = z.force3D,
							O = z.skewY,
							P = z.skewX;
						if (O && (P += O, B += O), ((1 === a || 0 === a) && "auto" === N && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !N) && !J && !M && !D && !C && 1 === G || Aa && L || !Fa) return void(B || P || L ? (B *= K, x = P * K, y = 1e5, c = Math.cos(B) * E, f = Math.sin(B) * E, d = Math.sin(B - x) * -F, g = Math.cos(B - x) * F, x && "simple" === z.skewType && (b = Math.tan(x - O * K), b = Math.sqrt(1 + b * b), d *= b, g *= b, O && (b = Math.tan(O * K), b = Math.sqrt(1 + b * b), c *= b, f *= b)), L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset, Aa && (z.xPercent || z.yPercent) && (q = this.t.getBBox(), H += .01 * z.xPercent * q.width, I += .01 * z.yPercent * q.height), q = 1e-6, q > H && H > -q && (H = 0), q > I && I > -q && (I = 0)), u = (c * y | 0) / y + "," + (f * y | 0) / y + "," + (d * y | 0) / y + "," + (g * y | 0) / y + "," + H + "," + I + ")", L && Aa ? this.t.setAttribute("transform", "matrix(" + u) : A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + u) : A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + F + "," + H + "," + I + ")");
						if (n && (q = 1e-4, q > E && E > -q && (E = G = 2e-5), q > F && F > -q && (F = G = 2e-5), !M || z.z || z.rotationX || z.rotationY || (M = 0)), B || P) B *= K, r = c = Math.cos(B), s = f = Math.sin(B), P && (B -= P * K, r = Math.cos(B), s = Math.sin(B), "simple" === z.skewType && (b = Math.tan((P - O) * K), b = Math.sqrt(1 + b * b), r *= b, s *= b, z.skewY && (b = Math.tan(O * K), b = Math.sqrt(1 + b * b), c *= b, f *= b))), d = -s, g = r;
						else {
							if (!(D || C || 1 !== G || M || L)) return void(A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) translate3d(" : "translate3d(") + H + "px," + I + "px," + J + "px)" + (1 !== E || 1 !== F ? " scale(" + E + "," + F + ")" : ""));
							c = g = 1, d = f = 0
						}
						k = 1, e = h = i = j = l = m = 0, o = M ? -1 / M : 0, p = z.zOrigin, q = 1e-6, v = ",", w = "0", B = D * K, B && (r = Math.cos(B), s = Math.sin(B), i = -s, l = o * -s, e = c * s, h = f * s, k = r, o *= r, c *= r, f *= r), B = C * K, B && (r = Math.cos(B), s = Math.sin(B), b = d * r + e * s, t = g * r + h * s, j = k * s, m = o * s, e = d * -s + e * r, h = g * -s + h * r, k *= r, o *= r, d = b, g = t), 1 !== G && (e *= G, h *= G, k *= G, o *= G), 1 !== F && (d *= F, g *= F, j *= F, m *= F), 1 !== E && (c *= E, f *= E, i *= E, l *= E), (p || L) && (p && (H += e * -p, I += h * -p, J += k * -p + p), L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset), q > H && H > -q && (H = w), q > I && I > -q && (I = w), q > J && J > -q && (J = 0)), u = z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix3d(" : "matrix3d(", u += (q > c && c > -q ? w : c) + v + (q > f && f > -q ? w : f) + v + (q > i && i > -q ? w : i), u += v + (q > l && l > -q ? w : l) + v + (q > d && d > -q ? w : d) + v + (q > g && g > -q ? w : g), C || D || 1 !== G ? (u += v + (q > j && j > -q ? w : j) + v + (q > m && m > -q ? w : m) + v + (q > e && e > -q ? w : e), u += v + (q > h && h > -q ? w : h) + v + (q > k && k > -q ? w : k) + v + (q > o && o > -q ? w : o) + v) : u += ",0,0,0,0,1,0,", u += H + v + I + v + J + v + (M ? 1 + -J / M : 1) + ")", A[Ca] = u
					};
				j = Ga.prototype, j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0, j.scaleX = j.scaleY = j.scaleZ = 1, ya("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
					parser: function (a, b, c, d, f, h, i) {
						if (d._lastParsedTransform === i) return f;
						d._lastParsedTransform = i;
						var j, k = i.scale && "function" == typeof i.scale ? i.scale : 0;
						"function" == typeof i[c] && (j = i[c], i[c] = b), k && (i.scale = k(r, a));
						var l, m, n, o, p, s, t, u, v, w = a._gsTransform,
							x = a.style,
							y = 1e-6,
							z = Ba.length,
							A = i,
							B = {},
							C = "transformOrigin",
							D = Ra(a, e, !0, A.parseTransform),
							E = A.transform && ("function" == typeof A.transform ? A.transform(r, q) : A.transform);
						if (D.skewType = A.skewType || D.skewType || g.defaultSkewType, d._transform = D, E && "string" == typeof E && Ca) m = Q.style, m[Ca] = E, m.display = "block", m.position = "absolute", O.body.appendChild(Q), l = Ra(Q, null, !1), "simple" === D.skewType && (l.scaleY *= Math.cos(l.skewX * K)), D.svg && (s = D.xOrigin, t = D.yOrigin, l.x -= D.xOffset, l.y -= D.yOffset, (A.transformOrigin || A.svgOrigin) && (E = {}, La(a, ha(A.transformOrigin), E, A.svgOrigin, A.smoothOrigin, !0), s = E.xOrigin, t = E.yOrigin, l.x -= E.xOffset - D.xOffset, l.y -= E.yOffset - D.yOffset), (s || t) && (u = Qa(Q, !0), l.x -= s - (s * u[0] + t * u[2]), l.y -= t - (s * u[1] + t * u[3]))), O.body.removeChild(Q), l.perspective || (l.perspective = D.perspective), null != A.xPercent && (l.xPercent = ja(A.xPercent, D.xPercent)), null != A.yPercent && (l.yPercent = ja(A.yPercent, D.yPercent));
						else if ("object" == typeof A) {
							if (l = {
									scaleX: ja(null != A.scaleX ? A.scaleX : A.scale, D.scaleX),
									scaleY: ja(null != A.scaleY ? A.scaleY : A.scale, D.scaleY),
									scaleZ: ja(A.scaleZ, D.scaleZ),
									x: ja(A.x, D.x),
									y: ja(A.y, D.y),
									z: ja(A.z, D.z),
									xPercent: ja(A.xPercent, D.xPercent),
									yPercent: ja(A.yPercent, D.yPercent),
									perspective: ja(A.transformPerspective, D.perspective)
								}, p = A.directionalRotation, null != p)
								if ("object" == typeof p)
									for (m in p) A[m] = p[m];
								else A.rotation = p;
							"string" == typeof A.x && -1 !== A.x.indexOf("%") && (l.x = 0, l.xPercent = ja(A.x, D.xPercent)), "string" == typeof A.y && -1 !== A.y.indexOf("%") && (l.y = 0, l.yPercent = ja(A.y, D.yPercent)), l.rotation = ka("rotation" in A ? A.rotation : "shortRotation" in A ? A.shortRotation + "_short" : "rotationZ" in A ? A.rotationZ : D.rotation, D.rotation, "rotation", B), Fa && (l.rotationX = ka("rotationX" in A ? A.rotationX : "shortRotationX" in A ? A.shortRotationX + "_short" : D.rotationX || 0, D.rotationX, "rotationX", B), l.rotationY = ka("rotationY" in A ? A.rotationY : "shortRotationY" in A ? A.shortRotationY + "_short" : D.rotationY || 0, D.rotationY, "rotationY", B)), l.skewX = ka(A.skewX, D.skewX), l.skewY = ka(A.skewY, D.skewY)
						}
						for (Fa && null != A.force3D && (D.force3D = A.force3D, o = !0), n = D.force3D || D.z || D.rotationX || D.rotationY || l.z || l.rotationX || l.rotationY || l.perspective, n || null == A.scale || (l.scaleZ = 1); --z > -1;) v = Ba[z], E = l[v] - D[v], (E > y || -y > E || null != A[v] || null != M[v]) && (o = !0, f = new ta(D, v, D[v], E, f), v in B && (f.e = B[v]), f.xs0 = 0, f.plugin = h, d._overwriteProps.push(f.n));
						return E = A.transformOrigin, D.svg && (E || A.svgOrigin) && (s = D.xOffset, t = D.yOffset, La(a, ha(E), l, A.svgOrigin, A.smoothOrigin), f = ua(D, "xOrigin", (w ? D : l).xOrigin, l.xOrigin, f, C), f = ua(D, "yOrigin", (w ? D : l).yOrigin, l.yOrigin, f, C), (s !== D.xOffset || t !== D.yOffset) && (f = ua(D, "xOffset", w ? s : D.xOffset, D.xOffset, f, C), f = ua(D, "yOffset", w ? t : D.yOffset, D.yOffset, f, C)), E = "0px 0px"), (E || Fa && n && D.zOrigin) && (Ca ? (o = !0, v = Ea, E = (E || _(a, v, e, !1, "50% 50%")) + "", f = new ta(x, v, 0, 0, f, -1, C), f.b = x[v], f.plugin = h, Fa ? (m = D.zOrigin, E = E.split(" "), D.zOrigin = (E.length > 2 && (0 === m || "0px" !== E[2]) ? parseFloat(E[2]) : m) || 0, f.xs0 = f.e = E[0] + " " + (E[1] || "50%") + " 0px", f = new ta(D, "zOrigin", 0, 0, f, -1, f.n), f.b = m, f.xs0 = f.e = D.zOrigin) : f.xs0 = f.e = E) : ha(E + "", D)), o && (d._transformType = D.svg && Aa || !n && 3 !== this._transformType ? 2 : 3), j && (i[c] = j), k && (i.scale = k), f
					},
					prefix: !0
				}), ya("boxShadow", {
					defaultValue: "0px 0px 0px 0px #999",
					prefix: !0,
					color: !0,
					multi: !0,
					keyword: "inset"
				}), ya("borderRadius", {
					defaultValue: "0px",
					parser: function (a, b, c, f, g, h) {
						b = this.format(b);
						var i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
							z = a.style;
						for (q = parseFloat(a.offsetWidth), r = parseFloat(a.offsetHeight), i = b.split(" "), j = 0; j < y.length; j++) this.p.indexOf("border") && (y[j] = Z(y[j])), m = l = _(a, y[j], e, !1, "0px"), -1 !== m.indexOf(" ") && (l = m.split(" "), m = l[0], l = l[1]), n = k = i[j], o = parseFloat(m), t = m.substr((o + "").length), u = "=" === n.charAt(1), u ? (p = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), p *= parseFloat(n), s = n.substr((p + "").length - (0 > p ? 1 : 0)) || "") : (p = parseFloat(n), s = n.substr((p + "").length)), "" === s && (s = d[c] || t), s !== t && (v = aa(a, "borderLeft", o, t), w = aa(a, "borderTop", o, t), "%" === s ? (m = v / q * 100 + "%", l = w / r * 100 + "%") : "em" === s ? (x = aa(a, "borderLeft", 1, "em"), m = v / x + "em", l = w / x + "em") : (m = v + "px", l = w + "px"), u && (n = parseFloat(m) + p + s, k = parseFloat(l) + p + s)), g = va(z, y[j], m + " " + l, n + " " + k, !1, "0px", g);
						return g
					},
					prefix: !0,
					formatter: qa("0px 0px 0px 0px", !1, !0)
				}), ya("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
					defaultValue: "0px",
					parser: function (a, b, c, d, f, g) {
						return va(a.style, c, this.format(_(a, c, e, !1, "0px 0px")), this.format(b), !1, "0px", f)
					},
					prefix: !0,
					formatter: qa("0px 0px", !1, !0)
				}), ya("backgroundPosition", {
					defaultValue: "0 0",
					parser: function (a, b, c, d, f, g) {
						var h, i, j, k, l, m, n = "background-position",
							o = e || $(a, null),
							q = this.format((o ? p ? o.getPropertyValue(n + "-x") + " " + o.getPropertyValue(n + "-y") : o.getPropertyValue(n) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"),
							r = this.format(b);
						if (-1 !== q.indexOf("%") != (-1 !== r.indexOf("%")) && r.split(",").length < 2 && (m = _(a, "backgroundImage").replace(D, ""), m && "none" !== m)) {
							for (h = q.split(" "), i = r.split(" "), R.setAttribute("src", m), j = 2; --j > -1;) q = h[j], k = -1 !== q.indexOf("%"), k !== (-1 !== i[j].indexOf("%")) && (l = 0 === j ? a.offsetWidth - R.width : a.offsetHeight - R.height, h[j] = k ? parseFloat(q) / 100 * l + "px" : parseFloat(q) / l * 100 + "%");
							q = h.join(" ")
						}
						return this.parseComplex(a.style, q, r, f, g)
					},
					formatter: ha
				}), ya("backgroundSize", {
					defaultValue: "0 0",
					formatter: function (a) {
						return a += "", ha(-1 === a.indexOf(" ") ? a + " " + a : a)
					}
				}), ya("perspective", {
					defaultValue: "0px",
					prefix: !0
				}), ya("perspectiveOrigin", {
					defaultValue: "50% 50%",
					prefix: !0
				}), ya("transformStyle", {
					prefix: !0
				}), ya("backfaceVisibility", {
					prefix: !0
				}), ya("userSelect", {
					prefix: !0
				}), ya("margin", {
					parser: ra("marginTop,marginRight,marginBottom,marginLeft")
				}), ya("padding", {
					parser: ra("paddingTop,paddingRight,paddingBottom,paddingLeft")
				}), ya("clip", {
					defaultValue: "rect(0px,0px,0px,0px)",
					parser: function (a, b, c, d, f, g) {
						var h, i, j;
						return 9 > p ? (i = a.currentStyle, j = 8 > p ? " " : ",", h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")", b = this.format(b).split(",").join(j)) : (h = this.format(_(a, this.p, e, !1, this.dflt)), b = this.format(b)), this.parseComplex(a.style, h, b, f, g)
					}
				}), ya("textShadow", {
					defaultValue: "0px 0px 0px #999",
					color: !0,
					multi: !0
				}), ya("autoRound,strictUnits", {
					parser: function (a, b, c, d, e) {
						return e
					}
				}), ya("border", {
					defaultValue: "0px solid #000",
					parser: function (a, b, c, d, f, g) {
						var h = _(a, "borderTopWidth", e, !1, "0px"),
							i = this.format(b).split(" "),
							j = i[0].replace(w, "");
						return "px" !== j && (h = parseFloat(h) / aa(a, "borderTopWidth", 1, j) + j), this.parseComplex(a.style, this.format(h + " " + _(a, "borderTopStyle", e, !1, "solid") + " " + _(a, "borderTopColor", e, !1, "#000")), i.join(" "), f, g)
					},
					color: !0,
					formatter: function (a) {
						var b = a.split(" ");
						return b[0] + " " + (b[1] || "solid") + " " + (a.match(pa) || ["#000"])[0]
					}
				}), ya("borderWidth", {
					parser: ra("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
				}), ya("float,cssFloat,styleFloat", {
					parser: function (a, b, c, d, e, f) {
						var g = a.style,
							h = "cssFloat" in g ? "cssFloat" : "styleFloat";
						return new ta(g, h, 0, 0, e, -1, c, !1, 0, g[h], b)
					}
				});
				var Ua = function (a) {
					var b, c = this.t,
						d = c.filter || _(this.data, "filter") || "",
						e = this.s + this.c * a | 0;
					100 === e && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d.indexOf("oader(") ? (c.removeAttribute("filter"), b = !_(this.data, "filter")) : (c.filter = d.replace(z, ""), b = !0)), b || (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"), -1 === d.indexOf("pacity") ? 0 === e && this.xn1 || (c.filter = d + " alpha(opacity=" + e + ")") : c.filter = d.replace(x, "opacity=" + e))
				};
				ya("opacity,alpha,autoAlpha", {
					defaultValue: "1",
					parser: function (a, b, c, d, f, g) {
						var h = parseFloat(_(a, "opacity", e, !1, "1")),
							i = a.style,
							j = "autoAlpha" === c;
						return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), j && 1 === h && "hidden" === _(a, "visibility", e) && 0 !== b && (h = 0), U ? f = new ta(i, "opacity", h, b - h, f) : (f = new ta(i, "opacity", 100 * h, 100 * (b - h), f), f.xn1 = j ? 1 : 0, i.zoom = 1, f.type = 2, f.b = "alpha(opacity=" + f.s + ")", f.e = "alpha(opacity=" + (f.s + f.c) + ")", f.data = a, f.plugin = g, f.setRatio = Ua), j && (f = new ta(i, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"), f.xs0 = "inherit", d._overwriteProps.push(f.n), d._overwriteProps.push(c)), f
					}
				});
				var Va = function (a, b) {
						b && (a.removeProperty ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) && (b = "-" + b), a.removeProperty(b.replace(B, "-$1").toLowerCase())) : a.removeAttribute(b))
					},
					Wa = function (a) {
						if (this.t._gsClassPT = this, 1 === a || 0 === a) {
							this.t.setAttribute("class", 0 === a ? this.b : this.e);
							for (var b = this.data, c = this.t.style; b;) b.v ? c[b.p] = b.v : Va(c, b.p), b = b._next;
							1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null)
						} else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
					};
				ya("className", {
					parser: function (a, b, d, f, g, h, i) {
						var j, k, l, m, n, o = a.getAttribute("class") || "",
							p = a.style.cssText;
						if (g = f._classNamePT = new ta(a, d, 0, 0, g, 2), g.setRatio = Wa, g.pr = -11, c = !0, g.b = o, k = ca(a, e), l = a._gsClassPT) {
							for (m = {}, n = l.data; n;) m[n.p] = 1, n = n._next;
							l.setRatio(1)
						}
						return a._gsClassPT = g, g.e = "=" !== b.charAt(1) ? b : o.replace(new RegExp("(?:\\s|^)" + b.substr(2) + "(?![\\w-])"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""), a.setAttribute("class", g.e), j = da(a, k, ca(a), i, m), a.setAttribute("class", o), g.data = j.firstMPT, a.style.cssText = p, g = g.xfirst = f.parse(a, j.difs, g, h)
					}
				});
				var Xa = function (a) {
					if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
						var b, c, d, e, f, g = this.t.style,
							h = i.transform.parse;
						if ("all" === this.e) g.cssText = "", e = !0;
						else
							for (b = this.e.split(" ").join("").split(","), d = b.length; --d > -1;) c = b[d], i[c] && (i[c].parse === h ? e = !0 : c = "transformOrigin" === c ? Ea : i[c].p), Va(g, c);
						e && (Va(g, Ca), f = this.t._gsTransform, f && (f.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
					}
				};
				for (ya("clearProps", {
						parser: function (a, b, d, e, f) {
							return f = new ta(a, d, 0, 0, f, 2), f.setRatio = Xa, f.e = b, f.pr = -10, f.data = e._tween, c = !0, f
						}
					}), j = "bezier,throwProps,physicsProps,physics2D".split(","), wa = j.length; wa--;) za(j[wa]);
				j = g.prototype, j._firstPT = j._lastParsedTransform = j._transform = null, j._onInitTween = function (a, b, h, j) {
					if (!a.nodeType) return !1;
					this._target = q = a, this._tween = h, this._vars = b, r = j, k = b.autoRound, c = !1, d = b.suffixMap || g.suffixMap, e = $(a, ""), f = this._overwriteProps;
					var n, p, s, t, u, v, w, x, z, A = a.style;
					if (l && "" === A.zIndex && (n = _(a, "zIndex", e), ("auto" === n || "" === n) && this._addLazySet(A, "zIndex", 0)), "string" == typeof b && (t = A.cssText, n = ca(a, e), A.cssText = t + ";" + b, n = da(a, n, ca(a)).difs, !U && y.test(b) && (n.opacity = parseFloat(RegExp.$1)), b = n, A.cssText = t), b.className ? this._firstPT = p = i.className.parse(a, b.className, "className", this, null, null, b) : this._firstPT = p = this.parse(a, b, null), this._transformType) {
						for (z = 3 === this._transformType, Ca ? m && (l = !0, "" === A.zIndex && (w = _(a, "zIndex", e), ("auto" === w || "" === w) && this._addLazySet(A, "zIndex", 0)), o && this._addLazySet(A, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (z ? "visible" : "hidden"))) : A.zoom = 1, s = p; s && s._next;) s = s._next;
						x = new ta(a, "transform", 0, 0, null, 2), this._linkCSSP(x, null, s), x.setRatio = Ca ? Ta : Sa, x.data = this._transform || Ra(a, e, !0), x.tween = h, x.pr = -1, f.pop()
					}
					if (c) {
						for (; p;) {
							for (v = p._next, s = t; s && s.pr > p.pr;) s = s._next;
							(p._prev = s ? s._prev : u) ? p._prev._next = p: t = p, (p._next = s) ? s._prev = p : u = p, p = v
						}
						this._firstPT = t
					}
					return !0
				}, j.parse = function (a, b, c, f) {
					var g, h, j, l, m, n, o, p, s, t, u = a.style;
					for (g in b) {
						if (n = b[g], "function" == typeof n && (n = n(r, q)), h = i[g]) c = h.parse(a, n, g, this, c, f, b);
						else {
							if ("--" === g.substr(0, 2)) {
								this._tween._propLookup[g] = this._addTween.call(this._tween, a.style, "setProperty", $(a).getPropertyValue(g) + "", n + "", g, !1, g);
								continue
							}
							m = _(a, g, e) + "", s = "string" == typeof n, "color" === g || "fill" === g || "stroke" === g || -1 !== g.indexOf("Color") || s && A.test(n) ? (s || (n = na(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"), c = va(u, g, m, n, !0, "transparent", c, 0, f)) : s && J.test(n) ? c = va(u, g, m, n, !0, null, c, 0, f) : (j = parseFloat(m), o = j || 0 === j ? m.substr((j + "").length) : "", ("" === m || "auto" === m) && ("width" === g || "height" === g ? (j = ga(a, g, e), o = "px") : "left" === g || "top" === g ? (j = ba(a, g, e), o = "px") : (j = "opacity" !== g ? 0 : 1, o = "")), t = s && "=" === n.charAt(1), t ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), p = n.replace(w, "")) : (l = parseFloat(n), p = s ? n.replace(w, "") : ""), "" === p && (p = g in d ? d[g] : o), n = l || 0 === l ? (t ? l + j : l) + p : b[g], o !== p && ("" !== p || "lineHeight" === g) && (l || 0 === l) && j && (j = aa(a, g, j, o), "%" === p ? (j /= aa(a, g, 100, "%") / 100, b.strictUnits !== !0 && (m = j + "%")) : "em" === p || "rem" === p || "vw" === p || "vh" === p ? j /= aa(a, g, 1, p) : "px" !== p && (l = aa(a, g, l, p), p = "px"), t && (l || 0 === l) && (n = l + j + p)), t && (l += j), !j && 0 !== j || !l && 0 !== l ? void 0 !== u[g] && (n || n + "" != "NaN" && null != n) ? (c = new ta(u, g, l || j || 0, 0, c, -1, g, !1, 0, m, n), c.xs0 = "none" !== n || "display" !== g && -1 === g.indexOf("Style") ? n : m) : W("invalid " + g + " tween value: " + b[g]) : (c = new ta(u, g, j, l - j, c, 0, g, k !== !1 && ("px" === p || "zIndex" === g), 0, m, n), c.xs0 = p))
						}
						f && c && !c.plugin && (c.plugin = f)
					}
					return c
				}, j.setRatio = function (a) {
					var b, c, d, e = this._firstPT,
						f = 1e-6;
					if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
						if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
							for (; e;) {
								if (b = e.c * a + e.s, e.r ? b = Math.round(b) : f > b && b > -f && (b = 0), e.type)
									if (1 === e.type)
										if (d = e.l, 2 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;
										else if (3 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;
								else if (4 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4;
								else if (5 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5;
								else {
									for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) c += e["xn" + d] + e["xs" + (d + 1)];
									e.t[e.p] = c
								} else -1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a);
								else e.t[e.p] = b + e.xs0;
								e = e._next
							} else
								for (; e;) 2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a), e = e._next;
						else
							for (; e;) {
								if (2 !== e.type)
									if (e.r && -1 !== e.type)
										if (b = Math.round(e.s + e.c), e.type) {
											if (1 === e.type) {
												for (d = e.l, c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) c += e["xn" + d] + e["xs" + (d + 1)];
												e.t[e.p] = c
											}
										} else e.t[e.p] = b + e.xs0;
								else e.t[e.p] = e.e;
								else e.setRatio(a);
								e = e._next
							}
				}, j._enableTransforms = function (a) {
					this._transform = this._transform || Ra(this._target, e, !0), this._transformType = this._transform.svg && Aa || !a && 3 !== this._transformType ? 2 : 3
				};
				var Ya = function (a) {
					this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
				};
				j._addLazySet = function (a, b, c) {
					var d = this._firstPT = new ta(a, b, 0, 0, this._firstPT, 2);
					d.e = c, d.setRatio = Ya, d.data = this
				}, j._linkCSSP = function (a, b, c, d) {
					return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next, d = !0), c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a), a._next = b, a._prev = c), a
				}, j._mod = function (a) {
					for (var b = this._firstPT; b;) "function" == typeof a[b.p] && a[b.p] === Math.round && (b.r = 1), b = b._next
				}, j._kill = function (b) {
					var c, d, e, f = b;
					if (b.autoAlpha || b.alpha) {
						f = {};
						for (d in b) f[d] = b[d];
						f.opacity = 1, f.autoAlpha && (f.visibility = 1)
					}
					for (b.className && (c = this._classNamePT) && (e = c.xfirst, e && e._prev ? this._linkCSSP(e._prev, c._next, e._prev._prev) : e === this._firstPT && (this._firstPT = c._next), c._next && this._linkCSSP(c._next, c._next._next, e._prev), this._classNamePT = null), c = this._firstPT; c;) c.plugin && c.plugin !== d && c.plugin._kill && (c.plugin._kill(b), d = c.plugin), c = c._next;
					return a.prototype._kill.call(this, f)
				};
				var Za = function (a, b, c) {
					var d, e, f, g;
					if (a.slice)
						for (e = a.length; --e > -1;) Za(a[e], b, c);
					else
						for (d = a.childNodes, e = d.length; --e > -1;) f = d[e], g = f.type, f.style && (b.push(ca(f)), c && c.push(f)), 1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || Za(f, b, c)
				};
				return g.cascadeTo = function (a, c, d) {
					var e, f, g, h, i = b.to(a, c, d),
						j = [i],
						k = [],
						l = [],
						m = [],
						n = b._internals.reservedProps;
					for (a = i._targets || i.target, Za(a, k, m), i.render(c, !0, !0), Za(a, l), i.render(0, !0, !0), i._enabled(!0), e = m.length; --e > -1;)
						if (f = da(m[e], k[e], l[e]), f.firstMPT) {
							f = f.difs;
							for (g in d) n[g] && (f[g] = d[g]);
							h = {};
							for (g in f) h[g] = k[e][g];
							j.push(b.fromTo(m[e], c, h, f))
						}
					return j
				}, a.activate([g]), g
			}, !0),
			function () {
				var a = _gsScope._gsDefine.plugin({
						propName: "roundProps",
						version: "1.6.0",
						priority: -1,
						API: 2,
						init: function (a, b, c) {
							return this._tween = c, !0
						}
					}),
					b = function (a) {
						for (; a;) a.f || a.blob || (a.m = Math.round), a = a._next
					},
					c = a.prototype;
				c._onInitAllProps = function () {
					for (var a, c, d, e = this._tween, f = e.vars.roundProps.join ? e.vars.roundProps : e.vars.roundProps.split(","), g = f.length, h = {}, i = e._propLookup.roundProps; --g > -1;) h[f[g]] = Math.round;
					for (g = f.length; --g > -1;)
						for (a = f[g], c = e._firstPT; c;) d = c._next, c.pg ? c.t._mod(h) : c.n === a && (2 === c.f && c.t ? b(c.t._firstPT) : (this._add(c.t, a, c.s, c.c), d && (d._prev = c._prev), c._prev ? c._prev._next = d : e._firstPT === c && (e._firstPT = d), c._next = c._prev = null, e._propLookup[a] = i)), c = d;
					return !1
				}, c._add = function (a, b, c, d) {
					this._addTween(a, b, c, c + d, b, Math.round), this._overwriteProps.push(b)
				}
			}(),
			function () {
				_gsScope._gsDefine.plugin({
					propName: "attr",
					API: 2,
					version: "0.6.1",
					init: function (a, b, c, d) {
						var e, f;
						if ("function" != typeof a.setAttribute) return !1;
						for (e in b) f = b[e], "function" == typeof f && (f = f(d, a)), this._addTween(a, "setAttribute", a.getAttribute(e) + "", f + "", e, !1, e), this._overwriteProps.push(e);
						return !0
					}
				})
			}(), _gsScope._gsDefine.plugin({
				propName: "directionalRotation",
				version: "0.3.1",
				API: 2,
				init: function (a, b, c, d) {
					"object" != typeof b && (b = {
						rotation: b
					}), this.finals = {};
					var e, f, g, h, i, j, k = b.useRadians === !0 ? 2 * Math.PI : 360,
						l = 1e-6;
					for (e in b) "useRadians" !== e && (h = b[e], "function" == typeof h && (h = h(d, a)), j = (h + "").split("_"), f = j[0], g = parseFloat("function" != typeof a[e] ? a[e] : a[e.indexOf("set") || "function" != typeof a["get" + e.substr(3)] ? e : "get" + e.substr(3)]()), h = this.finals[e] = "string" == typeof f && "=" === f.charAt(1) ? g + parseInt(f.charAt(0) + "1", 10) * Number(f.substr(2)) : Number(f) || 0, i = h - g, j.length && (f = j.join("_"), -1 !== f.indexOf("short") && (i %= k, i !== i % (k / 2) && (i = 0 > i ? i + k : i - k)), -1 !== f.indexOf("_cw") && 0 > i ? i = (i + 9999999999 * k) % k - (i / k | 0) * k : -1 !== f.indexOf("ccw") && i > 0 && (i = (i - 9999999999 * k) % k - (i / k | 0) * k)), (i > l || -l > i) && (this._addTween(a, e, g, g + i, e), this._overwriteProps.push(e)));
					return !0
				},
				set: function (a) {
					var b;
					if (1 !== a) this._super.setRatio.call(this, a);
					else
						for (b = this._firstPT; b;) b.f ? b.t[b.p](this.finals[b.p]) : b.t[b.p] = this.finals[b.p], b = b._next
				}
			})._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (a) {
				var b, c, d, e = _gsScope.GreenSockGlobals || _gsScope,
					f = e.com.greensock,
					g = 2 * Math.PI,
					h = Math.PI / 2,
					i = f._class,
					j = function (b, c) {
						var d = i("easing." + b, function () {}, !0),
							e = d.prototype = new a;
						return e.constructor = d, e.getRatio = c, d
					},
					k = a.register || function () {},
					l = function (a, b, c, d, e) {
						var f = i("easing." + a, {
							easeOut: new b,
							easeIn: new c,
							easeInOut: new d
						}, !0);
						return k(f, a), f
					},
					m = function (a, b, c) {
						this.t = a, this.v = b, c && (this.next = c, c.prev = this, this.c = c.v - b, this.gap = c.t - a)
					},
					n = function (b, c) {
						var d = i("easing." + b, function (a) {
								this._p1 = a || 0 === a ? a : 1.70158, this._p2 = 1.525 * this._p1
							}, !0),
							e = d.prototype = new a;
						return e.constructor = d, e.getRatio = c, e.config = function (a) {
							return new d(a)
						}, d
					},
					o = l("Back", n("BackOut", function (a) {
						return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1
					}), n("BackIn", function (a) {
						return a * a * ((this._p1 + 1) * a - this._p1)
					}), n("BackInOut", function (a) {
						return (a *= 2) < 1 ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2)
					})),
					p = i("easing.SlowMo", function (a, b, c) {
						b = b || 0 === b ? b : .7, null == a ? a = .7 : a > 1 && (a = 1), this._p = 1 !== a ? b : 0, this._p1 = (1 - a) / 2, this._p2 = a, this._p3 = this._p1 + this._p2, this._calcEnd = c === !0
					}, !0),
					q = p.prototype = new a;
				return q.constructor = p, q.getRatio = function (a) {
					var b = a + (.5 - a) * this._p;
					return a < this._p1 ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 === a ? 0 : 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b
				}, p.ease = new p(.7, .7), q.config = p.config = function (a, b, c) {
					return new p(a, b, c)
				}, b = i("easing.SteppedEase", function (a, b) {
					a = a || 1, this._p1 = 1 / a, this._p2 = a + (b ? 0 : 1), this._p3 = b ? 1 : 0
				}, !0), q = b.prototype = new a, q.constructor = b, q.getRatio = function (a) {
					return 0 > a ? a = 0 : a >= 1 && (a = .999999999), ((this._p2 * a | 0) + this._p3) * this._p1
				}, q.config = b.config = function (a, c) {
					return new b(a, c)
				}, c = i("easing.RoughEase", function (b) {
					b = b || {};
					for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b.points || 20), n = l, o = b.randomize !== !1, p = b.clamp === !0, q = b.template instanceof a ? b.template : null, r = "number" == typeof b.strength ? .4 * b.strength : .4; --n > -1;) c = o ? Math.random() : 1 / l * n, d = q ? q.getRatio(c) : c, "none" === i ? e = r : "out" === i ? (f = 1 - c, e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c, e = f * f * .5 * r) : (f = 2 * (1 - c), e = f * f * .5 * r), o ? d += Math.random() * e - .5 * e : n % 2 ? d += .5 * e : d -= .5 * e, p && (d > 1 ? d = 1 : 0 > d && (d = 0)), j[k++] = {
						x: c,
						y: d
					};
					for (j.sort(function (a, b) {
							return a.x - b.x
						}), h = new m(1, 1, null), n = l; --n > -1;) g = j[n], h = new m(g.x, g.y, h);
					this._prev = new m(0, 0, 0 !== h.t ? h : h.next)
				}, !0), q = c.prototype = new a, q.constructor = c, q.getRatio = function (a) {
					var b = this._prev;
					if (a > b.t) {
						for (; b.next && a >= b.t;) b = b.next;
						b = b.prev
					} else
						for (; b.prev && a <= b.t;) b = b.prev;
					return this._prev = b, b.v + (a - b.t) / b.gap * b.c
				}, q.config = function (a) {
					return new c(a)
				}, c.ease = new c, l("Bounce", j("BounceOut", function (a) {
					return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
				}), j("BounceIn", function (a) {
					return (a = 1 - a) < 1 / 2.75 ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
				}), j("BounceInOut", function (a) {
					var b = .5 > a;
					return a = b ? 1 - 2 * a : 2 * a - 1, a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375, b ? .5 * (1 - a) : .5 * a + .5
				})), l("Circ", j("CircOut", function (a) {
					return Math.sqrt(1 - (a -= 1) * a)
				}), j("CircIn", function (a) {
					return -(Math.sqrt(1 - a * a) - 1)
				}), j("CircInOut", function (a) {
					return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
				})), d = function (b, c, d) {
					var e = i("easing." + b, function (a, b) {
							this._p1 = a >= 1 ? a : 1, this._p2 = (b || d) / (1 > a ? a : 1), this._p3 = this._p2 / g * (Math.asin(1 / this._p1) || 0), this._p2 = g / this._p2
						}, !0),
						f = e.prototype = new a;
					return f.constructor = e, f.getRatio = c, f.config = function (a, b) {
						return new e(a, b)
					}, e
				}, l("Elastic", d("ElasticOut", function (a) {
					return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * this._p2) + 1
				}, .3), d("ElasticIn", function (a) {
					return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2))
				}, .3), d("ElasticInOut", function (a) {
					return (a *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2) * .5 + 1
				}, .45)), l("Expo", j("ExpoOut", function (a) {
					return 1 - Math.pow(2, -10 * a)
				}), j("ExpoIn", function (a) {
					return Math.pow(2, 10 * (a - 1)) - .001
				}), j("ExpoInOut", function (a) {
					return (a *= 2) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1)))
				})), l("Sine", j("SineOut", function (a) {
					return Math.sin(a * h)
				}), j("SineIn", function (a) {
					return -Math.cos(a * h) + 1
				}), j("SineInOut", function (a) {
					return -.5 * (Math.cos(Math.PI * a) - 1)
				})), i("easing.EaseLookup", {
					find: function (b) {
						return a.map[b]
					}
				}, !0), k(e.SlowMo, "SlowMo", "ease,"), k(c, "RoughEase", "ease,"), k(b, "SteppedEase", "ease,"), o
			}, !0)
	}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
	function (a, b) {
		"use strict";
		var c = {},
			d = a.document,
			e = a.GreenSockGlobals = a.GreenSockGlobals || a;
		if (!e.TweenLite) {
			var f, g, h, i, j, k = function (a) {
					var b, c = a.split("."),
						d = e;
					for (b = 0; b < c.length; b++) d[c[b]] = d = d[c[b]] || {};
					return d
				},
				l = k("com.greensock"),
				m = 1e-10,
				n = function (a) {
					var b, c = [],
						d = a.length;
					for (b = 0; b !== d; c.push(a[b++]));
					return c
				},
				o = function () {},
				p = function () {
					var a = Object.prototype.toString,
						b = a.call([]);
					return function (c) {
						return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) === b)
					}
				}(),
				q = {},
				r = function (d, f, g, h) {
					this.sc = q[d] ? q[d].sc : [], q[d] = this, this.gsClass = null, this.func = g;
					var i = [];
					this.check = function (j) {
						for (var l, m, n, o, p = f.length, s = p; --p > -1;)(l = q[f[p]] || new r(f[p], [])).gsClass ? (i[p] = l.gsClass, s--) : j && l.sc.push(this);
						if (0 === s && g) {
							if (m = ("com.greensock." + d).split("."), n = m.pop(), o = k(m.join("."))[n] = this.gsClass = g.apply(g, i), h)
								if (e[n] = c[n] = o, "undefined" != typeof module && module.exports)
									if (d === b) {
										module.exports = c[b] = o;
										for (p in c) o[p] = c[p]
									} else c[b] && (c[b][n] = o);
							else "function" == typeof define && define.amd && define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + d.split(".").pop(), [], function () {
								return o
							});
							for (p = 0; p < this.sc.length; p++) this.sc[p].check()
						}
					}, this.check(!0)
				},
				s = a._gsDefine = function (a, b, c, d) {
					return new r(a, b, c, d)
				},
				t = l._class = function (a, b, c) {
					return b = b || function () {}, s(a, [], function () {
						return b
					}, c), b
				};
			s.globals = e;
			var u = [0, 0, 1, 1],
				v = t("easing.Ease", function (a, b, c, d) {
					this._func = a, this._type = c || 0, this._power = d || 0, this._params = b ? u.concat(b) : u
				}, !0),
				w = v.map = {},
				x = v.register = function (a, b, c, d) {
					for (var e, f, g, h, i = b.split(","), j = i.length, k = (c || "easeIn,easeOut,easeInOut").split(","); --j > -1;)
						for (f = i[j], e = d ? t("easing." + f, null, !0) : l.easing[f] || {}, g = k.length; --g > -1;) h = k[g], w[f + "." + h] = w[h + f] = e[h] = a.getRatio ? a : a[h] || new a
				};
			for (h = v.prototype, h._calcEnd = !1, h.getRatio = function (a) {
					if (this._func) return this._params[0] = a, this._func.apply(null, this._params);
					var b = this._type,
						c = this._power,
						d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a);
					return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d), 1 === b ? 1 - d : 2 === b ? d : .5 > a ? d / 2 : 1 - d / 2
				}, f = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], g = f.length; --g > -1;) h = f[g] + ",Power" + g, x(new v(null, null, 1, g), h, "easeOut", !0), x(new v(null, null, 2, g), h, "easeIn" + (0 === g ? ",easeNone" : "")), x(new v(null, null, 3, g), h, "easeInOut");
			w.linear = l.easing.Linear.easeIn, w.swing = l.easing.Quad.easeInOut;
			var y = t("events.EventDispatcher", function (a) {
				this._listeners = {}, this._eventTarget = a || this
			});
			h = y.prototype, h.addEventListener = function (a, b, c, d, e) {
				e = e || 0;
				var f, g, h = this._listeners[a],
					k = 0;
				for (this !== i || j || i.wake(), null == h && (this._listeners[a] = h = []), g = h.length; --g > -1;) f = h[g], f.c === b && f.s === c ? h.splice(g, 1) : 0 === k && f.pr < e && (k = g + 1);
				h.splice(k, 0, {
					c: b,
					s: c,
					up: d,
					pr: e
				})
			}, h.removeEventListener = function (a, b) {
				var c, d = this._listeners[a];
				if (d)
					for (c = d.length; --c > -1;)
						if (d[c].c === b) return void d.splice(c, 1)
			}, h.dispatchEvent = function (a) {
				var b, c, d, e = this._listeners[a];
				if (e)
					for (b = e.length, b > 1 && (e = e.slice(0)), c = this._eventTarget; --b > -1;) d = e[b], d && (d.up ? d.c.call(d.s || c, {
						type: a,
						target: c
					}) : d.c.call(d.s || c))
			};
			var z = a.requestAnimationFrame,
				A = a.cancelAnimationFrame,
				B = Date.now || function () {
					return (new Date).getTime()
				},
				C = B();
			for (f = ["ms", "moz", "webkit", "o"], g = f.length; --g > -1 && !z;) z = a[f[g] + "RequestAnimationFrame"], A = a[f[g] + "CancelAnimationFrame"] || a[f[g] + "CancelRequestAnimationFrame"];
			t("Ticker", function (a, b) {
				var c, e, f, g, h, k = this,
					l = B(),
					n = b !== !1 && z ? "auto" : !1,
					p = 500,
					q = 33,
					r = "tick",
					s = function (a) {
						var b, d, i = B() - C;
						i > p && (l += i - q), C += i, k.time = (C - l) / 1e3, b = k.time - h, (!c || b > 0 || a === !0) && (k.frame++, h += b + (b >= g ? .004 : g - b), d = !0), a !== !0 && (f = e(s)), d && k.dispatchEvent(r)
					};
				y.call(k), k.time = k.frame = 0, k.tick = function () {
					s(!0)
				}, k.lagSmoothing = function (a, b) {
					return arguments.length ? (p = a || 1 / m, void(q = Math.min(b, p, 0))) : 1 / m > p
				}, k.sleep = function () {
					null != f && (n && A ? A(f) : clearTimeout(f), e = o, f = null, k === i && (j = !1))
				}, k.wake = function (a) {
					null !== f ? k.sleep() : a ? l += -C + (C = B()) : k.frame > 10 && (C = B() - p + 5), e = 0 === c ? o : n && z ? z : function (a) {
						return setTimeout(a, 1e3 * (h - k.time) + 1 | 0)
					}, k === i && (j = !0), s(2)
				}, k.fps = function (a) {
					return arguments.length ? (c = a, g = 1 / (c || 60), h = this.time + g, void k.wake()) : c
				}, k.useRAF = function (a) {
					return arguments.length ? (k.sleep(), n = a, void k.fps(c)) : n
				}, k.fps(a), setTimeout(function () {
					"auto" === n && k.frame < 5 && "hidden" !== d.visibilityState && k.useRAF(!1)
				}, 1500)
			}), h = l.Ticker.prototype = new l.events.EventDispatcher, h.constructor = l.Ticker;
			var D = t("core.Animation", function (a, b) {
				if (this.vars = b = b || {}, this._duration = this._totalDuration = a || 0, this._delay = Number(b.delay) || 0, this._timeScale = 1, this._active = b.immediateRender === !0, this.data = b.data, this._reversed = b.reversed === !0, X) {
					j || i.wake();
					var c = this.vars.useFrames ? W : X;
					c.add(this, c._time), this.vars.paused && this.paused(!0)
				}
			});
			i = D.ticker = new l.Ticker, h = D.prototype, h._dirty = h._gc = h._initted = h._paused = !1, h._totalTime = h._time = 0, h._rawPrevTime = -1, h._next = h._last = h._onUpdate = h._timeline = h.timeline = null, h._paused = !1;
			var E = function () {
				j && B() - C > 2e3 && ("hidden" !== d.visibilityState || !i.lagSmoothing()) && i.wake();
				var a = setTimeout(E, 2e3);
				a.unref && a.unref()
			};
			E(), h.play = function (a, b) {
				return null != a && this.seek(a, b), this.reversed(!1).paused(!1)
			}, h.pause = function (a, b) {
				return null != a && this.seek(a, b), this.paused(!0)
			}, h.resume = function (a, b) {
				return null != a && this.seek(a, b), this.paused(!1)
			}, h.seek = function (a, b) {
				return this.totalTime(Number(a), b !== !1)
			}, h.restart = function (a, b) {
				return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0)
			}, h.reverse = function (a, b) {
				return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1)
			}, h.render = function (a, b, c) {}, h.invalidate = function () {
				return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
			}, h.isActive = function () {
				var a, b = this._timeline,
					c = this._startTime;
				return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime(!0)) >= c && a < c + this.totalDuration() / this._timeScale - 1e-7
			}, h._enabled = function (a, b) {
				return j || i.wake(), this._gc = !a, this._active = this.isActive(), b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)), !1
			}, h._kill = function (a, b) {
				return this._enabled(!1, !1)
			}, h.kill = function (a, b) {
				return this._kill(a, b), this
			}, h._uncache = function (a) {
				for (var b = a ? this : this.timeline; b;) b._dirty = !0, b = b.timeline;
				return this
			}, h._swapSelfInParams = function (a) {
				for (var b = a.length, c = a.concat(); --b > -1;) "{self}" === a[b] && (c[b] = this);
				return c
			}, h._callback = function (a) {
				var b = this.vars,
					c = b[a],
					d = b[a + "Params"],
					e = b[a + "Scope"] || b.callbackScope || this,
					f = d ? d.length : 0;
				switch (f) {
					case 0:
						c.call(e);
						break;
					case 1:
						c.call(e, d[0]);
						break;
					case 2:
						c.call(e, d[0], d[1]);
						break;
					default:
						c.apply(e, d)
				}
			}, h.eventCallback = function (a, b, c, d) {
				if ("on" === (a || "").substr(0, 2)) {
					var e = this.vars;
					if (1 === arguments.length) return e[a];
					null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = p(c) && -1 !== c.join("").indexOf("{self}") ? this._swapSelfInParams(c) : c, e[a + "Scope"] = d), "onUpdate" === a && (this._onUpdate = b)
				}
				return this
			}, h.delay = function (a) {
				return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay), this._delay = a, this) : this._delay
			}, h.duration = function (a) {
				return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0), this) : (this._dirty = !1, this._duration)
			}, h.totalDuration = function (a) {
				return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration
			}, h.time = function (a, b) {
				return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ? this._duration : a, b)) : this._time
			}, h.totalTime = function (a, b, c) {
				if (j || i.wake(), !arguments.length) return this._totalTime;
				if (this._timeline) {
					if (0 > a && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming) {
						this._dirty && this.totalDuration();
						var d = this._totalDuration,
							e = this._timeline;
						if (a > d && !c && (a = d), this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? d - a : a) / this._timeScale, e._dirty || this._uncache(!1), e._timeline)
							for (; e._timeline;) e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0), e = e._timeline
					}
					this._gc && this._enabled(!0, !1), (this._totalTime !== a || 0 === this._duration) && (J.length && Z(), this.render(a, b, !1), J.length && Z())
				}
				return this
			}, h.progress = h.totalProgress = function (a, b) {
				var c = this.duration();
				return arguments.length ? this.totalTime(c * a, b) : c ? this._time / c : this.ratio
			}, h.startTime = function (a) {
				return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this._startTime
			}, h.endTime = function (a) {
				return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
			}, h.timeScale = function (a) {
				if (!arguments.length) return this._timeScale;
				var b, c;
				for (a = a || m, this._timeline && this._timeline.smoothChildTiming && (b = this._pauseTime, c = b || 0 === b ? b : this._timeline.totalTime(), this._startTime = c - (c - this._startTime) * this._timeScale / a), this._timeScale = a, c = this.timeline; c && c.timeline;) c._dirty = !0, c.totalDuration(), c = c.timeline;
				return this
			}, h.reversed = function (a) {
				return arguments.length ? (a != this._reversed && (this._reversed = a, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
			}, h.paused = function (a) {
				if (!arguments.length) return this._paused;
				var b, c, d = this._timeline;
				return a != this._paused && d && (j || a || i.wake(), b = d.rawTime(), c = b - this._pauseTime, !a && d.smoothChildTiming && (this._startTime += c, this._uncache(!1)), this._pauseTime = a ? b : null, this._paused = a, this._active = this.isActive(), !a && 0 !== c && this._initted && this.duration() && (b = d.smoothChildTiming ? this._totalTime : (b - this._startTime) / this._timeScale, this.render(b, b === this._totalTime, !0))), this._gc && !a && this._enabled(!0, !1), this
			};
			var F = t("core.SimpleTimeline", function (a) {
				D.call(this, 0, a), this.autoRemoveChildren = this.smoothChildTiming = !0
			});
			h = F.prototype = new D, h.constructor = F, h.kill()._gc = !1, h._first = h._last = h._recent = null, h._sortChildren = !1, h.add = h.insert = function (a, b, c, d) {
				var e, f;
				if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale), a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!0, !0), e = this._last, this._sortChildren)
					for (f = a._startTime; e && e._startTime > f;) e = e._prev;
				return e ? (a._next = e._next, e._next = a) : (a._next = this._first, this._first = a), a._next ? a._next._prev = a : this._last = a, a._prev = e, this._recent = a, this._timeline && this._uncache(!0), this
			}, h._remove = function (a, b) {
				return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
			}, h.render = function (a, b, c) {
				var d, e = this._first;
				for (this._totalTime = this._time = this._rawPrevTime = a; e;) d = e._next, (e._active || a >= e._startTime && !e._paused && !e._gc) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale, b, c)), e = d
			}, h.rawTime = function () {
				return j || i.wake(), this._totalTime
			};
			var G = t("TweenLite", function (b, c, d) {
					if (D.call(this, c, d), this.render = G.prototype.render, null == b) throw "Cannot tween a null target.";
					this.target = b = "string" != typeof b ? b : G.selector(b) || b;
					var e, f, g, h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType),
						i = this.vars.overwrite;
					if (this._overwrite = i = null == i ? V[G.defaultOverwrite] : "number" == typeof i ? i >> 0 : V[i], (h || b instanceof Array || b.push && p(b)) && "number" != typeof b[0])
						for (this._targets = g = n(b), this._propLookup = [], this._siblings = [], e = 0; e < g.length; e++) f = g[e], f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1), this._targets = g = g.concat(n(f))) : (this._siblings[e] = $(f, this, !1), 1 === i && this._siblings[e].length > 1 && aa(f, this, null, 1, this._siblings[e])) : (f = g[e--] = G.selector(f), "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1);
					else this._propLookup = {}, this._siblings = $(b, this, !1), 1 === i && this._siblings.length > 1 && aa(b, this, null, 1, this._siblings);
					(this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -m, this.render(Math.min(0, -this._delay)))
				}, !0),
				H = function (b) {
					return b && b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType)
				},
				I = function (a, b) {
					var c, d = {};
					for (c in a) U[c] || c in b && "transform" !== c && "x" !== c && "y" !== c && "width" !== c && "height" !== c && "className" !== c && "border" !== c || !(!R[c] || R[c] && R[c]._autoCSS) || (d[c] = a[c], delete a[c]);
					a.css = d
				};
			h = G.prototype = new D, h.constructor = G, h.kill()._gc = !1, h.ratio = 0, h._firstPT = h._targets = h._overwrittenProps = h._startAt = null, h._notifyPluginsOfEnabled = h._lazy = !1, G.version = "1.20.3", G.defaultEase = h._ease = new v(null, null, 1, 1), G.defaultOverwrite = "auto", G.ticker = i, G.autoSleep = 120, G.lagSmoothing = function (a, b) {
				i.lagSmoothing(a, b)
			}, G.selector = a.$ || a.jQuery || function (b) {
				var c = a.$ || a.jQuery;
				return c ? (G.selector = c, c(b)) : "undefined" == typeof d ? b : d.querySelectorAll ? d.querySelectorAll(b) : d.getElementById("#" === b.charAt(0) ? b.substr(1) : b)
			};
			var J = [],
				K = {},
				L = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
				M = /[\+-]=-?[\.\d]/,
				N = function (a) {
					for (var b, c = this._firstPT, d = 1e-6; c;) b = c.blob ? 1 === a && null != this.end ? this.end : a ? this.join("") : this.start : c.c * a + c.s, c.m ? b = c.m(b, this._target || c.t) : d > b && b > -d && !c.blob && (b = 0), c.f ? c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b) : c.t[c.p] = b, c = c._next
				},
				O = function (a, b, c, d) {
					var e, f, g, h, i, j, k, l = [],
						m = 0,
						n = "",
						o = 0;
					for (l.start = a, l.end = b, a = l[0] = a + "", b = l[1] = b + "", c && (c(l), a = l[0], b = l[1]), l.length = 0, e = a.match(L) || [], f = b.match(L) || [], d && (d._next = null, d.blob = 1, l._firstPT = l._applyPT = d), i = f.length, h = 0; i > h; h++) k = f[h], j = b.substr(m, b.indexOf(k, m) - m), n += j || !h ? j : ",", m += j.length, o ? o = (o + 1) % 5 : "rgba(" === j.substr(-5) && (o = 1), k === e[h] || e.length <= h ? n += k : (n && (l.push(n), n = ""), g = parseFloat(e[h]), l.push(g), l._firstPT = {
						_next: l._firstPT,
						t: l,
						p: l.length - 1,
						s: g,
						c: ("=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * parseFloat(k.substr(2)) : parseFloat(k) - g) || 0,
						f: 0,
						m: o && 4 > o ? Math.round : 0
					}), m += k.length;
					return n += b.substr(m), n && l.push(n), l.setRatio = N, M.test(b) && (l.end = null), l
				},
				P = function (a, b, c, d, e, f, g, h, i) {
					"function" == typeof d && (d = d(i || 0, a));
					var j, k = typeof a[b],
						l = "function" !== k ? "" : b.indexOf("set") || "function" != typeof a["get" + b.substr(3)] ? b : "get" + b.substr(3),
						m = "get" !== c ? c : l ? g ? a[l](g) : a[l]() : a[b],
						n = "string" == typeof d && "=" === d.charAt(1),
						o = {
							t: a,
							p: b,
							s: m,
							f: "function" === k,
							pg: 0,
							n: e || b,
							m: f ? "function" == typeof f ? f : Math.round : 0,
							pr: 0,
							c: n ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2)) : parseFloat(d) - m || 0
						};
					return ("number" != typeof m || "number" != typeof d && !n) && (g || isNaN(m) || !n && isNaN(d) || "boolean" == typeof m || "boolean" == typeof d ? (o.fp = g, j = O(m, n ? parseFloat(o.s) + o.c : d, h || G.defaultStringFilter, o), o = {
						t: j,
						p: "setRatio",
						s: 0,
						c: 1,
						f: 2,
						pg: 0,
						n: e || b,
						pr: 0,
						m: 0
					}) : (o.s = parseFloat(m), n || (o.c = parseFloat(d) - o.s || 0))), o.c ? ((o._next = this._firstPT) && (o._next._prev = o), this._firstPT = o, o) : void 0
				},
				Q = G._internals = {
					isArray: p,
					isSelector: H,
					lazyTweens: J,
					blobDif: O
				},
				R = G._plugins = {},
				S = Q.tweenLookup = {},
				T = 0,
				U = Q.reservedProps = {
					ease: 1,
					delay: 1,
					overwrite: 1,
					onComplete: 1,
					onCompleteParams: 1,
					onCompleteScope: 1,
					useFrames: 1,
					runBackwards: 1,
					startAt: 1,
					onUpdate: 1,
					onUpdateParams: 1,
					onUpdateScope: 1,
					onStart: 1,
					onStartParams: 1,
					onStartScope: 1,
					onReverseComplete: 1,
					onReverseCompleteParams: 1,
					onReverseCompleteScope: 1,
					onRepeat: 1,
					onRepeatParams: 1,
					onRepeatScope: 1,
					easeParams: 1,
					yoyo: 1,
					immediateRender: 1,
					repeat: 1,
					repeatDelay: 1,
					data: 1,
					paused: 1,
					reversed: 1,
					autoCSS: 1,
					lazy: 1,
					onOverwrite: 1,
					callbackScope: 1,
					stringFilter: 1,
					id: 1,
					yoyoEase: 1
				},
				V = {
					none: 0,
					all: 1,
					auto: 2,
					concurrent: 3,
					allOnStart: 4,
					preexisting: 5,
					"true": 1,
					"false": 0
				},
				W = D._rootFramesTimeline = new F,
				X = D._rootTimeline = new F,
				Y = 30,
				Z = Q.lazyRender = function () {
					var a, b = J.length;
					for (K = {}; --b > -1;) a = J[b], a && a._lazy !== !1 && (a.render(a._lazy[0], a._lazy[1], !0), a._lazy = !1);
					J.length = 0
				};
			X._startTime = i.time, W._startTime = i.frame, X._active = W._active = !0, setTimeout(Z, 1), D._updateRoot = G.render = function () {
				var a, b, c;
				if (J.length && Z(), X.render((i.time - X._startTime) * X._timeScale, !1, !1), W.render((i.frame - W._startTime) * W._timeScale, !1, !1), J.length && Z(), i.frame >= Y) {
					Y = i.frame + (parseInt(G.autoSleep, 10) || 120);
					for (c in S) {
						for (b = S[c].tweens, a = b.length; --a > -1;) b[a]._gc && b.splice(a, 1);
						0 === b.length && delete S[c]
					}
					if (c = X._first, (!c || c._paused) && G.autoSleep && !W._first && 1 === i._listeners.tick.length) {
						for (; c && c._paused;) c = c._next;
						c || i.sleep()
					}
				}
			}, i.addEventListener("tick", D._updateRoot);
			var $ = function (a, b, c) {
					var d, e, f = a._gsTweenID;
					if (S[f || (a._gsTweenID = f = "t" + T++)] || (S[f] = {
							target: a,
							tweens: []
						}), b && (d = S[f].tweens, d[e = d.length] = b, c))
						for (; --e > -1;) d[e] === b && d.splice(e, 1);
					return S[f].tweens
				},
				_ = function (a, b, c, d) {
					var e, f, g = a.vars.onOverwrite;
					return g && (e = g(a, b, c, d)), g = G.onOverwrite, g && (f = g(a, b, c, d)), e !== !1 && f !== !1
				},
				aa = function (a, b, c, d, e) {
					var f, g, h, i;
					if (1 === d || d >= 4) {
						for (i = e.length, f = 0; i > f; f++)
							if ((h = e[f]) !== b) h._gc || h._kill(null, a, b) && (g = !0);
							else if (5 === d) break;
						return g
					}
					var j, k = b._startTime + m,
						l = [],
						n = 0,
						o = 0 === b._duration;
					for (f = e.length; --f > -1;)(h = e[f]) === b || h._gc || h._paused || (h._timeline !== b._timeline ? (j = j || ba(b, 0, o), 0 === ba(h, j, o) && (l[n++] = h)) : h._startTime <= k && h._startTime + h.totalDuration() / h._timeScale > k && ((o || !h._initted) && k - h._startTime <= 2e-10 || (l[n++] = h)));
					for (f = n; --f > -1;)
						if (h = l[f], 2 === d && h._kill(c, a, b) && (g = !0), 2 !== d || !h._firstPT && h._initted) {
							if (2 !== d && !_(h, b)) continue;
							h._enabled(!1, !1) && (g = !0)
						}
					return g
				},
				ba = function (a, b, c) {
					for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) {
						if (f += d._startTime, e *= d._timeScale, d._paused) return -100;
						d = d._timeline
					}
					return f /= e, f > b ? f - b : c && f === b || !a._initted && 2 * m > f - b ? m : (f += a.totalDuration() / a._timeScale / e) > b + m ? 0 : f - b - m
				};
			h._init = function () {
				var a, b, c, d, e, f, g = this.vars,
					h = this._overwrittenProps,
					i = this._duration,
					j = !!g.immediateRender,
					k = g.ease;
				if (g.startAt) {
					this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), e = {};
					for (d in g.startAt) e[d] = g.startAt[d];
					if (e.data = "isStart", e.overwrite = !1, e.immediateRender = !0, e.lazy = j && g.lazy !== !1, e.startAt = e.delay = null, e.onUpdate = g.onUpdate, e.onUpdateParams = g.onUpdateParams, e.onUpdateScope = g.onUpdateScope || g.callbackScope || this, this._startAt = G.to(this.target, 0, e), j)
						if (this._time > 0) this._startAt = null;
						else if (0 !== i) return
				} else if (g.runBackwards && 0 !== i)
					if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
					else {
						0 !== this._time && (j = !1), c = {};
						for (d in g) U[d] && "autoCSS" !== d || (c[d] = g[d]);
						if (c.overwrite = 0, c.data = "isFromStart", c.lazy = j && g.lazy !== !1, c.immediateRender = j, this._startAt = G.to(this.target, 0, c), j) {
							if (0 === this._time) return
						} else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
					}
				if (this._ease = k = k ? k instanceof v ? k : "function" == typeof k ? new v(k, g.easeParams) : w[k] || G.defaultEase : G.defaultEase, g.easeParams instanceof Array && k.config && (this._ease = k.config.apply(k, g.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
					for (f = this._targets.length, a = 0; f > a; a++) this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], h ? h[a] : null, a) && (b = !0);
				else b = this._initProps(this.target, this._propLookup, this._siblings, h, 0);
				if (b && G._onPluginEvent("_onInitAllProps", this), h && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), g.runBackwards)
					for (c = this._firstPT; c;) c.s += c.c, c.c = -c.c, c = c._next;
				this._onUpdate = g.onUpdate, this._initted = !0
			}, h._initProps = function (b, c, d, e, f) {
				var g, h, i, j, k, l;
				if (null == b) return !1;
				K[b._gsTweenID] && Z(), this.vars.css || b.style && b !== a && b.nodeType && R.css && this.vars.autoCSS !== !1 && I(this.vars, b);
				for (g in this.vars)
					if (l = this.vars[g], U[g]) l && (l instanceof Array || l.push && p(l)) && -1 !== l.join("").indexOf("{self}") && (this.vars[g] = l = this._swapSelfInParams(l, this));
					else if (R[g] && (j = new R[g])._onInitTween(b, this.vars[g], this, f)) {
					for (this._firstPT = k = {
							_next: this._firstPT,
							t: j,
							p: "setRatio",
							s: 0,
							c: 1,
							f: 1,
							n: g,
							pg: 1,
							pr: j._priority,
							m: 0
						}, h = j._overwriteProps.length; --h > -1;) c[j._overwriteProps[h]] = this._firstPT;
					(j._priority || j._onInitAllProps) && (i = !0), (j._onDisable || j._onEnable) && (this._notifyPluginsOfEnabled = !0), k._next && (k._next._prev = k)
				} else c[g] = P.call(this, b, g, "get", l, g, 0, null, this.vars.stringFilter, f);
				return e && this._kill(e, b) ? this._initProps(b, c, d, e, f) : this._overwrite > 1 && this._firstPT && d.length > 1 && aa(b, this, c, this._overwrite, d) ? (this._kill(c, b), this._initProps(b, c, d, e, f)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (K[b._gsTweenID] = !0), i)
			}, h.render = function (a, b, c) {
				var d, e, f, g, h = this._time,
					i = this._duration,
					j = this._rawPrevTime;
				if (a >= i - 1e-7 && a >= 0) this._totalTime = this._time = i, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (d = !0, e = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === i && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 > j || 0 >= a && a >= -1e-7 || j === m && "isPause" !== this.data) && j !== a && (c = !0, j > m && (e = "onReverseComplete")), this._rawPrevTime = g = !b || a || j === a ? a : m);
				else if (1e-7 > a) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== h || 0 === i && j > 0) && (e = "onReverseComplete", d = this._reversed), 0 > a && (this._active = !1, 0 === i && (this._initted || !this.vars.lazy || c) && (j >= 0 && (j !== m || "isPause" !== this.data) && (c = !0), this._rawPrevTime = g = !b || a || j === a ? a : m)), (!this._initted || this._startAt && this._startAt.progress()) && (c = !0);
				else if (this._totalTime = this._time = a, this._easeType) {
					var k = a / i,
						l = this._easeType,
						n = this._easePower;
					(1 === l || 3 === l && k >= .5) && (k = 1 - k), 3 === l && (k *= 2), 1 === n ? k *= k : 2 === n ? k *= k * k : 3 === n ? k *= k * k * k : 4 === n && (k *= k * k * k * k), 1 === l ? this.ratio = 1 - k : 2 === l ? this.ratio = k : .5 > a / i ? this.ratio = k / 2 : this.ratio = 1 - k / 2
				} else this.ratio = this._ease.getRatio(a / i);
				if (this._time !== h || c) {
					if (!this._initted) {
						if (this._init(), !this._initted || this._gc) return;
						if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = h, this._rawPrevTime = j, J.push(this), void(this._lazy = [a, b]);
						this._time && !d ? this.ratio = this._ease.getRatio(this._time / i) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
					}
					for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== h && a >= 0 && (this._active = !0), 0 === h && (this._startAt && (a >= 0 ? this._startAt.render(a, !0, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === i) && (b || this._callback("onStart"))), f = this._firstPT; f;) f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
					this._onUpdate && (0 > a && this._startAt && a !== -1e-4 && this._startAt.render(a, !0, c), b || (this._time !== h || d || c) && this._callback("onUpdate")), e && (!this._gc || c) && (0 > a && this._startAt && !this._onUpdate && a !== -1e-4 && this._startAt.render(a, !0, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this._callback(e), 0 === i && this._rawPrevTime === m && g !== m && (this._rawPrevTime = 0))
				}
			}, h._kill = function (a, b, c) {
				if ("all" === a && (a = null), null == a && (null == b || b === this.target)) return this._lazy = !1, this._enabled(!1, !1);
				b = "string" != typeof b ? b || this._targets || this.target : G.selector(b) || b;
				var d, e, f, g, h, i, j, k, l, m = c && this._time && c._startTime === this._startTime && this._timeline === c._timeline;
				if ((p(b) || H(b)) && "number" != typeof b[0])
					for (d = b.length; --d > -1;) this._kill(a, b[d], c) && (i = !0);
				else {
					if (this._targets) {
						for (d = this._targets.length; --d > -1;)
							if (b === this._targets[d]) {
								h = this._propLookup[d] || {}, this._overwrittenProps = this._overwrittenProps || [], e = this._overwrittenProps[d] = a ? this._overwrittenProps[d] || {} : "all";
								break
							}
					} else {
						if (b !== this.target) return !1;
						h = this._propLookup, e = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
					}
					if (h) {
						if (j = a || h, k = a !== e && "all" !== e && a !== h && ("object" != typeof a || !a._tempKill), c && (G.onOverwrite || this.vars.onOverwrite)) {
							for (f in j) h[f] && (l || (l = []), l.push(f));
							if ((l || !a) && !_(this, c, b, l)) return !1
						}
						for (f in j)(g = h[f]) && (m && (g.f ? g.t[g.p](g.s) : g.t[g.p] = g.s, i = !0), g.pg && g.t._kill(j) && (i = !0), g.pg && 0 !== g.t._overwriteProps.length || (g._prev ? g._prev._next = g._next : g === this._firstPT && (this._firstPT = g._next), g._next && (g._next._prev = g._prev), g._next = g._prev = null), delete h[f]), k && (e[f] = 1);
						!this._firstPT && this._initted && this._enabled(!1, !1)
					}
				}
				return i
			}, h.invalidate = function () {
				return this._notifyPluginsOfEnabled && G._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], D.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -m, this.render(Math.min(0, -this._delay))), this
			}, h._enabled = function (a, b) {
				if (j || i.wake(), a && this._gc) {
					var c, d = this._targets;
					if (d)
						for (c = d.length; --c > -1;) this._siblings[c] = $(d[c], this, !0);
					else this._siblings = $(this.target, this, !0)
				}
				return D.prototype._enabled.call(this, a, b), this._notifyPluginsOfEnabled && this._firstPT ? G._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1
			}, G.to = function (a, b, c) {
				return new G(a, b, c)
			}, G.from = function (a, b, c) {
				return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new G(a, b, c)
			}, G.fromTo = function (a, b, c, d) {
				return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new G(a, b, d)
			}, G.delayedCall = function (a, b, c, d, e) {
				return new G(b, 0, {
					delay: a,
					onComplete: b,
					onCompleteParams: c,
					callbackScope: d,
					onReverseComplete: b,
					onReverseCompleteParams: c,
					immediateRender: !1,
					lazy: !1,
					useFrames: e,
					overwrite: 0
				})
			}, G.set = function (a, b) {
				return new G(a, 0, b)
			}, G.getTweensOf = function (a, b) {
				if (null == a) return [];
				a = "string" != typeof a ? a : G.selector(a) || a;
				var c, d, e, f;
				if ((p(a) || H(a)) && "number" != typeof a[0]) {
					for (c = a.length, d = []; --c > -1;) d = d.concat(G.getTweensOf(a[c], b));
					for (c = d.length; --c > -1;)
						for (f = d[c], e = c; --e > -1;) f === d[e] && d.splice(c, 1)
				} else if (a._gsTweenID)
					for (d = $(a).concat(), c = d.length; --c > -1;)(d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1);
				return d || []
			}, G.killTweensOf = G.killDelayedCallsTo = function (a, b, c) {
				"object" == typeof b && (c = b, b = !1);
				for (var d = G.getTweensOf(a, b), e = d.length; --e > -1;) d[e]._kill(c, a)
			};
			var ca = t("plugins.TweenPlugin", function (a, b) {
				this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[0], this._priority = b || 0, this._super = ca.prototype
			}, !0);
			if (h = ca.prototype, ca.version = "1.19.0", ca.API = 2, h._firstPT = null, h._addTween = P, h.setRatio = N, h._kill = function (a) {
					var b, c = this._overwriteProps,
						d = this._firstPT;
					if (null != a[this._propName]) this._overwriteProps = [];
					else
						for (b = c.length; --b > -1;) null != a[c[b]] && c.splice(b, 1);
					for (; d;) null != a[d.n] && (d._next && (d._next._prev = d._prev), d._prev ? (d._prev._next = d._next, d._prev = null) : this._firstPT === d && (this._firstPT = d._next)), d = d._next;
					return !1
				}, h._mod = h._roundProps = function (a) {
					for (var b, c = this._firstPT; c;) b = a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")], b && "function" == typeof b && (2 === c.f ? c.t._applyPT.m = b : c.m = b), c = c._next
				}, G._onPluginEvent = function (a, b) {
					var c, d, e, f, g, h = b._firstPT;
					if ("_onInitAllProps" === a) {
						for (; h;) {
							for (g = h._next, d = e; d && d.pr > h.pr;) d = d._next;
							(h._prev = d ? d._prev : f) ? h._prev._next = h: e = h, (h._next = d) ? d._prev = h : f = h, h = g
						}
						h = b._firstPT = e
					}
					for (; h;) h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0), h = h._next;
					return c
				}, ca.activate = function (a) {
					for (var b = a.length; --b > -1;) a[b].API === ca.API && (R[(new a[b])._propName] = a[b]);
					return !0
				}, s.plugin = function (a) {
					if (!(a && a.propName && a.init && a.API)) throw "illegal plugin definition.";
					var b, c = a.propName,
						d = a.priority || 0,
						e = a.overwriteProps,
						f = {
							init: "_onInitTween",
							set: "setRatio",
							kill: "_kill",
							round: "_mod",
							mod: "_mod",
							initAll: "_onInitAllProps"
						},
						g = t("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function () {
							ca.call(this, c, d), this._overwriteProps = e || []
						}, a.global === !0),
						h = g.prototype = new ca(c);
					h.constructor = g, g.API = a.API;
					for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]);
					return g.version = a.version, ca.activate([g]), g
				}, f = a._gsQueue) {
				for (g = 0; g < f.length; g++) f[g]();
				for (h in q) q[h].func || a.console.log("GSAP encountered missing dependency: " + h)
			}
			j = !1
		}
	}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");

/*! ScrollMagic v2.0.5 | (c) 2015 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */

/* scrollmagic.js */
! function (e, t) {
	"function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.ScrollMagic = t()
}(this, function () {
	"use strict";
	var e = function () {};
	e.version = "2.0.5", window.addEventListener("mousewheel", function () {});
	var t = "data-scrollmagic-pin-spacer";
	e.Controller = function (r) {
		var o, s, a = "ScrollMagic.Controller",
			l = "FORWARD",
			c = "REVERSE",
			u = "PAUSED",
			f = n.defaults,
			d = this,
			h = i.extend({}, f, r),
			g = [],
			p = !1,
			v = 0,
			m = u,
			w = !0,
			y = 0,
			S = !0,
			b = function () {
				for (var e in h) f.hasOwnProperty(e) || delete h[e];
				if (h.container = i.get.elements(h.container)[0], !h.container) throw a + " init failed.";
				w = h.container === window || h.container === document.body || !document.body.contains(h.container), w && (h.container = window), y = z(), h.container.addEventListener("resize", T), h.container.addEventListener("scroll", T), h.refreshInterval = parseInt(h.refreshInterval) || f.refreshInterval, E()
			},
			E = function () {
				h.refreshInterval > 0 && (s = window.setTimeout(A, h.refreshInterval))
			},
			x = function () {
				return h.vertical ? i.get.scrollTop(h.container) : i.get.scrollLeft(h.container)
			},
			z = function () {
				return h.vertical ? i.get.height(h.container) : i.get.width(h.container)
			},
			C = this._setScrollPos = function (e) {
				h.vertical ? w ? window.scrollTo(i.get.scrollLeft(), e) : h.container.scrollTop = e : w ? window.scrollTo(e, i.get.scrollTop()) : h.container.scrollLeft = e
			},
			F = function () {
				if (S && p) {
					var e = i.type.Array(p) ? p : g.slice(0);
					p = !1;
					var t = v;
					v = d.scrollPos();
					var n = v - t;
					0 !== n && (m = n > 0 ? l : c), m === c && e.reverse(), e.forEach(function (e) {
						e.update(!0)
					})
				}
			},
			L = function () {
				o = i.rAF(F)
			},
			T = function (e) {
				"resize" == e.type && (y = z(), m = u), p !== !0 && (p = !0, L())
			},
			A = function () {
				if (!w && y != z()) {
					var e;
					try {
						e = new Event("resize", {
							bubbles: !1,
							cancelable: !1
						})
					} catch (t) {
						e = document.createEvent("Event"), e.initEvent("resize", !1, !1)
					}
					h.container.dispatchEvent(e)
				}
				g.forEach(function (e) {
					e.refresh()
				}), E()
			};
		this._options = h;
		var O = function (e) {
			if (e.length <= 1) return e;
			var t = e.slice(0);
			return t.sort(function (e, t) {
				return e.scrollOffset() > t.scrollOffset() ? 1 : -1
			}), t
		};
		return this.addScene = function (t) {
			if (i.type.Array(t)) t.forEach(function (e) {
				d.addScene(e)
			});
			else if (t instanceof e.Scene)
				if (t.controller() !== d) t.addTo(d);
				else if (g.indexOf(t) < 0) {
				g.push(t), g = O(g), t.on("shift.controller_sort", function () {
					g = O(g)
				});
				for (var n in h.globalSceneOptions) t[n] && t[n].call(t, h.globalSceneOptions[n])
			}
			return d
		}, this.removeScene = function (e) {
			if (i.type.Array(e)) e.forEach(function (e) {
				d.removeScene(e)
			});
			else {
				var t = g.indexOf(e);
				t > -1 && (e.off("shift.controller_sort"), g.splice(t, 1), e.remove())
			}
			return d
		}, this.updateScene = function (t, n) {
			return i.type.Array(t) ? t.forEach(function (e) {
				d.updateScene(e, n)
			}) : n ? t.update(!0) : p !== !0 && t instanceof e.Scene && (p = p || [], -1 == p.indexOf(t) && p.push(t), p = O(p), L()), d
		}, this.update = function (e) {
			return T({
				type: "resize"
			}), e && F(), d
		}, this.scrollTo = function (n, r) {
			if (i.type.Number(n)) C.call(h.container, n, r);
			else if (n instanceof e.Scene) n.controller() === d && d.scrollTo(n.scrollOffset(), r);
			else if (i.type.Function(n)) C = n;
			else {
				var o = i.get.elements(n)[0];
				if (o) {
					for (; o.parentNode.hasAttribute(t);) o = o.parentNode;
					var s = h.vertical ? "top" : "left",
						a = i.get.offset(h.container),
						l = i.get.offset(o);
					w || (a[s] -= d.scrollPos()), d.scrollTo(l[s] - a[s], r)
				}
			}
			return d
		}, this.scrollPos = function (e) {
			return arguments.length ? (i.type.Function(e) && (x = e), d) : x.call(d)
		}, this.info = function (e) {
			var t = {
				size: y,
				vertical: h.vertical,
				scrollPos: v,
				scrollDirection: m,
				container: h.container,
				isDocument: w
			};
			return arguments.length ? void 0 !== t[e] ? t[e] : void 0 : t
		}, this.loglevel = function () {
			return d
		}, this.enabled = function (e) {
			return arguments.length ? (S != e && (S = !!e, d.updateScene(g, !0)), d) : S
		}, this.destroy = function (e) {
			window.clearTimeout(s);
			for (var t = g.length; t--;) g[t].destroy(e);
			return h.container.removeEventListener("resize", T), h.container.removeEventListener("scroll", T), i.cAF(o), null
		}, b(), d
	};
	var n = {
		defaults: {
			container: window,
			vertical: !0,
			globalSceneOptions: {},
			loglevel: 2,
			refreshInterval: 100
		}
	};
	e.Controller.addOption = function (e, t) {
		n.defaults[e] = t
	}, e.Controller.extend = function (t) {
		var n = this;
		e.Controller = function () {
			return n.apply(this, arguments), this.$super = i.extend({}, this), t.apply(this, arguments) || this
		}, i.extend(e.Controller, n), e.Controller.prototype = n.prototype, e.Controller.prototype.constructor = e.Controller
	}, e.Scene = function (n) {
		var o, s, a = "BEFORE",
			l = "DURING",
			c = "AFTER",
			u = r.defaults,
			f = this,
			d = i.extend({}, u, n),
			h = a,
			g = 0,
			p = {
				start: 0,
				end: 0
			},
			v = 0,
			m = !0,
			w = function () {
				for (var e in d) u.hasOwnProperty(e) || delete d[e];
				for (var t in u) L(t);
				C()
			},
			y = {};
		this.on = function (e, t) {
			return i.type.Function(t) && (e = e.trim().split(" "), e.forEach(function (e) {
				var n = e.split("."),
					r = n[0],
					i = n[1];
				"*" != r && (y[r] || (y[r] = []), y[r].push({
					namespace: i || "",
					callback: t
				}))
			})), f
		}, this.off = function (e, t) {
			return e ? (e = e.trim().split(" "), e.forEach(function (e) {
				var n = e.split("."),
					r = n[0],
					i = n[1] || "",
					o = "*" === r ? Object.keys(y) : [r];
				o.forEach(function (e) {
					for (var n = y[e] || [], r = n.length; r--;) {
						var o = n[r];
						!o || i !== o.namespace && "*" !== i || t && t != o.callback || n.splice(r, 1)
					}
					n.length || delete y[e]
				})
			}), f) : f
		}, this.trigger = function (t, n) {
			if (t) {
				var r = t.trim().split("."),
					i = r[0],
					o = r[1],
					s = y[i];
				s && s.forEach(function (t) {
					o && o !== t.namespace || t.callback.call(f, new e.Event(i, t.namespace, f, n))
				})
			}
			return f
		}, f.on("change.internal", function (e) {
			"loglevel" !== e.what && "tweenChanges" !== e.what && ("triggerElement" === e.what ? E() : "reverse" === e.what && f.update())
		}).on("shift.internal", function () {
			S(), f.update()
		}), this.addTo = function (t) {
			return t instanceof e.Controller && s != t && (s && s.removeScene(f), s = t, C(), b(!0), E(!0), S(), s.info("container").addEventListener("resize", x), t.addScene(f), f.trigger("add", {
				controller: s
			}), f.update()), f
		}, this.enabled = function (e) {
			return arguments.length ? (m != e && (m = !!e, f.update(!0)), f) : m
		}, this.remove = function () {
			if (s) {
				s.info("container").removeEventListener("resize", x);
				var e = s;
				s = void 0, e.removeScene(f), f.trigger("remove")
			}
			return f
		}, this.destroy = function (e) {
			return f.trigger("destroy", {
				reset: e
			}), f.remove(), f.off("*.*"), null
		}, this.update = function (e) {
			if (s)
				if (e)
					if (s.enabled() && m) {
						var t, n = s.info("scrollPos");
						t = d.duration > 0 ? (n - p.start) / (p.end - p.start) : n >= p.start ? 1 : 0, f.trigger("update", {
							startPos: p.start,
							endPos: p.end,
							scrollPos: n
						}), f.progress(t)
					} else T && h === l && O(!0);
			else s.updateScene(f, !1);
			return f
		}, this.refresh = function () {
			return b(), E(), f
		}, this.progress = function (e) {
			if (arguments.length) {
				var t = !1,
					n = h,
					r = s ? s.info("scrollDirection") : "PAUSED",
					i = d.reverse || e >= g;
				if (0 === d.duration ? (t = g != e, g = 1 > e && i ? 0 : 1, h = 0 === g ? a : l) : 0 > e && h !== a && i ? (g = 0, h = a, t = !0) : e >= 0 && 1 > e && i ? (g = e, h = l, t = !0) : e >= 1 && h !== c ? (g = 1, h = c, t = !0) : h !== l || i || O(), t) {
					var o = {
							progress: g,
							state: h,
							scrollDirection: r
						},
						u = h != n,
						p = function (e) {
							f.trigger(e, o)
						};
					u && n !== l && (p("enter"), p(n === a ? "start" : "end")), p("progress"), u && h !== l && (p(h === a ? "start" : "end"), p("leave"))
				}
				return f
			}
			return g
		};
		var S = function () {
				p = {
					start: v + d.offset
				}, s && d.triggerElement && (p.start -= s.info("size") * d.triggerHook), p.end = p.start + d.duration
			},
			b = function (e) {
				if (o) {
					var t = "duration";
					F(t, o.call(f)) && !e && (f.trigger("change", {
						what: t,
						newval: d[t]
					}), f.trigger("shift", {
						reason: t
					}))
				}
			},
			E = function (e) {
				var n = 0,
					r = d.triggerElement;
				if (s && r) {
					for (var o = s.info(), a = i.get.offset(o.container), l = o.vertical ? "top" : "left"; r.parentNode.hasAttribute(t);) r = r.parentNode;
					var c = i.get.offset(r);
					o.isDocument || (a[l] -= s.scrollPos()), n = c[l] - a[l]
				}
				var u = n != v;
				v = n, u && !e && f.trigger("shift", {
					reason: "triggerElementPosition"
				})
			},
			x = function () {
				d.triggerHook > 0 && f.trigger("shift", {
					reason: "containerResize"
				})
			},
			z = i.extend(r.validate, {
				duration: function (e) {
					if (i.type.String(e) && e.match(/^(\.|\d)*\d+%$/)) {
						var t = parseFloat(e) / 100;
						e = function () {
							return s ? s.info("size") * t : 0
						}
					}
					if (i.type.Function(e)) {
						o = e;
						try {
							e = parseFloat(o())
						} catch (t) {
							e = -1
						}
					}
					if (e = parseFloat(e), !i.type.Number(e) || 0 > e) throw o ? (o = void 0, 0) : 0;
					return e
				}
			}),
			C = function (e) {
				e = arguments.length ? [e] : Object.keys(z), e.forEach(function (e) {
					var t;
					if (z[e]) try {
						t = z[e](d[e])
					} catch (n) {
						t = u[e]
					} finally {
						d[e] = t
					}
				})
			},
			F = function (e, t) {
				var n = !1,
					r = d[e];
				return d[e] != t && (d[e] = t, C(e), n = r != d[e]), n
			},
			L = function (e) {
				f[e] || (f[e] = function (t) {
					return arguments.length ? ("duration" === e && (o = void 0), F(e, t) && (f.trigger("change", {
						what: e,
						newval: d[e]
					}), r.shifts.indexOf(e) > -1 && f.trigger("shift", {
						reason: e
					})), f) : d[e]
				})
			};
		this.controller = function () {
			return s
		}, this.state = function () {
			return h
		}, this.scrollOffset = function () {
			return p.start
		}, this.triggerPosition = function () {
			var e = d.offset;
			return s && (e += d.triggerElement ? v : s.info("size") * f.triggerHook()), e
		};
		var T, A;
		f.on("shift.internal", function (e) {
			var t = "duration" === e.reason;
			(h === c && t || h === l && 0 === d.duration) && O(), t && _()
		}).on("progress.internal", function () {
			O()
		}).on("add.internal", function () {
			_()
		}).on("destroy.internal", function (e) {
			f.removePin(e.reset)
		});
		var O = function (e) {
				if (T && s) {
					var t = s.info(),
						n = A.spacer.firstChild;
					if (e || h !== l) {
						var r = {
								position: A.inFlow ? "relative" : "absolute",
								top: 0,
								left: 0
							},
							o = i.css(n, "position") != r.position;
						A.pushFollowers ? d.duration > 0 && (h === c && 0 === parseFloat(i.css(A.spacer, "padding-top")) ? o = !0 : h === a && 0 === parseFloat(i.css(A.spacer, "padding-bottom")) && (o = !0)) : r[t.vertical ? "top" : "left"] = d.duration * g, i.css(n, r), o && _()
					} else {
						"fixed" != i.css(n, "position") && (i.css(n, {
							position: "fixed"
						}), _());
						var u = i.get.offset(A.spacer, !0),
							f = d.reverse || 0 === d.duration ? t.scrollPos - p.start : Math.round(g * d.duration * 10) / 10;
						u[t.vertical ? "top" : "left"] += f, i.css(A.spacer.firstChild, {
							top: u.top,
							left: u.left
						})
					}
				}
			},
			_ = function () {
				if (T && s && A.inFlow) {
					var e = h === l,
						t = s.info("vertical"),
						n = A.spacer.firstChild,
						r = i.isMarginCollapseType(i.css(A.spacer, "display")),
						o = {};
					A.relSize.width || A.relSize.autoFullWidth ? e ? i.css(T, {
						width: i.get.width(A.spacer)
					}) : i.css(T, {
						width: "100%"
					}) : (o["min-width"] = i.get.width(t ? T : n, !0, !0), o.width = e ? o["min-width"] : "auto"), A.relSize.height ? e ? i.css(T, {
						height: i.get.height(A.spacer) - (A.pushFollowers ? d.duration : 0)
					}) : i.css(T, {
						height: "100%"
					}) : (o["min-height"] = i.get.height(t ? n : T, !0, !r), o.height = e ? o["min-height"] : "auto"), A.pushFollowers && (o["padding" + (t ? "Top" : "Left")] = d.duration * g, o["padding" + (t ? "Bottom" : "Right")] = d.duration * (1 - g)), i.css(A.spacer, o)
				}
			},
			N = function () {
				s && T && h === l && !s.info("isDocument") && O()
			},
			P = function () {
				s && T && h === l && ((A.relSize.width || A.relSize.autoFullWidth) && i.get.width(window) != i.get.width(A.spacer.parentNode) || A.relSize.height && i.get.height(window) != i.get.height(A.spacer.parentNode)) && _()
			},
			D = function (e) {
				s && T && h === l && !s.info("isDocument") && (e.preventDefault(), s._setScrollPos(s.info("scrollPos") - ((e.wheelDelta || e[s.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || 30 * -e.detail)))
			};
		this.setPin = function (e, n) {
			var r = {
				pushFollowers: !0,
				spacerClass: "scrollmagic-pin-spacer"
			};
			if (n = i.extend({}, r, n), e = i.get.elements(e)[0], !e) return f;
			if ("fixed" === i.css(e, "position")) return f;
			if (T) {
				if (T === e) return f;
				f.removePin()
			}
			T = e;
			var o = T.parentNode.style.display,
				s = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
			T.parentNode.style.display = "none";
			var a = "absolute" != i.css(T, "position"),
				l = i.css(T, s.concat(["display"])),
				c = i.css(T, ["width", "height"]);
			T.parentNode.style.display = o, !a && n.pushFollowers && (n.pushFollowers = !1);
			var u = T.parentNode.insertBefore(document.createElement("div"), T),
				d = i.extend(l, {
					position: a ? "relative" : "absolute",
					boxSizing: "content-box",
					mozBoxSizing: "content-box",
					webkitBoxSizing: "content-box"
				});
			if (a || i.extend(d, i.css(T, ["width", "height"])), i.css(u, d), u.setAttribute(t, ""), i.addClass(u, n.spacerClass), A = {
					spacer: u,
					relSize: {
						width: "%" === c.width.slice(-1),
						height: "%" === c.height.slice(-1),
						autoFullWidth: "auto" === c.width && a && i.isMarginCollapseType(l.display)
					},
					pushFollowers: n.pushFollowers,
					inFlow: a
				}, !T.___origStyle) {
				T.___origStyle = {};
				var h = T.style,
					g = s.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);
				g.forEach(function (e) {
					T.___origStyle[e] = h[e] || ""
				})
			}
			return A.relSize.width && i.css(u, {
				width: c.width
			}), A.relSize.height && i.css(u, {
				height: c.height
			}), u.appendChild(T), i.css(T, {
				position: a ? "relative" : "absolute",
				margin: "auto",
				top: "auto",
				left: "auto",
				bottom: "auto",
				right: "auto"
			}), (A.relSize.width || A.relSize.autoFullWidth) && i.css(T, {
				boxSizing: "border-box",
				mozBoxSizing: "border-box",
				webkitBoxSizing: "border-box"
			}), window.addEventListener("scroll", N), window.addEventListener("resize", N), window.addEventListener("resize", P), T.addEventListener("mousewheel", D), T.addEventListener("DOMMouseScroll", D), O(), f
		}, this.removePin = function (e) {
			if (T) {
				if (h === l && O(!0), e || !s) {
					var n = A.spacer.firstChild;
					if (n.hasAttribute(t)) {
						var r = A.spacer.style,
							o = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
						margins = {}, o.forEach(function (e) {
							margins[e] = r[e] || ""
						}), i.css(n, margins)
					}
					A.spacer.parentNode.insertBefore(n, A.spacer), A.spacer.parentNode.removeChild(A.spacer), T.parentNode.hasAttribute(t) || (i.css(T, T.___origStyle), delete T.___origStyle)
				}
				window.removeEventListener("scroll", N), window.removeEventListener("resize", N), window.removeEventListener("resize", P), T.removeEventListener("mousewheel", D), T.removeEventListener("DOMMouseScroll", D), T = void 0
			}
			return f
		};
		var R, k = [];
		return f.on("destroy.internal", function (e) {
			f.removeClassToggle(e.reset)
		}), this.setClassToggle = function (e, t) {
			var n = i.get.elements(e);
			return 0 !== n.length && i.type.String(t) ? (k.length > 0 && f.removeClassToggle(), R = t, k = n, f.on("enter.internal_class leave.internal_class", function (e) {
				var t = "enter" === e.type ? i.addClass : i.removeClass;
				k.forEach(function (e) {
					t(e, R)
				})
			}), f) : f
		}, this.removeClassToggle = function (e) {
			return e && k.forEach(function (e) {
				i.removeClass(e, R)
			}), f.off("start.internal_class end.internal_class"), R = void 0, k = [], f
		}, w(), f
	};
	var r = {
		defaults: {
			duration: 0,
			offset: 0,
			triggerElement: void 0,
			triggerHook: .5,
			reverse: !0,
			loglevel: 2
		},
		validate: {
			offset: function (e) {
				if (e = parseFloat(e), !i.type.Number(e)) throw 0;
				return e
			},
			triggerElement: function (e) {
				if (e = e || void 0) {
					var t = i.get.elements(e)[0];
					if (!t) throw 0;
					e = t
				}
				return e
			},
			triggerHook: function (e) {
				var t = {
					onCenter: .5,
					onEnter: 1,
					onLeave: 0
				};
				if (i.type.Number(e)) e = Math.max(0, Math.min(parseFloat(e), 1));
				else {
					if (!(e in t)) throw 0;
					e = t[e]
				}
				return e
			},
			reverse: function (e) {
				return !!e
			}
		},
		shifts: ["duration", "offset", "triggerHook"]
	};
	e.Scene.addOption = function (e, t, n, i) {
		e in r.defaults || (r.defaults[e] = t, r.validate[e] = n, i && r.shifts.push(e))
	}, e.Scene.extend = function (t) {
		var n = this;
		e.Scene = function () {
			return n.apply(this, arguments), this.$super = i.extend({}, this), t.apply(this, arguments) || this
		}, i.extend(e.Scene, n), e.Scene.prototype = n.prototype, e.Scene.prototype.constructor = e.Scene
	}, e.Event = function (e, t, n, r) {
		r = r || {};
		for (var i in r) this[i] = r[i];
		return this.type = e, this.target = this.currentTarget = n, this.namespace = t || "", this.timeStamp = this.timestamp = Date.now(), this
	};
	var i = e._util = function (e) {
		var t, n = {},
			r = function (e) {
				return parseFloat(e) || 0
			},
			i = function (t) {
				return t.currentStyle ? t.currentStyle : e.getComputedStyle(t)
			},
			o = function (t, n, o, s) {
				if (n = n === document ? e : n, n === e) s = !1;
				else if (!f.DomElement(n)) return 0;
				t = t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
				var a = (o ? n["offset" + t] || n["outer" + t] : n["client" + t] || n["inner" + t]) || 0;
				if (o && s) {
					var l = i(n);
					a += "Height" === t ? r(l.marginTop) + r(l.marginBottom) : r(l.marginLeft) + r(l.marginRight)
				}
				return a
			},
			s = function (e) {
				return e.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g, function (e) {
					return e[1].toUpperCase()
				})
			};
		n.extend = function (e) {
			for (e = e || {}, t = 1; t < arguments.length; t++)
				if (arguments[t])
					for (var n in arguments[t]) arguments[t].hasOwnProperty(n) && (e[n] = arguments[t][n]);
			return e
		}, n.isMarginCollapseType = function (e) {
			return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e) > -1
		};
		var a = 0,
			l = ["ms", "moz", "webkit", "o"],
			c = e.requestAnimationFrame,
			u = e.cancelAnimationFrame;
		for (t = 0; !c && t < l.length; ++t) c = e[l[t] + "RequestAnimationFrame"], u = e[l[t] + "CancelAnimationFrame"] || e[l[t] + "CancelRequestAnimationFrame"];
		c || (c = function (t) {
			var n = (new Date).getTime(),
				r = Math.max(0, 16 - (n - a)),
				i = e.setTimeout(function () {
					t(n + r)
				}, r);
			return a = n + r, i
		}), u || (u = function (t) {
			e.clearTimeout(t)
		}), n.rAF = c.bind(e), n.cAF = u.bind(e);
		var f = n.type = function (e) {
			return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/, "$1").toLowerCase()
		};
		f.String = function (e) {
			return "string" === f(e)
		}, f.Function = function (e) {
			return "function" === f(e)
		}, f.Array = function (e) {
			return Array.isArray(e)
		}, f.Number = function (e) {
			return !f.Array(e) && e - parseFloat(e) + 1 >= 0
		}, f.DomElement = function (e) {
			return "object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName
		};
		var d = n.get = {};
		return d.elements = function (t) {
			var n = [];
			if (f.String(t)) try {
				t = document.querySelectorAll(t)
			} catch (e) {
				return n
			}
			if ("nodelist" === f(t) || f.Array(t))
				for (var r = 0, i = n.length = t.length; i > r; r++) {
					var o = t[r];
					n[r] = f.DomElement(o) ? o : d.elements(o)
				} else(f.DomElement(t) || t === document || t === e) && (n = [t]);
			return n
		}, d.scrollTop = function (t) {
			return t && "number" == typeof t.scrollTop ? t.scrollTop : e.pageYOffset || 0
		}, d.scrollLeft = function (t) {
			return t && "number" == typeof t.scrollLeft ? t.scrollLeft : e.pageXOffset || 0
		}, d.width = function (e, t, n) {
			return o("width", e, t, n)
		}, d.height = function (e, t, n) {
			return o("height", e, t, n)
		}, d.offset = function (e, t) {
			var n = {
				top: 0,
				left: 0
			};
			if (e && e.getBoundingClientRect) {
				var r = e.getBoundingClientRect();
				n.top = r.top, n.left = r.left, t || (n.top += d.scrollTop(), n.left += d.scrollLeft())
			}
			return n
		}, n.addClass = function (e, t) {
			t && (e.classList ? e.classList.add(t) : e.className += " " + t)
		}, n.removeClass = function (e, t) {
			t && (e.classList ? e.classList.remove(t) : e.className = e.className.replace(RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " "))
		}, n.css = function (e, t) {
			if (f.String(t)) return i(e)[s(t)];
			if (f.Array(t)) {
				var n = {},
					r = i(e);
				return t.forEach(function (e) {
					n[e] = r[s(e)]
				}), n
			}
			for (var o in t) {
				var a = t[o];
				a == parseFloat(a) && (a += "px"), e.style[s(o)] = a
			}
		}, n
	}(window || {});
	return e
});

/* animation.gsap.js */
/*! ScrollMagic v2.0.5 | (c) 2015 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */
! function (e, n) {
	"function" == typeof define && define.amd ? define(["ScrollMagic", "TweenMax", "TimelineMax"], n) : "object" == typeof exports ? (require("gsap"), n(require("scrollmagic"), TweenMax, TimelineMax)) : n(e.ScrollMagic || e.jQuery && e.jQuery.ScrollMagic, e.TweenMax || e.TweenLite, e.TimelineMax || e.TimelineLite)
}(this, function (e, n, r) {
	"use strict";
	e.Scene.addOption("tweenChanges", !1, function (e) {
		return !!e
	}), e.Scene.extend(function () {
		var e, t = this;
		t.on("progress.plugin_gsap", function () {
			i()
		}), t.on("destroy.plugin_gsap", function (e) {
			t.removeTween(e.reset)
		});
		var i = function () {
			if (e) {
				var n = t.progress(),
					r = t.state();
				e.repeat && -1 === e.repeat() ? "DURING" === r && e.paused() ? e.play() : "DURING" === r || e.paused() || e.pause() : n != e.progress() && (0 === t.duration() ? n > 0 ? e.play() : e.reverse() : t.tweenChanges() && e.tweenTo ? e.tweenTo(n * e.duration()) : e.progress(n).pause())
			}
		};
		t.setTween = function (o, a, s) {
			var u;
			arguments.length > 1 && (arguments.length < 3 && (s = a, a = 1), o = n.to(o, a, s));
			try {
				u = r ? new r({
					smoothChildTiming: !0
				}).add(o) : o, u.pause()
			} catch (e) {
				return t
			}
			return e && t.removeTween(), e = u, o.repeat && -1 === o.repeat() && (e.repeat(-1), e.yoyo(o.yoyo())), i(), t
		}, t.removeTween = function (n) {
			return e && (n && e.progress(0).pause(), e.kill(), e = void 0), t
		}
	})
});

/* headroom.js */
! function (t, o) {
	"use strict";
	"function" == typeof define && define.amd ? define([], o) : "object" == typeof exports ? module.exports = o() : t.Headroom = o()
}(this, function () {
	"use strict";
	var t = {
		bind: !! function () {}.bind,
		classList: "classList" in document.documentElement,
		rAF: !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
	};

	function o(t) {
		this.callback = t, this.ticking = !1
	}

	function i(t, o) {
		var n;
		o = function t(o) {
			if (arguments.length <= 0) throw new Error("Missing arguments in extend function");
			var i, n, e, s = o || {};
			for (n = 1; n < arguments.length; n++) {
				var r = arguments[n] || {};
				for (i in r) "object" != typeof s[i] || (e = s[i]) && "undefined" != typeof window && (e === window || e.nodeType) ? s[i] = s[i] || r[i] : s[i] = t(s[i], r[i])
			}
			return s
		}(o, i.options), this.lastKnownScrollY = 0, this.elem = t, this.tolerance = (n = o.tolerance) === Object(n) ? n : {
			down: n,
			up: n
		}, this.classes = o.classes, this.offset = o.offset, this.scroller = o.scroller, this.initialised = !1, this.onPin = o.onPin, this.onUnpin = o.onUnpin, this.onTop = o.onTop, this.onNotTop = o.onNotTop, this.onBottom = o.onBottom, this.onNotBottom = o.onNotBottom
	}
	return window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame, o.prototype = {
		constructor: o,
		update: function () {
			this.callback && this.callback(), this.ticking = !1
		},
		requestTick: function () {
			this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), this.ticking = !0)
		},
		handleEvent: function () {
			this.requestTick()
		}
	}, i.prototype = {
		constructor: i,
		init: function () {
			if (i.cutsTheMustard) return this.debouncer = new o(this.update.bind(this)), this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), this
		},
		destroy: function () {
			var t = this.classes;
			for (var o in this.initialised = !1, t) t.hasOwnProperty(o) && this.elem.classList.remove(t[o]);
			this.scroller.removeEventListener("scroll", this.debouncer, !1)
		},
		attachEvent: function () {
			this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent())
		},
		unpin: function () {
			var t = this.elem.classList,
				o = this.classes;
			!t.contains(o.pinned) && t.contains(o.unpinned) || (t.add(o.unpinned), t.remove(o.pinned), this.onUnpin && this.onUnpin.call(this))
		},
		pin: function () {
			var t = this.elem.classList,
				o = this.classes;
			t.contains(o.unpinned) && (t.remove(o.unpinned), t.add(o.pinned), this.onPin && this.onPin.call(this))
		},
		top: function () {
			var t = this.elem.classList,
				o = this.classes;
			t.contains(o.top) || (t.add(o.top), t.remove(o.notTop), this.onTop && this.onTop.call(this))
		},
		notTop: function () {
			var t = this.elem.classList,
				o = this.classes;
			t.contains(o.notTop) || (t.add(o.notTop), t.remove(o.top), this.onNotTop && this.onNotTop.call(this))
		},
		bottom: function () {
			var t = this.elem.classList,
				o = this.classes;
			t.contains(o.bottom) || (t.add(o.bottom), t.remove(o.notBottom), this.onBottom && this.onBottom.call(this))
		},
		notBottom: function () {
			var t = this.elem.classList,
				o = this.classes;
			t.contains(o.notBottom) || (t.add(o.notBottom), t.remove(o.bottom), this.onNotBottom && this.onNotBottom.call(this))
		},
		getScrollY: function () {
			return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset : void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop
		},
		getViewportHeight: function () {
			return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
		},
		getElementPhysicalHeight: function (t) {
			return Math.max(t.offsetHeight, t.clientHeight)
		},
		getScrollerPhysicalHeight: function () {
			return this.scroller === window || this.scroller === document.body ? this.getViewportHeight() : this.getElementPhysicalHeight(this.scroller)
		},
		getDocumentHeight: function () {
			var t = document.body,
				o = document.documentElement;
			return Math.max(t.scrollHeight, o.scrollHeight, t.offsetHeight, o.offsetHeight, t.clientHeight, o.clientHeight)
		},
		getElementHeight: function (t) {
			return Math.max(t.scrollHeight, t.offsetHeight, t.clientHeight)
		},
		getScrollerHeight: function () {
			return this.scroller === window || this.scroller === document.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller)
		},
		isOutOfBounds: function (t) {
			var o = t < 0,
				i = t + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
			return o || i
		},
		toleranceExceeded: function (t, o) {
			return Math.abs(t - this.lastKnownScrollY) >= this.tolerance[o]
		},
		shouldUnpin: function (t, o) {
			var i = t > this.lastKnownScrollY,
				n = t >= this.offset;
			return i && n && o
		},
		shouldPin: function (t, o) {
			var i = t < this.lastKnownScrollY,
				n = t <= this.offset;
			return i && o || n
		},
		update: function () {
			var t = this.getScrollY(),
				o = t > this.lastKnownScrollY ? "down" : "up",
				i = this.toleranceExceeded(t, o);
			this.isOutOfBounds(t) || (t <= this.offset ? this.top() : this.notTop(), t + this.getViewportHeight() >= this.getScrollerHeight() ? this.bottom() : this.notBottom(), this.shouldUnpin(t, i) ? this.unpin() : this.shouldPin(t, i) && this.pin(), this.lastKnownScrollY = t)
		}
	}, i.options = {
		tolerance: {
			up: 0,
			down: 0
		},
		offset: 0,
		scroller: window,
		classes: {
			pinned: "headroom--pinned",
			unpinned: "headroom--unpinned",
			top: "headroom--top",
			notTop: "headroom--not-top",
			bottom: "headroom--bottom",
			notBottom: "headroom--not-bottom",
			initial: "headroom"
		}
	}, i.cutsTheMustard = void 0 !== t && t.rAF && t.bind && t.classList, i
});

/* jQuery.headroom.js */
! function (o) {
	o && (o.fn.headroom = function (t) {
		return this.each(function () {
			var a = o(this),
				e = a.data("headroom"),
				n = "object" == typeof t && t;
			n = o.extend(!0, {}, Headroom.options, n), e || ((e = new Headroom(this, n)).init(), a.data("headroom", e)), "string" == typeof t && (e[t](), "destroy" === t && a.removeData("headroom"))
		})
	}, o("[data-headroom]").each(function () {
		var t = o(this);
		t.headroom(t.data())
	}))
}(window.Zepto || window.jQuery);

/* animsition.js */
! function (t) {
	"use strict";
	"function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t) {
	"use strict";
	var n = "animsition",
		i = {
			init: function (a) {
				a = t.extend({
					inClass: "fade-in",
					outClass: "fade-out",
					inDuration: 1500,
					outDuration: 800,
					linkElement: ".animsition-link",
					loading: !0,
					loadingParentElement: "body",
					loadingClass: "animsition-loading",
					loadingInner: "",
					timeout: !1,
					timeoutCountdown: 5e3,
					onLoadEvent: !0,
					browser: ["animation-duration", "-webkit-animation-duration"],
					overlay: !1,
					overlayClass: "animsition-overlay-slide",
					overlayParentElement: "body",
					transition: function (t) {
						window.location.href = t
					}
				}, a), i.settings = {
					timer: !1,
					data: {
						inClass: "animsition-in-class",
						inDuration: "animsition-in-duration",
						outClass: "animsition-out-class",
						outDuration: "animsition-out-duration",
						overlay: "animsition-overlay"
					},
					events: {
						inStart: "animsition.inStart",
						inEnd: "animsition.inEnd",
						outStart: "animsition.outStart",
						outEnd: "animsition.outEnd"
					}
				};
				var o = i.supportCheck.call(this, a);
				return o || !(a.browser.length > 0) || o && this.length ? (i.optionCheck.call(this, a) && t("." + a.overlayClass).length <= 0 && i.addOverlay.call(this, a), a.loading && t("." + a.loadingClass).length <= 0 && i.addLoading.call(this, a), this.each(function () {
					var o = this,
						e = t(this),
						s = t(window),
						l = t(document);
					e.data(n) || (a = t.extend({}, a), e.data(n, {
						options: a
					}), a.timeout && i.addTimer.call(o), a.onLoadEvent && s.on("load.animsition", function () {
						i.settings.timer && clearTimeout(i.settings.timer), i.in.call(o)
					}), s.on("pageshow.animsition", function (t) {
						t.originalEvent.persisted && i.in.call(o)
					}), s.on("unload.animsition", function () {}), l.on("click.animsition", a.linkElement, function (n) {
						n.preventDefault();
						var a = t(this),
							e = a.attr("href");
						2 === n.which || n.metaKey || n.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && n.ctrlKey ? window.open(e, "_blank") : i.out.call(o, a, e)
					}))
				})) : ("console" in window || (window.console = {}, window.console.log = function (t) {
					return t
				}), this.length || console.log("Animsition: Element does not exist on page."), o || console.log("Animsition: Does not support this browser."), i.destroy.call(this))
			},
			addOverlay: function (n) {
				t(n.overlayParentElement).prepend('<div class="' + n.overlayClass + '"></div>')
			},
			addLoading: function (n) {
				t(n.loadingParentElement).append('<div class="' + n.loadingClass + '">' + n.loadingInner + "</div>")
			},
			removeLoading: function () {
				var i = t(this).data(n).options;
				t(i.loadingParentElement).children("." + i.loadingClass).fadeOut().remove()
			},
			addTimer: function () {
				var a = this,
					o = t(this).data(n).options;
				i.settings.timer = setTimeout(function () {
					i.in.call(a), t(window).off("load.animsition")
				}, o.timeoutCountdown)
			},
			supportCheck: function (n) {
				var i = t(this),
					a = n.browser,
					o = a.length,
					e = !1;
				0 === o && (e = !0);
				for (var s = 0; s < o; s++)
					if ("string" == typeof i.css(a[s])) {
						e = !0;
						break
					}
				return e
			},
			optionCheck: function (n) {
				var a = t(this);
				return !(!n.overlay && !a.data(i.settings.data.overlay))
			},
			animationCheck: function (i, a, o) {
				var e = t(this).data(n).options,
					s = typeof i,
					l = !a && "number" === s,
					r = a && "string" === s && i.length > 0;
				return l || r ? i = i : a && o ? i = e.inClass : !a && o ? i = e.inDuration : a && !o ? i = e.outClass : a || o || (i = e.outDuration), i
			},
			in: function () {
				var a = t(this),
					o = a.data(n).options,
					e = a.data(i.settings.data.inDuration),
					s = a.data(i.settings.data.inClass),
					l = i.animationCheck.call(this, e, !1, !0),
					r = i.animationCheck.call(this, s, !0, !0),
					d = i.optionCheck.call(this, o),
					u = a.data(n).outClass;
				o.loading && i.removeLoading.call(this), u && a.removeClass(u), d ? i.inOverlay.call(this, r, l) : i.inDefault.call(this, r, l)
			},
			inDefault: function (n, a) {
				var o = t(this);
				o.css({
					"animation-duration": a + "ms"
				}).addClass(n).trigger(i.settings.events.inStart).animateCallback(function () {
					o.removeClass(n).css({
						opacity: 1
					}).trigger(i.settings.events.inEnd)
				})
			},
			inOverlay: function (a, o) {
				var e = t(this),
					s = e.data(n).options;
				e.css({
					opacity: 1
				}).trigger(i.settings.events.inStart), t(s.overlayParentElement).children("." + s.overlayClass).css({
					"animation-duration": o + "ms"
				}).addClass(a).animateCallback(function () {
					e.trigger(i.settings.events.inEnd)
				})
			},
			out: function (a, o) {
				var e = t(this),
					s = e.data(n).options,
					l = a.data(i.settings.data.outClass),
					r = e.data(i.settings.data.outClass),
					d = a.data(i.settings.data.outDuration),
					u = e.data(i.settings.data.outDuration),
					c = l || r,
					m = d || u,
					h = i.animationCheck.call(this, c, !0, !1),
					g = i.animationCheck.call(this, m, !1, !1),
					f = i.optionCheck.call(this, s);
				e.data(n).outClass = h, f ? i.outOverlay.call(this, h, g, o) : i.outDefault.call(this, h, g, o)
			},
			outDefault: function (a, o, e) {
				var s = t(this),
					l = s.data(n).options;
				s.css({
					"animation-duration": o + 1 + "ms"
				}).addClass(a).trigger(i.settings.events.outStart).animateCallback(function () {
					s.trigger(i.settings.events.outEnd), l.transition(e)
				})
			},
			outOverlay: function (a, o, e) {
				var s = t(this),
					l = s.data(n).options,
					r = s.data(i.settings.data.inClass),
					d = i.animationCheck.call(this, r, !0, !0);
				t(l.overlayParentElement).children("." + l.overlayClass).css({
					"animation-duration": o + 1 + "ms"
				}).removeClass(d).addClass(a).trigger(i.settings.events.outStart).animateCallback(function () {
					s.trigger(i.settings.events.outEnd), l.transition(e)
				})
			},
			destroy: function () {
				return this.each(function () {
					var i = t(this);
					t(window).off(".animsition"), i.css({
						opacity: 1
					}).removeData(n)
				})
			}
		};
	t.fn.animateCallback = function (n) {
		var i = "animationend webkitAnimationEnd";
		return this.each(function () {
			var a = t(this);
			a.on(i, function () {
				return a.off(i), n.call(this)
			})
		})
	}, t.fn.animsition = function (a) {
		return i[a] ? i[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? void t.error("Method " + a + " does not exist on jQuery." + n) : i.init.apply(this, arguments)
	}
});

/* odometer.js */
(function () {
	var t, e, n, i, o, r, s, a, u, l, d, h, p, c, m, f, g, v, w, M, y, b, T = [].slice;
	e = /^\(?([^)]*)\)?(?:(.)(d+))?$/, t = 2e3, n = 2, i = 1e3 / 30, m = document.createElement("div").style, s = null != m.transition || null != m.webkitTransition || null != m.mozTransition || null != m.oTransition, p = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, o = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, u = function (t) {
		var e;
		return (e = document.createElement("div")).innerHTML = t, e.children[0]
	}, h = function (t, e) {
		return t.className = t.className.replace(new RegExp("(^| )" + e.split(" ").join("|") + "( |$)", "gi"), " ")
	}, a = function (t, e) {
		return h(t, e), t.className += " " + e
	}, f = function (t, e) {
		var n;
		if (null != document.createEvent) return (n = document.createEvent("HTMLEvents")).initEvent(e, !0, !0), t.dispatchEvent(n)
	}, d = function () {
		var t, e;
		return null != (t = null != (e = window.performance) && "function" == typeof e.now ? e.now() : void 0) ? t : +new Date
	}, c = function (t, e) {
		return null == e && (e = 0), e ? (t *= Math.pow(10, e), t += .5, (t = Math.floor(t)) / Math.pow(10, e)) : Math.round(t)
	}, g = function (t) {
		return t < 0 ? Math.ceil(t) : Math.floor(t)
	}, l = function (t) {
		return t - c(t)
	}, w = !1, (v = function () {
		var t, e, n, i, o;
		if (!w && null != window.jQuery) {
			for (w = !0, o = [], e = 0, n = (i = ["html", "text"]).length; e < n; e++) t = i[e], o.push(function (t) {
				var e;
				return e = window.jQuery.fn[t], window.jQuery.fn[t] = function (t) {
					var n;
					return null == t || null == (null != (n = this[0]) ? n.odometer : void 0) ? e.apply(this, arguments) : this[0].odometer.update(t)
				}
			}(t));
			return o
		}
	})(), setTimeout(v, 0), (r = function () {
		function r(e) {
			var o, s, a, u, l, d, h, p, c, m = this;
			if (this.options = e, this.el = this.options.el, null != this.el.odometer) return this.el.odometer;
			for (o in this.el.odometer = this, h = r.options) a = h[o], null == this.options[o] && (this.options[o] = a);
			null == (u = this.options).duration && (u.duration = t), this.MAX_VALUES = this.options.duration / i / n | 0, this.resetFormat(), this.value = this.cleanValue(null != (p = this.options.value) ? p : ""), this.renderInside(), this.render();
			try {
				for (l = 0, d = (c = ["innerHTML", "innerText", "textContent"]).length; l < d; l++) s = c[l], null != this.el[s] && function (t) {
					Object.defineProperty(m.el, t, {
						get: function () {
							var e;
							return "innerHTML" === t ? m.inside.outerHTML : null != (e = m.inside.innerText) ? e : m.inside.textContent
						},
						set: function (t) {
							return m.update(t)
						}
					})
				}(s)
			} catch (t) {
				t,
				this.watchForMutations()
			}
		}
		return r.prototype.renderInside = function () {
			return this.inside = document.createElement("div"), this.inside.className = "odometer-inside", this.el.innerHTML = "", this.el.appendChild(this.inside)
		}, r.prototype.watchForMutations = function () {
			var t = this;
			if (null != o) try {
				return null == this.observer && (this.observer = new o(function (e) {
					var n;
					return n = t.el.innerText, t.renderInside(), t.render(t.value), t.update(n)
				})), this.watchMutations = !0, this.startWatchingMutations()
			} catch (t) {
				t
			}
		}, r.prototype.startWatchingMutations = function () {
			if (this.watchMutations) return this.observer.observe(this.el, {
				childList: !0
			})
		}, r.prototype.stopWatchingMutations = function () {
			var t;
			return null != (t = this.observer) ? t.disconnect() : void 0
		}, r.prototype.cleanValue = function (t) {
			var e;
			return "string" == typeof t && (t = (t = (t = t.replace(null != (e = this.format.radix) ? e : ".", "<radix>")).replace(/[.,]/g, "")).replace("<radix>", "."), t = parseFloat(t, 10) || 0), c(t, this.format.precision)
		}, r.prototype.bindTransitionEnd = function () {
			var t, e, n, i, o, r, s = this;
			if (!this.transitionEndBound) {
				for (this.transitionEndBound = !0, e = !1, r = [], n = 0, i = (o = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd".split(" ")).length; n < i; n++) t = o[n], r.push(this.el.addEventListener(t, function () {
					return !!e || (e = !0, setTimeout(function () {
						return s.render(), e = !1, f(s.el, "odometerdone")
					}, 0), !0)
				}, !1));
				return r
			}
		}, r.prototype.resetFormat = function () {
			var t, n, i, o, r, s, a, u;
			if ((t = null != (a = this.options.format) ? a : "(,ddd).dd") || (t = "d"), !(i = e.exec(t))) throw new Error("Odometer: Unparsable digit format");
			return s = (u = i.slice(1, 4))[0], r = u[1], o = (null != (n = u[2]) ? n.length : void 0) || 0, this.format = {
				repeating: s,
				radix: r,
				precision: o
			}
		}, r.prototype.render = function (t) {
			var e, n, i, o, r, a, u, d, h, p, c, m;
			for (null == t && (t = this.value), this.stopWatchingMutations(), this.resetFormat(), this.inside.innerHTML = "", a = this.options.theme, r = [], d = 0, p = (e = this.el.className.split(" ")).length; d < p; d++)(n = e[d]).length && ((o = /^odometer-theme-(.+)$/.exec(n)) ? a = o[1] : /^odometer(-|$)/.test(n) || r.push(n));
			for (r.push("odometer"), s || r.push("odometer-no-transitions"), a ? r.push("odometer-theme-" + a) : r.push("odometer-auto-theme"), this.el.className = r.join(" "), this.ribbons = {}, this.digits = [], u = !this.format.precision || !l(t) || !1, h = 0, c = (m = t.toString().split("").reverse()).length; h < c; h++) "." === (i = m[h]) && (u = !0), this.addDigit(i, u);
			return this.startWatchingMutations()
		}, r.prototype.update = function (t) {
			var e, n = this;
			if (e = (t = this.cleanValue(t)) - this.value) return h(this.el, "odometer-animating-up odometer-animating-down odometer-animating"), a(this.el, e > 0 ? "odometer-animating-up" : "odometer-animating-down"), this.stopWatchingMutations(), this.animate(t), this.startWatchingMutations(), setTimeout(function () {
				return n.el.offsetHeight, a(n.el, "odometer-animating")
			}, 0), this.value = t
		}, r.prototype.renderDigit = function () {
			return u('<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner"><span class="odometer-ribbon"><span class="odometer-ribbon-inner"><span class="odometer-value"></span></span></span></span></span>')
		}, r.prototype.insertDigit = function (t, e) {
			return null != e ? this.inside.insertBefore(t, e) : this.inside.children.length ? this.inside.insertBefore(t, this.inside.children[0]) : this.inside.appendChild(t)
		}, r.prototype.addSpacer = function (t, e, n) {
			var i;
			return (i = u('<span class="odometer-formatting-mark"></span>')).innerHTML = t, n && a(i, n), this.insertDigit(i, e)
		}, r.prototype.addDigit = function (t, e) {
			var n, i, o, r;
			if (null == e && (e = !0), "-" === t) return this.addSpacer(t, null, "odometer-negation-mark");
			if ("." === t) return this.addSpacer(null != (r = this.format.radix) ? r : ".", null, "odometer-radix-mark");
			if (e)
				for (o = !1;;) {
					if (!this.format.repeating.length) {
						if (o) throw new Error("Bad odometer format without digits");
						this.resetFormat(), o = !0
					}
					if (n = this.format.repeating[this.format.repeating.length - 1], this.format.repeating = this.format.repeating.substring(0, this.format.repeating.length - 1), "d" === n) break;
					this.addSpacer(n)
				}
			return (i = this.renderDigit()).querySelector(".odometer-value").innerHTML = t, this.digits.push(i), this.insertDigit(i)
		}, r.prototype.animate = function (t) {
			return s && "count" !== this.options.animation ? this.animateSlide(t) : this.animateCount(t)
		}, r.prototype.animateCount = function (t) {
			var e, n, i, o, r, s = this;
			if (n = +t - this.value) return o = i = d(), e = this.value, (r = function () {
				var a, u;
				return d() - o > s.options.duration ? (s.value = t, s.render(), void f(s.el, "odometerdone")) : ((a = d() - i) > 50 && (i = d(), u = a / s.options.duration, e += n * u, s.render(Math.round(e))), null != p ? p(r) : setTimeout(r, 50))
			})()
		}, r.prototype.getDigitCount = function () {
			var t, e, n, i, o, r;
			for (t = o = 0, r = (i = 1 <= arguments.length ? T.call(arguments, 0) : []).length; o < r; t = ++o) n = i[t], i[t] = Math.abs(n);
			return e = Math.max.apply(Math, i), Math.ceil(Math.log(e + 1) / Math.log(10))
		}, r.prototype.getFractionalDigitCount = function () {
			var t, e, n, i, o, r, s;
			for (e = /^\-?\d*\.(\d*?)0*$/, t = r = 0, s = (o = 1 <= arguments.length ? T.call(arguments, 0) : []).length; r < s; t = ++r) i = o[t], o[t] = i.toString(), n = e.exec(o[t]), o[t] = null == n ? 0 : n[1].length;
			return Math.max.apply(Math, o)
		}, r.prototype.resetDigits = function () {
			return this.digits = [], this.ribbons = [], this.inside.innerHTML = "", this.resetFormat()
		}, r.prototype.animateSlide = function (t) {
			var e, n, i, o, r, s, u, l, d, h, p, c, m, f, v, w, M, y, b, T, E, x, S, L, D, A, C;
			if (w = this.value, (l = this.getFractionalDigitCount(w, t)) && (t *= Math.pow(10, l), w *= Math.pow(10, l)), i = t - w) {
				for (this.bindTransitionEnd(), o = this.getDigitCount(w, t), r = [], e = 0, p = b = 0; 0 <= o ? b < o : b > o; p = 0 <= o ? ++b : --b) {
					if (M = g(w / Math.pow(10, o - p - 1)), s = (u = g(t / Math.pow(10, o - p - 1))) - M, Math.abs(s) > this.MAX_VALUES) {
						for (h = [], c = s / (this.MAX_VALUES + this.MAX_VALUES * e * .5), n = M; s > 0 && n < u || s < 0 && n > u;) h.push(Math.round(n)), n += c;
						h[h.length - 1] !== u && h.push(u), e++
					} else h = function () {
						C = [];
						for (var t = M; M <= u ? t <= u : t >= u; M <= u ? t++ : t--) C.push(t);
						return C
					}.apply(this);
					for (p = T = 0, x = h.length; T < x; p = ++T) d = h[p], h[p] = Math.abs(d % 10);
					r.push(h)
				}
				for (this.resetDigits(), p = E = 0, S = (A = r.reverse()).length; E < S; p = ++E)
					for (h = A[p], this.digits[p] || this.addDigit(" ", p >= l), null == (y = this.ribbons)[p] && (y[p] = this.digits[p].querySelector(".odometer-ribbon-inner")), this.ribbons[p].innerHTML = "", i < 0 && (h = h.reverse()), m = D = 0, L = h.length; D < L; m = ++D) d = h[m], (v = document.createElement("div")).className = "odometer-value", v.innerHTML = d, this.ribbons[p].appendChild(v), m === h.length - 1 && a(v, "odometer-last-value"), 0 === m && a(v, "odometer-first-value");
				return M < 0 && this.addDigit("-"), null != (f = this.inside.querySelector(".odometer-radix-mark")) && f.parent.removeChild(f), l ? this.addSpacer(this.format.radix, this.digits[l - 1], "odometer-radix-mark") : void 0
			}
		}, r
	}()).options = null != (y = window.odometerOptions) ? y : {}, setTimeout(function () {
		var t, e, n, i, o;
		if (window.odometerOptions) {
			for (t in o = [], i = window.odometerOptions) e = i[t], o.push(null != (n = r.options)[t] ? (n = r.options)[t] : n[t] = e);
			return o
		}
	}, 0), r.init = function () {
		var t, e, n, i, o, s;
		if (null != document.querySelectorAll) {
			for (s = [], n = 0, i = (e = document.querySelectorAll(r.options.selector || ".odometer")).length; n < i; n++) t = e[n], s.push(t.odometer = new r({
				el: t,
				value: null != (o = t.innerText) ? o : t.textContent
			}));
			return s
		}
	}, null != (null != (b = document.documentElement) ? b.doScroll : void 0) && null != document.createEventObject ? (M = document.onreadystatechange, document.onreadystatechange = function () {
		return "complete" === document.readyState && !1 !== r.options.auto && r.init(), null != M ? M.apply(this, arguments) : void 0
	}) : document.addEventListener("DOMContentLoaded", function () {
		if (!1 !== r.options.auto) return r.init()
	}, !1), "function" == typeof define && define.amd ? define(["jquery"], function () {
		return r
	}) : !1 === typeof exports ? module.exports = r : window.Odometer = r
}).call(this);
