export function resolvePromise(prms, promiseState) {
  if (prms === null || prms === undefined) {
    promiseState.promise = null;
    promiseState.data = null;
    promiseState.error = null;
    return prms; // return null or undefined
  }

  promiseState.promise = prms;
  promiseState.data = null;
  promiseState.error = null;

  function resolvedpromiseACB(dta) {
    if (promiseState.promise === prms) {
      promiseState.data = dta;
    }
  }
  function errorinpromiseACB(e) {
    //console.log(e);
    if (promiseState.promise === prms) {
      promiseState.error = e;
    }
  }

  prms.then(resolvedpromiseACB).catch(errorinpromiseACB);
}