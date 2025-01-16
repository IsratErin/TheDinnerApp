import { Summary }  from "./summaryPresenter.jsx";


function VueRoot(props){
    return (<div>
                <div><Summary model={props.model} /></div>
            </div>
           );
}

export { VueRoot }

