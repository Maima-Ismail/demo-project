import{m as d,V as m}from"./VSelectionControl.f1de9929.js";import{a7 as f,as as k,a0 as x,ae as o,B as c,a6 as I,p as V,O as b,aF as h}from"./index.ef6063b0.js";const v=f({indeterminate:Boolean,indeterminateIcon:{type:k,default:"$checkboxIndeterminate"},...d({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"VCheckboxBtn"),C=x({name:"VCheckboxBtn",props:v(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,i){let{slots:r}=i;const n=o(e,"indeterminate"),t=o(e,"modelValue");function l(a){n.value&&(n.value=!1)}const s=c(()=>e.indeterminate?e.indeterminateIcon:e.falseIcon),u=c(()=>e.indeterminate?e.indeterminateIcon:e.trueIcon);return I(()=>V(m,b(e,{modelValue:t.value,"onUpdate:modelValue":[a=>t.value=a,l],class:"v-checkbox-btn",type:"checkbox",inline:!0,falseIcon:s.value,trueIcon:u.value,"aria-checked":e.indeterminate?"mixed":void 0}),r)),{}}});function P(e){return h(e,Object.keys(C.props))}export{C as V,P as f,v as m};
