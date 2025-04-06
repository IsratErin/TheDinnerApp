import { sortIngredients } from "/src/utilities.js";
import "/src/style.css";

/* Functional JSX component. Name must start with capital letter */
export function SummaryView(props) {
  function navigateToSearchACB() {
    window.location.hash = "#/search";
  }

  return (
    <div>
      <button className="buttonPosition" onClick={navigateToSearchACB}>
        Back to Search
      </button>
      {/* TW 1.2 note the syntax: {JS_expression_or_comment} */}
      Summary for <span title="nr guests">{props.people}</span> persons:
      {
        <table className="summary-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Aisle</th>
              <th>Quantity</th>
              <th>unit</th>
            </tr>
          </thead>
          <tbody>
            {
              //  <---- in JSX/HTML, with this curly brace, we go back to JavaScript
              // Here Array Rendering is used to generate a table row for each element of the ingredients prop (an array)
              sortIngredients(props.ingredients).map(ingredientTableRowCB)
            }
          </tbody>
        </table>
      }
    </div>
  );

  /* callback for Array Rendering in TW 1.3 */
  function ingredientTableRowCB(ingr) {
    return (
      <tr key={ingr.id}>
        <td>{ingr.name}</td>
        <td>{ingr.aisle}</td>
        <td className="align-right">
          {(ingr.amount * props.people).toFixed(2)}
        </td>
        <td>{ingr.unit}</td>
      </tr>
    );
  }
}
