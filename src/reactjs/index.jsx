import "/src/teacherFetch.js"; // protection against fetch() in infinite re-render
import { createElement } from "react";
import { createRoot } from "react-dom/client";
window.React= {createElement:createElement}; // needed in the lab because it works with both React and Vue
import { observable, configure } from "mobx";
configure({ enforceActions: "never", });  // we don't use Mobx actions


const reactiveModel= "TODO, make a reactive model here";

// mount the app in the browser page. Test at http://localhost:8080/react.html
createRoot(document.getElementById('TODO')).render("Hello React world!");




// ------ for Lab debug purposes ----------
// making the model and somed example dishes available at the browser JavaScript Console
import {dishesConst} from "/test/dishesConst.js";
window.myModel= reactiveModel;
window.dishesConst= dishesConst;


