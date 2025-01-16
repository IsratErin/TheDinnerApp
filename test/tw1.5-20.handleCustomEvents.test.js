import {dishesConst} from './dishesConst.js';
import { assert, expect, should } from 'chai';
import makeModelProxyHandler from "./mockModel.js";
import getModule from "./filesToTest.js";
import testComponent from './testComponentTL.js';
import findCustomEvents from "./findCustomEvents.js";
import {checkCB} from "./checkCB.js";


const X= TEST_PREFIX;
const SidebarView=(await getModule(`/src/views/${X}sidebarView.jsx`))?.SidebarView;
const SidebarVue= (await getModule(`/src/vuejs/${X}sidebarPresenter.jsx`))?.Sidebar;
const SidebarReact=(await getModule(`/src/reactjs/${X}sidebarPresenter.jsx`))?.Sidebar;

describe("TW1.5 Presenter handles custom events and changes Model [test Vue](/vue.html)[React](/react.html)", function tw1_5_20() {

    let latestGuests;
    beforeEach(function tw1_5_20_beforeEach1(){
        latestGuests= undefined;
    });
    const cbs=[];
    
    testComponent({
        vue: SidebarVue,
        react: SidebarReact,
        mock: [{component: SidebarView, dummyText: "mock sidebar view"}]},
        {model: new Proxy({
            numberOfGuests: 2,
            dishes: [],
            setNumberOfGuests(x){latestGuests=x;}
            }, makeModelProxyHandler("Sidebar presenter, testing custom events"))},
        "$framework Sidebar presenter handles the onNumberChange custom event, changing the number of guests in the Model",
        function tw1_5_20_1(output, presenterProps, mockHandlers, test){
            expect(output.queryByText(/mock sidebar view/), "sidebar presenter must always render sidebar view").to.be.ok;
            if(!mockHandlers[0]?.propsHistory[0]?.onNumberChange || mockHandlers[0]?.propsHistory[0]?.onNumberChange==console.log)
                test.skip();
            expect(typeof mockHandlers[0]?.propsHistory[0]?.onNumberChange).to.equal("function");

            const description="onNumberChange custom event handler";
            mockHandlers[0]?.propsHistory[0]?.onNumberChange(3);
            expect(latestGuests,description+"  should properly ask model to change guests").to.equal(3);
            mockHandlers[0]?.propsHistory[0]?.onNumberChange(5);
            expect(latestGuests, description+" should properly ask model to change guests").to.equal(5);
            cbs[0]= checkCB(mockHandlers[0]?.propsHistory[0]?.onNumberChange, description);          
        }
    );

    const dishes = dishesConst.dishes3;
    let latestCurrentDish, latestRemovedDish;

    beforeEach(function tw1_5_20_beforeEach2(){
        latestCurrentDish= latestRemovedDish= undefined;
    });
    testComponent({
        vue: SidebarVue,
        react: SidebarReact,
        mock: [{component: SidebarView, dummyText: "mock sidebar view"}]},
        {model: new Proxy({
            numberOfGuests:3,
            dishes,
            setCurrentDishId(id){latestCurrentDish=id;},
            removeFromMenu(dish){latestRemovedDish=dish;}
            }, makeModelProxyHandler("Sidebar presenter, testing custom events 2"))},
        "$framework Sidebar presenter handles the apropriate custom event fired by the View, setting current dish in the Model",
         function tw1_5_20_2(output, presenterProps, mockHandlers, test){
            if(!mockHandlers[0]?.propsHistory[0]?.onNumberChange)
                 test.skip();
            const setCurrent = findCustomEvents(SidebarView, {number:5, dishes:dishes})?.a[0]?.customEventName;
            if(!setCurrent)
                test.skip();
            expect(output.queryByText(/mock sidebar view/), "sidebar presenter must always render sidebar view").to.be.ok;
            expect(mockHandlers[0]?.propsHistory[0], "expecting sidebar presenter to pass props to SidebarView").to.be.ok;
            if(!mockHandlers[0]?.propsHistory[0][setCurrent] || mockHandlers[0]?.propsHistory[0][setCurrent]==console.log)
                test.skip();

            const description=  "custom event handler for event "+setCurrent;
            expect(mockHandlers[0]?.propsHistory[0][setCurrent], description+ " should be a function").to.be.a("function");
            mockHandlers[0].propsHistory[0][setCurrent](dishesConst.dishes3[2]);
            expect(latestCurrentDish, description+" should set the current dish").to.equal(dishesConst.dishes3[2].id);
            expect(latestRemovedDish, description+" should not remove dish").to.be.undefined;
            cbs[1]=checkCB(mockHandlers[0]?.propsHistory[0][setCurrent], description);
        }
    );

    let lastCurrentDish, lastRemovedDish;
    beforeEach(function tw1_5_20_beforeEach3(){
        lastCurrentDish= lastRemovedDish= undefined;
    });
    testComponent({
        vue: SidebarVue,
        react: SidebarReact,
        mock: [{component: SidebarView, dummyText: "mock sidebar view"}]},
        {model: new Proxy ({
            numberOfGuests: 3,
            dishes,
            setCurrentDishId(id){lastCurrentDish=id;},
            removeFromMenu(dish){lastRemovedDish=dish;}
            }, makeModelProxyHandler("Sidebar presenter, testing custom events 3"))},
        "$framework Sidebar presenter handles the apropriate custom event fired by the View, removing the dish from the Model menu",
        function tw1_5_20_3(output, presenterProps, mockHandlers, test){
        if(!mockHandlers[0]?.propsHistory[0]?.onNumberChange)
            test.skip();
        const remove = findCustomEvents(SidebarView, {number:5, dishes:dishes})?.button[2]?.customEventName;
        if(!remove)
            test.skip();
            
        expect(output.queryByText(/mock sidebar view/), "sidebar presenter must always render sidebar view").to.be.ok;

        expect(mockHandlers[0]?.propsHistory[0], "expecting sidebar presenter to pass props to SidebarView").to.be.ok;

        if(!mockHandlers[0]?.propsHistory[0][remove] || mockHandlers[0]?.propsHistory[0][remove]==console.log)
            test.skip();
        const description=  "custom event handler for event "+remove;
        expect(mockHandlers[0]?.propsHistory[0][remove], description+" should be a function").to.be.a("function");
        mockHandlers[0]?.propsHistory[0][remove](dishesConst.dishes3[1]);
        expect(lastRemovedDish?.title, description+" should remove a dish").to.equal(dishesConst.dishes3[1].title);
        expect(`id: ${lastRemovedDish?.id}`, description+" should remove a dish").to.equal(`id: ${dishesConst.dishes3[1].id}`);
        expect(lastCurrentDish, description+" should not set current dish").to.be.undefined;
            cbs[2]=checkCB(mockHandlers[0]?.propsHistory[0][remove], description);
            expect(cbs[0], "custom event callback names must be different and describe what the callback is doing").to.not.equal(cbs[1]);
            expect(cbs[0], "custom event callback names must be different and describe what the callback is doing").to.not.equal(cbs[2]);
            expect(cbs[1], "custom event callback names must be different and describe what the callback is doing").to.not.equal(cbs[2]);
        }
    );
});
