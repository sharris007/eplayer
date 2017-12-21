this.JSON || (JSON = function() {
        function f(e) {
            return 10 > e ? "0" + e : e
        }

        function quote(e) {
            return escapeable.test(e) ? '"' + e.replace(escapeable, function(e) {
                var t = meta[e];
                return "string" == typeof t ? t : (t = e.charCodeAt(), "\\u00" + Math.floor(t / 16).toString(16) + (t % 16).toString(16))
            }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var n, o, r, i, s, a = gap,
                u = t[e];
            switch (u && "object" == typeof u && "function" == typeof u.toJSON && (u = u.toJSON(e)), "function" == typeof rep && (u = rep.call(t, e, u)), typeof u) {
                case "string":
                    return quote(u);
                case "number":
                    return isFinite(u) ? String(u) : "null";
                case "boolean":
                case "null":
                    return String(u);
                case "object":
                    if (!u) return "null";
                    if (gap += indent, s = [], "number" == typeof u.length && !u.propertyIsEnumerable("length")) {
                        for (i = u.length, n = 0; i > n; n += 1) s[n] = str(n, u) || "null";
                        return r = 0 === s.length ? "[]" : gap ? "[\n" + gap + s.join(",\n" + gap) + "\n" + a + "]" : "[" + s.join(",") + "]", gap = a, r
                    }
                    if ("object" == typeof rep)
                        for (i = rep.length, n = 0; i > n; n += 1) o = rep[n], "string" == typeof o && (r = str(o, u, rep), r && s.push(quote(o) + (gap ? ": " : ":") + r));
                    else
                        for (o in u) r = str(o, u, rep), r && s.push(quote(o) + (gap ? ": " : ":") + r);
                    return r = 0 === s.length ? "{}" : gap ? "{\n" + gap + s.join(",\n" + gap) + "\n" + a + "}" : "{" + s.join(",") + "}", gap = a, r
            }
        }
        Date.prototype.toJSON = function() {
            return this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z"
        };
        var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "   ": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;
        return {
            stringify: function(e, t, n) {
                var o;
                if (gap = "", indent = "", n)
                    if ("number" == typeof n)
                        for (o = 0; n > o; o += 1) indent += " ";
                    else "string" == typeof n && (indent = n);
                if (t) {
                    if ("function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
                    rep = t
                } else rep = function(e, t) {
                    return Object.hasOwnProperty.call(this, e) ? t : void 0
                };
                return str("", {
                    "": e
                })
            },
            parse: function(text, reviver) {
                function walk(e, t) {
                    var n, o, r = e[t];
                    if (r && "object" == typeof r)
                        for (n in r) Object.hasOwnProperty.call(r, n) && (o = walk(r, n), void 0 !== o ? r[n] = o : delete r[n]);
                    return reviver.call(e, t, r)
                }
                var j;
                if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                    "": j
                }, "") : j;
                throw new SyntaxError("JSON.parse")
            },
            quote: quote
        }
    }()), _globalJeegoocontextIgnoreHide = !1,
    function(e) {
        var t, n, o = function(t, n) {
                var o = window.innerHeight ? window.innerHeight : e(window).height();
                return {
                    width: t - e(window).width() - e(window).scrollLeft(),
                    height: n - o - e(window).scrollTop()
                }
            },
            r = function(o) {
                if (n[t.activeId].currentHover) {
                    var r = o ? n[t.activeId].currentHover.nextAll(":not(." + n[t.activeId].separatorClass + "):visible:first") : n[t.activeId].currentHover.prevAll(":not(." + n[t.activeId].separatorClass + "):visible:first");
                    0 == r.length && (r = n[t.activeId].currentHover.parent().find("> li:visible"), r = e(o ? r[0] : r[r.length - 1])), r.mouseover()
                } else {
                    var i = e("#" + t.activeId + ", #" + t.activeId + " ul").filter(function() {
                        return e(this).is(":visible") && 0 == e(this).parents(":hidden").length
                    });
                    if (i.length > 0) {
                        var s = e(i[i.length - 1]).find("> li:visible");
                        e(s[o ? 0 : s.length - 1]).mouseover()
                    }
                }
            },
            i = function() {
                for (cm in n) e(n[cm].allContext).removeClass(t.activeClass)
            },
            s = function() {
                t.activeId && e("#" + t.activeId).add("#" + t.activeId + " ul").hide(), clearInterval(t.keyUpDown), t.keyUpDownStop = !1, n[t.activeId] && (n[t.activeId].currentHover = null), t.activeId = null, e(document).unbind(".jeegoocontext"), e(window).unbind("resize.jeegoocontext")
            },
            a = function(o) {
                return t.activeId && n[t.activeId].onHide && 0 == n[t.activeId].onHide.apply(e("#" + t.activeId), [o, n[t.activeId].context]) ? !1 : (i(), void s())
            };
        e.fn.jeegoocontext = function(u, l) {
            t || (t = {}), n || (n = {}), l && l.menuClass && (t.menuClass = l.menuClass), t.menuClass || (t.menuClass = "jeegoocontext"), l && l.activeClass && (t.activeClass = l.activeClass), t.activeClass || (t.activeClass = "active"), n[u] = e.extend({
                hoverClass: "hover",
                submenuClass: "submenu",
                separatorClass: "separator",
                operaEvent: "ctrl+click",
                fadeIn: 200,
                delay: 300,
                keyDelay: 100,
                widthOverflowOffset: 0,
                heightOverflowOffset: 0,
                submenuLeftOffset: 0,
                submenuTopOffset: 0,
                autoAddSubmenuArrows: !0,
                startLeftOffset: 0,
                startTopOffset: 0,
                keyboard: !0
            }, l || {}), n[u].allContext = this.selector, e("#" + u).find("li")[n[u].livequery ? "expire" : "unbind"](".jeegoocontext")[n[u].livequery ? "livequery" : "bind"]("mouseover.jeegoocontext", function(t) {
                var r = n[u].currentHover = e(this);
                clearTimeout(n[u].show), clearTimeout(n[u].hide), e("#" + u).find("*").removeClass(n[u].hoverClass);
                var i = r.parents("li");
                r.add(r.find("> *")).add(i).add(i.find("> *")).addClass(n[u].hoverClass);
                var s = !0;
                if (n[u].onHover && 0 == n[u].onHover.apply(this, [t, n[u].context]) && (s = !1), !n[u].proceed) return n[u].show = setTimeout(function() {
                    n[u].proceed = !0, r.mouseover()
                }, n[u].delay), !1;
                if (n[u].proceed = !1, r.parent().find("ul").not(r.find("> ul")).hide(), !s) return t.preventDefault(), !1;
                var a = r.find("> ul");
                if (0 != a.length) {
                    var l = r.offset(),
                        c = o(l.left + r.parent().width() + n[u].submenuLeftOffset + a.width() + n[u].widthOverflowOffset, l.top + n[u].submenuTopOffset + a.height() + n[u].heightOverflowOffset),
                        f = a.parent().parent().width(),
                        d = l.top - r.parent().offset().top;
                    a.css({
                        left: c.width > 0 && !n[u].ignoreWidthOverflow ? -f - n[u].submenuLeftOffset + "px" : f + n[u].submenuLeftOffset + "px",
                        top: c.height > 0 && !n[u].ignoreHeightOverflow ? d - c.height + n[u].submenuTopOffset + "px" : d + n[u].submenuTopOffset + "px"
                    }), a.fadeIn(n[u].fadeIn)
                }
                t.stopPropagation()
            })[n[u].livequery ? "livequery" : "bind"]("click.jeegoocontext touchstart.jeegoocontext", function(o) {
                if (n[u].onSelect) {
                    if (0 == n[u].onSelect.apply(this, [o, n[u].context])) return !1;
                    o.preventDefault()
                }
                s(), e(n[u].context).removeClass(t.activeClass), o.stopPropagation()
            });
            var c = document.createElement("div");
            c.setAttribute("oncontextmenu", "");
            var f = n[u].event;
            if (f ? f += ".jeegoocontext" : f = "undefined" != typeof c.oncontextmenu ? "contextmenu.jeegoocontext" : n[u].operaEvent + ".jeegoocontext", -1 != f.indexOf("+")) {
                var d = f.split("+", 2);
                n[u].modifier = d[0] + "Key", f = d[1]
            }
            return this[n[u].livequery ? "livequery" : "bind"](f, function(l, c) {
                if ("string" != typeof n[u].modifier || l[n[u].modifier]) {
                    "undefined" == typeof l.pageX && (l = c), n[u].context = this;
                    var f, d, p = e("#" + u);
                    if (n[u].openBelowContext) {
                        var h = e(this).offset();
                        f = h.left, d = h.top + e(this).outerHeight()
                    } else f = l.pageX, d = l.pageY;
                    f += n[u].startLeftOffset, d += n[u].startTopOffset;
                    var m = o(f + p.width() + n[u].widthOverflowOffset, d + p.height() + n[u].heightOverflowOffset);
                    return !n[u].ignoreWidthOverflow && m.width > 0 && (f -= m.width), !n[u].openBelowContext && !n[u].ignoreHeightOverflow && m.height > 0 && (d -= m.height), n[u].onShow && 0 == n[u].onShow.apply(p, [l, n[u].context, f, d]) ? !1 : (s(), t.activeId = u, e("#" + t.activeId).add("#" + t.activeId + " ul").hide(), i(), e(n[u].context).addClass(t.activeClass), p.find("li, li > *").removeClass(n[u].hoverClass), n[u].autoAddSubmenuArrows && (p.find("li:has(ul)").not(":has(span." + n[u].submenuClass + ")").prepend('<span class="' + n[u].submenuClass + '"></span>'), p.find("li").not(":has(ul)").find("> span." + n[u].submenuClass).remove()), p.css({
                        left: f + "px",
                        top: d + "px"
                    }).fadeIn(n[u].fadeIn), n[u].openBelowContext && e(window).bind("resize.jeegoocontext", function() {
                        e("#" + u).css("left", e(n[u].context).offset().left + n[u].startLeftOffset + "px")
                    }), e(document).bind("mouseover.jeegoocontext", function(o) {
                        if (e(o.relatedTarget).parents("#" + u).length > 0) {
                            clearTimeout(n[u].show);
                            var r = e(o.relatedTarget).parent().find("li");
                            r.add(r.find("> *")).removeClass(n[u].hoverClass), n[t.activeId].currentHover = null, n[u].hide = setTimeout(function() {
                                r.find("ul").hide(), n[u].autoHide && a(o)
                            }, n[u].delay)
                        }
                    }).bind("click.jeegoocontext touchstart.jeegoocontext", function(e) {
                        _globalJeegoocontextIgnoreHide || a(e), _globalJeegoocontextIgnoreHide = !1
                    }), n[u].keyboard && e(document).bind("keydown.jeegoocontext", function(o) {
                        switch (o.which) {
                            case 38:
                                return t.keyUpDownStop ? !1 : (r(), t.keyUpDown = setInterval(r, n[t.activeId].keyDelay), t.keyUpDownStop = !0, !1);
                            case 39:
                                if (n[t.activeId].currentHover) n[t.activeId].currentHover.find("ul:visible:first li:visible:first").mouseover();
                                else {
                                    var i = e("#" + t.activeId + ", #" + t.activeId + " ul:visible");
                                    i.length > 0 && e(i[i.length - 1]).find(":visible:first").mouseover()
                                }
                                return !1;
                            case 40:
                                return t.keyUpDownStop ? !1 : (r(!0), t.keyUpDown = setInterval(function() {
                                    r(!0)
                                }, n[t.activeId].keyDelay), t.keyUpDownStop = !0, !1);
                            case 37:
                                if (n[t.activeId].currentHover) e(n[t.activeId].currentHover.parents("li")[0]).mouseover();
                                else {
                                    var s = e("#" + t.activeId + " li." + n[t.activeId].hoverClass);
                                    s.length > 0 && e(s[s.length - 1]).mouseover()
                                }
                                return !1;
                            case 13:
                                n[t.activeId].currentHover ? n[t.activeId].currentHover.click() : a(o);
                                break;
                            case 27:
                                a(o)
                        }
                    }).bind("keyup.jeegoocontext", function(e) {
                        clearInterval(t.keyUpDown), t.keyUpDownStop = !1
                    }), !1)
                }
            })
        }, e.fn.nojeegoocontext = function() {
            this.unbind(".jeegoocontext")
        }, e.fn.hidden = function() {
            a()
        }
    }(jQuery),
    function(e) {
        function t(t) {
            /*Change for Horizontal Layout. Disabling mouse scroll if the book is horizontal Layout*/
                //if(JSON.parse(window.localStorage.getItem('navigationLayout')) == "vertical"){
                    var n = t || window.event,
                        o = [].slice.call(arguments, 1),
                        r = 0,
                        i = 0,
                        s = 0;
                    return t = e.event.fix(n), t.type = "mousewheel", n.wheelDelta && (r = n.wheelDelta / 120), n.detail && (r = -n.detail / 3), s = r, void 0 !== n.axis && n.axis === n.HORIZONTAL_AXIS && (s = 0, i = -1 * r), void 0 !== n.wheelDeltaY && (s = n.wheelDeltaY / 120), void 0 !== n.wheelDeltaX && (i = -1 * n.wheelDeltaX / 120), o.unshift(t, r, i, s), (e.event.dispatch || e.event.handle).apply(this, o)
                //}
            }
        var n = ["DOMMouseScroll", "mousewheel"];
        if (e.event.fixHooks)
            for (var o = n.length; o;) e.event.fixHooks[n[--o]] = e.event.mouseHooks;
        e.event.special.mousewheel = {
            setup: function() {
                if (this.addEventListener)
                    for (var e = n.length; e;) this.addEventListener(n[--e], t, !1);
                else this.onmousewheel = t
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var e = n.length; e;) this.removeEventListener(n[--e], t, !1);
                else this.onmousewheel = null
            }
        }, e.fn.extend({
            mousewheel: function(e) {
                return e ? this.on("mousewheel", e) : this.trigger("mousewheel")
            },
            unmousewheel: function(e) {
                return this.off("mousewheel", e)
            }
        })
    }(jQuery), _globalfwrContextMenuIgnoreHide = !1,
    function(e) {
        var t, n, o = function(t, n, o) {
                var r = e(o),
                    i = o.innerHeight ? o.innerHeight : r.height(),
                    s = r.offset();
                return {
                    width: t - e(o).width() - e(o).scrollLeft() - s.left,
                    height: n - i - e(o).scrollTop() - s.top
                }
            },
            r = function(o) {
                if (n[t.activeId].currentHover) {
                    var r = o ? n[t.activeId].currentHover.nextAll(":not(." + n[t.activeId].separatorClass + "):visible:first") : n[t.activeId].currentHover.prevAll(":not(." + n[t.activeId].separatorClass + "):visible:first");
                    0 == r.length && (r = n[t.activeId].currentHover.parent().find("> li:visible"), r = e(o ? r[0] : r[r.length - 1])), r.mouseover()
                } else {
                    var i = e("#" + t.activeId + ", #" + t.activeId + " ul").filter(function() {
                        return e(this).is(":visible") && 0 == e(this).parents(":hidden").length
                    });
                    if (i.length > 0) {
                        var s = e(i[i.length - 1]).find("> li:visible");
                        e(s[o ? 0 : s.length - 1]).mouseover()
                    }
                }
            },
            i = function() {
                for (cm in n) e(n[cm].allContext).removeClass(t.activeClass)
            },
            s = function() {
                t.activeId && e("#" + t.activeId).add("#" + t.activeId + " ul").hide(), clearInterval(t.keyUpDown), t.keyUpDownStop = !1, n[t.activeId] && (n[t.activeId].currentHover = null), t.activeId = null, e(document).off(".fwrContextMenu"), e(window).off("resize.fwrContextMenu")
            },
            a = function(o) {
                return t.activeId && n[t.activeId].onHide && 0 == n[t.activeId].onHide.apply(e("#" + t.activeId), [o, n[t.activeId].context]) ? !1 : (i(), void s())
            };
        e.fn.fwrContextMenu = function(u, l, c) {
            var f = c || window;
            t || (t = {}), n || (n = {}), l && l.menuClass && (t.menuClass = l.menuClass), t.menuClass || (t.menuClass = "fwrContextMenu"), l && l.activeClass && (t.activeClass = l.activeClass), t.activeClass || (t.activeClass = "active"), n[u] = e.extend({
                hoverClass: "hover",
                submenuClass: "submenu",
                separatorClass: "separator",
                operaEvent: "ctrl+click",
                fadeIn: 200,
                delay: 300,
                keyDelay: 100,
                widthOverflowOffset: 0,
                heightOverflowOffset: 0,
                submenuLeftOffset: 0,
                submenuTopOffset: 0,
                autoAddSubmenuArrows: !0,
                startLeftOffset: 0,
                startTopOffset: 0,
                keyboard: !0
            }, l || {}), n[u].allContext = this.selector, e("#" + u).find("li")[n[u].livequery ? "expire" : "unbind"](".fwrContextMenu")[n[u].livequery ? "livequery" : "bind"]("mouseover.fwrContextMenu", function(t) {
                var r = n[u].currentHover = e(this);
                clearTimeout(n[u].show), clearTimeout(n[u].hide), e("#" + u).find("*").removeClass(n[u].hoverClass);
                var i = r.parents("li");
                r.add(r.find("> *")).add(i).add(i.find("> *")).addClass(n[u].hoverClass);
                var s = !0;
                if (n[u].onHover && 0 == n[u].onHover.apply(this, [t, n[u].context]) && (s = !1), !n[u].proceed) return n[u].show = setTimeout(function() {
                    n[u].proceed = !0, r.mouseover()
                }, n[u].delay), !1;
                if (n[u].proceed = !1, r.parent().find("ul").not(r.find("> ul")).hide(), !s) return t.preventDefault(), !1;
                var a = r.find("> ul");
                if (0 != a.length) {
                    var l = r.offset(),
                        c = o(l.left + r.parent().width() + n[u].submenuLeftOffset + a.width() + n[u].widthOverflowOffset, l.top + n[u].submenuTopOffset + a.height() + n[u].heightOverflowOffset, f),
                        d = a.parent().parent().width(),
                        p = l.top - r.parent().offset().top;
                    a.css({
                        left: c.width > 0 && !n[u].ignoreWidthOverflow ? -d - n[u].submenuLeftOffset + "px" : d + n[u].submenuLeftOffset + "px",
                        top: c.height > 0 && !n[u].ignoreHeightOverflow ? p - c.height + n[u].submenuTopOffset + "px" : p + n[u].submenuTopOffset + "px"
                    }), a.fadeIn(n[u].fadeIn)
                }
                t.stopPropagation()
            })[n[u].livequery ? "livequery" : "bind"]("click.fwrContextMenu touchstart.fwrContextMenu", function(o) {
                if (n[u].onSelect) {
                    if (0 == n[u].onSelect.apply(this, [o, n[u].context])) return !1;
                    o.preventDefault()
                }
                s(), e(n[u].context).removeClass(t.activeClass), o.stopPropagation()
            });
            var d = document.createElement("div");
            d.setAttribute("oncontextmenu", "");
            var p = n[u].event;
            if (p ? p += ".fwrContextMenu" : p = "undefined" != typeof d.oncontextmenu ? "contextmenu.fwrContextMenu" : n[u].operaEvent + ".fwrContextMenu", -1 != p.indexOf("+")) {
                var h = p.split("+", 2);
                n[u].modifier = h[0] + "Key", p = h[1]
            }
            return this[n[u].livequery ? "livequery" : "bind"](p, function(l, c) {
                if ("string" != typeof n[u].modifier || l[n[u].modifier]) {
                    "undefined" == typeof l.pageX && (l = c), n[u].context = this;
                    var d, p, h = e("#" + u);
                    if (n[u].openBelowContext) {
                        var m = e(this).offset();
                        d = m.left, p = m.top + e(this).outerHeight()
                    } else d = l.pageX, p = l.pageY;
                    d += n[u].startLeftOffset, p += n[u].startTopOffset;
                    var g = o(d + h.width() + n[u].widthOverflowOffset, p + h.height() + n[u].heightOverflowOffset, f);
                    return !n[u].ignoreWidthOverflow && g.width > 0 && (d -= g.width), !n[u].openBelowContext && !n[u].ignoreHeightOverflow && g.height > 0 && (p -= g.height), n[u].onShow && 0 == n[u].onShow.apply(h, [l, n[u].context, d, p]) ? !1 : (s(), t.activeId = u, e("#" + t.activeId).add("#" + t.activeId + " ul").hide(), i(), e(n[u].context).addClass(t.activeClass), h.find("li, li > *").removeClass(n[u].hoverClass), n[u].autoAddSubmenuArrows && (h.find("li:has(ul)").not(":has(span." + n[u].submenuClass + ")").prepend('<span class="' + n[u].submenuClass + '"></span>'), h.find("li").not(":has(ul)").find("> span." + n[u].submenuClass).remove()), h.css({
                        left: d + "px",
                        top: p + "px"
                    }).fadeIn(n[u].fadeIn), n[u].openBelowContext && e(window).on("resize.fwrContextMenu", function() {
                        e("#" + u).css("left", e(n[u].context).offset().left + n[u].startLeftOffset + "px")
                    }), e(document).on("mouseover.fwrContextMenu", function(o) {
                        if (e(o.relatedTarget).parents("#" + u).length > 0) {
                            clearTimeout(n[u].show);
                            var r = e(o.relatedTarget).parent().find("li");
                            r.add(r.find("> *")).removeClass(n[u].hoverClass), n[t.activeId].currentHover = null, n[u].hide = setTimeout(function() {
                                r.find("ul").hide(), n[u].autoHide && a(o)
                            }, n[u].delay)
                        }
                    }).on("click.fwrContextMenu touchstart.fwrContextMenu", function(e) {
                        _globalfwrContextMenuIgnoreHide || a(e), _globalfwrContextMenuIgnoreHide = !1
                    }), n[u].keyboard && e(document).on("keydown.fwrContextMenu", function(o) {
                        switch (o.which) {
                            case 38:
                                return t.keyUpDownStop ? !1 : (r(), t.keyUpDown = setInterval(r, n[t.activeId].keyDelay), t.keyUpDownStop = !0, !1);
                            case 39:
                                if (n[t.activeId].currentHover) n[t.activeId].currentHover.find("ul:visible:first li:visible:first").mouseover();
                                else {
                                    var i = e("#" + t.activeId + ", #" + t.activeId + " ul:visible");
                                    i.length > 0 && e(i[i.length - 1]).find(":visible:first").mouseover()
                                }
                                return !1;
                            case 40:
                                return t.keyUpDownStop ? !1 : (r(!0), t.keyUpDown = setInterval(function() {
                                    r(!0)
                                }, n[t.activeId].keyDelay), t.keyUpDownStop = !0, !1);
                            case 37:
                                if (n[t.activeId].currentHover) e(n[t.activeId].currentHover.parents("li")[0]).mouseover();
                                else {
                                    var s = e("#" + t.activeId + " li." + n[t.activeId].hoverClass);
                                    s.length > 0 && e(s[s.length - 1]).mouseover()
                                }
                                return !1;
                            case 13:
                                n[t.activeId].currentHover ? n[t.activeId].currentHover.click() : a(o);
                                break;
                            case 27:
                                a(o)
                        }
                    }).on("keyup.fwrContextMenu", function(e) {
                        clearInterval(t.keyUpDown), t.keyUpDownStop = !1
                    }), !1)
                }
            })
        }, e.fn.nofwrContextMenu = function() {
            this.off(".fwrContextMenu")
        }, e.fn.hidden = function() {
            a()
        }
    }(jQuery),
    function(e, t, n) {
        e.fn.fwrJScrollPane = function(t) {
            function o(t, o) {
                function r(o) {
                    var s, u, c, f, d, m, g = !1,
                        v = !1;
                    if (W = o, J === n) d = t.scrollTop(), m = t.scrollLeft(), t.css({
                        overflow: "hidden",
                        padding: 0
                    }), z = t.innerWidth() + we, U = t.innerHeight(), t.width(z), J = e('<div class="fwrJspPane" />').css("padding", be).append(t.children()), R = WebPDF.Environment.ie || WebPDF.Environment.edge || WebPDF.Environment.ieAtLeast11 ? e('<div class="fwrJspContainer-ie" />').css({
                        width: z + "px",
                        height: U + "px"
                    }).append(J).appendTo(t) : e('<div class="fwrJspContainer" />').css({
                        width: z + "px",
                        height: U + "px"
                    }).append(J).appendTo(t);
                    else {
                        if (g = W.stickToBottom && S(), v = W.stickToRight && O(), f = t.innerWidth() + we != z || t.outerHeight() != U, f && (z = t.innerWidth() + we, U = t.innerHeight(), R.css({
                                width: z + "px",
                                height: U + "px"
                            })), !f && ye == X && !o.contentHeight && J.outerHeight() == q) return void t.width(z);
                        ye = X, J.css("width", ""), t.width(z), R.find(">.fwrJspVerticalBar,>.fwrJspHorizontalBar").remove().end()
                    }
                    J.css("overflow", "auto"), X = o.contentWidth ? o.contentWidth : J[0].scrollWidth, q = o.contentHeight ? o.contentHeight : J[0].scrollHeight, J.css("overflow", ""), Y = X / z, G = q / U, V = G > 1, K = Y > 1, K || V ? (t.addClass("jspScrollable"), s = W.maintainPosition && (ee || oe), s && (u = T(), c = N()), i(), a(), l(), s && (C(v ? X - z : u, !1), k(g ? q - U : c, !1)), P(), _(), F(), W.enableKeyboardNavigation && L(), W.clickOnTrack && p(), H(), W.hijackInternalLinks && E()) : (t.removeClass("jspScrollable"), J.css({
                        top: 0,
                        width: R.width() - we
                    }), D(), A(), M(), h()), W.autoReinitialise && !ve ? ve = setInterval(function() {
                        r(W)
                    }, W.autoReinitialiseDelay) : !W.autoReinitialise && ve && clearInterval(ve), d && t.scrollTop(0) && k(d, !1), m && t.scrollLeft(0) && C(m, !1), t.trigger("jsp-initialised", [K || V])
                }

                function i() {
                    V && (R.append(e('<div class="fwrJspVerticalBar" />').append(e('<div class="fwrJspCap fwrJspCapTop" />'), e('<div class="fwrJspTrack" />').append(e('<div class="fwrJspDrag" />').append(e('<div class="fwrJspDragTop" />'), e('<div class="fwrJspDragBottom" />'))), e('<div class="fwrJspCap fwrJspCapBottom" />'))), re = R.find(">.fwrJspVerticalBar"), ie = re.find(">.fwrJspTrack"), Q = ie.find(">.fwrJspDrag"), W.showArrows && (le = e('<a class="fwrJspArrow fwrJspArrowUp" />').on("mousedown.jsp", f(0, -1)).on("click.jsp", I), ce = e('<a class="fwrJspArrow fwrJspArrowDown" />').on("mousedown.jsp", f(0, 1)).on("click.jsp", I), W.arrowScrollOnHover && (le.on("mouseover.jsp", f(0, -1, le)), ce.on("mouseover.jsp", f(0, 1, ce))), c(ie, W.verticalArrowPositions, le, ce)), ae = U, R.find(">.fwrJspVerticalBar>.fwrJspCap:visible,>.fwrJspVerticalBar>.fwrJspArrow").each(function() {
                        ae -= e(this).outerHeight()
                    }), Q.hover(function() {
                        Q.addClass("jspHover")
                    }, function() {
                        Q.removeClass("jspHover")
                    }).on("mousedown.jsp", function(t) {
                        e("html").on("dragstart.jsp selectstart.jsp", I), Q.addClass("jspActive");
                        var n = t.pageY - Q.position().top;
                        return e("html").on("mousemove.jsp", function(e) {
                            g(e.pageY - n, !1)
                        }).on("mouseup.jsp mouseleave.jsp", m), !1
                    }), s())
                }

                function s() {
                    ie.height(ae + "px"), ee = 0, se = W.verticalGutter + ie.outerWidth(), J.width(z - se - we);
                    try {
                        0 === re.position().left && J.css("margin-left", se + "px")
                    } catch (e) {}
                }

                function a() {
                    W.disableHorizontalScroll || K && (R.append(e('<div class="fwrJspHorizontalBar" />').append(e('<div class="fwrJspCap fwrJspCapLeft" />'), e('<div class="fwrJspTrack" />').append(e('<div class="fwrJspDrag" />').append(e('<div class="fwrJspDragLeft" />'), e('<div class="fwrJspDragRight" />'))), e('<div class="fwrJspCap fwrJspCapRight" />'))), fe = R.find(">.fwrJspHorizontalBar"), de = fe.find(">.fwrJspTrack"), te = de.find(">.fwrJspDrag"), W.showArrows && (me = e('<a class="fwrJspArrow fwrJspArrowLeft" />').on("mousedown.jsp", f(-1, 0)).on("click.jsp", I), ge = e('<a class="fwrJspArrow fwrJspArrowRight" />').on("mousedown.jsp", f(1, 0)).on("click.jsp", I), W.arrowScrollOnHover && (me.on("mouseover.jsp", f(-1, 0, me)), ge.on("mouseover.jsp", f(1, 0, ge))), c(de, W.horizontalArrowPositions, me, ge)), te.hover(function() {
                        te.addClass("jspHover")
                    }, function() {
                        te.removeClass("jspHover")
                    }).on("mousedown.jsp", function(t) {
                        e("html").on("dragstart.jsp selectstart.jsp", I), te.addClass("jspActive");
                        var n = t.pageX - te.position().left;
                        return e("html").on("mousemove.jsp", function(e) {
                            b(e.pageX - n, !1)
                        }).on("mouseup.jsp mouseleave.jsp", m), !1
                    }), pe = R.innerWidth(), u())
                }

                function u() {
                    R.find(">.fwrJspHorizontalBar>.fwrJspCap:visible,>.fwrJspHorizontalBar>.fwrJspArrow").each(function() {
                        pe -= e(this).outerWidth()
                    }), de.width(pe + "px"), oe = 0
                }

                function l() {
                    if (W.disableHorizontalScroll && (K = !1), K && V) {
                        var t = de.outerHeight(),
                            n = ie.outerWidth();
                        ae -= t, e(fe).find(">.fwrJspCap:visible,>.fwrJspArrow").each(function() {
                            pe += e(this).outerWidth()
                        }), pe -= n, U -= n, z -= t, de.parent().append(e('<div class="fwrJspCorner" />').css("width", t + "px")), s(), u()
                    }
                    K && J.width(R.outerWidth() - we + "px"), q = W.contentHeight ? W.contentHeight : J.outerHeight(), G = q / U, K && (he = Math.ceil(1 / Y * pe), he > W.horizontalDragMaxWidth ? he = W.horizontalDragMaxWidth : he < W.horizontalDragMinWidth && (he = W.horizontalDragMinWidth), te.width(he + "px"), ne = pe - he, w(oe)), V && (ue = Math.ceil(1 / G * ae), ue > W.verticalDragMaxHeight ? ue = W.verticalDragMaxHeight : ue < W.verticalDragMinHeight && (ue = W.verticalDragMinHeight), Q.height(ue + "px"), Z = ae - ue, v(ee))
                }

                function c(e, t, n, o) {
                    var r, i = "before",
                        s = "after";
                    "os" == t && (t = /Mac/.test(navigator.platform) ? "after" : "split"), t == i ? s = t : t == s && (i = t, r = n, n = o, o = r), e[i](n)[s](o)
                }

                function f(e, t, n) {
                    return function() {
                        return d(e, t, this, n), this.blur(), !1
                    }
                }

                function d(t, n, o, r) {
                    o = e(o).addClass("jspActive");
                    var i, s, a = !0,
                        u = function() {
                            0 !== t && xe.scrollByX(t * W.arrowButtonSpeed), 0 !== n && xe.scrollByY(n * W.arrowButtonSpeed), s = setTimeout(u, a ? W.initialDelay : W.arrowRepeatFreq), a = !1
                        };
                    u(), i = r ? "mouseout.jsp" : "mouseup.jsp", r = r || e("html"), r.on(i, function() {
                        o.removeClass("jspActive"), s && clearTimeout(s), s = null, r.off(i)
                    })
                }

                function p() {
                    if (h(), V) {
                        var t = function(t, o, r) {
                                if (t.originalTarget === n || t.originalTarget == t.currentTarget) {
                                    var i = e(this);
                                    null != r && (i = r);
                                    var s, a = i.offset(),
                                        u = t.pageY - a.top - ee,
                                        l = !0,
                                        c = function() {
                                            var e = i.offset(),
                                                n = t.pageY - e.top - ue / 2,
                                                r = U * W.scrollPagePercent,
                                                a = Z * r / (q - U);
                                            if (0 > u) ee - a > n ? xe.scrollByY(-r) : g(n);
                                            else {
                                                if (!(u > 0)) return void f();
                                                n > ee + a ? xe.scrollByY(r) : g(n)
                                            }(null == o || 0 == o) && (s = setTimeout(c, l ? W.initialDelay : W.trackClickRepeatFreq)), l = !1
                                        },
                                        f = function() {
                                            s && clearTimeout(s), s = null, e(document).off("mouseup.jsp", f)
                                        };
                                    return c(), e(document).on("mouseup.jsp", f), !1
                                }
                            },
                            o = function(n) {
                                t(n, !0, e(this))
                            },
                            r = navigator.userAgent.toLowerCase();
                        if (/msie/.test(r) && !/opera/.test(r)) {
                            var i = parseFloat(r.match(/msie (\d+)/)[1]),
                                s = 7 == i && !document.documentMode || 7 == document.documentMode,
                                a = 8 == document.documentMode;
                            (s || a) && ie.on("dblclick", o)
                        }
                        ie.on("mousedown.jsp", t)
                    }
                    if (K) {
                        var u = function(t, o, r) {
                                if (t.originalTarget === n || t.originalTarget == t.currentTarget) {
                                    var i = e(this);
                                    null != r && (i = r);
                                    var s, a = i.offset(),
                                        u = t.pageX - a.left - oe,
                                        l = !0,
                                        c = function() {
                                            var e = i.offset(),
                                                n = t.pageX - e.left - he / 2,
                                                r = z * W.scrollPagePercent,
                                                a = ne * r / (X - z);
                                            if (0 > u) oe - a > n ? xe.scrollByX(-r) : b(n);
                                            else {
                                                if (!(u > 0)) return void f();
                                                n > oe + a ? xe.scrollByX(r) : b(n)
                                            }(null == o || 0 == o) && (s = setTimeout(c, l ? W.initialDelay : W.trackClickRepeatFreq)), l = !1
                                        },
                                        f = function() {
                                            s && clearTimeout(s), s = null, e(document).off("mouseup.jsp", f)
                                        };
                                    return c(), e(document).on("mouseup.jsp", f), !1
                                }
                            },
                            l = function(t) {
                                u(t, !0, e(this))
                            },
                            r = navigator.userAgent.toLowerCase();
                        if (/msie/.test(r) && !/opera/.test(r)) {
                            var i = parseFloat(r.match(/msie (\d+)/)[1]),
                                s = 7 == i && !document.documentMode || 7 == document.documentMode,
                                a = 8 == document.documentMode;
                            (s || a) && de.on("dblclick", l)
                        }
                        de.on("mousedown.jsp", u)
                    }
                }

                function h() {
                    de && de.off("mousedown.jsp"), ie && ie.off("mousedown.jsp")
                }

                function m() {
                    e("html").off("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"), Q && Q.removeClass("jspActive"), te && te.removeClass("jspActive")
                }

                function g(e, t) {
                    V && (0 > e ? e = 0 : e > Z && (e = Z), t === n && (t = W.animateScroll), t ? xe.animate(Q, "top", e, v) : (Q.css("top", e), v(e)))
                }

                function v(e) {
                    e === n && (e = Q.position().top), R.scrollTop(0), ee = e;
                    var o = 0 === ee,
                        r = ee == Z,
                        i = 1;
                    0 != Z && (i = e / Z);
                    var s = -i * (q - U);
                    (ke != o || je != r) && (ke = o, je = r, t.trigger("jsp-arrow-change", [ke, je, Ce, Te])), y(o, r), J.css("top", s), t.trigger("jsp-scroll-y", [-s, o, r]).trigger("scroll")
                }

                function b(e, t) {
                    K && (0 > e ? e = 0 : e > ne && (e = ne), t === n && (t = W.animateScroll), t ? xe.animate(te, "left", e, w) : (te.css("left", e), w(e)))
                }

                function w(e) {
                    e === n && (e = te.position().left), R.scrollTop(0), oe = e;
                    var o = 0 === oe,
                        r = oe == ne,
                        i = 1;
                    0 != ne && (i = e / ne);
                    var s = -i * (X - z);
                    (Ce != o || Te != r) && (Ce = o, Te = r, t.trigger("jsp-arrow-change", [ke, je, Ce, Te])), x(o, r), J.css("left", s), t.trigger("jsp-scroll-x", [-s, o, r]).trigger("scroll")
                }

                function y(e, t) {
                    W.showArrows && (le[e ? "addClass" : "removeClass"]("jspDisabled"), ce[t ? "addClass" : "removeClass"]("jspDisabled"))
                }

                function x(e, t) {
                    W.showArrows && (me[e ? "addClass" : "removeClass"]("jspDisabled"), ge[t ? "addClass" : "removeClass"]("jspDisabled"))
                }

                function k(e, t) {
                    var n = e / (q - U);
                    g(n * Z, t)
                }

                function C(e, t) {
                    var n = e / (X - z);
                    b(n * ne, t)
                }

                function j(t, n, o) {
                    var r, i, s, a, u, l, c, f, d, p = 0,
                        h = 0,
                        m = arguments[3] ? arguments[3] : 0;
                    try {
                        r = e(t)
                    } catch (g) {
                        return
                    }
                    for (i = r.outerHeight(), s = r.outerWidth(), R.scrollTop(0), R.scrollLeft(0); !r.is(".fwrJspPane");)
                        if (p += r.position().top, h += r.position().left, r = r.offsetParent(), /^body|html$/i.test(r[0].nodeName)) return;
                    a = N(), l = a + U, a > p || n ? f = p - W.verticalGutter : p + i > l && (f = p - U + i + W.verticalGutter), f && k(f + m, o), u = T(), c = u + z, u > h || n ? d = h - W.horizontalGutter : h + s > c && (d = h - z + s + W.horizontalGutter), d && C(d, o)
                }

                function T() {
                    return -J.position().left
                }

                function N() {
                    return -J.position().top
                }

                function S() {
                    var e = q - U;
                    return e > 20 && e - N() < 10
                }

                function O() {
                    var e = X - z;
                    return e > 20 && e - T() < 10
                }

                function _() {
                    R.off(Se).on(Se, function(t, n, o, r) {
                        var i = null != e(t.target).prop("type") ? e(t.target).prop("type").toLowerCase() : "";
                        if ("text" == i || "textarea" == i || t.target.isContentEditable) return !0;
                        var s = oe,
                            a = ee;
                        return xe.scrollBy(o * W.mouseWheelSpeed, -r * W.mouseWheelSpeed, !1), s == oe && a == ee
                    })
                }

                function D() {
                    R.off(Se)
                }

                function I() {
                    return !1
                }

                function P() {
                    J.find(":input,a").off("focus.jsp").on("focus.jsp", function(e) {
                        j(e.target, !1)
                    })
                }

                function A() {
                    J.find(":input,a").off("focus.jsp")
                }

                function L() {
                    function n() {
                        var e = oe,
                            t = ee;
                        if (null != W.keyDownCallback[o] && "function" == typeof W.keyDownCallback[o]) W.keyDownCallback[o]();
                        else switch (o) {
                            case 40:
                                xe.scrollByY(W.keyboardSpeed, !1);
                                break;
                            case 38:
                                xe.scrollByY(-W.keyboardSpeed, !1);
                                break;
                            case 34:
                            case 32:
                                xe.scrollByY(U * W.scrollPagePercent, !1);
                                break;
                            case 33:
                                xe.scrollByY(-U * W.scrollPagePercent, !1);
                                break;
                            case 39:
                                xe.scrollByX(W.keyboardSpeed, !1);
                                break;
                            case 37:
                                xe.scrollByX(-W.keyboardSpeed, !1);
                                break;
                            case 35:
                                k(q - U);
                                break;
                            case 36:
                                k(0)
                        }
                        return r = e != oe || t != ee
                    }
                    var o, r, i = [];
                    K && i.push(fe[0]), V && i.push(re[0]), J.focus(function() {
                        t.focus()
                    }), t.attr("tabindex", 0).off("keydown.jsp keypress.jsp").on("keydown.jsp", function(t) {
                        var i = null != e(t.target).prop("type") ? e(t.target).prop("type").toLowerCase() : "";
                        if ("text" == i || "textarea" == i || t.target.isContentEditable) return !0;
                        var s = oe,
                            a = ee;
                        switch (t.keyCode) {
                            case 40:
                            case 38:
                            case 32:
                                o = t.keyCode, n();
                                break;
                            case 34:
                            case 33:
                            case 39:
                            case 37:
                            case 35:
                            case 36:
                                o = t.keyCode, n(), o = null
                        }
                        return r = t.keyCode == o && s != oe || a != ee, !r
                    }).on("keypress.jsp", function(t) {
                        var i = null != e(t.target).prop("type") ? e(t.target).prop("type").toLowerCase() : "";
                        return "text" == i || "textarea" == i || t.target.isContentEditable ? !0 : (t.keyCode == o && n(), !r)
                    }), W.hideFocus ? (t.css("outline", "none"), "hideFocus" in R[0] && t.attr("hideFocus", !0)) : (t.css("outline", ""), "hideFocus" in R[0] && t.attr("hideFocus", !1))
                }

                function M() {
                    t.attr("tabindex", "-1").removeAttr("tabindex").off("keydown.jsp keypress.jsp")
                }

                function H() {
                    if (location.hash && location.hash.length > 1) {
                        var t, n, o = escape(location.hash);
                        try {
                            t = e(o)
                        } catch (r) {
                            return
                        }
                        t.length && J.find(o) && (0 === R.scrollTop() ? n = setInterval(function() {
                            R.scrollTop() > 0 && (j(o, !0), e(document).scrollTop(R.position().top), clearInterval(n))
                        }, 50) : (j(o, !0), e(document).scrollTop(R.position().top)))
                    }
                }

                function $() {
                    e("a.jspHijack").off("click.jsp-hijack").removeClass("jspHijack")
                }

                function E() {
                    $(), e("a[href^=#]").addClass("jspHijack").on("click.jsp-hijack", function() {
                        var e, t = this.href.split("#");
                        return t.length > 1 && (e = t[1], e.length > 0 && J.find("#" + e).length > 0) ? (j("#" + e, !0), !1) : void 0
                    })
                }

                function F() {
                    if (W.initTouchScreen) {
                        var e, t, n, o, r, i = !1;
                        R.off("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").on("touchstart.jsp", function(s) {
                            var a = s.originalEvent.touches[0];
                            e = T(), t = N(), n = a.pageX, o = a.pageY, r = !1, i = !0
                        }).on("touchmove.jsp", function(s) {
                            if (i) {
                                var a = s.originalEvent.touches[0],
                                    u = oe,
                                    l = ee;
                                return xe.scrollTo(e + n - a.pageX, t + o - a.pageY), r = r || Math.abs(n - a.pageX) > 5 || Math.abs(o - a.pageY) > 5, u == oe && l == ee
                            }
                        }).on("touchend.jsp", function(e) {
                            i = !1
                        }).on("click.jsp-touchclick", function(e) {
                            return r ? (r = !1, !1) : void 0
                        })
                    }
                }

                function B() {
                    var e = N(),
                        n = T();
                    t.removeClass("jspScrollable").off(".jsp"), t.replaceWith(Ne.append(J.children())), Ne.scrollTop(e), Ne.scrollLeft(n)
                }
                var W, J, z, U, R, X, q, Y, G, V, K, Q, Z, ee, te, ne, oe, re, ie, se, ae, ue, le, ce, fe, de, pe, he, me, ge, ve, be, we, ye, xe = this,
                    ke = !0,
                    Ce = !0,
                    je = !1,
                    Te = !1,
                    Ne = t.clone(!1, !1).empty(),
                    Se = e.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp";
                be = t.css("paddingTop") + " " + t.css("paddingRight") + " " + t.css("paddingBottom") + " " + t.css("paddingLeft"), we = (parseInt(t.css("paddingLeft"), 10) || 0) + (parseInt(t.css("paddingRight"), 10) || 0), e.extend(xe, {
                    reinitialise: function(t) {
                        t = e.extend({}, W, t), r(t)
                    },
                    scrollToElement: function(e, t, n) {
                        var o = arguments[3] ? arguments[3] : 0;
                        j(e, t, n, o)
                    },
                    scrollTo: function(e, t, n) {
                        C(e, n), k(t, n)
                    },
                    scrollToX: function(e, t) {
                        C(e, t)
                    },
                    scrollToY: function(e, t) {
                        k(e, t)
                    },
                    scrollToPercentX: function(e, t) {
                        C(e * (X - z), t)
                    },
                    scrollToPercentY: function(e, t) {
                        k(e * (q - U), t)
                    },
                    scrollBy: function(e, t, n) {
                        xe.scrollByX(e, n), xe.scrollByY(t, n)
                    },
                    scrollByX: function(e, t) {
                        var n = T() + Math[0 > e ? "floor" : "ceil"](e),
                            o = n / (X - z);
                        b(o * ne, t)
                    },
                    scrollByY: function(e, t) {
                        var n = N() + Math[0 > e ? "floor" : "ceil"](e),
                            o = n / (q - U);
                        g(o * Z, t)
                    },
                    positionDragX: function(e, t) {
                        b(e, t)
                    },
                    positionDragY: function(e, t) {
                        g(e, t)
                    },
                    animate: function(e, t, n, o) {
                        var r = {};
                        r[t] = n, e.animate(r, {
                            duration: W.animateDuration,
                            easing: W.animateEase,
                            queue: !1,
                            step: o
                        })
                    },
                    getContentPositionX: function() {
                        return T()
                    },
                    getContentPositionY: function() {
                        return N()
                    },
                    getContentWidth: function() {
                        return X
                    },
                    getContentHeight: function() {
                        return q
                    },
                    getPercentScrolledX: function() {
                        return T() / (X - z)
                    },
                    getPercentScrolledY: function() {
                        return N() / (q - U)
                    },
                    getIsScrollableH: function() {
                        return K
                    },
                    getIsScrollableV: function() {
                        return V
                    },
                    getScrollBarWidth: function() {
                        return xe.getIsScrollableV() ? W.verticalGutter + ie.outerWidth() : 0
                    },
                    getScrollBarHeight: function() {
                        return xe.getIsScrollableH() ? W.horizontalGutter + de.outerHeight() : 0
                    },
                    getContentPane: function() {
                        return J
                    },
                    scrollToBottom: function(e) {
                        g(Z, e)
                    },
                    hijackInternalLinks: function() {
                        E()
                    },
                    destroy: function() {
                        B()
                    }
                }), r(o)
            }
            return t = e.extend({}, e.fn.fwrJScrollPane.defaults, t), e.each(["mouseWheelSpeed", "arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function() {
                t[this] = t[this] || t.speed
            }), this.each(function() {
                var n = e(this),
                    r = n.data("jsp");
                r ? r.reinitialise(t) : (r = new o(n, t), n.data("jsp", r))
            })
        }, e.fn.fwrJScrollPane.defaults = {
            disableHorizontalScroll: !1,
            initTouchScreen: !1,
            showArrows: !1,
            maintainPosition: !0,
            stickToBottom: !1,
            stickToRight: !1,
            clickOnTrack: !0,
            autoReinitialise: !1,
            autoReinitialiseDelay: 500,
            verticalDragMinHeight: 5,
            verticalDragMaxHeight: 99999,
            horizontalDragMinWidth: 0,
            horizontalDragMaxWidth: 99999,
            contentWidth: n,
            contentHeight: n,
            animateScroll: !1,
            animateDuration: 300,
            animateEase: "linear",
            hijackInternalLinks: !1,
            verticalGutter: 4,
            horizontalGutter: 4,
            mouseWheelSpeed: 0,
            arrowButtonSpeed: 0,
            arrowRepeatFreq: 50,
            arrowScrollOnHover: !1,
            trackClickSpeed: 0,
            trackClickRepeatFreq: 70,
            verticalArrowPositions: "split",
            horizontalArrowPositions: "split",
            enableKeyboardNavigation: !0,
            hideFocus: !0,
            keyboardSpeed: 0,
            initialDelay: 300,
            speed: 30,
            scrollPagePercent: .8,
            keyDownCallback: {}
        }
    }(jQuery, this),
    function(e, t, n) {
        e.fn.WebPDFNativeScroll = function(t) {
            function o(t, o) {
                function r(o) {
                    l = t.innerWidth(), c = t.innerHeight(), a === n && (t.css({
                        overflow: "auto"
                    }), t.width(l), a = e('<div class="fwrJspPane" />').append(t.children()), u = WebPDF.Environment.ie || WebPDF.Environment.edge || WebPDF.Environment.ieAtLeast11 ? e('<div class="fwrJspContainer-ie" />').append(a).appendTo(t) : e('<div class="fwrJspContainer" />').append(a).appendTo(t));
                    var r = "",
                        i = "",
                        s = "";
                    o.contentHeight && (r = o.contentWidth > l ? o.contentWidth + "px" : l + "px", i = o.contentHeight + "px", s = "hidden"), a.css({
                        height: i,
                        width: r,
                        overflow: s
                    }), u.css({
                        height: i,
                        width: r,
                        overflow: s
                    })
                }

                function i() {
                    e.error("Unimplemented function for native scroll bar.");
                }
                var s, a, u, l, c, f = this;
                e.extend(f, {
                    reinitialise: function(t) {
                        s = e.extend({}, s, t), r(s)
                    },
                    scrollToElement: function(e, n, o, r) {
                        var i = null;
                        t.scrollLeft(0), t.scrollTop(0), i = jQuery(e).position();
                        var s = i.top;
                        r && (s += r), f.scrollBy(i.left, s)
                    },
                    scrollTo: function(e, n, o) {
                        t.scrollLeft(e), t.scrollTop(n)
                    },
                    scrollToX: function(e, n) {
                        t.scrollLeft(e)
                    },
                    scrollToY: function(e, n) {
                        t.css({
                            top: -e
                        })
                    },
                    scrollToPercentX: function(e, t) {
                        i()
                    },
                    scrollToPercentY: function(e, t) {
                        i()
                    },
                    scrollBy: function(e, t, n) {
                        f.scrollByX(e, n), f.scrollByY(t, n)
                    },
                    scrollByX: function(e, n) {
                        t.scrollLeft() <= 0 && 0 > e && (e = 0), t.scrollLeft(t.scrollLeft() + e)
                    },
                    scrollByY: function(e, n) {
                        t.scrollTop() <= 0 && 0 > e && (e = 0), t.scrollTop(t.scrollTop() + e)
                    },
                    positionDragX: function(e, t) {
                        i()
                    },
                    positionDragY: function(e, t) {
                        i()
                    },
                    animate: function(e, t, n, o) {
                        i()
                    },
                    getContentPositionX: function() {
                        return t.scrollLeft()
                    },
                    getContentPositionY: function() {
                        return t.scrollTop()
                    },
                    getContentWidth: function() {
                        return t.width()
                    },
                    getContentHeight: function() {
                        return t.height()
                    },
                    getPercentScrolledX: function() {
                        i()
                    },
                    getPercentScrolledY: function() {
                        i()
                    },
                    getIsScrollableH: function() {
                        return f.getScrollBarHeight() > 0
                    },
                    getIsScrollableV: function() {
                        return f.getScrollBarWidth() > 0
                    },
                    getScrollBarWidth: function() {
                        return t[0].offsetWidth - t[0].clientWidth
                    },
                    getScrollBarHeight: function() {
                        return t[0].offsetHeight - t[0].clientHeight
                    },
                    getContentPane: function() {
                        return t
                    },
                    scrollToBottom: function(e) {
                        i()
                    },
                    hijackInternalLinks: function() {
                        i()
                    },
                    destroy: function() {
                        i()
                    }
                })
            }
            return this.each(function() {
                var n = e(this),
                    r = n.data("jsp");
                r ? r.reinitialise(t) : (r = new o(n, t), n.data("jsp", r))
            })
        }
    }(jQuery, this), window.WebPDFTools = window.WebPDFTools || {}, WebPDFTools.Node = function(e, t, n, o, r, i, s, a, u) {
        this.id = e, this.pid = t, this.name = n, this.url = o, this.title = r, this.target = i, this.icon = s, this.iconOpen = a, this._io = u || !1, this._is = !1, this._ls = !1, this._hc = !1, this._ai = 0, this._hidden = !1, this._bTop = !1
    }, WebPDFTools.dTree = function(e, t, n, o) {
        this.config = {
            showroot: !1,
            target: null,
            folderLinks: !0,
            useSelection: !0,
            useCookies: !0,
            useLines: !0,
            useIcons: !0,
            useStatusText: !1,
            closeSameLevel: !1,
            inOrder: !1
        }, this.icon = o, this.obj = e, this.extNodeClass = t, this.extPlusItemClass = n, this.aNodes = [], this.aIndent = [], this.root = new WebPDFTools.Node(-1), this.selectedNode = null, this.selectedFound = !1, this.completed = !1, this.bSetTop = !1, this.curID = -1
    }, WebPDFTools.dTree.prototype.add = function(e, t, n, o, r, i, s, a, u) {
        this.aNodes[this.aNodes.length] = new WebPDFTools.Node(e, t, n, o, r, i, s, a, u)
    }, WebPDFTools.dTree.prototype.openAll = function() {
        this.oAll(!0)
    }, WebPDFTools.dTree.prototype.closeAll = function() {
        this.oAll(!1)
    }, WebPDFTools.dTree.prototype.toString = function() {
        var e = '<div class="fwr-dtree">\n';
        return document.getElementById ? (this.config.useCookies && (this.selectedNode = this.getSelected()), e += this.addNode(this.root)) : e += "Browser not supported.", e += "</div>", this.selectedFound || (this.selectedNode = null), this.completed = !0, e
    }, WebPDFTools.dTree.prototype.addNode = function(e) {
        var t = "",
            n = 0;
        for (this.config.inOrder && (n = e._ai), n; n < this.aNodes.length; n++)
            if (this.aNodes[n].pid == e.id) {
                var o = this.aNodes[n];
                if (o._p = e, o._ai = n, this.setCS(o), !o.target && this.config.target && (o.target = this.config.target), o._hc && !o._io && this.config.useCookies && (o._io = this.isOpen(o.id)), !this.config.folderLinks && o._hc && (o.url = null), this.config.useSelection && o.id == this.selectedNode && !this.selectedFound && (o._is = !0, this.selectedNode = n, this.selectedFound = !0), t += this.node(o, n), o._ls) break
            }
        return t
    }, WebPDFTools.dTree.prototype.node = function(e, t) {
        var n = '<div class="fwr-dTreeNode"';
        return this.root.id != e.pid || this.config.showroot || (n += "style='display:none'", e._hidden = !0), n += ">", n += this.indent(e, t), this.config.useIcons && (e.icon || (e.icon = this.root.id == e.pid ? this.icon.root : e._hc ? this.icon.folder : this.icon.node), e.iconOpen || (e.iconOpen = e._hc ? this.icon.folderOpen : this.icon.node), this.root.id == e.pid && (e.icon = this.icon.root, e.iconOpen = this.icon.root, this.config.showroot || (e._hidden = !0)), n += '<img id="i' + this.obj + t + '" src="' + (e._io ? e.iconOpen : e.icon) + '" alt="" class="' + this.extNodeClass + '" nodeId="' + t + '"/>'), e.url ? (n += '<a id="s' + this.obj + t + '" class="' + (this.config.useSelection && e._is ? "nodeSel" : "node") + '" href="' + e.url + '"', e.title && (n += ' title="' + e.title + '"'), e.target && (n += ' target="' + e.target + '"'), this.config.useStatusText && (n += " onmouseover=\"window.status='" + e.name + "';return true;\" onmouseout=\"window.status='';return true;\" "), this.config.useSelection && (e._hc && this.config.folderLinks || !e._hc) && (n += ' onclick="javascript: ' + this.obj + ".s(" + t + ');"'), n += ">") : n += this.config.folderLinks && e.url || !e._hc || e.pid == this.root.id ? '<a class="node ' + this.extNodeClass + '" nodeId="' + t + '">' : '<a id="s' + this.obj + t + '"" class="node ' + this.extNodeClass + '" nodeId="' + t + '">', n += "<span id='" + this.obj + t + "'title='" + e.name + "' class='" + this.extNodeClass + "' nodeId='" + t + "'>" + e.name + "</span>", n += "</a>", n += "</div>", e._hc && (n += '<div id="d' + this.obj + t + '" class="clip" style="display:' + (this.root.id == e.pid || e._io ? "block" : "none") + ';">', n += this.addNode(e), n += "</div>"), this.aIndent.pop(), n
    }, WebPDFTools.dTree.prototype.indent = function(e, t) {
        var n = "";
        if (this.root.id != e.pid) {
            this.config.showroot || 0 != this.bSetTop || (e._bTop = !0, this.bSetTop = !0);
            for (var o = 0; o < this.aIndent.length; o++) n += '<img src="' + (1 == this.aIndent[o] && this.config.useLines ? this.icon.line : this.icon.empty) + '" alt="" />';
            if (e._ls ? this.aIndent.push(0) : this.aIndent.push(1), e._hc) {
                var r = !this.config.showroot && e._bTop ? this.icon.minusTop : this.icon.minus,
                    i = !this.config.showroot && e._bTop ? this.icon.plusTop : this.icon.plus,
                    s = e._bTop == e._ls ? this.icon.minusOnly : this.icon.minusBottom,
                    a = e._bTop == e._ls ? this.icon.plusOnly : this.icon.plusBottom;
                n += '<a id="hc' + this.obj + t + '" class="' + this.extPlusItemClass + '" nodeId="' + t + '"><img id="j' + this.obj + t + '" class="' + this.extPlusItemClass + '" nodeId="' + t + '" src="', n += this.config.useLines ? e._io ? e._ls && this.config.useLines ? s : r : e._ls && this.config.useLines ? a : i : e._io ? this.icon.nlMinus : this.icon.nlPlus, n += '" alt="" /></a>'
            } else {
                var u = !this.config.showroot && e._bTop ? this.icon.joinTop : this.icon.join,
                    l = e._bTop == e._ls ? this.icon.joinonly : this.icon.joinBottom;
                n += '<img src="' + (this.config.useLines ? e._ls ? l : u : this.icon.empty) + '" alt="" />'
            }
        }
        return n
    }, WebPDFTools.dTree.prototype.setCS = function(e) {
        for (var t, n = 0; n < this.aNodes.length; n++) this.aNodes[n].pid == e.id && (e._hc = !0), this.aNodes[n].pid == e.pid && (t = this.aNodes[n].id);
        t != e.id || e._bTop || (e._ls = !0)
    }, WebPDFTools.dTree.prototype.getSelected = function() {
        var e = this.getCookie("cs" + this.obj);
        return e ? e : null
    }, WebPDFTools.dTree.prototype.s = function(e) {
        if (this.config.useSelection) {
            var t = this.aNodes[e];
            (!t._hc || this.config.folderLinks) && this.selectedNode != e && ((this.selectedNode || 0 == this.selectedNode) && (eOld = document.getElementById("s" + this.obj + this.selectedNode), eOld.className = "node"), eNew = document.getElementById("s" + this.obj + e), eNew.className = "nodeSel", this.selectedNode = e, this.config.useCookies && this.setCookie("cs" + this.obj, t.id))
        }
    }, WebPDFTools.dTree.prototype.setCurNode = function(e) {
        if (this.config.useIcons && this.curID != e) {
            var t = null;
            this.curID > -1 && (t = document.getElementById("i" + this.obj + this.curID), t.src = this.icon.node), this.curID = e;
            var t = document.getElementById("i" + this.obj + this.curID);
            t.src = this.icon.nodehot
        }
    }, WebPDFTools.dTree.prototype.o = function(e) {
        var t = this.aNodes[e];
        this.nodeStatus(!t._io, e, t._ls), t._io = !t._io, this.config.closeSameLevel && this.closeLevel(t), this.config.useCookies && this.updateCookie()
    }, WebPDFTools.dTree.prototype.oAll = function(e) {
        for (var t = 0; t < this.aNodes.length; t++) this.aNodes[t]._hc && this.aNodes[t].pid != this.root.id && (this.nodeStatus(e, t, this.aNodes[t]._ls), this.aNodes[t]._io = e);
        this.config.useCookies && this.updateCookie()
    }, WebPDFTools.dTree.prototype.openTo = function(e, t, n) {
        if (!n)
            for (var o = 0; o < this.aNodes.length; o++)
                if (this.aNodes[o].id == e) {
                    e = o;
                    break
                }
        var r = this.aNodes[e];
        r.pid != this.root.id && r._p && (r._io = !0, r._is = t, this.completed && r._hc && this.nodeStatus(!0, r._ai, r._ls), this.completed && t ? this.s(r._ai) : t && (this._sn = r._ai), this.openTo(r._p._ai, !1, !0))
    }, WebPDFTools.dTree.prototype.closeLevel = function(e) {
        for (var t = 0; t < this.aNodes.length; t++) this.aNodes[t].pid == e.pid && this.aNodes[t].id != e.id && this.aNodes[t]._hc && (this.nodeStatus(!1, t, this.aNodes[t]._ls), this.aNodes[t]._io = !1, this.closeAllChildren(this.aNodes[t]))
    }, WebPDFTools.dTree.prototype.closeAllChildren = function(e) {
        for (var t = 0; t < this.aNodes.length; t++) this.aNodes[t].pid == e.id && this.aNodes[t]._hc && (this.aNodes[t]._io && this.nodeStatus(!1, t, this.aNodes[t]._ls), this.aNodes[t]._io = !1, this.closeAllChildren(this.aNodes[t]))
    }, WebPDFTools.dTree.prototype.nodeStatus = function(e, t, n) {
        eDiv = document.getElementById("d" + this.obj + t), eJoin = document.getElementById("j" + this.obj + t);
        var o = this.aNodes[t]._bTop,
            r = !this.config.showroot && o ? this.icon.minusTop : this.icon.minus,
            i = !this.config.showroot && o ? this.icon.plusTop : this.icon.plus,
            s = o == n ? this.icon.minusOnly : this.icon.minusBottom,
            a = o == n ? this.icon.plusOnly : this.icon.plusBottom;
        eJoin.src = this.config.useLines ? e ? n ? s : r : n ? a : i : e ? this.icon.nlMinus : this.icon.nlPlus, eDiv.style.display = e ? "block" : "none"
    }, WebPDFTools.dTree.prototype.clearCookie = function() {
        var e = new Date,
            t = new Date(e.getTime() - 864e5);
        this.setCookie("co" + this.obj, "cookieValue", t), this.setCookie("cs" + this.obj, "cookieValue", t)
    }, WebPDFTools.dTree.prototype.setCookie = function(e, t, n, o, r, i) {
        document.cookie = escape(e) + "=" + escape(t) + (n ? "; expires=" + n.toGMTString() : "") + (o ? "; path=" + o : "") + (r ? "; domain=" + r : "") + (i ? "; secure" : "")
    }, WebPDFTools.dTree.prototype.getCookie = function(e) {
        var t = "",
            n = document.cookie.indexOf(escape(e) + "=");
        if (-1 != n) {
            var o = n + (escape(e) + "=").length,
                r = document.cookie.indexOf(";", o);
            t = -1 != r ? unescape(document.cookie.substring(o, r)) : unescape(document.cookie.substring(o))
        }
        return t
    }, WebPDFTools.dTree.prototype.updateCookie = function() {
        for (var e = "", t = 0; t < this.aNodes.length; t++) this.aNodes[t]._io && this.aNodes[t].pid != this.root.id && (e && (e += "."), e += this.aNodes[t].id);
        this.setCookie("co" + this.obj, e)
    }, WebPDFTools.dTree.prototype.isOpen = function(e) {
        for (var t = this.getCookie("co" + this.obj).split("."), n = 0; n < t.length; n++)
            if (t[n] == e) return !0;
        return !1
    }, Array.prototype.push || (Array.prototype.push = function() {
        for (var e = 0; e < arguments.length; e++) this[this.length] = arguments[e];
        return this.length
    }), Array.prototype.pop || (Array.prototype.pop = function() {
        return lastElement = this[this.length - 1], this.length = Math.max(this.length - 1, 0), lastElement
    }), ! function(e) {
        

        function t(e) {
            return function(t) {
                return this === t.target ? e.apply(this, arguments) : void 0
            }
        }
        var n = function(e, t) {
            this.init(e, t)
        };
        n.prototype = {
            constructor: n,
            init: function(t, n) {
                if (this.$element = e(t), this.options = e.extend({}, e.fn.webPDFModalManager.defaults, this.$element.data(), "object" == typeof n && n), this.stack = [], this.backdropCount = 0, this.options.resize) {
                    var o, r = this;
                    e(window).on("resize.webpdf-modal", function() {
                        o && clearTimeout(o), o = setTimeout(function() {
                            for (var e = 0; e < r.stack.length; e++) r.stack[e].isShown && r.stack[e].layout()
                        }, 10)
                    })
                }
            },
            createModal: function(t, n) {
                e(t).webpdf - modal(e.extend({
                    manager: this
                }, n))
            },
            appendModal: function(n) {
                this.stack.push(n);
                var o = this;
                n.$element.on("show.webpdf-modalmanager", t(function(t) {
                    var r = function() {
                        n.isShown = !0;
                        var t = !1;
                        o.$element.toggleClass("fwr-modal-open", o.hasOpenModal()).toggleClass("fwr-page-overflow", e(window).height() < o.$element.height()), n.$parent = n.$element.parent(), n.$container = o.createContainer(n), n.$element.appendTo(n.$container), o.backdrop(n, function() {
                            n.$element.show(), t && n.$element[0].offsetWidth, n.layout(), n.$element.addClass("fwr-in").attr("aria-hidden", !1);
                            var e = function() {
                                o.setFocus(), n.$element.trigger("shown")
                            };
                            e()
                        })
                    };
                    n.options.replace ? o.replace(r) : r()
                })), n.$element.on("hidden.webpdf-modalmanager", t(function(e) {
                    if (o.backdrop(n), n.$element.parent().length)
                        if (n.$backdrop) {
                            var t = !1;
                            t && n.$element[0].offsetWidth, n.destroy()
                        } else n.destroy();
                    else o.destroyModal(n)
                })), n.$element.on("destroyed.webpdf-modalmanager", t(function(e) {
                    o.destroyModal(n)
                }))
            },
            getOpenModals: function() {
                for (var e = [], t = 0; t < this.stack.length; t++) this.stack[t].isShown && e.push(this.stack[t]);
                return e
            },
            hasOpenModal: function() {
                return this.getOpenModals().length > 0
            },
            setFocus: function() {
                for (var e, t = 0; t < this.stack.length; t++) this.stack[t].isShown && (e = this.stack[t]);
                e && e.focus()
            },
            destroyModal: function(e) {
                e.$element.off(".webpdf-modalmanager"), e.$backdrop && this.removeBackdrop(e), this.stack.splice(this.getIndexOfModal(e), 1);
                var t = this.hasOpenModal();
                this.$element.toggleClass("fwr-modal-open", t), t || this.$element.removeClass("fwr-page-overflow"), this.removeContainer(e), this.setFocus()
            },
            getModalAt: function(e) {
                return this.stack[e]
            },
            getIndexOfModal: function(e) {
                for (var t = 0; t < this.stack.length; t++)
                    if (e === this.stack[t]) return t
            },
            replace: function(n) {
                for (var o, r = 0; r < this.stack.length; r++) this.stack[r].isShown && (o = this.stack[r]);
                o ? (this.$backdropHandle = o.$backdrop, o.$backdrop = null, n && o.$element.one("hidden", t(e.proxy(n, this))), o.hide()) : n && n()
            },
            removeBackdrop: function(e) {
                e.$backdrop.remove(), e.$backdrop = null
            },
            createBackdrop: function(t, n) {
                var o;
                return this.$backdropHandle ? (o = this.$backdropHandle, o.off(".webpdf-modalmanager"), this.$backdropHandle = null, this.isLoading && this.removeSpinner()) : o = e(n).addClass(t).appendTo(this.$element), o
            },
            removeContainer: function(e) {
                e.$container.remove(), e.$container = null
            },
            createContainer: function(n) {
                var r;
                return r = e('<div class="fwr-modal-scrollable">').css("z-index", o("fwr-modal", this.getOpenModals().length)).appendTo(this.$element), n && "static" != n.options.backdrop ? r.on("click.webpdf-modal", t(function(e) {
                    n.hide()
                })) : n && r.on("click.webpdf-modal", t(function(e) {
                    n.attention()
                })), r
            },
            backdrop: function(e, t) {
                var n = e.$element.hasClass("fwr-fade") ? "fwr-fade" : "",
                    r = e.options.backdrop && this.backdropCount < this.options.backdropLimit;
                if (e.isShown && r) {
                    var i = !1;
                    e.$backdrop = this.createBackdrop(n, e.options.backdropTemplate), e.$backdrop.css("z-index", o("backdrop", this.getOpenModals().length)), i && e.$backdrop[0].offsetWidth, e.$backdrop.addClass("fwr-in"), this.backdropCount += 1, t()
                } else if (!e.isShown && e.$backdrop) {
                    e.$backdrop.removeClass("fwr-in"), this.backdropCount -= 1;
                    var s = this;
                    s.removeBackdrop(e)
                } else t && t()
            },
            removeSpinner: function() {
                this.$spinner && this.$spinner.remove(), this.$spinner = null, this.isLoading = !1
            },
            removeLoading: function() {
                this.$backdropHandle && this.$backdropHandle.remove(), this.$backdropHandle = null, this.removeSpinner()
            },
            loading: function(t) {
                if (t = t || function() {}, this.$element.toggleClass("fwr-modal-open", !this.isLoading || this.hasOpenModal()).toggleClass("fwr-page-overflow", e(window).height() < this.$element.height()), this.isLoading)
                    if (this.isLoading && this.$backdropHandle) {
                        this.$backdropHandle.removeClass("fwr-in");
                        var n = this;
                        e.support.transition ? this.$backdropHandle.one(e.support.transition.end, function() {
                            n.removeLoading()
                        }) : n.removeLoading()
                    } else t && t(this.isLoading);
                else {
                    this.$backdropHandle = this.createBackdrop("fwr-fade", this.options.backdropTemplate), this.$backdropHandle[0].offsetWidth;
                    var r = this.getOpenModals();
                    this.$backdropHandle.css("z-index", o("backdrop", r.length + 1)).addClass("fwr-in");
                    var i = e(this.options.spinner).css("z-index", o("fwr-modal", r.length + 1)).appendTo(this.$element).addClass("fwr-in");
                    this.$spinner = e(this.createContainer()).append(i).on("click.webpdf-modalmanager", e.proxy(this.loading, this)), this.isLoading = !0, e.support.transition ? this.$backdropHandle.one(e.support.transition.end, t) : t()
                }
            }
        };
        var o = function() {
            var t, n = {};
            return function(o, r) {
                if ("undefined" == typeof t) {
                    var i = e('<div class="fwr-modal fwr-hide" />').appendTo("body"),
                        s = e('<div class="fwr-modal-backdrop hide" />').appendTo("body");
                    n["fwr-modal"] = +i.css("z-index"), n.backdrop = +s.css("z-index"), t = n["fwr-modal"] - n.backdrop, i.remove(), s.remove(), s = i = null
                }
                return n[o] + t * r
            }
        }();
        e.fn.webPDFModalManager = function(t, o) {
            return this.each(function() {
                var r = e(this),
                    i = r.data("webpdf-modal-manager");
                i || r.data("webpdf-modal-manager", i = new n(this, t)), "string" == typeof t && i[t].apply(i, [].concat(o))
            })
        }, e.fn.webPDFModalManager.defaults = {
            backdropLimit: 999,
            resize: !0,
            spinner: '<div class="fwr-loading-spinner fwr-fade" style="width: 200px; margin-left: -100px;"><div class="fwr-progress fwr-progress-striped fwr-active"><div class="fwr-bar" style="width: 100%;"></div></div></div>',
            backdropTemplate: '<div class="fwr-modal-backdrop" />'
        }, e.fn.webPDFModalManager.Constructor = n, e(function() {
            e(document).off("show.bs.webpdf-modal").off("hidden.bs.webpdf-modal")
        })
    }(jQuery), ! function(e) {
        
        var t = function(e, t) {
            this.init(e, t)
        };
        t.prototype = {
            constructor: t,
            init: function(t, n) {
                var o = this;
                this.options = n, this.$element = e(t).delegate('[webpdf-data-dismiss="modal"]', "click.dismiss.webpdf-modal", e.proxy(this.hide, this)), this.options.remote && this.$element.find(".fwr-modal-body").load(this.options.remote, function() {
                    var t = e.Event("loaded");
                    o.$element.trigger(t)
                });
                var r = "function" == typeof this.options.manager ? this.options.manager.call(this) : this.options.manager;
                r = r.appendModal ? r : e(r).webPDFModalManager().data("webpdf-modal-manager"), r.appendModal(this)
            },
            toggle: function() {
                return this[this.isShown ? "hide" : "show"]()
            },
            show: function() {
                var t = e.Event("show");
                this.isShown || (this.$element.trigger(t), t.isDefaultPrevented() || (this.escape(), this.tab(), this.options.loading && this.loading()))
            },
            hide: function(t) {
                t && t.preventDefault(), t = e.Event("hide"), this.$element.trigger(t), this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.tab(), this.isLoading && this.loading(), e(document).off("focusin.webpdf-modal"), this.$element.removeClass("fwr-in").removeClass(this.options.attentionAnimation).removeClass("fwr-modal-overflow").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fwr-fade") ? this.hideWithTransition() : this.hideModal())
            },
            layout: function() {
                var t = this.options.height ? "height" : "max-height",
                    n = this.options.height || this.options.maxHeight;
                if (this.options.width) {
                    this.$element.css("width", this.options.width);
                    var o = this;
                    this.$element.css("margin-left", function() {
                        return /%/gi.test(o.options.width) ? -(parseInt(o.options.width) / 2) + "%" : -(e(this).width() / 2) + "px"
                    })
                } else this.$element.css("width", ""), this.$element.css("margin-left", "");
                this.$element.find(".fwr-modal-body").css("overflow", "").css(t, ""), n && this.$element.find(".fwr-modal-body").css("overflow", "auto").css(t, n);
                var r = e(window).height() - 10 < this.$element.height();
                r || this.options.webpdf - r ? this.$element.css("margin-top", 0).addClass("fwr-modal-overflow") : this.$element.css("margin-top", 0 - this.$element.height() / 2).removeClass("fwr-modal-overflow")
            },
            tab: function() {
                var t = this;
                this.isShown && this.options.consumeTab ? this.$element.on("keydown.tabindex.webpdf-modal", "[webpdf-data-tabindex]", function(n) {
                    if (n.keyCode && 9 == n.keyCode) {
                        var o = e(this),
                            r = e(this);
                        t.$element.find("[webpdf-data-tabindex]:enabled:not([readonly])").each(function(t) {
                            o = t.shiftKey ? o.data("tabindex") > e(this).data("tabindex") ? o = e(this) : r = e(this) : o.data("tabindex") < e(this).data("tabindex") ? o = e(this) : r = e(this)
                        }), o[0] !== e(this)[0] ? o.focus() : r.focus(), n.preventDefault()
                    }
                }) : this.isShown || this.$element.off("keydown.tabindex.webpdf-modal")
            },
            escape: function() {
                var e = this;
                this.isShown && this.options.keyboard ? (this.$element.attr("tabindex") || this.$element.attr("tabindex", -1), this.$element.on("keyup.dismiss.webpdf-modal", function(t) {
                    27 == t.which && e.hide()
                })) : this.isShown || this.$element.off("keyup.dismiss.webpdf-modal")
            },
            hideWithTransition: function() {
                var t = this,
                    n = setTimeout(function() {
                        t.$element.off(e.support.transition.end), t.hideModal()
                    }, 500);
                this.$element.one(e.support.transition.end, function() {
                    clearTimeout(n), t.hideModal()
                })
            },
            hideModal: function() {
                var e = this.options.height ? "height" : "max-height",
                    t = this.options.height || this.options.maxHeight;
                t && this.$element.find(".fwr-modal-body").css("overflow", "").css(e, ""), this.$element.hide().trigger("hidden")
            },
            removeLoading: function() {
                this.$loading.remove(), this.$loading = null, this.isLoading = !1
            },
            loading: function(t) {
                t = t || function() {};
                var n = this.$element.hasClass("fwr-fade") ? "fwr-fade" : "";
                if (this.isLoading)
                    if (this.isLoading && this.$loading) {
                        this.$loading.removeClass("fwr-in");
                        var o = this;
                        e.support.transition && this.$element.hasClass("fwr-fade") ? this.$loading.one(e.support.transition.end, function() {
                            o.removeLoading()
                        }) : o.removeLoading()
                    } else t && t(this.isLoading);
                else {
                    var r = e.support.transition && n;
                    this.$loading = e('<div class="fwr-loading-mask ' + n + '">').append(this.options.spinner).appendTo(this.$element), r && this.$loading[0].offsetWidth, this.$loading.addClass("fwr-in"), this.isLoading = !0, r ? this.$loading.one(e.support.transition.end, t) : t()
                }
            },
            focus: function() {
                var e = this.$element.find(this.options.focusOn);
                e = e.length ? e : this.$element, e.focus()
            },
            attention: function() {
                if (this.options.attentionAnimation) {
                    this.$element.removeClass(this.options.attentionAnimation);
                    var e = this;
                    setTimeout(function() {
                        e.$element.addClass(e.options.attentionAnimation)
                    }, 0)
                }
                this.focus()
            },
            destroy: function() {
                var t = e.Event("destroy");
                this.$element.trigger(t), t.isDefaultPrevented() || (this.$element.off(".webpdf-modal").removeData("fwr-modal").removeClass("fwr-in").attr("aria-hidden", !0), this.$parent !== this.$element.parent() ? this.$element.appendTo(this.$parent) : this.$parent.length || (this.$element.remove(), this.$element = null), this.$element.trigger("destroyed"))
            }
        }, e.fn.webPDFModal = function(n, o) {
            return this.each(function() {
                var r = e(this),
                    i = r.data("fwr-modal"),
                    s = e.extend({}, e.fn.webPDFModal.defaults, r.data(), "object" == typeof n && n);
                i || r.data("fwr-modal", i = new t(this, s)), "string" == typeof n ? i[n].apply(i, [].concat(o)) : s.show && i.show()
            })
        }, e.fn.webPDFModal.defaults = {
            keyboard: !0,
            backdrop: !0,
            loading: !1,
            show: !0,
            width: null,
            height: null,
            maxHeight: null,
            modalOverflow: !1,
            consumeTab: !0,
            focusOn: null,
            replace: !1,
            resize: !1,
            attentionAnimation: "shake",
            manager: "body",
            spinner: '<div class="fwr-loading-spinner" style="width: 200px; margin-left: -100px;"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div>',
            backdropTemplate: '<div class="fwr-modal-backdrop" />'
        }, e.fn.webPDFModal.Constructor = t, e(function() {
            e(document).off("click.webpdf-modal").on("click.webpdf-modal.data-api", '[data-toggle="modal"]', function(t) {
                var n = e(this),
                    o = n.attr("href"),
                    r = e(n.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, "")),
                    i = r.data("fwr-modal") ? "toggle" : e.extend({
                        remote: !/#/.test(o) && o
                    }, r.data(), n.data());
                t.preventDefault(), r.webPDFModal(i).one("hide", function() {
                    n.focus()
                })
            })
        })
    }(window.jQuery),
    function() {
        function e(e, t) {
            if (!t || "function" == typeof t) return e;
            for (var n in t) e[n] = t[n];
            return e
        }

        function t(e, t, n) {
            var o, r = 0,
                i = e.length,
                s = void 0 === i || "function" == typeof e;
            if (n)
                if (s) {
                    for (o in e)
                        if (t.apply(e[o], n) === !1) break
                } else
                    for (; i > r && t.apply(e[r++], n) !== !1;);
            else if (s) {
                for (o in e)
                    if (t.call(e[o], o, e[o]) === !1) break
            } else
                for (; i > r && t.call(e[r], r, e[r++]) !== !1;);
            return e
        }

        function n(e) {
            var t = function(e) {
                    if (window.XMLHttpRequest) return e(null, new XMLHttpRequest);
                    if (window.ActiveXObject) try {
                        return e(null, new ActiveXObject("Msxml2.XMLHTTP"))
                    } catch (t) {
                        return e(null, new ActiveXObject("Microsoft.XMLHTTP"))
                    }
                    return e(new Error)
                },
                n = function(e) {
                    if ("string" == typeof e) return e;
                    var t = [];
                    for (var n in e) e.hasOwnProperty(n) && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
                    return t.join("&")
                },
                o = function(e) {
                    e = e.replace(/\r\n/g, "\n");
                    for (var t = "", n = 0; n < e.length; n++) {
                        var o = e.charCodeAt(n);
                        128 > o ? t += String.fromCharCode(o) : o > 127 && 2048 > o ? (t += String.fromCharCode(o >> 6 | 192), t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128))
                    }
                    return t
                },
                r = function(e) {
                    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                    e = o(e);
                    var n, r, i, s, a, u, l, c = "",
                        f = 0;
                    do n = e.charCodeAt(f++), r = e.charCodeAt(f++), i = e.charCodeAt(f++), s = n >> 2, a = (3 & n) << 4 | r >> 4, u = (15 & r) << 2 | i >> 6, l = 63 & i, isNaN(r) ? u = l = 64 : isNaN(i) && (l = 64), c += t.charAt(s) + t.charAt(a) + t.charAt(u) + t.charAt(l), n = r = i = "", s = a = u = l = ""; while (f < e.length);
                    return c
                },
                i = function() {
                    for (var e = arguments[0], t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var o in n) n.hasOwnProperty(o) && (e[o] = n[o])
                    }
                    return e
                },
                s = function(e, o, r, a) {
                    "function" == typeof r && (a = r, r = {}), r.cache = r.cache || !1, r.data = r.data || {}, r.headers = r.headers || {}, r.jsonp = r.jsonp || !1, r.async = void 0 === r.async ? !0 : r.async;
                    var u, l = i({
                        accept: "*/*",
                        "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
                    }, s.headers, r.headers);
                    if (u = "application/json" === l["content-type"] ? JSON.stringify(r.data) : n(r.data), "GET" === e) {
                        var c = [];
                        if (u && (c.push(u), u = null), r.cache || c.push("_=" + (new Date).getTime()), r.jsonp && (c.push("callback=" + r.jsonp), c.push("jsonp=" + r.jsonp)), c = c.join("&"), c.length > 1 && (o += o.indexOf("?") > -1 ? "&" + c : "?" + c), r.jsonp) {
                            var f = document.getElementsByTagName("head")[0],
                                d = document.createElement("script");
                            return d.type = "text/javascript", d.src = o, void f.appendChild(d)
                        }
                    }
                    t(function(t, n) {
                        if (t) return a(t);
                        n.open(e, o, r.async);
                        for (var i in l) l.hasOwnProperty(i) && n.setRequestHeader(i, l[i]);
                        n.onreadystatechange = function() {
                            if (4 === n.readyState) {
                                var e = n.responseText || "";
                                if (!a) return;
                                a(n.status, {
                                    text: function() {
                                        return e
                                    },
                                    json: function() {
                                        return JSON.parse(e)
                                    }
                                })
                            }
                        }, n.send(u)
                    })
                },
                a = {
                    authBasic: function(e, t) {
                        s.headers.Authorization = "Basic " + r(e + ":" + t)
                    },
                    connect: function(e, t, n) {
                        return s("CONNECT", e, t, n)
                    },
                    del: function(e, t, n) {
                        return s("DELETE", e, t, n)
                    },
                    get: function(e, t, n) {
                        return s("GET", e, t, n)
                    },
                    head: function(e, t, n) {
                        return s("HEAD", e, t, n)
                    },
                    headers: function(e) {
                        s.headers = e || {}
                    },
                    isAllowed: function(e, t, n) {
                        this.options(e, function(e, o) {
                            n(-1 !== o.text().indexOf(t))
                        })
                    },
                    options: function(e, t, n) {
                        return s("OPTIONS", e, t, n)
                    },
                    patch: function(e, t, n) {
                        return s("PATCH", e, t, n)
                    },
                    post: function(e, t, n) {
                        return s("POST", e, t, n)
                    },
                    put: function(e, t, n) {
                        return s("PUT", e, t, n)
                    },
                    trace: function(e, t, n) {
                        return s("TRACE", e, t, n)
                    }
                },
                u = e.type ? e.type.toLowerCase() : "get";
            a[u](e.url, e, function(t, n) {
                200 === t ? e.success(n.json(), t, null) : e.error(n.text(), t, null)
            })
        }

        function o(e, t) {
            "function" == typeof e && (t = e, e = {}), e = e || {}, D.extend(S, e), "string" == typeof S.ns && (S.ns = {
                namespaces: [S.ns],
                defaultNs: S.ns
            }), S.interpolationPrefixEscaped = D.regexEscape(S.interpolationPrefix), S.interpolationSuffixEscaped = D.regexEscape(S.interpolationSuffix), S.lng || (S.lng = D.detectLanguage()), S.lng ? S.useCookie && D.cookie.create(S.cookieName, S.lng, S.cookieExpirationTime) : (S.lng = S.fallbackLng, S.useCookie && D.cookie.remove(S.cookieName)), N = D.toLanguages(S.lng), w = N[0], D.log("currentLng set to: " + w), P.setCurrentLng(w), x && S.setJqueryExt && f();
            var n;
            if (x && x.Deferred && (n = x.Deferred()), !S.resStore) {
                var o = D.toLanguages(S.lng);
                "string" == typeof S.preload && (S.preload = [S.preload]);
                for (var r = 0, i = S.preload.length; i > r; r++)
                    for (var s = D.toLanguages(S.preload[r]), a = 0, u = s.length; u > a; a++) o.indexOf(s[a]) < 0 && o.push(s[a]);
                return C.sync.load(o, S, function(e, o) {
                    j = o, t && t(g), n && n.resolve()
                }), n ? n.promise() : void 0
            }
            return j = S.resStore, t && t(g), n && n.resolve(), n ? n.promise() : void 0
        }

        function r(e, t) {
            "string" == typeof e && (e = [e]);
            for (var n = 0, r = e.length; r > n; n++) S.preload.indexOf(e[n]) < 0 && S.preload.push(e[n]);
            return o(t)
        }

        function i(e, t, n) {
            "string" != typeof t && (n = t, t = S.ns.defaultNs), j[e] = j[e] || {}, j[e][t] = j[e][t] || {}, D.extend(j[e][t], n)
        }

        function s(e) {
            S.ns.defaultNs = e
        }

        function a(e, t) {
            u([e], t)
        }

        function u(e, t) {
            var n = {
                    dynamicLoad: S.dynamicLoad,
                    resGetPath: S.resGetPath,
                    getAsync: S.getAsync,
                    ns: {
                        namespaces: e,
                        defaultNs: ""
                    }
                },
                o = D.toLanguages(S.lng);
            "string" == typeof S.preload && (S.preload = [S.preload]);
            for (var r = 0, i = S.preload.length; i > r; r++)
                for (var s = D.toLanguages(S.preload[r]), a = 0, u = s.length; u > a; a++) o.indexOf(s[a]) < 0 && o.push(s[a]);
            for (var l = [], c = 0, f = o.length; f > c; c++) {
                var d = !1,
                    p = j[o[c]];
                if (p)
                    for (var h = 0, m = e.length; m > h; h++) p[e[h]] || (d = !0);
                else d = !0;
                d && l.push(o[c])
            }
            l.length ? C.sync._fetch(l, n, function(n, o) {
                var r = e.length * l.length;
                D.each(e, function(e, n) {
                    D.each(l, function(e, i) {
                        j[i] = j[i] || {}, j[i][n] = o[i][n], r--, 0 === r && t && (S.useLocalStorage && C.sync._storeLocal(j), t())
                    })
                })
            }) : t && t()
        }

        function l(e, t) {
            return o({
                lng: e
            }, t)
        }

        function c() {
            return w
        }

        function f() {
            function e(e, t, n) {
                if (0 !== t.length) {
                    var o = "text";
                    if (0 === t.indexOf("[")) {
                        var r = t.split("]");
                        t = r[1], o = r[0].substr(1, r[0].length - 1)
                    }
                    t.indexOf(";") === t.length - 1 && (t = t.substr(0, t.length - 2));
                    var i;
                    "html" === o ? (i = S.defaultValueFromContent ? x.extend({
                        defaultValue: e.html()
                    }, n) : n, e.html(x.t(t, i))) : "text" === o ? (i = S.defaultValueFromContent ? x.extend({
                        defaultValue: e.text()
                    }, n) : n, e.text(x.t(t, i))) : (i = S.defaultValueFromContent ? x.extend({
                        defaultValue: e.attr(o)
                    }, n) : n, e.attr(o, x.t(t, i)))
                }
            }

            function t(t, n) {
                var o = t.attr(S.selectorAttr);
                if (o) {
                    var r = t,
                        i = t.data("i18n-target");
                    if (i && (r = t.find(i) || t), !n && S.useDataAttrOptions === !0 && (n = t.data("i18n-options")), n = n || {}, o.indexOf(";") <= o.length - 1) {
                        var s = o.split(";");
                        x.each(s, function(t, o) {
                            e(r, o, n)
                        })
                    } else e(r, k, n);
                    S.useDataAttrOptions === !0 && t.data("i18n-options", n)
                }
            }
            x.t = x.t || g, x.fn.i18n = function(e) {
                return this.each(function() {
                    t(x(this), e);
                    var n = x(this).find("[" + S.selectorAttr + "]");
                    n.each(function() {
                        t(x(this), e)
                    })
                })
            }
        }

        function d(e, t, n, o) {
            if (o = o || t, e.indexOf(o.interpolationPrefix || S.interpolationPrefix) < 0) return e;
            var r = o.interpolationPrefix ? D.regexEscape(o.interpolationPrefix) : S.interpolationPrefixEscaped,
                i = o.interpolationSuffix ? D.regexEscape(o.interpolationSuffix) : S.interpolationSuffixEscaped;
            return D.each(t, function(t, s) {
                e = "object" == typeof s && null !== s ? d(e, s, n ? n + S.keyseparator + t : t, o) : e.replace(new RegExp([r, n ? n + S.keyseparator + t : t, i].join(""), "g"), s)
            }), e
        }

        function p(e, t) {
            var n = ",",
                o = "{",
                r = "}",
                i = D.extend({}, t);
            for (delete i.postProcess; - 1 != e.indexOf(S.reusePrefix) && (T++, !(T > S.maxRecursion));) {
                var s = e.indexOf(S.reusePrefix),
                    a = e.indexOf(S.reuseSuffix, s) + S.reuseSuffix.length,
                    u = e.substring(s, a),
                    l = u.replace(S.reusePrefix, "").replace(S.reuseSuffix, "");
                if (-1 != l.indexOf(n)) {
                    var c = l.indexOf(n);
                    if (-1 != l.indexOf(o, c) && -1 != l.indexOf(r, c)) {
                        var f = l.indexOf(o, c),
                            d = l.indexOf(r, f) + r.length;
                        try {
                            i = D.extend(i, JSON.parse(l.substring(f, d))), l = l.substring(0, c)
                        } catch (p) {}
                    }
                }
                var h = v(l, i);
                e = e.replace(u, h)
            }
            return e
        }

        function h(e) {
            return e.context && "string" == typeof e.context
        }

        function m(e) {
            return void 0 !== e.count && "string" != typeof e.count && 1 !== e.count
        }

        function g(e, t) {
            return T = 0, v(e, t)
        }

        function v(e, t) {
            if (t = t || {}, !j) return r;
            var n, o, r = t.defaultValue || e,
                i = N;
            if (t.lng && (i = D.toLanguages(t.lng), !j[i[0]])) {
                var s = S.getAsync;
                S.getAsync = !1, C.sync.load(i, S, function(e, t) {
                    D.extend(j, t), S.getAsync = s
                })
            }
            var a = t.ns || S.ns.defaultNs;
            if (e.indexOf(S.nsseparator) > -1) {
                var u = e.split(S.nsseparator);
                a = u[0], e = u[1]
            }
            if (h(t)) {
                n = D.extend({}, t), delete n.context, n.defaultValue = S.contextNotFound;
                var l = a + S.nsseparator + e + "_" + t.context;
                if (o = g(l, n), o != S.contextNotFound) return d(o, {
                    context: t.context
                })
            }
            if (m(t)) {
                n = D.extend({}, t), delete n.count, n.defaultValue = S.pluralNotFound;
                var c = a + S.nsseparator + e + S.pluralSuffix,
                    f = P.get(w, t.count);
                if (f >= 0 ? c = c + "_" + f : 1 === f && (c = a + S.nsseparator + e), o = g(c, n), o != S.pluralNotFound) return d(o, {
                    count: t.count
                })
            }
            for (var b, y = e.split(S.keyseparator), x = 0, k = i.length; k > x && !b; x++) {
                for (var T = i[x], O = 0, _ = j[T] && j[T][a]; y[O];) _ = _ && _[y[O]], O++;
                if (void 0 !== _) {
                    if ("string" == typeof _) _ = d(_, t), _ = p(_, t);
                    else if ("[object Array]" !== Object.prototype.toString.apply(_) || S.returnObjectTrees || t.returnObjectTrees)
                        if (S.returnObjectTrees || t.returnObjectTrees) {
                            var L = {};
                            for (var M in _) L[M] = v(a + S.nsseparator + e + S.keyseparator + M, t);
                            _ = L
                        } else _ = "key '" + a + ":" + e + " (" + T + ")' returned a object instead of string.", D.log(_);
                    else _ = _.join("\n"), _ = d(_, t), _ = p(_, t);
                    b = _
                }
            }
            void 0 === b && S.fallbackToDefaultNS && (b = v(e, t)), void 0 === b && S.sendMissing && (t.lng ? I.postMissing(i[0], a, e, r, i) : I.postMissing(S.lng, a, e, r, i));
            var H = t.postProcess || S.postProcess;
            return void 0 !== b && H && A[H] && (b = A[H](b, e, t)), void 0 === b && (r = d(r, t), r = p(r, t)), void 0 !== b ? b : r
        }

        function b() {
            var e, t = [];
            if ("undefined" != typeof window && (function() {
                    for (var e = window.location.search.substring(1), n = e.split("&"), o = 0; o < n.length; o++) {
                        var r = n[o].indexOf("=");
                        if (r > 0) {
                            var i = n[o].substring(0, r),
                                s = n[o].substring(r + 1);
                            t[i] = s
                        }
                    }
                }(), t[S.detectLngQS] && (e = t[S.detectLngQS])), !e && "undefined" != typeof document && S.useCookie) {
                var n = D.cookie.read(S.cookieName);
                n && (e = n)
            }
            return !e && "undefined" != typeof navigator && (e = navigator.language ? navigator.language : navigator.userLanguage), e
        }
        Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
            
            if (null == this) throw new TypeError;
            var t = Object(this),
                n = t.length >>> 0;
            if (0 === n) return -1;
            var o = 0;
            if (arguments.length > 0 && (o = Number(arguments[1]), o != o ? o = 0 : 0 != o && o != 1 / 0 && o != -(1 / 0) && (o = (o > 0 || -1) * Math.floor(Math.abs(o)))), o >= n) return -1;
            for (var r = o >= 0 ? o : Math.max(n - Math.abs(o), 0); n > r; r++)
                if (r in t && t[r] === e) return r;
            return -1
        });
        var w, y = this,
            x = y.jQuery,
            C = {},
            j = {},
            T = 0,
            N = [];
        "undefined" != typeof module && module.exports ? module.exports = C : (x && (x.i18n = x.i18n || C), y.i18n = y.i18n || C);
        var S = {
                lng: void 0,
                load: "all",
                preload: [],
                lowerCaseLng: !1,
                returnObjectTrees: !1,
                fallbackLng: "dev",
                detectLngQS: "setLng",
                ns: "translation",
                fallbackToDefaultNS: !1,
                nsseparator: ":",
                keyseparator: ".",
                selectorAttr: "data-i18n",
                debug: !1,
                resGetPath: "locales/__lng__/__ns__.json",
                resPostPath: "locales/add/__lng__/__ns__",
                getAsync: !0,
                postAsync: !0,
                resStore: void 0,
                useLocalStorage: !1,
                localStorageExpirationTime: 6048e5,
                dynamicLoad: !1,
                sendMissing: !1,
                sendMissingTo: "fallback",
                sendType: "POST",
                interpolationPrefix: "__",
                interpolationSuffix: "__",
                reusePrefix: "$t(",
                reuseSuffix: ")",
                pluralSuffix: "_plural",
                pluralNotFound: ["plural_not_found", Math.random()].join(""),
                contextNotFound: ["context_not_found", Math.random()].join(""),
                setJqueryExt: !0,
                defaultValueFromContent: !0,
                useDataAttrOptions: !1,
                cookieExpirationTime: void 0,
                useCookie: !0,
                cookieName: "i18next",
                postProcess: void 0
            },
            O = {
                create: function(e, t, n) {
                    var o;
                    if (n) {
                        var r = new Date;
                        r.setTime(r.getTime() + 60 * n * 1e3), o = "; expires=" + r.toGMTString()
                    } else o = "";
                    document.cookie = e + "=" + t + o + "; path=/"
                },
                read: function(e) {
                    for (var t = e + "=", n = document.cookie.split(";"), o = 0; o < n.length; o++) {
                        for (var r = n[o];
                            " " == r.charAt(0);) r = r.substring(1, r.length);
                        if (0 === r.indexOf(t)) return r.substring(t.length, r.length)
                    }
                    return null
                },
                remove: function(e) {
                    this.create(e, "", -1)
                }
            },
            _ = {
                create: function(e, t, n) {},
                read: function(e) {
                    return null
                },
                remove: function(e) {}
            },
            D = {
                extend: x ? x.extend : e,
                each: x ? x.each : t,
                ajax: x ? x.ajax : n,
                cookie: "undefined" != typeof document ? O : _,
                detectLanguage: b,
                log: function(e) {
                    S.debug && "undefined" != typeof console && console.log(e)
                },
                toLanguages: function(e) {
                    var t = [];
                    if ("string" == typeof e && e.indexOf("-") > -1) {
                        var n = e.split("-");
                        e = S.lowerCaseLng ? n[0].toLowerCase() + "-" + n[1].toLowerCase() : n[0].toLowerCase() + "-" + n[1].toUpperCase(), "unspecific" !== S.load && t.push(e), "current" !== S.load && t.push(n[0])
                    } else t.push(e);
                    return -1 === t.indexOf(S.fallbackLng) && S.fallbackLng && t.push(S.fallbackLng), t
                },
                regexEscape: function(e) {
                    return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                }
            },
            I = {
                load: function(e, t, n) {
                    t.useLocalStorage ? I._loadLocal(e, t, function(o, r) {
                        for (var i = [], s = 0, a = e.length; a > s; s++) r[e[s]] || i.push(e[s]);
                        i.length > 0 ? I._fetch(i, t, function(e, t) {
                            D.extend(r, t), I._storeLocal(t), n(null, r)
                        }) : n(null, r)
                    }) : I._fetch(e, t, function(e, t) {
                        n(null, t)
                    })
                },
                _loadLocal: function(e, t, n) {
                    var o = {},
                        r = (new Date).getTime();
                    if (window.localStorage) {
                        var i = e.length;
                        D.each(e, function(e, s) {
                            var a = window.localStorage.getItem("res_" + s);
                            a && (a = JSON.parse(a), a.i18nStamp && a.i18nStamp + t.localStorageExpirationTime > r && (o[s] = a)), i--, 0 === i && n(null, o)
                        })
                    }
                },
                _storeLocal: function(e) {
                    if (window.localStorage)
                        for (var t in e) e[t].i18nStamp = (new Date).getTime(), window.localStorage.setItem("res_" + t, JSON.stringify(e[t]))
                },
                _fetch: function(e, t, n) {
                    var o = t.ns,
                        r = {};
                    if (t.dynamicLoad) {
                        var i = d(t.resGetPath, {
                            lng: e.join("+"),
                            ns: o.namespaces.join("+")
                        });
                        D.ajax({
                            url: i,
                            success: function(e, t, o) {
                                D.log("loaded: " + i), n(null, e)
                            },
                            error: function(e, t, o) {
                                D.log("failed loading: " + i), n("failed loading resource.json error: " + o)
                            },
                            dataType: "json",
                            async: t.getAsync
                        })
                    } else {
                        var s, a = o.namespaces.length * e.length;
                        D.each(o.namespaces, function(o, i) {
                            D.each(e, function(e, o) {
                                var u = function(e, t) {
                                    e && (s = s || [], s.push(e)), r[o] = r[o] || {}, r[o][i] = t, a--, 0 === a && n(s, r)
                                };
                                "function" == typeof t.customLoad ? t.customLoad(o, i, t, u) : I._fetchOne(o, i, t, u)
                            })
                        })
                    }
                },
                _fetchOne: function(e, t, n, o) {
                    var r = d(n.resGetPath, {
                        lng: e,
                        ns: t
                    });
                    if(t=="translation"){

                    }else{
                        D.ajax({
                            url: r,
                            success: function(e, t, n) {
                                D.log("loaded: " + r), o(null, e)
                            },
                            error: function(e, t, n) {
                                D.log("failed loading: " + r), o(n, {})
                            },
                            dataType: "json",
                            async: n.getAsync
                        });
                    }
                },
                postMissing: function(e, t, n, o, r) {
                    var i = {};
                    i[n] = o;
                    var s = [];
                    if ("fallback" === S.sendMissingTo) s.push({
                        lng: S.fallbackLng,
                        url: d(S.resPostPath, {
                            lng: S.fallbackLng,
                            ns: t
                        })
                    });
                    else if ("current" === S.sendMissingTo) s.push({
                        lng: e,
                        url: d(S.resPostPath, {
                            lng: e,
                            ns: t
                        })
                    });
                    else if ("all" === S.sendMissingTo)
                        for (var a = 0, u = r.length; u > a; a++) s.push({
                            lng: r[a],
                            url: d(S.resPostPath, {
                                lng: r[a],
                                ns: t
                            })
                        });
                    for (var l = 0, c = s.length; c > l; l++) {
                        var f = s[l];
                        D.ajax({
                            url: f.url,
                            type: S.sendType,
                            data: i,
                            success: function(e, r, i) {
                                D.log("posted missing key '" + n + "' to: " + f.url);
                                for (var s = n.split("."), a = 0, u = j[f.lng][t]; s[a];) u = a === s.length - 1 ? u[s[a]] = o : u[s[a]] = u[s[a]] || {}, a++
                            },
                            error: function(e, t, o) {
                                D.log("failed posting missing key '" + n + "' to: " + f.url)
                            },
                            dataType: "json",
                            async: S.postAsync
                        })
                    }
                }
            },
            P = {
                rules: {
                    ach: {
                        name: "Acholi",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    af: {
                        name: "Afrikaans",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    ak: {
                        name: "Akan",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    am: {
                        name: "Amharic",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    an: {
                        name: "Aragonese",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    ar: {
                        name: "Arabic",
                        numbers: [0, 1, 2, 3, 11, 100],
                        plurals: function(e) {
                            return Number(0 === e ? 0 : 1 == e ? 1 : 2 == e ? 2 : e % 100 >= 3 && 10 >= e % 100 ? 3 : e % 100 >= 11 ? 4 : 5)
                        }
                    },
                    arn: {
                        name: "Mapudungun",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    ast: {
                        name: "Asturian",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    ay: {
                        name: "Aymará",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    az: {
                        name: "Azerbaijani",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    be: {
                        name: "Belarusian",
                        numbers: [1, 2, 5],
                        plurals: function(e) {
                            return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
                        }
                    },
                    bg: {
                        name: "Bulgarian",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    bn: {
                        name: "Bengali",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    bo: {
                        name: "Tibetan",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    br: {
                        name: "Breton",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    bs: {
                        name: "Bosnian",
                        numbers: [1, 2, 5],
                        plurals: function(e) {
                            return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
                        }
                    },
                    ca: {
                        name: "Catalan",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    cgg: {
                        name: "Chiga",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    cs: {
                        name: "Czech",
                        numbers: [1, 2, 5],
                        plurals: function(e) {
                            return Number(1 == e ? 0 : e >= 2 && 4 >= e ? 1 : 2)
                        }
                    },
                    csb: {
                        name: "Kashubian",
                        numbers: [1, 2, 5],
                        plurals: function(e) {
                            return Number(1 == e ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
                        }
                    },
                    cy: {
                        name: "Welsh",
                        numbers: [1, 2, 3, 8],
                        plurals: function(e) {
                            return Number(1 == e ? 0 : 2 == e ? 1 : 8 != e && 11 != e ? 2 : 3)
                        }
                    },
                    da: {
                        name: "Danish",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    de: {
                        name: "German",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    dz: {
                        name: "Dzongkha",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    el: {
                        name: "Greek",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    en: {
                        name: "English",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    eo: {
                        name: "Esperanto",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    es: {
                        name: "Spanish",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    es_ar: {
                        name: "Argentinean Spanish",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    et: {
                        name: "Estonian",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    eu: {
                        name: "Basque",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    fa: {
                        name: "Persian",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    fi: {
                        name: "Finnish",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    fil: {
                        name: "Filipino",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    fo: {
                        name: "Faroese",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    fr: {
                        name: "French",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    fur: {
                        name: "Friulian",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    fy: {
                        name: "Frisian",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    ga: {
                        name: "Irish",
                        numbers: [1, 2, 3, 7, 11],
                        plurals: function(e) {
                            return Number(1 == e ? 0 : 2 == e ? 1 : 7 > e ? 2 : 11 > e ? 3 : 4)
                        }
                    },
                    gd: {
                        name: "Scottish Gaelic",
                        numbers: [1, 2, 3, 20],
                        plurals: function(e) {
                            return Number(1 == e || 11 == e ? 0 : 2 == e || 12 == e ? 1 : e > 2 && 20 > e ? 2 : 3)
                        }
                    },
                    gl: {
                        name: "Galician",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    gu: {
                        name: "Gujarati",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    gun: {
                        name: "Gun",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    ha: {
                        name: "Hausa",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    he: {
                        name: "Hebrew",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    hi: {
                        name: "Hindi",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    hr: {
                        name: "Croatian",
                        numbers: [1, 2, 5],
                        plurals: function(e) {
                            return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
                        }
                    },
                    hu: {
                        name: "Hungarian",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    hy: {
                        name: "Armenian",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    ia: {
                        name: "Interlingua",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    id: {
                        name: "Indonesian",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    is: {
                        name: "Icelandic",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e % 10 != 1 || e % 100 == 11)
                        }
                    },
                    it: {
                        name: "Italian",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    ja: {
                        name: "Japanese",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    jbo: {
                        name: "Lojban",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    jv: {
                        name: "Javanese",
                        numbers: [0, 1],
                        plurals: function(e) {
                            return Number(0 !== e)
                        }
                    },
                    ka: {
                        name: "Georgian",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    kk: {
                        name: "Kazakh",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    km: {
                        name: "Khmer",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    kn: {
                        name: "Kannada",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    ko: {
                        name: "Korean",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    ku: {
                        name: "Kurdish",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    kw: {
                        name: "Cornish",
                        numbers: [1, 2, 3, 4],
                        plurals: function(e) {
                            return Number(1 == e ? 0 : 2 == e ? 1 : 3 == e ? 2 : 3)
                        }
                    },
                    ky: {
                        name: "Kyrgyz",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    lb: {
                        name: "Letzeburgesch",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    ln: {
                        name: "Lingala",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    lo: {
                        name: "Lao",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    lt: {
                        name: "Lithuanian",
                        numbers: [1, 2, 10],
                        plurals: function(e) {
                            return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
                        }
                    },
                    lv: {
                        name: "Latvian",
                        numbers: [0, 1, 2],
                        plurals: function(e) {
                            return Number(e % 10 == 1 && e % 100 != 11 ? 0 : 0 !== e ? 1 : 2)
                        }
                    },
                    mai: {
                        name: "Maithili",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    mfe: {
                        name: "Mauritian Creole",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    mg: {
                        name: "Malagasy",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    mi: {
                        name: "Maori",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    mk: {
                        name: "Macedonian",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 == e || e % 10 == 1 ? 0 : 1)
                        }
                    },
                    ml: {
                        name: "Malayalam",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    mn: {
                        name: "Mongolian",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    mnk: {
                        name: "Mandinka",
                        numbers: [0, 1, 2],
                        plurals: function(e) {
                            return Number(1 == e ? 1 : 2)
                        }
                    },
                    mr: {
                        name: "Marathi",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    ms: {
                        name: "Malay",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    mt: {
                        name: "Maltese",
                        numbers: [1, 2, 11, 20],
                        plurals: function(e) {
                            return Number(1 == e ? 0 : 0 === e || e % 100 > 1 && 11 > e % 100 ? 1 : e % 100 > 10 && 20 > e % 100 ? 2 : 3)
                        }
                    },
                    nah: {
                        name: "Nahuatl",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    nap: {
                        name: "Neapolitan",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    nb: {
                        name: "Norwegian Bokmal",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    ne: {
                        name: "Nepali",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    nl: {
                        name: "Dutch",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    nn: {
                        name: "Norwegian Nynorsk",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    no: {
                        name: "Norwegian",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    nso: {
                        name: "Northern Sotho",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    oc: {
                        name: "Occitan",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    or: {
                        name: "Oriya",
                        numbers: [2, 1],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    pa: {
                        name: "Punjabi",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    pap: {
                        name: "Papiamento",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    pl: {
                        name: "Polish",
                        numbers: [1, 2, 5],
                        plurals: function(e) {
                            return Number(1 == e ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
                        }
                    },
                    pms: {
                        name: "Piemontese",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    ps: {
                        name: "Pashto",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    pt: {
                        name: "Portuguese",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    pt_br: {
                        name: "Brazilian Portuguese",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    rm: {
                        name: "Romansh",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    ro: {
                        name: "Romanian",
                        numbers: [1, 2, 20],
                        plurals: function(e) {
                            return Number(1 == e ? 0 : 0 === e || e % 100 > 0 && 20 > e % 100 ? 1 : 2)
                        }
                    },
                    ru: {
                        name: "Russian",
                        numbers: [1, 2, 5],
                        plurals: function(e) {
                            return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
                        }
                    },
                    sah: {
                        name: "Yakut",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    sco: {
                        name: "Scots",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    se: {
                        name: "Northern Sami",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    si: {
                        name: "Sinhala",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    sk: {
                        name: "Slovak",
                        numbers: [1, 2, 5],
                        plurals: function(e) {
                            return Number(1 == e ? 0 : e >= 2 && 4 >= e ? 1 : 2)
                        }
                    },
                    sl: {
                        name: "Slovenian",
                        numbers: [5, 1, 2, 3],
                        plurals: function(e) {
                            return Number(e % 100 == 1 ? 1 : e % 100 == 2 ? 2 : e % 100 == 3 || e % 100 == 4 ? 3 : 0)
                        }
                    },
                    so: {
                        name: "Somali",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    son: {
                        name: "Songhay",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    sq: {
                        name: "Albanian",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    sr: {
                        name: "Serbian",
                        numbers: [1, 2, 5],
                        plurals: function(e) {
                            return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
                        }
                    },
                    su: {
                        name: "Sundanese",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    sv: {
                        name: "Swedish",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    sw: {
                        name: "Swahili",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    ta: {
                        name: "Tamil",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    te: {
                        name: "Telugu",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    tg: {
                        name: "Tajik",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    th: {
                        name: "Thai",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    ti: {
                        name: "Tigrinya",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    tk: {
                        name: "Turkmen",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    tr: {
                        name: "Turkish",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    tt: {
                        name: "Tatar",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    ug: {
                        name: "Uyghur",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    uk: {
                        name: "Ukrainian",
                        numbers: [1, 2, 5],
                        plurals: function(e) {
                            return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
                        }
                    },
                    ur: {
                        name: "Urdu",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    uz: {
                        name: "Uzbek",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    vi: {
                        name: "Vietnamese",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    wa: {
                        name: "Walloon",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(e > 1)
                        }
                    },
                    wo: {
                        name: "Wolof",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    },
                    yo: {
                        name: "Yoruba",
                        numbers: [1, 2],
                        plurals: function(e) {
                            return Number(1 != e)
                        }
                    },
                    zh: {
                        name: "Chinese",
                        numbers: [1],
                        plurals: function(e) {
                            return 0
                        }
                    }
                },
                addRule: function(e, t) {
                    P.rules[e] = t
                },
                setCurrentLng: function(e) {
                    if (!P.currentRule || P.currentRule.lng !== e) {
                        var t = e.split("-");
                        P.currentRule = {
                            lng: e,
                            rule: P.rules[t[0]]
                        }
                    }
                },
                get: function(e, t) {
                    function n(t, n) {
                        var o;
                        if (o = P.currentRule && P.currentRule.lng === e ? P.currentRule.rule : P.rules[t]) {
                            var r = o.plurals(n),
                                i = o.numbers[r];
                            return 2 === o.numbers.length && 1 === o.numbers[0] && (2 === i ? i = -1 : 1 === i && (i = 1)), i
                        }
                        return 1 === n ? "1" : "-1"
                    }
                    var o = e.split("-");
                    return n(o[0], t)
                }
            },
            A = {},
            L = function(e, t) {
                A[e] = t
            },
            M = function() {
                function e(e) {
                    return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
                }

                function t(e, t) {
                    for (var n = []; t > 0; n[--t] = e);
                    return n.join("")
                }
                var n = function() {
                    return n.cache.hasOwnProperty(arguments[0]) || (n.cache[arguments[0]] = n.parse(arguments[0])), n.format.call(null, n.cache[arguments[0]], arguments)
                };
                return n.format = function(n, o) {
                    var r, i, s, a, u, l, c, f = 1,
                        d = n.length,
                        p = "",
                        h = [];
                    for (i = 0; d > i; i++)
                        if (p = e(n[i]), "string" === p) h.push(n[i]);
                        else if ("array" === p) {
                        if (a = n[i], a[2])
                            for (r = o[f], s = 0; s < a[2].length; s++) {
                                if (!r.hasOwnProperty(a[2][s])) throw M('[sprintf] property "%s" does not exist', a[2][s]);
                                r = r[a[2][s]]
                            } else r = a[1] ? o[a[1]] : o[f++];
                        if (/[^s]/.test(a[8]) && "number" != e(r)) throw M("[sprintf] expecting number but found %s", e(r));
                        switch (a[8]) {
                            case "b":
                                r = r.toString(2);
                                break;
                            case "c":
                                r = String.fromCharCode(r);
                                break;
                            case "d":
                                r = parseInt(r, 10);
                                break;
                            case "e":
                                r = a[7] ? r.toExponential(a[7]) : r.toExponential();
                                break;
                            case "f":
                                r = a[7] ? parseFloat(r).toFixed(a[7]) : parseFloat(r);
                                break;
                            case "o":
                                r = r.toString(8);
                                break;
                            case "s":
                                r = (r = String(r)) && a[7] ? r.substring(0, a[7]) : r;
                                break;
                            case "u":
                                r = Math.abs(r);
                                break;
                            case "x":
                                r = r.toString(16);
                                break;
                            case "X":
                                r = r.toString(16).toUpperCase()
                        }
                        r = /[def]/.test(a[8]) && a[3] && r >= 0 ? "+" + r : r, l = a[4] ? "0" == a[4] ? "0" : a[4].charAt(1) : " ", c = a[6] - String(r).length, u = a[6] ? t(l, c) : "", h.push(a[5] ? r + u : u + r)
                    }
                    return h.join("")
                }, n.cache = {}, n.parse = function(e) {
                    for (var t = e, n = [], o = [], r = 0; t;) {
                        if (null !== (n = /^[^\x25]+/.exec(t))) o.push(n[0]);
                        else if (null !== (n = /^\x25{2}/.exec(t))) o.push("%");
                        else {
                            if (null === (n = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t))) throw "[sprintf] huh?";
                            if (n[2]) {
                                r |= 1;
                                var i = [],
                                    s = n[2],
                                    a = [];
                                if (null === (a = /^([a-z_][a-z_\d]*)/i.exec(s))) throw "[sprintf] huh?";
                                for (i.push(a[1]);
                                    "" !== (s = s.substring(a[0].length));)
                                    if (null !== (a = /^\.([a-z_][a-z_\d]*)/i.exec(s))) i.push(a[1]);
                                    else {
                                        if (null === (a = /^\[(\d+)\]/.exec(s))) throw "[sprintf] huh?";
                                        i.push(a[1])
                                    }
                                n[2] = i
                            } else r |= 2;
                            if (3 === r) throw "[sprintf] mixing positional and named placeholders is not (yet) supported";
                            o.push(n)
                        }
                        t = t.substring(n[0].length)
                    }
                    return o
                }, n
            }(),
            H = function(e, t) {
                return t.unshift(e), M.apply(null, t)
            };
        L("sprintf", function(e, t, n) {
            return n.sprintf ? "[object Array]" === Object.prototype.toString.apply(n.sprintf) ? H(e, n.sprintf) : "object" == typeof n.sprintf ? M(e, n.sprintf) : e : e
        }), C.init = o, C.setLng = l, C.preload = r, C.addResourceBundle = i, C.loadNamespace = a, C.loadNamespaces = u, C.setDefaultNamespace = s, C.t = g, C.translate = g, C.detectLanguage = D.detectLanguage, C.pluralExtensions = P, C.sync = I, C.functions = D, C.lng = c, C.addPostProcessor = L, C.options = S, window.i18n = C
    }();
    try{
        window.seajs = undefined;
    }catch(e){}
window.seajs = {
    _seajs: window.seajs,
    version: "1.2.0-dev",
    _data: {
        config: {
            debug: "",
            preload: []
        },
        memoizedMods: {},
        packageMods: []
    },
    _util: {},
    _fn: {}
};
! function(e) {
    var t = Object.prototype.toString,
        n = Array.prototype;
    e.isString = function(e) {
        return "[object String]" === t.call(e)
    }, e.isObject = function(e) {
        return e === Object(e)
    }, e.isFunction = function(e) {
        return "[object Function]" === t.call(e)
    }, e.isArray = Array.isArray || function(e) {
        return "[object Array]" === t.call(e)
    }, e.indexOf = n.indexOf ? function(e, t) {
        return e.indexOf(t)
    } : function(e, t) {
        for (var n = 0, o = e.length; o > n; n++)
            if (e[n] === t) return n;
        return -1
    };
    var o = e.forEach = n.forEach ? function(e, t) {
        e.forEach(t)
    } : function(e, t) {
        for (var n = 0, o = e.length; o > n; n++) t(e[n], n, e)
    };
    e.map = n.map ? function(e, t) {
        return e.map(t)
    } : function(e, t) {
        var n = [];
        return o(e, function(e, o, r) {
            n.push(t(e, o, r))
        }), n
    }, e.filter = n.filter ? function(e, t) {
        return e.filter(t)
    } : function(e, t) {
        var n = [];
        return o(e, function(e, o, r) {
            t(e, o, r) && n.push(e)
        }), n
    }, e.unique = function(e) {
        var t = [],
            n = {};
        if (o(e, function(e) {
                n[e] = 1
            }), Object.keys) t = Object.keys(n);
        else
            for (var r in n) n.hasOwnProperty(r) && t.push(r);
        return t
    }, e.now = Date.now || function() {
        return (new Date).getTime()
    }
}(seajs._util),
function(e, t) {
    e.error = function() {
        throw Array.prototype.join.call(arguments, " ")
    }, e.log = function() {
        t.config.debug && "undefined" != typeof console && console.log(Array.prototype.join.call(arguments, " "))
    }
}(seajs._util, seajs._data),
function(e, t, n, o) {
    function r(e) {
        return e = e.match(/.*(?=\/.*$)/), (e ? e[0] : ".") + "/"
    }

    function i(t) {
        if (t = t.replace(/([^:\/])\/+/g, "$1/"), -1 === t.indexOf(".")) return t;
        for (var n, o = t.split("/"), r = [], i = 0, s = o.length; s > i; i++) n = o[i], ".." === n ? (0 === r.length && e.error("Invalid path:", t), r.pop()) : "." !== n && r.push(n);
        return r.join("/")
    }

    function s(e) {
        return e = i(e), /#$/.test(e) ? e = e.slice(0, -1) : -1 === e.indexOf("?") && !/\.(?:css|js)$/.test(e) && (e += ".js"), e
    }

    function a(e) {
        if ("#" === e.charAt(0)) return e.substring(1);
        var t;
        if (l(e) && (t = c.alias)) {
            var n = e.split("/"),
                o = n[0];
            t.hasOwnProperty(o) && (n[0] = t[o], e = n.join("/"))
        }
        return e
    }

    function u(e) {
        return ~e.indexOf("://") || 0 === e.indexOf("//")
    }

    function l(e) {
        var t = e.charAt(0);
        return -1 === e.indexOf("://") && "." !== t && "/" !== t
    }
    var c = t.config,
        f = {},
        t = o.location,
        d = t.protocol + "//" + t.host + function(e) {
            return "/" !== e.charAt(0) && (e = "/" + e), e
        }(t.pathname);
    ~d.indexOf("\\") && (d = d.replace(/\\/g, "/")), e.dirname = r, e.realpath = i, e.normalize = s, e.parseAlias = a, e.parseMap = function(t, n) {
        if (n = n || c.map || [], !n.length) return t;
        var o = t;
        return e.forEach(n, function(e) {
            e && 1 < e.length && (o = o.replace(e[0], e[1]))
        }), f[o] = t, o
    }, e.unParseMap = function(e) {
        return f[e] || e
    }, e.id2Uri = function(e, t) {
        var n, e = a(e),
            t = t || d;
        return u(e) ? n = e : 0 === e.indexOf("./") || 0 === e.indexOf("../") ? (e = e.replace(/^\.\//, ""), n = r(t) + e) : n = "/" === e.charAt(0) && "/" !== e.charAt(1) ? t.replace(/^(\w+:\/\/[^\/]*)\/?.*$/, "$1") + e : c.base + "/" + e, s(n)
    }, e.isAbsolute = u, e.isTopLevel = l, e.pageUrl = d
}(seajs._util, seajs._data, seajs._fn, this),
function(e, t) {
    function n(n, i) {
        function s() {
            s.isCalled || (s.isCalled = !0, clearTimeout(a), i())
        }
        "SCRIPT" === n.nodeName ? o(n, s) : r(n, s);
        var a = setTimeout(function() {
            e.log("Time is out:", n.src), s()
        }, t.config.timeout)
    }

    function o(e, t) {
        e.onload = e.onerror = e.onreadystatechange = function() {
            if (/loaded|complete|undefined/.test(e.readyState)) {
                if (e.onload = e.onerror = e.onreadystatechange = null, e.parentNode) {
                    try {
                        if (e.clearAttributes) e.clearAttributes();
                        else
                            for (var n in e) delete e[n]
                    } catch (o) {}
                    s.removeChild(e)
                }
                e = void 0, t()
            }
        }
    }

    function r(e, t) {
        e.attachEvent ? e.attachEvent("onload", t) : setTimeout(function() {
            i(e, t)
        }, 0)
    }

    function i(e, t) {
        if (!t.isCalled) {
            var n;
            if (u) e.sheet && (n = !0);
            else if (e.sheet) try {
                e.sheet.cssRules && (n = !0)
            } catch (o) {
                1e3 === o.code && (n = !0)
            }
            setTimeout(function() {
                n ? t() : i(e, t)
            }, 1)
        }
    }
    var s = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
        a = navigator.userAgent,
        u = ~a.indexOf("AppleWebKit");
    e.getAsset = function(t, o, r) {
        var i = /\.css(?:\?|$)/i.test(t),
            a = document.createElement(i ? "link" : "script");
        r && (r = e.isFunction(r) ? r(t) : r) && (a.charset = r), n(a, o), i ? (a.rel = "stylesheet", a.href = t, s.appendChild(a)) : (a.async = "async", a.src = t, l = a, s.insertBefore(a, s.firstChild), l = null)
    };
    var l, c;
    e.getCurrentScript = function() {
        if (l) return l;
        if (c && "interactive" === c.readyState) return c;
        for (var e = s.getElementsByTagName("script"), t = 0; t < e.length; t++) {
            var n = e[t];
            if ("interactive" === n.readyState) return c = n
        }
    }, e.getScriptAbsoluteSrc = function(e) {
        return e.hasAttribute ? e.src : e.getAttribute("src", 4)
    }, e.isOpera = ~a.indexOf("Opera")
}(seajs._util, seajs._data),
function(e) {
    e.Module = function(e, t, n) {
        this.id = e, this.dependencies = t || [], this.factory = n
    }
}(seajs._fn),
function(e, t, n) {
    n.define = function(o, r, i) {
        var s = arguments.length;
        if (1 === s ? (i = o, o = void 0) : 2 === s && (i = r, r = void 0, e.isArray(o) && (r = o, o = void 0)), !e.isArray(r) && e.isFunction(i)) {
            for (var a, s = i.toString(), u = /(?:^|[^.])\brequire\s*\(\s*(["'])([^"'\s\)]+)\1\s*\)/g, l = [], s = s.replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g, "\n").replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, "\n"); a = u.exec(s);) a[2] && l.push(a[2]);
            r = e.unique(l)
        }
        if (o) var c = e.id2Uri(o);
        else document.attachEvent && !e.isOpera && ((s = e.getCurrentScript()) && (c = e.unParseMap(e.getScriptAbsoluteSrc(s))), c || e.log("Failed to derive URL from interactive script for:", i.toString()));
        s = new n.Module(o, r, i), c ? (e.memoize(c, s), t.packageMods.push(s)) : t.anonymousMod = s
    }
}(seajs._util, seajs._data, seajs._fn),
function(e, t, n) {
    function o(n) {
        var o, s, u = this.context;
        return e.isObject(n) ? (s = n, o = s.id) : e.isString(n) && (o = a.resolve(n, u), s = t.memoizedMods[o]), s ? i(u, o) ? (e.log("Found circular dependencies:", o), s.exports) : (s.exports || (n = s, u = {
            uri: o,
            parent: u
        }, o = n.factory, n.exports = {}, delete n.factory, delete n.ready, e.isFunction(o) ? (u = o(r(u), n.exports, n), void 0 !== u && (n.exports = u)) : void 0 !== o && (n.exports = o)), s.exports) : null
    }

    function r(e) {
        function t(e) {
            return o.call(n, e)
        }
        var n = {
            context: e || {}
        };
        t.constructor = o;
        for (var r in a) a.hasOwnProperty(r) && function(e) {
            t[e] = function() {
                return a[e].apply(n, s.call(arguments))
            }
        }(r);
        return t
    }

    function i(e, t) {
        return e.uri === t ? !0 : e.parent ? i(e.parent, t) : !1
    }
    var s = Array.prototype.slice,
        a = o.prototype;
    a.resolve = function(t, n) {
        return e.isString(t) ? e.id2Uri(t, (n || this.context || {}).uri) : e.map(t, function(e) {
            return a.resolve(e, n)
        })
    }, a.async = function(e, t) {
        n.load(e, t, this.context)
    }, a.load = function(t, n, o) {
        e.getAsset(t, n, o)
    }, n.Require = o, n.createRequire = r
}(seajs._util, seajs._data, seajs._fn),
function(e, t, n) {
    function o(t, n) {
        var i = h.preload,
            s = i.length;
        if (s) g += s, h.preload = [], e.forEach(m.resolve(i), function(e) {
            b[e] = 1
        }), r(i, function() {
            g -= s, o(t)
        });
        else if (n && d(n)) t();
        else if (v.push(t), 0 === g)
            for (; i = v.shift();) i()
    }

    function r(o, r, s) {
        e.isString(o) && (o = [o]);
        var a = m.resolve(o, s);
        i(a, function() {
            var o = n.createRequire(s),
                i = e.map(a, function(e) {
                    return o(t.memoizedMods[e])
                });
            r && r.apply(null, i)
        })
    }

    function i(e, t) {
        var n = l(e);
        if (0 === n.length) u(n), t();
        else
            for (var r = 0, a = n.length, f = a; a > r; r++)(function(e) {
                function r() {
                    o(function() {
                        var o = p[e];
                        if (o) {
                            var r = o.dependencies;
                            r.length && (r = o.dependencies = m.resolve(r, {
                                uri: o.id
                            }));
                            var s = r.length;
                            s && (r = c(e, r), s = r.length), s && (f += s, i(r, function() {
                                f -= s, 0 === f && (u(n), t())
                            }))
                        }
                        0 === --f && (u(n), t())
                    }, e)
                }
                p[e] ? r() : s(e, r)
            })(n[r])
    }

    function s(n, o) {
        var r = e.parseMap(n);
        y[r] ? o() : w[r] ? x[r].push(o) : (w[r] = !0, x[r] = [o], m.load(r, function() {
            y[r] = !0;
            var o = t.anonymousMod;
            o && (p[n] || a(n, o), t.anonymousMod = null), (o = t.packageMods[0]) && !p[n] && (p[n] = o), t.packageMods = [], w[r] && delete w[r], x[r] && (e.forEach(x[r], function(e) {
                e()
            }), delete x[r])
        }, t.config.charset))
    }

    function a(e, t) {
        t.id = e, p[e] = t
    }

    function u(t) {
        e.forEach(t, function(e) {
            p[e] && (p[e].ready = !0)
        })
    }

    function l(t) {
        return e.filter(t, function(e) {
            return e = p[e], !e || !e.ready
        })
    }

    function c(t, n) {
        return e.filter(n, function(e) {
            return !f(p[e], t)
        })
    }

    function f(t, n) {
        if (!t || t.ready) return !1;
        var o = t.dependencies || [];
        if (o.length) {
            if (~e.indexOf(o, n)) return !0;
            for (var r = 0; r < o.length; r++)
                if (f(p[o[r]], n)) return !0
        }
        return !1
    }

    function d(t) {
        if (b[t]) return !0;
        for (var n in b)
            if (p[n] && ~e.indexOf(p[n].dependencies, t)) return !0;
        return !1
    }
    var p = t.memoizedMods,
        h = t.config,
        m = n.Require.prototype,
        g = 0,
        v = [],
        b = {},
        w = {},
        y = {},
        x = {};
    e.memoize = a, n.preload = o, n.load = r
}(seajs._util, seajs._data, seajs._fn),
function(e, t, n, o) {
    function r(e, n) {
        e && e !== n && t.error("Alias is conflicted:", n)
    }
    var i = n.config,
        s = "seajs-ts=" + t.now(),
        n = document.getElementById("seajsnode");
    n || (n = document.getElementsByTagName("script"), n = n[n.length - 1]);
    var a = t.getScriptAbsoluteSrc(n) || t.pageUrl,
        a = t.dirname(a);
    t.loaderDir = a;
    var u = a.match(/^(.+\/)seajs\/[\d\.]+\/$/);
    u && (a = u[1]), i.base = a, (n = n.getAttribute("data-main")) && (t.isTopLevel(n) && (n = "./" + n), i.main = n), i.timeout = 2e4, o.config = function(n) {
        for (var a in n) {
            var u = i[a],
                l = n[a];
            if (u && "alias" === a)
                for (var c in l) l.hasOwnProperty(c) && (r(u[c], l[c]), u[c] = l[c]);
            else !u || "map" !== a && "preload" !== a ? i[a] = l : (t.isArray(l) || (l = [l]), t.forEach(l, function(e) {
                e && u.push(e)
            }))
        }
        return (n = i.base) && !t.isAbsolute(n) && (i.base = t.id2Uri("./" + n + "#")), 2 === i.debug && (i.debug = 1, o.config({
            map: [
                [/.*/, function(e) {
                    return -1 === e.indexOf("seajs-ts=") && (e += (-1 === e.indexOf("?") ? "?" : "&") + s), e
                }]
            ]
        })), i.debug && (e.debug = i.debug), this
    }
}(seajs, seajs._util, seajs._data, seajs._fn),
function(e, t, n, o) {
    var e = e.config,
        r = {},
        i = t.loaderDir;
    t.forEach("base,map,text,json,coffee,less".split(","), function(e) {
        e = "plugin-" + e, r[e] = i + e
    }), n.config({
        alias: r
    }), (~o.location.search.indexOf("seajs-debug") || ~document.cookie.indexOf("seajs=1")) && (n.config({
        debug: 2
    }), e.preload.push("plugin-map"))
}(seajs._data, seajs._util, seajs._fn, this),
function(e, t, n) {
    n.use = function(e, t) {
            n.preload(function() {
                n.load(e, t)
            })
        }, (t = t.config.main) && n.use([t]),
        function(t) {
            if (t) {
                for (var o = {
                        0: "config",
                        1: "use",
                        2: "define"
                    }, r = 0; r < t.length; r += 2) n[o[t[r]]].apply(e, t[r + 1]);
                delete e._seajs
            }
        }((e._seajs || 0).args)
}(seajs, seajs._data, seajs._fn),
function(e, t, n, o) {
    if (e._seajs) o.seajs = e._seajs;
    else {
        e.config = n.config, e.use = n.use;
        var r = o.define;
        o.define = n.define, e.noConflict = function(t) {
            return o.seajs = e._seajs, t && (o.define = r, e.define = n.define), e
        }, e.pluginSDK = {
            util: e._util,
            data: e._data
        }, (t = t.config.debug) && (e.debug = !!t), delete e._util, delete e._data, delete e._fn, delete e._seajs
    }
}(seajs, seajs._data, seajs._fn, this);
