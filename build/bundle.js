/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";

	__webpack_require__(1);

	var express = __webpack_require__(6);
	var app = express();
	var path = __webpack_require__(7);
	var morgan = __webpack_require__(8);
	var mongoose = __webpack_require__(9);
	var bluebird = __webpack_require__(10);
	var cors = __webpack_require__(11);
	var http = __webpack_require__(12);
	var bodyParser = __webpack_require__(13);
	var cookieParser = __webpack_require__(14);

	// import 'bootstrap/dist/css/bootstrap.css';

	var angular = __webpack_require__(15);
	angular.module('app', []);

	// Bower
	app.use(express.static(path.join(__dirname, 'bower_components')));

	// var webpack = require("webpack");

	var routes = __webpack_require__(16);

	// *** config file *** //
	var config = __webpack_require__(55);

	var environment = app.get("env");

	var port = process.env.PORT || 3000;
	var databaseUri = __webpack_require__(56)(environment);

	mongoose.Promise = bluebird;
	mongoose.connect(databaseUri);

	if ("test" !== environment) {
	  app.use(morgan("dev"));
	}

	app.use(cors());

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());

	app.use(express.static("public"));

	app.use("/api", routes);

	var server = app.listen(port, function () {
	  console.log("Node running on port 3000, Cap'n.");
	});

	module.exports = app;
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./app.scss", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./app.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)(undefined);
	// imports


	// module
	exports.push([module.id, "body {\n  background-color: white;\n  font-family: 'Montserrat', sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-weight: 400; }\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function (useSourceMap) {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			return this.map(function (item) {
				var content = cssWithMappingToString(item, useSourceMap);
				if (item[2]) {
					return "@media " + item[2] + "{" + content + "}";
				} else {
					return content;
				}
			}).join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

	function cssWithMappingToString(item, useSourceMap) {
		var content = item[1] || '';
		var cssMapping = item[3];
		if (!cssMapping) {
			return content;
		}

		if (useSourceMap) {
			var sourceMapping = toComment(cssMapping);
			var sourceURLs = cssMapping.sources.map(function (source) {
				return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
			});

			return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
		}

		return [content].join('\n');
	}

	// Adapted from convert-source-map (MIT)
	function toComment(sourceMap) {
		var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
		var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

		return '/*# ' + data + ' */';
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			// Test for IE <= 9 as proposed by Browserhacks
			// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
			// Tests for existence of standard globals is to allow style-loader 
			// to operate correctly into non-standard environments
			// @see https://github.com/webpack-contrib/style-loader/issues/177
			return window && document && document.all && !window.atob;
		}),
		getElement = (function(fn) {
			var memo = {};
			return function(selector) {
				if (typeof memo[selector] === "undefined") {
					memo[selector] = fn.call(this, selector);
				}
				return memo[selector]
			};
		})(function (styleTarget) {
			return document.querySelector(styleTarget)
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [],
		fixUrls = __webpack_require__(5);

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		options.attrs = typeof options.attrs === "object" ? options.attrs : {};

		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the <head> element
		if (typeof options.insertInto === "undefined") options.insertInto = "head";

		// By default, add <style> tags to the bottom of the target
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	};

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var styleTarget = getElement(options.insertInto)
		if (!styleTarget) {
			throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
		}
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				styleTarget.insertBefore(styleElement, styleTarget.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				styleTarget.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			styleTarget.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		options.attrs.type = "text/css";

		attachTagAttrs(styleElement, options.attrs);
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		options.attrs.type = "text/css";
		options.attrs.rel = "stylesheet";

		attachTagAttrs(linkElement, options.attrs);
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function attachTagAttrs(element, attrs) {
		Object.keys(attrs).forEach(function (key) {
			element.setAttribute(key, attrs[key]);
		});
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement, options);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, options, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
		*/
		var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

		if (options.convertToAbsoluteUrls || autoFixUrls){
			css = fixUrls(css);
		}

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
	 * embed the css on the page. This breaks all relative urls because now they are relative to a
	 * bundle instead of the current page.
	 *
	 * One solution is to only use full urls, but that may be impossible.
	 *
	 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
	 *
	 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
	 *
	 */

	module.exports = function (css) {
		// get current location
		var location = typeof window !== "undefined" && window.location;

		if (!location) {
			throw new Error("fixUrls requires window.location");
		}

		// blank or null?
		if (!css || typeof css !== "string") {
			return css;
		}

		var baseUrl = location.protocol + "//" + location.host;
		var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

		// convert each url(...)
		/*
	 This regular expression is just a way to recursively match brackets within
	 a string.
	 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	    (  = Start a capturing group
	      (?:  = Start a non-capturing group
	          [^)(]  = Match anything that isn't a parentheses
	          |  = OR
	          \(  = Match a start parentheses
	              (?:  = Start another non-capturing groups
	                  [^)(]+  = Match anything that isn't a parentheses
	                  |  = OR
	                  \(  = Match a start parentheses
	                      [^)(]*  = Match anything that isn't a parentheses
	                  \)  = Match a end parentheses
	              )  = End Group
	              *\) = Match anything and then a close parens
	          )  = Close non-capturing group
	          *  = Match anything
	       )  = Close capturing group
	  \)  = Match a close parens
	 	 /gi  = Get all matches, not the first.  Be case insensitive.
	  */
		var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
			// strip quotes (if they exist)
			var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
				return $1;
			}).replace(/^'(.*)'$/, function (o, $1) {
				return $1;
			});

			// already a full url? no change
			if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
				return fullMatch;
			}

			// convert the url to a full url
			var newUrl;

			if (unquotedOrigUrl.indexOf("//") === 0) {
				//TODO: should we add protocol?
				newUrl = unquotedOrigUrl;
			} else if (unquotedOrigUrl.indexOf("/") === 0) {
				// path should be relative to the base url
				newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
			} else {
				// path should be relative to current directory
				newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
			}

			// send back the fixed url(...)
			return "url(" + JSON.stringify(newUrl) + ")";
		});

		// send back the fixed css
		return fixedCss;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("cors");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("angular");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var router = __webpack_require__(6).Router();

	var facebookController = __webpack_require__(17);
	var twitterController = __webpack_require__(23);
	var authController = __webpack_require__(25);
	var usersController = __webpack_require__(35);
	var grouphugsController = __webpack_require__(36);
	var ecardsController = __webpack_require__(38);
	var experiencesController = __webpack_require__(40);
	var thankyousController = __webpack_require__(42);
	var reviewsController = __webpack_require__(43);
	var tagsController = __webpack_require__(45);
	var chargeHandler = __webpack_require__(47);
	var contributorHandler = __webpack_require__(50);

	var jwt = __webpack_require__(21);
	var secret = __webpack_require__(22).secret;

	var upload = __webpack_require__(51);

	function secureRoute(req, res, next) {
	  if (!req.headers.authorization) return res.status(401).json({ message: "Unauthorized" });

	  var token = req.headers.authorization.replace("Bearer ", "");

	  jwt.verify(token, secret, function (err, payload) {
	    if (err || !payload) return res.status(401).json({ message: "Unauthorized" });
	    req.user = payload;
	    next();
	  });
	}

	function requireRole(role) {
	  return function (req, res, next) {
	    if (req.headers.authorization) {
	      var token = req.headers.authorization.replace("Bearer ", "");
	      jwt.verify(token, secret, function (err, payload) {
	        if (err || !payload || payload.role != "superAdmin") return res.status(403).json({ message: "Bad Role" });
	        next();
	      });
	    }
	  };
	}

	/*check if we need route / here*/
	router.route("").get(grouphugsController.index);

	router.route("/grouphugs").all(secureRoute).get(requireRole('superAdmin'), grouphugsController.index).post(upload.array('pictures'), grouphugsController.create);

	router.route("/grouphugs/:id").all(secureRoute).get(grouphugsController.show).put(upload.array('pictures'), grouphugsController.update).delete(requireRole('superAdmin'), grouphugsController.delete);

	router.route("/charge").post(chargeHandler.stripeCharge);

	router.route("/contributor").post(contributorHandler.contributorCreate);

	router.route('/ecards').get(ecardsController.index).post(ecardsController.create);

	router.route("/ecards/:id").get(ecardsController.show).put(ecardsController.update).delete(ecardsController.delete);

	router.route("/experiences").get(requireRole('superAdmin'), experiencesController.index).post(requireRole('superAdmin'), upload.array('pictures'), experiencesController.create);
	router.route("/experiences/:id").get(experiencesController.show).put(upload.array('pictures'), experiencesController.update).delete(experiencesController.delete);

	router.route("/thankyous").get(thankyousController.index);
	// .post(upload.array('pictures'),thankyousController.create);
	router.route("/thankyous/:id").get(thankyousController.show).put(upload.array('pictures'), thankyousController.update).delete(thankyousController.delete);

	router.route("/reviews").get(reviewsController.index).post(reviewsController.create);
	router.route("/reviews/:id").get(reviewsController.show).put(reviewsController.update).delete(reviewsController.delete);

	router.route("/tags").get(tagsController.index).post(tagsController.create);
	router.route("/tags/:id").get(tagsController.show).put(tagsController.update).delete(tagsController.delete);

	router.route("/users").get(requireRole('superAdmin'), usersController.index);

	router.route("/users/:id").all(secureRoute).get(usersController.show).put(usersController.update);

	router.route("/users/edit/:id").all(secureRoute).get(usersController.show).put(usersController.update);

	router.post("/oauth/facebook", facebookController.login);
	router.post("/oauth/twitter", twitterController.login);
	router.post("/login", authController.login);
	router.post("/register", authController.register);

	module.exports = router;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var User = __webpack_require__(18);
	var request = __webpack_require__(20);
	var jwt = __webpack_require__(21);
	var secret = __webpack_require__(22).secret;

	function login(req, res) {

	  request.post({
	    url: "https://graph.facebook.com/v2.5/oauth/access_token",
	    qs: {
	      client_id: process.env.FACEBOOK_API_KEY,
	      client_secret: process.env.FACEBOOK_API_SECRET,
	      code: req.body.code,
	      redirect_uri: "http://localhost:3000/"
	    },
	    json: true
	  }).then(function (access_token) {
	    return request.get({
	      url: "https://graph.facebook.com/v2.5/me?fields=id,email,name,picture",
	      qs: access_token,
	      json: true
	    });
	  }).then(function (profile) {
	    return User.findOne({ email: profile.email }).then(function (user) {
	      if (user) {
	        user.username = profile.name;
	        user.facebookId = profile.id;
	        user.avatar = profile.picture ? profile.picture.data.url : null;
	      } else {
	        user = new User({
	          username: profile.name,
	          email: profile.email,
	          facebookId: profile.id,
	          avatar: profile.picture ? profile.picture.data.url : null
	        });
	      }

	      return user.save();
	    });
	  }).then(function (user) {
	    var payload = {
	      _id: user.id,
	      username: user.username,
	      avatar: user.avatar
	    };

	    var token = jwt.sign(payload, secret, { expiresIn: "24h" });

	    res.status(200).json({ token: token });
	  }).catch(function (err) {
	    console.log(err);
	    res.status(500).json(err);
	  });
	}

	module.exports = {
	  login: login
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var mongoose = __webpack_require__(9);
	var bcrypt = __webpack_require__(19);

	var userSchema = new mongoose.Schema({
	  isActivated: { type: Boolean, default: true },
	  role: { type: String, default: "user" },
	  visits: { type: Number, default: 0 },
	  lastVisitDate: { type: Date },
	  tempUserAccessKey: { type: String },
	  /*username: { type: String, required: true, minlength: 6, maxlength: 100 },*/ // Username depricated
	  firstName: { type: String, maxlength: 100 }, // limited length to 100
	  lastName: { type: String, maxlength: 100 }, // limited length to 100
	  displayName: { type: String, maxlength: 100 },
	  avatar: { type: String, default: "http://swingmaresme.com/wp-content/uploads/2015/03/avant.png" },
	  DOB: { type: Date },
	  gender: { type: String },
	  contactNumber: { type: String, maxlength: 12 },
	  email: { type: String, reqiured: true, unique: true },
	  githubId: { type: String },
	  facebookId: { type: String },
	  twitterId: { type: String },
	  pinterestId: { type: String },
	  instagramId: { type: String },
	  passwordHash: { type: String },
	  credit: { type: Number, default: 0 },
	  reviews: [{ type: mongoose.Schema.ObjectId, ref: "Review" }],
	  grouphugs: [{ type: mongoose.Schema.ObjectId, ref: "Grouphug" }],
	  invitations: [{ type: mongoose.Schema.ObjectId, ref: "Grouphug" }],
	  gifts: [{ type: mongoose.Schema.ObjectId, ref: "Grouphug" }],
	  createBy: [{ type: String, default: "Self" }],
	  createdAt: { type: Date, default: new Date() },
	  loggedIn: Boolean
	});

	userSchema.pre("validate", function (next) {
	  if (!this._password && !this.githubId && !this.facebookId && !this.twitterId && !this.pinterestId && !this.instagramId) {
	    this.invalidate('password', 'A password is required');
	    console.log("password validation failed");
	  }
	  next();
	});

	userSchema.virtual("password").set(function (password) {
	  this._password = password;
	  this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
	});

	userSchema.virtual("passwordConfirmation").get(function () {
	  return this._passwordConfirmation;
	}).set(function (passwordConfirmation) {
	  this._passwordConfirmation = passwordConfirmation;
	});

	userSchema.path("passwordHash").validate(function (passwordHash) {
	  if (this.isNew) {
	    if (!this._password) {
	      return this.invalidate("password", "A password is required");
	    }

	    if (this._password !== this._passwordConfirmation) {
	      return this.invalidate("passwordConfirmation", "Passwords do not match");
	    }
	  }
	});

	userSchema.methods.validatePassword = function (password) {
	  return bcrypt.compareSync(password, this.passwordHash);
	};

	module.exports = mongoose.model("User", userSchema);

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("bcrypt");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("request-promise");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	  secret: "Hje8*$ggH77@3E.42sd"
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var User = __webpack_require__(18);
	var request = __webpack_require__(20);
	var jwt = __webpack_require__(21);
	var secret = __webpack_require__(22).secret;
	var qs = __webpack_require__(24);

	function login(req, res) {
	  if (!req.body.oauth_token || !req.body.oauth_verifier) {

	    return request.post({
	      url: "https://api.twitter.com/oauth/request_token",
	      oauth: {
	        consumer_key: process.env.TWITTER_CONSUMER_KEY,
	        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	        callback: req.body.redirectUri
	      }
	    }).then(function (response) {
	      var token = qs.parse(response);
	      res.status(200).send(token);
	    }).catch(function (err) {
	      console.log(err);
	      res.status(500).json(err);
	    });
	  } else {
	    return request.post({
	      url: "https://api.twitter.com/oauth/access_token",
	      form: {
	        oauth_token: req.body.oauth_token,
	        oauth_verifier: req.body.oauth_verifier
	      }
	    }).then(function (token) {
	      var token = qs.parse(token);

	      return request.get({
	        url: "https://api.twitter.com/1.1/users/show.json",
	        qs: {
	          screen_name: token.screen_name
	        },
	        oauth: {
	          consumer_key: process.env.TWITTER_CONSUMER_KEY,
	          consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	          oauth_token: token.oauth_token
	        },
	        json: true
	      });
	    }).then(function (profile) {
	      return User.findOne({ twitterId: profile.id }).then(function (user) {
	        if (user) {
	          user.twitterId = profile.id;
	          user.avatart = profile.profile_image_url;
	        } else {
	          user = new User({
	            username: profile.name,
	            twitterId: profile.id,
	            avatar: profile.profile_image_url
	          });
	        }
	        return user.save();
	      });
	    }).then(function (user) {
	      var payload = {
	        _id: user._id,
	        username: user.username,
	        avatar: user.avatar
	      };

	      var token = jwt.sign(payload, secret, { expiresIn: '24h' });

	      res.status(200).json({ token: token });
	    }).catch(function (err) {
	      res.status(500).json(err);
	    });
	  }
	}

	module.exports = {
	  login: login
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("qs");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jwt = __webpack_require__(21);
	var Promise = __webpack_require__(10);
	var User = __webpack_require__(18);
	var secret = __webpack_require__(22).secret;
	var email = __webpack_require__(26);
	var mailgun = __webpack_require__(30);
	var EmailTemplate = __webpack_require__(29);
	var schedule = __webpack_require__(27);

	function login(req, res) {
	  User.findOne({ email: req.body.email }, function (err, user) {
	    if (err) res.send(500).json(err);
	    if (!user || !user.validatePassword(req.body.password)) {
	      return res.status(401).json({ message: "Invalid credentials" });
	    }

	    var payload = { _id: user._id, username: user.username, isActivated: user.isActivated, email: user.email, firstName: user.firstName, role: user.role };
	    var token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 });

	    return res.status(200).json({
	      message: "Login successful!",
	      token: token
	    });
	  });
	}

	function register(req, res) {
	  User.create(req.body, function (err, user) {
	    if (err) console.log(err);
	    if (err) return res.status(400).json(err);

	    var payload = { _id: user._id, username: user.username };
	    var token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 });
	    var date = new Date();
	    mailgun.mailgunMail('Registration', user.email, 'Welcome to Grouphug', "", "", "", "", user);

	    return res.status(200).json({
	      message: "Thanks for registering!",
	      token: token
	    });
	  });
	}

	module.exports = {
	  login: login,
	  register: register
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Promise = __webpack_require__(10);
	var schedule = __webpack_require__(27);
	var nodemailer = __webpack_require__(28);
	var EmailTemplate = __webpack_require__(29);
	var smtpConfig = {
	  host: 'smtp.gmail.com',
	  port: 465,
	  secure: true,
	  auth: {
	    user: process.env.GMAIL_ID,
	    pass: process.env.GMAIL_PASSWORD
	  }
	};

	function sendRegisterTemplate(user) {
	  EmailTemplate.findOne({ 'name': 'Registration' }).then(function (template) {
	    var registrationTransporter = nodemailer.createTransport(smtpConfig);

	    var registerTemplate = registrationTransporter.templateSender({
	      subject: template.subject,
	      text: template.text,
	      html: template.html
	    }, { from: process.env.GMAIL_ID });

	    email = user.email;
	    console.log("sending to:", email);
	    // Error handling
	    firstName_in = user.firstName;
	    if (firstName_in == undefined) {
	      firstName_in = "";
	    };
	    lastName_in = user.lastName;
	    if (lastName_in == undefined) {
	      lastName_in = "";
	    };
	    createdAt_in = user.createdAt;
	    if (createdAt_in == undefined) {
	      createdAt_in = "";
	    };

	    registerTemplate({
	      to: email
	    }, {
	      firstName: firstName_in,
	      lastName: lastName_in,
	      createdAt: createdAt_in
	    }, function (err, info) {
	      if (err) {
	        console.log('Error', err);
	      } else {
	        console.log('Yeah, email sent!');
	      }
	    });
	  }).catch(function (err) {
	    console.log('Error', err);
	    res.status(500).json(err);
	  });
	}

	function sendContributorTemplate(user) {
	  EmailTemplate.findOne({ 'name': 'ContributorAdd' }).then(function (template) {
	    var registrationTransporter = nodemailer.createTransport(smtpConfig);

	    var registerTemplate = registrationTransporter.templateSender({
	      subject: template.subject,
	      text: template.text,
	      html: template.html
	    }, { from: process.env.GMAIL_ID });

	    email = user.email;
	    console.log("sending to:", email);
	    // Error handling
	    firstName_in = user.firstName;
	    if (firstName_in == undefined) {
	      firstName_in = "";
	    };
	    lastName_in = user.lastName;
	    if (lastName_in == undefined) {
	      lastName_in = "";
	    };
	    createdAt_in = user.createdAt;
	    if (createdAt_in == undefined) {
	      createdAt_in = "";
	    };

	    registerTemplate({
	      to: email
	    }, {
	      firstName: firstName_in,
	      lastName: lastName_in,
	      createdAt: createdAt_in
	    }, function (err, info) {
	      if (err) {
	        console.log('Error', err);
	      } else {
	        console.log('Yeah, email sent!');
	      }
	    });
	  }).catch(function (err) {
	    console.log('Error', err);
	    res.status(500).json(err);
	  });
	}

	module.exports = {
	  sendMail: function sendMail(mailOptions) {

	    return new Promise(function (resolve, reject) {

	      registrationTransporter.sendMail(mailOptions, function (err, info) {
	        if (err) return reject(err);
	        return resolve(info);
	      });
	    });
	  },
	  sendRegisterTemplate: sendRegisterTemplate
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("node-schedule");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("nodemailer");

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var mongoose = __webpack_require__(9);

	var emailTemplateSchema = new mongoose.Schema({
	  name: { type: String, required: true },
	  subject: { type: String, required: true },
	  text: { type: String, required: true },
	  html: { type: String, required: true },
	  delay: { type: Number, default: 0 },
	  insertableFields: { type: String }
	});

	module.exports = mongoose.model("EmailTemplate", emailTemplateSchema);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Promise = __webpack_require__(10);
	var api_key = process.env.MAILGUN_SECERET_KEY;
	/*var domain = 'sandbox55d3a9aba14444049b77f477f8cdc4e1.mailgun.org';*/
	var domain = 'group-hug.co';
	var mailgun = __webpack_require__(31)({ apiKey: api_key, domain: domain });
	var User = __webpack_require__(18);
	var Grouphug = __webpack_require__(32);
	var EmailTemplate = __webpack_require__(29);

	function mailgunParse(template) {
	  var templateArray = template.html.split("|");
	  console.log("this is template array from mailgun", templateArray);
	  return templateArray;
	};

	function mailgunMail(message_type, message_address, message_subject, grouphug, grouphug_creator_firstName, grouphug_creator_lastName, grouphug_creator_email, user, card_holder_name, group_hug_name, contribution_amount) {

	  var date = new Date();
	  var messageArray = [];
	  EmailTemplate.findOne({ 'name': message_type }).then(function (registrationEmail) {
	    console.log("Send new user email", messageArray, user, grouphug);

	    messageArray = mailgunParse(registrationEmail);
	    var messageText = "";

	    for (var i = 0, len = messageArray.length; i < len; i++) {
	      var messageSegment = messageArray[i];
	      switch (messageSegment) {
	        case "GHName":
	          messageText = messageText + " " + grouphug.name;
	          break;
	        case "email":
	          messageText = messageText + " " + user.email;
	          break;
	        case "userFirstName":
	          messageText = messageText + " " + user.firstName;
	          break;
	        case "userLastName":
	          messageText = messageText + " " + user.lastName;
	          break;
	        case "createdAt":
	          var today = new Date();
	          var UTCstring = today.toUTCString();
	          messageText = messageText + " " + UTCstring;
	          break;
	        case "creatorFirstName":
	          messageText = messageText + " " + grouphug_creator_firstName;
	          break;
	        case "creatorLastName":
	          messageText = messageText + " " + grouphug_creator_lastName;
	          break;
	        case "gifteeFirstName":
	          messageText = messageText + " " + grouphug.gifteeFirstName;
	          break;
	        case "gifteeLastName":
	          messageText = messageText + " " + grouphug.gifteeLastName;
	          break;
	        case "password":
	          messageText = messageText + " " + user.tempUserAccessKey;
	          break;
	        case "newParagraph":
	          messageText = messageText + "<BR>";
	          break;
	        case "cardHolderName":
	          messageText = messageText + " " + card_holder_name;
	          break;
	        case "groupHugContributedToo":
	          messageText = messageText + " " + group_hug_name;
	          break;
	        case "contributionAmount":
	          var contributionReceived = contribution_amount / 100;
	          messageText = messageText + " " + contributionReceived;
	          break;
	        default:
	          messageText = messageText + messageSegment;
	      }
	    };

	    var data = {
	      from: 'Mail Gun Test Group Hug <   postmaster@sandbox55d3a9aba14444049b77f477f8cdc4e1.mailgun.org>',
	      to: message_address,
	      subject: message_subject,
	      html: messageText
	    };

	    mailgunSend(data);
	    console.log('Email being sent', data);
	    return;
	  }).catch(function (err) {
	    console.log("Email did not send", err);
	  });
	}

	function mailgunSend(data) {
	  mailgun.messages().send(data, function (error, body) {
	    console.log(body);
	    if (!error) {
	      console.log("Mail Sent Successfully");
	    } else {
	      console.log("Mail failed");
	    }
	  });
	};

	module.exports = {
	  mailgunMail: mailgunMail,
	  mailgunParse: mailgunParse

	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("mailgun-js");

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var mongoose = __webpack_require__(9);
	var s3 = __webpack_require__(33);

	var grouphugSchema = new mongoose.Schema({
	  name: { type: String, required: true, maxlength: 100 }, // limited length to 100
	  // description: { type: String, required: true },
	  pictures: [{ type: String, required: true }],
	  creator: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
	  giftee: { type: mongoose.Schema.ObjectId, ref: "User" },
	  gifteeFirstName: { type: String },
	  gifteeLastName: { type: String },
	  gifteeDisplayName: { type: String },
	  gifteeEmailAddress: { type: String, required: true },
	  gifteePostalTown: { type: String, required: true },
	  gifteeContactNumber: { type: String },
	  gifteeAge: { type: String },
	  gifteeGender: { type: String },
	  occassion: { type: String },
	  date: { type: Date },
	  gifteeRelationship: { type: String },
	  gifteeGroupSize: { type: String },
	  question1: { type: String, default: "3" },
	  question2: { type: String, default: "3" },
	  question3: { type: String, default: "3" },
	  question4: { type: String, default: "3" },
	  question5: { type: String, default: "3" },
	  question6: { type: String, default: "3" },
	  question7: { type: String, default: "3" },
	  question8: { type: String, default: "3" },
	  question9: { type: String, default: "3" },
	  question10: { type: String, default: "3" },
	  question11: { type: String, default: "3" },
	  creatorIdea: { type: String },
	  gifteeMention: { type: String },
	  gifteePassion: { type: String },
	  contributors: [{
	    contributorId: { type: mongoose.Schema.ObjectId, ref: "User" },
	    contributorStatus: { type: String, default: "Invitation Pending" }
	  }],
	  contributorEmailAddresses: [],
	  contributorEmail: { type: String },
	  contributionTotal: { type: Number, default: 0 },
	  status: { type: String, default: "inactive" },
	  madelive: { type: Boolean, default: false },
	  encouragementValue: { type: Number, default: 50 },
	  latestEncouragementValue: { type: Number, default: 0 },
	  experiences: [{
	    experienceId: { type: mongoose.Schema.ObjectId, ref: "Experience" },
	    userWeightings: [{ user: { type: mongoose.Schema.ObjectId, ref: "User" },
	      weightValue: { type: Number, min: 1, max: 5 } }]
	  }],
	  // comments: [{
	  //   name: { type: String },
	  //   content: { type: String },
	  //   added: { type: Date }
	  // }]
	  ecard: { type: mongoose.Schema.ObjectId, ref: "Ecard" },
	  thankyou: { type: mongoose.Schema.ObjectId, ref: "Thankyou" },
	  contributions: [{ type: mongoose.Schema.ObjectId, ref: "Contribution" }]
	});

	grouphugSchema.path('pictures').get(function (pictures) {
	  return pictures.map(function (picture) {
	    return s3.endpoint.href + process.env.AWS_BUCKET_NAME + "/" + picture;
	  });
	}).set(function (pictures) {
	  return pictures.map(function (picture) {
	    return picture.split('/').splice(-1)[0];
	  });
	});

	grouphugSchema.pre('save', function (next) {

	  var doc = this;

	  this.model('User').findById(this.owner).then(function (owner) {
	    if (!!owner && owner.gamePosts.indexOf(doc._id) === -1) {
	      owner.gamePosts.push(doc._id);
	      return owner.save(next);
	    }
	    next();
	  });
	});

	grouphugSchema.pre('remove', function (next) {

	  var doc = this;

	  this.model('User').findById(this.owner).then(function (owner) {
	    var index = owner.gamePosts.indexOf(doc._id);
	    if (index === -1) {
	      owner.gamePosts.splice(index, 1);
	      return owner.save(next);
	    }
	    next();
	  });
	});

	grouphugSchema.set('toJSON', { getters: true });

	module.exports = mongoose.model("Grouphug", grouphugSchema);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var aws = __webpack_require__(34);

	module.exports = new aws.S3({
	  secretAccessKey: process.env.AWS_SECRET_KEY,
	  accessKeyId: process.env.AWS_ACCESS_KEY,
	  region: 'eu-west-1'
	});

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("aws-sdk");

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var User = __webpack_require__(18);

	function userIndex(req, res) {
	  User.find().then(function (users) {
	    res.status(200).json(users);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function userShow(req, res) {
	  User.findById(req.params.id).populate('invitations').populate('grouphugs').then(function (user) {
	    res.status(200).json(user);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function userEdit(req, res) {
	  User.findById(req.params.id).then(function (user) {
	    res.status(200).json(user);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function userUpdate(req, res) {
	  console.log("req.body", req.body);
	  /* -- this method does not update password -- 
	  user = User.findByIdAndUpdate(req.params.id, req.body, { new: true })*/
	  user = User.findById(req.params.id).then(function (user) {
	    console.log('user before', user);
	    for (key in req.body) {
	      if (key === 'isActivated' && !req.body[key]) {
	        user[key] = true;
	        user.tempUserAccessKey = "";
	      } else if (key != 'tempUserAccessKey') {
	        user[key] = req.body[key];
	      }
	    };
	    console.log('user after', user);
	    return user.save();
	  }).then(function (user) {
	    console.log(user);
	    res.status(200).json(user);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	module.exports = {
	  index: userIndex,
	  show: userShow,
	  edit: userEdit,
	  update: userUpdate

	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Grouphug = __webpack_require__(32);
	var Thankyou = __webpack_require__(37);
	var User = __webpack_require__(18);
	var email = __webpack_require__(26);
	var mailgun = __webpack_require__(30);
	var EmailTemplate = __webpack_require__(29);
	var schedule = __webpack_require__(27);

	function grouphugIndex(req, res) {
	  Grouphug.find().populate('contributors.contributorId').then(function (grouphugs) {
	    res.status(200).json(grouphugs);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function grouphugShow(req, res) {
	  Grouphug.findById(req.params.id).populate('creator').populate('giftee').populate('contributors.contributorId').populate('experiences.experienceId').populate('contribution.contributionId').then(function (grouphug) {
	    res.status(200).json(grouphug);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function grouphugCreate(req, res) {
	  console.log("req.files before", req.files);
	  console.log("req.body before", req.body);
	  if (req.files !== undefined) {
	    req.body.pictures = Object.keys(req.files).map(function (key) {
	      return req.files[key].key;
	    });
	  }
	  console.log("req.files after", req.files);
	  console.log("req.body after", req.body);
	  var user = {};
	  User.findOne({ 'email': req.body.gifteeEmailAddress }).then(function (user, err) {
	    if (user) {
	      console.log("<<<<GIFTEE EXISTS>>>>", user._id);
	      createGroupHug(req, res, user);
	    } else if (!user) {
	      console.log("creating temp giftee user");
	      var randomstring = Math.random().toString(36).slice(-15);
	      console.log(randomstring);
	      User.create({
	        isActivated: "false",
	        tempUserAccessKey: randomstring,
	        firstName: req.body.gifteeFirstName,
	        lastName: req.body.gifteeLastNAme,
	        email: req.body.gifteeEmailAddress,
	        password: randomstring,
	        passwordConfirmation: randomstring
	      }).then(function (user, err) {

	        console.log("giftee id is", user._id);
	        console.log("giftee......", user);
	        createGroupHug(req, res, user);
	      }).catch(function (err) {
	        console.log("giftee user creation failed", err);
	      });
	    }
	  }).catch(function (err) {
	    console.log("new user not created err", err);
	  });
	};

	function grouphugUpdate(req, res) {
	  console.log("req.body", req.body);
	  console.log("req.body.experiences", req.body.experiences);
	  console.log("req.files", req.files);
	  Grouphug.findById(req.params.id).populate('creator').then(function (grouphug) {

	    var grouphug_creator_firstName = grouphug.creator.firstName;
	    var grouphug_creator_lastName = grouphug.creator.lastName;
	    var grouphug_creator_email = grouphug.creator.email;
	    var grouphug_id = grouphug._id;
	    console.log("okkkkkk lets try this".grouphug_creator);
	    for (key in req.body) {

	      if (key === "experiences") {
	        grouphug[key] = JSON.parse(req.body[key]);
	      } else if (key === "status" && req.body[key] === "active" && grouphug[key] != "active") {

	        mailgun.mailgunMail('GHActivate', grouphug_creator_email, "Your Group Hug " + grouphug.name + " has been activated", grouphug, grouphug_creator_firstName, grouphug_creator_lastName, grouphug_creator_email);

	        sendGroupHugInvitations(grouphug, grouphug_creator_firstName, grouphug_creator_lastName, grouphug_creator_email);
	        grouphug[key] = req.body[key];
	      } else if (key != "contributions" && key != "contributors") {

	        grouphug[key] = req.body[key];
	      }
	    }
	    if (req.files) {
	      var newImages = Object.keys(req.files).map(function (key) {
	        return req.files[key].key;
	      });
	      grouphug.pictures = grouphug.pictures.concat(newImages);
	    }
	    return grouphug.save();
	  }).then(function (grouphug) {
	    res.status(200).json(grouphug);
	  }).catch(function (err) {
	    console.log("err is: ", err);
	    res.status(500).json(err);
	  });
	}

	function grouphugDelete(req, res) {
	  Grouphug.findById(req.params.id).then(function (grouphug) {
	    return grouphug.remove();
	  }).then(function () {
	    res.status(204).end();
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function sendGroupHugInvitations(grouphug, grouphug_creator_firstName, grouphug_creator_lastName, grouphug_creator_email) {
	  console.log("Invitees", grouphug.contributors);
	  for (i = 0; i < grouphug.contributors.length; i++) {
	    console.log("invtees", grouphug.contributors[i].contributorId);
	    User.findById(grouphug.contributors[i].contributorId).then(function (user) {
	      console.log("invitee name", user.firstName, user.lastName, "activated", user.isActivated);
	      if (user) {
	        if (user.isActivated) {
	          console.log("Send group hug user invitation");
	          mailgun.mailgunMail('ContributorInvitation', user.email, 'You have been invited to join GroupHug', grouphug, grouphug_creator_firstName, grouphug_creator_lastName, grouphug_creator_email, user);
	          console.log("this is the gh invite updater #####", grouphug);
	        } else {
	          mailgun.mailgunMail('NewUserInvite', user.email, 'You have a new GroupHug invite', grouphug, grouphug_creator_firstName, grouphug_creator_lastName, grouphug_creator_email, user);
	        }

	        for (i = 0; i < grouphug.contributors.length; i++) {
	          console.log("these are the contributors", grouphug.contributors[i].contributorId, grouphug.contributors[i].contributorStatus);
	          grouphug.contributors[i].contributorStatus = "invite has been Sent";
	        }
	      } else {
	        console.log("UNIDENTIFIED USER", grouphug_contributors[i]);
	      }
	      grouphug.save();
	    });
	  }
	};

	function addGroupHugToCreator(req, grouphug) {
	  User.findById(req.body.creator).then(function (user, err) {
	    if (user) {
	      console.log(">>>>>>PUSHING Grouphug ID", grouphug._id, "into user ", user.email);
	      user.grouphugs.push(grouphug._id);
	      return User.update({ _id: user._id }, { grouphugs: user.grouphugs });
	    } else {
	      console.log("User Not found");
	    }
	  }).catch(function (err) {
	    console.log("new user not created err", err);
	  });
	};

	function addGroupHugToGiftee(grouphug) {
	  User.findById(grouphug.giftee).then(function (user, err) {
	    if (user) {
	      console.log(">>>>>>PUSHING Grouphug ID to giftee", grouphug._id, "into giftee ", user.email);
	      user.gifts.push(grouphug._id);
	      return User.update({ _id: user._id }, { gifts: grouphug._id });
	    } else {
	      console.log("Giftee Not found");
	    }
	  }).catch(function (err) {
	    console.log("Gift not added to giftee", err);
	  });
	};

	function createGroupHug(req, res, user) {
	  req.body.giftee = user._id;
	  Thankyou.create({}).then(function (thankyou) {
	    console.log("thankyou: ", thankyou);
	    req.body.thankyou = thankyou._id;
	    Grouphug.create(req.body).then(function (grouphug) {
	      addGroupHugToCreator(req, grouphug);
	      addGroupHugToGiftee(grouphug);
	      console.log(grouphug);
	      res.status(201).json(grouphug);
	    }).catch(function (err) {
	      console.log(err);
	      res.status(500).json(err);
	    });
	  }).catch(function (err) {
	    console.log(err);
	    res.status(500).json(err);
	  });
	}

	module.exports = {
	  index: grouphugIndex,
	  show: grouphugShow,
	  create: grouphugCreate,
	  update: grouphugUpdate,
	  delete: grouphugDelete
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var mongoose = __webpack_require__(9);
	var s3 = __webpack_require__(33);

	var thankyouSchema = new mongoose.Schema({
	  title: { type: String },
	  description: { type: String },
	  status: { type: String, default: "inactive" },
	  pictures: [{ type: String, required: true }]
	});

	thankyouSchema.path('pictures').get(function (pictures) {
	  return pictures.map(function (picture) {
	    return s3.endpoint.href + process.env.AWS_BUCKET_NAME + "/" + picture;
	  });
	}).set(function (pictures) {
	  return pictures.map(function (picture) {
	    return picture.split('/').splice(-1)[0];
	  });
	});

	thankyouSchema.set('toJSON', { getters: true });

	module.exports = mongoose.model("Thankyou", thankyouSchema);

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Ecard = __webpack_require__(39);

	function ecardIndex(req, res) {
	  Ecard.find().then(function (ecards) {
	    res.status(200).json(ecards);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function ecardShow(req, res) {
	  Ecard.findById(req.params.id).then(function (ecard) {
	    res.status(200).json(ecard);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	// function ecardCreate(req, res) {
	//   Ecard.create(req.body)
	//     .then(function(ecard) {
	//       res.status(201).json(ecard);
	//     })
	//     .catch(function(err) {
	//       res.status(500).json(err);
	//     });
	// }

	function ecardCreate(req, res) {
	  req.body.pictures = Object.keys(req.files).map(function (key) {
	    return req.files[key].key;
	  });
	  Ecard.create(req.body).then(function (ecard) {
	    res.status(201).json(ecard);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	// function ecardUpdate(req, res) {
	//   Ecard.findByIdAndUpdate(req.params.id, req.body, { new: true })
	//     .then(function(ecard) {
	//       res.status(200).json(ecard);
	//     })
	//     .catch(function(err) {
	//       res.status(500).json(err);
	//     });
	// }

	function ecardUpdate(req, res) {
	  Ecard.findByIdAndUpdate(req.params.id, req.body).then(function (ecard) {
	    for (key in req.body) {
	      ecard[key] = req.body[key];
	    }if (req.files) {
	      var newImages = Object.keys(req.files).map(function (key) {
	        return req.files[key].key;
	      });
	      ecard.pictures = ecard.pictures.concat(newImages);
	    }
	    return ecard.save();
	  }).then(function (ecard) {
	    res.status(200).json(ecard);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function ecardDelete(req, res) {
	  Ecard.findById(req.params.id).then(function (ecard) {
	    return ecard.remove();
	  }).then(function () {
	    res.status(204).end();
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	module.exports = {
	  index: ecardIndex,
	  show: ecardShow,
	  create: ecardCreate,
	  update: ecardUpdate,
	  delete: ecardDelete
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var mongoose = __webpack_require__(9);
	var s3 = __webpack_require__(33);

	var ecardSchema = new mongoose.Schema({
	  title: { type: String, required: true, maxlength: 100 }, // limited length to 100
	  description: { type: String, required: true },
	  pictures: [{ type: String, required: true }],
	  grouphug: { type: mongoose.Schema.ObjectId, ref: "Grouphug" }
	});

	ecardSchema.path('pictures').get(function (pictures) {
	  return pictures.map(function (picture) {
	    return s3.endpoint.href + process.env.AWS_BUCKET_NAME + "/" + picture;
	  });
	}).set(function (pictures) {
	  return pictures.map(function (picture) {
	    return picture.split('/').splice(-1)[0];
	  });
	});

	ecardSchema.pre('save', function (next) {

	  var doc = this;

	  this.model('User').findById(this.owner).then(function (owner) {
	    if (!!owner && owner.gamePosts.indexOf(doc._id) === -1) {
	      owner.gamePosts.push(doc._id);
	      return owner.save(next);
	    }
	    next();
	  });
	});

	ecardSchema.pre('remove', function (next) {

	  var doc = this;

	  this.model('User').findById(this.owner).then(function (owner) {
	    var index = owner.gamePosts.indexOf(doc._id);
	    if (index === -1) {
	      owner.gamePosts.splice(index, 1);
	      return owner.save(next);
	    }
	    next();
	  });
	});

	ecardSchema.set('toJSON', { getters: true });

	module.exports = mongoose.model("Ecard", ecardSchema);

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Experience = __webpack_require__(41);

	function experienceIndex(req, res) {
	  Experience.find().then(function (experiences) {
	    res.status(200).json(experiences);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function experienceShow(req, res) {
	  Experience.findById(req.params.id).then(function (experience) {
	    res.status(200).json(experience);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	// function experienceCreate(req, res) {
	//   Experience.create(req.body)
	//     .then(function(experience) {
	//       res.status(201).json(experience);
	//     })
	//     .catch(function(err) {
	//       res.status(500).json(err);
	//     });
	// }

	function experienceCreate(req, res) {
	  console.log("req.files before", req.files);
	  console.log("req.body before", req.body);
	  if (req.files !== undefined) {
	    req.body.pictures = Object.keys(req.files).map(function (key) {
	      return req.files[key].key;
	    });
	  }
	  console.log("req.files after", req.files);
	  console.log("req.body after", req.body);

	  Experience.create(req.body).then(function (experience) {
	    res.status(201).json(experience);
	  }).catch(function (err) {
	    console.log(err);
	    res.status(500).json(err);
	  });
	}

	// function experienceUpdate(req, res) {
	//   Experience.findByIdAndUpdate(req.params.id, req.body, { new: true })
	//     .then(function(experience) {
	//       res.status(200).json(experience);
	//     })
	//     .catch(function(err) {
	//       res.status(500).json(err);
	//     });
	// }

	function experienceUpdate(req, res) {
	  console.log("req.body", req.body);
	  console.log("req.files", req.files);
	  Experience.findById(req.params.id).then(function (experience) {
	    for (key in req.body) {
	      experience[key] = req.body[key];
	    }
	    if (req.files) {
	      var newImages = Object.keys(req.files).map(function (key) {
	        return req.files[key].key;
	      });
	      experience.pictures = experience.pictures.concat(newImages);
	    }
	    return experience.save();
	  }).then(function (experience) {
	    res.status(200).json(experience);
	  }).catch(function (err) {
	    console.log("err is: ", err);
	    res.status(500).json(err);
	  });
	}

	function experienceDelete(req, res) {
	  Experience.findById(req.params.id).then(function (experience) {
	    return experience.remove();
	  }).then(function () {
	    res.status(204).end();
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	module.exports = {
	  index: experienceIndex,
	  show: experienceShow,
	  create: experienceCreate,
	  update: experienceUpdate,
	  delete: experienceDelete
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var mongoose = __webpack_require__(9);
	var s3 = __webpack_require__(33);

	var experienceSchema = new mongoose.Schema({
	  name: { type: String, required: true, maxlength: 100 }, // limited length to 100
	  supplier: { type: String, required: true, maxlength: 100 }, // limited length to 100
	  price: { type: Number, required: true },
	  pictures: [{ type: String, required: true }],
	  tags: { type: [{
	      type: mongoose.Schema.ObjectId,
	      ref: "Tag" }],
	    validate: [arrayLimit, '{PATH} exceeds the limit of 10']
	  }, //limited number of tags to 10
	  description: { type: String, required: true }
	});

	function arrayLimit(array) {
	  return array.length <= 10;
	}

	experienceSchema.path('pictures').get(function (pictures) {
	  return pictures.map(function (picture) {
	    return s3.endpoint.href + process.env.AWS_BUCKET_NAME + "/" + picture;
	  });
	}).set(function (pictures) {
	  return pictures.map(function (picture) {
	    return picture.split('/').splice(-1)[0];
	  });
	});

	experienceSchema.set('toJSON', { getters: true });

	module.exports = mongoose.model("Experience", experienceSchema);

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Thankyou = __webpack_require__(37);

	function thankyouIndex(req, res) {
	  Thankyou.find().then(function (thankyous) {
	    res.status(200).json(thankyous);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function thankyouShow(req, res) {
	  Thankyou.findById(req.params.id).then(function (thankyou) {
	    res.status(200).json(thankyou);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	// function thankyouCreate(req, res) {
	//   Thankyou.create(req.body)
	//     .then(function(thankyou) {
	//       res.status(201).json(thankyou);
	//     })
	//     .catch(function(err) {
	//       res.status(500).json(err);
	//     });
	// }

	// function thankyouCreate(req, res) {
	//   console.log("req.files before", req.files);
	//   console.log("req.body before", req.body);
	//   if(req.files !== undefined) {
	//     req.body.pictures = Object.keys(req.files).map(function(key) {
	//       return req.files[key].key;
	//     });
	//   }
	//   console.log("req.files after", req.files);
	//   console.log("req.body after", req.body);

	//   Thankyou.create(req.body)
	//     .then(function(thankyou) {
	//       res.status(201).json(thankyou);
	//     })
	//     .catch(function(err) {
	//       console.log(err);
	//       res.status(500).json(err);
	//     });
	// }

	// function thankyouUpdate(req, res) {
	//   Thankyou.findByIdAndUpdate(req.params.id, req.body, { new: true })
	//     .then(function(thankyou) {
	//       res.status(200).json(thankyou);
	//     })
	//     .catch(function(err) {
	//       res.status(500).json(err);
	//     });
	// }

	function thankyouUpdate(req, res) {
	  console.log("req.body", req.body);
	  console.log("req.files", req.files);
	  Thankyou.findById(req.params.id).then(function (thankyou) {
	    for (key in req.body) {
	      thankyou[key] = req.body[key];
	    }
	    if (req.files) {
	      var newImages = Object.keys(req.files).map(function (key) {
	        return req.files[key].key;
	      });
	      thankyou.pictures = thankyou.pictures.concat(newImages);
	    }
	    return thankyou.save();
	  }).then(function (thankyou) {
	    res.status(200).json(thankyou);
	  }).catch(function (err) {
	    console.log("err is: ", err);
	    res.status(500).json(err);
	  });
	}

	function thankyouDelete(req, res) {
	  Thankyou.findById(req.params.id).then(function (thankyou) {
	    return thankyou.remove();
	  }).then(function () {
	    res.status(204).end();
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	module.exports = {
	  index: thankyouIndex,
	  show: thankyouShow,
	  // create: thankyouCreate,
	  update: thankyouUpdate,
	  delete: thankyouDelete
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Review = __webpack_require__(44);

	function reviewIndex(req, res) {
	  Review.find().then(function (reviews) {
	    res.status(200).json(reviews);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function reviewShow(req, res) {
	  Review.findById(req.params.id).then(function (review) {
	    res.status(200).json(review);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function reviewCreate(req, res) {
	  Review.create(req.body).then(function (review) {
	    res.status(201).json(review);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function reviewUpdate(req, res) {
	  Review.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (review) {
	    res.status(200).json(review);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function reviewDelete(req, res) {
	  Review.findById(req.params.id).then(function (review) {
	    return review.remove();
	  }).then(function () {
	    res.status(204).end();
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	module.exports = {
	  index: reviewIndex,
	  show: reviewShow,
	  create: reviewCreate,
	  update: reviewUpdate,
	  delete: reviewDelete
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var mongoose = __webpack_require__(9);

	var reviewSchema = new mongoose.Schema({
	  title: { type: String, required: true, maxlength: 100 }, // limited length to 100
	  content: { type: String, required: true },
	  rating: { type: Number, required: true, min: 1, max: 5 }, // between 1 and 5
	  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
	  experience: { type: mongoose.Schema.ObjectId, ref: "Experience", required: true },
	  added: { type: Date }
	});

	module.exports = mongoose.model("Review", reviewSchema);

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Tag = __webpack_require__(46);

	function tagIndex(req, res) {
	  Tag.find().then(function (tags) {
	    res.status(200).json(tags);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function tagShow(req, res) {
	  Tag.findById(req.params.id).then(function (tag) {
	    res.status(200).json(tag);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function tagCreate(req, res) {
	  Tag.create(req.body).then(function (tag) {
	    res.status(201).json(tag);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function tagUpdate(req, res) {
	  Tag.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (tag) {
	    res.status(200).json(tag);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function tagDelete(req, res) {
	  Tag.findById(req.params.id).then(function (tag) {
	    return tag.remove();
	  }).then(function () {
	    res.status(204).end();
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	module.exports = {
	  index: tagIndex,
	  show: tagShow,
	  create: tagCreate,
	  update: tagUpdate,
	  delete: tagDelete
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var mongoose = __webpack_require__(9);

	var tagSchema = new mongoose.Schema({
	  name: { type: String, required: true },
	  grouphugs: [{ type: mongoose.Schema.ObjectId, ref: "Grouphug" }],
	  experiences: [{ type: mongoose.Schema.ObjectId, ref: "Experience" }]
	});

	module.exports = mongoose.model("Tag", tagSchema);

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Grouphug = __webpack_require__(32);
	var Contribution = __webpack_require__(48);
	var jwt = __webpack_require__(21);
	var secret = __webpack_require__(22).secret;
	var stripe_Api_Key = process.env.STRIPE_SECRET_KEY;
	var stripe = __webpack_require__(49)(stripe_Api_Key);
	var mailgun = __webpack_require__(30);

	function stripeCharge(req, res) {
	  console.log("req.body.amount is:", req.body.amount);
	  console.log("req.body is:", req.body);
	  console.log("req.body.card.name is:", req.body.card.name); // name from stripe form
	  // Get the credit card details submitted by the form
	  var stripeToken = req.body.id; // Using Express
	  var amount = req.body.amount;
	  var grouphugId = req.body.grouphugId;
	  var description = req.body.grouphugDescription;

	  // Create a charge: this will charge the user's card
	  var charge = stripe.charges.create({
	    amount: amount,
	    currency: "gbp",
	    source: stripeToken,
	    description: description
	  }, function (err, chargeInfo) {

	    // console.log("chargeInfo: ", chargeInfo);
	    // console.log("err: ", err);
	    console.log("grouphugId: ", grouphugId);

	    console.log("Contribution contents: ", {
	      name: req.body.card.name,
	      email: req.body.email,
	      id: req.body.card.id,
	      stripeToken: stripeToken,
	      grouphug: grouphugId,
	      amount: amount
	    });

	    if (!err) {
	      Contribution.create({
	        name: req.body.card.name,
	        stripeToken: stripeToken,
	        grouphug: grouphugId,
	        amount: amount
	      }).then(function (contribution) {
	        console.log("contribution: ", contribution, contribution._id);
	      }).catch(function (err) {
	        console.log("err: ", err);
	      });

	      console.log("After contribution creation.");
	      //send receipt to perosn making conribution to stripe recorded email address
	      mailgun.mailgunMail('ContributionReceipt', req.body.email, 'Thank you for your contribution via Strip', "", "", "", "", "", req.body.card.name, req.body.grouphugDescription, amount);

	      //

	      return res.status(200).json({ message: "Payment successful" });
	    } else {
	      console.log("oooh payment went a bit wrong", err);
	    }

	    if (err && err.type === 'StripeCardError') {
	      // The card has been declined
	      return res.status(400).json({ message: "Payment unsuccessful there was an error please contact Group Hug Admin" });
	    }
	  });
	}

	module.exports = {
	  stripeCharge: stripeCharge
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var mongoose = __webpack_require__(9);

	var contributionSchema = new mongoose.Schema({
	  name: { type: String },
	  stripeToken: { type: String },
	  grouphug: { type: mongoose.Schema.ObjectId, ref: "Grouphug" },
	  amount: { type: Number }
	});

	contributionSchema.pre('save', function (next) {

	  var doc = this;

	  this.model('Grouphug').findById(this.grouphug).then(function (grouphug) {
	    if (!!grouphug && grouphug.contributions.indexOf(doc._id) === -1) {
	      grouphug.contributions.push(doc._id);
	      return grouphug.save(next);
	    }
	    next();
	  });
	});

	contributionSchema.post('save', function (doc) {
	  console.log("saved document", doc);
	  var doc = this;
	  this.model('Grouphug').findById(this.grouphug).then(function (grouphug) {
	    if (!!grouphug) {
	      grouphug.contributionTotal = grouphug.contributionTotal + doc.amount;
	      sendMotivationMail(grouphug);
	      return grouphug.save();
	    }
	  });
	});

	function sendMotivationMail(grouphug) {
	  console.log("case statements to go here for contribution motivation");
	};
	// contributionSchema.pre('remove', function(next) {

	//   var doc = this;

	//   this.model('User')
	//     .findById(this.owner)
	//     .then(function(owner) {
	//       var index = owner.gamePosts.indexOf(doc._id);
	//       if(index === -1) {
	//         owner.gamePosts.splice(index, 1);
	//         return owner.save(next);
	//       }
	//       next();
	//     });
	// });

	//contributionSchema.set('toJSON', { getters: true });

	module.exports = mongoose.model("Contribution", contributionSchema);

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = require("stripe");

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Grouphug = __webpack_require__(32);
	var Contribution = __webpack_require__(48);
	var User = __webpack_require__(18);
	var jwt = __webpack_require__(21);
	var secret = __webpack_require__(22).secret;
	var mailgun = __webpack_require__(30);
	var EmailTemplate = __webpack_require__(29);

	function contributorCreate(req, res) {
	  console.log("Contributor req.body", req.body);
	  var contributor_name = req.body.name;
	  var contributor_email = req.body.email;
	  var grouphug_Id = req.body.grouphug_Id;

	  if (contributor_email) {
	    console.log("contributor email received", contributor_email);
	    existingUserTest(contributor_email, grouphug_Id, contributor_name);
	    return res.status(200).json({ message: "Contributor successful" });
	  } else {
	    console.log("contributor email not received", contributor_email);
	  }
	}

	function existingUserTest(contributor_email, grouphug_Id, contributor_name) {
	  User.findOne({ 'email': contributor_email }).then(function (user, err) {
	    if (user) {
	      if (user.invitations.indexOf(grouphug_Id) === -1) {
	        user.invitations.push(grouphug_Id);
	        addContributorToGrouphug(grouphug_Id, user /*, user._id*/);
	        return User.update({ _id: user._id }, { invitations: user.invitations });
	      }
	    } else if (!user) {
	      console.log("create temp user group hug", grouphug_Id);
	      var randomstring = Math.random().toString(36).slice(-15);
	      console.log(randomstring);
	      User.create({
	        isActivated: "false",
	        tempUserAccessKey: randomstring,
	        displayName: contributor_email,
	        firstName: contributor_name,
	        email: contributor_email,
	        password: randomstring,
	        passwordConfirmation: randomstring
	      }).then(function (user, err) {
	        console.log("New user created>>>>>>>>", user);
	        user.invitations.push(grouphug_Id);
	        addContributorToGrouphug(grouphug_Id, user /*, user._id*/);
	        return User.update({ _id: user._id }, { invitations: user.invitations });
	      }).catch(function (err) {
	        console.log("new user not created err", err);
	      });
	    }
	  }).catch(function (err) {
	    console.log("catch invoked reason was >>>>>>", err);
	  });
	}

	function addContributorToGrouphug(grouphug_Id, user /*, user_id*/) {

	  Grouphug.findById(grouphug_Id).populate('creator').then(function (grouphug, err) {
	    if (grouphug) {
	      console.log("found a group hug", grouphug, "<<<>>>adding user id ", user._id);
	      console.log("Add contributor user detaisll&&&&&&&&", user);
	      console.log("contributors", grouphug.contributors);
	      if (grouphug.status === "active") {
	        if (user.isActivated) {
	          console.log("gonna send active user email now");
	          mailgun.mailgunMail('ContributorInvitation', user.email, 'You have been invited to join GroupHug', grouphug, grouphug.creator.firstName, grouphug.creator.lastName, grouphug.creator.email, user);
	        } else {
	          console.log("gonna send new user email now");
	          mailgun.mailgunMail('NewUserInvite', user.email, 'You have a new GroupHug invite', grouphug, grouphug.creator.firstName, grouphug.creator.lastName, grouphug.creator.email, user);
	        }

	        //MAybe this should be where the return passes to to ensure GH contributors are updated before processing invite updates - not working at moment
	        for (i = 0; i < grouphug.contributors.length; i++) {
	          console.log("these are the contributors", grouphug.contributors[i].contributorId, grouphug.contributors[i].contributorStatus);
	          grouphug.contributors[i].contributorStatus = "invite has been Sent";
	        }
	      }
	      return Grouphug.update({ _id: grouphug_Id }, { $push: { 'contributors': { contributorId: user._id } } });
	    }
	  }).catch(function (err) {
	    console.log(" add to contributor catch invoked reason was >>>>>>", err);
	  });
	}

	module.exports = {
	  contributorCreate: contributorCreate
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var s3 = __webpack_require__(33);
	var multer = __webpack_require__(52);
	var multerS3 = __webpack_require__(53);
	var uuid = __webpack_require__(54);

	module.exports = multer({
	  storage: multerS3({
	    s3: s3,
	    bucket: process.env.AWS_BUCKET_NAME,
	    contentType: function contentType(req, file, next) {
	      next(null, file.mimetype);
	    },
	    key: function key(req, file, next) {
	      var ext = '.' + file.originalname.split('.').splice(-1)[0];
	      var filename = uuid.v1() + ext;
	      next(null, filename);
	    }
	  })
	});

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = require("multer");

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = require("multer-s3");

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = require("uuid");

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';

	var config = {};

	config.mongoURI = {
	  development: 'mongodb://localhost/grouphug-testing',
	  test: 'mongodb://localhost/grouphug-test'
	};

	module.exports = config;

/***/ },
/* 56 */
/***/ function(module, exports) {

	"use strict";

	var dbURIs = {
	  test: "mongodb://localhost/GroupHug-test",
	  development: "mongodb://localhost/GroupHug",
	  production: process.env.MONGODB_URI || "mongodb://localhost/GroupHug"
	};

	module.exports = function (env) {
	  return dbURIs[env];
	};

/***/ }
/******/ ]);