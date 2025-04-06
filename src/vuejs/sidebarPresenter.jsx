
import { SidebarView } from "/src/views/sidebarView.jsx";

export function Sidebar(props){
    function handleChangeNoOfGuestACB(number){
        props.model.setNumberOfGuests(number);

    }
    function handleCurrentDishACB(dish){
        props.model.setCurrentDishId(dish.id);
        //debugger;
        //props.model.addToMenu(dish);
    }
    function removeACB(dish){
       // debugger;
        props.model.removeFromMenu(dish);

    }
    return < SidebarView number={props.model.numberOfGuests}
                          dishes={props.model.dishes}
                          onNumberChange={handleChangeNoOfGuestACB}
                          wantThisDish= {handleCurrentDishACB}
                          removeThisDish= {removeACB} />;
                          
}