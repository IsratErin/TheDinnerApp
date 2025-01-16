import "/src/teacherFetch.js"; // protection against fetch() in infinite re-render
import { createApp, h, reactive } from "vue";
window.React= {createElement:h};  // needed in the lab because it works with both React and Vue

const reactiveModel= "TODO, make a reactive model here";

// mount the app in the browser page. Test at http://localhost:8080/vue.html
const app= createApp(function render(){ return "Hello Vue world!";});
app.mount('#TODO'); 





// ------ for Lab debug purposes ----------
// making the model and somed example dishes available at the browser JavaScript Console
import {dishesConst} from "/test/dishesConst.js";
window.myModel= reactiveModel;
window.dishesConst= dishesConst;
