window.vueRootState={};

let testing=true;
try{mocha}catch(e){testing=false;}
const X= TEST_PREFIX;
let module= Object.values(import.meta.glob("/src/vuejs/VueRoot.*sx"))[0];
if(X)
    module=Object.values(import.meta.glob("/src/vuejs/solved-VueRoot.*sx"))[0];
if(!module)
    throw new Error("VueRoot missing");

let realModule;
if(!testing){
    realModule = await module();
}

import { executedBootstraps} from "./bootstrapUtils.js";

if(testing)
    executedBootstraps.vuejs.initialized=true;

export const VueRoot= testing? function(p){
    executedBootstraps.vuejs.rootRendered= p;
    return "VueRoot mock render";
}:realModule.VueRoot;

export const makeRouter=testing? function(){
    executedBootstraps.vuejs.makeRouterCalled= true;
    return function(){ window.vueRootState.routerInstalled= true;};
}:realModule.makeRouter;


