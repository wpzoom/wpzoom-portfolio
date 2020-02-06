!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=14)}([function(e,t){!function(){e.exports=this.wp.element}()},function(e,t){!function(){e.exports=this.wp.i18n}()},function(e,t){!function(){e.exports=this.wp.components}()},function(e,t){!function(){e.exports=this.wp.blocks}()},function(e,t){function o(){return e.exports=o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},o.apply(this,arguments)}e.exports=o},function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t){function o(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}e.exports=function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}},function(e,t,o){var n=o(15),r=o(16);e.exports=function(e,t){return!t||"object"!==n(t)&&"function"!=typeof t?r(e):t}},function(e,t){function o(t){return e.exports=o=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},o(t)}e.exports=o},function(e,t,o){var n=o(17);e.exports=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&n(e,t)}},function(e,t){!function(){e.exports=this.wp.apiFetch}()},function(e,t){!function(){e.exports=this.wp.blockEditor}()},function(e,t){!function(){e.exports=this.wp.data}()},function(e,t){!function(){e.exports=this.wp.serverSideRender}()},function(e,t,o){"use strict";o.r(t);var n=o(4),r=o.n(n),c=o(5),i=o.n(c),u=o(6),l=o.n(u),s=o(7),a=o.n(s),p=o(8),f=o.n(p),b=o(9),h=o.n(b),m=o(0),g=o(10),y=o.n(g),O=o(11),d=o(3),w=o(2),j=o(12),_=o(1),x=o(13),S=o.n(x);Object(d.registerBlockType)("wpzoom-blocks/posts",{title:Object(_.__)("Posts","wpzoom-blocks"),description:Object(_.__)("Display a customizable list of posts.","wpzoom-blocks"),icon:"list-view",category:"wpzoom-blocks",supports:{align:!0,html:!1},example:{},edit:Object(j.withSelect)((function(e,t){return{categoriesList:(0,e("core").getEntityRecords)("taxonomy","category",{per_page:-1,hide_empty:!1})}}))(function(e){function t(){var e;return i()(this,t),(e=a()(this,f()(t).apply(this,arguments))).state={imageSizes:[]},e}return h()(t,e),l()(t,[{key:"componentDidMount",value:function(){var e=this;this.isStillMounted=!0,this.fetchRequest=y()({path:"/wpzoom-blocks/v1/image-sizes"}),this.fetchRequest.then((function(t){e.isStillMounted&&e.setState({imageSizes:t})})),this.fetchRequest.catch((function(){e.isStillMounted&&e.setState({imageSizes:[]})}))}},{key:"componentWillUnmount",value:function(){this.isStillMounted=!1}},{key:"render",value:function(){var e=this.props,t=e.attributes,o=e.setAttributes,n=e.categoriesList,c=t.categories,i=t.amount,u=t.order,l=t.orderBy,s=t.showThumbnail,a=t.thumbnailSize,p=t.showAuthor,f=t.showDate,b=t.showCommentCount,h=t.showExcerpt,g=t.excerptLength,y=t.showReadMoreButton,d=this.state.imageSizes;return n&&d?Object(m.createElement)(m.Fragment,null,Object(m.createElement)(O.InspectorControls,null,Object(m.createElement)(w.PanelBody,{title:Object(_.__)("Options","wpzoom-blocks")},Object(m.createElement)(w.QueryControls,r()({order:u,orderBy:l},{numberOfItems:i,categoriesList:n,selectedCategoryId:c,onOrderChange:function(e){return o({order:e})},onOrderByChange:function(e){return o({orderBy:e})},onCategoryChange:function(e){return o({categories:""!==e?e:void 0})},onNumberOfItemsChange:function(e){return o({amount:e})}})),Object(m.createElement)(w.ToggleControl,{label:Object(_.__)("Show Post Thumbnail","wpzoom-blocks"),checked:s,onChange:function(e){return o({showThumbnail:e})}}),s&&Object(m.createElement)(w.SelectControl,{label:Object(_.__)("Post Thumbnail Size","wpzoom-blocks"),value:a,options:d,onChange:function(e){return o({thumbnailSize:e})}}),Object(m.createElement)(w.ToggleControl,{label:Object(_.__)("Show Post Author","wpzoom-blocks"),checked:p,onChange:function(e){return o({showAuthor:e})}}),Object(m.createElement)(w.ToggleControl,{label:Object(_.__)("Show Post Date","wpzoom-blocks"),checked:f,onChange:function(e){return o({showDate:e})}}),Object(m.createElement)(w.ToggleControl,{label:Object(_.__)("Show Post Comment Count","wpzoom-blocks"),checked:b,onChange:function(e){return o({showCommentCount:e})}}),Object(m.createElement)(w.ToggleControl,{label:Object(_.__)("Show Post Excerpt","wpzoom-blocks"),checked:h,onChange:function(e){return o({showExcerpt:e})}}),h&&Object(m.createElement)(w.RangeControl,{label:Object(_.__)("Excerpt Length","wpzoom-blocks"),value:g,onChange:function(e){return o({excerptLength:e})},min:1,max:1e3}),Object(m.createElement)(w.ToggleControl,{label:Object(_.__)("Show Read More Button","wpzoom-blocks"),checked:y,onChange:function(e){return o({showReadMoreButton:e})}}))),Object(m.createElement)(m.Fragment,null,Object(m.createElement)(S.a,{block:"wpzoom-blocks/posts",attributes:t}))):Object(m.createElement)(m.Fragment,null,Object(m.createElement)(w.Placeholder,{icon:"list-view",label:Object(_.__)("WPZOOM Blocks - Posts","wpzoom-blocks")},Object(m.createElement)(w.Spinner,null)," ",Object(_.__)("Loading...","wpzoom-blocks")))}}]),t}(m.Component))})},function(e,t){function o(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=o=function(e){return typeof e}:e.exports=o=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(t)}e.exports=o},function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},function(e,t){function o(t,n){return e.exports=o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},o(t,n)}e.exports=o}]);