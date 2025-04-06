import { observer } from "mobx-react-lite";
import { SidebarView } from "/src/views/sidebarView.jsx";


const Sidebar = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function SidebarRender(props){
        function handleChangeNoOfGuestACB(number){
            //debugger;
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

        return <SidebarView number={props.model.numberOfGuests}
                            dishes={props.model.dishes}
                            onNumberChange={handleChangeNoOfGuestACB}
                            wantThisDish= {handleCurrentDishACB}
                          removeThisDish= {removeACB} 
                            />;
    }
);

export { Sidebar };
