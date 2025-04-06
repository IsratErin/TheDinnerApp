import "/src/teacherFetch.js"; // protection against fetch() in infinite re-render
import { createElement } from "react";
import { createRoot } from "react-dom/client";
window.React = { createElement: createElement }; // needed in the lab because it works with both React and Vue
import { observable, reaction, configure } from "mobx";
configure({ enforceActions: "never" }); // we don't use Mobx actions
import { model } from "/src/DinnerModel.js";
import { ReactRoot } from "/src/reactjs/ReactRoot.jsx";
import { connectToPersistence } from "/src/firestoreModel.js";
import { reactive } from "vue";

const reactiveModel = observable(model);
const rootJSX = <ReactRoot model={reactiveModel} />;

// mount the app in the browser page. Test at http://localhost:8080/react.html
createRoot(document.getElementById("root")).render(rootJSX);

reactiveModel.doSearch({});

reaction(
  // return the value to observe (currentDishId)
  function observeIdACB() {
    return reactiveModel.currentDishId;
  },

  // trigger the side effect when currentDishId changes
  function sideEffectACB() {
    reactiveModel.currentDishEffect();
  }
);

connectToPersistence(reactiveModel, reaction);

// ------ for Lab debug purposes ----------
// making the model and somed example dishes available at the browser JavaScript Console
// import {dishesConst} from "/test/dishesConst.js";
window.myModel = reactiveModel;
// window.dishesConst= dishesConst;
// window.myModel.addToMenu(dishesConst[2]);
