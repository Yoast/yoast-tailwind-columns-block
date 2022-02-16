!function(){var e={609:function(e,l,t){"use strict";var o=window.wp.blocks,n=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"yoast/columns","title":"Yoast tailwind columns","category":"layout","icon":"columns","textdomain":"yoast-tailwind-columns","example":{},"attributes":{"numberOfInnerBlocks":{"type":"integer","default":3},"gridColumns":{"type":"integer","default":12},"useGrid":{"type":"boolean","default":false},"gap":{"type":"string"},"flexDirection":{"type":"string","default":"row"},"smallScreenFlexDirection":{"type":"string","default":"col"},"flexWrap":{"type":"boolean","default":true}},"providesContext":{"numberOfInnerBlocks":"numberOfInnerBlocks","gridColumns":"gridColumns","useGrid":"useGrid"},"editorScript":"file:./build/index.js"}'),r=window.wp.element,a=t(184),s=t.n(a),i=window.lodash,u=window.wp.blockEditor,c=window.wp.i18n,p=window.wp.components,m=window.wp.data;const d=["yoast/column"],f=(0,m.withDispatch)(((e,l,t)=>({updateColumns(n,r){const{clientId:a}=l,{replaceInnerBlocks:s}=e(u.store),{getBlocks:c}=t.select(u.store);let p=c(a);p=r>n?[...p,...(0,i.times)(r-n,(()=>(0,o.createBlock)("yoast/column")))]:(0,i.dropRight)(p,n-r),s(a,p)},updateGridColumnsCount(o,n,r){const{clientId:a}=l,{replaceInnerBlocks:s}=e(u.store),{updateBlockAttributes:i}=e(u.store),{getBlocks:c}=t.select(u.store);let p=c(a);p.forEach(((e,l)=>{var t;let a=null!=e&&null!==(t=e.attributes)&&void 0!==t&&t.colSpan?Math.floor(e.attributes.colSpan*o/n):Math.floor(n/r),s=0===l?1:Math.min(p[l-1].attributes.colStart+p[l-1].attributes.colSpan,n);i(e.clientId,{colSpan:a,colStart:s})})),s(a,p)}})))((function(e){let{attributes:l,setAttributes:t,clientId:o,updateColumns:n,updateGridColumnsCount:a}=e;const{useGrid:i,gap:f,flexDirection:_,smallScreenFlexDirection:v,flexWrap:b,gridColumns:g}=l,{count:y}=(0,m.useSelect)((e=>({count:e(u.store).getBlockCount(o)})),[o]),w=(0,u.useBlockProps)({className:s()({[`yst-grid-cols-${g}`]:g,"yst-flex":!i,"yst-grid":i,[`yst-gap-${f}`]:f,"yst-flex-wrap":!i&&b,"yst-flex-nowrap":!i&&!b,"yst-flex-row":!i&&"row"==_,"yst-flex-row-reverse":!i&&"row-reverse"==_,"yst-flex-col":!i&&"column"==_,"yst-flex-col-reverse":!i&&"column-reverse"==_})}),x=(0,u.useInnerBlocksProps)(w,{allowedBlocks:d,template:[["yoast/column"],["yoast/column"],["yoast/column"]]}),h=[{label:(0,c.__)("Row"),value:"row"},{label:(0,c.__)("Column"),value:"column"},{label:(0,c.__)("Row reverse"),value:"row-reverse"},{label:(0,c.__)("Column reverse"),value:"column-reverse"}],C=[{label:(0,c.__)("auto"),value:"auto"},{label:(0,c.__)("1"),value:"1"},{label:(0,c.__)("2"),value:"2"},{label:(0,c.__)("3"),value:"3"},{label:(0,c.__)("4"),value:"4"},{label:(0,c.__)("5"),value:"5"},{label:(0,c.__)("6"),value:"6"},{label:(0,c.__)("8"),value:"8"},{label:(0,c.__)("10"),value:"10"},{label:(0,c.__)("12"),value:"12"},{label:(0,c.__)("16"),value:"16"},{label:(0,c.__)("20"),value:"20"},{label:(0,c.__)("24"),value:"24"},{label:(0,c.__)("32"),value:"32"},{label:(0,c.__)("40"),value:"40"},{label:(0,c.__)("48"),value:"48"},{label:(0,c.__)("56"),value:"56"},{label:(0,c.__)("64"),value:"64"}];return(0,r.createElement)(r.Fragment,null,(0,r.createElement)(u.InspectorControls,null,(0,r.createElement)(p.PanelBody,null,(0,r.createElement)(p.RangeControl,{label:(0,c.__)("Number of inner blocks:"),value:y,onChange:e=>{n(y,e)},min:1,max:Math.max(12,y)}),y>12&&(0,r.createElement)(p.Notice,{status:"warning",isDismissible:!1},(0,c.__)("This count exceeds the recommended amount and may cause visual breakage.")),(0,r.createElement)(p.SelectControl,{label:"Gap",options:C,value:f,onChange:e=>t({gap:e})}),(0,r.createElement)(p.ToggleControl,{label:(0,c.__)("Enable grid"),checked:i,onChange:()=>t({useGrid:!i}),help:(0,c.__)("Default is flex. Enable to use CSS grid.")})),!i&&(0,r.createElement)(p.PanelBody,{title:(0,c.__)("Flex settings")},(0,r.createElement)(p.SelectControl,{label:"Flex Direction",options:h,value:_,onChange:e=>t({flexDirection:e})}),(0,r.createElement)(p.SelectControl,{label:"Small Screen Flex Direction",options:h,value:v,onChange:e=>t({smallScreenFlexDirection:e})}),(0,r.createElement)(p.ToggleControl,{label:(0,c.__)("Wrap"),checked:b,onChange:()=>t({flexWrap:!b}),help:(0,c.__)('Disable to use "nowrap".')})),i&&(0,r.createElement)(p.PanelBody,{title:(0,c.__)("Grid settings")},(0,r.createElement)(p.RangeControl,{label:(0,c.__)("Grid Columns"),onChange:e=>{a(g,e,y),t({gridColumns:e})},min:1,max:12,initialPosition:12,value:g}))),(0,r.createElement)("div",x))}));const{name:_}=n;(0,o.registerBlockType)(_,{edit:e=>(0,r.createElement)(f,e),save:e=>{let{attributes:l}=e;const{useGrid:t,gap:o,flexDirection:n,smallScreenFlexDirection:a,flexWrap:i,gridColumns:c}=l,p=s()({[`yst-grid-cols-${c}`]:c,"yst-flex":!t,"yst-grid":t,[`yst-gap-${o}`]:o,"yst-flex-wrap":!t&&i,"yst-flex-nowrap":!t&&!i,"yst-flex-row":!t&&"row"==n,"yst-flex-row-reverse":!t&&"row-reverse"==n,"yst-flex-col":!t&&"column"==n,"yst-flex-col-reverse":!t&&"column-reverse"==n}),m=u.useBlockProps.save({className:p}),d=u.useInnerBlocksProps.save(m);return(0,r.createElement)("div",d)}})},184:function(e,l){var t;!function(){"use strict";var o={}.hasOwnProperty;function n(){for(var e=[],l=0;l<arguments.length;l++){var t=arguments[l];if(t){var r=typeof t;if("string"===r||"number"===r)e.push(t);else if(Array.isArray(t)){if(t.length){var a=n.apply(null,t);a&&e.push(a)}}else if("object"===r)if(t.toString===Object.prototype.toString)for(var s in t)o.call(t,s)&&t[s]&&e.push(s);else e.push(t.toString())}}return e.join(" ")}e.exports?(n.default=n,e.exports=n):void 0===(t=function(){return n}.apply(l,[]))||(e.exports=t)}()}},l={};function t(o){var n=l[o];if(void 0!==n)return n.exports;var r=l[o]={exports:{}};return e[o](r,r.exports,t),r.exports}t.n=function(e){var l=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(l,{a:l}),l},t.d=function(e,l){for(var o in l)t.o(l,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:l[o]})},t.o=function(e,l){return Object.prototype.hasOwnProperty.call(e,l)},t(609)}();