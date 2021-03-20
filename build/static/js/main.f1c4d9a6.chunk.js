(this.webpackJsonpgourmand=this.webpackJsonpgourmand||[]).push([[0],{104:function(e,t,n){},105:function(e,t,n){},106:function(e,t,n){},107:function(e,t,n){},108:function(e,t,n){},109:function(e,t,n){},110:function(e,t,n){},111:function(e,t,n){},112:function(e,t,n){},118:function(e,t,n){"use strict";n.r(t);var c=n(2),a=n(1),i=n.n(a),r=n(23),o=n.n(r),s=(n(69),n(70),n(14)),u=n(10),l=(n(71),n(13)),j={UNKNOWN:"unknown",BIRDS_EYE:0,DRIVING:1,BIKING:2,WALKING:3,BLOCKS:4},d=n(15),h=n(16),g={restaurantsByID:{},mediaByID:{},restaurantIDsByMediaID:{}},b=function(){function e(){Object(d.a)(this,e)}return Object(h.a)(e,[{key:"update",value:function(e){!function(e,t){e.restaurantsByID=f(e.restaurantsByID,function(e){return e.reduce((function(e,t){return e[t.id]=t,e}),{})}(t)),e.mediaByID=f(e.mediaByID,function(e){return e.flatMap((function(e){return e.media})).reduce((function(e,t){return e[t.id]=t,e}),{})}(t)),e.restaurantIDsByMediaID=f(e.restaurantIDsByMediaID,function(e){return e.reduce((function(e,t){return f(e,function(e){return e.media.reduce((function(t,n){return t[n.id]=e.id,t}),{})}(t))}),{})}(t))}(g,e)}},{key:"getMediaByID",value:function(e){return g.mediaByID[e]}},{key:"getRestaurantByID",value:function(e){return g.restaurantsByID[e]}},{key:"getRestaurantIDByMediaID",value:function(e){return g.restaurantIDsByMediaID[e]}}]),e}();function f(e,t){return Object(s.a)(Object(s.a)({},e),t)}var O=function(){function e(t){Object(d.a)(this,e),this.storage=t}return Object(h.a)(e,[{key:"get",value:function(e){var t=this;return m((function(){return t.storage.getItem(e)}))}},{key:"set",value:function(e,t){var n=this;return m((function(){return n.storage.setItem(e,t)}))}},{key:"remove",value:function(e){var t=this;return m((function(){return t.storage.removeItem(e)}))}},{key:"removeAll",value:function(){var e=this;return m((function(){return e.storage.clear()}))}}]),e}();function m(e){try{return e()}catch(t){window.console.debug("Storage Exception:",t)}}var p=function(){function e(){Object(d.a)(this,e)}return Object(h.a)(e,[{key:"get",value:function(){}},{key:"set",value:function(){}},{key:"remove",value:function(){}},{key:"removeAll",value:function(){}}]),e}(),x=function(){function e(){Object(d.a)(this,e)}return Object(h.a)(e,[{key:"get",value:function(e){return e?new O(e):new p}}]),e}(),v=n(61),w=function(){function e(t,n){Object(d.a)(this,e),this.liked=function(e){return e?"string"===typeof e?function(e){var t=JSON.parse(e);for(var n in t)t[n]=new Set(t[n]);return t}(e):e:{}}(t),this.storage=n}return Object(h.a)(e,[{key:"toggle",value:function(e,t){var n,c,a=Object(s.a)({},this.liked);this.liked=N(a,e,t)?function(e,t,n){e[t].delete(n),0===e[t].size&&delete e[t];return e}(a,e,t):function(e,t,n){t in e||(e[t]=new Set);return e[t].add(n),e}(a,e,t),n=this.storage,c=this.serialize(),n.set("likedMedia",c)}},{key:"getAll",value:function(){return this.liked}},{key:"isLiked",value:function(e,t){return N(this.liked,e,t)}},{key:"serialize",value:function(){var e={};for(var t in this.liked)e[t]=Object(v.a)(this.liked[t]);return JSON.stringify(e)}}]),e}();function N(e,t,n){return t in e&&e[t].has(n)}var k=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){return t.reduce((function(e,t){return t(e)}),e)}},A=j;var y=function(e,t){var n=t.description,c=t.location,a=t.distance;return[e,k((function(e){return function(e,t){return t.concat("description=".concat(encodeURIComponent(e)))}(n,e)}),(function(e){return function(e,t){return t.concat("location=".concat(encodeURIComponent(e)))}(c,e)}),(function(e){return function(e,t){return e&&e!==A.UNKNOWN?t.concat("distance=".concat(encodeURIComponent(e))):t}(a,e)}))([]).join("&")].join("?")},Q=(n(72),n(128)),I=n(129),S=n(130),L=n(131),D=n(132),C=n(133),B=n(134),M=(n(73),n(122)),q=n(143),K=n(123),R=n(56),U=(n(74),n(120)),E=n(121);var F=function(e){var t=e.requestLocation;return Object(c.jsx)(U.a,{className:"suggestions-list-group",onMouseDown:function(e){return e.preventDefault()},children:Object(c.jsx)(E.a,{tag:"button",onClick:t,action:!0,children:Object(c.jsxs)("div",{className:"current-location-container",children:[Object(c.jsx)("img",{className:"current-location-icon",src:"cursor-fill.svg"}),Object(c.jsx)("span",{children:"Current Location"})]})})})};var J=function(e){var t=e.onSearchRequest,n=e.description,i=e.setDescription,r=e.location,o=e.setLocation,s=e.requestingLocation,l=e.setRequestingLocation,j=Object(a.useState)(!1),d=Object(u.a)(j,2),h=d[0],g=d[1],b=function(){return g(!1)};return Object(c.jsxs)("form",{className:"search-form",onSubmit:function(e){return function(e,t){e.preventDefault(),console.log("onSubmit()"),t()}(e,t)},children:[Object(c.jsx)("div",{className:"input-group-container",children:Object(c.jsxs)(M.a,{children:[Object(c.jsx)(q.a,{addonType:"prepend",children:Object(c.jsx)("img",{className:"input-icon query-icon",src:"magnifying-glass.svg"})}),Object(c.jsx)(K.a,{className:"search-input",type:"text",value:n,onChange:function(e){i(e.target.value)},placeholder:"e.g. Pizza"})]})}),Object(c.jsxs)("div",{className:"input-group-container",children:[Object(c.jsxs)(M.a,{children:[Object(c.jsx)(q.a,{addonType:"prepend",children:Object(c.jsx)("img",{className:"input-icon location-icon ".concat(s?"rotate":""),src:function(e){return e?"spinner.png":"target.svg"}(s)})}),Object(c.jsx)(K.a,{className:"search-input",type:"text",value:r,onChange:function(e){var t=e.target.value;t&&b(),o(t)},onClick:function(){return g((function(e){return!e}))},onBlur:b,placeholder:"e.g. Brooklyn, NY 11237"})]}),h&&Object(c.jsx)(F,{requestLocation:function(e){e.preventDefault(),console.log("Requesting location."),l(!0),b(),navigator.geolocation.getCurrentPosition((function(e){var t=e.coords,n=t.latitude,c=t.longitude;l(!1),o("".concat(n.toPrecision(7),", ").concat(c.toPrecision(7)))}),(function(e){l(!1),console.error(e)}),{timeout:1e4,maximumAge:6e4})}})]}),Object(c.jsx)(R.a,{className:"search-submit-button hidden-submit",type:"submit"})]})},W=(n(77),n(124)),T=n(125);var P=function(e){var t=e.onChange;return Object(c.jsx)(W.a,{className:"header-check filter-liked-check",check:!0,children:Object(c.jsxs)(T.a,{check:!0,children:[Object(c.jsx)(K.a,{type:"checkbox",onChange:function(e){return t(e.target.checked)}}),Object(c.jsx)("span",{className:"header-check-text",children:"Show Liked"})]})})},H=(n(78),n(126)),V=n(144),Z=n(145),G=n(127),X=j,z={DEFAULT:"Distance",options:["Bird's-eye View","Driving (5 mi.)","Biking (2 mi.)","Walking (1 mi.)","Within 4 Blocks"]};function _(e){return e===X.UNKNOWN?z.DEFAULT:z.options[e]}var Y=function(e){var t=e.distance,n=e.setDistance,i=(e.onSearchRequest,Object(a.useState)(!1)),r=Object(u.a)(i,2),o=r[0],s=r[1];return Object(c.jsxs)(H.a,{className:"distance-dropdown",isOpen:o,toggle:function(){return s(!o)},size:"sm",outline:!0,color:"secondary",children:[Object(c.jsx)(V.a,{caret:!0,children:_(t)}),Object(c.jsxs)(Z.a,{positionFixed:!0,children:[Object(c.jsx)(G.a,{onClick:function(){return n(X.BLOCKS)},children:"Within 4 Blocks"}),Object(c.jsx)(G.a,{onClick:function(){return n(X.WALKING)},children:"Walking (1 mi.)"}),Object(c.jsx)(G.a,{onClick:function(){return n(X.BIKING)},children:"Biking (2 mi.)"}),Object(c.jsx)(G.a,{onClick:function(){return n(X.DRIVING)},children:"Driving (5 mi.)"}),Object(c.jsx)(G.a,{onClick:function(){return n(X.BIRDS_EYE)},children:"Bird's-eye View"})]})]})};var $=function(e){var t=e.onSearchRequest,n=e.description,i=e.setDescription,r=e.location,o=e.setLocation,s=e.requestingLocation,l=e.setRequestingLocation,j=e.setShowLiked,d=e.distance,h=e.setDistance,g=Object(a.useState)(!1),b=Object(u.a)(g,2),f=b[0],O=b[1];return Object(c.jsxs)(Q.a,{className:"header-navbar",color:"light",light:!0,expand:"md",children:[Object(c.jsx)(I.a,{href:"/",children:"Gourmand"}),Object(c.jsx)(S.a,{onClick:function(){return O(!f)}}),Object(c.jsx)(L.a,{className:"header-collapse",in:!0,isOpen:f,timeout:200,navbar:!0,children:Object(c.jsxs)(D.a,{className:"header-nav",navbar:!0,children:[Object(c.jsx)(C.a,{children:Object(c.jsx)(B.a,{href:"/about",children:"About"})}),Object(c.jsx)(C.a,{children:Object(c.jsx)(B.a,{href:"/contact",children:"Contact"})}),Object(c.jsx)(C.a,{children:Object(c.jsx)(B.a,{href:"/login",children:"Log In"})}),Object(c.jsx)(C.a,{className:"nav-separator"}),Object(c.jsx)(C.a,{children:Object(c.jsx)(J,{description:n,setDescription:i,location:r,setLocation:o,requestingLocation:s,setRequestingLocation:l,onSearchRequest:t})}),Object(c.jsxs)(C.a,{className:"dropdown-nav-item",children:[Object(c.jsx)(Y,{distance:d,setDistance:h,onSearchRequest:t}),Object(c.jsx)(P,{onChange:j})]})]})})]})},ee=(n(104),n(105),n(36)),te=n(62),ne=n(60),ce=function(e){Object(te.a)(n,e);var t=Object(ne.a)(n);function n(e,c,a,i){return Object(d.a)(this,n),t.call(this,e,c,a,i)}return Object(h.a)(n,[{key:"getThumbnailURLs",value:function(){var e=this.source.slice(0,-5);return[e+"258s.jpg",e+"300s.jpg",e+"348s.jpg"]}}]),n}(function(){function e(t,n,c,a){Object(d.a)(this,e),this.id=t,this.type=n,this.caption=c,this.source=a}return Object(h.a)(e,[{key:"toJSON",value:function(){return ee.a.pick(this,"id","type","caption","source")}},{key:"populateFromBSON",value:function(e){var t=e.id,n=e.type,c=e.caption,a=e.source;return this.id=t,this.type=n,this.caption=c,this.source=a,this}}]),e}()),ae=(n(106),function(e,t,n,a){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(){};return Object(c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e,height:t,fill:n,className:a,onClick:i,viewBox:"0 0 16 16",children:Object(c.jsx)("path",{d:"M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"})})}),ie=[50,250,500,750,1e3],re=function(e){var t=e.media,n=e.onMediaSelection,a=e.isLiked,i=Math.floor(Math.random()*ie.length),r=ie[i];return Object(c.jsxs)("div",{className:"food-thumbnail-container transition-delay-".concat(r),children:[Object(c.jsx)("img",{className:"food-thumbnail",src:t.getThumbnailURLs()[0],onClick:function(){return n(t.id)}}),a&&ae("16","16","white","liked-media-icon")]})},oe=(n(107),n(135)),se=function(e){var t=e.color;return Object(c.jsxs)("div",{className:"search-curtain",children:[Object(c.jsx)("div",{className:"search-curtain-backdrop"}),Object(c.jsx)(oe.a,{className:"search-curtain-spinner",color:t})]})},ue=n(141),le=(n(108),n(142)),je=n(136),de=n(137),he=n(138),ge=function(e,t,n,a){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(){};return Object(c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e,height:t,fill:n,className:a,onClick:i,viewBox:"0 0 16 16",children:Object(c.jsx)("path",{d:"M8 6.236l-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"})})};function be(e){return e?'"'.concat(e,'"'):"[ No Caption ]"}function fe(e,t){var n;e.preventDefault(),n=function(e){return"https://www.google.com/maps/place/"+e.join(" ").replace(" ","+")}(t),window.open(n,"_blank").focus()}var Oe=function(e){var t=e.selected,n=e.onMediaLikeToggle,a=e.onClose,i=e.isLiked;console.log("selected:",t);var r=t.media,o=t.restaurant,s=r.source,u=r.caption,l=o.name,j=o.address,d=o.neighborhoods,h=o.categories,g=o.rating,b=function(){return n(r.id)};return Object(c.jsxs)(le.a,{isOpen:!!t,toggle:a,className:"media-modal-container",children:[Object(c.jsx)(je.a,{toggle:a,children:Object(c.jsx)("div",{className:"caption",children:be(u)})}),Object(c.jsx)(de.a,{children:Object(c.jsxs)("div",{className:"modal-info-container",children:[Object(c.jsxs)("div",{className:"modal-image-container",children:[Object(c.jsx)("img",{className:"food-media modal-image",src:s}),i?ae("32","32","white","liked-media-icon",b):ge("32","32","white","unliked-media-icon",b)]}),Object(c.jsxs)("div",{className:"restaurant-details-container",children:[l&&Object(c.jsx)("div",{className:"restaurant-name",children:l}),j&&Object(c.jsx)("a",{onClick:function(e){return fe(e,j)},className:"restaurant-address",children:j.join(" ")}),d&&Object(c.jsx)("div",{className:"restaurant-neighborhoods",children:d.join(", ")}),h&&Object(c.jsx)("div",{className:"restaurant-categories",children:h.join(", ")}),g&&Object(c.jsx)("div",{className:"restaurant-rating",children:g})]})]})}),Object(c.jsx)(he.a,{children:Object(c.jsx)(R.a,{color:"secondary",onClick:a,children:"Close"})})]})};var me=function(e){var t=e.restaurants,n=e.selectedMediaID,i=e.onMediaSelection,r=e.isLikedMedia,o=e.searching,l=e.showLiked,j=e.mediaModalProps,d=e.mediaOrder,h=e.onEntered,g=e.transitionTimeout,b=Object(a.useState)(!d),f=Object(u.a)(b,2),O=f[0],m=f[1],p=Object(a.useState)([]),x=Object(u.a)(p,2),v=x[0],w=x[1],N=Object(a.useState)(!0),k=Object(u.a)(N,2),A=k[0],y=k[1],Q=t.length?"light":"dark",I=!o&&A,S=d?function(e,t){if(!e.length)return e;var n=e.flatMap((function(e){return e.media})).reduce((function(e,t){return e[t.id]=t,e}),{});return t.map((function(e){return n[e]})).map((function(e){return(new ce).populateFromBSON(e)}))}(t,d):function(e,t,n){return t?e.filter((function(e){return n(e.id)})):e}(v,l,r);return Object(a.useEffect)((function(){d||m(I)}),[o,A]),Object(a.useEffect)((function(){O&&w(function(e){console.log("restaurants:",e);var t=e.flatMap((function(e){return e.media}));return console.log("allMedia:",t),ee.a.shuffle(t).map((function(e){return(new ce).populateFromBSON(e)}))}(t))}),[O,t]),Object(c.jsx)(ue.a,{classNames:"thumbnail-swap",in:I,appear:!0,timeout:g||2e3,onEntered:h,onExit:function(){return y(!1)},onExited:function(){m(!0),y(!0)},children:Object(c.jsxs)("div",{className:"gallery-container",children:[S.map((function(e,t){return Object(c.jsx)(re,{searching:o,media:e,onMediaSelection:i,isLiked:r(e.id)},t)})),o&&Object(c.jsx)(se,{color:Q}),n&&Object(c.jsx)(Oe,Object(s.a)({},j))]})})},pe=["JNsJSjDbHH_91HOgr9sCqA","wo-1PKMWwINpEruBqNfIiA","OjACJUFH4i2z95YTr6GSgQ","sIC6jUU6UyubnbaZABkPpw","ovBiAPKpbdwmyc211faoaw","hR32TiJU8Mj5xiVKPS9sOg","OLXglWKpO-NitEylMwCQxQ","i6WcIItMrKuc25riTVOa2w","8KFavjNsE0jNLoWKbuPnYw","D8LU7rW8ZcXcJFuQ5r5EwQ","0MWnjl5XGnV4xBHCfFolHA","B5s2mWw0uJHNp7nc05_5KQ","AcDV9qosxkG4F5053_Ozxw","naIBxTISC8Uk7LxT6JwMZw","RvY295n0LZJibhykdV6WKQ","45KqZOXPwaa5C-wUt0GCZw","Cy7bxhH5pi-7gbx-R6xBGg","RImsui5ffpABZK5E44RB6g","o7GLF55dSQa6wl1mdbNS_Q","2_8haA6LztxN2_ogne931g","MQfHzPOrDdTuvi2vRp0Jgg","NH62518Xp90Ag4sSSrlLew","Aig8NfT8y3n7RonTEU6R7g","4lyvug7N5is0tlt8DjdwdA","-ph6ERHAOUGpSjj-5ezB3w","BHX43-5b1GsqL5QTcUyUWA","clscwgOF9_Ecq-Rwsq7jyQ","9ImrGJAQShKpXYR3XHor9Q","tZ6zE8xRjJU14XoCvN69MA","PFbKEyhlyJIuGZxhqSYlKw","lXecmyyxcrZ_ikvmMZuIJQ","UbLCIVs44kMrn-gohcayPA","kdu-OQK_5o2s2vZZK0Hm8A","lX4tl9QhM0uibrKtGKaKrQ","8Xsu2-QtcqrfNFM9zjEDvg","vCKELKLC9LhdOHrct-g5vw","D-5Td9XsLCekgq3joM6JFw","jplZpyYsst7iMuNs8v6YYw","5fADHJFD-B6RTfDDTp5NCg","L82MR10Nq8MIXmB4UOsEmw","kDX7cOkf3n34he2RB-d1eg","j6Hoc_YpJJapUUzfd9pj8A","e6-wcjGC3l6mfDiUajmJSQ","rLLQ3hoJuV85AcYefCF70A","Fwxy9LPkKU3fDhypYlevtw","H31x1q8-iLFOKIRNdwyBow","Uwu-RxcqVD7y86WeEagmMg","4HgjE1WxnRcMH1pT48HQCg","yMEtHWpKYf2uKQg9RD-oRA","5UYmKinQN08dvY7nh53qUw","qzrLMUmERPzG5RZKNvpGmQ","xcqOeQeP-H81cBvdpYU79A","pFuYCC-Ku1aRxkFfhCuUoQ","Ve4NvCiHBzHXzHdMVLoB5A","rJACyS33y3DJjrGqNltOGA","yxkJzN_-yPoXgx9p2FUk1g","Xt3BMLOZ7UxbbBGDAjGeWw","C3JP2BzCnoH7dTCg7P_v3A","pz3VgZc7pjEseCn14IBSwA","p9efKzd_XlOT33FKjGkPvA","Mz8N4ggsttTNdvXBxJgr5A","UR6lKY9PaWj1MvIIuMuFsA","QItGxOxkzFcqffTPxOqHiQ","Ic7CbsC9rEVt5WAMzyLmjg","vJDupyCGamWh_langjIeCA","2tiJtevOs04KrOavcwlfgw","Igu73RMmDbK9FSxXURNRnA","PfoqacfguTrChnllOdhviA","xbZwukayFmDsSTq63zcxoA","uMZiwJW9Seie0qSweM7afA","w72XS1-aeaaW55xLPfpcMQ","UkcIOtVlql4t0fzvrA18yw","3ggCaHyfXBxfmjiWNK7INg","y-HgqTSKSPrnc4NvKTn7ug","jYhk78GEe3SWkCgLsXf4zA","O2ph1erEoN9AgOyEYiTn5g","daVm5y6lvydIXm8J0yeahQ","MXbcxwMw7WE7oEvLy06D3Q","iVIYrErB2c7lYaVeVY8PhQ","7ydOP9KWUZfjkG6PduP-6Q","W3WU8nLIJP9oComniVw4dQ","l_PKFtmRq5IrCb0_EDz2Mw","Rq6-DNHA1tq8ZnPMr3acPw","tbFfqvnbx_c4ti5hHi1SlQ","9rDurcWzj3mfXAxwjd77aA","DfUtbYYx6IZU3LzruOpQzQ","NrPQePur6gAyhu__z3sw3A","wlwyeZrOiSvxGGqaMcUITQ","0LNNUofcpOqaCNUCo-SaCw","veRMosxRuW4lGQeUbJJLFw","oM_2_du4oQf2sYiTsZspMg","XMZiAVCf0miasVcL5LvDSQ","pSL2DXLI6fqhLn8ISChjNA","V1whpgh_FFE3L27M9l-GWw","i1pZRFkEscwirTv28fXCgA","W_VFwCIhcAfD0GSIHggIRA","hly8cAfSwbj2x8n9G69pBg","3cR5LDisK0H3sci1qJ6H2w","wvsrArhDz_tmlR4zKkiu_Q","vOe8cjWK-kqDEf4a41qaCQ","4AiSsxe_qPlKhIN5RqhwlA","WHV0UBdhxcnu-l2GXed-IA","GiYuDZwjlSpM2IKu5HywNw","kp2qg5xCXazJI0Pnr0hrjA","OiRqQiw8BiQdwMFd9O3KUQ","hAmD1yFoHRc-I49T0JGVBw","8q5NtSUU6BfnAGbfueMVAw","0K9ICfofQeHuwzkip9-JcQ","0CxtRC4BfPobAfvBBLJH3g","Q1Nxm3LddoBmeBS3gp0bBA","sYVGp3t9SDlDgNme_1hKlA","gvefxJdh10SD40wbaIXAlA","LnARDrSUBIseN0ekqfhOkg","lO7qqJ3RReqWVtowQbgBHQ","0CKvm7jcENINXJc662o8mg","BQoK-TGb42fIoKTgZTmljQ","ENh0J-5YsJrRmymhnbuNDw","LlXWcYU5JlXRk7vYnKv1Ug","QUBBhio9ex9hGk8tQbaiGg","l69WViivrod87JNIbwuijw","dpLRH4yJSga1CYNqnl0-JQ","4dfe9qpe20P-vi3qFjWd4Q","fU2YVTzW1DnbJmMLJF0LqA","zYO7EXV_zvAKTuzpp6VCLw","m9Kk0RIZ7ik2gVZQxHwpKQ","R732FIRT1t8VTnsI8WBARA","3yeb0hektZBFwFQv_PCETQ","N2ZXh-mYh2OC18LVKOxYYg","uOuGHPJAibqiQo62UBAfiA","oB9CFo5mAZLjdN7-wdJM0A","0RUqVbsW5TSY4WQSPS4qaw","6_Ky3Pki7y4Z1OyjkvB4WQ","RAzDqVJnHpdon3fMRLXpJg","WzmcXvY8QONETe2ILIfvJA","ZxN4O-5pfIEE8__bRgq-ig","ctlIbv1YFhZzBUFgFlX16A","fh1uMBN8LYgRoJFE7-oQcQ","xUvlRWX_S8cGH9E9I3BtnA","fDVIjn_eyS0OH1ZPOIZiig","LNdSDlKQ0mxCCglKhpbM6w","md2VoTKoJDXAS1WqNhrSvA","QBDdF7OfR-Z0QrLBlCaKEQ","CBRXLSSG1izVdsN3wAQ8hg","auXDK3AgFZtsMK7S-boxiw","Y_uF4SEFltMXvIk6-EBhEA","qxjhi4aP3a9jYxcodsobgQ","NhqShORuY93bfjlWmkMNLg","ka6kFgDuyc48U8v3FZOf9g","Abo2xRkekn_DCiH5S0kaug","sU5Ei5QUUq6pxi1q512ArQ","iv9OCAmr8fVZ0Lfb3aETpg","qEJE7VBVBuSIuLaRUrvXFw","xRmiDmKYUutyGpiQJeNUNQ","fNsTswXTDbXKDaiL6EkKOQ","809WbuKqCiRAus0HhIC4xw","f0VuSjzCCLuLvl8VBuH8Ug","4zMaZBjZe5dNeCK3MgUY6A","9iMwXe02bT0gMlR7Wh7WUg","1n5xL5ojLR-_zseirQKaMw","vHEkgNTs2to038asQacioQ","Efl8ZtfINJ2kfQnz-XKArA","weti_fkdKwIVJoSF1bhWxQ","H7TB8AasxAAyGy8w2H2QUQ","3N2RJCtXNMtajAMlg__n1Q","UHyL-_GQ8X2V4Bpa7QLtWA","EDQx9Y5xkEf_8KUrWBJl3A","vgWdpAeaGqmFHM9L8tGtgQ","OCDZ4nXoaMHF0TraV0u2-g","hCokJLK3nSe79v3QBw350Q","ENeutQE66vkGKejCpK5YBQ","ug7Di7n7fwJtWCxXjAdJUA","vicWtlir2PmDErr7CPOn5g","M0pfb3y4P0nS5ITDlyYMAg","FfWr6_7wWK5Rh-L7O0ePZw","9wIuw-B6xrx3u5qUnjFqGQ","czwJ0-FBu8YawAlNjIlgAg","q7lprjX7HWWMMVmPZRumSw","lZPG59I1NAYFhAWsVbkykQ","LylkQiPOsKpHMsWsq5edtQ","e_324r-CPTCkBdy4xiaBOg","J4YQVCLQgrSFgKi7w4VC3w","k8xE8euAPO1IL0Jb2rUj3g","n2jkSNSPzaB5vtmvV96o4Q","SBzbmYOLWPGoIumSMhZ5cg","QYvr7o9MOVM4Pp25VDoX1A","sgTGLoIUgFMiRLHYSsaXTQ","B6y1kB7mWwV57vt720pPNg","tO_tQGw_f-QADv18bRj_tg","edK79Gb2DWwmNpcLr0bxgw","bSWbtKskAFSeiwBPQptANw","pJsI1Qn0KfNIJ3vJSo86Hg","mE31lNBhWgzBiogfD8wKKQ","E34Z5j5bD1lTRP9AggXKGw","Ielsk99frSq8ZgZtWmMV7Q","WiTOJZ9KhmZzTxImIzd8MA","6ktAcIBQq1kwQltlhIMF_Q","yKPqCs-qmlytm7S_1-v7ew","ApY7RxKF9GBUq5UBIR9oWg","aWUuDpjA_JK-m43WNLuiXg","6OIKrzLFTI-Wuc2pUq6UKQ","338rqVgi-EbZ0w6aOVaSMA","JXlvk5l-rBGgAd6jzgJq3A","UZUHWiG-ri4zIA3g5H-0hA","2Y2W9ODseGfJjMh1oAYwRw","04jG97Xp_lxgw3TzuRfqfA","kK9DQORFANn4siKSCWh7Dg","vSsJhO83ya0NKSJR_d2yEg","f84TV7bJ4TTaaO-ukN3beg","K-5oYvnlJIEwS3OscBPleQ","m1u4oDvuvEquRl4VZS99LA","xtBIEG8LasWJiciMvg9PqQ","N_pno3f44vvEKW7I8H8zJw","e_B8N0hFtCDRW-B9HYjZnQ","KX7hm2M5rGPumF9m4Rhe-w","W8FpY4J5ULzy8ynmN_w87A","rrhqw_KxQjk_Mgpcj8EZ8g","UUwv9s2CpVGhb45N2TcDCQ","NxRz73F29G6VhnnUSppXAw","Lr8q4jsPIf8Ec07dTftIDQ","U-2TJrLqdjg_6lTaKjQuDg","NDtp_YDFFzZy2bzf0uqMvA","OixGjexLhvMNCqslLcqpNw","nrcnymth7MNbjT36A_44sA","e2LGP3Raq7CnjkDU4QOjqg","EXIUlEfVuo8loO3lbciaEg","spAc-3AsXOVoQfP9gKBf4Q","ZkIU1VjyzFIn851iQQne8g","xtoTj3dB1z350vXDTyyylA","vUpNGgs14HleRcxlnlHb8w","5KRLy3Ffxx3plt4B4DgtqQ","QGOhDg47ELjOMfZZjcyfVA","w0taZk-vWDHYeia1bwdbdw","JdcCGJnQrWGbUgZN_1nwyQ","N1AnP4jD0A_v9NGHGaPA3g","aUKSp0O5oTLgsh47QyJ57g","_gYb3ud0t2qLcSZm01uw4g","5nMa2Q9wgXV93QSO7YF-bQ","yWtsQoI8ZMTNc69ZhWjf9Q","Q5DN9FyxcWfEQO8QiEnmDg","QgrEW-SMfez8OkMHlgg-Rw","VmEwVKxLt3VCL8hv6NPe6w","PG60HdnabTmn9b8UwpCXNw","KlSOY2HZNmBuulymoiXs_w","oaRdhGb7N2m6IkNqq-ncHA","W_Vq8-FqV49FdcU6RQ3viA","BIqND02sEnJNYfDxGo2YTQ","d75CAtSihlDlemmLVEy6qQ","D7m9dIhimYGLW7tR1k-hfw","B3eNfBS1DTkTZ6fasVL01A","h7XOvZN1JCdqJc02w31JyQ","y_XsYXPT-6kT3H7yr0UerA","eSN1CksnpTEp06RZ1I42lQ","wDoXSPITi4x50QZLjctX6w","L6lAx2lB9YQ08svNnAZjDA","gUWF6nllXvGUkHZeeS8tPQ","ZpgQiL05GC34I3AO4tj73A","vJvdTsk01tV1TVk-1QmrHA","cVTbsWuqEHEohKZcsyZnQQ","sa08ZzkTVO5hUAkFZEL7pg","tmZD5rQmlkrwzw3RYnUCVg","TSJiOmlubv2R1pv5mI4dGQ","6qyvj8i4aKF5rWjgsIx3rg","48doX4sxCRLxOl8a6AD35Q","HCFv8Wvv2FVM-rKCoAPNPg","z6_uI5oEm0T-BBnko0dqhQ","vuuvzo1r_pJ_qebiJvTW1A","lM0Xlh3wB8Wmx1Kg-KtnNg","iqytnpOnd5kFJsDkbXzOfg","lCJZ6KsMSXkV-PH1K1mgFA","ZMgLNoF3r4Dg1bAFKr7CfQ","cyGjVI-jk5DZAqyW0ge-Hw","6H1cEJT1U-jWh43-d7cB1Q","Uh1nGIHlHK_xwb1GHwlVpg","6PPnf5H2z2Z_30IF5wAF3g","V8grVFq6Lnzc5jJKuDAFAQ","xRNPKIfF2Gr02zBiBl3dSA","v3F-pk2-1RZ_P_WFtAbmdA","1v1N3C8_yrzDlHIrfSeUYg","L4nXb6_5NR7yMO__KyID_A","nltCMgItjXLrBCoVRsiVlQ","HzFpRjIo39Ywrht51n_Yuw","1FAsc4oIzF5O0H7Fr_WiCA","3uOja3d1pnogIuVCNOzAdw","TCXfmnrFjLSKcBdiWd-q4Q","qbIajNWouEP5U1HxY5I0yA","QOzWXDCkg9hvplsM6NPLQQ","HLLrQD3X30jEWd0dA5QwBw","e8m5L5Z7e9Q3x8Tn7Y6EVA","RvZt5Ar5uzFJfJgqo821lQ","NGuzAKvDcB1agIn7rEBi4A","IpSPUvkcsPy8E4TmvjY4HQ","VPegpBDKXuuNf7Oi-UsmHw","8fY9fA5TtCF0ebdTNph9mQ","qS-fQBZcEMKqgPI0CM1B2w","lP9ZT1q3TjeMmm-4N68vEw","9IjZp2EhoUQzeMMDyCJdrg","w1THUZhsnLEpUbaQ-XAfnA","kiJtk3Gn5J272vXgsfS-xQ","PAgOf4yyRFZR9Lc2gl5X_g","6KJ1a882332ckXcS1-dAbg"],xe=function(e){var t=Object(a.useState)(!1),n=Object(u.a)(t,2),i=n[0],r=n[1];return Object(c.jsxs)("div",{className:"home-page-container",children:[Object(c.jsxs)("div",{className:"home-page-text-container"+(i?" show":""),children:[Object(c.jsx)("h1",{className:"home-page-text home-page-company-name",children:"Gourmand"}),Object(c.jsx)("h3",{className:"home-page-text home-page-slogan",children:"Find food.  Fast."})]}),Object(c.jsx)(me,Object(s.a)(Object(s.a)({},e),{},{mediaOrder:pe,onEntered:function(){return r(!0)},transitionTimeout:50}))]})},ve=(n(109),function(e){var t=e.error;return Object(c.jsxs)("div",{className:"error-message-container",children:[Object(c.jsx)("div",{className:"error-apology",children:"Oops, something went sour."}),Object(c.jsxs)("div",{className:"error-message",children:['"',t.message,'"']})]})}),we=function(e){var t=e.error,n=e.restaurants,a=e.selectedMediaID,i=e.onMediaSelection,r=e.isLikedMedia,o=e.searching,s=e.showLiked,u=e.mediaModalProps;return t?Object(c.jsx)(ve,{error:t}):Object(c.jsx)(me,{restaurants:n,selectedMediaID:a,onMediaSelection:i,isLikedMedia:r,searching:o,showLiked:s,mediaModalProps:u})},Ne=n(35),ke=(n(110),function(e){return Object(Ne.a)(e),Object(c.jsx)("div",{className:"about-container",style:{backgroundImage:"url(/about-background.jpg)"},children:Object(c.jsxs)("div",{className:"text-container",children:[Object(c.jsxs)("p",{children:[Object(c.jsx)("span",{className:"company-name",children:"Gourmand"})," is for people who absolutely love food.  Those who always search for new restaurants, dishes, and neighborhoods to try."]}),Object(c.jsx)("p",{children:"The problem is that whittling down reviews to find good places is difficult and time consuming.  Information about restaurants is fractured into many different platforms.  Who has time to conduct a research project whenever they get a little hungry?"}),Object(c.jsxs)("p",{children:["At ",Object(c.jsx)("span",{className:"company-name",children:"Gourmand"}),", we believe the food should speak for itself.  The rest will follow."]}),Object(c.jsx)("p",{children:"Salud!"})]})})}),Ae=(n(111),n(140)),ye=n(139),Qe=function(e){var t=e.name,n=e.email,a=e.subject,i=e.message,r=e.setName,o=e.setEmail,s=e.setSubject,u=e.setMessage,l=e.onSubmitButtonClick;return Object(c.jsxs)(ye.a,{className:"contact-form",children:[Object(c.jsx)(W.a,{children:Object(c.jsx)(K.a,{required:!0,type:"text",name:"name",placeholder:"Name",value:t,onChange:function(e){return r(e.target.value)}})}),Object(c.jsx)(W.a,{children:Object(c.jsx)(K.a,{required:!0,type:"email",name:"email",placeholder:"Email",value:n,onChange:function(e){return o(e.target.value)}})}),Object(c.jsx)(W.a,{children:Object(c.jsx)(K.a,{type:"text",name:"subject",placeholder:"Subject",value:a,onChange:function(e){return s(e.target.value)}})}),Object(c.jsx)(W.a,{children:Object(c.jsx)(K.a,{required:!0,type:"textarea",name:"message",placeholder:"Your Message",value:i,onChange:function(e){return u(e.target.value)}})}),Object(c.jsx)(R.a,{onClick:l,color:"secondary",children:"Submit"})]})},Ie=function(){window.scroll({top:0,left:0,behavior:"smooth"})},Se="",Le="success",De=function(e,t,n){var c=t.name,a=t.email,i=t.subject,r=t.message,o=n.onSuccess,s=n.onError;e.preventDefault(),function(e,t,n){fetch("/contact",{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){e.status===Le?t(e):n(e,e)})).catch(n)}({name:c,email:a,subject:i||"[ No Subject ]",message:r},o,s)},Ce=function(){return Object(c.jsxs)(i.a.Fragment,{children:[Object(c.jsx)("h1",{className:"contact-header",children:"Say Hello!"}),Object(c.jsx)("p",{className:"contact-text",children:"Found a bug?  Have a feature request?  Just want to vent?  Let us know!"})]})},Be=function(){return Object(c.jsxs)(i.a.Fragment,{children:[Object(c.jsx)("h1",{className:"contact-header",children:"Message Received!"}),Object(c.jsx)("p",{className:"contact-text",children:"Thanks for reaching out!  We'll get back to you as soon as we can."})]})},Me=function(){return Object(c.jsxs)(i.a.Fragment,{children:[Object(c.jsx)("h1",{className:"contact-header",children:"Uh oh!"}),Object(c.jsx)("p",{className:"contact-text",children:"Looks like something went wrong.  Our team has been notified and we're working on the issue."})]})},qe=function(e){return e===Se?Object(c.jsx)(Ce,{}):e===Le?Object(c.jsx)(Be,{}):Object(c.jsx)(Me,{})},Ke=function(){var e=Object(a.useState)(""),t=Object(u.a)(e,2),n=t[0],i=t[1],r=Object(a.useState)(""),o=Object(u.a)(r,2),l=o[0],j=o[1],d=Object(a.useState)(""),h=Object(u.a)(d,2),g=h[0],b=h[1],f=Object(a.useState)(""),O=Object(u.a)(f,2),m=O[0],p=O[1],x=Object(a.useState)(""),v=Object(u.a)(x,2),w=v[0],N=v[1];Object(a.useEffect)((function(){w!==Se&&(i(""),j(""),b(""),p(""))}),[w]);var k={name:n,email:l,subject:g,message:m,setName:i,setEmail:j,setSubject:b,setMessage:p,onSubmitButtonClick:function(e){return De(e,{name:n,email:l,subject:g,message:m},{onSuccess:function(e){return function(e,t){t(e.status),Ie()}(e,N)},onError:function(e,t){return function(e,t,n){console.error(e),n(t.status),Ie()}(e,t,N)}})}};return Object(c.jsxs)("div",{className:"contact-container",children:[Object(c.jsx)("div",{className:"contact-background",style:{backgroundImage:"url(/contact-background.jpg)"}}),Object(c.jsxs)(Ae.a,{className:"contact-content-container",children:[Object(c.jsx)("div",{className:"text-container",children:qe(w)}),w===Se&&Object(c.jsx)(Qe,Object(s.a)({},k))]})]})},Re=(n(112),function(e){return Object(Ne.a)(e),Object(c.jsx)("div",{className:"login-container",style:{backgroundImage:"url(/login-background.jpg)"},children:Object(c.jsxs)("div",{className:"text-container",children:[Object(c.jsx)("h3",{className:"login-text login-header",children:"We're sorry.  User accounts aren't available yet."}),Object(c.jsx)("h6",{className:"login-text",children:"But you can be sure that, like a good bar, that feature is just around the corner.  \ud83e\udd42  "})]})})}),Ue=j,Ee=new b,Fe=(new x).get(window.localStorage),Je=new w(function(e){try{return e.get("likedMedia")}catch(t){window.console.debug(t)}}(Fe),Fe);function We(e){return e&&Je.isLiked(Ee.getRestaurantIDByMediaID(e),e)}function Te(e,t){var n=e.description,c=e.location,a=e.distance;if(console.log("updateSearchURL()"),console.log("description:",n),console.log("location:",c),console.log("distance:",a),c){var i=y("/search",{description:n,location:c,distance:a});return console.log("url:",i),t.push(i)}}function Pe(e,t){return{media:t.getMediaByID(e),restaurant:t.getRestaurantByID(t.getRestaurantIDByMediaID(e))}}function He(e){if(e.ok)return e;throw new Error(e.statusText)}function Ve(e){if(e.some((function(e){return e.mediaCount>0})))return e;throw new Error("Nothing to see here.")}function Ze(e){return fetch(e).then(He).then((function(e){return e.text()})).then((function(e){return JSON.parse(e)})).then(Ve)}function Ge(e,t){window.console.error(e),t(e)}var Xe=function(){var e=Object(a.useState)(""),t=Object(u.a)(e,2),n=t[0],i=(t[1],Object(a.useState)([])),r=Object(u.a)(i,2),o=r[0],j=r[1],d=Object(a.useState)(""),h=Object(u.a)(d,2),g=h[0],b=h[1],f=Object(a.useState)(""),O=Object(u.a)(f,2),m=O[0],p=O[1],x=Object(a.useState)(!1),v=Object(u.a)(x,2),w=v[0],N=v[1],k=Object(a.useState)(""),A=Object(u.a)(k,2),y=A[0],Q=A[1],I=Object(a.useState)({}),S=Object(u.a)(I,2),L=(S[0],S[1]),D=Object(a.useState)(!1),C=Object(u.a)(D,2),B=C[0],M=C[1],q=Object(a.useState)(null),K=Object(u.a)(q,2),R=K[0],U=K[1],E=Object(a.useState)(Ue.UNKNOWN),F=Object(u.a)(E,2),J=F[0],W=F[1],T=Object(a.useState)(!1),P=Object(u.a)(T,2),H=P[0],V=P[1],Z=Object(l.f)(),G=Object(l.g)();Object(a.useEffect)((function(){G.search?(console.log("Making request:",n),U(null),M(!0),Ze(n).then((function(e){Ee.update(e),console.log("lookup:",Ee),j(e),M(!1),Ie()})).catch((function(e){return Ge(e,U)}))):"/"===G.pathname&&Ze("./home-page-restaurants.json").then((function(e){Ee.update(e),j(e)})).catch((function(e){return Ge(e,U)}))}),[G]),Object(a.useEffect)((function(){Te({description:g,location:m,distance:J},Z)}),[J]);var X={description:g,setDescription:b,location:m,setLocation:p,requestingLocation:w,setRequestingLocation:N,setShowLiked:V,distance:J,setDistance:W,onSearchRequest:function(){return Te({description:g,location:m,distance:J},Z)}},z={selected:Pe(y,Ee),onMediaLikeToggle:function(e){return function(e,t){Je.toggle(Ee.getRestaurantIDByMediaID(e),e),t(Je.getAll())}(e,L)},onClose:function(){return Q("")},isLiked:We(y)},_={restaurants:o,isLikedMedia:We,searching:B,showLiked:H,selectedMediaID:y,onMediaSelection:Q},Y=Object(s.a)({error:R},_);return Object(c.jsxs)("div",{className:"app",children:[Object(c.jsx)($,Object(s.a)({},X)),Object(c.jsxs)(l.c,{children:[Object(c.jsx)(l.a,{exact:!0,path:"/",children:Object(c.jsx)(xe,Object(s.a)(Object(s.a)({},_),{},{mediaModalProps:z}))}),Object(c.jsx)(l.a,{path:"/search",children:Object(c.jsx)(we,Object(s.a)(Object(s.a)({},Y),{},{mediaModalProps:z}))}),Object(c.jsx)(l.a,{path:"/about",children:Object(c.jsx)(ke,{})}),Object(c.jsx)(l.a,{path:"/contact",children:Object(c.jsx)(Ke,{})}),Object(c.jsx)(l.a,{path:"/login",children:Object(c.jsx)(Re,{})})]})]})},ze=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,146)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),i(e),r(e)}))},_e=n(40);o.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(_e.a,{children:Object(c.jsx)(Xe,{})})}),document.getElementById("root")),ze()},70:function(e,t,n){},71:function(e,t,n){},72:function(e,t,n){},73:function(e,t,n){},74:function(e,t,n){},77:function(e,t,n){},78:function(e,t,n){}},[[118,1,2]]]);
//# sourceMappingURL=main.f1c4d9a6.chunk.js.map