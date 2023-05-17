'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var polyfill = require('smoothscroll-polyfill');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var polyfill__namespace = /*#__PURE__*/_interopNamespaceDefault(polyfill);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var AnchorLink = /** @class */ (function (_super) {
    __extends(AnchorLink, _super);
    function AnchorLink(props) {
        var _this = _super.call(this, props) || this;
        _this.smoothScroll = _this.smoothScroll.bind(_this);
        return _this;
    }
    AnchorLink.prototype.componentDidMount = function () {
        polyfill__namespace.polyfill();
    };
    AnchorLink.prototype.smoothScroll = function (event) {
        var _this = this;
        event.preventDefault();
        var e = __assign({}, event);
        var href = this.props.href;
        if (history.pushState && href) {
            history.pushState({}, '', href);
            window.dispatchEvent(new Event('hashchange'));
        }
        setTimeout(function () {
            var offset = function () { return 0; };
            var offsetType = typeof _this.props.offset;
            if (offsetType !== 'undefined') {
                if (offsetType === "string") {
                    offset = function () { return parseInt(_this.props.offset); };
                }
                else if (offsetType == "number") {
                    offset = function () { return _this.props.offset; };
                }
                else {
                    offset = _this.props.offset;
                }
            }
            var id = e.currentTarget.getAttribute('href').slice(1);
            var $anchor = document.getElementById(id);
            // Check if the change occurs for the x or y axis
            if ($anchor && $anchor.getBoundingClientRect().top !== 0) {
                window.scroll({
                    top: $anchor.getBoundingClientRect().top + window.pageYOffset - offset(),
                    behavior: 'smooth'
                });
            }
            else if ($anchor && $anchor.getBoundingClientRect().left !== 0) {
                window.scroll({
                    left: $anchor.getBoundingClientRect().left + window.pageXOffset - offset(),
                    behavior: 'smooth'
                });
            }
            if (_this.props.onClick) {
                _this.props.onClick(e);
            }
        }, 0);
    };
    AnchorLink.prototype.render = function () {
        var _a = this.props; _a.offset; var rest = __rest(_a, ["offset"]);
        return (React.createElement("a", __assign({}, rest, { onClick: this.smoothScroll })));
    };
    return AnchorLink;
}(React.Component));

exports.AnchorLink = AnchorLink;
exports.default = AnchorLink;
//# sourceMappingURL=index.js.map
