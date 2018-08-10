React-Translator
=====
IN PROGRESS!

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lorem nulla, dignissim sit amet ipsum elementum, molestie volutpat diam. Praesent eleifend sapien fringilla leo auctor mollis. Cras a ipsum quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla eleifend, enim sed laoreet laoreet, neque eros pharetra arcu, sed pharetra nulla leo a mauris. Sed at ligula imperdiet, dignissim eros vel, porta neque. Duis dictum, augue quis efficitur ornare, ipsum dui fermentum nisi, vel maximus nunc elit non urna. Aliquam fringilla iaculis lectus, quis malesuada neque luctus vel. Vivamus porta ullamcorper gravida.

## Install

## API

## Example
```
import React from 'react';
import ReactDOM from 'react-dom';
import { Distributor } from 'react-data-distributor';
import App from './app';

const translations = {
  en: {
    lang: 'english',
  },
  es: {
    lang: 'español',
  },
};

const locale = navigator.language.split('-')[0];

const formatters = {
  allCaps: s => s.toUpperCase(),
};

ReactDOM.render((
  <Distributor
    data={translations}
    selector={locale}
    formatters={formatters}
  >
    <App />
  </Distributor>
), document.getElementById('root'));
```

```
import React from 'react';
import { Customer as C } from 'react-data-distributor';

const Component = () => (
  <C render={strings => (
    <div>{strings.lang.value('allCaps')}</div>
  )} />
);

export default Component;
```

## Changelog
