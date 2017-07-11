import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import PopUpInfo from '../src/js/PopUpInfo';
import BookViewer from '../demo/BookViewer';

describe('BookViewer :- ', () => {
  let onBookLoad;
  let bookComponent;
  beforeEach(() => {
    onBookLoad = jest.fn();
    bookComponent = mount(<BookViewer bookHTML = '<span> <a href="#" class = "keyWord"> Hiiiiii </a> </span>' onBookLoad = {onBookLoad} />, {attachTo: document.getElementById('root')} );

  });
  it('Checking onBookLoad callback from bookComponent', () => {  	
    expect(bookComponent.props().onBookLoad).toBeDefined();
    bookComponent.unmount();
  });
});

describe('PopUpInfo Snapshot:- ', () => {
  const popUpComponent = renderer.create(<PopUpInfo popUpCollection = {[]} bookId = 'dummyId'/>, {attachTo: document.getElementById('root')});

  it('PopUpInfo renders (Snapshot)', () => {
    const json = popUpComponent.toJSON();
    expect(json).toMatchSnapshot();
    popUpComponent.unmount();
  });

});

describe('PopUpInfo Component:- ', () => {
  let onBookLoad;
  let bookComponent;
  let popUpCollection = [];
  let popOverCollection = {};
  let item;
  let popUpComponent;
  beforeEach(() => {
    onBookLoad = jest.fn();
    bookComponent = mount(<BookViewer bookHTML = '<span> <a href="#" class = "keyWord"> My Mock Dom </a> </span>' onBookLoad = {onBookLoad} />, {attachTo: document.getElementById('root')});
    popOverCollection.popOverTitle = 'My Mock Title'; 
    popOverCollection.popOverDescription = 'My Mock Description'; 
    item = bookComponent.find('.keyWord');
    item.setAttribute = function(a,b) {};
    item.addEventListener = function(a,b) {};
    popUpCollection.push({'popOverCollection' : popOverCollection, 'item' : item});
  });

  it('fetching keyWord class ', ()=>{
    popUpComponent = mount(<PopUpInfo popUpCollection = {popUpCollection} bookId = 'dummyIdd'/>, {attachTo: document.getElementById('root')});
    popUpComponent.framePopOver = jest.genMockFunction();
    console.log("<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>", popUpComponent.props())
  	/*console.log(bookComponent.find('.keyWord'))
  	console.log(popUpComponent.html())*/
  });

   it('PopUpInfo Component div length equal to ONE ', () => {   
    expect(popUpComponent.find('div').length).toEqual(2);
  });


});