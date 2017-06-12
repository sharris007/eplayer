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

		/*console.log(TestUtils)
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
        console.log("TestUtils : ", TestUtils);*/
        
        
        /*--------------------------Foo starts--------------------------------*/
        const wrapper1 = mount(<Foo />);
		expect(wrapper1.find('.clicks-0').length).to.equal(1);
		wrapper1.find('a').simulate('click');
		expect(wrapper1.find('.clicks-1').length).to.equal(1);
		console.log(wrapper1.find('a'), "wrapper1.find('a')")
		/*--------------------------Foo Ends--------------------------------*/
		const wrapper = mount(<BookViewer bookHTML = "" />);

		let popOverCollection = {};let popUpCollection = [];
        popOverCollection.popOverTitle = 'Title'
        popOverCollection.popOverDescription =  'Description';
        let dom = wrapper.find('.keyword');
        console.log("dom :- ", dom)
        popUpCollection.push({'popOverCollection' : popOverCollection, 'item' : dom.node});

      	const popUpWrapper = mount(<PopUpInfo popUpCollection = {popUpCollection} bookId = "bookDiv" />);
      /*	const wrapper2 = mount(<PopUpInfo popUpCollection = {popUpCollection} bookId = "bookDiv" />)
      	const spy = sinon.spy(PopUpInfo.prototype, 'framePopOver');
      	setTimeout(()=>{
      		dom.simulate('click')
      	}, 100)*/
		
		wrapper.find('.keyword').simulate('click');
      	//done();
	})
})