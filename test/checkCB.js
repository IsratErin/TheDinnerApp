import {expect} from "chai";
function hash(s){ return s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a;},0); }
const standard= " must follow course code conventions regarding callbacks: ";

export function checkCB(f, description, hashCode=64608){
    expect(typeof f, description + " expected to be a function").to.equal("function");
    expect(f.toString(), description+ standard+" have a name. Thick Arrow functions cannot have a name").to.match(/function(.*?)\(/);
    const name= f.toString().match(/function(.*?)\(/)[1].trim();
    expect(name.length, description+ standard+name+" . Must have a descriptive name").to.be.gt(6);
    const cbacb=" . Must have a name that ends in CB or ACB depending on whether the callback is asyncrhonous or not";
    expect(hash(name.slice(-3+hashCode%2))==hashCode, description+ standard+name+cbacb).to.equal(true);
    if(hashCode%2)
        expect(hash(name.slice(-2-hashCode%2))!=64608, description+ standard+name+cbacb).to.equal(true);
    return name;
}

export const cbHistory=[];
export function stopRecording(){
    Array.prototype.sort=oldSort;
    Array.prototype.map=oldMap;
    Array.prototype.filter=oldFilter;
    Array.prototype.reduce=oldReduce;
    state.last= [...cbHistory];
    cbHistory.splice(0);
}

export function checkArrayCB(description){
    if(cbHistory.length)
        stopRecording();
    const top= state.last[0];
    expect(state.op, "You are using the wrong array operation").to.equal(top.op);
    return checkCB(top.cb, "callback passed to "+state.op+"() for "+description, 2143);
}


const oldSort=Array.prototype.sort;
const oldFilter= Array.prototype.filter;
const oldReduce= Array.prototype.reduce;
const oldMap= Array.prototype.map;


const state={};
export function recordArrayCB(x){
    state.op=x;
    if(x=="sort")  // we assume that Array.prototype.sort === oldSort
        Array.prototype.sort= function(f){
            cbHistory.push({op:"sort", cb:f});
            return oldSort.bind(this)(f);
        };
    if(x=="filter")
        Array.prototype.filter= function(f){
            cbHistory.push({op:"filter", cb:f});
            return oldFilter.bind(this)(f);
        };
    
    if(x==="map"){
        Array.prototype.map= function(f){
            cbHistory.push({op:"map", cb:f});
            return oldMap.bind(this)(f);
        };
    }
    if(x==="reduce")
        Array.prototype.reduce= function(f,x){
            cbHistory.push({op:"reduce", cb:f});
            return oldReduce.bind(this)(f,x);
        };
}


    
