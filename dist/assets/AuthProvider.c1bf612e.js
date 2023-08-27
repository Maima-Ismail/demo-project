import{r as I,_ as U,C as V,F as x,g as z,a as B,b as $,c as j,L as P,S as M,d as G,i as K,e as E,f as W,s as A,G as q,T as X}from"./index-e24386e7.51d7a79b.js";import{o as y,c as k,F as H,a as Y,p as S,w as J,y as Z,cT as f}from"./index.ef6063b0.js";import{u as T}from"./useProjectStore.12a5a648.js";import{V as Q}from"./VBtn.c9ec373e.js";var ee="firebase",te="10.1.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */I(ee,te,"app");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}u.UNAUTHENTICATED=new u(null),u.GOOGLE_CREDENTIALS=new u("google-credentials-uid"),u.FIRST_PARTY=new u("first-party-uid"),u.MOCK_USER=new u("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _="10.1.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p=new G("@firebase/firestore");function oe(t,...e){if(p.logLevel<=P.DEBUG){const o=e.map(w);p.debug(`Firestore (${_}): ${t}`,...o)}}function se(t,...e){if(p.logLevel<=P.ERROR){const o=e.map(w);p.error(`Firestore (${_}): ${t}`,...o)}}function ne(t,...e){if(p.logLevel<=P.WARN){const o=e.map(w);p.warn(`Firestore (${_}): ${t}`,...o)}}function w(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(o){return JSON.stringify(o)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N(t="Unexpected state"){const e=`FIRESTORE (${_}) INTERNAL ASSERTION FAILED: `+t;throw se(e),new Error(e)}function F(t,e){t||N()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g="invalid-argument",R="failed-precondition";class h extends x{constructor(e,o){super(e,o),this.code=e,this.message=o,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e,o){this.user=o,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class ie{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,o){e.enqueueRetryable(()=>o(u.UNAUTHENTICATED))}shutdown(){}}class re{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,o){this.changeListener=o,e.enqueueRetryable(()=>o(this.token.user))}shutdown(){this.changeListener=null}}class ae{constructor(e){this.auth=null,e.onInit(o=>{this.auth=o})}getToken(){return this.auth?this.auth.getToken().then(e=>e?(F(typeof e.accessToken=="string"),new C(e.accessToken,new u(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(e,o){}shutdown(){}}class ce{constructor(e,o,s){this.t=e,this.i=o,this.o=s,this.type="FirstParty",this.user=u.FIRST_PARTY,this.u=new Map}l(){return this.o?this.o():null}get headers(){this.u.set("X-Goog-AuthUser",this.t);const e=this.l();return e&&this.u.set("Authorization",e),this.i&&this.u.set("X-Goog-Iam-Authorization-Token",this.i),this.u}}class le{constructor(e,o,s){this.t=e,this.i=o,this.o=s}getToken(){return Promise.resolve(new ce(this.t,this.i,this.o))}start(e,o){e.enqueueRetryable(()=>o(u.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ue{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class he{constructor(e){this.h=e,this.appCheck=null,e.onInit(o=>{this.appCheck=o})}getToken(){return this.appCheck?this.appCheck.getToken().then(e=>e?(F(typeof e.token=="string"),new ue(e.token)):null):Promise.resolve(null)}invalidateToken(){}start(e,o){}shutdown(){}}class m{constructor(e,o){this.projectId=e,this.database=o||"(default)"}static empty(){return new m("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof m&&e.projectId===this.projectId&&e.database===this.database}}function de(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":N()}function ge(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new h(g,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const o=de(t);throw new h(g,`Expected type '${e.name}', but it was: ${o}`)}}return t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var b,n;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n=b||(b={}))[n.OK=0]="OK",n[n.CANCELLED=1]="CANCELLED",n[n.UNKNOWN=2]="UNKNOWN",n[n.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",n[n.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",n[n.NOT_FOUND=5]="NOT_FOUND",n[n.ALREADY_EXISTS=6]="ALREADY_EXISTS",n[n.PERMISSION_DENIED=7]="PERMISSION_DENIED",n[n.UNAUTHENTICATED=16]="UNAUTHENTICATED",n[n.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",n[n.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",n[n.ABORTED=10]="ABORTED",n[n.OUT_OF_RANGE=11]="OUT_OF_RANGE",n[n.UNIMPLEMENTED=12]="UNIMPLEMENTED",n[n.INTERNAL=13]="INTERNAL",n[n.UNAVAILABLE=14]="UNAVAILABLE",n[n.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L=new Map;class D{constructor(e){var o,s;if(e.host===void 0){if(e.ssl!==void 0)throw new h(g,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(o=e.ssl)===null||o===void 0||o;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new h(g,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(i,d,r,a){if(d===!0&&a===!0)throw new h(g,`${i} and ${r} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=pe((s=e.experimentalLongPollingOptions)!==null&&s!==void 0?s:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new h(g,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new h(g,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new h(g,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,c){return s.timeoutSeconds===c.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class O{constructor(e,o,s,c){this._authCredentials=e,this._appCheckCredentials=o,this._databaseId=s,this._app=c,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new D({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new h(R,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new h(R,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new D(e),e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new ie;switch(s.type){case"firstParty":return new le(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new h(g,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(o){const s=L.get(o);s&&(oe("ComponentProvider","Removing Datastore"),L.delete(o),s.terminate())}(this),Promise.resolve()}}function _e(t,e){const o=typeof t=="object"?t:z(),s=typeof t=="string"?t:e||"(default)",c=B(o,"firestore/lite").getImmediate({identifier:s});if(!c._initialized){const i=$("firestore");i&&fe(c,...i)}return c}function fe(t,e,o,s={}){var c;const i=(t=ge(t,O))._getSettings(),d=`${e}:${o}`;if(i.host!=="firestore.googleapis.com"&&i.host!==d&&ne("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:d,ssl:!1})),s.mockUserToken){let r,a;if(typeof s.mockUserToken=="string")r=s.mockUserToken,a=u.MOCK_USER;else{r=j(s.mockUserToken,(c=t._app)===null||c===void 0?void 0:c.options.projectId);const l=s.mockUserToken.sub||s.mockUserToken.user_id;if(!l)throw new h(g,"mockUserToken must contain 'sub' or 'user_id' field!");a=new u(l)}t._authCredentials=new re(new C(r,a))}}(function(){(function(o){_=o})(`${M}_lite`),U(new V("firestore/lite",(e,{instanceIdentifier:o,options:s})=>{const c=e.getProvider("app").getImmediate(),i=new O(new ae(e.getProvider("auth-internal")),new he(e.getProvider("app-check-internal")),function(r,a){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new h(g,'"projectId" not provided in firebase.initializeApp.');return new m(r.options.projectId,a)}(c,o),c);return s&&i._setSettings(s),i},"PUBLIC").setMultipleInstances(!0)),I("firestore-lite","4.1.0",""),I("firestore-lite","4.1.0","esm2017")})();const me={apiKey:"AIzaSyBB0XqApTC2IffhAsZzr43A2qTFkzCRV-A",authDomain:"student-info-37c3d.firebaseapp.com",projectId:"student-info-37c3d",storageBucket:"student-info-37c3d.appspot.com",messagingSenderId:"68896003246",appId:"1:68896003246:web:a7a228cfcb0bc34cbf893f"},Ee=K(me);_e(Ee);const Ae={class:"d-flex justify-center flex-wrap gap-3"},ye={__name:"AuthProvider",setup(t){const c=[{icon:"fa-facebook",color:"#4267b2",login:async()=>{const i=T(),d=E(),r=new W;try{FB.getLoginStatus(function(a){if(a.status==="connected"){console.log("User is already logged in with Facebook");const l=a.authResponse.userID;i.setUser(l),f.push("/dashboards/analytics")}else A(d,r).then(l=>{const v=l.authResponse.userID;i.setUser(v),f.push("/dashboards/analytics"),console.log("User logged in with Facebook:",v)}).catch(l=>{console.log("Error in logging with Facebook",l)})})}catch(a){console.log("Error in checking Facebook login status",a)}}},{icon:"fa-google",color:"#dd4b39",login:async()=>{const i=T(),d=E(),r=new q;try{const l=(await A(d,r)).user;i.setUser(l),console.log("user:",l),f.push("/dashboards/analytics")}catch(a){console.log("Error logging in with Google",a)}}},{icon:"fa-twitter",color:"#1da1f2",login:async()=>{const i=T(),d=E(),r=new X;try{const l=(await A(d,r)).user;i.setUser(l),f.push("/dashboards/analytics"),console.log("user:",l)}catch(a){console.log("Error in logging with Twitter",a)}}}];return(i,d)=>(y(),k("div",Ae,[(y(),k(H,null,Y(c,r=>S(Q,{key:r.icon,icon:"",variant:"tonal",size:"38",color:r.color,class:"rounded",onClick:a=>r.login()},{default:J(()=>[S(Z,{size:"18",icon:r.icon},null,8,["icon"])]),_:2},1032,["color","onClick"])),64))]))}};export{ye as _};
