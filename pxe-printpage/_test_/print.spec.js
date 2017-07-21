import React, { Component } from 'react';
import ReactDOM     from 'react-dom';
require('isomorphic-fetch')
import $ from 'jquery';

import { mount, shallow } from 'enzyme';
import  PrintPage  from '../src/js/PrintPage';

// var jsdom = require('jsdom-no-contextify').jsdom;
// global.document = jsdom('<html><body></body></html>');
// global.window = document.defaultView;
// global.navigator = {
//   userAgent: 'node.js'
// };

describe('PrintPage', function () {
  
  it('Div should exists', () => {
  	let wrap = mount(<PrintPage />);
    expect(wrap.find('div').length).toBe(2);
    console.log(wrap.state());
  });
  // it('CLick Button', () => {
  // 	let wrap1 = mount(<PrintPage /> );
  //   wrap1.find('#printBtn').simulate('click');
  // });
});