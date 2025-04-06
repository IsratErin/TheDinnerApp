let testing=true;
try{mocha}catch(e){testing=false;}

const X= TEST_PREFIX;
let module= Object.values(import.meta.glob(`/src/DinnerModel.*s`))[0];
if(X)
    module=Object.values(import.meta.glob(`/src/solved-DinnerModel.*s`))[0];
if(!module)
    throw new Error("model missing");

import { executedBootstraps} from "./bootstrapUtils.js";

export const model=testing? {
    testMarker: "mock DinnerModel",
    currentDishId:null,
    doSearch(x){
        const obj=this;
        executedBootstraps.current.searchState={param:x, calledOnObject:this};
    },
    currentDishEffect(){
        executedBootstraps.current.effectState={ calledOnObject:this};
    },
    addToMenu(){}  // allow adding to the menu from bootstrapping
    
}:(await module()).model;

executedBootstraps.modelState={model};

