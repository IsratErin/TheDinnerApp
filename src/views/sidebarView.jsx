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
        //console.log(props.number - parseInt(1));
        props.onNumberChange(props.number -parseInt(1));
        console.log(props.number - parseInt(1));

    }
    function customEventHandlerACB(number){
        console.log("My custom event :", number);
    }
    return (
        <div className="debug">
                   
            <button disabled={props.number===1} onClick={minusButtonHandlerACB} onNumberChange={customEventHandlerACB} >-</button>
            {props.number}
            <button onClick={plusButtonHandlerACB} onNumberChange={customEventHandlerACB}  >+</button>  
             
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
                 <td><button onClick={xbuttonHandlerACB} removeThisDish={removeDishHandler} >x</button></td>
                
                 <td><a href="#" onClick={clickOnLinkHandlerACB} wantThisDish={dishHandlerACB}>{dish.title}</a></td>
                 <td>{dishType(dish)}</td>
                 
                <td className="inalign">{((dish.pricePerServing)*(props.number)).toFixed(2)}</td>
             </tr>;
    

       


    }
}
