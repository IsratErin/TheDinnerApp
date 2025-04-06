import { observer } from "mobx-react-lite";
import { SummaryView } from "/src/views/summaryView.jsx";
import { shoppingList } from "../utilities";

const Summary = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function SummaryRender(props){
        return <SummaryView people={props.model.numberOfGuests}
                            ingredients={shoppingList(props.model.dishes)}/>;
    }
);

export { Summary };