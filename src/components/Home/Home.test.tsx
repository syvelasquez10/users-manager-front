import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Home } from './Home';
import Modal from 'antd';
import UsersTable from '../UsersTable/UsersTable';

let wrapped: ShallowWrapper;
beforeEach(() => {
  wrapped = shallow(<Home />);
});

it('renders the main div', () => {
  expect(wrapped.hasClass('home')).toEqual(true);
});

it('contains the Modal component', () => {
  expect(wrapped.find(Modal).length).toEqual(1);
});

it('contains the Users Table component', () => {
  expect(wrapped.find(UsersTable).length).toEqual(1);
});
