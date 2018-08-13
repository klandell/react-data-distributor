React Data Distributor
=====
An minimalist and unopinionated framework for distributing static data to React components. \
[![npm version](https://badge.fury.io/js/react-data-distributor.svg)](https://badge.fury.io/js/react-data-distributor)
[![dependencies Status](https://david-dm.org/klandell/react-data-distributor/status.svg)](https://david-dm.org/klandell/react-data-distributor)

With React Data Distributor, you bring your own data and formatting functions and they are passed down the component tree to where you need them. It is a minimal wrapper on the React context api, designed for static(ish) data. React Data Distributor is lightweight, coming in at 2.25KB transpiled, minified, and gzipped. It is powerful tool for translating, theming, content distribution, and is the perfect tool when complex state management libraries are overkill.  It has no dependencies except for a peer dependency on React >= 16.3. \

## Install
Install via your favorite node dependency manager
`yarn add react-data-distributor` \
`npm install react-data-distributor`

## API

### Distributor
A top level data provider
#### Configs
- `data`: `{object<object|string|number>}` - the data to distribute as key:value pairs, may be nested objects
- `formatters`: `{object<function>}` - optional - an object of formatting functions that take one parameter, a data value, and return a string. You may optionally define a special formatter named "default", that will be called any time a Parcel's value function is called without a formatter function. If no default formatter is defined, the value will be returned as a string.

### Customer
A low level data consumer
#### Configs
- `render`: `{function}` - a render prop that accepts a single argument, an object of parcels, and returns a React component

### Parcel
A single data value
#### Properties
- `rawValue`: `{string|number}` - the actual data value
#### Methods
- `value`: `{function}` - returns the formatted data value as a string. Accepts one argument, the name of a formatting function as defined in the formatters config of `Distributor`. 

## Example
Below is a real world example using react-data-distributor to provide a simple translation mechanism to a React app.

### Create the Distributor
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Distributor } from 'react-data-distributor';
import App from './app';

// define a translations object, that maps
// keywords to phrases in our target languages
const translations = {
  en: {
    lang: 'english',
  },
  es: {
    lang: 'español',
  },
};

// extract the user's language settings from the navigator,
// defaulting to english if we couldn't find it.
let language = (typeof navigator !== 'undefined' && (
  navigator.languages ? navigator.languages[0] : navigator.language
)) || 'en';

// the language tag that the user holds might be more specific than
// what we support in our translations, i.e. en-US. In that case,
// try to find a match using the first part of the language tag.
// fall back to english if we still can't find a match.
if (!translations[language]) {
  const simplifiedLangTag = language.split('-')[0];
  language = translations[simplifiedLangTag] ? simplifiedLangTag : 'en';
}

// define any formatters that we want to use on our data
const formatters = {
  capitalize: (str) => {
    const words = (str || '').split(' ');
    return words.map(w => `${w.substr(0, 1).toUpperCase()}${w.slice(1)}`).join(' ');
  },
};

// render the application with Distributor somewhere near the top of component
// hierarchy. It might make sense to instead have multiple distributors at the 
// page level, depending on the situation.
ReactDOM.render((
  <Distributor
    data={translations[language]}
    formatters={formatters}
  >
    <App />
  </Distributor>
), document.getElementById('root'));
```

### Create the Customer
```javascript
import React, { Fragment } from 'react';
import { Customer as C } from 'react-data-distributor';

// render your component using the render props pattern.
// Call value with an optional formatter function to get 
// a string representation of your value. Use the rawValue
// property to access the actual value.
// i.e. `strings.lang.rawValue`
const Component = () => (
  <C render={parcels => (
    <Fragment>
      <div>Formatted: {parcels.lang.value('capitalize')}</div>
      <div>Raw: {parcels.lang.rawValue}</div>
    </Fragment>
  )} />
);

export default Component;
```

## Changelog

#### 1.0.0 &mdash; ???
- Initial release