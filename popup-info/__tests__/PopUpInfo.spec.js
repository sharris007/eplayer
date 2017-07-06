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
  beforeEach(() => {
    onBookLoad = jest.fn();
    bookComponent = mount(<BookViewer bookHTML = '<span> <a href="#" class = "keyWord"> ggggg </a> </span>' onBookLoad = {onBookLoad} />, {attachTo: document.getElementById('root')});
  });

  const popUpComponent = shallow(<PopUpInfo popUpCollection = {[]} bookId = 'dummyId'/>, {attachTo: document.getElementById('root')});

  it('PopUpInfo Component div length equal to ONE ', () => { 	
    expect(popUpComponent.find('div').length).toEqual(1);
    //popUpComponent.unmount();
  });

  it('fetching keyWord class ', ()=>{
  	console.log(bookComponent.find('.keyWord').html())
  	//console.log(bookComponent.find('.keyWord').html())
  });

});