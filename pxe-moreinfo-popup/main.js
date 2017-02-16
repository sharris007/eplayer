import './main.scss';

import React, {  Component } from 'react';
import ReactDOM from 'react-dom';
import MoreInfoPopUp from './src/js/MoreInfoPopUp';
import BookViewer from './demo/BookViewer';


export default class MoreInfoPopUpComponent extends Component {
  constructor(props) {
    super(props); 
    this.init(props);
  }

  init=(config)=> {
    ReactDOM.render(
    	<div>
          
        <div id = "bookDiv">
    		  <BookViewer/>
        </div>
       
        <MoreInfoPopUp  bookDiv = "bookDiv" moreInfoUrl = "https://content.openclass.com/eps/pearson-reader/api/item/0c0c9911-1724-41d7-8d05-f1be29193d3c/1/file/qatesting_changing_planet_v2_sjg/changing_planet/OPS/s9ml/glossary.xhtml"/> 
 
        </div>,
        document.getElementById(config.contentId)
    );
  };  
};

export MoreInfoPopUp from './src/js/MoreInfoPopUp';
// Listen for client events to initialize a new Bookshelf component
document.body.addEventListener('o.InitAnnotation', e => new MoreInfoPopUpComponent(e.detail));
