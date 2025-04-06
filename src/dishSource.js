import { PROXY_URL } from "./apiConfig";
import { PROXY_KEY } from "./apiConfig";

export function searchDishes(searchParams) {
  const object = {
    method: "GET",
    headers: {
      "X-DH2642-Key": PROXY_KEY,
      "X-DH2642-Group": "34",
    },
  };

  function gotResponseACB(response) {
    if (response.status != 200)
      throw new Error("could not find" + response.status);
    return response.json();
  }
  function someACB(obj) {
    //debugger;
    //console.log(obj);
    return obj.results;
  }

  //debugger;
  // Fetch as two-stage promise
  return fetch(
    PROXY_URL +
      "/recipes/complexSearch" +
      "?" +
      new URLSearchParams(searchParams),
    object
  )
    .then(gotResponseACB)
    .then(someACB);
}
export function getMenuDetails(ids_array) {
  const object = {
    method: "GET",
    headers: {
      "X-DH2642-Key": PROXY_KEY,
      "X-DH2642-Group": "34",
    },
  };
  function gotResponseACB(response) {
    if (response.status != 200)
      throw new Error("could not find" + response.status);
    return response.json();
  }

  return fetch(
    PROXY_URL +
      "/recipes/informationBulk" +
      "?" +
      new URLSearchParams({ ids: ids_array }),
    object
  ).then(gotResponseACB);
}

export function getDishDetails(id) {
  function myDishDetailsACB(i) {
    // console.log(i[0]);
    //console.log(i);
    //debugger;
    return i[0];
  }

  const arr = [id];
  return getMenuDetails(arr).then(myDishDetailsACB);
}
