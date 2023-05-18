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

function AnchorLink(props) {
    var offset = props.offset, rest = __rest(props, ["offset"]);
    React.useEffect(function () { return polyfill__namespace.polyfill(); }, []);
    var smoothScroll = React.useCallback(function (event) {
        event.preventDefault();
        var e = __assign({}, event);
        var href = rest.href, onClick = rest.onClick;
        if (history.pushState && href) {
            history.pushState({}, '', href);
            window.dispatchEvent(new Event('hashchange'));
        }
        setTimeout(function () {
            var offsetCallback = function () { return 0; };
            var offsetType = typeof offset;
            if (offsetType !== 'undefined') {
                if (offsetType === "string") {
                    offsetCallback = function () { return parseInt(offset); };
                }
                else if (offsetType == "number") {
                    offsetCallback = function () { return offset; };
                }
                else {
                    offsetCallback = offset;
                }
            }
            var id = e.currentTarget.getAttribute('href').slice(1);
            var $anchor = document.getElementById(id);
            // Check if the change occurs for the x or y axis
            if ($anchor && $anchor.getBoundingClientRect().top !== 0) {
                window.scroll({
                    top: $anchor.getBoundingClientRect().top + window.scrollY - offsetCallback(),
                    behavior: 'smooth'
                });
            }
            else if ($anchor && $anchor.getBoundingClientRect().left !== 0) {
                window.scroll({
                    left: $anchor.getBoundingClientRect().left + window.scrollX - offsetCallback(),
                    behavior: 'smooth'
                });
            }
            if (onClick) {
                onClick(e);
            }
        }, 0);
    }, [offset, rest]);
    return React.createElement("a", __assign({}, rest, { onClick: smoothScroll }));
}

exports.AnchorLink = AnchorLink;
exports.default = AnchorLink;
//# sourceMappingURL=index.js.map
