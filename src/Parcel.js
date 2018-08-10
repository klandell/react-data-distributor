// @flow
/* eslint-disable no-underscore-dangle */
import type { Formatter, Formatters, IndexableClass } from './flowTypes';

const _value = Symbol('value');
const _formatters = Symbol('formatters');

/**
 * Parcel provides a custom data type to allow
 * generic formatting to be done on the data value
 */
class Parcel implements IndexableClass {
  $key: Symbol;
  $value: any;

  /**
   * Initializes the parcel
   *
   * @param {*} value the parcel value
   * @param {object} formatters an object of formatting functions
   */
  constructor(value: any, formatters: Formatters) {
    this[_value] = value;
    this[_formatters] = formatters;
  }

  /**
   * Gets the parcel's raw value
   *
   * @return the parcel value's in its original type
   */
  get rawValue(): string | number {
    return this[_value];
  }

  /**
   * Formats a parcel using a given formatting function
   *
   * @param {string} formatter a format function to apply
   * @return the formatted parcel value
   */
  value(formatter: Formatter): any {
    if (formatter) {
      const formatFn = this[_formatters][formatter] || (s => `${s}`);
      return formatFn(this.rawValue);
    }
    return this.rawValue;
  }
}

export default Parcel;
