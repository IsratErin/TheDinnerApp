import {shoppingList} from "/src/utilities.js";
import {dishType, menuPrice, sortDishes} from "/src/utilities.js";

import "/src/style.css"

export function SidebarView(props){
   // return "SidebarView stub: number is "+props.number + " and we have "+props.dishes.length+ " dishes";
    /*function button(){
        if(props.number===1){
            <button disabled={props.number===1}>-</button>
        }else{
        return <button>-</button>;
        }
    }*/
    function plusButtonHandlerACB(evt){
        //console.log(props.number + parseInt(1));
        props.onNumberChange(props.number + parseInt(1));
        console.log(props.number + parseInt(1));
        

    }
    function minusButtonHandlerACB(evt){
       
        props.onNumberChange(props.number -parseInt(1));
        console.log(props.number - parseInt(1));

    }
    
    return (
        <div className="debug">
                   
            <button disabled={props.number===1} onClick={minusButtonHandlerACB}  >-</button>
            {props.number}
            <button onClick={plusButtonHandlerACB}   >+</button>  
             
            {
            <table>
                
                <tbody>

                    {
                       sortDishes(props.dishes)?.map(dishTableRowCB)
                    }
                    
                    <tr>
                        <td></td>
                        <td>Total:</td>
                        <td></td>
                        <td className="inalign">{(menuPrice(props.dishes)*(props.number)).toFixed(2)}</td>

                    </tr>
                </tbody>
            </table>
             }
        </div>
    );

    function dishTableRowCB(dish){

        function xbuttonHandlerACB(evt){
            //console.log(evt);
            props.removeThisDish(dish);
            console.log("removed");
        }
        function clickOnLinkHandlerACB(evt){
            //console.log(evt);
            props.wantThisDish(dish);
            console.log("Want This dish");
        }
        function dishHandlerACB(dish){
            console.log(dish);
        }
        function removeDishHandler(dish){
            console.log(dish);
        }
        
        return  <tr key={dish.id}>
                 <td><button onClick={xbuttonHandlerACB}  >x</button></td>
                
                 <td><a href="#" onClick={clickOnLinkHandlerACB} >{dish.title}</a></td>
                 <td>{dishType(dish)}</td>
                 
                <td className="inalign">{((dish.pricePerServing)*(props.number)).toFixed(2)}</td>
             </tr>;
    

       


    }
}
