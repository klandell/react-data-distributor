// @flow
import type { GenericFunction } from './flowTypes';

// a simple memoization function, each time the
// arguments change, the cache is reset
function memoize<T>(fn: GenericFunction<T>): GenericFunction<T> {
  let responseCache;
  let argumentCache = [];
  let firstCallDone = false;

  return (...args: Array<mixed>) => {
    // check to see if the arguments changed,
    let doUpdateCache = false;
    if (firstCallDone) {
      if (argumentCache.length !== args.length) {
        doUpdateCache = true;
      } else {
        for (let i = 0; i < args.length; i++) {
          if (args[i] !== argumentCache[i]) {
            doUpdateCache = true;
            break;
          }
        }
      }
    } else {
      // if we haven't made any calls yet, initialize
      // the cache
      firstCallDone = true;
      doUpdateCache = true;
    }
    // if the arguments did change, update the cache
    if (doUpdateCache) {
      argumentCache = args;
      responseCache = fn(...args);
    }
    return responseCache;
  };
}

export default memoize;
