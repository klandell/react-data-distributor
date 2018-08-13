// @flow
import Stack from './Stack';
import Parcel from './Parcel';
import type { Data, Formatters, RawData } from './flowTypes';

// prepares the data by converting all of the values to parcels
const prepareData = (rawData: RawData, formatters: Formatters): Data => {
  const out = Object.assign({}, rawData);

  // walk through the tree and convert all values into
  // parcels so that the user can operate on them later
  const stack = new Stack();
  stack.push(out);

  while (!stack.empty()) {
    // get the next value from the top of the stack
    const data = stack.pop();
    const dataKeys = Object.keys(data);

    for (let i = 0; i < dataKeys.length; i++) {
      const dataKey = dataKeys[i];
      const datum = data[dataKey];
      // if the value from this key is an object,
      // add it to the stack
      if (datum === Object(datum)) {
        // create a clone to prevent mutations
        const cloned = Object.assign({}, datum);
        data[dataKey] = cloned;
        stack.push(cloned);
      } else {
        // create a new parcel for this value
        data[dataKey] = new Parcel(datum, formatters);
      }
    }
  }

  return out;
};

export default prepareData;
