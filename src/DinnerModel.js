/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
export const model = {  
    numberOfGuests: 2,
    dishes: [],
    currentDishId: null,  // null means "intentionally empty"

    setCurrentDishId(dishId){
        // this.someProperty= someValue
        this.currentDishId = dishId;
    },
    
    setNumberOfGuests(number){
        //debugger
        //this.numberOfGuests = number;
        if(number> 0){
            if (Number.isInteger(number)){
                this.numberOfGuests = number;
            }else{
                throw new Error("number of guests not a positive integer");
            }          
        }else{
            throw new Error("number of guests not a positive integer");
        }
          
    },
    
    addToMenu(dishToAdd){
        // array spread syntax exercise
        // It sets this.dishes to a new array [   ] where we spread (...) the elements of the existing this.dishes
        this.dishes= [...this.dishes, dishToAdd/* replace this comment */];
    },

    // filter callback exercise
    removeFromMenu(dishToRemove){
        function shouldWeKeepDishCB(dish){
            if(dish.id !== dishToRemove.id){
                return true;
               }
               return false;
            
        }
        this.dishes= this.dishes.filter(shouldWeKeepDishCB/* pass the callback */);
    },
   
 
    // more methods will be added here, don't forget to separate them with comma!
};

