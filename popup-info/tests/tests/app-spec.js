import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
//import  expect  from 'expect';
import { mount, shallow } from 'enzyme';
import sinon, { spy } from 'sinon';

import dummy from '../app';
import Root from '../components/root';
import BookViewer from '../../demo/BookViewer'
import PopUpInfoComponent, { PopUpInfo } from '../../Main';
import ComponentOwner from '../../src/js/Component-owner';

describe(' : PopUpInfoComponent-Spec', function () {
  //spy(ComponentOwner.prototype, 'componentDidMount')
  //let PopUpInfoTestComponent = new PopUpInfoComponent({contentId:'demo-content'});
  
 
  it('checking ComponentOwner componentDidMount has been called only once', () => {
  	//console.log("ComponentOwner.prototype", ComponentOwner.prototype.componentDidMount.calledOnce)
    //expect(ComponentOwner.prototype.componentDidMount.calledOnce).to.equal(true);
 
 /* spy(ComponentOwner.prototype, 'componentDidMount');
    const wrapper = mount(<ComponentOwner bookUrl = "https://content.stg-openclass.com/eps/pearson-reader/api/item/651da29d-c41d-415e-b8a4-3eafed0057db/1/file/LutgensAtm13-071415-MJ-DW/OPS/s9ml/chapter02/filep7000496728000000000000000000cae.xhtml" />);
    console.log(wrapper.state())
    expect(ComponentOwner.prototype.componentDidMount.calledOnce).to.equal(true);*/
   
    
    /*let root = TestUtils.renderIntoDocument(<PopUpInfoComponent contentId = 'demo-content' />);
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    ReactDOM.findDOMNode(root)*/
   
    //console.log(ReactDOM.findDOMNode(root));
    /*spy(Root.prototype, 'componentDidMount');
    const wrapper1 = mount(<Root />);
    expect(Root.prototype.componentDidMount.calledOnce).to.equal(true);*/
  });

  it('expect(Testcomponent).to.exist', ()=>{
   /* this.Testcomponent = TestUtils.renderIntoDocument(<PopUpInfoComponent contentId = 'demo-content'/>);
    expect(this.Testcomponent).to.exist*/
   // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", Testcomponent)
   
  /*  setTimeout(()=> {
      console.log("TestUtils.findRenderedDOMComponentWithTag(Testcomponent, 'div')", TestUtils.findRenderedDOMComponentWithTag(this.Testcomponent, 'div'))
    }, 2000)*/
    
    setTimeout(()=>{
      //console.clear();

      /*let popOverCollection = {};let popUpCollection = [];
      popOverCollection.popOverTitle = 'Title'
      popOverCollection.popOverDescription =  'Description';
      let dom = document.querySelector('a.keyword');
      popUpCollection.push({'popOverCollection' : popOverCollection, 'item' : dom})
      console.log("TestUtils : ", TestUtils);

      const popUpWrapper = mount(<PopUpInfo popUpCollection = {popUpCollection} bookId = "bookDiv" />)
      const BookViewerWrapper = mount(<BookViewer />)
      console.log("wrapper.find(dom) ", wrapper.find(dom))
      wrapper.find(dom).simulate('click')*/


    /*  let popOverCollection = {};let popUpCollection = [];
      popOverCollection.popOverTitle = 'Title'
      popOverCollection.popOverDescription =  'Description';
      let dom = document.querySelector('a.keyword');
      popUpCollection.push({'popOverCollection' : popOverCollection, 'item' : dom})
      let popUp = new PopUpInfo({'popUpCollection' : popUpCollection, 'bookId' : 'bookDiv'});
      popUp.framePopOver(0, dom)*/
    }, 2000)
    
    console.log("PopUpInfo", PopUpInfo)
  })
  
});
