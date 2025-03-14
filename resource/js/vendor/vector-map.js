
(function(e) {
    var t = {
        set: {
            colors: 1,
            values: 1,
            backgroundColor: 1,
            scaleColors: 1,
            normalizeFunction: 1,
            focus: 1
        },
        get: {
            selectedRegions: 1,
            selectedMarkers: 1,
            mapObject: 1,
            regionName: 1
        }
    };
    e.fn.vectorMap = function(e) {
        var n, r, i, n = this.children(".jvectormap-container").data("mapObject");
        if (e === "addMap") jvm.WorldMap.maps[arguments[1]] = arguments[2];
        else {
            if (!(e !== "set" && e !== "get" || !t[e][arguments[1]])) return r = arguments[1].charAt(0).toUpperCase() + arguments[1].substr(1), n[e + r].apply(n, Array.prototype.slice.call(arguments, 2));
            e = e || {}, e.container = this, n = new jvm.WorldMap(e)
        }
        return this
    }
})(jQuery),
function(e) {
    function r(t) {
        var n = t || window.event,
            r = [].slice.call(arguments, 1),
            i = 0,
            s = !0,
            o = 0,
            u = 0;
        return t = e.event.fix(n), t.type = "mousewheel", n.wheelDelta && (i = n.wheelDelta / 120), n.detail && (i = -n.detail / 3), u = i, n.axis !== undefined && n.axis === n.HORIZONTAL_AXIS && (u = 0, o = -1 * i), n.wheelDeltaY !== undefined && (u = n.wheelDeltaY / 120), n.wheelDeltaX !== undefined && (o = -1 * n.wheelDeltaX / 120), r.unshift(t, i, o, u), (e.event.dispatch || e.event.handle).apply(this, r)
    }
    var t = ["DOMMouseScroll", "mousewheel"];
    if (e.event.fixHooks)
        for (var n = t.length; n;) e.event.fixHooks[t[--n]] = e.event.mouseHooks;
    e.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener)
                for (var e = t.length; e;) this.addEventListener(t[--e], r, !1);
            else this.onmousewheel = r
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var e = t.length; e;) this.removeEventListener(t[--e], r, !1);
            else this.onmousewheel = null
        }
    }, e.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    })
}(jQuery);
var jvm = {
    inherits: function(e, t) {
        function n() {}
        n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e, e.parentClass = t
    },
    mixin: function(e, t) {
        var n;
        for (n in t.prototype) t.prototype.hasOwnProperty(n) && (e.prototype[n] = t.prototype[n])
    },
    min: function(e) {
        var t = Number.MAX_VALUE,
            n;
        if (e instanceof Array)
            for (n = 0; n < e.length; n++) e[n] < t && (t = e[n]);
        else
            for (n in e) e[n] < t && (t = e[n]);
        return t
    },
    max: function(e) {
        var t = Number.MIN_VALUE,
            n;
        if (e instanceof Array)
            for (n = 0; n < e.length; n++) e[n] > t && (t = e[n]);
        else
            for (n in e) e[n] > t && (t = e[n]);
        return t
    },
    keys: function(e) {
        var t = [],
            n;
        for (n in e) t.push(n);
        return t
    },
    values: function(e) {
        var t = [],
            n, r;
        for (r = 0; r < arguments.length; r++) {
            e = arguments[r];
            for (n in e) t.push(e[n])
        }
        return t
    }
};
jvm.$ = jQuery, jvm.AbstractElement = function(e, t) {
    this.node = this.createElement(e), this.name = e, this.properties = {}, t && this.set(t)
}, jvm.AbstractElement.prototype.set = function(e, t) {
    var n;
    if (typeof e == "object")
        for (n in e) this.properties[n] = e[n], this.applyAttr(n, e[n]);
    else this.properties[e] = t, this.applyAttr(e, t)
}, jvm.AbstractElement.prototype.get = function(e) {
    return this.properties[e]
}, jvm.AbstractElement.prototype.applyAttr = function(e, t) {
    this.node.setAttribute(e, t)
}, jvm.AbstractElement.prototype.remove = function() {
    jvm.$(this.node).remove()
}, jvm.AbstractCanvasElement = function(e, t, n) {
    this.container = e, this.setSize(t, n), this.rootElement = new jvm[this.classPrefix + "GroupElement"], this.node.appendChild(this.rootElement.node), this.container.appendChild(this.node)
}, jvm.AbstractCanvasElement.prototype.add = function(e, t) {
    t = t || this.rootElement, t.add(e), e.canvas = this
}, jvm.AbstractCanvasElement.prototype.addPath = function(e, t, n) {
    var r = new jvm[this.classPrefix + "PathElement"](e, t);
    return this.add(r, n), r
}, jvm.AbstractCanvasElement.prototype.addCircle = function(e, t, n) {
    var r = new jvm[this.classPrefix + "CircleElement"](e, t);
    return this.add(r, n), r
}, jvm.AbstractCanvasElement.prototype.addGroup = function(e) {
    var t = new jvm[this.classPrefix + "GroupElement"];
    return e ? e.node.appendChild(t.node) : this.node.appendChild(t.node), t.canvas = this, t
}, jvm.AbstractShapeElement = function(e, t, n) {
    this.style = n || {}, this.style.current = {}, this.isHovered = !1, this.isSelected = !1, this.updateStyle()
}, jvm.AbstractShapeElement.prototype.setHovered = function(e) {
    this.isHovered !== e && (this.isHovered = e, this.updateStyle())
}, jvm.AbstractShapeElement.prototype.setSelected = function(e) {
    this.isSelected !== e && (this.isSelected = e, this.updateStyle(), jvm.$(this.node).trigger("selected", [e]))
}, jvm.AbstractShapeElement.prototype.setStyle = function(e, t) {
    var n = {};
    typeof e == "object" ? n = e : n[e] = t, jvm.$.extend(this.style.current, n), this.updateStyle()
}, jvm.AbstractShapeElement.prototype.updateStyle = function() {
    var e = {};
    jvm.AbstractShapeElement.mergeStyles(e, this.style.initial), jvm.AbstractShapeElement.mergeStyles(e, this.style.current), this.isHovered && jvm.AbstractShapeElement.mergeStyles(e, this.style.hover), this.isSelected && (jvm.AbstractShapeElement.mergeStyles(e, this.style.selected), this.isHovered && jvm.AbstractShapeElement.mergeStyles(e, this.style.selectedHover)), this.set(e)
}, jvm.AbstractShapeElement.mergeStyles = function(e, t) {
    var n;
    t = t || {};
    for (n in t) t[n] === null ? delete e[n] : e[n] = t[n]
}, jvm.SVGElement = function(e, t) {
    jvm.SVGElement.parentClass.apply(this, arguments)
}, jvm.inherits(jvm.SVGElement, jvm.AbstractElement), jvm.SVGElement.svgns = "http://www.w3.org/2000/svg", jvm.SVGElement.prototype.createElement = function(e) {
    return document.createElementNS(jvm.SVGElement.svgns, e)
}, jvm.SVGElement.prototype.addClass = function(e) {
    this.node.setAttribute("class", e)
}, jvm.SVGElement.prototype.getElementCtr = function(e) {
    return jvm["SVG" + e]
}, jvm.SVGElement.prototype.getBBox = function() {
    return this.node.getBBox()
}, jvm.SVGGroupElement = function() {
    jvm.SVGGroupElement.parentClass.call(this, "g")
}, jvm.inherits(jvm.SVGGroupElement, jvm.SVGElement), jvm.SVGGroupElement.prototype.add = function(e) {
    this.node.appendChild(e.node)
}, jvm.SVGCanvasElement = function(e, t, n) {
    this.classPrefix = "SVG", jvm.SVGCanvasElement.parentClass.call(this, "svg"), jvm.AbstractCanvasElement.apply(this, arguments)
}, jvm.inherits(jvm.SVGCanvasElement, jvm.SVGElement), jvm.mixin(jvm.SVGCanvasElement, jvm.AbstractCanvasElement), jvm.SVGCanvasElement.prototype.setSize = function(e, t) {
    this.width = e, this.height = t, this.node.setAttribute("width", e), this.node.setAttribute("height", t)
}, jvm.SVGCanvasElement.prototype.applyTransformParams = function(e, t, n) {
    this.scale = e, this.transX = t, this.transY = n, this.rootElement.node.setAttribute("transform", "scale(" + e + ") translate(" + t + ", " + n + ")")
}, jvm.SVGShapeElement = function(e, t, n) {
    jvm.SVGShapeElement.parentClass.call(this, e, t), jvm.AbstractShapeElement.apply(this, arguments)
}, jvm.inherits(jvm.SVGShapeElement, jvm.SVGElement), jvm.mixin(jvm.SVGShapeElement, jvm.AbstractShapeElement), jvm.SVGPathElement = function(e, t) {
    jvm.SVGPathElement.parentClass.call(this, "path", e, t), this.node.setAttribute("fill-rule", "evenodd")
}, jvm.inherits(jvm.SVGPathElement, jvm.SVGShapeElement), jvm.SVGCircleElement = function(e, t) {
    jvm.SVGCircleElement.parentClass.call(this, "circle", e, t)
}, jvm.inherits(jvm.SVGCircleElement, jvm.SVGShapeElement), jvm.VMLElement = function(e, t) {
    jvm.VMLElement.VMLInitialized || jvm.VMLElement.initializeVML(), jvm.VMLElement.parentClass.apply(this, arguments)
}, jvm.inherits(jvm.VMLElement, jvm.AbstractElement), jvm.VMLElement.VMLInitialized = !1, jvm.VMLElement.initializeVML = function() {
    try {
        document.namespaces.rvml || document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), jvm.VMLElement.prototype.createElement = function(e) {
            return document.createElement("<rvml:" + e + ' class="rvml">')
        }
    } catch (e) {
        jvm.VMLElement.prototype.createElement = function(e) {
            return document.createElement("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
        }
    }
    document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)"), jvm.VMLElement.VMLInitialized = !0
}, jvm.VMLElement.prototype.getElementCtr = function(e) {
    return jvm["VML" + e]
}, jvm.VMLElement.prototype.addClass = function(e) {
    jvm.$(this.node).addClass(e)
}, jvm.VMLElement.prototype.applyAttr = function(e, t) {
    this.node[e] = t
}, jvm.VMLElement.prototype.getBBox = function() {
    var e = jvm.$(this.node);
    return {
        x: e.position().left / this.canvas.scale,
        y: e.position().top / this.canvas.scale,
        width: e.width() / this.canvas.scale,
        height: e.height() / this.canvas.scale
    }
}, jvm.VMLGroupElement = function() {
    jvm.VMLGroupElement.parentClass.call(this, "group"), this.node.style.left = "0px", this.node.style.top = "0px", this.node.coordorigin = "0 0"
}, jvm.inherits(jvm.VMLGroupElement, jvm.VMLElement), jvm.VMLGroupElement.prototype.add = function(e) {
    this.node.appendChild(e.node)
}, jvm.VMLCanvasElement = function(e, t, n) {
    this.classPrefix = "VML", jvm.VMLCanvasElement.parentClass.call(this, "group"), jvm.AbstractCanvasElement.apply(this, arguments), this.node.style.position = "absolute"
}, jvm.inherits(jvm.VMLCanvasElement, jvm.VMLElement), jvm.mixin(jvm.VMLCanvasElement, jvm.AbstractCanvasElement), jvm.VMLCanvasElement.prototype.setSize = function(e, t) {
    var n, r, i, s;
    this.width = e, this.height = t, this.node.style.width = e + "px", this.node.style.height = t + "px", this.node.coordsize = e + " " + t, this.node.coordorigin = "0 0";
    if (this.rootElement) {
        n = this.rootElement.node.getElementsByTagName("shape");
        for (i = 0, s = n.length; i < s; i++) n[i].coordsize = e + " " + t, n[i].style.width = e + "px", n[i].style.height = t + "px";
        r = this.node.getElementsByTagName("group");
        for (i = 0, s = r.length; i < s; i++) r[i].coordsize = e + " " + t, r[i].style.width = e + "px", r[i].style.height = t + "px"
    }
}, jvm.VMLCanvasElement.prototype.applyTransformParams = function(e, t, n) {
    this.scale = e, this.transX = t, this.transY = n, this.rootElement.node.coordorigin = this.width - t - this.width / 100 + "," + (this.height - n - this.height / 100), this.rootElement.node.coordsize = this.width / e + "," + this.height / e
}, jvm.VMLShapeElement = function(e, t) {
    jvm.VMLShapeElement.parentClass.call(this, e, t), this.fillElement = new jvm.VMLElement("fill"), this.strokeElement = new jvm.VMLElement("stroke"), this.node.appendChild(this.fillElement.node), this.node.appendChild(this.strokeElement.node), this.node.stroked = !1, jvm.AbstractShapeElement.apply(this, arguments)
}, jvm.inherits(jvm.VMLShapeElement, jvm.VMLElement), jvm.mixin(jvm.VMLShapeElement, jvm.AbstractShapeElement), jvm.VMLShapeElement.prototype.applyAttr = function(e, t) {
    switch (e) {
        case "fill":
            this.node.fillcolor = t;
            break;
        case "fill-opacity":
            this.fillElement.node.opacity = Math.round(t * 100) + "%";
            break;
        case "stroke":
            t === "none" ? this.node.stroked = !1 : this.node.stroked = !0, this.node.strokecolor = t;
            break;
        case "stroke-opacity":
            this.strokeElement.node.opacity = Math.round(t * 100) + "%";
            break;
        case "stroke-width":
            parseInt(t, 10) === 0 ? this.node.stroked = !1 : this.node.stroked = !0, this.node.strokeweight = t;
            break;
        case "d":
            this.node.path = jvm.VMLPathElement.pathSvgToVml(t);
            break;
        default:
            jvm.VMLShapeElement.parentClass.prototype.applyAttr.apply(this, arguments)
    }
}, jvm.VMLPathElement = function(e, t) {
    var n = new jvm.VMLElement("skew");
    jvm.VMLPathElement.parentClass.call(this, "shape", e, t), this.node.coordorigin = "0 0", n.node.on = !0, n.node.matrix = "0.01,0,0,0.01,0,0", n.node.offset = "0,0", this.node.appendChild(n.node)
}, jvm.inherits(jvm.VMLPathElement, jvm.VMLShapeElement), jvm.VMLPathElement.prototype.applyAttr = function(e, t) {
    e === "d" ? this.node.path = jvm.VMLPathElement.pathSvgToVml(t) : jvm.VMLShapeElement.prototype.applyAttr.call(this, e, t)
}, jvm.VMLPathElement.pathSvgToVml = function(e) {
    var t = "",
        n = 0,
        r = 0,
        i, s;
    return e = e.replace(/(-?\d+)e(-?\d+)/g, "0"), e.replace(/([MmLlHhVvCcSs])\s*((?:-?\d*(?:\.\d+)?\s*,?\s*)+)/g, function(e, t, o, u) {
        o = o.replace(/(\d)-/g, "$1,-").replace(/^\s+/g, "").replace(/\s+$/g, "").replace(/\s+/g, ",").split(","), o[0] || o.shift();
        for (var a = 0, f = o.length; a < f; a++) o[a] = Math.round(100 * o[a]);
        switch (t) {
            case "m":
                return n += o[0], r += o[1], "t" + o.join(",");
            case "M":
                return n = o[0], r = o[1], "m" + o.join(",");
            case "l":
                return n += o[0], r += o[1], "r" + o.join(",");
            case "L":
                return n = o[0], r = o[1], "l" + o.join(",");
            case "h":
                return n += o[0], "r" + o[0] + ",0";
            case "H":
                return n = o[0], "l" + n + "," + r;
            case "v":
                return r += o[0], "r0," + o[0];
            case "V":
                return r = o[0], "l" + n + "," + r;
            case "c":
                return i = n + o[o.length - 4], s = r + o[o.length - 3], n += o[o.length - 2], r += o[o.length - 1], "v" + o.join(",");
            case "C":
                return i = o[o.length - 4], s = o[o.length - 3], n = o[o.length - 2], r = o[o.length - 1], "c" + o.join(",");
            case "s":
                return o.unshift(r - s), o.unshift(n - i), i = n + o[o.length - 4], s = r + o[o.length - 3], n += o[o.length - 2], r += o[o.length - 1], "v" + o.join(",");
            case "S":
                return o.unshift(r + r - s), o.unshift(n + n - i), i = o[o.length - 4], s = o[o.length - 3], n = o[o.length - 2], r = o[o.length - 1], "c" + o.join(",")
        }
        return ""
    }).replace(/z/g, "e")
}, jvm.VMLCircleElement = function(e, t) {
    jvm.VMLCircleElement.parentClass.call(this, "oval", e, t)
}, jvm.inherits(jvm.VMLCircleElement, jvm.VMLShapeElement), jvm.VMLCircleElement.prototype.applyAttr = function(e, t) {
    switch (e) {
        case "r":
            this.node.style.width = t * 2 + "px", this.node.style.height = t * 2 + "px", this.applyAttr("cx", this.get("cx") || 0), this.applyAttr("cy", this.get("cy") || 0);
            break;
        case "cx":
            if (!t) return;
            this.node.style.left = t - (this.get("r") || 0) + "px";
            break;
        case "cy":
            if (!t) return;
            this.node.style.top = t - (this.get("r") || 0) + "px";
            break;
        default:
            jvm.VMLCircleElement.parentClass.prototype.applyAttr.call(this, e, t)
    }
}, jvm.VectorCanvas = function(e, t, n) {
    return this.mode = window.SVGAngle ? "svg" : "vml", this.mode == "svg" ? this.impl = new jvm.SVGCanvasElement(e, t, n) : this.impl = new jvm.VMLCanvasElement(e, t, n), this.impl
}, jvm.SimpleScale = function(e) {
    this.scale = e
}, jvm.SimpleScale.prototype.getValue = function(e) {
    return e
}, jvm.OrdinalScale = function(e) {
    this.scale = e
}, jvm.OrdinalScale.prototype.getValue = function(e) {
    return this.scale[e]
}, jvm.NumericScale = function(e, t, n, r) {
    this.scale = [], t = t || "linear", e && this.setScale(e), t && this.setNormalizeFunction(t), n && this.setMin(n), r && this.setMax(r)
}, jvm.NumericScale.prototype = {
    setMin: function(e) {
        this.clearMinValue = e, typeof this.normalize == "function" ? this.minValue = this.normalize(e) : this.minValue = e
    },
    setMax: function(e) {
        this.clearMaxValue = e, typeof this.normalize == "function" ? this.maxValue = this.normalize(e) : this.maxValue = e
    },
    setScale: function(e) {
        var t;
        for (t = 0; t < e.length; t++) this.scale[t] = [e[t]]
    },
    setNormalizeFunction: function(e) {
        e === "polynomial" ? this.normalize = function(e) {
            return Math.pow(e, .2)
        } : e === "linear" ? delete this.normalize : this.normalize = e, this.setMin(this.clearMinValue), this.setMax(this.clearMaxValue)
    },
    getValue: function(e) {
        var t = [],
            n = 0,
            r, i = 0,
            s;
        typeof this.normalize == "function" && (e = this.normalize(e));
        for (i = 0; i < this.scale.length - 1; i++) r = this.vectorLength(this.vectorSubtract(this.scale[i + 1], this.scale[i])), t.push(r), n += r;
        s = (this.maxValue - this.minValue) / n;
        for (i = 0; i < t.length; i++) t[i] *= s;
        i = 0, e -= this.minValue;
        while (e - t[i] >= 0) e -= t[i], i++;
        return i == this.scale.length - 1 ? e = this.vectorToNum(this.scale[i]) : e = this.vectorToNum(this.vectorAdd(this.scale[i], this.vectorMult(this.vectorSubtract(this.scale[i + 1], this.scale[i]), e / t[i]))), e
    },
    vectorToNum: function(e) {
        var t = 0,
            n;
        for (n = 0; n < e.length; n++) t += Math.round(e[n]) * Math.pow(256, e.length - n - 1);
        return t
    },
    vectorSubtract: function(e, t) {
        var n = [],
            r;
        for (r = 0; r < e.length; r++) n[r] = e[r] - t[r];
        return n
    },
    vectorAdd: function(e, t) {
        var n = [],
            r;
        for (r = 0; r < e.length; r++) n[r] = e[r] + t[r];
        return n
    },
    vectorMult: function(e, t) {
        var n = [],
            r;
        for (r = 0; r < e.length; r++) n[r] = e[r] * t;
        return n
    },
    vectorLength: function(e) {
        var t = 0,
            n;
        for (n = 0; n < e.length; n++) t += e[n] * e[n];
        return Math.sqrt(t)
    }
}, jvm.ColorScale = function(e, t, n, r) {
    jvm.ColorScale.parentClass.apply(this, arguments)
}, jvm.inherits(jvm.ColorScale, jvm.NumericScale), jvm.ColorScale.prototype.setScale = function(e) {
    var t;
    for (t = 0; t < e.length; t++) this.scale[t] = jvm.ColorScale.rgbToArray(e[t])
}, jvm.ColorScale.prototype.getValue = function(e) {
    return jvm.ColorScale.numToRgb(jvm.ColorScale.parentClass.prototype.getValue.call(this, e))
}, jvm.ColorScale.arrayToRgb = function(e) {
    var t = "#",
        n, r;
    for (r = 0; r < e.length; r++) n = e[r].toString(16), t += n.length == 1 ? "0" + n : n;
    return t
}, jvm.ColorScale.numToRgb = function(e) {
    e = e.toString(16);
    while (e.length < 6) e = "0" + e;
    return "#" + e
}, jvm.ColorScale.rgbToArray = function(e) {
    return e = e.substr(1), [parseInt(e.substr(0, 2), 16), parseInt(e.substr(2, 2), 16), parseInt(e.substr(4, 2), 16)]
}, jvm.DataSeries = function(e, t) {
    var n;
    e = e || {}, e.attribute = e.attribute || "fill", this.elements = t, this.params = e, e.attributes && this.setAttributes(e.attributes), jvm.$.isArray(e.scale) ? (n = e.attribute === "fill" || e.attribute === "stroke" ? jvm.ColorScale : jvm.NumericScale, this.scale = new n(e.scale, e.normalizeFunction, e.min, e.max)) : e.scale ? this.scale = new jvm.OrdinalScale(e.scale) : this.scale = new jvm.SimpleScale(e.scale), this.values = e.values || {}, this.setValues(this.values)
}, jvm.DataSeries.prototype = {
    setAttributes: function(e, t) {
        var n = e,
            r;
        if (typeof e == "string") this.elements[e] && this.elements[e].setStyle(this.params.attribute, t);
        else
            for (r in n) this.elements[r] && this.elements[r].element.setStyle(this.params.attribute, n[r])
    },
    setValues: function(e) {
        var t = Number.MIN_VALUE,
            n = Number.MAX_VALUE,
            r, i, s = {};
        if (this.scale instanceof jvm.OrdinalScale || this.scale instanceof jvm.SimpleScale)
            for (i in e) e[i] ? s[i] = this.scale.getValue(e[i]) : s[i] = this.elements[i].element.style.initial[this.params.attribute];
        else {
            if (!this.params.min || !this.params.max) {
                for (i in e) r = parseFloat(e[i]), r > t && (t = e[i]), r < n && (n = r);
                this.params.min || this.scale.setMin(n), this.params.max || this.scale.setMax(t), this.params.min = n, this.params.max = t
            }
            for (i in e) r = parseFloat(e[i]), isNaN(r) ? s[i] = this.elements[i].element.style.initial[this.params.attribute] : s[i] = this.scale.getValue(r)
        }
        this.setAttributes(s), jvm.$.extend(this.values, e)
    },
    clear: function() {
        var e, t = {};
        for (e in this.values) this.elements[e] && (t[e] = this.elements[e].element.style.initial[this.params.attribute]);
        this.setAttributes(t), this.values = {}
    },
    setScale: function(e) {
        this.scale.setScale(e), this.values && this.setValues(this.values)
    },
    setNormalizeFunction: function(e) {
        this.scale.setNormalizeFunction(e), this.values && this.setValues(this.values)
    }
}, jvm.Proj = {
    degRad: 180 / Math.PI,
    radDeg: Math.PI / 180,
    radius: 6381372,
    sgn: function(e) {
        return e > 0 ? 1 : e < 0 ? -1 : e
    },
    mill: function(e, t, n) {
        return {
            x: this.radius * (t - n) * this.radDeg,
            y: -this.radius * Math.log(Math.tan((45 + .4 * e) * this.radDeg)) / .8
        }
    },
    mill_inv: function(e, t, n) {
        return {
            lat: (2.5 * Math.atan(Math.exp(.8 * t / this.radius)) - 5 * Math.PI / 8) * this.degRad,
            lng: (n * this.radDeg + e / this.radius) * this.degRad
        }
    },
    merc: function(e, t, n) {
        return {
            x: this.radius * (t - n) * this.radDeg,
            y: -this.radius * Math.log(Math.tan(Math.PI / 4 + e * Math.PI / 360))
        }
    },
    merc_inv: function(e, t, n) {
        return {
            lat: (2 * Math.atan(Math.exp(t / this.radius)) - Math.PI / 2) * this.degRad,
            lng: (n * this.radDeg + e / this.radius) * this.degRad
        }
    },
    aea: function(e, t, n) {
        var r = 0,
            i = n * this.radDeg,
            s = 29.5 * this.radDeg,
            o = 45.5 * this.radDeg,
            u = e * this.radDeg,
            a = t * this.radDeg,
            f = (Math.sin(s) + Math.sin(o)) / 2,
            l = Math.cos(s) * Math.cos(s) + 2 * f * Math.sin(s),
            c = f * (a - i),
            h = Math.sqrt(l - 2 * f * Math.sin(u)) / f,
            p = Math.sqrt(l - 2 * f * Math.sin(r)) / f;
        return {
            x: h * Math.sin(c) * this.radius,
            y: -(p - h * Math.cos(c)) * this.radius
        }
    },
    aea_inv: function(e, t, n) {
        var r = e / this.radius,
            i = t / this.radius,
            s = 0,
            o = n * this.radDeg,
            u = 29.5 * this.radDeg,
            a = 45.5 * this.radDeg,
            f = (Math.sin(u) + Math.sin(a)) / 2,
            l = Math.cos(u) * Math.cos(u) + 2 * f * Math.sin(u),
            c = Math.sqrt(l - 2 * f * Math.sin(s)) / f,
            h = Math.sqrt(r * r + (c - i) * (c - i)),
            p = Math.atan(r / (c - i));
        return {
            lat: Math.asin((l - h * h * f * f) / (2 * f)) * this.degRad,
            lng: (o + p / f) * this.degRad
        }
    },
    lcc: function(e, t, n) {
        var r = 0,
            i = n * this.radDeg,
            s = t * this.radDeg,
            o = 33 * this.radDeg,
            u = 45 * this.radDeg,
            a = e * this.radDeg,
            f = Math.log(Math.cos(o) * (1 / Math.cos(u))) / Math.log(Math.tan(Math.PI / 4 + u / 2) * (1 / Math.tan(Math.PI / 4 + o / 2))),
            l = Math.cos(o) * Math.pow(Math.tan(Math.PI / 4 + o / 2), f) / f,
            c = l * Math.pow(1 / Math.tan(Math.PI / 4 + a / 2), f),
            h = l * Math.pow(1 / Math.tan(Math.PI / 4 + r / 2), f);
        return {
            x: c * Math.sin(f * (s - i)) * this.radius,
            y: -(h - c * Math.cos(f * (s - i))) * this.radius
        }
    },
    lcc_inv: function(e, t, n) {
        var r = e / this.radius,
            i = t / this.radius,
            s = 0,
            o = n * this.radDeg,
            u = 33 * this.radDeg,
            a = 45 * this.radDeg,
            f = Math.log(Math.cos(u) * (1 / Math.cos(a))) / Math.log(Math.tan(Math.PI / 4 + a / 2) * (1 / Math.tan(Math.PI / 4 + u / 2))),
            l = Math.cos(u) * Math.pow(Math.tan(Math.PI / 4 + u / 2), f) / f,
            c = l * Math.pow(1 / Math.tan(Math.PI / 4 + s / 2), f),
            h = this.sgn(f) * Math.sqrt(r * r + (c - i) * (c - i)),
            p = Math.atan(r / (c - i));
        return {
            lat: (2 * Math.atan(Math.pow(l / h, 1 / f)) - Math.PI / 2) * this.degRad,
            lng: (o + p / f) * this.degRad
        }
    }
}, jvm.WorldMap = function(e) {
    var t = this,
        n;
    this.params = jvm.$.extend(!0, {}, jvm.WorldMap.defaultParams, e);
    if (!jvm.WorldMap.maps[this.params.map]) throw new Error("Attempt to use map which was not loaded: " + this.params.map);
    this.mapData = jvm.WorldMap.maps[this.params.map], this.markers = {}, this.regions = {}, this.regionsColors = {}, this.regionsData = {}, this.container = jvm.$("<div>").css({
        width: "100%",
        height: "100%"
    }).addClass("jvectormap-container"), this.params.container.append(this.container), this.container.data("mapObject", this), this.container.css({
        position: "relative",
        overflow: "hidden"
    }), this.defaultWidth = this.mapData.width, this.defaultHeight = this.mapData.height, this.setBackgroundColor(this.params.backgroundColor), this.onResize = function() {
        t.setSize()
    }, jvm.$(window).resize(this.onResize);
    for (n in jvm.WorldMap.apiEvents) this.params[n] && this.container.bind(jvm.WorldMap.apiEvents[n] + ".jvectormap", this.params[n]);
    this.canvas = new jvm.VectorCanvas(this.container[0], this.width, this.height), "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch ? this.params.bindTouchEvents && this.bindContainerTouchEvents() : this.bindContainerEvents(), this.bindElementEvents(), this.createLabel(), this.params.zoomButtons && this.bindZoomButtons(), this.createRegions(), this.createMarkers(this.params.markers || {}), this.setSize(), this.params.focusOn && (typeof this.params.focusOn == "object" ? this.setFocus.call(this, this.params.focusOn.scale, this.params.focusOn.x, this.params.focusOn.y) : this.setFocus.call(this, this.params.focusOn)), this.params.selectedRegions && this.setSelectedRegions(this.params.selectedRegions), this.params.selectedMarkers && this.setSelectedMarkers(this.params.selectedMarkers), this.params.series && this.createSeries()
}, jvm.WorldMap.prototype = {
    transX: 0,
    transY: 0,
    scale: 1,
    baseTransX: 0,
    baseTransY: 0,
    baseScale: 1,
    width: 0,
    height: 0,
    setBackgroundColor: function(e) {
        this.container.css("background-color", e)
    },
    resize: function() {
        var e = this.baseScale;
        this.width / this.height > this.defaultWidth / this.defaultHeight ? (this.baseScale = this.height / this.defaultHeight, this.baseTransX = Math.abs(this.width - this.defaultWidth * this.baseScale) / (2 * this.baseScale)) : (this.baseScale = this.width / this.defaultWidth, this.baseTransY = Math.abs(this.height - this.defaultHeight * this.baseScale) / (2 * this.baseScale)), this.scale *= this.baseScale / e, this.transX *= this.baseScale / e, this.transY *= this.baseScale / e
    },
    setSize: function() {
        this.width = this.container.width(), this.height = this.container.height(), this.resize(), this.canvas.setSize(this.width, this.height), this.applyTransform()
    },
    reset: function() {
        var e, t;
        for (e in this.series)
            for (t = 0; t < this.series[e].length; t++) this.series[e][t].clear();
        this.scale = this.baseScale, this.transX = this.baseTransX, this.transY = this.baseTransY, this.applyTransform()
    },
    applyTransform: function() {
        var e, t, n, r;
        this.defaultWidth * this.scale <= this.width ? (e = (this.width - this.defaultWidth * this.scale) / (2 * this.scale), n = (this.width - this.defaultWidth * this.scale) / (2 * this.scale)) : (e = 0, n = (this.width - this.defaultWidth * this.scale) / this.scale), this.defaultHeight * this.scale <= this.height ? (t = (this.height - this.defaultHeight * this.scale) / (2 * this.scale), r = (this.height - this.defaultHeight * this.scale) / (2 * this.scale)) : (t = 0, r = (this.height - this.defaultHeight * this.scale) / this.scale), this.transY > t ? this.transY = t : this.transY < r && (this.transY = r), this.transX > e ? this.transX = e : this.transX < n && (this.transX = n), this.canvas.applyTransformParams(this.scale, this.transX, this.transY), this.markers && this.repositionMarkers(), this.container.trigger("viewportChange", [this.scale / this.baseScale, this.transX, this.transY])
    },
    bindContainerEvents: function() {
        var e = !1,
            t, n, r = this;
        this.container.mousemove(function(i) {
            return e && (r.transX -= (t - i.pageX) / r.scale, r.transY -= (n - i.pageY) / r.scale, r.applyTransform(), t = i.pageX, n = i.pageY), !1
        }).mousedown(function(r) {
            return e = !0, t = r.pageX, n = r.pageY, !1
        }), jvm.$("body").mouseup(function() {
            e = !1
        }), this.params.zoomOnScroll && this.container.mousewheel(function(e, t, n, i) {
            var s = jvm.$(r.container).offset(),
                o = e.pageX - s.left,
                u = e.pageY - s.top,
                a = Math.pow(1.3, i);
            r.label.hide(), r.setScale(r.scale * a, o, u), e.preventDefault()
        })
    },
    bindContainerTouchEvents: function() {
        var e, t, n = this,
            r, i, s, o, u, a = function(a) {
                var f = a.originalEvent.touches,
                    l, c, h, p;
                a.type == "touchstart" && (u = 0), f.length == 1 ? (u == 1 && (h = n.transX, p = n.transY, n.transX -= (r - f[0].pageX) / n.scale, n.transY -= (i - f[0].pageY) / n.scale, n.applyTransform(), n.label.hide(), (h != n.transX || p != n.transY) && a.preventDefault()), r = f[0].pageX, i = f[0].pageY) : f.length == 2 && (u == 2 ? (c = Math.sqrt(Math.pow(f[0].pageX - f[1].pageX, 2) + Math.pow(f[0].pageY - f[1].pageY, 2)) / t, n.setScale(e * c, s, o), n.label.hide(), a.preventDefault()) : (l = jvm.$(n.container).offset(), f[0].pageX > f[1].pageX ? s = f[1].pageX + (f[0].pageX - f[1].pageX) / 2 : s = f[0].pageX + (f[1].pageX - f[0].pageX) / 2, f[0].pageY > f[1].pageY ? o = f[1].pageY + (f[0].pageY - f[1].pageY) / 2 : o = f[0].pageY + (f[1].pageY - f[0].pageY) / 2, s -= l.left, o -= l.top, e = n.scale, t = Math.sqrt(Math.pow(f[0].pageX - f[1].pageX, 2) + Math.pow(f[0].pageY - f[1].pageY, 2)))), u = f.length
            };
        jvm.$(this.container).bind("touchstart", a), jvm.$(this.container).bind("touchmove", a)
    },
    bindElementEvents: function() {
        var e = this,
            t;
        this.container.mousemove(function() {
            t = !0
        }), this.container.delegate("[class~='jvectormap-element']", "mouseover mouseout", function(t) {
            var n = this,
                r = jvm.$(this).attr("class").baseVal ? jvm.$(this).attr("class").baseVal : jvm.$(this).attr("class"),
                i = r.indexOf("jvectormap-region") === -1 ? "marker" : "region",
                s = i == "region" ? jvm.$(this).attr("data-code") : jvm.$(this).attr("data-index"),
                o = i == "region" ? e.regions[s].element : e.markers[s].element,
                u = i == "region" ? e.mapData.paths[s].name : e.markers[s].config.name || "",
                a = jvm.$.Event(i + "LabelShow.jvectormap"),
                f = jvm.$.Event(i + "Over.jvectormap");
            t.type == "mouseover" ? (e.container.trigger(f, [s]), f.isDefaultPrevented() || o.setHovered(!0), e.label.text(u), e.container.trigger(a, [e.label, s]), a.isDefaultPrevented() || (e.label.show(), e.labelWidth = e.label.width(), e.labelHeight = e.label.height())) : (o.setHovered(!1), e.label.hide(), e.container.trigger(i + "Out.jvectormap", [s]))
        }), this.container.delegate("[class~='jvectormap-element']", "mousedown", function(e) {
            t = !1
        }), this.container.delegate("[class~='jvectormap-element']", "mouseup", function(n) {
            var r = this,
                i = jvm.$(this).attr("class").baseVal ? jvm.$(this).attr("class").baseVal : jvm.$(this).attr("class"),
                s = i.indexOf("jvectormap-region") === -1 ? "marker" : "region",
                o = s == "region" ? jvm.$(this).attr("data-code") : jvm.$(this).attr("data-index"),
                u = jvm.$.Event(s + "Click.jvectormap"),
                a = s == "region" ? e.regions[o].element : e.markers[o].element;
            if (!t) {
                e.container.trigger(u, [o]);
                if (s === "region" && e.params.regionsSelectable || s === "marker" && e.params.markersSelectable) u.isDefaultPrevented() || (e.params[s + "sSelectableOne"] && e.clearSelected(s + "s"), a.setSelected(!a.isSelected))
            }
        })
    },
    bindZoomButtons: function() {
        var e = this;
        jvm.$("<div/>").addClass("jvectormap-zoomin").text("+").appendTo(this.container), jvm.$("<div/>").addClass("jvectormap-zoomout").html("&#x2212;").appendTo(this.container), this.container.find(".jvectormap-zoomin").click(function() {
            e.setScale(e.scale * e.params.zoomStep, e.width / 2, e.height / 2)
        }), this.container.find(".jvectormap-zoomout").click(function() {
            e.setScale(e.scale / e.params.zoomStep, e.width / 2, e.height / 2)
        })
    },
    createLabel: function() {
        var e = this;
        this.label = jvm.$("<div/>").addClass("jvectormap-label").appendTo(jvm.$("body")), this.container.mousemove(function(t) {
            var n = t.pageX - 15 - e.labelWidth,
                r = t.pageY - 15 - e.labelHeight;
            n < 5 && (n = t.pageX + 15), r < 5 && (r = t.pageY + 15), e.label.is(":visible") && e.label.css({
                left: n,
                top: r
            })
        })
    },
    setScale: function(e, t, n, r) {
        var i, s = jvm.$.Event("zoom.jvectormap");
        e > this.params.zoomMax * this.baseScale ? e = this.params.zoomMax * this.baseScale : e < this.params.zoomMin * this.baseScale && (e = this.params.zoomMin * this.baseScale), typeof t != "undefined" && typeof n != "undefined" && (i = e / this.scale, r ? (this.transX = t + this.defaultWidth * (this.width / (this.defaultWidth * e)) / 2, this.transY = n + this.defaultHeight * (this.height / (this.defaultHeight * e)) / 2) : (this.transX -= (i - 1) / e * t, this.transY -= (i - 1) / e * n)), this.scale = e, this.applyTransform(), this.container.trigger(s, [e / this.baseScale])
    },
    setFocus: function(e, t, n) {
        var r, i, s, o, u;
        if (jvm.$.isArray(e) || this.regions[e]) {
            jvm.$.isArray(e) ? o = e : o = [e];
            for (u = 0; u < o.length; u++) this.regions[o[u]] && (i = this.regions[o[u]].element.getBBox(), i && (typeof r == "undefined" ? r = i : (s = {
                x: Math.min(r.x, i.x),
                y: Math.min(r.y, i.y),
                width: Math.max(r.x + r.width, i.x + i.width) - Math.min(r.x, i.x),
                height: Math.max(r.y + r.height, i.y + i.height) - Math.min(r.y, i.y)
            }, r = s)));
            this.setScale(Math.min(this.width / r.width, this.height / r.height), -(r.x + r.width / 2), -(r.y + r.height / 2), !0)
        } else e *= this.baseScale, this.setScale(e, -t * this.defaultWidth, -n * this.defaultHeight, !0)
    },
    getSelected: function(e) {
        var t, n = [];
        for (t in this[e]) this[e][t].element.isSelected && n.push(t);
        return n
    },
    getSelectedRegions: function() {
        return this.getSelected("regions")
    },
    getSelectedMarkers: function() {
        return this.getSelected("markers")
    },
    setSelected: function(e, t) {
        var n;
        typeof t != "object" && (t = [t]);
        if (jvm.$.isArray(t))
            for (n = 0; n < t.length; n++) this[e][t[n]].element.setSelected(!0);
        else
            for (n in t) this[e][n].element.setSelected(!!t[n])
    },
    setSelectedRegions: function(e) {
        this.setSelected("regions", e)
    },
    setSelectedMarkers: function(e) {
        this.setSelected("markers", e)
    },
    clearSelected: function(e) {
        var t = {},
            n = this.getSelected(e),
            r;
        for (r = 0; r < n.length; r++) t[n[r]] = !1;
        this.setSelected(e, t)
    },
    clearSelectedRegions: function() {
        this.clearSelected("regions")
    },
    clearSelectedMarkers: function() {
        this.clearSelected("markers")
    },
    getMapObject: function() {
        return this
    },
    getRegionName: function(e) {
        return this.mapData.paths[e].name
    },
    createRegions: function() {
        var e, t, n = this;
        for (e in this.mapData.paths) t = this.canvas.addPath({
            d: this.mapData.paths[e].path,
            "data-code": e
        }, jvm.$.extend(!0, {}, this.params.regionStyle)), jvm.$(t.node).bind("selected", function(e, t) {
            n.container.trigger("regionSelected.jvectormap", [jvm.$(this).attr("data-code"), t, n.getSelectedRegions()])
        }), t.addClass("jvectormap-region jvectormap-element"), this.regions[e] = {
            element: t,
            config: this.mapData.paths[e]
        }
    },
    createMarkers: function(e) {
        var t, n, r, i, s, o = this;
        this.markersGroup = this.markersGroup || this.canvas.addGroup();
        if (jvm.$.isArray(e)) {
            s = e.slice(), e = {};
            for (t = 0; t < s.length; t++) e[t] = s[t]
        }
        for (t in e) i = e[t] instanceof Array ? {
            latLng: e[t]
        } : e[t], r = this.getMarkerPosition(i), r !== !1 && (n = this.canvas.addCircle({
            "data-index": t,
            cx: r.x,
            cy: r.y
        }, jvm.$.extend(!0, {}, this.params.markerStyle, {
            initial: i.style || {}
        }), this.markersGroup), n.addClass("jvectormap-marker jvectormap-element"), jvm.$(n.node).bind("selected", function(e, t) {
            o.container.trigger("markerSelected.jvectormap", [jvm.$(this).attr("data-index"), t, o.getSelectedMarkers()])
        }), this.markers[t] && this.removeMarkers([t]), this.markers[t] = {
            element: n,
            config: i
        })
    },
    repositionMarkers: function() {
        var e, t;
        for (e in this.markers) t = this.getMarkerPosition(this.markers[e].config), t !== !1 && this.markers[e].element.setStyle({
            cx: t.x,
            cy: t.y
        })
    },
    getMarkerPosition: function(e) {
        return jvm.WorldMap.maps[this.params.map].projection ? this.latLngToPoint.apply(this, e.latLng || [0, 0]) : {
            x: e.coords[0] * this.scale + this.transX * this.scale,
            y: e.coords[1] * this.scale + this.transY * this.scale
        }
    },
    addMarker: function(e, t, n) {
        var r = {},
            i = [],
            s, o, n = n || [];
        r[e] = t;
        for (o = 0; o < n.length; o++) s = {}, s[e] = n[o], i.push(s);
        this.addMarkers(r, i)
    },
    addMarkers: function(e, t) {
        var n;
        t = t || [], this.createMarkers(e);
        for (n = 0; n < t.length; n++) this.series.markers[n].setValues(t[n] || {})
    },
    removeMarkers: function(e) {
        var t;
        for (t = 0; t < e.length; t++) this.markers[e[t]].element.remove(), delete this.markers[e[t]]
    },
    removeAllMarkers: function() {
        var e, t = [];
        for (e in this.markers) t.push(e);
        this.removeMarkers(t)
    },
    latLngToPoint: function(e, t) {
        var n, r = jvm.WorldMap.maps[this.params.map].projection,
            i = r.centralMeridian,
            s = this.width - this.baseTransX * 2 * this.baseScale,
            o = this.height - this.baseTransY * 2 * this.baseScale,
            u, a, f = this.scale / this.baseScale;
        return t < -180 + i && (t += 360), n = jvm.Proj[r.type](e, t, i), u = this.getInsetForPoint(n.x, n.y), u ? (a = u.bbox, n.x = (n.x - a[0].x) / (a[1].x - a[0].x) * u.width * this.scale, n.y = (n.y - a[0].y) / (a[1].y - a[0].y) * u.height * this.scale, {
            x: n.x + this.transX * this.scale + u.left * this.scale,
            y: n.y + this.transY * this.scale + u.top * this.scale
        }) : !1
    },
    pointToLatLng: function(e, t) {
        var n = jvm.WorldMap.maps[this.params.map].projection,
            r = n.centralMeridian,
            i = jvm.WorldMap.maps[this.params.map].insets,
            s, o, u, a, f;
        for (s = 0; s < i.length; s++) {
            o = i[s], u = o.bbox, a = e - (this.transX * this.scale + o.left * this.scale), f = t - (this.transY * this.scale + o.top * this.scale), a = a / (o.width * this.scale) * (u[1].x - u[0].x) + u[0].x, f = f / (o.height * this.scale) * (u[1].y - u[0].y) + u[0].y;
            if (a > u[0].x && a < u[1].x && f > u[0].y && f < u[1].y) return jvm.Proj[n.type + "_inv"](a, -f, r)
        }
        return !1
    },
    getInsetForPoint: function(e, t) {
        var n = jvm.WorldMap.maps[this.params.map].insets,
            r, i;
        for (r = 0; r < n.length; r++) {
            i = n[r].bbox;
            if (e > i[0].x && e < i[1].x && t > i[0].y && t < i[1].y) return n[r]
        }
    },
    createSeries: function() {
        var e, t;
        this.series = {
            markers: [],
            regions: []
        };
        for (t in this.params.series)
            for (e = 0; e < this.params.series[t].length; e++) this.series[t][e] = new jvm.DataSeries(this.params.series[t][e], this[t])
    },
    remove: function() {
        this.label.remove(), this.container.remove(), jvm.$(window).unbind("resize", this.onResize)
    }
}, jvm.WorldMap.maps = {}, jvm.WorldMap.defaultParams = {
    map: "world_mill_en",
    backgroundColor: "#505050",
    zoomButtons: !0,
    zoomOnScroll: !0,
    zoomMax: 8,
    zoomMin: 1,
    zoomStep: 1.6,
    regionsSelectable: !1,
    markersSelectable: !1,
    bindTouchEvents: !0,
    regionStyle: {
        initial: {
            fill: "white",
            "fill-opacity": 1,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 1
        },
        hover: {
            "fill-opacity": .8
        },
        selected: {
            fill: "yellow"
        },
        selectedHover: {}
    },
    markerStyle: {
        initial: {
            fill: "grey",
            stroke: "#505050",
            "fill-opacity": 1,
            "stroke-width": 1,
            "stroke-opacity": 1,
            r: 5
        },
        hover: {
            stroke: "black",
            "stroke-width": 2
        },
        selected: {
            fill: "blue"
        },
        selectedHover: {}
    }
}, jvm.WorldMap.apiEvents = {
    onRegionLabelShow: "regionLabelShow",
    onRegionOver: "regionOver",
    onRegionOut: "regionOut",
    onRegionClick: "regionClick",
    onRegionSelected: "regionSelected",
    onMarkerLabelShow: "markerLabelShow",
    onMarkerOver: "markerOver",
    onMarkerOut: "markerOut",
    onMarkerClick: "markerClick",
    onMarkerSelected: "markerSelected",
    onViewportChange: "viewportChange"
};