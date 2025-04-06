import { observer } from "mobx-react-lite";
import { SearchFormView } from "/src/views/searchFormView.jsx";
import { SearchResultsView } from "/src/views/searchResultsView.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";

const Search = observer(function SearchRender(props) {
  const dishTypeOptions = ["starter", "main course", "dessert"];

  function searchTextChangedACB(text) {
    props.model.setSearchQuery(text);
  }

  function searchTypeChangedACB(type) {
    props.model.setSearchType(type);
  }

  function performSearchACB() {
    props.model.doSearch(props.model.searchParams);
  }

  function handleDishClickACB(dish) {
    props.model.setCurrentDishId(dish.id);
  }

  return (
    <div>
      <SearchFormView
        dishTypeOptions={dishTypeOptions}
        text={props.model.searchParams.query}
        type={props.model.searchParams.type}
        whatToSearch={searchTextChangedACB}
        onTypeChange={searchTypeChangedACB}
        doMySearch={performSearchACB}
      />

      {(props.model.searchResultsPromiseState.data && (
        <SearchResultsView 
          searchResults={props.model.searchResultsPromiseState.data}
          handleClick={handleDishClickACB}
        />
      )) || (
        <SuspenseView
          promise={props.model.searchResultsPromiseState.promise}
          error={props.model.searchResultsPromiseState.error}
        />
      )}
    </div>
  );
});

export { Search };