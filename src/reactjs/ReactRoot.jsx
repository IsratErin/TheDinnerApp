import { Summary } from "./summaryPresenter.jsx";
import { Sidebar } from "./sidebarPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";
import { Search } from "./searchPresenter.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";
import { observer } from "mobx-react-lite";
import {  createHashRouter,  RouterProvider} from "react-router-dom";





const ReactRoot = observer(
function ReactRoot(props){
    
    function makeRouter(model){     //ReactRoot.jsx
        return createHashRouter([
        {
            path: "/",
            element: <Search model={model} />,
        },
        {
            path: "/search",
            element: <Search model={model} />,
        },
        {
            path: "/summary",
            element: <Summary model={model} />,
        },
        {
            path: "/details",
            element: <Details model={model} />,
        },
       ])
    }




    if (!props.model.ready) {
        return <SuspenseView promise="loading" />;
    }

    return (<div className="flexParent">
                <div className="sidebar"><Sidebar model={props.model} /></div>
                <div className="mainContent"> <RouterProvider router={makeRouter(props.model)} />
                    
                </div>
            </div>
           );
}
)

export { ReactRoot }