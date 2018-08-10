/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react';
import {
  arrayOf,
  func,
  node,
  objectOf,
  oneOfType,
  string,
} from 'prop-types';
import memoize from 'memoize-one';

const { Provider, Consumer } = React.createContext();

class Dictionary extends PureComponent {
  static propTypes = {
    locale: string,
    translations: objectOf(objectOf(string)),
    children: oneOfType([node, arrayOf(node)]).isRequired,
  }

  static defaultProps = {
    locale: (typeof navigator !== 'undefined' && (navigator.languages ? navigator.languages[0] : navigator.language)) || null,
    translations: {},
  }

  getValue = memoize((locale, translations) => ({ locale, translations }))

  render() {
    const { locale, translations, children } = this.props;
    return (
      <Provider value={this.getValue(locale, translations)}>
        {children}
      </Provider>
    );
  }
}


class Translator extends PureComponent {
  static propTypes = {
    render: func.isRequired,
  }

  render() {
    const { render } = this.props;
    return (
      <Consumer>
        {({ locale, translations }) => (
          render(translations[locale] || translations[locale.split('-')[0]] || {})
        )}
      </Consumer>
    );
  }
}

export { Dictionary, Translator };
