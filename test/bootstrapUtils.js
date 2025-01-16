const X= TEST_PREFIX;
const solvedReact=Object.values(import.meta.glob("/src/reactjs/solved-index.*sx"))[0];
const solvedVue= Object.values(import.meta.glob("/src/vuejs/solved-index.*sx"))[0];
const react=Object.values(import.meta.glob("/src/reactjs/index.*sx"))[0];
const vue=Object.values(import.meta.glob("/src/vuejs/index.*sx"))[0];

const bootstraps= {
    reactjs: X?solvedReact:react,
    vuejs: X?solvedVue:vue
};

export const executedBootstraps={};

// seee mockReactRoot, mockVueRoot, mockFirestoreModel
export async function testBootstrap(framework, test){
    if(!executedBootstraps[framework]){
        executedBootstraps[framework]={};
        executedBootstraps.current= executedBootstraps[framework];
        
        const getEl= document.getElementById;
        const querySel= document.querySelector;
        
        let selector;
        const theDiv= document.createElement("div");
        document.getElementById= function(id){
            selector="#"+id;
            return theDiv;
        };
        
        document.querySelector=function(x){
            selector=x;
            return theDiv;
        };
        try{
            await bootstraps[framework]();
            await new Promise(resolve=>setTimeout(resolve));
            executedBootstraps[framework].selector= selector;
            executedBootstraps[framework].render= theDiv.innerHTML;
            executedBootstraps[framework].myModel= window.myModel;
            
            executedBootstraps[framework].modelState= executedBootstraps.modelState;
        }finally{
            document.getElementById= getEl;
            document.querySelector= querySel;
        }
    };
    
    return test(executedBootstraps[framework]);
}
