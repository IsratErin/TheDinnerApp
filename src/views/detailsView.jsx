export function DetailsView(props) {
  const totalPrice = props.dishData.pricePerServing * props.guests;

  function showButton() {
    function handleAddToMenuClickACB() {
      props.dishAddedCB(props.dishData);
      window.location.hash="#/search";
    }

    return (
      <button
        title="Add to menu"
        disabled={props.isDishInMenu}
        onClick={handleAddToMenuClickACB}
      >
        Add to menu
      </button>
    );
  }
  function navigateToSearchACB(){
    window.location.hash="#/search";
  }

  return (
    <div className="details-content">
      <button className="buttonPosition" onClick={navigateToSearchACB}>Cancel</button>
      <img className="details-image" src={props.dishData.image} height="100" alt={props.dishData.title} />
      <p>Price: {props.dishData.pricePerServing}</p>
      <p>For {props.guests} guests: {totalPrice}</p>
      <ul>
        {props.dishData.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name}: {ingredient.amount} {ingredient.unit}
          </li>
        ))}
      </ul>
      <div className="details-instructions">{props.dishData.instructions}</div>
      <a href={props.dishData.sourceUrl} className="recipe-link">Link to recipe</a>
      {showButton()}
    </div>
  );
}