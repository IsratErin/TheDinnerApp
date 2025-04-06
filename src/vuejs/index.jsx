import "/src/teacherFetch.js"; // protection against fetch() in infinite re-render
import { createApp, h, reactive } from "vue";
window.React= {createElement:h};  // needed in the lab because it works with both React and Vue

import {VueRoot} from "./VueRoot.jsx";
import {model} from "/src/DinnerModel.js";
//const reactiveModel= "TODO, make a reactive model here";
const reactiveModel= reactive(model);

// mount the app in the browser page. Test at http://localhost:8080/vue.html
//const app= createApp(function render(){ return "Hello Vue world!";});
const app= createApp(function render(){ return <VueRoot model={reactiveModel} />});
app.mount("#root"); 





// ------ for Lab debug purposes ----------
// making the model and somed example dishes available at the browser JavaScript Console
import {dishesConst} from "/test/dishesConst.js";
window.myModel= reactiveModel;
window.dishesConst= dishesConst;
