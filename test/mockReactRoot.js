let testing=true;
try{mocha}catch(e){testing=false;}
const X= TEST_PREFIX;
let module= Object.values(import.meta.glob("/src/reactjs/ReactRoot.*sx"))[0];
if(X)
    module=Object.values(import.meta.glob("/src/reactjs/solved-ReactRoot.*sx"))[0];
if(!module)
    throw new Error("ReactRoot missing");

import { executedBootstraps} from "./bootstrapUtils.js";

if(testing)
    executedBootstraps.reactjs.initialized=true;
export const ReactRoot=testing? function(p){
    executedBootstraps.reactjs.rootRendered= p;
    return "ReactRoot mock render";
}:(await module()).ReactRoot;


