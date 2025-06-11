exports.id = 288;
exports.ids = [288];
exports.modules = {

/***/ 12679:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 34700));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 4494))

/***/ }),

/***/ 4494:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ components_Navigation)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./src/components/Navigation/styles.module.scss
var styles_module = __webpack_require__(29730);
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(31621);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(48421);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
;// CONCATENATED MODULE: ./src/assets/images/logo.png
/* harmony default export */ const logo = ({"src":"/_next/static/media/logo.203e1856.png","height":68,"width":101,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAsElEQVR4nAGlAFr/AWyFF+zu6+kL+ucA/i3OEgDlMRQA+RMjAC/o4AHsBQb6AYxZRPjTDQUH/vsUAPDp7wD4AQEAGxEOAP8A8ADdBfj9AXyEUPXw7h0K/v0G//T18gD//PoAAwMIAAUB7AEzEq36AZqOXfjS3gsH+wAIAPf28wD09/cA8vf8ADIU8wA1Dbf8AZR5VO6t0dUKFB0J/t/bAQE1DBEA+AHjAArp/AE16AL6lMNLxrSKkQMAAAAASUVORK5CYII=","blurWidth":8,"blurHeight":5});
// EXTERNAL MODULE: ./node_modules/@fortawesome/react-fontawesome/index.js
var react_fontawesome = __webpack_require__(78195);
// EXTERNAL MODULE: ./node_modules/@fortawesome/free-solid-svg-icons/index.mjs
var free_solid_svg_icons = __webpack_require__(17877);
;// CONCATENATED MODULE: ./src/components/Navigation/index.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 







const Navigation = ()=>{
    const [isTop, setIsTop] = (0,react_.useState)(false);
    const [isMobile, setIsMobile] = (0,react_.useState)(false);
    const [isMenuOpen, setIsMenuOpen] = (0,react_.useState)(false);
    const [showFirstLink, setShowFirstLink] = (0,react_.useState)(false);
    (0,react_.useEffect)(()=>{
        let lastScrollY = window.scrollY;
        const handleScroll = ()=>{
            const currentScrollY = window.scrollY;
            //console.log("1=", lastScrollY, currentScrollY);
            if (currentScrollY > lastScrollY) {
                setIsTop(true);
            //console.log("2=", isTop);
            } else if (currentScrollY < lastScrollY) {
                setIsTop(false);
            //console.log("3=", isTop);
            }
            lastScrollY = currentScrollY;
        };
        const handleResize = ()=>{
            setIsMobile(window.innerWidth < 743);
        };
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
        handleScroll();
        handleResize();
        return ()=>{
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [
        isTop
    ]);
    (0,react_.useEffect)(()=>{
        if (isMobile) {
            const timer = setInterval(()=>{
                setShowFirstLink((prevValue)=>!prevValue);
            }, 2000);
            return ()=>clearInterval(timer);
        }
    }, [
        isMobile
    ]);
    const handleMenuToggle = ()=>{
        setIsMenuOpen(!isMenuOpen);
    };
    const [openMenu1, setOpenMenu1] = (0,react_.useState)(false);
    const handleClick1 = ()=>{
        setOpenMenu1((prevValue)=>!prevValue);
    };
    const [openMenu2, setOpenMenu2] = (0,react_.useState)(false);
    const handleClick2 = ()=>{
        setOpenMenu2((prevValue)=>!prevValue);
    };
    const handleClick3 = ()=>{
        setIsMenuOpen(!isMenuOpen);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
            className: `${(styles_module_default()).siteNav} ${isTop ? (styles_module_default()).top : ""} ${isMobile ? (styles_module_default()).mobile : ""}`,
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (styles_module_default()).logoContainer,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (styles_module_default()).logo,
                            children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                src: logo,
                                alt: "image"
                            })
                        }),
                        (!isMobile || showFirstLink) && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                            className: (styles_module_default()).siteName,
                            href: "/",
                            children: [
                                "Список продуктов",
                                /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                "в пару кликов"
                            ]
                        }),
                        (!isMobile || !showFirstLink) && /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                            className: `${(styles_module_default()).siteName} ${(styles_module_default()).readyMenu}`,
                            href: "/favoriteMenu",
                            children: [
                                "Готовые варианты",
                                /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                "меню для вас"
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    className: (styles_module_default()).faSearch,
                    // onClick={handleClick3}
                    href: "/cookFromAvailable",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(react_fontawesome.FontAwesomeIcon, {
                        icon: free_solid_svg_icons/* faSearch */.wn1
                    })
                }),
                (!isMobile || isMenuOpen) && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (styles_module_default()).mobileMenu,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (styles_module_default()).dropdown,
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: (styles_module_default()).dropdownTitle,
                                    onClick: handleClick2,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {}),
                                        "От нутрициолога"
                                    ]
                                }),
                                openMenu2 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: !isMobile ? (styles_module_default()).dropdownContent : (styles_module_default()).dropdownContentMobile,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            href: "/programs",
                                            children: "Витамины - какие, когда и сколько?"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            href: "/",
                                            children: "О чём молчат анализы?"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            href: "/",
                                            children: "Диеты - мифы и реальность?"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (styles_module_default()).dropdown,
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: (styles_module_default()).dropdownTitle,
                                    onClick: handleClick1,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {}),
                                        "Полезные статьи"
                                    ]
                                }),
                                openMenu1 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: !isMobile ? (styles_module_default()).dropdownContent : (styles_module_default()).dropdownContentMobile,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            href: "/programs",
                                            children: "правильное питание"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            href: "/",
                                            children: "организация пространства на кухне"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            href: "/",
                                            children: "лайфхаки по хранению продуктов"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            href: "/kids",
                                            children: "советы по выбору продуктов"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (styles_module_default()).dropdown,
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                                className: (styles_module_default()).dropdownTitle,
                                onClick: handleClick3,
                                href: "/",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {}),
                                    "О сайте"
                                ]
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: `${(styles_module_default()).burgerMenu} ${isMenuOpen ? (styles_module_default()).active : ""}
        }`,
                    onClick: handleMenuToggle,
                    children: "☰"
                })
            ]
        })
    });
};
/* harmony default export */ const components_Navigation = (Navigation);


