(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[616],{1446:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/signup",function(){return n(49)}])},7273:function(e,t){"use strict";t.Z={src:"/_next/static/media/bg_signup.d0c1670a.png",height:491,width:500,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAA00lEQVR42gHIADf/ANa0q9W5t8e8t6SPlG3X8JHc3pOdqgDZ3wDi1MTV0sPLv7m/iHOxwMGYuLHRzMa20cUAs5qNv62ZvJmOuIt51sW+y6OE6Mav7L2iALeafbaJcY+OiZeEdrqej7Clo7KgpLqlpQC7rZ6okIaRg3mrZACrZgCgi4GJh4+RhIUAx7Snzb2qopSOwYtorIZvk4eEkXVqkIB8ANyeZeGodJ2FbolvQlNLMoyBeayNfKKIewDWkTnTiUSffmiBXjxcPB6CeHSVf3WFa1+9OHLgcauGpQAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:8}},49:function(e,t,n){"use strict";n.r(t);var r=n(5893),a=n(7294),s=n(5675),i=n.n(s),l=n(7273),c=n(8221),o=n(1664),u=n.n(o),d=n(1163),g=n(297),h=n(8607),x=n(4265),m=n(538);t.default=(0,m.Z)(function(){let e=(0,d.useRouter)(),[t,n]=(0,a.useState)(""),[s,o]=(0,a.useState)(""),[m,f]=(0,a.useState)(""),[b,p]=(0,a.useState)(""),[v,w]=(0,a.useState)(""),[j,A]=(0,a.useState)(null),N=async n=>{n.preventDefault();try{let n=await (0,g.Hi)({username:t,firstName:s,lastName:m,email:b,password:v});n.success&&e.push("/login")}catch(e){A("Unable to sign up")}};return(0,r.jsxs)("section",{className:"w-full relative bg-black",children:[j&&(0,r.jsx)(x.Z,{message:j,onClose:()=>A(null)}),(0,r.jsx)("div",{className:"w-full h-screen bg-black absolute",children:(0,r.jsx)(i(),{src:l.Z,alt:"signup",fill:!0,style:{objectFit:"cover"},className:"bg-gray-900 opacity-40 blur-sm"})}),(0,r.jsx)("div",{className:"z-10 h-screen flex items-center justify-center z-10 p-4 relative",children:(0,r.jsxs)("form",{onSubmit:N,className:"bg-white rounded-md p-4 flex gap-2 flex-col w-11/12 sm:w-6/12 lg:w-4/12 lg:mt-8",children:[(0,r.jsx)("h2",{className:"font-semibold text-black text-[24px] md:text-[36px] text-center",children:"Sign Up"}),(0,r.jsx)(c.Z,{name:"username",text:"JohnDoe",onChange:e=>{n(e.target.value)},children:"Username"}),(0,r.jsx)(c.Z,{name:"firstname",text:"John",onChange:e=>{o(e.target.value)},children:"First name"}),(0,r.jsx)(c.Z,{name:"lastname",text:"Doe",onChange:e=>{f(e.target.value)},children:"Last name"}),(0,r.jsx)(c.Z,{name:"email",text:"JohnDoe@gmail.com",onChange:e=>{p(e.target.value)},children:"Email"}),(0,r.jsx)(c.Z,{type:"password",text:"password",name:"password",onChange:e=>{w(e.target.value)},children:"Password"}),(0,r.jsx)("div",{className:"mt-4",children:(0,r.jsx)(h.Z,{buttonType:"submit",children:"Sign Up"})}),(0,r.jsx)(u(),{className:"text-sm m-2 hover:text-blue",href:"/login",children:"Already have an account. Login Now."})]})})]})})},8607:function(e,t,n){"use strict";var r=n(5893);t.Z=e=>{let{handleClick:t,bgColor:n="red",buttonType:a="button",disable:s=!1,textColor:i="textWhite",children:l}=e,c={darkgray:"bg-darkgray hover:bg-gray",lightgray:"bg-lightgray hover:bg-darkgray",red:"bg-red hover:bg-firebrick",firebrick:"bg-firebrick hover:bg-red",white:"bg-white",textWhite:"text-white"};return(0,r.jsx)("button",{type:a,className:"w-full hover:text-white\n        ".concat(c[n]," ").concat(c[i]," p-2 rounded-md \n        shadow-lg ease-in duration-300"),onClick:t,disabled:s,children:l})}},4265:function(e,t,n){"use strict";var r=n(5893),a=n(7294);t.Z=e=>{let{message:t,onClose:n}=e,[s,i]=(0,a.useState)(!0),l=()=>{i(!s),n()};return s&&(0,r.jsx)("div",{className:"flex items-center justify-center fixed top-16 w-full z-40",children:(0,r.jsxs)("label",{className:"min-w-60 h-auto p-4 m-4 bg-red-100 border border-red-600 rounded cursor-pointer font-sans font-normal text-sm bg-lightdarkred",children:[(0,r.jsx)("input",{type:"checkbox",className:"hidden",autoComplete:"off",onChange:l}),(0,r.jsxs)("div",{className:"flex items-center flex-row-reverse text-white gap-4",children:[(0,r.jsx)("span",{className:"float-right pt-1 text-xs cursor-pointer",onClick:l,children:"X"}),(0,r.jsx)("span",{className:"mx-auto sm:text-lg",children:t})]})]})})}},8221:function(e,t,n){"use strict";var r=n(5893);t.Z=e=>{let{name:t,type:n="text",text:a="",value:s,noBorderOutline:i=!1,required:l="required",onChange:c,children:o}=e;return(0,r.jsxs)("label",{className:"flex flex-col text-left",children:[o,(0,r.jsx)("input",{type:n,name:t,value:s,placeholder:a,onChange:c,className:"".concat("border-radius-sm p-2 w-95 mt-2 font-open-sans"," ").concat(i?"border-0":"border"," rounded-md"),required:l})]})}},8288:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(5893),a=n(1163),s=n(4183);function i(){return(0,r.jsx)("p",{children:"Loading..."})}function l(e){let{WrappedComponent:t,LoadingComponent:n=i,expectedAuth:l,location:c}=e;return e=>{let i=(0,a.useRouter)(),{isLoading:o,isAuthenticated:u}=(0,s.a)();return o?(0,r.jsx)(n,{}):l!==u?(i.push(c),(0,r.jsx)(r.Fragment,{})):(0,r.jsx)(t,{...e})}}},538:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(8288);function a(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/";return(0,r.Z)({WrappedComponent:e,location:t,expectedAuth:!1})}},1163:function(e,t,n){e.exports=n(9974)}},function(e){e.O(0,[61,774,888,179],function(){return e(e.s=1446)}),_N_E=e.O()}]);