React Data Distributor
=====
An minimalist and unopinionated framework for distributing static data to React components.\
[![npm version](https://badge.fury.io/js/react-data-distributor.svg)](https://badge.fury.io/js/react-data-distributor)
[![dependencies Status](https://david-dm.org/klandell/react-data-distributor/status.svg)](https://david-dm.org/klandell/react-data-distributor)

React Data Distributor is lightweight, coming in at 2.25KB transpiled, minified, and gzipped. It is powerful tool for translating, theming, content distribution, and is the perfect tool when complex state management libraries are overkill.  It has no dependencies except for a peer dependency on React >= 16.3.

## Install
Install via your favorite node dependency manager
`yarn add react-data-distributor`\
`npm install react-data-distributor`

## API
TODO: ...

## Example
Below is a real world example using react-data-distributor to provide a simple
translation mechanism to a React app.

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
// hierarchy like you would with Redux. It might make sense to instead have multiple
// distributors at the page level, depending on the situation.
ReactDOM.render((
  <Distributor
    data={translations}
    selector={language}
    formatters={formatters}
  >
    <App />
  </Distributor>
), document.getElementById('root'));
```

### Create the Customer
```javascript
import React from 'react';
import { Customer as C } from 'react-data-distributor';

// render your component using the render props pattern,
// strings will be your data, subset via the top level
// selector. Call value with an optional formatter function
// to get a string representation of your value. Use the
// rawValue property to access the actual value.
// i.e. `strings.lang.rawValue`
const Component = () => (
  <C render={strings => (
    <div>{strings.lang.value('capitalize')}</div>
  )} />
);

export default Component;
```

## Changelog
