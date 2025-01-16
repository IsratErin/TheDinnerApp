import {testBootstrap} from "./bootstrapUtils";
import {expect} from "chai";
import { autorun } from "mobx";
import { watchEffect } from "vue";

describe("TW1.2.1 app mounting", function tw1_2() {
    this.timeout(200000);
    const frameworks= ["reactjs", "vuejs"];
    
    frameworks.forEach(function testMountACB(dir){
        const framework= dir==="reactjs"?"React":"Vue";
        
        const mountTest= framework+" bootstrapping mounts the UI in the '#root' element";
        it(mountTest+ " (mount to 'root' to enable)", async function(){
            const test= this;
            await testBootstrap(dir, async function(renderState){
                if(renderState.selector!=="#root")
                    test.skip();
                else
                    test._runnable.title=mountTest;
            });
        });
    });

    frameworks.forEach(function testModelPropACB(dir){
        const framework= dir==="reactjs"?"React":"Vue";
        const effect= dir==="reactjs"?autorun:watchEffect;
        
        it( framework+" bootstrapping defines a reactive model", async function(){
            const test= this;
            await testBootstrap(dir, async function(state){
                if(state.selector!=="#root")
                    test.skip();
                expect(state.modelState, "DinnerModel is correctly imported").to.be.ok;
                expect(state.myModel).to.be.ok;
                expect(state.myModel.testMarker, "the model defined by "+framework+" bootstrapping is a DinnerModel").to.equal(state.modelState.model.testMarker);

                let called;
                effect(function(){ called= true; return state.myModel.numberOfGuests; });
                called= false;
                state.myModel.numberOfGuests=5;
                await new Promise(resolve=>setTimeout(resolve));
                expect(called, "reactiveModel defined in " +framework+" bootstrapping must be reactive").to.be.ok;
            });
        });
    });

    
    frameworks.forEach(function testMountACB(dir){
        const framework= dir==="reactjs"?"React":"Vue";
        
        it(framework+" bootstrapping mounts "+framework+"Root passing the correct 'model' prop", async function(){
            const test= this;
            await testBootstrap(dir, async function(state){
                if(state.selector!=="#root")
                    test.skip();
                expect(state.initialized, framework+"Root is correctly imported").to.be.ok;
                expect(state.render, framework+"Root is mounted, instead of the hello world DIV").to.equal(framework+"Root mock render");
                expect(state.rootRendered?.model, "a prop called 'model' must be passed to "+framework+"Root").to.be.ok;
                expect(state.rootRendered?.model, "'model' prop passed to "+framework+"Root must be the reactive model").to.equal(state.myModel);
            });
        });
    });
    

});
