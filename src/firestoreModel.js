// initialize Firebase app
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig.js";
const app = initializeApp(firebaseConfig);

// initialize Firestore
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const db = getFirestore(app);

// make doc and setDoc available at the Console for testing
window.doc = doc;
window.setDoc = setDoc;
window.db = db;


const COLLECTION = "dinnerModel34";

// TODO: read the code above
// TODO: export the function connectToPersistence, it can be empty for starters

export function connectToPersistence(model, reaction) {
  const docRef = doc(db, COLLECTION, "dinnerModel34");

  if (!model.numberOfGuests) {
    model.numberOfGuests = 2;
  }

  if (!model.dishes) {
    model.dishes = [];
  }

  if (!model.currentDishId) {
    model.currentDishId = null;
  }

  if (!model.ready) {
    model.ready = false;
  }

  function onModelReadACB(doc) {
    model.ready = false;

    if (doc.data().numberOfGuests) {
      model.numberOfGuests = doc.data().numberOfGuests;
    }

    if (doc.data().dishes) {
      model.dishes = doc.data().dishes;
    }

    if (doc.data().currentDishId) {
      model.currentDishId = doc.data().currentDishId;
    }

    model.ready = true;
  }

  getDoc(docRef).then(onModelReadACB);

  reaction(
    // ACB1: observe the model properties
    function observeModelPropsACB() {
      return [model.numberOfGuests, model.dishes, model.currentDishId];
    },
    // ACB2: save to Firebase when properties change
    function saveToPersistenceACB() {
      if (model.ready && model.ready === true)
        return setDoc(
          docRef,
          {
            numberOfGuests: model.numberOfGuests,
            dishes: model.dishes,
            currentDishId: model.currentDishId,
          },
          { merge: true }
        );
    }
  );
}