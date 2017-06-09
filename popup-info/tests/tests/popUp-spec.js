import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon, { spy } from 'sinon';

import Root from '../components/root';
import BookViewer from '../../demo/BookViewer';
import PopUpInfoComponent, { PopUpInfo } from '../../Main';
import Foo from '../Foo'

describe('testSpec', ()=>{
	it('test', ()=> {
		console.log(">>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<");
		/*spy(BookViewer.prototype, 'componentWillMount');
		const wrapper = mount(<BookViewer bookHTML = '<div> Render </div>' />);
		expect(BookViewer.prototype.componentWillMount.calledOnce).to.equal(true)*/
		console.log(TestUtils)
		let root = TestUtils.renderIntoDocument(<BookViewer bookHTML = "" />);
		console.log(TestUtils.findRenderedDOMComponentWithClass(root, 'keyword'))
		console.log(TestUtils.scryRenderedDOMComponentsWithTag(root, 'div'));

		let popOverCollection = {};let popUpCollection = [];
        popOverCollection.popOverTitle = 'Title'
        popOverCollection.popOverDescription =  'Description';
        let dom = TestUtils.findRenderedDOMComponentWithClass(root, 'keyword');
        popUpCollection.push({'popOverCollection' : popOverCollection, 'item' : dom});
        let CalCal = function() {
        	console.log("<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>.")
        }
        console.log("TestUtils : ", TestUtils);
        
        const wrapper1 = mount(<Foo />);
        /*--------------------------Foo starts--------------------------------*/
		expect(wrapper1.find('.clicks-0').length).to.equal(1);
		wrapper1.find('a').simulate('click');
		expect(wrapper1.find('.clicks-1').length).to.equal(1);
		console.log(wrapper1.find('a'), "wrapper1.find('a')")
		/*--------------------------Foo Ends--------------------------------*/
      	const popUpWrapper = mount(<PopUpInfo popUpCollection = {popUpCollection} bookId = "bookDiv" />)
      	console.log(popUpWrapper, "popUpWrapper")
      	const wrapper = mount(<BookViewer bookHTML = "" />);
        //console.log(wrapper.find('.keyword'), "wrapper.find('.keyword')")
		
		wrapper.find('.keyword').last().simulate('click', 1);
      	//done();
	})
})