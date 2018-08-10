// @flow
type GenericFunction<T> = (..._: any) => T;
type Data = {};
type Formatter = (any) => string;
type Formatters = {
  [string]: Formatter,
};
interface IndexableClass {
  [key: Symbol]: any
}
type RawData = {};

export type {
  Data,
  Formatter,
  Formatters,
  GenericFunction,
  IndexableClass,
  RawData,
};
