import React from 'react';
import { Consumer } from './SupplyChainContext';

// render

const Customer = ({ render }) => (
  <Consumer>
    {data => render(data)}
  </Consumer>
);

export default Customer;
