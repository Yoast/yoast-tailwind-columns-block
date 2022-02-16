!function(){var t={723:function(t,e,n){"use strict";var o=window.wp.blocks,r=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"yoast/column","title":"Yoast tailwind column","parent":["yoast/columns"],"category":"layout","icon":"grid-view","textdomain":"yoast-tailwind-columns","attributes":{"colStart":{"type":"number"},"colSpan":{"type":"number","default":6},"colEnd":{"type":"number"}},"usesContext":["numberOfInnerBlocks","gridColumns","useGrid"],"supports":{"color":{}},"example":{},"editorScript":"file:./build/index.js","viewScript":"yoast-tailwind-column-block","style":"yoast-tailwind-column-block-style"}'),l=window.wp.element,s=n(184),a=n.n(s),i=window.wp.components,c=window.wp.blockEditor,u=window.wp.i18n,p=window.wp.data;const{name:d}=r;(0,o.registerBlockType)(d,{edit:t=>{let{attributes:{colSpan:e,colStart:n,colEnd:o},setAttributes:r,clientId:s,context:{numberOfInnerBlocks:d,useGrid:m,gridColumns:f}}=t;e=e||Math.floor(f/2),e=Math.min(e,f),o=n+e,m||r({colStart:void 0,colEnd:void 0,colSpan:void 0});const y=a()({[`yst-col-start-${n}`]:n,[`yst-col-span-${e}`]:e,[`yst-col-end-${o}`]:o}),{hasChildBlocks:v}=(0,p.useSelect)((t=>{const{getBlockOrder:e}=t(c.store);return{hasChildBlocks:e(s).length>0}}),[s]),w=(0,c.useBlockProps)({className:y}),b=(0,c.useInnerBlocksProps)({...w},{renderAppender:v?void 0:c.InnerBlocks.ButtonBlockAppender});return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(c.InspectorControls,null,m&&(0,l.createElement)(i.PanelBody,{title:(0,u.__)("Column settings")},(0,l.createElement)(i.RangeControl,{label:(0,u.__)("Span"),onChange:t=>{r({colSpan:t})},min:1,max:1!==n&&n?f-n:f,initialPosition:e,value:e}),(0,l.createElement)(i.RangeControl,{label:(0,u.__)("Start"),onChange:t=>{r({colStart:t})},min:1,max:f,initialPosition:n,value:n}))),(0,l.createElement)("div",b))},save:t=>{let{attributes:e,context:n}=t;const{colStart:o,colSpan:r,colEnd:s}=e,i=n,u=a()({[`yst-col-start-${o}`]:o,[`yst-col-span-${r}`]:r&&i,[`yst-col-end-${s}`]:s}),p=c.useBlockProps.save({className:u});return(0,l.createElement)("div",p,(0,l.createElement)(c.InnerBlocks.Content,null))}})},184:function(t,e){var n;!function(){"use strict";var o={}.hasOwnProperty;function r(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var l=typeof n;if("string"===l||"number"===l)t.push(n);else if(Array.isArray(n)){if(n.length){var s=r.apply(null,n);s&&t.push(s)}}else if("object"===l)if(n.toString===Object.prototype.toString)for(var a in n)o.call(n,a)&&n[a]&&t.push(a);else t.push(n.toString())}}return t.join(" ")}t.exports?(r.default=r,t.exports=r):void 0===(n=function(){return r}.apply(e,[]))||(t.exports=n)}()}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var l=e[o]={exports:{}};return t[o](l,l.exports,n),l.exports}n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n(723)}();