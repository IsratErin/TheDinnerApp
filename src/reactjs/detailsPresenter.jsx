import { observer } from "mobx-react-lite";
import { DetailsView } from "/src/views/detailsView.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";

const Details = observer(function DetailsRender(props) {
  const currentDish = props.model.currentDishPromiseState.data;

  function findDishCB(dish) {
    return dish && dish.id === currentDish.id;
  }

  function handleAddToMenuACB() {
    props.model.addToMenu(currentDish);
  }
  
  if (currentDish) {
    return (
      <DetailsView
        dishData={currentDish}
        guests={props.model.numberOfGuests}
        isDishInMenu={props.model.dishes.find(findDishCB) !== undefined}
        dishAddedCB={handleAddToMenuACB}
      />
    );
  }
  
  return (
    <SuspenseView
      promise={props.model.currentDishPromiseState.promise}
      error={props.model.currentDishPromiseState.error}
    />
  );
});

export { Details };