(this.webpackJsonpgourmand=this.webpackJsonpgourmand||[]).push([[0],{110:function(e,t,n){},111:function(e,t,n){},112:function(e,t,n){},113:function(e,t,n){},114:function(e,t,n){},115:function(e,t,n){},116:function(e,t,n){},117:function(e,t,n){},118:function(e,t,n){},119:function(e,t,n){"use strict";n.r(t);var c=n(2),a=n(1),i=n.n(a),r=n(23),o=n.n(r),s=(n(69),n(70),n(14)),u=n(10),l=(n(71),n(13)),d={EVENT_TRACKING_TOKEN:function(e){return e.includes("gourmandizer-staging")?"a830086578bb9aecf1a2debcd5d38c5b":e.includes("gourmandizer")?"2a1b0bd737f71a28f4dd2ff3f6f65baa":"dadd0494ac9b4ff110cc4a52ba61a65a"}(window.location.hostname)},j={UNKNOWN:"unknown",BIRDS_EYE:0,DRIVING:1,BIKING:2,WALKING:3,BLOCKS:4},h=n(15),g=n(16),f={restaurantsByID:{},mediaByID:{},restaurantIDsByMediaID:{},restaurantsByURL:{}},b=function(){function e(){Object(h.a)(this,e)}return Object(g.a)(e,[{key:"update",value:function(e,t){!function(e,t,n){e.restaurantsByID=O(e.restaurantsByID,function(e){return e.reduce((function(e,t){return e[t.id]=t,e}),{})}(n)),e.mediaByID=O(e.mediaByID,function(e){return e.flatMap((function(e){return e.media})).reduce((function(e,t){return e[t.id]=t,e}),{})}(n)),e.restaurantIDsByMediaID=O(e.restaurantIDsByMediaID,function(e){return e.reduce((function(e,t){return O(e,function(e){return e.media.reduce((function(t,n){return t[n.id]=e.id,t}),{})}(t))}),{})}(n)),e.restaurantsByURL=O(e.restaurantsByURL,function(e,t){var n={};return n[e]=t,n}(t,n))}(f,e,t)}},{key:"getMediaByID",value:function(e){return f.mediaByID[e]}},{key:"getRestaurantByID",value:function(e){return f.restaurantsByID[e]}},{key:"getRestaurantIDByMediaID",value:function(e){return f.restaurantIDsByMediaID[e]}},{key:"getRestaurantsByURL",value:function(e){return f.restaurantsByURL[e]}}]),e}();function O(e,t){return Object(s.a)(Object(s.a)({},e),t)}var m=function(){function e(t){Object(h.a)(this,e),this.storage=t}return Object(g.a)(e,[{key:"get",value:function(e){var t=this;return v((function(){return t.storage.getItem(e)}))}},{key:"set",value:function(e,t){var n=this;return v((function(){return n.storage.setItem(e,t)}))}},{key:"remove",value:function(e){var t=this;return v((function(){return t.storage.removeItem(e)}))}},{key:"removeAll",value:function(){var e=this;return v((function(){return e.storage.clear()}))}}]),e}();function v(e){try{return e()}catch(t){window.console.debug("Storage Exception:",t)}}var p=function(){function e(){Object(h.a)(this,e)}return Object(g.a)(e,[{key:"get",value:function(){}},{key:"set",value:function(){}},{key:"remove",value:function(){}},{key:"removeAll",value:function(){}}]),e}(),x=function(){function e(){Object(h.a)(this,e)}return Object(g.a)(e,[{key:"get",value:function(e){return e?new m(e):new p}}]),e}(),N=n(61),w=function(){function e(t,n){Object(h.a)(this,e),this.liked=function(e){return e?"string"===typeof e?function(e){var t=JSON.parse(e);for(var n in t)t[n]=new Set(t[n]);return t}(e):e:{}}(t),this.storage=n}return Object(g.a)(e,[{key:"toggle",value:function(e,t){var n,c,a=Object(s.a)({},this.liked),i=!A(a,e,t);return this.liked=i?function(e,t,n){t in e||(e[t]=new Set);return e[t].add(n),e}(a,e,t):function(e,t,n){e[t].delete(n),0===e[t].size&&delete e[t];return e}(a,e,t),n=this.storage,c=this.serialize(),n.set("likedMedia",c),i}},{key:"getAll",value:function(){return this.liked}},{key:"isLiked",value:function(e,t){return A(this.liked,e,t)}},{key:"serialize",value:function(){var e={};for(var t in this.liked)e[t]=Object(N.a)(this.liked[t]);return JSON.stringify(e)}}]),e}();function A(e,t,n){return t in e&&e[t].has(n)}n(72);var k=function(){function e(t){Object(h.a)(this,e),console.log("Initialize event tracker with token: ".concat(t))}return Object(g.a)(e,[{key:"track",value:function(e,t){console.log("\n            Tracking event: ".concat(e,"\n            ").concat(t?"Properties: "+JSON.stringify(t):""))}}]),e}();k.events={PAGE_VISIT:"PAGE_VISIT",NAVIGATE:"NAVIGATE",REQUEST_CURRENT_LOCATION:"REQUEST_CURRENT_LOCATION",SEARCH:"SEARCH",SHOW_LIKED_MEDIA:"SHOW_LIKED_MEDIA",SHOW_ALL_MEDIA:"SHOW_ALL_MEDIA",CLICK_GALLERY_MEDIA:"CLICK_GALLERY_MEDIA",LIKE_MEDIA:"LIKE_MEDIA",UNLIKE_MEDIA:"UNLIKE_MEDIA",OPEN_MAP:"OPEN_MAP",ERROR:"ERROR"};var I=k,y=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){return t.reduce((function(e,t){return t(e)}),e)}},L=j;var C=function(e,t){var n=t.description,c=t.location,a=t.distance;return[e,y((function(e){return function(e,t){return t.concat("description=".concat(encodeURIComponent(e)))}(n,e)}),(function(e){return function(e,t){return t.concat("location=".concat(encodeURIComponent(e)))}(c,e)}),(function(e){return function(e,t){return e&&e!==L.UNKNOWN?t.concat("distance=".concat(encodeURIComponent(e))):t}(a,e)}))([]).join("&")].join("?")},S=(n(73),n(129)),Q=n(130),D=n(131),E=n(132),M=n(133),R=n(25),B=(n(74),n(123)),K=n(142),T=n(124),U=n(56),q=(n(75),n(121)),_=n(122);var W=function(e){var t=e.requestLocation;return Object(c.jsx)(q.a,{className:"suggestions-list-group",onMouseDown:function(e){return e.preventDefault()},children:Object(c.jsx)(_.a,{tag:"button",onClick:t,action:!0,children:Object(c.jsxs)("div",{className:"current-location-container",children:[Object(c.jsx)("img",{className:"current-location-icon",src:"cursor-fill.svg"}),Object(c.jsx)("span",{children:"Current Location"})]})})})};var F=function(e){var t=e.onSearchRequest,n=e.description,i=e.setDescription,r=e.location,o=e.setLocation,s=e.requestingLocation,l=e.setRequestingLocation,d=Object(a.useState)(!1),j=Object(u.a)(d,2),h=j[0],g=j[1],f=function(){return g(!1)};return Object(c.jsxs)("form",{className:"search-form",onSubmit:function(e){return function(e,t){e.preventDefault(),console.log("onSubmit()"),t()}(e,t)},children:[Object(c.jsx)("div",{className:"input-group-container",children:Object(c.jsxs)(B.a,{children:[Object(c.jsx)(K.a,{addonType:"prepend",children:Object(c.jsx)("img",{className:"input-icon query-icon",src:"magnifying-glass.svg"})}),Object(c.jsx)(T.a,{className:"search-input",type:"text",value:n,onChange:function(e){i(e.target.value)},placeholder:"e.g. Pizza"})]})}),Object(c.jsxs)("div",{className:"input-group-container",children:[Object(c.jsxs)(B.a,{children:[Object(c.jsx)(K.a,{addonType:"prepend",children:Object(c.jsx)("img",{className:"input-icon location-icon ".concat(s?"rotate":""),src:function(e){return e?"spinner.png":"target.svg"}(s)})}),Object(c.jsx)(T.a,{className:"search-input",type:"text",value:r,onChange:function(e){var t=e.target.value;t&&f(),o(t)},onClick:function(){return g((function(e){return!e}))},onBlur:f,placeholder:"e.g. Brooklyn, NY 11237"})]}),h&&Object(c.jsx)(W,{requestLocation:function(e){e.preventDefault(),console.log("Requesting location."),l(!0),f(),navigator.geolocation.getCurrentPosition((function(e){var t=e.coords,n=t.latitude,c=t.longitude;l(!1),o("".concat(n.toPrecision(7),", ").concat(c.toPrecision(7)))}),(function(e){l(!1),console.error(e)}),{timeout:1e4,maximumAge:6e4})}})]}),Object(c.jsx)(U.a,{className:"search-submit-button hidden-submit",type:"submit"})]})},J=(n(78),n(125)),G=n(126);var P=function(e){var t=e.onChange;return Object(c.jsx)(J.a,{className:"header-check filter-liked-check",check:!0,children:Object(c.jsxs)(G.a,{check:!0,children:[Object(c.jsx)(T.a,{type:"checkbox",onChange:function(e){return t(e.target.checked)}}),Object(c.jsx)("span",{className:"header-check-text",children:"Show Liked"})]})})},V=(n(79),n(127)),H=n(143),Z=n(144),X=n(128),z=j,Y={DEFAULT:"Distance",options:["Bird's-eye View","Driving (5 mi.)","Biking (2 mi.)","Walking (1 mi.)","Within 4 Blocks"]};function $(e){return e===z.UNKNOWN?Y.DEFAULT:Y.options[e]}var ee=function(e){var t=e.distance,n=e.onDistanceDropdownClick,i=Object(a.useState)(!1),r=Object(u.a)(i,2),o=r[0],s=r[1];return Object(c.jsxs)(V.a,{className:"distance-dropdown",isOpen:o,toggle:function(){return s(!o)},size:"sm",outline:!0,color:"secondary",children:[Object(c.jsx)(H.a,{caret:!0,children:$(t)}),Object(c.jsxs)(Z.a,{positionFixed:!0,children:[Object(c.jsx)(X.a,{onClick:function(){return n(z.BLOCKS)},children:"Within 4 Blocks"}),Object(c.jsx)(X.a,{onClick:function(){return n(z.WALKING)},children:"Walking (1 mi.)"}),Object(c.jsx)(X.a,{onClick:function(){return n(z.BIKING)},children:"Biking (2 mi.)"}),Object(c.jsx)(X.a,{onClick:function(){return n(z.DRIVING)},children:"Driving (5 mi.)"}),Object(c.jsx)(X.a,{onClick:function(){return n(z.BIRDS_EYE)},children:"Bird's-eye View"})]})]})};var te=function(e){var t=e.onSearchRequest,n=e.description,i=e.setDescription,r=e.location,o=e.setLocation,s=e.requestingLocation,l=e.setRequestingLocation,d=(e.setShowLiked,e.distance),j=e.onNavLinkClick,h=e.onDistanceDropdownClick,g=e.onShowLikedChange,f=Object(a.useState)(!1),b=Object(u.a)(f,2),O=b[0],m=b[1];return Object(c.jsxs)(S.a,{className:"header-navbar",color:"light",light:!0,expand:"md",children:[Object(c.jsx)(R.b,{id:"home-link",className:"navbar-brand",to:"/",onClick:function(){return j("/")},children:"Gourmand"}),Object(c.jsx)(Q.a,{onClick:function(){return m(!O)}}),Object(c.jsx)(D.a,{className:"header-collapse",in:!0,isOpen:O,timeout:200,navbar:!0,children:Object(c.jsxs)(E.a,{className:"header-nav",navbar:!0,children:[Object(c.jsx)(M.a,{children:Object(c.jsx)(R.b,{id:"about-link",className:"nav-link",to:"/about",onClick:function(){return j("/about")},children:"About"})}),Object(c.jsx)(M.a,{children:Object(c.jsx)(R.b,{id:"contact-link",className:"nav-link",to:"/contact",onClick:function(){return j("/contact")},children:"Contact"})}),Object(c.jsx)(M.a,{children:Object(c.jsx)(R.b,{id:"login-link",className:"nav-link",to:"/login",onClick:function(){return j("/login")},children:"Log In"})}),Object(c.jsx)(M.a,{className:"nav-separator"}),Object(c.jsx)(M.a,{children:Object(c.jsx)(F,{description:n,setDescription:i,location:r,setLocation:o,requestingLocation:s,setRequestingLocation:l,onSearchRequest:t})}),Object(c.jsxs)(M.a,{className:"dropdown-nav-item",children:[Object(c.jsx)(ee,{distance:d,onDistanceDropdownClick:h}),Object(c.jsx)(P,{onChange:g})]})]})})]})},ne=(n(110),n(111),n(37)),ce=n(62),ae=n(60),ie=function(e){Object(ce.a)(n,e);var t=Object(ae.a)(n);function n(e,c,a,i){return Object(h.a)(this,n),t.call(this,e,c,a,i)}return Object(g.a)(n,[{key:"getThumbnailURLs",value:function(){var e=this.source.slice(0,-5);return[e+"258s.jpg",e+"300s.jpg",e+"348s.jpg"]}}]),n}(function(){function e(t,n,c,a){Object(h.a)(this,e),this.id=t,this.type=n,this.caption=c,this.source=a}return Object(g.a)(e,[{key:"toJSON",value:function(){return ne.a.pick(this,"id","type","caption","source")}},{key:"populateFromBSON",value:function(e){var t=e.id,n=e.type,c=e.caption,a=e.source;return this.id=t,this.type=n,this.caption=c,this.source=a,this}}]),e}()),re=(n(112),function(e,t,n,a){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(){};return Object(c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e,height:t,fill:n,className:a,onClick:i,viewBox:"0 0 16 16",children:Object(c.jsx)("path",{d:"M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"})})}),oe=[50,250,500,750,1e3],se=function(e){var t=e.media,n=e.onMediaSelection,a=e.isLiked,i=Math.floor(Math.random()*oe.length),r=oe[i];return Object(c.jsxs)("div",{className:"food-thumbnail-container transition-delay-".concat(r),children:[Object(c.jsx)("img",{className:"food-thumbnail",src:t.getThumbnailURLs()[0],onClick:function(){return n(t.id)}}),a&&re("16","16","white","liked-media-icon")]})},ue=(n(113),n(134)),le=function(e){var t=e.color;return Object(c.jsxs)("div",{className:"search-curtain",children:[Object(c.jsx)("div",{className:"search-curtain-backdrop"}),Object(c.jsx)(ue.a,{className:"search-curtain-spinner",color:t})]})},de=n(140),je=(n(114),n(141)),he=n(135),ge=n(136),fe=n(137),be=function(e,t,n,a){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(){};return Object(c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e,height:t,fill:n,className:a,onClick:i,viewBox:"0 0 16 16",children:Object(c.jsx)("path",{d:"M8 6.236l-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"})})};function Oe(e){return e?'"'.concat(e,'"'):"[ No Caption ]"}function me(e,t){var n;e.preventDefault(),n=function(e){return"https://www.google.com/maps/place/"+e.join(" ").replace(" ","+")}(t),window.open(n,"_blank").focus()}var ve=function(e){var t=e.selected,n=e.onMediaLikeToggle,a=e.onClose,i=e.isLiked;console.log("selected:",t);var r=t.media,o=t.restaurant,s=r.source,u=r.caption,l=o.name,d=o.address,j=o.neighborhoods,h=o.categories,g=o.rating,f=function(){return n(r.id)};return Object(c.jsxs)(je.a,{isOpen:!!t,toggle:a,className:"media-modal-container",children:[Object(c.jsx)(he.a,{toggle:a,children:Object(c.jsx)("div",{className:"caption",children:Oe(u)})}),Object(c.jsx)(ge.a,{children:Object(c.jsxs)("div",{className:"modal-info-container",children:[Object(c.jsxs)("div",{className:"modal-image-container",children:[Object(c.jsx)("img",{className:"food-media modal-image",src:s}),i?re("32","32","white","liked-media-icon",f):be("32","32","white","unliked-media-icon",f)]}),Object(c.jsxs)("div",{className:"restaurant-details-container",children:[l&&Object(c.jsx)("div",{className:"restaurant-name",children:l}),d&&Object(c.jsx)("a",{onClick:function(e){return me(e,d)},className:"restaurant-address",children:d.join(" ")}),j&&Object(c.jsx)("div",{className:"restaurant-neighborhoods",children:j.join(", ")}),h&&Object(c.jsx)("div",{className:"restaurant-categories",children:h.join(", ")}),g&&Object(c.jsx)("div",{className:"restaurant-rating",children:g})]})]})}),Object(c.jsx)(fe.a,{children:Object(c.jsx)(U.a,{color:"secondary",onClick:a,children:"Close"})})]})};var pe=function(e){var t=e.restaurants,n=e.selectedMediaID,i=e.onMediaSelection,r=e.isLikedMedia,o=e.searching,l=e.showLiked,d=e.mediaModalProps,j=e.mediaOrder,h=e.onEntered,g=e.transitionTimeout,f=Object(a.useState)(!j),b=Object(u.a)(f,2),O=b[0],m=b[1],v=Object(a.useState)([]),p=Object(u.a)(v,2),x=p[0],N=p[1],w=Object(a.useState)(!0),A=Object(u.a)(w,2),k=A[0],I=A[1],y=t.length?"light":"dark",L=!o&&k,C=j?function(e,t){if(!e.length)return e;var n=e.flatMap((function(e){return e.media})).reduce((function(e,t){return e[t.id]=t,e}),{});return t.map((function(e){return n[e]})).map((function(e){return(new ie).populateFromBSON(e)}))}(t,j):function(e,t,n){return t?e.filter((function(e){return n(e.id)})):e}(x,l,r);return Object(a.useEffect)((function(){j||m(L)}),[o,k]),Object(a.useEffect)((function(){O&&N(function(e){console.log("restaurants:",e);var t=e.flatMap((function(e){return e.media}));return console.log("allMedia:",t),ne.a.shuffle(t).map((function(e){return(new ie).populateFromBSON(e)}))}(t))}),[O,t]),Object(c.jsx)(de.a,{classNames:"thumbnail-swap",in:L,appear:!0,timeout:g||2e3,onEntered:h,onExit:function(){return I(!1)},onExited:function(){m(!0),I(!0)},children:Object(c.jsxs)("div",{className:"gallery-container",children:[C.map((function(e,t){return Object(c.jsx)(se,{searching:o,media:e,onMediaSelection:i,isLiked:r(e.id)},t)})),o&&Object(c.jsx)(le,{color:y}),n&&Object(c.jsx)(ve,Object(s.a)({},d))]})})},xe=["JNsJSjDbHH_91HOgr9sCqA","wo-1PKMWwINpEruBqNfIiA","OjACJUFH4i2z95YTr6GSgQ","sIC6jUU6UyubnbaZABkPpw","ovBiAPKpbdwmyc211faoaw","hR32TiJU8Mj5xiVKPS9sOg","OLXglWKpO-NitEylMwCQxQ","i6WcIItMrKuc25riTVOa2w","8KFavjNsE0jNLoWKbuPnYw","D8LU7rW8ZcXcJFuQ5r5EwQ","0MWnjl5XGnV4xBHCfFolHA","B5s2mWw0uJHNp7nc05_5KQ","AcDV9qosxkG4F5053_Ozxw","naIBxTISC8Uk7LxT6JwMZw","RvY295n0LZJibhykdV6WKQ","45KqZOXPwaa5C-wUt0GCZw","Cy7bxhH5pi-7gbx-R6xBGg","RImsui5ffpABZK5E44RB6g","o7GLF55dSQa6wl1mdbNS_Q","2_8haA6LztxN2_ogne931g","MQfHzPOrDdTuvi2vRp0Jgg","NH62518Xp90Ag4sSSrlLew","Aig8NfT8y3n7RonTEU6R7g","4lyvug7N5is0tlt8DjdwdA","-ph6ERHAOUGpSjj-5ezB3w","BHX43-5b1GsqL5QTcUyUWA","clscwgOF9_Ecq-Rwsq7jyQ","9ImrGJAQShKpXYR3XHor9Q","tZ6zE8xRjJU14XoCvN69MA","PFbKEyhlyJIuGZxhqSYlKw","lXecmyyxcrZ_ikvmMZuIJQ","UbLCIVs44kMrn-gohcayPA","kdu-OQK_5o2s2vZZK0Hm8A","lX4tl9QhM0uibrKtGKaKrQ","8Xsu2-QtcqrfNFM9zjEDvg","vCKELKLC9LhdOHrct-g5vw","D-5Td9XsLCekgq3joM6JFw","jplZpyYsst7iMuNs8v6YYw","5fADHJFD-B6RTfDDTp5NCg","L82MR10Nq8MIXmB4UOsEmw","kDX7cOkf3n34he2RB-d1eg","j6Hoc_YpJJapUUzfd9pj8A","e6-wcjGC3l6mfDiUajmJSQ","rLLQ3hoJuV85AcYefCF70A","Fwxy9LPkKU3fDhypYlevtw","H31x1q8-iLFOKIRNdwyBow","Uwu-RxcqVD7y86WeEagmMg","4HgjE1WxnRcMH1pT48HQCg","yMEtHWpKYf2uKQg9RD-oRA","5UYmKinQN08dvY7nh53qUw","qzrLMUmERPzG5RZKNvpGmQ","xcqOeQeP-H81cBvdpYU79A","pFuYCC-Ku1aRxkFfhCuUoQ","Ve4NvCiHBzHXzHdMVLoB5A","rJACyS33y3DJjrGqNltOGA","yxkJzN_-yPoXgx9p2FUk1g","Xt3BMLOZ7UxbbBGDAjGeWw","C3JP2BzCnoH7dTCg7P_v3A","pz3VgZc7pjEseCn14IBSwA","p9efKzd_XlOT33FKjGkPvA","Mz8N4ggsttTNdvXBxJgr5A","UR6lKY9PaWj1MvIIuMuFsA","QItGxOxkzFcqffTPxOqHiQ","Ic7CbsC9rEVt5WAMzyLmjg","vJDupyCGamWh_langjIeCA","2tiJtevOs04KrOavcwlfgw","Igu73RMmDbK9FSxXURNRnA","PfoqacfguTrChnllOdhviA","xbZwukayFmDsSTq63zcxoA","uMZiwJW9Seie0qSweM7afA","w72XS1-aeaaW55xLPfpcMQ","UkcIOtVlql4t0fzvrA18yw","3ggCaHyfXBxfmjiWNK7INg","y-HgqTSKSPrnc4NvKTn7ug","jYhk78GEe3SWkCgLsXf4zA","O2ph1erEoN9AgOyEYiTn5g","daVm5y6lvydIXm8J0yeahQ","MXbcxwMw7WE7oEvLy06D3Q","iVIYrErB2c7lYaVeVY8PhQ","7ydOP9KWUZfjkG6PduP-6Q","W3WU8nLIJP9oComniVw4dQ","l_PKFtmRq5IrCb0_EDz2Mw","Rq6-DNHA1tq8ZnPMr3acPw","tbFfqvnbx_c4ti5hHi1SlQ","9rDurcWzj3mfXAxwjd77aA","DfUtbYYx6IZU3LzruOpQzQ","NrPQePur6gAyhu__z3sw3A","wlwyeZrOiSvxGGqaMcUITQ","0LNNUofcpOqaCNUCo-SaCw","veRMosxRuW4lGQeUbJJLFw","oM_2_du4oQf2sYiTsZspMg","XMZiAVCf0miasVcL5LvDSQ","pSL2DXLI6fqhLn8ISChjNA","V1whpgh_FFE3L27M9l-GWw","i1pZRFkEscwirTv28fXCgA","W_VFwCIhcAfD0GSIHggIRA","hly8cAfSwbj2x8n9G69pBg","3cR5LDisK0H3sci1qJ6H2w","wvsrArhDz_tmlR4zKkiu_Q","vOe8cjWK-kqDEf4a41qaCQ","4AiSsxe_qPlKhIN5RqhwlA","WHV0UBdhxcnu-l2GXed-IA","GiYuDZwjlSpM2IKu5HywNw","kp2qg5xCXazJI0Pnr0hrjA","OiRqQiw8BiQdwMFd9O3KUQ","hAmD1yFoHRc-I49T0JGVBw","8q5NtSUU6BfnAGbfueMVAw","0K9ICfofQeHuwzkip9-JcQ","0CxtRC4BfPobAfvBBLJH3g","Q1Nxm3LddoBmeBS3gp0bBA","sYVGp3t9SDlDgNme_1hKlA","gvefxJdh10SD40wbaIXAlA","LnARDrSUBIseN0ekqfhOkg","lO7qqJ3RReqWVtowQbgBHQ","0CKvm7jcENINXJc662o8mg","BQoK-TGb42fIoKTgZTmljQ","ENh0J-5YsJrRmymhnbuNDw","LlXWcYU5JlXRk7vYnKv1Ug","QUBBhio9ex9hGk8tQbaiGg","l69WViivrod87JNIbwuijw","dpLRH4yJSga1CYNqnl0-JQ","4dfe9qpe20P-vi3qFjWd4Q","fU2YVTzW1DnbJmMLJF0LqA","zYO7EXV_zvAKTuzpp6VCLw","m9Kk0RIZ7ik2gVZQxHwpKQ","R732FIRT1t8VTnsI8WBARA","3yeb0hektZBFwFQv_PCETQ","N2ZXh-mYh2OC18LVKOxYYg","uOuGHPJAibqiQo62UBAfiA","oB9CFo5mAZLjdN7-wdJM0A","0RUqVbsW5TSY4WQSPS4qaw","6_Ky3Pki7y4Z1OyjkvB4WQ","RAzDqVJnHpdon3fMRLXpJg","WzmcXvY8QONETe2ILIfvJA","ZxN4O-5pfIEE8__bRgq-ig","ctlIbv1YFhZzBUFgFlX16A","fh1uMBN8LYgRoJFE7-oQcQ","xUvlRWX_S8cGH9E9I3BtnA","fDVIjn_eyS0OH1ZPOIZiig","LNdSDlKQ0mxCCglKhpbM6w","md2VoTKoJDXAS1WqNhrSvA","QBDdF7OfR-Z0QrLBlCaKEQ","CBRXLSSG1izVdsN3wAQ8hg","auXDK3AgFZtsMK7S-boxiw","Y_uF4SEFltMXvIk6-EBhEA","qxjhi4aP3a9jYxcodsobgQ","NhqShORuY93bfjlWmkMNLg","ka6kFgDuyc48U8v3FZOf9g","Abo2xRkekn_DCiH5S0kaug","sU5Ei5QUUq6pxi1q512ArQ","iv9OCAmr8fVZ0Lfb3aETpg","qEJE7VBVBuSIuLaRUrvXFw","xRmiDmKYUutyGpiQJeNUNQ","fNsTswXTDbXKDaiL6EkKOQ","809WbuKqCiRAus0HhIC4xw","f0VuSjzCCLuLvl8VBuH8Ug","4zMaZBjZe5dNeCK3MgUY6A","9iMwXe02bT0gMlR7Wh7WUg","1n5xL5ojLR-_zseirQKaMw","vHEkgNTs2to038asQacioQ","Efl8ZtfINJ2kfQnz-XKArA","weti_fkdKwIVJoSF1bhWxQ","H7TB8AasxAAyGy8w2H2QUQ","3N2RJCtXNMtajAMlg__n1Q","UHyL-_GQ8X2V4Bpa7QLtWA","EDQx9Y5xkEf_8KUrWBJl3A","vgWdpAeaGqmFHM9L8tGtgQ","OCDZ4nXoaMHF0TraV0u2-g","hCokJLK3nSe79v3QBw350Q","ENeutQE66vkGKejCpK5YBQ","ug7Di7n7fwJtWCxXjAdJUA","vicWtlir2PmDErr7CPOn5g","M0pfb3y4P0nS5ITDlyYMAg","FfWr6_7wWK5Rh-L7O0ePZw","9wIuw-B6xrx3u5qUnjFqGQ","czwJ0-FBu8YawAlNjIlgAg","q7lprjX7HWWMMVmPZRumSw","lZPG59I1NAYFhAWsVbkykQ","LylkQiPOsKpHMsWsq5edtQ","e_324r-CPTCkBdy4xiaBOg","J4YQVCLQgrSFgKi7w4VC3w","k8xE8euAPO1IL0Jb2rUj3g","n2jkSNSPzaB5vtmvV96o4Q","SBzbmYOLWPGoIumSMhZ5cg","QYvr7o9MOVM4Pp25VDoX1A","sgTGLoIUgFMiRLHYSsaXTQ","B6y1kB7mWwV57vt720pPNg","tO_tQGw_f-QADv18bRj_tg","edK79Gb2DWwmNpcLr0bxgw","bSWbtKskAFSeiwBPQptANw","pJsI1Qn0KfNIJ3vJSo86Hg","mE31lNBhWgzBiogfD8wKKQ","E34Z5j5bD1lTRP9AggXKGw","Ielsk99frSq8ZgZtWmMV7Q","WiTOJZ9KhmZzTxImIzd8MA","6ktAcIBQq1kwQltlhIMF_Q","yKPqCs-qmlytm7S_1-v7ew","ApY7RxKF9GBUq5UBIR9oWg","aWUuDpjA_JK-m43WNLuiXg","6OIKrzLFTI-Wuc2pUq6UKQ","338rqVgi-EbZ0w6aOVaSMA","JXlvk5l-rBGgAd6jzgJq3A","UZUHWiG-ri4zIA3g5H-0hA","2Y2W9ODseGfJjMh1oAYwRw","04jG97Xp_lxgw3TzuRfqfA","kK9DQORFANn4siKSCWh7Dg","vSsJhO83ya0NKSJR_d2yEg","f84TV7bJ4TTaaO-ukN3beg","K-5oYvnlJIEwS3OscBPleQ","m1u4oDvuvEquRl4VZS99LA","xtBIEG8LasWJiciMvg9PqQ","N_pno3f44vvEKW7I8H8zJw","e_B8N0hFtCDRW-B9HYjZnQ","KX7hm2M5rGPumF9m4Rhe-w","W8FpY4J5ULzy8ynmN_w87A","rrhqw_KxQjk_Mgpcj8EZ8g","UUwv9s2CpVGhb45N2TcDCQ","NxRz73F29G6VhnnUSppXAw","Lr8q4jsPIf8Ec07dTftIDQ","U-2TJrLqdjg_6lTaKjQuDg","NDtp_YDFFzZy2bzf0uqMvA","OixGjexLhvMNCqslLcqpNw","nrcnymth7MNbjT36A_44sA","e2LGP3Raq7CnjkDU4QOjqg","EXIUlEfVuo8loO3lbciaEg","spAc-3AsXOVoQfP9gKBf4Q","ZkIU1VjyzFIn851iQQne8g","xtoTj3dB1z350vXDTyyylA","vUpNGgs14HleRcxlnlHb8w","5KRLy3Ffxx3plt4B4DgtqQ","QGOhDg47ELjOMfZZjcyfVA","w0taZk-vWDHYeia1bwdbdw","JdcCGJnQrWGbUgZN_1nwyQ","N1AnP4jD0A_v9NGHGaPA3g","aUKSp0O5oTLgsh47QyJ57g","_gYb3ud0t2qLcSZm01uw4g","5nMa2Q9wgXV93QSO7YF-bQ","yWtsQoI8ZMTNc69ZhWjf9Q","Q5DN9FyxcWfEQO8QiEnmDg","QgrEW-SMfez8OkMHlgg-Rw","VmEwVKxLt3VCL8hv6NPe6w","PG60HdnabTmn9b8UwpCXNw","KlSOY2HZNmBuulymoiXs_w","oaRdhGb7N2m6IkNqq-ncHA","W_Vq8-FqV49FdcU6RQ3viA","BIqND02sEnJNYfDxGo2YTQ","d75CAtSihlDlemmLVEy6qQ","D7m9dIhimYGLW7tR1k-hfw","B3eNfBS1DTkTZ6fasVL01A","h7XOvZN1JCdqJc02w31JyQ","y_XsYXPT-6kT3H7yr0UerA","eSN1CksnpTEp06RZ1I42lQ","wDoXSPITi4x50QZLjctX6w","L6lAx2lB9YQ08svNnAZjDA","gUWF6nllXvGUkHZeeS8tPQ","ZpgQiL05GC34I3AO4tj73A","vJvdTsk01tV1TVk-1QmrHA","cVTbsWuqEHEohKZcsyZnQQ","sa08ZzkTVO5hUAkFZEL7pg","tmZD5rQmlkrwzw3RYnUCVg","TSJiOmlubv2R1pv5mI4dGQ","6qyvj8i4aKF5rWjgsIx3rg","48doX4sxCRLxOl8a6AD35Q","HCFv8Wvv2FVM-rKCoAPNPg","z6_uI5oEm0T-BBnko0dqhQ","vuuvzo1r_pJ_qebiJvTW1A","lM0Xlh3wB8Wmx1Kg-KtnNg","iqytnpOnd5kFJsDkbXzOfg","lCJZ6KsMSXkV-PH1K1mgFA","ZMgLNoF3r4Dg1bAFKr7CfQ","cyGjVI-jk5DZAqyW0ge-Hw","6H1cEJT1U-jWh43-d7cB1Q","Uh1nGIHlHK_xwb1GHwlVpg","6PPnf5H2z2Z_30IF5wAF3g","V8grVFq6Lnzc5jJKuDAFAQ","xRNPKIfF2Gr02zBiBl3dSA","v3F-pk2-1RZ_P_WFtAbmdA","1v1N3C8_yrzDlHIrfSeUYg","L4nXb6_5NR7yMO__KyID_A","nltCMgItjXLrBCoVRsiVlQ","HzFpRjIo39Ywrht51n_Yuw","1FAsc4oIzF5O0H7Fr_WiCA","3uOja3d1pnogIuVCNOzAdw","TCXfmnrFjLSKcBdiWd-q4Q","qbIajNWouEP5U1HxY5I0yA","QOzWXDCkg9hvplsM6NPLQQ","HLLrQD3X30jEWd0dA5QwBw","e8m5L5Z7e9Q3x8Tn7Y6EVA","RvZt5Ar5uzFJfJgqo821lQ","NGuzAKvDcB1agIn7rEBi4A","IpSPUvkcsPy8E4TmvjY4HQ","VPegpBDKXuuNf7Oi-UsmHw","8fY9fA5TtCF0ebdTNph9mQ","qS-fQBZcEMKqgPI0CM1B2w","lP9ZT1q3TjeMmm-4N68vEw","9IjZp2EhoUQzeMMDyCJdrg","w1THUZhsnLEpUbaQ-XAfnA","kiJtk3Gn5J272vXgsfS-xQ","PAgOf4yyRFZR9Lc2gl5X_g","6KJ1a882332ckXcS1-dAbg"],Ne=function(e){var t=Object(a.useState)(!1),n=Object(u.a)(t,2),i=n[0],r=n[1];return Object(c.jsxs)("div",{className:"home-page-container",children:[Object(c.jsxs)("div",{className:"home-page-text-container"+(i?" show":""),children:[Object(c.jsx)("h1",{className:"home-page-text home-page-company-name",children:"Gourmand"}),Object(c.jsx)("h3",{className:"home-page-text home-page-slogan",children:"Find food.  Fast."})]}),Object(c.jsx)(pe,Object(s.a)(Object(s.a)({},e),{},{mediaOrder:xe,onEntered:function(){return r(!0)},transitionTimeout:50}))]})},we=(n(115),function(e){var t=e.error;return Object(c.jsxs)("div",{className:"error-message-container",children:[Object(c.jsx)("div",{className:"error-apology",children:"Oops, something went sour."}),Object(c.jsxs)("div",{className:"error-message",children:['"',t.message,'"']})]})}),Ae=function(e){var t=e.error,n=e.restaurants,a=e.selectedMediaID,i=e.onMediaSelection,r=e.isLikedMedia,o=e.searching,s=e.showLiked,u=e.mediaModalProps;return t?Object(c.jsx)(we,{error:t}):Object(c.jsx)(pe,{restaurants:n,selectedMediaID:a,onMediaSelection:i,isLikedMedia:r,searching:o,showLiked:s,mediaModalProps:u})},ke=n(36),Ie=(n(116),function(e){return Object(ke.a)(e),Object(c.jsx)("div",{className:"about-container",style:{backgroundImage:"url(/about-background.jpg)"},children:Object(c.jsxs)("div",{className:"text-container",children:[Object(c.jsxs)("p",{children:[Object(c.jsx)("span",{className:"company-name",children:"Gourmand"})," is for people who absolutely love food.  Those who always search for new restaurants, dishes, and neighborhoods to try."]}),Object(c.jsx)("p",{children:"The problem is that whittling down reviews to find good places is difficult and time consuming.  Information about restaurants is fractured into many different platforms.  Who has time to conduct a research project whenever they get a little hungry?"}),Object(c.jsxs)("p",{children:["At ",Object(c.jsx)("span",{className:"company-name",children:"Gourmand"}),", we believe the food should speak for itself.  The rest will follow."]}),Object(c.jsx)("p",{children:"Salud!"})]})})}),ye=(n(117),n(139)),Le=n(138),Ce=function(e){var t=e.name,n=e.email,a=e.subject,i=e.message,r=e.setName,o=e.setEmail,s=e.setSubject,u=e.setMessage,l=e.onSubmitButtonClick;return Object(c.jsxs)(Le.a,{className:"contact-form",children:[Object(c.jsx)(J.a,{children:Object(c.jsx)(T.a,{required:!0,type:"text",name:"name",placeholder:"Name",value:t,onChange:function(e){return r(e.target.value)}})}),Object(c.jsx)(J.a,{children:Object(c.jsx)(T.a,{required:!0,type:"email",name:"email",placeholder:"Email",value:n,onChange:function(e){return o(e.target.value)}})}),Object(c.jsx)(J.a,{children:Object(c.jsx)(T.a,{type:"text",name:"subject",placeholder:"Subject",value:a,onChange:function(e){return s(e.target.value)}})}),Object(c.jsx)(J.a,{children:Object(c.jsx)(T.a,{required:!0,type:"textarea",name:"message",placeholder:"Your Message",value:i,onChange:function(e){return u(e.target.value)}})}),Object(c.jsx)(U.a,{onClick:l,color:"secondary",children:"Submit"})]})},Se=function(){window.scroll({top:0,left:0,behavior:"smooth"})},Qe="",De="success",Ee=function(e,t,n){var c=t.name,a=t.email,i=t.subject,r=t.message,o=n.onSuccess,s=n.onError;e.preventDefault(),function(e,t,n){fetch("/contact",{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){e.status===De?t(e):n(e,e)})).catch(n)}({name:c,email:a,subject:i||"[ No Subject ]",message:r},o,s)},Me=function(){return Object(c.jsxs)(i.a.Fragment,{children:[Object(c.jsx)("h1",{className:"contact-header",children:"Say Hello!"}),Object(c.jsx)("p",{className:"contact-text",children:"Found a bug?  Have a feature request?  Just want to vent?  Let us know!"})]})},Re=function(){return Object(c.jsxs)(i.a.Fragment,{children:[Object(c.jsx)("h1",{className:"contact-header",children:"Message Received!"}),Object(c.jsx)("p",{className:"contact-text",children:"Thanks for reaching out!  We'll get back to you as soon as we can."})]})},Be=function(){return Object(c.jsxs)(i.a.Fragment,{children:[Object(c.jsx)("h1",{className:"contact-header",children:"Uh oh!"}),Object(c.jsx)("p",{className:"contact-text",children:"Looks like something went wrong.  Our team has been notified and we're working on the issue."})]})},Ke=function(e){return e===Qe?Object(c.jsx)(Me,{}):e===De?Object(c.jsx)(Re,{}):Object(c.jsx)(Be,{})},Te=function(){var e=Object(a.useState)(""),t=Object(u.a)(e,2),n=t[0],i=t[1],r=Object(a.useState)(""),o=Object(u.a)(r,2),l=o[0],d=o[1],j=Object(a.useState)(""),h=Object(u.a)(j,2),g=h[0],f=h[1],b=Object(a.useState)(""),O=Object(u.a)(b,2),m=O[0],v=O[1],p=Object(a.useState)(""),x=Object(u.a)(p,2),N=x[0],w=x[1];Object(a.useEffect)((function(){N!==Qe&&(i(""),d(""),f(""),v(""))}),[N]);var A={name:n,email:l,subject:g,message:m,setName:i,setEmail:d,setSubject:f,setMessage:v,onSubmitButtonClick:function(e){return Ee(e,{name:n,email:l,subject:g,message:m},{onSuccess:function(e){return function(e,t){t(e.status),Se()}(e,w)},onError:function(e,t){return function(e,t,n){console.error(e),n(t.status),Se()}(e,t,w)}})}};return Object(c.jsxs)("div",{className:"contact-container",children:[Object(c.jsx)("div",{className:"contact-background",style:{backgroundImage:"url(/contact-background.jpg)"}}),Object(c.jsxs)(ye.a,{className:"contact-content-container",children:[Object(c.jsx)("div",{className:"text-container",children:Ke(N)}),N===Qe&&Object(c.jsx)(Ce,Object(s.a)({},A))]})]})},Ue=(n(118),function(e){return Object(ke.a)(e),Object(c.jsx)("div",{className:"login-container",style:{backgroundImage:"url(/login-background.jpg)"},children:Object(c.jsxs)("div",{className:"text-container",children:[Object(c.jsx)("h3",{className:"login-text login-header",children:"We're sorry.  User accounts aren't available yet."}),Object(c.jsx)("h6",{className:"login-text",children:"But you can be sure that, like a good bar, that feature is just around the corner.  \ud83e\udd42  "})]})})}),qe=function(e,t,n){var c={selector:e,event:t};return n&&(c.properties={url:n}),c},_e=d.EVENT_TRACKING_TOKEN,We=j,Fe=new b,Je=(new x).get(window.localStorage),Ge=new w(function(e){try{return e.get("likedMedia")}catch(t){window.console.debug(t)}}(Je),Je),Pe=new I(_e,[qe("#home-link",I.events.NAVIGATE,"/"),qe("#about-link",I.events.NAVIGATE,"/about"),qe("#contact-link",I.events.NAVIGATE,"/contact"),qe("#login-link",I.events.NAVIGATE,"/login"),qe(".restaurant-address",I.events.OPEN_MAP)]);function Ve(e){return e&&Ge.isLiked(Fe.getRestaurantIDByMediaID(e),e)}function He(e,t){var n=e.description,c=e.location,a=e.distance;if(console.log("updateSearchURL()"),console.log("description:",n),console.log("location:",c),console.log("distance:",a),c){var i=C("/gallery",{description:n,location:c,distance:a});return console.log("url:",i),t.push(i)}}function Ze(e,t){return{media:t.getMediaByID(e),restaurant:t.getRestaurantByID(t.getRestaurantIDByMediaID(e))}}function Xe(e){if(e.ok)return e;throw new Error(e.statusText)}function ze(e){if(e.some((function(e){return e.mediaCount>0})))return e;throw new Error("Nothing to see here.")}function Ye(e){return fetch(e).then(Xe).then((function(e){return e.text()})).then((function(e){return JSON.parse(e)})).then(ze)}function $e(e,t,n){window.console.error(e),n.track(I.events.ERROR,{message:e.message}),t(e)}function et(e){Pe.track(I.events.NAVIGATE,{pathname:e})}Pe.track(I.events.PAGE_VISIT);var tt=function(e){return function(t){e(t)}},nt=function(e){return function(t){var n=I.events,c=n.SHOW_LIKED_MEDIA,a=n.SHOW_ALL_MEDIA;Pe.track(t?c:a),e(t)}};var ct=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],i=t[1],r=Object(a.useState)(""),o=Object(u.a)(r,2),d=o[0],j=o[1],h=Object(a.useState)(""),g=Object(u.a)(h,2),f=g[0],b=g[1],O=Object(a.useState)(!1),m=Object(u.a)(O,2),v=m[0],p=m[1],x=Object(a.useState)(""),N=Object(u.a)(x,2),w=N[0],A=N[1],k=Object(a.useState)({}),y=Object(u.a)(k,2),L=(y[0],y[1]),S=Object(a.useState)(!1),Q=Object(u.a)(S,2),D=Q[0],E=Q[1],M=Object(a.useState)(null),R=Object(u.a)(M,2),B=R[0],K=R[1],T=Object(a.useState)(We.UNKNOWN),U=Object(u.a)(T,2),q=U[0],_=U[1],W=Object(a.useState)(!1),F=Object(u.a)(W,2),J=F[0],G=F[1],P=Object(l.f)(),V=Object(l.g)();Object(a.useEffect)((function(){console.log("browserLocation:",V);var e=V.pathname,t=V.search;t?(K(null),E(!0),Pe.track(I.events.SEARCH,{description:d,location:f,distance:q}),Ye(C("/search",{description:d,location:f,distance:q})).then((function(n){Fe.update(e+t,n),console.log("lookup:",Fe),i(n),E(!1),Se()})).catch((function(e){return $e(e,K,Pe)}))):"/"===e&&Ye("./home-page-restaurants.json").then((function(n){Fe.update(e+t,n),i(n)})).catch((function(e){return $e(e,K,Pe)}))}),[V]),Object(a.useEffect)((function(){He({description:d,location:f,distance:q},P)}),[q]),Object(a.useEffect)((function(){v&&Pe.track(I.events.REQUEST_CURRENT_LOCATION)}),[v]),Object(a.useEffect)((function(){w&&Pe.track(I.events.CLICK_GALLERY_MEDIA)}),[w]);var H={description:d,setDescription:j,location:f,setLocation:b,requestingLocation:v,setRequestingLocation:p,setShowLiked:G,distance:q,onNavLinkClick:et,onDistanceDropdownClick:tt(_),onShowLikedChange:nt(G),onSearchRequest:function(){return He({description:d,location:f,distance:q},P)}},Z={selected:Ze(w,Fe),onMediaLikeToggle:function(e){return function(e,t){var n=I.events,c=n.LIKE_MEDIA,a=n.UNLIKE_MEDIA,i=Ge.toggle(Fe.getRestaurantIDByMediaID(e),e);Pe.track(i?c:a),t(Ge.getAll())}(e,L)},onClose:function(){return A("")},isLiked:Ve(w)},X={isLikedMedia:Ve,searching:D,showLiked:J,selectedMediaID:w,restaurants:Fe.getRestaurantsByURL(V.pathname+V.search)||n,onMediaSelection:A},z=Object(s.a)({error:B},X);return Object(c.jsxs)("div",{className:"app",children:[Object(c.jsx)(te,Object(s.a)({},H)),Object(c.jsxs)(l.c,{children:[Object(c.jsx)(l.a,{exact:!0,path:"/",children:Object(c.jsx)(Ne,Object(s.a)(Object(s.a)({},X),{},{mediaModalProps:Z}))}),Object(c.jsx)(l.a,{path:"/gallery",children:Object(c.jsx)(Ae,Object(s.a)(Object(s.a)({},z),{},{mediaModalProps:Z}))}),Object(c.jsx)(l.a,{path:"/about",children:Object(c.jsx)(Ie,{})}),Object(c.jsx)(l.a,{path:"/contact",children:Object(c.jsx)(Te,{})}),Object(c.jsx)(l.a,{path:"/login",children:Object(c.jsx)(Ue,{})})]})]})},at=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,145)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),i(e),r(e)}))};o.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(R.a,{children:Object(c.jsx)(ct,{})})}),document.getElementById("root")),at()},70:function(e,t,n){},71:function(e,t,n){},73:function(e,t,n){},74:function(e,t,n){},75:function(e,t,n){},78:function(e,t,n){},79:function(e,t,n){}},[[119,1,2]]]);
//# sourceMappingURL=main.3374ff70.chunk.js.map