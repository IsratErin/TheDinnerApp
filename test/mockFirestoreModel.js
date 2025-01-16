let testing=true;
try{mocha}catch(e){testing=false;}
const X= TEST_PREFIX;
let module= Object.values(import.meta.glob("/src/firestoreModel.*s"))[0];
if(X)
    module=Object.values(import.meta.glob("/src/solved-firestoreModel.*s"))[0];
if(!module)
    throw new Error("firestoreModel missing");

import { executedBootstraps} from "./bootstrapUtils.js";

export const connectToFirebase=testing? function(model, watcher){
    executedBootstraps.current.firestoreState={model, watcher};
}:(await module()).connectToFirebase;
