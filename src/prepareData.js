// @flow
import Stack from './Stack';
import Parcel from './Parcel';
import type { Data, Formatters, RawData } from './flowTypes';

// prepares the data by converting all of the values to
// parcels, and extracting only the data that the user
// is interested in, based on a selector
const prepareData = (selector: string, data: RawData, formatters: Formatters): Data => {
  let selectedData = Object.assign({}, data);
  if (selector) {
    // if a selector has been defined, walk down the object
    // to pull out just the data that the user is interested in.
    // Selectors will be strings with dot separated keys.
    // e.g. 'foo.bar.baz'
    const selectorParts = selector.split('.');
    for (let i = 0; i < selectorParts.length; i++) {
      // if nothing is found in the data for the selector,
      // we will return an empty object
      selectedData = Object.assign({}, selectedData[selectorParts[i]] || {});
    }
  }

  if (selectedData === Object(selectedData)) {
    // walk through the tree and convert all values into
    // parcels so that the user can operate on them later
    const stack = new Stack();
    stack.push(selectedData);

    while (!stack.empty()) {
      // get the next value from the top of the stack
      const dta = stack.pop();
      const dtaKeys = Object.keys(dta);

      for (let i = 0; i < dtaKeys.length; i++) {
        const dtaKey = dtaKeys[i];
        const datum = dta[dtaKey];
        // if the value from this key is an object,
        // add it to the stack
        if (datum === Object(datum)) {
          // create a clone to prevent mutations
          const cloned = Object.assign({}, datum);
          dta[dtaKey] = cloned;
          stack.push(cloned);
        } else {
          // create a new parcel for this value
          dta[dtaKey] = new Parcel(datum, formatters);
        }
      }
    }
  } else {
    // if the data selected wasn't an object, just return a parcel
    selectedData = new Parcel(selectedData, formatters);
  }
  return selectedData;
};

export default prepareData;
