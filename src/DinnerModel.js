/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
import { searchDishes, getDishDetails } from "./dishSource";
import { resolvePromise } from "./resolvePromise";

export const model = {
  numberOfGuests: 2,
  dishes: [],
  currentDishId: null, // null means "intentionally empty"
  currentDishPromiseState: {},
  searchParams: {},
  searchResultsPromiseState: {},

  doSearch(params) {
    const searchPromise = searchDishes(params);
    resolvePromise(searchPromise, this.searchResultsPromiseState);
  },

  setSearchQuery(query) {
    this.searchParams.query = query;
  },

  setSearchType(searchType) {
    this.searchParams.type = searchType;
  },

  currentDishEffect() {
    if (!this.currentDishId) {
      return;
    }
    const dishPromise = getDishDetails(this.currentDishId);
    resolvePromise(dishPromise, this.currentDishPromiseState);
  },

  setCurrentDishId(dishId) {
    if (!dishId) {
      return;
    }
    this.currentDishId = dishId;
    this.currentDishEffect(); // Trigger the side effect
  },

  setNumberOfGuests(number) {
    if (Number.isInteger(number) && number > 0) {
      this.numberOfGuests = number;
    } else {
      throw new Error("number of guests not a positive integer");
    }
  },

  addToMenu(dishToAdd) {
    // array spread syntax exercise
    // It sets this.dishes to a new array [   ] where we spread (...) the elements of the existing this.dishes
    this.dishes = [...this.dishes, dishToAdd];
  },

  // filter callback exercise
  removeFromMenu(dishToRemove) {
    function shouldWeKeepDishCB(dish) {
      return dish.id !== dishToRemove.id;
    }
    this.dishes = this.dishes.filter(shouldWeKeepDishCB);
  },

  // more methods will be added here, don't forget to separate them with comma!
};
