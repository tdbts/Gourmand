(this.webpackJsonpgourmand=this.webpackJsonpgourmand||[]).push([[0],{36:function(e,t,n){},37:function(e,t,n){},48:function(e,t,n){"use strict";n.r(t);var c=n(3),a=n(1),r=n.n(a),i=n(13),o=n.n(i),s=(n(35),n(36),n(9)),u=(n.p,n(37),n(55)),l=n(56),d=n(57),j=n(58),h=n(59),f=n(60),b=n(61),g=n(52),O=n(68),m=n(53),v=n(54),p=n(50),x=n(51);var y=function(e){var t=e.requestLocation;return Object(c.jsx)(p.a,{className:"suggestions-list-group",onMouseDown:function(e){return e.preventDefault()},children:Object(c.jsx)(x.a,{tag:"button",onClick:t,action:!0,children:Object(c.jsxs)("div",{className:"current-location-container",children:[Object(c.jsx)("img",{className:"current-location-icon",src:"cursor-fill.svg"}),Object(c.jsx)("span",{children:"Current Location"})]})})})};var k=function(e){var t=e.onSearchRequest,n=Object(a.useState)(""),r=Object(s.a)(n,2),i=r[0],o=r[1],u=Object(a.useState)(!1),l=Object(s.a)(u,2),d=l[0],j=l[1],h=Object(a.useState)(""),f=Object(s.a)(h,2),b=f[0],p=f[1],x=Object(a.useState)(!1),k=Object(s.a)(x,2),N=k[0],w=k[1],I=function(){return w(!1)};return Object(c.jsxs)("form",{className:"search-form",onSubmit:function(e){return function(e,t){e.preventDefault(),console.log("onSubmit()"),console.log("e:",e);var n=Object(s.a)(e.target,2),c=n[0],a=n[1];t(c.value,a.value)}(e,t)},children:[Object(c.jsx)("div",{className:"input-group-container",children:Object(c.jsxs)(g.a,{children:[Object(c.jsx)(O.a,{addonType:"prepend",children:Object(c.jsx)("img",{className:"input-icon query-icon",src:"magnifying-glass.svg"})}),Object(c.jsx)(m.a,{className:"search-input",type:"text",value:i,onChange:function(e){o(e.target.value)},placeholder:"e.g. Pizza"})]})}),Object(c.jsxs)("div",{className:"input-group-container",children:[Object(c.jsxs)(g.a,{children:[Object(c.jsx)(O.a,{addonType:"prepend",children:Object(c.jsx)("img",{className:"input-icon location-icon ".concat(d?"rotate":""),src:function(e){return e?"spinner.png":"target.svg"}(d)})}),Object(c.jsx)(m.a,{className:"search-input",type:"text",value:b,onChange:function(e){p(e.target.value)},onClick:function(){return w((function(e){return!e}))},onBlur:I,placeholder:"e.g. Brooklyn, NY 11237"})]}),N&&Object(c.jsx)(y,{requestLocation:function(e){e.preventDefault(),console.log("Requesting location."),j(!0),I(),navigator.geolocation.getCurrentPosition((function(e){var t=e.coords,n=t.latitude,c=t.longitude;j(!1),p("".concat(n.toPrecision(7),", ").concat(c.toPrecision(7)))}),(function(e){j(!1),console.error(e)}))}})]}),Object(c.jsx)(v.a,{className:"search-submit-button hidden-submit",type:"submit"})]})};var N=function(e){var t=e.onSearchRequest,n=Object(a.useState)(!1),r=Object(s.a)(n,2),i=r[0],o=r[1];return Object(c.jsxs)(u.a,{className:"header-navbar",color:"light",light:!0,expand:"md",children:[Object(c.jsx)(l.a,{href:"/",children:"Gourmand"}),Object(c.jsx)(d.a,{onClick:function(){return o(!i)}}),Object(c.jsx)(j.a,{className:"header-collapse",in:!0,isOpen:i,timeout:200,navbar:!0,children:Object(c.jsxs)(h.a,{className:"header-nav",navbar:!0,children:[Object(c.jsx)(f.a,{children:Object(c.jsx)(b.a,{href:"#",children:"About"})}),Object(c.jsx)(f.a,{children:Object(c.jsx)(b.a,{href:"#",children:"Contact"})}),Object(c.jsx)(f.a,{children:Object(c.jsx)(b.a,{href:"#",children:"Log In"})}),Object(c.jsx)(f.a,{children:Object(c.jsx)(k,{onSearchRequest:t})})]})})]})},w=n(20),I=n(11),S=n(12),D=n(28),M=n(26),C=function(e){Object(D.a)(n,e);var t=Object(M.a)(n);function n(e,c,a,r){return Object(I.a)(this,n),t.call(this,e,c,a,r)}return Object(S.a)(n,[{key:"getThumbnailURLs",value:function(){var e=this.source.slice(0,-5);return[e+"258s.jpg",e+"300s.jpg",e+"348s.jpg"]}}]),n}(function(){function e(t,n,c,a){Object(I.a)(this,e),this.id=t,this.type=n,this.caption=c,this.source=a}return Object(S.a)(e,[{key:"toJSON",value:function(){return w.a.pick(this,"id","type","caption","source")}},{key:"populateFromBSON",value:function(e){var t=e.id,n=e.type,c=e.caption,a=e.source;return this.id=t,this.type=n,this.caption=c,this.source=a,this}}]),e}()),B=function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){};return Object(c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e,height:t,fill:n,className:"liked-media-icon",onClick:a,viewBox:"0 0 16 16",children:Object(c.jsx)("path",{d:"M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"})})},L=[50,250,500,750,1e3],R=function(e){var t=e.media,n=e.onMediaSelection,a=e.isLiked,r=(e.searching,Math.floor(Math.random()*L.length)),i=L[r];return Object(c.jsxs)("div",{className:"food-thumbnail-container transition-delay-".concat(i),children:[Object(c.jsx)("img",{className:"food-thumbnail",src:t.getThumbnailURLs()[0],onClick:function(){return n(t.id)}}),a&&B("16","16","white")]})},q=n(62),T=function(e){var t=e.color;return Object(c.jsxs)("div",{className:"search-curtain",children:[Object(c.jsx)("div",{className:"search-curtain-backdrop"}),Object(c.jsx)(q.a,{className:"search-curtain-spinner",color:t})]})},z=n(66);var E=function(e){var t=e.restaurants,n=e.onMediaSelection,r=e.isLikedMedia,i=e.searching,o=Object(a.useState)(!0),u=Object(s.a)(o,2),l=u[0],d=u[1],j=Object(a.useState)([]),h=Object(s.a)(j,2),f=h[0],b=h[1],g=Object(a.useState)(!0),O=Object(s.a)(g,2),m=O[0],v=O[1],p=t.length?"light":"dark",x=!i&&m;return Object(a.useEffect)((function(){d(x)}),[i,m]),Object(a.useEffect)((function(){l&&b(function(e){console.log("restaurants:",e);var t=e.flatMap((function(e){return e.media}));return console.log("allMedia:",t),w.a.shuffle(t).map((function(e){return(new C).populateFromBSON(e)}))}(t))}),[l]),Object(c.jsx)(z.a,{classNames:"thumbnail-swap",in:x,appear:!0,timeout:2e3,onExit:function(){return v(!1)},onExited:function(){d(!0),v(!0)},children:Object(c.jsxs)("div",{className:"gallery-container",children:[f.map((function(e,t){return Object(c.jsx)(R,{searching:i,media:e,onMediaSelection:n,isLiked:r(e.id)})})),i&&Object(c.jsx)(T,{color:p})]})})},F=function(e){var t=e.error;return Object(c.jsxs)("div",{className:"error-message-container",children:[Object(c.jsx)("div",{className:"error-apology",children:"Oops, something went sour."}),Object(c.jsxs)("div",{className:"error-message",children:['"',t.message,'"']})]})},P=n(67),A=n(63),J=n(64),U=n(65),G=function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){};return Object(c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e,height:t,fill:n,className:"unliked-media-icon",onClick:a,viewBox:"0 0 16 16",children:Object(c.jsx)("path",{d:"M8 6.236l-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"})})};function Y(e){return e?'"'.concat(e,'"'):"[ No Caption ]"}function _(e,t){var n;e.preventDefault(),n=function(e){return"https://www.google.com/maps/place/"+e.join(" ").replace(" ","+")}(t),window.open(n,"_blank").focus()}var H=function(e){var t=e.selected,n=e.onMediaLikeToggle,a=e.onClose,r=e.isLiked;console.log("selected:",t);var i=t.media,o=t.restaurant,s=i.source,u=i.caption,l=o.name,d=o.address,j=o.neighborhoods,h=o.categories,f=o.rating,b=function(){return n(i.id)};return Object(c.jsxs)(P.a,{isOpen:!!t,toggle:a,className:"media-modal-container",children:[Object(c.jsx)(A.a,{toggle:a,children:Object(c.jsx)("div",{className:"caption",children:Y(u)})}),Object(c.jsx)(J.a,{children:Object(c.jsxs)("div",{className:"modal-info-container",children:[Object(c.jsxs)("div",{className:"modal-image-container",children:[Object(c.jsx)("img",{className:"food-media modal-image",src:s}),r?B("32","32","white",b):G("32","32","white",b)]}),Object(c.jsxs)("div",{className:"restaurant-details-container",children:[l&&Object(c.jsx)("div",{className:"restaurant-name",children:l}),d&&Object(c.jsx)("a",{onClick:function(e){return _(e,d)},className:"restaurant-address",children:d.join(" ")}),j&&Object(c.jsx)("div",{className:"restaurant-neighborhoods",children:j.join(", ")}),h&&Object(c.jsx)("div",{className:"restaurant-categories",children:h.join(", ")}),f&&Object(c.jsx)("div",{className:"restaurant-rating",children:f})]})]})}),Object(c.jsx)(U.a,{children:Object(c.jsx)(v.a,{color:"secondary",onClick:a,children:"Close"})})]})},K=n(17),Q={restaurantsByID:{},mediaByID:{},restaurantIDsByMediaID:{}},V=function(){function e(){Object(I.a)(this,e)}return Object(S.a)(e,[{key:"update",value:function(e){!function(e,t){e.restaurantsByID=W(e.restaurantsByID,function(e){return e.reduce((function(e,t){return e[t.id]=t,e}),{})}(t)),e.mediaByID=W(e.mediaByID,function(e){return e.flatMap((function(e){return e.media})).reduce((function(e,t){return e[t.id]=t,e}),{})}(t)),e.restaurantIDsByMediaID=W(e.restaurantIDsByMediaID,function(e){return e.reduce((function(e,t){return W(e,function(e){return e.media.reduce((function(t,n){return t[n.id]=e.id,t}),{})}(t))}),{})}(t))}(Q,e)}},{key:"getMediaByID",value:function(e){return Q.mediaByID[e]}},{key:"getRestaurantByID",value:function(e){return Q.restaurantsByID[e]}},{key:"getRestaurantIDByMediaID",value:function(e){return Q.restaurantIDsByMediaID[e]}}]),e}();function W(e,t){return Object(K.a)(Object(K.a)({},e),t)}var X=function(){function e(t){Object(I.a)(this,e),this.storage=t}return Object(S.a)(e,[{key:"get",value:function(e){var t=this;return Z((function(){return t.storage.getItem(e)}))}},{key:"set",value:function(e,t){var n=this;return Z((function(){return n.storage.setItem(e,t)}))}},{key:"remove",value:function(e){var t=this;return Z((function(){return t.storage.removeItem(e)}))}},{key:"removeAll",value:function(){var e=this;return Z((function(){return e.storage.clear()}))}}]),e}();function Z(e){try{return e()}catch(t){window.console.debug("Storage Exception:",t)}}var $=function(){function e(){Object(I.a)(this,e)}return Object(S.a)(e,[{key:"get",value:function(){}},{key:"set",value:function(){}},{key:"remove",value:function(){}},{key:"removeAll",value:function(){}}]),e}(),ee=function(){function e(){Object(I.a)(this,e)}return Object(S.a)(e,[{key:"get",value:function(e){return e?new X(e):new $}}]),e}(),te=n(27),ne=function(){function e(t,n){Object(I.a)(this,e),this.liked=function(e){return e?"string"===typeof e?function(e){var t=JSON.parse(e);for(var n in t)t[n]=new Set(t[n]);return t}(e):e:{}}(t),this.storage=n}return Object(S.a)(e,[{key:"toggle",value:function(e,t){var n,c,a=Object(K.a)({},this.liked);this.liked=ce(a,e,t)?function(e,t,n){e[t].delete(n),0===e[t].size&&delete e[t];return e}(a,e,t):function(e,t,n){t in e||(e[t]=new Set);return e[t].add(n),e}(a,e,t),n=this.storage,c=this.serialize(),n.set("likedMedia",c)}},{key:"getAll",value:function(){return this.liked}},{key:"isLiked",value:function(e,t){return ce(this.liked,e,t)}},{key:"serialize",value:function(){var e={};for(var t in this.liked)e[t]=Object(te.a)(this.liked[t]);return JSON.stringify(e)}}]),e}();function ce(e,t,n){return t in e&&e[t].has(n)}var ae=new V,re=(new ee).get(window.localStorage),ie=new ne(function(e){try{return e.get("likedMedia")}catch(t){window.console.debug(t)}}(re),re);function oe(e){return e&&ie.isLiked(ae.getRestaurantIDByMediaID(e),e)}function se(e,t,n){if(console.log("updateSearchURL()"),console.log("description:",e),console.log("location:",t),t){var c=function(e,t){return"/search?description=".concat(encodeURIComponent(e),"&location=").concat(encodeURIComponent(t))}(e,t);return console.log("url:",c),n(c)}}function ue(e,t){return{media:t.getMediaByID(e),restaurant:t.getRestaurantByID(t.getRestaurantIDByMediaID(e))}}function le(e){if(e.ok)return e;throw Error(e.statusText)}var de=function(){var e=Object(a.useState)(""),t=Object(s.a)(e,2),n=t[0],r=t[1],i=Object(a.useState)([]),o=Object(s.a)(i,2),u=o[0],l=o[1],d=Object(a.useState)(""),j=Object(s.a)(d,2),h=j[0],f=j[1],b=Object(a.useState)({}),g=Object(s.a)(b,2),O=(g[0],g[1]),m=Object(a.useState)(!1),v=Object(s.a)(m,2),p=v[0],x=v[1],y=Object(a.useState)(null),k=Object(s.a)(y,2),w=k[0],I=k[1];return console.log("selectedMediaID:",h),Object(a.useEffect)((function(){n&&(console.log("Making request:",n),I(null),x(!0),fetch(n).then(le).then((function(e){return e.json()})).then((function(e){ae.update(e),console.log("lookup:",ae),l(e),x(!1),window.scroll({top:0,left:0,behavior:"smooth"})})).catch((function(e){return I(e)})))}),[n]),Object(c.jsxs)("div",{className:"app",children:[Object(c.jsx)(N,{onSearchRequest:function(e,t){return se(e,t,r)}}),h&&Object(c.jsx)(H,{selected:ue(h,ae),onMediaLikeToggle:function(e){return function(e,t){ie.toggle(ae.getRestaurantIDByMediaID(e),e),t(ie.getAll())}(e,O)},onClose:function(){return f("")},isLiked:oe(h)}),w?Object(c.jsx)(F,{error:w}):Object(c.jsx)(E,{restaurants:u,onMediaSelection:f,isLikedMedia:oe,searching:p})]})},je=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,69)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),c(e),a(e),r(e),i(e)}))};o.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(de,{})}),document.getElementById("root")),je()}},[[48,1,2]]]);
//# sourceMappingURL=main.36e2c408.chunk.js.map