import React, {  Component, PropTypes } from 'react';
import renderHTML from 'react-render-html';
import axios from 'axios';

class BookViewer extends Component {
  constructor(props) {
    super(props);   
    this.state = {
    	bookHTML : ''
    };
    this.init();
  }

  init = () => {
  	axios.get('https://content.stg-openclass.com/eps/pearson-reader/api/item/651da29d-c41d-415e-b8a4-3eafed0057db/1/file/LutgensAtm13-071415-MJ-DW/OPS/s9ml/chapter02/filep7000496728000000000000000000cae.xhtml')
			.then((response) => {
        const basePath = 'https://content.stg-openclass.com/eps/pearson-reader/api/item/651da29d-c41d-415e-b8a4-3eafed0057db/1/file/LutgensAtm13-071415-MJ-DW/OPS/';
        response.data = response.data.replace('../../assets/css/main.css',basePath + 'assets/css/main.css');
        response.data = response.data.replace('../../assets/css/night.css',basePath + 'assets/css/night.css' );
        response.data = response.data.replace('../../assets/css/sepia.css',basePath + 'assets/css/sepia.css' );
        response.data = response.data.replace('../../assets/fonts/fonts.css',basePath + 'assets/fonts/fonts.css' );
        response.data = response.data.replace('../../assets/css/epub_main.css',basePath + 'assets/css/epub_main.css' );
        response.data = response.data.replace('../../assets/js/habitat_platform.js' ,basePath + 'assets/js/habitat_platform.js' );
				this.setState({bookHTML : response.data});
        this.props.renderGlossary();			
			});
  }
  
  render() {
    return (<div>{renderHTML(this.state.bookHTML) }</div>);
  }
  
}

BookViewer.PropTypes = {
}

export default BookViewer;
