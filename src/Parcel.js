/* eslint-disable no-underscore-dangle */
const _value = Symbol('value');
const _formatters = Symbol('formatters');
/**
 * Parcel provides a custom data type to allow
 * generic formatting to be done on the data value
 */
class Parcel {
  /**
   * Initializes the parcel
   *
   * @param {*} value the parcel value
   * @param {object} formatters an object of formatting functions
   */
  constructor(value, formatters) {
    this[_value] = value;
    this[_formatters] = formatters;
  }

  /**
   * Gets the parcel's raw value
   *
   * @return the parcel value's in its original type
   */
  get rawValue() {
    return this[_value];
  }

  /**
   * Formats a parcel using a given formatting function
   *
   * @param {string} formatter a format function to apply
   * @return the formatted parcel value
   */
  value(formatter) {
    let formatFn = formatter ? this[_formatters][formatter] : this[_formatters].default;
    if (!formatFn) {
      formatFn = (s => `${s}`);
    }
    return formatFn(this.rawValue);
  }
}

export default Parcel;
