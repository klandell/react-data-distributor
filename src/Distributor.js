// @flow
/* eslint-disable no-mixed-operators, space-infix-ops */
import * as React from 'react';
import { Provider } from './SupplyChainContext';
import memoize from './memoize';
import prepareData from './prepareData';
import type { Data, Formatters } from './flowTypes';

type Props = {
  selector?: string,
  data?: Data,
  formatters?: Formatters,
  children: React.Node,
};

// create a memoized function to extract the relevant
// data from the supplied data
const getData = memoize<Data>(prepareData);

// a provider to pass data to the interested parties
// via the react context api
const Distributor = (props: Props) => {
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
