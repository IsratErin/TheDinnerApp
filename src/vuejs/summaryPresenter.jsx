import { SummaryView } from "/src/views/summaryView.jsx";
import {shoppingList} from "/src/utilities.js";
//"TODO call shoppingList imported from utilities, pass the model menu as parameter"
export function Summary(props){
    return <SummaryView people={props.model.numberOfGuests}
                        ingredients={ shoppingList(props.model.dishes)}/>;
}

