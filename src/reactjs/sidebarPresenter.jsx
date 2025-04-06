import { observer } from "mobx-react-lite";
import { SidebarView } from "../views/sidebarView.jsx";

const Sidebar = observer(
    function SidebarRender(props){
        function changeNumberOfGuestsACB(newNumber){
            props.model.setNumberOfGuests(newNumber);
        }

        function setDishACB(dish){
            props.model.setCurrentDishId(dish.id);
        }

        function removeDishACB(dish){
            props.model.removeFromMenu(dish);
        }

        return <SidebarView number={props.model.numberOfGuests} 
                            dishes={props.model.dishes}
                            onNumberChange={changeNumberOfGuestsACB}
                            dishClicked={setDishACB}
                            removeDish={removeDishACB}/>;
    }
);

export { Sidebar };