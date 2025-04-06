/* uncomment the export below to enable the 1.1.2 test suite! */
export function compareIngredientsCB(ingredientA, ingredientB){
    if(ingredientA.aisle < ingredientB.aisle){
        return -1; // Aisle of ingredientA comes before ingredient B
    } 
    if (ingredientA.aisle > ingredientB.aisle) {
        return 1; // Aisle of ingredientA comes after ingredientB
    }

    // If aisles are the same, compare name properties
    if (ingredientA.name < ingredientB.name){
        return -1; // Name of ingredientA comes before ingredientB
    }
    if (ingredientA.name > ingredientB.name){
        return 1; // Name of ingredientA comes after ingredientB
    }

    // If both aisle and name are equal, return 0
    return 0;
}

export function sortIngredients(ingredients){
    return [...ingredients].sort(compareIngredientsCB);
}

export function isKnownTypeCB(type){
    // Check if type is starter, main course or dessert
    return type === "starter" || type === "main course" || type === "dessert";
}

export function dishType(dish){
    // Check if dishTypes exist, if it doesn't return empty string
    if (!dish.dishTypes) {
        return "";
    }

    // Get the first known type from dishTypes array
    // If no known type found, return undefined
    const foundType = dish.dishTypes.find(isKnownTypeCB);

    // Return the found type if it exists, otherwise return empty string
    return foundType || "";
}

export function compareDishesCB(dishA, dishB){
    const sortingOrder = ["", "starter", "main course", "dessert"];

    // Get the index of the dish type in the sortingOrder array
    const indexA = sortingOrder.indexOf(dishType(dishA));
    const indexB = sortingOrder.indexOf(dishType(dishB));

    return indexA - indexB;
}

export function sortDishes(dishes){
    // returns a sorted clone of the original array
    return [...dishes].sort(compareDishesCB);
}

export function totalPriceCB(totalSum, currentItem){
    // Takes the total sum, starting from zero
    // Adds the pricePerServing for current item in the array
    // dishesArray is looped, adding each pricePerServing to totalSum
    return totalSum + currentItem.pricePerServing;
}

export function menuPrice(dishesArray){
    // Send the initial accumulator, 0, together with the next element in the array
    // Returns the total price once it has looped through entire array
    return dishesArray.reduce(totalPriceCB, 0);
}

/* 
  This function is already implemented as it is more JavaScript + algorithms than interaction programming

   Given a menu of dishes, generate a list of ingredients. 
   If an ingredient repeats in several dishes, it will be returned only once, with the amount added up 
   
   As this is not an algorithm course, the function is mostly written but you have 2 callback passing TODOs.
*/
export function shoppingList(dishes){
    const result={}; // object used as mapping between ingredient ID and ingredient object

    // we define the callback inside the function, though this is not strictly needed in this case. But see below.
    function keepJustIngredientsCB(dish){
        return dish.extendedIngredients;
    }
    
    // ingredientCB must be defined inside shopingList() because it needs access to `result`
    // you will often need to define a callback inside the function where it is used, so it has access to arguments and other variables
    function ingredientCB(ingredient){
        if(result[ingredient.id] === undefined){  // more general: !result[ingredient.id]
            // since result[ingredient.id] is not defined, it means that the ingredient is not taken into account yet
            // so we associate the ingredient with the ID
            result[ingredient.id]={...ingredient};
            
            // JS Notes about the line above:
            // 1)    result[ingredient.id] 
            // In JS object.property is the same as object["property"] but the second notation is more powerful because you can write
            // object[x]  where x=="property"
            
            // 2)    {...ingredient } creates a *copy* of the ingredient (object spread syntax)
            // we duplicate it because we will change the object below
        } else {
            // since result[ingredient.id] is not defined, it means that the ingredient has been encountered before.
            // so we add up the amount:
            result[ingredient.id].amount +=  ingredient.amount;
        }
    }

    const arrayOfIngredientArrays= dishes.map(keepJustIngredientsCB);
    const allIngredients= arrayOfIngredientArrays.flat();    
    allIngredients.forEach(ingredientCB);

    // Note: the 3 lines above can be written as a function chain:
    // dishes.map(callback1).flat().forEach(callback2);

    // now we transform the result object into an array: we drop the keys and only keep the values
    return Object.values(result);
}