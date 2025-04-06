import { sortDishes, menuPrice, dishType } from "../utilities.js";

export function SidebarView(props) {
  function showButton() {
    // If the number is less than or equal to 1, disable the button
    return (
      <button
        title="decrease"
        disabled={props.number <= 1}
        onClick={decreaseACB}
      >
        -
      </button>
    );
  }

  function increaseACB() {
    onNumberChange(props.number + 1);
  }

  function decreaseACB() {
    onNumberChange(props.number - 1);
  }

  function onNumberChange(newNumber) {
    props.onNumberChange(newNumber);
  }

  return (
    <div className="sidebar">
      <div className="guest-control">
        {showButton()}
        <span className="guest-number">{props.number}</span>
        <button title="increase" onClick={increaseACB}>
          +
        </button>
      </div>
      <table className="menu-table">
        <tbody>
          {sortDishes(props.dishes).map(dishesTableRowCB)}
          <tr className="total-row">
            <td></td>
            <td>Total:</td>
            <td></td>
            <td className="align-right">
              {(menuPrice(props.dishes) * props.number).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  function dishesTableRowCB(dish) {
    // Display the dish in a table row
    function xClickedACB() {
      props.removeDish(dish);
    }

    // Display the dish in a table row
    function clickDishACB() {
      props.dishClicked(dish);
    }

    return (
      <tr key={dish.id} className="menu-item">
        <td className="width">
          <button className="remove-button" onClick={xClickedACB}>
            X
          </button>
        </td>
        <td className="dishNameWidth">
          <a href="#/details" className="dish-link" onClick={clickDishACB}>
            {dish.title}
          </a>
        </td>
        <td className="width">{dishType(dish)}</td>
        {/* Display the price of the dish */}
        <td className="priceAlign-right">
          {(dish.pricePerServing * props.number).toFixed(2)}
        </td>
      </tr>
    );
  }
}
