export function SearchResultsView(props) {
    return (
        <div>
            {props.searchResults.map(dishSearchResultCB)}
        </div>
    );

    function dishSearchResultCB(dish) {
        function handleClickACB() {
            props.handleClick(dish);
            window.location.hash="#/details";
        }

        return (
            <span key={dish.id} className="search-result-item" onClick={handleClickACB}>
                <img src={dish.image} height="100" alt={dish.title}/>
                <div>
                    {dish.title}
                </div>
            </span>
        );
    }
}