/***/ }),

/***/ 34700:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IngredientsContext: () => (/* binding */ IngredientsContext),
/* harmony export */   MenuProvider: () => (/* binding */ MenuProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ IngredientsContext,MenuProvider auto */ 

const IngredientsContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    userChoice: {},
    setUserChoice: ()=>{}
});
const MenuProvider = ({ children })=>{
    const [userChoice, setUserChoice] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const value = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            userChoice,
            setUserChoice
        }), [
        userChoice,
        setUserChoice
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const savedIngredientHistory7 = localStorage.getItem("ingredientHistory7");
        if (savedIngredientHistory7) {
            const parsedIngredientHistory = JSON.parse(savedIngredientHistory7);
            setUserChoice(parsedIngredientHistory);
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (typeof userChoice === "object" && userChoice !== null && Object.keys(userChoice).length > 0) {
            localStorage.setItem("ingredientHistory7", JSON.stringify(userChoice));
        }
    }, [
        userChoice
    ]);
    //console.log("userChoice=", userChoice);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(IngredientsContext.Provider, {
        value: value,
        children: children
    });
};


/***/ }),

/***/ 32675:
/***/ ((module) => {

// Exports
module.exports = {
	"background1": "style_background1__xKFdQ",
	"background2": "style_background2__bmLXe",
	"container_button": "style_container_button__H6AZf",
	"button": "style_button__J7F4z"
};


/***/ }),

/***/ 29730:
/***/ ((module) => {

// Exports
module.exports = {
	"fontHelveticaNeueCyr": "HelveticaNeueCyr,sans-serif",
	"fontBarlow": "Barlow,sans-serif",
	"colorRedLight": "#ef233c",
	"colorRedDark": "#d90429",
	"siteNav": "styles_siteNav___vrCW",
	"siteName": "styles_siteName__4RuWs",
	"top": "styles_top__e_Qe4",
	"mobile": "styles_mobile__2abX7",
	"logoContainer": "styles_logoContainer__zqAg1",
	"readyMenu": "styles_readyMenu__Y9Wup",
	"dropdownTitle": "styles_dropdownTitle__e_nkq",
	"menuLinks": "styles_menuLinks__U9WWE",
	"burgerMenu": "styles_burgerMenu__iASrR",
	"mobileMenu": "styles_mobileMenu__5l3uC",
	"logo": "styles_logo__sONaQ",
	"dropdown": "styles_dropdown__YRLRo",
	"dropdownContent": "styles_dropdownContent__N_hIO",
	"dropdownContentMobile": "styles_dropdownContentMobile__gyrZB",
	"active": "styles_active__Pyknv",
	"faSearch": "styles_faSearch__PFSnm"
};


/***/ }),

/***/ 74390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./src/app/globals.css
var globals = __webpack_require__(75553);
// EXTERNAL MODULE: ./src/app/style.module.css
var style_module = __webpack_require__(32675);
var style_module_default = /*#__PURE__*/__webpack_require__.n(style_module);
// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.min.css
var bootstrap_min = __webpack_require__(50802);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(21313);
;// CONCATENATED MODULE: ./src/components/Navigation/index.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`D:\andrei\work\RoofAndRecharts\RoofCalculation\src\components\Navigation\index.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const Navigation = (__default__);
;// CONCATENATED MODULE: ./src/context/IngredientsContext.tsx

const IngredientsContext_proxy = (0,module_proxy.createProxy)(String.raw`D:\andrei\work\RoofAndRecharts\RoofCalculation\src\context\IngredientsContext.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: IngredientsContext_esModule, $$typeof: IngredientsContext_$$typeof } = IngredientsContext_proxy;
const IngredientsContext_default_ = IngredientsContext_proxy.default;

const e0 = IngredientsContext_proxy["IngredientsContext"];

const e1 = IngredientsContext_proxy["MenuProvider"];

;// CONCATENATED MODULE: ./src/app/layout.tsx







const metadata = {
    title: "Shopping List",
    description: "Generated by create next app"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ jsx_runtime_.jsx("body", {
            className: (style_module_default()).background1,
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(e1, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(Navigation, {}),
                    children
                ]
            })
        })
    });
}


/***/ }),

/***/ 82819:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(93180);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"any"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 75553:
/***/ (() => {



/***/ })

};
;