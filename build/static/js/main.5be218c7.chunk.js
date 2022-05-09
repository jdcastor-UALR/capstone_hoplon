(this["webpackJsonpdjango-react-boilerplate"]=this["webpackJsonpdjango-react-boilerplate"]||[]).push([[0],{182:function(e,t,n){},212:function(e,t,n){},215:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n.n(c),a=n(17),s=n.n(a),r=(n(182),n(14)),o=n(252),u=n(254),l=n(67),j=n(79),d=n(25),b=n(112),O=n.n(b),h=function(){return O.a.get("token")},f=function(){O.a.remove("token")},m=function(e){O.a.set("token",e.token)},x=n(1),p=function(){f(),window.location.reload(!1)},g=function(){return Object(x.jsx)("div",{"data-testid":"MainNavbar",children:Object(x.jsx)(o.a,{color:"primary",children:Object(x.jsxs)(u.a,{style:{justifyContent:"space-evenly"},children:[Object(x.jsx)(j.a,{variant:"h2",style:{width:"75%",fontWeight:"bolder",fontStyle:"italic"},children:"ADTAA"}),Object(x.jsx)(l.a,{color:"default",variant:"contained",component:d.b,to:"/",children:"Assistant"}),Object(x.jsx)(l.a,{color:"default",variant:"contained",component:d.b,to:"/setup",children:"Setup"}),h()?Object(x.jsx)(l.a,{color:"default",variant:"contained",onClick:p,children:"Logout"}):Object(x.jsx)(l.a,{color:"default",variant:"contained",component:d.b,to:"/login",children:"Login"})]})})})};g.defaultProps={};var v=g,S=n(37),y=n(4),C=n(265),w=n(262),_=n(263),k=n(264),T=n(80),P=n(38),E=n.n(P),I=n(78),D=n(43),q=n.n(D),A="/api/",N="".concat(A,"discipline/"),W="".concat(A,"instructor/"),L=("".concat(A,"timeslot/"),"".concat(A,"section/")),R="".concat(A,"course/"),F="".concat(A,"solution/"),M="".concat(A,"solution/constraintmap/"),z="".concat(A,"auth/token/"),B="".concat(A,"registrationrequest/create/"),J="".concat(A,"auth/changepassword/"),G="".concat(A,"changes/"),U="".concat(A,"writeaccess/");function Y(e){if(401===e.status&&h()&&f(),e.status>=400&&e.status<600)throw new Error("".concat(e.status," - ").concat(e.statusText))}var H=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n={},c="POST"===e.method||"PUT"===e.method,i=h();return c||i?(c&&(n["Content-Type"]="application/json"),i&&!t&&(n.Authorization="Token ".concat(i)),e.headers=n,e):e},Q={authenticate:function(){var e=Object(I.a)(q.a.mark((function e(t,n){var c,i;return q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c={method:"POST",body:JSON.stringify({username:t,password:n})},e.next=3,fetch(z,H(c,!0));case 3:return Y(i=e.sent),e.abrupt("return",i.json());case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),get:function(){var e=Object(I.a)(q.a.mark((function e(t){var n,c;return q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={method:"GET"},e.next=3,fetch(t,H(n));case 3:return Y(c=e.sent),e.abrupt("return",c.json());case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),post:function(){var e=Object(I.a)(q.a.mark((function e(t,n){var c,i,a,s=arguments;return q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=s.length>2&&void 0!==s[2]&&s[2],i={method:"POST",body:JSON.stringify(n)},e.next=4,fetch(t,H(i,c));case 4:return Y(a=e.sent),e.abrupt("return",a.json());case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),put:function(){var e=Object(I.a)(q.a.mark((function e(t,n){var c,i,a,s=arguments;return q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=!(s.length>2&&void 0!==s[2])||s[2],i={method:"PUT",body:JSON.stringify(n)},c&&(t+=n.id.toString()),e.next=5,fetch(t,H(i));case 5:return Y(a=e.sent),e.abrupt("return",t===J?a:a.json());case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),delete:function(){var e=Object(I.a)(q.a.mark((function e(t,n){var c,i;return q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c={method:"DELETE"},e.next=3,fetch(t+n.toString(),H(c));case 3:return Y(i=e.sent),e.abrupt("return",i);case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},K=Q,V=n(127),X=n.n(V),Z=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"h3";return Object(x.jsx)(j.a,{variant:t,style:{color:X()().palette.primary,fontWeight:"bold",marginBottom:"0.5em"},children:e})},$=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"current";return Object(x.jsxs)(j.a,{children:["Your account is not authorized to access the ",e," page. Only administrators can make changes to this information. If you believe you should have access to this page, please contact an administrator or supervisor to correct this."]})},ee=n(219),te=n(273),ne=n(259),ce=n(260),ie=n(261),ae=function(e){var t=e.open,n=e.setOpen,c=e.message,i=function(){return n(!1)};return Object(x.jsx)("div",{"data-testid":"ErrorDialog",children:Object(x.jsxs)(te.a,{open:t,onClose:i,children:[Object(x.jsx)(ne.a,{children:"Error"}),Object(x.jsx)(ce.a,{children:c}),Object(x.jsx)(ie.a,{children:Object(x.jsx)(l.a,{variant:"contained",color:"primary",onClick:i,children:"Ok"})})]})})};ae.defaultProps={};var se=ae,re=function(){var e=Object(c.useState)(!1),t=Object(y.a)(e,2),n=t[0],i=t[1],a=Object(c.useState)(!1),s=Object(y.a)(a,2),r=s[0],o=s[1],u=Object(c.useState)(!1),b=Object(y.a)(u,2),O=b[0],h=b[1],f=Object(c.useState)(!1),m=Object(y.a)(f,2),p=m[0],g=m[1],v=Object(c.useState)([]),P=Object(y.a)(v,2),I=P[0],D=P[1],q=Object(c.useState)([]),A=Object(y.a)(q,2),N=A[0],R=A[1],z=Object(c.useState)([]),B=Object(y.a)(z,2),J=B[0],U=B[1],Y=Object(c.useState)({}),H=Object(y.a)(Y,2),Q=H[0],V=H[1],X=Object(c.useState)(!1),te=Object(y.a)(X,2),ne=te[0],ce=te[1],ie=Object(c.useState)(""),ae=Object(y.a)(ie,2),re=ae[0],oe=ae[1],ue=function(){o(!1),g(!0),D([]),K.post(F).then((function(e){e&&D(e)}),je).finally((function(){o(!0),g(!1),h(!1)}))},le=function(e){var t=0,n=0,c=[],i={};N.forEach((function(n){var c=e.assignments.filter((function(e){return e.instructor===n.id}));c.length>n.maxSections&&(t+=1),i[n.id]=c.map((function(e){return e.section}))})),e.assignments.forEach((function(e){if(null!=e.instructor){Q.discipline_overlap_map[e.section].includes(e.instructor)||(n+=1);var t=Q.section_overlap_map[e.section];i[e.instructor].some((function(e){return t.includes(e)}))&&c.push(e.instructor)}}));var a=new Set(c).size,s="";return t&&(s+="".concat(t," instructor").concat(t<2?"":"s"," assigned over limit, ")),n&&(s+="".concat(n," assignment").concat(n<2?"":"s"," with unqualified instructors, ")),a&&(s+="".concat(a," instructor").concat(a<2?"":"s"," with schedule conflicts, ")),s.length>0?s.slice(0,-2):"None"},je=function(e){"403"===e.message.slice(0,3)?i(!0):(oe(e.message),ce(!0))};return Object(c.useEffect)((function(){Promise.all([K.get(F),K.get(W),K.get(L),K.get(M),K.get(G)]).then((function(e){D(e[0]),R(e[1]),U(e[2]),V(e[3]),h(e[4].data_changed),o(!0)})).catch(je)}),[]),n?Object(x.jsxs)("div",{children:[Z("Generated Schedules"),$("scheduler")]}):Object(x.jsxs)("div",{"data-testid":"AssistantPage",children:[Z("Generated Schedules"),p&&Object(x.jsx)(j.a,{children:"Please wait for the scheduler to finish, this step can take several minutes."}),r?function(){var e=Object(x.jsx)("br",{});return 0===N.length||0===J.length?e=Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(j.a,{children:"Welcome to ADTAA! To get started, classes and instructors must be defined to generate schedules from. Please use the button below to go to the setup page."}),Object(x.jsx)("br",{}),Object(x.jsx)(l.a,{color:"primary",variant:"contained",component:d.b,to:"/setup",children:"Go to Setup"})]}):0===I.length&&(e=Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(j.a,{children:"No solutions have been generated."}),Object(x.jsx)("br",{}),Object(x.jsx)(l.a,{variant:"contained",color:"primary",onClick:ue,children:"Run Scheduler"})]})),e}():Object(x.jsx)(ee.a,{}),r&&O&&I.length>0&&Object(x.jsxs)(w.a,{variant:"outlined",style:{margin:"auto auto 1rem auto",width:"60%"},children:[Object(x.jsx)(_.a,{children:Object(x.jsx)(j.a,{children:"These solutions were generated with data that has been modified, and could be invalid. Click this button to re-run the scheduler!"})}),Object(x.jsx)(k.a,{children:Object(x.jsx)(l.a,{variant:"contained",color:"primary",style:{margin:"auto"},onClick:ue,children:"Run Scheduler"})})]}),r&&Object(x.jsx)(C.a,{container:!0,alignItems:"center",justifyContent:"center",children:function(){var e,t=[],n=1,c=Object(S.a)(I.slice(0,12));try{for(c.s();!(e=c.n()).done;){var i=e.value,a=i.assignment_count===i.assignments.length?"5px #008800 solid":"1px black solid";t.push(Object(x.jsxs)(w.a,{variant:"outlined",style:{width:"20%",margin:"1em",border:a},children:[Object(x.jsxs)(_.a,{children:[Object(x.jsxs)(j.a,{children:["Option ",n]}),Object(x.jsxs)(j.a,{children:["Covered Classes: ",i.assignment_count,"/",i.assignments.length]}),Object(x.jsxs)(j.a,{children:["Issues: ",le(i)]})]}),Object(x.jsx)(k.a,{children:Object(x.jsx)(T.a,{style:{marginLeft:"auto"},component:d.b,to:"/edit/".concat(i.id),children:Object(x.jsx)(E.a,{})})})]},i.id)),n+=1}}catch(s){c.e(s)}finally{c.f()}return t}()}),Object(x.jsx)(se,{open:ne,setOpen:ce,message:re})]})};re.defaultProps={};var oe=re,ue=n(270),le=n(221),je=n(268),de=n(269),be=n(65),Oe=n.n(be),he=n(64),fe=n.n(he),me=n(220),xe=n(222),pe=n(13),ge=n(135),ve=n(47),Se=n(277),ye=function(e){var t=e.row,n=e.setRow,i=e.disciplines,a=Object(c.useState)(""),s=Object(y.a)(a,2),r=s[0],o=s[1];return Object(x.jsxs)(C.a,{container:!0,alignItems:"center",justifyContent:"center",spacing:2,children:[Object(x.jsx)(C.a,{item:!0,children:Object(x.jsx)(ge.a,{id:"lastNameInput",label:"Last Name",required:!0,inputProps:{maxLength:30},type:"text",value:t.lastName||"",onChange:function(e){return n(Object(pe.a)(Object(pe.a)({},t),{},{lastName:e.target.value}))}})}),Object(x.jsx)(C.a,{item:!0,children:Object(x.jsx)(ge.a,{id:"maxSectionsInput",label:"Max Sections",required:!0,inputProps:{inputMode:"numeric",pattern:"[0-9]*",maxLength:2},type:"text",value:t.maxSections||"",onChange:function(e){return n(Object(pe.a)(Object(pe.a)({},t),{},{maxSections:e.target.value.replace(/[^0-9]/g,"")}))}})}),Object(x.jsx)(C.a,{item:!0,children:Object(x.jsx)(ge.a,{id:"qualificationsSelect",select:!0,label:"Qualifications",style:{minWidth:150},value:r,onChange:function(e){return o(e.target.value)},children:i.filter((function(e){return t.qualifications.findIndex((function(t){return t.id===e.id}))<0})).map((function(e){return Object(x.jsx)(ve.a,{value:e,children:e.name},e.name)}))})}),Object(x.jsx)(C.a,{item:!0,children:Object(x.jsx)(l.a,{variant:"contained",color:"default",onClick:function(){return n(Object(pe.a)(Object(pe.a)({},t),{},{qualifications:t.qualifications.concat([r])}))},children:"Add"})}),Object(x.jsx)(C.a,{item:!0,xs:12,children:t.qualifications.map((function(e){return Object(x.jsx)(Se.a,{label:e.name,onDelete:function(){return n(Object(pe.a)(Object(pe.a)({},t),{},{qualifications:t.qualifications.filter((function(t){return t.id!==e.id}))}))}})}))})]})},Ce=function(e){var t=e.create,n=e.open,i=e.setOpen,a=e.row,s=e.disciplines,r=e.setInstructors,o=e.errorDialog,u=Object(c.useState)({lastName:null,maxSections:null,qualifications:[]}),j=Object(y.a)(u,2),d=j[0],b=j[1],O=t?"Create Instructor":"Edit Instructor",h=function(){return i(!1)};return Object(c.useEffect)((function(){n&&!t?b(a):n&&t&&b({lastName:null,maxSections:null,qualifications:[]})}),[n]),Object(x.jsx)("div",{"data-testid":"InstructorDialog",children:Object(x.jsxs)(te.a,{open:n,onClose:h,"aria-labelledby":"instructor-dialog",fullWidth:!0,maxWidth:"sm",children:[Object(x.jsx)(ne.a,{id:"instructor-dialog",children:O}),Object(x.jsx)(ce.a,{children:Object(x.jsx)(ye,{row:d,setRow:b,disciplines:s})}),Object(x.jsxs)(ie.a,{children:[Object(x.jsx)(l.a,{variant:"contained",onClick:h,color:"default",children:"Cancel"}),Object(x.jsx)(l.a,{variant:"contained",disabled:!d.lastName||!d.maxSections,onClick:function(){var e=Object(pe.a)(Object(pe.a)({},d),{},{qualifications:d.qualifications.map((function(e){return e.id}))});t?K.post(W,e).then((function(e){r((function(t){return t.concat([Object(pe.a)(Object(pe.a)({},e),{},{qualifications:d.qualifications})])}))}),(function(e){return o(e.message)})).finally(h):K.put(W,e).then((function(){r((function(e){var t=e.findIndex((function(e){return e.id===d.id})),n=e.slice(0);return n[t]=d,n}))}),(function(e){return o(e.message)})).finally(h)},color:"primary",children:"Submit"})]})]})})};Ce.defaultProps={};var we=Ce,_e=n(131),ke=function(e){var t=e.instructors,n=e.setInstructors,i=e.disciplines,a=e.writeAuthorized,s=e.errorDialog,r=Object(c.useState)({}),o=Object(y.a)(r,2),u=o[0],l=o[1],j=Object(c.useState)(!1),d=Object(y.a)(j,2),b=d[0],O=d[1],h=Object(c.useState)(!1),f=Object(y.a)(h,2),m=f[0],p=f[1];return Object(x.jsxs)("div",{"data-testid":"InstructorList",children:[Object(x.jsxs)(me.a,{style:{border:"1px #0000001f solid"},children:[function(){var e,c=[],i=Object(S.a)(t);try{var r=function(){var i=e.value;c.push(Object(x.jsxs)(le.a,{children:[Object(x.jsx)(je.a,{primary:i.lastName,secondary:"Assignment Limit: "+i.maxSections.toString()}),a&&Object(x.jsxs)(de.a,{children:[Object(x.jsx)(_e.a,{title:"Edit Instructor",placement:"left",children:Object(x.jsx)(T.a,{edge:"end","aria-label":"edit-instructor",onClick:function(){return function(e){l(e),p(!0)}(i)},children:Object(x.jsx)(E.a,{})})}),Object(x.jsx)(_e.a,{title:"Delete Instructor",placement:"right",children:Object(x.jsx)(T.a,{edge:"end","aria-label":"delete-instructor",onClick:function(){K.delete(W,i.id).then((function(){n(t.filter((function(e){return e.id!==i.id})))}),(function(e){return s(e.message)}))},children:Object(x.jsx)(fe.a,{})})})]})]},i.id)),c.push(Object(x.jsx)(ue.a,{},"divider-".concat(i.id)))};for(i.s();!(e=i.n()).done;)r()}catch(o){i.e(o)}finally{i.f()}return c}(),a&&Object(x.jsxs)(le.a,{button:!0,onClick:function(){return O(!0)},children:[Object(x.jsx)(xe.a,{children:Object(x.jsx)(Oe.a,{})}),Object(x.jsx)(je.a,{primary:"Add New"})]},"addRow")]}),a&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(we,{create:!0,open:b,setOpen:O,errorDialog:s,disciplines:i,setInstructors:n}),Object(x.jsx)(we,{open:m,setOpen:p,row:u,errorDialog:s,disciplines:i,setInstructors:n})]})]})};ke.defaultProps={};var Te=ke,Pe={"Mon.":"Monday","Tue.":"Tuesday","Wed.":"Wednesday","Thu.":"Thursday","Fri.":"Friday","Sat.":"Saturday","Sun.":"Sunday"},Ee="Successfully submitted registration request. You will receive an email when your request has been processed.",Ie="Wrong email or password, please try again.",De="Could not process request. Please ensure email address is valid and password is not blank.",qe=function(e){return e.begin_time.length>5&&(e.begin_time=e.begin_time.slice(0,-3)),e.end_time.length>5&&(e.end_time=e.end_time.slice(0,-3)),"".concat(e.meetingDays," ").concat(e.begin_time,"-").concat(e.end_time)},Ae=function(e){return Number(e.split(":")[0])+Number(e.split(":")[1]/60)},Ne=n(156),We=n.n(Ne),Le=n(155),Re=n.n(Le),Fe=n(6),Me=function(e){var t=e.row,n=e.classes,i=Object(c.useState)(-1),a=Object(y.a)(i,2),s=a[0],r=a[1];Object(c.useEffect)((function(){var e=n.filter((function(e){return e.course.id===t.id}));e.length>0&&r(e[0].id)}),[]);var o=Object(Fe.a)({root:{textAlign:"center"}})(je.a),u=function(e){if(e.id!==s)return[];var t,n=[],c=Object(S.a)(e.meetingTimes);try{for(c.s();!(t=c.n()).done;){var i=t.value,a=qe(i);n.push(Object(x.jsx)(le.a,{children:Object(x.jsx)(o,{primary:a})},i.id))}}catch(r){c.e(r)}finally{c.f()}return n};return Object(x.jsx)(C.a,{container:!0,alignItems:"center",justifyContent:"center",spacing:2,children:Object(x.jsx)(C.a,{item:!0,xs:12,children:function(){var e=[];return n&&(e=n.filter((function(e){return e.course.id===t.id})).map((function(e){return Object(x.jsxs)("div",{children:[Object(x.jsxs)(le.a,{button:!0,onClick:function(){return r(e.id)},children:[(t=e.id,s===t?Object(x.jsx)(xe.a,{children:Object(x.jsx)(Re.a,{})}):Object(x.jsx)(xe.a,{children:Object(x.jsx)(We.a,{})})),Object(x.jsx)(je.a,{primary:"Section ".concat(e.id),secondary:"".concat(e.meetingTimes.length," time slot(s)")})]}),Object(x.jsx)(me.a,{children:u(e)})]},e.id);var t}))),e}()})})},ze=function(e){var t=e.row,n=e.setRow,i=e.classes,a=e.setClasses,s=e.disciplines,r=e.create,o=Object(c.useState)(""),u=Object(y.a)(o,2),b=u[0],O=u[1];return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(j.a,{variant:"h6",style:{textAlign:"center"},children:"Course"}),Object(x.jsxs)(C.a,{container:!0,alignItems:"center",justifyContent:"center",spacing:2,children:[Object(x.jsx)(C.a,{item:!0,children:Object(x.jsx)(ge.a,{label:"Course Title",required:!0,value:t.course_title||"",inputProps:{maxLength:55},type:"text",onChange:function(e){return n(Object(pe.a)(Object(pe.a)({},t),{},{course_title:e.target.value}))}})}),Object(x.jsx)(C.a,{item:!0,children:Object(x.jsx)(ge.a,{label:"Course Number",required:!0,value:t.course_number||"",inputProps:{inputMode:"numeric",pattern:"[0-9]*",maxLength:4},type:"text",onChange:function(e){return n(Object(pe.a)(Object(pe.a)({},t),{},{course_number:e.target.value}))}})}),Object(x.jsx)(C.a,{item:!0,children:Object(x.jsx)(ge.a,{select:!0,label:"Subject Disciplines",style:{minWidth:160},value:b,onChange:function(e){return O(e.target.value)},children:s.filter((function(e){return t.subject_disciplines.findIndex((function(t){return t.id===e.id}))<0})).map((function(e){return Object(x.jsx)(ve.a,{value:e,children:e.name},e.name)}))})}),Object(x.jsx)(C.a,{item:!0,children:Object(x.jsx)(l.a,{variant:"contained",color:"default",onClick:function(){return n(Object(pe.a)(Object(pe.a)({},t),{},{subject_disciplines:t.subject_disciplines.concat([b])}))},children:"Add"})}),Object(x.jsx)(C.a,{item:!0,xs:12,children:t.subject_disciplines.map((function(e){return Object(x.jsx)(Se.a,{label:e.name,onDelete:function(){return n(Object(pe.a)(Object(pe.a)({},t),{},{subject_disciplines:t.subject_disciplines.filter((function(t){return t.id!==e.id}))}))}},e.id)}))})]}),!r&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)(j.a,{variant:"h6",style:{textAlign:"center",marginTop:"1rem",marginLeft:"-56px"},children:[Object(x.jsx)(_e.a,{title:"Edit Sections",placement:"left",children:Object(x.jsx)(T.a,{component:d.b,to:"/setup/".concat(t.id),children:Object(x.jsx)(E.a,{})})}),"Sections"]}),Object(x.jsx)(Me,{row:t,classes:i,setClasses:a})]})]})},Be=function(e){var t=e.create,n=e.open,i=e.setOpen,a=e.row,s=e.setCourses,r=e.classes,o=e.setClasses,u=e.disciplines,j=e.setSelected,d=e.setEditOpen,b=e.errorDialog,O=Object(c.useState)({course_title:"",course_number:null,subject_disciplines:[]}),h=Object(y.a)(O,2),f=h[0],m=h[1],p=t?"Create Class":"Edit Class",g=function(){return i(!1)};return Object(c.useEffect)((function(){n&&!t?m(a):n&&t&&m({course_title:"",course_number:null,subject_disciplines:[]})}),[n]),Object(x.jsx)("div",{"data-testid":"ClassDialog",children:Object(x.jsxs)(te.a,{open:n,onClose:g,"aria-labelledby":"instructor-dialog",fullWidth:!0,maxWidth:"sm",children:[Object(x.jsx)(ne.a,{id:"instructor-dialog",children:p}),Object(x.jsx)(ce.a,{children:Object(x.jsx)(ze,{row:f,setRow:m,classes:r,setClasses:o,disciplines:u,create:t})}),Object(x.jsxs)(ie.a,{children:[Object(x.jsx)(l.a,{variant:"contained",onClick:g,color:"default",children:"Cancel"}),Object(x.jsx)(l.a,{variant:"contained",onClick:function(){var e=Object(pe.a)(Object(pe.a)({},f),{},{subject_disciplines:f.subject_disciplines.map((function(e){return e.id}))});t?K.post(R,e).then((function(e){var t=Object(pe.a)(Object(pe.a)({},e),{},{subject_disciplines:f.subject_disciplines});s((function(e){return e.concat([t])})),j(t),d(!0)}),(function(e){return b(e.message)})).finally(g):K.put(R,e).then((function(e){s((function(e){var t=e.findIndex((function(e){return e.id===f.id})),n=e.slice(0);return n[t]=f,n}))}),(function(e){return b(e.message)})).finally(g)},color:"primary",disabled:!f.course_title||!f.course_number,children:"Submit"})]})]})})};Be.defaultProps={};var Je=Be,Ge=function(e){var t=e.classes,n=e.setClasses,i=e.courses,a=e.setCourses,s=e.disciplines,r=e.writeAuthorized,o=e.errorDialog,u=Object(c.useState)({}),l=Object(y.a)(u,2),j=l[0],d=l[1],b=Object(c.useState)(!1),O=Object(y.a)(b,2),h=O[0],f=O[1],m=Object(c.useState)(!1),p=Object(y.a)(m,2),g=p[0],v=p[1];return Object(x.jsxs)("div",{"data-testid":"ClassList",children:[Object(x.jsxs)(me.a,{style:{border:"1px #0000001f solid"},children:[function(){var e,n=[],c=Object(S.a)(i);try{var s=function(){var c=e.value,i=t.filter((function(e){return e.course.id===c.id})),s=i.map((function(e){return e.meetingTimeString}));n.push(Object(x.jsxs)(le.a,{children:[Object(x.jsx)(je.a,{primary:"CPSC "+c.course_number+" - "+c.course_title,secondary:i.length.toString()+" Section(s) - "+s.join(" | ")}),r&&Object(x.jsxs)(de.a,{children:[Object(x.jsx)(_e.a,{title:"Edit Course",placement:"left",children:Object(x.jsx)(T.a,{edge:"end",onClick:function(){return function(e){d(e),v(!0)}(c)},children:Object(x.jsx)(E.a,{})})}),Object(x.jsx)(_e.a,{title:"Delete Course",placement:"right",children:Object(x.jsx)(T.a,{edge:"end",onClick:function(){K.delete(R,c.id).then((function(e){a((function(e){return e.filter((function(e){return e.id!==c.id}))}))}),(function(e){return o(e.message)}))},children:Object(x.jsx)(fe.a,{})})})]})]},c.id)),n.push(Object(x.jsx)(ue.a,{},"divider-".concat(c.id)))};for(c.s();!(e=c.n()).done;)s()}catch(u){c.e(u)}finally{c.f()}return n}(),r&&Object(x.jsxs)(le.a,{button:!0,onClick:function(){return f(!0)},children:[Object(x.jsx)(xe.a,{children:Object(x.jsx)(Oe.a,{})}),Object(x.jsx)(je.a,{primary:"Add New"})]},"addRow")]}),r&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(Je,{create:!0,open:h,setOpen:f,setCourses:a,disciplines:s,setClasses:n,errorDialog:o,setSelected:d,setEditOpen:v}),Object(x.jsx)(Je,{open:g,setOpen:v,row:j,setCourses:a,disciplines:s,classes:t,setClasses:n,errorDialog:o})]})]})};Ge.defaultProps={};var Ue=Ge,Ye=function(){var e=Object(c.useState)(!1),t=Object(y.a)(e,2),n=t[0],i=t[1],a=Object(c.useState)(!0),s=Object(y.a)(a,2),r=s[0],o=s[1],u=Object(c.useState)(!1),l=Object(y.a)(u,2),j=l[0],d=l[1],b=Object(c.useState)([]),O=Object(y.a)(b,2),h=O[0],f=O[1],m=Object(c.useState)([]),p=Object(y.a)(m,2),g=p[0],v=p[1],S=Object(c.useState)([]),w=Object(y.a)(S,2),_=w[0],k=w[1],T=Object(c.useState)([]),P=Object(y.a)(T,2),E=P[0],I=P[1],D=Object(c.useState)(!1),q=Object(y.a)(D,2),A=q[0],F=q[1],M=Object(c.useState)(""),z=Object(y.a)(M,2),B=z[0],J=z[1],G=function(e){J(e),F(!0)},Y=function(e){"403"===e.message.slice(0,3)?i(!0):G(e.message)};return Object(c.useEffect)((function(){Promise.all([K.get(N),K.get(W),K.get(L),K.get(R)]).then((function(e){f(e[0]),v(e[1]),k(e[2]),I(e[3]),d(!0)}),Y),K.get(U).then((function(){}),(function(e){"403"===e.message.slice(0,3)&&o(!1)}))}),[]),n?Object(x.jsxs)("div",{"data-testid":"SetupPage",children:[Z("Setup Page"),$("setup")]}):Object(x.jsxs)("div",{"data-testid":"SetupPage",children:[Object(x.jsxs)(C.a,{container:!0,spacing:2,justifyContent:"center",children:[Object(x.jsxs)(C.a,{container:!0,item:!0,xs:5,direction:"column",children:[Z("Teaching Staff","h4"),Object(x.jsx)("div",{style:{padding:"1rem 5rem"},children:j?Object(x.jsx)(Te,{instructors:g,setInstructors:v,disciplines:h,writeAuthorized:r,errorDialog:G}):Object(x.jsx)(ee.a,{})})]}),Object(x.jsx)(ue.a,{orientation:"vertical",flexItem:!0}),Object(x.jsxs)(C.a,{container:!0,item:!0,xs:5,direction:"column",children:[Z("Class Roster","h4"),Object(x.jsx)("div",{style:{padding:"1rem 5rem"},children:j?Object(x.jsx)(Ue,{classes:_,setClasses:k,courses:E,setCourses:I,disciplines:h,writeAuthorized:r,errorDialog:G}):Object(x.jsx)(ee.a,{})})]})]}),Object(x.jsx)(se,{open:A,setOpen:F,message:B})]})};Ye.defaultProps={};var He=Ye,Qe=function(){var e=Object(c.useState)(!0),t=Object(y.a)(e,2),n=t[0],i=t[1],a=["root","admin","assistant"],s=Object(c.useState)(""),r=Object(y.a)(s,2),o=r[0],u=r[1],d=Object(c.useState)(""),b=Object(y.a)(d,2),O=b[0],h=b[1],f=Object(c.useState)(),p=Object(y.a)(f,2),g=p[0],v=p[1],S=Object(c.useState)(""),w=Object(y.a)(S,2),_=w[0],k=w[1],T=Object(c.useState)(""),P=Object(y.a)(T,2),E=P[0],I=P[1],D=function(e){u(""),h("");var t="ERROR: ";"400"===e.message.slice(0,3)&&(t+=n?Ie:De),"403"!==e.message.slice(0,3)||n||(t+="A registration request for that email is already being processed!"),k(t)};return Object(x.jsxs)("div",{"data-testid":"LoginPage",children:[Z(n?"Login":"Submit Registration Request"),Object(x.jsxs)("div",{style:{margin:"1rem"},children:[""!==_&&Object(x.jsx)(j.a,{color:"error",style:{fontWeight:"bold"},children:_}),""!==E&&Object(x.jsx)(j.a,{style:{fontWeight:"bold"},children:E})]}),n?Object(x.jsx)(x.Fragment,{children:Object(x.jsxs)(C.a,{container:!0,alignItems:"center",justifyContent:"center",spacing:2,children:[Object(x.jsx)(C.a,{item:!0,xs:12,children:Object(x.jsx)(ge.a,{required:!0,label:"Email",type:"text",value:o||"",onChange:function(e){return u(e.target.value)}})}),Object(x.jsx)(C.a,{item:!0,xs:12,children:Object(x.jsx)(ge.a,{required:!0,label:"Password",type:"password",value:O||"",onChange:function(e){return h(e.target.value)}})})]})}):Object(x.jsx)(x.Fragment,{children:Object(x.jsxs)(C.a,{container:!0,alignItems:"center",justifyContent:"center",spacing:2,children:[Object(x.jsx)(C.a,{item:!0,xs:12,children:Object(x.jsx)(ge.a,{required:!0,label:"Email",type:"text",value:o||"",onChange:function(e){return u(e.target.value)}})}),Object(x.jsx)(C.a,{item:!0,xs:12,children:Object(x.jsx)(ge.a,{select:!0,label:"Requested Access Level",style:{minWidth:200},onChange:function(e){return v(e.target.value)},children:a.map((function(e){return Object(x.jsx)(ve.a,{value:e,children:e},e)}))})}),Object(x.jsx)(C.a,{item:!0,xs:12,children:Object(x.jsx)(ge.a,{required:!0,label:"Requested Password",type:"password",value:O||"",onChange:function(e){return h(e.target.value)}})})]})}),Object(x.jsx)(l.a,{color:"primary",variant:"contained",style:{marginTop:"2em",marginRight:"1em"},onClick:function(){k(""),I(""),n?K.authenticate(o,O).then((function(e){m(e),window.location.reload(!1)}),(function(e){"404"===e.message.slice(0,3)?K.put(J,{username:"root",password:"root",new_password:O},!1).then((function(){K.authenticate("root",O).then((function(e){m(e),window.location.reload(!1)}),D)}),D):D(e)})):K.post(B,{contact_email:o,requested_password:O,access_level:g}).then((function(e){I(Ee)}),D),u(""),h("")},children:"Submit"}),Object(x.jsx)(l.a,{color:"default",variant:"contained",style:{marginTop:"2em"},onClick:function(){k(""),I(""),i(!n),u(""),h("")},children:n?"Register":"Return to Login"})]})};Qe.defaultProps={};var Ke=Qe,Ve=n(150),Xe=n(58),Ze=n(258),$e=n(271),et=Object(Ve.a)(Object(Xe.b)({palette:{primary:{main:"#800000"}}})),tt=(n(212),n(157)),nt=function(e){var t=e.open,n=e.setOpen,i=e.row,a=e.schedule,s=e.setSchedule,r=e.instructors,o=(e.sectionOverlapMap,e.disciplineMap,Object(c.useState)()),u=Object(y.a)(o,2),d=u[0],b=u[1],O=function(){return n(!1)};return Object(c.useEffect)((function(){null!=i&&b(i.instructor)}),[i]),Object(x.jsx)("div",{"data-testid":"EditAssignmentDialog",children:Object(x.jsxs)(te.a,{open:t,onClose:O,fullWidth:!0,maxWidth:"sm",children:[Object(x.jsx)(ne.a,{children:"Edit Assignment"}),Object(x.jsxs)(ce.a,{children:[null!=i&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)(j.a,{style:{textAlign:"center",fontWeight:"bold"},children:[i.course_number," ",i.course_title]}),Object(x.jsx)(j.a,{style:{textAlign:"center"},children:i.meetingTimeString})]}),null!=r.size&&Object(x.jsx)(ge.a,{select:!0,label:"Instructor",style:{minWidth:160},value:d,onChange:function(e){b(e.target.value)},children:Array.from(r.values()).map((function(e){return Object(x.jsx)(ve.a,{value:e.id,children:e.lastName},e.id)}))})]}),Object(x.jsxs)(ie.a,{children:[Object(x.jsx)(l.a,{variant:"contained",onClick:O,children:"Cancel"}),Object(x.jsx)(l.a,{variant:"contained",color:"primary",onClick:function(){var e=a.assignments,t=e.findIndex((function(e){return e.id===i.id}));e[t].instructor=d;var n=a;a.assignments=e,s(n),O()},disabled:!d,children:"Submit"})]})]})})};nt.defaultProps={};var ct=nt,it=n(275),at=n(272),st=function(){var e=Object(c.useState)(),t=Object(y.a)(e,2),n=(t[0],t[1]),i=Object(c.useState)(),a=Object(y.a)(i,2),s=a[0],o=a[1],u=Object(c.useState)({}),j=Object(y.a)(u,2),b=j[0],O=j[1],h=Object(c.useState)({}),f=Object(y.a)(h,2),m=f[0],p=f[1],g=Object(c.useState)({}),v=Object(y.a)(g,2),C=v[0],w=v[1],_=Object(c.useState)({}),k=Object(y.a)(_,2),P=k[0],I=k[1],D=Object(c.useState)(!1),q=Object(y.a)(D,2),A=q[0],N=q[1],R=Object(c.useState)(),z=Object(y.a)(R,2),B=z[0],J=z[1],G=Object(c.useState)(!1),U=Object(y.a)(G,2),Y=U[0],H=U[1],Q=Object(c.useState)(!1),V=Object(y.a)(Q,2),X=V[0],te=V[1],ne=Object(c.useState)(!1),ce=Object(y.a)(ne,2),ie=ce[0],ae=ce[1],re=Object(c.useState)(!1),oe=Object(y.a)(re,2),ue=oe[0],le=oe[1],je=Object(c.useState)(!1),de=Object(y.a)(je,2),be=de[0],Oe=de[1],he=Object(c.useState)(""),fe=Object(y.a)(he,2),me=fe[0],xe=fe[1],pe=Object(r.h)().solution_id,ge=function(e){"403"===e.message.slice(0,3)?te(!0):(xe(e.message),Oe(!0))},ve=[{field:"id",headerName:"ID",hide:!0},{field:"course_title",headerName:"Course",flex:1},{field:"course_number",hide:!0},{field:"meetingTimeString",headerName:"Meeting Times",flex:3},{field:"subject_disciplines",headerName:"Subject Disciplines",hide:!0},{field:"instructor_lastName",headerName:"Assigned Instructor",flex:1},{field:"Edit",renderCell:function(e){return Object(x.jsx)(T.a,{onClick:function(){J(e.row),N(!0),le(!0)},children:Object(x.jsx)(E.a,{})})},flex:.5}];if(Object(c.useEffect)((function(){Promise.all([K.get(F+pe.toString()),K.get(W),K.get(L),K.get(M)]).then((function(e){n(e[0]),o(e[0]),O(new Map(e[1].map((function(e){return[e.id,e]})))),p(new Map(e[2].map((function(e){return[e.id,e]})))),w(e[3].section_overlap_map),I(e[3].discipline_overlap_map),H(!0)})).catch(ge)}),[]),X)return Object(x.jsx)("div",{children:$()});return Object(x.jsxs)("div",{"data-testid":"EditSolution",children:[Object(x.jsxs)("div",{style:{marginBottom:"0.5rem",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"flex-end",width:"80vw",marginLeft:"auto",marginRight:"auto"},children:[Object(x.jsx)(l.a,{variant:"contained",style:{height:"36px"},component:d.b,to:"/",children:"Back"}),Z("Edit Solution"),Object(x.jsx)(l.a,{variant:"contained",style:{height:"36px"},color:"primary",disabled:!ue,onClick:function(){K.put("".concat(F).concat(pe),s,!1).then((function(e){ae(!0),le(!1),n(e),o(e)}),ge)},children:"Submit"})]}),Object(x.jsx)("div",{style:{height:"80vh",width:"80vw",margin:"auto"},children:Y?Object(x.jsx)(tt.a,{rows:function(e){var t=[];if(0!==m.size&&null!=m.size){var n,c=Object(S.a)(e);try{for(c.s();!(n=c.n()).done;){var i=n.value,a=m.get(i.section),s="Unassigned";null!=i.instructor&&(s=b.get(i.instructor).lastName),a&&t.push({id:i.id,course_title:a.course.course_title,course_number:a.course.course_number,meetingTimeString:a.meetingTimeString,instructor:i.instructor,instructor_lastName:s,subject_disciplines:a.course.subject_disciplines})}}catch(r){c.e(r)}finally{c.f()}}return t}(s.assignments),columns:ve,autoPageSize:!0}):Object(x.jsx)(ee.a,{})}),Y&&Object(x.jsx)(ct,{open:A,setOpen:N,row:B,schedule:s,setSchedule:o,instructors:b,sectionOverlapMap:C,disciplineMap:P}),Object(x.jsx)(se,{open:be,setOpen:Oe,message:me}),Object(x.jsx)(it.a,{open:ie,autoHideDuration:4e3,onClose:function(){return ae(!1)},children:Object(x.jsx)(at.a,{severity:"success",children:"Solution saved successfully"})})]})};st.defaultProps={};var rt=st,ot=function(e){var t=e.open,n=e.setOpen,i=e.onSubmit,a=Object(c.useState)({meetingDays:"Mon.",begin_time:"",end_time:""}),s=Object(y.a)(a,2),r=s[0],o=s[1],u=function(){return n(!1)};return Object(x.jsx)("div",{"data-testid":"CreateTimeSlotDialog",children:Object(x.jsxs)(te.a,{open:t,onClose:u,children:[Object(x.jsx)(ne.a,{children:"Create Time Slot"}),Object(x.jsx)(ce.a,{children:Object(x.jsx)("div",{children:Object(x.jsxs)(C.a,{container:!0,alignItems:"center",justifyContent:"center",spacing:2,children:[Object(x.jsx)(C.a,{item:!0,xs:4,children:Object(x.jsx)(ge.a,{select:!0,label:"Day",style:{minWidth:60},value:r.meetingDays,onChange:function(e){return o(Object(pe.a)(Object(pe.a)({},r),{},{meetingDays:e.target.value}))},children:Object.keys(Pe).map((function(e){return Object(x.jsx)(ve.a,{value:e,children:e},e)}))})}),Object(x.jsx)(C.a,{item:!0,xs:8,children:Object(x.jsx)(ge.a,{label:"Begin Time",type:"time",value:r.begin_time,onChange:function(e){return o(Object(pe.a)(Object(pe.a)({},r),{},{begin_time:e.target.value}))},InputLabelProps:{shrink:!0},inputProps:{step:60},fullWidth:!0})}),Object(x.jsx)(C.a,{item:!0,xs:8,children:Object(x.jsx)(ge.a,{label:"End Time",type:"time",value:r.end_time,onChange:function(e){return o(Object(pe.a)(Object(pe.a)({},r),{},{end_time:e.target.value}))},InputLabelProps:{shrink:!0},inputProps:{step:60},fullWidth:!0})})]})})}),Object(x.jsxs)(ie.a,{children:[Object(x.jsx)(l.a,{variant:"contained",onClick:u,children:"Cancel"}),Object(x.jsx)(l.a,{variant:"contained",color:"primary",disabled:""===r.begin_time||""===r.end_time,onClick:function(){i(r),n(!1),o({meetingDays:"Mon.",begin_time:"",end_time:""})},children:"Submit"})]})]})})};ot.defaultProps={};var ut=ot,lt=function(){var e=Object(c.useState)(),t=Object(y.a)(e,2),n=t[0],i=t[1],a=Object(c.useState)([]),s=Object(y.a)(a,2),o=s[0],u=s[1],b=Object(c.useState)(!1),O=Object(y.a)(b,2),h=O[0],f=O[1],m=Object(c.useState)(!1),p=Object(y.a)(m,2),g=p[0],v=p[1],S=Object(c.useState)(),C=Object(y.a)(S,2),w=C[0],_=C[1],k=Object(c.useState)(),P=Object(y.a)(k,2),I=P[0],D=P[1],q=Object(c.useState)(!1),A=Object(y.a)(q,2),N=A[0],W=A[1],F=Object(c.useState)(""),M=Object(y.a)(F,2),z=M[0],B=M[1],J=Object(c.useState)(!1),G=Object(y.a)(J,2),U=G[0],Y=G[1],H=Object(c.useState)(""),Q=Object(y.a)(H,2),V=Q[0],X=Q[1],te=Object(r.h)().course_id,ne=function(e){"403"===e.message.slice(0,3)?f(!0):(X("Encountered error: ".concat(e.message)),Y(!0))};Object(c.useEffect)((function(){Promise.all([K.get("".concat(R).concat(te)),K.get(L)]).then((function(e){i(e[0]),u(e[1].filter((function(t){return t.course.id===e[0].id}))),v(!0)}),ne)}),[]);var ce=function(){K.delete(L,w).then((function(e){u((function(e){return e.filter((function(e){return e.id!==w}))})),_(null)}),ne)},ie=function(e){ae(e)?K.put(L,e).then((function(e){u((function(t){var n=t.findIndex((function(e){return e.id===w})),c=t.slice(0);return c[n]=e,c})),console.log(w),console.log(o)}),ne):ne({message:"Section cannot have overlapping time slots."})},ae=function(e){var t=!0;return Object.keys(Pe).forEach((function(n){var c=e.meetingTimes.filter((function(e){return e.meetingDays===n}));if(c.length>0){var i=[];if(c.forEach((function(e){i.push([Ae(e.begin_time),Ae(e.end_time)])})),function(e,t){for(var n=0;n<e.length-1;n++)t(e[n],e[n+1])}(i=i.sort((function(e,t){return e[0]>t[1]?1:t[0]>e[1]?-1:0})),(function(e,n){n[0]<e[1]&&n[1]>e[0]&&(t=!1)})),!t)return t}})),t};return h?Object(x.jsx)("div",{children:$("edit section")}):Object(x.jsxs)("div",{"data-testid":"EditSection",children:[g?Object(x.jsxs)(x.Fragment,{children:[Z("Edit Sections (".concat(n.course_number," ").concat(n.course_title,")")),Object(x.jsx)(j.a,{style:{marginBottom:"1rem"},children:"Select a section to view/edit timeslots below."}),Object(x.jsxs)("div",{style:{marginBottom:"2rem"},children:[Object(x.jsx)(_e.a,{title:"Add New Section",placement:"left",children:Object(x.jsx)(T.a,{onClick:function(){B("create"),W(!0)},children:Object(x.jsx)(Oe.a,{})})}),Object(x.jsx)(ge.a,{select:!0,label:"Sections",style:{minWidth:240,margin:"auto 1rem"},value:w||"",onChange:function(e){return _(e.target.value)},children:o.map((function(e){return Object(x.jsx)(ve.a,{value:e.id,children:"Section ".concat(e.id)},e.id)}))}),Object(x.jsx)(_e.a,{title:"Remove Section from Course",placement:"right",children:Object(x.jsx)(T.a,{onClick:function(){ce()},children:Object(x.jsx)(fe.a,{})})})]}),Object(x.jsx)(ue.a,{}),null!=w&&Object(x.jsxs)(me.a,{style:{width:"25%",margin:"auto"},children:[function(){var e=[],t=o.find((function(e){return e.id===w}));if(null!=t){var n=t.meetingTimes;n.length>0&&n.forEach((function(t){e.push(Object(x.jsxs)(le.a,{children:[Object(x.jsx)(je.a,{primary:qe(t)}),Object(x.jsxs)(de.a,{children:[Object(x.jsx)(_e.a,{title:"Edit Timeslot",placement:"left",children:Object(x.jsx)(T.a,{onClick:function(){B("edit"),D(t.id),W(!0)},children:Object(x.jsx)(E.a,{})})}),Object(x.jsx)(_e.a,{title:"Remove Timeslot",placement:"right",children:Object(x.jsx)(T.a,{onClick:function(){D(t.id);var e=o.find((function(e){return w===e.id}));if(null!=e){var n=Object(pe.a)(Object(pe.a)({},e),{},{course:e.course.id,meetingTimes:e.meetingTimes.filter((function(e){return e.id!==t.id}))});0===n.meetingTimes.length?ce():ie(n)}},children:Object(x.jsx)(fe.a,{})})})]})]},t.id))}))}return e}(),Object(x.jsx)(_e.a,{title:"Add New Timeslot",children:Object(x.jsx)(T.a,{onClick:function(){B("add"),W(!0)},children:Object(x.jsx)(Oe.a,{})})})]}),Object(x.jsx)("div",{style:{marginTop:"2.5rem"},children:Object(x.jsx)(l.a,{variant:"contained",color:"primary",component:d.b,to:"/setup/",children:"Back to Setup"})}),Object(x.jsx)(ut,{open:N,setOpen:W,onSubmit:function(e){if(console.log(e),"create"===z)s=e,K.post(L,{course:n.id,meetingTimes:[s]}).then((function(e){u((function(t){return t.concat([e])})),_(e.id)}),ne);else if("add"===z){var t=o.find((function(e){return w===e.id}));if(null!=t){var c=Object(pe.a)(Object(pe.a)({},t),{},{course:t.course.id});c.meetingTimes.push(e),ie(c)}}else if("edit"===z){var i=o.find((function(e){return w===e.id}));if(null!=i){var a=Object(pe.a)(Object(pe.a)({},i),{},{course:i.course.id});e=Object(pe.a)(Object(pe.a)({},e),{},{id:I}),a.meetingTimes=a.meetingTimes.map((function(t){return t.id===I?e:t})),ie(a)}}else console.error("Time Slot Dialog submitted before action was set!");var s}})]}):Object(x.jsx)(ee.a,{}),Object(x.jsx)(se,{open:U,setOpen:Y,message:V})]})};lt.defaultProps={};var jt=lt;var dt,bt=(dt=function(){return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(v,{}),Object(x.jsx)("div",{className:"content",children:Object(x.jsxs)(r.d,{children:[Object(x.jsx)(r.b,{path:"/",element:h()?Object(x.jsx)(oe,{}):Object(x.jsx)(r.a,{to:"/login"})}),Object(x.jsx)(r.b,{path:"/edit/:solution_id",element:h()?Object(x.jsx)(rt,{}):Object(x.jsx)(r.a,{to:"/login"})}),Object(x.jsx)(r.b,{path:"/setup",element:h()?Object(x.jsx)(He,{}):Object(x.jsx)(r.a,{to:"/login"})}),Object(x.jsx)(r.b,{path:"/setup/:course_id",element:h()?Object(x.jsx)(jt,{}):Object(x.jsx)(r.a,{to:"/login"})}),Object(x.jsx)(r.b,{path:"/login",element:h()?Object(x.jsx)(r.a,{to:"/"}):Object(x.jsx)(Ke,{})})]})})]})},function(e){return Object(x.jsxs)(Ze.a,{theme:et,children:[Object(x.jsx)($e.a,{}),Object(x.jsx)(dt,Object(pe.a)({},e))]})}),Ot=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,278)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),c(e),i(e),a(e),s(e)}))};s.a.render(Object(x.jsx)(i.a.StrictMode,{children:Object(x.jsx)(d.a,{children:Object(x.jsx)(bt,{})})}),document.getElementById("root")),Ot()}},[[215,1,2]]]);
//# sourceMappingURL=main.5be218c7.chunk.js.map