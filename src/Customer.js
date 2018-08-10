// @flow
import * as React from 'react';
import { Consumer } from './SupplyChainContext';
import type { Data } from './flowTypes';

type Props = {
  render: (Data) => React.Node,
};

const Customer = ({ render }: Props) => (
  <Consumer>
    {(data: Data) => render(data)}
  </Consumer>
);

export default Customer;
