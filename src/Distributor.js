import React from 'react';
import { Provider } from './SupplyChainContext';
import memoize from './memoize';
import prepareData from './prepareData';

/*
selector: string,
data: object, // eslint-disable-line react/forbid-prop-types
formatters: objectOf(func),
children: oneOfType([node, arrayOf(node)]).isRequired,
*/

// create a memoized function to extract the relevant
// data from the supplied data
const getData = memoize(prepareData);

// a provider to pass data to the interested parties
// via the react context api
const Distributor = (props) => {
  const {
    selector,
    data,
    formatters,
    children,
  } = props;

  return (
    <Provider value={getData(selector, data, formatters)}>
      {children}
    </Provider>
  );
};

Distributor.defaultProps = {
  selector: '',
  data: {},
  formatters: {},
};

export default Distributor;
