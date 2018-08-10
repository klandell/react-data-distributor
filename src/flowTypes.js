// @flow
type GenericFunction<T> = (..._: any) => T;
type Data = {};
type Formatter = (any) => string;
type Formatters = {
  [key: string]: Formatter,
};
type RawData = {};

export type {
  Data,
  Formatter,
  Formatters,
  GenericFunction,
  RawData,
};
