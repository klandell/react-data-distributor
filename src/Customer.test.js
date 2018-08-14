import React from 'react';
import { mount } from 'enzyme';
import Distributor from './Distributor';
import Customer from './Customer';

const data = {
  foo: 'foo',
  bar: {
    baz: 'baz',
  },
};

const formatters = {
  default: s => s.split('').join(' '),
  uppercase: s => s.toUpperCase(),
};

describe('<Customer>', () => {
  it('should render', () => {
    const wrapper = mount((
      <Distributor>
        <Customer render={() => <div />} />
      </Distributor>
    ));
    expect(wrapper).toMatchSnapshot();
  });

  it('should receive parcels', () => {
    const wrapper = mount((
      <Distributor data={data}>
        <Customer render={parcels => (
          <div>
            <span>{parcels.foo.value()}</span>
            <span>{parcels.bar.baz.value()}</span>
          </div>
        )} />
      </Distributor>
    ));
    expect(wrapper).toMatchSnapshot();
  });

  it('should receive formatters', () => {
    const wrapper = mount((
      <Distributor data={data} formatters={formatters}>
        <Customer render={parcels => (
          <div>
            <span>{parcels.foo.value('uppercase')}</span>
            <span>{parcels.bar.baz.value('uppercase')}</span>
          </div>
        )} />
      </Distributor>
    ));
    expect(wrapper).toMatchSnapshot();
  });

  it('should receive a default formatters', () => {
    const wrapper = mount((
      <Distributor data={data} formatters={formatters}>
        <Customer render={parcels => (
          <div>
            <span>{parcels.foo.value()}</span>
            <span>{parcels.bar.baz.value()}</span>
          </div>
        )} />
      </Distributor>
    ));
    expect(wrapper).toMatchSnapshot();
  });

  it('should receive a raw value', () => {
    const wrapper = mount((
      <Distributor data={data} formatters={formatters}>
        <Customer render={parcels => (
          <div>
            <span>{parcels.foo.rawValue}</span>
            <span>{parcels.bar.baz.rawValue}</span>
          </div>
        )} />
      </Distributor>
    ));
    expect(wrapper).toMatchSnapshot();
  });
});
