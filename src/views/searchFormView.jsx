export function SearchFormView(props){
    function optionsCB(ops){
        //debugger;

        return <option key={ops} value={ops}>{ops}</option> ;

    }
    function inputChangeHandlerACB(evt){
        props.whatToSearch(evt.target.value);
    }
    function selectTypeHandlerACB(evt){
        //debugger;

        props.onTypeChange(evt.target.value);

    }
    function clickingHandlerACB(evt){
       props.doMySearch();  
    }
    function navigateToSummaryACB(){
        window.location.hash="#/summary";
    }
    return (
        <div>
            <input value={props.text || ""} onChange={inputChangeHandlerACB} />
            <select value={props.type || ""} onChange={selectTypeHandlerACB}>
                <option value="">Choose:</option>
                {props.dishTypeOptions.map(optionsCB)}


            </select>
            <button onClick= {clickingHandlerACB}>Search!</button>
            <button className="buttonPosition" onClick={navigateToSummaryACB}>Summary</button>
        </div>
    );
}