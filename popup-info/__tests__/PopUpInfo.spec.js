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
    bookComponent = mount(<BookViewer bookHTML = "<div> Hii </div>" onBookLoad = {onBookLoad} />);
  });
  it('Checking onBookLoad callback from bookComponent', () => {  	
    expect(bookComponent.props().onBookLoad).toBeDefined();
  });
});

describe('PopUpInfo Snapshot:- ', () => {
  const popUpComponent = renderer.create(<PopUpInfo popUpCollection = {[]} bookId = 'dummyId'/>);

  it('PopUpInfo renders (Snapshot)', () => {
    const json = popUpComponent.toJSON();
    expect(json).toMatchSnapshot();
  });

});

describe('PopUpInfo Component:- ', () => {
  const popUpComponent = shallow(<PopUpInfo popUpCollection = {[]} bookId = 'dummyId'/>);

  it('PopUpInfo Component div length equal to ONE ', () => {
    expect(popUpComponent.find('div').length).toEqual(1);
  });
  
});