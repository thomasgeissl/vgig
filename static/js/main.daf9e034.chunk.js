(this.webpackJsonpvgig=this.webpackJsonpvgig||[]).push([[0],{1053:function(e,t){},1055:function(e,t){},1078:function(e,t){},1079:function(e,t){},1092:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(36),o=n.n(c),i=(n(966),n(23)),u=n(39),l=n(143),s=n(48),f=n(24),d=n(12),m=n(1130),b=n(1137),p=n(43);function h(){var e=Object(i.a)(["\n  margin-top: 92px;\n  text-align: center;\n"]);return h=function(){return e},e}function g(){var e=Object(i.a)(["\n  p {\n    margin-top: 24px;\n    margin-bottom: 24px;\n  }\n"]);return g=function(){return e},e}function v(){var e=Object(i.a)([""]);return v=function(){return e},e}function E(){var e=Object(i.a)(["\n  position: fixed;\n  padding: 25px;\n  top: 0;\n  right: 0%;\n"]);return E=function(){return e},e}function O(){var e=Object(i.a)(["\n  max-width: 768px;\n  margin: auto;\n  margin-top: 100px;\n"]);return O=function(){return e},e}function j(){var e=Object(i.a)(["\n  .MuiInput-input {\n    color: white;\n  }\n  .MuiInputBase-input {\n    background-color: rgb(24, 24, 24);\n  }\n"]);return j=function(){return e},e}var x=n(880).version,y=Object(f.b)(b.a)(j()),w=f.b.div(O()),k=f.b.div(E()),S=f.b.section(v()),I=f.b.section(g()),C=f.b.div(h()),T=function(){var e=Object(a.useState)(function(e){for(var t="",n="abcdefghijklmnopqrstuvwxyz0123456789",a=n.length,r=0;r<e;r++)t+=n.charAt(Math.floor(Math.random()*a));return t}(4)),t=Object(d.a)(e,2),n=t[0],c=t[1],o=Object(s.f)();return r.a.createElement(w,null,r.a.createElement(k,null,x),r.a.createElement(S,null,"Welcome to vgig,",r.a.createElement("br",null),"the virtual concert hall for everyone."),r.a.createElement(I,null,r.a.createElement("p",null),r.a.createElement(C,null,r.a.createElement(y,{value:n,onChange:function(e){return c(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&""!==n&&o.push("/halls/".concat(n))},autofocus:!0}),r.a.createElement(m.a,{onClick:function(){"running"!==p.g.state&&p.g.resume(),o.push("/halls/".concat(n))},color:"primary",variant:"outlined"},"enter"))))},A="vgig",M=n(17),N=n(887),R=function(e){return e.includes("#")||e.includes("+")};var U=n(46),D=function(e){var t=Object(N.connect)(e),n=new Map;return t.on("connect",console.log),t.on("disconnect",console.log),t.on("error",console.error),t.on("message",(function(e,t){n.forEach((function(n,a){(e===a||R(a)&&function(e,t){if(e===t)return[];if("#"===t)return[e];for(var n=[],a=String(e).split("/"),r=String(t).split("/"),c=0,o=a.length;c<o;c++)if("+"===r[c])n.push(a[c]);else{if("#"===r[c])return n.push(a.slice(c).join("/")),n;if(r[c]!==a[c])return null}return"#"===r[c]&&(c+=1),c===r.length?n:null}(e,a))&&n.forEach((function(e){try{e(a,JSON.parse(t.toString()))}catch(n){e(a,{})}}))}))})),function(){return{subscribe:function(e,a){var r=n.get(e);if(n.set(e,[].concat(Object(M.a)(r||[]),[a])),t.subscribe(e),!n.get(e))throw new Error("useClient: ".concat(e," does not exist"))},publish:function(e,n){if(R(e))throw new Error("useTopic: Tried publishing on wildcard topic ".concat(e));t.publish(e,JSON.stringify(n))},unsubscribe:function(e){n.delete(e),t.unsubscribe(e)},getClient:function(){return t},getSubscriptions:function(){return n}}}}(U.broker),L=n(13),z=new Map;U.actions.forEach((function(e){z[e.id]=5}));var V="ADDUSER",B="SETUSERS",F="HEARTBEAT",J="SETNAME",P="SETCURRENTACTION",_="UNSETCURRENTACTION",G={users:[],heartBeats:new Map,mood:z},H=function(e){return{type:B,payload:{value:e}}},W=function(e){for(var t="",n="abcdefghijklmnopqrstuvwxyz0123456789",a=n.length,r=0;r<e;r++)t+=n.charAt(Math.floor(Math.random()*a));return t},q=r.a.createContext(),K=function(e){var t=e.children,n=Object(a.useState)({userId:W(8)}),c=Object(d.a)(n,2),o=c[0],i=c[1];return r.a.createElement(q.Provider,{value:[o,i]},t)},Y=q,X=function(){var e=Object(s.g)().id,t=Object(a.useContext)(Y),n=Object(d.a)(t,1)[0],c=D(),o=c.publish,i=c.subscribe,l=Object(u.b)();return Object(a.useEffect)((function(){i("".concat(A,"/").concat(e,"/audience/setUsers"),(function(e,t){console.log(t),l(H(t))}));var t=setInterval((function(){o("".concat(A,"/").concat(e,"/audience/getUsers"),{from:n.userId})}),3e4);return function(){clearInterval(t)}}),[]),r.a.createElement("h1",null,"admin")},$=n(1134),Z=n(1132),Q=n(1133),ee=n(1139),te=n(1135),ne=n(926),ae=n.n(ne),re=n(1142);function ce(){var e=Object(i.a)(["\n  height: 25px;\n  width: 25px;\n  background-color: ",";\n  /* background-color: ","; */\n  border-radius: 50%;\n  display: inline-block;\n  margin: 5px;\n  /* border: ","; */\n"]);return ce=function(){return e},e}function oe(){var e=Object(i.a)(["\n  text-align: left;\n"]);return oe=function(){return e},e}function ie(){var e=Object(i.a)(["\n  margin-top: 16px;\n  margin-bottom: 16px;\n  background-color: transparent;\n"]);return ie=function(){return e},e}var ue=U.actions,le=f.b.div(ie()),se=f.b.div(oe()),fe=f.b.div(ce(),(function(e){var t=e.action,n=e.active?"rgb(127,127,127)":"rgb(64,64,64)";return ue.forEach((function(e){e.id===t&&(n=e.color)})),"".concat(n)}),(function(e){return e.active?"rgb(255,170,100)":"rgb(254, 250, 170)"}),(function(e){var t=e.action,n="black";return ue.forEach((function(e){e.id===t&&(n=e.color)})),"solid 3px ".concat(n)})),de=function(e){var t=e.id,n=Object(u.b)(),c=D(),o=c.subscribe,i=c.unsubscribe,l=Object(a.useContext)(Y),s=Object(d.a)(l,1)[0],f=Object(a.useState)(!1),m=Object(d.a)(f,2),b=m[0],p=m[1],h=Object(u.c)((function(e){return e.users.users}));return Object(a.useEffect)((function(){b||(p(!0),t&&console.log("subscribing to audience topics"))}),[b,p,t,o,n,s],(function(){i("".concat(A,"/").concat(t,"/audience/getUsers"))})),r.a.createElement(le,null,r.a.createElement(se,null,h.map((function(e,t){return r.a.createElement(re.a,{key:e.id,title:e.name,placement:"right-start"},r.a.createElement(fe,{key:e.id,active:s.userId===e.id,action:e.currentAction}))}))))};function me(){var e=Object(i.a)(["\n  .MuiInput-input {\n    color: white;\n  }\n  .MuiInputBase-input {\n    background-color: rgb(24, 24, 24);\n  }\n"]);return me=function(){return e},e}function be(){var e=Object(i.a)([""]);return be=function(){return e},e}function pe(){var e=Object(i.a)(["\n  margin-bottom: 24px;\n"]);return pe=function(){return e},e}function he(){var e=Object(i.a)(["\n  margin-top: 24px !important;\n  display: flex;\n  flex-direction: row-reverse;\n"]);return he=function(){return e},e}function ge(){var e=Object(i.a)([""]);return ge=function(){return e},e}var ve=f.b.div(ge()),Ee=f.b.section(he()),Oe=f.b.div(pe()),je=Object(f.b)(m.a)(be()),xe=Object(f.b)(b.a)(me()),ye=function(e){var t=e.onEnter,n=D().publish,c=Object(a.useState)(""),o=Object(d.a)(c,2),i=o[0],u=o[1],l=Object(a.useContext)(Y),s=Object(d.a)(l,1)[0];return r.a.createElement(ve,null,r.a.createElement(Oe,null,"hello, ",r.a.createElement("br",null),"please enter your name and enjoy the show."),r.a.createElement(xe,{fullWidth:!0,autoFocus:!0,color:"primary",label:"name",value:i,onChange:function(e){u(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&""!==i&&(n("".concat(A,"/").concat(s.hallId,"/audience/setUserName"),{id:s.userId,name:i}),u(""),Object(p.i)(),t(i))}}),r.a.createElement("br",null),r.a.createElement(Ee,null,r.a.createElement(je,{color:"primary",variant:"outlined",onClick:function(){""!==i&&(n("".concat(A,"/").concat(s.hallId,"/audience/setUserName"),{id:s.userId,name:i}),u(""),Object(p.i)(),t(i))}},"enter")))},we=144,ke=128,Se=n(22),Ie=n(1094),Ce=n(927),Te=n(889),Ae=n.n(Te),Me=0,Ne=function(e){var t=e.seed,n=e.size,c=e.height,o=e.levels,i=void 0===o?3:o,u=e.scale,l=void 0===u?1:u,s=e.offset,f=void 0===s?{x:0,z:0}:s,d=e.color,m=e.analyser,b=Object(a.useMemo)((function(){return new Ae.a(t)}),[t]),p=Object(Se.h)((function(e){e.vertices=function(e,t,n,a,r,c){var o=function t(n,a,o){return e.noise2D(c.x*r+r*n*a,c.z*r+r*n*o)/n+(n>1?t(n/2,a,o):0)};return Array.from({length:Math.pow(t,2)},(function(e,i){var u=i%t/t-.5,l=Math.floor(i/t)/t-.5;return{x:(c.x+u)*r,y:o(Math.pow(2,a),u,l)*n,z:(c.z+l)*r}}))}(b,n,c,i,l,f),e.elementsNeedUpdate=!0}),[n,c,i,l,f,t]);return Object(Se.e)((function(){if(++Me%3===0){var e=m.getValue();if(e.reduce((function(e,t){return e+t}),0)===-1/0)return;e.forEach((function(e,t){var n=t%32,a=Math.floor(t/32)+32*n;p.current.vertices[a].y=2*Math.abs(-.008*e)})),p.current.rotateY+=.03,p.current.elementsNeedUpdate=!0}})),r.a.createElement("mesh",null,r.a.createElement("planeGeometry",{attach:"geometry",args:[void 0,void 0,n-1,n-1],ref:p}),r.a.createElement("meshBasicMaterial",{attach:"material",color:d,wireframe:!0}))},Re=n(936),Ue=function(e){return r.a.createElement(Re.a,Object.assign({},e,{color:"white",anchorX:"center",anchorY:"middle"}),"wstg")},De=function(e){var t,n=e.analyser,a=e.mood,c=0;a.forEach((function(e,n){n&&""!==n&&(c=Math.max(e,c))===e&&(t=n)}));var o="white";return t&&""!==t&&U.actions.forEach((function(e){e.id===t&&(o=e.color)})),r.a.createElement(r.a.Fragment,null,r.a.createElement(Ue,{position:[-3,3,4]}),r.a.createElement(Ne,{seed:1,size:Math.floor(32),height:.6,levels:Math.floor(10),scale:15,color:o,analyser:n}))},Le=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("ambientLight",{intensity:1}),r.a.createElement("pointLight",{position:[-10,-10,5],intensity:13.6}),r.a.createElement("pointLight",{position:[7,-15,5],intensity:12.8}))},ze=n(103),Ve=n(28),Be=function(){var e=Object(u.c)((function(e){return e.mixer.glitch})),t=Object(u.c)((function(e){return e.mixer.pixelation}));return r.a.createElement(ze.c,null,r.a.createElement(ze.b,{focusDistance:0,focalLength:.02,bokehScale:2,height:480}),r.a.createElement(ze.a,{luminanceThreshold:0,luminanceSmoothing:.9,height:300}),r.a.createElement(ze.e,{opacity:.05}),r.a.createElement(ze.g,{eskil:!1,offset:.1,darkness:1.1}),r.a.createElement(ze.d,{delay:[1.5,10.5],duration:[.05,.4],strength:[.002,.02],mode:Ve.n.SPORADIC,ratio:.48,active:e}),r.a.createElement(ze.f,{granularity:t}))},Fe=n(97),Je=n(1138),Pe="SETVISUALIZER",_e={mode:0},Ge="SETVOLUMEINTERACTIONS",He="SETVOLUMESTAGE",We="SETGLITCH",qe="SETPIXELATION",Ke={volumeInteractions:6,volumeStage:6,glitch:!0,pixelation:1},Ye="ADDMESSAGE",Xe={messages:[]},$e="ADDTOHISTORY",Ze={history:[]},Qe=function(e,t){return{type:$e,payload:{user:e,text:t}}},et=Object(Fe.c)({users:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case F:var n=new Map(e.heartBeats),a=Object(M.a)(e.users);return n.set(t.payload.value,Date.now()),n.forEach((function(e,t){if(Date.now()>e+6e4){console.log("user seems to be dead",t),n.delete(t);var r=-1;a.forEach((function(e,n){e.id===t&&(r=n)})),-1!==r&&a.splice(r,1)}})),Object(L.a)({},e,{heartBeats:n,users:a});case B:var r=Object(M.a)(e.users);return t.payload.value.forEach((function(e){var t=!1;r.forEach((function(n){n.id===e.id&&(t=!0)})),t||r.push(e)})),Object(L.a)({},e,{users:r.sort((function(e,t){return e.id<t.id}))});case V:var c=Object(M.a)(e.users),o=!1;return c.forEach((function(e){e.id===t.payload.id&&(o=!0)})),o||c.push({id:t.payload.id,name:t.payload.name}),Object(L.a)({},e,{users:c.sort((function(e,t){return e.id<t.id}))});case J:var i=Object(M.a)(e.users);return i.forEach((function(e,n){e.id===t.payload.id&&(i[n].name=t.payload.name)})),Object(L.a)({},e,{users:i});case P:var u=Object(M.a)(e.users);u.forEach((function(e,n){e.id===t.payload.id&&(u[n].currentAction=t.payload.action)}));var l=z;return u.forEach((function(e,t){l[e.currentAction]=l[e.currentAction]+1})),Object(L.a)({},e,{users:u,mood:l});case _:var s=Object(M.a)(e.users);return s.forEach((function(e,n){e.id===t.payload.id&&(s[n].currentAction="")})),Object(L.a)({},e,{users:s});default:return e}},mixer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ke,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Ge:return Object(L.a)({},e,{volumeInteractions:t.payload.value});case He:return Object(L.a)({},e,{volumeStage:t.payload.value});case We:return Object(L.a)({},e,{glitch:t.payload.value});case qe:return Object(L.a)({},e,{pixelation:t.payload.value});default:return e}},chat:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Xe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Ye:var n=Object(M.a)(e.messages);return n.unshift(Object(L.a)({},t.payload.message,{time:new Date,type:"CHAT"})),n=n.splice(0,100),Object(L.a)({},e,{messages:n});default:return e}},console:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ze,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case $e:var n=Object(M.a)(e.history);return n.unshift(Object(L.a)({},t.payload,{time:new Date,type:"SYSTEM"})),n=n.slice(0,1e3),Object(L.a)({},e,{history:n});default:return e}},visualisation:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_e,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Pe:return Object(L.a)({},e,{mode:t.payload.value});default:return e}}}),tt=n(1140),nt=n(1131),at=n(892),rt=n(1143),ct=Object(tt.a)((function(e){return e.pipe(Object(nt.a)((function(e){return e.type===P})),Object(at.a)((function(e){return t=e.payload.id,{type:_,payload:{id:t}};var t})),Object(rt.a)(100))})),ot=Object(Je.a)(),it=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||Fe.d,ut=Object(Fe.e)((function(e,t){return"RESET"===t.type?et(void 0,t):"SETSTATE"===t.type?et(t.payload,{type:"IGNORE"}):et(e,t)}),it(Object(Fe.a)(ot)));ot.run(ct),ut.dispatch({type:"INIT"});var lt=ut,st=n(894),ft=n.n(st),dt=n(895),mt=n.n(dt),bt=n(896),pt=n.n(bt),ht=n(897),gt=n.n(ht),vt=n(898),Et=n.n(vt),Ot=n(899),jt=n.n(Ot),xt=n(900),yt=n.n(xt),wt=n(901),kt=n.n(wt),St=n(902),It=n.n(St),Ct=n(903),Tt=n.n(Ct),At=n(904),Mt=n.n(At),Nt=n(905),Rt=n.n(Nt),Ut=n(906),Dt=n.n(Ut),Lt=n(907),zt=n.n(Lt),Vt=n(908),Bt=n.n(Vt),Ft=n(909),Jt=n.n(Ft);function Pt(){var e=Object(i.a)(["\n  width: 100%;\n  height: 100%;\n"]);return Pt=function(){return e},e}var _t=[ft.a,mt.a,pt.a,gt.a,Et.a,jt.a,yt.a,kt.a,It.a,Tt.a,Mt.a,Rt.a,Dt.a,zt.a,Bt.a,Jt.a],Gt=f.b.div(Pt()),Ht=function(e){var t=e.id,n=Object(u.c)((function(e){return e.users.users})),c=Object(u.c)((function(e){return e.visualisation.mode})),o=new Map;n.forEach((function(e){o.set(e.currentAction,o.get(e.currentAction)?o.get(e.currentAction)+1:1)}));var i=Object(a.useState)(null),l=Object(d.a)(i,2),s=l[0],f=l[1],m=Object(a.useState)(null),b=Object(d.a)(m,2),h=b[0],g=b[1],v=Object(a.useState)(null),E=Object(d.a)(v,2),O=E[0],j=E[1],x=Object(a.useState)(!1),y=Object(d.a)(x,2),w=y[0],k=y[1],S=D().subscribe,I=Object(u.c)((function(e){return e.mixer.volumeStage}));return s&&(s.volume.value=I),Object(a.useEffect)((function(){var e=new p.b(-32);e.connect(p.c);var t=[];_t.forEach((function(n,a){t.push(new p.d({C3:n})),t[a].attack=0,t[a].sustain=1,t[a].release=1.3,t[a].connect(e)})),f(e),g(t);var n=new p.a("fft",1024);e.connect(n),j(n)}),[]),Object(a.useEffect)((function(){t&&h&&!w&&(console.log("subscribing to orchestra topics"),k(!0),S("".concat(A,"/").concat(t,"/orchestra"),(function(e,t){var n=t.channel,a=t.note,r=t.status,c=t.velocity;n&&n>0&&n<=16&&(r===we&&h[n-1].triggerAttack(a,Object(p.h)(),c/127),r===ke&&h[n-1].triggerRelease(a,Object(p.h)()))})))}),[h,w,t,S]),r.a.createElement(Gt,null,r.a.createElement(Se.a,{camera:{fov:100,position:[4,3,5]}},r.a.createElement(Ce.a,null),r.a.createElement(Le,null),r.a.createElement(Ie.a,null,r.a.createElement(u.a,{store:lt},0===c&&r.a.createElement(De,{analyser:O,mood:o}),r.a.createElement(Be,null)))))},Wt=n(916),qt=n.n(Wt),Kt=n(917),Yt=n.n(Kt),Xt=n(918),$t=n.n(Xt),Zt=n(919),Qt=n.n(Zt),en=n(920),tn=n.n(en),nn=n(921),an=n.n(nn),rn=n(922),cn=n.n(rn),on=n(923),un=n.n(on),ln=n(211),sn=n.n(ln);function fn(){var e=Object(i.a)(["\n  color: white;\n"]);return fn=function(){return e},e}function dn(){var e=Object(i.a)(["\n      /* border: 3px solid ","; */\n      background-color: ",";\n    "]);return dn=function(){return e},e}function mn(){var e=Object(i.a)(["\n  /* background-color: rgba(254, 250, 170, 1); */\n  background-color: rgb(255, 170, 100);\n  color: white;\n  height: 32px;\n  width: 32px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  margin: 5px;\n  /* border-radius: 50%; */\n  border: none;\n  ","\n"]);return mn=function(){return e},e}function bn(){var e=Object(i.a)(["\n  display: inline-block;\n  text-align: center;\n  width: 100%;\n  /* border: 1px dashed white; */\n"]);return bn=function(){return e},e}var pn=f.b.div(bn()),hn=f.b.button(mn(),(function(e){var t=e.borderColor;return t&&Object(f.a)(dn(),t,t)})),gn=(f.b.span(fn()),function(e){e.label;var t=e.borderColor,n=e.onClick;return r.a.createElement(pn,null,r.a.createElement(hn,{onClick:n,borderColor:t}),r.a.createElement("br",null))}),vn=n(924),En=n.n(vn);function On(){var e=Object(i.a)(["\n  flex-grow: 1;\n"]);return On=function(){return e},e}function jn(){var e=Object(i.a)(["\n      background-color: ",";\n    "]);return jn=function(){return e},e}function xn(){var e=Object(i.a)(["\n  width: 100%;\n  text-transform: uppercase;\n  color: white;\n  text-align: center;\n  ","\n"]);return xn=function(){return e},e}function yn(){var e=Object(i.a)(["\n      /* border-bottom: 3px solid ","; */\n      border-left: 1px solid white;\n      border-right: 1px solid white;\n    "]);return yn=function(){return e},e}function wn(){var e=Object(i.a)(["\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  text-align: left;\n  ","\n"]);return wn=function(){return e},e}var kn=f.b.div(wn(),(function(e){return e.color&&Object(f.a)(yn(),e.color)})),Sn=f.b.div(xn(),(function(e){return e.color&&Object(f.a)(jn(),e.color)})),In=f.b.div(On()),Cn=function(e){var t=e.title,n=e.color,a=e.children,c=e.onClose;return r.a.createElement(kn,{color:n},r.a.createElement(Sn,{color:n},t),r.a.createElement(In,null,a),c&&r.a.createElement(En.a,{color:"white",onClick:c,style:{position:"absolute",left:"5px"}}))};function Tn(){var e=Object(i.a)(["\n  background-color: black;\n  display: flex;\n  flex-direction: column;\n"]);return Tn=function(){return e},e}var An=U.actions,Mn=[qt.a,Yt.a,$t.a,Qt.a,tn.a,an.a,cn.a,un.a],Nn=f.b.div(Tn()),Rn=new p.b(-32),Un=new p.f(0);Rn.connect(Un),Un.connect(p.c);var Dn=function(){var e=Object(a.useContext)(Y),t=Object(d.a)(e,1)[0],n=D(),c=n.subscribe,o=n.publish,i=Object(a.useState)(null),l=Object(d.a)(i,2),s=l[0],f=l[1],m=Object(a.useState)(null),b=Object(d.a)(m,2),h=b[0],g=b[1],v=Object(a.useState)(null),E=Object(d.a)(v,2),O=E[0],j=E[1],x=Object(a.useState)(null),y=Object(d.a)(x,2),w=y[0],k=y[1],S=Object(u.b)(),I=Object(u.c)((function(e){return e.mixer.volumeInteractions}));return s&&(s.volume.value=I),Object(a.useEffect)((function(){var e=new p.b(-32);e.connect(p.c);var t=[];Mn.forEach((function(n,a){t.push(new p.d({C3:n})),t[a].attack=0,t[a].release=1.3,t[a].connect(e)})),f(e),g(t);var n=new p.d({C3:sn.a});n.connect(e),j(n);var a=new p.d({C3:sn.a});a.connect(e),k(a)}),[]),Object(a.useEffect)((function(){t.hallId&&O&&w&&h&&(c("".concat(A,"/").concat(t.hallId,"/audience/enter"),(function(e,t){O.triggerAttackRelease("C3",20),S(Qe(t.userId,"entered."))})),c("".concat(A,"/").concat(t.hallId,"/audience/leave"),(function(e,t){w.triggerAttackRelease("C3",20),S(Qe(t.userId,"left."))})),An.forEach((function(e,n){c("".concat(A,"/").concat(t.hallId,"/audience/").concat(e.id),(function(t,a){h[n].triggerAttackRelease(60+Math.round(12*Math.random()),40),S(Qe(a.userId,e.logText)),S(function(e,t){return{type:P,payload:{id:e,action:t}}}(a.userId,e.id))}))})))}),[t.hallId,S,O,w,h,c]),r.a.createElement(Nn,null,r.a.createElement(Cn,{title:"actions",color:"rgb(46, 94, 160)"},r.a.createElement(Z.a,{container:!0},An.map((function(e,n){return r.a.createElement(Z.a,{item:!0,xs:3,key:n},r.a.createElement(gn,{key:e.id,variant:"outlined",color:"primary",borderColor:e.color,onClick:function(){o("".concat(A,"/").concat(t.hallId,"/audience/").concat(e.id),{userId:t.userId})},label:e.label}))})))))},Ln=n(1144);function zn(){var e=Object(i.a)(["\n  color: white;\n  margin-top: 5px;\n"]);return zn=function(){return e},e}function Vn(){var e=Object(i.a)(["\n  height: 50px !important;\n"]);return Vn=function(){return e},e}function Bn(){var e=Object(i.a)(["\n  width: 100%;\n  text-align: center;\n"]);return Bn=function(){return e},e}function Fn(){var e=Object(i.a)(["\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n  height: 100%;\n  justify-content: center;\n"]);return Fn=function(){return e},e}var Jn=f.b.div(Fn()),Pn=f.b.div(Bn()),_n=Object(f.b)(Ln.a)(Vn()),Gn=f.b.div(zn()),Hn=function(e){var t=e.value,n=e.onChange,a=e.min,c=e.max,o=e.label;return r.a.createElement(Jn,null,r.a.createElement(Pn,null,r.a.createElement(_n,{orientation:"vertical",min:a,max:c,value:t,onChange:n})),r.a.createElement(Gn,null,o))};function Wn(){var e=Object(i.a)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n"]);return Wn=function(){return e},e}function qn(){var e=Object(i.a)(["\n  background-color: black;\n  display: flex;\n  flex-direction: row;\n  height: 100%;\n  width: 100%;\n"]);return qn=function(){return e},e}var Kn=f.b.div(qn()),Yn=f.b.div(Wn()),Xn=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.mixer.volumeStage})),n=Object(u.c)((function(e){return e.mixer.volumeInteractions})),a=Object(u.c)((function(e){return e.mixer.glitch}));return r.a.createElement(Kn,null,r.a.createElement(Z.a,{container:!0},r.a.createElement(Z.a,{item:!0,xs:6},r.a.createElement(Cn,{title:"visual",color:"rgb(220, 46, 40)"},r.a.createElement(Z.a,{container:!0},r.a.createElement(Z.a,{item:!0,xs:2},r.a.createElement(gn,{variant:"outlined",color:"primary",onClick:function(){e({type:We,payload:{value:!a}})},label:"glitch"}))))),r.a.createElement(Z.a,{item:!0,xs:6},r.a.createElement(Cn,{title:"audio",color:"rgb(220, 46, 40)"},r.a.createElement(Z.a,{container:!0,style:{height:"100%"}},r.a.createElement(Z.a,{item:!0,xs:6},r.a.createElement(Yn,null,r.a.createElement(Hn,{orientation:"vertical",defaultValue:-100,min:-32,max:U.maxOrchestraVolume,value:t,onChange:function(t,n){e(function(e){return{type:He,payload:{value:e}}}(n))},label:"music"}))),r.a.createElement(Z.a,{item:!0,xs:6},r.a.createElement(Hn,{orientation:"vertical",defaultValue:-100,min:-32,max:U.maxActionVolume,value:n,onChange:function(t,n){e(function(e){return{type:Ge,payload:{value:e}}}(n))},label:"audience"})))))))},$n=n(1145),Zn=n(1146),Qn=n(925),ea=n.n(Qn);function ta(){var e=Object(i.a)(["\n        font-style: italic;\n      "]);return ta=function(){return e},e}function na(){var e=Object(i.a)(["\n        font-style: italic;\n        text-align: right;\n      "]);return na=function(){return e},e}function aa(){var e=Object(i.a)([""]);return aa=function(){return e},e}function ra(){var e=Object(i.a)(["\n    list-style-type: none;\n  "]);return ra=function(){return e},e}function ca(){var e=Object(i.a)(["\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n"]);return ca=function(){return e},e}function oa(){var e=Object(i.a)(["\n  width: 33vw;\n  @media only screen and (max-width: 600px) {\n    width: 100vw;\n  }\n\n  height: 50vh;\n  position: absolute;\n  top: 0;\n  right: 0;\n  flex-grow: 1;\n  overflow-y: scroll;\n  background-color: white;\n  color: black;\n  z-index: 1101;\n"]);return oa=function(){return e},e}var ia=f.b.div(oa()),ua=f.b.div(ca());function la(){var e=Object(i.a)(["\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 33vw;\n"]);return la=function(){return e},e}function sa(){var e=Object(i.a)(["\n  background-color: black;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 100%;\n"]);return sa=function(){return e},e}function fa(){var e=Object(i.a)(["\n  width: 100%;\n  height: 100%;\n"]);return fa=function(){return e},e}function da(){var e=Object(i.a)(["\n  width: 100%;\n  position: absolute;\n  bottom: 0;\n  background-color: black;\n"]);return da=function(){return e},e}function ma(){var e=Object(i.a)(["\n  width: 100%;\n  height: 100%;\n  background-color: transparent;\n"]);return ma=function(){return e},e}var ba=f.b.div(ma()),pa=f.b.div(da()),ha=Object(f.b)(ee.a)(fa()),ga=f.b.div(sa()),va=Object(f.b)((function(e){var t=e.onClose,n=Object(a.useState)(""),c=Object(d.a)(n,2),o=c[0],i=c[1],l=Object(a.useState)(!0),s=Object(d.a)(l,2),p=s[0],h=s[1],g=Object(a.useState)(!U.chat),v=Object(d.a)(g,2),E=v[0],O=v[1],j=Object(u.c)((function(e){return e.console.history})),x=Object(u.c)((function(e){return e.chat.messages})),y=U.chat?[].concat(Object(M.a)(j),Object(M.a)(x)).sort((function(e,t){return e.time<t.time})):Object(M.a)(j),w=Object(a.useContext)(Y),k=Object(d.a)(w,1)[0],S=Object(u.c)((function(e){return e.users.users})),I=D().publish,C=f.b.ul(ra()),T=f.b.li(aa()),A=U.chat?f.b.li(na()):f.b.li(ta());return r.a.createElement(ia,null,r.a.createElement(Cn,{title:U.chat?"chat/console":"console",color:"rgb(46, 94, 160)",onClose:t},(U.chat||U.console)&&r.a.createElement(r.a.Fragment,null,r.a.createElement($n.a,{control:r.a.createElement(Zn.a,{checked:p,onChange:function(e){h(e.target.checked)},color:"primary"}),label:"chat messages"}),r.a.createElement($n.a,{control:r.a.createElement(Zn.a,{checked:E,onChange:function(e){O(e.target.checked)},color:"primary"}),label:"system messages"})),r.a.createElement(C,null,y.map((function(e,t){var n;return S.forEach((function(t){t.id===e.user&&(n=t.name)})),r.a.createElement(r.a.Fragment,null,"CHAT"===e.type&&p&&r.a.createElement(T,{key:t},n,": ",e.text),"SYSTEM"===e.type&&E&&r.a.createElement(A,{key:t},k.hallId,": ",n," ",e.text))}))),U.chat&&r.a.createElement(ua,null,r.a.createElement(Z.a,{container:!0},r.a.createElement(Z.a,{item:!0,xs:9},r.a.createElement(b.a,{fullWidth:!0,value:o,onChange:function(e){return i(e.target.value)},onKeyPress:function(e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),I("vgig/".concat(k.hallId,"/audience/chat"),{user:k.userId,message:o}),i(""))}})),r.a.createElement(Z.a,{item:!0,xs:3},r.a.createElement(m.a,{color:"primary",fullWidth:!0,onClick:function(e){""!==o&&I("vgig/".concat(k.hallId,"/audience/chat"),{user:k.userId,message:o}),i("")}},r.a.createElement(ea.a,null)))))))}))(la()),Ea=function(){var e=Object(s.g)().id,t=Object(a.useContext)(Y),n=Object(d.a)(t,2),c=n[0],o=n[1],i=D(),l=i.publish,f=i.subscribe,m=Object(u.b)(),b=Object(a.useState)(!1),p=Object(d.a)(b,2),h=p[0],g=p[1],v=Object(a.useState)(!0),E=Object(d.a)(v,2),O=E[0],j=E[1],x=Object(a.useState)(!1),y=Object(d.a)(x,2),w=y[0],k=y[1];return Object(a.useEffect)((function(){c.hallId!==e&&(console.log("storing hall id in context"),o(Object(L.a)({},c,{hallId:e})))}),[e,c,o]),Object(a.useEffect)((function(){h||(g(!0),console.log("subscribing to hall topics"),f("".concat(A,"/").concat(e,"/audience/getUsers"),(function(e,t){console.log(e,t)})),f("".concat(A,"/").concat(e,"/audience/getUsers"),(function(t,n){console.log("".concat(n.from," requested to get users")),n.from&&n.from!==c.userId&&(console.log("".concat(n.from," requested to get users")),l("".concat(A,"/").concat(e,"/audience/setUsers"),lt.getState().users.users))})),f("".concat(A,"/").concat(e,"/audience/setUsers"),(function(e,t){m(H(t))})),f("".concat(A,"/").concat(e,"/audience/enterLobby"),(function(e,t){m(function(e,t){return{type:V,payload:{id:e,name:t}}}(t.userId,"anonymous "))})),f("".concat(A,"/").concat(e,"/audience/alive"),(function(e,t){var n;m((n=t.userId,{type:F,payload:{value:n}}))})),f("".concat(A,"/").concat(e,"/audience/setUserName"),(function(e,t){m(function(e,t){return{type:J,payload:{id:e,name:t}}}(t.id,t.name))})),f("".concat(A,"/").concat(e,"/audience/chat"),(function(e,t){var n,a;m((n=t.user,a=t.message,{type:Ye,payload:{message:{user:n,text:a}}}))})),l("".concat(A,"/").concat(e,"/audience/getUsers"),{from:c.userId}),l("".concat(A,"/").concat(e,"/audience/enterLobby"),{userId:c.userId}),setInterval((function(){l("".concat(A,"/").concat(e,"/audience/alive"),{userId:c.userId})}),3e4))}),[e,h,f,l,g,m,c]),r.a.createElement(ba,null,(U.chat||U.console)&&r.a.createElement($.a,{position:"sticky",style:{backgroundColor:"transparent"}},r.a.createElement(te.a,null,r.a.createElement(Q.a,{color:"primary",onClick:function(e){k(!w)}},r.a.createElement(ae.a,null)))),r.a.createElement(ha,{open:O},r.a.createElement(ga,null,r.a.createElement(ye,{onEnter:function(e){l("".concat(A,"/").concat(c.hallId,"/audience/enter"),{userId:c.userId,name:e}),j(!1)}}))),r.a.createElement(r.a.Fragment,null,r.a.createElement(Ht,{id:e}),r.a.createElement(pa,null,r.a.createElement(de,{id:e}),r.a.createElement(Z.a,{container:!0},r.a.createElement(Z.a,{item:!0,xs:12,sm:8},r.a.createElement(Dn,{id:e})),r.a.createElement(Z.a,{item:!0,xs:12,sm:4},r.a.createElement(Xn,null)))),w&&r.a.createElement(va,{onClose:function(){k(!1)}})))},Oa=n(1136),ja=n(928),xa=Object(ja.a)({palette:{primary:{main:"rgb(255, 255, 255)"},secondary:{main:"rgb(220, 46, 40)"}},overrides:{MuiSlider:{thumb:{color:"white"},track:{color:"white"},rail:{color:"white"}},MuiTextField:{input:{color:"white !important"}}}}),ya=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,{onClick:function(){Object(p.i)();var e=(new p.e).toDestination(),t=Object(p.h)();e.triggerAttackRelease("C4","8n",t),e.triggerAttackRelease("E4","8n",t+.5),e.triggerAttackRelease("G4","8n",t+1)}},"start"))};function wa(e){var t=Object(a.useRef)(),n=Object(a.useState)(!1),c=Object(d.a)(n,2),o=c[0],i=c[1],u=Object(a.useState)(!1),l=Object(d.a)(u,2),s=l[0],f=l[1];return Object(Se.e)((function(){t.current.rotation.x=t.current.rotation.y+=.01})),r.a.createElement("mesh",Object.assign({},e,{ref:t,scale:s?[1.5,1.5,1.5]:[1,1,1],onClick:function(e){return f(!s)},onPointerOver:function(e){return i(!0)},onPointerOut:function(e){return i(!1)}}),r.a.createElement("boxBufferGeometry",{args:[1,1,1]}),r.a.createElement("meshStandardMaterial",{color:o?"hotpink":"orange"}))}var ka=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(Se.a,null,r.a.createElement("ambientLight",null),r.a.createElement("pointLight",{position:[10,10,10]}),r.a.createElement(wa,{position:[-1.2,0,0]}),r.a.createElement(wa,{position:[1.2,0,0]})),",")},Sa=function(){var e=Object(a.useState)({}),t=Object(d.a)(e,2),n=t[0],c=t[1],o=D(),i=o.publish,u=o.subscribe;return Object(a.useEffect)((function(){}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,{onClick:function(){u("vgig/test/audience/test",(function(e,t){console.log(e,JSON.parse(t)),c(JSON.parse(t))}))},variant:"outlined"},"subscribe to topic"),r.a.createElement("br",null),r.a.createElement(m.a,{onClick:function(){console.log(JSON.stringify({value:"test"})),i("vgig/test/audience/test",JSON.stringify({time:new Date,value:"test"}))},variant:"outlined"},"send test message on topic"),r.a.createElement("br",null),r.a.createElement("div",null,n.time,", ",n.value))};function Ia(){var e=Object(i.a)(["\n  width: 100vw;\n  height: 100vh;\n"]);return Ia=function(){return e},e}var Ca=f.b.div(Ia()),Ta=function(){return r.a.createElement(Ca,null,r.a.createElement(Oa.a,{theme:xa},r.a.createElement(u.a,{store:lt},r.a.createElement(l.a,null,r.a.createElement(s.c,null,r.a.createElement(s.a,{path:"/test/audio"},r.a.createElement(ya,null)),r.a.createElement(s.a,{path:"/test/visual"},r.a.createElement(ka,null)),r.a.createElement(s.a,{path:"/test/connection"},r.a.createElement(Sa,null)),r.a.createElement(s.a,{path:"/halls/:id/admin"},r.a.createElement(K,{value:Y},r.a.createElement(X,null))),r.a.createElement(s.a,{path:"/halls/:id"},r.a.createElement(K,{value:Y},r.a.createElement(Ea,null))),r.a.createElement(s.a,{path:"/"},r.a.createElement(T,null)))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Ta,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},211:function(e,t,n){e.exports=n.p+"static/media/enter.339b495d.mp3"},46:function(e){e.exports=JSON.parse('{"broker":"wss://audience:audience@v-gig.com:8081","orchestra":[],"actions":[{"id":"applaude","label":"applaude","color":"#ffadad","logText":"is applauding."},{"id":"breath","label":"breath","color":"#ffd6a5","logText":"is breathing."},{"id":"cry","label":"cry","color":"#fffffc","logText":"is crying."},{"id":"sneeze","label":"sneeze","color":"#caffbf","logText":"is sneezing."},{"id":"smile","label":"smile","color":"#9bf6ff","logText":"is smiling."},{"id":"dance","label":"dance","color":"#a0c4ff","logText":"is dancing."},{"id":"sweat","label":"sweat","color":"#ffc6ff","logText":"is sweating."},{"id":"singAlong","label":"sing along","color":"#bdb2ff","logText":"is singing along."}],"maxOrchestraVolume":6,"maxActionVolume":6,"chat":false,"console":false,"style":{"showLabels":false}}')},880:function(e){e.exports=JSON.parse('{"name":"vgig","homepage":"https://thomasgeissl.github.io/vgig","version":"1.0.1","private":true,"dependencies":{"@material-ui/core":"^4.11.0","@material-ui/icons":"^4.9.1","@react-three/cannon":"^0.5.3","@react-three/drei":"^2.2.0","@react-three/postprocessing":"^1.4.1","@testing-library/jest-dom":"^4.2.4","@testing-library/react":"^9.3.2","@testing-library/user-event":"^7.1.2","date-fns":"^2.16.1","drei":"^1.5.7","gh-pages":"^3.1.0","mqtt":"^4.2.1","nice-color-palettes":"^3.0.0","nosleep.js":"^0.11.0","react":"^16.13.1","react-dom":"^16.13.1","react-redux":"^7.2.1","react-router-dom":"^5.2.0","react-scripts":"3.4.3","react-spring":"^8.0.27","react-three-fiber":"^5.0.1","redux":"^4.0.5","redux-observable":"^1.2.0","simplex-noise":"^2.4.0","stats.js":"^0.17.0","styled-components":"^5.2.0","three":"^0.120.1","threejs-meshline":"^2.0.12","tone":"^14.7.39","troika-three-text":"^0.34.1","typescript":"^4.0.3"},"scripts":{"start":"react-scripts start","build":"react-scripts build","test":"#react-scripts test","eject":"react-scripts eject","deploy":"yarn build && gh-pages -d build","travisdeploy":"CI=false yarn build && gh-pages -d build -r https://$GH_TOKEN@github.com/thomasgeissl/vgig.git"},"eslintConfig":{"extends":"react-app"},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]}}')},894:function(e,t,n){e.exports=n.p+"static/media/1.2ff80ac8.mp3"},895:function(e,t,n){e.exports=n.p+"static/media/2.1c2b70ec.mp3"},896:function(e,t,n){e.exports=n.p+"static/media/3.1a2ceec2.mp3"},897:function(e,t,n){e.exports=n.p+"static/media/4.e59a4594.mp3"},898:function(e,t,n){e.exports=n.p+"static/media/5.39b87e4e.mp3"},899:function(e,t,n){e.exports=n.p+"static/media/6.4ff4f6c4.mp3"},900:function(e,t,n){e.exports=n.p+"static/media/7.cf244f92.mp3"},901:function(e,t,n){e.exports=n.p+"static/media/8.1a3c06fb.mp3"},902:function(e,t,n){e.exports=n.p+"static/media/9.51f8712a.mp3"},903:function(e,t,n){e.exports=n.p+"static/media/10.addb6c15.mp3"},904:function(e,t,n){e.exports=n.p+"static/media/11.35a178a5.mp3"},905:function(e,t,n){e.exports=n.p+"static/media/12.dd328baa.mp3"},906:function(e,t,n){e.exports=n.p+"static/media/13.8c15668d.mp3"},907:function(e,t,n){e.exports=n.p+"static/media/14.c2c551c9.mp3"},908:function(e,t,n){e.exports=n.p+"static/media/15.45ca4dca.mp3"},909:function(e,t,n){e.exports=n.p+"static/media/16.066aed20.mp3"},916:function(e,t,n){e.exports=n.p+"static/media/1.c45d7231.mp3"},917:function(e,t,n){e.exports=n.p+"static/media/2.56025ded.mp3"},918:function(e,t,n){e.exports=n.p+"static/media/3.c2ecfa7c.mp3"},919:function(e,t,n){e.exports=n.p+"static/media/4.30b56d3b.mp3"},920:function(e,t,n){e.exports=n.p+"static/media/5.78fd1661.mp3"},921:function(e,t,n){e.exports=n.p+"static/media/6.ca179799.mp3"},922:function(e,t,n){e.exports=n.p+"static/media/7.4d512d41.mp3"},923:function(e,t,n){e.exports=n.p+"static/media/8.45c653fd.mp3"},962:function(e,t,n){e.exports=n(1092)},966:function(e,t,n){},982:function(e,t){},984:function(e,t){}},[[962,1,2]]]);
//# sourceMappingURL=main.daf9e034.chunk.js.map