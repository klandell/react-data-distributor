// @flow
/* eslint-disable no-mixed-operators, space-infix-ops */
import React from 'react';
import type { Data } from './flowTypes';

const { Provider, Consumer } = React.createContext<Data>({});
export { Provider, Consumer };
