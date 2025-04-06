import "/src/teacherFetch.js"; // protection against fetch() in infinite re-render
import { createElement } from "react";
import { createRoot } from "react-dom/client";
window.React= {createElement:createElement}; // needed in the lab because it works with both React and Vue
import { observable, configure } from "mobx";
configure({ enforceActions: "never", });  // we don't use Mobx actions

import {model} from "/src/DinnerModel.js";
import {ReactRoot} from "./ReactRoot.jsx";
//const reactiveModel= "TODO, make a reactive model here";
const reactiveModel= observable(model);

// mount the app in the browser page. Test at http://localhost:8080/react.html
createRoot(document.getElementById('root')).render(<ReactRoot model={reactiveModel} />);




// ------ for Lab debug purposes ----------
// making the model and somed example dishes available at the browser JavaScript Console
import {dishesConst} from "/test/dishesConst.js";
window.myModel= reactiveModel;
window.dishesConst= dishesConst;


