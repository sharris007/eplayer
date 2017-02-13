import './main.scss';

import React, {  Component } from 'react';
import ReactDOM from 'react-dom';
import GlossaryPopUp from './src/js/GlossaryPopUp';
import BookViewer from './demo/BookViewer';


export default class GlossaryPopUpComponent extends Component {
  constructor(props) {
  	super(props); 
  	/*this.state = { renderGlossaryComponent1 : false};
    this.renderGlossary = this.renderGlossary.bind(this);*/
    this.init(props);
  }

  renderGlossary()  {
    /*this.setState({
      renderGlossaryComponent1: !this.state.renderGlossaryComponent1
    });*/
  }

  init=(config)=>{
    ReactDOM.render(
    	<div>
        <div id = 'bookDiv'>
    		  <BookViewer renderGlossary = { this.renderGlossary }/>
        </div>
        <GlossaryPopUp glossaryurl = '../../glossary/filep7000496728000000000000000005a08.xhtml' bookDiv = 'bookDiv'/> 
        </div>,
        document.getElementById(config.contentId)
    );
  };  
};

export GlossaryPopUp from './src/js/GlossaryPopUp';
// Listen for client events to initialize a new Bookshelf component
document.body.addEventListener('o.InitAnnotation', e => new GlossaryPopUpComponent(e.detail));
